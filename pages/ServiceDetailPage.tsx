
import React from 'react';
import type { Service } from '../types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import SchemaManager, { Seo } from '../components/SchemaManager';
import CallToActionSection from '../components/CallToActionSection';
import ConversionHero from '../components/ConversionHero';

interface ServiceDetailPageProps {
  service: Service;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { language, t } = useLanguage();
  const { openWizard } = useQuoteWizard();

  const breadcrumbs = (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 text-sm">
        <li>
          <div className="flex items-center">
            <a href="/" className="font-medium text-slate-300 hover:text-white transition-colors">
              {t.breadcrumbs.home}
            </a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-slate-500 mx-2"><path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" /></svg>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <a href="/services" className="font-medium text-slate-300 hover:text-white transition-colors">
              {t.breadcrumbs.services}
            </a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-slate-500 mx-2"><path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" /></svg>
          </div>
        </li>
        <li>
          <span className="font-medium text-orange-500">{service.title[language]}</span>
        </li>
      </ol>
    </nav>
  );

  return (
    <>
      <Seo
        title={service.title[language]}
        description={service.metaDescription[language]}
      />
      <SchemaManager pageType="ServiceDetailPage" service={service} />

      <ConversionHero
        title={service.headline[language]}
        subtitle={service.subHeadline[language]}
        breadcrumbs={breadcrumbs}
        benefits={service.whyChoosePoints?.map(p => p.title[language])}
      />

      {/* Main Content */}
      <div className="py-20 lg:py-24 bg-slate-100 dark:bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-slate-900 dark:prose-strong:text-white">
              <p>{service.pageContent[language]}</p>
              <h3 className="font-bold mt-12 text-2xl font-oswald">{t.serviceDetail.includesTitle.replace('{service}', service.title[language])}</h3>

              {service.subServices && service.subServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {service.subServices.map((sub) => (
                    <a
                      key={sub.slug}
                      href={`/services/${service.slug}/${sub.slug}`}
                      className="block p-5 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 group"
                    >
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                        {sub.title[language]}
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                        {sub.shortDescription[language]}
                      </p>
                    </a>
                  ))}
                </div>
              ) : (
                <ul className="mt-4">
                  {service.servicePoints.map((point, index) => (
                    <li key={index} className="flex items-start !p-0 my-3">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{point[language]}</span>
                    </li>
                  ))}
                </ul>
              )}
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

export default ServiceDetailPage;
