/**
 * PlacementHub AI Solutions — AI Communication Assistant Controller (POC10)
 * Controls Multi-Channel Communication Operations, Stepped AI Workflow Stepper,
 * Channel Content Previews (Email, WhatsApp, SMS, Calendar Invite), Queue Table,
 * Recruiter Follow-ups, Monthly Newsletter Generator, and Analytics.
 */

import {
 mockCommunicationKpis,
 mockCommunicationQueue,
 mockCommunicationTemplates,
 mockRecruiterFollowups,
 mockNewsletterData,
 mockCommunicationAnalytics,
 mockCommunicationRecommendations
} from'../data/mockData.js';
import { showToast, asyncSimulateApiCall } from'./components.js';

let activeQueue = [...mockCommunicationQueue];
let selectedQueueIds = new Set();
let isProcessing = false;
let currentPreviewTab = 'email';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[POC 10] Communication Assistant initialized');
  initActionHandlers();
  initTableFilters();
  initTabSwitchers();
  initPresetChips();
});

// ============================================================================
// 1. AI STEPPER WORKFLOW SIMULATION
// ============================================================================
async function runCommunicationWorkflow(customPrompt = '') {
  console.log('[POC 10] Run Communication Workflow button clicked');
  if (isProcessing) return;
 isProcessing = true;

 const emptyState = document.getElementById('comm-empty-state');
 const stepperCard = document.getElementById('comm-stepper-card');
 const resultsWorkspace = document.getElementById('comm-results-workspace');
 const mainBtn = document.getElementById('btn-run-comm-workflow');

 if (emptyState) emptyState.style.display = 'none';
 if (resultsWorkspace) {
 resultsWorkspace.style.display = 'none';
 resultsWorkspace.style.opacity = '0';
 }

 if (stepperCard) stepperCard.style.display = 'block';

 if (mainBtn) {
 mainBtn.disabled = true;
 mainBtn.textContent = 'Executing Workflow...';
 }

 const stepperList = document.getElementById('comm-stepper-steps-list');
 const stepperTimer = document.getElementById('comm-stepper-timer');
 const stepperTitle = document.getElementById('comm-stepper-status-title');

 if (stepperTitle) stepperTitle.textContent = customPrompt ? `AI Communication Workflow: "${customPrompt}"` : 'Initializing AI Communication Operations Engine v3.4...';
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 '⏳ Understanding communication request & target audience intent...',
 'Locating Placement Drive (Google AI Placement Drive 2026)...',
 'Finding 148 eligible candidates (B.Tech CSE/IT, CGPA >= 8.0)...',
 'Checking eligibility rules & identifying 14 candidates with missing documents...',
 'Generating multi-channel personalized templates (Email, WhatsApp, SMS)...',
 'Creating Google Calendar invite artifacts for Audi-3 venue...',
 '⏰ Scheduling automated follow-up reminders (24h & 2h prior to drive)...',
 '✓ Communication Workflow Complete (148 messages queued • 96% Confidence)'
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
 stepItem.style.display = 'flex';
 stepItem.style.alignItems = 'center';
 stepItem.style.gap = '8px';
 stepItem.innerHTML = `<span>✓</span><span>${steps[i].replace('⏳ ', '')}</span>`;
 stepperList.appendChild(stepItem);
 }
 }

 clearInterval(timerInterval);
 const finalTime = ((Date.now() - startTime) / 1000).toFixed(1);
 if (stepperTimer) stepperTimer.textContent = `${finalTime}s`;
 if (stepperTitle) stepperTitle.textContent = `✓ Communication Workflow Complete (${finalTime}s • 96% Confidence Score)`;

 await asyncSimulateApiCall(null, 200);

 // Render analytics and workspaces
 renderExecutiveSummary();
 renderAudienceSummaryKpis();
 renderChannelPreviewContent(currentPreviewTab);
 renderQueueTable();
 renderRecruiterFollowups();
 renderNewsletterPreview();
 renderAnalytics();
 renderRecommendations();

 // Reveal results workspace
 if (resultsWorkspace) {
 resultsWorkspace.style.display = 'block';
 requestAnimationFrame(() =>{
 resultsWorkspace.style.opacity = '1';
 });
 }

 if (mainBtn) {
 mainBtn.disabled = false;
 mainBtn.textContent = 'Re-Run Communication Workflow';
 }

 isProcessing = false;
 showToast('Communication Workflow Executed: 148 Personalized Messages Queued.', 'success');
}

