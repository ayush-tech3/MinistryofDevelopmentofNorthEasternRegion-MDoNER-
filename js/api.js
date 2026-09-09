/**
 * AlertNex - REST API Client
 * Connects frontend to FastAPI Backend (Local or Cloud Render)
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexAPI = {
  isLocal: (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"),
  cloudBackendUrl: "https://alertnex-backend.onrender.com",

  get baseUrl() {
    const custom = localStorage.getItem("alertnex_api_url");
    if (custom) return custom.endsWith("/api") ? custom : `${custom}/api`;
    if (this.isLocal) return "http://127.0.0.1:8000/api";
    return `${this.cloudBackendUrl}/api`;
  },

  get healthUrl() {
    const custom = localStorage.getItem("alertnex_api_url");
    if (custom) return custom.replace(/\/api$/, "") + "/health";
    if (this.isLocal) return "http://127.0.0.1:8000/health";
    return `${this.cloudBackendUrl}/health`;
  },

  async checkBackendHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(this.healthUrl, { method: "GET", signal: controller.signal });
      clearTimeout(timeoutId);
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  async getZones() {
    try {
      const res = await fetch(`${this.baseUrl}/zones`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn("API getZones failed, using fallback data:", e.message);
      return AlertNexData.monitoringZones;
    }
  },

  async getZoneRiskAnalysis(zoneId) {
    try {
      const res = await fetch(`${this.baseUrl}/risk/${zoneId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`API getZoneRiskAnalysis(${zoneId}) failed, computing fallback:`, e.message);
      return null;
    }
  },

  async calculateRiskManually(params) {
    try {
      const res = await fetch(`${this.baseUrl}/risk/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn("API calculateRiskManually failed, using local engine:", e.message);
      return null;
    }
  },

  async getConnectivity(zoneId) {
    try {
      const res = await fetch(`${this.baseUrl}/connectivity/${zoneId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`API getConnectivity(${zoneId}) failed:`, e.message);
      return null;
    }
  },

  async getAlerts() {
    try {
      const res = await fetch(`${this.baseUrl}/alerts`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn("API getAlerts failed, using fallback:", e.message);
      return AlertNexData.alerts;
    }
  },

  async acknowledgeAlert(alertId) {
    try {
      const res = await fetch(`${this.baseUrl}/alerts/${alertId}/acknowledge`, {
        method: "PUT"
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`API acknowledgeAlert(${alertId}) failed:`, e.message);
      return null;
    }
  },

  async getReports() {
    try {
      const res = await fetch(`${this.baseUrl}/reports`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn("API getReports failed, using fallback:", e.message);
      return AlertNexData.incidentReports;
    }
  },

  async submitReport(formData) {
    try {
      const res = await fetch(`${this.baseUrl}/reports`, {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn("API submitReport failed, saving offline:", e.message);
      throw e;
    }
  },

  async sendRealEmail(payload) {
    const res = await fetch(`${this.baseUrl}/alerts/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || data.error || `HTTP ${res.status}`);
    }
    return data;
  },

  async sendSMS(payload) {
    const res = await fetch(`${this.baseUrl}/alerts/send-sms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || data.error || `HTTP ${res.status}`);
    }
    return data;
  }
};

window.AlertNexAPI = AlertNexAPI;
