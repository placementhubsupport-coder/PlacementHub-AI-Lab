/**
 * PlacementHub AI Solutions — Student Participation Analytics Controller (POC6)
 * Deterministic Analytics Dashboard Workspace (Layer 1) + AI Report Assistant Side Panel (Layer 2).
 */

import { mockStudentParticipationData } from'../data/mockData.js';
import { showToast, asyncSimulateApiCall } from'./components.js';

let isAnalyzing = false;

document.addEventListener('DOMContentLoaded', () => {
  console.log('[POC 6] Student Participation Analytics initialized');
 renderKpis();
 renderParticipationFunnel();
 renderPredictiveCohortTable();
 initActionHandlers();
});

// ============================================================================
// LAYER 1: DETERMINISTIC ANALYTICS DASHBOARD RENDER
// ============================================================================
function renderKpis() {
 const data = mockStudentParticipationData.kpis;
 document.getElementById('kpi-total-registered').textContent = data.totalRegistered;
 document.getElementById('kpi-assessment-rate').textContent = data.assessmentAttendanceRate;
 document.getElementById('kpi-interview-rate').textContent = data.interviewConversionRate;
 document.getElementById('kpi-acceptance-rate').textContent = data.offerAcceptanceRate;
 document.getElementById('kpi-ppo-count').textContent = data.ppoCount;
}

function renderParticipationFunnel() {
 const container = document.getElementById('participation-funnel-container');
 if (!container) return;

 const funnel = mockStudentParticipationData.funnel;

 let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
 funnel.forEach(stage =>{
 html += `
<div>
<div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
<span><strong style="color: var(--text-primary);">${stage.stage}</strong>(${stage.count} students)</span>
<span style="color: var(--text-muted); font-family: var(--font-mono);">${stage.conversion} Conversion</span>
</div>
<div style="width: 100%; height: 10px; background: var(--bg-muted); border-radius: 4px; overflow: hidden;">
<div style="height: 100%; width: ${stage.conversion}; background: var(--bg-dark-neutral);"></div>
</div>
</div>
 `;
 });
 html += '</div>';

 container.innerHTML = html;
}

function renderPredictiveCohortTable() {
 const tbody = document.getElementById('predictive-cohort-tbody');
 if (!tbody) return;

 const cohort = mockStudentParticipationData.predictiveCohort;

 let html = '';
 cohort.forEach(c =>{
 const badgeClass = c.riskScore >75 ? 'wf-badge-outline' : 'wf-badge-dark';
 html += `
<tr>
<td><strong style="font-size: 13px; color: var(--text-primary);">${c.name}</strong></td>
<td><span class="wf-badge wf-badge-dark">${c.department}</span></td>
<td><span style="font-size: 12px; font-family: var(--font-mono);">${c.cgpa}</span></td>
<td><span class="wf-badge ${badgeClass}">${c.riskScore}% Risk</span></td>
<td><span style="font-size: 12px; color: var(--text-secondary);">${c.predictedDropOffStage}</span></td>
<td><span style="font-size: 11px; color: var(--text-muted);">${c.rootCause}</span></td>
<td style="text-align: right;">
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Sent attendance nudge to ${c.name}')">Send Nudge →</button>
</td>
</tr>
 `;
 });

 tbody.innerHTML = html;
}

