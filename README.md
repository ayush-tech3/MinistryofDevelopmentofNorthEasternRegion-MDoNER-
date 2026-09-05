# AlertNex

## AI-Based Early Warning and Landslide Monitoring System

**Smart India Hackathon 2026**

| Parameter | Details |
| :--- | :--- |
| **Problem Statement ID** | SIH26001 |
| **Organization** | Ministry of Development of North Eastern Region (MDoNER) |
| **Theme** | Disaster Management |
| **Category** | Software |
| **Team Name** | AlertNex |
| **Team Leader** | Ayush Kumar |

> *AI-Powered Early Warning for Safer Communities*

---

## 1. Project Overview

Landslides are among the most frequent and destructive natural hazards in the **North Eastern Region (NER)** of India, exacerbated by steep Himalayan and Patkai terrain, intense seasonal monsoon rainfall, fragile sedimentary strata, and seismic sensitivity. Critical transport arteries such as NH-27 (Haflong Pass), NH-10 (Sikkim corridor), and NH-206 (Cherrapunji axis) regularly suffer severe disruptions that isolate remote tribal communities and obstruct emergency medical logistics.

**AlertNex** is an AI-assisted Decision-Support and Early Warning Prototype developed for the **Ministry of Development of North Eastern Region (MDoNER)** under Smart India Hackathon 2026. The platform continuously monitors environmental triggers, computes multi-parameter risk scores, explains contributing factors, tracks topological road connectivity disruptions, and suggests prototype emergency detour corridors to maintain lifeline connectivity.

---

## 2. Problem Statement

* **PS ID:** SIH26001
* **Context:** The hilly topography and excessive monsoon precipitation in NER create recurring slope instability. Existing warning systems are often centralized, lack slope-scale granularity, and fail to translate hazard forecasts into actionable road connectivity and village isolation intelligence for district disaster management authorities (DDMA) and frontline responders.
* **Core Challenge:** Build an intelligent early-warning decision-support tool that bridges environmental data, terrain factors, citizen field reports, and road network topology to provide early alerts and actionable mitigation advice.

---

## 3. Proposed Solution

AlertNex solves this challenge through a multi-tier prototype architecture:
1. **Multimodal Environmental Telemetry Ingestion:** Combines rainfall intensity, soil moisture saturation, slope gradient, historical slide frequency, and crowdsourced ground observations.
2. **Transparent Prototype Risk Assessment Engine:** Calculates a standardized risk score (0–100) using a transparent weighted formula calibrated against NER geotechnical parameters.
3. **Prototype Explainable Risk Analysis (Rule-Based Attribution):** Breaks down model outputs into human-understandable factor contributions (Heavy Rainfall, Saturated Soil, Steep Terrain, etc.) so emergency commanders know *why* a slope is vulnerable.
4. **Connectivity Impact Intelligence (Core Innovation):** Evaluates road graph blockages, detects vulnerable isolated villages, assesses hospital transit accessibility, and suggests prototype emergency corridors.
5. **Resilient Field Incident Reporting:** Features an offline-first reporting workflow with client-side IndexedDB caching and authority review lifecycle (`PENDING` -> `VERIFIED`/`REJECTED`).

---

## 4. Key Features

* **Authority Command Dashboard:** Real-time KPI summaries, active risk distribution, live alert ticker, and an interactive **Professor Demo Simulation** bar.
* **Interactive GIS Risk Map:** Leaflet-powered spatial viewer featuring CartoDB topographic basemaps, monitoring zones with pulsing risk epicenters, road networks, village nodes, and hospital locations.
* **Prototype AI Risk Assessment Engine:** Real-time risk scoring (0–100) with interactive parameter sliders (Rainfall, Soil Moisture, Slope, Weather multiplier, History, Recent reports).
* **Rule-Based Risk Factor Explanation:** Transparent decomposition showing which environmental trigger contributes most to the danger level.
* **Connectivity Impact Intelligence:** Automated detection of vulnerable roads, potential village isolation, hospital route access, and prototype alternative route suggestions.
* **Community & Field Incident Reporting:** Geotagged reporting with photo upload, GPS acquisition, and authority verification workflow.
* **IndexedDB Offline Reporting:** Full offline caching when connectivity drops in remote valleys, with one-click background synchronization (`SYNC NOW`).
* **Multi-Channel Alert Dispatch:** Automated and manual bulletin issuance with real SMTP email dispatch to district magistrate / NDRF inboxes and SMS simulation.
* **Interactive Demo Simulation:** 10-phase demonstration flow for judges to observe end-to-end hazard escalation and response in real time.

