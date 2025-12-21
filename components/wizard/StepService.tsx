import React from 'react';
import { useQuoteWizard } from '../../contexts/QuoteWizardContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
    TruckIcon, WrenchScrewdriverIcon, DocumentMagnifyingGlassIcon,
    CogIcon, BoltIcon, CheckCircleIcon, PlusIcon, ArrowLeftIcon
} from '@heroicons/react/24/solid';

const StepService: React.FC = () => {
    const { wizardData, setWizardData } = useQuoteWizard();
    const { t } = useLanguage();

    const handleSelect = (serviceCategory: string) => {
        setWizardData(prev => ({ ...prev, serviceCategory, step: 3 })); // Proceed to Step 3: Vehicle Spec
    };

    const handleBack = () => {
        setWizardData(prev => ({ ...prev, step: 1 }));
    };

    const getOptions = () => {
        switch (wizardData.vehicleType) {
            case 'Heavy Truck':
                return [
                    {
                        id: 'priority',
                        badge: t.quoteWizard.priorityAccess?.label || "VIP",
                        badgeColor: "bg-red-600",
                        icon: TruckIcon,
                        iconColor: "text-red-500",
                        title: "Service Prioritaire VIP",
                        description: "Coupez la file. Diagnostic immédiat pour minimiser vos pertes."
                    },
                    {
                        id: 'fleet',
                        badge: "Flotte",
                        badgeColor: "bg-blue-600",
                        icon: WrenchScrewdriverIcon,
                        iconColor: "text-blue-500",
                        title: "Entretien de Flotte",
                        description: "Maintenance préventive pour éviter les bris coûteux."
                    },
                    {
                        id: 'dot',
                        badge: "SAAQ",
                        badgeColor: "bg-slate-600",
                        icon: DocumentMagnifyingGlassIcon,
                        iconColor: "text-slate-500",
                        title: "Inspection SAAQ / PEP",
                        description: "Conformité garantie. On s'assure que vous passez l'inspection."
                    }
                ];
            case 'Generator':
                return [
                    {
                        id: 'emergency',
                        badge: "URGENCE",
                        badgeColor: "bg-red-600",
                        icon: BoltIcon,
                        iconColor: "text-red-500",
                        title: "Réparation d'Urgence",
                        description: "Panne de courant? On arrive. Service mobile 24/7."
                    },
                    {
                        id: 'maintenance',
                        badge: "Prévention",
                        badgeColor: "bg-green-600",
                        icon: CheckCircleIcon,
                        iconColor: "text-green-500",
                        title: "Plan de Maintenance",
                        description: "Assurez-vous qu'elle démarre quand vous en avez besoin."
                    },
                    {
                        id: 'install',
                        badge: "Nouveau",
                        badgeColor: "bg-blue-600",
                        icon: PlusIcon,
                        iconColor: "text-blue-500",
                        title: "Installation / Transfert",
                        description: "Installation sécuritaire et conforme aux normes."
                    }
                ];
            default: // Car / SUV / Trailer
                return [
                    {
                        id: 'mechanic',
                        badge: t.quoteWizard.steps[2].offers.alex.badge,
                        badgeColor: "bg-amber-500",
                        icon: WrenchScrewdriverIcon,
                        iconColor: "text-amber-500",
                        title: t.quoteWizard.steps[2].offers.alex.title,
                        description: t.quoteWizard.steps[2].offers.alex.description
                    },
                    {
                        id: 'diagnostic',
                        badge: t.quoteWizard.steps[2].offers.sophie.badge,
                        badgeColor: "bg-blue-600",
                        icon: DocumentMagnifyingGlassIcon,
                        iconColor: "text-blue-500",
                        title: t.quoteWizard.steps[2].offers.sophie.title,
                        description: t.quoteWizard.steps[2].offers.sophie.description
                    },
                    {
                        id: 'tires',
                        badge: t.quoteWizard.steps[2].offers.martin.badge,
                        badgeColor: "bg-green-600",
                        icon: CogIcon,
                        iconColor: "text-green-500",
                        title: t.quoteWizard.steps[2].offers.martin.title,
                        description: t.quoteWizard.steps[2].offers.martin.description
                    }
                ];
        }
    };

    const options = getOptions();
    const title = wizardData.vehicleType === 'Heavy Truck' ? "Solutions Poids Lourds" :
        wizardData.vehicleType === 'Generator' ? "Solutions Énergie" :
            t.quoteWizard.steps[2].title;

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <h3 className="text-center text-slate-600 dark:text-slate-400 mb-6 font-medium">
                {wizardData.vehicleType === 'Heavy Truck' ? "Minimisez vos temps d'arrêt." :
                    wizardData.vehicleType === 'Generator' ? "Ne restez pas dans le noir." :
                        "Sélectionnez le service requis."}
            </h3>

            <div className="space-y-4 overflow-y-auto pb-4 custom-scrollbar">
                {options.map((opt) => (
                    <button key={opt.id} onClick={() => handleSelect(opt.title)} className="w-full text-left p-5 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-slate-700 transition-all flex flex-col relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group shadow-sm hover:shadow-md hover:-translate-y-0.5 transform duration-200">
                        <div className={`absolute top-0 right-0 ${opt.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg uppercase tracking-wider`}>
                            {opt.badge}
                        </div>
                        <div className="flex items-center mb-2">
                            <div className="p-2 bg-white dark:bg-slate-700 rounded-full mr-3 shadow-sm">
                                <opt.icon className={`h-6 w-6 ${opt.iconColor}`} />
                            </div>
                            <span className="font-bold text-lg md:text-xl font-oswald tracking-wide">{opt.title}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 pl-12 leading-relaxed">
                            {opt.description}
                        </p>
                    </button>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                <button type="button" onClick={handleBack} className="flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> {t.quoteWizard.buttons.back}
                </button>
            </div>
        </div>
    );
};

export default StepService;
