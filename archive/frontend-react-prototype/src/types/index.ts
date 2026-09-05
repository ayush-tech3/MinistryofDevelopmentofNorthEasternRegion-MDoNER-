export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface MonitoringZone {
  id: number;
  name: str;
  region: string;
  district: string;
  latitude: number;
  longitude: number;
  geometry?: string;
  rainfall: number;
  soil_moisture: number;
  slope: number;
  historical_activity: number;
  recent_reports: number;
  risk_score: number;
  risk_level: RiskLevel;
  last_updated: string;
}

export interface IncidentReport {
  id: number;
  reporter_type: 'Citizen' | 'Field Officer' | 'Authority';
  incident_type: string;
  description: string;
  latitude: number;
  longitude: number;
  geometry?: string;
  severity: RiskLevel;
  image_path?: string;
  status: 'PENDING' | 'VERIFIED' | 'INVESTIGATING' | 'RESOLVED';
  created_at: string;
  synced: boolean;
}

export interface Alert {
  id: number;
  zone_id?: number;
  risk_level: RiskLevel;
  risk_score: number;
  message: string;
  recommended_action: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'UNDER REVIEW' | 'RESOLVED';
  created_at: string;
}

export interface ContributingFactor {
  factor: string;
  impact: 'HIGH' | 'MODERATE' | 'LOW';
  score: number;
  weight: string;
}

export interface RiskExplanation {
  risk_score: number;
  risk_level: RiskLevel;
  model_type: string;
  contributing_factors: ContributingFactor[];
  recommendation: string;
}

export interface RoadImpact {
  road_name: string;
  status: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  mitigation_measure: string;
}

export interface VillageImpact {
  village_name: string;
  population: number;
  isolation_risk: RiskLevel;
  primary_access_road: string;
  alternate_access: string;
}

export interface AlternativeRoute {
  corridor_name: string;
  status: string;
  distance_differential: string;
  priority: string;
  recommendation_note: string;
}

export interface ConnectivityImpact {
  zone_id: number;
  zone_name: string;
  zone_risk_level: RiskLevel;
  overall_road_status: string;
  affected_villages_count: number;
  hospital_accessibility_status: string;
  roads: RoadImpact[];
  villages: VillageImpact[];
  suggested_alternative_route?: AlternativeRoute;
  decision_support_label: string;
}
