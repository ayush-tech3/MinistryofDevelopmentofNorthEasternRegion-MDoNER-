from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.alert import Alert
from backend.schemas.alert import AlertCreate, AlertResponse, AlertAcknowledge, EmailAlertRequest
from backend.services.alert_service import AlertService

router = APIRouter(prefix="/api/alerts", tags=["Early Warnings & Alerts"])

@router.get("", response_model=List[AlertResponse])
def get_alerts(status_filter: Optional[str] = None, db: Session = Depends(get_db)):
    """Retrieve all early warning alerts, with optional status filtering."""
    return AlertService.get_all_alerts(db, status=status_filter)

@router.post("", response_model=AlertResponse, status_code=status.HTTP_201_CREATED)
def create_manual_alert(payload: AlertCreate, db: Session = Depends(get_db)):
    """Manually issue an early warning bulletin from authority command."""
    return AlertService.create_alert(
        db=db,
        zone_id=payload.zone_id,
        risk_level=payload.risk_level.upper(),
        risk_score=payload.risk_score,
        message=payload.message,
        recommended_action=payload.recommended_action
    )

@router.put("/{alert_id}/acknowledge", response_model=AlertResponse)
def acknowledge_alert(alert_id: int, db: Session = Depends(get_db)):
    """Acknowledge an active emergency alert."""
    alert = AlertService.acknowledge_alert(db, alert_id=alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.post("/send-email")
def send_real_alert_email(payload: EmailAlertRequest):
    """
    Deliver a real emergency warning email to an authority, DM, or citizen inbox.
    Uses SMTP configured in backend/.env (e.g. Gmail SMTP or custom host).
    """
    from backend.services.email_service import EmailService
    result = EmailService.send_emergency_email(
        recipient_email=payload.recipient_email,
        alert_title=payload.alert_title,
        risk_level=payload.risk_level,
        risk_score=payload.risk_score,
        location=payload.location,
        potential_impact=payload.potential_impact,
        recommended_action=payload.recommended_action,
        emergency_corridor=payload.emergency_corridor
    )
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("error", "Email dispatch failed"))
    return result

