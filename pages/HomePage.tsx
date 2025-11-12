
import React from 'react';
import { services, testimonials, WHY_CHOOSE_US_POINTS, CONTACT_INFO, OPERATING_HOURS } from '../i18n';
import { CheckCircleIcon, UsersIcon, ShieldCheckIcon, WrenchScrewdriverIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import InlineQuoteWizard from '../components/InlineQuoteWizard';

// Helper to map icon names to actual icon components
const iconMap: { [key: string]: React.ElementType } = {
    UsersIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    HeartIcon,
};


const Hero: React.FC = () => {
    const { language, t } = useLanguage();
    const { openWizard } = useQuoteWizard();
    return (
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white bg-brand-dark">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}></div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider">
                    {t.home.hero.title1} <span className="text-orange-500">{t.home.hero.title2}</span>
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                    {t.home.hero.subtitle}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={() => openWizard()} className="bg-orange-500 text-brand-dark font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition duration-300 text-lg">
                        {t.home.hero.ctaBook}
                    </button>
                    <a href={CONTACT_INFO.phoneHref} className="border-2 border-orange-500 text-white font-bold py-3 px-8 rounded-md hover:bg-orange-500 hover:text-brand-dark transition duration-300 text-lg">
                        {t.home.hero.ctaCall} {CONTACT_INFO.phone}
                    </a>
                </div>
            </div>
        </section>
    );
};

const ServicesOverview: React.FC = () => {
    const { language, t } = useLanguage();
    return (
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark dark:text-white">{t.home.services.title}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">{t.home.services.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <a key={service.slug} href={`/services/${service.slug}`} className="group block bg-white dark:bg-slate-900 p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <service.icon className="h-12 w-12 text-orange-500 mb-4" />
                            <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2 group-hover:text-orange-500">{service.title[language]}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{service.shortDescription[language]}</p>
                            <span className="mt-4 inline-block font-semibold text-orange-500 group-hover:text-orange-600">{t.home.services.learnMore} &rarr;</span>
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
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark dark:text-white">{t.home.whyUs.title}</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.home.whyUs.subtitle}</p>
                        <div className="mt-8 space-y-6">
                            {WHY_CHOOSE_US_POINTS.map((point, index) => {
                                const IconComponent = iconMap[point.icon];
                                return (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <IconComponent className="h-8 w-8 text-orange-500" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-brand-dark dark:text-white">{point.title[language]}</h3>
                                            <p className="mt-1 text-gray-600 dark:text-gray-300">{point.description[language]}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img src="https://picsum.photos/600/700?random=1" alt="Mechanic working on a car" className="rounded-lg shadow-2xl object-cover h-full w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Testimonials: React.FC = () => {
    const { language, t } = useLanguage();
    return (
        <section className="py-16 lg:py-24 bg-brand-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold">{t.home.testimonials.title}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">{t.home.testimonials.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col">
                            <p className="text-gray-300 flex-grow">"{testimonial.quote[language]}"</p>
                            <p className="mt-6 font-bold text-orange-500">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BookingAndMapSection: React.FC = () => {
    const { language, t } = useLanguage();
    return (
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark dark:text-white">{t.home.contactMap.title}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-6 text-center">{t.contact.formTitle}</h2>
                        <InlineQuoteWizard />
                    </div>
                    {/* Map and Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-4">{t.home.contactMap.visitTitle}</h3>
                            <p className="text-lg font-semibold">{CONTACT_INFO.address}</p>
                             <a 
                                href={CONTACT_INFO.googleMapsUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="mt-2 inline-block font-bold text-orange-500 hover:text-orange-600 transition duration-300"
                            >
                                {t.home.contactMap.cta} &rarr;
                            </a>
                            <div className="h-64 mt-4 rounded-lg shadow-md overflow-hidden">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.820251817549!2d-73.6190136844309!3d45.71633597910488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc6a782a201206b%3A0x6e8a0f2b3e5a5c7c!2sMGC%20R%C3%A9paration%20inc.!5e0!3m2!1sen!2sca!4v1684351042730!5m2!1sen!2sca" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="dark:grayscale dark:invert dark:hue-rotate-180"
                                ></iframe>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-2">{OPERATING_HOURS.title[language]}</h3>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                                {OPERATING_HOURS.hours.map((line, index) => (
                                    <li key={index}>{line[language]}</li>
                                ))}
                            </ul>
                        </div>
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
      <Testimonials />
      <BookingAndMapSection />
    </>
  );
};

export default HomePage;