// ============================================================================
// LAYER 2: AI REPORT ASSISTANT WORKFLOW SIMULATION
// ============================================================================
async function runAiReportAssistant(reportType = 'Executive Summary') {
  console.log(`[POC 6] Generate Report button clicked: ${reportType}`);
 if (isAnalyzing) return;
 isAnalyzing = true;

 const stepperCard = document.getElementById('ai-stepper-card');
 const outputPanel = document.getElementById('ai-report-output-panel');
 const stepperList = document.getElementById('stepper-steps-list');
 const stepperTimer = document.getElementById('stepper-timer');
 const stepperTitle = document.getElementById('stepper-status-title');

 if (stepperCard) stepperCard.style.display = 'block';
 if (outputPanel) outputPanel.style.display = 'none';

 if (stepperTitle) stepperTitle.textContent = `Generating ${reportType}...`;
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 '⏳ Reading 420 participation records...',
 'Comparing previous semester attendance benchmarks...',
 'Detecting assessment drop-off anomalies (82 Mechanical students)...',
 '✓ Generating executive summary & committee recommendations (94% Confidence)'
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
<span class="wf-badge wf-badge-dark"style="font-size: 10px;">94% Confidence</span>
</div>

<div style="font-size: 12px; color: var(--text-primary); line-height: 1.5; margin-bottom: 8px;">
 • Overall batch participation increased by +11.2% YoY.<br>
 • Mechanical Engineering participation (58.4%) remains below institutional average.<br>
 • Coding assessments recorded lowest attendance due to exam collisions.<br>
 • PPO conversion improved from 14% to 19%.
</div>

<div style="background: var(--bg-muted); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 11px; margin-bottom: 8px;">
<strong>Recommended Actions:</strong>Conduct 3-day SQL bootcamp for ME students; issue make-up assessment tokens for ECE candidates.
</div>

<div style="font-size: 10px; color: var(--text-muted); margin-bottom: 8px;">
 Evidence: Participation Logs · Assessment Records · Placement Ledger
</div>

<div style="display: flex; gap: 4px; justify-content: flex-end;">
<button class="wf-btn wf-btn-xs wf-btn-secondary" onclick="PlacementHubToast('Copied report to clipboard.', 'success')">Copy</button>
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="document.getElementById('btn-generate-exec-brief').click()">Download Brief</button>
</div>
 `;
 }

 isAnalyzing = false;
 showToast(`AI Report Assistant generated ${reportType}.`, 'success');
}

// ============================================================================
// STRATEGIC AI QUERY CHIPS
// ============================================================================
function renderPresetQueryChips() {
 const container = document.getElementById('ai-query-chips');
 if (!container) return;

 let html = '';
 mockStudentParticipationData.presetQueries.forEach(q =>{
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
 runAiSteppedAnalysis(queryText);
 });
 });
}

// ============================================================================
// INTERACTIVE STEPPER WORKFLOW SIMULATION
// ============================================================================
async function runAiSteppedAnalysis(customQuery = '') {
 if (isAnalyzing) return;
 isAnalyzing = true;

 // UI state preparation
 const emptyState = document.getElementById('ai-empty-prompt-state');
 const stepperCard = document.getElementById('ai-stepper-card');
 const resultsWorkspace = document.getElementById('ai-results-workspace');
 const mainBtn = document.getElementById('btn-run-ai-audit');
 const submitBtn = document.getElementById('btn-submit-query');

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

 const stepperList = document.getElementById('stepper-steps-list');
 const stepperTimer = document.getElementById('stepper-timer');
 const stepperTitle = document.getElementById('stepper-status-title');

 if (stepperTitle) stepperTitle.textContent = customQuery ? `AI Reasoning Engine: "${customQuery}"` : 'AI Reasoning Engine Executing...';
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 '⏳ Ingesting 420 student attendance & registration records...',
 'Cross-referencing University Exam Controller timetable (ECE302 practicals)...',
 'Comparing 2026 ECE department baseline vs 2025 historical case logs...',
 'Isolating primary impact factor: Exam Schedule Collision (62% contribution)...',
 '⚠️ Identifying 3 predictive high-risk candidate disengagement cohorts...',
 'Synthesizing executive committee recommendations & audit brief...'
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
 await asyncSimulateApiCall(null, 350);
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
 if (stepperTitle) stepperTitle.textContent = `✓ AI Analysis Complete (${finalTime}s • 94% Confidence Score)`;

 await asyncSimulateApiCall(null, 200);

 // Render actual AI Canvas Data
 renderDiagnosticCanvas();
 renderPredictiveCohort();
 renderFunnel();
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
 mainBtn.textContent = 'Re-Run AI Diagnostic';
 }
 if (submitBtn) {
 submitBtn.disabled = false;
 submitBtn.textContent = 'Run AI Diagnosis';
 }

 isAnalyzing = false;
 showToast('AI Diagnostic Complete. Root-cause isolated with 94% confidence.', 'success');
}

// ============================================================================
// AI ROOT-CAUSE DIAGNOSTIC CANVAS
// ============================================================================
function renderDiagnosticCanvas() {
 const container = document.getElementById('ai-root-cause-canvas');
 if (!container) return;

 const diag = mockStudentParticipationData.activeDiagnostic;

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
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active AI Root-Cause Audit</span>
<h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${diag.title}</h3>
</div>
<span class="wf-badge wf-badge-dark"style="font-size: 11px;">Primary Cause: ${diag.primaryCause}</span>
</div>

<p style="font-size: 13px; color: var(--text-primary); line-height: 1.6; margin-bottom: var(--space-md); background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
 "${diag.summary}"
</p>

<div style="margin-bottom: var(--space-md);">
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 8px;">Decomposed Impact Factors</span>
 ${factorsHtml}
</div>

<div style="background: var(--bg-surface); border: 1px dashed var(--border-medium); padding: var(--space-md); border-radius: var(--radius-md);">
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 6px;">Audit Evidence Lineage</span>
<ul style="font-size: 12px; color: var(--text-secondary); padding-left: 16px; margin: 0; line-height: 1.5;">
 ${evidenceHtml}
</ul>
</div>
 `;
}

