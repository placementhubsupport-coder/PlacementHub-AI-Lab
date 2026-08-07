/**
 * PlacementHub AI Solutions — AI Placement Analytics & Predictions Controller (POC8)
 * Controls Natural Language Analytics, Predictive Stepper Reasoning, Root-Cause Analysis,
 * Student Placement Predictions, Salary & Company Forecasts, Branch Analytics, High-Risk Interventions,
 * and Executive Report Exporter.
 */

import {
 mockPlacementAnalytics,
 mockPredictions,
 mockSalaryForecast,
 mockCompanyForecasts,
 mockBranchForecast,
 mockRiskStudents,
 mockAiRecommendationsEngine
} from'../data/mockData.js';
import { showToast, asyncSimulateApiCall } from'./components.js';

let isAnalyzing = false;
let activeStudentPredictions = [...mockPredictions];

document.addEventListener('DOMContentLoaded', () => {
 console.log('[POC 8] Placement Analytics & Predictions initialized');
 renderPresetQueryChips();
 initActionHandlers();
 initStudentFilters();

 // Enterprise BI Standard: Render All Dashboard Components Immediately on Page Load
 renderExecutiveSummary();
 renderRootCauseAnalysis();
 renderStudentPredictionsTable();
 renderSalaryForecast();
 renderCompanyForecastTable();
 renderBranchForecast();
 renderHighRiskCards();
 renderAiRecommendations();
});

// ============================================================================
// STRATEGIC AI QUERY CHIPS
// ============================================================================
function renderPresetQueryChips() {
 const container = document.getElementById('ai-analytics-query-chips');
 if (!container) return;

 let html = '';
 mockPlacementAnalytics.presetQueries.forEach(q =>{
 html += `
<button class="wf-btn wf-btn-xs wf-btn-secondary"data-query-key="${q.queryKey}"style="font-size: 11px;">
 ${q.text}
</button>
 `;
 });

 container.innerHTML = html;

 container.querySelectorAll('[data-query-key]').forEach(btn =>{
 btn.addEventListener('click', () =>{
 const queryText = btn.textContent.trim();
 runAiAnalyticsSteppedWorkflow(queryText);
 });
 });
}

// ============================================================================
// INTERACTIVE AI STEPPER WORKFLOW SIMULATION
// ============================================================================
async function runAiAnalyticsSteppedWorkflow(customQuery = '') {
 console.log('[POC 8] Run Predictive Analysis button clicked');
 if (isAnalyzing) return;
 isAnalyzing = true;

 const stepperCard = document.getElementById('ai-analytics-stepper-card');
 const mainBtn = document.getElementById('btn-run-predictive-analysis');
 const submitBtn = document.getElementById('btn-submit-analytics-query');

 if (stepperCard) stepperCard.style.display = 'block';

 if (mainBtn) {
 mainBtn.disabled = true;
 mainBtn.textContent = 'Refreshed Predictive Model...';
 }
 if (submitBtn) {
 submitBtn.disabled = true;
 submitBtn.textContent = 'Analyzing...';
 }

 const stepperList = document.getElementById('analytics-stepper-steps-list');
 const stepperTimer = document.getElementById('analytics-stepper-timer');
 const stepperTitle = document.getElementById('analytics-stepper-status-title');

 if (stepperTitle) stepperTitle.textContent = customQuery ? `AI Data Analyst: "${customQuery}"` : 'AI Placement Analytics Engine Executing...';
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 '⏳ Ingesting 420 student academic, assessment, and interview logs...',
 'Evaluating recruiter evaluation rubrics across 42 campus drives...',
 'Isolating Mechanical interview conversion bottleneck (-18% impact factor)...',
 'Computing individual student placement probabilities & package models...',
 'Forecasting Q4 company demand, panels required, and salary growth (+9.2%)...',
 'Synthesizing executive recommendations & board decision audit package...'
 ];

 let startTime = Date.now();
 const timerInterval = setInterval(() =>{
 if (stepperTimer) {
 const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
 stepperTimer.textContent = `${elapsed}s`;
 }
 }, 100);

 // Progressive step rendering
 for (let i = 0; i< steps.length; i++) {
 await asyncSimulateApiCall(null, 380);
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
 if (stepperTitle) stepperTitle.textContent = `✓ AI Analytics Complete (${finalTime}s • 94% Confidence Score)`;

 await asyncSimulateApiCall(null, 200);

 // Render all analytical sections
 renderExecutiveSummary();
 renderRootCauseAnalysis();
 renderStudentPredictionsTable();
 renderSalaryForecast();
 renderCompanyForecastTable();
 renderBranchForecast();
 renderHighRiskCards();
 renderAiRecommendations();

 // Reveal results workspace
 if (resultsWorkspace) {
 resultsWorkspace.style.display = 'block';
 requestAnimationFrame(() =>{
 resultsWorkspace.style.opacity = '1';
 });
 }

 // Restore buttons
 if (mainBtn) {
 mainBtn.disabled = false;
 mainBtn.textContent = 'Re-Run Predictive Analysis';
 }
 if (submitBtn) {
 submitBtn.disabled = false;
 submitBtn.textContent = 'Analyze';
 }

 isAnalyzing = false;
 showToast('AI Predictive Analysis Complete. Placement health score: 91%.', 'success');
}

