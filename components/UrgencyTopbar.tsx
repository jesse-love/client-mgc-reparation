import React from 'react';
import pseoData from '../data/pseo_content.json';

const UrgencyTopbar: React.FC = () => {
    const path = window.location.pathname;
    // Extract slug: /faq/antirouille-laval -> antirouille-laval
    const slug = path.replace('/faq/', '');

    // @ts-ignore
    const pageData = pseoData[slug];
    const city = pageData?.city || "votre région";

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white text-center py-2 px-4 shadow-md text-sm font-bold h-10 flex items-center justify-center animate-pulse">
            ⚠️ Attention {city} : Disponibilités limitées cette semaine pour ce service.
        </div>
    );
};

export default UrgencyTopbar;
