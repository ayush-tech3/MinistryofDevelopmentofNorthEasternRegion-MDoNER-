from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.monitoring_zone import MonitoringZone
from backend.schemas.monitoring_zone import ZoneCreate, ZoneUpdate, ZoneResponse
from backend.services.risk_engine import RiskEngineService

router = APIRouter(prefix="/api/zones", tags=["Monitoring Zones"])

@router.get("", response_model=List[ZoneResponse])
def get_all_zones(db: Session = Depends(get_db)):
    """Return all monitored zones in NER."""
    return db.query(MonitoringZone).all()

@router.get("/{zone_id}", response_model=ZoneResponse)
def get_zone_by_id(zone_id: int, db: Session = Depends(get_db)):
    """Return a single monitoring zone by ID."""
    zone = db.query(MonitoringZone).filter(MonitoringZone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Monitoring zone not found")
    return zone

@router.post("", response_model=ZoneResponse, status_code=status.HTTP_201_CREATED)
def create_zone(payload: ZoneCreate, db: Session = Depends(get_db)):
    """Create a new monitoring zone and compute initial risk."""
    score, level = RiskEngineService.calculate_risk_score(
        rainfall=payload.rainfall,
        soil_moisture=payload.soil_moisture,
        slope=payload.slope,
        historical_activity=payload.historical_activity,
        recent_reports=payload.recent_reports
    )

    zone = MonitoringZone(
        name=payload.name,
        region=payload.region,
        district=payload.district,
        latitude=payload.latitude,
        longitude=payload.longitude,
        geometry=payload.geometry,
        rainfall=payload.rainfall,
        soil_moisture=payload.soil_moisture,
        slope=payload.slope,
        historical_activity=payload.historical_activity,
        recent_reports=payload.recent_reports,
        risk_score=score,
        risk_level=level,
        last_updated=datetime.utcnow()
    )
    db.add(zone)
    db.commit()
    db.refresh(zone)

    # Evaluate for automatic alert dispatch
    RiskEngineService.evaluate_and_alert(zone, db)
    return zone

@router.put("/{zone_id}", response_model=ZoneResponse)
def update_zone_environmental_data(zone_id: int, payload: ZoneUpdate, db: Session = Depends(get_db)):
    """
    Update environmental telemetry for a zone and automatically recalculate risk.
    Triggers automated early warning alerts if risk reaches HIGH or CRITICAL.
    """
    zone = db.query(MonitoringZone).filter(MonitoringZone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Monitoring zone not found")

    if payload.rainfall is not None:
        zone.rainfall = payload.rainfall
    if payload.soil_moisture is not None:
        zone.soil_moisture = payload.soil_moisture
    if payload.slope is not None:
        zone.slope = payload.slope
    if payload.historical_activity is not None:
        zone.historical_activity = payload.historical_activity
    if payload.recent_reports is not None:
        zone.recent_reports = payload.recent_reports

    # Automatic risk recalculation
    score, level = RiskEngineService.calculate_risk_score(
        rainfall=zone.rainfall,
        soil_moisture=zone.soil_moisture,
        slope=zone.slope,
        historical_activity=zone.historical_activity,
        recent_reports=zone.recent_reports
    )

    zone.risk_score = score
    zone.risk_level = level
    zone.last_updated = datetime.utcnow()

    db.commit()
    db.refresh(zone)

    # Automatically trigger early warning alert if condition escalated
    RiskEngineService.evaluate_and_alert(zone, db)

    return zone
