import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const testLocation = async () => {
    console.log('🔍 Fetching Location Details...');

    try {
        const resp = await axios.get(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}`, {
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Success! Location Name:', resp.data.location.name);
    } catch (err) {
        console.error('❌ Failed!');
        console.error('Error Status:', err.response?.status);
        console.error('Error Data:', err.response?.data);
    }
};

testLocation();
