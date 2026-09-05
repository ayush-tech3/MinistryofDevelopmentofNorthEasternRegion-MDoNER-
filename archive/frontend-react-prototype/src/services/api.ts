import {
  MonitoringZone,
  IncidentReport,
  Alert,
  RiskExplanation,
  ConnectivityImpact
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const api = {
  async getZones(): Promise<MonitoringZone[]> {
    const res = await fetch(`${API_BASE_URL}/zones`);
    if (!res.ok) throw new Error(`Error fetching zones: ${res.statusText}`);
    return res.json();
  },

  async getZone(id: number): Promise<MonitoringZone> {
    const res = await fetch(`${API_BASE_URL}/zones/${id}`);
    if (!res.ok) throw new Error(`Error fetching zone ${id}: ${res.statusText}`);
    return res.json();
  },

  async getRiskAnalysis(zoneId: number): Promise<RiskExplanation> {
    const res = await fetch(`${API_BASE_URL}/risk/${zoneId}`);
    if (!res.ok) throw new Error(`Error fetching risk analysis: ${res.statusText}`);
    return res.json();
  },

  async calculateRisk(input: {
    rainfall: number;
    soil_moisture: number;
    slope: number;
    historical_activity: number;
    recent_reports: number;
  }): Promise<RiskExplanation> {
    const res = await fetch(`${API_BASE_URL}/risk/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error(`Error calculating risk: ${res.statusText}`);
    return res.json();
  },

  async getConnectivity(zoneId: number): Promise<ConnectivityImpact> {
    const res = await fetch(`${API_BASE_URL}/connectivity/${zoneId}`);
    if (!res.ok) throw new Error(`Error fetching connectivity: ${res.statusText}`);
    return res.json();
  },

  async getAlerts(statusFilter?: string): Promise<Alert[]> {
    const url = statusFilter ? `${API_BASE_URL}/alerts?status_filter=${statusFilter}` : `${API_BASE_URL}/alerts`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error fetching alerts: ${res.statusText}`);
    return res.json();
  },

  async acknowledgeAlert(id: number): Promise<Alert> {
    const res = await fetch(`${API_BASE_URL}/alerts/${id}/acknowledge`, {
      method: 'PUT'
    });
    if (!res.ok) throw new Error(`Error acknowledging alert: ${res.statusText}`);
    return res.json();
  },

  async getReports(): Promise<IncidentReport[]> {
    const res = await fetch(`${API_BASE_URL}/reports`);
    if (!res.ok) throw new Error(`Error fetching reports: ${res.statusText}`);
    return res.json();
  },

  async submitReport(formData: FormData): Promise<IncidentReport> {
    const res = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error(`Error submitting report: ${res.statusText}`);
    return res.json();
  }
};
