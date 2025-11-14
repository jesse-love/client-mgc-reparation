import React from 'react';
import { services } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import CallToActionSection from '../components/CallToActionSection';
import SchemaManager, { Seo } from '../components/SchemaManager';

const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo
        title={t.breadcrumbs.services}
        description={t.seo.services.description}
      />
      <SchemaManager pageType="Generic" />
      <div className="bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-2">
                <li>
                  <div className="flex items-center">
                    <a href="/" className="mr-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
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
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.breadcrumbs.services}</span>
                </li>
              </ol>
            </nav>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">
              {t.services.title}
            </h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.slug} className="flex flex-col bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-slate-200 dark:border-slate-800">
                <div className="p-8 flex-grow">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-500/10 dark:bg-orange-500/20 p-3 rounded-full mr-5">
                      <service.icon className="h-8 w-8 text-orange-500 flex-shrink-0" />
                    </div>
                    <h2 className="text-2xl font-oswald font-bold text-slate-900 dark:text-white">{service.title[language]}</h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">{service.shortDescription[language]}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-5">
                   <a href={`/services/${service.slug}`} className="font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition duration-300 flex items-center justify-between group">
                    <span>{t.services.viewDetails}</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CallToActionSection 
        title={t.about.ctaTitle}
        subtitle={t.about.ctaSubtitle}
      />
    </>
  );
};

export default ServicesPage;