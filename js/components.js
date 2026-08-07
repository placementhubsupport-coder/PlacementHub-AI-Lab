/**
 * PlacementHub AI Lab — Shared UI Component System
 * Implements Toast Notifications, Modal Dialog Manager, Right Drawers,
 * Universal Cmd+K Command Palette, Skeleton Loaders, and Simulated API utilities.
 */

import { mockCandidates, mockDrives } from '../data/mockData.js';

// Polyfill window.requestAnimationFrame for safe execution
if (typeof window !== 'undefined') {
  window.requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
  window.cancelAnimationFrame = window.cancelAnimationFrame || ((id) => clearTimeout(id));
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
export function showToast(message, type = 'info', duration = 3000) {
  if (typeof window !== 'undefined') {
    window.PlacementHubToast = showToast;
  }
 let container = document.getElementById('wf-toast-container');
 if (!container) {
 container = document.createElement('div');
 container.id = 'wf-toast-container';
 container.className = 'wf-toast-container';
 document.body.appendChild(container);
 }

 const toast = document.createElement('div');
 toast.className = `wf-toast wf-toast-${type}`;

 const iconMap = {
 success: '✓',
 error: '✕',
 warning: '⚠',
 info: 'ℹ'
 };

 toast.innerHTML = `
<span class="wf-toast-icon">${iconMap[type] || 'ℹ'}</span>
<span class="wf-toast-message">${message}</span>
<button class="wf-toast-close"aria-label="Close toast">&times;</button>
 `;

 const closeBtn = toast.querySelector('.wf-toast-close');
 closeBtn.addEventListener('click', () =>{
 toast.classList.add('wf-toast-hiding');
 setTimeout(() =>toast.remove(), 200);
 });

 container.appendChild(toast);

 if (duration >0) {
 setTimeout(() =>{
 if (toast.parentNode) {
 toast.classList.add('wf-toast-hiding');
 setTimeout(() =>toast.remove(), 200);
 }
 }, duration);
 }
}

// ============================================================================
// MODAL DIALOG MANAGER
// ============================================================================
let activeModalBackdrop = null;

export function openModal(modalId) {
 const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
 if (!modal) return;

 if (!activeModalBackdrop) {
 activeModalBackdrop = document.createElement('div');
 activeModalBackdrop.className = 'wf-modal-backdrop';
 document.body.appendChild(activeModalBackdrop);

 activeModalBackdrop.addEventListener('click', (e) =>{
 if (e.target === activeModalBackdrop) {
 closeAllModals();
 }
 });
 }

 modal.classList.add('wf-modal-visible');
 activeModalBackdrop.classList.add('wf-backdrop-visible');
 document.body.style.overflow = 'hidden';

 const escHandler = (e) =>{
 if (e.key === 'Escape') {
 closeModal(modal);
 document.removeEventListener('keydown', escHandler);
 }
 };
 document.addEventListener('keydown', escHandler);
}

export function closeModal(modalId) {
 const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
 if (!modal) return;

 modal.classList.remove('wf-modal-visible');
 
 const anyOtherVisible = document.querySelector('.wf-modal-dialog.wf-modal-visible');
 if (!anyOtherVisible && activeModalBackdrop) {
 activeModalBackdrop.classList.remove('wf-backdrop-visible');
 setTimeout(() =>{
 if (activeModalBackdrop && !document.querySelector('.wf-modal-dialog.wf-modal-visible')) {
 activeModalBackdrop.remove();
 activeModalBackdrop = null;
 }
 }, 200);
 document.body.style.overflow = '';
 }
}

export function closeAllModals() {
 const modals = document.querySelectorAll('.wf-modal-dialog.wf-modal-visible');
 modals.forEach(modal =>closeModal(modal));
}

// ============================================================================
// RIGHT DRAWER SHEET MANAGER
// ============================================================================
export function openDrawer(drawerId) {
 const drawer = typeof drawerId === 'string' ? document.getElementById(drawerId) : drawerId;
 if (!drawer) return;
 drawer.classList.add('wf-drawer-visible');
 if (drawer.style) drawer.style.display = 'flex';
}

export function closeDrawer(drawerId) {
 const drawer = typeof drawerId === 'string' ? document.getElementById(drawerId) : drawerId;
 if (!drawer) return;
 drawer.classList.remove('wf-drawer-visible');
 setTimeout(() =>{
 if (drawer && !drawer.classList.contains('wf-drawer-visible') && drawer.style) {
 drawer.style.display = 'none';
 }
 }, 200);
}

// Global Escape Key Listener for Modals and Drawers
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      document.querySelectorAll('.wf-drawer-sheet').forEach(d => {
        d.classList.remove('wf-drawer-visible');
        if (d.style.display !== 'none' && d.id) {
          setTimeout(() => { d.style.display = 'none'; }, 200);
        }
      });
    }
  });
}

