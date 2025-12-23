import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;

const findLocBySearch = async () => {
    console.log('🔍 Searching Locations by Query...');

    try {
        const resp = await axios.get(`https://services.leadconnectorhq.com/locations/search`, {
            params: { query: 'MGC Reparation' },
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Found Locations:', JSON.stringify(resp.data, null, 2));
    } catch (err) {
        console.error('❌ Search Failed:', err.response?.data || err.message);
    }
};

findLocBySearch();
