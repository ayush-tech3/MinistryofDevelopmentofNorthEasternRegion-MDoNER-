/**
 * AlertNex - Analytical Charts & Visualizations
 * Theme: Government Disaster Management & Landslide Monitoring Platform
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexCharts = {
  charts: {},

  init() {
    if (typeof Chart === "undefined") return;

    // Set standard Chart.js light government dashboard defaults
    Chart.defaults.color = "#475569";
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    this.renderDashboardCharts();
    this.renderAnalyticsCharts();
  },

  renderDashboardCharts() {
    // 1. Risk Distribution Doughnut
    const distCanvas = document.getElementById("chartRiskDist");
    if (distCanvas) {
      this.charts.riskDist = new Chart(distCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: ["Low Risk", "Moderate Risk", "High Risk", "Critical Risk"],
          datasets: [{
            data: [
              AlertNexData.kpiStats.lowRiskAreas,
              AlertNexData.kpiStats.moderateRiskAreas,
              AlertNexData.kpiStats.highRiskAreas,
              AlertNexData.kpiStats.criticalRiskAreas
            ],
            backgroundColor: ["#15803d", "#d97706", "#ea580c", "#dc2626"],
            borderWidth: 2,
            borderColor: "#ffffff"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11, weight: "600" }, color: "#334155" } }
          },
          cutout: "68%"
        }
      });
    }

    // 2. Rainfall Trend (Past 24 Hours)
    const rainCanvas = document.getElementById("chartRainfallTrend");
    if (rainCanvas) {
      this.charts.rainTrend = new Chart(rainCanvas.getContext("2d"), {
        type: "line",
        data: {
          labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"],
          datasets: [
            {
              label: "Cherrapunji (Meghalaya)",
              data: [42, 68, 95, 140, 185, 215, 230],
              borderColor: "#dc2626",
              backgroundColor: "rgba(220, 38, 38, 0.08)",
              tension: 0.3,
              borderWidth: 2.5
            },
            {
              label: "Haflong (Assam)",
              data: [20, 35, 60, 85, 115, 138, 145],
              borderColor: "#ea580c",
              backgroundColor: "transparent",
              tension: 0.3,
              borderWidth: 2
            },
            {
              label: "Gangtok (Sikkim)",
              data: [15, 28, 45, 70, 92, 118, 128],
              borderColor: "#d97706",
              backgroundColor: "transparent",
              tension: 0.3,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { boxWidth: 10, font: { size: 11, weight: "600" }, color: "#334155" } }
          },
          scales: {
            x: { grid: { color: "rgba(0, 0, 0, 0.05)" }, ticks: { color: "#64748b" } },
            y: {
              grid: { color: "rgba(0, 0, 0, 0.05)" },
              ticks: { color: "#64748b" },
              title: { display: true, text: "Rainfall (mm)", color: "#475569", font: { weight: "600" } }
            }
          }
        }
      });
    }

    // 3. Risk Trend Over Time
    const riskTrendCanvas = document.getElementById("chartRiskTrendTime");
    if (riskTrendCanvas) {
      this.charts.riskTrendTime = new Chart(riskTrendCanvas.getContext("2d"), {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
          datasets: [{
            label: "Average Regional Vulnerability (%)",
            data: [32, 38, 45, 52, 68, 79, 84],
            borderColor: "#1b4d3e",
            backgroundColor: "rgba(27, 77, 62, 0.1)",
            fill: true,
            tension: 0.35,
            borderWidth: 2.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: "rgba(0, 0, 0, 0.05)" }, ticks: { color: "#64748b" } },
            y: { min: 0, max: 100, grid: { color: "rgba(0, 0, 0, 0.05)" }, ticks: { color: "#64748b" } }
          }
        }
      });
    }

    // 4. Alerts by Risk Level Bar Chart
    const alertsBarCanvas = document.getElementById("chartAlertsByLevel");
    if (alertsBarCanvas) {
      this.charts.alertsBar = new Chart(alertsBarCanvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Low", "Moderate", "High", "Critical"],
          datasets: [{
            label: "Active Alerts",
            data: [2, 5, 8, 4],
            backgroundColor: ["#15803d", "#d97706", "#ea580c", "#dc2626"],
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: "#475569", font: { weight: "600" } } },
            y: { grid: { color: "rgba(0, 0, 0, 0.05)" }, ticks: { stepSize: 2, color: "#64748b" } }
          }
        }
      });
    }
  },

  renderAnalyticsCharts() {
    // 5. Rainfall vs Risk Correlation Scatter / Bar
    const rainVsRiskCanvas = document.getElementById("chartRainVsRisk");
    if (rainVsRiskCanvas) {
      this.charts.rainVsRisk = new Chart(rainVsRiskCanvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["0-50mm", "51-100mm", "101-150mm", "151-200mm", "200mm+"],
          datasets: [
            {
              label: "Average Risk Score (%)",
              data: [18, 38, 64, 82, 94],
              backgroundColor: "rgba(27, 77, 62, 0.85)",
              borderRadius: 4
            },
            {
              label: "Incident Probability (%)",
              data: [12, 29, 58, 79, 91],
              backgroundColor: "rgba(220, 38, 38, 0.85)",
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { boxWidth: 10, font: { size: 11, weight: "600" }, color: "#334155" } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: "#64748b" } },
            y: { min: 0, max: 100, grid: { color: "rgba(0, 0, 0, 0.05)" }, ticks: { color: "#64748b" } }
          }
        }
      });
    }

    // 6. Reports by Incident Category
    const reportsCatCanvas = document.getElementById("chartReportsByCategory");
    if (reportsCatCanvas) {
      this.charts.reportsCat = new Chart(reportsCatCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: ["Dangerous Slope", "Ground Crack", "Rockfall", "Road Blockage", "Active Landslide", "Other"],
          datasets: [{
            data: [32, 28, 18, 15, 8, 4],
            backgroundColor: ["#8b5a2b", "#d97706", "#dc2626", "#1b4d3e", "#b91c1c", "#64748b"],
            borderWidth: 2,
            borderColor: "#ffffff"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "right", labels: { boxWidth: 12, font: { size: 10, weight: "500" }, color: "#334155" } }
          }
        }
      });
    }
  }
};

window.AlertNexCharts = AlertNexCharts;