// ============================================================================
// SECTION 2: EXECUTIVE AI SUMMARY
// ============================================================================
function renderExecutiveSummary() {
 const container = document.getElementById('section-exec-summary');
 if (!container) return;

 const data = mockPlacementAnalytics.executiveSummary;

 let bulletsHtml = '';
 data.bullets.forEach(b =>{
 bulletsHtml += `<li style="margin-bottom: 6px;">• ${b}</li>`;
 });

 let sourcesHtml = '';
 data.evidenceSources.forEach(s =>{
 sourcesHtml += `<span class="wf-badge wf-badge-outline"style="font-size: 11px;">${s}</span>`;
 });

 container.innerHTML = `
<div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-md); margin-bottom: var(--space-md);">
<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Executive AI Summary</span>
<h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary); margin-top: 2px;">${data.title}</h2>
</div>
<div style="display: flex; gap: var(--space-md); text-align: right;">
<div>
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Placement Health</span>
<div style="font-size: 24px; font-weight: 800; color: var(--text-primary);">${data.healthScore}</div>
</div>
<div>
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Confidence</span>
<div style="font-size: 24px; font-weight: 800; color: var(--text-primary);">${data.confidenceScore}</div>
</div>
</div>
</div>

<ul style="font-size: 13px; color: var(--text-primary); line-height: 1.6; padding-left: 0; list-style: none; margin-bottom: var(--space-md);">
 ${bulletsHtml}
</ul>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: var(--space-md);">
<div>
<strong style="font-size: 12px; color: var(--text-primary); text-transform: uppercase; display: block; margin-bottom: 4px;">Primary Finding</strong>
<p style="font-size: 12px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${data.primaryFindings}</p>
</div>
<div>
<strong style="font-size: 12px; color: var(--text-primary); text-transform: uppercase; display: block; margin-bottom: 4px;">Projected Business Impact</strong>
<p style="font-size: 12px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${data.businessImpact}</p>
</div>
</div>

<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 6px;">Verified Evidence Lineage</span>
<div style="display: flex; gap: 6px; flex-wrap: wrap;">
 ${sourcesHtml}
</div>
</div>
 `;
}

// ============================================================================
// SECTION 3: AI ROOT CAUSE ANALYSIS
// ============================================================================
function renderRootCauseAnalysis() {
 const container = document.getElementById('section-root-cause');
 if (!container) return;

 const data = mockPlacementAnalytics.rootCauseAnalysis;

 let evidenceHtml = '';
 data.evidenceDecomposition.forEach(e =>{
 evidenceHtml += `
<div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-bottom: 6px;">
<span style="font-weight: 600; font-size: 12px; color: var(--text-primary); width: 220px;">• ${e.metric}</span>
<span class="wf-badge wf-badge-dark"style="font-size: 11px;">${e.score}</span>
<span style="font-size: 12px; color: var(--text-secondary); flex: 1; text-align: right;">${e.detail}</span>
</div>
 `;
 });

 container.innerHTML = `
<div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-sm); margin-bottom: var(--space-md);">
<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">AI Root Cause Reasoning</span>
<h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${data.title}</h3>
</div>
<div style="display: flex; gap: 8px;">
<span class="wf-badge wf-badge-dark">Impacted: ${data.impactedCount}</span>
<span class="wf-badge wf-badge-outline">Confidence: ${data.confidence}</span>
</div>
</div>

<p style="font-size: 13px; color: var(--text-primary); line-height: 1.5; margin-bottom: var(--space-md); background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
 "Primary Issue Identified: ${data.primaryIssue} Analysis indicates 44% of rejections stem directly from unaddressed SQL query cutoffs during online assessments."
</p>

<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 8px;">Decomposed Evidence Signals</span>
 ${evidenceHtml}
</div>
 `;
}

