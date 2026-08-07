/**
 * PlacementHub AI Lab — Placement Search Interactive Controller
 * Handles natural language search interpretation, editable AI filter chips,
 * dynamic drive cards rendering (grid/table), Drive Detail Drawer, and localStorage Saved Searches.
 */

import { mockDrives, mockCandidates } from'../data/mockData.js';
import { showToast, openModal, closeModal, showLoadingOverlay, hideLoadingOverlay, asyncSimulateApiCall } from'./components.js';

// Controller State
let drives = JSON.parse(JSON.stringify(mockDrives));
let searchQuery = "Find remote React internships in Pune with stipend above ₹20K and PPO opportunity";
let activeFilters = { role: 'React', location: 'Pune / Remote', minStipend: 20000, offerType: 'PPO' };
let viewMode = 'grid'; // 'grid'or'table'
let sortBy = 'match-desc';
let selectedDriveId = 'drive-1';

// LocalStorage Saved Searches
let savedSearches = JSON.parse(localStorage.getItem('ph_saved_searches') || '[]');
if (savedSearches.length === 0) {
 savedSearches = [
 { id: 'ss-1', query: 'Remote React internships in Pune above ₹20K', filters: { role: 'React', location: 'Pune / Remote', minStipend: 20000, offerType: 'PPO' }, date: 'Yesterday' },
 { id: 'ss-2', query: 'Top AI Research drives with PPO above ₹12 LPA', filters: { role: 'AI', location: 'Bengaluru / Remote', minStipend: 40000, offerType: 'PPO' }, date: '3 days ago' }
 ];
 localStorage.setItem('ph_saved_searches', JSON.stringify(savedSearches));
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('[POC 3] Placement Search initialized');
  initSearchInput();
  initSuggestedPrompts();
  initFilterBanner();
  initViewControls();
  initSavedSearches();
  initDrawerActions();
  
  // Initial Search Run
  executeSearch(searchQuery);
});

// ============================================================================
// 1. NATURAL LANGUAGE SEARCH & INTERPRETATION
// ============================================================================
function initSearchInput() {
  const input = document.getElementById('drive-search-input');
  const btnSearch = document.getElementById('btn-run-search');
  const btnClear = document.getElementById('btn-clear-search');

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        console.log('[POC 3] Search button clicked via Enter');
        executeSearch(input.value.trim());
      }
    });
  }

  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
      console.log('[POC 3] Search button clicked');
      if (input) executeSearch(input.value.trim());
    });
  }

 if (btnClear) {
 btnClear.addEventListener('click', () =>{
 if (input) input.value = '';
 searchQuery = '';
 activeFilters = { role: '', location: '', minStipend: 0, offerType: '' };
 renderFilterChips();
 renderDrives();
 showToast('Cleared search query and filters.', 'info');
 });
 }
}

function initSuggestedPrompts() {
 const container = document.getElementById('suggested-prompts-container');
 if (!container) return;

 container.querySelectorAll('.wf-prompt-chip').forEach(chip =>{
 chip.style.cursor = 'pointer';
 chip.addEventListener('click', () =>{
 const queryText = chip.textContent.trim();
 const input = document.getElementById('drive-search-input');
 if (input) input.value = queryText;
 executeSearch(queryText);
 });
 });
}

function parseNaturalLanguageQuery(query) {
 const q = query.toLowerCase();
 const filters = { role: '', location: '', minStipend: 0, offerType: '' };

 if (q.includes('react') || q.includes('frontend')) filters.role = 'React';
 else if (q.includes('ai') || q.includes('research') || q.includes('ml')) filters.role = 'AI';
 else if (q.includes('full stack')) filters.role = 'Full Stack';
 else if (q.includes('data') || q.includes('python')) filters.role = 'Data';

 if (q.includes('pune')) filters.location = 'Pune';
 if (q.includes('remote')) filters.location = filters.location ? `${filters.location} / Remote` : 'Remote';
 if (q.includes('bengaluru')) filters.location = 'Bengaluru';
 if (q.includes('mumbai')) filters.location = 'Mumbai';

 if (q.includes('20k') || q.includes('20,000')) filters.minStipend = 20000;
 else if (q.includes('30k') || q.includes('30,000')) filters.minStipend = 30000;
 else if (q.includes('40k') || q.includes('45k')) filters.minStipend = 40000;

 if (q.includes('ppo')) filters.offerType = 'PPO';

 return filters;
}

