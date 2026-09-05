from sqlalchemy import Column, Integer, String, Text
from backend.database import Base

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    geometry = Column(Text, nullable=True)
    status = Column(String(50), default="OPERATIONAL") # OPERATIONAL, VULNERABLE ACCESS, CUTOFF
