# 📊 AlertNex — Smart India Hackathon 2026 Pitch Deck

> **Problem Statement ID:** SIH26001  
> **Theme:** Disaster Management  
> **Target Ministry:** Ministry of Development of North Eastern Region (MDoNER)  
> **Team Name:** AlertNex  
> **Team Leader:** Ayush Kumar  

---

## 📑 Slide 1: Cover & Title
* **System Name:** AlertNex
* **Subheading:** AI-Based Early Warning and Landslide Decision-Support Monitoring System for the North Eastern Region
* **Target Users:** Ministry of DoNER, National Disaster Response Force (NDRF), State Disaster Management Authorities (SDMA), District Magistrates, Public Works Departments (PWD).
* **Tagline:** *AI-Powered Early Warning for Safer Himalayan & Patkai Communities*

---

## 🎯 Slide 2: The Ground Reality & Problem Statement
* **Geographic Vulnerability:** The North Eastern Region (NER) is characterized by steep young-fold Himalayan mountains, fragile sedimentary shale, excessive monsoon precipitation (>11,000 mm/year in Cherrapunji/Mawsynram), and high seismic activity (Zone V).
* **The Fatal Bottleneck:** Traditional warning systems predict gross regional hazard, but fail to answer the critical questions required by emergency commanders:
  1. *Which lifeline highway will be severed?*
  2. *Which remote mountain villages will be cut off from food and medical supplies?*
  3. *Why did the AI trigger this warning? (Explainability & Trust)*
  4. *What is the viable alternative bypass corridor for military and relief convoys?*
* **Core Challenge (PS SIH26001):** Build an intelligent decision-support system that synthesizes environmental sensors, geotechnical terrain indices, field reports, and road connectivity topology.

---

## 💡 Slide 3: The AlertNex Solution
AlertNex transforms disaster monitoring from passive observation into **actionable intelligence**:
1. **Multimodal Telemetry Fusion:** Continuous ingestion of precipitation intensity, subsurface soil moisture saturation, slope gradient, historical slide frequency, and crowdsourced field observations.
2. **Transparent AI Risk Engine:** Calibrated multi-factor hazard scoring with dynamic parameter adjustments.
3. **Explainable AI (XAI) Attribution:** Mathematical decomposition showing the exact percentage contribution of each geotechnical and weather variable.
4. **Connectivity Impact Intelligence (Core Innovation):** Automated road graph analysis, single-access village isolation vulnerability detection, and emergency bypass routing.
5. **Offline-First Field Resilience:** Client-side IndexedDB reporting that works even when cell towers collapse in remote valleys.
6. **Multi-Channel Dispatch:** Real-time push of alerts via SMTP email to District Magistrates and SMS simulation to frontline rescue units.

---

## 🏗️ Slide 4: System Architecture & Data Pipeline
```
[Environmental Telemetry & Satellites] + [Field Reports (Offline/Online)]
                               │
                               ▼
     [FastAPI REST API & GeoAlchemy ORM Data Engine]
                               │
        ┌──────────────────────┴──────────────────────┐
        ▼                                             ▼
[Prototype AI Risk Engine & XAI]      [Connectivity Graph Analyzer]
- Multi-factor hazard calibration     - Road disruption classifier
- Transparent factor decomposition    - Village isolation index
- Threat severity classification      - Bypass corridor optimizer
        └──────────────────────┬──────────────────────┘
                               │
                               ▼
        [AlertNex Command Center Web Application]
        - Leaflet GIS spatial map canvas with hazard rings
        - Real-time authority KPI dashboard & alert ticker
        - Multi-channel notification dispatcher (Email & SMS)
```

---

## 🔬 Slide 5: The Core Breakthroughs (Novelty & Innovation)
| Innovation | Traditional Systems | AlertNex Breakthrough |
|---|---|---|
| **Warning Scope** | Generic regional weather bulletin ("Rain expected in Meghalaya") | Granular slope-scale hazard score & specific highway corridor impact |
| **Model Transparency** | Black-box AI models that civil authorities hesitate to trust | **Explainable AI (XAI)** factor attribution with auditable percentage weights |
| **Infrastructure Impact** | No road connectivity or village isolation intelligence | **Topological Disruption Graph** identifying cut-off hamlets and hospital delay |
| **Field Data Collection** | Fails when mobile towers lose power or connectivity | **IndexedDB Offline Store** allowing field officers to log incidents and sync later |
| **Alternative Logistics** | Emergency commanders guess secondary bypass routes | **Automated Bypass Recommender** calculating distance and delay differentials |

---

## 🛠️ Slide 6: Technology Stack & Engineering Architecture
* **Frontend Presentation:** HTML5, Modern Vanilla CSS (Design Tokens, Dark Command Theme), Modular ES6+ JavaScript, Leaflet.js 1.9.4 GIS Canvas, Chart.js Analytics, IndexedDB API.
* **Backend Framework:** Python 3.12, FastAPI 0.110+, Uvicorn ASGI Server, Pydantic v2 validation, SQLAlchemy 2.0 ORM.
* **Dual Database Architecture:**
  * *Zero-Config SQLite (`alertnex.db`):* Included for instant hackathon evaluation and CI/CD testing.
  * *PostgreSQL 16 + PostGIS:* Enterprise spatial geodatabase configured in `docker-compose.yml` for multi-agency deployment.
* **DevOps & Cloud:** Netlify (Continuous Deployment), Vercel (`vercel.json`), Render (`render.yaml`), Docker & Docker Compose, GitHub Actions CI/CD.

---

## 📈 Slide 7: Scalability & Ministry Adoption Roadmap
* **Phase 1 (Immediate — SIH 2026):** Prototype validated across 4 key NER corridors (East Khasi Hills, Dima Hasao, East Sikkim, Kohima).
* **Phase 2 (Months 3–6):** Integration with India Meteorological Department (IMD) Automatic Weather Station (AWS) APIs.
* **Phase 3 (Months 6–9):** Ingestion of ISRO Bhuvan and Sentinel-1 InSAR surface deformation satellite imagery.
* **Phase 4 (Months 9–12):** Direct gateway integration with National Disaster Management Authority (NDMA) Common Alerting Protocol (CAP) for cell-broadcast siren warnings.
* **Phase 5 (Full Production):** State-wide rollouts across all 8 North Eastern states under MDoNER sponsorship.

---

## 👥 Slide 8: Team AlertNex & Commitment
* **Team Name:** AlertNex
* **Team Leader:** Ayush Kumar
* **Event:** Smart India Hackathon 2026
* **Problem Statement:** SIH26001 | MDoNER
* **Live System:** [https://ministryofdevelopmentofnortheastern.netlify.app/](https://ministryofdevelopmentofnortheastern.netlify.app/)
* **Repository:** [https://github.com/ayush-tech3/MinistryofDevelopmentofNorthEasternRegion-MDoNER-](https://github.com/ayush-tech3/MinistryofDevelopmentofNorthEasternRegion-MDoNER-)