// ============================================================================
// 2. PRESET PROMPT CHIPS HANDLER
// ============================================================================
function initPresetChips() {
 const chipsContainer = document.getElementById('comm-prompt-chips-container');
 if (!chipsContainer) return;

 const chips = [
 "Invite all eligible CSE students for Google Drive next Monday",
 "Send interview reminders for tomorrow's Deloitte OA",
 "Notify shortlisted candidates for TechCorp AI technical round",
 "Request missing Aadhaar upload from 14 flagged candidates",
 "Send offer acceptance reminder for Goldman Sachs offers",
 "Generate recruiter follow-up for 8-day inactive leads",
 "Generate monthly placement newsletter highlights"
 ];

 chipsContainer.innerHTML = chips.map(chip =>`
<button class="wf-prompt-chip comm-preset-chip"style="cursor: pointer;">${chip}</button>
 `).join('');

 chipsContainer.querySelectorAll('.comm-preset-chip').forEach(btn =>{
 btn.addEventListener('click', () =>{
 const input = document.getElementById('comm-command-input');
 if (input) input.value = btn.textContent.trim();
 runCommunicationWorkflow(btn.textContent.trim());
 });
 });
}

// ============================================================================
// 3. EXECUTIVE AI SUMMARY
// ============================================================================
function renderExecutiveSummary() {
 const container = document.getElementById('section-comm-exec-summary');
 if (!container) return;

 container.innerHTML = `
<div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-md); margin-bottom: var(--space-md);">
<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Executive AI Communication Operations Center</span>
<h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary); margin-top: 2px;">Communication Health Index: 92%</h2>
</div>
<div style="display: flex; gap: var(--space-md); text-align: right;">
<div>
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Open Rate</span>
<div style="font-size: 24px; font-weight: 800; color: var(--text-primary);">84.2%</div>
</div>
<div>
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Response Rate</span>
<div style="font-size: 24px; font-weight: 800; color: var(--text-primary);">72.1%</div>
</div>
</div>
</div>

<ul style="font-size: 13px; color: var(--text-primary); line-height: 1.6; padding-left: 0; list-style: none; margin-bottom: var(--space-md);">
<li>• 31 eligible candidates have opened the drive email but require a follow-up confirmation.</li>
<li>• Deloitte HR lead hasn't responded for 8 days regarding 42 candidate shortlists.</li>
<li>• 18 students have unread Google AI drive invitations in their portal inbox.</li>
<li>• WhatsApp interactive reminders are projected to boost drive confirmation attendance by +17%.</li>
</ul>

<div style="display: flex; gap: var(--space-sm); background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Dispatching WhatsApp reminder batch to 31 candidates...')">Send Reminder Batch</button>
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Generating executive nudge email to Deloitte HR...')">Generate Recruiter Nudge</button>
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Created Google Calendar invite artifact.')">Create Calendar Invite</button>
</div>
 `;
}

// ============================================================================
// 4. AUDIENCE SUMMARY KPI CARDS
// ============================================================================
function renderAudienceSummaryKpis() {
 const container = document.getElementById('comm-audience-kpi-grid');
 if (!container) return;

 const k = mockCommunicationKpis;

 container.innerHTML = `
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Eligible Students</span></div>
<div class="wf-kpi-value">${k.eligibleStudents}</div>
<div class="wf-kpi-subtext">Qualified for Google Drive</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Not Eligible</span></div>
<div class="wf-kpi-value">${k.notEligible}</div>
<div class="wf-kpi-subtext">CGPA< 8.0 or Backlog</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Missing Documents</span></div>
<div class="wf-kpi-value">${k.missingDocuments}</div>
<div class="wf-kpi-subtext">Flagged for Aadhaar</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Already Contacted</span></div>
<div class="wf-kpi-value">${k.alreadyContacted}</div>
<div class="wf-kpi-subtext">63.5% Audience Reached</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Recruiter Follow-ups</span></div>
<div class="wf-kpi-value">${k.pendingRecruiterFollowups}</div>
<div class="wf-kpi-subtext">Deloitte, Goldman, etc.</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Pending Offers</span></div>
<div class="wf-kpi-value">${k.pendingOfferAcceptances}</div>
<div class="wf-kpi-subtext">Awaiting student sign-off</div>
</div>
 `;
}

