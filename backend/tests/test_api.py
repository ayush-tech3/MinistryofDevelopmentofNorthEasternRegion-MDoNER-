from fastapi.testclient import TestClient
from backend.main import app
from backend.database import Base, engine
from backend.utils.seed_data import seed_database

# Explicitly ensure SQLite tables are created and seeded during CI test runner execution
Base.metadata.create_all(bind=engine)
seed_database()

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ONLINE"
    assert "AlertNex" in data["system"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_monitoring_zones():
    response = client.get("/api/zones/")
    assert response.status_code == 200
    zones = response.json()
    assert isinstance(zones, list)
    assert len(zones) >= 1

def test_risk_explanation():
    response = client.get("/api/risk/1")
    assert response.status_code == 200
    data = response.json()
    assert "risk_score" in data
    assert "contributing_factors" in data

def test_connectivity_analysis():
    response = client.get("/api/connectivity/1")
    assert response.status_code == 200
    data = response.json()
    assert "overall_road_status" in data
    assert "suggested_alternative_route" in data
