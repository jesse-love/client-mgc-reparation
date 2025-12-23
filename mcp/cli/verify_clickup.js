import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
const LIST_ID = process.env.CLICKUP_LIST_OPERATIONS;

const verifyClickUp = async () => {
    console.log('🔍 Testing ClickUp API Connectivity...');

    if (!CLICKUP_API_TOKEN || !LIST_ID) {
        console.error('❌ Missing ClickUp credentials in .env');
        return;
    }

    try {
        const resp = await axios.get(`https://api.clickup.com/api/v2/list/${LIST_ID}`, {
            headers: {
                Authorization: CLICKUP_API_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ ClickUp API: SUCCESS');
        console.log('List Name:', resp.data.name);
        console.log('Custom Fields Count:', resp.data.custom_fields?.length || 0);
    } catch (err) {
        console.error('❌ ClickUp API: FAILED');
        console.error('Error:', err.response?.data || err.message);
    }
};

verifyClickUp();
