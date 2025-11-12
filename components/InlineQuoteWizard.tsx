import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon, TruckIcon, CogIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import type { QuoteWizardData } from '../types';
import { createGoogleCalendarLink } from '../utils/calendar';

const initialWizardData: Omit<QuoteWizardData, 'step'> = {
  vehicleType: '',
  serviceCategory: '',
  fullName: '',
  email: '',
  phone: '',
  description: '',
  appointmentDate: '',
  appointmentTime: '',
};

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    const { t } = useLanguage();
    return (
        <div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {t.quoteWizard.progress.replace('{current}', String(current)).replace('{total}', String(total))}
            </p>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }}></div>
            </div>
        </div>
    );
};

const InlineQuoteWizard: React.FC = () => {
    const { language, t } = useLanguage();
    const [step, setStep] = useState(1);
    const [wizardData, setWizardData] = useState(initialWizardData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSelectOption = (field: keyof typeof wizardData, value: string) => {
        setWizardData(prev => ({ ...prev, [field]: value }));
        handleNext();
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setWizardData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAQA5dTsm5U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=aCNAfav8FUhPPhQ0tMhrsE-6PCpIpxtyC3aor2E1UGA';
        
        const calendarLink = createGoogleCalendarLink(wizardData);

        const messageBody = `*New Quote Request from MGC (Inline Form)*

*Vehicle Type:* ${wizardData.vehicleType}
*Service Category:* ${wizardData.serviceCategory}
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
            setIsSubmitted(true);
        } catch (error) {
            console.error('Failed to submit form to webhook:', error);
            alert('There was an error submitting your request. Please try again or call us directly.');
        }
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setWizardData(initialWizardData);
        setStep(1);
    }

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
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isPast = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isDisabled = isPast || isWeekend;

        return (
            <div key={day} className="text-center">
                <button
                    type="button"
                    onClick={() => !isDisabled && handleDateSelect(day)}
                    disabled={isDisabled}
                    className={`
                        w-10 h-10 rounded-full transition-colors duration-200
                        ${isSelected ? 'bg-orange-500 text-brand-dark font-bold' : ''}
                        ${!isSelected && !isDisabled ? 'hover:bg-orange-100 dark:hover:bg-orange-500/20' : ''}
                        ${isToday && !isSelected ? 'text-orange-600 dark:text-orange-400 font-bold' : ''}
                        ${isDisabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed line-through' : 'text-gray-700 dark:text-gray-200'}
                    `}
                >
                    {day}
                </button>
            </div>
        );
    });

    return (
        <div className="absolute top-full mt-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-20 dark:bg-slate-800 dark:border-gray-600">
            <div className="flex justify-between items-center mb-4">
                <button type="button" onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="font-bold text-gray-800 dark:text-gray-100">{monthName} {year}</div>
                <button type="button" onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                    <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
                {weekDays.map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
                {blanks}
                {days}
            </div>
        </div>
    );
  }, [viewDate, wizardData.appointmentDate, language, setWizardData]);

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

    const availableSlots = generateTimeSlots(wizardData.appointmentDate);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isSubmitted) {
        return (
            <div className="text-center p-4 min-h-[500px] flex flex-col justify-center items-center bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.quoteWizard.success.title}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{t.quoteWizard.success.message}</p>
                <button onClick={handleReset} className="mt-6 bg-orange-500 text-brand-dark font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300">
                    {t.quoteWizard.success.button}
                </button>
            </div>
        );
    }

    const renderContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">{t.quoteWizard.steps[1].title}</h3>
                        <div className="space-y-4">
                             <button onClick={() => handleSelectOption('vehicleType', 'Car/SUV/Light Truck')} className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all flex items-center">
                                <WrenchScrewdriverIcon className="h-8 w-8 text-orange-500 mr-4"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-100">{t.quoteWizard.steps[1].options.car}</span>
                            </button>
                            <button onClick={() => handleSelectOption('vehicleType', 'Heavy Truck')} className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all flex items-center">
                                <TruckIcon className="h-8 w-8 text-orange-500 mr-4"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-100">{t.quoteWizard.steps[1].options.heavy}</span>
                            </button>
                            <button onClick={() => handleSelectOption('vehicleType', 'Trailer/Other')} className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all flex items-center">
                                <CogIcon className="h-8 w-8 text-orange-500 mr-4"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-100">{t.quoteWizard.steps[1].options.trailer}</span>
                            </button>
                        </div>
                    </div>
                );
            case 2:
                 return (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">{t.quoteWizard.steps[2].title}</h3>
                        <div className="space-y-4">
                            <button onClick={() => handleSelectOption('serviceCategory', 'Maintenance/Inspection')} className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all">
                                <span className="font-semibold text-gray-800 dark:text-gray-100">{t.quoteWizard.steps[2].options.maintenance}</span>
                            </button>
                            <button onClick={() => handleSelectOption('serviceCategory', 'Specific Repair')} className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all">
                                <span className="font-semibold text-gray-800 dark:text-gray-100">{t.quoteWizard.steps[2].options.repair}</span>
                            </button>
                            <button onClick={() => handleSelectOption('serviceCategory', 'Diagnostics/Not Sure')} className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all">
                                <span className="font-semibold text-gray-800 dark:text-gray-100">{t.quoteWizard.steps[2].options.diagnostics}</span>
                            </button>
                        </div>
                         <button type="button" onClick={handleBack} className="mt-6 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-orange-500">{t.quoteWizard.buttons.back}</button>
                    </div>
                );
            case 3:
                 return (
                    <div>
                         <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">{t.quoteWizard.steps[3].title}</h3>
                         <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea id="description" name="description" rows={3} required value={wizardData.description} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white" placeholder={t.quoteWizard.steps[3].descriptionPlaceholder}></textarea>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="fullName" placeholder={t.quoteWizard.steps[3].fullName} required value={wizardData.fullName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white" />
                                <input type="tel" name="phone" placeholder={t.quoteWizard.steps[3].phone} required value={wizardData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <input type="email" name="email" placeholder={t.quoteWizard.steps[3].email} required value={wizardData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white" />
                            
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative" ref={datePickerRef}>
                                    <div className="relative">
                                    <input type="text" id="appointmentDate" name="appointmentDate" readOnly value={wizardData.appointmentDate} onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} placeholder={t.contactForm.appointmentDatePlaceholder} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 cursor-pointer dark:bg-slate-700 dark:border-gray-600 dark:text-white" />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CalendarIcon className="h-5 w-5 text-gray-400" /></div>
                                    </div>
                                    {isDatePickerOpen && renderCalendar()}
                                </div>
                                <div>
                                     {!wizardData.appointmentDate ? (
                                        <div className="h-full text-sm p-2 flex items-center justify-center bg-gray-50 dark:bg-slate-800 rounded-md text-gray-500 dark:text-gray-400">{t.contactForm.selectDateFirst}</div>
                                    ) : availableSlots.length > 0 ? (
                                        <select 
                                            id="appointmentTime" 
                                            name="appointmentTime" 
                                            value={wizardData.appointmentTime} 
                                            onChange={handleChange} 
                                            className="h-full block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">{t.contactForm.appointmentTimePlaceholder}</option>
                                            {availableSlots.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="h-full text-sm p-2 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-md text-red-600 dark:text-red-300">{t.contactForm.noSlotsAvailable}</div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2 flex justify-between items-center">
                                <button type="button" onClick={handleBack} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-orange-500">{t.quoteWizard.buttons.back}</button>
                                <button type="submit" className="bg-orange-500 text-brand-dark font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300">{t.quoteWizard.buttons.submit}</button>
                            </div>
                         </form>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="min-h-[500px] flex flex-col justify-center">
            <ProgressBar current={step} total={3} />
            <div className="mt-6 flex-grow flex flex-col justify-center">
                {renderContent()}
            </div>
        </div>
    );
};

export default InlineQuoteWizard;