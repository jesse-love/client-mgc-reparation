import { OfferCommander } from '../orchestrator/offers.js';
import dotenv from 'dotenv';

dotenv.config();

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;

const testOfferCommander = async () => {
    console.log('🎯 Testing Offer Commander Matching...');

    if (!CLICKUP_API_TOKEN) {
        console.error('❌ Missing CLICKUP_API_TOKEN in .env');
        return;
    }

    const commander = new OfferCommander(CLICKUP_API_TOKEN);

    try {
        console.log('\n--- Test 1: Exact Match (Terrebonne + Inspection) ---');
        const offer1 = await commander.matchOffer('Inspection', 'Terrebonne');
        console.log('Result:', JSON.stringify(offer1, null, 2));

        console.log('\n--- Test 2: Service Match (Freins + Mascouche) ---');
        // Note: If no 'Freins' offer exists specifically for Mascouche, it should fallback to a general 'Freins' offer or the first available.
        const offer2 = await commander.matchOffer('Freins', 'Mascouche');
        console.log('Result:', JSON.stringify(offer2, null, 2));

        console.log('\n--- Test 3: Generic Fallback ---');
        const offer3 = await commander.matchOffer('Service Inconnu', 'Ville Inconnue');
        console.log('Result:', JSON.stringify(offer3, null, 2));

    } catch (err) {
        console.error('❌ Test Failed:', err.message);
    }
};

testOfferCommander();
