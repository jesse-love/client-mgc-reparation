
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PSEO_PATH = path.resolve(__dirname, '../data/pseo_content.json');
const OUTPUT_PATH = path.resolve(__dirname, '../data/enriched_locations.json');
const API_KEY = "AIzaSyALSGej1fcjXsVjfffK62nM5kW3SNS6svE"; // User provided Places API Key

// We want to find landmarks for each unique city found in the pSEO data.
// We will look for 3 types of landmarks: 'park', 'school', 'shopping_mall'

const getUniqueCities = (data) => {
    const cities = new Set();
    Object.values(data).forEach((entry) => {
        if (entry.city) cities.add(entry.city);
    });
    return Array.from(cities);
};

const fetchLandmarks = async (city) => {
    console.log(`\n🔍 Scouting: ${city}...`);

    // We'll search for "Landmarks in {City}" using Text Search (New) or Text Search (Old)
    // Using the v1 Places API (New) Text Search if possible, or standard.
    // Let's use the standard textSearch endpoint for simplicity via raw fetch if needed, 
    // but the updated "places.googleapis.com/v1/places:searchText" is better.

    // Query: "Parks near {City}, QC"
    // We will diversify the query.

    const queries = [
        `Parks in ${city}, QC`,
        `Schools in ${city}, QC`,
        `Shopping Malls in ${city}, QC`
    ];

    const landmarks = [];

    for (const query of queries) {
        const url = 'https://places.googleapis.com/v1/places:searchText';
        const body = {
            textQuery: query,
            maxResultCount: 1 // Just get the top one for each category
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': API_KEY,
                    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.primaryType'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (data.places && data.places.length > 0) {
                const place = data.places[0];
                console.log(`   found: ${place.displayName.text} (${place.primaryType})`);
                landmarks.push({
                    name: place.displayName.text,
                    address: place.formattedAddress,
                    type: place.primaryType
                });
            }
        } catch (e) {
            console.error(`   ❌ Error fetching ${query}:`, e.message);
        }
    }

    return landmarks;
};

const main = async () => {
    if (!fs.existsSync(PSEO_PATH)) {
        console.error("❌ pseo_content.json not found.");
        return;
    }

    const content = JSON.parse(fs.readFileSync(PSEO_PATH, 'utf8'));
    const cities = getUniqueCities(content);
    console.log(`Found ${cities.length} unique cities to enrich.`);

    const enrichmentMap = {};

    // Load existing if available to save credits?
    if (fs.existsSync(OUTPUT_PATH)) {
        Object.assign(enrichmentMap, JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8')));
    }

    for (const city of cities) {
        if (enrichmentMap[city]) {
            console.log(`✅ ${city} already enriched. Skipping.`);
            continue;
        }

        const landmarks = await fetchLandmarks(city);
        enrichmentMap[city] = {
            landmarks: landmarks,
            lastUpdated: new Date().toISOString()
        };

        // Save incrementally
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(enrichmentMap, null, 2));

        // Sleep to be nice to the API
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`\n✨ Enrichment Complete. Saved to data/enriched_locations.json`);
};

main();
