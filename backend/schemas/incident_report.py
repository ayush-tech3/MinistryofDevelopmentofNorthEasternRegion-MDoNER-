from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class ReportCreate(BaseModel):
    reporter_type: str = Field(..., example="Field Officer")
    incident_type: str = Field(..., example="Ground Crack")
    description: str = Field(..., example="Continuous crack observed along shoulder of mountain road.")
    latitude: float = Field(..., example=25.3020)
    longitude: float = Field(..., example=91.5840)
    severity: str = Field(default="HIGH", example="HIGH")
    image_path: Optional[str] = None

class ReportStatusUpdate(BaseModel):
    status: str = Field(..., example="VERIFIED")

class ReportResponse(BaseModel):
    id: int
    reporter_type: str
    incident_type: str
    description: str
    latitude: float
    longitude: float
    geometry: Optional[str] = None
    severity: str
    image_path: Optional[str] = None
    status: str
    created_at: datetime
    synced: bool

    class Config:
        from_attributes = True
