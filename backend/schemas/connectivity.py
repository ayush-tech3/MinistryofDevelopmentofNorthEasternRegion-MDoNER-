from typing import List, Optional
from pydantic import BaseModel

class RoadImpactItem(BaseModel):
    road_name: str
    status: str # NORMAL, MONITORING, POTENTIAL DISRUPTION, CRITICAL DISRUPTION
    priority: str # HIGH, MEDIUM, LOW
    mitigation_measure: str

class VillageImpactItem(BaseModel):
    village_name: str
    population: int
    isolation_risk: str # LOW, MODERATE, HIGH, CRITICAL
    primary_access_road: str
    alternate_access: str

class AlternativeRouteItem(BaseModel):
    corridor_name: str
    status: str
    distance_differential: str
    priority: str
    recommendation_note: str

class ConnectivityImpactResponse(BaseModel):
    zone_id: int
    zone_name: str
    zone_risk_level: str
    overall_road_status: str
    affected_villages_count: int
    hospital_accessibility_status: str
    roads: List[RoadImpactItem]
    villages: List[VillageImpactItem]
    suggested_alternative_route: Optional[AlternativeRouteItem]
    decision_support_label: str = "Prototype Decision-Support Recommendation"
