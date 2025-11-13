import React from 'react';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import { StarIcon } from '@heroicons/react/24/solid';
import Avatar from './Avatar';

const LandingTestimonials: React.FC = () => {
    const { reviews, isLoading } = useBusinessInfo();

    const bestReviews = reviews
        .filter(r => r.starRating === 'FIVE' && r.comment && r.comment.length > 50)
        .slice(0, 2);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 animate-pulse">
                        <div className="flex items-center mb-2">
                           <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                        </div>
                        <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
                        <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                    </div>
                ))}
            </div>
        );
    }
    
    if (bestReviews.length === 0) {
        return null; // Don't render if no suitable reviews
    }

    return (
        <div className="space-y-4">
            {bestReviews.map((review, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="flex items-center mb-2">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-4 w-4 text-yellow-400" />)}
                        </div>
                        <p className="ml-3 font-bold text-sm text-white">{review.reviewer.displayName}</p>
                    </div>
                    <p className="text-sm text-slate-300 italic">"{review.comment}"</p>
                </div>
            ))}
        </div>
    );
};

export default LandingTestimonials;