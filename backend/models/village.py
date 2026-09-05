from sqlalchemy import Column, Integer, String, Text
from backend.database import Base

class Village(Base):
    __tablename__ = "villages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    population = Column(Integer, default=500)
    geometry = Column(Text, nullable=True) # GeoJSON point or polygon
    isolation_risk = Column(String(50), default="LOW") # LOW, MODERATE, HIGH, CRITICAL
