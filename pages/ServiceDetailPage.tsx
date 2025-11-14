
import React from 'react';
import type { Service } from '../types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import SchemaManager, { Seo } from '../components/SchemaManager';
import CallToActionSection from '../components/CallToActionSection';

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
      
      {/* Breadcrumbs & Hero */}
      <div className="bg-white dark:bg-slate-900 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2 text-sm">
              <li>
                <div className="flex items-center">
                  <a href="/" className="font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                    {t.breadcrumbs.home}
                  </a>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-slate-400 dark:text-slate-600 mx-2"><path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" /></svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a href="/services" className="font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                    {t.breadcrumbs.services}
                  </a>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-slate-400 dark:text-slate-600 mx-2"><path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" /></svg>
                </div>
              </li>
              <li>
                <span className="font-medium text-slate-500 dark:text-slate-400">{service.title[language]}</span>
              </li>
            </ol>
          </nav>
          
          <div className="mt-8 max-w-4xl">
            <h1 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">
              {service.headline[language]}
            </h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
              {service.subHeadline[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 lg:py-24 bg-slate-100 dark:bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-slate-900 dark:prose-strong:text-white">
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
              <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-xl sticky top-28 border dark:border-slate-800">
                <h3 className="text-2xl font-oswald font-bold text-slate-900 dark:text-white mb-6">{t.serviceDetail.whyTrustTitle.replace('{service}', service.title[language])}</h3>
                <div className="space-y-5">
                  {service.whyChoosePoints.map((point, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{point.title[language]}</h4>
                      <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">{point.description[language]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
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
      
      <CallToActionSection 
        title={t.serviceDetail.ctaTitle}
        subtitle={t.serviceDetail.subtitle}
      />
    </>
  );
};

export default ServiceDetailPage;
