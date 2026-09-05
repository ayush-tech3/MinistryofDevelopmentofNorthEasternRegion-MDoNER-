from typing import List, Optional
from sqlalchemy.orm import Session
from backend.models.alert import Alert

class AlertService:
    @staticmethod
    def get_all_alerts(db: Session, status: Optional[str] = None) -> List[Alert]:
        query = db.query(Alert)
        if status:
            query = query.filter(Alert.status == status)
        return query.order_by(Alert.created_at.desc()).all()

    @staticmethod
    def create_alert(
        db: Session,
        risk_level: str,
        risk_score: float,
        message: str,
        recommended_action: str,
        zone_id: Optional[int] = None
    ) -> Alert:
        alert = Alert(
            zone_id=zone_id,
            risk_level=risk_level,
            risk_score=risk_score,
            message=message,
            recommended_action=recommended_action,
            status="ACTIVE"
        )
        db.add(alert)
        db.commit()
        db.refresh(alert)
        return alert

    @staticmethod
    def acknowledge_alert(db: Session, alert_id: int) -> Optional[Alert]:
        alert = db.query(Alert).filter(Alert.id == alert_id).first()
        if alert:
            alert.status = "ACKNOWLEDGED"
            db.commit()
            db.refresh(alert)
        return alert
