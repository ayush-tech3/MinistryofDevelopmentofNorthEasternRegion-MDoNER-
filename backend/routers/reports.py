import os
import shutil
import uuid
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.incident_report import IncidentReport
from backend.schemas.incident_report import ReportResponse, ReportStatusUpdate

router = APIRouter(prefix="/api/reports", tags=["Incident Reports"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "backend/uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("", response_model=List[ReportResponse])
def get_reports(
    severity: Optional[str] = None,
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieve all ground truth and citizen incident reports."""
    query = db.query(IncidentReport)
    if severity:
        query = query.filter(IncidentReport.severity == severity.upper())
    if status_filter:
        query = query.filter(IncidentReport.status == status_filter.upper())
    return query.order_by(IncidentReport.created_at.desc()).all()

@router.get("/{report_id}", response_model=ReportResponse)
def get_single_report(report_id: int, db: Session = Depends(get_db)):
    """Retrieve details of a single report."""
    report = db.query(IncidentReport).filter(IncidentReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Incident report not found")
    return report

@router.post("", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
async def create_report(
    reporter_type: str = Form("Citizen"),
    incident_type: str = Form("Ground Crack"),
    description: str = Form(...),
    latitude: float = Form(25.3020),
    longitude: float = Form(91.5840),
    severity: str = Form("HIGH"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """
    Create a new hazard incident report with optional photographic proof.
    Supports multipart form uploads.
    """
    saved_image_path = None
    if image and image.filename:
        file_ext = os.path.splitext(image.filename)[1]
        unique_filename = f"report_{uuid.uuid4().hex[:12]}{file_ext}"
        destination = os.path.join(UPLOAD_DIR, unique_filename)
        with open(destination, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        saved_image_path = f"/uploads/{unique_filename}"

    report = IncidentReport(
        reporter_type=reporter_type,
        incident_type=incident_type,
        description=description,
        latitude=latitude,
        longitude=longitude,
        geometry=f'{{"type":"Point","coordinates":[{longitude},{latitude}]}}',
        severity=severity.upper(),
        image_path=saved_image_path,
        status="PENDING",
        created_at=datetime.utcnow(),
        synced=True
    )

    db.add(report)
    db.commit()
    db.refresh(report)
    return report

@router.put("/{report_id}/status", response_model=ReportResponse)
def update_report_status(
    report_id: int,
    payload: ReportStatusUpdate,
    db: Session = Depends(get_db)
):
    """Update report operational lifecycle status (PENDING, VERIFIED, REJECTED, RESOLVED).
    When verified, ground truth reports influence the prototype risk score of the closest monitoring zone.
    """
    report = db.query(IncidentReport).filter(IncidentReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Incident report not found")

    old_status = report.status
    new_status = payload.status.upper()
    report.status = new_status
    db.commit()
    db.refresh(report)

    # When report is verified, influence prototype risk analysis for closest monitoring zone
    if new_status == "VERIFIED" and old_status != "VERIFIED":
        from backend.models.monitoring_zone import MonitoringZone
        from backend.services.risk_engine import RiskEngineService
        
        # Find closest zone or default zone
        zones = db.query(MonitoringZone).all()
        target_zone = None
        min_dist = float("inf")
        for z in zones:
            dist = ((z.latitude - report.latitude) ** 2 + (z.longitude - report.longitude) ** 2) ** 0.5
            if dist < min_dist:
                min_dist = dist
                target_zone = z
        
        if target_zone:
            target_zone.recent_reports += 1
            score, level = RiskEngineService.calculate_risk_score(
                rainfall=target_zone.rainfall,
                soil_moisture=target_zone.soil_moisture,
                slope=target_zone.slope,
                historical_activity=target_zone.historical_activity,
                recent_reports=target_zone.recent_reports
            )
            target_zone.risk_score = score
            target_zone.risk_level = level
            db.commit()
            db.refresh(target_zone)
            RiskEngineService.evaluate_and_alert(target_zone, db)

    return report
