import { google } from 'googleapis';
import path from 'path';

const KEY_FILE = path.join(process.cwd(), 'gcloud-key.json');

const listModels = async () => {
    console.log('🔍 Listing available Vertex AI models in us-central1...');

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });

        const project = "gen-lang-client-0992117425";
        const client = await auth.getClient();
        const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${project}/locations/us-central1/publishers/google/models`;

        const res = await client.request({ url });
        console.log('✅ Models Found:');
        console.log(JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('❌ Error listing models:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        }
    }
};

listModels();
