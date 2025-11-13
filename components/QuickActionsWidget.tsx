import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChatBubbleLeftRightIcon, XMarkIcon, ExclamationTriangleIcon, CheckBadgeIcon, TruckIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import AiChatModal from './AiChatModal';

const iconMap: { [key: string]: React.FC<React.ComponentProps<'svg'>> } = {
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  TruckIcon,
  QuestionMarkCircleIcon,
};

const QuickActionsWidget: React.FC = () => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { t } = useLanguage();

    const handleActionClick = (action?: string) => {
        if (action === 'openChat') {
            setIsOptionsOpen(false);
            // Add a small delay for a smoother transition
            setTimeout(() => setIsChatOpen(true), 100); 
        }
    };
    
    // Close modals with Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsChatOpen(false);
                setIsOptionsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const QuickActionsModal: React.FC = () => (
        <div 
            className={`fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOptionsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOptionsOpen(false)}
        >
            <div 
                className={`w-full bg-slate-800 rounded-t-3xl shadow-2xl border-t border-slate-700 transition-transform duration-300 ${isOptionsOpen ? 'translate-y-0' : 'translate-y-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-center">
                    <div className="w-10 h-1.5 bg-slate-600 rounded-full"></div>
                </div>
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold text-white">{t.aiAssistant.quickActionsTitle}</h2>
                    <p className="text-slate-400 mt-1">{t.aiAssistant.quickActionsSubtitle}</p>
                </div>
                <div className="px-4 pb-8 space-y-3">
                    {t.aiAssistant.quickActions.map((action, index) => {
                        const Icon = iconMap[action.icon];
                        return (
                             <a
                                key={index}
                                href={action.href}
                                onClick={(e) => {
                                    if (action.action) {
                                        e.preventDefault();
                                        handleActionClick(action.action);
                                    }
                                }}
                                className="flex items-center w-full p-4 bg-slate-700/80 rounded-xl text-left hover:bg-slate-600 transition-colors"
                            >
                                <Icon className="h-6 w-6 text-orange-400 mr-4" />
                                <span className="font-semibold text-white text-lg">{action.text}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );


    return (
        <>
            <button
                onClick={() => setIsOptionsOpen(true)}
                className="fixed bottom-6 right-6 bg-orange-500 text-slate-900 rounded-full p-4 shadow-lg hover:bg-orange-400 transition-all duration-300 transform hover:scale-110 z-[90]"
                aria-label={t.aiAssistant.buttonTooltip}
            >
                <ChatBubbleLeftRightIcon className="h-8 w-8" />
            </button>
            <QuickActionsModal />
            <AiChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
};

export default QuickActionsWidget;
