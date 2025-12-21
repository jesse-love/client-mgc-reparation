import React, { useState } from 'react';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { VEHICLE_YEARS, VEHICLE_MAKES } from '../utils/vehicleData';
import { BoltIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const HeroQuickStart: React.FC = () => {
    const { openWizard } = useQuoteWizard();
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Default to Car/Light Truck for the quick start as it's the 80% case
        openWizard({
            vehicleType: 'Car/SUV/Light Truck',
            vehicleYear: year,
            vehicleMake: make,
            vehicleModel: model,
            step: 2 // Send to Service Menu. The Context will carry the vehicle data.
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-2xl max-w-4xl mx-auto animate-fadeIn">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full h-12 rounded-md bg-white text-slate-900 px-3 font-semibold focus:ring-2 focus:ring-orange-500 outline-none"
                        required
                    >
                        <option value="" disabled>Année</option>
                        {VEHICLE_YEARS.slice(0, 20).map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <select
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        className="w-full h-12 rounded-md bg-white text-slate-900 px-3 font-semibold focus:ring-2 focus:ring-orange-500 outline-none"
                        required
                    >
                        <option value="" disabled>Marque</option>
                        {VEHICLE_MAKES.sort().map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Modèle (ex: Civic)"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full h-12 rounded-md bg-white text-slate-900 px-3 font-semibold focus:ring-2 focus:ring-orange-500 outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-oswald font-bold uppercase tracking-wide rounded-md shadow-lg shadow-orange-500/30 flex items-center justify-center transition-all hover:scale-105"
                >
                    <BoltIcon className="h-5 w-5 mr-2" />
                    <span>Devis</span>
                    <ChevronRightIcon className="h-5 w-5 ml-1" />
                </button>
            </div>
        </form>
    );
};

export default HeroQuickStart;
