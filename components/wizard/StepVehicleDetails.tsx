import React, { useState, useEffect, useRef } from 'react';
import { useQuoteWizard } from '../../contexts/QuoteWizardContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { VEHICLE_MAKES, VEHICLE_YEARS } from '../../utils/vehicleData';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const StepVehicleDetails: React.FC = () => {
    const { wizardData, setWizardData } = useQuoteWizard();
    const { t } = useLanguage();

    // Internal Micro-Steps: 'YEAR' | 'MAKE' | 'MODEL'
    const [internalStep, setInternalStep] = useState<'YEAR' | 'MAKE' | 'MODEL'>('YEAR');
    const [searchTerm, setSearchTerm] = useState('');
    const modelInputRef = useRef<HTMLInputElement>(null);

    // Filter Makes
    const filteredMakes = VEHICLE_MAKES.filter(make =>
        make.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- HANDLERS ---

    const handleBack = () => {
        if (internalStep === 'MODEL') setInternalStep('MAKE');
        else if (internalStep === 'MAKE') setInternalStep('YEAR');
        else setWizardData(prev => ({ ...prev, step: 2 })); // Back to Service
    };

    const handleSelectYear = (year: string) => {
        setWizardData(prev => ({ ...prev, vehicleYear: year }));
        setInternalStep('MAKE');
    };

    const handleSelectMake = (make: string) => {
        setWizardData(prev => ({ ...prev, vehicleMake: make }));
        setInternalStep('MODEL');
    };

    const handleSubmitModel = (e: React.FormEvent) => {
        e.preventDefault();
        if (wizardData.vehicleModel) {
            setWizardData(prev => ({ ...prev, step: 4 })); // Go to Contact
        }
    };

    const handleModelKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && wizardData.vehicleModel) {
            setWizardData(prev => ({ ...prev, step: 4 }));
        }
    };

    // Auto-focus logic
    useEffect(() => {
        if (internalStep === 'MODEL' && modelInputRef.current) {
            modelInputRef.current.focus();
        }
    }, [internalStep]);

    // RENDERERS
    const renderYearSelection = () => (
        <div className="animate-slideInRight">
            <h3 className="text-2xl font-oswald font-bold text-center mb-6 text-slate-800 dark:text-white">
                Année du véhicule?
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 max-h-[50vh] overflow-y-auto custom-scrollbar p-1">
                {VEHICLE_YEARS.map(year => (
                    <button
                        key={year}
                        onClick={() => handleSelectYear(year)}
                        className={`py-3 rounded-md font-bold text-lg transition-all ${wizardData.vehicleYear === year
                                ? 'bg-orange-500 text-white shadow-lg scale-105'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-orange-100 dark:hover:bg-slate-600'
                            }`}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderMakeSelection = () => (
        <div className="animate-slideInRight flex flex-col h-full">
            <h3 className="text-2xl font-oswald font-bold text-center mb-4 text-slate-800 dark:text-white">
                Marque du véhicule?
            </h3>

            <div className="relative mb-4">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Rechercher une marque..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full focus:ring-2 focus:ring-orange-500 outline-none text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto custom-scrollbar flex-grow p-1">
                {filteredMakes.map(make => (
                    <button
                        key={make}
                        onClick={() => handleSelectMake(make)}
                        className={`py-4 px-2 rounded-lg font-bold text-md transition-all flex items-center justify-center text-center ${wizardData.vehicleMake === make
                                ? 'bg-orange-500 text-white shadow-lg'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-600 border border-transparent hover:border-orange-200'
                            }`}
                    >
                        {make}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderModelInput = () => (
        <div className="animate-slideInRight flex flex-col items-center justify-center h-full">
            <h3 className="text-2xl font-oswald font-bold text-center mb-8 text-slate-800 dark:text-white">
                Quel est le modèle?
            </h3>

            <div className="w-full max-w-md">
                <input
                    ref={modelInputRef}
                    type="text"
                    placeholder="ex: Civic, F-150, Corolla..."
                    className="w-full text-center text-3xl p-4 bg-transparent border-b-4 border-slate-300 dark:border-slate-600 focus:border-orange-500 outline-none transition-colors mb-8 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold"
                    value={wizardData.vehicleModel || ''}
                    onChange={(e) => setWizardData(prev => ({ ...prev, vehicleModel: e.target.value }))}
                    onKeyDown={handleModelKeyDown}
                />

                <button
                    onClick={handleSubmitModel}
                    disabled={!wizardData.vehicleModel}
                    className="w-full py-4 bg-orange-500 text-white font-bold text-xl rounded-full hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    CONTINUER <span className="ml-2">↵</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            {/* Progress Micro-indicator */}
            <div className="flex justify-center space-x-2 mb-4">
                <div className={`h-1 w-8 rounded-full ${internalStep === 'YEAR' ? 'bg-orange-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                <div className={`h-1 w-8 rounded-full ${internalStep === 'MAKE' ? 'bg-orange-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                <div className={`h-1 w-8 rounded-full ${internalStep === 'MODEL' ? 'bg-orange-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
            </div>

            <div className="flex-grow overflow-hidden relative">
                {internalStep === 'YEAR' && renderYearSelection()}
                {internalStep === 'MAKE' && renderMakeSelection()}
                {internalStep === 'MODEL' && renderModelInput()}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={handleBack} className="flex items-center text-sm font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> Retour
                </button>
            </div>
        </div>
    );
};

export default StepVehicleDetails;
