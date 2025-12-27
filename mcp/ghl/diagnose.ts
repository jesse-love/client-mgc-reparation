
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const GHL_API_BASE = "https://services.leadconnectorhq.com";

class GHLDiagnostic {
    private apiKey: string;
    constructor(apiKey: string) { this.apiKey = apiKey; }

    private get headers() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
        };
    }

    async inspectUser(locationId: string) {
        console.log(`\n🔍 Inspecting Users...`);
        try {
            const response = await axios.get(`${GHL_API_BASE}/users/`, {
                params: { locationId },
                headers: this.headers
            });
            if (response.data.users && response.data.users.length > 0) {
                const user = response.data.users[0];
                console.log(`✅ User Object Keys:`, Object.keys(user));
                console.log(`✅ Sample User (Partial):`, JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    signature: user.signature,
                    emailSignature: user.emailSignature,
                    roles: user.roles
                }, null, 2));
            } else {
                console.log("⚠️ No users found.");
            }
        } catch (error: any) {
            console.error(`❌ List Users Failed:`, error.response?.data || error.message);
        }
    }

    async inspectCalendars(locationId: string) {
        console.log(`\n🔍 Inspecting Calendars...`);
        try {
            const response = await axios.get(`${GHL_API_BASE}/calendars/`, {
                params: { locationId },
                headers: this.headers
            });
            if (response.data.calendars && response.data.calendars.length > 0) {
                console.log(`✅ Found ${response.data.calendars.length} calendars.`);
                console.log(`✅ Sample Calendar:`, JSON.stringify(response.data.calendars[0], null, 2));
            } else {
                console.log("⚠️ No calendars found (expected if we haven't created any).");
            }
        } catch (error: any) {
            console.error(`❌ List Calendars Failed:`, error.response?.data || error.message);
        }
    }

    async inspectGroups(locationId: string) {
        console.log(`\n🔍 Inspecting Calendar Groups...`);
        try {
            const response = await axios.get(`${GHL_API_BASE}/calendars/groups`, {
                params: { locationId },
                headers: this.headers
            });
            console.log(`✅ Groups Response:`, JSON.stringify(response.data, null, 2));
        } catch (error: any) {
            console.error(`❌ List Groups Failed:`, error.response?.data || error.message);
        }
    }
}

async function run() {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
        console.error("Missing credentials.");
        process.exit(1);
    }

    const diag = new GHLDiagnostic(apiKey);
    await diag.inspectUser(locationId);
    await diag.inspectGroups(locationId);
    await diag.inspectCalendars(locationId);
}

run();
