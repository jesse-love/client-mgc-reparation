
import React, { useState, useRef, useEffect } from 'react';
import type { FormData } from '../types';
import { services } from '../i18n';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

const ContactForm: React.FC = () => {
  const { language, t } = useLanguage();

  const initialFormData: FormData = {
    fullName: '',
    email: '',
    phone: '',
    contactMethod: 'Email',
    vehicleType: 'Car',
    vehicleDetails: '',
    serviceNeeded: [],
    description: '',
    appointmentDate: '',
    referralSource: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Date Picker State and Logic ---
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formData.appointmentDate) {
      const selected = new Date(formData.appointmentDate);
      // Ensure date is valid and adjust for timezone by using UTC
      if (!isNaN(selected.getTime())) {
          setViewDate(new Date(selected.getUTCFullYear(), selected.getUTCMonth(), 1));
      }
    } else {
      setViewDate(new Date());
    }
  }, [isDatePickerOpen]); // Reset view to today or selected date when opened

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // --- End Date Picker Logic ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newServices = checked 
        ? [...prev.serviceNeeded, value]
        : prev.serviceNeeded.filter(service => service !== value);
      return { ...prev, serviceNeeded: newServices };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., API call)
    console.log('Form Submitted:', formData);
    setIsSubmitted(true);
    // We don't reset the form here to allow the user to see their data
    // It will be reset if they choose to submit another request.
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/50 dark:border-green-700">
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">{t.contactForm.success.title}</h3>
        <p className="mt-2 text-green-700 dark:text-green-400">{t.contactForm.success.message}</p>
        <button onClick={() => { setIsSubmitted(false); setFormData(initialFormData); }} className="mt-4 bg-orange-500 text-brand-dark font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300">
          {t.contactForm.success.button}
        </button>
      </div>
    );
  }

    // --- Date Picker Render Function ---
  const renderCalendar = () => {
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    
    const handleDateSelect = (day: number) => {
      const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const dateString = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      setFormData(prev => ({ ...prev, appointmentDate: dateString }));
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
    // Use UTC methods to avoid timezone issues when parsing the date string
    const selectedDateObj = formData.appointmentDate ? new Date(formData.appointmentDate + 'T00:00:00Z') : null;
    
    const blanks = Array.from({ length: startDay }, (_, i) => <div key={`blank-${i}`} className="text-center p-2"></div>);
    const days = Array.from({ length: numDays }, (_, i) => {
        const day = i + 1;
        const currentDate = new Date(year, month, day);
        const isToday = today.toDateString() === currentDate.toDateString();
        const isSelected = selectedDateObj && selectedDateObj.toDateString() === currentDate.toDateString();
        const isDisabled = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

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
                        ${isDisabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-gray-200'}
                    `}
                >
                    {day}
                </button>
            </div>
        );
    });

    return (
        <div className="absolute top-full mt-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 dark:bg-slate-800 dark:border-gray-600">
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
  };
  // --- End Date Picker Render Function ---

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.fullName}</label>
          <input type="text" name="fullName" id="fullName" required value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.phone}</label>
          <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.email}</label>
          <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.contactMethod}</label>
          <div className="mt-2 flex space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="contactMethod" value="Email" checked={formData.contactMethod === 'Email'} onChange={handleChange} className="form-radio text-orange-500 focus:ring-orange-500 dark:bg-slate-700 dark:border-gray-600" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Email</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="contactMethod" value="Phone" checked={formData.contactMethod === 'Phone'} onChange={handleChange} className="form-radio text-orange-500 focus:ring-orange-500 dark:bg-slate-700 dark:border-gray-600" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">{t.contactForm.phoneRadio}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.vehicleType}</label>
          <select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-gray-600 dark:text-white">
            {t.contactForm.vehicleOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="vehicleDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.vehicleDetails}</label>
          <input type="text" name="vehicleDetails" id="vehicleDetails" value={formData.vehicleDetails} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" placeholder={t.contactForm.vehicleDetailsPlaceholder} />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.serviceNeeded}</label>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map(service => (
            <label key={service.slug} className="inline-flex items-center">
              <input type="checkbox" value={service.title.en} onChange={handleServiceChange} checked={formData.serviceNeeded.includes(service.title.en)} className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-500 dark:bg-slate-700 dark:border-gray-600" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{service.title[language]}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.description}</label>
        <textarea id="description" name="description" rows={4} required value={formData.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" placeholder={t.contactForm.descriptionPlaceholder}></textarea>
      </div>

      {/* --- Date Picker Input --- */}
      <div className="relative" ref={datePickerRef}>
        <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactForm.appointmentDate}</label>
        <div className="relative mt-1">
          <input
              type="text"
              id="appointmentDate"
              name="appointmentDate"
              readOnly
              value={formData.appointmentDate}
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              placeholder={t.contactForm.appointmentDatePlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 cursor-pointer dark:bg-slate-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              aria-haspopup="true"
              aria-expanded={isDatePickerOpen}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {isDatePickerOpen && renderCalendar()}
      </div>
      {/* --- End Date Picker Input --- */}
      
      <div>
        <button type="submit" className="w-full bg-orange-500 text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 text-lg">
          {t.contactForm.submitButton}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;