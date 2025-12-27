import { google } from 'googleapis';
import path from 'path';

const KEY_FILE = path.join(process.cwd(), 'gcloud-key.json');

const testGBP = async () => {
    console.log('🔍 Testing Google Business Profile access (v1)...');

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: [
                'https://www.googleapis.com/auth/business.manage',
                'https://www.googleapis.com/auth/adwords'
            ],
        });

        // For account management
        const mybusinessaccountmanagement = google.mybusinessaccountmanagement({ version: 'v1', auth });

        const res = await mybusinessaccountmanagement.accounts.list();
        const accounts = res.data.accounts;

        if (!accounts || accounts.length === 0) {
            console.log('⚠️ No Business Accounts found for this service account.');
            console.log('Please make sure you invited the service account email as a manager in your Business Profile.');
        } else {
            console.log('✅ Success! Found the following accounts:');
            for (const acc of accounts) {
                console.log(`- ${acc.accountName} (Name: ${acc.name})`);

                // Try to list locations for this account
                const mybusinessbusinessinformation = google.mybusinessbusinessinformation({ version: 'v1', auth });
                const locRes = await mybusinessbusinessinformation.accounts.locations.list({
                    parent: acc.name,
                    readMask: 'name,title,storeCode,regularHours'
                });
                const locations = locRes.data.locations;
                if (locations) {
                    locations.forEach(loc => console.log(`  📍 Location: ${loc.title} (${loc.name})`));
                } else {
                    console.log('  ⚠️ No locations found for this account.');
                }
            }
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