async function executeSearch(queryStr) {
  searchQuery = queryStr;
  activeFilters = parseNaturalLanguageQuery(queryStr);

  const container = document.getElementById('drives-results-container');
  const summaryEl = document.getElementById('ai-interpretation-summary');

  if (summaryEl) {
    if (queryStr) {
      summaryEl.textContent = `AI understood query: Extracted [${activeFilters.role || 'Any Role'}] drives in [${activeFilters.location || 'All Locations'}] with stipend ≥ ₹${activeFilters.minStipend ? activeFilters.minStipend.toLocaleString() : '0'}/mo.`;
    } else {
      summaryEl.textContent = 'Showing all available placement drives.';
    }
  }

  renderFilterChips();

  if (container) {
    showLoadingOverlay(container, 'Running AI natural language search & matching...');
    await asyncSimulateApiCall(null, 600);
    hideLoadingOverlay(container);
  }

  const matchingDrives = renderDrives();
  const count = matchingDrives ? matchingDrives.length : 0;
  showToast(`Search completed: Found ${count} matching placement drives.`, 'success');
}

// ============================================================================
// 2. EDITABLE FILTER CHIPS
// ============================================================================
function initFilterBanner() {
 const btnReset = document.getElementById('btn-reset-drive-filters');
 if (btnReset) {
 btnReset.addEventListener('click', () =>{
 activeFilters = { role: '', location: '', minStipend: 0, offerType: '' };
 const input = document.getElementById('drive-search-input');
 if (input) input.value = '';
 searchQuery = '';
 renderFilterChips();
 renderDrives();
 showToast('Reset all placement search filters.', 'info');
 });
 }
}

function renderFilterChips() {
 const container = document.getElementById('editable-chips-container');
 if (!container) return;

 let html = '';

 if (activeFilters.role) {
 html += `
<div class="wf-editable-chip"data-filter="role">
<span class="wf-editable-chip-label">Role</span>
 ${activeFilters.role}<span class="wf-filter-chip-remove"data-remove="role">×</span>
</div>
 `;
 }

 if (activeFilters.location) {
 html += `
<div class="wf-editable-chip"data-filter="location">
<span class="wf-editable-chip-label">Location</span>
 ${activeFilters.location}<span class="wf-filter-chip-remove"data-remove="location">×</span>
</div>
 `;
 }

 if (activeFilters.minStipend >0) {
 html += `
<div class="wf-editable-chip"data-filter="minStipend">
<span class="wf-editable-chip-label">Min Stipend</span>
 ≥ ₹${activeFilters.minStipend.toLocaleString()} / mo<span class="wf-filter-chip-remove"data-remove="minStipend">×</span>
</div>
 `;
 }

 if (activeFilters.offerType) {
 html += `
<div class="wf-editable-chip"data-filter="offerType">
<span class="wf-editable-chip-label">Offer Type</span>
 ${activeFilters.offerType}<span class="wf-filter-chip-remove"data-remove="offerType">×</span>
</div>
 `;
 }

 if (!html) {
 html = `<span style="font-size: 11px; color: var(--text-muted); font-style: italic;">No active filters</span>`;
 }

 container.innerHTML = html;

 container.querySelectorAll('.wf-filter-chip-remove').forEach(btn =>{
 btn.addEventListener('click', (e) =>{
 e.stopPropagation();
 const key = btn.getAttribute('data-remove');
 activeFilters[key] = key === 'minStipend' ? 0 : '';
 renderFilterChips();
 renderDrives();
 });
 });
}

// ============================================================================
// 3. VIEW CONTROLS & SORTING
// ============================================================================
function initViewControls() {
 const btnGrid = document.getElementById('btn-view-grid');
 const btnTable = document.getElementById('btn-view-table');
 const sortSelect = document.getElementById('drive-sort-select');

 if (btnGrid) {
 btnGrid.addEventListener('click', () =>{
 viewMode = 'grid';
 btnGrid.classList.add('wf-btn-primary');
 if (btnTable) btnTable.classList.remove('wf-btn-primary');
 renderDrives();
 });
 }

 if (btnTable) {
 btnTable.addEventListener('click', () =>{
 viewMode = 'table';
 btnTable.classList.add('wf-btn-primary');
 if (btnGrid) btnGrid.classList.remove('wf-btn-primary');
 renderDrives();
 });
 }

 if (sortSelect) {
 sortSelect.addEventListener('change', (e) =>{
 sortBy = e.target.value;
 renderDrives();
 });
 }
}

