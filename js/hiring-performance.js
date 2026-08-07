/**
 * PlacementHub AI Solutions — Hiring Performance Analytics Controller (POC7)
 * Deterministic Analytics Dashboard Workspace (Layer 1) + AI Report Assistant Side Panel (Layer 2).
 */

import { mockHiringPerformanceData } from'../data/mockData.js';
import { showToast, asyncSimulateApiCall } from'./components.js';

let isAnalyzing = false;

document.addEventListener('DOMContentLoaded', () => {
  console.log('[POC 7] Hiring Performance Analytics initialized');
 renderKpis();
 renderSkillLiftMatrix();
 renderDepartmentBreakdown();
 initActionHandlers();
});

// ============================================================================
// LAYER 1: DETERMINISTIC ANALYTICS DASHBOARD RENDER
// ============================================================================
function renderKpis() {
 const data = mockHiringPerformanceData.kpis;
 document.getElementById('kpi-total-drives').textContent = data.totalDrives;
 document.getElementById('kpi-placement-rate').textContent = data.overallPlacementRate;
 document.getElementById('kpi-avg-salary').textContent = data.avgSalary;
 document.getElementById('kpi-median-salary').textContent = data.medianSalary;
 document.getElementById('kpi-highest-package').textContent = data.highestPackage;
 document.getElementById('kpi-top-partner').textContent = data.topHiringPartner;
}

function renderSkillLiftMatrix() {
 const tbody = document.getElementById('skill-lift-tbody');
 if (!tbody) return;

 const matrix = mockHiringPerformanceData.skillLiftMatrix;

 let html = '';
 matrix.forEach(s =>{
 html += `
<tr>
<td><strong style="font-size: 13px; color: var(--text-primary);">${s.skill}</strong></td>
<td><span class="wf-badge wf-badge-dark">${s.demandScore} / 100</span></td>
<td><strong style="color: #22c55e; font-size: 12px; font-family: var(--font-mono);">${s.selectionBoost}</strong></td>
<td><span style="font-size: 12px; font-family: var(--font-mono);">${s.avgPackage}</span></td>
<td><span style="font-size: 12px; color: var(--text-secondary);">${s.topRole}</span></td>
<td style="text-align: right;"><span class="wf-badge wf-badge-outline">${s.recommendation}</span></td>
</tr>
 `;
 });

 tbody.innerHTML = html;
}

function renderDepartmentBreakdown() {
 const container = document.getElementById('hiring-forecast-container');
 if (!container) return;

 const depts = mockHiringPerformanceData.departments;
 if (!depts) return;

 let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
 depts.forEach(d =>{
 html += `
<div>
<div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
<span><strong style="color: var(--text-primary);">${d.dept}</strong>(${d.placedCount}/${d.totalStudents} placed)</span>
<span style="color: var(--text-muted); font-family: var(--font-mono);">Avg: ${d.avgCtc} · Top: ${d.highestCtc}</span>
</div>
<div style="width: 100%; height: 10px; background: var(--bg-muted); border-radius: 4px; overflow: hidden;">
<div style="height: 100%; width: ${d.placementRate}; background: var(--bg-dark-neutral);"></div>
</div>
</div>
 `;
 });
 html += '</div>';

 container.innerHTML = html;
}

