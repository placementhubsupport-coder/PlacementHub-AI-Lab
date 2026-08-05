/**
 * PlacementHub AI Lab — Dashboard Interactive Controller
 * Handles KPI updates, chart tab switching, workspace toolbar modals & actions,
 * interactive Recent Activity filtering/pagination, and System Health status.
 */

import { mockCandidates, mockDrives, mockActivityHistory, mockSystemHealth } from '../data/mockData.js';
import { showToast, openModal, closeModal, showLoadingOverlay, hideLoadingOverlay, asyncSimulateApiCall } from './components.js';

// Dashboard Local State
let candidateCount = 1248;
let avgResumeScore = 88.4;
let avgMatchScore = 96.4;
let evaluationsCount = 148;
let activeDrivesCount = 42;

let activities = [...mockActivityHistory];
let activeFilters = { query: '', tool: '', status: '' };
let currentPage = 1;
const pageSize = 4;

document.addEventListener('DOMContentLoaded', () => {
  initKPICards();
  initToolbarActions();
  initAnalyticsChart();
  initActivityTable();
  initSystemHealth();
  initModalTriggers();
});

// ============================================================================
// 1. KPI CARDS INITIALIZATION & UPDATES
// ============================================================================
function initKPICards() {
  updateKPIUI();
}

function updateKPIUI() {
  const totalCandEl = document.getElementById('kpi-total-candidates');
  const avgResumeEl = document.getElementById('kpi-avg-resume-score');
  const avgMatchEl = document.getElementById('kpi-avg-match-score');
  const activeDrivesEl = document.getElementById('kpi-active-drives');
  const evalsSubtextEl = document.getElementById('kpi-evals-subtext');

  if (totalCandEl) totalCandEl.textContent = candidateCount.toLocaleString();
  if (avgResumeEl) avgResumeEl.textContent = avgResumeScore.toFixed(1);
  if (avgMatchEl) avgMatchEl.textContent = `${avgMatchScore.toFixed(1)}%`;
  if (activeDrivesEl) activeDrivesEl.textContent = activeDrivesCount;
  if (evalsSubtextEl) evalsSubtextEl.textContent = `AI confidence · ${evaluationsCount} evaluations`;
}

