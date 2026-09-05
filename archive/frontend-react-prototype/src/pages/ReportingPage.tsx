import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IncidentReport, RiskLevel } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { FileSpreadsheet, MapPin, UploadCloud, CheckCircle, WifiOff } from 'lucide-react';

export const ReportingPage: React.FC = () => {
  const [reporterType, setReporterType] = useState<'Citizen' | 'Field Officer' | 'Authority'>('Citizen');
  const [incidentType, setIncidentType] = useState<string>('Ground Crack');
  const [description, setDescription] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(25.3020);
  const [longitude, setLongitude] = useState<number>(91.5840);
  const [severity, setSeverity] = useState<RiskLevel>('HIGH');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<any[]>([]);
  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [statusMsg, setStatusMsg] = useState<string>('');

  useEffect(() => {
    // Load existing reports
    api.getReports().then(data => setReports(data)).catch(console.error);

    // Load offline queue
    try {
      const stored = localStorage.getItem('alertnex_react_offline_queue');
      if (stored) setOfflineQueue(JSON.parse(stored));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  }, []);

  const handleGetGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(Number(pos.coords.latitude.toFixed(4)));
          setLongitude(Number(pos.coords.longitude.toFixed(4)));
          setStatusMsg("✓ GPS Location Detected");
        },
        () => {
          // NER Fallback
          setLatitude(25.3020);
          setLongitude(91.5840);
          setStatusMsg("✓ Sample NER Location Set");
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReportItem = {
      reporter_type: reporterType,
      incident_type: incidentType,
      description,
      latitude,
      longitude,
      severity,
      created_at: new Date().toISOString()
    };

    if (isOffline) {
      const updatedQueue = [...offlineQueue, newReportItem];
      setOfflineQueue(updatedQueue);
      localStorage.setItem('alertnex_react_offline_queue', JSON.stringify(updatedQueue));
      setStatusMsg("SAVED OFFLINE: Report cached locally in IndexedDB/LocalStorage");
      setDescription('');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('reporter_type', reporterType);
      formData.append('incident_type', incidentType);
      formData.append('description', description);
      formData.append('latitude', String(latitude));
      formData.append('longitude', String(longitude));
      formData.append('severity', severity);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await api.submitReport(formData);
      setReports(prev => [res, ...prev]);
      setStatusMsg("SYNCED SUCCESSFULLY: Report saved to database!");
      setDescription('');
      setImageFile(null);
    } catch (err) {
      // Fallback offline queue
      const updatedQueue = [...offlineQueue, newReportItem];
      setOfflineQueue(updatedQueue);
      localStorage.setItem('alertnex_react_offline_queue', JSON.stringify(updatedQueue));
      setStatusMsg("SAVED OFFLINE: Backend unreachable, cached locally.");
    }
  };

  const handleSyncNow = async () => {
    if (offlineQueue.length === 0) return;
    setStatusMsg("Syncing offline reports...");

    for (const item of offlineQueue) {
      try {
        const formData = new FormData();
        formData.append('reporter_type', item.reporter_type);
        formData.append('incident_type', item.incident_type);
        formData.append('description', item.description);
        formData.append('latitude', String(item.latitude));
        formData.append('longitude', String(item.longitude));
        formData.append('severity', item.severity);
        await api.submitReport(formData);
      } catch (e) {
        console.warn("Sync error:", e);
      }
    }

    setOfflineQueue([]);
    localStorage.removeItem('alertnex_react_offline_queue');
    const refreshed = await api.getReports();
    setReports(refreshed);
    setStatusMsg("SYNCED SUCCESSFULLY: All queued reports synchronized!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-orange-500" />
            <span>Community &amp; Field Hazard Reporting</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Crowdsourced Citizen Informant and Geologist Observation Registry with Offline Sync
          </p>
        </div>

        {/* Offline Toggle Simulation */}
        <div className="flex items-center gap-3 bg-navy-800 border border-navy-600 px-3 py-1.5 rounded-lg text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={isOffline}
              onChange={(e) => setIsOffline(e.target.checked)}
              className="accent-orange-500"
            />
            <span>Simulate Offline Mode</span>
          </label>
        </div>
      </div>

      {statusMsg && (
        <div className="bg-orange-500/15 border border-orange-500/40 text-orange-300 px-4 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between">
          <span>{statusMsg}</span>
          {offlineQueue.length > 0 && !isOffline && (
            <button
              onClick={handleSyncNow}
              className="bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1 rounded text-[11px] font-bold shadow"
            >
              SYNC NOW ({offlineQueue.length})
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-7 bg-navy-800 border border-navy-600 rounded-lg p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reporter Type</label>
                <select
                  value={reporterType}
                  onChange={(e: any) => setReporterType(e.target.value)}
                  className="w-full bg-navy-900 border border-navy-600 rounded p-2 text-xs text-white"
                >
                  <option value="Citizen">Citizen</option>
                  <option value="Field Officer">Field Officer</option>
                  <option value="Authority">Authority</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Incident Type</label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full bg-navy-900 border border-navy-600 rounded p-2 text-xs text-white"
                >
                  <option value="Dangerous Slope">Dangerous Slope</option>
                  <option value="Ground Crack">Ground Crack</option>
                  <option value="Ground Movement">Ground Movement</option>
                  <option value="Rockfall">Rockfall</option>
                  <option value="Road Blockage">Road Blockage</option>
                  <option value="Landslide">Landslide</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Severity Level</label>
                <select
                  value={severity}
                  onChange={(e: any) => setSeverity(e.target.value)}
                  className="w-full bg-navy-900 border border-navy-600 rounded p-2 text-xs text-white"
                >
                  <option value="LOW">LOW</option>
                  <option value="MODERATE">MODERATE</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location Coordinates</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.0001"
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                    className="w-1/2 bg-navy-900 border border-navy-600 rounded p-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleGetGPS}
                    className="bg-navy-900 hover:bg-navy-700 border border-navy-600 text-orange-400 px-2.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>GPS</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Observed ground tension crack, active water infiltration, or structural deformation..."
                className="w-full bg-navy-900 border border-navy-600 rounded p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Attach Hazard Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-orange-400 hover:file:bg-navy-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-md shadow-md transition"
            >
              Submit Hazard Report
            </button>
          </form>
        </div>

        {/* Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-navy-800 border border-navy-600 rounded-lg p-5">
            <h3 className="text-sm font-bold text-white mb-3">Recently Registered Reports</h3>
            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {reports.map((r) => (
                <div key={r.id} className="bg-navy-900 border border-navy-700 rounded p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <RiskBadge level={r.severity} />
                    <span className="text-[10px] text-slate-400">
                      {new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="font-bold text-white">{r.incident_type}</div>
                  <p className="text-slate-300 text-[11px]">{r.description}</p>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-navy-700 flex justify-between">
                    <span>By: {r.reporter_type}</span>
                    <span className="text-emerald-400 font-semibold">{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
