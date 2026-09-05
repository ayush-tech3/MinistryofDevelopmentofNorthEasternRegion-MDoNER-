# AlertNex

## AI-Based Early Warning and Landslide Monitoring System

**Smart India Hackathon 2026**

| Field | Details |
| :--- | :--- |
| **Problem Statement ID** | SIH26001 |
| **Team Name** | AlertNex |
| **Team Leader** | Ayush Kumar |
| **Ministry** | Ministry of Development of North Eastern Region (MDoNER) |
| **Theme** | Disaster Management |
| **Category** | Software |

> *AI-Powered Early Warning for Safer Communities*

---

## 📌 Project Overview

Landslides are the single most devastating geological hazard across the **North Eastern Region (NER)** of India, disrupting vital national highways (such as NH-27, NH-10, NH-29), isolating remote tribal hamlets, and severing emergency medical accessibility during heavy monsoons.

**AlertNex** is an AI-assisted Decision-Support and Early Warning Platform built for the **Ministry of Development of North Eastern Region (MDoNER)**. It bridges raw environmental telemetry with actionable emergency intelligence:

1. **Identifies Where Risk is Rising:** Multimodal predictive fusion of rainfall, soil saturation, slope gradient, historical slide frequency, and crowdsourced field reports.
2. **Explainable AI (XAI):** Transparent feature attribution breaking down *why* a given slope has crossed warning thresholds.
3. **Connectivity Impact Intelligence (Core Innovation):** Automatically evaluates downstream road blockages, assesses village isolation vulnerability, and computes verified emergency bypass corridors.
4. **Resilient Field Reporting:** Offline-first hazard registration ensuring frontline officers and citizens can file reports even when cellular towers fail.

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| **Landing Portal** | Overview of the AlertNex system with feature highlights and pipeline visualization |
| **Authority Dashboard** | Real-time KPI cards, live alert ticker, and monitoring summary charts |
| **Live Risk Map (GIS)** | Leaflet-powered interactive map showing monitoring zones, roads, villages, and hospitals across NER |
| **AI Risk Analysis** | Dynamic risk scoring (0–100) with weighted multi-parameter formula and explainable factor attributions |
| **Connectivity Impact Analysis** | Road disruption analysis, village isolation risk assessment, and emergency bypass route computation |
| **Alerts & Warnings** | Multi-tier alert management (Low/Moderate/High/Critical) with notification dispatch (Email/SMS via backend) |
| **Incident Reporting** | Field hazard reporting with photo upload, GPS capture, and offline queue support |
| **Reports & Analytics** | Charts and trend visualizations for risk patterns across NER states |
| **System Information** | Technical architecture overview, tech stack details, and system configuration |
| **Team AlertNex** | Team member profiles and SIH submission details |

---

## 🛠️ Technology Stack

### Frontend (Deployed on Netlify)

| Technology | Purpose |
| :--- | :--- |
| HTML5 | Semantic page structure |
| Vanilla CSS | Custom design system with CSS custom properties |
| ES6+ JavaScript | Modular application logic (app.js, map.js, api.js, etc.) |
| Leaflet.js | Interactive GIS mapping engine |
| Chart.js | Data visualization and analytics charts |
| CartoDB Tiles | Dark topographic map tiles |

### Backend (Requires Separate Hosting)

| Technology | Purpose |
| :--- | :--- |
| Python 3.12+ | Server-side runtime |
| FastAPI | REST API framework |
| SQLAlchemy | ORM with PostgreSQL/PostGIS support (SQLite fallback) |
| Pydantic v2 | Request/response validation schemas |
| SMTP (Gmail) | Real email alert delivery |
| Twilio API | SMS alert delivery (when configured) |

### Database

| Technology | Purpose |
| :--- | :--- |
| PostgreSQL + PostGIS | Primary spatial database (via Docker) |
| SQLite | Automatic zero-config fallback for development |

---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.10+ (for backend)
- A modern web browser (Chrome, Firefox, Edge)

### Option 1: Frontend Only (Quickest)

The frontend works standalone with built-in demo data — no backend required.

