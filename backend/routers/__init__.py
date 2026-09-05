from backend.routers.zones import router as zones_router
from backend.routers.risk import router as risk_router
from backend.routers.reports import router as reports_router
from backend.routers.alerts import router as alerts_router
from backend.routers.connectivity import router as connectivity_router

__all__ = [
    "zones_router",
    "risk_router",
    "reports_router",
    "alerts_router",
    "connectivity_router"
]
