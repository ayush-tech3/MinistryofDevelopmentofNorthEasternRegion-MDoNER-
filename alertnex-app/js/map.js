/**
 * AlertNex - Live Risk Map (GIS Module)
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexMap = {
  mapInstance: null,
  markersLayer: null,
  roadsLayer: null,
  villagesLayer: null,
  hospitalsLayer: null,
  reportsLayer: null,
  activeFilter: "ALL",
  selectedZone: null,

  init() {
    const mapElement = document.getElementById("gisMap");
    if (!mapElement || typeof L === "undefined") return;

    // Center on North Eastern Region (Guwahati / Shillong / Central NER)
    this.mapInstance = L.map("gisMap", {
      center: [25.8, 92.4],
      zoom: 7,
      minZoom: 6,
      maxZoom: 14,
      zoomControl: true
    });

    // Dark GIS Topographic / CartoDB tiles suitable for disaster command centers
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> | AlertNex GIS Prototype',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.mapInstance);

    // Create Layer Groups
    this.markersLayer = L.layerGroup().addTo(this.mapInstance);
    this.roadsLayer = L.layerGroup().addTo(this.mapInstance);
    this.villagesLayer = L.layerGroup().addTo(this.mapInstance);
    this.hospitalsLayer = L.layerGroup().addTo(this.mapInstance);
    this.reportsLayer = L.layerGroup().addTo(this.mapInstance);

    // Render elements
    this.renderMonitoringZones();
    this.renderInfrastructure();
    this.renderFieldReportPins();
    this.bindFilterEvents();

    // Select the first zone by default for the detail drawer
    if (AlertNexData.monitoringZones.length > 0) {
      this.displayZoneDetails(AlertNexData.monitoringZones[0]);
    }
  },

  getRiskColor(level) {
    switch (level) {
      case "CRITICAL": return "#ef4444";
      case "HIGH": return "#f97316";
      case "MODERATE": return "#f59e0b";
      case "LOW": return "#10b981";
      default: return "#94a3b8";
    }
  },

  renderMonitoringZones() {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    AlertNexData.monitoringZones.forEach(zone => {
      if (this.activeFilter !== "ALL" && zone.riskLevel !== this.activeFilter) {
        return;
      }

      const color = this.getRiskColor(zone.riskLevel);
      const isCritical = zone.riskLevel === "CRITICAL";

      // Pulsing circle marker
      const marker = L.circleMarker([zone.lat, zone.lng], {
        radius: isCritical ? 14 : 11,
        fillColor: color,
        color: "#ffffff",
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.85,
        className: isCritical ? "critical-pulsing-marker" : ""
      });

      // Interactive Click Popup & Drawer Trigger
      marker.on("click", () => {
        this.displayZoneDetails(zone);
        this.mapInstance.flyTo([zone.lat, zone.lng], 9, { duration: 1.2 });
      });

      // Quick hover tooltip
      marker.bindTooltip(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
          <strong style="color:${color}; font-size:12px;">${zone.code}: ${zone.name}</strong><br>
          <span style="font-size:11px; color:#334155;">Risk Score: <b>${zone.riskScore}%</b> (${zone.riskLevel})</span><br>
          <span style="font-size:10px; color:#64748b;">Rainfall 24h: ${zone.rainfall24h} mm</span>
        </div>
      `, { direction: "top", offset: [0, -10] });

      this.markersLayer.addLayer(marker);

      // Add a buffer risk polygon around the epicenter
      const radiusMeters = zone.riskScore * 80;
      const riskBuffer = L.circle([zone.lat, zone.lng], {
        radius: radiusMeters,
        color: color,
        weight: 1,
        fillColor: color,
        fillOpacity: 0.12,
        dashArray: "4, 6"
      });
      this.markersLayer.addLayer(riskBuffer);
    });
  },

  renderInfrastructure() {
    // Render Roads
    if (this.roadsLayer && AlertNexData.infrastructure.roads) {
      this.roadsLayer.clearLayers();
      AlertNexData.infrastructure.roads.forEach(road => {
        const polyline = L.polyline(road.coordinates, {
          color: road.color,
          weight: 4,
          opacity: 0.85
        });
        polyline.bindTooltip(`<b>${road.name}</b><br><span style="font-size:11px;">${road.status}</span>`);
        this.roadsLayer.addLayer(polyline);
      });
    }

    // Render Hospitals
    if (this.hospitalsLayer && AlertNexData.infrastructure.hospitals) {
      this.hospitalsLayer.clearLayers();
      AlertNexData.infrastructure.hospitals.forEach(hosp => {
        const hospIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background:#0284c7; color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:11px; border:2px solid #fff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">H</div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        const marker = L.marker([hosp.lat, hosp.lng], { icon: hospIcon });
        marker.bindTooltip(`<b>${hosp.name}</b><br>Beds: ${hosp.beds} | Status: ${hosp.status}`);
        this.hospitalsLayer.addLayer(marker);
      });
    }

    // Render Villages
    if (this.villagesLayer && AlertNexData.infrastructure.villages) {
      this.villagesLayer.clearLayers();
      AlertNexData.infrastructure.villages.forEach(village => {
        const villageIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background:#6366f1; color:#fff; border-radius:4px; width:16px; height:16px; display:flex; align-items:center; justify-content:center; font-size:9px; border:1.5px solid #fff;">V</div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        const marker = L.marker([village.lat, village.lng], { icon: villageIcon });
        marker.bindTooltip(`<b>Village ${village.name}</b><br>Pop: ${village.population} | Isolation: <b>${village.isolationRisk}</b>`);
        this.villagesLayer.addLayer(marker);
      });
    }
  },

  renderFieldReportPins() {
    if (!this.reportsLayer) return;
    this.reportsLayer.clearLayers();

    AlertNexData.incidentReports.forEach(rep => {
      const pinIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background:#ea580c; color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:10px; border:2px solid #fff; box-shadow:0 0 8px rgba(234,88,12,0.6);">⚠</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      const marker = L.marker([rep.lat, rep.lng], { icon: pinIcon });
      marker.bindTooltip(`<b>Hazard Report (${rep.incidentType})</b><br>${rep.locationName}<br>Severity: <b>${rep.severity}</b>`);
      marker.on("click", () => {
        if (window.AlertNexApp) {
          AlertNexApp.showToast(`Inspecting report: ${rep.incidentType} by ${rep.reporterType}`);
        }
      });
      this.reportsLayer.addLayer(marker);
    });
  },

  displayZoneDetails(zone) {
    this.selectedZone = zone;
    const detailsContainer = document.getElementById("zoneDetailsPanel");
    if (!detailsContainer) return;

    const riskColor = this.getRiskColor(zone.riskLevel);

    detailsContainer.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-title-box">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="prototype-badge">${zone.code}</span>
            <span class="risk-tag ${zone.riskLevel.toLowerCase()}">${zone.riskLevel} RISK</span>
          </div>
          <h3 style="margin-top:6px;">${zone.name}</h3>
          <span>${zone.district}, ${zone.state}</span>
        </div>
      </div>

      <div class="score-display-box" style="border-left: 4px solid ${riskColor};">
        <div class="score-number" style="color:${riskColor};">${zone.riskScore}%</div>
        <div class="score-label">DYNAMIC AI RISK SCORE (PROTOTYPE)</div>
        <div style="font-size:0.72rem; color:#94a3b8; margin-top:4px;">Updated ${zone.lastUpdated}</div>
      </div>

      <div>
        <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:#94a3b8; margin-bottom:8px;">
          Contributing Environmental Factors
        </div>
        <div class="factors-list">
          <div class="factor-row">
            <span class="factor-label">24h Rainfall</span>
            <span class="factor-val">${zone.rainfall24h} mm</span>
          </div>
          <div class="factor-row">
            <span class="factor-label">Soil Moisture Index</span>
            <span class="factor-val">${zone.soilMoisture}%</span>
          </div>
          <div class="factor-row">
            <span class="factor-label">Slope Angle</span>
            <span class="factor-val">${zone.slopeAngle}°</span>
          </div>
          <div class="factor-row">
            <span class="factor-label">Weather Condition</span>
            <span class="factor-val">${zone.weatherCondition}</span>
          </div>
          <div class="factor-row">
            <span class="factor-label">Historical Landslide Record</span>
            <span class="factor-val">${zone.historicalActivity}</span>
          </div>
          <div class="factor-row">
            <span class="factor-label">Ground Field Reports</span>
            <span class="factor-val">${zone.fieldReportsCount} verified</span>
          </div>
        </div>
      </div>

      <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); border-radius:8px; padding:12px;">
        <div style="font-size:0.78rem; font-weight:700; color:#f87171; text-transform:uppercase; margin-bottom:4px;">
          Potential Impact
        </div>
        <p style="font-size:0.84rem; color:#fecaca; line-height:1.4;">${zone.potentialImpact}</p>
      </div>

      <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:12px;">
        <div style="font-size:0.78rem; font-weight:700; color:#34d399; text-transform:uppercase; margin-bottom:4px;">
          Recommended Action
        </div>
        <p style="font-size:0.84rem; color:#d1fae5; line-height:1.4;">${zone.suggestedAction}</p>
      </div>

      <div style="display:flex; gap:10px; margin-top:6px;">
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="AlertNexApp.switchToAIEngine('${zone.id}')">
          Analyze in AI Engine
        </button>
        <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="AlertNexApp.switchToConnectivity('${zone.id}')">
          View Impact
        </button>
      </div>
    `;
  },

  bindFilterEvents() {
    const filterSelect = document.getElementById("mapRiskFilter");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        this.activeFilter = e.target.value;
        this.renderMonitoringZones();
      });
    }

    // Layer checkboxes
    const toggleRoads = document.getElementById("toggleRoads");
    if (toggleRoads) {
      toggleRoads.addEventListener("change", (e) => {
        if (e.target.checked) this.mapInstance.addLayer(this.roadsLayer);
        else this.mapInstance.removeLayer(this.roadsLayer);
      });
    }

    const toggleVillages = document.getElementById("toggleVillages");
    if (toggleVillages) {
      toggleVillages.addEventListener("change", (e) => {
        if (e.target.checked) this.mapInstance.addLayer(this.villagesLayer);
        else this.mapInstance.removeLayer(this.villagesLayer);
      });
    }

    const toggleHospitals = document.getElementById("toggleHospitals");
    if (toggleHospitals) {
      toggleHospitals.addEventListener("change", (e) => {
        if (e.target.checked) this.mapInstance.addLayer(this.hospitalsLayer);
        else this.mapInstance.removeLayer(this.hospitalsLayer);
      });
    }

    const toggleReports = document.getElementById("toggleReports");
    if (toggleReports) {
      toggleReports.addEventListener("change", (e) => {
        if (e.target.checked) this.mapInstance.addLayer(this.reportsLayer);
        else this.mapInstance.removeLayer(this.reportsLayer);
      });
    }
  }
};

window.AlertNexMap = AlertNexMap;
