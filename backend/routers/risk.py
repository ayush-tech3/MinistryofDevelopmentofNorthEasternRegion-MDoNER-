from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.monitoring_zone import MonitoringZone
from backend.schemas.risk import RiskCalculationInput, RiskExplanationResponse, ContributingFactor
from backend.services.risk_engine import RiskEngineService

router = APIRouter(prefix="/api/risk", tags=["AI Risk Assessment Engine"])

@router.get("/{zone_id}", response_model=RiskExplanationResponse)
def get_zone_risk_analysis(zone_id: int, db: Session = Depends(get_db)):
    """
    Explainable AI (XAI) endpoint:
    Explains why a monitoring zone's landslide risk score is high.
    """
    zone = db.query(MonitoringZone).filter(MonitoringZone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Monitoring zone not found")

    factors_raw = RiskEngineService.get_contributing_factors(
        rainfall=zone.rainfall,
        soil_moisture=zone.soil_moisture,
        slope=zone.slope,
        historical_activity=zone.historical_activity,
        recent_reports=zone.recent_reports
    )

    factors = [ContributingFactor(**f) for f in factors_raw]

    rec = (
        "Critical Threat: Immediate proactive closure of slope-side transit corridors and standby SDRF deployment."
        if zone.risk_level == "CRITICAL" else
        "High Watch: Pre-position road maintenance earth movers and regulate heavy freight vehicular movement."
        if zone.risk_level == "HIGH" else
        "Advisory Watch: Routine automated sensor polling and drainage inspection."
    )

    return RiskExplanationResponse(
        risk_score=zone.risk_score,
        risk_level=zone.risk_level,
        model_type="Prototype Risk Assessment Model",
        contributing_factors=factors,
        recommendation=rec
    )

@router.post("/calculate", response_model=RiskExplanationResponse)
def calculate_risk_manually(payload: RiskCalculationInput):
    """
    Interactive AI Risk Assessment calculation:
    Accepts arbitrary environmental values (Rainfall, Soil Moisture, Slope, Historical Activity, Recent Reports)
    and returns real-time risk score, level, and explainability factors.
    """
    score, level = RiskEngineService.calculate_risk_score(
        rainfall=payload.rainfall,
        soil_moisture=payload.soil_moisture,
        slope=payload.slope,
        historical_activity=payload.historical_activity,
        recent_reports=payload.recent_reports
    )

    factors_raw = RiskEngineService.get_contributing_factors(
        rainfall=payload.rainfall,
        soil_moisture=payload.soil_moisture,
        slope=payload.slope,
        historical_activity=payload.historical_activity,
        recent_reports=payload.recent_reports
    )

    factors = [ContributingFactor(**f) for f in factors_raw]

    rec = (
        "Simulated Critical Alert: Model indicates high saturation and slope stress exceeding threshold."
        if level == "CRITICAL" else
        "Simulated High Alert: Multi-factor risk elevated. Heightened geotechnical monitoring advised."
        if level == "HIGH" else
        "Simulated Baseline: Parameters currently within safe or moderate tolerance ranges."
    )

    return RiskExplanationResponse(
        risk_score=score,
        risk_level=level,
        model_type="Prototype Risk Assessment Model",
        contributing_factors=factors,
        recommendation=rec
    )
