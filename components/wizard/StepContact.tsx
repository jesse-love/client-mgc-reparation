import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQuoteWizard } from '../../contexts/QuoteWizardContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { createGoogleCalendarLink } from '../../utils/calendar';
import { trackConversion } from '../../utils/googleTag';
import { useBusinessInfo } from '../../contexts/BusinessInfoContext';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

type ValidationErrors = {
    fullName?: string;
    email?: string;
    phone?: string;
    description?: string;
    appointmentDate?: string;
};

const StepContact: React.FC = () => {
    const { wizardData, setWizardData, closeWizard, resetWizard } = useQuoteWizard();
    const { t, language } = useLanguage();
    const { phone } = useBusinessInfo();

    // Local state for UI only
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const datePickerRef = useRef<HTMLDivElement>(null);
    const timePickerRef = useRef<HTMLDivElement>(null);

    // --- UTILS ---
    const handleBack = () => {
        setWizardData(prev => ({ ...prev, step: 3 })); // Back to Vehicle Details
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWizardData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // --- DATE PICKER LOGIC ---
    // (Ported from original QuoteWizard.tsx)
    useEffect(() => {
        if (isDatePickerOpen) {
            if (wizardData.appointmentDate) {
                const selected = new Date(wizardData.appointmentDate);
                if (!isNaN(selected.getTime())) {
                    setViewDate(new Date(selected.getUTCFullYear(), selected.getUTCMonth(), 1));
                }
            } else {
                setViewDate(new Date());
            }
        }
    }, [isDatePickerOpen, wizardData.appointmentDate]);

    // Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
            }
            if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
                setIsTimePickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const generateTimeSlots = useCallback((selectedDateString: string): string[] => {
        if (!selectedDateString) return [];
        const selectedDate = new Date(selectedDateString.replace(/-/g, '/'));
        const dayOfWeek = selectedDate.getDay();
        const slots: string[] = [];
        let operatingHours: { start: number, end: number, lunch?: number } | null = null;
        if (dayOfWeek >= 1 && dayOfWeek <= 4) operatingHours = { start: 7.5, end: 16, lunch: 12 };
        else if (dayOfWeek === 5) operatingHours = { start: 7.5, end: 12 };
        if (operatingHours) {
            for (let time = operatingHours.start; time < operatingHours.end; time += 1) {
                if (operatingHours.lunch && time >= operatingHours.lunch && time < operatingHours.lunch + 1) continue;
                const hour = Math.floor(time);
                const minutes = (time % 1) * 60;
                const displayMinutes = minutes === 0 ? '00' : minutes;

                if (language === 'fr') {
                    slots.push(`${hour}:${displayMinutes}`);
                } else {
                    const period = hour >= 12 ? 'PM' : 'AM';
                    let displayHour = hour % 12;
                    if (displayHour === 0) displayHour = 12;
                    slots.push(`${displayHour}:${displayMinutes} ${period}`);
                }
            }
        }
        return slots;
    }, [language]);

    const availableSlots = generateTimeSlots(wizardData.appointmentDate);

    // --- FORM SUBMISSION ---
    const validate = () => {
        const newErrors: ValidationErrors = {};
        if (!wizardData.fullName.trim()) newErrors.fullName = t.contactForm.validation.required;
        if (!wizardData.email.trim()) {
            newErrors.email = t.contactForm.validation.required;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wizardData.email)) {
            newErrors.email = t.contactForm.validation.email;
        }
        if (!wizardData.phone.trim()) newErrors.phone = t.contactForm.validation.required;
        if (!wizardData.description.trim()) newErrors.description = t.contactForm.validation.required;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit clicked. Data:", wizardData);

        if (!validate()) {
            console.warn("Validation failed", errors);
            alert("Veuillez remplir tous les champs obligatoires (marqués en rouge).");
            return;
        }
        setIsSubmitting(true);

        // Google Apps Script Webhook URL (God Mode CRM)
        const webhookUrl = "https://script.google.com/macros/s/AKfycbzEdEaHj42eRqu62JPeS669nviZ1k6Q5STesDoThtF_a-e0XH4-gGliJiPeBRHPlQ/exec";

        try {
            if (webhookUrl) {
                console.log("Attempting fetch to:", webhookUrl);
                // Post to Google Apps Script (God Mode)
                // We use a timeout controller to prevent hanging if GAS is cold/slow
                const controller = new AbortController();
                const timeoutId = setTimeout(() => {
                    console.log("Fetch timed out!");
                    controller.abort();
                }, 4000); // 4s Timeout

                try {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify(wizardData),
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);
                } catch (netError) {
                    console.warn("CRM Webhook failed or timed out (continuing flow):", netError);
                    // We intentionally swallow this error to ensure the user gets to the Thank You page.
                    // The lead is lost to CRM but captured in GA4/GTM.
                }
            }

            trackConversion('wizard_form');

            // Redirect to Thank You Page
            const params = new URLSearchParams({
                name: wizardData.fullName,
                vehicleType: wizardData.vehicleType,
                serviceCategory: wizardData.serviceCategory,
                appointmentDate: wizardData.appointmentDate,
            });

            // Clear Wizard Data (Persistence Cleanup)
            resetWizard();
            closeWizard();

            window.location.href = `/merci?${params.toString()}`;

        } catch (error) {
            console.error(error);
            alert("Error sending request. Please call us.");
            setIsSubmitting(false);
        }
    };

    // Calendar Render Helper
    const renderCalendar = () => {
        const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
        const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
        const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

        const handleDateSelect = (day: number) => {
            const selectedDate = new Date(Date.UTC(viewDate.getFullYear(), viewDate.getMonth(), day));
            const dateString = selectedDate.toISOString().split('T')[0];
            setWizardData(prev => ({ ...prev, appointmentDate: dateString, appointmentTime: '' }));
            setIsDatePickerOpen(false);
        };

        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const numDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const monthName = viewDate.toLocaleString(language, { month: 'long' });
        const weekDays = language === 'fr' ? ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const today = new Date();
        const selectedDateObj = wizardData.appointmentDate ? new Date(wizardData.appointmentDate + 'T00:00:00Z') : null;

        const blanks = Array.from({ length: startDay }, (_, i) => <div key={`blank-${i}`} className="text-center p-2"></div>);
        const days = Array.from({ length: numDays }, (_, i) => {
            const day = i + 1;
            const currentDate = new Date(year, month, day);
            const dayOfWeek = currentDate.getDay();
            const isToday = today.toDateString() === currentDate.toDateString();
            const isSelected = selectedDateObj && selectedDateObj.getUTCDate() === day && selectedDateObj.getUTCMonth() === month && selectedDateObj.getUTCFullYear() === year;
            const isPast = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isDisabled = isPast || dayOfWeek === 0 || dayOfWeek === 6;

            return (
                <div key={day} className="text-center">
                    <button type="button" onClick={() => !isDisabled && handleDateSelect(day)} disabled={isDisabled} className={`w-8 h-8 rounded-full text-sm transition-colors duration-200 ${isSelected ? 'bg-orange-500 text-white font-bold' : ''} ${!isSelected && !isDisabled ? 'hover:bg-orange-100 dark:hover:bg-slate-700' : ''} ${isToday && !isSelected ? 'text-orange-600 dark:text-orange-400 font-bold' : ''} ${isDisabled ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed line-through' : 'text-slate-900 dark:text-white'}`}>{day}</button>
                </div>
            );
        });

        return (
            <div className="absolute left-1/2 -translate-x-1/2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-3 z-30 bottom-full mb-2">
                <div className="flex justify-between items-center mb-2">
                    <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ChevronLeftIcon className="h-4 w-4 text-slate-500" /></button>
                    <div className="font-bold text-sm text-slate-800 dark:text-white capitalize">{monthName} {year}</div>
                    <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ChevronRightIcon className="h-4 w-4 text-slate-500" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-slate-400 mb-1">{weekDays.map(d => <div key={d}>{d}</div>)}</div>
                <div className="grid grid-cols-7 gap-y-1">{blanks}{days}</div>
            </div>
        );
    };

    const commonInputClass = "w-full p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn h-full flex flex-col">
            <h3 className="text-2xl font-oswald font-bold text-center text-slate-800 dark:text-white mb-2">
                Dernière étape! On vous contacte comment?
            </h3>

            <div className="space-y-6 flex-grow overflow-y-auto pr-1 custom-scrollbar">

                {/* 1. Problem Description (Prominent) with Quick Answers */}
                <div>
                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
                        Description du problème
                    </label>

                    {/* Dynamic Quick Answers */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {(() => {
                            const { vehicleType, serviceCategory } = wizardData;
                            let chips: string[] = [];

                            if (vehicleType === 'Heavy Truck') {
                                chips = ["Check Engine", "Perte d'air", "Problème DPF/DEF", "Direction/Suspension", "Système électrique"];
                            } else if (vehicleType === 'Generator') {
                                chips = ["Démarre pas", "Entretien Annuel", "Transfer Switch", "Code d'erreur", "Inspection préventive"];
                            } else {
                                // Cars / Light Trucks
                                if (serviceCategory?.includes('Tire')) {
                                    chips = ["Pose pneus hiver", "Pose pneus été", "Crevaison", "Balancement", "Achat nouveaux pneus"];
                                } else if (serviceCategory?.includes('Diagnostic')) {
                                    chips = ["Bruit étrange", "Témoin lumineux (Dash)", "Vibration", "Fumée échappement", "Ne démarre pas"];
                                } else {
                                    chips = ["Changement d'huile", "Freins bruyants", "Tune-up", "Climatisation", "Inspection générale"];
                                }
                            }

                            return chips.map(chip => (
                                <button
                                    key={chip}
                                    type="button"
                                    onClick={() => setWizardData(prev => ({ ...prev, description: chip }))}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${wizardData.description === chip
                                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-slate-500'
                                        }`}
                                >
                                    {chip}
                                </button>
                            ));
                        })()}
                    </div>

                    <textarea
                        name="description"
                        rows={3}
                        value={wizardData.description}
                        onChange={handleChange}
                        className={`${commonInputClass} text-lg`}
                        placeholder="Ex: Bruit de claquement quand je freine..."
                        autoFocus
                    ></textarea>
                </div>

                {/* 2. Scheduling (Row) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative" ref={datePickerRef}>
                        <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Date préférée</label>
                        <div className="relative">
                            <input type="text" readOnly value={wizardData.appointmentDate} onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} placeholder="Choisir une date" className={`${commonInputClass} pl-10 cursor-pointer ${errors.appointmentDate ? 'border-red-500' : ''}`} />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CalendarIcon className="h-5 w-5 text-slate-400" /></div>
                        </div>
                        {isDatePickerOpen && renderCalendar()}
                    </div>

                    <div className="relative" ref={timePickerRef}>
                        <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Heure</label>
                        <button type="button" onClick={() => setIsTimePickerOpen(!isTimePickerOpen)} className={`${commonInputClass} text-left flex justify-between items-center text-slate-500 hover:text-slate-700`} disabled={!wizardData.appointmentDate}>
                            <span className={wizardData.appointmentTime ? 'text-slate-900 dark:text-white' : ''}>{wizardData.appointmentTime || "Flexible"}</span>
                            <ChevronLeftIcon className={`h-4 w-4 transition-transform ${isTimePickerOpen ? 'rotate-90' : '-rotate-90'}`} />
                        </button>
                        {isTimePickerOpen && availableSlots.length > 0 && (
                            <div className="absolute bottom-full mb-2 right-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto z-30">
                                {availableSlots.map(time => (
                                    <button key={time} type="button" onClick={() => { setWizardData(prev => ({ ...prev, appointmentTime: time })); setIsTimePickerOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-orange-50 dark:hover:bg-slate-800 text-sm transition-colors text-slate-700 dark:text-slate-300">
                                        {time}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Personal Info (Grid) */}
                <div className="grid grid-cols-1 gap-4">
                    <input type="text" name="fullName" placeholder="Votre Nom Complet" value={wizardData.fullName} onChange={handleChange} className={`${commonInputClass} ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : ''}`} />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="tel" name="phone" placeholder="Téléphone" value={wizardData.phone} onChange={handleChange} className={`${commonInputClass} ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : ''}`} />
                        <input type="email" name="email" placeholder="Courriel" value={wizardData.email} onChange={handleChange} className={`${commonInputClass} ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`} />
                    </div>
                </div>

            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center mt-auto">
                <button type="button" onClick={handleBack} className="flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> {t.quoteWizard.buttons.back}
                </button>
                <button type="submit" disabled={isSubmitting} className="bg-orange-500 text-white font-oswald font-bold py-3 px-10 rounded-md hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "ENVOI..." : t.quoteWizard.buttons.submit.toUpperCase()}
                </button>
            </div>
        </form>
    );
};

export default StepContact;