// ============================================================================
// LAYER 2: AI REPORT ASSISTANT WORKFLOW SIMULATION
// ============================================================================
async function runAiHiringReportAssistant(reportType = 'Hiring Summary') {
  console.log(`[POC 7] Generate Board Brief button clicked: ${reportType}`);
 if (isAnalyzing) return;
 isAnalyzing = true;

 const stepperCard = document.getElementById('ai-hiring-stepper-card');
 const outputPanel = document.getElementById('ai-hiring-report-output-panel');
 const stepperList = document.getElementById('hiring-stepper-steps-list');
 const stepperTimer = document.getElementById('hiring-stepper-timer');
 const stepperTitle = document.getElementById('hiring-stepper-status-title');

 if (stepperCard) stepperCard.style.display = 'block';
 if (outputPanel) outputPanel.style.display = 'none';

 if (stepperTitle) stepperTitle.textContent = `Generating ${reportType}...`;
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 '⏳ Reading 42 recruitment drive records...',
 'Comparing previous hiring cycle benchmarks (162 offers)...',
 'Identifying PyTorch (+34.2%) and Cloud Lift multipliers...',
 '✓ Generating board brief & recruiter demand forecast (96% Confidence)'
 ];

 let startTime = Date.now();
 const timerInterval = setInterval(() =>{
 if (stepperTimer) {
 const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
 stepperTimer.textContent = `${elapsed}s`;
 }
 }, 100);

 for (let i = 0; i< steps.length; i++) {
 await asyncSimulateApiCall(null, 320);
 if (stepperList) {
 const stepItem = document.createElement('div');
 stepItem.innerHTML = `<span>✓</span><span>${steps[i].replace('⏳ ', '')}</span>`;
 stepperList.appendChild(stepItem);
 }
 }

 clearInterval(timerInterval);
 if (stepperCard) stepperCard.style.display = 'none';

 if (outputPanel) {
 outputPanel.style.display = 'block';
 outputPanel.innerHTML = `
<div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
<strong style="font-size: 13px; color: var(--text-primary);">AI ${reportType}</strong>
<span class="wf-badge wf-badge-dark"style="font-size: 10px;">96% Confidence</span>
</div>

<div style="font-size: 12px; color: var(--text-primary); line-height: 1.5; margin-bottom: 8px;">
 • Overall institutional placement rate reached 92.4% across 42 drives.<br>
 • Mean package rose to ₹14.8 LPA (Median ₹12.4 LPA).<br>
 • TechCorp AI remains top hiring partner (18 accepted offers).<br>
 • Candidate PyTorch & Distributed Systems skills yielded a +34.2% selection lift.
</div>

<div style="background: var(--bg-muted); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 11px; margin-bottom: 8px;">
<strong>Strategic Recommendation:</strong>Expand AI/ML lab electives to boost median CTC package for Mechanical and Civil branches.
</div>

<div style="font-size: 10px; color: var(--text-muted); margin-bottom: 8px;">
 Evidence: Recruiter Logs · Selection Ledger · CTC Records
</div>

<div style="display: flex; gap: 4px; justify-content: flex-end;">
<button class="wf-btn wf-btn-xs wf-btn-secondary" onclick="PlacementHubToast('Copied report to clipboard.', 'success')">Copy</button>
<button class="wf-btn wf-btn-xs wf-btn-primary" onclick="document.getElementById('btn-export-board-package').click()">Download Brief</button>
</div>
 `;
 }

 isAnalyzing = false;
 showToast(`AI Report Assistant generated ${reportType}.`, 'success');
}

// ============================================================================
// STRATEGIC AI QUERY WORKSPACE
// ============================================================================
function renderPresetQueryChips() {
 const container = document.getElementById('ai-hiring-query-chips');
 if (!container) return;

 let html = '';
 mockHiringPerformanceData.presetQueries.forEach(q =>{
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
 runAiHiringSteppedAnalysis(queryText);
 });
 });
}

// ============================================================================
// INTERACTIVE STEPPER WORKFLOW SIMULATION
// ============================================================================
async function runAiHiringSteppedAnalysis(customQuery = '') {
 if (isAnalyzing) return;
 isAnalyzing = true;

 // UI state preparation
 const emptyState = document.getElementById('ai-hiring-empty-state');
 const stepperCard = document.getElementById('ai-hiring-stepper-card');
 const resultsWorkspace = document.getElementById('ai-hiring-results-workspace');
 const mainBtn = document.getElementById('btn-forecast-hiring');
 const submitBtn = document.getElementById('btn-submit-hiring-query');

 if (emptyState) emptyState.style.display = 'none';
 if (resultsWorkspace) {
 resultsWorkspace.style.display = 'none';
 resultsWorkspace.style.opacity = '0';
 }

 if (stepperCard) stepperCard.style.display = 'block';

 if (mainBtn) {
 mainBtn.disabled = true;
 mainBtn.textContent = 'Analyzing...';
 }
 if (submitBtn) {
 submitBtn.disabled = true;
 submitBtn.textContent = 'Analyzing...';
 }

 const stepperList = document.getElementById('hiring-stepper-steps-list');
 const stepperTimer = document.getElementById('hiring-stepper-timer');
 const stepperTitle = document.getElementById('hiring-stepper-status-title');

 if (stepperTitle) stepperTitle.textContent = customQuery ? `AI Hiring Analyst: "${customQuery}"` : 'AI Market Analysis Engine Executing...';
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 '⏳ Ingesting 42 campus recruitment drive rubrics & 162 offer records...',
 'Benchmarking candidate project portfolios against recruiter cutoffs...',
 'Calculating skill selection lift multipliers (PyTorch +94%, System Design +88%)...',
 'Forecasting Q4 recruitment demand & CTC shifts across tech sub-domains...',
 'Matching company skill criteria with 12 target FinTech partner profiles...',
 'Compiling institutional strategy recommendations & board package...'
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
 if (stepperTitle) stepperTitle.textContent = `✓ AI Market Analysis Complete (${finalTime}s • Board Brief Ready)`;

 await asyncSimulateApiCall(null, 200);

 // Render actual AI Canvas Data
 renderDiagnosticCanvas();
 renderSkillLiftMatrix();
 renderDemandForecast();
 renderDepartmentTable();
 renderRecommendations();

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
 mainBtn.textContent = 'Re-Run Market Forecast';
 }
 if (submitBtn) {
 submitBtn.disabled = false;
 submitBtn.textContent = 'Analyze Market Trends';
 }

 isAnalyzing = false;
 showToast('AI Market Analysis Complete. Skill selection multipliers and Q4 forecast updated.', 'success');
}

