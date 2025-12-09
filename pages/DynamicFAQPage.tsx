import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import {
    CheckCircleIcon,
    StarIcon,
    ClockIcon,
    ShieldCheckIcon,
    BoltIcon
} from '@heroicons/react/24/solid';
import { PhoneIcon } from '@heroicons/react/24/outline';
import pseoData from '../data/pseo_content.json';

// --- DESIGN SYSTEM COMPONENTS ---

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mt-12 mb-8 flex items-center gap-3 border-l-4 border-orange-500 pl-4">
        {children}
    </h3>
);

const TextParagraph: React.FC<{ html: string }> = ({ html }) => (
    <div
        className="mb-8 leading-8 text-slate-600 dark:text-slate-300 text-lg font-medium 
        [&_strong]:bg-yellow-200 [&_strong]:dark:bg-yellow-700/50 [&_strong]:text-slate-900 [&_strong]:dark:text-white 
        [&_strong]:px-1 [&_strong]:rounded [&_strong]:mx-0.5"
        dangerouslySetInnerHTML={{ __html: html }}
    />
);

const FeatureCard: React.FC<{ html: string }> = ({ html }) => {
    // Extract bold title if present (e.g. "<strong>Title:</strong> Description")
    const parts = html.split(/<\/strong>:?|:<\/strong>/);
    let title = "";
    let content = html;

    if (parts.length > 1) {
        title = parts[0].replace(/<strong>/g, '').replace(/<[^>]+>/g, '').trim();
        content = parts[1].trim();
    }

    return (
        <li className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            {/* Hover Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 dark:bg-slate-700 group-hover:bg-orange-500 transition-colors" />

            <div className="flex items-start gap-4 mb-2 pl-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full flex-shrink-0 mt-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                {title && (
                    <span className="font-oswald font-bold text-lg text-slate-800 dark:text-slate-100 leading-tight pt-1">
                        {title}
                    </span>
                )}
            </div>
            <div
                className="text-slate-600 dark:text-slate-400 pl-14 text-sm leading-6 font-medium"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </li>
    );
};

const FeatureGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="my-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
            {children}
        </ul>

        {/* MID-PAGE CONVERSION TRIGGER */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                onClick={() => document.getElementById('main-cta')?.click()}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all flex items-center gap-2"
            >
                <BoltIcon className="h-5 w-5" />
                Voir Prix & Dispo
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full ml-1">3 places</span>
            </button>
            <a
                href="tel:514-123-4567"
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-lg shadow-sm hover:border-orange-500 transition-all flex items-center gap-2"
            >
                <PhoneIcon className="h-5 w-5 text-orange-500" />
                Appeler (514) 123-4567
            </a>
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---

const DynamicFAQPage: React.FC = () => {
    const path = window.location.pathname;
    const slug = path.replace('/faq/', '');
    const { openWizard } = useQuoteWizard();
    const [scarcityLeft, setScarcityLeft] = useState(3);

    // Dynamic Scarcity Counter
    useEffect(() => {
        const random = Math.floor(Math.random() * 3) + 2;
        setScarcityLeft(random);
    }, []);

    // @ts-ignore
    const pageData = pseoData[slug];

    if (!pageData) {
        return (
            <div className="min-h-screen pt-32 text-center bg-slate-50 dark:bg-slate-900">
                <h1 className="text-3xl font-bold mb-4">Page Introuvable</h1>
                <a href="/" className="text-orange-600 underline font-bold">Retour à l'accueil</a>
            </div>
        );
    }

    const { question, answer, city, keyword } = pageData;
    const displayTitle = question || keyword.replace(/\b\w/g, (l: string) => l.toUpperCase());
    const cleanAnswer = answer.replace(/<[^>]+>/g, '').substring(0, 180) + "...";

    // --- CONTENT ENGINE: PARSE HTML STRING TO REACT COMPONENTS ---
    const renderContent = useMemo(() => {
        // Simple regex-based parser since structure is consistent from AI
        // 1. Split by top-level tags
        const parts = answer.split(/(<h3>.*?<\/h3>|<ul>[\s\S]*?<\/ul>|<p>.*?<\/p>)/g).filter(Boolean);

        return parts.map((part, index) => {
            if (part.startsWith('<h3>')) {
                const text = part.replace(/<\/?h3>/g, '');
                return <SectionHeader key={index}>{text}</SectionHeader>;
            }
            if (part.startsWith('<ul>')) {
                // Extract list items
                const listItems = part.match(/<li>(.*?)<\/li>/g);
                return (
                    <FeatureGrid key={index}>
                        {listItems?.map((liHtml, i) => {
                            const content = liHtml.replace(/<\/?li>/g, '');
                            return <FeatureCard key={i} html={content} />;
                        })}
                    </FeatureGrid>
                );
            }
            if (part.startsWith('<p>')) {
                const html = part.replace(/<\/?p>/g, ''); // Remove outer p tags
                if (!html.trim()) return null;
                return <TextParagraph key={index} html={html} />;
            }
            return null; // Ignore comments or whitespace
        });
    }, [answer]);

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen font-sans">
            <Helmet>
                <title>{`🛑 ${displayTitle} | Meilleur Prix à ${city}`}</title>
                <meta name="description" content={`Ne payez pas trop cher pour : ${displayTitle}. Obtenez le VRAI prix et une inspection incluse à ${city}. Cliquez ici.`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": displayTitle,
                        "description": cleanAnswer,
                        "brand": {
                            "@type": "AutoRepair",
                            "name": "MGC Réparation"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "127"
                        },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "CAD",
                            "availability": "https://schema.org/InStock",
                            "areaServed": city
                        }
                    })}
                </script>
            </Helmet>

            {/* --- HERO SECTION (Full Screen) --- */}
            <div className="relative bg-[#0f172a] text-white overflow-hidden min-h-screen flex items-center justify-center">
                {/* Background Image with Dark Blue Overlay */}
                <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/80 to-[#0f172a]" />

                <div className="relative container py-20 text-center z-10">
                    {/* Pre-headline */}
                    <p className="text-orange-500 font-bold tracking-widest uppercase mb-6 text-sm md:text-base flex justify-center items-center gap-2">
                        <span>📍</span> SERVICE PRIORITAIRE : {city.toUpperCase()} & ENVIRONS
                    </p>

                    {/* MAIN HEADLINE */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-extrabold text-white mb-8 leading-none tracking-tight">
                        <span className="text-[#ff6b35]">
                            {displayTitle} ?
                        </span>
                        <br />
                        Nous avons la Solution.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        Arrêtez de chercher. MGC Réparation est l'expert n°1 à {city} pour ce problème précis.
                        <span className="text-white font-bold ml-1">Inspection Gratuite incluse</span> avec toute réparation.
                    </p>

                    {/* HERO CTA BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button
                            onClick={openWizard}
                            className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#ff8c61] text-white text-xl font-bold py-5 px-12 rounded-xl shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-3 ring-4 ring-[#ff6b35]/20"
                        >
                            <BoltIcon className="h-7 w-7" />
                            Obtenir mon Prix (Gratuit)
                        </button>
                        <a
                            href="tel:514-123-4567"
                            className="w-full sm:w-auto bg-slate-800/50 hover:bg-slate-700/80 text-white text-xl font-bold py-5 px-12 rounded-xl border border-slate-600 backdrop-blur-sm flex items-center justify-center gap-3 transition-colors"
                        >
                            <PhoneIcon className="h-7 w-7" />
                            Parler à un Expert
                        </a>
                    </div>

                    {/* HERO TRUST PILLARS */}
                    <div className="mt-12 pt-8 border-t border-slate-700/50 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                            <CheckCircleIcon className="h-8 w-8 text-green-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-white text-lg">Transparence</h4>
                                <p className="text-sm text-slate-400 leading-snug">On vous montre les pièces changées. Pas de surprises.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                            <ClockIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-white text-lg">Rapidité</h4>
                                <p className="text-sm text-slate-400 leading-snug">Réparations souvent faites le jour même.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                            <ShieldCheckIcon className="h-8 w-8 text-orange-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-white text-lg">Garantie MGC</h4>
                                <p className="text-sm text-slate-400 leading-snug">2 ans / 40 000km pièces et main-d'œuvre.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Ratings */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                        <div className="flex text-yellow-500">
                            {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} className="h-4 w-4" />)}
                        </div>
                        <span className="font-semibold text-slate-400">4.9/5 sur 120+ avis.</span>
                    </div>
                </div>
            </div>
            {/* --- MAIN CONTENT SECTION (Modern Service Layout) --- */}
            <div className="container max-w-5xl py-16">

                {/* Intro / Context */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                    {/* We can inject a standard SEO header here if we want, or just let the content speak */}
                </div>

                {/* RENDERED CONTENT ENGINE */}
                {renderContent}

                {/* WHY US CLOSE */}
                <div className="mt-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold font-oswald text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <ShieldCheckIcon className="h-8 w-8 text-orange-500" />
                        Pourquoi vos voisins de {city} nous choisissent ?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-3">
                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg w-fit shadow-sm">
                                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Transparence Totale</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">On vous montre les pièces changées. Pas de "surprises".</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg w-fit shadow-sm">
                                <ClockIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Rapidité</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Réparations ("{keyword}") souvent faites le jour même.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg w-fit shadow-sm">
                                <ShieldCheckIcon className="h-6 w-6 text-orange-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Garantie MGC</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">2 ans / 40 000km pièces et main-d'œuvre.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FINAL CTA AREA */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-6">
                        Besoin d'un rendez-vous rapide à {city} ?
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            id="main-cta"
                            onClick={openWizard}
                            className="bg-orange-600 hover:bg-orange-500 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            <BoltIcon className="h-6 w-6" />
                            Obtenir Prix & Dispo
                        </button>
                        <a
                            href="tel:514-123-4567"
                            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 text-lg font-bold py-4 px-10 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            <PhoneIcon className="h-6 w-6 text-orange-500" />
                            514-123-4567
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">Aucun paiement requis pour la réservation en ligne.</p>
                </div>

            </div>

            {/* STICKY MOBILE CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:hidden z-50 flex gap-2">
                <a href="tel:5141234567" className="flex-1 bg-slate-100 text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center shadow-lg">
                    <PhoneIcon className="h-5 w-5 mr-2" /> Appeler
                </a>
                <button onClick={openWizard} className="flex-[2] bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg">
                    Obtenir Prix
                </button>
            </div>
            <div className="h-20 md:hidden" />
        </div>
    );
};

export default DynamicFAQPage;
