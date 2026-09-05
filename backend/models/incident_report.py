from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean
from backend.database import Base

class IncidentReport(Base):
    __tablename__ = "incident_reports"

    id = Column(Integer, primary_key=True, index=True)
    reporter_type = Column(String(50), nullable=False) # Citizen, Field Officer, Authority
    incident_type = Column(String(100), nullable=False) # Dangerous Slope, Ground Crack, etc.
    description = Column(Text, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geometry = Column(Text, nullable=True)
    severity = Column(String(50), default="MODERATE") # LOW, MODERATE, HIGH, CRITICAL
    image_path = Column(String(255), nullable=True)
    status = Column(String(50), default="VERIFIED") # PENDING, VERIFIED, INVESTIGATING, RESOLVED
    created_at = Column(DateTime, default=datetime.utcnow)
    synced = Column(Boolean, default=True)