// ============================================================================
// 5. TABBED MULTI-CHANNEL COMMUNICATION PREVIEW
// ============================================================================
function initTabSwitchers() {
 const tabs = document.querySelectorAll('.comm-tab-btn');
 tabs.forEach(tab =>{
 tab.addEventListener('click', (e) =>{
 tabs.forEach(t =>t.classList.remove('active'));
 e.target.classList.add('active');
 currentPreviewTab = e.target.getAttribute('data-tab');
 renderChannelPreviewContent(currentPreviewTab);
 });
 });
}

function renderChannelPreviewContent(tabKey) {
 const previewBox = document.getElementById('comm-channel-preview-content');
 if (!previewBox) return;

 const t = mockCommunicationTemplates;

 if (tabKey === 'email') {
 previewBox.innerHTML = `
<div style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Subject: ${t.email.subject}</div>
<pre style="font-size: 12px; font-family: var(--font-sans); white-space: pre-wrap; line-height: 1.5; color: var(--text-secondary); background: var(--bg-surface); padding: 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin: 0;">${t.email.body}</pre>
 `;
 } else if (tabKey === 'whatsapp') {
 previewBox.innerHTML = `
<div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">WhatsApp Multi-Channel Interactive Broadcast</div>
<pre style="font-size: 12px; font-family: var(--font-sans); white-space: pre-wrap; line-height: 1.5; color: var(--text-primary); background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: var(--radius-sm); margin: 0;">${t.whatsapp.body}</pre>
 `;
 } else if (tabKey === 'sms') {
 previewBox.innerHTML = `
<div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">SMS Broadcast (138 Characters)</div>
<pre style="font-size: 12px; font-family: var(--font-mono); white-space: pre-wrap; line-height: 1.5; color: var(--text-primary); background: var(--bg-surface); padding: 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin: 0;">${t.sms.body}</pre>
 `;
 } else if (tabKey === 'calendar') {
 previewBox.innerHTML = `
<div style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${t.calendar.title}</div>
<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">📍 ${t.calendar.location} · ⏰ ${t.calendar.time}</div>
<div style="font-size: 12px; color: var(--text-muted); background: var(--bg-surface); padding: 10px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">${t.calendar.description}</div>
 `;
 }
}

// ============================================================================
// 6. PERSONALIZED COMMUNICATION QUEUE TABLE & BULK ACTIONS
// ============================================================================
function initTableFilters() {
 const searchInput = document.getElementById('comm-queue-search');
 const typeSelect = document.getElementById('comm-queue-type');
 const statusSelect = document.getElementById('comm-queue-status');
 const selectAll = document.getElementById('select-all-comm');

 const applyFilters = () =>{
 const q = searchInput?.value.trim().toLowerCase() || '';
 const type = typeSelect?.value || 'ALL';
 const status = statusSelect?.value || 'ALL';

 activeQueue = mockCommunicationQueue.filter(item =>{
 const matchQ = item.recipient.toLowerCase().includes(q) || item.role.toLowerCase().includes(q);
 const matchT = type === 'ALL' || item.type === type;
 const matchS = status === 'ALL' || item.status === status;
 return matchQ && matchT && matchS;
 });

 renderQueueTable();
 };

 if (searchInput) searchInput.addEventListener('input', applyFilters);
 if (typeSelect) typeSelect.addEventListener('change', applyFilters);
 if (statusSelect) statusSelect.addEventListener('change', applyFilters);

 if (selectAll) {
 selectAll.addEventListener('change', (e) =>{
 if (e.target.checked) {
 activeQueue.forEach(item =>selectedQueueIds.add(item.id));
 } else {
 selectedQueueIds.clear();
 }
 renderQueueTable();
 });
 }
}

