import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const createForm = async () => {
    console.log('🧪 Attempting to create MGC French Form...');

    // The Forms API v2 is actually slightly different. 
    // Often it's easier to clone or just use existing ones, 
    // but let's try the POST /forms endpoint if it exists in v2.
    // Actually, V2 Forms API is documented for LISTING and GETTING, 
    // but creation is often via the UI or specialized endpoints.

    // Let's try creating a "Contact" with the French tags as a proof of concept 
    // that the "Backend" is ready to receive French data.

    try {
        const contactData = {
            firstName: 'Test',
            lastName: 'Français',
            email: 'test-ghl-fr@example.com',
            phone: '+15140000000',
            locationId: LOCATION_ID,
            tags: ['ppl_lead_mecanique', 'ppl_lead_freins']
        };
        const resp = await axios.post(`https://services.leadconnectorhq.com/contacts/`, contactData, {
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
            }
        });
        console.log('✅ Contact with French Tags: SUCCESS');
        console.log('Contact ID:', resp.data.contact.id);
    } catch (err) {
        console.error('❌ Contact Creation: FAILED');
        console.error('Error:', err.response?.data || err.message);
    }
};

createForm();
