/**
 * PlacementHub AI Lab — Candidate Matching Interactive Controller
 * Handles candidate table rendering, multi-select bulk actions (Compare, Shortlist, Export),
 * AI skill analysis processing, Candidate Detail Right Drawer, and Compare Modal.
 */

import { mockCandidates } from'../data/mockData.js';
import { showToast, openModal, closeModal, openDrawer, closeDrawer, showLoadingOverlay, hideLoadingOverlay, asyncSimulateApiCall } from'./components.js';

// Controller State
let candidates = JSON.parse(JSON.stringify(mockCandidates));
let selectedIds = new Set();
let activeFilters = { query: '', role: '', minScore: '', dept: '' };
let sortBy = 'score-desc';
let currentPage = 1;
const pageSize = 5;
let currentDrawerCandidateId = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('[POC 1] Candidate Matching initialized');
  initKPISummary();
  initFilterToolbar();
  initBulkToolbar();
  initTableSorting();
  initTopActions();
  initDrawerTabs();
  renderCandidateTable();
});

// ============================================================================
// 1. KPI SUMMARY UPDATES
// ============================================================================
function initKPISummary() {
 updateKPIUI();
}

function updateKPIUI() {
 const evalCountEl = document.getElementById('kpi-eval-count');
 const strongCountEl = document.getElementById('kpi-strong-count');
 const avgScoreEl = document.getElementById('kpi-avg-score');
 const topRoleEl = document.getElementById('kpi-top-role');

 const evaluatedCount = candidates.length;
 const strongMatches = candidates.filter(c =>c.matchScore >= 90).length;
 const sumScores = candidates.reduce((acc, c) =>acc + c.matchScore, 0);
 const avgScore = evaluatedCount >0 ? (sumScores / evaluatedCount).toFixed(1) : '0.0';

 const topCandidate = [...candidates].sort((a, b) =>b.matchScore - a.matchScore)[0];
 const topRole = topCandidate ? topCandidate.targetRole.split(' — ')[0] : 'AI Research Eng.';

 if (evalCountEl) evalCountEl.textContent = evaluatedCount;
 if (strongCountEl) strongCountEl.textContent = strongMatches;
 if (avgScoreEl) avgScoreEl.textContent = `${avgScore}%`;
 if (topRoleEl) topRoleEl.textContent = topRole;
}

