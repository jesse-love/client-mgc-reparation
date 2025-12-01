import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import ConversionHero from '../components/ConversionHero';
import CallToActionSection from '../components/CallToActionSection';
import SchemaManager, { Seo } from '../components/SchemaManager';
import { MapPinIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

// This would typically come from a database or config file
const locationData: { [key: string]: { name: string; distance: string; time: string } } = {
    'terrebonne': { name: 'Terrebonne', distance: '12 km', time: '15 min' },
    'repentigny': { name: 'Repentigny', distance: '18 km', time: '20 min' },
    'blainville': { name: 'Blainville', distance: '22 km', time: '25 min' },
    'laval': { name: 'Laval', distance: '25 km', time: '30 min' },
};

interface LocationLandingPageProps {
    citySlug?: string; // Passed from App.tsx routing
}

const LocationLandingPage: React.FC<LocationLandingPageProps> = ({ citySlug }) => {
    const { language, t } = useLanguage();
    const { openWizard } = useQuoteWizard();

    // Fallback if no slug provided or invalid
    const cityKey = citySlug?.toLowerCase() || 'terrebonne';
    const city = locationData[cityKey] || { name: cityKey.charAt(0).toUpperCase() + cityKey.slice(1), distance: 'N/A', time: 'N/A' };

    const title = language === 'en'
        ? `Expert Mechanic Serving ${city.name}`
        : `Mécanicien Expert Desservant ${city.name}`;

    const subtitle = language === 'en'
        ? `Top-rated auto repair just ${city.time} from ${city.name}. Save time and money with MGC Réparation.`
        : `Réparation auto de premier choix à seulement ${city.time} de ${city.name}. Économisez temps et argent avec MGC Réparation.`;

    const benefits = language === 'en'
        ? [
            `Only ${city.time} drive from ${city.name}`,
            "Same-Day Appointments Available",
            "Better Rates than Local Dealerships",
            "Free Courtesy Car Available"
        ]
        : [
            `À seulement ${city.time} de ${city.name}`,
            "Rendez-vous le jour même disponibles",
            "Meilleurs tarifs que les concessionnaires locaux",
            "Voiture de courtoisie gratuite disponible"
        ];

    const breadcrumbs = (
        <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2 text-sm">
                <li>
                    <a href="/" className="font-medium text-slate-300 hover:text-white transition-colors">
                        {t.breadcrumbs.home}
                    </a>
                </li>
                <li>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-slate-500 mx-2"><path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" /></svg>
                </li>
                <li>
                    <span className="font-medium text-orange-500">{city.name}</span>
                </li>
            </ol>
        </nav>
    );

    return (
        <>
            <Seo
                title={`${title} - MGC Réparation`}
                description={subtitle}
            />
            <SchemaManager pageType="ServiceDetailPage" /> {/* Reusing Service schema for now */}

            <ConversionHero
                title={title}
                subtitle={subtitle}
                benefits={benefits}
                breadcrumbs={breadcrumbs}
            />

            <div className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-8">
                            {language === 'en' ? `Why drive ${city.time} to Mascouche?` : `Pourquoi faire ${city.time} de route vers Mascouche?`}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <ClockIcon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{language === 'en' ? 'Worth the Drive' : 'Ça vaut le détour'}</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {language === 'en'
                                        ? `We are just ${city.distance} away. Many of our clients from ${city.name} choose us for our honesty and fair prices.`
                                        : `Nous sommes à seulement ${city.distance}. Plusieurs de nos clients de ${city.name} nous choisissent pour notre honnêteté et nos prix justes.`}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <MapPinIcon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{language === 'en' ? 'Easy Access' : 'Accès Facile'}</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {language === 'en'
                                        ? "Located conveniently near major highways, getting here is a breeze."
                                        : "Situé près des autoroutes majeures, se rendre ici est un jeu d'enfant."}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <CheckCircleIcon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{language === 'en' ? 'Expert Service' : 'Service Expert'}</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {language === 'en'
                                        ? "Our certified technicians are worth the short trip for peace of mind."
                                        : "Nos techniciens certifiés valent le court déplacement pour votre tranquillité d'esprit."}
                                </p>
                            </div>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-xl border border-orange-100 dark:border-orange-900/50">
                            <p className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-6">
                                {language === 'en'
                                    ? `Don't settle for less in ${city.name}. Come to the experts in Mascouche.`
                                    : `Ne vous contentez pas de moins à ${city.name}. Venez voir les experts à Mascouche.`}
                            </p>
                            <button
                                onClick={openWizard}
                                className="bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                            >
                                {t.header.bookService}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CallToActionSection
                title={t.serviceDetail.ctaTitle}
                subtitle={t.serviceDetail.subtitle}
            />
        </>
    );
};

export default LocationLandingPage;
