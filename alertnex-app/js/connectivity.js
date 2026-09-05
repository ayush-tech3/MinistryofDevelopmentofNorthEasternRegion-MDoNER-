/**
 * AlertNex - Connectivity Impact Intelligence (Main Innovation)
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexConnectivity = {
  activeZoneId: "zone-ner-01",

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
      this.renderImpactData();
    });
  },

  selectZone(zoneId) {
    this.activeZoneId = zoneId;
    const selector = document.getElementById("impactZoneSelector");
    if (selector) selector.value = zoneId;
    this.renderImpactData();
  },

  renderImpactData() {
    const zone = AlertNexData.monitoringZones.find(z => z.id === this.activeZoneId) || AlertNexData.monitoringZones[0];

    // Summary Metrics
    const statusRoadEl = document.getElementById("impactRoadStatus");
    const affectedVillagesEl = document.getElementById("impactAffectedVillages");
    const hospAccessEl = document.getElementById("impactHospitalAccess");
    const altRouteEl = document.getElementById("impactAltRouteStatus");

    if (statusRoadEl) statusRoadEl.textContent = zone.riskLevel === "CRITICAL" ? "Severe Disruption Likely" : zone.riskLevel === "HIGH" ? "Potential Disruption" : "Traffic Throttled";
    if (affectedVillagesEl) affectedVillagesEl.textContent = `${zone.affectedVillages.length} Communities`;
    if (hospAccessEl) hospAccessEl.textContent = zone.riskLevel === "CRITICAL" ? "Corridor Vulnerable" : "Accessible via Detour";
    if (altRouteEl) altRouteEl.textContent = "Verified Alternative Active";

    // Road Impact Table
    const roadTableBody = document.getElementById("impactRoadsTableBody");
    if (roadTableBody) {
      roadTableBody.innerHTML = zone.affectedRoads.map((road, idx) => `
        <tr>
          <td><strong style="color:#ffffff;">${road}</strong></td>
          <td><span class="risk-tag ${idx === 0 ? 'critical' : 'high'}">${idx === 0 ? 'Disrupted / Vulnerable' : 'Single-Lane Advisory'}</span></td>
          <td><span style="color:#f87171; font-weight:700;">Priority 1 (Clearance)</span></td>
          <td><span style="font-size:0.8rem; color:#cbd5e1;">Heavy Earth Movers Stationed</span></td>
        </tr>
      `).join("");
    }

    // Village Isolation Analysis Table
    const villageTableBody = document.getElementById("impactVillagesTableBody");
    if (villageTableBody) {
      villageTableBody.innerHTML = zone.affectedVillages.map((village, idx) => {
        const isolationRisk = idx === 0 ? "CRITICAL" : "HIGH";
        const tagClass = idx === 0 ? "critical" : "high";
        return `
          <tr>
            <td>
              <strong>Village ${village}</strong>
              <div style="font-size:0.75rem; color:#94a3b8;">Est. Pop: ${1200 + (idx * 650)} residents</div>
            </td>
            <td><span class="risk-tag ${tagClass}">${isolationRisk} ISOLATION RISK</span></td>
            <td>Primary arterial road vulnerable to mudflow</td>
            <td><span style="color:#34d399; font-weight:600;">Secondary pedestrian ridge track open</span></td>
          </tr>
        `;
      }).join("");
    }

    // Emergency Route Suggestion Callout
    const altRouteBox = document.getElementById("emergencyRouteBox");
    if (altRouteBox) {
      altRouteBox.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:16px;">
          <div style="width:42px; height:42px; border-radius:8px; background:rgba(16,185,129,0.2); border:1px solid #10b981; display:flex; align-items:center; justify-content:center; color:#10b981; flex-shrink:0;">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          </div>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:#34d399; text-transform:uppercase; letter-spacing:0.05em;">
              PROTOTYPE DECISION-SUPPORT RECOMMENDATION
            </div>
            <h4 style="font-size:1.15rem; color:#ffffff; margin:4px 0;">Suggested Emergency Corridor: ${zone.emergencyRoute}</h4>
            <p style="font-size:0.86rem; color:#cbd5e1; line-height:1.5;">
              By routing emergency logistics through this alternate corridor, transit safety is maintained with an estimated travel differential of <strong>+22 minutes</strong>. High-clearance ambulances and disaster response vehicles have confirmed clearance.
            </p>
          </div>
        </div>
      `;
    }

    // Render Visual Corridor SVG Diagram
    this.renderCorridorDiagram(zone);
  },

  renderCorridorDiagram(zone) {
    const container = document.getElementById("corridorVisualCanvas");
    if (!container) return;

    container.innerHTML = `
      <svg viewBox="0 0 800 240" style="width:100%; height:auto; display:block;">
        <defs>
          <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#f97316" stop-opacity="0.8"/>
          </linearGradient>
          <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#059669" stop-opacity="0.9"/>
          </linearGradient>
        </defs>

        <!-- Base Grid Lines -->
        <line x1="40" y1="120" x2="760" y2="120" stroke="#1e426d" stroke-dasharray="4,4" stroke-width="1.5" />
        
        <!-- Primary Blocked Route (Red) -->
        <path d="M 60 120 Q 220 50, 400 120 T 740 120" fill="none" stroke="url(#gradRed)" stroke-width="6" stroke-linecap="round"/>
        
        <!-- Landslide Hazard Zone (Flashing Area) -->
        <ellipse cx="400" cy="120" rx="65" ry="32" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="400" y="115" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="700">LANDSLIDE SLUMP</text>
        <text x="400" y="130" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="600">${zone.riskLevel} RISK (${zone.riskScore}%)</text>

        <!-- Alternative Emergency Route (Green Dashed Curve) -->
        <path d="M 60 120 C 180 210, 620 210, 740 120" fill="none" stroke="url(#gradGreen)" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="400" y="202" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">SUGGESTED EMERGENCY BYPASS ROUTE (OPEN)</text>

        <!-- Origin Node -->
        <circle cx="60" cy="120" r="14" fill="#0b192c" stroke="#38bdf8" stroke-width="3"/>
        <text x="60" y="124" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">HUB</text>
        <text x="60" y="94" text-anchor="middle" fill="#cbd5e1" font-size="11" font-weight="600">District Center</text>

        <!-- Destination Node -->
        <circle cx="740" cy="120" r="14" fill="#0b192c" stroke="#10b981" stroke-width="3"/>
        <text x="740" y="124" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">CHC</text>
        <text x="740" y="94" text-anchor="middle" fill="#cbd5e1" font-size="11" font-weight="600">Regional Hospital</text>

        <!-- Village 1 Node -->
        <circle cx="280" cy="85" r="9" fill="#818cf8" stroke="#fff" stroke-width="2"/>
        <text x="280" y="70" text-anchor="middle" fill="#e0e7ff" font-size="10">Village ${zone.affectedVillages[0] || 'A'}</text>

        <!-- Village 2 Node -->
        <circle cx="520" cy="85" r="9" fill="#f87171" stroke="#fff" stroke-width="2"/>
        <text x="520" y="70" text-anchor="middle" fill="#fecaca" font-size="10">Village ${zone.affectedVillages[1] || 'B'} (Isolated)</text>
      </svg>
    `;
  }
};

window.AlertNexConnectivity = AlertNexConnectivity;
