declare global {
    interface Window {
        dataLayer: any[];
    }
}

export const pushToDataLayer = (event: string, data: Record<string, any> = {}) => {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event,
            ...data,
            timestamp: new Date().toISOString()
        });
    }
};

export const AnalyticsEvents = {
    GENERATE_LEAD: 'generate_lead',
    CONTACT_CLICK: 'contact_click',
    VIEW_ITEM: 'view_item'
};
