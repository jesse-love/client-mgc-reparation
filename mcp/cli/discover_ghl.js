import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;

const discoverLocation = async () => {
    console.log('🔍 Discovering GHL Locations for Token...');

    try {
        // Try listing possible locations or fetching current context
        const resp = await axios.get(`https://services.leadconnectorhq.com/locations/search`, {
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Found Locations:', JSON.stringify(resp.data, null, 2));
    } catch (err) {
        console.error('❌ Failed to search locations!');

        // Alternative: try to fetch details of the provided location to see if it's a version issue
        try {
            console.log('🔍 Attempting simple contact list with provided Location ID...');
            const resp2 = await axios.get(`https://services.leadconnectorhq.com/contacts/`, {
                params: { locationId: process.env.GHL_LOCATION_ID, limit: 1 },
                headers: {
                    Authorization: `Bearer ${GHL_API_KEY}`,
                    Version: '2021-07-28',
                    'Content-Type': 'application/json'
                }
            });
            console.log('✅ Contact List Success! Location ID is actually correct.');
        } catch (err2) {
            console.error('❌ Contact List Failed:', err2.response?.data || err2.message);
        }
    }
};

discoverLocation();
