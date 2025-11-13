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

const LandingTiresPage: React.FC = () => {
  return (
    <LandingLayout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Col 1: Headline & Hook */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white leading-tight">
                Temps de changer vos pneus? Ajoutez une Inspection de Freins <span className="text-orange-500">GRATUITE</span> (Valeur 99$).
              </h1>
              <h3 className="mt-6 text-xl md:text-2xl text-slate-300">
                "Pourquoi faire deux voyages au garage? Pendant que vos pneus sont changés à Terrebonne, nos experts inspecteront vos freins gratuitement. Repartez en toute sécurité pour la nouvelle saison."
              </h3>
            </div>
            {/* Col 2: Form */}
            <div>
              <LandingContactForm
                formTitle='Réservez votre "Combo" Pneus + Freins!'
                ctaButtonText='OUI! JE VEUX MON "COMBO" SAISONNIER!'
                reassuranceText="Inspection gratuite avec votre changement de pneus. Service rapide garanti."
                avatarType="martin_prevoyant"
                webhookTitle=" pneus NOUVEAU LEAD (Pneus)"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-oswald font-bold text-center text-white mb-12">Soyez prêt pour la route. C'est simple, rapide et intelligent.</h2>
          <div className="space-y-8 text-lg">
             <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Économisez du temps</h4>
                <p className="text-slate-300">Faites tout en un seul rendez-vous. C'est la solution la plus efficace à Terrebonne.</p>
              </div>
            </div>
             <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">C'est logique</h4>
                <p className="text-slate-300">Les roues sont déjà enlevées pour les pneus. C'est le moment idéal pour une inspection visuelle complète de vos freins.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Repartez en sécurité</h4>
                <p className="text-slate-300">Après vos pneus, les freins sont l'élément de sécurité #1 à vérifier avant l'hiver (ou l'été).</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">Économisez 10% sur les pièces</h4>
                <p className="text-slate-300">Si vos plaquettes ou disques sont usés, obtenez 10% de rabais sur les pièces de remplacement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
           <h2 className="text-3xl md:text-4xl font-oswald font-bold text-center text-white mb-12">Nos clients adorent l'efficacité de notre service saisonnier :</h2>
           <div className="grid md:grid-cols-3 gap-8">
              <Testimonial text="Je vais chez MGC pour mes pneus chaque saison. Le service est rapide, et l'inspection gratuite des freins m'a donné la paix d'esprit pour l'hiver." author="Martin V., Terrebonne" />
              <Testimonial text="Super service! J'ai pu faire mon changement de pneus et une vérification en même temps. Équipe efficace et honnête." author="Isabelle D., Mascouche" />
              <Testimonial text="Ils ont remarqué que mes plaquettes de frein étaient presque finies pendant mon changement de pneus. Ça m'a sauvé un autre voyage! Je recommande." author="Patrick G." />
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white">Soyez prêt pour la nouvelle saison. Ne laissez rien au hasard.</h3>
          <div className="mt-8">
            <a href="#form" onClick={(e) => { e.preventDefault(); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30">
              RÉSERVEZ VOTRE CHANGEMENT DE PNEUS + INSPECTION GRATUITE!
            </a>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default LandingTiresPage;
