import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import i18n data manually since we can't import TS files directly in Node easily without compilation
// We'll extract the services structure by mocking or just defining the structure if it's static, 
// OR we can read the file as text and regex it (brittle), 
// OR better: we can create a temporary TS file to compile and run, but that's complex.
// Let's rely on the pseo_content.json for Q&A and soft-code the services mapping based on the known structure.

// Wait, I can allow the user to run this with ts-node if they have it, or just use standard JS.
// For simplicity, I will read the JSON content and generate the Q&A list.
// For services, I will define the list based on the project's logic.

const PSEO_PATH = path.resolve(__dirname, '../data/pseo_content.json');
const OUTPUT_PATH = path.resolve(__dirname, '../data/gmb_assets.md');

const SERVICES_CATALOG = [
    { name: "Mécanique Générale", description: "Diagnostics experts, entretien et réparations pour toutes les marques et modèles." },
    { name: "Air Climatisé", description: "Entretien et réparation de l'air climatisé automobile." },
    { name: "Mécanique de Véhicules Lourds", description: "Service complet pour camions lourds et flottes commerciales." },
    { name: "Réparation de Remorque", description: "Inspection, entretien et réparation de remorques de tous types." },
    { name: "Service de Génératrice", description: "Maintenance et réparation de génératrices industrielles et commerciales." },
    { name: "Soudure & Assemblage", description: "Services de soudure professionnelle et assemblage métallique." },
    { name: "Antirouille", description: "Traitement antirouille permanent à l'huile pour une protection maximale." },
    { name: "Pneus", description: "Vente, installation et entreposage de pneus d'hiver et d'été." },
    { name: "Changement d'huile", description: "Vidange d'huile rapide et changement de filtre avec inspection de sécurité." }
];

const generateAssets = () => {
    let output = `# GMB Content Assets
> Date: ${new Date().toISOString().split('T')[0]}
> Purpose: Copy/Paste content for Google My Business

## 1. Services
*Add these as "Custom Services" in your GMB Profile.*

| Service Name | Description (Limit 300 chars) |
| :--- | :--- |
`;

    SERVICES_CATALOG.forEach(service => {
        output += `| **${service.name}** | ${service.description} |\n`;
    });

    output += `\n## 2. Seed Q&A
*Post these from your personal account (Q) and reply as the Owner (A).*

`;

    if (fs.existsSync(PSEO_PATH)) {
        const content = JSON.parse(fs.readFileSync(PSEO_PATH, 'utf8'));
        const entries = Object.values(content);

        // Pick 10 diverse entries (random or specific)
        // Let's pick unique keywords to avoid repetition
        const selected = entries.slice(0, 10); // Just grab first 10 for now, or shuffle.

        selected.forEach((entry, index) => {
            // Strip HTML for GMB
            let cleanAnswer = entry.answer
                .replace(/<h3>.*?<\/h3>/g, '') // Remove headers
                .replace(/<[^>]+>/g, '') // Remove tags
                .replace(/\s+/g, ' ') // Normalize whitespace
                .trim();

            // Truncate to ~400 chars? GMB Q&A limit is quite long (4096) but shorter is punchier.
            if (cleanAnswer.length > 500) cleanAnswer = cleanAnswer.substring(0, 500) + "...";

            output += `### Q${index + 1}: ${entry.keyword} à ${entry.city}?\n`;
            output += `**Question:** Cherche ${entry.keyword} à ${entry.city}, vous faites ça?\n`;
            output += `**Answer:** ${cleanAnswer}\n\n`;
            output += `---\n`;
        });
    }

    fs.writeFileSync(OUTPUT_PATH, output);
    console.log(`✅ GMB Assets generated at: ${OUTPUT_PATH}`);
};

generateAssets();