// ============================================================================
// 2. FILTER TOOLBAR & CHIPS
// ============================================================================
function initFilterToolbar() {
 const searchInput = document.getElementById('match-search-input');
 const roleSelect = document.getElementById('match-role-select');
 const scoreSelect = document.getElementById('match-score-select');
 const deptSelect = document.getElementById('match-dept-select');
 const applyBtn = document.getElementById('btn-apply-filters');
 const resetBtn = document.getElementById('btn-reset-match-filters');

 const contextualInput = document.getElementById('match-contextual-query');
 const runMatchBtn = document.getElementById('btn-run-matching-analysis');
 const topAnalyzeBtn = document.getElementById('btn-analyze-top');

  if (runMatchBtn) {
    runMatchBtn.addEventListener('click', async () => {
      console.log('[POC 1] Run Match Analysis button clicked');
      runMatchBtn.disabled = true;
      runMatchBtn.textContent = 'Analyzing...';
      const q = contextualInput ? contextualInput.value.trim() : '';

      await triggerCandidateMatchStepper(q || 'Find candidates matching criteria');

      // Update candidates status & table based on search
      candidates.forEach(c => {
        if (c.matchScore >= 85) c.status = 'Shortlisted';
      });

      currentPage = 1;
      renderCandidateTable();
      updateKPIUI();

      runMatchBtn.disabled = false;
      runMatchBtn.textContent = 'Run Match Analysis';

      showToast('Candidate match analysis complete. Evaluated 148 candidates.', 'success');
    });
  }

 if (topAnalyzeBtn) {
 topAnalyzeBtn.addEventListener('click', () =>{
 triggerCandidateMatchStepper('Analyze & Shortlist Top Candidates');
 });
 }

 if (searchInput) {
 searchInput.addEventListener('input', (e) =>{
 activeFilters.query = e.target.value.trim().toLowerCase();
 currentPage = 1;
 renderCandidateTable();
 });
 }

 if (roleSelect) {
 roleSelect.addEventListener('change', (e) =>{
 activeFilters.role = e.target.value;
 currentPage = 1;
 renderCandidateTable();
 });
 }

 if (scoreSelect) {
 scoreSelect.addEventListener('change', (e) =>{
 activeFilters.minScore = e.target.value;
 currentPage = 1;
 renderCandidateTable();
 });
 }

 if (deptSelect) {
 deptSelect.addEventListener('change', (e) =>{
 activeFilters.dept = e.target.value;
 currentPage = 1;
 renderCandidateTable();
 });
 }

 if (applyBtn) {
 applyBtn.addEventListener('click', () =>{
 currentPage = 1;
 renderCandidateTable();
 showToast('Filters applied to candidate index.', 'info');
 });
 }

 if (exportCsvBtn) {
 exportCsvBtn.addEventListener('click', () =>{
 exportCandidatesToCSV(getFilteredCandidates());
 });
 }

 if (resetBtn) {
 resetBtn.addEventListener('click', () =>{
 activeFilters = { query: '', role: '', minScore: '', dept: '' };
 if (searchInput) searchInput.value = '';
 if (roleSelect) roleSelect.value = '';
 if (scoreSelect) scoreSelect.value = '';
 if (deptSelect) deptSelect.value = '';
 currentPage = 1;
 renderCandidateTable();
 });
 }
}

function initTableSorting() {
 const sortSelect = document.getElementById('match-sort-select');
 if (sortSelect) {
 sortSelect.addEventListener('change', (e) =>{
 sortBy = e.target.value;
 renderCandidateTable();
 });
 }
}

// ============================================================================
// 3. TABLE FILTERING & RENDERING
// ============================================================================
function getFilteredCandidates() {
 let filtered = candidates.filter(c =>{
 const matchesQuery = !activeFilters.query ||
 c.name.toLowerCase().includes(activeFilters.query) ||
 c.skills.some(s =>s.toLowerCase().includes(activeFilters.query)) ||
 c.targetRole.toLowerCase().includes(activeFilters.query);

 const matchesRole = !activeFilters.role || c.targetRole.toLowerCase().includes(activeFilters.role.toLowerCase());
 const matchesMinScore = !activeFilters.minScore || c.matchScore >= parseFloat(activeFilters.minScore);
 const matchesDept = !activeFilters.dept || c.department === activeFilters.dept;

 return matchesQuery && matchesRole && matchesMinScore && matchesDept;
 });

 // Apply Sorting
 filtered.sort((a, b) =>{
 if (sortBy === 'score-desc') return b.matchScore - a.matchScore;
 if (sortBy === 'score-asc') return a.matchScore - b.matchScore;
 if (sortBy === 'cgpa-desc') return b.cgpa - a.cgpa;
 if (sortBy === 'resume-desc') return b.resumeScore - a.resumeScore;
 return 0;
 });

 return filtered;
}

