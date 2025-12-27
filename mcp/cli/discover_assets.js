import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const discoverAssets = async () => {
    console.log('🔍 Discovering GHL Assets (Calendars & Forms)...');

    // 1. Calendars
    try {
        const resp = await axios.get(`https://services.leadconnectorhq.com/calendars/`, {
            params: { locationId: LOCATION_ID },
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
            }
        });
        console.log('✅ Calendars:', JSON.stringify(resp.data, null, 2));
    } catch (err) {
        console.error('❌ Failed to fetch calendars:', err.response?.data || err.message);
    }

    // 2. Forms
    try {
        const resp = await axios.get(`https://services.leadconnectorhq.com/forms/`, {
            params: { locationId: LOCATION_ID },
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
            }
        });
        console.log('✅ Forms:', JSON.stringify(resp.data, null, 2));
    } catch (err) {
        console.error('❌ Failed to fetch forms:', err.response?.data || err.message);
    }
};

discoverAssets();