// ============================================================================
// SECTION 4: STUDENT PLACEMENT PREDICTION TABLE & FILTERS
// ============================================================================
function initStudentFilters() {
 const searchInput = document.getElementById('student-pred-search');
 const riskSelect = document.getElementById('student-pred-risk-filter');
 const deptSelect = document.getElementById('student-pred-dept-filter');

 const applyFilters = () =>{
 const q = searchInput?.value.trim().toLowerCase() || '';
 const risk = riskSelect?.value || 'ALL';
 const dept = deptSelect?.value || 'ALL';

 activeStudentPredictions = mockPredictions.filter(student =>{
 const matchQuery = student.name.toLowerCase().includes(q) ||
 student.rollNo.toLowerCase().includes(q) ||
 student.likelyDomain.toLowerCase().includes(q);
 const matchRisk = risk === 'ALL' || student.risk === risk;
 const matchDept = dept === 'ALL' || student.department === dept;

 return matchQuery && matchRisk && matchDept;
 });

 renderStudentPredictionsTable();
 };

 if (searchInput) searchInput.addEventListener('input', applyFilters);
 if (riskSelect) riskSelect.addEventListener('change', applyFilters);
 if (deptSelect) deptSelect.addEventListener('change', applyFilters);
}

function renderStudentPredictionsTable() {
 const tbody = document.getElementById('student-predictions-tbody');
 if (!tbody) return;

 if (activeStudentPredictions.length === 0) {
 tbody.innerHTML = `
<tr>
<td colspan="8"style="text-align: center; padding: 24px; color: var(--text-muted);">
 No student predictions match the selected filters.
</td>
</tr>
 `;
 return;
 }

 let html = '';
 activeStudentPredictions.forEach(student =>{
 const riskBadge = student.risk === 'High Risk' ? 'wf-badge-dark' :
 student.risk === 'Moderate Risk' ? 'wf-badge-outline' : 'wf-badge-outline';

 html += `
<tr>
<td>
<strong style="font-size: 13px; color: var(--text-primary); display: block;">${student.name}</strong>
<span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${student.rollNo} · ${student.department}</span>
</td>
<td><strong>${student.cgpa}</strong></td>
<td>
<div style="display: flex; align-items: center; gap: 6px;">
<span style="font-weight: 700; font-size: 13px;">${student.probability}</span>
<div style="width: 45px; height: 6px; background: var(--bg-muted); border-radius: 3px; overflow: hidden;">
<div style="height: 100%; width: ${student.probability}; background: var(--bg-dark);"></div>
</div>
</div>
</td>
<td><strong style="font-size: 13px; color: var(--text-primary);">${student.expectedPackage}</strong></td>
<td><span style="font-size: 12px; color: var(--text-secondary);">${student.likelyDomain}</span></td>
<td><span class="wf-badge ${riskBadge}">${student.risk}</span></td>
<td><span style="font-size: 11px; color: var(--text-muted);">${student.recommendation}</span></td>
<td style="text-align: right;">
<button class="wf-btn wf-btn-xs wf-btn-secondary"data-action="student-action"data-name="${student.name}">${student.actionText} →</button>
</td>
</tr>
 `;
 });

 tbody.innerHTML = html;

 tbody.querySelectorAll('[data-action="student-action"]').forEach(btn =>{
 btn.addEventListener('click', () =>{
 const name = btn.getAttribute('data-name');
 showToast(`Action triggered for ${name}. Notification logged in TPO portal.`, 'info');
 });
 });
}

