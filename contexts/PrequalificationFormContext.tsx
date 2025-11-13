import React, { createContext, useState, useContext, ReactNode } from 'react';

type AvatarType = 'alex_anxieux' | 'sophie_sage' | 'martin_prevoyant';

interface FormTriggerPayload {
  avatarType: AvatarType;
  webhookTitle: string;
}

interface PrequalificationFormContextType {
  isOpen: boolean;
  openForm: (payload: FormTriggerPayload) => void;
  closeForm: () => void;
  avatarType: AvatarType | null;
  webhookTitle: string | null;
}

const PrequalificationFormContext = createContext<PrequalificationFormContextType | undefined>(undefined);

export const PrequalificationFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarType, setAvatarType] = useState<AvatarType | null>(null);
  const [webhookTitle, setWebhookTitle] = useState<string | null>(null);

  const openForm = ({ avatarType, webhookTitle }: FormTriggerPayload) => {
    setAvatarType(avatarType);
    setWebhookTitle(webhookTitle);
    setIsOpen(true);
  };
  
  const closeForm = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
        setAvatarType(null);
        setWebhookTitle(null);
    }, 300);
  };

  return (
    <PrequalificationFormContext.Provider value={{ isOpen, openForm, closeForm, avatarType, webhookTitle }}>
      {children}
    </PrequalificationFormContext.Provider>
  );
};

export const usePrequalificationForm = (): PrequalificationFormContextType => {
  const context = useContext(PrequalificationFormContext);
  if (context === undefined) {
    throw new Error('usePrequalificationForm must be used within a PrequalificationFormProvider');
  }
  return context;
};