**Windows (One-Click):**
```bash
# Double-click launch_alertnex.bat
# OR manually:
cd alertnex-app
python -m http.server 8080
```
Then open: `http://localhost:8080`

**Any OS:**
```bash
cd alertnex-app
python3 -m http.server 8080
# OR use any static file server:
# npx serve .
```

### Option 2: Full Stack (Frontend + Backend)

```bash
# 1. Install backend dependencies
pip install -r backend/requirements.txt

# 2. Start FastAPI backend
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload

# 3. In another terminal, serve the frontend
cd alertnex-app
python -m http.server 8080
```

- Frontend: `http://localhost:8080`
- Backend API: `http://127.0.0.1:8000`
- Swagger Docs: `http://127.0.0.1:8000/docs`

### Option 3: Docker Compose

```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- PostGIS: `localhost:5432`

---

## 🌐 How to Deploy Frontend on Netlify

The frontend is a **static HTML/CSS/JavaScript** site. No build step is required.

### Step-by-Step:

1. **Push this repository to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AlertNex SIH 2026"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com/)
   - Click **"Add new site"** → **"Import an existing project"**
   - Select **GitHub** and authorize access
   - Choose your AlertNex repository

3. **Configure Build Settings:**
   - These are **automatically detected** from `netlify.toml`, but verify:
   - **Build command:** `echo 'AlertNex: Static frontend — no build step required.'`
   - **Publish directory:** `alertnex-app`

4. **Deploy:**
   - Click **"Deploy site"**
   - Your site will be live at a Netlify URL (e.g., `https://alertnex.netlify.app`)

5. **Automatic Updates:**
   - Every `git push` to the `main` branch will trigger a new deployment automatically.

---

## 🔐 How to Configure Environment Variables

### Backend `.env` Configuration

Copy the example file and fill in your credentials:
```bash
cp backend/.env.example backend/.env
```

Key variables:
| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string (defaults to SQLite) |
| `SMTP_ENABLED` | Enable real email delivery (`true`/`false`) |
| `SMTP_HOST` | SMTP server (e.g., `smtp.gmail.com`) |
| `SMTP_USERNAME` | Email address for sending alerts |
| `SMTP_PASSWORD` | App password (not your regular password) |
| `SMS_ENABLED` | Enable Twilio SMS (`true`/`false`) |

> ⚠️ **Never commit `.env` files to GitHub.** The `.gitignore` is configured to exclude them.

### Netlify Environment Variables (If Backend is Deployed)

If you deploy the backend separately (e.g., on Render, Railway, or AWS), set the backend URL in Netlify:

- Go to **Site Settings → Environment Variables**
- Add: `ALERTNEX_API_URL` = `https://your-backend-domain.com/api`

---

## ⚠️ Demo Data Disclaimer

> **All environmental sensor data, monitoring zones, road networks, village populations, and hospital locations displayed in this prototype are simulated demo data** created specifically for Smart India Hackathon 2026 evaluation.
>
> The risk scores, alert bulletins, and connectivity impact analyses represent realistic but **fictional scenarios** modeled after the geological and meteorological characteristics of Northeast India.
>
> No real-time sensor feeds, government databases, or actual citizen data are used.

---

## 🧪 Prototype Limitations

| Limitation | Details |
| :--- | :--- |
| **Demo Sensor Data** | Environmental telemetry (rainfall, soil moisture, slope) uses pre-configured simulation values, not live feeds |
| **No Real ML Training** | Risk scores use a weighted formula; production would use trained XGBoost/Random Forest models on historical GSI data |
| **Backend Required for APIs** | Email/SMS dispatch, report persistence, and database operations require the FastAPI backend to be running |
| **Frontend-Only on Netlify** | The Netlify deployment serves only the frontend prototype; all API calls gracefully fall back to local demo data |
| **No Authentication** | The prototype does not implement user authentication or role-based access control |
| **GIS Data** | Road networks and village coordinates are approximations for demonstration purposes |

---

## 🏗️ Architecture Overview

