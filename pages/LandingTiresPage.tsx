import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import TestimonialMarquee from '../components/TestimonialMarquee';
import { usePrequalificationForm } from '../contexts/PrequalificationFormContext';

const LandingTiresPage: React.FC = () => {
  const { openForm } = usePrequalificationForm();

  const benefits = [
    { title: "Économisez du temps", description: "Faites tout en un seul rendez-vous. La solution la plus efficace." },
    { title: "C'est logique", description: "Les roues sont déjà enlevées. C'est le moment idéal pour une inspection." },
    { title: "Repartez en sécurité", description: "Les freins sont l'élément #1 à vérifier avant la saison." },
    { title: "Économisez 10% sur les pièces", description: "Si vos plaquettes sont usées, obtenez 10% de rabais." }
  ];

  const handleOpenForm = () => {
    openForm({
      avatarType: 'martin_prevoyant',
      webhookTitle: '❄️ NOUVEAU LEAD (Pneus)',
    });
  };

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Col 1: Headline, Benefits, Social Proof */}
          <div className="flex flex-col h-full">
            <div className="text-center lg:text-left flex-grow">
              <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white leading-tight">
                Temps de changer vos pneus? Ajoutez une Inspection de Freins <span className="text-orange-500">GRATUITE</span> (Valeur 99$).
              </h1>
              <h3 className="mt-4 text-lg md:text-xl text-slate-300">
                "Pourquoi faire deux voyages au garage? Pendant que vos pneus sont changés, nos experts inspecteront vos freins gratuitement. Repartez en toute sécurité."
              </h3>

              <div className="mt-8 space-y-4 text-left">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-slate-200"><span className="font-bold text-white">{benefit.title}:</span> {benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             <div className="mt-12 w-full">
                <TestimonialMarquee />
            </div>
          </div>
          
          {/* Col 2: Form CTA */}
          <div className="w-full flex items-center justify-center">
            <div className="bg-slate-800 p-8 rounded-lg shadow-2xl border border-slate-700 w-full max-w-md text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Réservez votre "Combo" Pneus + Freins!</h3>
                <p className="text-slate-300 mb-6">Soyez prêt pour la route en un seul rendez-vous intelligent.</p>
                <button 
                  onClick={handleOpenForm}
                  className="w-full bg-orange-500 text-slate-900 font-bold py-4 px-6 rounded-md hover:bg-orange-400 transition duration-300 text-xl shadow-lg hover:shadow-orange-500/40 transform hover:scale-105"
                >
                  OUI! JE VEUX MON "COMBO" SAISONNIER!
                </button>
                <p className="text-center text-sm text-slate-400 mt-4">Inspection gratuite avec votre changement de pneus. Service rapide garanti.</p>
             </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default LandingTiresPage;