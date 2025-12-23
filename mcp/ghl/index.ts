import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import axios from "axios";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

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

    // --- CRM / Contacts ---
    async createContact(data: any) {
        const response = await axios.post(`${GHL_API_BASE}/contacts/`, data, { headers: this.headers });
        return response.data;
    }

    async listPipelines(locationId: string) {
        const response = await axios.get(`${GHL_API_BASE}/opportunities/pipelines`, {
            params: { locationId },
            headers: this.headers,
        });
        return response.data;
    }

    // --- Calendars ---
    async createCalendarGroup(locationId: string, data: any) {
        // NOTE: GHL API V2 uses specific endpoints for groups.
        const response = await axios.post(`${GHL_API_BASE}/calendars/groups`, { ...data, locationId }, { headers: this.headers });
        return response.data;
    }

    async createCalendar(locationId: string, data: any) {
        const response = await axios.post(`${GHL_API_BASE}/calendars`, { ...data, locationId }, { headers: this.headers });
        return response.data;
    }

    async deleteCalendarGroup(locationId: string, groupId: string) {
        console.log(`Deleting Calendar Group: ${groupId}...`);
        const response = await axios.delete(`${GHL_API_BASE}/calendars/groups/${groupId}`, {
            headers: this.headers,
            params: { locationId } // Some GHL delete endpoints need this
        });
        return response.data;
    }

    // --- Custom Values ---
    async createCustomValue(locationId: string, data: any) {
        const response = await axios.post(`${GHL_API_BASE}/locations/${locationId}/customValues`, data, { headers: this.headers });
        return response.data;
    }

    // --- Users (Staff) ---
    async listUsers(locationId: string) {
        const response = await axios.get(`${GHL_API_BASE}/users/`, {
            params: { locationId },
            headers: this.headers
        });
        return response.data;
    }

    async updateUser(userId: string, data: any) {
        // Requires User-Level Scope or Location Admin Scope
        const response = await axios.put(`${GHL_API_BASE}/users/${userId}`, data, { headers: this.headers });
        return response.data;
    }

    // --- Reviews (GMB Automation) ---
    async getReviews(locationId: string) {
        // GHL V2 Reviews Endpoint (approximated based on docs)
        const response = await axios.get(`${GHL_API_BASE}/conversations/search`, {
            params: { locationId, type: 'review' }, // Often reviews are part of conversations/reviews stream
            headers: this.headers
        });
        // Fallback/Correction: Dedicated Review Endpoint if available in V2
        // If not standard, we might need /locations/{id}/reviews. 
        // For now, using standard list endpoint pattern.
        return response.data;
    }

    async replyToReview(reviewId: string, reply: string) {
        // This typically goes through the conversation/reply endpoint in GHL
        const response = await axios.post(`${GHL_API_BASE}/conversations/messages`, {
            type: 'Email', // or ReviewReply specific type if supported
            messageType: 'Review',
            conversationId: reviewId, // Review ID often maps to conversation ID
            message: reply
        }, { headers: this.headers });
        return response.data;
    }
}

const ghl = new GHLClient(process.env.GHL_API_KEY || "");
const locationId = process.env.GHL_LOCATION_ID;

const server = new Server(
    { name: "ghl-mcp-server", version: "0.4.0" },
    { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "create_french_contact",
            description: "Create a contact in GHL with French tags",
            inputSchema: {
                type: "object",
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    serviceTag: {
                        type: "string",
                        enum: ["mecanique", "freins", "pneus", "camion_lourd", "generatrice", "soudure"],
                        description: "Service category for French tagging (ppl_lead_*)"
                    },
                },
                required: ["firstName", "phone", "serviceTag"],
            },
        },
        {
            name: "create_calendar_group",
            description: "Create a calendar group (e.g. Services Atelier)",
            inputSchema: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    slug: { type: "string" },
                    description: { type: "string" }
                },
                required: ["name", "slug"]
            }
        },
        {
            name: "delete_calendar_group",
            description: "Delete a calendar group by ID",
            inputSchema: {
                type: "object",
                properties: {
                    groupId: { type: "string" }
                },
                required: ["groupId"]
            }
        },
        {
            name: "create_calendar",
            description: "Create a new service calendar with specific capacity",
            inputSchema: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    groupId: { type: "string" },
                    slug: { type: "string" },
                    slotDuration: { type: "number" },
                    slotInterval: { type: "number" },
                    maxBookingsPerSlot: { type: "number", description: "Capacity (Seats per slot)" }
                },
                required: ["name", "groupId", "slug", "slotDuration", "maxBookingsPerSlot"]
            }
        },
        {
            name: "create_custom_value",
            description: "Create a global custom value variable",
            inputSchema: {
                type: "object",
                properties: {
                    name: { type: "string", description: "The key name (e.g. shop_phone)" },
                    value: { type: "string", description: "The value (e.g. 514-609-4141)" }
                },
                required: ["name", "value"]
            }
        },
        {
            name: "get_users",
            description: "List all staff users to find IDs for signatures",
            inputSchema: { type: "object", properties: {} }
        },
        {
            name: "update_user_signature",
            description: "Update a user's HTML signature",
            inputSchema: {
                type: "object",
                properties: {
                    userId: { type: "string" },
                    signatureHtml: { type: "string" }
                },
                required: ["userId", "signatureHtml"]
            }
        }
    ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "create_french_contact": {
                const { firstName, lastName, email, phone, serviceTag } = args as any;
                const result = await ghl.createContact({
                    firstName, lastName, email, phone, locationId,
                    tags: [`ppl_lead_${serviceTag}`]
                });
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            }
            case "create_calendar_group": {
                const result = await ghl.createCalendarGroup(locationId!, args);
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            }
            case "delete_calendar_group": {
                const { groupId } = args as any;
                const result = await ghl.deleteCalendarGroup(locationId!, groupId);
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            }
            case "create_calendar": {
                const result = await ghl.createCalendar(locationId!, args);
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            }
            case "create_custom_value": {
                const result = await ghl.createCustomValue(locationId!, args);
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            }
            case "get_users": {
                const result = await ghl.listUsers(locationId!);
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            }
            case "update_user_signature": {
                const { userId, signatureHtml } = args as any;
                const result = await ghl.updateUser(userId, { signature: signatureHtml });
                return { content: [{ type: "text", text: JSON.stringify(result) }] };
            }
            default:
                throw new Error(`Tool not found: ${name}`);
        }
    } catch (error: any) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
});

const transport = new StdioServerTransport();
await server.connect(transport);