// ============================================================================
// 2. WORKSPACE TOOLBAR ACTIONS & MODALS
// ============================================================================
function initToolbarActions() {
  // Import Candidates Button
  const btnImport = document.getElementById('btn-import-candidates');
  if (btnImport) {
    btnImport.addEventListener('click', () => openModal('modal-import-candidates'));
  }

  const btnConfirmImport = document.getElementById('btn-confirm-import');
  if (btnConfirmImport) {
    btnConfirmImport.addEventListener('click', async () => {
      closeModal('modal-import-candidates');
      showLoadingOverlay(document.body, 'Importing candidate batch profiles...');
      await asyncSimulateApiCall(null, 1200);
      hideLoadingOverlay(document.body);

      candidateCount += 50;
      updateKPIUI();

      const candSubtext = document.getElementById('kpi-candidates-subtext');
      if (candSubtext) candSubtext.textContent = 'Registered · updated just now';

      showToast('Successfully imported 50 candidate profiles into batch 2026.', 'success');
    });
  }

  // New Evaluation Button
  const btnNewEval = document.getElementById('btn-new-eval');
  if (btnNewEval) {
    btnNewEval.addEventListener('click', () => {
      populateEvalModalSelects();
      openModal('modal-new-evaluation');
    });
  }

  const btnConfirmEval = document.getElementById('btn-confirm-eval');
  if (btnConfirmEval) {
    btnConfirmEval.addEventListener('click', async () => {
      const candSelect = document.getElementById('eval-candidate-select');
      const driveSelect = document.getElementById('eval-drive-select');
      const candidateName = candSelect ? candSelect.value : 'Selected Candidate';
      const driveName = driveSelect ? driveSelect.value : 'Target Drive';

      closeModal('modal-new-evaluation');
      showLoadingOverlay(document.body, `Running AI evaluation for ${candidateName}...`);
      await asyncSimulateApiCall(null, 1400);
      hideLoadingOverlay(document.body);

      evaluationsCount += 1;
      const nowStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      activities.unshift({
        time: nowStr,
        candidate: candidateName,
        tool: 'Candidate Matching',
        action: `Matched vs ${driveName.split(' — ')[0]}`,
        status: 'Shortlisted',
        pageUrl: 'poc1-student-job-matching.html'
      });

      currentPage = 1;
      renderActivityTable();
      updateKPIUI();

      showToast(`AI Evaluation complete for ${candidateName}. Match score: 96.8%`, 'success');
    });
  }

  // Schedule Drive Button
  const btnScheduleDrive = document.getElementById('btn-schedule-drive');
  if (btnScheduleDrive) {
    btnScheduleDrive.addEventListener('click', () => openModal('modal-schedule-drive'));
  }

  const btnConfirmDrive = document.getElementById('btn-confirm-drive');
  if (btnConfirmDrive) {
    btnConfirmDrive.addEventListener('click', async () => {
      const companyInput = document.getElementById('drive-company-input');
      const titleInput = document.getElementById('drive-title-input');
      const company = companyInput && companyInput.value.trim() ? companyInput.value.trim() : 'QuantumScale AI';
      const title = titleInput && titleInput.value.trim() ? titleInput.value.trim() : 'ML Engineer Intern';

      closeModal('modal-schedule-drive');
      showLoadingOverlay(document.body, `Publishing drive for ${company}...`);
      await asyncSimulateApiCall(null, 1200);
      hideLoadingOverlay(document.body);

      activeDrivesCount += 1;
      updateKPIUI();

      if (companyInput) companyInput.value = '';
      if (titleInput) titleInput.value = '';

      showToast(`Placement drive for ${company} (${title}) published successfully!`, 'success');
    });
  }

  // Refresh Data Button
  const btnRefresh = document.getElementById('btn-refresh-data');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', async () => {
      showLoadingOverlay(document.body, 'Refreshing live index & analytics...');
      await asyncSimulateApiCall(null, 1000);
      hideLoadingOverlay(document.body);

      const candSubtext = document.getElementById('kpi-candidates-subtext');
      if (candSubtext) candSubtext.textContent = 'Registered · updated just now';

      showToast('Dashboard metrics refreshed from live search index.', 'info');
    });
  }

  // Download Report Button
  const btnDownloadReport = document.getElementById('btn-download-report');
  if (btnDownloadReport) {
    btnDownloadReport.addEventListener('click', async () => {
      showLoadingOverlay(document.body, 'Generating PDF Operations Report...');
      await asyncSimulateApiCall(null, 1200);
      hideLoadingOverlay(document.body);

      // Trigger dummy file download
      const reportText = `PlacementHub AI Lab — Operations Summary Report
Generated: ${new Date().toLocaleString()}
Batch: 2026 Batch
Total Candidates: ${candidateCount}
Avg Resume Score: ${avgResumeScore}/100
Avg Match Score: ${avgMatchScore}%
Active Placement Drives: ${activeDrivesCount}
System Status: Operational (14ms avg latency)
--------------------------------------------------
Report Status: VERIFIED & CONFIRMED`;

      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `PlacementHub_Operations_Report_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Operations report downloaded successfully.', 'success');
    });
  }
}

function populateEvalModalSelects() {
  const candSelect = document.getElementById('eval-candidate-select');
  const driveSelect = document.getElementById('eval-drive-select');

  if (candSelect) {
    candSelect.innerHTML = mockCandidates.map(c => 
      `<option value="${c.name}">${c.name} (${c.degree} · ${c.cgpa} CGPA)</option>`
    ).join('');
  }

  if (driveSelect) {
    driveSelect.innerHTML = mockDrives.map(d => 
      `<option value="${d.company} — ${d.title}">${d.company} — ${d.title}</option>`
    ).join('');
  }
}

function initModalTriggers() {
  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.wf-modal-dialog');
      if (modal) closeModal(modal);
    });
  });
}

// ============================================================================
// 3. ANALYTICS CHART TABS
// ============================================================================
function initAnalyticsChart() {
  const tabHeader = document.getElementById('chart-tabs-header');
  if (!tabHeader) return;

  const tabs = tabHeader.querySelectorAll('.wf-tab');
  const chartDesc = document.getElementById('chart-desc');
  const chartBars = document.getElementById('chart-bars');
  const chartTypeLabel = document.getElementById('chart-type-label');
  const chartLegend = document.getElementById('chart-legend');

  const tabConfigs = {
    'placements': {
      desc: 'Monthly placements vs targets — 2026 batch',
      type: 'Bar chart — Recharts BarChart component',
      legend: '■ Placed &nbsp; □ Pending',
      heights: ['60px', '85px', '110px', '95px', '130px', '140px']
    },
    'resume-scores': {
      desc: 'Average ATS resume scores across engineering streams',
      type: 'Score trend line — Recharts LineChart component',
      legend: '■ CSE Avg &nbsp; □ IT Avg',
      heights: ['110px', '115px', '125px', '130px', '140px', '145px']
    },
    'response-time': {
      desc: 'AI inference latency trends per request (milliseconds)',
      type: 'Latency area chart — Recharts AreaChart component',
      legend: '■ Embedding &nbsp; □ LLM inference',
      heights: ['45px', '38px', '32px', '28px', '22px', '14px']
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-tab') || 'placements';
      const config = tabConfigs[key] || tabConfigs['placements'];

      if (chartDesc) chartDesc.textContent = config.desc;
      if (chartTypeLabel) chartTypeLabel.textContent = config.type;
      if (chartLegend) chartLegend.innerHTML = config.legend;

      if (chartBars) {
        const barDivs = chartBars.querySelectorAll('.wf-chart-bar');
        barDivs.forEach((bar, idx) => {
          if (config.heights[idx]) {
            bar.style.height = config.heights[idx];
          }
        });
      }
    });
  });
}

// ============================================================================
// 4. RECENT ACTIVITY TABLE FILTERING & PAGINATION
// ============================================================================
function initActivityTable() {
  const searchInput = document.getElementById('activity-search-input');
  const toolSelect = document.getElementById('activity-tool-select');
  const statusSelect = document.getElementById('activity-status-select');
  const filterBtn = document.getElementById('activity-filter-btn');
  const resetBtn = document.getElementById('btn-reset-filters');
  const prevBtn = document.getElementById('btn-page-prev');
  const nextBtn = document.getElementById('btn-page-next');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.query = e.target.value.trim().toLowerCase();
      currentPage = 1;
      renderActivityTable();
    });
  }

  if (toolSelect) {
    toolSelect.addEventListener('change', (e) => {
      activeFilters.tool = e.target.value;
      currentPage = 1;
      renderActivityTable();
    });
  }

  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      activeFilters.status = e.target.value;
      currentPage = 1;
      renderActivityTable();
    });
  }

  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      currentPage = 1;
      renderActivityTable();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeFilters = { query: '', tool: '', status: '' };
      if (searchInput) searchInput.value = '';
      if (toolSelect) toolSelect.value = '';
      if (statusSelect) statusSelect.value = '';
      currentPage = 1;
      renderActivityTable();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderActivityTable();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const filtered = getFilteredActivities();
      const maxPage = Math.ceil(filtered.length / pageSize) || 1;
      if (currentPage < maxPage) {
        currentPage++;
        renderActivityTable();
      }
    });
  }

  renderActivityTable();
}

function getFilteredActivities() {
  return activities.filter(act => {
    const matchesQuery = !activeFilters.query || 
      act.candidate.toLowerCase().includes(activeFilters.query) ||
      act.action.toLowerCase().includes(activeFilters.query) ||
      act.status.toLowerCase().includes(activeFilters.query);

    const matchesTool = !activeFilters.tool || act.tool === activeFilters.tool;
    const matchesStatus = !activeFilters.status || act.status === activeFilters.status;

    return matchesQuery && matchesTool && matchesStatus;
  });
}

function renderActivityTable() {
  const tbody = document.getElementById('activity-table-tbody');
  const paginationInfo = document.getElementById('activity-pagination-info');
  const prevBtn = document.getElementById('btn-page-prev');
  const nextBtn = document.getElementById('btn-page-next');
  const chipsContainer = document.getElementById('activity-chips-container');
  const chipsRow = document.getElementById('activity-chips-row');

  if (!tbody) return;

  const filtered = getFilteredActivities();
  const total = filtered.length;
  const maxPage = Math.ceil(total / pageSize) || 1;
  if (currentPage > maxPage) currentPage = maxPage;

  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + pageSize);

  // Render Rows
  if (pageItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="padding: 28px; text-align: center; color: var(--text-muted); font-size: 13px;">
          No activity logs match the selected filters. <button class="wf-btn-ghost wf-btn-xs" id="empty-reset-btn" style="text-decoration: underline; margin-left: 6px;">Reset filters</button>
        </td>
      </tr>
    `;
    const emptyReset = document.getElementById('empty-reset-btn');
    if (emptyReset) {
      emptyReset.addEventListener('click', () => {
        document.getElementById('btn-reset-filters').click();
      });
    }
  } else {
    tbody.innerHTML = pageItems.map(act => {
      const isDarkBadge = act.status === 'Shortlisted' || act.status.includes('Active');
      const badgeClass = isDarkBadge ? 'wf-badge wf-badge-dark' : 'wf-badge wf-badge-outline';

      return `
        <tr>
          <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${act.time}</td>
          <td><strong>${act.candidate}</strong></td>
          <td style="color: var(--text-secondary);">${act.tool}</td>
          <td style="color: var(--text-secondary);">${act.action}</td>
          <td><span class="${badgeClass}">${act.status}</span></td>
          <td class="wf-row-actions">
            <a href="${act.pageUrl}" class="wf-btn wf-btn-xs">Open</a>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Pagination Controls
  if (paginationInfo) {
    const endCount = Math.min(startIndex + pageSize, total);
    paginationInfo.textContent = total > 0 ? `Showing ${startIndex + 1}–${endCount} of ${total} events today` : 'Showing 0 of 0 events';
  }

  if (prevBtn) prevBtn.disabled = currentPage <= 1;
  if (nextBtn) nextBtn.disabled = currentPage >= maxPage;

  // Active Filter Chips
  if (chipsContainer && chipsRow) {
    let chipsHTML = '';
    if (activeFilters.query) {
      chipsHTML += `<span class="wf-filter-chip">Query: "${activeFilters.query}" <span class="wf-filter-chip-remove" data-clear="query">×</span></span>`;
    }
    if (activeFilters.tool) {
      chipsHTML += `<span class="wf-filter-chip">Tool: ${activeFilters.tool} <span class="wf-filter-chip-remove" data-clear="tool">×</span></span>`;
    }
    if (activeFilters.status) {
      chipsHTML += `<span class="wf-filter-chip">Status: ${activeFilters.status} <span class="wf-filter-chip-remove" data-clear="status">×</span></span>`;
    }

    chipsContainer.innerHTML = chipsHTML;

    chipsContainer.querySelectorAll('.wf-filter-chip-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.target.getAttribute('data-clear');
        if (key === 'query') {
          activeFilters.query = '';
          const searchInput = document.getElementById('activity-search-input');
          if (searchInput) searchInput.value = '';
        } else if (key === 'tool') {
          activeFilters.tool = '';
          const toolSelect = document.getElementById('activity-tool-select');
          if (toolSelect) toolSelect.value = '';
        } else if (key === 'status') {
          activeFilters.status = '';
          const statusSelect = document.getElementById('activity-status-select');
          if (statusSelect) statusSelect.value = '';
        }
        currentPage = 1;
        renderActivityTable();
      });
    });
  }
}

// ============================================================================
// 5. SYSTEM HEALTH PANEL
// ============================================================================
function initSystemHealth() {
  const engineLoad = document.getElementById('health-engine-load');
  const engineBar = document.getElementById('health-engine-bar');
  const memory = document.getElementById('health-memory');
  const memoryBar = document.getElementById('health-memory-bar');
  const latency = document.getElementById('health-latency');
  const latencyBar = document.getElementById('health-latency-bar');
  const statusBadge = document.getElementById('health-status-badge');

  if (engineLoad) engineLoad.textContent = `${mockSystemHealth.engineLoad}%`;
  if (engineBar) engineBar.style.width = `${mockSystemHealth.engineLoad}%`;
  if (memory) memory.textContent = mockSystemHealth.memoryUsage;
  if (memoryBar) memoryBar.style.width = '68%';
  if (latency) latency.textContent = `${mockSystemHealth.latency} avg`;
  if (latencyBar) latencyBar.style.width = '25%';
  if (statusBadge) statusBadge.textContent = mockSystemHealth.status;
}
