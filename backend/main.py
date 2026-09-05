import os
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from backend.database import Base, engine
from backend.utils.seed_data import seed_database
from backend.routers import (
    zones_router,
    risk_router,
    reports_router,
    alerts_router,
    connectivity_router
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure tables exist and seed demo data
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield
    # Shutdown logic if any

app = FastAPI(
    title="AlertNex - AI Early Warning & Landslide Monitoring System",
    description="""
    ## Smart India Hackathon 2026 | Problem Statement: SIH26001
    **Organization**: Ministry of Development of North Eastern Region (MDoNER)  
    **Theme**: Disaster Management | **Category**: Software  
    **Team Name**: **AlertNex** | **Team Leader**: **Ayush Kumar**  

    ### System Purpose:
    An AI-powered decision-support and early-warning system for monitoring landslide hazards,
    environmental triggers, road connectivity disruptions, and village isolation risks in the North Eastern Region of India.

    *All demo datasets are simulated for hackathon prototype presentation.*
    """,
    version="2.6.0-SIH-PROTOTYPE",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "https://ministryofdevelopmentofnortheastern.netlify.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Files for Uploads and Assets
uploads_dir = os.getenv("UPLOAD_DIR", "backend/uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

if os.path.exists("alertnex-app/assets"):
    app.mount("/assets", StaticFiles(directory="alertnex-app/assets"), name="assets")

# Include Routers
app.include_router(zones_router)
app.include_router(risk_router)
app.include_router(reports_router)
app.include_router(alerts_router)
app.include_router(connectivity_router)

@app.get("/", tags=["Root & System Health"])
def root_status():
    return {
        "system": "AlertNex",
        "tagline": "AI-Powered Early Warning for Safer Communities",
        "status": "ONLINE",
        "sih_problem_statement": "SIH26001",
        "ministry": "Ministry of Development of North Eastern Region (MDoNER)",
        "team": "AlertNex",
        "team_leader": "Ayush Kumar",
        "version": "v2.6.0-SIH-PROTOTYPE",
        "honesty_notice": "Prototype Decision-Support System. Demo data explicitly simulated for hackathon evaluation.",
        "api_docs": "/docs",
        "endpoints": {
            "zones": "/api/zones",
            "risk_analysis": "/api/risk/{zone_id}",
            "risk_calculate": "/api/risk/calculate",
            "reports": "/api/reports",
            "alerts": "/api/alerts",
            "connectivity": "/api/connectivity/{zone_id}"
        }
    }

@app.get("/health", tags=["Root & System Health"])
def health_check():
    return {"status": "healthy", "service": "AlertNex FastAPI Backend"}
