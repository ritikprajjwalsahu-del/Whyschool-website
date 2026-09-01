/* ==========================================================================
   ILLUMINA & HCLTECH STRATEGIC ACCOUNT PORTAL INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // State Variables
  let currentSlide = 1;
  const totalSlides = 5;
  let financialChartInstance = null;
  let roiChartInstance = null;

  // Initialize Modules
  initThemeToggler();
  initTabs();
  initPersonaFilters();
  initSearch();
  initFinancialChart();
  initRoiSimulator();
  initPresentationMode();
  initExport();
});

/* ==========================================================================
   THEME TOGGLER (DARK / LIGHT)
   ========================================================================== */
function initThemeToggler() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggleBtn.innerHTML = isLight ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
    if (window.lucide) lucide.createIcons();
  });
}

/* ==========================================================================
   TAB NAVIGATION
   ========================================================================== */
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // Re-trigger chart resize if tab contains chart
      if (targetTab === 'tab-illumina' && financialChartInstance) {
        financialChartInstance.resize();
      }
      if (targetTab === 'tab-roi' && roiChartInstance) {
        roiChartInstance.resize();
      }
    });
  });
}

/* ==========================================================================
   EXECUTIVE PERSONA FILTERS
   ========================================================================== */
function initPersonaFilters() {
  const chips = document.querySelectorAll('.persona-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const persona = chip.getAttribute('data-persona');
      applyPersonaFilter(persona);
    });
  });
}

function filterPersona(persona) {
  const chips = document.querySelectorAll('.persona-chip');
  chips.forEach(c => {
    if (c.getAttribute('data-persona') === persona) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  applyPersonaFilter(persona);
}

function applyPersonaFilter(persona) {
  const rows = document.querySelectorAll('#leadershipTable tbody tr');
  const playCards = document.querySelectorAll('.play-card');

  rows.forEach(row => {
    if (persona === 'all' || row.getAttribute('data-persona') === persona) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  playCards.forEach(card => {
    if (persona === 'all') {
      card.style.opacity = '1';
      card.style.borderColor = 'var(--border-color)';
    } else {
      const targetTag = card.querySelector('.play-target-tag')?.textContent.toLowerCase() || '';
      if (targetTag.includes(persona)) {
        card.style.opacity = '1';
        card.style.borderColor = 'var(--illumina-cyan)';
      } else {
        card.style.opacity = '0.4';
        card.style.borderColor = 'var(--border-color)';
      }
    }
  });
}

/* ==========================================================================
   GLOBAL SEARCH FILTER
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const searchableElements = document.querySelectorAll('.content-card, .platform-card, .play-card, .poc-card');

    searchableElements.forEach(el => {
      const text = el.textContent.toLowerCase();
      if (!term || text.includes(term)) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

/* ==========================================================================
   FINANCIAL CHART.JS INTEGRATION
   ========================================================================== */
function initFinancialChart() {
  const ctx = document.getElementById('financialChart');
  if (!ctx) return;

  financialChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['FY25 Full Year', 'Q1 2026', 'Q2 2026', 'FY26 Guidance (Max)'],
      datasets: [
        {
          label: 'Revenue ($ Billion)',
          data: [4.34, 1.09, 1.159, 4.64],
          backgroundColor: [
            'rgba(0, 114, 206, 0.6)',
            'rgba(0, 195, 230, 0.6)',
            'rgba(138, 43, 226, 0.8)',
            'rgba(16, 185, 129, 0.8)'
          ],
          borderColor: [
            '#0072ce',
            '#00c3e6',
            '#8a2be2',
            '#10b981'
          ],
          borderWidth: 2,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } }
        },
        tooltip: {
          backgroundColor: '#0d1626',
          titleColor: '#00c3e6',
          bodyColor: '#f0f4f8',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        x: {
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        }
      }
    }
  });
}

/* ==========================================================================
   ROI & VALUE CALCULATOR DYNAMIC SIMULATION
   ========================================================================== */
