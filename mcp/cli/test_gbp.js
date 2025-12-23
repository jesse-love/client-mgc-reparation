import { google } from 'googleapis';
import path from 'path';

const KEY_FILE = path.join(process.cwd(), 'gcloud-key.json');

const testGBP = async () => {
    console.log('🔍 Testing Google Business Profile access...');

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/business.manage'],
        });

        const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });

        const res = await mybusiness.accounts.list();
        const accounts = res.data.accounts;

        if (!accounts || accounts.length === 0) {
            console.log('⚠️ No Business Accounts found for this service account.');
            console.log('Please make sure you invited the service account email as a manager in your Business Profile.');
        } else {
            console.log('✅ Success! Found the following accounts:');
            accounts.forEach(acc => {
                console.log(`- ${acc.name} (${acc.accountName})`);
            });
        }
    } catch (err) {
        console.error('❌ Error testing GBP:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        }
    }
};

testGBP();
