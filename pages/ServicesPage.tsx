import React from 'react';
import { services } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import SchemaManager, { Seo } from '../components/SchemaManager';

const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { openWizard } = useQuoteWizard();

  return (
    <>
      <Seo
        title={t.breadcrumbs.services}
        description={t.seo.services.description}
      />
      <SchemaManager pageType="Generic" />
      <style>{`
        /* Custom scrollbar for webkit browsers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a; /* brand-dark */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155; /* slate-700 */
          border-radius: 4px;
          border: 2px solid #0f172a; /* brand-dark */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #475569; /* slate-600 */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #334155 #0f172a;
        }
      `}</style>
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column: Info & CTA */}
            <div className="text-center lg:text-left">
              <a href="/" className="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors">
                &larr; {t.breadcrumbs.home}
              </a>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold text-white mt-4">
                {t.services.title}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-lg mx-auto lg:mx-0">
                {t.services.subtitle}
              </p>
              <div className="mt-8">
                <button
                  onClick={openWizard}
                  className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/30"
                >
                  {t.header.bookService}
                </button>
              </div>
            </div>

            {/* Right Column: Services List */}
            <div className="w-full max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-4">
                {services.map((service) => (
                  <a href={`/services/${service.slug}`} key={service.slug} className="group block bg-brand-dark p-6 rounded-lg border-2 border-slate-800 hover:border-orange-500 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center">
                      <div className="bg-slate-800 p-3 rounded-full mr-5">
                        <service.icon className="h-7 w-7 text-orange-500 flex-shrink-0" />
                      </div>
                      <div>
                        <h2 className="text-xl font-oswald font-bold text-white transition-colors group-hover:text-orange-400">{service.title[language]}</h2>
                        <p className="text-slate-400 text-sm mt-1">{service.shortDescription[language]}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;