// ============================================================================
// PREDICTIVE DROP-OFF COHORT MATRIX
// ============================================================================
function renderPredictiveCohort() {
 const tbody = document.getElementById('predictive-cohort-tbody');
 if (!tbody) return;

 let html = '';
 mockStudentParticipationData.predictiveCohort.forEach(student =>{
 html += `
<tr>
<td>
<strong style="font-size: 13px; color: var(--text-primary); display: block;">${student.name}</strong>
<span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${student.rollNo}</span>
</td>
<td><span class="wf-badge wf-badge-outline">${student.department}</span></td>
<td><strong>${student.cgpa}</strong></td>
<td><span class="wf-badge wf-badge-dark">${student.riskScore}</span></td>
<td><span style="font-size: 12px; font-weight: 500;">${student.predictedStage}</span></td>
<td><span style="font-size: 11px; color: var(--text-secondary);">${student.rootCause}</span></td>
<td style="text-align: right;">
<button class="wf-btn wf-btn-xs wf-btn-primary"data-action="dispatch-intervention"data-student="${student.name}">Action →</button>
</td>
</tr>
 `;
 });

 tbody.innerHTML = html;

 tbody.querySelectorAll('[data-action="dispatch-intervention"]').forEach(btn =>{
 btn.addEventListener('click', () =>{
 const name = btn.getAttribute('data-student');
 showToast(`Intervention alert & remedial invitation dispatched to ${name}.`, 'success');
 });
 });
}

// ============================================================================
// SUPPORTING PARTICIPATION FUNNEL
// ============================================================================
function renderFunnel() {
 const container = document.getElementById('participation-funnel-container');
 if (!container) return;

 let html = '';
 mockStudentParticipationData.funnel.forEach((step, idx) =>{
 const widthPct = Math.max(15, parseFloat(step.percentage));
 html += `
<div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); padding: 8px 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-bottom: 6px;">
<div style="width: 160px; font-weight: 600; font-size: 12px; color: var(--text-primary);">
 ${idx + 1}. ${step.stage}
</div>
<div style="flex: 1; display: flex; align-items: center; gap: var(--space-sm);">
<div style="flex: 1; height: 20px; background: var(--bg-muted); border-radius: var(--radius-sm); overflow: hidden; position: relative;">
<div style="height: 100%; width: ${widthPct}%; background: var(--bg-dark-neutral); transition: width 0.3s ease;"></div>
</div>
<span style="font-family: var(--font-mono); font-weight: 700; font-size: 12px; min-width: 48px; text-align: right;">${step.count}</span>
</div>
<div style="font-size: 11px; color: var(--text-secondary); width: 110px; text-align: right;">
 ${step.percentage} ${step.drop !== '0%' ? `<span style="color: var(--text-muted);">(-${step.drop})</span>` : ''}
</div>
</div>
 `;
 });

 container.innerHTML = html;
}

