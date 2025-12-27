import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const testCreate = async () => {
    console.log('🧪 Testing GHL Create Permissions...');

    // Try creating a simple calendar
    try {
        const calendarData = {
            name: '[TEST] Calvaire',
            locationId: LOCATION_ID,
            eventType: 'RoundRobin_OptimizeForAvailability',
            widgetSlug: 'test-cal-french-' + Date.now(),
            calendarType: 'service_booking'
        };
        const resp = await axios.post(`https://services.leadconnectorhq.com/calendars/`, calendarData, {
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
            }
        });
        console.log('✅ Calendar Create: SUCCESS');
    } catch (err) {
        console.error('❌ Calendar Create: FAILED');
        console.error('Error:', err.response?.data || err.message);
    }
};

testCreate();
