import React, { ReactNode } from 'react';
import { useQuoteWizard } from '../../contexts/QuoteWizardContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { XMarkIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';

interface WizardLayoutProps {
    children: ReactNode;
    title: string;
    showProgress?: boolean;
    currentStep?: number;
    totalSteps?: number;
}

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    return (
        <div className="w-full bg-white/10 rounded-full h-1.5 mt-4">
            <div className="bg-orange-500 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ width: `${(current / total) * 100}%` }}></div>
        </div>
    );
};

const WizardLayout: React.FC<WizardLayoutProps> = ({ children, title, showProgress = true, currentStep = 1, totalSteps = 3 }) => {
    const { isOpen, closeWizard, wizardData } = useQuoteWizard();
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={closeWizard}></div>

            <div className={`relative flex w-full h-full md:w-auto md:h-auto md:max-w-7xl md:max-h-[90vh] overflow-hidden transition-all duration-300 transform-gpu shadow-2xl md:rounded-2xl ring-1 ring-white/10 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

                {/* Left Info Panel (Trust Wall) */}
                <div className="hidden md:flex flex-col justify-between p-8 lg:p-12 text-white bg-gradient-to-br from-slate-900 to-blue-900 flex-shrink-0 md:w-1/2 lg:w-2/5 xl:w-1/3 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <div className="relative z-10">
                        <CheckCircleIcon className="w-16 h-16 text-orange-500 mb-6 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
                        <h2 className="text-4xl lg:text-5xl font-oswald font-bold leading-tight mb-4">{t.quoteWizard.infoPanel.title}</h2>
                        <p className="text-lg text-slate-300">{t.quoteWizard.infoPanel.subtitle}</p>
                    </div>

                    {/* Trust Wall - Dynamic Review */}
                    <div className="relative z-10 mt-12 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-xl">
                        <div className="flex text-amber-400 mb-3 space-x-1">
                            {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} className="h-5 w-5" />)}
                        </div>
                        <p className="italic text-slate-200 mb-4 leading-relaxed font-light">
                            "{wizardData.vehicleType === 'Heavy Truck'
                                ? "On perdait 2000$/jour avec notre camion en panne. MGC nous a remis sur la route en 4h."
                                : wizardData.vehicleType === 'Generator'
                                    ? "Pendant la tempête de verglas, ma génératrice a parti du premier coup grâce à leur maintenance."
                                    : wizardData.serviceCategory === '$49 Credited Diagnostic'
                                        ? t.quoteWizard.trustWall.maintenance
                                        : wizardData.serviceCategory === 'Oil Change + Free Inspection'
                                            ? t.quoteWizard.trustWall.repair
                                            : t.quoteWizard.trustWall.general}"
                        </p>
                        <div className="border-t border-white/10 pt-4">
                            <div className="font-bold text-white tracking-wide">— {
                                wizardData.vehicleType === 'Heavy Truck' ? 'Transport Gilmyr' :
                                    wizardData.vehicleType === 'Generator' ? 'Marc-André T.' :
                                        wizardData.serviceCategory === '$49 Credited Diagnostic' ? 'Sarah L.' : 'Mike R.'
                            }</div>
                            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{
                                wizardData.vehicleType === 'Heavy Truck' ? 'Gestionnaire de Flotte • Montréal' :
                                    wizardData.vehicleType === 'Generator' ? 'Résident • Terrebonne' :
                                        t.quoteWizard.trustWall.verified + ' • Mascouche'
                            }</div>
                        </div>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="relative flex-grow flex flex-col bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-6 sm:p-8 md:w-1/2 lg:w-3/5 xl:w-2/3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                    <button onClick={closeWizard} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-white/70 dark:hover:text-white z-20 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <XMarkIcon className="h-8 w-8" />
                    </button>

                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight">{title}</h2>
                        {showProgress && <div className="max-w-xs mx-auto"><ProgressBar current={currentStep} total={totalSteps} /></div>}
                    </div>

                    <div className="flex flex-col flex-grow">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WizardLayout;