function initRoiSimulator() {
  const inputCloudSpend = document.getElementById('inputCloudSpend');
  const inputFleets = document.getElementById('inputFleets');
  const inputLabs = document.getElementById('inputLabs');
  const inputFactor = document.getElementById('inputFactor');

  if (!inputCloudSpend) return;

  const updateCalculations = () => {
    const cloudSpend = parseFloat(inputCloudSpend.value);
    const fleets = parseInt(inputFleets.value);
    const labs = parseInt(inputLabs.value);
    const factor = parseFloat(inputFactor.value) / 100;

    // Display values
    document.getElementById('valCloudSpend').textContent = `$${cloudSpend}M`;
    document.getElementById('valFleets').textContent = `${fleets} Fleets`;
    document.getElementById('valLabs').textContent = `${labs} Labs`;
    document.getElementById('valFactor').textContent = `${Math.round(factor * 100)}% Savings`;

    // Calculate Savings
    const cloudSavings = cloudSpend * factor; // in $M
    const fleetSavings = (fleets * 15000 * (factor * 0.8)) / 1000000; // $M saved
    const labDaysSaved = labs * 60; // days saved
    const totalNetImpact = cloudSavings + fleetSavings;

    // Render outputs
    document.getElementById('resCloudSavings').textContent = `$${cloudSavings.toFixed(2)}M`;
    document.getElementById('resFleetSavings').textContent = `$${fleetSavings.toFixed(2)}M`;
    document.getElementById('resLabSavings').textContent = `${labDaysSaved.toLocaleString()} Days Saved`;
    document.getElementById('resTotalImpact').textContent = `$${totalNetImpact.toFixed(2)}M / yr`;

    updateRoiChart(cloudSavings, fleetSavings);
  };

  inputCloudSpend.addEventListener('input', updateCalculations);
  inputFleets.addEventListener('input', updateCalculations);
  inputLabs.addEventListener('input', updateCalculations);
  inputFactor.addEventListener('input', updateCalculations);

  initRoiChart();
  updateCalculations();
}

function initRoiChart() {
  const ctx = document.getElementById('roiChart');
  if (!ctx) return;

  roiChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Cloud Infra Reduction ($M)', 'NovaSeq Fleet Downtime Savings ($M)'],
      datasets: [{
        data: [20.25, 12.75],
        backgroundColor: ['#00c3e6', '#8a2be2'],
        borderColor: '#0d1626',
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8' } }
      }
    }
  });
}

function updateRoiChart(cloudSavings, fleetSavings) {
  if (roiChartInstance) {
    roiChartInstance.data.datasets[0].data = [cloudSavings, fleetSavings];
    roiChartInstance.update();
  }
}

/* ==========================================================================
   MODAL INTERACTIVE POC FLOWCHARTS
   ========================================================================== */
