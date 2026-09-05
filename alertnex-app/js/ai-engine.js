/**
 * AlertNex - AI Risk Assessment Engine & Explainable AI (XAI)
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex
 */

const AlertNexAIEngine = {
  currentZone: null,
  trendChart: null,

  // Default initial values
  state: {
    rainfall: 185, // mm
    soilMoisture: 82, // %
    slope: 42, // degrees
    weatherFactor: 1.15, // Torrential Downpour
    historicalIndex: 85, // High
    fieldReports: 4
  },

  init() {
    this.bindInputs();
    this.calculateRisk();
    this.initTrendChart();
  },

  bindInputs() {
    const rainfallInput = document.getElementById("aiRainfall");
    const moistureInput = document.getElementById("aiSoilMoisture");
    const slopeInput = document.getElementById("aiSlope");
    const weatherInput = document.getElementById("aiWeather");
    const historyInput = document.getElementById("aiHistory");
    const reportsInput = document.getElementById("aiReports");

    if (rainfallInput) {
      rainfallInput.addEventListener("input", (e) => {
        this.state.rainfall = parseFloat(e.target.value);
        document.getElementById("valRainfall").textContent = `${this.state.rainfall} mm`;
        this.calculateRisk();
      });
    }

    if (moistureInput) {
      moistureInput.addEventListener("input", (e) => {
        this.state.soilMoisture = parseFloat(e.target.value);
        document.getElementById("valSoilMoisture").textContent = `${this.state.soilMoisture}%`;
        this.calculateRisk();
      });
    }

    if (slopeInput) {
      slopeInput.addEventListener("input", (e) => {
        this.state.slope = parseFloat(e.target.value);
        document.getElementById("valSlope").textContent = `${this.state.slope}°`;
        this.calculateRisk();
      });
    }

    if (weatherInput) {
      weatherInput.addEventListener("change", (e) => {
        this.state.weatherFactor = parseFloat(e.target.value);
        this.calculateRisk();
      });
    }

    if (historyInput) {
      historyInput.addEventListener("change", (e) => {
        this.state.historicalIndex = parseFloat(e.target.value);
        this.calculateRisk();
      });
    }

    if (reportsInput) {
      reportsInput.addEventListener("input", (e) => {
        this.state.fieldReports = parseInt(e.target.value, 10);
        document.getElementById("valReports").textContent = `${this.state.fieldReports} Reports`;
        this.calculateRisk();
      });
    }
  },

  calculateRisk() {
    // Component weighted calculations (0 - 100 normalized)
    const rainScore = Math.min((this.state.rainfall / 220) * 100, 100);
    const moistureScore = this.state.soilMoisture;
    const slopeScore = Math.min((this.state.slope / 55) * 100, 100);
    const historyScore = this.state.historicalIndex;
    const reportsScore = Math.min(this.state.fieldReports * 22, 100);

    // Weights: Rainfall 30%, Moisture 25%, Slope 20%, History 15%, Reports 10%
    let rawScore = (rainScore * 0.30) + 
                   (moistureScore * 0.25) + 
                   (slopeScore * 0.20) + 
                   (historyScore * 0.15) + 
                   (reportsScore * 0.10);

    // Apply weather condition multiplier
    rawScore = rawScore * this.state.weatherFactor;
    const finalScore = Math.min(Math.max(Math.round(rawScore), 5), 98);

    // Categorization
    let riskLevel = "LOW";
    let riskColor = "var(--risk-low)";
    let badgeClass = "low";

    if (finalScore >= 76) {
      riskLevel = "CRITICAL";
      riskColor = "var(--risk-critical)";
      badgeClass = "critical";
    } else if (finalScore >= 51) {
      riskLevel = "HIGH";
      riskColor = "var(--risk-high)";
      badgeClass = "high";
    } else if (finalScore >= 26) {
      riskLevel = "MODERATE";
      riskColor = "var(--risk-moderate)";
      badgeClass = "moderate";
    }

    // Update Score Badge & Numbers
    const scoreValEl = document.getElementById("aiScoreValue");
    const scoreBadgeEl = document.getElementById("aiScoreBadge");
    const scoreCircleBar = document.getElementById("aiScoreProgress");

    if (scoreValEl) {
      scoreValEl.textContent = `${finalScore}%`;
      scoreValEl.style.color = riskColor;
    }

    if (scoreBadgeEl) {
      scoreBadgeEl.className = `risk-tag ${badgeClass}`;
      scoreBadgeEl.textContent = `${riskLevel} RISK`;
    }

    if (scoreCircleBar) {
      scoreCircleBar.style.width = `${finalScore}%`;
      scoreCircleBar.style.background = riskColor;
    }

    // Update Explainable AI (XAI) Contribution Factors
    this.updateExplainableAI(rainScore, moistureScore, slopeScore, historyScore, reportsScore, finalScore);

    // Update Trend Chart if initialized
    if (this.trendChart) {
      this.updateTrendData(finalScore);
    }
  },

  updateExplainableAI(rainScore, moistureScore, slopeScore, historyScore, reportsScore, total) {
    const factors = [
      { name: "Heavy Rainfall Intensity", score: Math.round(rainScore * 0.30), raw: `${this.state.rainfall} mm/24h`, weight: "30% weight" },
      { name: "High Soil Moisture Saturation", score: Math.round(moistureScore * 0.25), raw: `${this.state.soilMoisture}% saturated`, weight: "25% weight" },
      { name: "Steep Terrain Slope Angle", score: Math.round(slopeScore * 0.20), raw: `${this.state.slope}° angle`, weight: "20% weight" },
      { name: "Historical Landslide Activity", score: Math.round(historyScore * 0.15), raw: "High Historical Record", weight: "15% weight" },
      { name: "Recent Field Ground Reports", score: Math.round(reportsScore * 0.10), raw: `${this.state.fieldReports} Ground Incidents`, weight: "10% weight" }
    ];

    const container = document.getElementById("xaiFactorsList");
    if (!container) return;

    container.innerHTML = factors.map(f => {
      const percentageContribution = Math.round((f.score / Math.max(total, 1)) * 100);
      const impactLabel = percentageContribution >= 25 ? "High Impact" : percentageContribution >= 15 ? "Moderate Impact" : "Low Impact";
      const impactClass = percentageContribution >= 25 ? "high" : percentageContribution >= 15 ? "moderate" : "low";

      return `
        <div class="xai-card">
          <div class="xai-header">
            <div>
              <span class="xai-name">${f.name}</span>
              <div style="font-size:0.75rem; color:#94a3b8;">${f.raw} • ${f.weight}</div>
            </div>
            <span class="xai-impact-tag ${impactClass}">${impactLabel}</span>
          </div>
          <div class="xai-progress-track">
            <div class="xai-progress-bar" style="width: ${Math.min(percentageContribution * 2.2, 100)}%;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#cbd5e1;">
            <span>AI Model Factor Contribution</span>
            <span style="font-weight:700;">${percentageContribution}%</span>
          </div>
        </div>
      `;
    }).join("");
  },

  initTrendChart() {
    const canvas = document.getElementById("aiTrendChartCanvas");
    if (!canvas || typeof Chart === "undefined") return;

    const ctx = canvas.getContext("2d");
    this.trendChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["-24h", "-20h", "-16h", "-12h", "-8h", "-4h", "Current"],
        datasets: [{
          label: "Risk Score Trend (%)",
          data: [28, 35, 42, 58, 69, 78, 87],
          borderColor: "#f97316",
          backgroundColor: "rgba(249, 115, 22, 0.15)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#f97316",
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Risk: ${ctx.parsed.y}%`
            }
          }
        },
        scales: {
          x: {
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { color: "#94a3b8", font: { size: 11 } }
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: {
              color: "#94a3b8",
              font: { size: 11 },
              callback: (val) => `${val}%`
            }
          }
        }
      }
    });
  },

  updateTrendData(currentVal) {
    if (!this.trendChart) return;
    const data = this.trendChart.data.datasets[0].data;
    data[data.length - 1] = currentVal;
    this.trendChart.update();
  },

  loadZoneIntoEngine(zoneId) {
    const zone = AlertNexData.monitoringZones.find(z => z.id === zoneId);
    if (!zone) return;

    this.currentZone = zone;
    this.state.rainfall = zone.rainfall24h;
    this.state.soilMoisture = zone.soilMoisture;
    this.state.slope = zone.slopeAngle;
    this.state.fieldReports = zone.fieldReportsCount;

    // Update DOM inputs
    const rInput = document.getElementById("aiRainfall");
    const mInput = document.getElementById("aiSoilMoisture");
    const sInput = document.getElementById("aiSlope");
    const repInput = document.getElementById("aiReports");

    if (rInput) { rInput.value = this.state.rainfall; document.getElementById("valRainfall").textContent = `${this.state.rainfall} mm`; }
    if (mInput) { mInput.value = this.state.soilMoisture; document.getElementById("valSoilMoisture").textContent = `${this.state.soilMoisture}%`; }
    if (sInput) { sInput.value = this.state.slope; document.getElementById("valSlope").textContent = `${this.state.slope}°`; }
    if (repInput) { repInput.value = this.state.fieldReports; document.getElementById("valReports").textContent = `${this.state.fieldReports} Reports`; }

    this.calculateRisk();
  }
};

window.AlertNexAIEngine = AlertNexAIEngine;
