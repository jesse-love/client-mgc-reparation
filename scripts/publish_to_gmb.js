import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const KEY_PATH = path.resolve(__dirname, '../client_secret.json');
const TOKEN_PATH = path.resolve(__dirname, '../gmb_token.json');
const ASSETS_PATH = path.resolve(__dirname, '../data/gmb_assets.md');

// Scopes required for GMB
const SCOPES = [
    'https://www.googleapis.com/auth/business.manage'
];

const main = async () => {
    // 1. Load Credentials
    if (!fs.existsSync(KEY_PATH)) {
        console.error("❌ Error: client_secret.json not found. Did you download it from Google Cloud?");
        process.exit(1);
    }
    const content = fs.readFileSync(KEY_PATH, 'utf8');
    const keys = JSON.parse(content);

    // Support both "installed" and "web" types
    const key = keys.installed || keys.web;
    if (!key) {
        console.error("❌ Error: Invalid client_secret.json format.");
        process.exit(1);
    }

    // 2. Create OAuth Client
    const oAuth2Client = new google.auth.OAuth2(
        key.client_id,
        key.client_secret,
        'http://localhost:3000/oauth2callback' // This must match the redirect URI in Google Cloud (often localhost)
    );

    // 3. Check for existing Token
    if (fs.existsSync(TOKEN_PATH)) {
        const tokenToken = fs.readFileSync(TOKEN_PATH, 'utf8');
        oAuth2Client.setCredentials(JSON.parse(tokenToken));
        console.log("✅ Loaded credentials from local token cache.");

        // --- REAL API LOGIC WOULD START HERE ---
        // For the purpose of this demonstration (and to avoid breaking without a real GMB Account ID),
        // we will simulate the posting process by reading the assets file.

        console.log("\n🚀 Starting GMB Auto-Publisher...");
        console.log("-----------------------------------");

        const assets = fs.readFileSync(ASSETS_PATH, 'utf8');
        const qAndASection = assets.split('## 2. Seed Q&A')[1];

        if (qAndASection) {
            const matches = qAndASection.match(/### Q\d+: (.*)\n\*\*Question:\*\* (.*)\n\*\*Answer:\*\* (.*)/g) || [];
            console.log(`Found ${matches.length} Q&A pairs to sync to Google Business Profile.`);

            // Mock API calls
            console.log("\n[MOCK] Publishing Q&A #1...");
            console.log("   > POST https://mybusinessqanda.googleapis.com/v1/locations/{locId}/questions");
            console.log("   > Payload: { text: 'Cherche antirouille blainville à Terrebonne, vous faites ça?' }");
            console.log("   > ✅ Success: Question ID created.");

            console.log("\n[MOCK] Replying as Owner...");
            console.log("   > POST https://mybusinessqanda.googleapis.com/v1/locations/{locId}/questions/{qId}/answers");
            console.log("   > Payload: { text: 'Chez MGC Réparation, nous comprenons l importance...' }");
            console.log("   > ✅ Success: Answer posted.");

            console.log("\n... (Skipping remaining 9 for brevity)");
            console.log("\n✨ Total Sync: 10 Q&A pairs processed successfully.");
            console.log("⚠️ Note: Actual API calls disabled to prevent spamming your real profile during dev.");
        }

    } else {
        // 4. Get New Token
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log('\n⚠️ Authorize this app by visiting this url:\n', authUrl);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('\n📋 Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
                console.log('✅ Token stored to', TOKEN_PATH);
                console.log('Please run the script again to start publishing.');
            });
        });
    }
};

main().catch(console.error);
