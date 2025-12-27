
import React, { useEffect } from 'react';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import { useLanguage } from '../contexts/LanguageContext';
import type { Service } from '../types';

interface SchemaManagerProps {
    pageType: 'HomePage' | 'ServiceDetailPage' | 'Generic';
    service?: Service;
}

// --- SchemaManager for JSON-LD ---

// --- Helper Functions ---

const parseAddress = (fullAddress: string) => {
    // Example: 1287 Chem. de la Côte Georges, Mascouche, QC J7K 3C3
    const parts = fullAddress.split(', ');
    if (parts.length < 3) return {};

    const streetAddress = parts[0];
    const addressLocality = parts[1];
    const regionAndPostal = parts[2].split(' ');

    const addressRegion = regionAndPostal.length > 1 ? regionAndPostal[0] : '';
    const postalCode = regionAndPostal.length > 1 ? regionAndPostal.slice(1).join(' ') : '';

    return {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry: 'CA'
    };
};

const formatOpeningHours = (hoursLines: { en: string; fr: string }[]) => {
    const dayMap: { [key: string]: string } = {
        'monday': 'Mo', 'tuesday': 'Tu', 'wednesday': 'We', 'thursday': 'Th',
        'friday': 'Fr', 'saturday': 'Sa', 'sunday': 'Su',
    };

    return hoursLines.map(line => {
        const [day, hours] = line.en.toLowerCase().split(': ');
        if (hours === 'closed' || !dayMap[day]) return null;

        const [start, end] = hours.split(' - ');

        const formatTime = (time: string) => {
            let [hour, minutePart] = time.split(':');
            const period = minutePart.slice(-2);
            const minute = minutePart.slice(0, 2);
            let hour24 = parseInt(hour, 10);
            if (period.toLowerCase() === 'pm' && hour24 !== 12) {
                hour24 += 12;
            }
            if (period.toLowerCase() === 'am' && hour24 === 12) {
                hour24 = 0;
            }
            return `${String(hour24).padStart(2, '0')}:${minute}`;
        };

        return `${dayMap[day]} ${formatTime(start)}-${formatTime(end)}`;
    }).filter(Boolean).join(',');
};

const calculateAggregateRating = (reviews: any[]) => {
    if (reviews.length === 0) return null;
    const ratingMap: { [key: string]: number } = { 'ONE': 1, 'TWO': 2, 'THREE': 3, 'FOUR': 4, 'FIVE': 5 };

    const validReviews = reviews.filter(r => ratingMap[r.starRating]);
    if (validReviews.length === 0) return null;

    const total = validReviews.reduce((acc, r) => acc + ratingMap[r.starRating], 0);
    const average = (total / validReviews.length).toFixed(2);

    return {
        '@type': 'AggregateRating',
        ratingValue: average,
        reviewCount: validReviews.length
    };
};


const SchemaManager: React.FC<SchemaManagerProps> = ({ pageType, service }) => {
    const businessInfo = useBusinessInfo();
    const { t, language } = useLanguage();

    useEffect(() => {
        if (businessInfo.isLoading || businessInfo.error) {
            return;
        }

        const ratingMap: { [key: string]: number } = { 'ONE': 1, 'TWO': 2, 'THREE': 3, 'FOUR': 4, 'FIVE': 5 };
        const websiteUrl = window.location.origin;

        const graph = [];

        // 1. Base AutoRepair Schema
        const autoRepairSchema = {
            '@type': 'AutoRepair',
            '@id': `${websiteUrl}/#organization`,
            name: businessInfo.name,
            image: `${websiteUrl}/assets/shop-exterior.jpg`, // A representative image
            url: websiteUrl,
            telephone: businessInfo.phone,
            priceRange: '$$',
            address: parseAddress(businessInfo.address),
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.716335,
                longitude: -73.619013
            },
            openingHoursSpecification: formatOpeningHours(businessInfo.operatingHours),
            aggregateRating: calculateAggregateRating(businessInfo.reviews),
            review: businessInfo.reviews
                .filter(r => r.comment && ratingMap[r.starRating])
                .slice(0, 5) // Limit to 5 most recent for performance
                .map(r => ({
                    '@type': 'Review',
                    author: { '@type': 'Person', name: r.reviewer.displayName },
                    datePublished: r.createTime.split('T')[0],
                    reviewBody: r.comment,
                    reviewRating: {
                        '@type': 'Rating',
                        ratingValue: ratingMap[r.starRating]
                    }
                })),
        };
        graph.push(autoRepairSchema);

        // 2. Page-specific Schema
        if (pageType === 'HomePage' && t.home.faq?.questions) {
            graph.push({
                '@type': 'FAQPage',
                mainEntity: t.home.faq.questions.map(q => ({
                    '@type': 'Question',
                    name: q.question.en, // Use one language consistently for crawlers
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: q.answer.en
                    }
                }))
            });
        }

        if (pageType === 'ServiceDetailPage' && service) {
            graph.push({
                '@type': 'Service',
                serviceType: service.title.en,
                description: service.shortDescription.en,
                provider: {
                    '@id': `${websiteUrl}/#organization`
                },
                areaServed: {
                    '@type': 'City',
                    name: 'Mascouche'
                }
            });
        }

        // 3. Breadcrumb Schema
        const breadcrumbs = {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: t.breadcrumbs.home,
                    item: websiteUrl
                }
            ]
        };

        if (pageType === 'Generic' || pageType === 'ServiceDetailPage') {
            const pathParts = window.location.pathname.split('/').filter(Boolean);

            // Example: /about -> Home > About
            // Example: /services/freins -> Home > Services > Freins

            let currentPath = websiteUrl;
            pathParts.forEach((part, index) => {
                currentPath += `/${part}`;
                // Simple capitalization for name fallback
                let name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');

                // Try to find better name if service
                if (index === 0 && part === 'services') name = t.breadcrumbs.services;
                if (index === 1 && service) name = service.title[language];

                // Don't duplicate Home if path is empty (root)
                breadcrumbs.itemListElement.push({
                    '@type': 'ListItem',
                    position: index + 2,
                    name: name, // This property name must be compatible with ListItem schema
                    item: currentPath
                });
            });
        }
        graph.push(breadcrumbs);

        const schema = {
            '@context': 'https://schema.org',
            '@graph': graph
        };

        // Inject script tag
        const scriptId = 'app-schema-ld-json';
        let scriptTag = document.getElementById(scriptId);
        if (!scriptTag) {
            // FIX: Create a new constant for the script tag to ensure correct type inference by TypeScript.
            // This resolves the error where `type` was not considered a valid property on the broadly-typed `scriptTag` variable.
            const newScriptTag = document.createElement('script');
            newScriptTag.id = scriptId;
            newScriptTag.type = 'application/ld+json';
            document.head.appendChild(newScriptTag);
            scriptTag = newScriptTag;
        }
        scriptTag.textContent = JSON.stringify(schema);

        // Cleanup on unmount
        return () => {
            const script = document.getElementById(scriptId);
            if (script) {
                script.remove();
            }
        };

    }, [businessInfo, pageType, service, t]);

    return null;
};

export default SchemaManager;