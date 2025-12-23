
import React from 'react';
import type { Service, SubService } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import SchemaManager from '../components/SchemaManager';
import SEO from '../components/SEO';
import CallToActionSection from '../components/CallToActionSection';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import ConversionHero from '../components/ConversionHero';

interface SubServicePageProps {
    service: Service;
    subService: SubService;
}

const SubServicePage: React.FC<SubServicePageProps> = ({ service, subService }) => {
    const { language, t } = useLanguage();
    const { openWizard } = useQuoteWizard();

    const relatedServices = service.subServices?.filter(s => s.slug !== subService.slug) || [];

    const breadcrumbs = (
        <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2 text-sm flex-wrap">
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
                    <div className="flex items-center">
                        <a href={`/services/${service.slug}`} className="font-medium text-slate-300 hover:text-white transition-colors">
                            {service.title[language]}
                        </a>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-slate-500 mx-2"><path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" /></svg>
                    </div>
                </li>
                <li>
                    <span className="font-medium text-orange-500">{subService.title[language]}</span>
                </li>
            </ol>
        </nav>
    );

    return (
        <>
            <SEO
                title={`${subService.title[language]} - ${service.title[language]} `}
                description={subService.shortDescription[language]}
            />
            {/* TODO: Update SchemaManager to handle SubService if needed, or just use Service schema */}
            <SchemaManager pageType="ServiceDetailPage" service={service} />

            <ConversionHero
                title={subService.title[language]}
                subtitle={subService.shortDescription[language]}
                breadcrumbs={breadcrumbs}
                benefits={subService.features?.map(f => f[language])}
                serviceName={subService.title[language]}
            />

            {/* Main Content */}
            <div className="py-20 lg:py-24 bg-slate-100 dark:bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Left Column - Content */}
                        <div className="lg:col-span-2">
                            <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-slate-900 dark:prose-strong:text-white bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm">
                                <p>{subService.pageContent[language]}</p>

                                {/* Features List if available */}
                                {subService.features && (
                                    <ul className="mt-6 space-y-3">
                                        {subService.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="text-orange-500 mr-2">•</span>
                                                {feature[language]}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="mt-10">
                                    <a href={`/services/${service.slug}`} className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium">
                                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                        Back to {service.title[language]}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Related Services */}
                        <aside className="lg:col-span-1 space-y-8">
                            {/* Related Services */}
                            {relatedServices.length > 0 && (
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg sticky top-28">
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Related Services</h4>
                                    <ul className="space-y-3">
                                        {relatedServices.map((s) => (
                                            <li key={s.slug}>
                                                <a
                                                    href={`/services/${service.slug}/${s.slug}`}
                                                    className="flex items-center justify-between group text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                                >
                                                    <span>{s.title[language]}</span>
                                                    <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </a >
                                            </li >
                                        ))}
                                    </ul >
                                </div >
                            )}
                        </aside >
                    </div >
                </div >
            </div >

            <CallToActionSection
                title={t.serviceDetail.ctaTitle}
                subtitle={t.serviceDetail.subtitle}
            />
        </>
    );
};

export default SubServicePage;