function renderQueueTable() {
 const tbody = document.getElementById('comm-queue-tbody');
 const bulkBar = document.getElementById('comm-bulk-toolbar');
 const countLabel = document.getElementById('comm-bulk-count');

 if (!tbody) return;

 if (bulkBar && countLabel) {
 if (selectedQueueIds.size >0) {
 bulkBar.style.display = 'flex';
 countLabel.textContent = `${selectedQueueIds.size} recipient${selectedQueueIds.size >1 ? 's' : ''} selected`;
 } else {
 bulkBar.style.display = 'none';
 }
 }

 if (activeQueue.length === 0) {
 tbody.innerHTML = `
<tr>
<td colspan="9"style="text-align: center; padding: 24px; color: var(--text-muted);">
 No communications match the active search or filters.
</td>
</tr>
 `;
 return;
 }

 let html = '';
 activeQueue.forEach(row =>{
 const isChecked = selectedQueueIds.has(row.id) ? 'checked' : '';
 const badgeClass = row.status === 'Delivered' ? 'wf-badge-dark' : 'wf-badge-outline';

 html += `
<tr>
<td style="width: 36px;"><input type="checkbox"class="comm-row-checkbox"data-id="${row.id}" ${isChecked}></td>
<td>
<strong style="font-size: 13px; color: var(--text-primary); display: block;">${row.recipient}</strong>
<span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${row.rollNo}</span>
</td>
<td><span style="font-size: 12px; color: var(--text-secondary);">${row.role}</span></td>
<td><span class="wf-badge wf-badge-dark">${row.eligibility}</span></td>
<td><span style="font-size: 12px; color: var(--text-primary); font-weight: 500;">${row.type}</span></td>
<td><span style="font-size: 12px; color: var(--text-secondary);">${row.channel}</span></td>
<td><span class="wf-badge ${badgeClass}">${row.status}</span></td>
<td><span style="font-size: 11px; color: var(--text-muted);">${row.opened}</span></td>
<td style="text-align: right;">
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Resent message to ${row.recipient}')">Resend →</button>
</td>
</tr>
 `;
 });

 tbody.innerHTML = html;

 tbody.querySelectorAll('.comm-row-checkbox').forEach(cb =>{
 cb.addEventListener('change', (e) =>{
 const id = e.target.getAttribute('data-id');
 if (e.target.checked) selectedQueueIds.add(id);
 else selectedQueueIds.delete(id);
 renderQueueTable();
 });
 });
}

// ============================================================================
// 7. RECRUITER FOLLOW-UP WORKSPACE
// ============================================================================
function renderRecruiterFollowups() {
 const container = document.getElementById('section-recruiter-followups');
 if (!container) return;

 let html = '';
 mockRecruiterFollowups.forEach(r =>{
 html += `
<div class="wf-card"style="padding: var(--space-md); background: var(--bg-surface); border: 1px solid var(--border-subtle); margin-bottom: var(--space-sm);">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
<div>
<strong style="font-size: 14px; color: var(--text-primary);">${r.company}</strong>
<span style="font-size: 12px; color: var(--text-muted); margin-left: 6px;">${r.recruiter}</span>
</div>
<span class="wf-badge wf-badge-outline"style="font-size: 10px;">⚠ ${r.daysIdle} Days Inactive</span>
</div>
<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
 Status:<strong>${r.status}</strong>· ${r.suggestion}
</div>
<div style="display: flex; gap: 6px; justify-content: flex-end;">
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Logged call reminder for ${r.company}')">Call Recruiter</button>
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Scheduled 24h follow-up for ${r.company}')">Schedule Reminder</button>
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Drafted email to ${r.recruiter}')">${r.actionEmail}</button>
</div>
</div>
 `;
 });

 container.innerHTML = html;
}

