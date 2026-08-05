/**
 * PlacementHub AI Lab — Resume Review Interactive Controller
 * Handles resume selection, target role ATS score recalculation, AI phrasing suggestions (Apply, Copy, Dismiss),
 * resume upload simulation, and report download/export features.
 */

import { mockResumes, mockCandidates } from '../data/mockData.js';
import { showToast, openModal, closeModal, showLoadingOverlay, hideLoadingOverlay, asyncSimulateApiCall } from './components.js';

// Controller State
let resumes = JSON.parse(JSON.stringify(mockResumes));
let selectedResumeId = 'res-1';
let currentTargetRole = 'TechCorp — AI Research Engineer';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initTargetRoleSelector();
  initUploadModal();
  initReportActions();
  renderResumeList();
  renderReviewPanel();
});

// ============================================================================
// 1. SEARCH & FILTERS
// ============================================================================
function initSearch() {
  const searchInput = document.getElementById('resume-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderResumeList();
    });
  }
}

function getFilteredResumes() {
  return resumes.filter(r => {
    const cand = mockCandidates.find(c => c.id === r.candidateId);
    const candName = cand ? cand.name.toLowerCase() : '';
    const fileName = r.fileName.toLowerCase();

    return !searchQuery || candName.includes(searchQuery) || fileName.includes(searchQuery);
  });
}

// ============================================================================
// 2. RESUME LIST RENDERING
// ============================================================================
function renderResumeList() {
  const container = document.getElementById('resume-list-container');
  const footerText = document.getElementById('resume-list-footer-text');
  const emptyCard = document.getElementById('empty-resume-list-card');

  if (!container) return;

  const filtered = getFilteredResumes();

  if (footerText) {
    footerText.textContent = `${filtered.length} resume${filtered.length !== 1 ? 's' : ''} · ${selectedResumeId ? '1' : '0'} selected`;
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyCard) emptyCard.style.display = 'block';
    return;
  }

  if (emptyCard) emptyCard.style.display = 'none';

  container.innerHTML = filtered.map((r, idx) => {
    const isSelected = r.id === selectedResumeId;
    const itemClass = isSelected ? 'wf-list-item-active' : 'wf-list-item-normal';
    const borderStyle = idx < filtered.length - 1 ? 'border-bottom: 1px solid var(--border-subtle);' : '';

    if (isSelected) {
      return `
        <div class="wf-list-item-active" data-id="${r.id}">
          <div style="font-size: 13px; font-weight: 600;">${r.fileName}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${r.uploadTime} · ${r.size}</div>
          <div style="margin-top: 6px;"><span class="wf-badge wf-badge-dark" style="font-size: 9px;">Score ${r.overallScore}/100</span></div>
        </div>
      `;
    } else {
      return `
        <div style="padding: 10px 12px; ${borderStyle} cursor: pointer;" class="wf-resume-item-row" data-id="${r.id}">
          <div style="font-size: 13px; font-weight: 500;">${r.fileName}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${r.uploadTime} · ${r.size}</div>
          <div style="margin-top: 4px;"><span class="wf-badge wf-badge-outline" style="font-size: 9px;">Score ${r.overallScore}/100</span></div>
        </div>
      `;
    }
  }).join('');

  // Attach click events
  container.querySelectorAll('[data-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-id');
      selectedResumeId = id;
      renderResumeList();
      renderReviewPanel();
    });
  });
}

// ============================================================================
// 3. TARGET ROLE SELECTOR ("Compare against")
// ============================================================================
function initTargetRoleSelector() {
  const select = document.getElementById('compare-target-select');
  if (select) {
    select.addEventListener('change', async (e) => {
      currentTargetRole = e.target.value;
      const rightPane = document.getElementById('right-review-pane');

      if (rightPane) {
        showLoadingOverlay(rightPane, `Recalculating ATS score vs ${currentTargetRole.split(' — ')[0]}...`);
        await asyncSimulateApiCall(null, 1000);
        hideLoadingOverlay(rightPane);
      }

      // Recalculate score for active resume based on role alignment
      const activeRes = resumes.find(r => r.id === selectedResumeId);
      if (activeRes) {
        activeRes.targetRole = currentTargetRole;
        if (currentTargetRole.includes('Full Stack')) {
          activeRes.keywordMatch = 89;
          activeRes.overallScore = 90;
          activeRes.missingKeywords = ['Redis', 'Docker', 'GraphQL'];
        } else if (currentTargetRole.includes('Backend')) {
          activeRes.keywordMatch = 85;
          activeRes.overallScore = 87;
          activeRes.missingKeywords = ['Kafka', 'Airflow', 'Kubernetes'];
        } else {
          activeRes.keywordMatch = 95;
          activeRes.overallScore = 94;
          activeRes.missingKeywords = ['TensorRT-LLM', 'Kubernetes', 'Triton'];
        }
      }

      renderResumeList();
      renderReviewPanel();
      showToast(`ATS analysis updated for ${currentTargetRole.split(' — ')[0]}.`, 'info');
    });
  }
}