function renderCandidateTable() {
 const tbody = document.getElementById('match-table-tbody');
 const paginationInfo = document.getElementById('match-pagination-info');
 const prevBtn = document.getElementById('btn-match-prev');
 const nextBtn = document.getElementById('btn-match-next');
 const selectAllCb = document.getElementById('select-all-checkbox');
 const chipsContainer = document.getElementById('match-chips-container');
 const resultsDesc = document.getElementById('match-results-desc');

 if (!tbody) return;

 const filtered = getFilteredCandidates();
 const total = filtered.length;
 const maxPage = Math.ceil(total / pageSize) || 1;
 if (currentPage >maxPage) currentPage = maxPage;

 const startIndex = (currentPage - 1) * pageSize;
 const pageItems = filtered.slice(startIndex, startIndex + pageSize);

 if (resultsDesc) {
 resultsDesc.textContent = `Ranked by AI match score · ${total} candidates`;
 }

 // Update Header Checkbox State
 if (selectAllCb) {
 const allPageSelected = pageItems.length >0 && pageItems.every(c =>selectedIds.has(c.id));
 selectAllCb.checked = allPageSelected;
 }

 // Render Rows
 if (pageItems.length === 0) {
 tbody.innerHTML = `
<tr>
<td colspan="8"style="padding: 28px; text-align: center; color: var(--text-muted); font-size: 13px;">
 No candidates match the selected filters.<button class="wf-btn-ghost wf-btn-xs"id="empty-reset-match-btn"style="text-decoration: underline; margin-left: 6px;">Reset filters</button>
</td>
</tr>
 `;
 const emptyReset = document.getElementById('empty-reset-match-btn');
 if (emptyReset) {
 emptyReset.addEventListener('click', () =>{
 document.getElementById('btn-reset-match-filters').click();
 });
 }
 } else {
 tbody.innerHTML = pageItems.map(c =>{
 const isChecked = selectedIds.has(c.id) ? 'checked' : '';
 const isDarkBadge = c.status === 'Shortlisted' || c.status === 'Eligible';
 const badgeClass = isDarkBadge ? 'wf-badge wf-badge-dark' : 'wf-badge wf-badge-outline';

 return `
<tr data-cand-id="${c.id}">
<td><input type="checkbox"class="cand-row-checkbox"data-id="${c.id}" ${isChecked}></td>
<td><strong>${c.name}</strong></td>
<td style="color: var(--text-secondary);">${c.degree} · ${c.cgpa}</td>
<td>${c.resumeScore} / 100</td>
<td style="color: var(--text-secondary);">${c.targetRole.split(' — ')[0]}</td>
<td>
<div style="display: flex; align-items: center; gap: 8px;">
<div class="wf-progress-track"style="width: 72px;">
<div class="wf-progress-fill"style="width: ${c.matchScore}%;"></div>
</div>
<span style="font-size: 11px; font-weight: 700; font-family: var(--font-mono);">${c.matchScore}%</span>
</div>
</td>
<td><span class="${badgeClass}">${c.status}</span></td>
<td class="wf-row-actions">
<button class="wf-btn wf-btn-xs wf-btn-primary btn-open-drawer"data-id="${c.id}">Open</button>
</td>
</tr>
 `;
 }).join('');
 }

 // Attach Event Listeners to Checkboxes & Open buttons
 tbody.querySelectorAll('.cand-row-checkbox').forEach(cb =>{
 cb.addEventListener('change', (e) =>{
 const id = e.target.getAttribute('data-id');
 if (e.target.checked) {
 selectedIds.add(id);
 } else {
 selectedIds.delete(id);
 }
 updateBulkToolbarState();
 });
 });

 tbody.querySelectorAll('.btn-open-drawer').forEach(btn =>{
 btn.addEventListener('click', (e) =>{
 const id = e.target.getAttribute('data-id');
 openCandidateDrawer(id);
 });
 });

 // Header Checkbox Handler
 if (selectAllCb) {
 selectAllCb.onclick = (e) =>{
 const isChecked = e.target.checked;
 pageItems.forEach(c =>{
 if (isChecked) selectedIds.add(c.id);
 else selectedIds.delete(c.id);
 });
 renderCandidateTable();
 updateBulkToolbarState();
 };
 }

 // Pagination Controls
 if (paginationInfo) {
 paginationInfo.textContent = `Showing ${pageItems.length} of ${total} · ${selectedIds.size} selected`;
 }

 if (prevBtn) prevBtn.disabled = currentPage<= 1;
 if (nextBtn) nextBtn.disabled = currentPage >= maxPage;

 // Active Filter Chips
 if (chipsContainer) {
 let chipsHTML = '';
 if (activeFilters.query) chipsHTML += `<span class="wf-filter-chip">Query: "${activeFilters.query}"<span class="wf-filter-chip-remove"data-clear="query">×</span></span>`;
 if (activeFilters.role) chipsHTML += `<span class="wf-filter-chip">Role: ${activeFilters.role}<span class="wf-filter-chip-remove"data-clear="role">×</span></span>`;
 if (activeFilters.minScore) chipsHTML += `<span class="wf-filter-chip">Min Score: ≥${activeFilters.minScore}%<span class="wf-filter-chip-remove"data-clear="minScore">×</span></span>`;
 if (activeFilters.dept) chipsHTML += `<span class="wf-filter-chip">Dept: ${activeFilters.dept}<span class="wf-filter-chip-remove"data-clear="dept">×</span></span>`;

 chipsContainer.innerHTML = chipsHTML;

 chipsContainer.querySelectorAll('.wf-filter-chip-remove').forEach(btn =>{
 btn.addEventListener('click', (e) =>{
 const key = e.target.getAttribute('data-clear');
 activeFilters[key] = '';
 if (key === 'query') document.getElementById('match-search-input').value = '';
 if (key === 'role') document.getElementById('match-role-select').value = '';
 if (key === 'minScore') document.getElementById('match-score-select').value = '';
 if (key === 'dept') document.getElementById('match-dept-select').value = '';
 currentPage = 1;
 renderCandidateTable();
 });
 });
 }

 updateBulkToolbarState();
}