// ============================================================================
// 8. MONTHLY PLACEMENT NEWSLETTER GENERATOR
// ============================================================================
function renderNewsletterPreview() {
 const container = document.getElementById('section-newsletter-preview');
 if (!container) return;

 const n = mockNewsletterData;

 container.innerHTML = `
<div class="wf-card"style="padding: var(--space-lg); background: var(--bg-surface); border: 1px solid var(--border-medium);">
<div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-sm); margin-bottom: var(--space-md); display: flex; align-items: center; justify-content: space-between;">
<div>
<h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin: 0;">${n.title}</h3>
<span style="font-size: 11px; color: var(--text-muted);">AI Executive Summary · Ready for Broadcast</span>
</div>
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Generated new AI monthly newsletter draft.')">Regenerate Highlights</button>
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-bottom: var(--space-md);">
<div style="padding: 10px; background: var(--bg-muted); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Batch Placement</span>
<strong style="font-size: 14px; color: var(--text-primary); display: block;">${n.placedCount}</strong>
</div>
<div style="padding: 10px; background: var(--bg-muted); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Highest Offered CTC</span>
<strong style="font-size: 14px; color: var(--text-primary); display: block;">${n.highestPackage}</strong>
</div>
<div style="padding: 10px; background: var(--bg-muted); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Batch CTC</span>
<strong style="font-size: 14px; color: var(--text-primary); display: block;">${n.avgPackage}</strong>
</div>
</div>

<div style="font-size: 12px; color: var(--text-primary); margin-bottom: var(--space-md);">
<strong>Top Hiring Partners:</strong>${n.topRecruiters.join(', ')}
</div>

<div style="font-size: 12px; color: var(--text-secondary); background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: var(--space-md);">
<strong style="font-size: 12px; color: var(--text-primary); text-transform: uppercase; display: block; margin-bottom: 4px;">AI Operating Highlights</strong>
<ul style="margin: 0; padding-left: 16px; line-height: 1.5;">
 ${n.aiHighlights.map(h =>`<li>${h}</li>`).join('')}
</ul>
</div>

<div style="display: flex; gap: var(--space-sm); justify-content: flex-end;">
<button class="wf-btn wf-btn-sm wf-btn-secondary"onclick="alert('Shared newsletter link via portal.')">Share via Portal</button>
<button class="wf-btn wf-btn-sm wf-btn-primary"id="btn-download-newsletter">Download Newsletter (.txt)</button>
</div>
</div>
 `;

 document.getElementById('btn-download-newsletter')?.addEventListener('click', () =>{
 const text = `
PLACEMENTHUB MONTHLY CAREER & RECRUITMENT NEWSLETTER — AUGUST 2026
==================================================================================
${n.title}

HIGHLIGHTS & METRICS
----------------------------------------------------------------------------------
- Placements: ${n.placedCount}
- Highest CTC: ${n.highestPackage}
- Average CTC: ${n.avgPackage}
- Top Recruiters: ${n.topRecruiters.join(', ')}

AI OPERATING HIGHLIGHTS
----------------------------------------------------------------------------------
${n.aiHighlights.map(h =>`- ${h}`).join('\n')}

==================================================================================
Issued by Placement Operations Cell · PlacementHub AI Solutions
 `.trim();

 const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.setAttribute('href', url);
 link.setAttribute('download', 'Monthly_Placement_Newsletter_Aug_2026.txt');
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 showToast('Monthly Placement Newsletter downloaded.', 'success');
 });
}

// ============================================================================
// 9. COMMUNICATION ANALYTICS CARDS
// ============================================================================
function renderAnalytics() {
 const container = document.getElementById('comm-analytics-kpi-grid');
 if (!container) return;

 const a = mockCommunicationAnalytics;

 container.innerHTML = `
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Emails Sent</span></div>
<div class="wf-kpi-value">${a.emailsSent}</div>
<div class="wf-kpi-subtext">99.1% Delivery Success</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">WhatsApp Delivered</span></div>
<div class="wf-kpi-value">${a.whatsAppDelivered}</div>
<div class="wf-kpi-subtext">Multi-Channel Active</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Open Rate</span></div>
<div class="wf-kpi-value">${a.openRate}</div>
<div class="wf-kpi-subtext">+6.4% vs Last Month</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Response Rate</span></div>
<div class="wf-kpi-value">${a.responseRate}</div>
<div class="wf-kpi-subtext">Avg Response: ${a.avgResponseTime}</div>
</div>
 `;
}

