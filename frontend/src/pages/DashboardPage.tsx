import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MonitoringZone, Alert } from '../types';
import { StatCard } from '../components/StatCard';
import { RiskBadge } from '../components/RiskBadge';
import { ShieldAlert, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string, zoneId?: number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [zones, setZones] = useState<MonitoringZone[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [zonesData, alertsData] = await Promise.all([
        api.getZones(),
        api.getAlerts()
      ]);
      setZones(zonesData);
      setAlerts(alertsData);
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const lowCount = zones.filter(z => z.risk_level === 'LOW').length;
  const modCount = zones.filter(z => z.risk_level === 'MODERATE').length;
  const highCount = zones.filter(z => z.risk_level === 'HIGH').length;
  const critCount = zones.filter(z => z.risk_level === 'CRITICAL').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            AlertNex Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-Time Landslide Risk Monitoring &amp; Decision-Support Platform | North Eastern Region
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-slate-300 px-3 py-1.5 rounded text-xs font-semibold border border-navy-600 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Backend</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          label="Total Monitored"
          value={zones.length || 4}
          subtext="NER Core Zones"
          accentColor="#3b82f6"
        />
        <StatCard
          label="Low Risk"
          value={lowCount}
          subtext="Normal Baseline"
          accentColor="#10b981"
        />
        <StatCard
          label="Moderate Risk"
          value={modCount}
          subtext="Advisory Watch"
          accentColor="#f59e0b"
        />
        <StatCard
          label="High Risk"
          value={highCount}
          subtext="Preparedness Mobilized"
          accentColor="#f97316"
        />
        <StatCard
          label="Critical Risk"
          value={critCount}
          subtext="Action Required"
          accentColor="#ef4444"
        />
      </div>

      {/* Live Alert Ticker */}
      {alerts.length > 0 && (
        <div className="bg-red-950/20 border border-red-500/40 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 animate-pulse" />
            <div>
              <div className="text-sm font-bold text-white">
                {alerts[0].message}
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                {alerts[0].recommended_action}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('connectivity', alerts[0].zone_id || 1)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-3 py-1.5 rounded shadow"
            >
              Analyze Impact
            </button>
            <button
              onClick={() => onNavigate('alerts')}
              className="bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs px-3 py-1.5 rounded border border-navy-600"
            >
              All Alerts
            </button>
          </div>
        </div>
      )}

      {/* Monitored Zones Table */}
      <div className="bg-navy-800 border border-navy-600 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Live Monitoring Zones (FastAPI &amp; Database)</h3>
            <p className="text-xs text-slate-400">Current environmental telemetry and computed risk levels.</p>
          </div>
          <span className="bg-navy-900 border border-navy-600 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
            LIVE SYNC
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-navy-600 text-slate-400 font-semibold">
              <tr>
                <th className="pb-3">Zone &amp; Sector</th>
                <th className="pb-3">District &amp; State</th>
                <th className="pb-3">Rainfall</th>
                <th className="pb-3">Soil Moisture</th>
                <th className="pb-3">Slope</th>
                <th className="pb-3">Risk Level</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-navy-700/40 transition">
                  <td className="py-3 font-semibold text-white">{zone.name}</td>
                  <td className="py-3 text-slate-300">{zone.district}</td>
                  <td className="py-3 text-slate-300">{zone.rainfall} mm</td>
                  <td className="py-3 text-slate-300">{zone.soil_moisture}%</td>
                  <td className="py-3 text-slate-300">{zone.slope}°</td>
                  <td className="py-3">
                    <RiskBadge level={zone.risk_level} pulse={zone.risk_level === 'CRITICAL'} />
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onNavigate('risk', zone.id)}
                        className="bg-navy-900 hover:bg-navy-700 text-orange-400 border border-navy-600 px-2.5 py-1 rounded text-[11px] font-medium"
                      >
                        Explain AI
                      </button>
                      <button
                        onClick={() => onNavigate('connectivity', zone.id)}
                        className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 px-2.5 py-1 rounded text-[11px] font-medium"
                      >
                        Impact
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
