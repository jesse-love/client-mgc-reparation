import React, { useEffect } from 'react';
import LandingLayout from '../components/LandingLayout';
import { trackLeadGeneration } from '../utils/googleTag';
import { CheckCircleIcon, PhoneIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';

const ThankYouPage: React.FC = () => {
  const { phone } = useBusinessInfo();

  // Parse URL params for personalization
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || '';
  const vehicleType = params.get('vehicleType');

  useEffect(() => {
    // Tracking Logic
    const avatarType = params.get('avatar') || 'wizard';
    if (avatarType) {
      const userData = {
        name: params.get('name') || undefined,
        email: params.get('email') || undefined,
        phone: params.get('phone') || undefined,
      };

      trackLeadGeneration({
        avatarType,
        userData,
        vehicleType: vehicleType || undefined,
      });
    }
  }, []);

  return (
    <LandingLayout>
      <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4">

        {/* SUCCESS HEADER */}
        <div className="text-center mb-10 max-w-3xl animate-fadeIn">
          <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-full mb-6 ring-1 ring-green-500/20">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-oswald font-bold text-white mb-4">
            Merci! Demande Reçue.
          </h1>
          <p className="text-xl text-slate-300">
            Votre demande a bien été transmise à notre équipe.
          </p>
          <p className="mt-2 text-xl md:text-2xl font-bold text-orange-500 animate-pulse">
            Un expert mécanicien analyse votre dossier en ce moment même.
          </p>
        </div>

        {/* NEXT STEPS BOX (Screenshot Replica) */}
        <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-lg p-8 shadow-2xl animate-slideUp">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-slate-700 pb-4 mb-6">
            PROCHAINES ÉTAPES :
          </h2>

          <div className="space-y-8">
            {/* Step 1: Call */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-900/50 p-3 rounded-lg mr-5">
                <PhoneIcon className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">1. Appel de Confirmation</h3>
                <p className="text-slate-400 leading-relaxed">
                  Gardez votre téléphone près de vous. Nous vous appellerons (souvent en moins de 15 min) pour confirmer les détails.
                </p>
              </div>
            </div>

            {/* Step 2: Scheduling */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-yellow-900/30 p-3 rounded-lg mr-5">
                <ClockIcon className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">2. Planification</h3>
                <p className="text-slate-400 leading-relaxed">
                  Nous bloquerons la plage horaire idéale pour votre {vehicleType || 'véhicule'}.
                </p>
              </div>
            </div>

            {/* Step 3: Warranty */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-900/30 p-3 rounded-lg mr-5">
                <ShieldCheckIcon className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">3. Réparation Garantie</h3>
                <p className="text-slate-400 leading-relaxed">
                  Présentez-vous au garage. On s'occupe du reste. Travail 100% garanti.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IMMEDIATE ACTION CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-2 text-sm uppercase tracking-wide">Besoin d'une réponse immédiate?</p>
          <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center text-2xl md:text-3xl font-oswald font-bold text-white hover:text-orange-500 transition-colors">
            Appelez l'atelier maintenant : {phone}
          </a>
        </div>

      </div>
    </LandingLayout>
  );
};

export default ThankYouPage;