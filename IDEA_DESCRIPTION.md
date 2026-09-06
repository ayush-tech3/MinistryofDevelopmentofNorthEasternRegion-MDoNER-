# 📄 Smart India Hackathon 2026 — Official Idea Description
## AI-Based Early Warning & Landslide Monitoring System in NER
### Decision-Support Platform with Dynamic Risk & Connectivity Impact Analysis

| Parameter | Details |
| :--- | :--- |
| **Problem Statement ID** | **SIH26001** |
| **Problem Statement Title** | AI-Based Early Warning and Landslide Monitoring System in NER |
| **Ministry / Organization** | Ministry of Development of North Eastern Region (MDoNER) |
| **Theme** | Disaster Management |
| **Category** | Software Edition |
| **Team Name** | **AlertNex** |
| **Team Leader** | **Ayush Kumar** |
| **Official PDF** | [AlertNex_Idea_Description.pdf](AlertNex_Idea_Description.pdf) |

---

## 1. TEAM DETAILS — TEAM ALERTNEX (SIH26001)
**Team Leader:** Ayush Kumar

| No. | Member Name | Official Role | Assigned Responsibilities & Focus Area |
| :---: | :--- | :--- | :--- |
| 1 | **Ayush Kumar** | **Team Leader** | AI/ML Modeling, System Architecture, Overall Coordination |
| 2 | **Prerana Mondal** | **Team Member** | Frontend Development, UI/UX Design, Data Visualization (React.js) |
| 3 | **Sondeep Kumar** | **Team Member** | Backend Development, PostgreSQL/PostGIS Database, API Integration |
| 4 | **Shinjini Lohar** | **Team Member** | AI/ML Algorithms, Computer Vision, Data Processing & XAI |
| 5 | **Subham Kumar Modi** | **Team Member** | Geospatial GIS Analysis, Flutter Mobile App, QA & Testing |
| 6 | **Rahul Deo** | **Team Member** | Cloud Infrastructure, DevOps Deployment, Testing & Security |

---

## 2. PROBLEM UNDERSTANDING — THE NER LANDSLIDE CRISIS

The **North Eastern Region (NER)** of India represents one of the world's most ecologically fragile and landslide-prone mountain systems. Characterized by geologically young, seismically active Himalayan slopes and extreme monsoon downpours (>150–200 mm/day), the region suffers hundreds of sudden slope failures every year.

Critical highway lifelines like **NH-10 (Sikkim)** and **NH-29 (Nagaland/Manipur)** face recurring blockages, severing food, fuel, and medical logistics. Over 70% of deep-valley tribal hamlets depend on single access roads; a single slide traps thousands without healthcare access. Severe storms frequently knock out cellular towers, creating communication blackouts when ground reporting is most urgent. Existing disaster systems are entirely reactive, leaving authorities to respond only after disaster strikes, while academic models merely predict hazard probability without analyzing human and connectivity consequences.

### Critical Vulnerabilities:
* **Steep Terrain & Cloudbursts:** Heavy monsoons saturate fragile shale/soil, causing sudden debris flows.
* **Lifeline Highway Severance:** NH-10 and NH-29 collapse frequently, cutting essential civil & military links.
* **Remote Village Isolation:** Hundreds of tribal hamlets lose vehicular access to emergency hospitals.
* **Zero-Network Dead Zones:** Storms knock out cell towers; ground reports reach authorities hours/days late.

---

## 3. PROPOSED SOLUTION — ALERTNEX INTELLIGENT PLATFORM

Team AlertNex proposes an **AI-powered disaster decision-support and early warning ecosystem** engineered specifically for the North Eastern Region. Rather than functioning as a passive map, AlertNex combines multi-source environmental sensing (satellite, meteorological, topographic) with crowdsourced offline ground intelligence to calculate dynamic landslide risk at a **30-meter resolution** and instantly translates that risk into actionable **Connectivity Impact Intelligence**.

