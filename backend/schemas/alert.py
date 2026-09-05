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