// ============================================================================
// CLOSED-LOOP RECOMMENDATIONS
// ============================================================================
function renderRecommendations() {
 const container = document.getElementById('ai-recommendations-list');
 if (!container) return;

 let html = '';
 mockStudentParticipationData.aiRecommendations.forEach(rec =>{
 html += `
<div style="padding: var(--space-md); background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">
<strong style="font-size: 13px; color: var(--text-primary); display: block; margin-bottom: 4px;">${rec.title}</strong>
<p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4; margin-bottom: var(--space-sm);">${rec.desc}</p>
<button class="wf-btn wf-btn-xs wf-btn-primary"data-action="execute-recommendation"data-rec-title="${rec.title}">
 ${rec.actionText} →
</button>
</div>
 `;
 });

 container.innerHTML = html;

 container.querySelectorAll('[data-action="execute-recommendation"]').forEach(btn =>{
 btn.addEventListener('click', async () =>{
 const title = btn.getAttribute('data-rec-title');
 btn.disabled = true;
 btn.textContent = 'Executing...';
 await asyncSimulateApiCall(null, 800);
 btn.disabled = false;
 btn.textContent = 'Action Executed ✓';
 showToast(`Action Executed: "${title}". Confirmation logged in TPO Audit Log.`, 'success');
 });
 });
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================
function initActionHandlers() {
 document.getElementById('btn-run-ai-diagnostic')?.addEventListener('click', () =>{
 runSteppedDiagnosticWorkflow();
  document.getElementById('btn-export-participation-csv')?.addEventListener('click', () => {
    const csvContent = [
      "Department,Total Registered,OA Attendance %,Interview Conversion %,Offer Acceptance %,PPOs",
      "CSE,160,98.2%,74.5%,92.1%,18",
      "IT,120,95.0%,70.0%,88.5%,10",
      "ECE,80,91.2%,62.5%,84.0%,4",
      "ME,60,58.4%,42.0%,78.0%,2"
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Student_Participation_Analytics_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Student Participation Analytics to CSV.', 'success');
  });

  document.getElementById('btn-run-ai-summary')?.addEventListener('click', () => {
    runAiReportAssistant('Executive Summary');
  });

  document.getElementById('btn-gen-exec-summary')?.addEventListener('click', () => {
    runAiReportAssistant('Executive Summary');
  });

  document.getElementById('btn-explain-trends')?.addEventListener('click', () => {
    runAiReportAssistant('Participation Trend Breakdown');
  });

  document.getElementById('btn-recommend-actions')?.addEventListener('click', () => {
    runAiReportAssistant('Committee Action Recommendations');
  });

  document.getElementById('btn-run-ai-audit')?.addEventListener('click', () => {
    runAiSteppedAnalysis();
  });

  document.getElementById('btn-trigger-empty-state')?.addEventListener('click', () => {
    runAiSteppedAnalysis();
  });

  document.getElementById('btn-submit-query')?.addEventListener('click', () => {
    const input = document.getElementById('ai-query-input');
    const text = input?.value.trim();
    runAiSteppedAnalysis(text);
  });

  document.getElementById('btn-generate-exec-brief')?.addEventListener('click', () => {
    const briefText = `
PLACEMENTHUB EXECUTIVE COMMITTEE BRIEF — STUDENT PARTICIPATION ANALYTICS
==================================================================================
Date: ${new Date().toISOString().split('T')[0]}
Audience: Placement Committee, Dean of Academic Affairs & TPO Cell
System Engine: PlacementHub Participation Analytics BI & Copilot v3.4

1. EXECUTIVE SUMMARY & BENCHMARKS
----------------------------------------------------------------------------------
- Overall Graduating Class: 420 Students
- Online Assessment Attendance Rate: 94.2%
- Interview Conversion Rate: 68.5%
- Offer Acceptance Rate: 88.4%
- Total Pre-Placement Offers (PPOs): 34 Candidates

2. PARTICIPATION TREND FINDINGS
----------------------------------------------------------------------------------
- Overall participation increased by +11.2% YoY across CS/IT/ECE batches.
- Mechanical Engineering participation (58.4%) remains below institutional cutoff.
- 82 Mechanical candidates missed core coding assessments due to unscheduled exams.
- Mock interview participation correlated directly with +24% higher offer conversion.

3. COMMITTEE RECOMMENDATIONS
----------------------------------------------------------------------------------
- Conduct 3-day SQL & Relational Database bootcamp for Mechanical candidates.
- Provision 24-hour make-up assessment window backed by DataScale HR.
- Increase mock technical interview capacity by +30%.

==================================================================================
Signed: Student Participation Analytics Assistant (PlacementHub Enterprise v3.4)
==================================================================================
    `.trim();

    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Committee_Participation_Diagnostic_Report_2026.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Executive Committee Brief downloaded successfully.', 'success');
  });
}
