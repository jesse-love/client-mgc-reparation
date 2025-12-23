
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const CLICKUP_API_BASE = "https://api.clickup.com/api/v2";
const SPACE_ID = "90172883043";

class ClickUpMirror {
    private token: string;
    constructor(token: string) { this.token = token; }
    private get headers() { return { Authorization: this.token, "Content-Type": "application/json" }; }

    async findOperationsList() {
        console.log("🔍 Searching for Operations List...");
        try {
            const response = await axios.get(`${CLICKUP_API_BASE}/space/${SPACE_ID}/list`, { headers: this.headers });
            const lists = response.data.lists;
            // Look for a list named "Operations" or "MGC Operations"
            const opList = lists.find((l: any) => l.name.toLowerCase().includes("operation"));
            if (opList) {
                console.log(`✅ Found List: ${opList.name} (${opList.id})`);
                return opList.id;
            }
            console.error("❌ Operations list not found.");
            return null;
        } catch (error: any) {
            console.error("❌ Failed to lists:", error.message);
            return null;
        }
    }

    async createTask(listId: string, name: string, description: string, status: string | null = null, parentId: string | null = null) {
        console.log(`📝 Creating Task: ${name}...`);
        try {
            const payload: any = {
                name,
                description,
                // status, // Omit status to force default
                // parent: parentId // Some API versions use 'parent' ID here, but...
            };
            if (status) payload.status = status;
            if (parentId) payload.parent = parentId;

            // Important: ClickUp often creates subtasks via POST /list/:list_id/task but with parent query param or body
            // Let's try standard Create Task first. If parentId is present, we might need a different structure.

            const response = await axios.post(`${CLICKUP_API_BASE}/list/${listId}/task`, payload, { headers: this.headers });
            console.log(`✅ Created Task ID: ${response.data.id}`);
            return response.data;
        } catch (error: any) {
            // 400 bad request usually means invalid status or missing field
            console.error(`❌ Failed to create task ${name}:`, error.response?.data || error.message);
        }
    }
}

async function run() {
    const token = process.env.CLICKUP_API_TOKEN;
    if (!token) {
        console.error("Missing CLICKUP_API_TOKEN");
        process.exit(1);
    }

    const mirror = new ClickUpMirror(token);
    const listId = await mirror.findOperationsList();

    if (listId) {
        // Parent Task
        const parent = await mirror.createTask(listId, "Implement GHL Enterprise Infrastructure", "Blueprints, Calendars, Signatures, Capacity Engine", "in progress");

        if (parent && parent.id) {
            console.log(`🔗 Creating Subtasks for Parent ${parent.id}...`);

            // Note: 'complete' status might not exist in this list. Using 'to do' (default) or 'closed' (often standard)
            // Safer to create as 'to do' and let user close them, or try 'closed'.
            // Let's use 'to do' for safety to ensure they get created, then user can tick them off.

            // 1. MCP Upgrade
            await mirror.createTask(listId, "Upgrade GHL MCP with Admin Tools", "Added tools.", null, parent.id);

            // 2. System Build
            await mirror.createTask(listId, "Execute System Build (Hybrid)", "Automated Vibrant Group. Manual Calendars.", null, parent.id);

            // 3. Voice & Tracking
            await mirror.createTask(listId, "Configure Voice & Tracking", "Whisper enabled.", null, parent.id);

            console.log("🏁 Mirroring Complete.");
        }
    }
}

run();
