import { google } from 'googleapis';
import path from 'path';

const KEY_FILE = path.join(process.cwd(), 'gcloud-key.json');

const testSearchConsole = async () => {
    console.log('🔍 Testing Google Search Console access...');

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });

        const searchconsole = google.searchconsole({ version: 'v1', auth });

        const res = await searchconsole.sites.list();
        const sites = res.data.siteEntry;

        if (!sites || sites.length === 0) {
            console.log('⚠️ No sites found in Search Console for this service account.');
            console.log('Please make sure you added the service account email as a user in Search Console.');
        } else {
            console.log('✅ Success! Found the following sites:');
            sites.forEach(site => {
                console.log(`- ${site.siteUrl} (Permission: ${site.permissionLevel})`);
            });
        }
    } catch (err) {
        console.error('❌ Error testing Search Console:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        }
    }
};

testSearchConsole();
