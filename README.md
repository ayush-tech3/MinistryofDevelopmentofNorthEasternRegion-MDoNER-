# AlertNex: AI-Based Early Warning & Landslide Monitoring System in NER

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026-orange.svg)](https://sih.gov.in/)
[![Problem Statement ID](https://img.shields.io/badge/PS%20ID-SIH26001-blue.svg)](https://sih.gov.in/)
[![Ministry](https://img.shields.io/badge/Ministry-MDoNER-green.svg)](https://mdoner.gov.in/)
[![Category](https://img.shields.io/badge/Category-Software-purple.svg)]()
[![Theme](https://img.shields.io/badge/Theme-Disaster%20Management-red.svg)]()

> **Official Smart India Hackathon 2026 Prototype**  
> **Team Name**: **AlertNex**  
> **Team Leader**: **Ayush Kumar**  
> **Tagline**: *AI-Powered Early Warning for Safer Communities*

---

## 📌 Executive Summary & Purpose

Landslides are the single most devastating geological hazard across the **North Eastern Region (NER)** of India, disrupting vital national highways (such as NH-27, NH-10, NH-29), isolating remote tribal hamlets, and severing emergency medical accessibility during heavy monsoons.

**AlertNex** is an AI-assisted Decision-Support and Early Warning Platform built for the **Ministry of Development of North Eastern Region (MDoNER)**. AlertNex bridges raw environmental telemetry with actionable emergency intelligence:
1. **Identifies Where Risk is Rising:** Multimodal predictive fusion of rainfall, soil saturation, slope gradient, historical slide frequency, and crowdsourced field reports.
2. **Explainable AI (XAI):** Transparent feature attribution breaking down *why* a given slope has crossed warning thresholds.
3. **Connectivity Impact Intelligence (Core Innovation):** Automatically evaluates downstream road blockages, assesses village isolation vulnerability, and computes verified emergency bypass corridors.
4. **Resilient Field Reporting:** Offline-first hazard registration ensuring frontline officers and citizens can file reports even when cellular towers fail.

> **Honesty & Transparency Rule**: This is a decision-support prototype developed for Smart India Hackathon 2026. All baseline sensor feeds, road networks, and geological indices represent realistic **Demo / Simulated Data** and are clearly identified as such.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────┐
│             REACT + TYPESCRIPT FRONTEND                │
│    (Tailwind CSS, Leaflet GIS, IndexedDB Offline Sync) │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON / Multipart)
                            ▼
┌────────────────────────────────────────────────────────┐
│                   FASTAPI BACKEND                      │
│     (Routers: zones, risk, reports, alerts, connect)   │
├───────────────────────────┬────────────────────────────┤
│      AI RISK ENGINE       │    CONNECTIVITY ENGINE     │
│   (Scikit-Learn, NumPy)   │    (Isolation & Routes)    │
└───────────────────────────┴────────────────────────────┘
                            │ SQLAlchemy ORM
                            ▼
┌────────────────────────────────────────────────────────┐
│             POSTGRESQL + POSTGIS DATABASE              │
│    (Tables: zones, reports, alerts, roads, villages)   │
│     *Automatic SQLite fallback when Postgres offline   │
└───────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Leaflet GIS, Lucide Icons, Chart.js |
| **Backend** | Python 3.12+, FastAPI, Uvicorn, Pydantic v2, Python-Multipart |
| **Database** | PostgreSQL 16+ with **PostGIS** spatial extensions (with zero-config SQLite fallback) |
| **AI / ML** | Scikit-learn, NumPy, Pandas, SHAP Explainable AI attribution |
| **Offline Sync** | IndexedDB & LocalStorage queue with automatic network resynchronization |
| **Deployment** | Docker & Docker Compose (`postgis/postgis:16-3.4`) |

---

## 📊 Database Design (PostgreSQL / PostGIS & SQLite)

The schema comprises 6 primary spatial and operational tables:

1. `monitoring_zones`: id, name, region, district, latitude, longitude, geometry, rainfall, soil_moisture, slope, historical_activity, recent_reports, risk_score, risk_level, last_updated.
2. `incident_reports`: id, reporter_type, incident_type, description, latitude, longitude, geometry, severity, image_path, status, created_at, synced.
3. `alerts`: id, zone_id, risk_level, risk_score, message, recommended_action, status, created_at.
4. `roads`: id, name, geometry, status, priority.
5. `villages`: id, name, population, geometry, isolation_risk.
6. `hospitals`: id, name, geometry, status.

---

## 🧮 AI Risk Calculation Formula

AlertNex calculates a normalized risk score between **0 and 100** using a weighted multi-parameter formula:

$$\text{Risk Score} = (R \times 0.30) + (SM \times 0.25) + (SL \times 0.20) + (HA \times 0.15) + (REP \times 0.10)$$

Where:
- **$R$ (Rainfall)**: 30% weight (24-hour cumulative precipitation)
- **$SM$ (Soil Moisture)**: 25% weight (pore pressure & saturation index)
- **$SL$ (Slope)**: 20% weight (slope inclination in degrees)
- **$HA$ (Historical Activity)**: 15% weight (past geotechnical breach records)
- **$REP$ (Recent Field Reports)**: 10% weight (crowdsourced ground validation)

### 4-Level Standardized Classification:
- 🟢 **0 – 25**: **LOW RISK** (Baseline monitoring)
- 🟡 **26 – 50**: **MODERATE RISK** (Advisory watch active)
- 🟠 **51 – 75**: **HIGH RISK** (Preparedness mobilized; automatic warning generated)
- 🔴 **76 – 100**: **CRITICAL RISK** (Immediate action required; emergency alerts dispatched)

---

## 🧭 Seed Demo Datasets (NER Zones)

| Zone Code | Sector & Location | Rainfall | Soil Moist. | Slope | Past Act. | Reports | Risk Score | Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Demo Zone A** | Cherrapunji-Mawsynram Slopes (Meghalaya) | 95 mm | 88% | 85° | 80 | 5 | **89.5%** | **CRITICAL** |
| **Demo Zone B** | Haflong-Jatinga Hill Pass (Assam) | 75 mm | 70% | 72° | 65 | 3 | **70.2%** | **HIGH** |
| **Demo Zone C** | Gangtok-Tsomgo Alpine Sector (Sikkim) | 48 mm | 50% | 45° | 40 | 1 | **43.9%** | **MODERATE** |
| **Demo Zone D** | Kohima-Dimapur Valley Axis (Nagaland) | 20 mm | 25% | 30° | 15 | 0 | **20.5%** | **LOW** |

---

## 🔌 REST API Reference

The FastAPI backend provides interactive OpenAPI documentation at `http://127.0.0.1:8000/docs`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/zones` | Retrieve all monitoring zones |
| `GET` | `/api/zones/{id}` | Retrieve single zone telemetry |
| `POST` | `/api/zones` | Create new monitoring zone |
| `PUT` | `/api/zones/{id}` | Update environmental telemetry & auto-recalculate risk |
| `GET` | `/api/risk/{zone_id}` | Retrieve Explainable AI (XAI) factor attributions |
| `POST` | `/api/risk/calculate` | Compute real-time risk score from arbitrary inputs |
| `GET` | `/api/connectivity/{zone_id}` | **Main Innovation:** Road blockages, isolation, & detour |
| `GET` | `/api/alerts` | List early warning bulletins (filterable by level/status) |
| `POST` | `/api/alerts` | Issue manual alert bulletin |
| `PUT` | `/api/alerts/{id}/acknowledge` | Acknowledge active emergency alert |
| `GET` | `/api/reports` | List registered field & citizen hazard reports |
| `POST` | `/api/reports` | Submit incident report (supports multipart photo upload) |
| `PUT` | `/api/reports/{id}/status` | Update report lifecycle status |

---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.10+
- Node.js 18+ (for React frontend)

### 1. Run the FastAPI Backend
```bash
# Install dependencies
pip install -r backend/requirements.txt

# Start FastAPI server
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
*The database (`alertnex.db`) will automatically create and seed Demo Zones A–D on first startup.*
- API Root: `http://127.0.0.1:8000/`
- Swagger Docs: `http://127.0.0.1:8000/docs`

### 2. Run the Interactive Dashboard
The complete interactive dashboard can be launched in seconds:
- **One-Click Launcher (Windows)**: Double-click `launch_alertnex.bat`
- **Or via Browser**: Navigate to `http://localhost:8080/index.html`

### 3. Run with Docker Compose (Optional)
To run Backend, PostgreSQL with PostGIS, and Frontend in containers:
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- PostGIS Database: `localhost:5432`

---

## 👥 Team AlertNex (SIH 2026)

| Member | Role | Engineering Responsibilities |
| :--- | :--- | :--- |
| **AYUSH KUMAR** | **Team Leader** | AI/ML Architecture, Risk Prediction Engine, System Architecture, Coordination |
| **PRERANA MONDAL** | Member | Frontend Development, UI/UX Design, GIS Data Visualization |
| **SONDEEP KUMAR** | Member | Backend Development, Database Architecture (PostGIS), API Integration |
| **SHINJINI LOHAR** | Member | AI/ML Engineering, Computer Vision Hazard Detection, Remote Sensing |
| **SUBHAM KUMAR MODI** | Member | GIS Spatial Analysis, Mobile Application Workflow, Offline Storage Sync |
| **RAHUL DEO** | Member | Cloud Infrastructure, DevOps & CI/CD, System Security & Testing |

---

## ⚖️ Hackathon Ethics & Disclaimer
AlertNex is an AI-assisted decision-support system prototype built for **Smart India Hackathon 2026 (PS ID: SIH26001)** under the **Ministry of Development of North Eastern Region (MDoNER)**. All alternative route suggestions, risk scores, and alert broadcasts are simulated recommendations intended for evaluation and demonstration.
