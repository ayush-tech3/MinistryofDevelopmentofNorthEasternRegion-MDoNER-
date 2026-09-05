from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from backend.database import Base

class MonitoringZone(Base):
    __tablename__ = "monitoring_zones"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    region = Column(String(100), nullable=False, default="NER")
    district = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geometry = Column(Text, nullable=True) # GeoJSON representation for PostGIS / SQLite compatibility
    rainfall = Column(Float, default=0.0) # mm
    soil_moisture = Column(Float, default=0.0) # percentage 0-100
    slope = Column(Float, default=0.0) # degrees
    historical_activity = Column(Float, default=0.0) # index 0-100
    recent_reports = Column(Integer, default=0) # count
    risk_score = Column(Float, default=0.0) # 0-100
    risk_level = Column(String(50), default="LOW") # LOW, MODERATE, HIGH, CRITICAL
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
