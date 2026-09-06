# 🎥 AlertNex — Official Product Demo & User Flow Walkthrough

> **Ministry of Development of North Eastern Region (MDoNER)**  
> **Smart India Hackathon 2026 | Problem Statement ID: SIH26001**  
> *Complete step-by-step system walkthrough demonstrating multimodal telemetry ingestion, Explainable AI (XAI) risk scoring, topological road connectivity disruption mapping, offline incident logging, and emergency alert dispatch.*

🌐 **Live Production App (Netlify)**: [https://ministryofdevelopmentofnortheastern.netlify.app/](https://ministryofdevelopmentofnortheastern.netlify.app/)  
📄 **GitHub Pages App**: [https://ayush-tech3.github.io/MinistryofDevelopmentofNorthEasternRegion-MDoNER-/](https://ayush-tech3.github.io/MinistryofDevelopmentofNorthEasternRegion-MDoNER-/)  
📂 **GitHub Repository**: [https://github.com/ayush-tech3/MinistryofDevelopmentofNorthEasternRegion-MDoNER-](https://github.com/ayush-tech3/MinistryofDevelopmentofNorthEasternRegion-MDoNER-)  
📡 **Interactive Swagger API Docs**: `http://localhost:8000/docs` (or hosted instance)  
📊 **Official Presentation PPTX**: [SIH2026_AlertNex_Presentation.pptx](presentation/SIH2026_AlertNex_Presentation.pptx)  

---

## 🎬 Video & Presentation Walkthrough Structure

| Timestamp / Phase | Stage | User Flow & Action Demonstrated | Technical & Algorithmic Verification |
|---|---|---|---|
| **Phase 1: 0:00 - 0:45** | **Authority Command Center** | Real-time overview of NER monitoring sectors, live hazard ticker, active risk gauges, and sensor health status. | REST API polling `/api/zones/` + client cache hydration |
| **Phase 2: 0:45 - 1:30** | **Interactive GIS Spatial Viewer** | Leaflet GIS canvas with CartoDB topographic tiles, multi-tiered risk buffer polygons, monitoring zones, and hospital nodes. | Dynamic GeoJSON rendering, pulsing risk rings |
| **Phase 3: 1:30 - 2:15** | **Prototype AI Risk Assessment Engine** | Interactive telemetry sliders (Rainfall, Soil Moisture, Slope Angle, Weather Multipliers) to trigger real-time hazard recalibration. | Calibrated weighted formula: $(R \times 0.3) + (SM \times 0.25) + (S \times 0.2) + (H \times 0.15) + (FR \times 0.1)$ |
| **Phase 4: 2:15 - 3:00** | **Explainable AI (XAI) Attribution** | Inspecting transparent factor contributions with impact classification badges (`HIGH IMPACT`, `MODERATE IMPACT`, `BASELINE`). | Mathematical factor decomposition into individual percentage contributions |
| **Phase 5: 3:00 - 3:45** | **Connectivity Impact Intelligence** | Road network disruption graph solver, detecting single-access isolated villages, hospital transit delay, and bypass routing. | Topological graph path solver (`NORMAL`, `MONITORING`, `POTENTIAL DISRUPTION`, `CRITICAL DISRUPTION`) |
| **Phase 6: 3:45 - 4:15** | **Emergency Bypass Corridor Recommender** | Generating alternative emergency corridor recommendations (e.g. NH-206 to Mawphlang Bypass) with delay differentials. | Distance differential ($\Delta$ km) and convoy delay estimation |
| **Phase 7: 4:15 - 4:45** | **Offline Incident Reporting & Sync** | Citizen field incident submission with photo preview, GPS acquisition, IndexedDB queue caching, and one-click sync. | IndexedDB client store with LocalStorage fallback and `/api/reports/` sync |
| **Phase 8: 4:45 - 5:15** | **Multi-Channel Emergency Alert Dispatch** | Authority bulletin broadcast, simulated SMS gateway, and live SMTP email delivery to District Magistrate / NDRF inboxes. | Python `smtplib` live dispatch + `/api/alerts/` lifecycle |
| **Phase 9: 5:15 - 6:00** | **10-Phase Judge Simulation Mode** | One-click automatic demonstration advancing through baseline monitoring, monsoon escalation, critical breach, and recovery. | Automated state machine in `simulation.js` driving end-to-end platform updates |

---

## 🔍 Detailed Step-by-Step User Flow & Verification

### Step 1: Access the Authority Command Center
1. Navigate to [https://ministryofdevelopmentofnortheastern.netlify.app/](https://ministryofdevelopmentofnortheastern.netlify.app/).
2. The dashboard immediately loads key metric cards:
   - **Active Hazard Status:** Real-time threat index across Meghalaya, Assam, Sikkim, and Nagaland.
   - **Monitored Road Corridors:** Track status across NH-206, NH-27, NH-10, and NH-29.
   - **Potentially Isolated Hamlets:** Immediate counter of single-access mountain villages at risk.
   - **Sensor Telemetry Health:** Diagnostic indicators for virtual precipitation and moisture probes.

### Step 2: Spatial GIS Exploration
1. Switch to the **GIS Map View** using the top navigation bar.
2. Toggle layer controls on the upper-right map overlay:
   - **Zone Boundaries:** Polygons outlining four critical NER geological sectors.
   - **Risk Epicenters:** Animated pulsing rings color-coded by threat severity (Green: Low, Yellow: Moderate, Orange: High, Red: Critical).
   - **Road Network Lines:** Color-coded polylines showing transit impedance.
   - **Lifeline Nodes:** District hospitals, trauma units, and administrative HQ markers.
3. Click on any monitoring zone or road polyline to reveal popup telemetry breakdowns.

### Step 3: Interactive AI Risk Engine & Parameter Tuning
1. Navigate to the **AI Risk Assessment** tab.
2. Adjust the interactive telemetry controls:
   - Increase **Rainfall Intensity** from $25\text{ mm/h}$ to $85\text{ mm/h}$.
   - Increase **Subsurface Soil Moisture** to $92\%$.
   - Adjust **Slope Angle** to $42^\circ$.
3. Click **"Recalculate Hazard Score"**:
   - The aggregate risk gauge surges from **MODERATE (38)** to **CRITICAL (84)**.
   - The **Explainable AI (XAI)** panel dynamically updates, breaking down the exact contribution of each parameter so civil defence commanders see that rainfall accounts for **42%** of the surge.

### Step 4: Connectivity Impact Analysis & Bypass Corridors
1. Open the **Connectivity Intelligence** tab.
2. View the road topology disruption assessment:
   - **Impacted Corridor:** NH-206 (Sohra-Shella Escarpment Highway) flagged as **CRITICAL DISRUPTION**.
   - **Affected Hamlets:** Nongwar, Mawlong, and Tyngsoh flagged with **HIGH ISOLATION VULNERABILITY**.
   - **Hospital Access Delay:** Shillong Civil Hospital transit route estimated $+78\text{ mins}$ delay.
3. Inspect the **Alternative Route Suggestion**:
   - Primary Route: *NH-206 Direct (Blocked by debris)*
   - Recommended Bypass: *Mawphlang-Weiloi Rural Bypass Corridor*
   - Distance Differential: $+18.4\text{ km}$ ($+35\text{ mins}$) with clear clearance for emergency relief convoys.

### Step 5: Incident Reporting (Online & Offline Resilience)
1. Navigate to **Community & Field Reporting**.
2. Fill out a field ground truth report:
   - Select Hazard Type: *Mudflow / Tension Cracks*
   - Enter Location: *KM 42, Haflong Pass*
   - Attach demonstration photo.
3. **Offline Mode Test:**
   - Disconnect network connection or turn on browser Offline mode in DevTools.
   - Click **Submit Incident Report**.
   - AlertNex detects offline state, securely commits the report into local **IndexedDB**, and increments the offline queue badge.
   - Re-enable internet connection and click **"Sync Queued Reports"** to synchronize with `/api/reports/`.

### Step 6: Multi-Channel Emergency Dispatch
1. Open the **Alert Dispatch Center**.
2. Draft an emergency bulletin for District Disaster Management Authorities (DDMA).
3. Select dispatch channels:
   - **Email Dispatch:** Dispatches an official formatted evacuation advisory via SMTP to the designated recipient.
   - **SMS Dispatch:** Dispatches SMS broadcast to frontline NDRF teams (simulated or via Twilio API).
4. Review the persistent audit log of all issued emergency bulletins.

### Step 7: Automated 10-Phase Judge Simulation Mode
1. Click the **"Professor / Judge Demo Simulation"** button in the top action header.
2. The automated simulation controller executes an end-to-end disaster escalation scenario:
   - *Phase 1-3:* Baseline clear weather monitoring across NER corridors.
   - *Phase 4-6:* Intense monsoon cloudburst triggers moisture saturation.
   - *Phase 7-8:* Road slip detected, emergency bypass corridor activated.
   - *Phase 9-10:* Incident containment, response mobilization, and all-clear bulletin.

---

## 🏆 SIH 2026 Evaluation Rubric Alignment

| Evaluation Criterion | Implementation in AlertNex | Where to Verify in Code |
|---|---|---|
| **Novelty & Innovation** | Connectivity Impact Intelligence + Explainable AI (XAI) factor decomposition | `alertnex-app/js/ai-engine.js`, `alertnex-app/js/connectivity.js` |
| **Technical Feasibility** | Modular decoupled architecture (FastAPI backend + Leaflet GIS SPA) | `backend/main.py`, `alertnex-app/js/map.js` |
| **Resilience & Edge Ops** | IndexedDB client store with LocalStorage fallback for zero-connectivity valleys | `alertnex-app/js/reporting.js` |
| **Decision Auditable AI** | Transparent multi-factor attribution replacing opaque black-box models | `backend/services/risk_engine.py`, `backend/schemas/risk.py` |
| **Production Scalability** | Dual-mode database (embedded SQLite + enterprise PostgreSQL 16 PostGIS) | `backend/database.py`, `docker-compose.yml` |
| **Deployability** | 1-click deployments for Netlify, Vercel, Render, Docker Compose, and GitHub Pages | `netlify.toml`, `vercel.json`, `render.yaml`, `docker-compose.yml` |
