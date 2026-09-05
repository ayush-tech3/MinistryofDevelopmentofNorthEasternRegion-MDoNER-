@echo off
title AlertNex SIH 2026 Web Application
echo ========================================================
echo  AlertNex - AI Early Warning & Landslide Monitoring System
echo  Smart India Hackathon 2026 ^| Problem Statement: SIH26001
echo  Ministry of Development of North Eastern Region (MDoNER)
echo  Team Leader: Ayush Kumar ^| Team: AlertNex
echo ========================================================
echo.
echo Starting AlertNex local web server on port 8080...
start "" "http://localhost:8080/index.html"
python -m http.server 8080 --directory alertnex-app
pause
