import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;

const finalCheck = async () => {
    const endpoints = [
        '/users/me',
        '/oauth/token/info',
        '/locations/me',
        '/profiles/me'
    ];

    for (const ep of endpoints) {
        console.log(`🔍 Testing ${ep}...`);
        try {
            const resp = await axios.get(`https://services.leadconnectorhq.com${ep}`, {
                headers: {
                    Authorization: `Bearer ${GHL_API_KEY}`,
                    Version: '2021-07-28',
                }
            });
            console.log(`✅ ${ep} Success:`, JSON.stringify(resp.data, null, 2));
        } catch (err) {
            console.log(`❌ ${ep} Failed: ${err.response?.status || err.message}`);
        }
    }
};

finalCheck();