// ============================================================================
// SIMULATED API DELAYS & OVERLAYS
// ============================================================================
export function showLoadingOverlay(targetElement = document.body, message = 'Processing AI Request...') {
 let overlay = targetElement.querySelector('.wf-loading-overlay');
 if (!overlay) {
 overlay = document.createElement('div');
 overlay.className = 'wf-loading-overlay';
 overlay.innerHTML = `
<div class="wf-loading-spinner"></div>
<span class="wf-loading-text">${message}</span>
 `;
 if (targetElement === document.body) {
 overlay.style.position = 'fixed';
 } else {
 targetElement.style.position = 'relative';
 overlay.style.position = 'absolute';
 }
 targetElement.appendChild(overlay);
 }
  const safeRaf = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : (cb => setTimeout(cb, 16));
  safeRaf(() => overlay.classList.add('wf-overlay-visible'));
}

export function hideLoadingOverlay(targetElement = document.body) {
 const overlay = targetElement.querySelector('.wf-loading-overlay');
 if (overlay) {
 overlay.classList.remove('wf-overlay-visible');
 setTimeout(() =>overlay.remove(), 200);
 }
}

export async function asyncSimulateApiCall(callback, delayMs = 1200) {
 return new Promise((resolve) =>{
 setTimeout(() =>{
 const result = callback ? callback() : true;
 resolve(result);
 }, delayMs);
 });
}

// ============================================================================
// SKELETON LOADERS
// ============================================================================
export function createSkeleton(width = '100%', height = '14px') {
 return `<span class="wf-skeleton"style="width: ${width}; height: ${height}; display: inline-block;"></span>`;
}

