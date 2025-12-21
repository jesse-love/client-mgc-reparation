import React from 'react';
import LandingLayout from '../components/LandingLayout';
import TestimonialMarquee from '../components/TestimonialMarquee';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { TruckIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useUserLocation } from '../contexts/UserLocationContext';
import { useContent } from '../contexts/ContentContext';

const LandingTruckPage: React.FC = () => {
    const { openWizard } = useQuoteWizard();
    const { userCity } = useUserLocation();
    const { offers } = useContent();

    // "Imperator" Logic: Targeted Persona = Fleet Manager / Owner Operator
    // Pain Point = Downtime. Solution = Priority.
    const city = userCity || "Mascouche";
    const content = offers.truck;

    const handleOpenWizard = () => {
        openWizard({
            vehicleType: 'Heavy Truck',
            step: 2 // Skip Step 1
        });
    };

    if (!content) return null;

    return (
        <LandingLayout>
            <div className="flex flex-col flex-grow">
                <div className="flex-grow flex items-center justify-center bg-slate-900 border-b border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center py-16">

                        {/* VIP BADGE */}
                        <div className="inline-block bg-amber-500 text-black px-4 py-1 rounded-sm font-black text-sm mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                            {content.badgeText ? content.badgeText.replace('{city}', city) : `🚛 VIP FLEET STATUS: ${city}`}
                        </div>

                        {/* HEADLINE */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-oswald font-bold text-white leading-tight mb-8">
                            {content.title} <br />
                            <span className="text-amber-500">{content.subtitle}</span>
                        </h1>

                        {/* SUBHEADLINE */}
                        <h2 className="text-2xl md:text-3xl text-slate-300 font-medium mb-12 max-w-3xl mx-auto">
                            {content.description}
                        </h2>

                        {/* VALUE STACK (The "3 Pillars") */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-16">

                            {/* Pillar 1: SPEED */}
                            <div className="bg-slate-800 p-8 rounded-sm border-l-4 border-amber-500 hover:bg-slate-750 transition-colors">
                                <ClockIcon className="h-12 w-12 text-amber-500 mb-4" />
                                <h3 className="font-oswald font-bold text-white text-2xl mb-2">{content.cards.priority.title}</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">{content.cards.priority.description}</p>
                            </div>

                            {/* Pillar 2: EXPERTISE */}
                            <div className="bg-slate-800 p-8 rounded-sm border-l-4 border-white hover:bg-slate-750 transition-colors">
                                <TruckIcon className="h-12 w-12 text-white mb-4" />
                                <h3 className="font-oswald font-bold text-white text-2xl mb-2">{content.cards.expert.title}</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">{content.cards.expert.description}</p>
                            </div>

                            {/* Pillar 3: ROI */}
                            <div className="bg-slate-800 p-8 rounded-sm border-l-4 border-green-500 hover:bg-slate-750 transition-colors">
                                <CurrencyDollarIcon className="h-12 w-12 text-green-500 mb-4" />
                                <h3 className="font-oswald font-bold text-white text-2xl mb-2">{content.cards.fleet.title}</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">{content.cards.fleet.description}</p>
                            </div>

                        </div>

                        {/* ACTION BLOCK */}
                        <div className="mt-4">
                            <button
                                onClick={handleOpenWizard}
                                className="group relative inline-flex items-center justify-center px-12 py-6 text-xl md:text-3xl font-bold text-white transition-all duration-200 bg-amber-600 font-oswald rounded-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 shadow-lg shadow-amber-900/50"
                            >
                                <span className="w-full h-full absolute top-1 left-1 bg-black opacity-20 filter blur-sm group-hover:blur-md transition-all"></span>
                                <span className="relative uppercase tracking-wider">{content.ctaText}</span>
                                <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">→</span>
                            </button>

                            <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                                <p className="text-slate-500 text-sm uppercase tracking-widest font-semibold">
                                    {content.disclaimer}
                                </p>
                                <div className="flex items-center space-x-2 text-amber-500/80 text-xs">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    <span>Strict Priority Access Logic Active</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SOCIAL PROOF */}
                <div className="w-full bg-slate-900 pb-10 border-t border-slate-800">
                    <TestimonialMarquee />
                </div>
            </div>
        </LandingLayout>
    );
};

export default LandingTruckPage;
