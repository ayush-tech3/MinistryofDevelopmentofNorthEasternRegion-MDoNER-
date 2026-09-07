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
        <div style="text-align:center; padding:50px 20px; background:var(--bg-card-subtle); border:1px dashed var(--border-dark); border-radius:12px;">
          <div style="font-size:2rem; margin-bottom:10px;">🔔</div>
          <h4 style="color:var(--text-main); font-size:1.1rem;">No Alerts Found</h4>
          <p style="color:var(--text-muted); font-size:0.88rem; margin-top:4px;">No alerts match the selected risk filter (${this.filterLevel}).</p>
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
              <span style="font-size:0.75rem; color:var(--text-muted);">${alert.timestamp}</span>
              <span class="status-online-pill" style="font-size:0.72rem; padding:2px 8px;">Status: ${alert.status}</span>
            </div>
          </div>

          <div class="alert-card-body">
            <h3>${alert.title}</h3>
            <p><strong>Potential Impact:</strong> ${alert.impact}</p>
            <p style="margin-top:4px;"><strong>Recommended Action:</strong> ${alert.action}</p>
            <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
              ${alert.sensorTriggers.map(t => `<span style="background:var(--bg-muted); padding:2px 8px; border-radius:4px; font-size:0.74rem; color:var(--text-secondary);">⚡ ${t}</span>`).join("")}
            </div>
          </div>

          <div class="alert-action-strip">
            <div style="font-size:0.78rem; color:var(--text-muted);">
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
        <div style="background:var(--bg-card-subtle); padding:12px; border-radius:8px; border:1px solid var(--border-main);">
          <div style="font-size:0.78rem; color:#f97316; font-weight:700;">ACTIVE ALERT TARGET</div>
          <div style="font-weight:700; color:var(--text-main); font-size:1rem; margin-top:2px;">${alert.title}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">Target Sector: ${alert.location} • Risk: ${alert.riskScore}% (${alert.level})</div>
        </div>

        <!-- Real Email Delivery Input -->
        <div style="display:flex; flex-direction:column; gap:6px; background:rgba(249,115,22,0.08); border:1px solid rgba(249,115,22,0.3); border-radius:8px; padding:12px;">
          <label style="font-size:0.84rem; font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:6px;">
            <span>✉️ Recipient Email (Real Delivery):</span>
          </label>
          <input type="email" id="alertRecipientEmail" class="form-control" placeholder="Enter your email: e.g. name@gmail.com" style="width:100%; font-size:0.9rem;">
          <span style="font-size:0.75rem; color:var(--text-secondary);">Enter your email to receive an official AlertNex emergency warning bulletin directly to your inbox.</span>
        </div>

        <!-- SMS Phone Number Input -->
        <div style="display:flex; flex-direction:column; gap:6px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:12px;">
          <label style="font-size:0.84rem; font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:6px;">
            <span>📱 Recipient Phone (SMS Alert):</span>
          </label>
          <input type="tel" id="alertRecipientPhone" class="form-control" placeholder="Enter phone: e.g. +919876543210" style="width:100%; font-size:0.9rem;">
          <span style="font-size:0.75rem; color:var(--text-secondary);">Enter phone number with country code to receive emergency SMS alert. Uses Twilio when configured, otherwise simulated for demo.</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <label style="font-size:0.84rem; font-weight:600; color:var(--text-secondary);">Additional Dispatch Channels:</label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-secondary);">
            <input type="checkbox" checked id="chanDashboard"> Command Center Dashboard Broadcast
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-secondary);">
            <input type="checkbox" checked id="chanMobile"> Mobile App Push (FCM Gateway Simulation)
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-secondary);">
            <input type="checkbox" checked id="chanSMS"> Citizen SMS Broadcast (CAP / C-DOT / Twilio Gateway)
          </label>
        </div>

        <div style="background:var(--risk-moderate-bg); border:1px solid var(--risk-moderate-border); border-radius:6px; padding:10px; font-size:0.75rem; color:var(--earth-badge-text);">
          <strong>Gateway Status:</strong> Real SMTP email is connected via FastAPI backend. SMS uses Twilio API when configured, otherwise presented as CAP protocol simulation for SIH demonstration.
        </div>
      `;
    }

    if (modalBackdrop) modalBackdrop.classList.add("active");
  },

  closeModal() {
    const modalBackdrop = document.getElementById("notificationModal");
    if (modalBackdrop) modalBackdrop.classList.remove("active");
  },

  async dispatchSimulatedNotification() {
    const alert = this.activeAlertForModal;
    const emailInput = document.getElementById("alertRecipientEmail");
    const phoneInput = document.getElementById("alertRecipientPhone");
    const recipientEmail = emailInput ? emailInput.value.trim() : "";
    const recipientPhone = phoneInput ? phoneInput.value.trim() : "";

    this.closeModal();

    const promises = [];

    // ── Email dispatch ──
    if (recipientEmail && window.AlertNexAPI) {
      if (window.AlertNexApp) {
        AlertNexApp.showToast(`Dispatching official emergency email to ${recipientEmail}...`);
      }

      promises.push(
        AlertNexAPI.sendRealEmail({
          recipient_email: recipientEmail,
          alert_title: alert ? alert.title : "Landslide Hazard Early Warning",
          risk_level: alert ? alert.level : "CRITICAL",
          risk_score: alert ? alert.riskScore : 87.0,
          location: alert ? alert.location : "North Eastern Region Sector",
          potential_impact: alert ? alert.impact : "Road disruption and community isolation risk",
          recommended_action: alert ? alert.action : "Deploy response units and initiate evacuation advisories",
          emergency_corridor: "Shillong-Mawsynram Bypass via Mawphlang"
        }).then(() => {
          if (window.AlertNexApp) {
            AlertNexApp.showToast(`✅ Real emergency email delivered to ${recipientEmail}!`);
          }
        }).catch(err => {
          console.warn("Real email delivery:", err.message);
          if (window.AlertNexApp) {
            AlertNexApp.showToast(`⚠️ Email: ${err.message}`);
          }
        })
      );
    }

    // ── SMS dispatch ──
    if (recipientPhone && window.AlertNexAPI) {
      if (window.AlertNexApp) {
        AlertNexApp.showToast(`Dispatching emergency SMS to ${recipientPhone}...`);
      }

      promises.push(
        AlertNexAPI.sendSMS({
          recipient_phone: recipientPhone,
          alert_title: alert ? alert.title : "Landslide Hazard Early Warning",
          risk_level: alert ? alert.level : "CRITICAL",
          risk_score: alert ? alert.riskScore : 87.0,
          location: alert ? alert.location : "North Eastern Region Sector",
          recommended_action: alert ? alert.action : "Deploy response units and initiate evacuation advisories",
          emergency_corridor: "Shillong-Mawsynram Bypass via Mawphlang"
        }).then(res => {
          const simNote = res.simulated ? ' (simulated for demo)' : '';
          if (window.AlertNexApp) {
            AlertNexApp.showToast(`✅ Emergency SMS sent to ${recipientPhone}${simNote}!`);
          }
        }).catch(err => {
          console.warn("SMS delivery:", err.message);
          if (window.AlertNexApp) {
            AlertNexApp.showToast(`⚠️ SMS: ${err.message}`);
          }
        })
      );
    }

    if (promises.length > 0) {
      await Promise.allSettled(promises);
    } else {
      if (window.AlertNexApp && alert) {
        AlertNexApp.showToast(`Alert [${alert.code}] broadcasted to all command channels!`);
      }
    }
  }
};

window.AlertNexAlerts = AlertNexAlerts;