function getFilteredDrives() {
 let filtered = drives.filter(d =>{
 const q = searchQuery.toLowerCase();
 const matchesQuery = !searchQuery ||
 d.company.toLowerCase().includes(q) ||
 d.title.toLowerCase().includes(q) ||
 d.location.toLowerCase().includes(q) ||
 d.tags.some(t =>t.toLowerCase().includes(q));

 const matchesRole = !activeFilters.role || d.title.toLowerCase().includes(activeFilters.role.toLowerCase());
 const matchesLocation = !activeFilters.location || d.location.toLowerCase().includes(activeFilters.location.toLowerCase().split(' / ')[0]);
 
 // Parse numeric stipend from string (e.g. ₹25,000 / mo ->25000)
 const stipendNum = parseInt(d.stipend.replace(/[^0-9]/g, '')) || 0;
 const matchesStipend = !activeFilters.minStipend || stipendNum >= activeFilters.minStipend;

 const matchesPPO = !activeFilters.offerType || d.ppoRange.includes('LPA');

 return matchesQuery && matchesRole && matchesLocation && matchesStipend && matchesPPO;
 });

 // Sort Drives
 filtered.sort((a, b) =>{
 if (sortBy === 'match-desc') return b.matchScore - a.matchScore;
 if (sortBy === 'stipend-desc') {
 const numA = parseInt(a.stipend.replace(/[^0-9]/g, '')) || 0;
 const numB = parseInt(b.stipend.replace(/[^0-9]/g, '')) || 0;
 return numB - numA;
 }
 return 0;
 });

 return filtered;
}

// ============================================================================
// 4. DRIVE CARDS & RESULTS RENDERING
// ============================================================================
function renderDrives() {
 const container = document.getElementById('drives-results-container');
 const countLabel = document.getElementById('drives-count-label');
 const zeroBanner = document.getElementById('zero-results-banner');
 const expandBtn = document.getElementById('btn-expand-filters');

 if (!container) return;

 const filtered = getFilteredDrives();

 if (countLabel) {
 countLabel.textContent = `${filtered.length} drive${filtered.length !== 1 ? 's' : ''} found`;
 }

 if (filtered.length === 0) {
   if (zeroBanner) zeroBanner.style.display = 'block';
   container.innerHTML = '';
   return filtered;
 } else {
   if (zeroBanner) zeroBanner.style.display = 'none';
 }

 if (expandBtn) {
 expandBtn.onclick = () =>{
 activeFilters = { role: '', location: '', minStipend: 0, offerType: '' };
 renderFilterChips();
 renderDrives();
 };
 }

 if (viewMode === 'grid') {
 container.className = 'wf-grid-2';
 container.innerHTML = filtered.map(d =>`
<article class="wf-card drive-card-item"data-drive-id="${d.id}"style="cursor: pointer;">
<div class="wf-card-header">
<div>
<span style="font-size: 11px; color: var(--text-muted); font-weight: 500;">${d.code}</span>
<h3 class="wf-card-title"style="margin-top: 2px;">${d.company}</h3>
</div>
<span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Match ${d.matchScore}%</span>
</div>
<div class="wf-card-body"style="display: flex; flex-direction: column; gap: 8px;">
<h4 style="font-size: 13px; font-weight: 700;">${d.title}</h4>
<p style="font-size: 12px; font-weight: 600; color: var(--text-primary);">Deadline: ${d.deadline}</p>
<p style="font-size: 12px; color: var(--text-muted);">${d.location} · ${d.stipend} · PPO ${d.ppoRange}</p>
<div style="display: flex; flex-wrap: wrap; gap: 4px;">
 ${d.tags.map(t =>`<span class="wf-badge">✓ ${t}</span>`).join('')}
</div>
<p style="font-size: 12px; color: var(--text-secondary);">Min CGPA ${d.minCgpa} · ${d.batch} · ${d.eligibleDepts.join(' / ')}</p>
</div>
<div class="wf-card-footer"style="display: flex; justify-content: space-between; align-items: center;">
<span style="font-size: 11px; color: var(--text-muted);">${d.postedDate}</span>
<button class="wf-btn wf-btn-xs btn-card-save"data-save-id="${d.id}">${d.saved ? '⭐ Saved' : '⭐ Save'}</button>
</div>
</article>
 `).join('');
 } else {
 // Table View
 container.className = 'wf-card';
 container.innerHTML = `
<div class="wf-card-body"style="padding: 0;">
<div class="wf-table-container">
<table class="wf-table">
<thead>
<tr>
<th>Code</th>
<th>Company & Title</th>
<th>Location</th>
<th>Stipend</th>
<th>Deadline</th>
<th>Match Score</th>
<th></th>
</tr>
</thead>
<tbody>
 ${filtered.map(d =>`
<tr class="drive-card-item"data-drive-id="${d.id}"style="cursor: pointer;">
<td style="font-family: var(--font-mono); font-size: 11px;">${d.code}</td>
<td><strong>${d.company}</strong><div style="font-size: 11px; color: var(--text-muted);">${d.title}</div></td>
<td style="color: var(--text-secondary);">${d.location}</td>
<td><strong>${d.stipend}</strong></td>
<td style="font-weight: 600;">${d.deadline}</td>
<td><span class="wf-badge wf-badge-dark">${d.matchScore}%</span></td>
<td class="wf-row-actions"><button class="wf-btn wf-btn-xs wf-btn-primary">View</button></td>
</tr>
 `).join('')}
</tbody>
</table>
</div>
</div>
 `;
 }

 // Click Handlers
 container.querySelectorAll('.drive-card-item').forEach(card =>{
 card.addEventListener('click', (e) =>{
 if (e.target.closest('.btn-card-save')) return;
 const id = card.getAttribute('data-drive-id');
 openDriveDrawer(id);
 });
 });

 container.querySelectorAll('.btn-card-save').forEach(btn =>{
 btn.addEventListener('click', (e) =>{
 e.stopPropagation();
 const id = btn.getAttribute('data-save-id');
 toggleSaveDrive(id);
 });
 });
}