```
┌────────────────────────────────────────────────────────────┐
│          STATIC HTML/CSS/JS FRONTEND (Netlify)             │
│    (Vanilla CSS, Leaflet GIS, Chart.js, ES6 Modules)       │
│    Hash-based SPA routing (#dashboard, #map, #alerts...)   │
└─────────────────────────┬──────────────────────────────────┘
                          │ REST API (JSON / Multipart)
                          │ (graceful fallback to demo data
                          │  when backend is unavailable)
                          ▼
┌────────────────────────────────────────────────────────────┐
│                   FASTAPI BACKEND                          │
│     (Routers: zones, risk, reports, alerts, connectivity)  │
├─────────────────────────┬──────────────────────────────────┤
│      AI RISK ENGINE     │    CONNECTIVITY ENGINE           │
│   (Weighted Formula)    │    (Isolation & Routes)          │
└─────────────────────────┴──────────────────────────────────┘
                          │ SQLAlchemy ORM
                          ▼
┌────────────────────────────────────────────────────────────┐
│             POSTGRESQL + POSTGIS DATABASE                  │
│    (Tables: zones, reports, alerts, roads, villages)       │
│     *Automatic SQLite fallback when Postgres offline*      │
└────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
AlertNex/
├── alertnex-app/              ← Frontend (deployed to Netlify)
│   ├── index.html             ← Main entry point (single-page app)
│   ├── css/
│   │   ├── style.css          ← Design system & component styles
│   │   └── responsive.css     ← Mobile/tablet breakpoints
│   ├── js/
│   │   ├── app.js             ← Router & state orchestrator
│   │   ├── api.js             ← REST API client (with demo fallback)
│   │   ├── data.js            ← Demo/simulation data
│   │   ├── map.js             ← Leaflet GIS module
│   │   ├── ai-engine.js       ← AI risk analysis UI
│   │   ├── connectivity.js    ← Impact analysis module
│   │   ├── alerts.js          ← Alert management & notification
│   │   ├── reporting.js       ← Incident reporting form
│   │   └── charts.js          ← Chart.js analytics
│   └── assets/
│       ├── ner_hero.jpg       ← Landing page hero image
│       └── sih_top_logo.png   ← SIH branding logo
├── backend/                   ← FastAPI backend (separate hosting)
│   ├── main.py                ← Application entry point
│   ├── database.py            ← SQLAlchemy engine setup
│   ├── .env.example           ← Environment variable template
│   ├── requirements.txt       ← Python dependencies
│   ├── routers/               ← API route handlers
│   ├── schemas/               ← Pydantic validation models
│   ├── services/              ← Business logic layer
│   ├── models/                ← SQLAlchemy ORM models
│   ├── ml/                    ← ML/AI risk computation
│   └── utils/                 ← Seed data & helpers
├── index.html                 ← Root redirect to alertnex-app/
├── netlify.toml               ← Netlify deployment configuration
├── docker-compose.yml         ← Full-stack Docker setup
├── launch_alertnex.bat        ← Windows one-click launcher
├── .gitignore                 ← Git ignore rules
└── README.md                  ← This file
```

---

## 🔌 REST API Reference

When the FastAPI backend is running, interactive docs are available at `/docs`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/zones` | Retrieve all monitoring zones |
| `GET` | `/api/zones/{id}` | Retrieve single zone telemetry |
| `POST` | `/api/zones` | Create new monitoring zone |
| `PUT` | `/api/zones/{id}` | Update telemetry & auto-recalculate risk |
| `GET` | `/api/risk/{zone_id}` | Explainable AI factor attributions |
| `POST` | `/api/risk/calculate` | Compute risk score from arbitrary inputs |
| `GET` | `/api/connectivity/{zone_id}` | Road blockages, isolation & detour analysis |
| `GET` | `/api/alerts` | List early warning bulletins |
| `POST` | `/api/alerts` | Issue manual alert bulletin |
| `PUT` | `/api/alerts/{id}/acknowledge` | Acknowledge active emergency alert |
| `POST` | `/api/alerts/send-email` | Send real email alert via SMTP |
| `POST` | `/api/alerts/send-sms` | Send SMS alert via Twilio |
| `GET` | `/api/reports` | List field hazard reports |
| `POST` | `/api/reports` | Submit incident report (multipart upload) |

---

## 👥 Team AlertNex (SIH 2026)

| Member | Role | Responsibilities |
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
