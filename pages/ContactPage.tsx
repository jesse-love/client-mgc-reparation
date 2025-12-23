import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LocationInfo from '../components/LocationInfo';
import CallToActionSection from '../components/CallToActionSection';
import SchemaManager from '../components/SchemaManager';
import SEO from '../components/SEO';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t.contact.title}
        description="Contactez MGC Réparation Inc. à Mascouche. Appelez-nous ou réservez votre rendez-vous en ligne pour tous vos besoins mécanique."
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
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.breadcrumbs.contact}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">{t.contact.title}</h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
              {t.contact.subtitle}
            </p>
          </div>
          <LocationInfo />
        </div>
      </div>
      <CallToActionSection
        title={t.about.ctaTitle}
        subtitle={t.about.ctaSubtitle}
      />
    </>
  );
};

export default ContactPage;