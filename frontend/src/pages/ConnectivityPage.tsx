import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ConnectivityImpact, MonitoringZone } from '../types';
import { ConnectivityVisualizer } from '../components/ConnectivityVisualizer';
import { Route, RefreshCw } from 'lucide-react';

interface ConnectivityPageProps {
  initialZoneId?: number;
}

export const ConnectivityPage: React.FC<ConnectivityPageProps> = ({ initialZoneId = 1 }) => {
  const [zones, setZones] = useState<MonitoringZone[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<number>(initialZoneId);
  const [impactData, setImpactData] = useState<ConnectivityImpact | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    api.getZones().then(data => setZones(data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedZoneId) return;
    setLoading(true);
    api.getConnectivity(selectedZoneId)
      .then(data => setImpactData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedZoneId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Route className="w-6 h-6 text-orange-500" />
            <span>Connectivity Impact Intelligence</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            <strong>Core AlertNex Innovation:</strong> Systemic evaluation of road network blockages, isolated communities, and alternative emergency corridors.
          </p>
        </div>

        {/* Zone Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-300">Zone:</label>
          <select
            value={selectedZoneId}
            onChange={(e) => setSelectedZoneId(Number(e.target.value))}
            className="bg-navy-800 border border-navy-600 rounded-md px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-orange-500"
          >
            {zones.map(z => (
              <option key={z.id} value={z.id}>
                {z.name} ({z.risk_level})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-12 text-slate-400 text-xs">
          <RefreshCw className="w-4 h-4 animate-spin mr-2" />
          Analyzing topological road graph and village connectivity...
        </div>
      )}

      {!loading && impactData && (
        <ConnectivityVisualizer data={impactData} />
      )}
    </div>
  );
};
