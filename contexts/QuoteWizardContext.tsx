import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import type { QuoteWizardData } from '../types';

interface QuoteWizardContextType {
  isOpen: boolean;
  openWizard: () => void;
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

  const openWizard = () => setIsOpen(true);
  const closeWizard = () => {
    setIsOpen(false);
    // Optional: reset data on close after a small delay to allow animation
    setTimeout(() => {
      setWizardData(initialWizardData);
    }, 300);
  }

  const resetWizard = () => {
    setWizardData(initialWizardData);
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
