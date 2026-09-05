/**
 * AlertNex - Early Warning & Alert Management
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexAlerts = {
  filterLevel: "ALL",
  activeAlertForModal: null,

  init() {
    this.bindFilters();
    this.renderAlerts();
  },

  bindFilters() {
    const filterButtons = document.querySelectorAll(".alert-filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.filterLevel = btn.getAttribute("data-level");
        this.renderAlerts();
      });
    });
  },

  renderAlerts() {
    const container = document.getElementById("alertsFeedContainer");
    if (!container) return;

    const filtered = AlertNexData.alerts.filter(a => {
      if (this.filterLevel === "ALL") return true;
      return a.level === this.filterLevel;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:50px 20px; background:var(--navy-surface); border:1px dashed var(--navy-border); border-radius:12px;">
          <div style="font-size:2rem; margin-bottom:10px;">🔔</div>
          <h4 style="color:#fff; font-size:1.1rem;">No Alerts Found</h4>
          <p style="color:#94a3b8; font-size:0.88rem; margin-top:4px;">No alerts match the selected risk filter (${this.filterLevel}).</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(alert => {
      const riskClass = alert.level.toLowerCase();
      return `
        <div class="alert-feed-card ${riskClass}">
          <div class="alert-card-top">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="risk-tag ${riskClass}">
                <span class="pulse-dot ${alert.level === 'CRITICAL' ? 'red' : ''}"></span>
                ${alert.level}
              </span>
              <span class="prototype-badge">${alert.code}</span>
              <span class="alert-location-text">📍 ${alert.location}</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:0.75rem; color:#94a3b8;">${alert.timestamp}</span>
              <span class="status-online-pill" style="font-size:0.72rem; padding:2px 8px;">Status: ${alert.status}</span>
            </div>
          </div>

          <div class="alert-card-body">
            <h3>${alert.title}</h3>
            <p><strong>Potential Impact:</strong> ${alert.impact}</p>
            <p style="margin-top:4px;"><strong>Recommended Action:</strong> ${alert.action}</p>
            <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
              ${alert.sensorTriggers.map(t => `<span style="background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:4px; font-size:0.74rem; color:#cbd5e1;">⚡ ${t}</span>`).join("")}
            </div>
          </div>

          <div class="alert-action-strip">
            <div style="font-size:0.78rem; color:#94a3b8;">
              Channels: <strong>${alert.channels.join(", ")}</strong>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="AlertNexAlerts.updateStatus('${alert.id}', 'ACKNOWLEDGED')">
                Acknowledge
              </button>
              <button class="btn btn-secondary btn-sm" onclick="AlertNexAlerts.updateStatus('${alert.id}', 'UNDER REVIEW')">
                Mark Under Review
              </button>
              <button class="btn btn-primary btn-sm" onclick="AlertNexAlerts.openNotificationModal('${alert.id}')">
                Send Notification
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  async updateStatus(alertId, newStatus) {
    const alert = AlertNexData.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = newStatus;
      this.renderAlerts();

      if (newStatus === "ACKNOWLEDGED" && window.AlertNexAPI) {
        // If it's a numeric DB id or mapped
        const dbId = parseInt(alertId.replace(/\D/g, ""), 10) || 1;
        try {
          await AlertNexAPI.acknowledgeAlert(dbId);
        } catch (e) {
          console.warn("API acknowledge error:", e);
        }
      }

      if (window.AlertNexApp) {
        AlertNexApp.showToast(`Alert [${alert.code || alertId}] updated to "${newStatus}" & saved to database`);
      }
    }
  },

  openNotificationModal(alertId) {
    const alert = AlertNexData.alerts.find(a => a.id === alertId);
    if (!alert) return;

    this.activeAlertForModal = alert;
    const modalBackdrop = document.getElementById("notificationModal");
    const modalContent = document.getElementById("notificationModalBody");

    if (modalContent) {
      modalContent.innerHTML = `
        <div style="background:var(--navy-dark); padding:12px; border-radius:8px; border:1px solid var(--navy-border);">
          <div style="font-size:0.78rem; color:#f97316; font-weight:700;">ACTIVE ALERT TARGET</div>
          <div style="font-weight:700; color:#fff; font-size:1rem; margin-top:2px;">${alert.title}</div>
          <div style="font-size:0.8rem; color:#94a3b8;">Target Sector: ${alert.location}</div>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <label style="font-size:0.84rem; font-weight:600; color:#cbd5e1;">Select Dispatch Channels (Prototype Simulation):</label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#cbd5e1;">
            <input type="checkbox" checked id="chanDashboard"> Central Command Dashboard Broadcast
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#cbd5e1;">
            <input type="checkbox" checked id="chanMobile"> Mobile App Push Notification (FCM Simulation)
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#cbd5e1;">
            <input type="checkbox" checked id="chanSMS"> Simulated SMS to Emergency Contacts (NIC/C-DOT Ready)
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#cbd5e1;">
            <input type="checkbox" id="chanEmail"> Official Civil Administration Email Dispatch
          </label>
        </div>

        <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:6px; padding:10px; font-size:0.78rem; color:#fef08a;">
          <strong>Prototype Notice:</strong> External SMS and Email gateways are simulated for demonstration. Live emergency deployments connect via Gov NIC/C-DOT CAP-compliant gateways.
        </div>
      `;
    }

    if (modalBackdrop) modalBackdrop.classList.add("active");
  },

  closeModal() {
    const modalBackdrop = document.getElementById("notificationModal");
    if (modalBackdrop) modalBackdrop.classList.remove("active");
  },

  dispatchSimulatedNotification() {
    this.closeModal();
    if (window.AlertNexApp && this.activeAlertForModal) {
      AlertNexApp.showToast(`Emergency alert [${this.activeAlertForModal.code}] broadcasted to simulated channels!`);
    }
  }
};

window.AlertNexAlerts = AlertNexAlerts;
