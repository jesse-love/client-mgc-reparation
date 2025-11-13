import React from 'react';

const ShopIllustration: React.FC = () => {
    return (
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="rounded-lg shadow-xl my-8 w-full">
            <defs>
                <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" className="stop-color-sky-300 dark:stop-color-sky-800" />
                    <stop offset="100%" className="stop-color-sky-100 dark:stop-color-sky-900" />
                </linearGradient>
            </defs>
            {/* Sky */}
            <rect width="400" height="250" fill="url(#sky-grad)" />
            
            {/* Ground */}
            <rect y="250" width="400" height="50" className="fill-slate-400 dark:fill-slate-700" />
            
            {/* Building */}
            <rect x="50" y="100" width="300" height="150" className="fill-slate-200 dark:fill-slate-800" />
            <rect x="50" y="100" width="300" height="15" className="fill-slate-300 dark:fill-slate-900" />
            
            {/* Garage Doors */}
            <rect x="80" y="150" width="80" height="100" className="fill-orange-500" />
            <line x1="80" y1="165" x2="160" y2="165" className="stroke-orange-600/50" strokeWidth="10" />
            <line x1="80" y1="185" x2="160" y2="185" className="stroke-orange-600/50" strokeWidth="10" />
            <line x1="80" y1="205" x2="160" y2="205" className="stroke-orange-600/50" strokeWidth="10" />
            <line x1="80" y1="225" x2="160" y2="225" className="stroke-orange-600/50" strokeWidth="10" />

            <rect x="240" y="150" width="80" height="100" className="fill-orange-500" />
            <line x1="240" y1="165" x2="320" y2="165" className="stroke-orange-600/50" strokeWidth="10" />
            <line x1="240" y1="185" x2="320" y2="185" className="stroke-orange-600/50" strokeWidth="10" />
            <line x1="240" y1="205" x2="320" y2="205" className="stroke-orange-600/50" strokeWidth="10" />
            <line x1="240" y1="225" x2="320" y2="225" className="stroke-orange-600/50" strokeWidth="10" />

            {/* Sign */}
            <rect x="150" y="115" width="100" height="25" className="fill-brand-blue" />
            <text x="200" y="132" fontFamily="Oswald, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                MGC<tspan fill="#f97316"> RÉPARATION</tspan>
            </text>
            
            {/* Window */}
            <rect x="175" y="150" width="50" height="50" className="fill-sky-400/50 dark:fill-sky-600/50" />
        </svg>
    );
};

export default ShopIllustration;