// ============================================================================
// AI HIRING DIAGNOSTIC CANVAS
// ============================================================================
function renderDiagnosticCanvas() {
 const container = document.getElementById('ai-hiring-diagnostic-canvas');
 if (!container) return;

 const diag = mockHiringPerformanceData.activeDiagnostic;

 let factorsHtml = '';
 diag.factors.forEach(f =>{
 factorsHtml += `
<div style="padding: var(--space-sm) var(--space-md); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-bottom: 8px;">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
<strong style="font-size: 13px; color: var(--text-primary);">${f.factor}</strong>
<span class="wf-badge wf-badge-dark"style="font-size: 10px;">${f.impact}</span>
</div>
<p style="font-size: 12px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${f.detail}</p>
</div>
 `;
 });

 let evidenceHtml = '';
 diag.evidenceLineage.forEach(e =>{
 evidenceHtml += `<li style="margin-bottom: 4px;">${e}</li>`;
 });

 container.innerHTML = `
<div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-sm); margin-bottom: var(--space-md);">
<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Market Hiring Diagnosis</span>
<h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${diag.title}</h3>
</div>
<span class="wf-badge wf-badge-dark"style="font-size: 11px;">Recruiter Benchmark Shift</span>
</div>

<p style="font-size: 13px; color: var(--text-primary); line-height: 1.6; margin-bottom: var(--space-md); background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
 "${diag.summary}"
</p>

<div style="margin-bottom: var(--space-md);">
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 8px;">Recruiter Criteria Shift Factors</span>
 ${factorsHtml}
</div>

<div style="background: var(--bg-surface); border: 1px dashed var(--border-medium); padding: var(--space-md); border-radius: var(--radius-md);">
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 6px;">Market Data Evidence Lineage</span>
<ul style="font-size: 12px; color: var(--text-secondary); padding-left: 16px; margin: 0; line-height: 1.5;">
 ${evidenceHtml}
</ul>
</div>
 `;
}

// ============================================================================
// PREDICTIVE HIRING DEMAND FORECAST
// ============================================================================
function renderDemandForecast() {
 const container = document.getElementById('predictive-demand-container');
 if (!container) return;

 let html = '';
 mockHiringPerformanceData.predictiveForecast.forEach(f =>{
 const isGrowth = f.predictedDemand.includes('+');
 const badgeStyle = isGrowth ? 'wf-badge-dark' : 'wf-badge-outline';
 html += `
<div style="padding: var(--space-md); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 8px;">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
<strong style="font-size: 14px; color: var(--text-primary);">${f.domain}</strong>
<span class="wf-badge ${badgeStyle}">${f.predictedDemand}</span>
</div>
<div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
<span>Expected CTC:<strong>${f.expectedAvgCtc}</strong></span>
<span>Window:<strong>${f.hiringWindow}</strong></span>
</div>
<div style="font-size: 11px; font-weight: 600; color: var(--text-muted);">
 Suggested Strategy: ${f.strategy}
</div>
</div>
 `;
 });

 container.innerHTML = html;
}

// ============================================================================
// DEPARTMENT PERFORMANCE TABLE
// ============================================================================
function renderDepartmentTable() {
 const tbody = document.getElementById('department-performance-tbody');
 if (!tbody) return;

 let html = '';
 mockHiringPerformanceData.departments.forEach(item =>{
 html += `
<tr>
<td><strong style="font-size: 14px; color: var(--text-primary);">${item.dept}</strong></td>
<td>${item.totalStudents} students</td>
<td><strong>${item.placedCount}</strong>(${item.placementRate})</td>
<td><strong style="font-size: 13px; color: var(--text-primary);">${item.avgCtc}</strong></td>
<td>${item.highestCtc}</td>
<td><span style="font-size: 12px; font-weight: 500;">${item.topRecruiter}</span></td>
<td style="text-align: right;"><span class="wf-badge wf-badge-dark">${item.conversionIndex}</span></td>
</tr>
 `;
 });

 tbody.innerHTML = html;
}

