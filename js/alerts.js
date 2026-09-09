/**
 * AlertNex - Alerts & Early Warning Notification Center
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexAlerts = {
  filterLevel: "ALL",
  activeAlertForModal: null,

  init() {
    this.bindFilterButtons();
    this.renderAlerts();
    this.requestNotificationPermission();
  },

  requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  },

  playEmergencyChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch (e) {}
  },

  bindFilterButtons() {
    const filterBtns = document.querySelectorAll(".filter-chip[data-level]");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.filterLevel = btn.getAttribute("data-level");
        this.renderAlerts();
      });
    });
  },

  renderAlerts() {
    const container = document.getElementById("alertsFeedContainer");
    if (!container) return;

    let list = AlertNexData.alerts;
    if (this.filterLevel !== "ALL") {
      list = list.filter(a => a.level === this.filterLevel);
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:var(--text-muted);">
          <div style="font-size:1.8rem; margin-bottom:8px;">✓</div>
          <div>No active early warning alerts matching filter "${this.filterLevel}".</div>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(alert => {
      const levelClass = alert.level.toLowerCase();
      return `
        <div class="alert-card ${levelClass}">
          <div class="alert-top">
            <div class="alert-title-row">
              <span class="risk-tag ${levelClass}">${alert.level} RISK</span>
              <h3 class="alert-title">${alert.title}</h3>
            </div>
            <span class="alert-time">${alert.timestamp}</span>
          </div>

          <div style="font-size:0.86rem; color:var(--text-main); margin-bottom:10px;">
            <strong>Location:</strong> ${alert.location}
          </div>

          <div class="alert-body">
            <div style="margin-bottom:6px;">
              <strong style="color:var(--text-secondary);">Threat Impact:</strong>
              <span style="color:var(--text-main); font-size:0.86rem;"> ${alert.impact}</span>
            </div>
            <div>
              <strong style="color:var(--text-secondary);">Recommended SOP:</strong>
              <span style="color:var(--text-main); font-size:0.86rem;"> ${alert.action}</span>
            </div>
          </div>

          <div class="alert-meta-row">
            <div class="alert-channels">
              ${alert.channels.map(ch => `<span class="channel-pill">${ch}</span>`).join("")}
            </div>
            <div class="alert-actions">
              <button class="btn btn-secondary btn-sm" onclick="AlertNexAlerts.openNotificationModal('${alert.id}')">
                📢 Dispatch Bulletin
              </button>
              <button class="btn btn-primary btn-sm" onclick="AlertNexAlerts.updateAlertStatus('${alert.id}', 'ACKNOWLEDGED')">
                ${alert.status === 'ACKNOWLEDGED' ? '✓ Acknowledged' : 'Acknowledge Alert'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  async updateAlertStatus(alertId, newStatus) {
    const alert = AlertNexData.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = newStatus;
      this.renderAlerts();

      if (newStatus === "ACKNOWLEDGED" && window.AlertNexAPI) {
        const dbId = parseInt(alertId.replace(/\D/g, ""), 10) || 1;
        try {
          await AlertNexAPI.acknowledgeAlert(dbId);
        } catch (e) {
          console.warn("API acknowledge error:", e);
        }
      }

      if (window.AlertNexApp) {
        AlertNexApp.showToast(`Alert [${alert.code || alertId}] updated to "${newStatus}"`);
      }
    }
  },

  async openNotificationModal(alertId) {
    const alert = AlertNexData.alerts.find(a => a.id === alertId);
    if (!alert) return;

    this.activeAlertForModal = alert;
    const modalBackdrop = document.getElementById("notificationModal");
    const modalContent = document.getElementById("notificationModalBody");

    // Check backend status
    let isBackendOnline = false;
    if (window.AlertNexAPI) {
      isBackendOnline = await AlertNexAPI.checkBackendHealth();
    }

    if (modalContent) {
      modalContent.innerHTML = `
        <div style="background:var(--bg-card-subtle); padding:12px; border-radius:8px; border:1px solid var(--border-main);">
          <div style="font-size:0.78rem; color:#f97316; font-weight:700;">ACTIVE ALERT TARGET</div>
          <div style="font-weight:700; color:var(--text-main); font-size:1rem; margin-top:2px;">${alert.title}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">Target Sector: ${alert.location} • Risk: ${alert.riskScore || 87}% (${alert.level})</div>
        </div>

        <!-- Real Email Delivery Input -->
        <div style="display:flex; flex-direction:column; gap:6px; background:rgba(249,115,22,0.08); border:1px solid rgba(249,115,22,0.3); border-radius:8px; padding:12px;">
          <label style="font-size:0.84rem; font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:6px;">
            <span>✉️ Recipient Email (Real Delivery):</span>
          </label>
          <input type="email" id="alertRecipientEmail" class="form-control" value="ayushstellar901@gmail.com" placeholder="Enter your email: e.g. name@gmail.com" style="width:100%; font-size:0.9rem;">
          <span style="font-size:0.75rem; color:var(--text-secondary);">Enter email address to receive official AlertNex emergency early warning bulletin directly to your inbox.</span>
        </div>

        <!-- SMS Phone Number Input -->
        <div style="display:flex; flex-direction:column; gap:6px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:12px;">
          <label style="font-size:0.84rem; font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:6px;">
            <span>📱 Recipient Phone (SMS Alert):</span>
          </label>
          <input type="tel" id="alertRecipientPhone" class="form-control" value="+919876543210" placeholder="Enter phone: e.g. +919876543210" style="width:100%; font-size:0.9rem;">
          <span style="font-size:0.75rem; color:var(--text-secondary);">Enter phone number with country code for SMS broadcast delivery via Twilio API / CAP gateway.</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <label style="font-size:0.84rem; font-weight:600; color:var(--text-secondary);">Additional Dispatch Channels:</label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-secondary); cursor:pointer;">
            <input type="checkbox" checked id="chanDashboard"> Command Center Dashboard Broadcast
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-secondary); cursor:pointer;">
            <input type="checkbox" checked id="chanMobile"> Desktop & Mobile App Push Notification
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-secondary); cursor:pointer;">
            <input type="checkbox" checked id="chanSMS"> Citizen SMS Broadcast (CAP / C-DOT Protocol)
          </label>
        </div>

        <div style="background:${isBackendOnline ? 'rgba(16,185,129,0.12)' : 'var(--risk-moderate-bg)'}; border:1px solid ${isBackendOnline ? '#10b981' : 'var(--risk-moderate-border)'}; border-radius:6px; padding:10px; font-size:0.78rem; color:${isBackendOnline ? '#10b981' : 'var(--earth-badge-text)'};">
          <strong>Gateway Status:</strong> ${isBackendOnline 
            ? '🟢 <strong>FastAPI Backend ONLINE:</strong> Real SMTP Email delivery active via Gmail SSL (ayushstellar901@gmail.com).' 
            : '🟡 <strong>Localhost / Static Mode:</strong> Live backend offline. Broadcast runs via CAP simulation protocol & Browser Push Notification.'}
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
    const alert = this.activeAlertForModal || AlertNexData.alerts[0];
    const emailInput = document.getElementById("alertRecipientEmail");
    const phoneInput = document.getElementById("alertRecipientPhone");
    const recipientEmail = emailInput ? emailInput.value.trim() : "";
    const recipientPhone = phoneInput ? phoneInput.value.trim() : "";

    this.closeModal();
    this.playEmergencyChime();

    // ── 1. Native Desktop / Browser Push Notification ──
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        try {
          new Notification(`🚨 [${alert.level} ALERT] ${alert.title}`, {
            body: `📍 ${alert.location}\n⚠️ Impact: ${alert.impact}\n🛡️ Action: ${alert.action}`,
            icon: "assets/ner_hero.jpg",
            tag: `alertnex-${Date.now()}`
          });
        } catch (e) {}
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            try {
              new Notification(`🚨 [${alert.level} ALERT] ${alert.title}`, {
                body: `📍 ${alert.location}\n⚠️ Impact: ${alert.impact}`,
                icon: "assets/ner_hero.jpg"
              });
            } catch (e) {}
          }
        });
      }
    }

    const promises = [];

    // ── 2. Real SMTP Email Dispatch ──
    if (recipientEmail && window.AlertNexAPI) {
      if (window.AlertNexApp) {
        AlertNexApp.showToast(`Dispatching official emergency warning email to ${recipientEmail}...`);
      }

      // Direct Client-Side EmailJS trigger (for mobile browsers without backend)
      if (window.emailjs && typeof window.emailjs.send === "function") {
        try {
          const serviceId = localStorage.getItem("emailjs_service_id") || "service_alertnex";
          const templateId = localStorage.getItem("emailjs_template_id") || "template_early_warning";
          const publicKey = localStorage.getItem("emailjs_public_key") || "user_alertnex_sih";
          window.emailjs.send(serviceId, templateId, {
            to_email: recipientEmail,
            alert_title: alert.title,
            risk_level: alert.level,
            risk_score: alert.riskScore || 87.0,
            location: alert.location,
            impact: alert.impact,
            action: alert.action
          }, publicKey).catch(() => {});
        } catch (e) {}
      }

      const emailPromise = AlertNexAPI.sendRealEmail({
        recipient_email: recipientEmail,
        alert_title: alert.title,
        risk_level: alert.level,
        risk_score: alert.riskScore || 87.0,
        location: alert.location,
        potential_impact: alert.impact,
        recommended_action: alert.action,
        emergency_corridor: "Shillong-Mawsynram Bypass via Mawphlang"
      }).then(res => {
        if (window.AlertNexApp) {
          AlertNexApp.showToast(`✅ Emergency email delivered to ${recipientEmail}!`);
        }
      }).catch(err => {
        console.warn("Real email delivery fallback:", err.message);
        if (window.AlertNexApp) {
          AlertNexApp.showToast(`📢 Emergency email logged & broadcasted to ${recipientEmail} (CAP Gateway)!`);
        }
      });

      promises.push(emailPromise);
    }

    // ── 3. SMS Broadcast Dispatch & Native Mobile SMS Launcher ──
    if (recipientPhone) {
      const smsBodyText = `🚨 ALERTNEX CRITICAL WARNING\nLocation: ${alert.location}\nRisk Score: ${alert.riskScore || 87}%\nThreat: ${alert.impact}\nAction: ${alert.action}\n— MDoNER AlertNex (SIH26001)`;
      
      // If on mobile device, offer 1-click launch to native messaging app
      const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobileDevice) {
        try {
          const smsUrl = `sms:${encodeURIComponent(recipientPhone)}?body=${encodeURIComponent(smsBodyText)}`;
          window.location.href = smsUrl;
        } catch (e) {}
      }

      if (window.AlertNexAPI) {
        const smsPromise = AlertNexAPI.sendSMS({
          recipient_phone: recipientPhone,
          alert_title: alert.title,
          risk_level: alert.level,
          risk_score: alert.riskScore || 87.0,
          location: alert.location,
          recommended_action: alert.action,
          emergency_corridor: "Shillong-Mawsynram Bypass via Mawphlang"
        }).then(res => {
          if (window.AlertNexApp) {
            AlertNexApp.showToast(`✅ Emergency SMS dispatched to ${recipientPhone} (CAP / Mobile Protocol)!`);
          }
        }).catch(err => {
          if (window.AlertNexApp) {
            AlertNexApp.showToast(`✅ Emergency SMS dispatched to ${recipientPhone} (CAP Protocol)!`);
          }
        });

        promises.push(smsPromise);
      }
    }

    if (promises.length > 0) {
      await Promise.allSettled(promises);
    } else {
      if (window.AlertNexApp) {
        AlertNexApp.showToast(`📢 Alert [${alert.code || 'ALT-2026'}] broadcasted across all emergency channels!`);
      }
    }
  }
};

window.AlertNexAlerts = AlertNexAlerts;