### Dynamic Risk Levels:
* 🟢 **GREEN: LOW RISK (0 – 30%):** Stable slopes. Routine satellite & automated weather polling. Normal traffic permitted on mountain corridors.
* 🟡 **YELLOW: MODERATE RISK (31 – 60%):** Elevated soil moisture or persistent rainfall. Advisories pushed to highway patrols; field teams monitor slopes.
* 🟠 **ORANGE: HIGH RISK (61 – 80%):** Heavy rain + steep terrain saturation. Heavy freight restricted; village disaster committees alerted; bypasses mapped.
* 🔴 **RED: CRITICAL RISK (81 – 100%):** Imminent landslide danger. Instant Siren/SMS broadcast; bypass corridors activated; SDRF/BRO pre-deployment.

### Paradigm Shift: Current Reactive Cycle vs. AlertNex Proactive Preparedness
* **Current (Reactive):** Disaster Strikes $\rightarrow$ Hazard Detected Late $\rightarrow$ Chaotic Evacuation $\rightarrow$ Blocked Lifelines $\rightarrow$ Casualties
* **AlertNex (Proactive):** Multi-Source Monitoring $\rightarrow$ Dynamic Risk Scoring $\rightarrow$ 6–12h Early Warning $\rightarrow$ Pre-Rerouting $\rightarrow$ **Lives Saved**

### Key Capability Highlights at a Glance:
* **30-Meter Spatial Grid:** High-resolution slope susceptibility computed across all 8 North Eastern states using SRTM elevation, IMD precipitation, and soil moisture rasters.
* **6–12h Early Warning Window:** Actionable lead time allows traffic police to divert mountain convoys, BRO to stage machinery, and district magistrates to initiate orderly evacuation.
* **100% Offline Capability:** Zero-network mobile app with local SQLite cache empowers isolated tribal hamlets and patrols to report tension cracks without cellular connectivity.

---

## 4. END-TO-END SYSTEM WORKFLOW — FROM SENSING TO ACTION

```
1. Multi-Source Ingestion ──▶ IMD gridded rainfall, NASA SMAP soil moisture, SRTM 30m DEM slope,
                              Sentinel-2 optics, GSI historical slides & mobile reports.
                                       │
                                       ▼
2. Data Harmonization    ──▶ FastAPI microservices perform coordinate re-projection (WGS84),
                              Antecedent Precipitation Index (24h, 72h, 7d) & normalization.
                                       │
                                       ▼
3. AI Machine Learning   ──▶ XGBoost + Random Forest ensemble computes pixel-level failure
                              probability; SHAP calculates factor contribution weights.
                                       │
                                       ▼
4. Dynamic Risk Score    ──▶ Categorizes terrain into Green (0-30%), Yellow (31-60%),
                              Orange (61-80%), and Red (81-100%) susceptibility tiers.
                                       │
                                       ▼
5. GIS Mapping Overlay   ──▶ PostGIS spatial engine renders interactive 30m hazard polygons
                              over OpenStreetMap topological road vectors.
                                       │
                                       ▼
6. Connectivity Analysis ──▶ Graph engine identifies blocked road choke points, flags isolated
                              villages, calculates hospital delays & Dijkstra bypass routes.
                                       │
                                       ▼
7. Multi-Channel Output  ──▶ Web dashboard for SDRF/DDMA, offline Flutter mobile app for
                              responders, and automated SMS/FCM early warning broadcasts.
```

---

## 5. KEY SYSTEM FEATURES & FUNCTIONALITIES

| Feature Name | Target Stakeholder | Practical Capability & Functionality |
| :--- | :--- | :--- |
| **Dynamic AI Risk Scoring** | District Magistrates / DDMA | Continuous real-time updating of slope failure susceptibility with accumulating rainfall. |
| **Interactive 3D GIS Map** | SDRF / NDRF / MDoNER | Multi-layer spatial map with contour elevations, road vectors, and dynamic risk polygons. |
| **Road Blockage Analysis** | Traffic Police / BRO | Predicts specific highway choke points likely to collapse before debris covers the road. |
| **Village Isolation Predictor** | District Administration | Generates list of remote villages cut off with estimated resident population numbers. |
| **Hospital Accessibility Matrix**| 108 Emergency Ambulance | Flags cut-off primary health centers and computes detour transit delays. |
| **Dynamic Route Planner** | Emergency Convoys | Autonomous calculation of open alternative routes bypassing blocked hill corridors. |
| **Offline Mobile Reporting** | Citizens / Road Patrols | Captures geotagged photos of tension cracks without internet, auto-syncing when online. |
| **Explainable AI Inspector** | Disaster Analysts | Transparently breaks down mathematical prediction into percentage factor contributions. |
| **Multi-Channel Early Warning** | Public & Transporters | Broadcasts Common Alerting Protocol (CAP) SMS alerts and localized push notifications. |