window.openPoCModal = function(pocId) {
  const modal = document.getElementById('pocModal');
  const title = document.getElementById('modalTitle');
  const content = document.getElementById('modalContent');

  if (!modal) return;

  if (pocId === 1) {
    title.innerHTML = '<i data-lucide="cpu"></i> Play 1: Next-Gen BioInsights Data Platform Architecture';
    content.innerHTML = `
      <div class="poc-flow-steps">
        <div class="flow-step">
          <div class="flow-step-num">1</div>
          <div class="flow-step-text">
            <h4>Raw Single-Cell & Genomic Ingestion</h4>
            <p>High-throughput ingestion from NovaSeq X runs directly into AWS/GCP Multiomics Data Lakehouse using HCLTech AI Force.Data.Dev automated pipelines.</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="flow-step-num">2</div>
          <div class="flow-step-num-icon"><i data-lucide="shield"></i></div>
          <div class="flow-step-text">
            <h4>Zero-Trust Secure Data Enclaves & MLOps</h4>
            <p>Deploying HCLTech MLOps Studio with federated learning boundaries, ensuring biopharma partners (AstraZeneca, Merck, Eli Lilly) query Billion Cell Atlas datasets without raw sequence leakage.</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="flow-step-num">3</div>
          <div class="flow-step-text">
            <h4>Monetized Biopharma Query API Layer</h4>
            <p>Exposing sub-500ms REST/GraphQL endpoints for target discovery and multiomics biomarker correlation.</p>
          </div>
        </div>
      </div>
    `;
  } else if (pocId === 2) {
    title.innerHTML = '<i data-lucide="heart-pulse"></i> Play 2: GxP Clinical Lab Integration Accelerator';
    content.innerHTML = `
      <div class="poc-flow-steps">
        <div class="flow-step">
          <div class="flow-step-num">1</div>
          <div class="flow-step-text">
            <h4>Hospital EHR / LIMS Pre-Built Connectors</h4>
            <p>Deploying HCLTech AI Foundry pre-validated connectors for Epic, Cerner, and custom clinical lab information systems.</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="flow-step-num">2</div>
          <div class="flow-step-text">
            <h4>GxP / CAP / CLIA Automated Validation Package</h4>
            <p>Auto-generated CSV/CSA compliance documentation, cutting validation timelines from 6 months down to 2 weeks.</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="flow-step-num">3</div>
          <div class="flow-step-text">
            <h4>Accelerated Consumable Pull-Through</h4>
            <p>Enabling hospital labs to scale NovaSeq X clinical diagnostic runs immediately (+20% ROW consumable growth).</p>
          </div>
        </div>
      </div>
    `;
  } else if (pocId === 3) {
    title.innerHTML = '<i data-lucide="eye"></i> Play 3: Smart Instrument IoT & Predictive Operations';
    content.innerHTML = `
      <div class="poc-flow-steps">
        <div class="flow-step">
          <div class="flow-step-num">1</div>
          <div class="flow-step-text">
            <h4>NovaSeq X Edge Sensor Telemetry Stream</h4>
            <p>Connecting IoT sensor telemetry (fluidics, optical alignment, thermal state) to HCLTech VisionX Edge OS.</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="flow-step-num">2</div>
          <div class="flow-step-text">
            <h4>Real-Time Anomaly Detection & AI Diagnostics</h4>
            <p>60+ pre-built deep learning models detect fluidic clogs or optical drift mid-run, preventing expensive flow cell run failures.</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="flow-step-num">3</div>
          <div class="flow-step-text">
            <h4>Automated Field Service & Reagent Replenishment</h4>
            <p>Auto-triggering service ticket creation and predictive reagent shipment for customer lab operators.</p>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
  if (window.lucide) lucide.createIcons();
};

window.closePoCModal = function() {
  const modal = document.getElementById('pocModal');
  if (modal) modal.classList.remove('active');
};

/* ==========================================================================
   PRESENTATION PITCH DECK CONTROLLER
   ========================================================================== */
function initPresentationMode() {
  const presentationModeBtn = document.getElementById('presentationModeBtn');
  const presentationOverlay = document.getElementById('presentationOverlay');

  if (!presentationModeBtn || !presentationOverlay) return;

  presentationModeBtn.addEventListener('click', () => {
    presentationOverlay.classList.add('active');
    currentSlide = 1;
    showSlide(currentSlide);
  });

  document.addEventListener('keydown', (e) => {
    if (!presentationOverlay.classList.contains('active')) return;
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
      changeSlide(-1);
    } else if (e.key === 'Escape') {
      exitPresentationMode();
    }
  });
}

window.exitPresentationMode = function() {
  const presentationOverlay = document.getElementById('presentationOverlay');
  if (presentationOverlay) presentationOverlay.classList.remove('active');
};

window.changeSlide = function(direction) {
  currentSlide += direction;
  if (currentSlide < 1) currentSlide = 1;
  if (currentSlide > totalSlides) currentSlide = totalSlides;
  showSlide(currentSlide);
};

window.goToSlide = function(num) {
  currentSlide = num;
  showSlide(currentSlide);
};

function showSlide(num) {
  const slides = document.querySelectorAll('.deck-slide');
  const dots = document.querySelectorAll('.deck-dots .dot');
  const slideNumEl = document.getElementById('currentSlideNum');

  slides.forEach((s, idx) => {
    if (idx + 1 === num) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });

  dots.forEach((d, idx) => {
    if (idx + 1 === num) {
      d.classList.add('active');
    } else {
      d.classList.remove('active');
    }
  });

  if (slideNumEl) slideNumEl.textContent = num;
}

/* ==========================================================================
   EXECUTIVE PDF REPORT EXPORT
   ========================================================================== */
function initExport() {
  const exportBtn = document.getElementById('exportReportBtn');
  if (!exportBtn) return;

  exportBtn.addEventListener('click', () => {
    window.print();
  });
}
