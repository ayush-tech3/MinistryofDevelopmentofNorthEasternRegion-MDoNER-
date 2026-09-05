import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext: string;
  accentColor?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  accentColor = '#f97316',
  icon
}) => {
  return (
    <div className="bg-navy-800 border border-navy-600 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden shadow-md">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div className="text-3xl font-extrabold text-white my-2">{value}</div>
      <span className="text-xs text-slate-400">{subtext}</span>
    </div>
  );
};
