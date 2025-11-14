import React from 'react';
import type { Service } from '../types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import SchemaManager, { Seo } from '../components/SchemaManager';

interface ServiceDetailPageProps {
  service: Service;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { language, t } = useLanguage();
  const { openWizard } = useQuoteWizard();

  return (
    <>
      <Seo 
        title={service.title[language]}
        description={service.metaDescription[language]}
      />
      <SchemaManager pageType="ServiceDetailPage" service={service} />
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <a href="/services" className="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors mb-8 inline-block">
            &larr; {t.breadcrumbs.services}
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Left Column - Content */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold text-white">
                {service.headline[language]}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-slate-300">
                {service.subHeadline[language]}
              </p>
              
              <div className="prose prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white mt-8">
                <p>{service.pageContent[language]}</p>
                <h3 className="font-bold mt-12 text-2xl font-oswald">{t.serviceDetail.includesTitle.replace('{service}', service.title[language])}</h3>
                <ul className="mt-4">
                  {service.servicePoints.map((point, index) => (
                    <li key={index} className="flex items-start !p-0 my-3">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{point[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Why Choose Us & CTA */}
            <aside className="lg:col-span-2">
              <div className="bg-brand-dark p-8 rounded-lg ring-1 ring-slate-800 sticky top-8">
                <h3 className="text-2xl font-oswald font-bold text-white mb-6">{t.serviceDetail.whyTrustTitle.replace('{service}', service.title[language])}</h3>
                <div className="space-y-5">
                  {service.whyChoosePoints.map((point, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-lg text-slate-100">{point.title[language]}</h4>
                      <p className="text-slate-400 mt-1 text-sm">{point.description[language]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-slate-800 pt-8">
                   <button
                    onClick={openWizard}
                    className="w-full bg-orange-500 text-slate-900 font-bold py-4 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/30"
                  >
                    {t.serviceDetail.ctaButton}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailPage;