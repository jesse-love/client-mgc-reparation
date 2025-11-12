import React from 'react';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import { StarIcon } from '@heroicons/react/24/solid';

const TestimonialMarquee: React.FC = () => {
    const { reviews, isLoading, error } = useBusinessInfo();
    const fiveStarReviews = reviews.filter(r => r.starRating === 'FIVE' && r.comment && r.comment.length > 20);

    const MarqueeItem = ({ review }: { review: (typeof fiveStarReviews)[0] }) => (
        <div className="flex-shrink-0 w-80 sm:w-96 bg-white dark:bg-brand-dark p-6 rounded-xl shadow-lg flex flex-col mx-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-400" />)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed flex-grow italic">"{review.comment}"</p>
            <div className="flex items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <img src={review.reviewer.profilePhotoUrl} alt={review.reviewer.displayName} className="h-12 w-12 rounded-full mr-4 object-cover" />
                <div>
                    <p className="font-bold text-slate-800 dark:text-white">{review.reviewer.displayName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Client Vérifié</p>
                </div>
            </div>
        </div>
    );
    
    // Create a seamless loop by duplicating the reviews
    const marqueeContent = fiveStarReviews.length > 0 ? [...fiveStarReviews, ...fiveStarReviews] : [];

    return (
        <div className="bg-slate-100 dark:bg-slate-900 py-16">
             <style>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .scrolling-wrapper {
                    animation: scroll 60s linear infinite;
                }
            `}</style>
            <div className="relative w-full overflow-hidden">
                <div className="flex scrolling-wrapper">
                    {isLoading && Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-80 sm:w-96 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg animate-pulse mx-4 border border-slate-200 dark:border-slate-700">
                             <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
                             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-4"></div>
                             <div className="flex items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-full mr-4"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                    {error && <div className="text-red-500">{error}</div>}
                    {!isLoading && marqueeContent.map((review, index) => (
                        <MarqueeItem review={review} key={index} />
                    ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-100 dark:from-slate-900 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-100 dark:from-slate-900 to-transparent"></div>
            </div>
        </div>
    );
};

export default TestimonialMarquee;