---

## 6. KEY INNOVATIONS & UNIQUE SELLING POINTS (USPs)

### 🌟 INNOVATION 1: Dynamic Risk + Connectivity Impact Analysis (The Core Breakthrough)
Existing disaster systems merely predict hazard probability in a district (*"75% chance of slide"*). AlertNex answers the operational question: **"What happens if a landslide occurs?"** By coupling spatial hazard polygons with OpenStreetMap topological road graphs using PostGIS, AlertNex autonomously predicts:
1. Exact road segments that will be blocked
2. Isolated villages with population metrics
3. Cut-off primary health centers
4. Safe alternate bypass corridors (Dijkstra algorithm) before disaster strikes.

### 🌟 INNOVATION 2: Offline Community & Field Reporting (Crowdsourced Zero-Internet Intelligence)
Remote Himalayan valleys regularly suffer complete telecommunication collapses during heavy downpours. AlertNex features an **offline-first mobile application backed by an encrypted local SQLite database**. Villagers and road patrols capture photos of developing tension cracks, soil slips, and blocked culverts with hardware GPS tagging. When the device enters any 2G/3G/4G/Wi-Fi coverage zone, background workers automatically synchronize queued reports to the central server without data loss.

### 🌟 INNOVATION 3: Explainable AI (XAI) for Authority Trust & Auditability
Government officials and disaster commanders (District Magistrates, SDRF, BRO) will not order road closures or evacuations based on opaque black-box machine learning models. AlertNex uses **SHAP (SHapley Additive exPlanations)** to transparently explain WHY a location is classified as high-risk:
> *"CRITICAL RISK (87%): 42% 24h Rainfall (185mm) + 21% Soil Moisture (92%) + 15% Steep Slope (48 deg) + 9% Citizen Ground Crack Observation."*  
This builds confidence and eliminates alert fatigue.

---

## 7. PURPOSE-BUILT TECHNOLOGY STACK (FEASIBLE & REALISTIC)

| Layer / Component | Chosen Technology | Clear Purpose & Architectural Role |
| :--- | :--- | :--- |
| **Frontend Web** | React.js (v18) + Leaflet / Mapbox GL | Responsive dashboard for emergency control rooms; low-bandwidth 3D GIS rendering. |
| **Mobile App** | Flutter (Dart) | Cross-platform native client for Android/iOS with camera access & hardware GPS. |
| **Offline Storage** | SQLite (sqflite local database) | Encrypted local cache storing citizen photos and crack reports without internet. |
| **Backend API** | Python 3.11/3.12 + FastAPI | Asynchronous, high-throughput REST API handling telemetry pipelines & queries. |
| **Machine Learning** | Python + Scikit-learn + XGBoost | Ensemble slope stability classifier optimized for CPU/cloud without expensive GPUs. |
| **Explainable AI** | SHAP (SHapley Additive exPlanations) | Calculates exact feature importance weights to explain reasons behind risk scores. |
| **Spatial Database** | PostgreSQL 16 + PostGIS extension | Performs spatial intersections, buffer queries, and road network topology indexing. |
| **Network Routing** | pgRouting (Dijkstra algorithm) | Graph solver calculating disconnected village nodes and safe emergency bypass routes. |
| **Data Processing** | Pandas, NumPy, Rasterio, Shapely | Time-series rainfall aggregation, spatial interpolation, and satellite raster processing. |
| **Alerting & Cloud** | Firebase Cloud Messaging + AWS | Real-time geo-fenced push notifications and containerized cloud deployment. |

