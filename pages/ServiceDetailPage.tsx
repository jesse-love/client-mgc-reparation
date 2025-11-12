import React from 'react';
import type { Service } from '../types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import CallToActionSection from '../components/CallToActionSection';

interface ServiceDetailPageProps {
  service: Service;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-slate-100 dark:bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ol role="list" className="flex items-center space-x-2 py-4">
              <li>
                <div className="flex items-center">
                  <a href="/" className="mr-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    {t.breadcrumbs.home}
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-slate-400 dark:text-slate-600"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a href="/services" className="mr-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    {t.breadcrumbs.services}
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-slate-400 dark:text-slate-600"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{service.title[language]}</span>
              </li>
            </ol>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="bg-brand-dark py-20 lg:py-28 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-oswald font-bold">{service.headline[language]}</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">{service.subHeadline[language]}</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column - Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg lg:prose-xl max-w-none text-slate-700 dark:prose-invert dark:text-slate-300">
                <p className="lead text-xl leading-relaxed">{service.pageContent[language]}</p>
                <h3 className="font-bold text-slate-900 dark:text-white mt-16 text-3xl font-oswald">{t.serviceDetail.includesTitle.replace('{service}', service.title[language])}</h3>
                <ul className="space-y-4 mt-6">
                  {service.servicePoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-7 w-7 text-green-500 mr-4 mt-1 flex-shrink-0" />
                      <span>{point[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Why Choose Us */}
            <aside className="lg:col-span-1">
              <div className="bg-slate-100 dark:bg-brand-dark p-8 rounded-lg border border-slate-200 dark:border-slate-800 sticky top-28">
                <h3 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-6">{t.serviceDetail.whyTrustTitle.replace('{service}', service.title[language])}</h3>
                <div className="space-y-6">
                  {service.whyChoosePoints.map((point, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">{point.title[language]}</h4>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">{point.description[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <CallToActionSection 
        title={t.serviceDetail.ctaTitle}
        subtitle={t.serviceDetail.ctaSubtitle}
      />
    </div>
  );
};

export default ServiceDetailPage;