# 🖥️ AlertNex — Frontend Architecture & Integration Guide

> **Ministry of Development of North Eastern Region (MDoNER)**  
> **SIH 2026 | PS ID: SIH26001 | Team AlertNex**

This document provides a comprehensive technical overview of the **AlertNex Single Page Application (SPA)** frontend architecture, its GIS spatial rendering pipeline, Explainable AI (XAI) calculations, and offline-first IndexedDB synchronization.

---

## 🏛️ Frontend Directory Structure

```
alertnex-app/
├── index.html              # Core SPA markup containing 10 views and authority command interface
├── assets/                 # Icons, badges, satellite overlays, and demonstration media
├── css/
│   ├── style.css           # Command center theme, glassmorphic styles, and CSS custom properties
│   └── responsive.css      # Viewport media queries for mobile, tablet, and wide desktop displays
└── js/
    ├── app.js              # Application bootstrapper, hash router, global clocks, and toasts
    ├── api.js              # Environment-aware REST API client with intelligent offline fallback
    ├── data.js             # Realistic NER baseline data (zones, road topology, hospitals, villages)
    ├── map.js              # Leaflet 1.9.4 GIS engine, CartoDB tiles, buffer rings, and popups
    ├── ai-engine.js        # Real-time multi-factor risk calculator & Explainable AI (XAI) factor bars
    ├── connectivity.js     # Topological road network disruption evaluator & bypass recommender
    ├── alerts.js           # Multi-channel alert dispatch manager (SMTP email & SMS simulation)
    ├── reporting.js        # Field ground truth incident reporter & IndexedDB offline cache queue
    ├── simulation.js       # 10-phase automated simulation controller for evaluation demonstration
    └── charts.js           # Chart.js visualizations for temporal risk and alert distribution
```

---

## 🔌 API Client & Fallback Resilience (`api.js`)

The frontend is architected to operate with **zero configuration** in both fully connected backend environments and standalone demo environments:

1. **Backend Auto-Detection:** When the FastAPI server is running on `http://localhost:8000` (or specified cloud origin), `api.js` automatically routes requests to live REST endpoints.
2. **Graceful Fallback:** If the backend is unavailable or the user is evaluating the static Netlify / GitHub Pages deployment directly, `api.js` seamlessly serves calibrated prototype datasets without breaking UI workflows.
3. **Environment Switcher:** The API base URL can be dynamically overridden at runtime via local storage or environment configuration.

---

## 🗺️ Leaflet GIS Spatial Engine (`map.js`)

The spatial monitoring layer utilizes Leaflet.js with CartoDB topographic tiles:
* **Custom GeoJSON Boundaries:** Bounding boxes and polygons delineating key NER geological sectors (Cherrapunji, Haflong Pass, Tsomgo, Kohima).
* **Pulsing Risk Buffers:** Dynamic SVG/CSS pulse animations at hazard epicenters colored by current risk level:
  - 🟢 **LOW (0–25):** `#10b981` (Safe baseline)
  - 🟡 **MODERATE (26–50):** `#f59e0b` (Advisory watch)
  - 🟠 **HIGH (51–75):** `#f97316` (Emergency mobilization)
  - 🔴 **CRITICAL (76–100):** `#ef4444` (Lifeline breach / evacuation)
* **Road Network Polylines:** Segmented vector paths depicting national highways (NH-206, NH-27, NH-10, NH-29) with status-responsive color coding.
* **Infrastructure Nodes:** Interactive pins representing district hospitals, trauma centers, and isolated hamlets.

---

## 🧠 Explainable AI (XAI) Engine (`ai-engine.js`)

AlertNex replaces opaque "black-box" risk numbers with transparent, auditable mathematical attribution:

$$\text{Risk Score} = (R \times 0.30) + (SM \times 0.25) + (S \times 0.20) + (H \times 0.15) + (FR \times 0.10)$$

* **Factor Decomposition:** Computes individual parameter contribution percentages:
  $$\text{Contribution}_i = \frac{w_i \cdot x_i}{\sum (w_j \cdot x_j)} \times 100\%$$
* **Impact Classification:** Automatically badges factors as `HIGH IMPACT`, `MODERATE IMPACT`, or `BASELINE` so civil commanders immediately identify the primary hazard catalyst.

---

## 📦 IndexedDB Offline Storage Queue (`reporting.js`)

In mountainous valleys across the North East, cellular communication frequently suffers from power outages and destroyed towers:
1. **Offline Detection:** Monitors `navigator.onLine` and network ping status.
2. **IndexedDB Commit:** Unsent citizen field incident reports and geotagged observations are written to browser IndexedDB with base64 image encoding.
3. **Automatic Synchronization:** When connectivity is restored, the `SYNC NOW` mechanism batches queued reports to `/api/reports/` with duplicate deduplication.

---

## 🚀 Build & Deployment Commands

### Serve Locally (Zero Build Step Needed)
```bash
# Using Python built-in HTTP server
cd alertnex-app
python -m http.server 8080

# Or using Node http-server
npx http-server alertnex-app -p 8080
```

### Static Hosting Deployments
* **Netlify:** Pre-configured via `netlify.toml` with publish folder set to `alertnex-app`.
* **Vercel:** Pre-configured via `vercel.json` with `outputDirectory` set to `alertnex-app`.
* **GitHub Pages:** Automated through `.github/workflows/deploy-pages.yml`.
