
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ol role="list" className="flex items-center space-x-2 py-4">
              <li>
                <div className="flex items-center">
                  <a href="/" className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.breadcrumbs.about}</span>
              </li>
            </ol>
        </div>
      </nav>
      <div className="bg-white dark:bg-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark dark:text-white">
                {t.about.title}
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                {t.about.subtitle}
              </p>
            </div>
            <div className="mt-12 text-lg text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <img src="https://picsum.photos/1200/600?random=2" alt="MGC Réparation shop interior" className="rounded-lg shadow-xl my-8"/>
              <p>{t.about.p3}</p>
              <p>{t.about.p4}</p>
              <p>{t.about.p5}</p>
            </div>
            <div className="mt-12 text-center">
              <a href="/contact" className="inline-block bg-orange-500 text-brand-dark font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition duration-300 text-lg">
                {t.about.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;