import React from 'react';

const HeroBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-brand-dark" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="pointer-events-none">
                <defs>
                    <radialGradient id="hero-grad-1" cx="20%" cy="30%" r="60%" fx="20%" fy="30%">
                        <stop offset="0%" style={{ stopColor: 'rgba(234, 88, 12, 0.15)' }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(234, 88, 12, 0)' }} />
                    </radialGradient>
                    <radialGradient id="hero-grad-2" cx="80%" cy="70%" r="50%" fx="80%" fy="70%">
                        <stop offset="0%" style={{ stopColor: 'rgba(26, 58, 109, 0.5)' }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(26, 58, 109, 0)' }} />
                    </radialGradient>
                    <pattern id="pattern-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern-grid)" />
                <rect width="100%" height="100%" fill="url(#hero-grad-1)" />
                <rect width="100%" height="100%" fill="url(#hero-grad-2)" />
            </svg>
        </div>
    );
};

export default HeroBackground;
