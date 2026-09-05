"""
SIH 2026 Official 4-Page Idea Description PDF Generator for Team AlertNex
Problem Statement ID: SIH26001
Organization: Ministry of Development of North Eastern Region (MDoNER)
Theme: Disaster Management | Category: Software
Generates: SIH2026_AlertNex_Idea_Description_NiT.pdf and SIH2026_AlertNex_Idea_Description_4Pages.pdf
"""

from fpdf import FPDF
from fpdf.enums import XPos, YPos
import os

class SIH_PDF(FPDF):
    def __init__(self):
        super().__init__('P', 'mm', 'A4')  # Portrait A4: 210mm x 297mm
        self.set_margins(12, 10, 12)
        self.set_auto_page_break(auto=False)
        
    def header(self):
        # Top Header Bar on every page
        self.set_fill_color(27, 54, 93)  # Dark Navy #1B365D
        self.rect(0, 0, 210, 10, 'F')
        
        self.set_font('Helvetica', 'B', 8.5)
        self.set_text_color(255, 107, 0)  # SIH Orange #FF6B00
        self.set_xy(12, 2.5)
        self.cell(100, 5, 'SMART INDIA HACKATHON 2026  -  INTERNAL EVALUATION', new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        self.set_font('Helvetica', 'B', 8)
        self.set_text_color(255, 255, 255)
        self.set_xy(110, 2.5)
        self.cell(88, 5, 'PS ID: SIH26001 | MDoNER | Software Edition', align='R', new_x=XPos.RIGHT, new_y=YPos.TOP)
        
    def footer(self):
        # Bottom Footer on every page
        self.set_fill_color(248, 250, 252)
        self.rect(0, 289, 210, 8, 'F')
        self.set_draw_color(203, 213, 225)
        self.line(0, 289, 210, 289)
        
        self.set_font('Helvetica', '', 7.5)
        self.set_text_color(100, 116, 139)
        self.set_xy(12, 290.5)
        self.cell(140, 5, 'Team AlertNex | PS ID: SIH26001 | Ministry of Development of North Eastern Region (MDoNER)', new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        self.set_font('Helvetica', 'B', 7.5)
        self.set_text_color(27, 54, 93)
        self.set_xy(150, 290.5)
        self.cell(48, 5, f'Page {self.page_no()} of 4', align='R', new_x=XPos.RIGHT, new_y=YPos.TOP)

    def draw_section_header(self, y, title, badge=None):
        self.set_fill_color(241, 245, 249)
        self.rect(12, y, 186, 6.5, 'F')
        self.set_draw_color(203, 213, 225)
        self.rect(12, y, 186, 6.5, 'D')
        
        # Left orange accent bar
        self.set_fill_color(255, 107, 0)
        self.rect(12, y, 2.5, 6.5, 'F')
        
        self.set_font('Helvetica', 'B', 8.5)
        self.set_text_color(27, 54, 93)
        self.set_xy(16, y + 1)
        self.cell(130, 4.5, title, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        if badge:
            self.set_font('Helvetica', 'B', 7.5)
            self.set_text_color(0, 138, 75)
            self.set_xy(135, y + 1)
            self.cell(61, 4.5, badge, align='R', new_x=XPos.RIGHT, new_y=YPos.TOP)


def create_sih_pdf():
    pdf = SIH_PDF()
    
    # ============================================================
    # PAGE 1: TITLE, TEAM, PROBLEM, SOLUTION & RISK LEVELS
    # ============================================================
    pdf.add_page()
    
    # Main Document Header Box
    pdf.set_fill_color(250, 250, 252)
    pdf.rect(12, 12, 186, 23.5, 'F')
    pdf.set_draw_color(27, 54, 93)
    pdf.set_line_width(0.4)
    pdf.rect(12, 12, 186, 23.5, 'D')
    
    pdf.set_font('Helvetica', 'B', 13.5)
    pdf.set_text_color(27, 54, 93)
    pdf.set_xy(14, 13.5)
    pdf.cell(182, 5.5, 'AI-Based Early Warning & Landslide Monitoring System in NER', align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font('Helvetica', 'B', 9.2)
    pdf.set_text_color(230, 81, 0)
    pdf.set_x(14)
    pdf.cell(182, 4.6, 'Decision-Support Platform with Dynamic Risk & Connectivity Impact Analysis', align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font('Helvetica', '', 7.6)
    pdf.set_text_color(71, 85, 105)
    pdf.set_x(14)
    pdf.cell(182, 4.0, 'Organization: Ministry of Development of North Eastern Region (MDoNER)  |  Theme: Disaster Management  |  Category: Software', align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    # 1. Team Profile Table
    pdf.draw_section_header(37.5, '1. TEAM DETAILS - TEAM ALERTNEX (SIH26001)', 'Team Leader: Ayush Kumar')
    
    # Table Header
    y = 45.5
    pdf.set_fill_color(27, 54, 93)
    pdf.rect(12, y, 186, 5.2, 'F')
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(14, y + 0.8)
    pdf.cell(10, 3.8, 'No.', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(40, 3.8, 'Member Name', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(32, 3.8, 'Role', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(104, 3.8, 'Assigned Responsibilities & Focus Area', new_x=XPos.RIGHT, new_y=YPos.TOP)
    
    members = [
        ('1', 'Ayush Kumar', 'Team Leader', 'AI/ML Modeling, System Architecture, Overall Coordination', True),
        ('2', 'Prerana Mondal', 'Team Member', 'Frontend Development, UI/UX Design, Data Visualization (React.js)', False),
        ('3', 'Sondeep Kumar', 'Team Member', 'Backend Development, PostgreSQL/PostGIS Database, API Integration', False),
        ('4', 'Shinjini Lohar', 'Team Member', 'AI/ML Algorithms, Computer Vision, Data Processing & XAI', False),
        ('5', 'Subham Kumar Modi', 'Team Member', 'Geospatial GIS Analysis, Flutter Mobile App, QA & Testing', False),
        ('6', 'Rahul Deo', 'Team Member', 'Cloud Infrastructure, DevOps Deployment, Testing & Security', False)
    ]
    
    y = 50.7
    for no, name, role, resp, is_lead in members:
        pdf.set_fill_color(248, 250, 252) if int(no) % 2 == 1 else pdf.set_fill_color(255, 255, 255)
        pdf.rect(12, y, 186, 4.8, 'F')
        pdf.set_draw_color(226, 232, 240)
        pdf.line(12, y + 4.8, 198, y + 4.8)
        
        pdf.set_font('Helvetica', 'B' if is_lead else '', 7.3)
        pdf.set_text_color(230, 81, 0) if is_lead else pdf.set_text_color(30, 41, 59)
        pdf.set_xy(14, y + 0.6)
        pdf.cell(10, 3.6, no, new_x=XPos.RIGHT, new_y=YPos.TOP)
        pdf.cell(40, 3.6, name, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', 'B' if is_lead else '', 7.3)
        pdf.set_text_color(0, 138, 75) if is_lead else pdf.set_text_color(30, 41, 59)
        pdf.cell(32, 3.6, role, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 6.9)
        pdf.set_text_color(71, 85, 105)
        pdf.cell(104, 3.6, resp, new_x=XPos.RIGHT, new_y=YPos.TOP)
        y += 4.8
        
    # 2. Problem Understanding
    pdf.draw_section_header(82.0, '2. PROBLEM UNDERSTANDING - THE NER LANDSLIDE CRISIS')
    
    pdf.set_xy(12, 90.0)
    pdf.set_font('Helvetica', '', 7.4)
    pdf.set_text_color(30, 41, 59)
    prob_text = (
        "The North Eastern Region (NER) of India represents one of the world's most ecologically fragile and landslide-prone mountain systems. "
        "Characterized by geologically young, seismically active Himalayan slopes and extreme monsoon downpours (>150-200 mm/day), the region suffers hundreds "
        "of sudden slope failures every year. Critical highway lifelines like NH-10 (Sikkim) and NH-29 (Nagaland/Manipur) face recurring blockages, severing food, "
        "fuel, and medical logistics. Over 70% of deep-valley tribal hamlets depend on single access roads; a single slide traps thousands without healthcare access. "
        "Severe storms frequently knock out cellular towers, creating communication blackouts when ground reporting is most urgent. Existing disaster systems are "
        "entirely reactive, leaving authorities to respond only after disaster strikes, while academic models merely predict hazard probability without analyzing human and connectivity consequences."
    )
    pdf.multi_cell(186, 3.5, prob_text)
    
    # 4 Challenge Callout Boxes
    ch_y = 117.5
    ch_boxes = [
        ('Steep Terrain & Cloudbursts', 'Heavy monsoons saturate fragile shale/soil, causing sudden debris flows.', 239, 68, 68),
        ('Lifeline Highway Severance', 'NH-10 and NH-29 collapse frequently, cutting essential civil & military links.', 249, 115, 22),
        ('Remote Village Isolation', 'Hundreds of tribal hamlets lose vehicular access to emergency hospitals.', 245, 158, 11),
        ('Zero-Network Dead Zones', 'Storms knock out cell towers; ground reports reach authorities hours/days late.', 27, 54, 93)
    ]
    for i, (title, desc, r, g, b) in enumerate(ch_boxes):
        bx = 12 + (i % 2) * 94
        by = ch_y + (i // 2) * 14.5
        pdf.set_fill_color(248, 250, 252)
        pdf.rect(bx, by, 92, 13, 'F')
        pdf.set_draw_color(r, g, b)
        pdf.set_line_width(0.3)
        pdf.rect(bx, by, 92, 13, 'D')
        pdf.set_fill_color(r, g, b)
        pdf.rect(bx, by, 2.5, 13, 'F')
        
        pdf.set_font('Helvetica', 'B', 7.5)
        pdf.set_text_color(r, g, b)
        pdf.set_xy(bx + 4, by + 1.5)
        pdf.cell(86, 3.5, title, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 6.8)
        pdf.set_text_color(71, 85, 105)
        pdf.set_xy(bx + 4, by + 5.2)
        pdf.multi_cell(86, 3.2, desc)
        
    # 3. Proposed Solution
    pdf.draw_section_header(149.0, '3. PROPOSED SOLUTION - ALERTNEX INTELLIGENT PLATFORM')
    
    pdf.set_xy(12, 157.0)
    pdf.set_font('Helvetica', '', 7.5)
    pdf.set_text_color(30, 41, 59)
    sol_text = (
        "Team AlertNex proposes an AI-powered disaster decision-support and early warning ecosystem engineered specifically for the North Eastern Region. "
        "Rather than functioning as a passive map, AlertNex combines multi-source environmental sensing (satellite, meteorological, topographic) with crowdsourced "
        "offline ground intelligence to calculate dynamic landslide risk at a 30-meter resolution and instantly translates that risk into actionable Connectivity Impact Intelligence."
    )
    pdf.multi_cell(186, 3.5, sol_text)
    
    # 4 Dynamic Risk Levels Cards (NO OVERFLOW - CLEAN MULTI-CELL IN BOUNDS)
    r_y = 171.5
    risks = [
        ('GREEN: LOW RISK (0 - 30%)', 'Stable slopes. Routine satellite & automated weather polling. Normal traffic permitted on mountain corridors.', 16, 185, 129, 236, 253, 245),
        ('YELLOW: MODERATE (31 - 60%)', 'Elevated soil moisture or persistent rainfall. Advisories pushed to highway patrols; field teams monitor slopes.', 245, 158, 11, 255, 251, 235),
        ('ORANGE: HIGH RISK (61 - 80%)', 'Heavy rain + steep terrain saturation. Heavy freight restricted; village disaster committees alerted; bypasses mapped.', 249, 115, 22, 255, 247, 237),
        ('RED: CRITICAL RISK (81 - 100%)', 'Imminent landslide danger. Instant Siren/SMS broadcast; bypass corridors activated; SDRF/BRO pre-deployment.', 239, 68, 68, 254, 242, 242)
    ]
    for i, (title, desc, r, g, b, f_r, f_g, f_b) in enumerate(risks):
        by = r_y + i * 12.5
        pdf.set_fill_color(f_r, f_g, f_b)
        pdf.rect(12, by, 186, 11.2, 'F')
        pdf.set_draw_color(r, g, b)
        pdf.set_line_width(0.3)
        pdf.rect(12, by, 186, 11.2, 'D')
        pdf.set_fill_color(r, g, b)
        pdf.rect(12, by, 3, 11.2, 'F')
        
        pdf.set_font('Helvetica', 'B', 7.6)
        pdf.set_text_color(r, g, b)
        pdf.set_xy(17, by + 3.6)
        pdf.cell(55, 4, title, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        # Vertical divider line
        pdf.set_draw_color(r, g, b)
        pdf.line(73, by + 1.8, 73, by + 9.4)
        
        # Description wrapped cleanly inside 118mm width
        pdf.set_font('Helvetica', '', 6.9)
        pdf.set_text_color(30, 41, 59)
        pdf.set_xy(76, by + 1.8)
        pdf.multi_cell(118, 3.4, desc)
        
    # Paradigm Shift Box
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(12, 224.5, 186, 22, 'F')
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(12, 224.5, 186, 22, 'D')
    
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(27, 54, 93)
    pdf.set_xy(14, 226.5)
    pdf.cell(182, 4, 'PARADIGM SHIFT: CURRENT REACTIVE DISASTER CYCLE vs. ALERTNEX PROACTIVE PREPAREDNESS', align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(239, 68, 68)
    pdf.set_xy(16, 232.5)
    pdf.cell(42, 4, 'CURRENT (REACTIVE):', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.set_font('Helvetica', '', 7.1)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(138, 4, 'Disaster Strikes  ->  Hazard Detected Late  ->  Chaotic Evacuation  ->  Blocked Lifelines  ->  Casualties', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(0, 138, 75)
    pdf.set_xy(16, 239.5)
    pdf.cell(42, 4, 'ALERTNEX (PROACTIVE):', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.set_font('Helvetica', '', 7.1)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(138, 4, 'Multi-Source Monitoring  ->  Dynamic Risk Scoring  ->  6-12h Early Warning  ->  Pre-Rerouting  ->  Lives Saved', new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # Page 1 Bottom Core Highlights
    pdf.set_fill_color(241, 245, 249)
    pdf.rect(12, 250.0, 186, 34, 'F')
    pdf.set_draw_color(27, 54, 93)
    pdf.set_line_width(0.3)
    pdf.rect(12, 250.0, 186, 34, 'D')
    
    pdf.set_font('Helvetica', 'B', 7.8)
    pdf.set_text_color(27, 54, 93)
    pdf.set_xy(14, 251.8)
    pdf.cell(182, 4, 'KEY CAPABILITY HIGHLIGHTS AT A GLANCE', align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    summary_pillars = [
        ('30-Meter Spatial Grid', 'High-resolution slope susceptibility computed across all 8 North Eastern states using SRTM elevation, IMD precipitation, and soil moisture rasters.', 230, 81, 0),
        ('6-12h Early Warning Window', 'Actionable lead time allows traffic police to divert mountain convoys, BRO to stage machinery, and district magistrates to initiate orderly evacuation.', 0, 138, 75),
        ('100% Offline Capability', 'Zero-network mobile app with local SQLite cache empowers isolated tribal hamlets and patrols to report tension cracks without cellular connectivity.', 27, 54, 93)
    ]
    for i, (p_title, p_desc, pr, pg, pb) in enumerate(summary_pillars):
        px = 15 + i * 61
        pdf.set_fill_color(255, 255, 255)
        pdf.rect(px, 257.0, 59, 25.0, 'F')
        pdf.set_draw_color(pr, pg, pb)
        pdf.rect(px, 257.0, 59, 25.0, 'D')
        pdf.set_fill_color(pr, pg, pb)
        pdf.rect(px, 257.0, 59, 1.8, 'F')
        
        pdf.set_font('Helvetica', 'B', 7.2)
        pdf.set_text_color(pr, pg, pb)
        pdf.set_xy(px + 2.5, 259.5)
        pdf.cell(54, 3.5, p_title, align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        pdf.set_font('Helvetica', '', 6.5)
        pdf.set_text_color(71, 85, 105)
        pdf.set_xy(px + 2.5, 264.0)
        pdf.multi_cell(54, 3.0, p_desc, align='C')

    # ============================================================
    # PAGE 2: WORKFLOW, FEATURES & KEY INNOVATIONS (USPs)
    # ============================================================
    pdf.add_page()
    
    # 4. System Workflow
    pdf.draw_section_header(12, '4. END-TO-END SYSTEM WORKFLOW - FROM SENSING TO ACTION')
    
    workflow_steps = [
        ('1. Multi-Source Ingestion', 'IMD gridded rainfall, NASA SMAP soil moisture, SRTM 30m DEM slope, Sentinel-2 optics, GSI historical slides & mobile reports.', 230, 81, 0),
        ('2. Data Harmonization', 'FastAPI microservices perform coordinate re-projection (WGS84), Antecedent Precipitation Index (24h, 72h, 7d) & normalization.', 27, 54, 93),
        ('3. AI Machine Learning', 'XGBoost + Random Forest ensemble computes pixel-level failure probability; SHAP calculates factor contribution weights.', 27, 54, 93),
        ('4. Dynamic Risk Score', 'Categorizes terrain into Green (0-30%), Yellow (31-60%), Orange (61-80%), and Red (81-100%) susceptibility tiers.', 0, 138, 75),
        ('5. GIS Mapping Overlay', 'PostGIS spatial engine renders interactive 30m hazard polygons over OpenStreetMap topological road vectors.', 0, 138, 75),
        ('6. Connectivity Analysis', 'Graph engine identifies blocked road choke points, flags isolated villages, calculates hospital delays & Dijkstra bypass routes.', 230, 81, 0),
        ('7. Multi-Channel Output', 'Web dashboard for SDRF/DDMA, offline Flutter mobile app for responders, and automated SMS/FCM early warning broadcasts.', 239, 68, 68)
    ]
    
    wy = 21.0
    for title, desc, r, g, b in workflow_steps:
        pdf.set_fill_color(248, 250, 252)
        pdf.rect(12, wy, 186, 10.5, 'F')
        pdf.set_draw_color(226, 232, 240)
        pdf.rect(12, wy, 186, 10.5, 'D')
        pdf.set_fill_color(r, g, b)
        pdf.rect(12, wy, 2.5, 10.5, 'F')
        
        pdf.set_font('Helvetica', 'B', 7.5)
        pdf.set_text_color(r, g, b)
        pdf.set_xy(16, wy + 3.2)
        pdf.cell(46, 4, title, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 6.9)
        pdf.set_text_color(51, 65, 85)
        pdf.set_xy(64, wy + 1.8)
        pdf.multi_cell(130, 3.3, desc)
        wy += 12.0
        
    # 5. Key System Features
    pdf.draw_section_header(107.5, '5. KEY SYSTEM FEATURES & FUNCTIONALITIES')
    
    # Feature Table
    fy = 115.5
    pdf.set_fill_color(27, 54, 93)
    pdf.rect(12, fy, 186, 5.5, 'F')
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(14, fy + 1)
    pdf.cell(42, 4, 'Feature Name', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(38, 4, 'Target Stakeholder', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(106, 4, 'Practical Capability & Functionality', new_x=XPos.RIGHT, new_y=YPos.TOP)
    
    features = [
        ('Dynamic AI Risk Scoring', 'District Magistrates / DDMA', 'Continuous real-time updating of slope failure susceptibility with accumulating rainfall.'),
        ('Interactive 3D GIS Map', 'SDRF / NDRF / MDoNER', 'Multi-layer spatial map with contour elevations, road vectors, and dynamic risk polygons.'),
        ('Road Blockage Analysis', 'Traffic Police / BRO', 'Predicts specific highway choke points likely to collapse before debris covers the road.'),
        ('Village Isolation Predictor', 'District Administration', 'Generates list of remote villages cut off with estimated resident population numbers.'),
        ('Hospital Accessibility Matrix', '108 Emergency Ambulance', 'Flags cut-off primary health centers and computes detour transit delays.'),
        ('Dynamic Route Planner', 'Emergency Convoys', 'Autonomous calculation of open alternative routes bypassing blocked hill corridors.'),
        ('Offline Mobile Reporting', 'Citizens / Road Patrols', 'Captures geotagged photos of tension cracks without internet, auto-syncing when online.'),
        ('Explainable AI Inspector', 'Disaster Analysts', 'Transparently breaks down mathematical prediction into percentage factor contributions.'),
        ('Multi-Channel Early Warning', 'Public & Transporters', 'Broadcasts Common Alerting Protocol (CAP) SMS alerts and localized push notifications.')
    ]
    
    fy = 121.0
    for fname, target, cap in features:
        pdf.set_fill_color(255, 255, 255)
        pdf.rect(12, fy, 186, 5.3, 'F')
        pdf.set_draw_color(226, 232, 240)
        pdf.line(12, fy + 5.3, 198, fy + 5.3)
        
        pdf.set_font('Helvetica', 'B', 7)
        pdf.set_text_color(27, 54, 93)
        pdf.set_xy(14, fy + 0.9)
        pdf.cell(42, 3.6, fname, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 7)
        pdf.set_text_color(230, 81, 0)
        pdf.cell(38, 3.6, target, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 6.8)
        pdf.set_text_color(71, 85, 105)
        pdf.cell(106, 3.6, cap, new_x=XPos.RIGHT, new_y=YPos.TOP)
        fy += 5.3
        
    # 6. Key Innovations (USPs)
    pdf.draw_section_header(172.5, '6. KEY INNOVATIONS & UNIQUE SELLING POINTS (USPs)')
    
    # Innovation Card 1
    pdf.set_fill_color(255, 247, 237)
    pdf.rect(12, 181.5, 186, 31, 'F')
    pdf.set_draw_color(230, 81, 0)
    pdf.rect(12, 181.5, 186, 31, 'D')
    pdf.set_fill_color(230, 81, 0)
    pdf.rect(12, 181.5, 2.5, 31, 'F')
    
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(230, 81, 0)
    pdf.set_xy(16, 183.0)
    pdf.cell(178, 4, 'INNOVATION 1: DYNAMIC RISK + CONNECTIVITY IMPACT ANALYSIS (THE CORE BREAKTHROUGH)', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font('Helvetica', '', 7.1)
    pdf.set_text_color(30, 41, 59)
    pdf.set_xy(16, 188.0)
    pdf.multi_cell(178, 3.5, 
        "Existing disaster systems merely predict hazard probability in a district ('75% chance of slide'). AlertNex answers the operational question: "
        "'What happens if a landslide occurs?' By coupling spatial hazard polygons with OpenStreetMap topological road graphs using PostGIS, AlertNex autonomously predicts: "
        "(1) exact road segments that will be blocked, (2) isolated villages with population metrics, (3) cut-off primary health centers, and (4) safe alternate bypass corridors (Dijkstra algorithm) before disaster strikes."
    )
    
    # Innovation Card 2
    pdf.set_fill_color(236, 253, 245)
    pdf.rect(12, 215.0, 186, 30, 'F')
    pdf.set_draw_color(0, 138, 75)
    pdf.rect(12, 215.0, 186, 30, 'D')
    pdf.set_fill_color(0, 138, 75)
    pdf.rect(12, 215.0, 2.5, 30, 'F')
    
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(0, 138, 75)
    pdf.set_xy(16, 216.5)
    pdf.cell(178, 4, 'INNOVATION 2: OFFLINE COMMUNITY & FIELD REPORTING (CROWD-SOURCED ZERO-INTERNET INTELLIGENCE)', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font('Helvetica', '', 7.1)
    pdf.set_text_color(30, 41, 59)
    pdf.set_xy(16, 221.5)
    pdf.multi_cell(178, 3.5,
        "Remote Himalayan valleys regularly suffer complete telecommunication collapses during heavy downpours. AlertNex features an offline-first Flutter mobile application "
        "backed by an encrypted local SQLite database. Villagers and road patrols capture photos of developing tension cracks, soil slips, and blocked culverts with hardware GPS tagging. "
        "When the device enters any 2G/3G/4G/Wi-Fi coverage zone, background workers automatically synchronize queued reports to the central server without data loss."
    )
    
    # Innovation Card 3
    pdf.set_fill_color(254, 242, 242)
    pdf.rect(12, 247.5, 186, 33, 'F')
    pdf.set_draw_color(239, 68, 68)
    pdf.rect(12, 247.5, 186, 33, 'D')
    pdf.set_fill_color(239, 68, 68)
    pdf.rect(12, 247.5, 2.5, 33, 'F')
    
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(239, 68, 68)
    pdf.set_xy(16, 249.0)
    pdf.cell(178, 4, 'INNOVATION 3: EXPLAINABLE AI (XAI) FOR AUTHORITY TRUST & AUDITABILITY', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font('Helvetica', '', 7.1)
    pdf.set_text_color(30, 41, 59)
    pdf.set_xy(16, 254.0)
    pdf.multi_cell(178, 3.5,
        "Government officials and disaster commanders (District Magistrates, SDRF, BRO) will not order road closures or evacuations based on opaque black-box machine learning models. "
        "AlertNex uses SHAP (SHapley Additive exPlanations) to transparently explain WHY a location is classified as high-risk: e.g., 'CRITICAL RISK (87%): "
        "42% 24h Rainfall (185mm) + 21% Soil Moisture (92%) + 15% Steep Slope (48 deg) + 9% Citizen Ground Crack Observation.' This builds confidence and eliminates alert fatigue."
    )

    # ============================================================
    # PAGE 3: TECH STACK, ARCHITECTURE & IMPLEMENTATION PLAN
    # ============================================================
    pdf.add_page()
    
    # 7. Technology Stack
    pdf.draw_section_header(12, '7. PURPOSE-BUILT TECHNOLOGY STACK (FEASIBLE & REALISTIC)')
    
    ty = 20.5
    pdf.set_fill_color(27, 54, 93)
    pdf.rect(12, ty, 186, 5.5, 'F')
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(14, ty + 1)
    pdf.cell(30, 4, 'Layer / Component', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(56, 4, 'Chosen Technology', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(100, 4, 'Clear Purpose & Architectural Role', new_x=XPos.RIGHT, new_y=YPos.TOP)
    
    stack = [
        ('Frontend Web', 'React.js (v18) + Leaflet / Mapbox GL', 'Responsive dashboard for emergency control rooms; low-bandwidth 3D GIS rendering.'),
        ('Mobile App', 'Flutter (Dart)', 'Cross-platform native client for Android/iOS with camera access & hardware GPS.'),
        ('Offline Storage', 'SQLite (sqflite local database)', 'Encrypted local cache storing citizen photos and crack reports without internet.'),
        ('Backend API', 'Python 3.11 + FastAPI', 'Asynchronous, high-throughput REST API handling telemetry pipelines & queries.'),
        ('Machine Learning', 'Python + Scikit-learn + XGBoost', 'Ensemble slope stability classifier optimized for CPU/cloud without expensive GPUs.'),
        ('Explainable AI', 'SHAP (SHapley Additive exPlanations)', 'Calculates exact feature importance weights to explain reasons behind risk scores.'),
        ('Spatial Database', 'PostgreSQL 16 + PostGIS extension', 'Performs spatial intersections, buffer queries, and road network topology indexing.'),
        ('Network Routing', 'pgRouting (Dijkstra algorithm)', 'Graph solver calculating disconnected village nodes and safe emergency bypass routes.'),
        ('Data Processing', 'Pandas, NumPy, Rasterio, Shapely', 'Time-series rainfall aggregation, spatial interpolation, and satellite raster processing.'),
        ('Alerting & Cloud', 'Firebase Cloud Messaging + AWS', 'Real-time geo-fenced push notifications and containerized cloud deployment.')
    ]
    
    ty = 26.0
    for layer, tech, purp in stack:
        pdf.set_fill_color(255, 255, 255)
        pdf.rect(12, ty, 186, 5.0, 'F')
        pdf.set_draw_color(226, 232, 240)
        pdf.line(12, ty + 5.0, 198, ty + 5.0)
        
        pdf.set_font('Helvetica', 'B', 7)
        pdf.set_text_color(27, 54, 93)
        pdf.set_xy(14, ty + 0.8)
        pdf.cell(30, 3.5, layer, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', 'B', 7)
        pdf.set_text_color(230, 81, 0)
        pdf.cell(56, 3.5, tech, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 6.8)
        pdf.set_text_color(71, 85, 105)
        pdf.cell(100, 3.5, purp, new_x=XPos.RIGHT, new_y=YPos.TOP)
        ty += 5.0
        
    # 8. System Architecture (4 Tiers - NO RIGHT OVERFLOW)
    pdf.draw_section_header(80.0, '8. SYSTEM ARCHITECTURE - 4 TIERS')
    
    arch_tiers = [
        ('LAYER 1: DATA SENSING & INGESTION', 'IMD API (Precipitation) - NASA SMAP (Soil Moisture) - SRTM 30m DEM (Slope/Elevation) - Sentinel-2 (NDVI) - GSI Bhukosh (Historical Slips) - Offline Citizen Reports', 230, 81, 0),
        ('LAYER 2: DATA PROCESSING & AI ANALYTICS', 'FastAPI Ingestion Pipeline - Antecedent Precipitation Feature Engineering - XGBoost/Random Forest Classifier - SHAP Explainable AI Attribution - 30m Susceptibility Scoring', 27, 54, 93),
        ('LAYER 3: GEOSPATIAL & CONNECTIVITY ENGINE', 'PostgreSQL + PostGIS Geodatabase - Topological Road Network Intersection - Village Isolation Detection - Hospital Delay Matrix - Dijkstra Emergency Route Solver', 0, 138, 75),
        ('LAYER 4: PRESENTATION & DISPATCH', 'Authority Command Center (React.js + Mapbox) - Citizen & Responder App (Flutter + SQLite) - Geo-Fenced Push Notifications & CAP SMS - SDRF/BRO Tactical Directives', 239, 68, 68)
    ]
    
    ay = 88.5
    for title, desc, r, g, b in arch_tiers:
        pdf.set_fill_color(248, 250, 252)
        pdf.rect(12, ay, 186, 15.0, 'F')
        pdf.set_draw_color(r, g, b)
        pdf.set_line_width(0.3)
        pdf.rect(12, ay, 186, 15.0, 'D')
        pdf.set_fill_color(r, g, b)
        pdf.rect(12, ay, 2.5, 15.0, 'F')
        
        pdf.set_font('Helvetica', 'B', 7.5)
        pdf.set_text_color(r, g, b)
        pdf.set_xy(16, ay + 1.8)
        pdf.cell(178, 3.8, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        pdf.set_font('Helvetica', '', 6.8)
        pdf.set_text_color(51, 65, 85)
        pdf.set_xy(16, ay + 6.2)
        pdf.multi_cell(178, 3.4, desc)
        ay += 16.5
        
    # 9. Phased Implementation Plan (FIXES COLLAPSED / OVERLAPPING LINES IN USER IMAGE 2)
    pdf.draw_section_header(158.0, '9. PHASED IMPLEMENTATION PLAN (REALISTIC STUDENT TIMELINE)')
    
    py = 166.5
    pdf.set_fill_color(27, 54, 93)
    pdf.rect(12, py, 186, 6.0, 'F')
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(14, py + 1.2)
    pdf.cell(20, 4, 'Phase', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(45, 4, 'Milestone Focus', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(85, 4, 'Key Deliverables & Outputs', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(36, 4, 'Team Allocation', align='C', new_x=XPos.RIGHT, new_y=YPos.TOP)
    
    phases = [
        ('Phase 1', 'Data Curation & Preprocessing', 'Acquire SRTM 30m DEM, GSI Bhukosh slide catalog, mock IMD rainfall feeds for pilot district.', 'Ayush & Shinjini'),
        ('Phase 2', 'AI Model & XAI Development', 'Train XGBoost/Random Forest susceptibility models; integrate SHAP explainability factor module.', 'Ayush & Shinjini'),
        ('Phase 3', 'GIS Visualization & PostGIS', 'Setup PostGIS spatial database; build React.js dashboard with 4-color risk polygon overlays.', 'Prerana & Sondeep'),
        ('Phase 4', 'Connectivity Impact Engine', 'Implement pgRouting/Dijkstra to detect blocked roads, isolated villages, and bypass routes.', 'Sondeep & Subham'),
        ('Phase 5', 'Mobile App & Offline Sync', 'Build Flutter client with SQLite local cache, camera geotagging, and auto-sync background worker.', 'Subham & Rahul'),
        ('Phase 6', 'Testing & Prototype Simulation', 'Simulate 185mm cloudburst, validate offline sync & rerouting; end-to-end evaluation demonstration.', 'Rahul & All Members')
    ]
    
    py = 172.5
    for pnum, mstone, deliv, alloc in phases:
        pdf.set_fill_color(255, 255, 255)
        pdf.rect(12, py, 186, 9.5, 'F')
        pdf.set_draw_color(226, 232, 240)
        pdf.line(12, py + 9.5, 198, py + 9.5)
        
        # Col 1: Phase
        pdf.set_font('Helvetica', 'B', 7)
        pdf.set_text_color(230, 81, 0)
        pdf.set_xy(14, py + 2.8)
        pdf.cell(20, 3.8, pnum, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        # Col 2: Milestone Focus
        pdf.set_font('Helvetica', 'B', 7)
        pdf.set_text_color(27, 54, 93)
        pdf.set_xy(34, py + 1.5)
        pdf.multi_cell(43, 3.3, mstone)
        
        # Col 3: Key Deliverables & Outputs (Wrapped in width 82mm, ends strictly at 160mm)
        pdf.set_font('Helvetica', '', 6.8)
        pdf.set_text_color(71, 85, 105)
        pdf.set_xy(78, py + 1.5)
        pdf.multi_cell(82, 3.2, deliv)
        
        # Col 4: Team Allocation (Starts at 162mm, width 34mm - ZERO OVERLAP)
        pdf.set_font('Helvetica', 'B', 6.8)
        pdf.set_text_color(0, 138, 75)
        pdf.set_xy(162, py + 2.8)
        pdf.cell(34, 3.8, alloc, align='C', new_x=XPos.RIGHT, new_y=YPos.TOP)
        py += 9.5

    # Page 3 Bottom Feasibility Governance Callout Box
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(12, 233.5, 186, 49, 'F')
    pdf.set_draw_color(27, 54, 93)
    pdf.set_line_width(0.3)
    pdf.rect(12, 233.5, 186, 49, 'D')
    
    pdf.set_fill_color(27, 54, 93)
    pdf.rect(12, 233.5, 186, 5.5, 'F')
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(14, 234.5)
    pdf.cell(182, 4, 'STUDENT EXECUTION FEASIBILITY & TECHNICAL GOVERNANCE', align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    feas_pillars = [
        ('Independent Modular Workstreams', 'Strict decoupling into ML, GIS, Flutter Mobile, Backend FastAPI, and React Frontend microservices allows all 6 team members to program simultaneously without code conflicts or circular wait times.', 230, 81, 0),
        ('100% Free & Open Source Stack', 'Zero commercial software or expensive proprietary licenses required. Python, Scikit-learn, PostGIS, OpenStreetMap, Flutter, and FastAPI run seamlessly on accessible student hardware and cloud tiers.', 0, 138, 75),
        ('Rigorous Simulation Testing Plan', 'A pre-recorded Sikkim landslide scenario with synthetic 185mm cloudburst rainfall is built into the prototype test harness to demonstrate offline caching, risk calculation, and bypass route solver live.', 27, 54, 93)
    ]
    for i, (f_title, f_desc, fr, fg, fb) in enumerate(feas_pillars):
        fy_box = 241.5 + i * 13.0
        pdf.set_fill_color(255, 255, 255)
        pdf.rect(15, fy_box, 180, 11.5, 'F')
        pdf.set_draw_color(226, 232, 240)
        pdf.rect(15, fy_box, 180, 11.5, 'D')
        pdf.set_fill_color(fr, fg, fb)
        pdf.rect(15, fy_box, 2.5, 11.5, 'F')
        
        pdf.set_font('Helvetica', 'B', 7.2)
        pdf.set_text_color(fr, fg, fb)
        pdf.set_xy(20, fy_box + 1.5)
        pdf.cell(50, 3.5, f_title, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 6.7)
        pdf.set_text_color(71, 85, 105)
        pdf.set_xy(72, fy_box + 1.2)
        pdf.multi_cell(120, 3.1, f_desc)

    # ============================================================
    # PAGE 4: FEASIBILITY, IMPACT, FUTURE, DEMO & PITCH
    # ============================================================
    pdf.add_page()
    
    # 10. Technical Feasibility
    pdf.draw_section_header(12, '10. TECHNICAL FEASIBILITY & REALISM')
    
    pdf.set_xy(12, 20.5)
    pdf.set_font('Helvetica', '', 7.3)
    pdf.set_text_color(30, 41, 59)
    feas_text = (
        "- Zero Hardware Installation Overhead: Traditional slope monitoring requires crores in borehole inclinometers, wire extensometers, and acoustic sensors. "
        "AlertNex relies entirely on open satellite remote sensing, meteorological telemetry, and crowdsourced mobile reports.\n"
        "- Open Datasets Ready: NASA SMAP (soil moisture), SRTM DEM (elevation), IMD API (precipitation), and GSI Bhukosh (historical slides) are freely accessible.\n"
        "- Realistic Student Execution: Modular microservice separation allows all 6 team members to build frontend, backend, ML, mobile, and GIS components independently.\n"
        "- Scientifically Grounded: AlertNex is engineered as an early-warning decision-support platform that minimizes loss of life and organizes logistics-not an impossible 100% predictive oracle."
    )
    pdf.multi_cell(186, 3.6, feas_text)
    
    # 11. Expected Impact & 12. Future Scope (PLACED CLEANLY AT Y=56.5 - NO COLLISION WITH SEC 10)
    pdf.draw_section_header(56.5, '11. EXPECTED IMPACT', '12. FUTURE SCOPE & EXPANSION')
    
    # Left Box: Impact
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(12, 65.0, 91, 42, 'F')
    pdf.set_draw_color(0, 138, 75)
    pdf.rect(12, 65.0, 91, 42, 'D')
    pdf.set_fill_color(0, 138, 75)
    pdf.rect(12, 65.0, 2, 42, 'F')
    
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(0, 138, 75)
    pdf.set_xy(15, 66.5)
    pdf.cell(86, 3.5, 'SOCIETAL & OPERATIONAL IMPACT:', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font('Helvetica', '', 6.8)
    pdf.set_text_color(51, 65, 85)
    pdf.set_x(15)
    imp_bullets = (
        "- 6-12h Warning Window: Replaces post-disaster rescue with proactive orderly evacuation.\n"
        "- Lifeline Protection: Prevents stranded vehicles and casualties along NH-10 & NH-29.\n"
        "- Voice for Remote Hamlets: Offline reporting empowers cut-off tribal communities.\n"
        "- Targeted Resource Allocation: Directs SDRF/BRO earthmovers to priority choke points.\n"
        "- Economic Continuity: Mitigates multi-crore losses in highway trade and rescue operations."
    )
    pdf.multi_cell(86, 3.4, imp_bullets)
    
    # Right Box: Future Scope
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(107, 65.0, 91, 42, 'F')
    pdf.set_draw_color(230, 81, 0)
    pdf.rect(107, 65.0, 91, 42, 'D')
    pdf.set_fill_color(230, 81, 0)
    pdf.rect(107, 65.0, 2, 42, 'F')
    
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_text_color(230, 81, 0)
    pdf.set_xy(110, 66.5)
    pdf.cell(86, 3.5, 'FUTURE INNOVATION HORIZONS:', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font('Helvetica', '', 6.8)
    pdf.set_text_color(51, 65, 85)
    pdf.set_x(110)
    fut_bullets = (
        "- Drone Photogrammetry: Automated UAV inspection along flagged slope tension cracks.\n"
        "- InSAR Satellite Radar: Sentinel-1 interferometry to track millimeter ground movement.\n"
        "- Emergency Integration: Direct API integration with 112 India and BRO Swastik.\n"
        "- Regional Languages: Multilingual audio alerts in Assamese, Bengali, Nepali, Mizo, Khasi.\n"
        "- Pan-Himalayan Expansion: Scaling to Uttarakhand, Himachal Pradesh, and J&K."
    )
    pdf.multi_cell(86, 3.4, fut_bullets)
    
    # 13. Realistic Prototype Demonstration Scenario
    pdf.draw_section_header(110.0, '13. REALISTIC PROTOTYPE DEMONSTRATION SCENARIO (NH-10 TEESTA CORRIDOR)')
    
    demo_steps = [
        ('1. Environmental Ingestion', 'Simulated live telemetry: 24-hour rainfall reaches 185 mm in Melli-Singtam sector; soil moisture saturation exceeds 92%.'),
        ('2. Risk Level Escalation', 'AI Risk Engine recalculates slope stability; susceptibility score escalates from MODERATE (Yellow) to HIGH (Orange) to CRITICAL (Red - 87%).'),
        ('3. Explainable AI (XAI)', 'Interactive map renders stretch in red. XAI Breakdown: Rainfall 42% + Moisture 21% + Slope 15% + Field Crack Observation 9%.'),
        ('4. Connectivity Impact', 'Graph engine identifies NH-10 Km 29 choke point; flags 3 isolated villages (Lower Melli, Tarkhola, Rambi - 4,200 residents); generates alternate Route B.'),
        ('5. Offline Sync Validation', 'Field officer captures crack photo in offline valley; stored locally in SQLite; auto-syncs as device regains signal, validating alert.'),
        ('6. Proactive Response', 'Automated SMS warning pushed to registered transporters; tactical dispatch coordinates routed to pre-position BRO earthmovers.')
    ]
    
    dy = 118.5
    for step_title, step_desc in demo_steps:
        pdf.set_fill_color(255, 255, 255)
        pdf.rect(12, dy, 186, 9.5, 'F')
        pdf.set_draw_color(226, 232, 240)
        pdf.rect(12, dy, 186, 9.5, 'D')
        pdf.set_fill_color(27, 54, 93)
        pdf.rect(12, dy, 2.5, 9.5, 'F')
        
        pdf.set_font('Helvetica', 'B', 7)
        pdf.set_text_color(27, 54, 93)
        pdf.set_xy(16, dy + 2.8)
        pdf.cell(38, 3.5, step_title, new_x=XPos.RIGHT, new_y=YPos.TOP)
        
        pdf.set_font('Helvetica', '', 6.8)
        pdf.set_text_color(71, 85, 105)
        pdf.set_xy(56, dy + 1.5)
        pdf.multi_cell(138, 3.2, step_desc)
        dy += 11.0
        
    # 14. 60-Second Presentation Pitch (PLACED AT Y=188.5, PITCH BOX HEIGHT=69mm - NO OVERFLOW!)
    pdf.draw_section_header(187.5, '14. 60-SECOND PRESENTATION PITCH (FOR COLLEGE INTERNAL JURY)')
    
    pdf.set_fill_color(250, 250, 252)
    pdf.rect(12, 196.0, 186, 73, 'F')
    pdf.set_draw_color(230, 81, 0)
    pdf.set_line_width(0.35)
    pdf.rect(12, 196.0, 186, 73, 'D')
    pdf.set_fill_color(230, 81, 0)
    pdf.rect(12, 196.0, 2.5, 73, 'F')
    
    pitch_text = (
        '"Respected professors and evaluation committee,\n'
        'Every monsoon, catastrophic landslides bring the North Eastern Region to a standstill. Arterial lifelines like NH-10 and NH-29 are severed, '
        'cutting off food supplies, trapping emergency ambulances, and isolating remote tribal villages for weeks.\n'
        'Current disaster systems are completely reactive: they detect landslides only after the mountain has collapsed. Furthermore, existing research '
        'only predicts that a landslide might occur without telling authorities what will actually be destroyed.\n'
        'We are Team AlertNex, and our solution is an AI-Based Early Warning and Landslide Monitoring System with Connectivity Impact Analysis.\n'
        'Our system introduces three major breakthroughs: First, Connectivity Impact Analysis: We predict which roads collapse, which villages become isolated, '
        'and automatically compute safe alternate bypass routes before disaster strikes. Second, Offline Community Reporting: A mobile app that works 100% offline, '
        'allowing villagers in zero-network valleys to capture ground cracks, auto-syncing once signal returns. Third, Explainable AI: Giving district magistrates '
        'transparent percentage factors behind every alert.\n'
        'Using open satellite data and open-source geospatial tools, our prototype is fully feasible, low-cost, and engineered specifically for North East India. Thank you!"'
    )
    pdf.set_font('Helvetica', 'I', 7.3)
    pdf.set_text_color(27, 54, 93)
    pdf.set_xy(17, 198.5)
    pdf.multi_cell(176, 3.5, pitch_text)
    
    # Final Signature Banner
    pdf.set_fill_color(27, 54, 93)
    pdf.rect(12, 272.5, 186, 9.0, 'F')
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(14, 274.5)
    pdf.cell(182, 4.8, 'TEAM ALERTNEX  -  AI-POWERED EARLY WARNING FOR SAFER COMMUNITIES', align='C', new_x=XPos.RIGHT, new_y=YPos.TOP)

    # Save PDF under both names
    output_files = [
        "SIH2026_AlertNex_Idea_Description_NiT.pdf",
        "SIH2026_AlertNex_Idea_Description_4Pages.pdf"
    ]
    for pdf_out in output_files:
        pdf.output(pdf_out)
        print(f"PDF successfully created: {pdf_out} (Total Pages: {pdf.page_no()}, Size: {os.path.getsize(pdf_out)} bytes)")

if __name__ == '__main__':
    create_sih_pdf()
