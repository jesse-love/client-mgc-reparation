import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;

const discoverLocation = async () => {
    console.log('🔍 Testing Agency-level Installation Discovery...');

    try {
        const resp = await axios.get(`https://services.leadconnectorhq.com/oauth/installedLocations`, {
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Found Locations (Agency level):', JSON.stringify(resp.data, null, 2));
    } catch (err) {
        console.error('❌ Agency Selection Failed:', err.response?.data || err.message);

        console.log('🔍 Attempting to hit Locations API directly (without ID) to see if it lists self...');
        try {
            const resp2 = await axios.get(`https://services.leadconnectorhq.com/locations/`, {
                headers: {
                    Authorization: `Bearer ${GHL_API_KEY}`,
                    Version: '2021-07-28',
                    'Content-Type': 'application/json'
                }
            });
            console.log('✅ Found Locations (Direct):', JSON.stringify(resp2.data, null, 2));
        } catch (err2) {
            console.error('❌ Direct Location List Failed:', err2.response?.data || err2.message);
        }
    }
};

discoverLocation();
