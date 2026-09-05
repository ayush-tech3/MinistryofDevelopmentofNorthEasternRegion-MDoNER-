from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from backend.database import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("monitoring_zones.id"), nullable=True)
    risk_level = Column(String(50), nullable=False) # LOW, MODERATE, HIGH, CRITICAL
    risk_score = Column(Float, nullable=False)
    message = Column(String(255), nullable=False)
    recommended_action = Column(Text, nullable=False)
    status = Column(String(50), default="ACTIVE") # ACTIVE, ACKNOWLEDGED, UNDER REVIEW, RESOLVED
    created_at = Column(DateTime, default=datetime.utcnow)
