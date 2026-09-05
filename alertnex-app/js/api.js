/**
 * AlertNex - REST API Client
 * Connects frontend to FastAPI Backend
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 *
 * When running locally (localhost / 127.0.0.1), API calls target http://127.0.0.1:8000/api.
 * When deployed on Netlify (or any other host), the backend is not available —
 * all API methods gracefully fall back to local demo data in data.js.
 */

const AlertNexAPI = {
  isLocal: (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"),

  get baseUrl() {
    return this.isLocal ? "http://127.0.0.1:8000/api" : "/api";
  },

  async checkBackendHealth() {
    // On production (Netlify), backend is not co-hosted — skip health check
    if (!this.isLocal) return false;
    try {
      const res = await fetch("http://127.0.0.1:8000/health", { method: "GET" });
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
        body: formData // Form data with multipart file
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
