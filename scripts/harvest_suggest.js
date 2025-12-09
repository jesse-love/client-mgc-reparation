
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION LOCALIZED (QC) ---
const TARGET_CITIES = [
    'Terrebonne', 'Mascouche', 'Blainville', 'Laval',
    'Repentigny', 'Bois-des-Filion', 'Lorraine', 'Rosemère'
];

const SEED_SERVICES = [
    'réparation freins', 'changement huile', 'garage mécanique',
    'pneus hiver', 'mécanicien', 'inspection auto', 'antirouille'
];

// French Buyer Intent Modifiers
const INTENT_MODIFIERS = [
    'prix', 'cout', 'meilleur', 'rendez-vous', 'urgence',
    'ouvert maintenant', 'avis', 'promotion', 'pas cher'
];

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const DELAY_MS = 150; // Be polite to Google

// Output file
const OUTPUT_FILE = path.join(__dirname, '../data/harvested_keywords_fr.csv');

// --- UTILS ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- HARVESTER LOGIC ---
async function fetchSuggestions(query) {
    try {
        // hl=fr (French), gl=ca (Canada)
        const url = `http://suggestqueries.google.com/complete/search?client=firefox&hl=fr&gl=ca&q=${encodeURIComponent(query)}`;
        const response = await axios.get(url);
        if (response.data && response.data[1]) {
            return response.data[1];
        }
        return [];
    } catch (error) {
        console.error(`Error fetching for "${query}": ${error.message}`);
        return [];
    }
}

async function harvest() {
    console.log("🚜 Starting Hyper-Local Harvest (Quebec)...");
    let allKeywords = new Set();

    // 1. The "Radius" Strategy: Service + City
    for (const city of TARGET_CITIES) {
        console.log(`\n📍 Scanning Sector: ${city}`);

        for (const service of SEED_SERVICES) {
            // Pattern A: "Service + City" (e.g., "réparation freins terrebonne")
            const localQuery = `${service} ${city}`;
            const suggestions = await fetchSuggestions(localQuery);
            suggestions.forEach(k => allKeywords.add(k));
            await sleep(DELAY_MS);

            // Pattern B: "Service + City + Modifier"
            for (const mod of INTENT_MODIFIERS) {
                const intentQuery = `${service} ${city} ${mod}`;
                const intentSuggestions = await fetchSuggestions(intentQuery);
                intentSuggestions.forEach(k => allKeywords.add(k));
                await sleep(DELAY_MS);
            }
        }
    }

    // 2. The "Question" Strategy (General but Localized)
    console.log(`\n🧠 Scanning Questions...`);
    const QUESTIONS = ['combien coute', 'quand changer', 'bruit', 'symptome'];

    for (const service of SEED_SERVICES) {
        for (const q of QUESTIONS) {
            const query = `${q} ${service}`;
            const suggestions = await fetchSuggestions(query);
            suggestions.forEach(k => allKeywords.add(k));
            await sleep(DELAY_MS);
        }
    }

    // 3. Filter & Save
    console.log(`\n\n✅ Harvest Complete.`);
    console.log(`Total Localized Keywords: ${allKeywords.size}`);

    const keywordList = Array.from(allKeywords).sort();
    const csvContent = "Keyword,City,Status\n" + keywordList.map(k => `"${k}",Detected,Pending`).join("\n");

    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    fs.writeFileSync(OUTPUT_FILE, csvContent);
    console.log(`Saved to ${OUTPUT_FILE}`);
}

harvest();
