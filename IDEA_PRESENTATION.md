# 📊 Smart India Hackathon 2026 — Official 6-Slide Presentation
## AI-Based Early Warning & Landslide Monitoring System for North Eastern Region (MDoNER) of India

| Parameter | Details |
| :--- | :--- |
| **Problem Statement ID** | **SIH26001** |
| **Problem Statement Title** | AI-Based Early Warning and Landslide Monitoring System in NER |
| **Theme** | Disaster Management |
| **PS Category** | Software Edition |
| **Organization** | Ministry of Development of North Eastern Region (MDoNER) |
| **Team Name** | **AlertNex** |
| **Team Leader** | **Ayush Kumar** |
| **Download Official PPTX** | [AlertNex_Official_Presentation.pptx](AlertNex_Official_Presentation.pptx) |

---

## 📑 Slide 1: Cover & Team Roster

### SMART INDIA HACKATHON 2026
**AI-Based Early Warning & Landslide Monitoring System for North Eastern Region (MDoNER) of India**

* **Problem Statement ID:** SIH26001
* **Problem Statement Title:** AI-Based Early Warning and Landslide Monitoring System in NER
* **Theme:** Disaster Management
* **PS Category:** Software Edition
* **Organization:** Ministry of Development of North Eastern Region (MDoNER)
* **Team Name:** AlertNex
* **Team Leader:** Ayush Kumar

### TEAM ALERTNEX ROSTER (ALL 6 MEMBERS):
1. **Ayush Kumar [Team Leader]:** AI/ML, System Architecture, Overall Coordination
2. **Prerana Mondal [Member]:** Frontend Development, UI/UX, Data Visualization
3. **Sondeep Kumar [Member]:** Backend Development, Database, API Integration
4. **Shinjini Lohar [Member]:** AI/ML, Computer Vision, Data Processing
5. **Subham Kumar Modi [Member]:** GIS Analysis, Mobile Application, QA Testing
6. **Rahul Deo [Member]:** Cloud Infrastructure, DevOps, Testing & Security

---

## 🎯 Slide 2: The Challenge: Critical Vulnerabilities in North Eastern Region

> **Problem Summary:** The North Eastern Region faces extreme precipitation and complex topography, causing sudden landslides that block lifeline highways, isolate tribal hamlets, and cut hospital access with delayed and purely reactive responses.

### 4 Core Vulnerabilities:
1. **Heavy Rainfall & Slopes:** Cloudbursts (>150mm/day) oversaturate steep, fragile Himalayan terrain, causing sudden debris flows.
2. **Cut-off Lifeline Roads:** Single arterial highways (NH-10, NH-29) suffer recurring collapses, paralyzing state logistics.
3. **Remote Village Isolation:** Deep-valley communities become completely isolated with no accessible route to emergency hospitals.
4. **Zero Connectivity & Lag:** Severe storms knock out cell towers; authorities receive ground reports hours or days too late.

### Visual Paradigm Shift: Reactive to Proactive
* **Current Approach (Reactive):**  
  *Disaster Strikes $\rightarrow$ Detection $\rightarrow$ Delayed Response*  
  • Unaware of road blocks until stranded | No alternative route planning | Heavy casualty risk
* **Our Approach (Team AlertNex Proactive):**  
  *Monitoring $\rightarrow$ Early Warning $\rightarrow$ Preparation $\rightarrow$ Faster Response*  
  • 6–12h pre-warning | Automated road blockage detection | Bypass routes active before collapse

---

## 💡 Slide 3: Our Proposed Solution: Intelligent Disaster Monitoring Ecosystem

### End-to-End Solution Ecosystem Flow:
1. **▼ 1. Multi-Source Data Ingestion:**  
   Rainfall & Weather Data (IMD/GPM) + Soil Moisture (NASA SMAP) + Terrain/Slope (SRTM 30m DEM) + Satellite Imagery + Historical Landslide Inventory + Citizen & Field Reports
2. **▼ 2. AI Risk Engine:**  
   Machine learning ensemble analyzes multi-source environmental triggers, calculates slope stability index, and computes pixel-level susceptibility with Explainable AI factor weights.
3. **▼ 3. Dynamic Landslide Risk Map:**  
   Interactive GIS visualization (Leaflet/Mapbox + PostGIS) rendering 30m resolution dynamic risk zones across vulnerable North Eastern transportation corridors.
4. **▼ 4. Early Warning & Actionable Response:**  
   Proactive alerts to SDRF/DDMA, village isolation predictions, automated emergency route suggestions, and offline mobile citizen guidance.

### Dynamic Risk Levels:
* 🟢 **GREEN: LOW RISK (0 – 30%):** Normal terrain stability. Routine satellite and weather polling. Regular traffic on mountain highways.
* 🟡 **YELLOW: MODERATE RISK (31 – 60%):** Elevated moisture saturation or continuous rainfall. Advisory issued to highway patrols; field officers alerted to monitor slopes.
* 🟠 **ORANGE: HIGH RISK (61 – 80%):** Heavy precipitation + steep slope trigger. Pre-warning alerts to transport authorities; heavy freight restricted; alternative routes prepared.
* 🔴 **RED: CRITICAL RISK (81 – 100%):** Imminent landslide danger. Instant Siren/SMS push to citizens, bypass emergency corridors activated, SDRF/NDRF teams pre-deployed.

