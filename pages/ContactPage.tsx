import React from 'react';
import InlineQuoteWizard from '../components/InlineQuoteWizard';
import { PhoneIcon, MapPinIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';

const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { address, phone, googleMapsUrl, operatingHours, isLoading } = useBusinessInfo();

  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.breadcrumbs.contact}</span>
              </li>
            </ol>
        </div>
      </nav>
      <div className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark dark:text-white">{t.contact.title}</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {t.contact.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-6">{t.contact.formTitle}</h2>
              <InlineQuoteWizard />
            </div>
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-4">{t.contact.infoTitle}</h3>
                {isLoading ? Array.from({length: 3}).map((_, i) => <div key={i} className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-full my-4 animate-pulse"></div>) :
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <MapPinIcon className="h-6 w-6 mt-1 mr-4 flex-shrink-0 text-orange-500" />
                    <div>
                      <strong className="block text-gray-900 dark:text-gray-100">{t.contact.address}</strong>
                      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">{address}</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <PhoneIcon className="h-6 w-6 mt-1 mr-4 flex-shrink-0 text-orange-500" />
                    <div>
                      <strong className="block text-gray-900 dark:text-gray-100">{t.contact.phone}</strong>
                      <a href={`tel:${phone}`} className="hover:text-orange-600">{phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <EnvelopeIcon className="h-6 w-6 mt-1 mr-4 flex-shrink-0 text-orange-500" />
                    <div>
                      <strong className="block text-gray-900 dark:text-gray-100">{t.contact.email}</strong>
                      <a href={`mailto:info@mgcreparation.com`} className="hover:text-orange-600">info@mgcreparation.com</a>
                    </div>
                  </li>
                </ul>
                }
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-4 flex items-center">
                      <ClockIcon className="h-6 w-6 mr-3 text-orange-500"/>
                      {t.footer.operatingHours}
                  </h3>
                   {isLoading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-3/4 my-2 animate-pulse"></div>) :
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      {operatingHours.map((line, index) => (
                          <li key={index}>{line[language]}</li>
                      ))}
                  </ul>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;