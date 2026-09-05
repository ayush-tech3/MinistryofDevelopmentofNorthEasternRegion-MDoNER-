from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.monitoring_zone import MonitoringZone
from backend.schemas.connectivity import ConnectivityImpactResponse
from backend.services.connectivity_engine import ConnectivityEngineService

router = APIRouter(prefix="/api/connectivity", tags=["Connectivity Impact Intelligence"])

@router.get("/{zone_id}", response_model=ConnectivityImpactResponse)
def get_connectivity_impact(zone_id: int, db: Session = Depends(get_db)):
    """
    Main Innovation API:
    Evaluates topological road network impact, village isolation vulnerability,
    and returns a suggested prototype emergency route recommendation.
    """
    zone = db.query(MonitoringZone).filter(MonitoringZone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Monitoring zone not found")

    impact = ConnectivityEngineService.analyze_connectivity(zone, db)
    return ConnectivityImpactResponse(**impact)
