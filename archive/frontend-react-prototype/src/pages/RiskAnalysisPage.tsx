import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { RiskExplanation } from '../types';
import { XAIExplanation } from '../components/XAIExplanation';
import { RiskBadge } from '../components/RiskBadge';
import { Cpu, RefreshCw } from 'lucide-react';

interface RiskAnalysisPageProps {
  initialZoneId?: number;
}

export const RiskAnalysisPage: React.FC<RiskAnalysisPageProps> = ({ initialZoneId = 1 }) => {
  const [rainfall, setRainfall] = useState<number>(95);
  const [soilMoisture, setSoilMoisture] = useState<number>(88);
  const [slope, setSlope] = useState<number>(85);
  const [historicalActivity, setHistoricalActivity] = useState<number>(80);
  const [recentReports, setRecentReports] = useState<number>(5);

  const [explanation, setExplanation] = useState<RiskExplanation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runCalculation = async () => {
    setLoading(true);
    try {
      const data = await api.calculateRisk({
        rainfall,
        soil_moisture: soilMoisture,
        slope,
        historical_activity: historicalActivity,
        recent_reports: recentReports
      });
      setExplanation(data);
    } catch (err) {
      console.error("Error calculating risk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runCalculation();
  }, [rainfall, soilMoisture, slope, historicalActivity, recentReports]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-orange-500" />
            <span>AI Risk Assessment Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Prototype Multi-Factor Risk Modeling with Real-Time Explainable AI (XAI)
          </p>
        </div>
        <span className="bg-amber-500/15 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
          PROTOTYPE RISK MODEL
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Input Sliders */}
        <div className="lg:col-span-7 bg-navy-800 border border-navy-600 rounded-lg p-5 space-y-4">
          <div className="text-sm font-bold text-white mb-2">
            Environmental Input Telemetry
          </div>

          {/* Rainfall */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Rainfall (24h Cumulative)</span>
              <span className="font-mono text-orange-400">{rainfall} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Soil Moisture */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Soil Moisture Saturation</span>
              <span className="font-mono text-orange-400">{soilMoisture}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
              className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Slope */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Slope Gradient</span>
              <span className="font-mono text-orange-400">{slope}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={slope}
              onChange={(e) => setSlope(Number(e.target.value))}
              className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Historical Activity */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Historical Landslide Activity Index</span>
              <span className="font-mono text-orange-400">{historicalActivity} / 100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={historicalActivity}
              onChange={(e) => setHistoricalActivity(Number(e.target.value))}
              className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Recent Reports */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Recent Field Ground Reports</span>
              <span className="font-mono text-orange-400">{recentReports} Reports</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={recentReports}
              onChange={(e) => setRecentReports(Number(e.target.value))}
              className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="bg-navy-900 border border-navy-700 p-3 rounded text-[11px] text-slate-400 mt-4">
            <strong>Prototype Formula:</strong> (Rainfall × 0.30) + (Soil Moisture × 0.25) + (Slope × 0.20) + (Historical Activity × 0.15) + (Recent Reports × 0.10)
          </div>
        </div>

        {/* Right: Dynamic Output & XAI */}
        <div className="lg:col-span-5 space-y-4">
          {explanation && (
            <>
              {/* Score Card */}
              <div className="bg-navy-800 border border-navy-600 rounded-lg p-5 text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  DYNAMIC RISK ASSESSMENT OUTPUT
                </div>
                <div className="flex items-center justify-center gap-3 my-2">
                  <span className="text-5xl font-black text-white">
                    {explanation.risk_score}%
                  </span>
                  <RiskBadge level={explanation.risk_level} pulse={explanation.risk_level === 'CRITICAL'} />
                </div>
                <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden my-3">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 via-orange-500 to-red-500 transition-all duration-300"
                    style={{ width: `${explanation.risk_score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-300">{explanation.recommendation}</p>
              </div>

              {/* Explainable AI */}
              <div className="bg-navy-800 border border-navy-600 rounded-lg p-5">
                <XAIExplanation factors={explanation.contributing_factors} score={explanation.risk_score} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
