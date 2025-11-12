import React from 'react';
import { services } from '../i18n';
import { UsersIcon, ShieldCheckIcon, WrenchScrewdriverIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import TestimonialMarquee from '../components/TestimonialMarquee';
import LocationInfo from '../components/LocationInfo';

const iconMap: { [key:string]: React.ElementType } = {
    UsersIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    HeartIcon,
};

const Hero: React.FC = () => {
    const { t } = useLanguage();
    const { openWizard } = useQuoteWizard();
    return (
        <section className="relative h-screen flex flex-col justify-center text-white bg-slate-900">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621996346565-e30d1ca7c549?q=80&w=2670&auto=format&fit=crop')" }}></div>
            <div className="absolute inset-0 bg-brand-dark/70 from-brand-dark/90 to-transparent bg-gradient-to-t"></div>
            
            <div className="relative z-10 text-center px-4 flex-grow flex flex-col justify-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold uppercase tracking-wider text-shadow-lg">
                    {t.home.hero.title1} <span className="text-orange-500">{t.home.hero.title2}</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-200">
                    {t.home.hero.subtitle}
                </p>
                <div className="mt-12">
                    <button onClick={() => openWizard()} className="bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30">
                        {t.home.hero.ctaBook}
                    </button>
                </div>
            </div>

            <div className="relative z-10 w-full pb-10">
                <TestimonialMarquee />
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
                        <a key={service.slug} href={`/services/${service.slug}`} className="group block bg-white dark:bg-brand-dark p-10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800">
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
                    <div className="hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1553859943-a0e8548375a5?q=80&w=2574&auto=format&fit=crop" alt="Professional mechanic working in a clean workshop" className="rounded-xl shadow-2xl object-cover h-full w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <LocationInfo />
    </>
  );
};

export default HomePage;
