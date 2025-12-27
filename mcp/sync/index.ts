import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

// Load env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.SYNC_PORT || 3000;

app.use(bodyParser.json());

// ENV CHECK
const CLICKUP_TOKEN = process.env.CLICKUP_API_TOKEN;
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

// HARDCODED FOR MVP (Dynamic later)
const CLICKUP_LIST_ID = "901708679573"; // Operations List

if (!CLICKUP_TOKEN || !GHL_API_KEY) {
    console.error("❌ CRITICAL: Missing API Tokens in .env");
    process.exit(1);
}

// --- HELPERS ---

async function createClickUpTask(data: any) {
    const { contact_name, contact_phone, contact_email, vehicle_info, opportunity_value } = data;

    // Format Description
    const description = `
**Client**: ${contact_name}
**Phone**: ${contact_phone}
**Email**: ${contact_email}

**Vehicle/Service**:
${vehicle_info || "Standard Service"}

**Value**: $${opportunity_value || 0}
    `;

    try {
        const response = await axios.post(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
            name: `${contact_name} - ${vehicle_info || "Service"}`,
            description: description,
            status: "to do", // Default status
            priority: 3, // Normal
        }, {
            headers: {
                'Authorization': CLICKUP_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        console.log(`✅ ClickUp Task Created: ${response.data.id}`);
        return response.data;
    } catch (error: any) {
        console.error(`❌ ClickUp Error:`, error.response?.data || error.message);
        throw error;
    }
}

// --- ROUTES ---

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'active', service: 'MGC Sync Service' });
});

/**
 * WEBHOOK: GHL -> CLICKUP
 * Trigger: Opportunity Status Changed to "Won" or Tag Added "Booked"
 */
app.post('/ghl/opportunity-won', async (req: Request, res: Response) => {
    console.log("🔔 Webhook Received: GHL Opportunity Won");
    const payload = req.body;

    // Basic Validation (GHL Webhooks structure varies, assuming flat payload or 'contact' object)
    // Adjust based on actual GHL Webhook payload inspection
    const contactData = {
        contact_name: payload.contact_name || payload.name || `${payload.first_name} ${payload.last_name}`,
        contact_phone: payload.phone || payload.contact_phone,
        contact_email: payload.email || payload.contact_email,
        vehicle_info: payload.customData?.vehicle_model || payload.notes || "No vehicle info",
        opportunity_value: payload.value || payload.monetary_value
    };

    try {
        await createClickUpTask(contactData);
        res.status(200).json({ success: true, message: "Sync processed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Sync failed" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 MGC Sync Service running on port ${PORT}`);
    console.log(`🔗 Webhook URL: http://localhost:${PORT}/ghl/opportunity-won`);
});
