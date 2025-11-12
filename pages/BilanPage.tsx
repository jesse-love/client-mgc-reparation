import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LandingPageForm from '../components/LandingPageForm';
import { PPL_TESTIMONIALS } from '../data';
import MetaTags from '../components/MetaTags';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const BilanPage: React.FC = () => {
    const { language, t } = useLanguage();
    const pageContent = t.ppl.bilan;
    const testimonials = PPL_TESTIMONIALS.bilan;

    return (
        <>
            <MetaTags 
                title="Bilan de Santé Auto GRATUIT | MGC Réparation Terrebonne"
                description="Le concessionnaire charge trop cher? Obtenez un 2e avis et un bilan de santé 100% GRATUIT et honnête à Terrebonne. Zéro pression, juste la vérité."
            />
            <div className="bg-brand-dark text-white">
                {/* Section 1: Above the Fold */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl lg:text-5xl font-extrabold !leading-tight">{pageContent.h1}</h1>
                                <p className="mt-6 text-xl text-gray-300 italic">{pageContent.h3}</p>
                            </div>
                            <div>
                                <LandingPageForm avatar="sophie" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
             {/* Section 2: Desire & Social Proof */}
            <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-brand-dark dark:text-white">{pageContent.desireTitle}</h2>
                        </div>
                        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                            {pageContent.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircleIcon className="h-7 w-7 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                         <div className="mt-16">
                            <h2 className="text-3xl font-bold text-center text-brand-dark dark:text-white">{pageContent.socialProofTitle}</h2>
                            <div className="mt-8 space-y-8">
                                {testimonials.map((testimonial, index) => (
                                    <blockquote key={index} className="text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                        <p className="text-xl italic text-gray-700 dark:text-gray-300">"{testimonial.quote[language]}"</p>
                                        <footer className="mt-4 font-bold text-orange-500">- {testimonial.author[language]}</footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section 3: Final Action */}
            <section className="py-16 bg-brand-dark text-white text-center">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold">{pageContent.finalActionTitle}</h3>
                    <a href="#form" onClick={(e) => { e.preventDefault(); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); }}
                       className="mt-6 inline-block bg-orange-500 text-brand-dark font-extrabold py-4 px-8 rounded-md hover:bg-orange-600 transition duration-300 text-lg shadow-lg">
                        {pageContent.finalActionCta}
                    </a>
                </div>
            </section>
        </>
    );
};

export default BilanPage;