---

## 🚀 Slide 4: Key Innovations: Why Team AlertNex Solution is Different

| Innovation Card | Breakthrough Focus | Detailed Implementation |
| :--- | :--- | :--- |
| **CARD 1: Multi-Source AI Risk Analysis** | Combines Environmental & Ground-Level Information | • Integrates static terrain data (slope, aspect, elevation) with dynamic live data (rainfall, soil saturation).<br>• Fuses satellite imagery with real-time crowdsourced citizen observations.<br>• Machine learning ensemble reduces false alarms and avoids alert fatigue. |
| **CARD 2: Connectivity Impact Analysis** | The Core Innovation: Answering *"What Gets Cut Off?"* | • **Road Blockage Analysis:** Identifies exact highway segments threatened by impending slides.<br>• **Village Isolation Analysis:** Determines which remote hill villages lose vehicular access.<br>• **Hospital Accessibility:** Analyzes cut-off primary health centers and critical facilities.<br>• **Alternative Routes:** Autonomous graph routing calculates safe bypass emergency corridors. |
| **CARD 3: Offline Community Reporting** | Ground Intelligence in Zero-Internet Mountain Zones | • Mobile application functions fully offline in remote zero-connectivity valleys.<br>• Citizens and field officers capture geotagged photos, cracks, and blocked roads.<br>• Reports are securely stored in local SQLite database on the mobile device.<br>• Automatically synchronizes with central server as soon as connection is restored. |
| **CARD 4: Explainable AI (XAI)** | Transparent Reasoning for Disaster Management Authorities | • Explains **WHY** the risk is high rather than presenting an uninterpretable score.<br>• Concrete Factor Breakdown for Critical Alert (87%):<br>&nbsp;&nbsp;• Heavy Rainfall (24-hour accumulation): **42% contribution**<br>&nbsp;&nbsp;• High Soil Moisture Saturation: **21% contribution**<br>&nbsp;&nbsp;• Steep Terrain Gradient (>48°): **15% contribution**<br>&nbsp;&nbsp;• Recent Citizen Crack Reports: **9% contribution** |

---

## 🏗️ Slide 5: System Architecture: 4-Tier Flow & Technology Stack

* **LAYER 1: DATA COLLECTION:**  
  Weather & Rainfall (IMD API, GPM) • Soil Moisture (NASA SMAP) • Terrain & Elevation (SRTM 30m DEM) • Satellite Data (Sentinel-2) • Citizen & Field Officer Reports
* **LAYER 2: AI AND ANALYTICS ENGINE:**  
  Data Processing (Pandas, NumPy) • Machine Learning Risk Analysis (Scikit-learn, XGBoost) • Explainable AI Module (SHAP Factor Breakdown)
* **LAYER 3: GIS AND IMPACT ANALYSIS:**  
  PostgreSQL + PostGIS Spatial Geodatabase • Dynamic Risk Mapping • Road Blockage Analysis • Village Isolation Detection • Emergency Alternative Routes (Dijkstra)
* **LAYER 4: OUTPUT & ACTION:**  
  Authority Command Dashboard (React.js + Leaflet/Mapbox) • Mobile Application (Flutter + SQLite) • Early Warning Alerts (Firebase Push & SMS)

### Purpose-Built Technology Stack:
`React.js (Dashboard)` • `Flutter (Mobile)` • `Python + FastAPI (Backend)` • `Scikit-learn (AI/ML)` • `PostgreSQL + PostGIS (Spatial DB)` • `Leaflet (GIS Mapping)` • `SQLite (Offline Mobile DB)` • `Firebase (Cloud Alerts)`

---

## 📈 Slide 6: Impact, Feasibility & Future: The AlertNex Roadmap

### Expected Impact:
* Earlier disaster preparedness with 6–12 hour warning windows.
* Faster emergency response and rescue mobilization for SDRF & BRO.
* Better protection for vulnerable remote tribal hill communities.
* Reduced village isolation through proactive road clearing.
* Improved data-driven decision-making for district magistrates.
* Better infrastructure planning and reduced recurring economic losses.

### Feasibility:
* Uses open environmental and geographical data (IMD, NASA, SRTM).
* Can start with selected high-risk pilot areas (e.g. Sikkim or Assam).
* Modular system architecture ensures seamless independent progress.
* Realistic student-level prototype deployable on cloud free-tiers.
* Uses reliable open-source technologies (FastAPI, PostGIS, Flutter).
* Operates without requiring crores in expensive physical hardware sensors.

### Future Scope:
* Drone monitoring for automated aerial slope crack verification.
* Advanced satellite radar (InSAR) monitoring for millimeter ground movement.
* Regional language support (Assamese, Bengali, Nepali, Mizo, Khasi).
* Emergency service integration directly with 112 India and BRO Swastik.
* Expansion to other Himalayan regions (Uttarakhand, Himachal Pradesh).

<div align="center">
  <strong>TEAM ALERTNEX • AI-POWERED EARLY WARNING FOR SAFER COMMUNITIES</strong>
</div>
