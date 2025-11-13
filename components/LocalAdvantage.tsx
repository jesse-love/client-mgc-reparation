import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalAdvantageContent } from '../utils/gemini';
import { MapPinIcon } from '@heroicons/react/24/solid';

interface LocalContent {
    text: string;
    // FIX: Make uri and title optional to match the type from GroundingChunk.
    sources: { web?: { uri?: string, title?: string }, maps?: { uri?: string, title?: string } }[];
}

const LocalAdvantage: React.FC = () => {
    const { t, language } = useLanguage();
    const [content, setContent] = useState<LocalContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Check cache first
                const cachedData = localStorage.getItem('localAdvantageContent');
                const now = new Date().getTime();
                if (cachedData) {
                    const { content: cachedContent, timestamp, lang } = JSON.parse(cachedData);
                    // Cache is valid for 24 hours and for the current language
                    if ((now - timestamp < 24 * 60 * 60 * 1000) && lang === language) {
                        setContent(cachedContent);
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (e) {
                console.error("Failed to read from cache", e);
            }
            
            // If no valid cache, fetch from API
            try {
                const newContent = await getLocalAdvantageContent(language);
                if (newContent) {
                    setContent(newContent);
                    // Save to cache
                    const cachePayload = {
                        content: newContent,
                        timestamp: new Date().getTime(),
                        lang: language
                    };
                    localStorage.setItem('localAdvantageContent', JSON.stringify(cachePayload));
                } else {
                     throw new Error("No content was generated.");
                }
            } catch (err: any) {
                console.error("Failed to fetch local advantage content:", err);
                setError("Could not load local insights at this time.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [language]);

    const renderSkeleton = () => (
        <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-8"></div>
            <div className="flex justify-center space-x-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-32"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-32"></div>
            </div>
        </div>
    );

    return (
        <section className="py-20 lg:py-32 bg-white dark:bg-brand-dark">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                {isLoading ? renderSkeleton() : error ? (
                    <p className="text-red-500">{error}</p>
                ) : content && (
                    <>
                        <h2 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">
                            {t.localAdvantage.title}
                        </h2>
                        <p className="mt-8 text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                            {content.text}
                        </p>
                        {content.sources && content.sources.length > 0 && (
                            <div className="mt-10">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Sources</h4>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {content.sources.map((source, index) => {
                                        const sourceInfo = source.maps || source.web;
                                        // FIX: Ensure that the source, URI, and title exist before rendering the link.
                                        if (!sourceInfo || !sourceInfo.uri || !sourceInfo.title) return null;
                                        return (
                                            <a 
                                                key={index}
                                                href={sourceInfo.uri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <MapPinIcon className="h-4 w-4 mr-2 text-orange-500" />
                                                {sourceInfo.title}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default LocalAdvantage;