// ============================================================================
// STRATEGIC RECOMMENDATIONS
// ============================================================================
function renderRecommendations() {
 const container = document.getElementById('ai-recommendations-list');
 if (!container) return;

 let html = '';
 mockHiringPerformanceData.aiRecommendations.forEach(rec =>{
 html += `
<div style="padding: var(--space-md); background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">
<strong style="font-size: 13px; color: var(--text-primary); display: block; margin-bottom: 4px;">${rec.title}</strong>
<p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4; margin-bottom: var(--space-sm);">${rec.desc}</p>
<button class="wf-btn wf-btn-xs wf-btn-primary"data-action="adopt-strategy"data-rec-title="${rec.title}">
 ${rec.actionText} →
</button>
</div>
 `;
 });

 container.innerHTML = html;

 container.querySelectorAll('[data-action="adopt-strategy"]').forEach(btn =>{
 btn.addEventListener('click', async () =>{
 const title = btn.getAttribute('data-rec-title');
 btn.disabled = true;
 btn.textContent = 'Provisioning...';
 await asyncSimulateApiCall(null, 800);
 btn.disabled = false;
 btn.textContent = 'Strategy Provisioned ✓';
 showToast(`Strategy Adopted: "${title}". Provisioned in Board Strategy Agenda.`, 'success');
 });
 });
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================
function initActionHandlers() {
  document.getElementById('btn-export-hiring-csv')?.addEventListener('click', () => {
    const csvContent = [
      "Metric,Value",
      "Total Drives Completed,42 Drives",
      "Placement Rate,92.4%",
      "Average Package,₹14.8 LPA",
      "Median Package,₹12.4 LPA",
      "Highest Package,₹32.0 LPA",
      "Top Hiring Partner,TechCorp AI (18 Offers)"
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Hiring_Performance_Analytics_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Hiring Performance Analytics to CSV.', 'success');
  });

  document.getElementById('btn-run-hiring-summary')?.addEventListener('click', () => {
    runAiHiringReportAssistant('Hiring Board Brief');
  });

  document.getElementById('btn-generate-board-brief')?.addEventListener('click', () => {
    runAiHiringReportAssistant('Hiring Board Brief');
  });

  document.getElementById('btn-gen-board-brief')?.addEventListener('click', () => {
    runAiHiringReportAssistant('Hiring Board Brief');
  });

  document.getElementById('btn-gen-hiring-summary')?.addEventListener('click', () => {
    runAiHiringReportAssistant('Hiring Executive Summary');
  });

  document.getElementById('btn-explain-hiring-trends')?.addEventListener('click', () => {
    runAiHiringReportAssistant('Recruiter Trend Breakdown');
  });

 document.getElementById('btn-export-board-package')?.addEventListener('click', () =>{
 const briefText = `
PLACEMENTHUB BOARD STRATEGY PACKAGE — HIRING PERFORMANCE ANALYTICS
==================================================================================
Date: ${new Date().toISOString().split('T')[0]}
Audience: Board of Governors, Deans & Placement Directorate
System Engine: PlacementHub Hiring Analytics BI & Copilot v3.4

1. INSTITUTIONAL HIRING METRICS & CTC DISTRIBUTION
----------------------------------------------------------------------------------
- Total Recruitment Drives Completed: 42 Drives
- Overall Institutional Placement Rate: 92.4%
- Mean Package: ₹14.8 LPA | Median Package: ₹12.4 LPA
- Super Dream Offer Peak: ₹32.0 LPA
- Top Partner: TechCorp AI (18 Accepted Offers)

2. SKILL SELECTION LIFT & RECRUITER DEMAND
----------------------------------------------------------------------------------
- PyTorch & Distributed Neural Training: +34.2% Selection Lift (Avg ₹18.5 LPA)
- System Architecture & Kubernetes: +28.4% Selection Lift (Avg ₹16.2 LPA)
- SQL & Relational Querying: High Baseline Demand across 100% of Drives

3. BOARD STRATEGY RECOMMENDATIONS
----------------------------------------------------------------------------------
- Mandate AI/ML and Distributed Computing lab electives for CSE/IT students.
- Initiate target recruiter outreach for FinTech & DeepTech sectors in Q4.
- Provision specialized interview bootcamps for Mechanical & Civil students.

==================================================================================
Signed: Hiring Performance Analytics Assistant (PlacementHub Enterprise v3.4)
==================================================================================
 `.trim();

 const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8;' });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.setAttribute('href', url);
 link.setAttribute('download', 'Board_Hiring_Performance_Strategy_Package_2026.txt');
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);

 showToast('Board Strategy Package downloaded successfully.', 'success');
 });
}
