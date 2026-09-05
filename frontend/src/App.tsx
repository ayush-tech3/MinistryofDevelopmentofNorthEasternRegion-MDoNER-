import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { ConnectivityPage } from './pages/ConnectivityPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportingPage } from './pages/ReportingPage';
import { TeamPage } from './pages/TeamPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [activeZoneId, setActiveZoneId] = useState<number>(1);

  const handleNavigate = (page: string, zoneId?: number) => {
    if (zoneId) setActiveZoneId(zoneId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onNavigate={handleNavigate} />

      <div className="flex flex-1">
        <Sidebar currentPage={currentPage} onPageChange={handleNavigate} />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {currentPage === 'dashboard' && (
            <DashboardPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'risk' && (
            <RiskAnalysisPage initialZoneId={activeZoneId} />
          )}
          {currentPage === 'connectivity' && (
            <ConnectivityPage initialZoneId={activeZoneId} />
          )}
          {currentPage === 'alerts' && (
            <AlertsPage />
          )}
          {currentPage === 'reporting' && (
            <ReportingPage />
          )}
          {currentPage === 'team' && (
            <TeamPage />
          )}
          {currentPage === 'map' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Live GIS Risk Map</h2>
              <div className="bg-navy-800 border border-navy-600 rounded-lg p-6 text-sm text-slate-300">
                <p>
                  The interactive Leaflet GIS map with 8 NER monitoring sectors, road disruption layers, and hospital accessibility overlays is accessible at our dedicated live visualization suite.
                </p>
                <div className="mt-4">
                  <a
                    href="http://localhost:8080/index.html#map"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-4 py-2 rounded-md shadow transition"
                  >
                    Launch Fullscreen GIS Map Suite ➔
                  </a>
                </div>
              </div>
            </div>
          )}
          {currentPage === 'system' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">System Architecture &amp; Technology Stack</h2>
              <div className="bg-navy-800 border border-navy-600 rounded-lg p-6 text-xs text-slate-300 space-y-3 leading-relaxed">
                <p>
                  <strong>Architecture:</strong> React Frontend ➔ FastAPI Backend ➔ AI Risk Engine (Scikit-Learn/NumPy) ➔ PostgreSQL/PostGIS Database (with SQLite automatic fallback) ➔ Connectivity Impact Intelligence.
                </p>
                <p>
                  <strong>Zero Database Manipulation from UI:</strong> All mutations pass through strict Pydantic schemas and FastAPI REST endpoints.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
