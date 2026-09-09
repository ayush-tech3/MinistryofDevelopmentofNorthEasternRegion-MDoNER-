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
    this.bindAnalyticsFilters();
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
  },

  bindAnalyticsFilters() {
    const regionSelect = document.getElementById("analyticsFilterRegion");
    const timeSelect = document.getElementById("analyticsFilterTime");
    const riskSelect = document.getElementById("analyticsFilterRisk");

    const onFilterChange = () => {
      this.updateAnalyticsData();
    };

    if (regionSelect) regionSelect.addEventListener("change", onFilterChange);
    if (timeSelect) timeSelect.addEventListener("change", onFilterChange);
    if (riskSelect) riskSelect.addEventListener("change", onFilterChange);
  },

  updateAnalyticsData() {
    const region = document.getElementById("analyticsFilterRegion")?.value || "all";
    const time = document.getElementById("analyticsFilterTime")?.value || "monsoon";
    const risk = document.getElementById("analyticsFilterRisk")?.value || "high";

    // Dynamic dataset mapping based on selected filters
    let riskScores = [18, 38, 64, 82, 94];
    let probabilities = [12, 29, 58, 79, 91];
    let categoryData = [32, 28, 18, 15, 8, 4];

    if (region === "meghalaya") {
      riskScores = [24, 48, 76, 91, 98];
      probabilities = [18, 38, 72, 89, 96];
      categoryData = [38, 22, 14, 28, 14, 2];
    } else if (region === "sikkim") {
      riskScores = [15, 34, 59, 78, 88];
      probabilities = [10, 25, 52, 74, 85];
      categoryData = [22, 36, 30, 10, 6, 4];
    } else if (region === "arunachal") {
      riskScores = [20, 44, 70, 86, 95];
      probabilities = [14, 33, 64, 83, 93];
      categoryData = [29, 29, 22, 18, 9, 3];
    }

    // Time horizon factor
    if (time === "30d") {
      riskScores = riskScores.map(v => Math.min(100, Math.round(v * 1.05)));
      probabilities = probabilities.map(v => Math.min(100, Math.round(v * 1.08)));
    } else if (time === "90d") {
      riskScores = riskScores.map(v => Math.max(5, Math.round(v * 0.92)));
      probabilities = probabilities.map(v => Math.max(5, Math.round(v * 0.88)));
      categoryData = categoryData.map(v => Math.round(v * 1.4));
    } else if (time === "5y") {
      riskScores = [14, 30, 52, 74, 89];
      probabilities = [9, 22, 48, 71, 84];
      categoryData = [145, 120, 94, 78, 42, 18];
    }

    // Risk threshold factor
    if (risk === "all") {
      categoryData = categoryData.map(v => Math.round(v * 1.3));
    }

    // Update Chart 1: Rain vs Risk
    if (this.charts.rainVsRisk) {
      this.charts.rainVsRisk.data.datasets[0].data = riskScores;
      this.charts.rainVsRisk.data.datasets[1].data = probabilities;
      this.charts.rainVsRisk.update();
    }

    // Update Chart 2: Reports by Category
    if (this.charts.reportsCat) {
      this.charts.reportsCat.data.datasets[0].data = categoryData;
      this.charts.reportsCat.update();
    }

    if (window.AlertNexApp) {
      AlertNexApp.showToast(`📊 Analytics filtered: ${region.toUpperCase()} • ${time.toUpperCase()} • ${risk.toUpperCase()}`);
    }
  }
};

window.AlertNexCharts = AlertNexCharts;
