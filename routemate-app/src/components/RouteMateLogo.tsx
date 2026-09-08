import React from 'react';

interface RouteMateLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const RouteMateLogo: React.FC<RouteMateLogoProps> = ({ size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold',
    lg: 'text-3xl font-extrabold',
  };

  return (
    <div className="inline-flex items-center gap-2 select-none">
      {/* RouteMate App Icon */}
      <div
        className={`${iconSizes[size]} relative rounded-xl bg-[#39D9C8] flex items-center justify-center shadow-sm overflow-hidden p-1 shrink-0`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          {/* Folded white bookmark shape */}
          <path
            d="M20 16C20 12.6863 22.6863 10 26 10H74C77.3137 10 80 12.6863 80 16V86L50 72L20 86V16Z"
            fill="white"
          />
          {/* Route curve */}
          <path
            d="M32 64C32 64 38 60 48 60C60 60 62 42 50 38C38 34 42 22 56 22"
            stroke="#39D9C8"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Pin head dot */}
          <circle cx="32" cy="64" r="5.5" fill="#2D3A4A" />
          <circle cx="56" cy="49" r="4.5" fill="#2D3A4A" />
          {/* Pin location beacon */}
          <path
            d="M62 26C62 31.5 56 38 56 38C56 38 50 31.5 50 26C50 22.6863 52.6863 20 56 20C59.3137 20 62 22.6863 62 26Z"
            fill="#FFB85C"
          />
          <circle cx="56" cy="25" r="2.5" fill="white" />
          {/* Cute smile */}
          <path
            d="M52 68C55 72 61 72 64 68"
            stroke="#2D3A4A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center tracking-tight font-sans">
          <span className={`${textSizes[size]} text-[#2D3A4A]`}>Route</span>
          <span className={`${textSizes[size]} text-[#00A896]`}>Mate</span>
        </div>
      )}
    </div>
  );
};
