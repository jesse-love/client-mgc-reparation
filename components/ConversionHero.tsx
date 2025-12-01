import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { CheckCircleIcon, StarIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { WrenchScrewdriverIcon, TruckIcon, CogIcon } from '@heroicons/react/24/outline';

interface ConversionHeroProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    benefits?: string[];
    breadcrumbs?: React.ReactNode;
}

const ConversionHero: React.FC<ConversionHeroProps> = ({
    title,
    subtitle,
    backgroundImage = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1974", // Default mechanic shop bg
    benefits,
    breadcrumbs
}) => {
    const { t } = useLanguage();
    const { openWizard, setWizardData } = useQuoteWizard();

    const handleVehicleSelect = (vehicleType: string) => {
        setWizardData(prev => ({
            ...prev,
            vehicleType,
            step: 2 // Skip to step 2
        }));
        openWizard();
    };

    const defaultBenefits = [
        t.serviceDetail.whyTrustTitle || "Expert Technicians",
        "Same-Day Service Available",
        "Transparent Pricing",
        "1-Year Warranty on Parts & Labor"
    ];

    const displayBenefits = benefits || defaultBenefits;

    return (
        <div className="relative bg-slate-900 pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {breadcrumbs && (
                    <div className="mb-8 text-slate-300">
                        {breadcrumbs}
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Value Prop */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5">
                            <StarIcon className="h-4 w-4 text-orange-500 mr-2" />
                            <span className="text-orange-400 text-sm font-bold uppercase tracking-wider">#1 Rated in Mascouche</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-oswald font-bold text-white leading-tight">
                            {title}
                        </h1>

                        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                            {subtitle}
                        </p>

                        {/* Benefits List */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {displayBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-center text-slate-200">
                                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span className="font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Trust Indicators */}
                        <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-8">
                            <div className="flex items-center text-slate-400">
                                <ShieldCheckIcon className="h-8 w-8 text-slate-500 mr-3" />
                                <div>
                                    <div className="text-white font-bold">Warranty</div>
                                    <div className="text-xs">Parts & Labor</div>
                                </div>
                            </div>
                            <div className="flex items-center text-slate-400">
                                <UserGroupIcon className="h-8 w-8 text-slate-500 mr-3" />
                                <div>
                                    <div className="text-white font-bold">Certified</div>
                                    <div className="text-xs">Expert Team</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Embedded Conversion Card */}
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 transform lg:scale-105 transition-transform">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-oswald font-bold text-slate-900 dark:text-white">
                                    {t.header.bookService || "Get Your Free Quote"}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mt-2">
                                    Select your vehicle type to get started instantly.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleVehicleSelect('Car/SUV/Light Truck')}
                                    className="w-full group p-4 border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center"
                                >
                                    <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">
                                        <WrenchScrewdriverIcon className="h-6 w-6 text-slate-600 dark:text-slate-300 group-hover:text-orange-500" />
                                    </div>
                                    <div className="ml-4 text-left">
                                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">Car / SUV</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Light duty vehicles</div>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">
                                        →
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleVehicleSelect('Heavy Truck')}
                                    className="w-full group p-4 border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center"
                                >
                                    <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">
                                        <TruckIcon className="h-6 w-6 text-slate-600 dark:text-slate-300 group-hover:text-orange-500" />
                                    </div>
                                    <div className="ml-4 text-left">
                                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">Heavy Truck</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Commercial & Industrial</div>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">
                                        →
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleVehicleSelect('Trailer/Other')}
                                    className="w-full group p-4 border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center"
                                >
                                    <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">
                                        <CogIcon className="h-6 w-6 text-slate-600 dark:text-slate-300 group-hover:text-orange-500" />
                                    </div>
                                    <div className="ml-4 text-left">
                                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">Trailer / Other</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Repair & Maintenance</div>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">
                                        →
                                    </div>
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Free estimate • No obligation • Fast response
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversionHero;
