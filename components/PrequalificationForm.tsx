import React, { useState, useEffect } from 'react';
import { usePrequalificationForm } from '../contexts/PrequalificationFormContext';
import { XMarkIcon, CheckCircleIcon, ArrowLeftIcon, TruckIcon, CogIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';

type PrequalificationData = {
    step: number;
    problem: string;
    preferredDate: string;
    vehicleType: string;
    fullName: string;
    phone: string;
};

type ValidationErrors = {
    problem?: string;
    preferredDate?: string;
    vehicleType?: string;
    fullName?: string;
    phone?: string;
};

const initialData: PrequalificationData = {
    step: 1,
    problem: '',
    preferredDate: '',
    vehicleType: '',
    fullName: '',
    phone: '',
};

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    return (
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }}></div>
        </div>
    );
};

const PrequalificationForm: React.FC = () => {
    const { isOpen, closeForm, avatarType, webhookTitle } = usePrequalificationForm();
    const [formData, setFormData] = useState<PrequalificationData>(initialData);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const { t } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
            setErrors({});
        }
    }, [isOpen]);

    const handleNext = () => {
        if (validateStep()) {
            setFormData(prev => ({ ...prev, step: prev.step + 1 }));
        }
    };

    const handleBack = () => {
        setErrors({});
        setFormData(prev => ({ ...prev, step: prev.step - 1 }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };
    
    const handleSelectOption = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        handleNext();
    };

    const validateStep = (): boolean => {
        const newErrors: ValidationErrors = {};
        switch (formData.step) {
            case 1:
                if (avatarType === 'alex_anxieux' && !formData.problem.trim()) newErrors.problem = "Veuillez décrire le problème.";
                if (avatarType === 'sophie_sage' && !formData.problem.trim()) newErrors.problem = "Veuillez décrire votre besoin.";
                if (avatarType === 'martin_prevoyant' && !formData.preferredDate.trim()) newErrors.preferredDate = "Veuillez suggérer une date.";
                break;
            case 2:
                if (!formData.vehicleType) newErrors.vehicleType = "Veuillez sélectionner un type de véhicule.";
                break;
            case 3:
                if (!formData.fullName.trim()) newErrors.fullName = "Le nom est requis.";
                if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis.";
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;
        
        const webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQA5dTsm5U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=aCNAfav8FUhPPhQ0tMhrsE-6PCpIpxtyC3aor2E1UGA";
        
        const problemDescription = avatarType === 'martin_prevoyant' 
            ? `Changement de pneus. Date souhaitée: ${formData.preferredDate}.`
            : formData.problem;

        const messageBody = `*${webhookTitle}*

*Nom:* ${formData.fullName}
*Téléphone:* ${formData.phone}
*Type de véhicule:* ${formData.vehicleType}
---
*Description/Demande:*
${problemDescription}
        `.trim();
        
        const payload = { text: messageBody };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error(`Webhook failed with status ${response.status}`);
            
            window.location.href = `/merci?avatar=${avatarType}`;
        } catch (error) {
            console.error('Failed to submit form to webhook:', error);
            alert('Une erreur est survenue. Veuillez nous appeler directement.');
        }
    };

    const firstStepContent = () => {
        switch(avatarType) {
            case 'alex_anxieux':
                return {
                    title: "Décrivez-nous le problème",
                    content: (
                        <div>
                            <textarea name="problem" value={formData.problem} onChange={handleChange} rows={4} className={`w-full p-3 border-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.problem ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} placeholder="Ex: Bruit aigu au freinage, vibrations..."></textarea>
                            {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem}</p>}
                        </div>
                    )
                };
            case 'sophie_sage':
                 return {
                    title: "Décrivez le bilan ou l'estimation souhaitée",
                    content: (
                        <div>
                           <textarea name="problem" value={formData.problem} onChange={handleChange} rows={4} className={`w-full p-3 border-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.problem ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} placeholder="Ex: Bilan avant un long voyage, 2e avis sur un devis..."></textarea>
                           {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem}</p>}
                        </div>
                    )
                };
            case 'martin_prevoyant':
                 return {
                    title: "Quelle est la date/heure souhaitée pour votre combo pneu?",
                    content: (
                         <div>
                            <input type="text" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className={`w-full p-3 border-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.preferredDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} placeholder="Ex: La semaine prochaine, mardi matin..." />
                            {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
                        </div>
                    )
                };
            default: return { title: '', content: null };
        }
    };

    const renderStepContent = () => {
        switch (formData.step) {
            case 1:
                const { title, content } = firstStepContent();
                return (
                    <div>
                        <h2 className="text-3xl font-oswald font-bold mb-6 text-center">{title}</h2>
                        {content}
                        <div className="mt-6 text-right">
                            <button onClick={handleNext} className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition">{t.quoteWizard.buttons.next}</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-3xl font-oswald font-bold mb-6 text-center">{t.quoteWizard.steps[1].title}</h2>
                        <div className="space-y-4">
                             <button onClick={() => handleSelectOption('vehicleType', 'Car/SUV/Light Truck')} className={`w-full text-left p-6 border-2 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all flex items-center text-lg ${formData.vehicleType === 'Car/SUV/Light Truck' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-300 dark:border-slate-600'}`}>
                                <WrenchScrewdriverIcon className="h-10 w-10 text-orange-500 mr-5"/><span className="font-semibold">{t.quoteWizard.steps[1].options.car}</span>
                            </button>
                            <button onClick={() => handleSelectOption('vehicleType', 'Heavy Truck')} className={`w-full text-left p-6 border-2 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all flex items-center text-lg ${formData.vehicleType === 'Heavy Truck' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-300 dark:border-slate-600'}`}>
                                <TruckIcon className="h-10 w-10 text-orange-500 mr-5"/><span className="font-semibold">{t.quoteWizard.steps[1].options.heavy}</span>
                            </button>
                             <button onClick={() => handleSelectOption('vehicleType', 'Trailer/Other')} className={`w-full text-left p-6 border-2 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all flex items-center text-lg ${formData.vehicleType === 'Trailer/Other' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-300 dark:border-slate-600'}`}>
                                <CogIcon className="h-10 w-10 text-orange-500 mr-5"/><span className="font-semibold">{t.quoteWizard.steps[1].options.trailer}</span>
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                     <div>
                         <h2 className="text-3xl font-oswald font-bold mb-6 text-center">Vos informations de contact</h2>
                         <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input type="text" name="fullName" placeholder="Nom complet" value={formData.fullName} onChange={handleChange} className={`w-full p-3 border-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>
                            <div>
                                <input type="tel" name="phone" placeholder="Téléphone (Requis)" value={formData.phone} onChange={handleChange} className={`w-full p-3 border-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div className="pt-2 flex justify-between items-center">
                                <button type="button" onClick={handleBack} className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500"><ArrowLeftIcon className="h-4 w-4 mr-2" /> {t.quoteWizard.buttons.back}</button>
                                <button type="submit" className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition">{t.quoteWizard.buttons.submit}</button>
                            </div>
                         </form>
                    </div>
                );
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={closeForm}></div>
            <div className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[95vh] h-[700px] transition-all duration-300 transform-gpu ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <button onClick={closeForm} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                    <XMarkIcon className="h-8 w-8" />
                </button>
                <div className="grid md:grid-cols-2 flex-1 md:overflow-hidden">
                    <div className="hidden md:flex flex-col justify-center p-12 bg-blue-600 text-white relative overflow-hidden">
                         <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-700/50 rounded-full"></div>
                         <div className="absolute -top-12 -left-16 w-48 h-48 bg-blue-700/50 rounded-full"></div>
                         <div className="relative z-10">
                            <CheckCircleIcon className="w-16 h-16 text-white/80 mb-6"/>
                            <h2 className="text-4xl font-oswald font-bold">Obtenez une soumission précise</h2>
                            <p className="mt-4 text-blue-200 text-lg leading-relaxed">Quelques clics suffisent pour obtenir l'aide d'un expert.</p>
                        </div>
                    </div>
                    <div className="p-8 sm:p-12 overflow-y-auto text-slate-800 dark:text-slate-100">
                        <ProgressBar current={formData.step} total={3} />
                        <div className="mt-8">
                            {renderStepContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrequalificationForm;