// ============================================================================
// 4. BULK TOOLBAR ACTIONS
// ============================================================================
function initBulkToolbar() {
 const filterToolbar = document.getElementById('filter-toolbar');
 const bulkToolbar = document.getElementById('bulk-toolbar');
 const btnCompare = document.getElementById('btn-bulk-compare');
 const btnShortlist = document.getElementById('btn-bulk-shortlist');
 const btnExport = document.getElementById('btn-bulk-export');
 const btnClear = document.getElementById('btn-bulk-clear');

 if (btnClear) {
 btnClear.addEventListener('click', () =>{
 selectedIds.clear();
 renderCandidateTable();
 });
 }

 if (btnShortlist) {
 btnShortlist.addEventListener('click', () =>{
 if (selectedIds.size === 0) return;

 candidates.forEach(c =>{
 if (selectedIds.has(c.id)) {
 c.status = 'Shortlisted';
 }
 });

 const count = selectedIds.size;
 selectedIds.clear();
 renderCandidateTable();
 updateKPIUI();
 showToast(`Shortlisted ${count} candidates successfully.`, 'success');
 });
 }

 if (btnExport) {
 btnExport.addEventListener('click', () =>{
 const selectedCandidates = candidates.filter(c =>selectedIds.has(c.id));
 exportCandidatesToCSV(selectedCandidates.length >0 ? selectedCandidates : getFilteredCandidates());
 });
 }

 if (btnCompare) {
 btnCompare.addEventListener('click', () =>{
 let selectedList = candidates.filter(c =>selectedIds.has(c.id));
 if (selectedList.length< 2) {
 selectedList = candidates.slice(0, 2);
 showToast('Comparing top 2 candidates from batch.', 'info');
 }
 openCompareModal(selectedList);
 });
 }
}

function updateBulkToolbarState() {
 const filterToolbar = document.getElementById('filter-toolbar');
 const bulkToolbar = document.getElementById('bulk-toolbar');
 const bulkCountLabel = document.getElementById('bulk-count-label');

 if (!filterToolbar || !bulkToolbar) return;

 if (selectedIds.size >0) {
 filterToolbar.style.display = 'none';
 bulkToolbar.style.display = 'flex';
 if (bulkCountLabel) bulkCountLabel.textContent = `${selectedIds.size} candidate${selectedIds.size >1 ? 's' : ''} selected`;
 } else {
 filterToolbar.style.display = 'block';
 bulkToolbar.style.display = 'none';
 }
}

