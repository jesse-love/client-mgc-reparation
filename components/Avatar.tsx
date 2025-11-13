import React from 'react';

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  // Simple hash to get a color index from the reviewer's name for variety
  const colors = [
    'bg-orange-500', 'bg-brand-blue', 'bg-slate-500', 
    'bg-orange-600', 'bg-blue-800', 'bg-slate-600'
  ];
  const colorIndex = name.length > 0 ? name.charCodeAt(0) % colors.length : 0;
  const colorClass = colors[colorIndex];

  return (
    <div className={`h-12 w-12 rounded-full ${colorClass} flex items-center justify-center shadow-inner`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white/80">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

export default Avatar;
