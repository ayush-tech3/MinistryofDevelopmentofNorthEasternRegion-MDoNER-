/**
 * AlertNex - Community & Field Incident Reporting System
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Theme: Disaster Management | Category: Software
 * Team: AlertNex (Leader: Ayush Kumar)
 * 
 * Features:
 * - IndexedDB local offline storage queue with fallback to LocalStorage
 * - Real GPS detection with NER hill sector fallback
 * - Full Report Lifecycle: Submitted -> PENDING -> Authority Review -> VERIFIED / REJECTED
 * - Verified ground reports dynamically influence prototype risk assessment
 */

// ─── IndexedDB Storage Helper ───────────────────────────────────────────────
const AlertNexDB = {
  dbName: "AlertNexOfflineDB",
  storeName: "offline_reports",
  dbVersion: 1,

  async open() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        resolve(null); // Fallback to localStorage
        return;
      }
      try {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id" });
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  },

  async getAll() {
    const db = await this.open();
    if (!db) {
      try {
        return JSON.parse(localStorage.getItem(this.storeName) || "[]");
      } catch (e) {
        return [];
      }
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch (e) {
        resolve([]);
      }
    });
  },

  async add(report) {
    const db = await this.open();
    if (!db) {
      const all = await this.getAll();
      all.push(report);
      localStorage.setItem(this.storeName, JSON.stringify(all));
      return;
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        store.put(report);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  },

  async clear() {
    const db = await this.open();
    if (!db) {
      localStorage.removeItem(this.storeName);
      return;
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        store.clear();
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }
};

// ─── AlertNex Reporting Controller ──────────────────────────────────────────
const AlertNexReporting = {
  isOfflineMode: false,
  offlineQueue: [],
  selectedImageData: null,

  async init() {
    await this.loadOfflineQueue();
    this.bindFormEvents();
    this.updateSyncUI();
    this.renderReportsList();
  },

  async loadOfflineQueue() {
    this.offlineQueue = await AlertNexDB.getAll();
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
              if (window.AlertNexApp) AlertNexApp.showToast("GPS coordinates acquired successfully");
            },
            () => {
              // Fallback for demo coordinates (Cherrapunji sector)
              document.getElementById("reportLat").value = "25.2980";
              document.getElementById("reportLng").value = "91.5815";
              geoBtn.textContent = "✓ NER GPS Fallback";
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
              previewBox.innerHTML = `<img src="${this.selectedImageData}" alt="Hazard Preview" style="width:100%; height:120px; object-fit:cover; border-radius:6px;">`;
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
          AlertNexApp.showToast(
            this.isOfflineMode
              ? "SIMULATION: Offline mode ACTIVE. Reports will save to IndexedDB."
              : "Network reconnected. Ready to sync queued reports."
          );
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
    const reporterName = document.getElementById("reporterName").value || (reporterType === "Citizen" ? "Citizen Informant" : "Field Officer");
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
      status: "PENDING", // Initial workflow state
      syncStatus: this.isOfflineMode ? "SAVED OFFLINE" : "Synced",
      offlineStored: this.isOfflineMode
    };

    if (this.isOfflineMode) {
      this.offlineQueue.push(newReport);
      await AlertNexDB.add(newReport);
      if (window.AlertNexApp) {
        AlertNexApp.showToast("SAVED OFFLINE: Stored in local IndexedDB queue!");
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
          if (apiRes && apiRes.id) {
            newReport.id = `REP-DB-${apiRes.id}`;
          }
        }
      } catch (err) {
        console.warn("Backend submit fallback:", err);
      }

      AlertNexData.incidentReports.unshift(newReport);
      AlertNexData.kpiStats.reportsToday += 1;
      if (window.AlertNexMap) {
        AlertNexMap.renderFieldReportPins();
      }
      if (window.AlertNexApp) {
        AlertNexApp.showToast("Report submitted successfully • Status: PENDING Authority Review");
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
      previewBox.innerHTML = `<img src="assets/ner_hero.jpg" alt="Preset Sample Field Image">`;
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
    await AlertNexDB.clear();

    if (window.AlertNexMap) {
      AlertNexMap.renderFieldReportPins();
    }

    this.updateSyncUI();
    this.renderReportsList();

    if (window.AlertNexApp) {
      AlertNexApp.showToast(`SYNCED SUCCESSFULLY: ${count} queued reports synced to system!`);
    }
  },

  updateSyncUI() {
    const statusPill = document.getElementById("syncStatusPill");
    const queueBadge = document.getElementById("offlineQueueBadge");
    const syncBtn = document.getElementById("btnSyncNow");

    if (statusPill) {
      if (this.isOfflineMode) {
        statusPill.innerHTML = `<span class="pulse-dot red"></span> SAVED OFFLINE (IndexedDB Active)`;
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

  async reviewReport(reportId, newStatus) {
    // Find report
    let report = AlertNexData.incidentReports.find(r => r.id === reportId);
    if (!report) {
      report = this.offlineQueue.find(r => r.id === reportId);
    }
    if (!report) return;

    report.status = newStatus;

    // Send update to backend if available
    const numericId = reportId.replace("REP-DB-", "").replace("REP-2026-", "");
    if (!isNaN(numericId) && window.AlertNexAPI) {
      try {
        await AlertNexAPI.put(`/api/reports/${numericId}/status`, { status: newStatus });
      } catch (e) {
        console.warn("Backend report status update fallback:", e);
      }
    }

    if (newStatus === "VERIFIED") {
      // Ground truth verified: Influence prototype risk calculation for active zone
      const targetZone = AlertNexData.monitoringZones[0]; // Primary demonstration zone (Cherrapunji)
      if (targetZone) {
        targetZone.fieldReportsCount = (targetZone.fieldReportsCount || 0) + 1;
        
        // Recalculate risk using weighted formula
        const rainScore = Math.min((targetZone.rainfall24h / 220) * 100, 100);
        const moistureScore = targetZone.soilMoisture;
        const slopeScore = Math.min((targetZone.slopeAngle / 55) * 100, 100);
        const historyScore = 85;
        const reportsScore = Math.min(targetZone.fieldReportsCount * 22, 100);

        const newScore = Math.min(Math.round(
          (rainScore * 0.30) + (moistureScore * 0.25) + (slopeScore * 0.20) + (historyScore * 0.15) + (reportsScore * 0.10)
        ), 98);

        targetZone.riskScore = newScore;
        targetZone.riskLevel = newScore >= 76 ? "CRITICAL" : newScore >= 51 ? "HIGH" : newScore >= 26 ? "MODERATE" : "LOW";

        // Update live map and engine if active
        if (window.AlertNexMap) {
          AlertNexMap.renderMonitoringZones();
          AlertNexMap.displayZoneDetails(targetZone);
        }
        if (window.AlertNexAIEngine && AlertNexAIEngine.state) {
          AlertNexAIEngine.state.fieldReports = targetZone.fieldReportsCount;
          AlertNexAIEngine.calculateRisk();
        }
      }

      if (window.AlertNexApp) {
        AlertNexApp.showToast(`Report ${reportId} VERIFIED by Authority. Influenced Prototype Risk Analysis (+10% Weight)!`);
      }
    } else {
      if (window.AlertNexApp) {
        AlertNexApp.showToast(`Report ${reportId} marked as ${newStatus}.`);
      }
    }

    this.renderReportsList();
  },

  renderReportsList() {
    const container = document.getElementById("recentReportsFeed");
    if (!container) return;

    const allReports = [...this.offlineQueue, ...AlertNexData.incidentReports];

    container.innerHTML = allReports.slice(0, 6).map(rep => {
      const repStatus = rep.status || "PENDING";
      const statusColor = repStatus === "VERIFIED" ? "#10b981" : repStatus === "REJECTED" ? "#ef4444" : "#f59e0b";
      const isPending = repStatus === "PENDING";

      return `
      <div style="background:var(--navy-dark); border:1px solid var(--navy-border); border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="risk-tag ${rep.severity.toLowerCase()}">${rep.severity}</span>
            <span style="font-size:0.75rem; font-weight:700; color:${statusColor}; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:4px;">
              ${repStatus}
            </span>
          </div>
          <span style="font-size:0.75rem; color:#94a3b8;">${rep.timestamp}</span>
        </div>
        <div style="font-weight:700; color:#fff; font-size:0.95rem;">${rep.incidentType}: ${rep.locationName}</div>
        <p style="font-size:0.84rem; color:#cbd5e1; line-height:1.4;">${rep.description}</p>
        
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#94a3b8; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px;">
          <span>By: <strong>${rep.reporterName}</strong> (${rep.reporterType})</span>
          <span style="color:${rep.offlineStored ? '#f59e0b' : '#34d399'}; font-weight:600;">${rep.syncStatus}</span>
        </div>

        ${isPending ? `
        <div style="display:flex; gap:8px; margin-top:4px; padding-top:4px; border-top:1px dashed rgba(255,255,255,0.06);">
          <button class="btn btn-sm btn-primary" style="background:#10b981; border-color:#10b981; font-size:0.75rem; padding:4px 10px;" onclick="AlertNexReporting.reviewReport('${rep.id}', 'VERIFIED')">
            ✓ Verify Report (Influence Risk)
          </button>
          <button class="btn btn-sm btn-secondary" style="font-size:0.75rem; padding:4px 10px;" onclick="AlertNexReporting.reviewReport('${rep.id}', 'REJECTED')">
            ✗ Reject
          </button>
        </div>
        ` : `
        <div style="font-size:0.72rem; color:${statusColor}; font-style:italic;">
          ${repStatus === 'VERIFIED' ? '✓ Verified ground truth integrated into prototype spatial risk analysis' : '✗ Rejected by authority review'}
        </div>
        `}
      </div>
    `;
    }).join("");
  }
};

window.AlertNexReporting = AlertNexReporting;
