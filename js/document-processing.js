/**
 * PlacementHub AI Solutions — AI Document Processing Controller (POC9)
 * Controls Document Intelligence Workspace, Stepped Reasoning Stepper, Entity Extractions,
 * Validation Matrix, Split-Screen Document Comparison, Duplicate Vector Detection,
 * Missing Document Verification Checklist, and Executive Audit Report Exporter.
 */

import {
 mockDocuments,
 mockResumeExtraction,
 mockMarksheetExtraction,
 mockCertificates,
 mockOfferLetters,
 mockValidationResults,
 mockDuplicateResults,
 mockDocumentRecommendations
} from'../data/mockData.js';
import { showToast, asyncSimulateApiCall } from'./components.js';

let activeDocs = [...mockDocuments];
let selectedDocIds = new Set();
let isProcessing = false;

document.addEventListener('DOMContentLoaded', () => {
 console.log('[POC 9] Document Processing initialized');
 initActionHandlers();
 initTableFilters();
});

// ============================================================================
// INTERACTIVE AI STEPPER WORKFLOW SIMULATION
// ============================================================================
async function runDocumentIntelligenceWorkflow(customQuery = '') {
 console.log('[POC 9] Run Document Intelligence button clicked');
 if (isProcessing) return;
 isProcessing = true;

 const emptyState = document.getElementById('doc-empty-state');
 const stepperCard = document.getElementById('doc-stepper-card');
 const resultsWorkspace = document.getElementById('doc-results-workspace');
 const mainBtn = document.getElementById('btn-run-doc-intelligence');

 if (emptyState) emptyState.style.display = 'none';
 if (resultsWorkspace) {
 resultsWorkspace.style.display = 'none';
 resultsWorkspace.style.opacity = '0';
 }

 if (stepperCard) stepperCard.style.display = 'block';

 if (mainBtn) {
 mainBtn.disabled = true;
 mainBtn.textContent = 'Processing Intelligence...';
 }

 const stepperList = document.getElementById('doc-stepper-steps-list');
 const stepperTimer = document.getElementById('doc-stepper-timer');
 const stepperTitle = document.getElementById('doc-stepper-status-title');

 if (stepperTitle) stepperTitle.textContent = customQuery ? `AI Document Intelligence: "${customQuery}"` : 'Initializing Document Intelligence Engine v3.4...';
 if (stepperList) stepperList.innerHTML = '';

 const steps = [
 '⏳ Initializing Document Intelligence Engine v3.4...',
 'Ingesting 6 uploaded document artifacts (PDF & Image layout)...',
 'Extracting structured entity schemas, key-value pairs, and marksheets...',
 'Executing layout detection & neural OCR text extractions...',
 'Matching extracted entities against PlacementHub database & university ledger...',
 'Checking vector duplicate hashes (98% match detected for Resume_v3.pdf)...',
 'Validating expiration dates & compliance rules (AWS Certificate Expired)...',
 '✓ Document Intelligence Processing Complete (8/9 Verified • 94% Confidence)'
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
 if (stepperTitle) stepperTitle.textContent = `✓ Document Intelligence Complete (${finalTime}s • 94% Confidence Score)`;

 await asyncSimulateApiCall(null, 200);

 // Render analytical sections
 renderDocumentQueueTable();
 renderExecutiveSummary();
 renderExtractionResults();
 renderValidationCenter();
 renderDocumentComparison();
 renderDuplicateDetection();
 renderMissingDocumentChecklist();
 renderDocumentRecommendations();

 // Reveal results workspace
 if (resultsWorkspace) {
 resultsWorkspace.style.display = 'block';
 requestAnimationFrame(() =>{
 resultsWorkspace.style.opacity = '1';
 });
 }

 if (mainBtn) {
 mainBtn.disabled = false;
 mainBtn.textContent = 'Re-Run Document Intelligence';
 }

 isProcessing = false;
 showToast('Document Intelligence Audit Complete. 8/9 documents verified.', 'success');
}

// ============================================================================
// SECTION 1 & 10: DOCUMENT QUEUE TABLE & BULK ACTIONS
// ============================================================================
function initTableFilters() {
 const searchInput = document.getElementById('doc-search-input');
 const typeSelect = document.getElementById('doc-type-filter');
 const statusSelect = document.getElementById('doc-status-filter');
 const selectAll = document.getElementById('select-all-docs');

 const applyFilters = () =>{
 const q = searchInput?.value.trim().toLowerCase() || '';
 const type = typeSelect?.value || 'ALL';
 const status = statusSelect?.value || 'ALL';

 activeDocs = mockDocuments.filter(d =>{
 const matchQ = d.name.toLowerCase().includes(q) || d.candidate.toLowerCase().includes(q);
 const matchT = type === 'ALL' || d.type === type;
 const matchS = status === 'ALL' || d.status === status;
 return matchQ && matchT && matchS;
 });

 renderDocumentQueueTable();
 };

 if (searchInput) searchInput.addEventListener('input', applyFilters);
 if (typeSelect) typeSelect.addEventListener('change', applyFilters);
 if (statusSelect) statusSelect.addEventListener('change', applyFilters);

 if (selectAll) {
 selectAll.addEventListener('change', (e) =>{
 if (e.target.checked) {
 activeDocs.forEach(d =>selectedDocIds.add(d.id));
 } else {
 selectedDocIds.clear();
 }
 renderDocumentQueueTable();
 });
 }
}

function renderDocumentQueueTable() {
 const tbody = document.getElementById('doc-queue-tbody');
 const bulkBar = document.getElementById('doc-bulk-toolbar');
 const countLabel = document.getElementById('doc-bulk-count');

 if (!tbody) return;

 if (bulkBar && countLabel) {
 if (selectedDocIds.size >0) {
 bulkBar.style.display = 'flex';
 countLabel.textContent = `${selectedDocIds.size} document${selectedDocIds.size >1 ? 's' : ''} selected`;
 } else {
 bulkBar.style.display = 'none';
 }
 }

 if (activeDocs.length === 0) {
 tbody.innerHTML = `
<tr>
<td colspan="7"style="text-align: center; padding: 24px; color: var(--text-muted);">
 No documents match the selected query or filters.
</td>
</tr>
 `;
 return;
 }

 let html = '';
 activeDocs.forEach(doc =>{
 const isChecked = selectedDocIds.has(doc.id) ? 'checked' : '';
 const badgeClass = doc.status === 'Verified' ? 'wf-badge-dark' :
 doc.status === 'Flagged' ? 'wf-badge-outline' : 'wf-badge-outline';

 html += `
<tr>
<td style="width: 36px;"><input type="checkbox"class="doc-row-checkbox"data-id="${doc.id}" ${isChecked}></td>
<td>
<strong style="font-size: 13px; color: var(--text-primary); display: block;">${doc.name}</strong>
<span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${doc.size}</span>
</td>
<td><span class="wf-badge wf-badge-dark">${doc.type}</span></td>
<td><span style="font-size: 12px; color: var(--text-secondary);">${doc.candidate} (${doc.rollNo})</span></td>
<td><span class="wf-badge ${badgeClass}">${doc.status}</span></td>
<td><span style="font-size: 11px; color: var(--text-muted);">${doc.confidence}</span></td>
<td style="text-align: right;">
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Viewing extracted entity details for ${doc.name}')">View Extraction →</button>
</td>
</tr>
 `;
 });

 tbody.innerHTML = html;

 tbody.querySelectorAll('.doc-row-checkbox').forEach(cb =>{
 cb.addEventListener('change', (e) =>{
 const id = e.target.getAttribute('data-id');
 if (e.target.checked) selectedDocIds.add(id);
 else selectedDocIds.delete(id);
 renderDocumentQueueTable();
 });
 });
}

// ============================================================================
// SECTION 8: EXECUTIVE AI SUMMARY HERO CARD
// ============================================================================
function renderExecutiveSummary() {
 const container = document.getElementById('section-doc-exec-summary');
 if (!container) return;

 container.innerHTML = `
<div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-md); margin-bottom: var(--space-md);">
<div>
<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Executive Document Intelligence Summary</span>
<h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary); margin-top: 2px;">Candidate Verification Readiness: 91%</h2>
</div>
<div style="display: flex; gap: var(--space-md); text-align: right;">
<div>
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Verified Docs</span>
<div style="font-size: 24px; font-weight: 800; color: var(--text-primary);">8 / 9</div>
</div>
<div>
<span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Confidence</span>
<div style="font-size: 24px; font-weight: 800; color: var(--text-primary);">94%</div>
</div>
</div>
</div>

<ul style="font-size: 13px; color: var(--text-primary); line-height: 1.6; padding-left: 0; list-style: none; margin-bottom: var(--space-md);">
<li>• Resume complete & cross-verified with university blockchain academic ledger (CGPA 9.4/10.0).</li>
<li>• TechCorp Offer Letter verified with employer HR API (₹18.5 LPA Fixed + Bonus).</li>
<li>• ⚠ Identity Proof incomplete: PAN card verified, but Government Aadhaar is missing.</li>
<li>• ⚠ AWS Certified Developer Associate certificate expired 2 months ago (Nov 2025).</li>
</ul>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
<div>
<strong style="font-size: 12px; color: var(--text-primary); text-transform: uppercase; display: block; margin-bottom: 4px;">Primary Finding</strong>
<p style="font-size: 12px; color: var(--text-secondary); margin: 0; line-height: 1.4;">Candidate profile is 91% verified. Resolving missing Aadhaar will grant 100% onboarding clearance.</p>
</div>
<div>
<strong style="font-size: 12px; color: var(--text-primary); text-transform: uppercase; display: block; margin-bottom: 4px;">Compliance Clearance Status</strong>
<p style="font-size: 12px; color: var(--text-secondary); margin: 0; line-height: 1.4;">Conditional Clearance Issued (Action required: Request Aadhaar upload).</p>
</div>
</div>
 `;
}

// ============================================================================
// SECTION 3: AI EXTRACTION RESULTS CARDS
// ============================================================================
function renderExtractionResults() {
 const container = document.getElementById('section-extraction-results');
 if (!container) return;

 const res = mockResumeExtraction;
 const mark = mockMarksheetExtraction;
 const off = mockOfferLetters;

 container.innerHTML = `
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md);">
 
<!-- Resume Extraction Card -->
<div class="wf-card"style="padding: var(--space-md);">
<div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px; margin-bottom: 8px;">
<strong style="font-size: 14px; color: var(--text-primary);">Extracted Resume Schema</strong>
<span class="wf-badge wf-badge-dark">Confidence 96%</span>
</div>
<div style="font-size: 12px; display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
<div>Candidate:<strong style="color: var(--text-primary);">${res.candidateName}</strong></div>
<div>Contact:<strong>${res.email} · ${res.phone}</strong></div>
<div>Education:<strong>${res.education}</strong></div>
<div>Extracted CGPA:<strong>${res.cgpa}</strong></div>
<div>Key Skills:<strong>${res.skills.slice(0, 5).join(', ')}</strong></div>
<div>Internship:<strong>${res.experience}</strong></div>
</div>
</div>

<!-- Marksheet Extraction Card -->
<div class="wf-card"style="padding: var(--space-md);">
<div style="display: flex; align-items: justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px; margin-bottom: 8px;">
<strong style="font-size: 14px; color: var(--text-primary);">Extracted Marksheet Ledger</strong>
<span class="wf-badge wf-badge-dark">Confidence 98%</span>
</div>
<div style="font-size: 12px; display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
<div>University:<strong>${mark.university}</strong></div>
<div>Degree / Sem:<strong>${mark.degree} (${mark.semester})</strong></div>
<div>Cumulative CGPA:<strong style="color: var(--text-primary);">${mark.cgpa}</strong>(SGPA ${mark.sgpa})</div>
<div>Credits Cleared:<strong>${mark.totalCredits}</strong></div>
<div>Active Backlogs:<strong>${mark.backlogs} Backlogs</strong></div>
<div>Ledger Verification:<span class="wf-badge wf-badge-dark"style="font-size: 10px;">${mark.verificationStatus}</span></div>
</div>
</div>

<!-- Offer Letter Extraction Card -->
<div class="wf-card"style="padding: var(--space-md);">
<div style="display: flex; align-items: justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px; margin-bottom: 8px;">
<strong style="font-size: 14px; color: var(--text-primary);">💼 Extracted Offer Letter</strong>
<span class="wf-badge wf-badge-dark">Confidence 99%</span>
</div>
<div style="font-size: 12px; display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
<div>Recruiter:<strong style="color: var(--text-primary);">${off.company}</strong></div>
<div>Target Role:<strong>${off.role}</strong></div>
<div>Confirmed Package:<strong>${off.package}</strong></div>
<div>Joining Date:<strong>${off.joiningDate}</strong></div>
<div>Job Location:<strong>${off.location}</strong></div>
<div>HR Verification:<span class="wf-badge wf-badge-dark"style="font-size: 10px;">${off.verification}</span></div>
</div>
</div>

</div>
 `;
}

// ============================================================================
// SECTION 4: AI VALIDATION CENTER MATRIX
// ============================================================================
function renderValidationCenter() {
 const tbody = document.getElementById('validation-matrix-tbody');
 if (!tbody) return;

 let html = '';
 mockValidationResults.forEach(v =>{
 html += `
<tr>
<td><strong style="font-size: 13px; color: var(--text-primary);">${v.item}</strong></td>
<td><span style="font-size: 12px; font-family: var(--font-mono);">${v.extracted}</span></td>
<td><span style="font-size: 12px; color: var(--text-secondary);">${v.ledger}</span></td>
<td style="text-align: right;"><span class="wf-badge ${v.statusBadge}">${v.status}</span></td>
</tr>
 `;
 });

 tbody.innerHTML = html;
}

// ============================================================================
// SECTION 5: SPLIT-SCREEN DOCUMENT COMPARISON
// ============================================================================
function renderDocumentComparison() {
 const container = document.getElementById('section-doc-comparison');
 if (!container) return;

 container.innerHTML = `
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
 
<!-- Resume vs Job Description Split -->
<div class="wf-card"style="padding: var(--space-md); background: var(--bg-surface);">
<div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
<strong style="font-size: 13px; color: var(--text-primary);">Resume vs Job Description Comparison</strong>
<span class="wf-badge wf-badge-dark">96.4% Match</span>
</div>
<div style="font-size: 12px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
<div>Source Resume:<strong>Arjun_Verma_Resume_Final.pdf</strong></div>
<div>Target JD:<strong>TechCorp_AI_Research_JD.pdf</strong></div>
<div style="background: var(--bg-muted); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
<div>✓ Matched Skills:<strong>Python, PyTorch, Transformers, CUDA, Docker</strong></div>
<div>⚠ Missing Requirements:<strong>Kubernetes cluster, TensorRT-LLM</strong></div>
</div>
<div>AI Recommendation:<strong>Candidate exceeds 90% cutoff threshold. Approved for technical interview.</strong></div>
</div>
</div>

<!-- Offer Letter vs Placement Drive Split -->
<div class="wf-card"style="padding: var(--space-md); background: var(--bg-surface);">
<div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
<strong style="font-size: 13px; color: var(--text-primary);">Offer Letter vs Drive Terms Comparison</strong>
<span class="wf-badge wf-badge-dark">100% Contract Match</span>
</div>
<div style="font-size: 12px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
<div>Source Document:<strong>TechCorp_Offer_Letter_2026.pdf</strong></div>
<div>Drive Record:<strong>TechCorp AI Labs Drive (CORP-902)</strong></div>
<div style="background: var(--bg-muted); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
<div>✓ Package Alignment:<strong>Extracted ₹18.5 LPA matches Drive Approved CTC</strong></div>
<div>✓ Joining Date:<strong>July 1, 2026 matches academic clearance window</strong></div>
</div>
<div>AI Recommendation:<strong>Offer letter verified and locked in institutional placement ledger.</strong></div>
</div>
</div>

</div>
 `;
}

// ============================================================================
// SECTION 6: DUPLICATE DETECTION
// ============================================================================
function renderDuplicateDetection() {
 const container = document.getElementById('section-duplicate-detection');
 if (!container) return;

 const d = mockDuplicateResults[0];

 container.innerHTML = `
<div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-muted); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
<div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="font-size: 16px;"></span>
<strong style="font-size: 14px; color: var(--text-primary);">Neural Vector Duplicate Detection</strong>
<span class="wf-badge wf-badge-dark">${d.similarity}</span>
</div>
<div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
 Conflict Identified:<strong>${d.fileA}</strong>vs<strong>${d.fileB}</strong>
</div>
<div style="font-size: 12px; color: var(--text-primary); margin-top: 2px;">
<strong>AI Resolution:</strong>${d.resolution}
</div>
</div>
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Archived duplicate file ${d.fileB}.')">Archive Duplicate</button>
</div>
 `;
}

// ============================================================================
// SECTION 7: MISSING DOCUMENTS CHECKLIST
// ============================================================================
function renderMissingDocumentChecklist() {
 const container = document.getElementById('section-missing-checklist');
 if (!container) return;

 container.innerHTML = `
<div class="wf-card"style="padding: var(--space-md);">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
<strong style="font-size: 14px; color: var(--text-primary);">Candidate Onboarding Compliance Checklist</strong>
<span class="wf-badge wf-badge-dark">8 / 9 Verified (88% Complete)</span>
</div>

<div style="width: 100%; height: 8px; background: var(--bg-muted); border-radius: 4px; overflow: hidden; margin-bottom: var(--space-md);">
<div style="height: 100%; width: 88%; background: var(--bg-dark-neutral);"></div>
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-sm); font-size: 12px;">
<div style="padding: 6px 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">✓ Student Resume (Final.pdf)</div>
<div style="padding: 6px 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">✓ Semester 7 Marksheet</div>
<div style="padding: 6px 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">✓ Permanent Account Number (PAN)</div>
<div style="padding: 6px 10px; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-sm); color: var(--text-muted);">× Government Aadhaar Proof (Missing)</div>
<div style="padding: 6px 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">✓ TechCorp Offer Letter</div>
<div style="padding: 6px 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">✓ TensorFlow Certificate</div>
</div>
</div>
 `;
}

// ============================================================================
// SECTION 9: ENTERPRISE RECOMMENDATIONS
// ============================================================================
function renderDocumentRecommendations() {
 const container = document.getElementById('doc-recommendations-list');
 if (!container) return;

 let html = '';
 mockDocumentRecommendations.forEach(rec =>{
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
<button class="wf-btn wf-btn-xs wf-btn-secondary"onclick="alert('Marked as exception for ${rec.title}')">${rec.secondaryAction}</button>
<button class="wf-btn wf-btn-xs wf-btn-primary"onclick="alert('Executed action: ${rec.primaryAction}')">${rec.primaryAction}</button>
</div>
</div>
 `;
 });

 container.innerHTML = html;
}

// ============================================================================
// ACTION HANDLERS & VERIFICATION REPORT EXPORTER
// ============================================================================
function initActionHandlers() {
 document.getElementById('btn-run-doc-intelligence')?.addEventListener('click', () =>{
 runDocumentIntelligenceWorkflow();
 });

 document.getElementById('btn-trigger-doc-empty-state')?.addEventListener('click', () =>{
 runDocumentIntelligenceWorkflow();
 });

 document.getElementById('btn-submit-doc-query')?.addEventListener('click', () =>{
 const input = document.getElementById('doc-query-input');
 const text = input?.value.trim();
 runDocumentIntelligenceWorkflow(text);
 });

 document.getElementById('btn-download-verification-report')?.addEventListener('click', () =>{
 const reportText = `
PLACEMENTHUB AI ANALYST — EXECUTIVE DOCUMENT INTELLIGENCE VERIFICATION REPORT
==================================================================================
Date: ${new Date().toISOString().split('T')[0]}
Audience: Placement Operations Office, Academic Registrar & HR Verification
System Engine: PlacementHub AI Document Intelligence Engine v3.4

1. EXECUTIVE COMPLIANCE SUMMARY
----------------------------------------------------------------------------------
Candidate: Arjun Verma (2022CSE042)
Verification Readiness: 91%
Total Documents Processed: 6 Artifacts (8 / 9 Checklist Items Cleared)
Engine Confidence Rating: 94%

Key Findings:
- Resume complete and cross-verified with university blockchain ledger.
- Offer letter verified with TechCorp HR System API (₹18.5 LPA Fixed + Bonus).
- ⚠ Identity Proof missing: Aadhaar document upload required.
- ⚠ AWS Developer Associate certificate expired 2 months ago (Nov 2025).

2. EXTRACTED DOCUMENT SCHEMAS
----------------------------------------------------------------------------------
Resume: Arjun Verma | CGPA 9.4/10.0 | TechCorp Intern
Marksheet: Semester 7 B.Tech CSE | 182 Credits Cleared | 0 Backlogs
Offer Letter: TechCorp AI Labs | AI Research Engineer | ₹18.5 LPA | Join: July 1, 2026

3. VALIDATION MATRIX RESULTS
----------------------------------------------------------------------------------
${mockValidationResults.map(v =>`- ${v.item}: Extracted"${v.extracted}"vs Ledger"${v.ledger}" ->Status: ${v.status}`).join('\n')}

4. NEURAL DUPLICATE DETECTION LOG
----------------------------------------------------------------------------------
- Conflict: Arjun_Verma_Resume_Final.pdf vs Arjun_Verma_Resume_v3.pdf
- Similarity Score: 98% Vector Match
- Resolution: Kept Resume_Final.pdf as primary; archived v3.pdf.

5. ACTIONABLE COMPLIANCE RECOMMENDATIONS
----------------------------------------------------------------------------------
${mockDocumentRecommendations.map(r =>`- ${r.title} [Confidence ${r.confidence}]: ${r.problem} ->Action: ${r.primaryAction}`).join('\n')}

==================================================================================
Signed: AI Document Intelligence Engine (PlacementHub Enterprise v3.4)
==================================================================================
 `.trim();

 const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.setAttribute('href', url);
 link.setAttribute('download', 'Executive_Document_Intelligence_Verification_Report_2026.txt');
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);

 showToast('Executive Document Intelligence Verification Report downloaded.', 'success');
 });
}
