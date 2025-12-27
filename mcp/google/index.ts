import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { google } from "googleapis";
import { VertexAI } from "@google-cloud/vertexai";
import path from "path";

const KEY_FILE = path.join(process.cwd(), 'gcloud-key.json');

const server = new Server(
    { name: "google-mcp-server", version: "0.2.0" },
    { capabilities: { tools: {} } }
);

server.onRequest(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "get_search_analytics",
            description: "Get search queries and performance data from Google Search Console",
            inputSchema: {
                type: "object",
                properties: {
                    siteUrl: { type: "string", description: "The URL of the site (e.g., https://mgcreparation.ca/)" },
                    startDate: { type: "string", description: "YYYY-MM-DD" },
                    endDate: { type: "string", description: "YYYY-MM-DD" },
                    dimensions: { type: "array", items: { type: "string" }, description: "e.g., ['query', 'page', 'device']" }
                },
                required: ["siteUrl", "startDate", "endDate"],
            },
        },
        {
            name: "list_sc_sites",
            description: "List all sites the service account has access to in Search Console",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "vertex_ai_generate",
            description: "Generate strategic insights or content using Vertex AI (Gemini)",
            inputSchema: {
                type: "object",
                properties: {
                    prompt: { type: "string" },
                    systemInstruction: { type: "string" },
                },
                required: ["prompt"],
            },
        }
    ],
}));

server.onRequest(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: [
            'https://www.googleapis.com/auth/webmasters.readonly',
            'https://www.googleapis.com/auth/cloud-platform'
        ],
    });

    try {
        switch (name) {
            case "list_sc_sites": {
                const sc = google.searchconsole({ version: 'v1', auth });
                const res = await sc.sites.list();
                return { content: [{ type: "text", text: JSON.stringify(res.data) }] };
            }
            case "get_search_analytics": {
                const { siteUrl, startDate, endDate, dimensions = ['query'] } = args as any;
                const sc = google.searchconsole({ version: 'v1', auth });
                const res = await sc.searchanalytics.query({
                    siteUrl,
                    requestBody: {
                        startDate,
                        endDate,
                        dimensions,
                        rowLimit: 100
                    }
                });
                return { content: [{ type: "text", text: JSON.stringify(res.data) }] };
            }
            case "vertex_ai_generate": {
                const { prompt, systemInstruction } = args as any;
                const project = "gen-lang-client-0992117425";
                const location = "us-central1";
                const vertexAI = new VertexAI({ project, location, keyFilename: KEY_FILE });
                const model = vertexAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const req: any = {
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                };
                if (systemInstruction) {
                    req.systemInstruction = { parts: [{ text: systemInstruction }] };
                }

                const result = await model.generateContent(req);
                const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
                return { content: [{ type: "text", text: responseText }] };
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