// ============================================================================
// UNIVERSAL CMD+K COMMAND PALETTE
// ============================================================================
export function initCmdKPalette() {
 // Inject modal markup if not present
 if (!document.getElementById('wf-cmd-k-dialog')) {
 const dialogHTML = `
<div class="wf-modal-dialog wf-cmd-k-dialog"id="wf-cmd-k-dialog"style="max-width: 540px; padding: 0;">
<div class="wf-cmd-k-header">
<input type="text"class="wf-cmd-k-input"id="wf-cmd-k-input"placeholder="Search candidates, drives, or solutions... (Esc to cancel)"autofocus>
</div>
<div class="wf-cmd-k-results"id="wf-cmd-k-results">
<a href="index.html"class="wf-cmd-k-item"><span></span>Home Showcase</a>
<div class="wf-cmd-k-section-title">AI Intelligence Suite</div>
<a href="poc1-student-job-matching.html"class="wf-cmd-k-item"><span></span>Candidate Matching</a>
<a href="poc2-resume-analyzer.html"class="wf-cmd-k-item"><span></span>Resume Review</a>
<a href="poc3-placement-search.html"class="wf-cmd-k-item"><span></span>Placement Search</a>
<a href="poc6-student-participation.html"class="wf-cmd-k-item"><span></span>Student Participation Analyst</a>
<a href="poc7-hiring-performance.html"class="wf-cmd-k-item"><span></span>Hiring Performance Analyst</a>
<a href="poc8-placement-analytics.html"class="wf-cmd-k-item"><span></span>Placement Analytics & Predictions</a>
<div class="wf-cmd-k-section-title"style="margin-top: 8px;">AI Operations Suite</div>
<a href="poc4-placement-copilot.html"class="wf-cmd-k-item"><span></span>Placement Assistant</a>
<a href="poc9-document-processing.html"class="wf-cmd-k-item"><span></span>Document Processing</a>
<a href="poc10-communication-assistant.html"class="wf-cmd-k-item"><span></span>Communication Assistant</a>
</div>
<div class="wf-cmd-k-footer">
<span>Navigate with<kbd>↑</kbd><kbd>↓</kbd>· Press<kbd>Enter</kbd>to open ·<kbd>Esc</kbd>to close</span>
</div>
</div>
 `;
 document.body.insertAdjacentHTML('beforeend', dialogHTML);
 }

 const inputInputs = document.querySelectorAll('.wf-nav-search input, input[placeholder*="⌘K"]');
 inputInputs.forEach(input =>{
 input.addEventListener('focus', (e) =>{
 e.target.blur();
 openModal('wf-cmd-k-dialog');
 document.getElementById('wf-cmd-k-input').focus();
 });
 });

 document.addEventListener('keydown', (e) =>{
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
 e.preventDefault();
 openModal('wf-cmd-k-dialog');
 const searchInput = document.getElementById('wf-cmd-k-input');
 if (searchInput) searchInput.focus();
 }
 });

 const cmdInput = document.getElementById('wf-cmd-k-input');
 const resultsContainer = document.getElementById('wf-cmd-k-results');

 if (cmdInput && resultsContainer) {
 cmdInput.addEventListener('input', (e) =>{
 const query = e.target.value.trim().toLowerCase();
 if (!query) {
 resultsContainer.innerHTML = `
<a href="index.html"class="wf-cmd-k-item"><span></span>Home Showcase</a>
<div class="wf-cmd-k-section-title">AI Intelligence Suite</div>
<a href="poc1-student-job-matching.html"class="wf-cmd-k-item"><span></span>Candidate Matching</a>
<a href="poc2-resume-analyzer.html"class="wf-cmd-k-item"><span></span>Resume Review</a>
<a href="poc3-placement-search.html"class="wf-cmd-k-item"><span></span>Placement Search</a>
<a href="poc6-student-participation.html"class="wf-cmd-k-item"><span></span>Student Participation Analyst</a>
<a href="poc7-hiring-performance.html"class="wf-cmd-k-item"><span></span>Hiring Performance Analyst</a>
<a href="poc8-placement-analytics.html"class="wf-cmd-k-item"><span></span>Placement Analytics & Predictions</a>
<div class="wf-cmd-k-section-title"style="margin-top: 8px;">AI Operations Suite</div>
<a href="poc4-placement-copilot.html"class="wf-cmd-k-item"><span></span>Placement Assistant</a>
<a href="poc9-document-processing.html"class="wf-cmd-k-item"><span></span>Document Processing</a>
<a href="poc10-communication-assistant.html"class="wf-cmd-k-item"><span></span>Communication Assistant</a>
 `;
 return;
 }

 const matchingCandidates = mockCandidates.filter(c =>
 c.name.toLowerCase().includes(query) ||
 c.department.toLowerCase().includes(query) ||
 c.skills.some(s =>s.toLowerCase().includes(query))
 );

 const matchingDrives = mockDrives.filter(d =>
 d.company.toLowerCase().includes(query) ||
 d.title.toLowerCase().includes(query) ||
 d.tags.some(t =>t.toLowerCase().includes(query))
 );

 let html = '';

 if (matchingCandidates.length >0) {
 html += `<div class="wf-cmd-k-section-title">Candidates (${matchingCandidates.length})</div>`;
 matchingCandidates.forEach(c =>{
 html += `
<a href="poc1-student-job-matching.html"class="wf-cmd-k-item">
<div>
<strong>${c.name}</strong>·<span style="color: var(--text-muted); font-size: 11px;">${c.degree} (${c.cgpa} CGPA)</span>
</div>
<span class="wf-badge wf-badge-dark">${c.matchScore}% Match</span>
</a>
 `;
 });
 }

 if (matchingDrives.length >0) {
 html += `<div class="wf-cmd-k-section-title">Placement Drives (${matchingDrives.length})</div>`;
 matchingDrives.forEach(d =>{
 html += `
<a href="poc3-placement-search.html"class="wf-cmd-k-item">
<div>
<strong>${d.company}</strong>—<span style="color: var(--text-secondary);">${d.title}</span>
</div>
<span style="font-size: 11px; color: var(--text-muted);">${d.stipend}</span>
</a>
 `;
 });
 }

 if (matchingCandidates.length === 0 && matchingDrives.length === 0) {
 html = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 12px;">No matching candidates or drives found for"${query}"</div>`;
 }

 resultsContainer.innerHTML = html;
 });
 }
}