function exportCandidatesToCSV(candList) {
 if (!candList || candList.length === 0) {
 showToast('No candidates available to export.', 'warning');
 return;
 }

 const headers = ["ID", "Name", "Email", "Degree", "CGPA", "Resume Score", "Match Score", "Target Role", "Status"];
 const rows = candList.map(c =>[
 c.id, `"${c.name}"`, c.email, `"${c.degree}"`, c.cgpa, c.resumeScore, `${c.matchScore}%`, `"${c.targetRole}"`, c.status
 ]);

 const csvContent = [headers.join(','), ...rows.map(r =>r.join(','))].join('\n');
 const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
 const link = document.createElement('a');
 link.href = URL.createObjectURL(blob);
 link.download = `Candidate_Match_Export_${new Date().toISOString().slice(0, 10)}.csv`;
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);

 showToast(`Exported ${candList.length} candidate records to CSV.`, 'success');
}

// ============================================================================
// 5. TOP HEADER ACTIONS (ANALYZE & SHORTLIST)
// ============================================================================
function initTopActions() {
  const btnAnalyzeTop = document.getElementById('btn-analyze-top');
  if (btnAnalyzeTop) {
    btnAnalyzeTop.addEventListener('click', async () => {
      console.log('[POC 1] Analyze button clicked');
      btnAnalyzeTop.disabled = true;
      btnAnalyzeTop.textContent = 'Analyzing candidates...';

      await triggerCandidateMatchStepper('Analyze & Shortlist Top Candidates');

      // Recalculate AI scores dynamically
      candidates.forEach(c => {
        if (c.matchScore >= 80) {
          c.status = 'Shortlisted';
        }
      });

      sortBy = 'score-desc';
      currentPage = 1;
      renderCandidateTable();
      updateKPIUI();

      btnAnalyzeTop.disabled = false;
      btnAnalyzeTop.textContent = 'Analyze & Shortlist';

      showToast('Analysis completed: 148 candidates evaluated, 94 strong matches shortlisted.', 'success');
    });
  }
}

async function triggerCandidateMatchStepper(customQuery = '') {
 const stepperCard = document.getElementById('match-stepper-card');
 const stepperTitle = document.getElementById('match-stepper-title');
 const stepperTimer = document.getElementById('match-stepper-timer');
 const stepperList = document.getElementById('match-stepper-steps-list');

 if (stepperCard) stepperCard.style.display = 'block';
 if (stepperTitle) stepperTitle.textContent = customQuery ? `AI Matcher: "${customQuery}"` : 'Candidate Matching Neural Engine Executing...';
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 'Initializing Candidate Matching Neural Engine v3.4...',
 'Ingesting 148 candidate academic records & GitHub repositories...',
 'Applying skill vector embeddings against TechCorp AI JD...',
 'Computing similarity scores & CGPA cutoffs...',
 'Match Analysis Complete (148 candidates scored, 94 strong matches)'
 ];

 let startTime = Date.now();
 const timerInterval = setInterval(() =>{
 if (stepperTimer) {
 const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
 stepperTimer.textContent = `${elapsed}s`;
 }
 }, 100);

 for (let i = 0; i< steps.length; i++) {
 await asyncSimulateApiCall(null, 300);
 if (stepperList) {
 const stepItem = document.createElement('div');
 stepItem.innerHTML = `✓ ${steps[i]}`;
 stepperList.appendChild(stepItem);
 }
 }

 clearInterval(timerInterval);
 const finalTime = ((Date.now() - startTime) / 1000).toFixed(1);
 if (stepperTimer) stepperTimer.textContent = `${finalTime}s`;
 if (stepperTitle) stepperTitle.textContent = `✓ Match Analysis Complete (${finalTime}s • 96.4% Confidence Score)`;

 showToast('Candidate Skill Matching Complete. Ranked 148 candidates.', 'success');
}

