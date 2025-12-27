import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const listForms = async () => {
    console.log('🔍 Fetching GHL Forms...');
    try {
        const resp = await axios.get(`https://services.leadconnectorhq.com/forms/`, {
            params: { locationId: LOCATION_ID },
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
            }
        });
        console.log('✅ Success! Found Forms:', JSON.stringify(resp.data, null, 2));
    } catch (err) {
        console.error('❌ Failed!');
        console.error('Error Status:', err.response?.status);
        console.error('Error Data:', err.response?.data);
    }
};

listForms();
