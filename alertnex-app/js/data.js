/**
 * AlertNex - Data Store & Simulated Datasets
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex (Leader: Ayush Kumar)
 * 
 * IMPORTANT: All data below represents realistic DEMO / PROTOTYPE SIMULATION
 * data for the North Eastern Region (NER) of India. Clearly identified in UI.
 */

const AlertNexData = {
  meta: {
    systemName: "AlertNex",
    tagline: "AI-Powered Early Warning for Safer Communities",
    sihId: "SIH26001",
    theme: "Disaster Management",
    ministry: "Ministry of Development of North Eastern Region (MDoNER)",
    teamName: "AlertNex",
    teamLeader: "Ayush Kumar",
    isPrototype: true,
    version: "v2.6.0-SIH-PROTOTYPE",
    lastRefreshed: "2026-09-05T17:15:00+05:30",
    systemStatus: "ONLINE"
  },

  // Overview Statistics for Dashboard
  kpiStats: {
    totalMonitoredAreas: 128,
    lowRiskAreas: 82,
    moderateRiskAreas: 28,
    highRiskAreas: 12,
    criticalRiskAreas: 6,
    activeSensors: 342,
    reportsToday: 19,
    syncedOfflineReports: 8
  },

  // Detailed Monitoring Zones in NER
  monitoringZones: [
    {
      id: "zone-ner-01",
      code: "DEMO-ZONE-A",
      name: "Cherrapunji-Mawsynram Slopes",
      district: "East Khasi Hills",
      state: "Meghalaya",
      lat: 25.2986,
      lng: 91.5822,
      riskLevel: "CRITICAL",
      riskScore: 87,
      rainfall24h: 215.4, // mm
      soilMoisture: 88, // %
      slopeAngle: 42, // degrees
      weatherCondition: "Torrential Downpour",
      historicalActivity: "High (14 documented events)",
      geologicalFault: "Barapani-Tirap Thrust Zone",
      fieldReportsCount: 4,
      lastUpdated: "12 mins ago",
      potentialImpact: "NH-206 Cutoff Risk; 3 Downstream Hamlets Vulnerable",
      suggestedAction: "Issue evacuation advisory for slope-side hamlets; dispatch SDRF reconnaissance",
      affectedVillages: ["Mawlyndep", "Sohra Rim", "Nongbah"],
      affectedRoads: ["NH-206 Sohra Sector", "Mawkdok-Cherra Link Road"],
      hospitalAccess: "CHC Cherrapunji (Primary corridor at high risk)",
      emergencyRoute: "Shillong-Mawsynram Bypass via Mawphlang (Clear)"
    },
    {
      id: "zone-ner-02",
      code: "DEMO-ZONE-B",
      name: "Haflong-Jatinga Hill Corridor",
      district: "Dima Hasao",
      state: "Assam",
      lat: 25.1818,
      lng: 93.0232,
      riskLevel: "HIGH",
      riskScore: 74,
      rainfall24h: 142.8,
      soilMoisture: 79,
      slopeAngle: 36,
      weatherCondition: "Heavy Persistent Rain",
      historicalActivity: "High (Severe 2022 railway embankment breach)",
      geologicalFault: "Disang Shales Overburden",
      fieldReportsCount: 3,
      lastUpdated: "25 mins ago",
      potentialImpact: "NH-27 East-West Corridor Blockage Risk",
      suggestedAction: "Halt heavy multi-axle freight; place earth-moving machinery on 30-min standby",
      affectedVillages: ["Upper Umrangso", "Jatinga Valley", "Mahur"],
      affectedRoads: ["NH-27 Haflong Pass", "Haflong-Lumding Hill Road"],
      hospitalAccess: "Civil Hospital Haflong (Accessible via southern bypass)",
      emergencyRoute: "Umrangso-Lanka Alternate Ridge Track"
    },
    {
      id: "zone-ner-03",
      code: "DEMO-ZONE-C",
      name: "Gangtok-Tsomgo Alpine Pass",
      district: "East Sikkim",
      state: "Sikkim",
      lat: 27.3389,
      lng: 88.6065,
      riskLevel: "HIGH",
      riskScore: 71,
      rainfall24h: 128.5,
      soilMoisture: 76,
      slopeAngle: 48,
      weatherCondition: "Continuous Monsoon Showers",
      historicalActivity: "Moderate-High (Rockfall & debris slides)",
      geologicalFault: "Main Central Thrust (MCT) Schist",
      fieldReportsCount: 2,
      lastUpdated: "40 mins ago",
      potentialImpact: "JN Marg Tourist Route Interruption",
      suggestedAction: "Suspend commercial tourist permits above 15th Mile; patrol active scree cones",
      affectedVillages: ["15th Mile Basti", "Kyongnosla", "Sherathang"],
      affectedRoads: ["Jawaharlal Nehru Marg (JN Marg)", "Tsomgo-Nathula Link"],
      hospitalAccess: "STNM Hospital Gangtok (Transit delay +45 mins)",
      emergencyRoute: "Pangthang-Burtuk Secondary Detour"
    },
    {
      id: "zone-ner-04",
      code: "DEMO-ZONE-D",
      name: "Kohima-Dimapur Sinking Zone",
      district: "Kohima",
      state: "Nagaland",
      lat: 25.6751,
      lng: 94.1086,
      riskLevel: "MODERATE",
      riskScore: 48,
      rainfall24h: 62.0,
      soilMoisture: 61,
      slopeAngle: 28,
      weatherCondition: "Intermittent Rain & Fog",
      historicalActivity: "High (Known active subsidence at Phesama & Dzüdza)",
      geologicalFault: "Barail Sandstone Sinking Splay",
      fieldReportsCount: 1,
      lastUpdated: "1 hour ago",
      potentialImpact: "Single-lane traffic throttling on NH-29 lifeline",
      suggestedAction: "Monitor crack displacement sensors; maintain single-lane regulation",
      affectedVillages: ["Phesama", "Kigwema", "Dzüdza Hamlet"],
      affectedRoads: ["NH-29 Kohima Lifeline"],
      hospitalAccess: "Naga Hospital Authority Kohima (Normal clearance)",
      emergencyRoute: "Peducha-Tsiesema 10km Bypass"
    },
    {
      id: "zone-ner-05",
      code: "DEMO-ZONE-E",
      name: "Hunthar Veng Escarpment",
      district: "Aizawl",
      state: "Mizoram",
      lat: 23.7271,
      lng: 92.7176,
      riskLevel: "MODERATE",
      riskScore: 42,
      rainfall24h: 54.2,
      soilMoisture: 58,
      slopeAngle: 34,
      weatherCondition: "Overcast & Drizzle",
      historicalActivity: "Moderate (Seasonal slope creeping)",
      geologicalFault: "Surma Group Siltstone Fracture",
      fieldReportsCount: 0,
      lastUpdated: "2 hours ago",
      potentialImpact: "Sub-arterial road cracking",
      suggestedAction: "Geotechnical drone survey recommended; inspect retaining wall weep holes",
      affectedVillages: ["Hunthar Veng", "Rangvamual"],
      affectedRoads: ["Aizawl-Lengpui Airport Road (NH-108)"],
      hospitalAccess: "Civil Hospital Aizawl (Full accessibility)",
      emergencyRoute: "Tanhril-Luangmual Arterial Loop"
    },
    {
      id: "zone-ner-06",
      code: "DEMO-ZONE-F",
      name: "Bhalukpong-Tawang Axis",
      district: "West Kameng",
      state: "Arunachal Pradesh",
      lat: 27.2645,
      lng: 92.4225,
      riskLevel: "CRITICAL",
      riskScore: 82,
      rainfall24h: 184.6,
      soilMoisture: 85,
      slopeAngle: 51,
      weatherCondition: "Heavy Storm & Sheet Wash",
      historicalActivity: "Critical (Major landslide prone highway)",
      geologicalFault: "Bomba Splay Shears",
      fieldReportsCount: 5,
      lastUpdated: "8 mins ago",
      potentialImpact: "Border Defense & Civil Corridor Blockade",
      suggestedAction: "BRO Border Roads Task Force deployment; preemptive closure of Sela pass approach",
      affectedVillages: ["Munna Camp", "Senge", "Dirang Valley Outskirts"],
      affectedRoads: ["Balipara-Charduar-Tawang (BCT) Highway"],
      hospitalAccess: "District Hospital Bomdila (Cutoff from north)",
      emergencyRoute: "Orang-Kalaktang-Shergaon-Rupa-Tenga (OKSRT) Road"
    },
    {
      id: "zone-ner-07",
      code: "DEMO-ZONE-G",
      name: "Noney-Jiribam Rail & Road Axis",
      district: "Noney",
      state: "Manipur",
      lat: 24.8170,
      lng: 93.9368,
      riskLevel: "LOW",
      riskScore: 22,
      rainfall24h: 18.0,
      soilMoisture: 38,
      slopeAngle: 24,
      weatherCondition: "Partly Cloudy",
      historicalActivity: "High historical (Tupul yard 2022 memorial site)",
      geologicalFault: "Ijei River Valley Terraces",
      fieldReportsCount: 0,
      lastUpdated: "3 hours ago",
      potentialImpact: "Minimal currently; early season baseline stable",
      suggestedAction: "Routine automated telemetry logging; sensors functioning normally",
      affectedVillages: ["Tupul", "Noney Town"],
      affectedRoads: ["NH-37 Imphal-Silchar"],
      hospitalAccess: "Noney Community Health Center (Clear)",
      emergencyRoute: "Old Cachar Road (Dry weather standby)"
    },
    {
      id: "zone-ner-08",
      code: "DEMO-ZONE-H",
      name: "Jampui Hills Ridge Sector",
      district: "North Tripura",
      state: "Tripura",
      lat: 23.8315,
      lng: 92.2711,
      riskLevel: "LOW",
      riskScore: 18,
      rainfall24h: 12.4,
      soilMoisture: 32,
      slopeAngle: 22,
      weatherCondition: "Clear to Mild Humid",
      historicalActivity: "Low (Occasional soil creep along tea gardens)",
      geologicalFault: "Anticlinal Crest Stable Formation",
      fieldReportsCount: 0,
      lastUpdated: "4 hours ago",
      potentialImpact: "None anticipated under current precipitation",
      suggestedAction: "Normal green status monitoring",
      affectedVillages: ["Vanghmun", "Phuldungsei"],
      affectedRoads: ["Kanchanpur-Jampui Ridge Road"],
      hospitalAccess: "Kanchanpur Sub-Divisional Hospital (Clear)",
      emergencyRoute: "Damcherra Valley Connect"
    }
  ],

  // Infrastructure Layers for Map
  infrastructure: {
    roads: [
      { name: "NH-27 East-West Corridor", length: "142 km monitored", status: "Warning: Slump Vulnerable", color: "#f97316", coordinates: [[25.18, 92.95], [25.18, 93.02], [25.22, 93.15]] },
      { name: "NH-206 Sohra Lifeline", length: "54 km", status: "Critical: Active Runoff", color: "#ef4444", coordinates: [[25.35, 91.68], [25.30, 91.58], [25.25, 91.52]] },
      { name: "NH-29 Kohima Lifeline", length: "78 km", status: "Moderate: Single Lane", color: "#f59e0b", coordinates: [[25.75, 93.80], [25.68, 94.11], [25.60, 94.15]] },
      { name: "BCT Highway West Kameng", length: "110 km", status: "Critical: Mudslide Risk", color: "#ef4444", coordinates: [[27.15, 92.35], [27.26, 92.42], [27.35, 92.48]] },
      { name: "NH-10 Sevoke-Teesta-Gangtok", length: "85 km", status: "High: River Scour", color: "#f97316", coordinates: [[27.10, 88.50], [27.25, 88.55], [27.34, 88.61]] }
    ],
    villages: [
      { name: "Mawlyndep", population: 1420, isolationRisk: "CRITICAL", zone: "DEMO-ZONE-A", lat: 25.31, lng: 91.59 },
      { name: "Upper Umrangso", population: 2890, isolationRisk: "HIGH", zone: "DEMO-ZONE-B", lat: 25.19, lng: 93.04 },
      { name: "15th Mile Basti", population: 640, isolationRisk: "HIGH", zone: "DEMO-ZONE-C", lat: 27.35, lng: 88.62 },
      { name: "Phesama", population: 3100, isolationRisk: "MODERATE", zone: "DEMO-ZONE-D", lat: 25.65, lng: 94.11 },
      { name: "Munna Camp", population: 850, isolationRisk: "CRITICAL", zone: "DEMO-ZONE-F", lat: 27.28, lng: 92.43 },
      { name: "Hunthar Veng", population: 4200, isolationRisk: "MODERATE", zone: "DEMO-ZONE-E", lat: 23.73, lng: 92.72 }
    ],
    hospitals: [
      { name: "Cherrapunji Community Health Centre", beds: 30, traumaReady: true, status: "Vulnerable Access", lat: 25.295, lng: 91.588 },
      { name: "Civil Hospital Haflong", beds: 100, traumaReady: true, status: "Accessible via Southern Ridge", lat: 25.178, lng: 93.018 },
      { name: "STNM Super Speciality Hospital Gangtok", beds: 350, traumaReady: true, status: "Fully Operational", lat: 27.325, lng: 88.601 },
      { name: "Naga Hospital Authority Kohima", beds: 200, traumaReady: true, status: "Operational", lat: 25.669, lng: 94.103 },
      { name: "District Hospital Bomdila", beds: 75, traumaReady: true, status: "Northern Access Blocked", lat: 27.255, lng: 92.415 }
    ]
  },

  // Active Early Warnings & Alerts
  alerts: [
    {
      id: "ALT-2026-0901",
      code: "ALT-CRIT-01",
      level: "CRITICAL",
      title: "CRITICAL LANDSLIDE RISK: Cherrapunji Slope Sector",
      location: "Demo Zone A (East Khasi Hills, Meghalaya)",
      riskScore: 87,
      impact: "NH-206 likely impassable within 4-6 hrs; Mawlyndep village connectivity threatened.",
      action: "Issue Red Warning to District Magistrate; position SDRF unit at Sohra fire station.",
      timestamp: "Today, 16:42 IST",
      status: "ACTIVE",
      channels: ["Dashboard", "SDRF Radio", "Prototype SMS (simulated)", "Civil Admin Email"],
      sensorTriggers: ["Cumulative rainfall > 200mm/24h", "Piezometer pore pressure surge +34%"]
    },
    {
      id: "ALT-2026-0902",
      code: "ALT-CRIT-02",
      level: "CRITICAL",
      title: "FLASH MUDSLIDE WARNING: Bhalukpong-Tawang Axis",
      location: "Demo Zone F (West Kameng, Arunachal Pradesh)",
      riskScore: 82,
      impact: "BCT Highway corridor Km 42-47 slope failure imminent; Munna Camp isolated.",
      action: "Notify Border Roads Organisation (Project Vartak); divert traffic to OKSRT route.",
      timestamp: "Today, 16:15 IST",
      status: "UNDER REVIEW",
      channels: ["Dashboard", "BRO Liaison", "District Disaster Cell"],
      sensorTriggers: ["Inclinometer tilt rate: 4.2 mm/hr", "Heavy cloudburst radar echo"]
    },
    {
      id: "ALT-2026-0903",
      code: "ALT-HIGH-03",
      level: "HIGH",
      title: "HIGH RISK DEBRIS RUNOFF: Haflong Hill Pass",
      location: "Demo Zone B (Dima Hasao, Assam)",
      riskScore: 74,
      impact: "East-West Corridor NH-27 slow movement; potential ballast slippage.",
      action: "Enforce heavy cargo truck holding at Jatinga checkgate; continuous drone flyovers.",
      timestamp: "Today, 15:30 IST",
      status: "ACKNOWLEDGED",
      channels: ["Dashboard", "NHAI Control", "Assam Police Traffic"],
      sensorTriggers: ["Soil saturation index: 79%", "Rainfall intensity: 22 mm/hr"]
    },
    {
      id: "ALT-2026-0904",
      code: "ALT-HIGH-04",
      level: "HIGH",
      title: "ALPINE SCREE INSTABILITY: Gangtok-JN Marg Corridor",
      location: "Demo Zone C (East Sikkim, Sikkim)",
      riskScore: 71,
      impact: "JN Marg 15th Mile tourist traffic halted; Sherathang border logistics affected.",
      action: "Restrict civilian vehicles; keep wheel loaders stationed at 3rd Mile.",
      timestamp: "Today, 14:10 IST",
      status: "ACTIVE",
      channels: ["Dashboard", "Sikkim Tourism Desk", "Police Control Gangtok"],
      sensorTriggers: ["Ultrasonic rock displacement sensor: 3mm creep", "Continuous drizzle"]
    },
    {
      id: "ALT-2026-0905",
      code: "ALT-MOD-05",
      level: "MODERATE",
      title: "GROUND SUBSIDENCE WATCH: Kohima NH-29 Sinking Area",
      location: "Demo Zone D (Kohima, Nagaland)",
      riskScore: 48,
      impact: "Slight tarmac undulation; single lane restriction advised.",
      action: "Inspect culvert drainage; calibrate GNSS displacement pegs.",
      timestamp: "Today, 11:20 IST",
      status: "ACKNOWLEDGED",
      channels: ["Dashboard", "Nagaland PWD"],
      sensorTriggers: ["Pavement crack monitor: 1.1mm widening"]
    },
    {
      id: "ALT-2026-0906",
      code: "ALT-LOW-06",
      level: "LOW",
      title: "ROUTINE BASELINE: Noney-Jiribam Axis Stable",
      location: "Demo Zone G (Noney, Manipur)",
      riskScore: 22,
      impact: "No immediate threat to NH-37 or railway works.",
      action: "Maintain standard automated telemetry polling interval.",
      timestamp: "Today, 09:00 IST",
      status: "ROUTINE",
      channels: ["Dashboard Audit Log"],
      sensorTriggers: ["All sensor parameters within green thresholds"]
    }
  ],

  // Incident Reports (Community & Field Officer Reports with Offline/Synced states)
  incidentReports: [
    {
      id: "REP-2026-8801",
      reporterType: "Field Officer",
      reporterName: "T. Sangma (Geol. Asst)",
      incidentType: "Ground Crack",
      severity: "High",
      locationName: "Km 18, Cherrapunji Escarpment Slope",
      lat: 25.302,
      lng: 91.584,
      description: "Observed continuous transverse fissure measuring approx 18m length, width 4.5cm on the upper shoulder of the village road. Runoff water infiltrating fissure actively.",
      image: "assets/ner_hero.jpg",
      timestamp: "Today, 15:50 IST",
      syncStatus: "Synced",
      offlineStored: false,
      aiRiskCorrelation: "Zone A: Matches satellite soil saturation trend"
    },
    {
      id: "REP-2026-8802",
      reporterType: "Citizen",
      reporterName: "Lalmuana H.",
      incidentType: "Rockfall",
      severity: "Moderate",
      locationName: "Near Jatinga Overbridge, Dima Hasao",
      lat: 25.185,
      lng: 93.027,
      description: "Small boulder rolling onto roadside ditch during noon rain. Rocks about 1-2 feet wide. Passing vehicles braking suddenly.",
      image: null,
      timestamp: "Today, 14:15 IST",
      syncStatus: "Synced",
      offlineStored: false,
      aiRiskCorrelation: "Zone B: Validated by highway patrol"
    },
    {
      id: "REP-2026-8803",
      reporterType: "Authority",
      reporterName: "BRO Project Vartak Recon",
      incidentType: "Dangerous Slope",
      severity: "Critical",
      locationName: "Km 44 BCT Highway, West Kameng",
      lat: 27.268,
      lng: 92.429,
      description: "Severe toe erosion noticed below culvert 44/2. Slump failure of retaining gabion wall by 1.2 meters. High probability of complete road slice.",
      image: "assets/ner_hero.jpg",
      timestamp: "Today, 13:40 IST",
      syncStatus: "Synced",
      offlineStored: false,
      aiRiskCorrelation: "Zone F: Matches critical tilt telemetry"
    },
    {
      id: "REP-2026-8804",
      reporterType: "Citizen",
      reporterName: "Dorjee T.",
      incidentType: "Road Blockage",
      severity: "High",
      locationName: "15th Mile Alpine Sector, Sikkim",
      lat: 27.342,
      lng: 88.612,
      description: "Mud and loose gravel washed across both lanes. Light cars unable to cross. Heavy Army 4x4s slowly passing.",
      image: null,
      timestamp: "Today, 12:20 IST",
      syncStatus: "Synced",
      offlineStored: false,
      aiRiskCorrelation: "Zone C: Corridor alert generated"
    }
  ],

  // Team AlertNex Member Details (Exact requirements)
  team: [
    {
      name: "AYUSH KUMAR",
      role: "Team Leader",
      responsibilities: ["AI/ML Architecture", "Landslide Risk Prediction Engine", "System Architecture", "Overall Coordination"],
      avatarInitials: "AK",
      education: "B.Tech Computer Science & Engineering",
      focus: "Explainable AI, Decision-Support Systems, Geospatial Modeling",
      icon: "crown"
    },
    {
      name: "PRERANA MONDAL",
      role: "Team Member",
      responsibilities: ["Frontend Development", "UI/UX Design", "GIS Data Visualization", "User Accessibility"],
      avatarInitials: "PM",
      education: "B.Tech Information Technology",
      focus: "Interactive Dashboards, Leaflet GIS, Responsive Web UX",
      icon: "layout"
    },
    {
      name: "SONDEEP KUMAR",
      role: "Team Member",
      responsibilities: ["Backend Development", "Database Architecture (PostGIS)", "API Integration", "Data Pipelines"],
      avatarInitials: "SK",
      education: "B.Tech Computer Science & Engineering",
      focus: "FastAPI, GeoJSON Streaming, Asynchronous Ingestion",
      icon: "server"
    },
    {
      name: "SHINJINI LOHAR",
      role: "Team Member",
      responsibilities: ["AI/ML Engineering", "Computer Vision Hazard Detection", "Remote Sensing", "Data Processing"],
      avatarInitials: "SL",
      education: "B.Tech Data Science & AI",
      focus: "Satellite InSAR Processing, DEM Terrain Features, Scikit-Learn",
      icon: "cpu"
    },
    {
      name: "SUBHAM KUMAR MODI",
      role: "Team Member",
      responsibilities: ["GIS Spatial Analysis", "Mobile Application Workflow", "Offline Storage Sync", "QA Testing"],
      avatarInitials: "SM",
      education: "B.Tech Computer Science & Engineering",
      focus: "IndexedDB Local Sync, Spatial Buffers, Road Graph Algorithms",
      icon: "map-pin"
    },
    {
      name: "RAHUL DEO",
      role: "Team Member",
      responsibilities: ["Cloud Infrastructure", "DevOps & Deployment", "Security & Data Integrity", "System Testing"],
      avatarInitials: "RD",
      education: "B.Tech Information Technology",
      focus: "Containerization, Multi-Channel Notification APIs, Failover",
      icon: "shield"
    }
  ],

  // Data Sources & Integration Status (SIH Transparency)
  dataSources: [
    { name: "Rainfall Data", type: "Prototype Dataset", status: "DEMO", badgeClass: "demo" },
    { name: "Terrain Data", type: "SRTM DEM / Prototype Terrain Data", status: "PROTOTYPE", badgeClass: "prototype" },
    { name: "Historical Landslide Data", type: "Public Geotechnical Dataset", status: "PROTOTYPE", badgeClass: "prototype" },
    { name: "Citizen & Ground Reports", type: "AlertNex Reporting System", status: "WORKING", badgeClass: "working" },
    { name: "Satellite InSAR Integration", type: "Future Remote Sensing API", status: "PLANNED", badgeClass: "planned" }
  ],

  // System Architecture & Tech Stack Specs
  techStack: {
    frontend: {
      name: "Frontend Architecture",
      items: ["HTML5 Semantic Structure", "Modern Vanilla CSS (Design Tokens)", "Modular ES6+ JavaScript", "Leaflet.js GIS Engine", "Chart.js Visualizations"]
    },
    backend: {
      name: "Backend & APIs",
      items: ["Python 3.12+", "FastAPI REST Framework", "Uvicorn ASGI Server", "Pydantic Schemas"]
    },
    aiMl: {
      name: "Risk Assessment Engine",
      items: ["Python NumPy & Pandas", "Transparent Multi-Factor Formula", "Rule-Based Risk Factor Explanation", "NER Geotechnical Calibration"]
    },
    database: {
      name: "Database & Persistence",
      items: ["SQLite (Embedded Demo DB)", "SQLAlchemy ORM Data Models", "GeoJSON Vector Topologies", "PostgreSQL/PostGIS Architecture Ready"]
    },
    gis: {
      name: "GIS & Spatial Mapping",
      items: ["Leaflet GIS Vector Layering", "CartoDB Topographic Basemaps", "SRTM 30m Digital Elevation Model (DEM)", "Interactive Risk Epicut/Buffer Geometry"]
    },
    offline: {
      name: "Offline Ground Capability",
      items: ["IndexedDB Client Persistence", "LocalStorage Queue Fallback", "Automated Background Sync", "Field Officer Geotagged Reports"]
    },
    notifications: {
      name: "Multi-Channel Alert Gateway",
      items: ["SMTP Emergency Email Dispatch (Active)", "Twilio SMS / Simulated Gateway", "Browser Live Ticker & Toast Alerts", "NDMA CAP Gateway Compatible Protocol"]
    }
  }
};

// Export to window for browser consumption
if (typeof window !== "undefined") {
  window.AlertNexData = AlertNexData;
}