// ============================================================================
// 4. REVIEW PANEL RENDERING
// ============================================================================
function renderReviewPanel() {
  const activeRes = resumes.find(r => r.id === selectedResumeId);
  const emptyState = document.getElementById('empty-review-state-card');
  const activeHeader = document.getElementById('active-candidate-header-card');
  const scoreMetricsSec = document.getElementById('score-metrics');
  const skillsSec = document.getElementById('skills');
  const suggestionsSec = document.getElementById('suggestions');

  if (!activeRes) {
    if (emptyState) emptyState.style.display = 'block';
    if (activeHeader) activeHeader.style.display = 'none';
    if (scoreMetricsSec) scoreMetricsSec.style.display = 'none';
    if (skillsSec) skillsSec.style.display = 'none';
    if (suggestionsSec) suggestionsSec.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (activeHeader) activeHeader.style.display = 'block';
  if (scoreMetricsSec) scoreMetricsSec.style.display = 'grid';
  if (skillsSec) skillsSec.style.display = 'grid';
  if (suggestionsSec) suggestionsSec.style.display = 'flex';

  const cand = mockCandidates.find(c => c.id === activeRes.candidateId);
  const candName = cand ? cand.name : activeRes.fileName.replace(/_/g, ' ').replace('.pdf', '').replace('.docx', '');

  // Header Elements
  const nameHeader = document.getElementById('cand-name-header');
  const targetHeader = document.getElementById('cand-target-header');
  const scoreHeader = document.getElementById('cand-score-header');

  if (nameHeader) nameHeader.textContent = candName;
  if (targetHeader) targetHeader.textContent = `vs ${activeRes.targetRole}`;
  if (scoreHeader) scoreHeader.textContent = `${activeRes.overallScore} / 100`;

  // Score Metrics Grid
  const overallVal = document.getElementById('metric-overall-val');
  const overallBar = document.getElementById('metric-overall-bar');
  const keywordVal = document.getElementById('metric-keyword-val');
  const keywordBar = document.getElementById('metric-keyword-bar');
  const formatVal = document.getElementById('metric-format-val');
  const formatBar = document.getElementById('metric-format-bar');
  const expVal = document.getElementById('metric-exp-val');
  const expBar = document.getElementById('metric-exp-bar');

  if (overallVal) overallVal.textContent = activeRes.overallScore;
  if (overallBar) overallBar.style.width = `${activeRes.overallScore}%`;

  if (keywordVal) keywordVal.textContent = `${activeRes.keywordMatch}%`;
  if (keywordBar) keywordBar.style.width = `${activeRes.keywordMatch}%`;

  if (formatVal) formatVal.textContent = `${activeRes.formatScore}%`;
  if (formatBar) formatBar.style.width = `${activeRes.formatScore}%`;

  if (expVal) expVal.textContent = `${activeRes.experienceDetail}%`;
  if (expBar) expBar.style.width = `${activeRes.experienceDetail}%`;

  // Skills Panel
  const foundCount = document.getElementById('skills-found-count');
  const foundContainer = document.getElementById('skills-found-container');
  const missingCount = document.getElementById('missing-keywords-count');
  const missingContainer = document.getElementById('missing-keywords-container');

  if (foundCount) foundCount.textContent = `${activeRes.skillsFound.length} detected`;
  if (foundContainer) {
    foundContainer.innerHTML = activeRes.skillsFound.map(s => `<span class="wf-badge">✓ ${s}</span>`).join('');
  }

  if (missingCount) missingCount.textContent = `${activeRes.missingKeywords.length} not found`;
  if (missingContainer) {
    missingContainer.innerHTML = activeRes.missingKeywords.map(s => `<span class="wf-badge wf-badge-outline">⚠ ${s}</span>`).join('');
  }

  // AI Suggestions Workflow
  renderSuggestions(activeRes);

  // Share with student button
  const btnShare = document.getElementById('btn-share-student');
  if (btnShare) {
    btnShare.onclick = () => {
      showToast(`ATS review report shared with ${candName} via email.`, 'success');
    };
  }
}

// ============================================================================
// 5. AI PHRASING SUGGESTIONS WORKFLOW
// ============================================================================
function renderSuggestions(activeRes) {
  const container = document.getElementById('suggestions-container');
  const statusStrip = document.getElementById('suggestions-status-strip');
  if (!container) return;

  if (!activeRes.suggestions || activeRes.suggestions.length === 0) {
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
        ✓ All AI suggestions reviewed and applied! Resume is fully optimized.
      </div>
    `;
    if (statusStrip) statusStrip.textContent = `${activeRes.overallScore} / 100 · All suggestions applied`;
    return;
  }

  if (statusStrip) {
    statusStrip.textContent = `${activeRes.overallScore} / 100 · ${activeRes.suggestions.length} suggestion${activeRes.suggestions.length !== 1 ? 's' : ''} to review`;
  }

  container.innerHTML = activeRes.suggestions.map((sug, idx) => `
    <div class="wf-card suggestion-card" id="sug-card-${sug.id}" style="border-style: dashed; padding: 12px; transition: all 0.25s ease;">
      <div style="font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.4px;">Current wording</div>
      <div style="font-size: 13px; background: var(--bg-muted); padding: 8px; border-radius: var(--radius-sm); margin-bottom: 8px; color: var(--text-secondary);">
        "${sug.current}"
      </div>
      <div style="font-size: 11px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.4px;">AI suggestion</div>
      <div style="font-size: 13px; border: 1px solid var(--border-strong); padding: 8px; border-radius: var(--radius-sm); font-weight: 500; margin-bottom: 10px;">
        "${sug.suggested}"
      </div>
      <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px; font-style: italic;">
        Impact: ${sug.impact}
      </div>
      <div style="display: flex; gap: var(--space-sm); align-items: center;">
        <button class="wf-btn wf-btn-sm wf-btn-primary btn-apply-sug" data-sug-id="${sug.id}">Apply to Resume</button>
        <button class="wf-btn wf-btn-sm btn-copy-sug" data-sug-text="${encodeURIComponent(sug.suggested)}">Copy</button>
        <button class="wf-btn wf-btn-sm wf-btn-ghost btn-dismiss-sug" style="color: var(--text-muted);" data-sug-id="${sug.id}">Dismiss</button>
        <span style="font-size: 11px; color: var(--text-muted); margin-left: auto;">${idx + 1} of ${activeRes.suggestions.length}</span>
      </div>
    </div>
  `).join('');

  // Event Handlers for Suggestions
  container.querySelectorAll('.btn-apply-sug').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sugId = e.target.getAttribute('data-sug-id');
      applySuggestion(activeRes, sugId);
    });
  });

  container.querySelectorAll('.btn-copy-sug').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = decodeURIComponent(e.target.getAttribute('data-sug-text'));
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied suggestion to clipboard.', 'success');
      }).catch(() => {
        showToast('Copied suggestion text.', 'info');
      });
    });
  });

  container.querySelectorAll('.btn-dismiss-sug').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sugId = e.target.getAttribute('data-sug-id');
      dismissSuggestion(activeRes, sugId);
    });
  });
}

function applySuggestion(activeRes, sugId) {
  const card = document.getElementById(`sug-card-${sugId}`);
  if (card) {
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
  }

  // Increase overall score
  if (activeRes.overallScore < 99) {
    activeRes.overallScore += 2;
    if (activeRes.overallScore > 100) activeRes.overallScore = 100;
  }

  // Remove from suggestions array
  activeRes.suggestions = activeRes.suggestions.filter(s => s.id !== sugId);

  setTimeout(() => {
    renderResumeList();
    renderReviewPanel();
    showToast(`Applied suggestion. Resume score improved to ${activeRes.overallScore}/100!`, 'success');
  }, 200);
}

function dismissSuggestion(activeRes, sugId) {
  const card = document.getElementById(`sug-card-${sugId}`);
  if (card) {
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0';
  }

  activeRes.suggestions = activeRes.suggestions.filter(s => s.id !== sugId);

  setTimeout(() => {
    renderReviewPanel();
    showToast('Dismissed suggestion.', 'info');
  }, 200);
}

// ============================================================================
// 6. RESUME UPLOAD MODAL
// ============================================================================
function initUploadModal() {
  const btnUploadList = document.getElementById('btn-upload-resume');
  const triggers = document.querySelectorAll('.open-upload-trigger');

  if (btnUploadList) {
    btnUploadList.addEventListener('click', () => openModal('modal-upload-resume'));
  }

  triggers.forEach(t => {
    t.addEventListener('click', () => openModal('modal-upload-resume'));
  });

  const btnConfirmUpload = document.getElementById('btn-confirm-upload');
  if (btnConfirmUpload) {
    btnConfirmUpload.addEventListener('click', async () => {
      const nameInput = document.getElementById('upload-cand-name-input');
      const roleSelect = document.getElementById('upload-target-role-select');

      const candName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Neha Singh';
      const role = roleSelect ? roleSelect.value : currentTargetRole;
      const fileName = `${candName.replace(/\s+/g, '_')}_Resume.pdf`;

      closeModal('modal-upload-resume');
      showLoadingOverlay(document.body, `Uploading & extracting ATS keywords for ${candName}...`);
      await asyncSimulateApiCall(null, 1400);
      hideLoadingOverlay(document.body);

      // Create new candidate & resume entry
      const newCandId = `cand-${Date.now()}`;
      const newResId = `res-${Date.now()}`;

      const newRes = {
        id: newResId,
        candidateId: newCandId,
        fileName: fileName,
        uploadTime: 'Just now',
        size: '2.1 MB',
        overallScore: 93,
        keywordMatch: 94,
        formatScore: 96,
        experienceDetail: 90,
        targetRole: role,
        skillsFound: ['PyTorch', 'React', 'TypeScript', 'Node.js', 'SQL'],
        missingKeywords: ['Docker', 'Kubernetes'],
        suggestions: [
          {
            id: `sug-${Date.now()}`,
            current: 'Built full-stack application for student tracking.',
            suggested: 'Engineered full-stack React & Node.js tracking platform serving 10,000+ students with 99.9% uptime.',
            impact: 'Quantifies platform scale and SLA metrics.'
          }
        ]
      };

      mockCandidates.push({
        id: newCandId,
        name: candName,
        email: `${candName.toLowerCase().replace(/\s+/g, '.')}@example.edu`,
        phone: '+91 98765 00000',
        department: 'CSE',
        degree: 'B.Tech CSE',
        cgpa: 9.0,
        batch: '2026',
        resumeScore: 93,
        matchScore: 93.0,
        targetRole: role,
        status: 'Reviewed',
        resumeUrl: fileName,
        skills: ['PyTorch', 'React', 'TypeScript', 'Node.js', 'SQL'],
        missingSkills: ['Docker', 'Kubernetes'],
        matchReasoning: ['Strong full-stack and AI project foundation.'],
        experienceSummary: 'Full-stack software trainee.'
      });

      resumes.unshift(newRes);
      selectedResumeId = newResId;

      if (nameInput) nameInput.value = '';

      renderResumeList();
      renderReviewPanel();

      showToast(`Uploaded & audited ${fileName}. Score: 93/100!`, 'success');
    });
  }

  // Modal triggers
  document.querySelectorAll('#modal-upload-resume .modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => closeModal('modal-upload-resume'));
  });
}

// ============================================================================
// 7. REPORT ACTIONS (DOWNLOAD & EXPORT)
// ============================================================================
function initReportActions() {
  const btnDownloadReport = document.getElementById('btn-download-report');
  const btnExportResults = document.getElementById('btn-export-results');

  if (btnDownloadReport) {
    btnDownloadReport.addEventListener('click', async () => {
      const activeRes = resumes.find(r => r.id === selectedResumeId);
      if (!activeRes) {
        showToast('Please select a resume to download report.', 'warning');
        return;
      }

      const cand = mockCandidates.find(c => c.id === activeRes.candidateId);
      const candName = cand ? cand.name : activeRes.fileName;

      showLoadingOverlay(document.body, `Generating ATS Audit Report for ${candName}...`);
      await asyncSimulateApiCall(null, 1200);
      hideLoadingOverlay(document.body);

      const reportContent = `PlacementHub AI Solutions — ATS Resume Audit Report
Candidate: ${candName}
Resume File: ${activeRes.fileName}
Target Role: ${activeRes.targetRole}
Generated Date: ${new Date().toLocaleString()}
==================================================
SCORES:
- Overall ATS Score: ${activeRes.overallScore} / 100
- Keyword Alignment: ${activeRes.keywordMatch}%
- Format & Structure: ${activeRes.formatScore}%
- Experience Detail: ${activeRes.experienceDetail}%

SKILLS DETECTED (${activeRes.skillsFound.length}):
${activeRes.skillsFound.map(s => ` - ${s}`).join('\n')}

MISSING KEYWORDS (${activeRes.missingKeywords.length}):
${activeRes.missingKeywords.map(m => ` - ${m}`).join('\n')}

AI RECOMMENDATIONS:
${activeRes.suggestions.map(s => ` * ${s.suggested}`).join('\n')}
==================================================
CONFIRMED BY PLACEMENTHUB AI SOLUTIONS ENGINE`;

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Resume_Review_Report_${candName.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Downloaded ATS audit report for ${candName}.`, 'success');
    });
  }

  if (btnExportResults) {
    btnExportResults.addEventListener('click', async () => {
      showLoadingOverlay(document.body, 'Exporting resume scores to CSV...');
      await asyncSimulateApiCall(null, 1000);
      hideLoadingOverlay(document.body);

      const headers = ["ID", "File Name", "Target Role", "Overall Score", "Keyword Match %", "Format Score %", "Experience Score %"];
      const rows = resumes.map(r => [
        r.id, `"${r.fileName}"`, `"${r.targetRole}"`, r.overallScore, r.keywordMatch, r.formatScore, r.experienceDetail
      ]);

      const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Resume_Scores_Export_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${resumes.length} resume scores to CSV.`, 'success');
    });
  }
}