// ============================================================================
// 6. CANDIDATE DETAIL DRAWER SHEET
// ============================================================================
function openCandidateDrawer(candidateId) {
 const cand = candidates.find(c =>c.id === candidateId);
 if (!cand) return;

 currentDrawerCandidateId = candidateId;

 const drawer = document.getElementById('candidate-detail-drawer');
 const candNameEl = document.getElementById('drawer-cand-name');
 const candSubEl = document.getElementById('drawer-cand-sub');
 const matchScoreEl = document.getElementById('drawer-match-score');
 const rankTextEl = document.getElementById('drawer-rank-text');
 const reasoningListEl = document.getElementById('drawer-reasoning-list');
 const matchedBadgesEl = document.getElementById('drawer-matched-badges');
 const missingBadgesEl = document.getElementById('drawer-missing-badges');

 const resumeScoreEl = document.getElementById('drawer-resume-score');
 const cgpaEl = document.getElementById('drawer-cgpa');
 const deptEl = document.getElementById('drawer-dept');
 const roleEl = document.getElementById('drawer-role');
 const statusEl = document.getElementById('drawer-status');

 if (candNameEl) candNameEl.textContent = cand.name;
 if (candSubEl) candSubEl.textContent = `${cand.degree} · CGPA ${cand.cgpa} · Batch ${cand.batch}`;
 if (matchScoreEl) matchScoreEl.textContent = `${cand.matchScore}%`;
 if (rankTextEl) rankTextEl.textContent = `Target: ${cand.targetRole} · Status: ${cand.status}`;

 if (reasoningListEl) {
 reasoningListEl.innerHTML = `
<div class="wf-card"style="padding: 10px; border: 1px solid var(--border-subtle); margin-bottom: 8px;">
<div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Standard AI Insight Card</div>
<div style="font-size: 12px; margin-top: 4px;"><strong>Problem:</strong>Candidate missing ${cand.missingSkills.join(', ') || 'minor secondary electives'}.</div>
<div style="font-size: 12px; margin-top: 2px;"><strong>Evidence:</strong>${cand.matchReasoning[0] || 'Strong GitHub portfolio'}</div>
<div style="font-size: 12px; margin-top: 2px;"><strong>Recommendation:</strong>Shortlist for ${cand.targetRole.split(' — ')[0]} technical round.</div>
<div style="font-size: 11px; margin-top: 4px; color: var(--text-secondary);">
 Expected Impact:<strong>+${cand.matchScore}% Selection Probability</strong>· Confidence:<strong>94%</strong>
</div>
<div style="display: flex; gap: 6px; margin-top: 8px;">
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Shortlisted candidate ${cand.name}')">Shortlist Candidate</button>
<a href="poc2-resume-analyzer.html"class="wf-btn wf-btn-xs wf-btn-secondary"style="text-decoration: none;">Review Resume →</a>
<a href="poc4-placement-copilot.html"class="wf-btn wf-btn-xs wf-btn-secondary"style="text-decoration: none;">Ask Copilot →</a>
</div>
</div>
 `;
 }

 if (matchedBadgesEl) {
 matchedBadgesEl.innerHTML = cand.skills.map(s =>`<span class="wf-badge">✓ ${s}</span>`).join('');
 }

 if (missingBadgesEl) {
 missingBadgesEl.innerHTML = cand.missingSkills.map(s =>`<span class="wf-badge wf-badge-outline">⚠ ${s}</span>`).join('');
 }

 if (resumeScoreEl) resumeScoreEl.textContent = `${cand.resumeScore} / 100`;
 if (cgpaEl) cgpaEl.textContent = `${cand.cgpa} / 10.0`;
 if (deptEl) deptEl.textContent = cand.department;
 if (roleEl) roleEl.textContent = cand.targetRole;
 if (statusEl) statusEl.textContent = cand.status;

 // Reset Tab to'why'
 switchDrawerTab('why');

 if (drawer) {
 drawer.style.display = 'flex';
 requestAnimationFrame(() =>drawer.classList.add('wf-drawer-visible'));
 }

 const btnClose = document.getElementById('btn-close-drawer');
 if (btnClose) {
 btnClose.onclick = () =>closeCandidateDrawer();
 }
}

