import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import MetaTags from '../components/MetaTags';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const MerciPage: React.FC = () => {
    const { t } = useLanguage();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const from = params.get('from');
        
        let avatar_type = 'unknown';
        if (from === 'offre') avatar_type = 'alex_anxieux';
        if (from === 'bilan') avatar_type = 'sophie_sage';
        if (from === 'pneus') avatar_type = 'martin_prevoyant';

        // Placeholder for GTM/GA4 event tracking
        console.log('CONVERSION EVENT: generate_lead');
        console.log('AVATAR_TYPE:', avatar_type);
        
        /* 
        // Example of how to push to a dataLayer for Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'generate_lead',
            'avatar_type': avatar_type
        });
        */
        
    }, []);

    return (
        <>
            <MetaTags 
                title="Merci! | MGC Réparation"
                description="Votre demande a été soumise avec succès."
                noIndex={true}
            />
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-800">
                <div className="text-center p-8 max-w-lg mx-auto">
                    <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
                    <h1 className="text-4xl font-extrabold text-brand-dark dark:text-white">{t.ppl.merci.title}</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        {t.ppl.merci.message}
                    </p>
                    <a 
                        href="/"
                        className="mt-8 inline-block bg-orange-500 text-brand-dark font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition duration-300 text-lg"
                    >
                        {t.ppl.merci.backToHome}
                    </a>
                </div>
            </div>
        </>
    );
};

export default MerciPage;