// ============================================================================
// 10. AI RECOMMENDATIONS ENGINE
// ============================================================================
function renderRecommendations() {
 const container = document.getElementById('comm-recommendations-list');
 if (!container) return;

 let html = '';
 mockCommunicationRecommendations.forEach(rec =>{
 html += `
<div class="wf-card"style="padding: var(--space-md); border: 1px solid var(--border-medium); margin-bottom: var(--space-md);">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
<strong style="font-size: 14px; color: var(--text-primary);">${rec.title}</strong>
<span class="wf-badge wf-badge-dark"style="font-size: 10px;">${rec.confidence}</span>
</div>

<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">
<strong>Problem Identified:</strong>${rec.problem}
</div>

<div style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
<strong>Evidence Lineage:</strong>${rec.evidence}
</div>

<div style="font-size: 12px; color: var(--text-primary); background: var(--bg-muted); padding: 8px 10px; border-radius: var(--radius-sm); margin-bottom: var(--space-sm);">
<strong>Proposed Action:</strong>${rec.recommendation}
</div>

<div style="font-size: 11px; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 6px 10px; border-radius: var(--radius-sm); margin-bottom: var(--space-sm);">
 Expected Impact:<strong>${rec.expectedImpact}</strong>
</div>

<div style="display: flex; gap: 6px; justify-content: flex-end;">
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Snoozed action for ${rec.title}')">${rec.secondaryAction}</button>
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Executed action: ${rec.primaryAction}')">${rec.primaryAction}</button>
</div>
</div>
 `;
 });

 container.innerHTML = html;
}

// ============================================================================
// ACTION HANDLERS & REPORT EXPORTER
// ============================================================================
function initActionHandlers() {
 document.getElementById('btn-run-comm-workflow')?.addEventListener('click', () =>{
 runCommunicationWorkflow();
 });

 document.getElementById('btn-trigger-comm-empty-state')?.addEventListener('click', () =>{
 runCommunicationWorkflow();
 });

 document.getElementById('btn-submit-comm-command')?.addEventListener('click', () =>{
 const input = document.getElementById('comm-command-input');
 const text = input?.value.trim();
 runCommunicationWorkflow(text);
 });

 document.getElementById('btn-download-comm-report')?.addEventListener('click', () =>{
 const reportText = `
PLACEMENTHUB AI OPERATIONS — EXECUTIVE COMMUNICATION REPORT 2026
==================================================================================
Date: ${new Date().toISOString().split('T')[0]}
Audience: Training & Placement Officer (TPO), Placement Operations Cell
System Engine: PlacementHub AI Communication Assistant v3.4

1. COMMUNICATION OPERATIONS HEALTH
----------------------------------------------------------------------------------
Overall Communication Health: 92%
Audience Reach: 148 Eligible Students (Google AI Drive 2026)
Open Rate: 84.2% | Response Rate: 72.1% | Delivery Success: 99.1%

2. MULTI-CHANNEL DISPATCH QUEUE SUMMARY
----------------------------------------------------------------------------------
${mockCommunicationQueue.map(q =>`- ${q.recipient} (${q.role}): ${q.type} via ${q.channel} ->Status: ${q.status} (Opened: ${q.opened})`).join('\n')}

3. RECRUITER FOLLOW-UP AUDIT LOG
----------------------------------------------------------------------------------
${mockRecruiterFollowups.map(r =>`- ${r.company} (${r.recruiter}): ${r.daysIdle} Days Inactive | Action: ${r.actionEmail}`).join('\n')}

4. STRATEGIC COMMUNICATION RECOMMENDATIONS
----------------------------------------------------------------------------------
${mockCommunicationRecommendations.map(rec =>`- ${rec.title} [Confidence ${rec.confidence}]: ${rec.problem} ->Action: ${rec.primaryAction}`).join('\n')}

==================================================================================
Signed: AI Communication Operations Center (PlacementHub Enterprise v3.4)
==================================================================================
 `.trim();

 const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.setAttribute('href', url);
 link.setAttribute('download', 'Executive_Placement_Communication_Report_2026.txt');
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);

 showToast('Executive Communication Operations Report downloaded.', 'success');
 });
}
