from typing import Dict, Any
from sqlalchemy.orm import Session
from backend.models.monitoring_zone import MonitoringZone

class ConnectivityEngineService:
    @staticmethod
    def analyze_connectivity(zone: MonitoringZone, db: Session) -> Dict[str, Any]:
        """
        Connectivity Impact Intelligence:
        Analyzes road disruptions, village isolation vulnerability, and suggests emergency alternative routes.
        """
        is_critical = zone.risk_level == "CRITICAL"
        is_high = zone.risk_level == "HIGH"
        is_moderate = zone.risk_level == "MODERATE"

        # Road status evaluation
        if is_critical:
            overall_road_status = "CRITICAL DISRUPTION"
            hosp_status = "Potentially Affected (Corridor Blocked from North)"
        elif is_high:
            overall_road_status = "POTENTIAL DISRUPTION"
            hosp_status = "Accessible via Southern Bypass (+30 min delay)"
        elif is_moderate:
            overall_road_status = "MONITORING (Single-lane Traffic)"
            hosp_status = "Operational with caution"
        else:
            overall_road_status = "NORMAL (Unrestricted Flow)"
            hosp_status = "Fully Operational"

        # Realistic contextual roads for NER zones
        if "Cherrapunji" in zone.name or "Khasi" in zone.district:
            roads = [
                {
                    "road_name": "NH-206 Sohra Sector",
                    "status": "CRITICAL DISRUPTION" if is_critical else "POTENTIAL DISRUPTION",
                    "priority": "HIGH",
                    "mitigation_measure": "Deploy heavy earth-moving equipment and station SDRF patrol."
                },
                {
                    "road_name": "Mawkdok-Cherra Link Road",
                    "status": "POTENTIAL DISRUPTION" if (is_critical or is_high) else "MONITORING",
                    "priority": "MEDIUM",
                    "mitigation_measure": "Regulate commercial trucks; enforce single-lane convoy."
                }
            ]
            villages = [
                {
                    "village_name": "Mawlyndep",
                    "population": 1420,
                    "isolation_risk": "CRITICAL" if is_critical else "HIGH",
                    "primary_access_road": "NH-206 Upper Shoulder",
                    "alternate_access": "Foot track via lower ridge open"
                },
                {
                    "village_name": "Sohra Rim",
                    "population": 2150,
                    "isolation_risk": "HIGH" if (is_critical or is_high) else "MODERATE",
                    "primary_access_road": "Sohra-Shella Spur",
                    "alternate_access": "Secondary bypass route accessible"
                }
            ]
            suggested_route = {
                "corridor_name": "Shillong-Mawsynram Bypass via Mawphlang (Clear)",
                "status": "OPERATIONAL / VERIFIED ALTERNATIVE",
                "distance_differential": "+18 km (+25 minutes transit)",
                "priority": "HIGH",
                "recommendation_note": "Recommended priority corridor for medical evacuation and emergency supplies."
            }
        elif "Haflong" in zone.name or "Dima Hasao" in zone.district:
            roads = [
                {
                    "road_name": "NH-27 East-West Corridor (Haflong Pass)",
                    "status": "POTENTIAL DISRUPTION" if is_high else "MONITORING",
                    "priority": "HIGH",
                    "mitigation_measure": "Halt multi-axle freight at Jatinga checkpost; 24h rockfall spotters active."
                }
            ]
            villages = [
                {
                    "village_name": "Upper Umrangso",
                    "population": 2890,
                    "isolation_risk": "HIGH",
                    "primary_access_road": "NH-27 Haflong Pass",
                    "alternate_access": "Umrangso-Lanka Alternate Ridge Track"
                }
            ]
            suggested_route = {
                "corridor_name": "Umrangso-Lanka Alternate Ridge Track",
                "status": "STANDBY ALTERNATIVE",
                "distance_differential": "+24 km (+40 minutes transit)",
                "priority": "HIGH",
                "recommendation_note": "Suitable for high-clearance 4x4 response vehicles and emergency supply convoys."
            }
        else:
            # Generic realistic demo structure
            roads = [
                {
                    "road_name": f"Regional Highway Arterial ({zone.district})",
                    "status": overall_road_status,
                    "priority": "HIGH" if (is_critical or is_high) else "MEDIUM",
                    "mitigation_measure": "Deploy PWD road clearing teams and geotechnical drone inspection."
                }
            ]
            villages = [
                {
                    "village_name": f"Upper Sector Village ({zone.name})",
                    "population": 1250,
                    "isolation_risk": "HIGH" if (is_critical or is_high) else "MODERATE",
                    "primary_access_road": "Main Valley Connector",
                    "alternate_access": "Secondary ridge bypass active"
                }
            ]
            suggested_route = {
                "corridor_name": f"Secondary Ridge Detour Route ({zone.district})",
                "status": "VERIFIED ALTERNATIVE",
                "distance_differential": "+12 km (+20 minutes transit)",
                "priority": "HIGH" if is_critical else "MEDIUM",
                "recommendation_note": "Designated emergency relief corridor for emergency services."
            }

        return {
            "zone_id": zone.id,
            "zone_name": zone.name,
            "zone_risk_level": zone.risk_level,
            "overall_road_status": overall_road_status,
            "affected_villages_count": len(villages),
            "hospital_accessibility_status": hosp_status,
            "roads": roads,
            "villages": villages,
            "suggested_alternative_route": suggested_route,
            "decision_support_label": "Prototype Decision-Support Recommendation"
        }
