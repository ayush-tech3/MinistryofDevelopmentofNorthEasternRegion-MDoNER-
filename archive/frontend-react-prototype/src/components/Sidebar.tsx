import React from 'react';
import {
  LayoutDashboard,
  Map,
  Cpu,
  Route,
  Bell,
  FileSpreadsheet,
  Users,
  Info
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Live Risk Map', icon: Map, badge: 'LIVE' },
    { id: 'risk', label: 'AI Risk Analysis', icon: Cpu },
    { id: 'connectivity', label: 'Impact Analysis', icon: Route, badge: 'CORE' },
    { id: 'alerts', label: 'Alerts & Warnings', icon: Bell },
    { id: 'reporting', label: 'Report Incident', icon: FileSpreadsheet },
    { id: 'system', label: 'System Info', icon: Info },
    { id: 'team', label: 'Team AlertNex', icon: Users },
  ];

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-600 flex flex-col justify-between shrink-0 h-[calc(100vh-65px)] sticky top-[65px]">
      <nav className="p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
          NAVIGATION
        </div>
        {menu.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-orange-500/15 text-white border-l-4 border-orange-500 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.badge === 'LIVE' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* SIH 2026 Footer Badge */}
      <div className="p-4 border-t border-navy-600 bg-navy-950/40">
        <div className="bg-navy-800 border border-navy-600 rounded-md p-3 text-xs">
          <div className="font-bold text-white">SIH 2026 PROTOTYPE</div>
          <div className="text-slate-400 mt-0.5">PS ID: <strong>SIH26001</strong></div>
          <div className="text-slate-400">Team: <strong>AlertNex</strong></div>
          <div className="text-slate-400">Lead: <strong>Ayush Kumar</strong></div>
        </div>
      </div>
    </aside>
  );
};
