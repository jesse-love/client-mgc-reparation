import React from 'react';
import { services } from '../i18n';
import { CheckCircleIcon, UsersIcon, ShieldCheckIcon, WrenchScrewdriverIcon, HeartIcon, StarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import InlineQuoteWizard from '../components/InlineQuoteWizard';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';

const iconMap: { [key:string]: React.ElementType } = {
    UsersIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    HeartIcon,
};

const Hero: React.FC = () => {
    const { t } = useLanguage();
    const { openWizard } = useQuoteWizard();
    const { phone, isLoading } = useBusinessInfo();
    return (
        <section className="relative h-[80vh] md:h-screen flex items-center justify-center text-white bg-slate-900">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621996346565-e30d1ca7c549?q=80&w=2670&auto=format&fit=crop')" }}></div>
            <div className="absolute inset-0 bg-brand-dark/70 from-brand-dark/90 to-transparent bg-gradient-to-t"></div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold uppercase tracking-wider text-shadow-lg">
                    {t.home.hero.title1} <span className="text-orange-500">{t.home.hero.title2}</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-200">
                    {t.home.hero.subtitle}
                </p>
                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button onClick={() => openWizard()} className="w-full sm:w-auto bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30">
                        {t.home.hero.ctaBook}
                    </button>
                    <a href={`tel:${phone}`} className="w-full sm:w-auto border-2 border-slate-500 bg-slate-900/50 text-white font-bold py-4 px-10 rounded-md hover:bg-slate-800 hover:border-slate-400 transition duration-300 text-lg">
                        {t.home.hero.ctaCall} {isLoading ? '...' : phone}
                    </a>
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

const Testimonials: React.FC = () => {
    const { t } = useLanguage();
    const { reviews, isLoading, error } = useBusinessInfo();
    const fiveStarReviews = reviews.filter(r => r.starRating === 'FIVE' && r.comment && r.comment.length > 20);

    return (
        <section className="py-20 lg:py-32 bg-brand-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl lg:text-6xl font-oswald font-bold">{t.home.testimonials.title}</h2>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300">{t.home.testimonials.subtitle}</p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading && Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-slate-800 p-8 rounded-xl shadow-lg animate-pulse border border-slate-700">
                            <div className="h-4 bg-slate-700 rounded w-3/4 mb-6"></div>
                            <div className="h-4 bg-slate-700 rounded w-full mb-3"></div>
                            <div className="h-4 bg-slate-700 rounded w-full mb-3"></div>
                            <div className="h-4 bg-slate-700 rounded w-1/2 mb-8"></div>
                            <div className="flex items-center mt-6 pt-6 border-t border-slate-700">
                                <div className="h-14 w-14 bg-slate-700 rounded-full mr-4"></div>
                                <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                    {error && <div className="col-span-full text-center text-red-400">{error}</div>}
                    {!isLoading && !error && fiveStarReviews.slice(0, 3).map((review, index) => (
                         <div key={index} className="bg-slate-900 p-8 rounded-xl shadow-lg flex flex-col border border-slate-700 transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="flex items-center mb-4">
                                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-400" />)}
                            </div>
                            <p className="text-slate-300 flex-grow text-lg mb-6 leading-relaxed">"{review.comment}"</p>
                            <div className="flex items-center mt-auto pt-6 border-t border-slate-700">
                                <img src={review.reviewer.profilePhotoUrl} alt={review.reviewer.displayName} className="h-14 w-14 rounded-full mr-4 object-cover" />
                                <div>
                                    <p className="font-bold text-lg text-white">{review.reviewer.displayName}</p>
                                    <p className="text-sm text-slate-400">Client Vérifié</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const BookingAndMapSection: React.FC = () => {
    const { language, t } = useLanguage();
    const { address, googleMapsUrl, operatingHours, isLoading } = useBusinessInfo();
    return (
        <section className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Form */}
                    <div className="lg:col-span-3 bg-white dark:bg-brand-dark p-8 sm:p-12 rounded-xl shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-oswald font-bold text-slate-900 dark:text-white mb-2 text-center">{t.contact.formTitle}</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-center mb-10 text-lg">{t.quoteWizard.brandSubtitle}</p>
                        <InlineQuoteWizard />
                    </div>
                    {/* Map and Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white dark:bg-brand-dark p-8 rounded-xl shadow-lg">
                            <h3 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-5">{t.home.contactMap.visitTitle}</h3>
                            {isLoading ? <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse"></div> : <>
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">{address}</p>
                                <a 
                                    href={googleMapsUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-block font-bold text-orange-500 hover:text-orange-600 transition duration-300"
                                >
                                    {t.home.contactMap.cta} &rarr;
                                </a>
                            </>}
                            <div className="h-80 mt-6 rounded-lg shadow-md overflow-hidden border-4 border-slate-200 dark:border-slate-800">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.820251817549!2d-73.6190136844309!3d45.71633597910488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc6a782a201206b%3A0x6e8a0f2b3e5a5c7c!2sMGC%20R%C3%A9paration%20inc.!5e0!3m2!1sen!2sca!4v1684351042730!5m2!1sen!2sca" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="dark:filter dark:grayscale dark:invert dark:contrast-125"
                                ></iframe>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-brand-dark p-8 rounded-xl shadow-lg">
                            <h3 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-5">{t.footer.operatingHours}</h3>
                             {isLoading ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 my-3 animate-pulse"></div>) :
                                <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-lg">
                                    {operatingHours.map((line, index) => (
                                        <li key={index} className="flex justify-between"><span className="font-semibold">{line[language].split(':')[0]}</span><span>{line[language].split(':')[1]}</span></li>
                                    ))}
                                </ul>
                            }
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
      <BookingAndMapSection />
      <Testimonials />
    </>
  );
};

export default HomePage;