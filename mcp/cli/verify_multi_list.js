import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
const SPACE_ID = "90172883043";

const verifyMultiList = async () => {
    console.log('🔍 Listing all MGC Reparation Lists...');

    try {
        const resp = await axios.get(`https://api.clickup.com/api/v2/space/${SPACE_ID}/list`, {
            headers: { Authorization: CLICKUP_API_TOKEN }
        });

        console.log(`✅ Success! Found ${resp.data.lists.length} lists:`);
        for (const list of resp.data.lists) {
            console.log(`- ${list.name} (ID: ${list.id})`);
        }
    } catch (err) {
        console.error('❌ Verification Failed:', err.response?.data || err.message);
    }
};

verifyMultiList();