// ============================================================================
// SECTION 5: SALARY PREDICTION CARDS
// ============================================================================
function renderSalaryForecast() {
 const container = document.getElementById('section-salary-forecast');
 if (!container) return;

 const data = mockSalaryForecast;

 let breakdownHtml = '';
 data.breakdown.forEach(b =>{
 breakdownHtml += `
<div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-bottom: 4px; font-size: 12px;">
<span>${b.tier}</span>
<strong>${b.percentage} (${b.candidateCount} students)</strong>
</div>
 `;
 });

 container.innerHTML = `
<div class="wf-kpi-grid"style="grid-template-columns: repeat(4, 1fr); margin-bottom: var(--space-md);">
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Predicted Avg Package</span></div>
<div class="wf-kpi-value">${data.avgPackage}</div>
<div class="wf-kpi-subtext">${data.expectedGrowth} Growth</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Predicted Highest Package</span></div>
<div class="wf-kpi-value">${data.highestPackage}</div>
<div class="wf-kpi-subtext">Super dream offer</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Predicted Median Package</span></div>
<div class="wf-kpi-value">${data.medianPackage}</div>
<div class="wf-kpi-subtext">Batch median CTC</div>
</div>
<div class="wf-kpi-card">
<div class="wf-kpi-header"><span class="wf-kpi-label">Model Confidence</span></div>
<div class="wf-kpi-value"style="font-size: 18px; font-weight: 800; margin-top: 6px;">${data.confidence}</div>
<div class="wf-kpi-subtext">Regression Model v3</div>
</div>
</div>

<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 6px;">Predicted Package Tier Breakdown</span>
 ${breakdownHtml}
</div>
 `;
}

// ============================================================================
// SECTION 6: COMPANY HIRING FORECAST TABLE
// ============================================================================
function renderCompanyForecastTable() {
 const tbody = document.getElementById('company-forecast-tbody');
 if (!tbody) return;

 let html = '';
 mockCompanyForecasts.forEach(c =>{
 html += `
<tr>
<td><strong style="font-size: 14px; color: var(--text-primary);">${c.company}</strong></td>
<td>${c.expectedApplicants} candidates</td>
<td><strong>${c.expectedShortlist}</strong>shortlisted</td>
<td>${c.expectedInterviews} interviews</td>
<td><strong style="font-size: 13px; color: var(--text-primary);">${c.expectedOffers} offers</strong></td>
<td><span class="wf-badge wf-badge-dark">${c.panelsRequired}</span></td>
<td style="text-align: right;"><span class="wf-badge wf-badge-outline">${c.status}</span></td>
</tr>
 `;
 });

 tbody.innerHTML = html;
}

// ============================================================================
// SECTION 7: BRANCH FORECAST CARDS
// ============================================================================
function renderBranchForecast() {
 const container = document.getElementById('branch-forecast-container');
 if (!container) return;

 let html = '';
 mockBranchForecast.forEach(b =>{
 html += `
<div class="wf-card"style="padding: var(--space-md);">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
<div>
<strong style="font-size: 15px; color: var(--text-primary);">${b.branch} Branch</strong>
<span style="font-size: 11px; color: var(--text-muted); display: block;">Predicted Placement Rate</span>
</div>
<div style="text-align: right;">
<div style="font-size: 20px; font-weight: 800; color: var(--text-primary);">${b.likelyPlacement}</div>
<span class="wf-badge ${b.statusBadge}"style="font-size: 10px;">${b.statusText}</span>
</div>
</div>
<p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4; margin: 0; background: var(--bg-muted); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
<strong>AI Explanation:</strong>${b.explanation}
</p>
</div>
 `;
 });

 container.innerHTML = html;
}