function toggleSaveDrive(driveId) {
 const d = drives.find(item =>item.id === driveId);
 if (d) {
 d.saved = !d.saved;
 renderDrives();
 showToast(d.saved ? `Saved ${d.company} drive.` : `Removed ${d.company} drive from saved.`, 'info');
 }
}

// ============================================================================
// 5. DRIVE DETAIL SHEET DRAWER
// ============================================================================
function openDriveDrawer(driveId) {
 const d = drives.find(item =>item.id === driveId);
 if (!d) return;

 selectedDriveId = driveId;

 const drawer = document.getElementById('drive-detail-drawer');
 const companyEl = document.getElementById('drawer-company-name');
 const codeEl = document.getElementById('drawer-drive-code');
 const titleSubEl = document.getElementById('drawer-job-title-sub');
 const stipendEl = document.getElementById('drawer-stipend');
 const ppoEl = document.getElementById('drawer-ppo');
 const locationEl = document.getElementById('drawer-location');
 const summaryEl = document.getElementById('drawer-ai-summary');
 const roundsListEl = document.getElementById('drawer-rounds-list');
 const btnSaveDrive = document.getElementById('btn-save-drive');

 if (companyEl) companyEl.textContent = d.company;
 if (codeEl) codeEl.textContent = d.code;
 if (titleSubEl) titleSubEl.textContent = `${d.title} · Deadline ${d.deadline}`;
 if (stipendEl) stipendEl.textContent = d.stipend;
 if (ppoEl) ppoEl.textContent = d.ppoRange;
 if (locationEl) locationEl.textContent = d.location;

 if (summaryEl) {
 summaryEl.innerHTML = `
<div>✓ High domain alignment (${d.matchScore}% match confidence)</div>
<div>✓ ${d.stipend} exceeds standard batch threshold</div>
<div>✓ Eligible departments: ${d.eligibleDepts.join(', ')}</div>
 `;
 }

 if (roundsListEl && d.selectionProcess) {
 roundsListEl.innerHTML = d.selectionProcess.map(step =>`
<div style="padding: 10px 12px; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 10px; align-items: flex-start;">
<span style="width: 20px; height: 20px; border-radius: 50%; background: var(--bg-dark-tile); color: white; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${step.round}</span>
<div><strong style="font-size: 13px;">${step.title}</strong><p style="font-size: 12px; color: var(--text-muted);">${step.desc}</p></div>
</div>
 `).join('');
 }

 if (btnSaveDrive) {
 btnSaveDrive.textContent = d.saved ? '⭐ Saved' : '⭐ Save Drive';
 btnSaveDrive.onclick = () =>{
 toggleSaveDrive(d.id);
 btnSaveDrive.textContent = d.saved ? '⭐ Saved' : '⭐ Save Drive';
 };
 }

 if (drawer) {
 drawer.style.display = 'flex';
 requestAnimationFrame(() =>drawer.classList.add('wf-drawer-visible'));
 }
}