---

## 8. SYSTEM ARCHITECTURE — 4 TIERS

* **LAYER 1: DATA SENSING & INGESTION:**  
  IMD API (Precipitation) • NASA SMAP (Soil Moisture) • SRTM 30m DEM (Slope/Elevation) • Sentinel-2 (NDVI) • GSI Bhukosh (Historical Slips) • Offline Citizen Reports
* **LAYER 2: DATA PROCESSING & AI ANALYTICS:**  
  FastAPI Ingestion Pipeline • Antecedent Precipitation Feature Engineering • XGBoost/Random Forest Classifier • SHAP Explainable AI Attribution • 30m Susceptibility Scoring
* **LAYER 3: GEOSPATIAL & CONNECTIVITY ENGINE:**  
  PostgreSQL + PostGIS Geodatabase • Topological Road Network Intersection • Village Isolation Detection • Hospital Delay Matrix • Dijkstra Emergency Route Solver
* **LAYER 4: PRESENTATION & DISPATCH:**  
  Authority Command Center (React.js + Mapbox) • Citizen & Responder App (Flutter + SQLite) • Geo-Fenced Push Notifications & CAP SMS • SDRF/BRO Tactical Directives

---

## 9. PHASED IMPLEMENTATION PLAN (REALISTIC STUDENT TIMELINE)

| Phase | Milestone Focus | Key Deliverables & Outputs | Team Allocation |
| :---: | :--- | :--- | :--- |
| **Phase 1** | Data Curation & Preprocessing | Acquire SRTM 30m DEM, GSI Bhukosh slide catalog, mock IMD rainfall feeds for pilot district. | Ayush & Shinjini |
| **Phase 2** | AI Model & XAI Development | Train XGBoost/Random Forest susceptibility models; integrate SHAP explainability factor module. | Ayush & Shinjini |
| **Phase 3** | GIS Visualization & PostGIS | Setup PostGIS spatial database; build React.js dashboard with 4-color risk polygon overlays. | Prerana & Sondeep |
| **Phase 4** | Connectivity Impact Engine | Implement pgRouting/Dijkstra to detect blocked roads, isolated villages, and bypass routes. | Sondeep & Subham |
| **Phase 5** | Mobile App & Offline Sync | Build Flutter client with SQLite local cache, camera geotagging, and auto-sync background worker. | Subham & Rahul |
| **Phase 6** | Testing & Prototype Simulation | Simulate 185mm cloudburst, validate offline sync & rerouting; end-to-end evaluation demonstration. | Rahul & All Members |

### Student Execution Feasibility & Technical Governance:
* **Independent Modular Workstreams:** Strict decoupling into ML, GIS, Flutter Mobile, Backend FastAPI, and React Frontend microservices allows all 6 team members to program simultaneously without code conflicts.
* **100% Free & Open Source Stack:** Zero commercial software or expensive proprietary licenses required. Python, Scikit-learn, PostGIS, OpenStreetMap, Flutter, and FastAPI run seamlessly on accessible student hardware and cloud tiers.
* **Rigorous Simulation Testing Plan:** A pre-recorded Sikkim landslide scenario with synthetic 185mm cloudburst rainfall is built into the prototype test harness to demonstrate offline caching, risk calculation, and bypass route solver live.

---

## 10. TECHNICAL FEASIBILITY & REALISM

* **Zero Hardware Installation Overhead:** Traditional slope monitoring requires crores in borehole inclinometers, wire extensometers, and acoustic sensors. AlertNex relies entirely on open satellite remote sensing, meteorological telemetry, and crowdsourced mobile reports.
* **Open Datasets Ready:** NASA SMAP (soil moisture), SRTM DEM (elevation), IMD API (precipitation), and GSI Bhukosh (historical slides) are freely accessible.
* **Realistic Student Execution:** Modular microservice separation allows all 6 team members to build frontend, backend, ML, mobile, and GIS components independently.
* **Scientifically Grounded:** AlertNex is engineered as an early-warning decision-support platform that minimizes loss of life and organizes logistics—not an impossible 100% predictive oracle.

