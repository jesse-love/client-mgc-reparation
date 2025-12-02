import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CMSContent, OfferContent, BusinessContent } from '../types/Content';
import { translations } from '../i18n';
import { useLanguage } from './LanguageContext';

const ContentContext = createContext<CMSContent | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { language } = useLanguage();
    const t = translations[language]; // Get current language defaults from i18n

    // Initialize state with i18n defaults immediately
    // This ensures no flicker and robust fallback
    const [content, setContent] = useState<CMSContent>({
        offers: {
            alex: {
                id: 'alex',
                title: t.landingOffer.title,
                subtitle: t.landingOffer.subtitle,
                value: t.landingOffer.value,
                description: t.landingOffer.description,
                urgencyText: t.landingOffer.urgency,
                badgeText: "",
                ctaText: t.landingOffer.cta,
                disclaimer: t.landingOffer.disclaimer,
                active: true,
                cards: {
                    card1: { title: t.landingOffer.cards.trojan.title, description: t.landingOffer.cards.trojan.description },
                    card2: { title: t.landingOffer.cards.credited.title, description: t.landingOffer.cards.credited.description },
                    card3: { title: t.landingOffer.cards.safety.title, description: t.landingOffer.cards.safety.description }
                }
            },
            sophie: {
                id: 'sophie',
                title: t.landingHealthCheck.title,
                subtitle: t.landingHealthCheck.subtitle,
                value: "",
                description: t.landingHealthCheck.description,
                urgencyText: "",
                badgeText: t.landingHealthCheck.badge,
                ctaText: t.landingHealthCheck.cta,
                disclaimer: t.landingHealthCheck.disclaimer,
                active: true,
                cards: {
                    card1: { title: t.landingHealthCheck.cards.scan.title, description: t.landingHealthCheck.cards.scan.description },
                    card2: { title: t.landingHealthCheck.cards.credited.title, description: t.landingHealthCheck.cards.credited.description },
                    card3: { title: t.landingHealthCheck.cards.pressure.title, description: t.landingHealthCheck.cards.pressure.description }
                }
            },
            martin: {
                id: 'martin',
                title: t.landingTires.title,
                subtitle: t.landingTires.subtitle,
                value: "",
                description: t.landingTires.description,
                urgencyText: "",
                badgeText: t.landingTires.badge,
                ctaText: t.landingTires.cta,
                disclaimer: t.landingTires.disclaimer,
                active: true,
                cards: {
                    card1: { title: t.landingTires.cards.install.title, description: t.landingTires.cards.install.description },
                    card2: { title: t.landingTires.cards.check.title, description: t.landingTires.cards.check.description },
                    card3: { title: t.landingTires.cards.fast.title, description: t.landingTires.cards.fast.description }
                }
            }
        },
        business: {
            phone: "514-555-0123",
            email: "info@mgcreparation.com",
            address: "123 Boul. Industriel, Mascouche, QC",
            hoursMondayFriday: "8:00 - 18:00",
            hoursSaturday: "9:00 - 15:00",
            hoursSunday: "Fermé",
            promoBannerText: "",
            promoBannerActive: false
        },
        isLoading: true,
        error: null
    });

    // Effect to update state when language changes (resetting to new defaults)
    // OR fetching new data if we have it. 
    // Ideally, we fetch ONCE, store RAW data, and then derive.
    // For simplicity in this iteration, we will re-fetch or just re-apply defaults.
    // BETTER: Store rawSheetData in a ref or separate state, and derive `content` from `rawSheetData` + `language`.

    const [rawOffers, setRawOffers] = useState<any[] | null>(null);
    const [rawBusiness, setRawBusiness] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

            if (!apiKey || !sheetId) {
                setContent(prev => ({ ...prev, isLoading: false }));
                return;
            }

            try {
                // Fetch "Offers" tab
                // Columns: ID, Title_FR, Title_EN, Subtitle_FR, Subtitle_EN, Value_FR, Value_EN, Desc_FR, Desc_EN, Urgency_FR, Urgency_EN, Badge_FR, Badge_EN, CTA_FR, CTA_EN, Disclaimer_FR, Disclaimer_EN, Active
                const offersResponse = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Offers!A2:Z?key=${apiKey}`
                );
                const offersData = await offersResponse.json();

                // Fetch "Business" tab
                const businessResponse = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Business!A2:C?key=${apiKey}`
                );
                const businessData = await businessResponse.json();

                if (offersData.values) setRawOffers(offersData.values);
                if (businessData.values) setRawBusiness(businessData.values);

                setContent(prev => ({ ...prev, isLoading: false }));

            } catch (err: any) {
                console.error('CMS Fetch Error:', err);
                setContent(prev => ({ ...prev, isLoading: false, error: err.message }));
            }
        };

        fetchContent();
    }, []);

    // Derive content whenever Language OR RawData changes
    useEffect(() => {
        if (!rawOffers && !rawBusiness) {
            // If no raw data, ensure we at least have the correct i18n defaults
            setContent(prev => ({
                ...prev,
                offers: {
                    alex: { ...prev.offers.alex, title: t.landingOffer.title, subtitle: t.landingOffer.subtitle, description: t.landingOffer.description, urgencyText: t.landingOffer.urgency, ctaText: t.landingOffer.cta, disclaimer: t.landingOffer.disclaimer, cards: { card1: { title: t.landingOffer.cards.trojan.title, description: t.landingOffer.cards.trojan.description }, card2: { title: t.landingOffer.cards.credited.title, description: t.landingOffer.cards.credited.description }, card3: { title: t.landingOffer.cards.safety.title, description: t.landingOffer.cards.safety.description } } },
                    sophie: { ...prev.offers.sophie, title: t.landingHealthCheck.title, subtitle: t.landingHealthCheck.subtitle, description: t.landingHealthCheck.description, badgeText: t.landingHealthCheck.badge, ctaText: t.landingHealthCheck.cta, disclaimer: t.landingHealthCheck.disclaimer, cards: { card1: { title: t.landingHealthCheck.cards.scan.title, description: t.landingHealthCheck.cards.scan.description }, card2: { title: t.landingHealthCheck.cards.credited.title, description: t.landingHealthCheck.cards.credited.description }, card3: { title: t.landingHealthCheck.cards.pressure.title, description: t.landingHealthCheck.cards.pressure.description } } },
                    martin: { ...prev.offers.martin, title: t.landingTires.title, subtitle: t.landingTires.subtitle, description: t.landingTires.description, badgeText: t.landingTires.badge, ctaText: t.landingTires.cta, disclaimer: t.landingTires.disclaimer, cards: { card1: { title: t.landingTires.cards.install.title, description: t.landingTires.cards.install.description }, card2: { title: t.landingTires.cards.check.title, description: t.landingTires.cards.check.description }, card3: { title: t.landingTires.cards.fast.title, description: t.landingTires.cards.fast.description } } }
                }
            }));
            return;
        }

        // Helper to pick language (assuming FR is index 0 of pair, EN is index 1)
        // Sheet Columns: 
        // 0:ID, 
        // 1:Title_FR, 2:Title_EN, 
        // 3:Sub_FR, 4:Sub_EN, 
        // 5:Val_FR, 6:Val_EN, 
        // 7:Desc_FR, 8:Desc_EN, 
        // 9:Urg_FR, 10:Urg_EN, 
        // 11:Badge_FR, 12:Badge_EN, 
        // 13:CTA_FR, 14:CTA_EN, 
        // 15:Disc_FR, 16:Disc_EN, 
        // 17:Active
        const isFr = language === 'fr';

        const newOffers = { ...content.offers };

        if (rawOffers) {
            rawOffers.forEach((row: string[]) => {
                const id = row[0];
                if (id && newOffers[id]) {
                    newOffers[id] = {
                        ...newOffers[id],
                        title: (isFr ? row[1] : row[2]) || newOffers[id].title,
                        subtitle: (isFr ? row[3] : row[4]) || newOffers[id].subtitle,
                        value: (isFr ? row[5] : row[6]) || newOffers[id].value,
                        description: (isFr ? row[7] : row[8]) || newOffers[id].description,
                        urgencyText: (isFr ? row[9] : row[10]) || newOffers[id].urgencyText,
                        badgeText: (isFr ? row[11] : row[12]) || newOffers[id].badgeText,
                        ctaText: (isFr ? row[13] : row[14]) || newOffers[id].ctaText,
                        disclaimer: (isFr ? row[15] : row[16]) || newOffers[id].disclaimer,
                        active: row[17] === 'TRUE'
                    };
                }
            });
        }

        setContent(prev => ({ ...prev, offers: newOffers }));

    }, [language, rawOffers, rawBusiness]);

    return (
        <ContentContext.Provider value={content}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = (): CMSContent => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
