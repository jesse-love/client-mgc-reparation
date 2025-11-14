
import React from 'react';
import { services } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import SchemaManager, { Seo } from '../components/SchemaManager';
import CallToActionSection from '../components/CallToActionSection';

const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo
        title={t.breadcrumbs.services}
        description={t.seo.services.description}
      />
      <SchemaManager pageType="Generic" />
      
      {/* Hero section */}
      <div className="bg-white dark:bg-slate-900 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">
            {t.services.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
            {t.services.subtitle}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 lg:py-24 bg-slate-100 dark:bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <a 
                key={service.slug} 
                href={`/services/${service.slug}`} 
                className="group block bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-orange-400"
              >
                <service.icon className="h-10 w-10 text-orange-500 mb-5" />
                <h3 className="text-2xl font-oswald font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {service.title[language]}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {service.shortDescription[language]}
                </p>
                <span className="font-bold text-orange-500 group-hover:text-orange-600 transition-all duration-300">
                  {t.home.services.learnMore} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </a>
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
