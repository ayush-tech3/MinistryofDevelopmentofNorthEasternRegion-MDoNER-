import React from 'react';
import { ShieldAlert, Radio } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-navy-600 px-6 py-3 flex items-center justify-between">
      {/* Brand */}
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onNavigate && onNavigate('dashboard')}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy-900 to-navy-600 border border-orange-500/60 flex items-center justify-center text-orange-500 shadow-md">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xl font-black text-white tracking-tight">
            Alert<span className="text-orange-500">Nex</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            AI-Powered Early Warning for Safer Communities
          </div>
        </div>
      </div>

      {/* Central Gov / SIH Badges */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 bg-navy-800 border border-navy-600 px-3 py-1 rounded-full text-xs text-slate-300">
          <span>🇮🇳</span>
          <span>SIH 2026 • <strong>MDoNER</strong> (Ministry of DoNER)</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs text-emerald-400 font-semibold">
          <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>FASTAPI LIVE</span>
        </div>
        <span className="bg-amber-500/15 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
          DEMO SIMULATION
        </span>
      </div>

      {/* Quick Action CTA */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate && onNavigate('reporting')}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs px-3.5 py-2 rounded-md shadow-md transition"
        >
          + Report Hazard
        </button>
      </div>
    </header>
  );
};