function initDrawerActions() {
 const btnClose = document.getElementById('btn-close-drive-drawer');
 const btnApply = document.getElementById('btn-apply-drive-candidates');

 if (btnClose) {
 btnClose.addEventListener('click', () =>{
 const drawer = document.getElementById('drive-detail-drawer');
 if (drawer) {
 drawer.classList.remove('wf-drawer-visible');
 setTimeout(() =>drawer.style.display = 'none', 250);
 }
 });
 }

 if (btnApply) {
 btnApply.addEventListener('click', async () =>{
 const drawer = document.getElementById('drive-detail-drawer');
 const d = drives.find(item =>item.id === selectedDriveId);

 showLoadingOverlay(document.body, `Submitting candidate batch applications to ${d ? d.company : 'Drive'}...`);
 await asyncSimulateApiCall(null, 1300);
 hideLoadingOverlay(document.body);

 if (drawer) {
 drawer.classList.remove('wf-drawer-visible');
 setTimeout(() =>drawer.style.display = 'none', 250);
 }

 showToast(`Applied candidate batch to ${d ? d.company : 'drive'} successfully!`, 'success');
 });
 }
}

// ============================================================================
// 6. LOCALSTORAGE SAVED SEARCHES
// ============================================================================
function initSavedSearches() {
 const btnSaveSearch = document.getElementById('btn-save-search');
 const btnViewSaved = document.getElementById('btn-view-saved');
 updateSavedCountUI();

 if (btnSaveSearch) {
 btnSaveSearch.addEventListener('click', () =>{
 if (!searchQuery) {
 showToast('Type a query before saving search.', 'warning');
 return;
 }

 const newSave = {
 id: `ss-${Date.now()}`,
 query: searchQuery,
 filters: { ...activeFilters },
 date: 'Just now'
 };

 savedSearches.unshift(newSave);
 localStorage.setItem('ph_saved_searches', JSON.stringify(savedSearches));
 updateSavedCountUI();

 showToast(`Saved search"${searchQuery.slice(0, 30)}..."to your library.`, 'success');
 });
 }

 if (btnViewSaved) {
 btnViewSaved.addEventListener('click', () =>{
 renderSavedSearchesModal();
 openModal('modal-saved-searches');
 });
 }

 // Close trigger
 document.querySelectorAll('#modal-saved-searches .modal-close-trigger').forEach(btn =>{
 btn.addEventListener('click', () =>closeModal('modal-saved-searches'));
 });
}

function updateSavedCountUI() {
 const countEl = document.getElementById('saved-searches-count');
 if (countEl) countEl.textContent = savedSearches.length;
}

function renderSavedSearchesModal() {
 const container = document.getElementById('saved-searches-list');
 if (!container) return;

 if (savedSearches.length === 0) {
 container.innerHTML = `
<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
 No saved searches yet. Save your frequent query filters to rerun them anytime.
</div>
 `;
 return;
 }

 container.innerHTML = savedSearches.map(item =>`
<div style="padding: 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-md); background: var(--bg-muted); display: flex; justify-content: space-between; align-items: center;">
<div>
<strong style="font-size: 13px; display: block;">"${item.query}"</strong>
<span style="font-size: 11px; color: var(--text-muted);">${item.date}</span>
</div>
<div style="display: flex; gap: 6px;">
<button class="wf-btn wf-btn-xs wf-btn-primary btn-run-saved"data-query="${encodeURIComponent(item.query)}">Run Search</button>
<button class="wf-btn wf-btn-xs btn-delete-saved"data-id="${item.id}"style="color: var(--text-muted);">Delete</button>
</div>
</div>
 `).join('');

 container.querySelectorAll('.btn-run-saved').forEach(btn =>{
 btn.addEventListener('click', (e) =>{
 const queryText = decodeURIComponent(e.target.getAttribute('data-query'));
 const input = document.getElementById('drive-search-input');
 if (input) input.value = queryText;
 closeModal('modal-saved-searches');
 executeSearch(queryText);
 });
 });

 container.querySelectorAll('.btn-delete-saved').forEach(btn =>{
 btn.addEventListener('click', (e) =>{
 const id = e.target.getAttribute('data-id');
 savedSearches = savedSearches.filter(s =>s.id !== id);
 localStorage.setItem('ph_saved_searches', JSON.stringify(savedSearches));
 updateSavedCountUI();
 renderSavedSearchesModal();
 showToast('Deleted saved search.', 'info');
 });
 });
}
