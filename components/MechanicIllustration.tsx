import React from 'react';

const MechanicIllustration: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect width="400" height="300" className="fill-slate-200 dark:fill-brand-dark" />
            
            {/* Floor */}
            <path d="M0 250 L400 250 L400 300 L0 300 Z" className="fill-slate-300 dark:fill-slate-800" />
            <line x1="0" y1="250" x2="400" y2="250" className="stroke-slate-400/50 dark:stroke-slate-700/50" />

            {/* Back Wall */}
            <rect x="0" y="50" width="400" height="200" className="fill-slate-100 dark:fill-slate-900" />
            
            {/* Lift */}
            <rect x="190" y="100" width="20" height="150" className="fill-slate-500 dark:fill-slate-600" />
            <rect x="170" y="240" width="60" height="10" rx="2" className="fill-slate-600 dark:fill-slate-700" />
            <path d="M120 220 L280 220 L270 235 L130 235 Z" className="fill-slate-400 dark:fill-slate-500" />
            
            {/* Car Body */}
            <path d="M50 220 C 60 180, 100 170, 150 175 L 280 170 C 340 170, 360 220, 350 220 Z" className="fill-brand-blue" />
            {/* Car Windows */}
            <path d="M160 176 L 200 140 L 270 140 L 275 171 Z" className="fill-slate-300 dark:fill-slate-400 opacity-80" />
            
            {/* Wheels (off ground) */}
            <circle cx="100" cy="210" r="25" className="fill-slate-800 dark:fill-black" />
            <circle cx="100" cy="210" r="12" className="fill-slate-400 dark:fill-slate-500" />
            <circle cx="310" cy="210" r="25" className="fill-slate-800 dark:fill-black" />
            <circle cx="310" cy="210" r="12" className="fill-slate-400 dark:fill-slate-500" />
            
            {/* Tool Cabinet */}
            <rect x="350" y="180" width="40" height="70" rx="3" className="fill-orange-500" />
            <rect x="355" y="188" width="30" height="8" rx="1" className="fill-slate-600 dark:fill-slate-700" />
            <rect x="355" y="200" width="30" height="8" rx="1" className="fill-slate-600 dark:fill-slate-700" />
            <rect x="355" y="212" width="30" height="8" rx="1" className="fill-slate-600 dark:fill-slate-700" />
            
            {/* Hanging Lights */}
            <rect x="80" y="50" width="10" height="40" className="fill-slate-400 dark:fill-slate-700" />
            <rect x="80" y="90" width="10" height="10" rx="5" className="fill-yellow-300" />

            <rect x="280" y="50" width="10" height="60" className="fill-slate-400 dark:fill-slate-700" />
            <rect x="280" y="110" width="10" height="10" rx="5" className="fill-yellow-300" />
        </svg>
    );
};

export default MechanicIllustration;