---

## 11. EXPECTED IMPACT & 12. FUTURE SCOPE

### Societal & Operational Impact:
* **6–12h Warning Window:** Replaces post-disaster rescue with proactive orderly evacuation.
* **Lifeline Protection:** Prevents stranded vehicles and casualties along NH-10 & NH-29.
* **Voice for Remote Hamlets:** Offline reporting empowers cut-off tribal communities.
* **Targeted Resource Allocation:** Directs SDRF/BRO earthmovers to priority choke points.
* **Economic Continuity:** Mitigates multi-crore losses in highway trade and rescue operations.

### Future Innovation Horizons:
* **Drone Photogrammetry:** Automated UAV inspection along flagged slope tension cracks.
* **InSAR Satellite Radar:** Sentinel-1 interferometry to track millimeter ground movement.
* **Emergency Integration:** Direct API integration with 112 India and BRO Swastik.
* **Regional Languages:** Multilingual audio alerts in Assamese, Bengali, Nepali, Mizo, Khasi.
* **Pan-Himalayan Expansion:** Scaling to Uttarakhand, Himachal Pradesh, and J&K.

---

## 13. REALISTIC PROTOTYPE DEMONSTRATION SCENARIO (NH-10 TEESTA CORRIDOR)

1. **Environmental Ingestion:** Simulated live telemetry: 24-hour rainfall reaches 185 mm in Melli-Singtam sector; soil moisture saturation exceeds 92%.
2. **Risk Level Escalation:** AI Risk Engine recalculates slope stability; susceptibility score escalates from MODERATE (Yellow) to HIGH (Orange) to **CRITICAL (Red - 87%)**.
3. **Explainable AI (XAI):** Interactive map renders stretch in red. *XAI Breakdown: Rainfall 42% + Moisture 21% + Slope 15% + Field Crack Observation 9%.*
4. **Connectivity Impact:** Graph engine identifies NH-10 Km 29 choke point; flags 3 isolated villages (Lower Melli, Tarkhola, Rambi - 4,200 residents); generates alternate Route B.
5. **Offline Sync Validation:** Field officer captures crack photo in offline valley; stored locally in SQLite; auto-syncs as device regains signal, validating alert.
6. **Proactive Response:** Automated SMS warning pushed to registered transporters; tactical dispatch coordinates routed to pre-position BRO earthmovers.

---

## 14. 60-SECOND PRESENTATION PITCH (FOR COLLEGE INTERNAL JURY)

> *"Respected professors and evaluation committee,*
> 
> *Every monsoon, catastrophic landslides bring the North Eastern Region to a standstill. Arterial lifelines like NH-10 and NH-29 are severed, cutting off food supplies, trapping emergency ambulances, and isolating remote tribal villages for weeks.*
> 
> *Current disaster systems are completely reactive: they detect landslides only after the mountain has collapsed. Furthermore, existing research only predicts that a landslide might occur without telling authorities what will actually be destroyed.*
> 
> *We are Team AlertNex, and our solution is an AI-Based Early Warning and Landslide Monitoring System with Connectivity Impact Analysis.*
> 
> *Our system introduces three major breakthroughs:*
> 1. *First, **Connectivity Impact Analysis**: We predict which roads collapse, which villages become isolated, and automatically compute safe alternate bypass routes before disaster strikes.*
> 2. *Second, **Offline Community Reporting**: A mobile app that works 100% offline, allowing villagers in zero-network valleys to capture ground cracks, auto-syncing once signal returns.*
> 3. *Third, **Explainable AI**: Giving district magistrates transparent percentage factors behind every alert.*
> 
> *Using open satellite data and open-source geospatial tools, our prototype is fully feasible, low-cost, and engineered specifically for North East India.*
> 
> *Thank you!"*

<div align="center">
  <strong>TEAM ALERTNEX • AI-POWERED EARLY WARNING FOR SAFER COMMUNITIES</strong>
</div>
