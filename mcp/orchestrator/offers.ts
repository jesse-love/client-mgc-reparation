import axios from "axios";

export interface Offer {
    id: string;
    name: string;
    cta: string;
    subtitle: string;
    urgency: string;
    value: string;
    service?: string;
    city?: string;
}

export class OfferCommander {
    private listId = "901708780870";
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async getOffers(): Promise<Offer[]> {
        const response = await axios.get(
            `https://api.clickup.com/api/v2/list/${this.listId}/task`,
            { headers: { Authorization: this.token } }
        );

        return response.data.tasks.map((task: any) => {
            const getFieldValue = (name: string) => {
                const field = task.custom_fields.find((f: any) => f.name.toLowerCase() === name.toLowerCase());
                return field?.value;
            };

            return {
                id: task.id,
                name: task.name,
                cta: getFieldValue("CTA Text") || "",
                subtitle: getFieldValue("Subtitle") || "",
                urgency: getFieldValue("Urgency") || "",
                value: getFieldValue("Value") || "",
                // Extended logic to "guess" service/city if fields are missing
                service: getFieldValue("Service Category") || task.name + " " + (getFieldValue("Subtitle") || ""),
                city: getFieldValue("City") || task.name + " " + (getFieldValue("Subtitle") || "")
            };
        });
    }

    async matchOffer(service: string, city: string): Promise<Offer | null> {
        const offers = await this.getOffers();

        // Normalize search terms
        const s = service.toLowerCase();
        const c = city.toLowerCase();

        // 1. Filter by city if possible
        const cityOffers = offers.filter(o => o.city?.toLowerCase().includes(c));
        const pool = cityOffers.length > 0 ? cityOffers : offers;

        // 2. Filter by service
        const serviceMatch = pool.find(o => o.service?.toLowerCase().includes(s));
        if (serviceMatch) return serviceMatch;

        // 3. Fallback to first available offer in city, then first overall
        return pool[0] || offers[0] || null;
    }
}
