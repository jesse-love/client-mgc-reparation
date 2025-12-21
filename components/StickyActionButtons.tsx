import React from 'react';
import { PhoneIcon, BoltIcon } from '@heroicons/react/24/solid';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { useLanguage } from '../contexts/LanguageContext';

const StickyActionButtons: React.FC = () => {
    const { phone } = useBusinessInfo();
    const { openWizard } = useQuoteWizard();
    const { t } = useLanguage();

    const handleCall = () => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-3 safe-area-bottom">
            <div className="flex space-x-3">
                {/* Call Button */}
                <button
                    onClick={handleCall}
                    className="flex-1 flex items-center justify-center py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg border border-slate-300 dark:border-slate-700 active:bg-slate-200 transition-colors"
                >
                    <PhoneIcon className="h-5 w-5 mr-2 text-slate-600 dark:text-slate-400" />
                    <span>Appeler</span>
                </button>

                {/* Quote Button (Primary) */}
                <button
                    onClick={() => openWizard()}
                    className="flex-[1.5] flex items-center justify-center py-3 bg-orange-500 text-white font-oswald font-bold tracking-wide rounded-lg shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
                >
                    <BoltIcon className="h-5 w-5 mr-2 animate-pulse" />
                    <span>DEVIS RAPIDE</span>
                </button>
            </div>
        </div>
    );
};

export default StickyActionButtons;
