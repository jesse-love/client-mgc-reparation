import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CMSContent, OfferContent, BusinessContent } from '../types/Content';
import { translations } from '../i18n';
import { useLanguage } from './LanguageContext';

const ContentContext = createContext<CMSContent | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { language } = useLanguage();
    const t = translations[language];

    // Synchronously derive content from i18n
    // No async fetching, no loading state, no white screen.
    const content: CMSContent = {
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
        isLoading: false,
        error: null
    };

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