---

## 5. Main Innovation: Connectivity Impact Intelligence

While traditional systems stop at predicting *where* a landslide might occur, AlertNex's primary breakthrough is **Connectivity Impact Intelligence**:
* **Topological Disruption Mapping:** Categorizes affected road links into `NORMAL`, `MONITORING`, `POTENTIAL DISRUPTION`, and `CRITICAL DISRUPTION`.
* **Village Isolation Vulnerability:** Analyzes single-access mountain hamlets and classifies their isolation vulnerability (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`).
* **Critical Healthcare Infrastructure:** Evaluates transit impedance to district hospitals and trauma centers.
* **Prototype Alternative Route Suggestions:** Recommends secondary bypass corridors (e.g. Shillong-Mawsynram Bypass via Mawphlang) with calculated distance differentials and transit delay estimates for emergency convoys.

---

## 6. System Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             DATA SOURCES                                 │
│  Precipitation (Demo) │ Soil Moisture (Demo) │ SRTM 30m DEM (Prototype) │
│  Crowdsourced Citizen Reports │ Field Officer Ground Truth Observations │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                   FASTAPI REST BACKEND & DATA LAYER                     │
│  /api/zones  │  /api/risk  │  /api/reports  │  /api/alerts  │  /health    │
│  SQLAlchemy ORM  │  SQLite Embedded DB (PostgreSQL/PostGIS Architecture) │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│         PROTOTYPE RISK ENGINE & EXPLAINABLE RISK ANALYSIS                │
│  Formula: (Rain×0.30) + (Moist×0.25) + (Slope×0.20) + (Hist×0.15) + (Rep×0.10)│
│  Classification: 0-25 LOW │ 26-50 MODERATE │ 51-75 HIGH │ 76-100 CRITICAL│
│  Rule-Based Factor Attribution: Heavy Rain, Soil Saturation, Slope Angle │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     FRONTEND PRESENTATION LAYER                          │
│  HTML5 + Vanilla CSS (Design Tokens) + Modular ES6+ JavaScript           │
│  Leaflet GIS Engine │ Chart.js Analytics │ IndexedDB Offline Queue        │
│  Deployed on Netlify: https://ministryofdevelopmentofnortheastern.netlify.app │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Technology Stack

### Actually Implemented & Working:
* **Frontend:**
  * HTML5 Semantic Architecture (Accessible, SPA view routing)
  * Vanilla CSS3 (Custom design system, CSS variables, dark command center theme, glassmorphism)
  * Modular ES6+ JavaScript (`app.js`, `map.js`, `api.js`, `ai-engine.js`, `connectivity.js`, `alerts.js`, `reporting.js`, `simulation.js`, `charts.js`, `data.js`)
  * Leaflet.js 1.9.4 (Interactive GIS map canvas with CartoDB Voyager tiles)
  * Chart.js (Interactive analytical charts for risk trends and alert distributions)
  * IndexedDB API (Client-side offline incident report caching with LocalStorage fallback)
* **Backend:**
  * Python 3.12+ runtime
  * FastAPI 0.110+ (Asynchronous REST API framework)
  * Uvicorn 0.28+ (ASGI production-ready web server)
  * Pydantic v2 (Strict schema validation for telemetry and reports)
  * SQLAlchemy 2.0 (ORM database layer with automatic table creation)
  * SQLite (Embedded zero-configuration database, auto-seeded on launch)
  * SMTP (Standard Python `smtplib` configured for emergency email alert dispatch)
  * HTTPX & Requests (API communication and automated testing)

---

## 8. Project Structure

```
MinistryofDevelopmentofNorthEasternRegion(MDoNER)/
├── alertnex-app/                 # Complete SPA Frontend (Netlify Publish Root)
│   ├── index.html                # Single-page application entry point (10 views)
│   ├── assets/                   # Static images, maps, and icons
│   ├── css/
│   │   ├── style.css             # Main responsive command center stylesheet
│   │   └── responsive.css        # Mobile and tablet viewport breakpoints
│   └── js/
│       ├── api.js                # Environment-aware REST client with demo fallback
│       ├── app.js                # Hash router, sidebar, clock, toast notifications
│       ├── data.js               # Seed datasets, monitoring zones, NER roads, villages
│       ├── map.js                # Leaflet GIS engine, risk buffer polygons, layer toggles
│       ├── ai-engine.js          # Interactive risk calculator and rule-based risk factor explanation
│       ├── connectivity.js       # Road disruption, village isolation, alt route engine
│       ├── alerts.js             # Alert management, status update, email/SMS dispatch
│       ├── reporting.js          # Incident submission, IndexedDB offline sync, verification
│       ├── simulation.js         # 10-step professor demo simulation controller
│       └── charts.js             # Chart.js visualizations for analytics
├── backend/                      # FastAPI Python Backend
│   ├── main.py                   # FastAPI app entry point, CORS, lifespan, routes
│   ├── database.py               # SQLAlchemy engine & SQLite/PostgreSQL configuration
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Template environment variables
│   ├── ml/
│   │   └── risk_model.py         # Prototype risk model module
│   ├── models/                   # SQLAlchemy ORM models (Zone, Report, Alert, Road, etc.)
│   ├── routers/                  # API route definitions (zones, risk, reports, alerts, connectivity)
│   ├── schemas/                  # Pydantic validation schemas
│   ├── services/                 # Risk engine, connectivity analyzer, email service
│   └── utils/
│       └── seed_data.py          # Automatic seeding of realistic NER demo data
├── docs/                         # Official SIH Submission Documents & PDF Generators
├── presentation/                 # Presentation Decks (.pptx) & Slide Builders
├── archive/                      # Historical prototypes & exploratory drafts
├── docker-compose.yml            # Multi-container orchestration (PostGIS, FastAPI, Nginx)
├── netlify.toml                  # Netlify deployment configuration
├── .gitignore                    # Git ignore rules (protects credentials and artifacts)
└── README.md                     # Project documentation
```

---

## 9. How to Run Frontend

The frontend is a lightweight, zero-dependency Single Page Application that works out-of-the-box with built-in prototype fallback data.

### Option A: Local Python Server
```bash
cd alertnex-app
python -m http.server 8080
```
Open your browser at: **`http://localhost:8080`**

### Option B: Direct Live Netlify Deployment
The frontend is continuously deployed at:
**[https://ministryofdevelopmentofnortheastern.netlify.app/](https://ministryofdevelopmentofnortheastern.netlify.app/)**

---

## 10. How to Run Backend

### Prerequisites
* Python 3.10, 3.11, or 3.12+
* Pip package manager

### Steps
1. Navigate to the project root:
   ```bash
   cd "MinistryofDevelopmentofNorthEasternRegion(MDoNER)"
   ```
2. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Start the FastAPI development server:
   ```bash
   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
   ```
4. Verify backend health:
   * Root status: `http://localhost:8000/`
   * Health check: `http://localhost:8000/health`
   * Interactive Swagger API Docs: `http://localhost:8000/docs`

---

## 11. Environment Variables

Create a `backend/.env` file based on `backend/.env.example`:

```ini
# Backend Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# Database Configuration (Defaults to local SQLite)
DATABASE_URL=sqlite:///./alertnex.db

# Production Frontend URL for CORS
FRONTEND_URL=https://ministryofdevelopmentofnortheastern.netlify.app

# Emergency Alert SMTP Email (Optional - for live email delivery)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
FROM_EMAIL=your_email@gmail.com

# Twilio SMS (Optional - runs in simulation mode if absent)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

---

## 12. Demo Data Explanation

All demonstration data has been realistically calibrated to represent authentic geographic and meteorological realities across the North Eastern Region of India:
* **Demo Zone A (Cherrapunji-Mawsynram Slopes, East Khasi Hills, Meghalaya):** Represents ultra-high precipitation escarpments subject to deep-seated rotational slides along NH-206.
* **Demo Zone B (Haflong-Jatinga Hill Pass, Dima Hasao, Assam):** Represents critical railway and East-West highway corridor vulnerabilities across unstable shale formations.
* **Demo Zone C (Gangtok-Tsomgo Alpine Pass, East Sikkim):** Represents high-altitude glacial and scree slopes along defense and tourism transit links.
* **Demo Zone D (Kohima-Dimapur Valley, Nagaland):** Represents active urban slope creep and highway subsidence zones along NH-29.

---

## 13. Prototype Risk Model

The prototype calculation uses a transparent, explainable weighted multi-factor formula:

$$\text{Risk Score} = (R \times 0.30) + (SM \times 0.25) + (S \times 0.20) + (H \times 0.15) + (FR \times 0.10)$$

Where:
* $R$ = Normalized Rainfall Intensity (24h cumulative, 0–100 scale) — **30% Weight**
* $SM$ = Soil Moisture Saturation percentage (0–100 scale) — **25% Weight**
* $S$ = Slope Gradient angle normalized (0–100 scale) — **20% Weight**
* $H$ = Historical Landslide Activity Index (0–100 scale) — **15% Weight**
* $FR$ = Verified Field Ground Reports count (scaled to 100 max) — **10% Weight**

### Risk Categorization:
* **0 – 25:** LOW (Green — Normal baseline monitoring)
* **26 – 50:** MODERATE (Yellow — Advisory watch active)
* **51 – 75:** HIGH (Orange — Equipment mobilized, traffic regulated)
* **76 – 100:** CRITICAL (Red — Immediate action, road closures, standby evacuation)

---

## 14. Deployment Architecture

* **Frontend:** Static Single Page Application hosted on **Netlify**, with automated CI/CD continuous deployment triggered on every Git push to the GitHub repository.
* **Backend:** Container-ready FastAPI service designed to deploy on platforms such as **Render, Railway, Fly.io, or AWS EC2**.
* **Database:** Default zero-configuration embedded SQLite for portable demonstration, with an abstraction layer ready for managed PostgreSQL/PostGIS in production.

---

## 15. Prototype Limitations (Academic Honesty)

In strict adherence to Smart India Hackathon integrity standards:
1. **Environmental Telemetry:** Rainfall and soil moisture telemetry are currently demo simulations or pre-calibrated baseline datasets; physical IoT sensors are not deployed in the competition hall.
2. **Risk Model:** The calculation is a transparent weighted formula and rule-based attribution prototype, not a black-box deep learning model trained on petabyte-scale imagery.
3. **Geographic Scope:** Four representative NER sectors are currently modeled.
4. **Authority Directives:** Alternative routes and advisories are algorithmic decision-support recommendations and do not represent official civil police or military transit orders.

---

## 16. Future Scope & Planned Integrations

* **Satellite Remote Sensing:** Automated ingestion of Sentinel-1 InSAR surface displacement interferograms and Sentinel-2 optical moisture indices.
* **IMD AWS API Integration:** Automated live polling of India Meteorological Department Automatic Weather Stations across the North East.
* **C-DOT / NDMA CAP Integration:** Direct connection to the Common Alerting Protocol (CAP) gateway for localized cell-broadcast SMS.
* **Dijkstra Dynamic Routing Engine:** Real-time road network graph solver considering slope angle, bridge capacity, and river flood gauge data.
* **Mobile Field App:** React Native / Flutter offline client for frontline SDRF and PWD personnel.

---

## 17. Team AlertNex

* **Team Name:** AlertNex
* **Team Leader:** Ayush Kumar
* **Smart India Hackathon:** Smart India Hackathon 2026
* **Problem Statement ID:** SIH26001
* **Ministry:** Ministry of Development of North Eastern Region (MDoNER)
* **Theme:** Disaster Management
* **Category:** Software
