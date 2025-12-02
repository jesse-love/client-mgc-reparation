import React from 'react';
import Marquee from 'react-fast-marquee';
import { StarIcon } from '@heroicons/react/24/solid';
import { useReviews } from '../contexts/ReviewsContext';

const TestimonialMarquee: React.FC = () => {
                    to { transform: translateX(-50 %); }
}
                .scrolling - wrapper {
    animation: scroll 60s linear infinite;
}
                 .scrolling - wrapper:hover {
    animation - play - state: paused;
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