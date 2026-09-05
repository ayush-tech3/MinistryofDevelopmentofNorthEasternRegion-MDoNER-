/**
 * AlertNex - Master Application Router & State Orchestrator
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Team: AlertNex (Leader: Ayush Kumar)
 */

const AlertNexApp = {
  activeView: "landing",
  sidebarCollapsed: false,

  init() {
    this.bindNavigation();
    this.bindSidebarToggle();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Initialize sub-modules
    if (window.AlertNexMap) AlertNexMap.init();
    if (window.AlertNexAIEngine) AlertNexAIEngine.init();
    if (window.AlertNexConnectivity) AlertNexConnectivity.init();
    if (window.AlertNexAlerts) AlertNexAlerts.init();
    if (window.AlertNexReporting) AlertNexReporting.init();
    if (window.AlertNexCharts) AlertNexCharts.init();
    if (window.AlertNexSimulation) AlertNexSimulation.init();

    // Check URL hash or default to landing
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && document.getElementById(`view-${initialHash}`)) {
      this.switchView(initialHash);
    } else {
      this.switchView("landing");
    }
  },

  bindNavigation() {
    // Links with data-view attribute
    document.querySelectorAll("[data-view]").forEach(elem => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = elem.getAttribute("data-view");
        this.switchView(targetView);
      });
    });
  },

  switchView(viewName) {
    const targetElement = document.getElementById(`view-${viewName}`);
    if (!targetElement) return;

    this.activeView = viewName;
    window.location.hash = viewName;

    // Update active page container
    document.querySelectorAll(".page-view").forEach(pv => pv.classList.remove("active"));
    targetElement.classList.add("active");

    // Update active state on sidebar links
    document.querySelectorAll(".sidebar .nav-link").forEach(link => {
      if (link.getAttribute("data-view") === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close mobile sidebar if open
    const sidebar = document.getElementById("mainSidebar");
    if (sidebar) sidebar.classList.remove("mobile-open");

    // Handle view-specific resizes
    if (viewName === "map" && window.AlertNexMap && AlertNexMap.mapInstance) {
      setTimeout(() => {
        AlertNexMap.mapInstance.invalidateSize();
      }, 200);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  bindSidebarToggle() {
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebar = document.getElementById("mainSidebar");

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.toggle("mobile-open");
        } else {
          this.sidebarCollapsed = !this.sidebarCollapsed;
          sidebar.classList.toggle("collapsed", this.sidebarCollapsed);
        }

        // Invalidate map if open
        if (this.activeView === "map" && window.AlertNexMap && AlertNexMap.mapInstance) {
          setTimeout(() => AlertNexMap.mapInstance.invalidateSize(), 320);
        }
      });
    }
  },

  updateClock() {
    const clockEl = document.getElementById("systemLiveClock");
    if (clockEl) {
      const now = new Date();
      const options = { 
        timeZone: "Asia/Kolkata", 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric"
      };
      clockEl.textContent = `${now.toLocaleDateString("en-IN", options)} IST`;
    }
  },

  switchToAIEngine(zoneId) {
    this.switchView("ai-engine");
    if (window.AlertNexAIEngine) {
      AlertNexAIEngine.loadZoneIntoEngine(zoneId);
    }
    this.showToast(`Loaded ${zoneId} environmental parameters into AI engine`);
  },

  switchToConnectivity(zoneId) {
    this.switchView("connectivity");
    if (window.AlertNexConnectivity) {
      AlertNexConnectivity.selectZone(zoneId);
    }
    this.showToast(`Visualizing road disruption & isolation impact for selected zone`);
  },

  showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="#f97316" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(20px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  openExportModal() {
    const modalBackdrop = document.getElementById("exportReportModal");
    if (modalBackdrop) modalBackdrop.classList.add("active");
  },

  closeExportModal() {
    const modalBackdrop = document.getElementById("exportReportModal");
    if (modalBackdrop) modalBackdrop.classList.remove("active");
  },

  triggerPrototypePrint() {
    this.closeExportModal();
    this.showToast("Generating official AlertNex Disaster Intelligence Briefing (PDF Simulation)...");
    setTimeout(() => {
      window.print();
    }, 600);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  AlertNexApp.init();
});

window.AlertNexApp = AlertNexApp;
