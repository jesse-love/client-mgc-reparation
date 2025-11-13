import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import TestimonialMarquee from '../components/TestimonialMarquee';
import { usePrequalificationForm } from '../contexts/PrequalificationFormContext';

const LandingHealthCheckPage: React.FC = () => {
  const { openForm } = usePrequalificationForm();
  
  const handleOpenForm = () => {
    openForm({
      avatarType: 'sophie_sage',
      webhookTitle: '✅ NOUVEAU LEAD (Bilan)',
    });
  };

  return (
    <LandingLayout>
       <div className="flex flex-col flex-grow">
        <div className="flex-grow flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center py-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white leading-tight">
                Votre concessionnaire vous charge-t-il trop cher? Obtenez un bilan de santé <span className="text-orange-500">100% GRATUIT</span>.
              </h1>
              <h3 className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-300">
                "Les concessionnaires adorent les 'inspections' à 150$. Zéro obligation. Zéro jargon. Juste la vérité sur l'état de votre véhicule."
              </h3>
              <div className="mt-10">
                <button 
                  onClick={handleOpenForm}
                  className="bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition duration-300 text-xl shadow-lg hover:shadow-orange-500/40 transform hover:scale-105"
                >
                  OUI! JE VEUX MON BILAN HONNÊTE!
                </button>
                <p className="text-center text-sm text-slate-400 mt-4">Garanti 100% gratuit. Sans obligation. Pas de vente sous pression.</p>
              </div>
            </div>
        </div>
        <div className="w-full pb-10">
            <TestimonialMarquee />
        </div>
      </div>
    </LandingLayout>
  );
};

export default LandingHealthCheckPage;
