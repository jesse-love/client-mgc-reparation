import React from 'react';
import LandingLayout from '../components/LandingLayout';
import LandingContactForm from '../components/LandingContactForm';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Testimonial: React.FC<{ text: string; author: string }> = ({ text, author }) => (
  <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
    <p className="italic text-slate-300">"{text}"</p>
    <p className="mt-4 font-bold text-right text-slate-200">- {author}</p>
  </div>
);

const LandingHealthCheckPage: React.FC = () => {
  return (
    <LandingLayout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Col 1: Headline & Hook */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white leading-tight">
                Votre concessionnaire vous charge-t-il trop cher? Obtenez un bilan de santé <span className="text-orange-500">100% GRATUIT</span> pour vos freins.
              </h1>
              <h3 className="mt-6 text-xl md:text-2xl text-slate-300">
                "Les concessionnaires adorent les 'inspections' à 150$. Zéro obligation. Zéro jargon. Juste la vérité sur l'état de votre véhicule."
              </h3>
            </div>
            {/* Col 2: Form */}
            <div>
              <LandingContactForm
                formTitle="Obtenez votre bilan GRATUIT"
                ctaButtonText="OUI! JE VEUX MON BILAN HONNÊTE!"
                reassuranceText="Garanti 100% gratuit. Sans obligation. Pas de vente sous pression."
                avatarType="sophie_sage"
                webhookTitle="✅ NOUVEAU LEAD (Bilan)"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-oswald font-bold text-center text-white mb-12">Prenez les devants. Évitez les grosses factures.</h2>
          <div className="space-y-8 text-lg">
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Détectez les problèmes AVANT</h4>
                <p className="text-slate-300">Identifiez les soucis potentiels avant qu'ils ne deviennent des catastrophes à 2000$.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Obtenez un plan d'entretien clair</h4>
                <p className="text-slate-300">Nous vous disons ce qui est urgent et ce qui peut attendre, sans pression.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Validez (ou contestez) le devis</h4>
                <p className="text-slate-300">Notre bilan est 100% gratuit et sans engagement, un 2e avis parfait.</p>
              </div>
            </div>
             <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Économisez 10% sur les pièces</h4>
                <p className="text-slate-300">Si une maintenance préventive est nécessaire, obtenez un rabais.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
           <h2 className="text-3xl md:text-4xl font-oswald font-bold text-center text-white mb-12">Nos clients apprécient notre transparence :</h2>
           <div className="grid md:grid-cols-3 gap-8">
              <Testimonial text="Fatigué de me faire avoir par le concessionnaire. L'équipe de MGC m'a donné l'heure juste. Honnêtes et professionnels. Je ne vais plus ailleurs." author="David R., Terrebonne" />
              <Testimonial text="Ils m'ont expliqué clairement ce qui devait être fait maintenant et ce qui pouvait attendre 6 mois. J'ai enfin un garage de confiance à Mascouche." author="Sophie L." />
              <Testimonial text="L'inspection gratuite m'a permis d'économiser sur une réparation que mon autre garage jugeait 'urgente'. Merci pour l'honnêteté." author="Michel P." />
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white">La tranquillité d'esprit n'a pas de prix. Surtout quand elle est gratuite.</h3>
          <div className="mt-8">
            <a href="#form" onClick={(e) => { e.preventDefault(); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30">
              RÉSERVEZ VOTRE BILAN DE SANTÉ GRATUIT!
            </a>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default LandingHealthCheckPage;
