import React from 'react';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      
      {/* Eye shape border */}
      <path 
        d="M5 30C5 30 20 5 50 5C80 5 95 30 95 30C95 30 80 55 50 55C20 55 5 30 5 30Z" 
        stroke="url(#logo-gradient)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Inner circle for character */}
      <circle cx="35" cy="30" r="18" fill="#333333" />
      <circle cx="35" cy="30" r="18" stroke="url(#logo-gradient)" strokeWidth="2" />
      
      {/* Telugu Character 'తె' (Te) placeholder/approximation */}
      <text 
        x="35" 
        y="38" 
        textAnchor="middle" 
        fill="#f97316" 
        fontSize="22" 
        fontWeight="bold"
        style={{ fontFamily: 'serif' }}
      >
        తె
      </text>
      
      {/* AI text */}
      <text 
        x="65" 
        y="39" 
        fill="url(#logo-gradient)" 
        fontSize="20" 
        fontWeight="900"
        style={{ fontFamily: 'sans-serif' }}
      >
        AI
      </text>
    </svg>
  );
}
