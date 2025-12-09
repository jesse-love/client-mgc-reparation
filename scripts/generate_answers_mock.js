
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input/Output
const INPUT_CSV = path.join(__dirname, '../data/harvested_keywords_fr.csv');
const OUTPUT_JSON = path.join(__dirname, '../data/pseo_content.json');

const TEMPLATES = {
    'frein': "Les problèmes de freins sont critiques pour votre sécurité. À {CITY}, nos hivers rigoureux accélèrent l'usure des plaquettes et des disques. Chez MGC Réparation, nous offrons une inspection complète du système de freinage.",
    'huile': "Un changement d'huile régulier est essentiel pour la longévité de votre moteur. Nous utilisons des huiles synthétiques de haute qualité adaptées au climat de {CITY}.",
    'pneu': "Vos pneus sont votre seul contact avec la route. Que ce soit pour l'installation de pneus d'hiver ou d'été à {CITY}, nous garantissons un balancement précis.",
    'mecanique': "Notre garage mécanique à {CITY} offre une gamme complète de services pour tous types de véhicules. De l'inspection générale aux réparations complexes.",
    'inspection': "Une inspection préachat ou saisonnière peut vous sauver des milliers de dollars. Nos experts à {CITY} vérifient plus de 50 points critiques sur votre véhicule.",
    'default': "Pour ce service spécifique à {CITY}, MGC Réparation est votre partenaire de confiance. Nous offrons des prix compétitifs et un service rapide."
};

function generateMockAnswer(keyword, city) {
    let content = TEMPLATES['default'];

    if (keyword.includes('frein')) content = TEMPLATES['frein'];
    else if (keyword.includes('huile')) content = TEMPLATES['huile'];
    else if (keyword.includes('pneu')) content = TEMPLATES['pneu'];
    else if (keyword.includes('mecanique') || keyword.includes('garage')) content = TEMPLATES['mecanique'];
    else if (keyword.includes('inspection')) content = TEMPLATES['inspection'];

    content = content.replace(/{CITY}/g, city);

    return `
    <h3>Réponse d'Expert pour "${keyword}"</h3>
    <p>${content}</p>
    <p><strong>Pourquoi choisir MGC Réparation à ${city} ?</strong></p>
    <ul>
        <li>Service rapide et courtois.</li>
        <li>Prix transparents sans surprise.</li>
        <li>Expertise locale adaptée à nos routes.</li>
    </ul>
    <p>N'attendez pas que le problème s'aggrave. Prenez rendez-vous dès aujourd'hui.</p>
    `;
}

async function main() {
    console.log("🎭 Starting MOCK Content Generation...");

    if (!fs.existsSync(INPUT_CSV)) {
        console.error("Input file not found!");
        return;
    }

    const fileContent = fs.readFileSync(INPUT_CSV, 'utf8');
    const lines = fileContent.split('\n').filter(Boolean);

    let db = {};
    if (fs.existsSync(OUTPUT_JSON)) {
        try {
            db = JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf8'));
        } catch (e) { db = {}; }
    }

    let processed = 0;

    // Process ALL lines in mock mode (fast)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/"([^"]+)"/);

        if (match && match[1]) {
            const keyword = match[1];

            // Slugify for Key
            const slug = keyword.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            // Skip if already exists
            if (db[slug]) continue;

            // Infer city
            let city = 'Terrebonne';
            if (keyword.includes('mascouche')) city = 'Mascouche';
            if (keyword.includes('laval')) city = 'Laval';
            if (keyword.includes('blainville')) city = 'Blainville';
            if (keyword.includes('repentigny')) city = 'Repentigny';

            const answer = generateMockAnswer(keyword, city);

            db[slug] = {
                slug,
                keyword,
                city,
                answer,
                generatedAt: new Date().toISOString(),
                isMock: true
            };
            processed++;
        }
    }

    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(db, null, 2));
    console.log(`\n🎉 Mock Generation Complete. Generated ${processed} new answers.`);
    console.log(`Total DB Size: ${Object.keys(db).length} pages.`);
}

main();
