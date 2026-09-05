from sqlalchemy import Column, Integer, String, Text
from backend.database import Base

class Road(Base):
    __tablename__ = "roads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    geometry = Column(Text, nullable=True) # GeoJSON line coordinates
    status = Column(String(50), default="NORMAL") # NORMAL, MONITORING, POTENTIAL DISRUPTION, CRITICAL DISRUPTION
    priority = Column(String(50), default="MEDIUM") # HIGH, MEDIUM, LOW
