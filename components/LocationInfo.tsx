import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';

const LocationInfo: React.FC = () => {
    const { language, t } = useLanguage();
    const { address, googleMapsUrl, operatingHours, isLoading } = useBusinessInfo();
    return (
        <section className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Map and Info */}
                    <div className="space-y-10">
                        <div className="bg-white dark:bg-brand-dark p-8 rounded-xl shadow-lg">
                            <h3 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-5">{t.home.contactMap.visitTitle}</h3>
                            {isLoading ? <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse"></div> : <>
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">{address}</p>
                                <a 
                                    href={googleMapsUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-block font-bold text-orange-500 hover:text-orange-600 transition duration-300"
                                >
                                    {t.home.contactMap.cta} &rarr;
                                </a>
                            </>}
                            <div className="h-80 mt-6 rounded-lg shadow-md overflow-hidden border-4 border-slate-200 dark:border-slate-800">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.820251817549!2d-73.6190136844309!3d45.71633597910488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc6a782a201206b%3A0x6e8a0f2b3e5a5c7c!2sMGC%20R%C3%A9paration%20inc.!5e0!3m2!1sen!2sca!4v1684351042730!5m2!1sen!2sca" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="dark:filter dark:grayscale dark:invert dark:contrast-125"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                     {/* Operating Hours */}
                     <div className="bg-white dark:bg-brand-dark p-8 rounded-xl shadow-lg h-full">
                        <h3 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-5">{t.footer.operatingHours}</h3>
                         {isLoading ? Array.from({ length: 7 }).map((_, i) => <div key={i} className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 my-4 animate-pulse"></div>) :
                            <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-lg">
                                {operatingHours.map((line, index) => {
                                    const parts = line[language].split(':');
                                    const day = parts[0];
                                    const hours = parts.slice(1).join(':');
                                    return (
                                        <li key={index} className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                                            <span className="font-semibold text-slate-800 dark:text-slate-100">{day}</span>
                                            <span>{hours}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationInfo;
