/**
 * AlertNex - Professor / Judge Demonstration Simulation Engine
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex (Leader: Ayush Kumar)
 * 
 * 10-Step Interactive End-to-End Simulation:
 * Step 1: Normal baseline conditions
 * Step 2: Rainfall increases (spikes to torrential levels)
 * Step 3: Soil moisture saturates
 * Step 4: Risk transitions: MODERATE -> HIGH -> CRITICAL
 * Step 5: Map zone marker turns RED with active pulsation
 * Step 6: Critical early warning alert generated in feed
 * Step 7: Road status changes to: POTENTIAL DISRUPTION / CRITICAL DISRUPTION
 * Step 8: Village isolation risk escalates to: HIGH / CRITICAL
 * Step 9: Prototype alternative route suggestion is displayed
 * Step 10: Recommended emergency action appears
 */

const AlertNexSimulation = {
  isRunning: false,
  currentStep: 0,
  timerId: null,
  stepDurationMs: 3200,

  // Baseline backup for clean RESET
  baselineZoneState: null,

  steps: [
    {
      step: 1,
      title: "Normal Environmental Baseline",
      desc: "Baseline conditions in Demo Zone A (East Khasi Hills). Rainfall 35mm, soil moisture 40%, slope 42°. System status: LOW RISK (24%).",
      badge: "LOW RISK (24%)",
      badgeClass: "low",
      rainfall: 35,
      moisture: 40,
      slope: 42,
      history: 85,
      reports: 0,
      riskScore: 24,
      riskLevel: "LOW",
      roadStatus: "NORMAL",
      isolationRisk: "LOW",
      targetView: "dashboard"
    },
    {
      step: 2,
      title: "Precipitation Spike Detected",
      desc: "Monsoon depression brings intense cloudburst. Simulated rainfall rises rapidly from 35 mm to 145 mm/24h.",
      badge: "RAINFALL 145 mm",
      badgeClass: "moderate",
      rainfall: 145,
      moisture: 58,
      slope: 42,
      history: 85,
      reports: 1,
      riskScore: 48,
      riskLevel: "MODERATE",
      roadStatus: "MONITORING",
      isolationRisk: "MODERATE",
      targetView: "dashboard"
    },
    {
      step: 3,
      title: "Soil Moisture Saturation",
      desc: "Continuous infiltration exceeds pore-pressure threshold. Soil moisture surges to 88% saturation.",
      badge: "SOIL SATURATION 88%",
      badgeClass: "high",
      rainfall: 185,
      moisture: 88,
      slope: 42,
      history: 85,
      reports: 2,
      riskScore: 68,
      riskLevel: "HIGH",
      roadStatus: "POTENTIAL DISRUPTION",
      isolationRisk: "HIGH",
      targetView: "ai-engine"
    },
    {
      step: 4,
      title: "Dynamic Risk Threshold Crossed",
      desc: "Weighted prototype formula elevates risk score from HIGH (68%) to CRITICAL (89%). Contributing factors indicate severe slope instability.",
      badge: "CRITICAL RISK (89%)",
      badgeClass: "critical",
      rainfall: 215,
      moisture: 92,
      slope: 42,
      history: 85,
      reports: 4,
      riskScore: 89,
      riskLevel: "CRITICAL",
      roadStatus: "CRITICAL DISRUPTION",
      isolationRisk: "CRITICAL",
      targetView: "ai-engine"
    },
    {
      step: 5,
      title: "Interactive GIS Map Zone Turns RED",
      desc: "East Khasi Hills (Demo Zone A) perimeter flashes red with animated circular buffer indicating epicenter threat radius.",
      badge: "SPATIAL ALERT (RED)",
      badgeClass: "critical",
      rainfall: 215,
      moisture: 92,
      slope: 42,
      history: 85,
      reports: 4,
      riskScore: 89,
      riskLevel: "CRITICAL",
      roadStatus: "CRITICAL DISRUPTION",
      isolationRisk: "CRITICAL",
      targetView: "map"
    },
    {
      step: 6,
      title: "Critical Early Warning Alert Issued",
      desc: "Automated bulletin generated: 'CRITICAL LANDSLIDE RISK: High landslide risk detected in East Khasi Hills. Evacuation standby ordered.'",
      badge: "BULLETIN DISPATCHED",
      badgeClass: "critical",
      rainfall: 215,
      moisture: 92,
      slope: 42,
      history: 85,
      reports: 4,
      riskScore: 89,
      riskLevel: "CRITICAL",
      roadStatus: "CRITICAL DISRUPTION",
      isolationRisk: "CRITICAL",
      targetView: "alerts"
    },
    {
      step: 7,
      title: "Road Network Disruption Evaluated",
      desc: "NH-206 Sohra Sector flagged as CRITICAL DISRUPTION. Secondary spur road placed on single-lane clearance advisory.",
      badge: "ROAD: CRITICAL DISRUPTION",
      badgeClass: "critical",
      rainfall: 215,
      moisture: 92,
      slope: 42,
      history: 85,
      reports: 4,
      riskScore: 89,
      riskLevel: "CRITICAL",
      roadStatus: "CRITICAL DISRUPTION",
      isolationRisk: "CRITICAL",
      targetView: "connectivity"
    },
    {
      step: 8,
      title: "Village Isolation Vulnerability Escalates",
      desc: "Mawlyndep Village (Pop: 1,420) flagged with CRITICAL ISOLATION RISK due to mudflow over primary access culvert.",
      badge: "VILLAGE ISOLATION: CRITICAL",
      badgeClass: "critical",
      rainfall: 215,
      moisture: 92,
      slope: 42,
      history: 85,
      reports: 4,
      riskScore: 89,
      riskLevel: "CRITICAL",
      roadStatus: "CRITICAL DISRUPTION",
      isolationRisk: "CRITICAL",
      targetView: "connectivity"
    },
    {
      step: 9,
      title: "Prototype Alternative Route Suggested",
      desc: "Decision-Support Corridor suggested: Shillong-Mawsynram Bypass via Mawphlang (+18 km, +25 min transit differential). High-clearance clearance verified.",
      badge: "ALT ROUTE ACTIVE",
      badgeClass: "moderate",
      rainfall: 215,
      moisture: 92,
      slope: 42,
      history: 85,
      reports: 4,
      riskScore: 89,
      riskLevel: "CRITICAL",
      roadStatus: "CRITICAL DISRUPTION",
      isolationRisk: "CRITICAL",
      targetView: "connectivity"
    },
    {
      step: 10,
      title: "Emergency Response Action Command",
      desc: "SDRF pre-positioning mobilized, District Disaster Management Authority (DDMA) alerted, and civil traffic diversions enforced.",
      badge: "COMMAND COMPLETE",
      badgeClass: "working",
      rainfall: 215,
      moisture: 92,
      slope: 42,
      history: 85,
      reports: 4,
      riskScore: 89,
      riskLevel: "CRITICAL",
      roadStatus: "CRITICAL DISRUPTION",
      isolationRisk: "CRITICAL",
      targetView: "dashboard"
    }
  ],

  init() {
    this.captureBaseline();
    this.renderControllerUI();
  },

  captureBaseline() {
    const zone = AlertNexData.monitoringZones[0];
    if (zone && !this.baselineZoneState) {
      this.baselineZoneState = {
        riskScore: zone.riskScore,
        riskLevel: zone.riskLevel,
        rainfall24h: zone.rainfall24h,
        soilMoisture: zone.soilMoisture,
        slopeAngle: zone.slopeAngle,
        fieldReportsCount: zone.fieldReportsCount
      };
    }
  },

  renderControllerUI() {
    // Check if simulation bar container exists in dashboard
    const container = document.getElementById("demoSimulationContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="simulation-banner-card">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-indicator-pill ${this.isRunning ? 'running' : ''}">
              <span class="pulse-dot ${this.isRunning ? 'red' : ''}"></span>
              ${this.isRunning ? 'SIMULATION ACTIVE' : 'PROTOTYPE SIMULATION'}
            </span>
            <h3 style="margin:0; font-size:1.15rem; color:#ffffff;">
              Judge &amp; Professor Demonstration Simulator
            </h3>
            <span style="font-size:0.8rem; color:#94a3b8;">
              End-to-End Prototype Hazard Escalation &amp; Decision-Support Flow
            </span>
          </div>

          <div class="sim-actions-group">
            <button class="btn btn-primary btn-sm" id="btnStartSimulation" onclick="AlertNexSimulation.toggleSimulation()">
              ${this.isRunning ? '⏸ Pause Simulation' : '▶ START DEMO SIMULATION'}
            </button>
            <button class="btn btn-secondary btn-sm" id="btnResetSimulation" onclick="AlertNexSimulation.resetSimulation()">
              ↺ RESET DEMO
            </button>
          </div>
        </div>

        <div class="sim-progress-track">
          <div class="sim-progress-bar" id="simProgressBar" style="width: ${this.currentStep === 0 ? '0%' : ((this.currentStep / 10) * 100) + '%'};"></div>
        </div>

        <div class="sim-steps-strip" id="simStepsStrip">
          ${this.steps.map((s, idx) => `
            <div class="sim-step-node ${this.currentStep === s.step ? 'active' : (this.currentStep > s.step ? 'completed' : '')}" onclick="AlertNexSimulation.jumpToStep(${s.step})">
              <div class="step-num">${s.step}</div>
              <div class="step-txt">${s.step === 1 ? 'Baseline' : s.step === 4 ? 'Critical' : s.step === 7 ? 'Road Cut' : s.step === 9 ? 'Alt Route' : 'Step ' + s.step}</div>
            </div>
          `).join("")}
        </div>

        <div class="sim-active-callout" id="simActiveCallout">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.75rem; font-weight:700; color:#38bdf8; text-transform:uppercase; letter-spacing:0.05em;">
              ${this.currentStep === 0 ? 'READY TO START' : `STEP ${this.currentStep} OF 10 • ${this.steps[this.currentStep - 1].badge}`}
            </div>
            <span class="status-online-pill" style="font-size:0.7rem;">PROTOTYPE DECISION-SUPPORT</span>
          </div>
          <h4 style="margin:4px 0; font-size:1rem; color:#fff;" id="simStepTitle">
            ${this.currentStep === 0 ? 'Click "START DEMO SIMULATION" to observe live disaster response propagation' : this.steps[this.currentStep - 1].title}
          </h4>
          <p style="margin:0; font-size:0.86rem; color:#cbd5e1; line-height:1.4;" id="simStepDesc">
            ${this.currentStep === 0 ? 'Demonstrates environmental trigger escalation, AI risk recalculation, spatial map update, critical early warning alert, road disruption, village isolation, and prototype emergency detour suggestion.' : this.steps[this.currentStep - 1].desc}
          </p>
        </div>
      </div>
    `;
  },

  toggleSimulation() {
    if (this.isRunning) {
      this.pauseSimulation();
    } else {
      this.startSimulation();
    }
  },

  startSimulation() {
    this.isRunning = true;
    if (this.currentStep === 0 || this.currentStep >= 10) {
      this.currentStep = 1;
    }
    this.executeStep(this.currentStep);
    this.scheduleNextStep();
    this.renderControllerUI();
    if (window.AlertNexApp) AlertNexApp.showToast("▶ PROTOTYPE SIMULATION STARTED: Step 1 of 10 executing");
  },

  pauseSimulation() {
    this.isRunning = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.renderControllerUI();
    if (window.AlertNexApp) AlertNexApp.showToast("Simulation paused. Click to resume or jump to any step.");
  },

  scheduleNextStep() {
    if (this.timerId) clearTimeout(this.timerId);
    if (!this.isRunning) return;

    this.timerId = setTimeout(() => {
      if (this.currentStep < 10) {
        this.currentStep += 1;
        this.executeStep(this.currentStep);
        this.scheduleNextStep();
      } else {
        this.isRunning = false;
        this.renderControllerUI();
        if (window.AlertNexApp) AlertNexApp.showToast("✓ PROTOTYPE SIMULATION COMPLETE: All 10 disaster response phases verified!");
      }
    }, this.stepDurationMs);
  },

  jumpToStep(stepNum) {
    this.currentStep = stepNum;
    this.executeStep(stepNum);
    this.renderControllerUI();
  },

  executeStep(stepNum) {
    const s = this.steps[stepNum - 1];
    if (!s) return;

    const zone = AlertNexData.monitoringZones[0]; // Cherrapunji
    if (zone) {
      zone.rainfall24h = s.rainfall;
      zone.soilMoisture = s.moisture;
      zone.slopeAngle = s.slope;
      zone.riskScore = s.riskScore;
      zone.riskLevel = s.riskLevel;
      zone.fieldReportsCount = s.reports;
    }

    // Update AI Engine if loaded
    if (window.AlertNexAIEngine && AlertNexAIEngine.state) {
      AlertNexAIEngine.state.rainfall = s.rainfall;
      AlertNexAIEngine.state.soilMoisture = s.moisture;
      AlertNexAIEngine.state.slope = s.slope;
      AlertNexAIEngine.state.fieldReports = s.reports;
      AlertNexAIEngine.calculateRisk();
    }

    // Update GIS Map markers and drawer
    if (window.AlertNexMap && AlertNexMap.mapInstance) {
      AlertNexMap.renderMonitoringZones();
      AlertNexMap.displayZoneDetails(zone);
    }

    // Update Connectivity Module
    if (window.AlertNexConnectivity) {
      AlertNexConnectivity.renderImpactData();
    }

    // In step 6, inject critical alert if not present
    if (stepNum >= 6) {
      const existing = AlertNexData.alerts.find(a => a.id === "ALT-SIM-01");
      if (!existing) {
        AlertNexData.alerts.unshift({
          id: "ALT-SIM-01",
          code: "ALT-2026-CRIT",
          level: "CRITICAL",
          location: "East Khasi Hills (Cherrapunji-Mawsynram Axis)",
          title: "CRITICAL LANDSLIDE RISK: Slope Saturation Threshold Exceeded",
          impact: "NH-206 Cutoff Imminent. Severe threat to Mawlyndep Village.",
          action: "Pre-position SDRF rescue units, alert DDMA, enforce heavy vehicle halt.",
          timestamp: "Just now",
          status: "ACTIVE",
          sensorTriggers: ["Rainfall > 200mm", "Moisture > 90%", "Field Reports Verified"],
          channels: ["SMS", "Email", "VHF", "CAP Gateway"]
        });
        if (window.AlertNexAlerts) AlertNexAlerts.renderAlerts();
      }
    }

    this.renderControllerUI();
  },

  resetSimulation() {
    this.isRunning = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.currentStep = 0;

    const zone = AlertNexData.monitoringZones[0];
    if (zone && this.baselineZoneState) {
      zone.riskScore = this.baselineZoneState.riskScore;
      zone.riskLevel = this.baselineZoneState.riskLevel;
      zone.rainfall24h = this.baselineZoneState.rainfall24h;
      zone.soilMoisture = this.baselineZoneState.soilMoisture;
      zone.slopeAngle = this.baselineZoneState.slopeAngle;
      zone.fieldReportsCount = this.baselineZoneState.fieldReportsCount;
    }

    // Remove simulated alert if added
    AlertNexData.alerts = AlertNexData.alerts.filter(a => a.id !== "ALT-SIM-01");
    if (window.AlertNexAlerts) AlertNexAlerts.renderAlerts();

    // Reset GIS Map
    if (window.AlertNexMap) {
      AlertNexMap.renderMonitoringZones();
      if (zone) AlertNexMap.displayZoneDetails(zone);
    }

    // Reset AI Engine
    if (window.AlertNexAIEngine) {
      AlertNexAIEngine.loadZoneIntoEngine("zone-ner-01");
    }

    // Reset Connectivity
    if (window.AlertNexConnectivity) {
      AlertNexConnectivity.renderImpactData();
    }

    this.renderControllerUI();
    if (window.AlertNexApp) AlertNexApp.showToast("↺ DEMO RESET: Restored all baseline values.");
  }
};

window.AlertNexSimulation = AlertNexSimulation;