function closeCandidateDrawer() {
 const drawer = document.getElementById('candidate-detail-drawer');
 if (drawer) {
 drawer.classList.remove('wf-drawer-visible');
 setTimeout(() =>drawer.style.display = 'none', 250);
 }
}

function initDrawerTabs() {
 const tabsContainer = document.getElementById('drawer-tabs');
 if (!tabsContainer) return;

 const tabs = tabsContainer.querySelectorAll('.wf-tab');
 tabs.forEach(tab =>{
 tab.addEventListener('click', () =>{
 const dtab = tab.getAttribute('data-dtab');
 switchDrawerTab(dtab);
 });
 });
}

function switchDrawerTab(targetTab) {
 const tabsContainer = document.getElementById('drawer-tabs');
 if (!tabsContainer) return;

 tabsContainer.querySelectorAll('.wf-tab').forEach(t =>{
 if (t.getAttribute('data-dtab') === targetTab) t.classList.add('active');
 else t.classList.remove('active');
 });

 const contents = document.querySelectorAll('.dtab-content');
 contents.forEach(c =>{
 if (c.id === `dtab-content-${targetTab}`) c.style.display = 'block';
 else c.style.display = 'none';
 });
}

// ============================================================================
// 7. COMPARE CANDIDATES MODAL
// ============================================================================
function openCompareModal(candList) {
 const modal = document.getElementById('compare-dialog');
 const headTr = document.getElementById('compare-table-head-tr');
 const tbody = document.getElementById('compare-table-tbody');
 const countLabel = document.getElementById('compare-modal-count');
 const aiRecBox = document.getElementById('compare-ai-recommendation');

 if (!modal || !headTr || !tbody) return;

 if (countLabel) countLabel.textContent = `${candList.length} candidates selected`;

 // Render Table Headers
 headTr.innerHTML = `<th>Criteria</th>` + candList.map(c =>`<th>${c.name}</th>`).join('');

 // Find Best Candidate
 const topCandidate = [...candList].sort((a, b) =>b.matchScore - a.matchScore)[0];

 // Criteria Rows
 const criteriaRows = [
 { label: 'Match Score', key: c =>`<strong>${c.matchScore}%</strong>` },
 { label: 'CGPA', key: c =>`${c.cgpa} · ${c.department}` },
 { label: 'Resume Score', key: c =>`${c.resumeScore} / 100` },
 { label: 'Key Skills', key: c =>c.skills.slice(0, 3).join(', ') },
 { label: 'Skill Gap Risk', key: c =>c.missingSkills.length >0 ? `Low/Med — Missing ${c.missingSkills[0]}` : 'Minimal Risk' }
 ];

 tbody.innerHTML = criteriaRows.map(row =>`
<tr>
<td>${row.label}</td>
 ${candList.map(c =>`<td>${row.key(c)}</td>`).join('')}
</tr>
 `).join('');

 if (aiRecBox && topCandidate) {
 aiRecBox.innerHTML = `
<strong>AI Recommendation:</strong><strong>${topCandidate.name}</strong>is the strongest candidate for ${topCandidate.targetRole.split(' — ')[0]} with a<strong>${topCandidate.matchScore}%</strong>match score, high CGPA (${topCandidate.cgpa}), and strong core domain alignment.
 `;
 }

 openModal(modal);

 const btnShortlistBoth = document.getElementById('btn-shortlist-both-compare');
 if (btnShortlistBoth) {
 btnShortlistBoth.onclick = () =>{
 candList.forEach(c =>{
 const found = candidates.find(item =>item.id === c.id);
 if (found) found.status = 'Shortlisted';
 });

 closeModal(modal);
 renderCandidateTable();
 updateKPIUI();
 showToast(`Shortlisted all ${candList.length} compared candidates.`, 'success');
 };
 }
}
