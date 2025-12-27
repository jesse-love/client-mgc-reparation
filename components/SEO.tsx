import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
    ogType?: 'website' | 'article' | 'business.business';
    canonical?: string;
    keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    article,
    ogType = 'website',
    canonical,
    keywords
}) => {
    const { language } = useLanguage();

    const siteName = "MGC Réparation";
    const defaultTitle = language === 'fr'
        ? "MGC Réparation | Mécanique Générale & Poids Lourds à Mascouche"
        : "MGC Réparation | General Mechanics & Heavy Vehicles in Mascouche";

    const defaultDescription = language === 'fr'
        ? "Votre garage familial de confiance à Mascouche depuis 2012. Réparations honnêtes et garanties pour autos, camions et génératrices."
        : "Your trusted family-owned shop in Mascouche since 2012. Honest, guaranteed repairs for cars, trucks, and generators.";

    const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
    const seoDescription = description || defaultDescription;

    // Use the generated social hero as default
    const seoImage = image || "https://mgcreparation.ca/mgc_social_hero.png";
    const url = window.location.href;
    const path = window.location.pathname;

    return (
        <Helmet>
            {/* Standard tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Hreflang Tags for Bilingual SEO */}
            <link rel="alternate" href={`https://mgcreparation.ca${path}`} hrefLang={language === 'fr' ? 'fr' : 'en'} />
            <link rel="alternate" href={`https://mgcreparation.ca${path}`} hrefLang="x-default" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={language === 'fr' ? 'fr_CA' : 'en_US'} />
            <meta property="og:locale:alternate" content={language === 'fr' ? 'en_US' : 'fr_CA'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />

            {/* Business specific */}
            {ogType === 'business.business' && (
                <>
                    <meta property="business:contact_data:street_address" content="1287 Chemin de la Côte Georges" />
                    <meta property="business:contact_data:locality" content="Mascouche" />
                    <meta property="business:contact_data:region" content="QC" />
                    <meta property="business:contact_data:postal_code" content="J7L 3P8" />
                    <meta property="business:contact_data:country_name" content="Canada" />
                </>
            )}
        </Helmet>
    );
};

export default SEO;
