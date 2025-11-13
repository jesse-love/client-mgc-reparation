import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { initialWizardData } from '../contexts/QuoteWizardContext';
import type { QuoteWizardData } from '../types';
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon, TruckIcon, CogIcon, WrenchScrewdriverIcon, DocumentMagnifyingGlassIcon, BugAntIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import { createGoogleCalendarLink } from '../utils/calendar';
import { trackLeadGeneration } from '../utils/googleTag';

type ValidationErrors = {
    fullName?: string;
    email?: string;
    phone?: string;
    description?: string;
};

interface InlineQuoteWizardProps {
  avatarType: 'alex_anxieux' | 'sophie_sage' | 'martin_prevoyant';
  webhookTitle: string;
  defaultServiceCategory: string;
}

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    const { t } = useLanguage();
    return (
        <div>
            <p className="text-sm font-semibold text-slate-400 mb-2">
                {t.quoteWizard.progress.replace('{current}', String(current)).replace('{total}', String(total))}
            </p>
            <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }}></div>
            </div>
        </div>
    );
};

const InlineQuoteWizard: React.FC<InlineQuoteWizardProps> = ({ avatarType, webhookTitle, defaultServiceCategory }) => {
    const { language, t } = useLanguage();
    const [wizardData, setWizardData] = useState<QuoteWizardData>({
      ...initialWizardData,
      serviceCategory: defaultServiceCategory
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);

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
        if (!wizardData.phone.trim()) newErrors.phone = t.contactForm.validation.required;
        if (!wizardData.description.trim()) newErrors.description = t.contactForm.validation.required;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateStep3()) return;
        
        const webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQA5dTsm5U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=aCNAfav8FUhPPhQ0tMhrsE-6PCpIpxtyC3aor2E1UGA";

        const messageBody = `*${webhookTitle}*

*Vehicle Type:* ${wizardData.vehicleType}
*Service Category:* ${wizardData.serviceCategory}
---
*Full Name:* ${wizardData.fullName}
*Phone:* ${wizardData.phone}
*Email:* ${wizardData.email || 'Non fourni'}
---
*Description:*
${wizardData.description}
---
*Requested Appointment:* ${wizardData.appointmentDate}${wizardData.appointmentTime ? ` at ${wizardData.appointmentTime}` : ' (No time selected)'}
        `.trim();
        
        const payload = { text: messageBody };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error(`Webhook failed with status ${response.status}`);
            
            // Redirect to thank you page, which will handle the GTM event
            window.location.href = `/merci?avatar=${avatarType}`;

        } catch (error) {
            console.error('Failed to submit form to webhook:', error);
            alert('There was an error submitting your request. Please try again or call us directly.');
        }
    };

    const [calendarPosition, setCalendarPosition] = useState<'top' | 'bottom'>('bottom');

    const calculateDatePickerPosition = useCallback(() => {
        if (dateInputRef.current) {
            const inputRect = dateInputRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - inputRect.bottom;
            if (spaceBelow < 350 && inputRect.top > 350) {
                setCalendarPosition('top');
            } else {
                setCalendarPosition('bottom');
            }
        }
    }, []);

    useEffect(() => {
        if (isDatePickerOpen) {
            calculateDatePickerPosition();
        }
    }, [isDatePickerOpen, calculateDatePickerPosition]);

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
                    <button type="button" onClick={() => !isDisabled && handleDateSelect(day)} disabled={isDisabled} className={`w-10 h-10 rounded-full transition-colors duration-200 ${isSelected ? 'bg-orange-500 text-slate-900 font-bold' : ''} ${!isSelected && !isDisabled ? 'hover:bg-orange-500/20' : ''} ${isToday && !isSelected ? 'text-orange-400 font-bold' : ''} ${isDisabled ? 'text-slate-500 cursor-not-allowed line-through' : 'text-slate-200'}`}>
                        {day}
                    </button>
                </div>
            );
        });

        return (
            <div className={`absolute left-0 w-full max-w-xs bg-slate-800 border border-slate-600 rounded-lg shadow-2xl p-4 z-20 ${calendarPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                <div className="flex justify-between items-center mb-4">
                    <button type="button" onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-700"><ChevronLeftIcon className="h-5 w-5 text-slate-300" /></button>
                    <div className="font-bold text-slate-100">{monthName} {year}</div>
                    <button type="button" onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-700"><ChevronRightIcon className="h-5 w-5 text-slate-300" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm text-center text-slate-400 mb-2">{weekDays.map(d => <div key={d}>{d}</div>)}</div>
                <div className="grid grid-cols-7 gap-y-1">{blanks}{days}</div>
            </div>
        );
    }, [viewDate, wizardData.appointmentDate, language, calendarPosition]);

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

    const renderContent = () => {
        switch (wizardData.step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-2xl font-oswald font-bold text-white mb-6 text-center">{t.quoteWizard.steps[1].title}</h2>
                        <div className="space-y-3">
                             <button onClick={() => handleSelectOption('vehicleType', 'Car/SUV/Light Truck')} className="w-full text-left p-4 border-2 border-slate-600 rounded-lg hover:border-orange-500 hover:bg-orange-900/20 transition-all flex items-center"><WrenchScrewdriverIcon className="h-8 w-8 text-orange-500 mr-4"/><span className="font-semibold text-slate-100">{t.quoteWizard.steps[1].options.car}</span></button>
                            <button onClick={() => handleSelectOption('vehicleType', 'Heavy Truck')} className="w-full text-left p-4 border-2 border-slate-600 rounded-lg hover:border-orange-500 hover:bg-orange-900/20 transition-all flex items-center"><TruckIcon className="h-8 w-8 text-orange-500 mr-4"/><span className="font-semibold text-slate-100">{t.quoteWizard.steps[1].options.heavy}</span></button>
                             <button onClick={() => handleSelectOption('vehicleType', 'Trailer/Other')} className="w-full text-left p-4 border-2 border-slate-600 rounded-lg hover:border-orange-500 hover:bg-orange-900/20 transition-all flex items-center"><CogIcon className="h-8 w-8 text-orange-500 mr-4"/><span className="font-semibold text-slate-100">{t.quoteWizard.steps[1].options.trailer}</span></button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-2xl font-oswald font-bold text-white mb-6 text-center">{t.quoteWizard.steps[2].title}</h2>
                        <div className="space-y-3">
                            <button onClick={() => handleSelectOption('serviceCategory', 'Maintenance/Inspection')} className={`w-full text-left p-4 border-2 rounded-lg hover:border-orange-500 hover:bg-orange-900/20 transition-all flex items-center ${wizardData.serviceCategory === 'Maintenance/Inspection' ? 'border-orange-500 bg-orange-900/20' : 'border-slate-600'}`}><SquaresPlusIcon className="h-8 w-8 text-orange-500 mr-4"/><span className="font-semibold text-slate-100">{t.quoteWizard.steps[2].options.maintenance}</span></button>
                            <button onClick={() => handleSelectOption('serviceCategory', 'Specific Repair')} className={`w-full text-left p-4 border-2 rounded-lg hover:border-orange-500 hover:bg-orange-900/20 transition-all flex items-center ${wizardData.serviceCategory === 'Specific Repair' ? 'border-orange-500 bg-orange-900/20' : 'border-slate-600'}`}><BugAntIcon className="h-8 w-8 text-orange-500 mr-4"/><span className="font-semibold text-slate-100">{t.quoteWizard.steps[2].options.repair}</span></button>
                            <button onClick={() => handleSelectOption('serviceCategory', 'Diagnostics/Not Sure')} className={`w-full text-left p-4 border-2 rounded-lg hover:border-orange-500 hover:bg-orange-900/20 transition-all flex items-center ${wizardData.serviceCategory === 'Diagnostics/Not Sure' ? 'border-orange-500 bg-orange-900/20' : 'border-slate-600'}`}><DocumentMagnifyingGlassIcon className="h-8 w-8 text-orange-500 mr-4"/><span className="font-semibold text-slate-100">{t.quoteWizard.steps[2].options.diagnostics}</span></button>
                        </div>
                        <div className="mt-6 text-center"><button type="button" onClick={handleBack} className="text-sm font-semibold text-slate-300 hover:text-orange-500">{t.quoteWizard.buttons.back}</button></div>
                    </div>
                );
            case 3:
                return (
                    <div>
                         <h2 className="text-2xl font-oswald font-bold text-white mb-6 text-center">{t.quoteWizard.steps[3].title}</h2>
                         <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <textarea id="description" name="description" rows={2} value={wizardData.description} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-slate-700 text-white ${errors.description ? 'border-red-500' : 'border-slate-600'}`} placeholder={t.quoteWizard.steps[3].descriptionPlaceholder}></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" name="fullName" placeholder={t.quoteWizard.steps[3].fullName} value={wizardData.fullName} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-slate-700 text-white ${errors.fullName ? 'border-red-500' : 'border-slate-600'}`} />
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <input type="tel" name="phone" placeholder={t.quoteWizard.steps[3].phone} value={wizardData.phone} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-slate-700 text-white ${errors.phone ? 'border-red-500' : 'border-slate-600'}`} />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="pt-2 flex justify-between items-center">
                                <button type="button" onClick={handleBack} className="text-sm font-semibold text-slate-300 hover:text-orange-500">{t.quoteWizard.buttons.back}</button>
                                <button type="submit" className="bg-orange-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-orange-400 transition-all duration-300 transform hover:scale-105">{t.quoteWizard.buttons.submit}</button>
                            </div>
                         </form>
                    </div>
                );
            default: return null;
        }
    }
    
    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-2xl border border-slate-700">
            <ProgressBar current={wizardData.step} total={3} />
            <div className="mt-6 min-h-[280px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default InlineQuoteWizard;