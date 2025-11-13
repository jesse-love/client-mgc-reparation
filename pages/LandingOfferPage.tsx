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

const LandingOfferPage: React.FC = () => {
  return (
    <LandingLayout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Col 1: Headline & Hook */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white leading-tight">
                Bruit de freins suspect? Obtenez votre inspection <span className="text-orange-500">100% GRATUITE</span> à Terrebonne.
              </h1>
              <h3 className="mt-6 text-xl md:text-2xl text-slate-300">
                "Les concessionnaires vous facturent 150$ juste pour regarder votre auto. Oubliez ça. Obtenez un diagnostic honnête et gratuit de nos experts certifiés à Terrebonne, et sachez <span className="font-bold text-white">exactement</span> ce qui ne va pas avant de payer un sou."
              </h3>
            </div>
            {/* Col 2: Form */}
            <div>
              <LandingContactForm 
                formTitle="OUI! Je veux mon inspection GRATUITE!"
                ctaButtonText="OUI! JE VEUX MON INSPECTION GRATUITE!"
                reassuranceText="Garanti 100% gratuit. Sans obligation. Réponse rapide assurée."
                avatarType="alex_anxieux"
                webhookTitle="🚨 LEAD URGENT (Freins)"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-oswald font-bold text-center text-white mb-12">Reprenez la route l'esprit tranquille. Votre inspection gratuite inclut :</h2>
          <div className="space-y-8 text-lg">
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Sachez le vrai problème</h4>
                <p className="text-slate-300">Recevez un diagnostic précis et honnête, sans jargon.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Économisez instantanément</h4>
                <p className="text-slate-300">Obtenez 10% de rabais sur toutes les pièces nécessaires si une réparation est requise.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Conduisez en sécurité</h4>
                <p className="text-slate-300">Reprenez la route en sachant que vos freins sont 100% sécuritaires.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Pas de surprises</h4>
                <p className="text-slate-300">Nous ne faisons jamais de réparations sans votre approbation claire.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
           <h2 className="text-3xl md:text-4xl font-oswald font-bold text-center text-white mb-12">Ce que nos clients de Terrebonne disent :</h2>
           <div className="grid md:grid-cols-3 gap-8">
              <Testimonial text="Service rapide et honnête. Ils ont trouvé le problème que mon ancien garage ne voyait pas. Je leur fais confiance les yeux fermés." author="Julie P., Terrebonne" />
              <Testimonial text="J'ai sauvé 200$ par rapport à la soumission du concessionnaire. Mon seul garage maintenant. Merci MGC!" author="Marc L., Mascouche" />
              <Testimonial text="Mes freins grinçaient et j'avais peur. Ils m'ont pris le jour-même. Service incroyable. Je recommande à 100%." author="Sophie B., Terrebonne" />
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white">Ne risquez pas votre sécurité un jour de plus.</h3>
          <div className="mt-8">
            <a href="#form" onClick={(e) => { e.preventDefault(); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30">
              RÉSERVEZ VOTRE INSPECTION 100% GRATUITE MAINTENANT!
            </a>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default LandingOfferPage;
