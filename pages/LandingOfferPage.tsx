import React from 'react';
import LandingLayout from '../components/LandingLayout';
import LandingContactForm from '../components/LandingContactForm';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import LandingTestimonials from '../components/LandingTestimonials';

const LandingOfferPage: React.FC = () => {
  const benefits = [
    { title: "Sachez le vrai problème", description: "Recevez un diagnostic précis et honnête, sans jargon." },
    { title: "Économisez instantanément", description: "Obtenez 10% de rabais sur toutes les pièces si une réparation est requise." },
    { title: "Conduisez en sécurité", description: "Repartez en sachant que vos freins sont 100% sécuritaires." },
    { title: "Pas de surprises", description: "Nous ne faisons jamais de réparations sans votre approbation claire." }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Col 1: Headline, Benefits, Social Proof */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white leading-tight">
              Bruit de freins suspect? Obtenez votre inspection <span className="text-orange-500">100% GRATUITE</span> à Terrebonne.
            </h1>
            <h3 className="mt-4 text-lg md:text-xl text-slate-300">
              "Les concessionnaires vous facturent 150$ juste pour regarder. Oubliez ça. Sachez <span className="font-bold text-white">exactement</span> ce qui ne va pas avant de payer un sou."
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

            <div className="mt-8">
              <LandingTestimonials />
            </div>
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
    </LandingLayout>
  );
};

export default LandingOfferPage;