
export interface FAQContent {
    slug: string;
    keyword: string;
    question: string;
    answer: string;
    category: string;
    relatedServices?: string[];
    localData?: {
        city: string;
        landmark?: string;
    };
}

export interface FAQPageProps {
    content: FAQContent;
}
