from typing import List
from pydantic import BaseModel, Field

class RiskCalculationInput(BaseModel):
    rainfall: float = Field(..., ge=0.0, example=95.0, description="24h rainfall in mm (0-300)")
    soil_moisture: float = Field(..., ge=0.0, le=100.0, example=88.0, description="Soil moisture saturation % (0-100)")
    slope: float = Field(..., ge=0.0, le=90.0, example=85.0, description="Slope inclination in degrees (0-90)")
    historical_activity: float = Field(..., ge=0.0, le=100.0, example=80.0, description="Historical landslide hazard index (0-100)")
    recent_reports: int = Field(default=0, ge=0, example=5, description="Count of recent ground field reports")

class ContributingFactor(BaseModel):
    factor: str
    impact: str # HIGH, MODERATE, LOW
    score: float
    weight: str

class RiskExplanationResponse(BaseModel):
    risk_score: float
    risk_level: str # LOW, MODERATE, HIGH, CRITICAL
    model_type: str = "Prototype Risk Assessment Model"
    contributing_factors: List[ContributingFactor]
    recommendation: str
