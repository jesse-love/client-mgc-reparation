
import React from 'react';
import type { Service } from '../types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';

interface ServiceDetailPageProps {
  service: Service;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { language, t } = useLanguage();
  const { openWizard } = useQuoteWizard();

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ol role="list" className="flex items-center space-x-2 py-4">
              <li>
                <div className="flex items-center">
                  <a href="/" className="mr-2 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                    {t.breadcrumbs.home}
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300 dark:text-gray-600"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a href="/services" className="mr-2 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                    {t.breadcrumbs.services}
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300 dark:text-gray-600"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{service.title[language]}</span>
              </li>
            </ol>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="bg-brand-dark py-16 lg:py-24 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">{service.headline[language]}</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">{service.subHeadline[language]}</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
                <p className="lead">{service.pageContent[language]}</p>
                <h3 className="font-bold text-brand-dark dark:text-white mt-12">{t.serviceDetail.includesTitle.replace('{service}', service.title[language])}</h3>
                <ul className="space-y-2">
                  {service.servicePoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{point[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Why Choose Us & CTA */}
            <aside className="lg:col-span-1 space-y-8">
              <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-4">{t.serviceDetail.whyTrustTitle.replace('{service}', service.title[language])}</h3>
                <div className="space-y-4">
                  {service.whyChoosePoints.map((point, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100">{point.title[language]}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{point.description[language]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-brand-dark">{t.serviceDetail.ctaTitle}</h3>
                <p className="mt-2 text-brand-dark">{t.serviceDetail.ctaSubtitle}</p>
                <button onClick={() => openWizard()} className="mt-6 inline-block bg-brand-dark text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition duration-300">
                  {t.serviceDetail.ctaButton}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