// ============================================================================
// SECTION 8: HIGH-RISK STUDENTS CARDS
// ============================================================================
function renderHighRiskCards() {
 const container = document.getElementById('high-risk-cards-container');
 if (!container) return;

 let html = '';
 mockRiskStudents.forEach(student =>{
 html += `
<div class="wf-card"style="padding: var(--space-md); border: 1px solid var(--border-medium);">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
<div>
<strong style="font-size: 14px; color: var(--text-primary);">${student.name}</strong>
<span style="font-size: 11px; color: var(--text-muted); display: block;">Roll No: ${student.rollNo} · ${student.department}</span>
</div>
<div style="text-align: right;">
<span class="wf-badge wf-badge-dark">${student.riskLevel}</span>
<span style="font-size: 11px; color: var(--text-muted); display: block; margin-top: 2px;">Disengagement: ${student.disengagementProbability}</span>
</div>
</div>

<div style="font-size: 12px; color: var(--text-secondary); background: var(--bg-muted); padding: 8px 10px; border-radius: var(--radius-sm); margin-bottom: var(--space-sm); border-left: 3px solid var(--border-dark-neutral);">
<strong>Identified Reason:</strong>${student.reason}
</div>

<div style="font-size: 12px; color: var(--text-primary); margin-bottom: var(--space-sm);">
<strong>AI Recommendation:</strong>${student.recommendation}
</div>

<div style="display: flex; gap: 6px; justify-content: flex-end;">
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Viewing candidate profile for ${student.name}')">View Profile</button>
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Created academic intervention ticket for ${student.name}')">Create Intervention</button>
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Scheduled remedial workshop for ${student.name}')">Schedule Workshop</button>
</div>
</div>
 `;
 });

 container.innerHTML = html;
}

// ============================================================================
// SECTION 9: AI RECOMMENDATIONS ENGINE CARDS
// ============================================================================
function renderAiRecommendations() {
 const container = document.getElementById('ai-analytics-recommendations-list');
 if (!container) return;

 let html = '';
 mockAiRecommendationsEngine.forEach(rec =>{
 html += `
<div class="wf-card"style="padding: var(--space-md); border: 1px solid var(--border-medium); margin-bottom: var(--space-md);">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
<strong style="font-size: 14px; color: var(--text-primary);">${rec.title}</strong>
<span class="wf-badge wf-badge-dark"style="font-size: 10px;">${rec.confidence}</span>
</div>

<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
<strong>Problem Identified:</strong>${rec.problem}
</div>

<div style="font-size: 12px; color: var(--text-primary); background: var(--bg-muted); padding: 8px 10px; border-radius: var(--radius-sm); margin-bottom: var(--space-sm);">
<strong>Proposed Action:</strong>${rec.recommendation}
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xs); font-size: 11px; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 6px 10px; border-radius: var(--radius-sm); margin-bottom: var(--space-sm);">
<div>Estimated Improvement:<strong>${rec.estimatedImprovement}</strong></div>
<div>Additional Placements:<strong>${rec.estimatedPlacements}</strong></div>
</div>

<div style="text-align: right;">
<button class="wf-btn wf-btn-xs wf-btn-primary"data-action="execute-rec-action"data-rec-title="${rec.title}">
 ${rec.actionText}
</button>
</div>
</div>
 `;
 });

 container.innerHTML = html;

 container.querySelectorAll('[data-action="execute-rec-action"]').forEach(btn =>{
 btn.addEventListener('click', async () =>{
 const title = btn.getAttribute('data-rec-title');
 btn.disabled = true;
 btn.textContent = 'Provisioning...';
 await asyncSimulateApiCall(null, 800);
 btn.disabled = false;
 btn.textContent = 'Provisioned ✓';
 showToast(`Action Provisioned: "${title}". Logged in Dean's Execution Portal.`, 'success');
 });
 });
}

