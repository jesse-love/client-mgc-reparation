import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import TestimonialMarquee from '../components/TestimonialMarquee';
import { usePrequalificationForm } from '../contexts/PrequalificationFormContext';

const LandingHealthCheckPage: React.FC = () => {
  const { openForm } = usePrequalificationForm();
  
  const benefits = [
    { title: "Détectez les problèmes AVANT", description: "Évitez les catastrophes à 2000$." },
    { title: "Obtenez un plan d'entretien clair", description: "Nous vous disons ce qui est urgent et ce qui peut attendre." },
    { title: "Validez (ou contestez) le devis", description: "Notre bilan est un 2e avis parfait, 100% gratuit." },
    { title: "Économisez 10% sur les pièces", description: "Si une maintenance est nécessaire, obtenez un rabais." }
  ];
  
  const handleOpenForm = () => {
    openForm({
      avatarType: 'sophie_sage',
      webhookTitle: '✅ NOUVEAU LEAD (Bilan)',
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
                Votre concessionnaire vous charge-t-il trop cher? Obtenez un bilan de santé <span className="text-orange-500">100% GRATUIT</span>.
              </h1>
              <h3 className="mt-4 text-lg md:text-xl text-slate-300">
                "Les concessionnaires adorent les 'inspections' à 150$. Zéro obligation. Zéro jargon. Juste la vérité sur l'état de votre véhicule."
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
                <h3 className="text-2xl font-bold text-white mb-4">Obtenez votre bilan GRATUIT</h3>
                <p className="text-slate-300 mb-6">C'est rapide, facile et sans pression. Cliquez pour commencer.</p>
                <button 
                  onClick={handleOpenForm}
                  className="w-full bg-orange-500 text-slate-900 font-bold py-4 px-6 rounded-md hover:bg-orange-400 transition duration-300 text-xl shadow-lg hover:shadow-orange-500/40 transform hover:scale-105"
                >
                  OUI! JE VEUX MON BILAN HONNÊTE!
                </button>
                <p className="text-center text-sm text-slate-400 mt-4">Garanti 100% gratuit. Sans obligation. Pas de vente sous pression.</p>
             </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default LandingHealthCheckPage;