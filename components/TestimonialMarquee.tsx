import React from 'react';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import { StarIcon } from '@heroicons/react/24/solid';

const TestimonialMarquee: React.FC = () => {
    const { reviews, isLoading, error } = useBusinessInfo();
    const fiveStarReviews = reviews.filter(r => r.starRating === 'FIVE' && r.comment && r.comment.length > 20);

    const MarqueeItem = ({ review }: { review: (typeof fiveStarReviews)[0] }) => (
        <div className="flex-shrink-0 w-80 sm:w-96 bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col mx-4 border border-white/10">
            <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-400" />)}
            </div>
            <p className="text-slate-300 text-base leading-relaxed flex-grow italic">"{review.comment}"</p>
            <div className="flex items-center mt-4 pt-4 border-t border-white/10">
                <img src={review.reviewer.profilePhotoUrl} alt={review.reviewer.displayName} className="h-12 w-12 rounded-full mr-4 object-cover" />
                <div>
                    <p className="font-bold text-white">{review.reviewer.displayName}</p>
                    <p className="text-sm text-slate-400">Client Vérifié</p>
                </div>
            </div>
        </div>
    );
    
    // Create a seamless loop by duplicating the reviews
    const marqueeContent = fiveStarReviews.length > 3 ? [...fiveStarReviews, ...fiveStarReviews] : fiveStarReviews;

    return (
        <div className="py-2">
             <style>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .scrolling-wrapper {
                    animation: scroll 60s linear infinite;
                }
                 .scrolling-wrapper:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="relative w-full overflow-hidden group">
                <div className="flex scrolling-wrapper group-hover:pause">
                    {isLoading && Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-80 sm:w-96 bg-slate-800/50 p-6 rounded-xl shadow-lg animate-pulse mx-4 border border-white/10">
                             <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
                             <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
                             <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
                             <div className="h-3 bg-slate-700 rounded w-5/6 mb-4"></div>
                             <div className="flex items-center mt-4 pt-4 border-t border-slate-700">
                                <div className="h-12 w-12 bg-slate-700 rounded-full mr-4"></div>
                                <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                    {error && <div className="text-red-500">{error}</div>}
                    {!isLoading && marqueeContent.map((review, index) => (
                        <MarqueeItem review={review} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialMarquee;