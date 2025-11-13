import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import TestimonialMarquee from '../components/TestimonialMarquee';
import InlineQuoteWizard from '../components/InlineQuoteWizard';

const LandingHealthCheckPage: React.FC = () => {
  const benefits = [
    { title: "Détectez les problèmes AVANT", description: "Évitez les catastrophes à 2000$." },
    { title: "Obtenez un plan d'entretien clair", description: "Nous vous disons ce qui est urgent et ce qui peut attendre." },
    { title: "Validez (ou contestez) le devis", description: "Notre bilan est un 2e avis parfait, 100% gratuit." },
    { title: "Économisez 10% sur les pièces", description: "Si une maintenance est nécessaire, obtenez un rabais." }
  ];

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
          
          {/* Col 2: Form */}
          <div className="w-full">
            <InlineQuoteWizard 
              avatarType="sophie_sage"
              webhookTitle="✅ NOUVEAU LEAD (Bilan)"
              defaultServiceCategory="Maintenance/Inspection"
            />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default LandingHealthCheckPage;