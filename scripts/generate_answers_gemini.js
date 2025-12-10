
import { VertexAI } from '@google-cloud/vertexai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
import 'dotenv/config'; // Load env vars
const PROJECT_ID = process.env.GOOGLE_PROJECT_ID;
const LOCATION = process.env.GOOGLE_LOCATION;
const MODEL_NAME = process.env.GOOGLE_MODEL_NAME;

// Input/Output
const INPUT_CSV = path.join(__dirname, '../data/harvested_keywords_fr.csv');
const OUTPUT_JSON = path.join(__dirname, '../data/pseo_content.json');

// Initialize Vertex AI
const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = vertex_ai.preview.getGenerativeModel({
    model: MODEL_NAME,
    generation_config: {
        'max_output_tokens': 1024,
        'temperature': 0.7,
        'top_p': 0.8,
    },
});

// --- PROMPT TEMPLATE ---
const SYSTEM_INSTRUCTION = `
You are an Expert Mechanic at "MGC Réparation" in Terrebonne, Quebec.
Your goal is to answer the user's search query with high authority, helpfulness, and local context.

Tone: Professional, Direct, Helpful, Local (Quebec/French).
Format: HTML (Just the body content, no <html> tags). Use <h3>, <p>, <ul>.

Include:
1. Direct Answer: Immediately answer the specific question or intent.
2. Technical Detail: Explain *why* this happens (briefly).
3. "MGC Advantage": Mention why MGC is the best for this in Terrebonne/Mascouche (e.g., "Our detailed inspection...", "Transparent pricing...").
4. Call to Action: Encourage booking a free estimate.

Language: French (Canadian/Quebec).
`;

async function generateAnswer(keyword, city) {
    const prompt = `
    Query: "${keyword}"
    City Context: ${city || 'Terrebonne/Mascouche'}
    
    Write a helpful, SEO-optimized answer (approx 150-200 words) for this query.
    `;

    try {
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: SYSTEM_INSTRUCTION + prompt }] }],
        });
        const response = result.response;
        return response.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error(`❌ Error generating for "${keyword}":`, error.message);
        return null;
    }
}

async function main() {
    console.log("🧠 Starting Vertex AI Content Generation...");

    if (!fs.existsSync(INPUT_CSV)) {
        console.error("Input file not found!");
        return;
    }

    const fileContent = fs.readFileSync(INPUT_CSV, 'utf8');
    const lines = fileContent.split('\n').filter(Boolean);

    let db = {};
    // Load existing DB if exists to avoid re-generating
    if (fs.existsSync(OUTPUT_JSON)) {
        db = JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf8'));
    }

    // Process all remaining keywords
    const BATCH_SIZE = 300;
    let processed = 0;

    // Skip header (i=1)
    for (let i = 1; i < lines.length; i++) {
        if (processed >= BATCH_SIZE) break;

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

            console.log(`Generating for: [${keyword}]...`);

            // Infer city from keyword if possible, else default
            let city = 'Terrebonne';
            if (keyword.includes('mascouche')) city = 'Mascouche';
            if (keyword.includes('laval')) city = 'Laval';
            // ... simple heuristics

            const answer = await generateAnswer(keyword, city);

            if (answer) {
                db[slug] = {
                    slug,
                    keyword,
                    city,
                    answer,
                    generatedAt: new Date().toISOString()
                };
                processed++;
                console.log(`✅ Done.`);
                // Save after each to capture progress
                fs.writeFileSync(OUTPUT_JSON, JSON.stringify(db, null, 2));
                // Rate limit/Sleep
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }

    console.log(`\n🎉 Batch Complete. Generated ${processed} new answers.`);
    console.log(`Total DB Size: ${Object.keys(db).length} pages.`);
}

main();
