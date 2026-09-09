/**
 * AlertNex - Connectivity Impact Intelligence (Main Innovation)
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexConnectivity = {
  activeZoneId: "zone-ner-01",
  customRiskScore: null, // null means use zone.riskScore

  init() {
    this.bindZoneSelector();
    this.renderImpactData();
  },

  bindZoneSelector() {
    const selector = document.getElementById("impactZoneSelector");
    if (!selector) return;

    selector.innerHTML = AlertNexData.monitoringZones.map(z => `
      <option value="${z.id}" ${z.id === this.activeZoneId ? "selected" : ""}>
        ${z.code}: ${z.name} (${z.riskLevel} Risk - ${z.district})
      </option>
    `).join("");

    selector.addEventListener("change", (e) => {
      this.activeZoneId = e.target.value;
      this.customRiskScore = null; // Reset override to show selected zone's genuine data
      this.renderImpactData();
    });
  },

  selectZone(zoneId) {
    this.activeZoneId = zoneId;
    this.customRiskScore = null;
    const selector = document.getElementById("impactZoneSelector");
    if (selector) selector.value = zoneId;
    this.renderImpactData();
  },

  setCustomRiskScore(score) {
    this.customRiskScore = Math.min(Math.max(parseInt(score, 10), 0), 100);
    this.renderImpactData();
  },

  updateFromAI(score, riskLevel) {
    this.customRiskScore = score;
    this.renderImpactData();
  },

  getEffectiveLevel(score) {
    if (score >= 80) return "CRITICAL";
    if (score >= 60) return "HIGH";
    if (score >= 30) return "MODERATE";
    return "LOW";
  },

  renderImpactData() {
    const zone = AlertNexData.monitoringZones.find(z => z.id === this.activeZoneId) || AlertNexData.monitoringZones[0];
    const riskScore = (this.customRiskScore !== null && this.customRiskScore !== undefined) ? this.customRiskScore : zone.riskScore;
    const riskLevel = this.getEffectiveLevel(riskScore);

    // Summary Metrics
    const statusRoadEl = document.getElementById("impactRoadStatus");
    const affectedVillagesEl = document.getElementById("impactAffectedVillages");
    const hospAccessEl = document.getElementById("impactHospitalAccess");
    const altRouteEl = document.getElementById("impactAltRouteStatus");

    if (statusRoadEl) {
      statusRoadEl.textContent = riskLevel === "CRITICAL" ? "CRITICAL DISRUPTION (BLOCKED)" :
                                 riskLevel === "HIGH" ? "POTENTIAL DISRUPTION (RESTRICTED)" :
                                 riskLevel === "MODERATE" ? "MONITORING (CAUTION)" : "OPERATIONAL (NORMAL CLEARANCE)";
      statusRoadEl.style.color = riskLevel === "CRITICAL" ? "#ef4444" :
                                 riskLevel === "HIGH" ? "#f97316" :
                                 riskLevel === "MODERATE" ? "#f59e0b" : "#10b981";
    }

    if (affectedVillagesEl) {
      if (riskLevel === "CRITICAL") {
        affectedVillagesEl.textContent = `${zone.affectedVillages.length} Communities (ISOLATED)`;
        affectedVillagesEl.style.color = "#ef4444";
      } else if (riskLevel === "HIGH") {
        affectedVillagesEl.textContent = `${zone.affectedVillages.length} Communities (Vulnerable)`;
        affectedVillagesEl.style.color = "#f97316";
      } else if (riskLevel === "MODERATE") {
        affectedVillagesEl.textContent = `${zone.affectedVillages.length} Under Caution`;
        affectedVillagesEl.style.color = "#f59e0b";
      } else {
        affectedVillagesEl.textContent = `${zone.affectedVillages.length} Connected (Safe)`;
        affectedVillagesEl.style.color = "#10b981";
      }
    }

    if (hospAccessEl) {
      if (riskLevel === "CRITICAL") {
        hospAccessEl.textContent = "Primary Corridor Severed (Detour Active)";
        hospAccessEl.style.color = "#ef4444";
      } else if (riskLevel === "HIGH") {
        hospAccessEl.textContent = "Corridor Vulnerable (Heavy Traffic Diverted)";
        hospAccessEl.style.color = "#f97316";
      } else if (riskLevel === "MODERATE") {
        hospAccessEl.textContent = "Accessible with Caution Advisory";
        hospAccessEl.style.color = "#f59e0b";
      } else {
        hospAccessEl.textContent = "Direct Highway Transit Open (0 min Delay)";
        hospAccessEl.style.color = "#10b981";
      }
    }

    if (altRouteEl) {
      if (riskLevel === "CRITICAL") {
        altRouteEl.textContent = "⚡ Emergency Bypass Active (+22 min)";
        altRouteEl.style.color = "#10b981";
      } else if (riskLevel === "HIGH") {
        altRouteEl.textContent = "Recommended Detour Ready (+15 min)";
        altRouteEl.style.color = "#34d399";
      } else if (riskLevel === "MODERATE") {
        altRouteEl.textContent = "Secondary Route on Standby";
        altRouteEl.style.color = "#a7f3d0";
      } else {
        altRouteEl.textContent = "Standard Standby (Primary Road Open)";
        altRouteEl.style.color = "var(--text-secondary)";
      }
    }

    // Road Impact Table
    const roadTableBody = document.getElementById("impactRoadsTableBody");
    if (roadTableBody) {
      roadTableBody.innerHTML = zone.affectedRoads.map((road, idx) => {
        const roadStatus = (idx === 0 && riskLevel === "CRITICAL") ? "CRITICAL DISRUPTION" :
                           (riskLevel === "HIGH" || riskLevel === "CRITICAL") ? "POTENTIAL DISRUPTION" :
                           riskLevel === "MODERATE" ? "MONITORING (CAUTION)" : "CLEAR / OPEN";
        const tagClass = roadStatus === "CRITICAL DISRUPTION" ? "critical" : 
                         (roadStatus === "POTENTIAL DISRUPTION") ? "high" : 
                         (roadStatus.includes("MONITORING")) ? "moderate" : "low";
        const priority = (riskLevel === "CRITICAL") ? "Priority 1 (Emergency Clearance)" :
                         (riskLevel === "HIGH") ? "Priority 2 (Pre-deployment)" :
                         (riskLevel === "MODERATE") ? "Priority 3 (Patrol Monitoring)" : "Normal Operation";
        const mitigation = (riskLevel === "CRITICAL") ? "Heavy Earth Movers Stationed • Convoys Halted" :
                           (riskLevel === "HIGH") ? "Earth-moving machinery on 30-min standby" :
                           (riskLevel === "MODERATE") ? "Routine slope drainage inspection" : "Normal traffic permitted";
        return `
        <tr>
          <td><strong style="color:var(--text-main);">${road}</strong></td>
          <td><span class="risk-tag ${tagClass}">${roadStatus}</span></td>
          <td><span style="color:${tagClass === 'critical' ? '#ef4444' : tagClass === 'high' ? '#f97316' : tagClass === 'moderate' ? '#f59e0b' : '#10b981'}; font-weight:700;">${priority}</span></td>
          <td><span style="font-size:0.8rem; color:var(--text-secondary);">${mitigation}</span></td>
        </tr>
      `;
      }).join("");
    }

    // Village Isolation Analysis Table
    const villageTableBody = document.getElementById("impactVillagesTableBody");
    if (villageTableBody) {
      villageTableBody.innerHTML = zone.affectedVillages.map((village, idx) => {
        let isolationRisk = "LOW";
        let tagClass = "low";
        let cause = "Slope stable; road clear";
        let altAccess = "Normal arterial highway open";

        if (riskLevel === "CRITICAL") {
          isolationRisk = idx === 0 ? "CRITICAL ISOLATION RISK" : "HIGH ISOLATION RISK";
          tagClass = idx === 0 ? "critical" : "high";
          cause = idx === 0 ? "Primary arterial road severed by landslide mudflow" : "Access road obstructed by debris runoff";
          altAccess = "<span style='color:#10b981; font-weight:600;'>Secondary pedestrian ridge track & emergency bypass open</span>";
        } else if (riskLevel === "HIGH") {
          isolationRisk = idx === 0 ? "HIGH ISOLATION RISK" : "MODERATE ISOLATION RISK";
          tagClass = idx === 0 ? "high" : "moderate";
          cause = "Potential soil slump threatening sole arterial link";
          altAccess = "<span style='color:#34d399; font-weight:600;'>Secondary ridge track operational</span>";
        } else if (riskLevel === "MODERATE") {
          isolationRisk = "ADVISORY WATCH";
          tagClass = "moderate";
          cause = "Elevated saturation; minor runoff potential";
          altAccess = "Highway fully open; bypass on standby";
        } else {
          isolationRisk = "CONNECTED / SAFE";
          tagClass = "low";
          cause = "Stable geological conditions; normal drainage";
          altAccess = "Direct arterial highway open";
        }

        return `
          <tr>
            <td>
              <strong>Village ${village}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">Est. Pop: ${1200 + (idx * 650)} residents</div>
            </td>
            <td><span class="risk-tag ${tagClass}">${isolationRisk}</span></td>
            <td>${cause}</td>
            <td>${altAccess}</td>
          </tr>
        `;
      }).join("");
    }

    // Emergency Route Suggestion Callout
    const altRouteBox = document.getElementById("emergencyRouteBox");
    if (altRouteBox) {
      const isCritical = riskLevel === "CRITICAL";
      const isHigh = riskLevel === "HIGH";
      const isModerate = riskLevel === "MODERATE";
      const boxBorder = isCritical ? "#ef4444" : isHigh ? "#f97316" : isModerate ? "#f59e0b" : "#10b981";
      const boxBg = isCritical ? "rgba(239, 68, 68, 0.08)" : isHigh ? "rgba(249, 115, 22, 0.08)" : isModerate ? "rgba(245, 158, 11, 0.08)" : "rgba(16, 185, 129, 0.08)";
      const delayText = isCritical ? "+22 minutes" : isHigh ? "+15 minutes" : isModerate ? "+5 minutes" : "0 minutes (Direct Route)";

      altRouteBox.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:16px; border:1px solid ${boxBorder}; background:${boxBg}; border-radius:var(--radius-md); padding:16px;">
          <div style="width:42px; height:42px; border-radius:8px; background:rgba(16,185,129,0.2); border:1px solid #10b981; display:flex; align-items:center; justify-content:center; color:#10b981; flex-shrink:0;">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          </div>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:${boxBorder}; text-transform:uppercase; letter-spacing:0.05em;">
              ${isCritical ? '⚠️ CRITICAL ACTION: MANDATORY BYPASS ACTIVATED' : isHigh ? 'PROTOTYPE DECISION-SUPPORT: DETOUR ADVISORY' : isModerate ? 'CAUTIONARY TRANSIT ADVISORY' : 'OPERATIONAL LOGISTICS STATUS'}
            </div>
            <h4 style="font-size:1.15rem; color:var(--text-main); margin:4px 0;">Emergency Bypass Corridor: ${zone.emergencyRoute}</h4>
            <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.5; margin:0;">
              ${isCritical 
                ? `Primary highway corridor is impassable due to critical landslide risk (${riskScore}%). Rerouting emergency relief convoys and medical transit via <strong>${zone.emergencyRoute}</strong> ensures uninterrupted connectivity with estimated travel differential of <strong>${delayText}</strong>.`
                : isHigh 
                ? `High hazard index (${riskScore}%). Heavy freight and emergency logistics advised to utilize <strong>${zone.emergencyRoute}</strong> to avoid potential slope failure (estimated delay <strong>${delayText}</strong>).`
                : isModerate
                ? `Moderate caution (${riskScore}%). Primary highway is open with speed limits. Alternate corridor <strong>${zone.emergencyRoute}</strong> is prepped on standby.`
                : `Normal baseline (${riskScore}%). Primary highway is clear and fully operational. No detour required (Delay: 0 min).`
              }
            </p>
          </div>
        </div>
      `;
    }

    // Render Visual Corridor SVG Diagram
    this.renderCorridorDiagram(zone, riskScore, riskLevel);
  },

  renderCorridorDiagram(zone, riskScore, riskLevel) {
    const container = document.getElementById("corridorVisualCanvas");
    if (!container) return;

    const isLow = riskLevel === "LOW";
    const isMod = riskLevel === "MODERATE";
    const isHigh = riskLevel === "HIGH";
    const isCrit = riskLevel === "CRITICAL";

    const v1 = (zone.affectedVillages && zone.affectedVillages[0]) ? zone.affectedVillages[0] : "Vanghmun";
    const v2 = (zone.affectedVillages && zone.affectedVillages[1]) ? zone.affectedVillages[1] : "Phuldungsei";
    const primaryRoadName = (zone.affectedRoads && zone.affectedRoads[0]) ? zone.affectedRoads[0] : "Primary Arterial Corridor";
    const hospitalName = zone.hospitalAccess ? zone.hospitalAccess.split("(")[0].trim() : "Regional Hospital";
    const districtHubName = `${zone.district || 'District'} HQ`;
    const bypassRouteName = zone.emergencyRoute ? zone.emergencyRoute.split("(")[0].trim() : "Emergency Detour Route";

    // Primary route styling based on risk
    const primaryColor = isLow ? "#10b981" : isMod ? "#f59e0b" : isHigh ? "#f97316" : "#dc2626";

    // Landslide hazard ellipse styling
    const slumpFill = isLow ? "rgba(16, 185, 129, 0.12)" :
                      isMod ? "rgba(245, 158, 11, 0.18)" :
                      isHigh ? "rgba(249, 115, 22, 0.28)" :
                      "rgba(220, 38, 38, 0.35)";
    const slumpStroke = isLow ? "#10b981" : isMod ? "#f59e0b" : isHigh ? "#f97316" : "#dc2626";
    const slumpText1 = isLow ? "SLOPE STABLE • NO SLUMP" :
                       isMod ? "ELEVATED SATURATION WATCH" :
                       isHigh ? "ACTIVE SOIL SLUMP HAZARD" :
                       "CRITICAL LANDSLIDE SLUMP";
    const slumpText2 = isLow ? `CLEAR TRANSIT (${riskScore}%)` :
                       isMod ? `MODERATE RISK (${riskScore}%)` :
                       isHigh ? `HIGH RISK (${riskScore}%) - FREIGHT HALTED` :
                       `ROAD SEVERED (${riskScore}%)`;

    // Bypass route styling
    const bypassColor = isCrit ? "#059669" : isHigh ? "#10b981" : isMod ? "#34d399" : "#64748b";
    const bypassStrokeWidth = isCrit ? 5 : isHigh ? 4 : isMod ? 3 : 2;
    const bypassDash = isCrit ? "8,4" : isHigh ? "6,4" : isMod ? "5,4" : "4,4";
    const bypassText = isCrit ? `⚡ ACTIVATED BYPASS: ${bypassRouteName} (+22 MIN)` :
                       isHigh ? `SUGGESTED DETOUR: ${bypassRouteName} (+15 MIN)` :
                       isMod ? `SECONDARY DETOUR STANDBY: ${bypassRouteName}` :
                       `STANDBY EMERGENCY BYPASS ROUTE (${bypassRouteName})`;

    // Village 2 status
    const v2Color = isCrit ? "#dc2626" : isHigh ? "#ea580c" : isMod ? "#d97706" : "#15803d";
    const v2Label = isCrit ? `Village ${v2} (ISOLATED - CUT-OFF)` :
                    isHigh ? `Village ${v2} (At-Risk / Restricted)` :
                    isMod ? `Village ${v2} (Advisory Watch)` :
                    `Village ${v2} (Connected • Safe)`;

    // Check if controls bar exists; if not, build skeleton
    let controlsBar = document.getElementById("corridorControlsBar");
    let svgWrapper = document.getElementById("corridorSvgWrapper");

    if (!controlsBar || !svgWrapper) {
      container.innerHTML = `
        <div id="corridorControlsBar" class="corridor-controls-bar" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; border:1px solid var(--border-main); margin-bottom:12px;"></div>
        <div id="corridorSvgWrapper" style="width:100%; position:relative;"></div>
      `;
      controlsBar = document.getElementById("corridorControlsBar");
      svgWrapper = document.getElementById("corridorSvgWrapper");
    }

    // Update Controls Bar
    controlsBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
        <span style="font-size:0.78rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.04em;">🧪 Live Data Simulation:</span>
        <button type="button" class="btn btn-sm" style="background:${isLow ? '#10b981' : 'transparent'}; color:${isLow ? '#fff' : '#10b981'}; border:1px solid #10b981; font-weight:700; padding:3px 8px; border-radius:6px; cursor:pointer; font-size:0.75rem;" onclick="AlertNexConnectivity.setCustomRiskScore(18)">🟢 Low (18%)</button>
        <button type="button" class="btn btn-sm" style="background:${isMod ? '#f59e0b' : 'transparent'}; color:${isMod ? '#fff' : '#f59e0b'}; border:1px solid #f59e0b; font-weight:700; padding:3px 8px; border-radius:6px; cursor:pointer; font-size:0.75rem;" onclick="AlertNexConnectivity.setCustomRiskScore(45)">🟡 Moderate (45%)</button>
        <button type="button" class="btn btn-sm" style="background:${isHigh ? '#f97316' : 'transparent'}; color:${isHigh ? '#fff' : '#f97316'}; border:1px solid #f97316; font-weight:700; padding:3px 8px; border-radius:6px; cursor:pointer; font-size:0.75rem;" onclick="AlertNexConnectivity.setCustomRiskScore(74)">🟠 High (74%)</button>
        <button type="button" class="btn btn-sm" style="background:${isCrit ? '#dc2626' : 'transparent'}; color:${isCrit ? '#fff' : '#dc2626'}; border:1px solid #dc2626; font-weight:700; padding:3px 8px; border-radius:6px; cursor:pointer; font-size:0.75rem;" onclick="AlertNexConnectivity.setCustomRiskScore(88)">🔴 Critical (88%)</button>
      </div>
      <div style="display:flex; align-items:center; gap:10px; flex:1; max-width:280px; min-width:180px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); white-space:nowrap;">Dynamic Slider:</span>
        <input type="range" min="0" max="100" value="${riskScore}" class="range-input" style="flex:1; cursor:pointer;" oninput="AlertNexConnectivity.setCustomRiskScore(this.value)" id="corridorRiskSlider">
        <span style="font-size:0.84rem; font-weight:800; color:${primaryColor}; min-width:42px; text-align:right;">${riskScore}%</span>
      </div>
    `;

    // Render SVG
    svgWrapper.innerHTML = `
      <svg viewBox="0 0 860 250" style="width:100%; height:auto; display:block;">
        <defs>
          <linearGradient id="gradPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0.8"/>
          </linearGradient>
          <linearGradient id="gradBypass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${bypassColor}" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="${bypassColor}" stop-opacity="0.85"/>
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Base Grid Reference Line -->
        <line x1="80" y1="120" x2="780" y2="120" stroke="rgba(0,0,0,0.06)" stroke-dasharray="4,4" stroke-width="1.5" />
        
        <!-- Primary Highway Route -->
        ${isCrit ? `
          <!-- Severed Left Segment -->
          <path d="M 80 120 Q 230 55, 360 98" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linecap="round"/>
          <!-- Severed Right Segment -->
          <path d="M 500 142 Q 640 185, 780 120" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.4" stroke-dasharray="6,4"/>
          <!-- Severed Gap Break Icons -->
          <line x1="355" y1="90" x2="365" y2="106" stroke="#dc2626" stroke-width="4"/>
          <line x1="495" y1="134" x2="505" y2="150" stroke="#dc2626" stroke-width="4"/>
        ` : `
          <path d="M 80 120 Q 250 50, 430 120 T 780 120" fill="none" stroke="url(#gradPrimary)" stroke-width="6" stroke-linecap="round"/>
        `}

        <!-- Highway Label along the path -->
        <text x="250" y="46" text-anchor="middle" fill="var(--text-secondary)" font-size="10" font-weight="700">🛣️ ${primaryRoadName}</text>

        <!-- Landslide Hazard Zone Ellipse -->
        <ellipse cx="430" cy="120" rx="${isCrit ? 82 : isHigh ? 74 : isMod ? 66 : 58}" ry="${isCrit ? 40 : isHigh ? 35 : isMod ? 30 : 26}" fill="${slumpFill}" stroke="${slumpStroke}" stroke-width="${isCrit ? 2.5 : 2}" stroke-dasharray="${isLow ? 'none' : '4,3'}" ${isCrit ? 'filter="url(#glowEffect)"' : ''}/>
        <text x="430" y="112" text-anchor="middle" fill="${isLow ? '#059669' : isMod ? '#b45309' : isHigh ? '#c2410c' : '#991b1b'}" font-size="11" font-weight="800" letter-spacing="0.03em">${slumpText1}</text>
        <text x="430" y="130" text-anchor="middle" fill="${primaryColor}" font-size="10" font-weight="700">${slumpText2}</text>

        <!-- Secondary Bypass Route (Bottom Arc) -->
        <path d="M 80 120 C 220 225, 640 225, 780 120" fill="none" stroke="url(#gradBypass)" stroke-width="${bypassStrokeWidth}" stroke-dasharray="${bypassDash}" ${isCrit ? 'filter="url(#glowEffect)"' : ''}/>
        <text x="430" y="214" text-anchor="middle" fill="${bypassColor}" font-size="10.5" font-weight="700" letter-spacing="0.02em">${bypassText}</text>

        <!-- Origin Node (District Center / HUB) -->
        <circle cx="80" cy="120" r="16" fill="#0f3d2a" stroke="#52c48f" stroke-width="3"/>
        <text x="80" y="124" text-anchor="middle" fill="#fff" font-size="9.5" font-weight="bold">HUB</text>
        <text x="80" y="90" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="700">${districtHubName}</text>

        <!-- Destination Node (Regional Hospital / CHC) -->
        <circle cx="780" cy="120" r="16" fill="#0f3d2a" stroke="${isLow ? '#10b981' : isMod ? '#34d399' : '#10b981'}" stroke-width="3"/>
        <text x="780" y="124" text-anchor="middle" fill="#fff" font-size="9.5" font-weight="bold">HOSP</text>
        <text x="780" y="90" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="700">${hospitalName}</text>

        <!-- Village 1 Node (West / Hub Side) -->
        <circle cx="290" cy="85" r="9" fill="${isLow ? '#15803d' : isMod ? '#d97706' : '#2563eb'}" stroke="#fff" stroke-width="2"/>
        <text x="290" y="70" text-anchor="middle" fill="var(--text-main)" font-size="10" font-weight="600">Village ${v1} (Connected)</text>

        <!-- Village 2 Node (East / Downstream Side) -->
        <circle cx="570" cy="85" r="9" fill="${v2Color}" stroke="#fff" stroke-width="2" ${isCrit ? 'filter="url(#glowEffect)"' : ''}/>
        <text x="570" y="70" text-anchor="middle" fill="${v2Color}" font-size="10" font-weight="700">${v2Label}</text>
      </svg>
    `;
  }
};

window.AlertNexConnectivity = AlertNexConnectivity;
