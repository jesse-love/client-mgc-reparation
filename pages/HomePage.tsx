
import React from 'react';
import { services } from '../i18n';
import { UsersIcon, ShieldCheckIcon, WrenchScrewdriverIcon, HeartIcon, ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import TestimonialMarquee from '../components/TestimonialMarquee';
import LocationInfo from '../components/LocationInfo';
import HeroBackground from '../components/HeroBackground';
import MechanicIllustration from '../components/MechanicIllustration';
import SchemaManager, { Seo } from '../components/SchemaManager';
import Avatar from '../components/Avatar';
import HeroQuickStart from '../components/HeroQuickStart';
import type { GMBReview } from '../types';

const iconMap: { [key: string]: React.ElementType } = {
    UsersIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    HeartIcon,
};

const Hero: React.FC = () => {
    const { t } = useLanguage();
    const { openWizard } = useQuoteWizard();
    return (
        <section className="relative min-h-screen flex flex-col justify-center text-white bg-brand-dark">
            <HeroBackground />
            <div className="absolute inset-0 bg-brand-dark/60 from-brand-dark/80 to-transparent bg-gradient-to-t"></div>

            <div className="relative z-10 text-center px-4 flex-grow flex flex-col justify-center max-w-6xl mx-auto pt-20">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-oswald font-bold uppercase tracking-wider text-shadow-lg">
                    {t.home.hero.title1} <span className="text-orange-500">{t.home.hero.title2}</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-200">
                    {t.home.hero.subtitle}
                </p>
                <div className="mt-8">
                    {/* Old Button Replaced by Quick Start */}
                    <div className="md:hidden">
                        <button onClick={() => openWizard()} className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md transition-all duration-300 text-lg shadow-xl hover:bg-orange-400 w-full font-oswald uppercase">
                            {t.home.hero.ctaBook}
                        </button>
                    </div>

                    <div className="hidden md:block">
                        <p className="text-slate-300 text-sm mb-2 uppercase tracking-widest font-semibold">Commencer votre demande maintenant :</p>
                        <HeroQuickStart />
                    </div>
                </div>
            </div>

            {/* Testimonials Marquee for Desktop only */}
            <div className="hidden lg:block relative z-10 w-full pb-10">
                <TestimonialMarquee />
            </div>
        </section>
    );
};

// --- Mobile-only Testimonials Section ---

const MobileLoadingCard: React.FC = () => (
    <div className="bg-white dark:bg-brand-dark p-6 rounded-xl shadow-lg animate-pulse border border-slate-200 dark:border-slate-800">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-4"></div>
        <div className="flex items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-full mr-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
        </div>
    </div>
);

const MobileTestimonialCard: React.FC<{ review: GMBReview }> = ({ review }) => (
    <div className="bg-white dark:bg-brand-dark p-6 rounded-xl shadow-lg flex flex-col border border-slate-200 dark:border-slate-800 h-full">
        <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-400" />)}
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed flex-grow italic">"{review.comment}"</p>
        <div className="flex items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex-shrink-0 mr-4">
                <Avatar name={review.reviewer.displayName} />
            </div>
            <div>
                <p className="font-bold text-slate-800 dark:text-white">{review.reviewer.displayName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Client Vérifié</p>
            </div>
        </div>
    </div>
);

const MobileTestimonials: React.FC = () => {
    const { t } = useLanguage();
    const { reviews, isLoading, error } = useBusinessInfo();
    const topReviews = reviews
        .filter(r => r.starRating === 'FIVE' && r.comment && r.comment.length > 20)
        .slice(0, 2); // Show the top 2 for a clean mobile grid

    return (
        <section className="lg:hidden py-20 bg-slate-100 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-oswald font-bold text-slate-900 dark:text-white">{t.home.testimonials.title}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">{t.home.testimonials.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {isLoading && Array.from({ length: 2 }).map((_, i) => <MobileLoadingCard key={i} />)}
                    {error && <div className="text-red-500 sm:col-span-2 text-center">{error}</div>}
                    {!isLoading && topReviews.map((review) => (
                        <MobileTestimonialCard review={review} key={review.createTime} />
                    ))}
                </div>
            </div>
        </section>
    );
};


const ServicesOverview: React.FC = () => {
    const { language, t } = useLanguage();
    return (
        <section className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">{t.home.services.title}</h2>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">{t.home.services.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service) => (
                        <a key={service.slug} href={`/services/${service.slug}`} className="group block bg-white dark:bg-brand-dark p-10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-orange-400">
                            <service.icon className="h-12 w-12 text-orange-500 mb-6" />
                            <h3 className="text-2xl font-oswald font-bold text-slate-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors duration-300">{service.title[language]}</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-8">{service.shortDescription[language]}</p>
                            <span className="font-bold text-orange-500 group-hover:text-orange-600 transition-all duration-300">
                                {t.home.services.learnMore} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyChooseUs: React.FC = () => {
    const { language, t } = useLanguage();
    return (
        <section className="py-20 lg:py-32 bg-white dark:bg-slate-900/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">{t.home.whyUs.title}</h2>
                        <p className="mt-8 text-xl text-slate-600 dark:text-slate-300">{t.home.whyUs.subtitle}</p>
                        <div className="mt-12 space-y-10">
                            {t.home.whyUs.points.map((point, index) => {
                                const IconComponent = iconMap[point.icon];
                                return (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 bg-orange-500/10 dark:bg-orange-500/20 p-4 rounded-full">
                                            <IconComponent className="h-8 w-8 text-orange-500" />
                                        </div>
                                        <div className="ml-6">
                                            <h3 className="text-2xl font-oswald font-bold text-slate-900 dark:text-white">{point.title[language]}</h3>
                                            <p className="mt-2 text-slate-600 dark:text-slate-300 text-lg">{point.description[language]}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-12 lg:mt-0">
                        <MechanicIllustration className="rounded-xl shadow-2xl h-full w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FAQ: React.FC = () => {
    const { language, t } = useLanguage();
    return (
        <section className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">{t.home.faq.title}</h2>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">{t.home.faq.subtitle}</p>
                </div>
                <div className="space-y-6">
                    {t.home.faq.questions.map((item, index) => (
                        <details key={index} className="group bg-white dark:bg-brand-dark p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 transition-colors duration-300 open:bg-slate-50 dark:open:bg-brand-dark/50" name="faq-accordion">
                            <summary className="flex justify-between items-center cursor-pointer font-oswald font-bold text-xl text-slate-900 dark:text-white list-none">
                                {item.question[language]}
                                <ChevronDownIcon className="h-6 w-6 text-orange-500 transition-transform duration-300 group-open:rotate-180" />
                            </summary>
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-lg">
                                {item.answer[language]}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

const HomePage: React.FC = () => {
    return (
        <>
            <Seo />
            <SchemaManager pageType="HomePage" />
            <Hero />
            <MobileTestimonials />
            <ServicesOverview />
            <WhyChooseUs />
            <FAQ />
            <LocationInfo />
        </>
    );
};

export default HomePage;