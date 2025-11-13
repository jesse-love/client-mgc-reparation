import React, { useEffect } from 'react';
import LandingLayout from '../components/LandingLayout';
import { trackLeadGeneration } from '../utils/googleTag';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const avatarType = params.get('avatar');
    if (avatarType) {
      const userData = {
        name: params.get('name') || undefined,
        email: params.get('email') || undefined,
        phone: params.get('phone') || undefined,
      };
      const vehicleType = params.get('vehicleType') || undefined;

      trackLeadGeneration({ 
        avatarType, 
        userData,
        vehicleType,
      });
    }
  }, []);

  return (
    <LandingLayout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center p-8 max-w-2xl mx-auto">
          <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white">Merci! Votre demande a été envoyée.</h1>
          <p className="mt-4 text-xl text-slate-300">Un expert de notre équipe vous appellera d'ici 5 minutes pour confirmer votre rendez-vous.</p>
          <p className="mt-2 text-slate-400">Gardez votre téléphone à portée de main!</p>
        </div>
      </div>
    </LandingLayout>
  );
};

export default ThankYouPage;