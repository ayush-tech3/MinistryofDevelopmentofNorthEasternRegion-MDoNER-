import React from 'react';
import { Users, Award, ShieldCheck } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const members = [
    {
      name: "AYUSH KUMAR",
      role: "Team Leader",
      responsibilities: ["AI/ML Architecture", "Landslide Risk Prediction Engine", "System Architecture", "Overall Coordination"],
      initials: "AK",
      isLeader: true
    },
    {
      name: "PRERANA MONDAL",
      role: "Team Member",
      responsibilities: ["Frontend Development", "UI/UX Design", "GIS Data Visualization", "User Accessibility"],
      initials: "PM"
    },
    {
      name: "SONDEEP KUMAR",
      role: "Team Member",
      responsibilities: ["Backend Development", "Database Architecture (PostGIS)", "API Integration", "Data Pipelines"],
      initials: "SK"
    },
    {
      name: "SHINJINI LOHAR",
      role: "Team Member",
      responsibilities: ["AI/ML Engineering", "Computer Vision Hazard Detection", "Remote Sensing", "Data Processing"],
      initials: "SL"
    },
    {
      name: "SUBHAM KUMAR MODI",
      role: "Team Member",
      responsibilities: ["GIS Spatial Analysis", "Mobile Application Workflow", "Offline Storage Sync", "QA Testing"],
      initials: "SM"
    },
    {
      name: "RAHUL DEO",
      role: "Team Member",
      responsibilities: ["Cloud Infrastructure", "DevOps & Deployment", "Security & Data Integrity", "System Testing"],
      initials: "RD"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-orange-500" />
          <span>Meet Team AlertNex</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Smart India Hackathon 2026 • Problem Statement: <strong>SIH26001</strong> • Theme: <strong>Disaster Management</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((m, i) => (
          <div
            key={i}
            className={`bg-navy-800 border ${
              m.isLeader ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-navy-600'
            } rounded-lg p-5 space-y-4`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-900 to-orange-500 border border-navy-600 flex items-center justify-center font-bold text-white shadow">
                {m.initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{m.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  m.isLeader ? 'text-orange-400' : 'text-slate-400'
                }`}>
                  {m.role}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Key Responsibilities:
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                {m.responsibilities.map((r, ri) => (
                  <li key={ri}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Submission credential banner */}
      <div className="bg-gradient-to-r from-orange-500/10 to-navy-800 border border-orange-500/40 rounded-lg p-5 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Smart India Hackathon 2026 Official Identity
          </div>
          <div className="text-base font-bold text-white mt-0.5">
            Team: AlertNex | Problem Statement ID: SIH26001
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Ministry of Development of North Eastern Region (MDoNER)
          </div>
        </div>
        <ShieldCheck className="w-8 h-8 text-orange-400 shrink-0" />
      </div>
    </div>
  );
};
