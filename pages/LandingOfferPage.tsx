import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import TestimonialMarquee from '../components/TestimonialMarquee';
import { usePrequalificationForm } from '../contexts/PrequalificationFormContext';

const LandingOfferPage: React.FC = () => {
  const { openForm } = usePrequalificationForm();

  const benefits = [
    { title: "Sachez le vrai problème", description: "Recevez un diagnostic précis et honnête, sans jargon." },
    { title: "Économisez instantanément", description: "Obtenez 10% de rabais sur toutes les pièces si une réparation est requise." },
    { title: "Conduisez en sécurité", description: "Repartez en sachant que vos freins sont 100% sécuritaires." },
    { title: "Pas de surprises", description: "Nous ne faisons jamais de réparations sans votre approbation claire." }
  ];

  const handleOpenForm = () => {
    openForm({
      avatarType: 'alex_anxieux',
      webhookTitle: '🚨 LEAD URGENT (Freins)',
    });
  };

  return (
    <LandingLayout>
      <div className="flex flex-col flex-grow">
        <div className="flex-grow flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center py-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white leading-tight">
                Bruit de freins suspect? Obtenez votre inspection <span className="text-orange-500">100% GRATUITE</span> à Terrebonne.
              </h1>
              <h3 className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-300">
                "Les concessionnaires vous facturent 150$ juste pour regarder. Oubliez ça. Sachez <span className="font-bold text-white">exactement</span> ce qui ne va pas avant de payer un sou."
              </h3>
              <div className="mt-10">
                <button 
                  onClick={handleOpenForm}
                  className="bg-orange-500 text-slate-900 font-bold py-4 px-10 rounded-md hover:bg-orange-400 transition duration-300 text-xl shadow-lg hover:shadow-orange-500/40 transform hover:scale-105"
                >
                  OUI! JE VEUX MON INSPECTION GRATUITE!
                </button>
                <p className="text-center text-sm text-slate-400 mt-4">Garanti 100% gratuit. Sans obligation. Réponse rapide assurée.</p>
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

export default LandingOfferPage;
