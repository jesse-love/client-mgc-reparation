import axios from 'axios';
import dotenv from 'dotenv';
import { services } from '../../i18n.js';

dotenv.config();

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
const LIST_ID = "901708781119";
const CLICKUP_BASE = "https://api.clickup.com/api/v2";

const headers = {
    Authorization: CLICKUP_API_TOKEN,
    "Content-Type": "application/json"
};

const REQUIRED_FIELDS = [
    { name: "URL", type: "url" },
    { name: "Slug", type: "short_text" },
    {
        name: "Category",
        type: "drop_down",
        type_config: {
            options: [
                { name: "Static", color: "#5f55ee" },
                { name: "Service", color: "#2ea52b" },
                { name: "Sub-service", color: "#d6bc22" },
                { name: "Landing", color: "#e65100" },
                { name: "PSEO", color: "#00bcd4" }
            ]
        }
    },
    { name: "Meta Description", type: "short_text" },
    { name: "City", type: "short_text" },
    { name: "Service", type: "short_text" }
];

const CITIES = [
    "Mascouche", "Terrebonne", "Laval", "Repentigny", "Blainville", "Rosemère", "Bois-des-Filion", "Lachenaie"
];

const ensureCustomFields = async () => {
    console.log("🛡️ Checking Custom Fields...");
    const res = await axios.get(`${CLICKUP_BASE}/list/${LIST_ID}/field`, { headers });
    const existing = res.data.fields;

    for (const field of REQUIRED_FIELDS) {
        const found = existing.find(f => f.name.toLowerCase() === field.name.toLowerCase());
        if (!found) {
            console.log(`➕ Creating Custom Field: ${field.name}`);
            await axios.post(`${CLICKUP_BASE}/list/${LIST_ID}/field`, field, { headers });
        } else {
            console.log(`✅ Custom Field exists: ${field.name}`);
        }
    }
};

const getPages = () => {
    const pages = [];

    // 1. Static Pages
    pages.push({ name: "Accueil", slug: "/", category: "Static", url: "https://mgcreparation.ca/" });
    pages.push({ name: "À Propos", slug: "/about", category: "Static", url: "https://mgcreparation.ca/about" });
    pages.push({ name: "Contact", slug: "/contact", category: "Static", url: "https://mgcreparation.ca/contact" });
    pages.push({ name: "Services", slug: "/services", category: "Static", url: "https://mgcreparation.ca/services" });
    pages.push({ name: "Merci", slug: "/merci", category: "Static", url: "https://mgcreparation.ca/merci" });
    pages.push({ name: "Politique de confidentialité", slug: "/politique-de-confidentialite", category: "Static", url: "https://mgcreparation.ca/politique-de-confidentialite" });

    // 2. Main Services
    services.forEach(s => {
        pages.push({
            name: `Service: ${s.title.fr}`,
            slug: `/services/${s.slug}`,
            category: "Service",
            url: `https://mgcreparation.ca/services/${s.slug}`,
            meta: s.metaDescription?.fr,
            service: s.title.fr
        });

        // 3. Sub-services
        s.subServices?.forEach(ss => {
            pages.push({
                name: `Sub: ${ss.title.fr}`,
                slug: `/services/${s.slug}/${ss.slug}`,
                category: "Sub-service",
                url: `https://mgcreparation.ca/services/${s.slug}/${ss.slug}`,
                service: s.title.fr
            });
        });
    });

    // 4. Landing Pages
    pages.push({ name: "Offre: Freins", slug: "/offre", category: "Landing", url: "https://mgcreparation.ca/offre" });
    pages.push({ name: "Offre: Bilan", slug: "/bilan", category: "Landing", url: "https://mgcreparation.ca/bilan" });
    pages.push({ name: "Offre: Pneus", slug: "/pneus", category: "Landing", url: "https://mgcreparation.ca/pneus" });
    pages.push({ name: "Offre: Camion", slug: "/camion", category: "Landing", url: "https://mgcreparation.ca/camion" });
    pages.push({ name: "Offre: Génératrice", slug: "/generatrice", category: "Landing", url: "https://mgcreparation.ca/generatrice" });

    // 5. PSEO City Pages
    CITIES.forEach(city => {
        const slug = city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        pages.push({
            name: `PSEO: Mécanique ${city}`,
            slug: `/mechanic-${slug}`,
            category: "PSEO",
            url: `https://mgcreparation.ca/mechanic-${slug}`,
            city: city
        });
    });

    return pages;
};

const sync = async () => {
    try {
        await ensureCustomFields();
        const pages = getPages();
        console.log(`🚀 Syncing ${pages.length} pages to ClickUp...`);

        // Get fields again to have IDs
        const fieldRes = await axios.get(`${CLICKUP_BASE}/list/${LIST_ID}/field`, { headers });
        const fields = fieldRes.data.fields;
        const getFieldId = (name) => fields.find(f => f.name.toLowerCase() === name.toLowerCase())?.id;
        const getOptionId = (fieldName, optionName) => {
            const field = fields.find(f => f.name.toLowerCase() === fieldName.toLowerCase());
            return field?.type_config?.options?.find(o => o.name === optionName)?.id;
        };

        for (const page of pages) {
            console.log(`📦 Creating/Updating: ${page.name}`);

            // Check if exists (by name)
            const existingRes = await axios.get(`${CLICKUP_BASE}/list/${LIST_ID}/task?include_closed=true`, { headers });
            const existingTask = existingRes.data.tasks.find(t => t.name === page.name);

            const taskData = {
                name: page.name,
                description: `Page mirroring for ${page.url}`,
                status: "pages"
            };

            let taskId;
            if (existingTask) {
                taskId = existingTask.id;
                // await axios.put(`${CLICKUP_BASE}/task/${taskId}`, taskData, { headers }); 
            } else {
                const createRes = await axios.post(`${CLICKUP_BASE}/list/${LIST_ID}/task`, taskData, { headers });
                taskId = createRes.data.id;
            }

            // Update Custom Fields
            const customFields = [
                { id: getFieldId("URL"), value: page.url },
                { id: getFieldId("Slug"), value: page.slug },
                { id: getFieldId("Category"), value: getOptionId("Category", page.category) },
                { id: getFieldId("Meta Description"), value: page.meta || "" },
                { id: getFieldId("City"), value: page.city || "" },
                { id: getFieldId("Service"), value: page.service || "" }
            ];

            for (const cf of customFields) {
                if (cf.id && cf.value !== undefined) {
                    await axios.post(`${CLICKUP_BASE}/task/${taskId}/field/${cf.id}`, { value: cf.value }, { headers });
                }
            }
        }

        console.log("✨ Website mirrored successfully!");
    } catch (err) {
        console.error("❌ Sync failed:", err.message);
        if (err.response) console.error(JSON.stringify(err.response.data, null, 2));
    }
};

sync();
