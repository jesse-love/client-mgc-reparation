import React from 'react';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { useLanguage } from '../contexts/LanguageContext';

interface CallToActionSectionProps {
  title: string;
  subtitle: string;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ title, subtitle }) => {
  const { openWizard } = useQuoteWizard();
  const { t } = useLanguage();

  return (
    <section className="bg-slate-100 dark:bg-brand-dark py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-2xl p-8 md:p-16 text-center border border-slate-200 dark:border-slate-800">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
            {subtitle}
          </p>
          <div className="mt-10">
            <button
              onClick={() => openWizard()}
              className="bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/30"
            >
              {t.header.bookService}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;