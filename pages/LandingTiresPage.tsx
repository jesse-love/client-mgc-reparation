import React from 'react';
import LandingLayout from '../components/LandingLayout';
import TestimonialMarquee from '../components/TestimonialMarquee';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { CogIcon, ClockIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

import { useUserLocation } from '../contexts/UserLocationContext';

import { useContent } from '../contexts/ContentContext';

const LandingTiresPage: React.FC = () => {
  const { openWizard, selectOption } = useQuoteWizard();
  const { language } = useLanguage();
  const t = translations[language];
  const { userCity } = useUserLocation();
  const { offers } = useContent();

  // Dynamic Location Logic
  const city = userCity || "Mascouche";
  const content = offers.martin; // "Martin" is the Tires offer



  const handleOpenWizard = () => {
    openWizard();
    selectOption('serviceCategory', 'Tire Change + Free Inspection');
  };

  return (
    <LandingLayout>
      <div className="flex flex-col flex-grow">
        <div className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center py-12">

            <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full font-bold text-sm mb-6">
              {content.badgeText ? content.badgeText.replace('{city}', city) : `❄️ Seasonal Special: Limited Slots in ${city}`}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white leading-tight mb-6">
              {content.title} <br />
              <span className="text-orange-500">{content.subtitle}</span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-slate-200 font-medium mb-8">
              {content.description}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mb-10">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <CogIcon className="h-10 w-10 text-green-500 mb-3" />
                <h3 className="font-bold text-white text-lg mb-2">{content.cards.card1.title}</h3>
                <p className="text-slate-400 text-sm">{content.cards.card1.description}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <CheckBadgeIcon className="h-10 w-10 text-orange-500 mb-3" />
                <h3 className="font-bold text-white text-lg mb-2">{content.cards.card2.title}</h3>
                <p className="text-slate-400 text-sm">{content.cards.card2.description}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <ClockIcon className="h-10 w-10 text-blue-500 mb-3" />
                <h3 className="font-bold text-white text-lg mb-2">{content.cards.card3.title}</h3>
                <p className="text-slate-400 text-sm">{content.cards.card3.description}</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleOpenWizard}
                className="bg-orange-500 text-slate-900 font-bold py-5 px-12 rounded-md hover:bg-orange-400 transition duration-300 text-xl md:text-2xl shadow-lg hover:shadow-orange-500/40 transform hover:scale-105 uppercase tracking-wide"
              >
                {content.ctaText}
              </button>
              <p className="text-center text-sm text-slate-400 mt-4">
                {content.disclaimer.replace('{city}', city)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full pb-10">
          <TestimonialMarquee />
        </div>
      </div>
    </LandingLayout>
  );
};

export default LandingTiresPage;