import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Alert, RiskLevel } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { Bell, Check, ShieldAlert, Radio } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await api.getAlerts();
      setAlerts(data);
    } catch (e) {
      console.error("Error fetching alerts:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleAcknowledge = async (id: number) => {
    try {
      await api.acknowledgeAlert(id);
      setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'ACKNOWLEDGED' } : a));
    } catch (e) {
      console.error("Acknowledge error:", e);
    }
  };

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    return a.risk_level === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-orange-500" />
            <span>Early Warning &amp; Alert Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active Bulletins, Civil Administration Escalation, and Multi-Agency Advisories
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-3 py-1 rounded text-xs font-semibold transition ${
                filter === lvl
                  ? 'bg-orange-500 text-white shadow'
                  : 'bg-navy-800 text-slate-400 hover:text-white border border-navy-600'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 && (
          <div className="bg-navy-800 border border-navy-600 rounded-lg p-12 text-center text-slate-400 text-xs">
            No active alerts found matching the filter.
          </div>
        )}

        {filteredAlerts.map(alert => {
          const borderClass =
            alert.risk_level === 'CRITICAL'
              ? 'border-l-red-500'
              : alert.risk_level === 'HIGH'
              ? 'border-l-orange-500'
              : alert.risk_level === 'MODERATE'
              ? 'border-l-amber-500'
              : 'border-l-emerald-500';

          return (
            <div
              key={alert.id}
              className={`bg-navy-800 border border-navy-600 border-l-4 ${borderClass} rounded-lg p-5 space-y-3 shadow-md`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <RiskBadge level={alert.risk_level} pulse={alert.risk_level === 'CRITICAL'} />
                  <span className="text-xs font-mono text-slate-400">
                    ALERT-ID #{alert.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    alert.status === 'ACTIVE' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{alert.message}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  <strong>Recommended Action:</strong> {alert.recommended_action}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-navy-700/60 text-xs">
                <span className="text-slate-400">
                  Target: Monitoring Zone #{alert.zone_id || 'Regional'}
                </span>
                {alert.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="flex items-center gap-1.5 bg-navy-900 hover:bg-navy-700 text-slate-200 border border-navy-600 px-3 py-1 rounded text-xs font-semibold transition"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acknowledge</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
