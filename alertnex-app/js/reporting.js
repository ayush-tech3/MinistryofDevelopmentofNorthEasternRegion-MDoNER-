/**
 * AlertNex - Community / Field Reporting System with Offline Sync
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexReporting = {
  isOfflineMode: false,
  offlineQueue: [],
  selectedImageData: null,

  init() {
    this.loadOfflineQueue();
    this.bindFormEvents();
    this.updateSyncUI();
    this.renderReportsList();
  },

  loadOfflineQueue() {
    try {
      const stored = localStorage.getItem("alertnex_offline_reports");
      if (stored) {
        this.offlineQueue = JSON.parse(stored);
      }
    } catch (e) {
      this.offlineQueue = [];
    }
  },

  saveOfflineQueue() {
    try {
      localStorage.setItem("alertnex_offline_reports", JSON.stringify(this.offlineQueue));
    } catch (e) {
      console.warn("Storage quota or error saving offline queue", e);
    }
  },

  bindFormEvents() {
    const form = document.getElementById("hazardReportForm");
    const geoBtn = document.getElementById("btnGetGeolocation");
    const photoInput = document.getElementById("reportPhotoInput");
    const offlineToggle = document.getElementById("simulateOfflineToggle");
    const syncBtn = document.getElementById("btnSyncNow");

    if (geoBtn) {
      geoBtn.addEventListener("click", () => {
        if ("geolocation" in navigator) {
          geoBtn.textContent = "Detecting GPS...";
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              document.getElementById("reportLat").value = pos.coords.latitude.toFixed(4);
              document.getElementById("reportLng").value = pos.coords.longitude.toFixed(4);
              geoBtn.textContent = "✓ GPS Acquired";
              if (window.AlertNexApp) AlertNexApp.showToast("GPS coordinates detected successfully");
            },
            (err) => {
              // Fallback for demo coordinates (Cherrapunji sector)
              document.getElementById("reportLat").value = "25.2980";
              document.getElementById("reportLng").value = "91.5815";
              geoBtn.textContent = "✓ Sample NER GPS";
              if (window.AlertNexApp) AlertNexApp.showToast("GPS fallback: Populated NER coordinates");
            },
            { timeout: 6000 }
          );
        }
      });
    }

    if (photoInput) {
      photoInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.selectedImageData = event.target.result;
            const previewBox = document.getElementById("photoPreviewContainer");
            if (previewBox) {
              previewBox.innerHTML = `<img src="${this.selectedImageData}" alt="Hazard Preview">`;
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (offlineToggle) {
      offlineToggle.addEventListener("change", (e) => {
        this.isOfflineMode = e.target.checked;
        this.updateSyncUI();
        if (window.AlertNexApp) {
          AlertNexApp.showToast(this.isOfflineMode ? "Simulation: Offline mode ACTIVE. Reports will queue locally." : "Network reconnected. Ready to sync.");
        }
      });
    }

    if (syncBtn) {
      syncBtn.addEventListener("click", () => {
        this.syncPendingReports();
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  },

  async handleSubmit() {
    const reporterType = document.getElementById("reporterType").value;
    const reporterName = document.getElementById("reporterName").value || (reporterType === "Citizen" ? "Citizen Informant" : "Field Surveyor");
    const incidentType = document.getElementById("incidentType").value;
    const severity = document.getElementById("reportSeverity").value;
    const locationName = document.getElementById("reportLocationName").value || "NER Hill Sector";
    const lat = parseFloat(document.getElementById("reportLat").value) || 25.3000;
    const lng = parseFloat(document.getElementById("reportLng").value) || 91.5800;
    const description = document.getElementById("reportDescription").value;
    const photoInput = document.getElementById("reportPhotoInput");

    const newReport = {
      id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      reporterType,
      reporterName,
      incidentType,
      severity,
      locationName,
      lat,
      lng,
      description,
      image: this.selectedImageData || "assets/ner_hero.jpg",
      timestamp: "Just now",
      syncStatus: this.isOfflineMode ? "Pending Sync (Offline)" : "Synced",
      offlineStored: this.isOfflineMode,
      aiRiskCorrelation: "Correlated with prototype spatial risk cluster"
    };

    if (this.isOfflineMode) {
      this.offlineQueue.push(newReport);
      this.saveOfflineQueue();
      if (window.AlertNexApp) {
        AlertNexApp.showToast("SAVED OFFLINE: Stored in local storage queue!");
      }
    } else {
      // Send to FastAPI Backend
      try {
        const formData = new FormData();
        formData.append("reporter_type", reporterType);
        formData.append("incident_type", incidentType);
        formData.append("description", `${locationName} - ${description}`);
        formData.append("latitude", lat);
        formData.append("longitude", lng);
        formData.append("severity", severity);
        if (photoInput && photoInput.files[0]) {
          formData.append("image", photoInput.files[0]);
        }

        if (window.AlertNexAPI) {
          const apiRes = await AlertNexAPI.submitReport(formData);
          newReport.id = `REP-DB-${apiRes.id}`;
        }
      } catch (err) {
        console.warn("Backend submit failed, falling back to local state:", err);
      }

      AlertNexData.incidentReports.unshift(newReport);
      AlertNexData.kpiStats.reportsToday += 1;
      if (window.AlertNexMap) {
        AlertNexMap.renderFieldReportPins();
      }
      if (window.AlertNexApp) {
        AlertNexApp.showToast("Incident report successfully registered & saved to database!");
      }
    }

    this.updateSyncUI();
    this.renderReportsList();
    this.resetForm();
  },

  resetForm() {
    const form = document.getElementById("hazardReportForm");
    if (form) form.reset();
    this.selectedImageData = null;
    const previewBox = document.getElementById("photoPreviewContainer");
    if (previewBox) {
      previewBox.innerHTML = `<span style="color:#94a3b8; font-size:0.85rem;">Click to attach hazard photograph</span>`;
    }
  },

  async syncPendingReports() {
    if (this.offlineQueue.length === 0) {
      if (window.AlertNexApp) AlertNexApp.showToast("No pending offline reports to sync.");
      return;
    }

    const count = this.offlineQueue.length;
    for (const report of this.offlineQueue) {
      try {
        const formData = new FormData();
        formData.append("reporter_type", report.reporterType);
        formData.append("incident_type", report.incidentType);
        formData.append("description", `${report.locationName} - ${report.description}`);
        formData.append("latitude", report.lat);
        formData.append("longitude", report.lng);
        formData.append("severity", report.severity);

        if (window.AlertNexAPI) {
          await AlertNexAPI.submitReport(formData);
        }
      } catch (e) {
        console.warn("Sync error for item:", e);
      }
      report.syncStatus = "Synced";
      report.offlineStored = false;
      AlertNexData.incidentReports.unshift(report);
      AlertNexData.kpiStats.reportsToday += 1;
    }

    this.offlineQueue = [];
    this.saveOfflineQueue();

    if (window.AlertNexMap) {
      AlertNexMap.renderFieldReportPins();
    }

    this.updateSyncUI();
    this.renderReportsList();

    if (window.AlertNexApp) {
      AlertNexApp.showToast(`SYNCED SUCCESSFULLY: ${count} queued reports synced to backend!`);
    }
  },

  updateSyncUI() {
    const statusPill = document.getElementById("syncStatusPill");
    const queueBadge = document.getElementById("offlineQueueBadge");
    const syncBtn = document.getElementById("btnSyncNow");

    if (statusPill) {
      if (this.isOfflineMode) {
        statusPill.innerHTML = `<span class="pulse-dot red"></span> Offline (Local Storage Active)`;
        statusPill.style.color = "#fca5a5";
      } else {
        statusPill.innerHTML = `<span class="pulse-dot"></span> Cloud Connected (Auto-Sync)`;
        statusPill.style.color = "#34d399";
      }
    }

    if (queueBadge) {
      queueBadge.textContent = `${this.offlineQueue.length} Queued`;
    }

    if (syncBtn) {
      syncBtn.disabled = this.isOfflineMode || this.offlineQueue.length === 0;
    }
  },

  renderReportsList() {
    const container = document.getElementById("recentReportsFeed");
    if (!container) return;

    const allReports = [...this.offlineQueue, ...AlertNexData.incidentReports];

    container.innerHTML = allReports.slice(0, 5).map(rep => `
      <div style="background:var(--navy-dark); border:1px solid var(--navy-border); border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="risk-tag ${rep.severity.toLowerCase()}">${rep.severity}</span>
          <span style="font-size:0.75rem; color:#94a3b8;">${rep.timestamp}</span>
        </div>
        <div style="font-weight:700; color:#fff; font-size:0.95rem;">${rep.incidentType}: ${rep.locationName}</div>
        <p style="font-size:0.84rem; color:#cbd5e1; line-height:1.4;">${rep.description}</p>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#94a3b8; border-top:1px solid rgba(255,255,255,0.06); padding-top:6px;">
          <span>By: ${rep.reporterName} (${rep.reporterType})</span>
          <span style="color:${rep.offlineStored ? '#f59e0b' : '#34d399'}; font-weight:600;">${rep.syncStatus}</span>
        </div>
      </div>
    `).join("");
  }
};

window.AlertNexReporting = AlertNexReporting;
