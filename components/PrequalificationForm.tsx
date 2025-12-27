
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePrequalificationForm } from '../contexts/PrequalificationFormContext';
import { XMarkIcon, CheckCircleIcon, ArrowLeftIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../App';
import { pushToDataLayer, AnalyticsEvents } from '../utils/Analytics';

type PrequalificationData = {
    step: number;
    problem: string; // For Alex & Sophie
    preferredDate: string; // For Martin
    vehicleType: string;
    vehicleYear: string;
    appointmentDate: string;
    appointmentTime: string;
    fullName: string;
    phone: string;
    email: string;
};

type ValidationErrors = {
    problem?: string;
    preferredDate?: string;
    vehicleType?: string;
    vehicleYear?: string;
    appointmentDate?: string;
    fullName?: string;
    phone?: string;
    email?: string;
};

const initialData: PrequalificationData = {
    step: 1,
    problem: '',
    preferredDate: '',
    vehicleType: '',
    vehicleYear: '',
    appointmentDate: '',
    appointmentTime: '',
    fullName: '',
    phone: '',
    email: '',
};

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    return (
        <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-white h-1.5 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }}></div>
        </div>
    );
};

const PrequalificationForm: React.FC = () => {
    const { isOpen, closeForm, avatarType, webhookTitle } = usePrequalificationForm();
    const [formData, setFormData] = useState<PrequalificationData>(initialData);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const { language, t } = useLanguage();
    const { theme } = useTheme();

    // Date Picker State
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
            setErrors({});
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNext = () => {
        if (validateStep()) {
            setFormData(prev => ({ ...prev, step: prev.step + 1 }));
        }
    };

    const handleBack = () => {
        setErrors({});
        setFormData(prev => ({ ...prev, step: prev.step - 1 }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateStep = (): boolean => {
        const newErrors: ValidationErrors = {};
        switch (formData.step) {
            case 1:
                if (avatarType === 'alex_anxieux' && !formData.problem.trim()) newErrors.problem = t.contactForm.validation.required;
                if (avatarType === 'sophie_sage' && !formData.problem.trim()) newErrors.problem = t.contactForm.validation.required;
                if (avatarType === 'martin_prevoyant' && !formData.preferredDate.trim()) newErrors.preferredDate = t.contactForm.validation.required;
                break;
            case 2:
                if (!formData.vehicleType) newErrors.vehicleType = t.contactForm.validation.required; // "Veuillez sélectionner un type de véhicule."
                if (!formData.vehicleYear) newErrors.vehicleYear = t.contactForm.validation.required; // "Veuillez sélectionner une année."
                break;
            case 3:
                if (!formData.appointmentDate) newErrors.appointmentDate = t.contactForm.validation.required; // "Veuillez sélectionner une date."
                break;
            case 4:
                if (!formData.fullName.trim()) newErrors.fullName = t.contactForm.validation.required; // "Le nom est requis."
                if (!formData.phone.trim()) newErrors.phone = t.contactForm.validation.required; // "Le téléphone est requis."
                if (!formData.email.trim()) {
                    newErrors.email = t.contactForm.validation.required;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = t.contactForm.validation.email;
                }
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
            ? `Changement de pneus. Date approximative souhaitée: ${formData.preferredDate}.`
            : formData.problem;

        const messageBody = `*${webhookTitle}*

*Nom:* ${formData.fullName}
*Téléphone:* ${formData.phone}
*Courriel:* ${formData.email}
---
*Véhicule:* ${formData.vehicleYear} ${formData.vehicleType}
*Rendez-vous souhaité:* ${formData.appointmentDate} à ${formData.appointmentTime || 'N/A'}
---
*Description/Demande:*
${problemDescription}
        `.trim();

        const payload = { text: messageBody };

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(payload),
            });
            const params = new URLSearchParams({
                avatar: avatarType || '',
                name: encodeURIComponent(formData.fullName),
                email: encodeURIComponent(formData.email),
                phone: encodeURIComponent(formData.phone),
                vehicleType: encodeURIComponent(formData.vehicleType),
            });
            pushToDataLayer(AnalyticsEvents.GENERATE_LEAD, {
                form_name: 'prequalification_form',
                vehicle_type: formData.vehicleType,
                avatar_type: avatarType
            });

            window.location.href = `/merci?${params.toString()}`;
        } catch (error) {
            console.error('Failed to submit form to webhook:', error);
            alert('Une erreur est survenue. Veuillez nous appeler directement.');
        }
    };

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
                const period = hour >= 12 ? 'PM' : 'AM';
                let displayHour = hour % 12;
                if (displayHour === 0) displayHour = 12;
                const displayMinutes = minutes === 0 ? '00' : minutes;
                slots.push(`${displayHour}:${displayMinutes} ${period}`);
            }
        }
        return slots;
    }, []);

    const availableSlots = generateTimeSlots(formData.appointmentDate);

    const firstStepContent = () => {
        const commonProps = {
            className: `w-full p-4 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500`,
            onChange: handleChange,
        };
        switch (avatarType) {
            case 'alex_anxieux':
                return {
                    title: t.prequalificationForm.steps[1].alex_anxieux.title,
                    content: <textarea name="problem" value={formData.problem} rows={4} {...commonProps} placeholder="Ex: Bruit aigu au freinage, vibrations..."></textarea>,
                    error: errors.problem,
                };
            case 'sophie_sage':
                return {
                    title: t.prequalificationForm.steps[1].sophie_sage.title,
                    content: <textarea name="problem" value={formData.problem} rows={4} {...commonProps} placeholder="Ex: Bilan avant un long voyage, 2e avis sur un devis..."></textarea>,
                    error: errors.problem,
                };
            case 'martin_prevoyant':
                return {
                    title: t.prequalificationForm.steps[1].martin_prevoyant.title,
                    content: <input type="text" name="preferredDate" value={formData.preferredDate} {...commonProps} placeholder="Ex: La semaine prochaine, mardi matin..." />,
                    error: errors.preferredDate,
                };
            default: return { title: '', content: null, error: null };
        }
    };

    const renderCalendar = useCallback(() => {
        const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
        const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
        const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
        const handleDateSelect = (day: number) => {
            const selectedDate = new Date(Date.UTC(viewDate.getFullYear(), viewDate.getMonth(), day));
            const dateString = selectedDate.toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, appointmentDate: dateString, appointmentTime: '' }));
            setIsDatePickerOpen(false);
        };

        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const numDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const monthName = viewDate.toLocaleString(language, { month: 'long' });
        const weekDays = language === 'fr' ? ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const today = new Date();
        const selectedDateObj = formData.appointmentDate ? new Date(formData.appointmentDate + 'T00:00:00Z') : null;

        return (
            <div className="absolute top-full mt-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 dark:bg-slate-900 dark:border-slate-600">
                <div className="flex justify-between items-center mb-4">
                    <button type="button" onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"><ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-slate-300" /></button>
                    <div className="font-bold text-gray-800 dark:text-white">{monthName} {year}</div>
                    <button type="button" onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"><ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-slate-300" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-500 dark:text-slate-400 mb-2">{weekDays.map(d => <div key={d}>{d}</div>)}</div>
                <div className="grid grid-cols-7 gap-y-1">
                    {Array.from({ length: startDay }).map((_, i) => <div key={`blank-${i}`}></div>)}
                    {Array.from({ length: numDays }).map((_, i) => {
                        const day = i + 1;
                        const currentDate = new Date(year, month, day);
                        const dayOfWeek = currentDate.getDay();
                        const isToday = today.toDateString() === currentDate.toDateString();
                        const isSelected = selectedDateObj && selectedDateObj.getUTCDate() === day && selectedDateObj.getUTCMonth() === month && selectedDateObj.getUTCFullYear() === year;
                        const isPast = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        const isDisabled = isPast || dayOfWeek === 0 || dayOfWeek === 6;
                        return (
                            <div key={day} className="text-center">
                                <button type="button" onClick={() => !isDisabled && handleDateSelect(day)} disabled={isDisabled} className={`w-10 h-10 rounded-full transition-colors duration-200 ${isSelected ? 'bg-orange-500 text-slate-900 font-bold' : ''} ${!isSelected && !isDisabled ? 'hover:bg-orange-100 dark:hover:bg-slate-700' : ''} ${isToday && !isSelected ? 'text-orange-600 dark:text-orange-400 font-bold' : ''} ${isDisabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-slate-900 dark:text-white'} ${isPast ? 'line-through' : ''}`}>{day}</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }, [viewDate, formData.appointmentDate, language, setFormData]);

    const renderStepContent = () => {
        // Common input props for consistency
        const commonInputProps = {
            className: `w-full p-4 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-slate-300 dark:border-slate-600`,
            onChange: handleChange,
        };
        const totalSteps = 4;

        switch (formData.step) {
            case 1:
                const { title, content, error } = firstStepContent();
                return (
                    <>
                        <h2 className="text-3xl font-oswald font-bold mb-6 text-center text-slate-900 dark:text-white">{title}</h2>
                        {content}
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                        <div className="mt-8 text-right">
                            <button type="button" onClick={handleNext} className="w-full bg-orange-500 text-slate-900 font-bold py-4 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 transform hover:scale-105">{t.prequalificationForm.buttons.continue}</button>
                        </div>
                    </>
                );
            case 2:
                const currentYear = new Date().getFullYear();
                const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
                return (
                    <>
                        <h2 className="text-3xl font-oswald font-bold mb-6 text-center text-slate-900 dark:text-white">{t.prequalificationForm.steps[2].title}</h2>
                        <div className="space-y-4">
                            <select name="vehicleType" value={formData.vehicleType} {...commonInputProps}>
                                <option value="">{t.contactForm.vehicleType}...</option>
                                {t.contactForm.vehicleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
                            <select name="vehicleYear" value={formData.vehicleYear} {...commonInputProps}>
                                <option value="">{t.contactForm.vehicleDetailsPlaceholder.split(',')[0]}...</option>
                                {years.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                            {errors.vehicleYear && <p className="text-red-500 text-sm mt-1">{errors.vehicleYear}</p>}
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className="text-3xl font-oswald font-bold mb-6 text-center text-slate-900 dark:text-white">{t.prequalificationForm.steps[3].title}</h2>
                        <div className="space-y-4">
                            <div className="relative" ref={datePickerRef}>
                                <div className="relative">
                                    <input type="text" readOnly value={formData.appointmentDate} onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} placeholder={t.contactForm.appointmentDatePlaceholder} className={`${commonInputProps.className} pl-12 cursor-pointer`} />
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><CalendarIcon className="h-6 w-6 text-slate-400" /></div>
                                </div>
                                {isDatePickerOpen && renderCalendar()}
                            </div>
                            {errors.appointmentDate && <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>}

                            {formData.appointmentDate ? (
                                availableSlots.length > 0 ? (
                                    <select name="appointmentTime" value={formData.appointmentTime} {...commonInputProps}>
                                        <option value="">{t.contactForm.appointmentTimePlaceholder}</option>
                                        {availableSlots.map(time => <option key={time} value={time}>{time}</option>)}
                                    </select>
                                ) : (
                                    <div className="text-center text-sm p-3 bg-red-100 dark:bg-red-900/50 rounded-md text-red-600 dark:text-red-300">{t.contactForm.noSlotsAvailable}</div>
                                )
                            ) : (
                                <div className="text-center text-sm p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400">{t.contactForm.selectDateFirst}</div>
                            )}
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <h2 className="text-3xl font-oswald font-bold mb-6 text-center text-slate-900 dark:text-white">{t.prequalificationForm.steps[4].title}</h2>
                        <div className="space-y-4">
                            {/* FIX: Using common fullName translation from contactForm for consistency */}
                            <input type="text" name="fullName" placeholder={t.contactForm.fullName} value={formData.fullName} {...commonInputProps} />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            <input type="tel" name="phone" placeholder={t.contactForm.phone} value={formData.phone} {...commonInputProps} />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            <input type="email" name="email" placeholder={t.contactForm.email} value={formData.email} {...commonInputProps} />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </>
                );
            default: return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm}></div>

            <div className={`relative flex w-full h-full md:max-w-7xl md:max-h-[800px] overflow-hidden transition-all duration-300 transform-gpu md:rounded-2xl shadow-2xl ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                {/* Left Info Panel (Hidden on small, visible on md+) */}
                <div className="hidden md:flex flex-col justify-center items-start p-8 lg:p-12 text-white bg-blue-800 flex-shrink-0 md:w-1/2 lg:w-2/5 xl:w-1/3">
                    <CheckCircleIcon className="w-16 h-16 text-white/90 mb-6" />
                    <h2 className="text-4xl lg:text-5xl font-oswald font-bold leading-tight mb-4">{t.prequalificationForm.infoPanel.title}</h2>
                    <p className="text-lg text-white/80">{t.prequalificationForm.infoPanel.subtitle}</p>
                </div>

                {/* Right Form Panel */}
                <div className="relative flex-grow flex flex-col bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-6 sm:p-8 md:w-1/2 lg:w-3/5 xl:w-2/3">
                    <button onClick={closeForm} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-white/70 dark:hover:text-white z-20 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <XMarkIcon className="h-8 w-8" />
                    </button>
                    <h2 className="text-3xl font-oswald font-bold text-center mb-4">{t.prequalificationForm.formTitle}</h2>
                    <ProgressBar current={formData.step} total={4} />

                    <form onSubmit={handleSubmit} className="flex flex-col flex-grow mt-6">
                        <div className="flex-grow overflow-y-auto">
                            {renderStepContent()}
                        </div>
                        <div className="mt-6 flex items-center">
                            {formData.step > 1 && (
                                <button type="button" onClick={handleBack} className="flex items-center text-sm font-semibold text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"><ArrowLeftIcon className="h-4 w-4 mr-2" /> {t.prequalificationForm.buttons.back}</button>
                            )}
                            <div className="flex-grow"></div>
                            {formData.step < 4 && formData.step > 0 &&
                                <button type="button" onClick={handleNext} className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 transform hover:scale-105">{t.prequalificationForm.buttons.continue}</button>
                            }
                            {formData.step === 4 &&
                                <button type="submit" className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 transform hover:scale-105">{t.prequalificationForm.buttons.submit}</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PrequalificationForm;
