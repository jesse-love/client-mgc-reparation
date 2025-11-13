import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import type { ChatMessage } from '../types';
import { getDiagnosticSuggestion } from '../utils/gemini';
import { useQuoteWizard, initialWizardData } from '../contexts/QuoteWizardContext';

interface AiChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AiChatModal: React.FC<AiChatModalProps> = ({ isOpen, onClose }) => {
    const { t, language } = useLanguage();
    const { openWizard, setWizardData } = useQuoteWizard();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const resetChat = () => {
        setConversationHistory([]);
        setMessages([{
            sender: 'ai',
            text: t.aiAssistant.conversationFlow.starters.question,
            options: t.aiAssistant.conversationFlow.starters.options,
        }]);
    };

    useEffect(() => {
        if (isOpen) {
            resetChat();
        }
    }, [isOpen, t]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleBookService = (e: React.MouseEvent, action: ChatMessage['action']) => {
        if (!action) return;
        e.preventDefault();
        const serviceCategoryMap: { [key: string]: string } = {
            'general-mechanics': 'Diagnostics / Not Sure',
            'ac-service': 'Specific Repair',
            'heavy-vehicle-mechanics': 'Specific Repair',
            'trailer-repair': 'Specific Repair',
            'generator-services': 'Specific Repair',
            'welding-assembly': 'Specific Repair',
        };
        setWizardData({
            ...initialWizardData,
            step: 3,
            description: action.userProblem,
            serviceCategory: serviceCategoryMap[action.slug] || 'Diagnostics / Not Sure',
        });
        openWizard();
        onClose();
    };

    const processUserResponse = async (userText: string, problemDescription: string) => {
        const userMessage: ChatMessage = { sender: 'user', text: userText };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const result = await getDiagnosticSuggestion(problemDescription, language);
            if (result?.diagnosis && result?.suggestion_slug && result?.suggestion_text) {
                 setMessages(prev => [...prev, {
                    sender: 'ai',
                    text: result.diagnosis,
                    action: {
                        slug: result.suggestion_slug,
                        text: result.suggestion_text,
                        userProblem: problemDescription
                    }
                }]);
            } else {
                 setMessages(prev => [...prev, { sender: 'ai', text: t.aiAssistant.error }]);
            }
        } catch (error) {
            console.error("AI Diagnostic Assistant Error:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: t.aiAssistant.error }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOptionSelect = (option: ChatMessage['options'][0]) => {
        const newHistory = [...conversationHistory, option.description];
        setConversationHistory(newHistory);
        
        const userMessage: ChatMessage = { sender: 'user', text: option.text };
        setMessages(prev => [...prev, userMessage]);

        const nextStep = t.aiAssistant.conversationFlow.ramifications[option.payload as keyof typeof t.aiAssistant.conversationFlow.ramifications];
        
        if (nextStep) {
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: nextStep.question,
                options: nextStep.options
            }]);
        } else {
            // End of guided flow, call Gemini
            setIsLoading(true);
            processUserResponse(option.text, newHistory.join(' '));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;
        setInputValue('');
        processUserResponse(trimmedInput, trimmedInput);
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[110] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
            <div className={`relative w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100' : 'scale-95'}`} style={{height: 'min(80vh, 700px)'}}>
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center">
                        <SparklesIcon className="h-6 w-6 text-orange-500 mr-2" />
                        <h3 className="font-oswald font-bold text-xl text-slate-900 dark:text-white">{t.aiAssistant.modalTitle}</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.map((message, index) => (
                        <div key={index}>
                            <div className={`flex w-full ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${message.sender === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                                    <p className="text-base whitespace-pre-wrap">{message.text}</p>
                                    {message.action && (
                                         <button onClick={(e) => handleBookService(e, message.action)} className="mt-3 w-full bg-slate-200 dark:bg-slate-600 px-4 py-2 rounded-lg text-sm font-bold text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors text-center">
                                            {message.action.text} &rarr;
                                        </button>
                                    )}
                                </div>
                            </div>
                            {message.sender === 'ai' && message.options && (
                                <div className="mt-3 flex flex-col items-start space-y-2">
                                    {message.options.map((option, i) => (
                                        <button key={i} onClick={() => handleOptionSelect(option)} className="px-4 py-2 bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-bl-none shadow-md">
                                <div className="flex items-center space-x-1">
                                    <span className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-orange-500 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="flex-shrink-0 p-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                         <button onClick={resetChat} title="Restart Conversation" className="p-3 text-slate-500 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                            <ArrowUturnLeftIcon className="h-5 w-5" />
                        </button>
                        <form onSubmit={handleSubmit} className="flex-grow flex items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t.aiAssistant.inputPlaceholder}
                                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-full placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button type="submit" disabled={isLoading || !inputValue.trim()} className="ml-2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-colors flex-shrink-0">
                                <PaperAirplaneIcon className="h-6 w-6" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiChatModal;