// ============================================================================
// ACTION HANDLERS & EXECUTIVE REPORT GENERATOR
// ============================================================================
function initActionHandlers() {
 document.getElementById('btn-run-predictive-analysis')?.addEventListener('click', () =>{
 runAiAnalyticsSteppedWorkflow();
 });

 document.getElementById('btn-simulate-sql-scenario')?.addEventListener('click', async () =>{
 const btn = document.getElementById('btn-simulate-sql-scenario');
 if (btn) {
 btn.disabled = true;
 btn.textContent = 'Simulating Model Outcome...';
 }
 await asyncSimulateApiCall(null, 900);
 if (btn) {
 btn.disabled = false;
 btn.textContent = 'Scenario Applied: +3.8% Overall Placement Lift ✓';
 }

 mockPlacementAnalytics.executiveSummary.healthScore = '96.2%';
 mockPlacementAnalytics.executiveSummary.bullets[0] = 'Overall batch placement rate projected at 96.2% following SQL Bootcamp intervention.';

 mockBranchForecast[3].likelyPlacement = '88%';
 mockBranchForecast[3].statusBadge = 'wf-badge-dark';
 mockBranchForecast[3].statusText = 'Likely Placement';
 mockBranchForecast[3].explanation = 'Post-SQL bootcamp simulation: Mechanical interview conversion projected to recover +18%.';

 renderExecutiveSummary();
 renderBranchForecast();
 showToast('Counterfactual Model Updated: Overall Placement Health raised to 96.2%!', 'success');
 });

 document.getElementById('btn-trigger-analytics-empty-state')?.addEventListener('click', () =>{
 runAiAnalyticsSteppedWorkflow();
 });

 document.getElementById('btn-submit-analytics-query')?.addEventListener('click', () =>{
 const input = document.getElementById('ai-analytics-query-input');
 const text = input?.value.trim();
 runAiAnalyticsSteppedWorkflow(text);
 });

 document.getElementById('btn-download-exec-report')?.addEventListener('click', () =>{
 const data = mockPlacementAnalytics.executiveSummary;
 const reportText = `
PLACEMENTHUB AI ANALYST — EXECUTIVE PLACEMENT ANALYTICS & PREDICTIONS REPORT
==================================================================================
Date: ${new Date().toISOString().split('T')[0]}
Audience: Directorate of Training & Placement, Deans & College Leadership
System Model: PlacementHub Predictive Neural Engine v3.4

1. EXECUTIVE SUMMARY & HEALTH INDEX
----------------------------------------------------------------------------------
Placement Health Index: ${data.healthScore}
Model Confidence Score: ${data.confidenceScore}

Key Findings:
${data.bullets.map(b =>`- ${b}`).join('\n')}

Primary Bottleneck: ${data.primaryFindings}
Projected Impact: ${data.businessImpact}

2. STUDENT PLACEMENT PREDICTION SUMMARY
----------------------------------------------------------------------------------
${mockPredictions.map(s =>`- ${s.name} (${s.rollNo}, ${s.department}): Prob ${s.probability} | CTC ${s.expectedPackage} | Risk: ${s.risk} | Rec: ${s.recommendation}`).join('\n')}

3. SALARY & CTC FORECAST
----------------------------------------------------------------------------------
Predicted Average CTC: ${mockSalaryForecast.avgPackage} (${mockSalaryForecast.expectedGrowth})
Predicted Median CTC: ${mockSalaryForecast.medianPackage}
Predicted Highest CTC: ${mockSalaryForecast.highestPackage}

Tier Distribution:
${mockSalaryForecast.breakdown.map(b =>`- ${b.tier}: ${b.percentage} (${b.candidateCount} candidates)`).join('\n')}

4. RECRUITER DRIVE DEMAND FORECAST
----------------------------------------------------------------------------------
${mockCompanyForecasts.map(c =>`- ${c.company}: ${c.expectedApplicants} Applicants ➔ ${c.expectedOffers} Offers (${c.panelsRequired})`).join('\n')}

5. BRANCH CONVERSION FORECAST
----------------------------------------------------------------------------------
${mockBranchForecast.map(b =>`- ${b.branch} Branch: ${b.likelyPlacement} (${b.statusText}) | ${b.explanation}`).join('\n')}

6. HIGH-RISK CANDIDATE INTERVENTIONS
----------------------------------------------------------------------------------
${mockRiskStudents.map(r =>`- ${r.name} (${r.department}): Risk ${r.riskLevel} | Reason: ${r.reason} | Action: ${r.recommendation}`).join('\n')}

7. STRATEGIC RECOMMENDATIONS ENGINE
----------------------------------------------------------------------------------
${mockAiRecommendationsEngine.map(rec =>`- ${rec.title} [Confidence ${rec.confidence}]: Impact ${rec.estimatedImprovement} (${rec.estimatedPlacements} additional placements)`).join('\n')}

==================================================================================
Signed: AI Data Analyst Engine (PlacementHub Enterprise v3.4)
==================================================================================
 `.trim();

 const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.setAttribute('href', url);
 link.setAttribute('download', 'Executive_Placement_Analytics_and_Predictions_Report_2026.txt');
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);

 showToast('Executive Placement Analytics & Predictions Report downloaded.', 'success');
 });
}
