import React from 'react';
import { useQuoteWizard } from '../../contexts/QuoteWizardContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { WrenchScrewdriverIcon, TruckIcon, CogIcon } from '@heroicons/react/24/solid';

const StepVehicle: React.FC = () => {
    const { selectOption, setWizardData } = useQuoteWizard();
    const { t } = useLanguage();

    const handleSelect = (vehicleType: string) => {
        setWizardData(prev => ({ ...prev, vehicleType, step: 2 }));
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <button onClick={() => handleSelect('Car/SUV/Light Truck')} className="w-full text-left p-6 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 transition-all flex items-center text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group shadow-sm hover:shadow-md">
                <div className="bg-orange-100 dark:bg-slate-700 p-3 rounded-full mr-5 group-hover:bg-orange-200 dark:group-hover:bg-slate-600 transition-colors">
                    <WrenchScrewdriverIcon className="h-8 w-8 text-orange-500" />
                </div>
                <span className="font-semibold text-xl">{t.quoteWizard.steps[1].options.car}</span>
            </button>

            <button onClick={() => handleSelect('Heavy Truck')} className="w-full text-left p-6 border border-red-300 dark:border-red-900/50 rounded-lg hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group shadow-sm hover:shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-md uppercase tracking-wider">
                    Priority Access
                </div>
                <div className="bg-red-100 dark:bg-slate-700 p-3 rounded-full mr-5 group-hover:bg-red-200 dark:group-hover:bg-slate-600 transition-colors">
                    <TruckIcon className="h-8 w-8 text-red-500 group-hover:text-red-600" />
                </div>
                <div>
                    <span className="font-semibold block text-xl">{t.quoteWizard.steps[1].options.heavy}</span>
                    <span className="text-xs text-red-500 font-medium uppercase tracking-wider">{t.quoteWizard.priorityAccess.label}</span>
                </div>
            </button>

            <button onClick={() => handleSelect('Trailer/Other')} className="w-full text-left p-6 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all flex items-center text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group shadow-sm hover:shadow-md">
                <div className="bg-slate-200 dark:bg-slate-700 p-3 rounded-full mr-5 group-hover:bg-blue-200 dark:group-hover:bg-slate-600 transition-colors">
                    <CogIcon className="h-8 w-8 text-blue-500" />
                </div>
                <span className="font-semibold text-xl">{t.quoteWizard.steps[1].options.trailer}</span>
            </button>
        </div>
    );
};

export default StepVehicle;
