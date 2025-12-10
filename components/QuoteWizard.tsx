
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { useLanguage } from '../contexts/LanguageContext';
import { XMarkIcon, CheckCircleIcon, ArrowLeftIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon, TruckIcon, CogIcon, WrenchScrewdriverIcon, DocumentMagnifyingGlassIcon, BugAntIcon, SquaresPlusIcon, StarIcon } from '@heroicons/react/24/solid';
import { createGoogleCalendarLink } from '../utils/calendar';
import { useTheme } from '../App';
import { trackConversion } from '../utils/googleTag';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';

// FIX: Add appointmentDate to ValidationErrors to resolve TypeScript error.
type ValidationErrors = {
    fullName?: string;
    email?: string;
    phone?: string;
    description?: string;
    appointmentDate?: string;
};


const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    return (
        <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-white h-1.5 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }}></div>
        </div>
    );
};

const QuoteWizard: React.FC = () => {
    const { isOpen, closeWizard, wizardData, setWizardData, resetWizard } = useQuoteWizard();
    const { language, t } = useLanguage();
    const { theme } = useTheme();
    const { phone } = useBusinessInfo();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Date Picker State and Refs
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);
    const timePickerRef = useRef<HTMLDivElement>(null);

    const handleNext = () => setWizardData(prev => ({ ...prev, step: prev.step + 1 }));
    const handleBack = () => {
        setErrors({});
        setWizardData(prev => ({ ...prev, step: prev.step - 1 }));
    }

    const handleSelectOption = (field: keyof typeof wizardData, value: string) => {
        setWizardData(prev => ({ ...prev, [field]: value }));
        handleNext();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setWizardData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateStep3 = () => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateStep3()) return;

        const webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQA5dTsm5U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=aCNAfav8FUhPPhQ0tMhrsE-6PCpIpxtyC3aor2E1UGA";

        if (!webhookUrl) {
            console.error('Google Chat Webhook URL is not configured.');
            alert('This form is currently unavailable. Please call us directly.');
            return;
        }

        const calendarLink = createGoogleCalendarLink(wizardData);

        const messageBody = `*New Quote Request from MGC Wizard*

*Vehicle Type:* ${wizardData.vehicleType}
*Service Category:* ${wizardData.serviceCategory}
*Vehicle Details:* ${wizardData.vehicleYear || 'N/A'} ${wizardData.vehicleMake || ''} ${wizardData.vehicleModel || ''}
${wizardData.tireSize ? `*Tire Size:* ${wizardData.tireSize}` : ''}
---
*Full Name:* ${wizardData.fullName}
*Phone:* ${wizardData.phone}
*Email:* ${wizardData.email}
---
*Description:*
${wizardData.description}
---
*Requested Appointment:* ${wizardData.appointmentDate}${wizardData.appointmentTime ? ` at ${wizardData.appointmentTime}` : ' (No time selected)'}

*<${calendarLink}|Click here to add to Google Calendar>*
        `.trim();

        const payload = { text: messageBody };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error(`Webhook failed with status ${response.status}`);

            // --- Conversion Tracking ---
            trackConversion('wizard_form');
            // -------------------------

            setIsSubmitted(true);
        } catch (error) {
            console.error('Failed to submit form to webhook:', error);
            alert('There was an error submitting your request. Please try again or call us directly.');
        }
    };

    const handleResetAndClose = () => {
        setIsSubmitted(false);
        closeWizard();
    }

    // Set initial viewDate to current month when date picker opens
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

    // Close date picker when clicking outside
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

    const renderCalendar = useCallback(() => {
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
        const weekDays = language === 'fr'
            ? ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa']
            : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
            // Weekends are disabled based on generateTimeSlots logic.
            const isDisabled = isPast || dayOfWeek === 0 || dayOfWeek === 6;

            return (
                <div key={day} className="text-center">
                    <button
                        type="button"
                        onClick={() => !isDisabled && handleDateSelect(day)}
                        disabled={isDisabled}
                        className={`
                        w-10 h-10 rounded-full transition-colors duration-200
                        ${isSelected ? 'bg-orange-500 text-slate-900 font-bold' : ''}
                        ${!isSelected && !isDisabled ? 'hover:bg-orange-100 dark:hover:bg-slate-700' : ''}
                        ${isToday && !isSelected ? 'text-orange-600 dark:text-orange-400 font-bold' : ''}
                        ${isDisabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed line-through' : 'text-slate-900 dark:text-white'}
                    `}
                    >
                        {day}
                    </button>
                </div>
            );
        });

        return (
            <div className={`absolute left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-20 bottom-full mb-2 dark:bg-slate-900 dark:border-slate-600`}>
                <div className="flex justify-between items-center mb-4">
                    <button type="button" onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-slate-300" />
                    </button>
                    <div className="font-bold text-gray-800 dark:text-white">{monthName} {year}</div>
                    <button type="button" onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                        <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-slate-300" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-500 dark:text-slate-400 mb-2">
                    {weekDays.map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                    {blanks}
                    {days}
                </div>
            </div>
        );
    }, [viewDate, wizardData.appointmentDate, language, setWizardData, theme]);

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

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsSubmitted(false);
                resetWizard();
            }, 300);
        }
    }, [isOpen, resetWizard]);

    if (!isOpen) return null;

    // Common input styling for consistency (matching PrequalificationForm)
    const commonInputClass = `w-full p-4 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500`;

    const renderContent = () => {
        if (isSubmitted) {
            return (
                <div className="text-center p-4 flex flex-col justify-center items-center h-full">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold font-oswald text-slate-900 dark:text-white">{t.quoteWizard.success.title}</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t.quoteWizard.success.message}</p>
                    <button onClick={handleResetAndClose} className="mt-8 bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition duration-300">
                        {t.quoteWizard.success.button}
                    </button>
                </div>
            )
        }

        // AVATAR 2: HEAVY TRUCK PRIORITY FLOW (CODE RED)
        if (wizardData.vehicleType === 'Heavy Truck' && wizardData.step === 2) {
            return (
                <div className="text-center p-4 flex flex-col justify-center items-center h-full animate-fadeIn">
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-6 animate-pulse">
                        <TruckIcon className="w-16 h-16 text-red-600 dark:text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold font-oswald text-slate-900 dark:text-white mb-2">
                        {t.quoteWizard.priorityAccess.title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md">
                        {t.quoteWizard.priorityAccess.description}
                    </p>

                    <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} onClick={() => trackConversion('click_to_call_heavy')} className="flex items-center justify-center w-full max-w-sm bg-red-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4">
                        <span className="mr-3 text-2xl">📞</span>
                        <span className="text-xl">{phone}</span>
                    </a>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                        {t.quoteWizard.priorityAccess.code}
                    </p>
                </div>
            );
        }

        switch (wizardData.step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-8 text-center">{t.quoteWizard.steps[1].title}</h2>
                        <div className="space-y-4">
                            <button onClick={() => handleSelectOption('vehicleType', 'Car/SUV/Light Truck')} className="w-full text-left p-6 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 transition-all flex items-center text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                                <WrenchScrewdriverIcon className="h-10 w-10 text-orange-500 mr-5" />
                                <span className="font-semibold">{t.quoteWizard.steps[1].options.car}</span>
                            </button>
                            <button onClick={() => handleSelectOption('vehicleType', 'Heavy Truck')} className="w-full text-left p-6 border border-red-300 dark:border-red-900/50 rounded-lg hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group">
                                <TruckIcon className="h-10 w-10 text-red-500 group-hover:text-red-600 mr-5" />
                                <div>
                                    <span className="font-semibold block">{t.quoteWizard.steps[1].options.heavy}</span>
                                    <span className="text-xs text-red-500 font-medium uppercase tracking-wider">{t.quoteWizard.priorityAccess.label}</span>
                                </div>
                            </button>
                            <button onClick={() => handleSelectOption('vehicleType', 'Trailer/Other')} className="w-full text-left p-6 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 transition-all flex items-center text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                                <CogIcon className="h-10 w-10 text-orange-500 mr-5" />
                                <span className="font-semibold">{t.quoteWizard.steps[1].options.trailer}</span>
                            </button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-2 text-center">{t.quoteWizard.steps[2].title}</h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Select the offer that fits your needs.</p>
                        <div className="space-y-4">
                            {/* Offer 1: Alex (Urgency) */}
                            <button onClick={() => handleSelectOption('serviceCategory', 'Oil Change + Free Inspection')} className="w-full text-left p-6 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 transition-all flex flex-col relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group">
                                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">
                                    {t.quoteWizard.steps[2].offers.alex.badge}
                                </div>
                                <div className="flex items-center mb-2">
                                    <WrenchScrewdriverIcon className="h-8 w-8 text-orange-500 mr-4" />
                                    <span className="font-bold text-xl">{t.quoteWizard.steps[2].offers.alex.title}</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300 pl-12">
                                    {t.quoteWizard.steps[2].offers.alex.description}
                                </p>
                            </button>

                            {/* Offer 2: Sophie (Trust) */}
                            <button onClick={() => handleSelectOption('serviceCategory', '$49 Credited Diagnostic')} className="w-full text-left p-6 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all flex flex-col relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group">
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">
                                    {t.quoteWizard.steps[2].offers.sophie.badge}
                                </div>
                                <div className="flex items-center mb-2">
                                    <DocumentMagnifyingGlassIcon className="h-8 w-8 text-blue-500 mr-4" />
                                    <span className="font-bold text-xl">{t.quoteWizard.steps[2].offers.sophie.title}</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300 pl-12">
                                    {t.quoteWizard.steps[2].offers.sophie.description}
                                </p>
                            </button>

                            {/* Offer 3: Martin (Convenience) */}
                            <button onClick={() => handleSelectOption('serviceCategory', 'Tire Change + Free Inspection')} className="w-full text-left p-6 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-slate-700 transition-all flex flex-col relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group">
                                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">
                                    {t.quoteWizard.steps[2].offers.martin.badge}
                                </div>
                                <div className="flex items-center mb-2">
                                    <CogIcon className="h-8 w-8 text-green-500 mr-4" />
                                    <span className="font-bold text-xl">{t.quoteWizard.steps[2].offers.martin.title}</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300 pl-12">
                                    {t.quoteWizard.steps[2].offers.martin.description}
                                </p>
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-3xl font-oswald font-bold text-slate-900 dark:text-white mb-8 text-center">{t.quoteWizard.steps[3].title}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Vehicle Details Section */}
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <input type="text" name="vehicleYear" placeholder={t.quoteWizard.steps[3].vehicleYear} value={wizardData.vehicleYear || ''} onChange={handleChange} className={`${commonInputClass} border-slate-300 dark:border-slate-600`} />
                                </div>
                                <div>
                                    <input type="text" name="vehicleMake" placeholder={t.quoteWizard.steps[3].vehicleMake} value={wizardData.vehicleMake || ''} onChange={handleChange} className={`${commonInputClass} border-slate-300 dark:border-slate-600`} />
                                </div>
                                <div>
                                    <input type="text" name="vehicleModel" placeholder={t.quoteWizard.steps[3].vehicleModel} value={wizardData.vehicleModel || ''} onChange={handleChange} className={`${commonInputClass} border-slate-300 dark:border-slate-600`} />
                                </div>
                            </div>

                            {/* Conditional Tire Size Field */}
                            {wizardData.serviceCategory === 'Tire Change + Free Inspection' && (
                                <div>
                                    <input type="text" name="tireSize" placeholder={t.quoteWizard.steps[3].tireSize} value={wizardData.tireSize || ''} onChange={handleChange} className={`${commonInputClass} border-slate-300 dark:border-slate-600`} />
                                </div>
                            )}

                            <div>
                                <textarea id="description" name="description" rows={3} value={wizardData.description} onChange={handleChange} className={`${commonInputClass} ${errors.description ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} placeholder={t.quoteWizard.steps[3].descriptionPlaceholder}></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1 text-center">{errors.description}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" name="fullName" placeholder={t.quoteWizard.steps[3].fullName} value={wizardData.fullName} onChange={handleChange} className={`${commonInputClass} ${errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1 text-center">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        {t.quoteWizard.steps[3].phone} <span className="text-orange-500 text-xs">(Mobile preferred)</span>
                                    </label>
                                    <input type="tel" id="phone" name="phone" placeholder={phone} value={wizardData.phone} onChange={handleChange} className={`${commonInputClass} ${errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1 text-center">{errors.phone}</p>}
                                    <div className="mt-2 flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="sms-consent" name="sms-consent" type="checkbox" className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded" defaultChecked />
                                        </div>
                                        <div className="ml-2 text-sm">
                                            <label htmlFor="sms-consent" className="font-medium text-slate-700 dark:text-slate-300">Text me my quote for faster service</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="email" name="email" placeholder={t.quoteWizard.steps[3].email} value={wizardData.email} onChange={handleChange} className={`${commonInputClass} ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                {errors.email && <p className="text-red-500 text-sm mt-1 text-center">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative" ref={datePickerRef}>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="appointmentDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {t.contactForm.appointmentDatePlaceholder}
                                        </label>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                                            {t.quoteWizard.urgency}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <input type="text" id="appointmentDate" name="appointmentDate" readOnly value={wizardData.appointmentDate} onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} placeholder={t.contactForm.appointmentDatePlaceholder} className={`${commonInputClass} pl-12 cursor-pointer ${errors.appointmentDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><CalendarIcon className="h-6 w-6 text-slate-400" /></div>
                                    </div>
                                    {isDatePickerOpen && renderCalendar()}
                                </div>
                                <div>
                                    {!wizardData.appointmentDate ? (
                                        <div className="h-full w-full p-4 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 text-center text-lg">{t.contactForm.selectDateFirst}</div>
                                    ) : availableSlots.length > 0 ? (
                                        <div className="relative h-full" ref={timePickerRef}>
                                            <button
                                                type="button"
                                                onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                                                className={`${commonInputClass} h-full border border-slate-300 dark:border-slate-600 text-left flex justify-between items-center`}
                                            >
                                                <span className={!wizardData.appointmentTime ? 'text-slate-400' : ''}>
                                                    {wizardData.appointmentTime || t.contactForm.appointmentTimePlaceholder}
                                                </span>
                                                <ChevronLeftIcon className={`h-5 w-5 text-slate-400 transition-transform ${isTimePickerOpen ? 'rotate-90' : '-rotate-90'}`} />
                                            </button>

                                            {isTimePickerOpen && (
                                                <div className="absolute bottom-full mb-2 left-0 w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto z-30">
                                                    {availableSlots.map(time => (
                                                        <button
                                                            key={time}
                                                            type="button"
                                                            onClick={() => {
                                                                handleSelectOption('appointmentTime', time);
                                                                setIsTimePickerOpen(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors ${wizardData.appointmentTime === time ? 'bg-orange-100 dark:bg-slate-600 font-bold text-orange-700 dark:text-orange-400' : 'text-slate-700 dark:text-slate-200'}`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="h-full w-full p-4 flex items-center justify-center bg-red-100 dark:bg-red-900/50 rounded-md text-red-600 dark:text-red-300 text-center text-lg">{t.contactForm.noSlotsAvailable}</div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-between items-center">
                                <button type="button" onClick={handleBack} className="flex items-center text-sm font-semibold text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"><ArrowLeftIcon className="h-4 w-4 mr-2" /> {t.quoteWizard.buttons.back}</button>
                                <button type="submit" className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 transform hover:scale-105">{t.quoteWizard.buttons.submit}</button>
                            </div>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeWizard}></div>

            <div className={`relative flex w-full h-full md:w-auto md:h-auto md:max-w-7xl md:max-h-[90vh] overflow-hidden transition-all duration-300 transform-gpu shadow-2xl md:rounded-2xl ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                {/* Left Info Panel (Hidden on small, visible on md+) */}
                <div className="hidden md:flex flex-col justify-between p-8 lg:p-12 text-white bg-blue-800 flex-shrink-0 md:w-1/2 lg:w-2/5 xl:w-1/3">
                    <div>
                        <CheckCircleIcon className="w-16 h-16 text-white/90 mb-6" />
                        <h2 className="text-4xl lg:text-5xl font-oswald font-bold leading-tight mb-4">{t.quoteWizard.infoPanel.title}</h2>
                        <p className="text-lg text-white/80">{t.quoteWizard.infoPanel.subtitle}</p>
                    </div>

                    {/* Trust Wall - Dynamic Review */}
                    <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                        <div className="flex text-orange-400 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} className="h-5 w-5" />)}
                        </div>
                        <p className="italic text-white/90 mb-4">
                            "{wizardData.serviceCategory === '$49 Credited Diagnostic'
                                ? t.quoteWizard.trustWall.maintenance
                                : wizardData.serviceCategory === 'Oil Change + Free Inspection'
                                    ? t.quoteWizard.trustWall.repair
                                    : t.quoteWizard.trustWall.general}"
                        </p>
                        <div className="font-bold text-white">— {wizardData.serviceCategory === '$49 Credited Diagnostic' ? 'Sarah L.' : 'Mike R.'}</div>
                        <div className="text-xs text-white/60">{t.quoteWizard.trustWall.verified} • Mascouche</div>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="relative flex-grow flex flex-col bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-6 sm:p-8 md:w-1/2 lg:w-3/5 xl:w-2/3 overflow-y-auto">
                    <button onClick={closeWizard} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-white/70 dark:hover:text-white z-20 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <XMarkIcon className="h-8 w-8" />
                    </button>
                    <h2 className="text-3xl font-oswald font-bold text-center mb-4">{t.quoteWizard.formTitle}</h2>
                    {!isSubmitted && <ProgressBar current={wizardData.step} total={3} />}

                    <div className="flex flex-col flex-grow mt-6">
                        <div className="flex-grow">
                            {renderContent()}
                        </div>
                        {wizardData.step < 3 && wizardData.step > 0 && (
                            <div className="mt-6 flex justify-between items-center">
                                {wizardData.step > 1 && (
                                    <button type="button" onClick={handleBack} className="flex items-center text-sm font-semibold text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"><ArrowLeftIcon className="h-4 w-4 mr-2" /> {t.quoteWizard.buttons.back}</button>
                                )}
                                <div className={`${wizardData.step === 1 ? 'w-full text-right' : 'flex-grow text-right'}`}>
                                    <button type="button" onClick={handleNext} className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 transform hover:scale-105">{t.quoteWizard.buttons.next}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteWizard;