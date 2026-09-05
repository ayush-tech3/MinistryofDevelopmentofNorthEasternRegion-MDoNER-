from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class ZoneBase(BaseModel):
    name: str = Field(..., example="Demo Zone A")
    region: str = Field(default="NER", example="NER")
    district: str = Field(..., example="East Khasi Hills")
    latitude: float = Field(..., example=25.2986)
    longitude: float = Field(..., example=91.5822)
    geometry: Optional[str] = None
    rainfall: float = Field(default=0.0, ge=0.0, example=95.0)
    soil_moisture: float = Field(default=0.0, ge=0.0, le=100.0, example=88.0)
    slope: float = Field(default=0.0, ge=0.0, le=90.0, example=85.0)
    historical_activity: float = Field(default=0.0, ge=0.0, le=100.0, example=80.0)
    recent_reports: int = Field(default=0, ge=0, example=5)

class ZoneCreate(ZoneBase):
    pass

class ZoneUpdate(BaseModel):
    rainfall: Optional[float] = Field(None, ge=0.0)
    soil_moisture: Optional[float] = Field(None, ge=0.0, le=100.0)
    slope: Optional[float] = Field(None, ge=0.0, le=90.0)
    historical_activity: Optional[float] = Field(None, ge=0.0, le=100.0)
    recent_reports: Optional[int] = Field(None, ge=0)

class ZoneResponse(ZoneBase):
    id: int
    risk_score: float
    risk_level: str
    last_updated: datetime

    class Config:
        from_attributes = True
