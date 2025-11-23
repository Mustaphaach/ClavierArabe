import React from 'react';

interface KeyProps {
  char: string;
  onClick: (char: string) => void;
  className?: string;
  isSpecial?: boolean;
}

export const Key: React.FC<KeyProps> = ({ char, onClick, className = '', isSpecial = false }) => {
  return (
    <button
      onClick={() => onClick(char)}
      className={`
        relative group flex items-center justify-center
        h-12 sm:h-14 md:h-16
        text-xl sm:text-2xl md:text-3xl font-amiri pb-2
        bg-white hover:bg-slate-50 active:bg-slate-100
        border-b-4 border-slate-200 active:border-b-0 active:translate-y-1
        rounded-lg shadow-sm transition-all duration-75 ease-out
        select-none
        ${isSpecial ? 'text-gold-600 font-bold bg-amber-50 border-amber-200 hover:bg-amber-100' : 'text-slate-700'}
        ${className}
      `}
      aria-label={`Type ${char}`}
    >
      {char}
      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-gold-400/30 transition-all duration-200"></div>
    </button>
  );
};
