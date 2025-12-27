import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const verifyGHL = async () => {
    console.log('🔍 Testing GHL API Connectivity...');

    try {
        // Try listing contacts (usually permitted for PAT)
        const resp = await axios.get(`https://services.leadconnectorhq.com/contacts/`, {
            params: { locationId: LOCATION_ID, limit: 1 },
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Contacts API: SUCCESS');
        console.log('Location Name:', resp.data.contacts?.[0]?.locationId || 'No contacts found, but key works.');
    } catch (err) {
        console.error('❌ Contacts API: FAILED');
        console.error('Error:', err.response?.data || err.message);
    }

    try {
        // Try listing pipelines
        const resp = await axios.get(`https://services.leadconnectorhq.com/opportunities/pipelines`, {
            params: { locationId: LOCATION_ID },
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Pipelines API: SUCCESS');
    } catch (err) {
        console.error('❌ Pipelines API: FAILED');
        console.error('Error:', err.response?.data || err.message);
    }
};

verifyGHL();
