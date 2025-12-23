
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" }); // Adjust path to root .env

const GHL_API_BASE = "https://services.leadconnectorhq.com";

// Re-using the GHLClient logic from index.ts for the script
class GHLClient {
    private apiKey: string;
    constructor(apiKey: string) { this.apiKey = apiKey; }

    private get headers() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
        };
    }

    async createCustomValue(locationId: string, data: { name: string, value: string }) {
        console.log(`Creating Custom Value: ${data.name}...`);
        try {
            const response = await axios.post(`${GHL_API_BASE}/locations/${locationId}/customValues`, data, { headers: this.headers });
            console.log(`✅ Created: ${data.name}`);
            return response.data;
        } catch (error: any) {
            console.error(`❌ Failed ${data.name}:`, error.response?.data || error.message);
        }
    }

    async createCalendarGroup(locationId: string, data: { name: string, slug: string, description?: string }) {
        console.log(`Creating Calendar Group: ${data.name}...`);
        try {
            const response = await axios.post(`${GHL_API_BASE}/calendars/groups`, { ...data, locationId }, { headers: this.headers });
            // DEBUG: Log full response to find the ID
            console.log(`DEBUG Group Response:`, JSON.stringify(response.data));
            return response.data;
        } catch (error: any) {
            console.error(`❌ Failed Group ${data.name}:`, error.response?.data || error.message);
        }
    }

    async deleteCalendarGroup(locationId: string, groupId: string) {
        console.log(`Deleting Group ${groupId}...`);
        try {
            await axios.delete(`${GHL_API_BASE}/calendars/groups/${groupId}`, { headers: this.headers, params: { locationId } });
            console.log(`✅ Deleted Group ${groupId}`);
        } catch (error: any) {
            console.error(`❌ Failed to delete group ${groupId}:`, error.message);
        }
    }

    async listCalendarGroups(locationId: string) {
        try {
            const response = await axios.get(`${GHL_API_BASE}/calendars/groups`, { params: { locationId }, headers: this.headers });
            return response.data.groups || [];
        } catch (error) {
            return [];
        }
    }

    async createCalendar(locationId: string, data: any) {
        console.log(`Creating Calendar: ${data.name}...`);
        try {
            // FIX: Service calendars often live at /calendars/services
            // Also ensure we pass the correct calendarType if needed
            const payload = { ...data, calendarType: 'service', locationId };
            const response = await axios.post(`${GHL_API_BASE}/calendars/services`, payload, { headers: this.headers });
            console.log(`✅ Created Calendar: ${data.name}`);
            return response.data;
        } catch (error: any) {
            // Fallback: try standard /calendars if /services fails, or log specific 404
            if (error.response?.status === 404) {
                console.error(`❌ Endpoint /calendars/services not found. Trying /calendars again with different payload...`);
            }
            console.error(`❌ Failed Calendar ${data.name}:`, error.response?.data || error.message);
        }
    }

    async listUsers(locationId: string) {
        console.log(`Fetching Users...`);
        try {
            // GHL usually returns users wrapped in { users: [...] }
            const response = await axios.get(`${GHL_API_BASE}/users/`, {
                params: { locationId },
                headers: this.headers
            });
            return response.data.users || [];
        } catch (error: any) {
            console.error(`❌ Failed to list users:`, error.response?.data || error.message);
            return [];
        }
    }

    async updateUserSignature(userId: string, signature: string) {
        console.log(`Updating Signature for User ${userId}...`);
        try {
            // TRY: Wrapping in 'user' object if root level fails
            // Some APIs require PUT /users/{id} with body { user: { signature: ... } }
            // Some might not verify signature updates via API at all.
            const response = await axios.put(`${GHL_API_BASE}/users/${userId}`, {
                signature: signature
            }, { headers: this.headers });
            console.log(`✅ Updated Signature for ${userId}`);
            return response.data;
        } catch (error: any) {
            console.error(`❌ Failed to update user ${userId} (Signature might be read-only via API):`, error.response?.data || error.message);
        }
    }
}

async function run() {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
        console.error("Missing credentials");
        process.exit(1);
    }

    const ghl = new GHLClient(apiKey);
    console.log("🚀 Starting Vibrant Rebuild...");

    // Step 0: DELETE ALL EXISTING GROUPS
    const existingGroups = await ghl.listCalendarGroups(locationId);
    for (const group of existingGroups) {
        await ghl.deleteCalendarGroup(locationId, group.id);
    }

    // Step 1: Create VIBRANT Group
    const group = await ghl.createCalendarGroup(locationId, {
        name: "L'Atelier de Performance MGC", // Vibrant Name
        slug: "atelier-performance",
        description: "Expertise mécanique. Passion automobile. Votre véhicule mérite ce qu'il y a de mieux."
    });

    const groupId = group?.id || group?.group?.id;

    if (groupId) {
        console.log(`Using New Group ID: ${groupId}`);
        // Note: Calendars are still manual due to API limits, but we log the PLAN here
        console.log("⚠️ Ready for Manual Calendar Creation (with Vibrant Copy):");
        console.log("1. 'Pit Stop Pneus' (Was: Changement de Pneus)");
        console.log("2. 'Mécanique de Précision' (Was: Mécanique Générale)");
        console.log("3. 'Vitalité Moteur' (Was: Entretien Huile)");
        console.log("4. 'Diagnostic Expert' (Was: Inspection)");
    } else {
        console.error("❌ Failed to create new group.");
    }

    console.log("🏁 Vibrant Rebuild Prep Complete.");
}

run();
