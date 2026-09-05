from typing import Dict, Any, List, Tuple
from sqlalchemy.orm import Session
from backend.models.alert import Alert
from backend.models.monitoring_zone import MonitoringZone

class RiskEngineService:
    @staticmethod
    def calculate_risk_score(
        rainfall: float,
        soil_moisture: float,
        slope: float,
        historical_activity: float,
        recent_reports: int
    ) -> Tuple[float, str]:
        """
        Transparent Weighted Prototype Risk Formula:
        - Rainfall Weight: 30%
        - Soil Moisture: 25%
        - Slope: 20%
        - Historical Activity: 15%
        - Recent Reports Score: 10% (Each report adds 20 pts up to max 100)
        """
        # Normalize inputs (0-100 scale)
        r_val = min(max(float(rainfall), 0.0), 100.0)
        sm_val = min(max(float(soil_moisture), 0.0), 100.0)
        sl_val = min(max(float(slope), 0.0), 100.0)
        ha_val = min(max(float(historical_activity), 0.0), 100.0)
        rep_val = min(max(float(recent_reports) * 20.0, 0.0), 100.0)

        # Weighted calculation
        raw_score = (
            (r_val * 0.30) +
            (sm_val * 0.25) +
            (sl_val * 0.20) +
            (ha_val * 0.15) +
            (rep_val * 0.10)
        )

        final_score = round(min(max(raw_score, 0.0), 100.0), 1)

        # Classification Scale:
        # 0–25: LOW
        # 26–50: MODERATE
        # 51–75: HIGH
        # 76–100: CRITICAL
        if final_score >= 76.0:
            level = "CRITICAL"
        elif final_score >= 51.0:
            level = "HIGH"
        elif final_score >= 26.0:
            level = "MODERATE"
        else:
            level = "LOW"

        return final_score, level

    @staticmethod
    def get_contributing_factors(
        rainfall: float,
        soil_moisture: float,
        slope: float,
        historical_activity: float,
        recent_reports: int
    ) -> List[Dict[str, Any]]:
        """
        Explainable AI (XAI) feature attribution.
        Categorizes factors into HIGH, MODERATE, or LOW impact based on their contribution.
        """
        r_val = min(max(float(rainfall), 0.0), 100.0)
        sm_val = min(max(float(soil_moisture), 0.0), 100.0)
        sl_val = min(max(float(slope), 0.0), 100.0)
        ha_val = min(max(float(historical_activity), 0.0), 100.0)
        rep_val = min(max(float(recent_reports) * 20.0, 0.0), 100.0)

        factors = [
            {
                "factor": "Heavy Rainfall",
                "score": round(r_val * 0.30, 1),
                "impact": "HIGH" if r_val >= 70 else ("MODERATE" if r_val >= 40 else "LOW"),
                "weight": "30% Weight"
            },
            {
                "factor": "High Soil Moisture",
                "score": round(sm_val * 0.25, 1),
                "impact": "HIGH" if sm_val >= 70 else ("MODERATE" if sm_val >= 40 else "LOW"),
                "weight": "25% Weight"
            },
            {
                "factor": "Steep Terrain Gradient",
                "score": round(sl_val * 0.20, 1),
                "impact": "HIGH" if sl_val >= 70 else ("MODERATE" if sl_val >= 40 else "LOW"),
                "weight": "20% Weight"
            },
            {
                "factor": "Historical Landslide Activity",
                "score": round(ha_val * 0.15, 1),
                "impact": "HIGH" if ha_val >= 65 else ("MODERATE" if ha_val >= 35 else "LOW"),
                "weight": "15% Weight"
            },
            {
                "factor": "Recent Field Ground Reports",
                "score": round(rep_val * 0.10, 1),
                "impact": "HIGH" if recent_reports >= 3 else ("MODERATE" if recent_reports >= 1 else "LOW"),
                "weight": "10% Weight"
            }
        ]

        return factors

    @classmethod
    def evaluate_and_alert(cls, zone: MonitoringZone, db: Session) -> None:
        """
        When risk becomes HIGH or CRITICAL, automatically generate and persist an alert.
        """
        if zone.risk_level in ["HIGH", "CRITICAL"]:
            # Check if active alert already exists for this zone
            existing = db.query(Alert).filter(
                Alert.zone_id == zone.id,
                Alert.status == "ACTIVE"
            ).first()

            if not existing:
                msg = f"{zone.risk_level} LANDSLIDE RISK: High landslide risk detected in {zone.name} ({zone.district}). Possible road disruption identified."
                action = (
                    "Immediate Action Required: Pre-position SDRF rescue units, alert District Disaster Management Authority (DDMA), and issue road travel advisories."
                    if zone.risk_level == "CRITICAL" else
                    "Prepare Response: Monitor pore-pressure telemetry, restrict multi-axle freight vehicles, and inspect culverts."
                )

                new_alert = Alert(
                    zone_id=zone.id,
                    risk_level=zone.risk_level,
                    risk_score=zone.risk_score,
                    message=msg,
                    recommended_action=action,
                    status="ACTIVE"
                )
                db.add(new_alert)
                db.commit()
