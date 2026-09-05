import json
from datetime import datetime
from sqlalchemy.orm import Session
from backend.database import SessionLocal, Base, engine
from backend.models.monitoring_zone import MonitoringZone
from backend.models.incident_report import IncidentReport
from backend.models.alert import Alert
from backend.models.road import Road
from backend.models.village import Village
from backend.models.hospital import Hospital
from backend.services.risk_engine import RiskEngineService

def seed_database():
    """
    Seeds initial realistic DEMO DATA for the North Eastern Region.
    Clearly labeled as PROTOTYPE SIMULATION / DEMO DATA.
    """
    # Create all tables if not exist
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded
        if db.query(MonitoringZone).count() > 0:
            print("Database already contains data. Skipping initial seeding.")
            return

        print("Seeding AlertNex prototype database with realistic NER demo datasets...")

        # 1. Monitoring Zones (Exact SIH Demo Zones A - D required)
        zones_data = [
            {
                "name": "Demo Zone A (Cherrapunji-Mawsynram Axis)",
                "region": "NER",
                "district": "East Khasi Hills, Meghalaya",
                "latitude": 25.2986,
                "longitude": 91.5822,
                "rainfall": 95.0,
                "soil_moisture": 88.0,
                "slope": 85.0,
                "historical_activity": 80.0,
                "recent_reports": 5
            },
            {
                "name": "Demo Zone B (Haflong-Jatinga Hill Pass)",
                "region": "NER",
                "district": "Dima Hasao, Assam",
                "latitude": 25.1818,
                "longitude": 93.0232,
                "rainfall": 75.0,
                "soil_moisture": 70.0,
                "slope": 72.0,
                "historical_activity": 65.0,
                "recent_reports": 3
            },
            {
                "name": "Demo Zone C (Gangtok-Tsomgo Alpine Pass)",
                "region": "NER",
                "district": "East Sikkim, Sikkim",
                "latitude": 27.3389,
                "longitude": 88.6065,
                "rainfall": 48.0,
                "soil_moisture": 50.0,
                "slope": 45.0,
                "historical_activity": 40.0,
                "recent_reports": 1
            },
            {
                "name": "Demo Zone D (Kohima-Dimapur Valley)",
                "region": "NER",
                "district": "Kohima, Nagaland",
                "latitude": 25.6751,
                "longitude": 94.1086,
                "rainfall": 20.0,
                "soil_moisture": 25.0,
                "slope": 30.0,
                "historical_activity": 15.0,
                "recent_reports": 0
            }
        ]

        created_zones = []
        for zd in zones_data:
            score, level = RiskEngineService.calculate_risk_score(
                rainfall=zd["rainfall"],
                soil_moisture=zd["soil_moisture"],
                slope=zd["slope"],
                historical_activity=zd["historical_activity"],
                recent_reports=zd["recent_reports"]
            )

            geo = json.dumps({
                "type": "Point",
                "coordinates": [zd["longitude"], zd["latitude"]]
            })

            z = MonitoringZone(
                name=zd["name"],
                region=zd["region"],
                district=zd["district"],
                latitude=zd["latitude"],
                longitude=zd["longitude"],
                geometry=geo,
                rainfall=zd["rainfall"],
                soil_moisture=zd["soil_moisture"],
                slope=zd["slope"],
                historical_activity=zd["historical_activity"],
                recent_reports=zd["recent_reports"],
                risk_score=score,
                risk_level=level,
                last_updated=datetime.utcnow()
            )
            db.add(z)
            created_zones.append(z)

        db.commit()
        for z in created_zones:
            db.refresh(z)

        # 2. Roads
        roads = [
            Road(name="NH-206 Sohra Sector", status="POTENTIAL DISRUPTION", priority="HIGH"),
            Road(name="NH-27 East-West Corridor (Haflong)", status="POTENTIAL DISRUPTION", priority="HIGH"),
            Road(name="Jawaharlal Nehru Marg (Sikkim)", status="MONITORING", priority="MEDIUM"),
            Road(name="NH-29 Kohima Lifeline", status="NORMAL", priority="LOW")
        ]
        db.add_all(roads)

        # 3. Villages
        villages = [
            Village(name="Mawlyndep", population=1420, isolation_risk="CRITICAL"),
            Village(name="Upper Umrangso", population=2890, isolation_risk="HIGH"),
            Village(name="Kyongnosla", population=640, isolation_risk="MODERATE"),
            Village(name="Phesama", population=3100, isolation_risk="LOW")
        ]
        db.add_all(villages)

        # 4. Hospitals
        hospitals = [
            Hospital(name="Cherrapunji Community Health Centre", status="VULNERABLE ACCESS"),
            Hospital(name="Civil Hospital Haflong", status="ACCESSIBLE VIA BYPASS"),
            Hospital(name="STNM Super Speciality Hospital Gangtok", status="OPERATIONAL"),
            Hospital(name="Naga Hospital Authority Kohima", status="OPERATIONAL")
        ]
        db.add_all(hospitals)

        # 5. Alerts
        alerts = [
            Alert(
                zone_id=created_zones[0].id,
                risk_level="CRITICAL",
                risk_score=created_zones[0].risk_score,
                message="CRITICAL LANDSLIDE RISK: High landslide risk detected in Demo Zone A. Possible road disruption identified.",
                recommended_action="Issue Red Bulletin to District Magistrate; position SDRF unit on 30-min standby.",
                status="ACTIVE",
                created_at=datetime.utcnow()
            ),
            Alert(
                zone_id=created_zones[1].id,
                risk_level="HIGH",
                risk_score=created_zones[1].risk_score,
                message="HIGH LANDSLIDE RISK: Saturated soil conditions and slope creep detected in Demo Zone B.",
                recommended_action="Halt heavy multi-axle freight at checkpost; dispatch highway inspection patrol.",
                status="ACTIVE",
                created_at=datetime.utcnow()
            )
        ]
        db.add_all(alerts)

        # 6. Incident Reports
        reports = [
            IncidentReport(
                reporter_type="Field Officer",
                incident_type="Ground Crack",
                description="Observed continuous transverse fissure measuring approx 18m length, width 4.5cm on upper shoulder.",
                latitude=25.3020,
                longitude=91.5840,
                geometry=json.dumps({"type": "Point", "coordinates": [91.5840, 25.3020]}),
                severity="HIGH",
                image_path="/assets/ner_hero.jpg",
                status="VERIFIED",
                created_at=datetime.utcnow(),
                synced=True
            ),
            IncidentReport(
                reporter_type="Citizen",
                incident_type="Rockfall",
                description="Small boulder rolling onto roadside ditch during noon rain. Rocks about 1-2 feet wide.",
                latitude=25.1850,
                longitude=93.0270,
                geometry=json.dumps({"type": "Point", "coordinates": [93.0270, 25.1850]}),
                severity="MODERATE",
                image_path=None,
                status="VERIFIED",
                created_at=datetime.utcnow(),
                synced=True
            )
        ]
        db.add_all(reports)

        db.commit()
        print("Database seeded successfully with Demo Zones A, B, C, D and infrastructure entities!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
