import React, { createContext, useState, useContext, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import type { QuoteWizardData } from '../types';

interface QuoteWizardContextType {
  isOpen: boolean;
  openWizard: (initialData?: Partial<QuoteWizardData>) => void;
  closeWizard: () => void;
  wizardData: QuoteWizardData;
  setWizardData: Dispatch<SetStateAction<QuoteWizardData>>;
  resetWizard: () => void;
  selectOption: (key: keyof QuoteWizardData, value: any) => void;
}

const QuoteWizardContext = createContext<QuoteWizardContextType | undefined>(undefined);

export const initialWizardData: QuoteWizardData = {
  step: 1,
  vehicleType: '',
  serviceCategory: '',
  fullName: '',
  email: '',
  phone: '',
  description: '',
  appointmentDate: '',
  appointmentTime: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: '',
  tireSize: '',
};

export const QuoteWizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [wizardData, setWizardData] = useState<QuoteWizardData>(initialWizardData);

  // Load from LocalStorage on Mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('mgc_wizard_data');
      if (savedData) {
        setWizardData(JSON.parse(savedData));
      }
    } catch (e) {
      console.error("Failed to load wizard draft", e);
    }
  }, []);

  // Save to LocalStorage on Change
  useEffect(() => {
    try {
      localStorage.setItem('mgc_wizard_data', JSON.stringify(wizardData));
    } catch (e) {
      console.error("Failed to save wizard draft", e);
    }
  }, [wizardData]);

  const openWizard = (initialData?: Partial<QuoteWizardData>) => {
    if (initialData) {
      setWizardData(prev => ({ ...prev, ...initialData }));
    }
    setIsOpen(true);
  };

  const closeWizard = () => {
    setIsOpen(false);
    // WE DO NOT RESET DATA ON CLOSE anymore. Persistence strategy.
  }

  const resetWizard = () => {
    setWizardData(initialWizardData);
    localStorage.removeItem('mgc_wizard_data'); // Clear draft
  }

  const selectOption = (key: keyof QuoteWizardData, value: any) => {
    setWizardData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <QuoteWizardContext.Provider value={{ isOpen, openWizard, closeWizard, wizardData, setWizardData, resetWizard, selectOption }}>
      {children}
    </QuoteWizardContext.Provider>
  );
};

export const useQuoteWizard = (): QuoteWizardContextType => {
  const context = useContext(QuoteWizardContext);
  if (context === undefined) {
    throw new Error('useQuoteWizard must be used within a QuoteWizardProvider');
  }
  return context;
};
