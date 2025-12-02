export interface OfferContent {
    id: string; // e.g., 'alex', 'sophie', 'martin'
    title: string;
    subtitle: string;
    value: string;
    description: string;
    urgencyText: string;
    badgeText: string;
    ctaText: string;
    disclaimer: string;
    active: boolean;
    cards: {
        card1: { title: string; description: string };
        card2: { title: string; description: string };
        card3: { title: string; description: string };
    };
}

export interface BusinessContent {
    phone: string;
    email: string;
    address: string;
    hoursMondayFriday: string;
    hoursSaturday: string;
    hoursSunday: string;
    promoBannerText: string;
    promoBannerActive: boolean;
}

export interface CMSContent {
    offers: Record<string, OfferContent>;
    business: BusinessContent;
    isLoading: boolean;
    error: string | null;
}
