import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import { OfferCommander } from "../orchestrator/offers.js";

const CLICKUP_API_BASE = "https://api.clickup.com/api/v2";

class ClickUpClient {
    private token: string;
    constructor(token: string) { this.token = token; }
    private get headers() { return { Authorization: this.token, "Content-Type": "application/json" }; }

    async getSpaceLists(spaceId: string) {
        const response = await axios.get(`${CLICKUP_API_BASE}/space/${spaceId}/list`, { headers: this.headers });
        return response.data;
    }

    async getListTasks(listId: string) {
        const response = await axios.get(`${CLICKUP_API_BASE}/list/${listId}/task`, { headers: this.headers });
        return response.data;
    }

    async createTask(listId: string, data: any) {
        const response = await axios.post(`${CLICKUP_API_BASE}/list/${listId}/task`, data, { headers: this.headers });
        return response.data;
    }
}

const clickup = new ClickUpClient(process.env.CLICKUP_API_TOKEN || "");
const offerCommander = new OfferCommander(process.env.CLICKUP_API_TOKEN || "");
const SPACE_ID = "90172883043";

const server = new Server(
    { name: "clickup-mcp-server", version: "0.3.0" },
    { capabilities: { tools: {} } }
);

server.onRequest(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "get_best_offer",
            description: "Match the best offer for a specific service and city",
            inputSchema: {
                type: "object",
                properties: {
                    service: { type: "string" },
                    city: { type: "string" },
                },
                required: ["service", "city"],
            },
        },
        {
            name: "list_mgc_lists",
            description: "List all lists available in the MGC Rèparation space",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_list_tasks",
            description: "Get tasks from a specific list",
            inputSchema: {
                type: "object",
                properties: {
                    listId: { type: "string" },
                },
                required: ["listId"],
            },
        },
        {
            name: "create_task_in_list",
            description: "Create a task in a specific MGC list",
            inputSchema: {
                type: "object",
                properties: {
                    listId: { type: "string" },
                    name: { type: "string" },
                    description: { type: "string" },
                },
                required: ["listId", "name"],
            },
        }
    ],
}));

server.onRequest(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "get_best_offer": {
                const { service, city } = args as any;
                const offer = await offerCommander.matchOffer(service, city);
                return { content: [{ type: "text", text: JSON.stringify(offer) }] };
            }
            case "list_mgc_lists":
                const lists = await clickup.getSpaceLists(SPACE_ID);
                return { content: [{ type: "text", text: JSON.stringify(lists) }] };
            case "get_list_tasks":
                const tasks = await clickup.getListTasks((args as any).listId);
                return { content: [{ type: "text", text: JSON.stringify(tasks) }] };
            case "create_task_in_list":
                const { listId, ...taskData } = args as any;
                const result = await clickup.createTask(listId, taskData);
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            default:
                throw new Error(`Tool not found: ${name}`);
        }
    } catch (error: any) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
});

const transport = new StdioServerTransport();
await server.connect(transport);
