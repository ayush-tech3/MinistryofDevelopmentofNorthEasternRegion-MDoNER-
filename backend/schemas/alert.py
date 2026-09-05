from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class AlertCreate(BaseModel):
    zone_id: Optional[int] = None
    risk_level: str = Field(..., example="CRITICAL")
    risk_score: float = Field(..., example=87.0)
    message: str = Field(..., example="Critical landslide risk detected on hillside.")
    recommended_action: str = Field(..., example="Dispatch response units and notify district authorities.")
    status: str = Field(default="ACTIVE", example="ACTIVE")

class AlertAcknowledge(BaseModel):
    status: str = Field(default="ACKNOWLEDGED", example="ACKNOWLEDGED")

class AlertResponse(BaseModel):
    id: int
    zone_id: Optional[int] = None
    risk_level: str
    risk_score: float
    message: str
    recommended_action: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class EmailAlertRequest(BaseModel):
    recipient_email: str = Field(..., example="district.magistrate@ner.gov.in")
    alert_title: str = Field(default="Critical Landslide Hazard Warning")
    risk_level: str = Field(default="CRITICAL")
    risk_score: float = Field(default=87.0)
    location: str = Field(default="Demo Monitoring Zone A, Meghalaya")
    potential_impact: str = Field(default="NH-206 Road Cutoff Risk; Mawlyndep Village isolated")
    recommended_action: str = Field(default="Deploy SDRF rescue units and enforce single-lane vehicular regulation")
    emergency_corridor: Optional[str] = Field(default="Shillong-Mawsynram Bypass via Mawphlang")

