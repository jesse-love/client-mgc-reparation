import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CallToActionSection from '../components/CallToActionSection';
import ShopIllustration from '../components/ShopIllustration';
import SchemaManager, { Seo } from '../components/SchemaManager';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Seo 
        title={t.breadcrumbs.about}
        description={t.seo.about.description}
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
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.breadcrumbs.about}</span>
                </li>
              </ol>
            </nav>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
               <h1 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">
                {t.about.title}
              </h1>
              <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
                {t.about.subtitle}
              </p>
            </div>
            <div className="mt-12 text-lg text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <ShopIllustration />
              <p>{t.about.p3}</p>
              <p>{t.about.p4}</p>
              <p>{t.about.p5}</p>
            </div>
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

export default AboutPage;