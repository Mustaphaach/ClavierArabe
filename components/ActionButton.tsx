import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'blue';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ label, icon: Icon, onClick, variant = 'primary' }) => {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 shadow-sm active:scale-95";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-slate-100",
    danger: "bg-white hover:bg-red-50 text-red-600 border border-red-100 hover:border-red-200 shadow-red-50",
    blue: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
};