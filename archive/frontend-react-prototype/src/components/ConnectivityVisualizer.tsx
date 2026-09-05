import React from 'react';
import { ConnectivityImpact } from '../types';
import { RiskBadge } from './RiskBadge';
import { Navigation, AlertTriangle } from 'lucide-react';

interface ConnectivityVisualizerProps {
  data: ConnectivityImpact;
}

export const ConnectivityVisualizer: React.FC<ConnectivityVisualizerProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Top Status Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-navy-800 border-l-4 border-red-500 border-t border-r border-b border-navy-600 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase">Road Network Status</div>
          <div className="text-base font-bold text-red-400 mt-1">{data.overall_road_status}</div>
        </div>
        <div className="bg-navy-800 border-l-4 border-orange-500 border-t border-r border-b border-navy-600 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase">Affected Communities</div>
          <div className="text-base font-bold text-orange-400 mt-1">{data.affected_villages_count} Villages Vulnerable</div>
        </div>
        <div className="bg-navy-800 border-l-4 border-amber-500 border-t border-r border-b border-navy-600 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase">Hospital Accessibility</div>
          <div className="text-base font-bold text-amber-400 mt-1">{data.hospital_accessibility_status}</div>
        </div>
        <div className="bg-navy-800 border-l-4 border-emerald-500 border-t border-r border-b border-navy-600 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase">Alternative Route</div>
          <div className="text-base font-bold text-emerald-400 mt-1">Active Bypass Ready</div>
        </div>
      </div>

      {/* Suggested Emergency Route Banner */}
      {data.suggested_alternative_route && (
        <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-lg p-4.5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              {data.decision_support_label}
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Suggested Corridor: {data.suggested_alternative_route.corridor_name}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {data.suggested_alternative_route.recommendation_note} Differential: <strong>{data.suggested_alternative_route.distance_differential}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Tables for Roads & Villages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Potentially Affected Roads */}
        <div className="bg-navy-800 border border-navy-600 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span>Potentially Affected Roads</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-navy-600 text-slate-400 font-semibold">
                <tr>
                  <th className="pb-2">Road Corridor</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700">
                {data.roads.map((r, i) => (
                  <tr key={i} className="hover:bg-navy-700/30">
                    <td className="py-2.5 font-semibold text-white">{r.road_name}</td>
                    <td className="py-2.5 text-red-400">{r.status}</td>
                    <td className="py-2.5 text-amber-400 font-bold">{r.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Village Isolation Risk */}
        <div className="bg-navy-800 border border-navy-600 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
            <Navigation className="w-4 h-4 text-orange-500" />
            <span>Village Isolation Analysis</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-navy-600 text-slate-400 font-semibold">
                <tr>
                  <th className="pb-2">Village</th>
                  <th className="pb-2">Population</th>
                  <th className="pb-2">Isolation Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700">
                {data.villages.map((v, i) => (
                  <tr key={i} className="hover:bg-navy-700/30">
                    <td className="py-2.5 font-semibold text-white">{v.village_name}</td>
                    <td className="py-2.5 text-slate-300">{v.population}</td>
                    <td className="py-2.5">
                      <RiskBadge level={v.isolation_risk} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
