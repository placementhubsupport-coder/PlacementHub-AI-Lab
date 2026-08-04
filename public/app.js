document.addEventListener('DOMContentLoaded', () => {
  let studentsData = [];
  let jobsData = [];

  // Tab Navigation Elements
  const tabMatching = document.getElementById('tabMatching');
  const tabResume = document.getElementById('tabResume');
  const tabSearch = document.getElementById('tabSearch');
  const tabCopilot = document.getElementById('tabCopilot');
  const tabCareerCoach = document.getElementById('tabCareerCoach');

  const matchingView = document.getElementById('matchingView');
  const resumeView = document.getElementById('resumeView');
  const searchView = document.getElementById('searchView');
  const copilotView = document.getElementById('copilotView');
  const careerCoachView = document.getElementById('careerCoachView');

  // POC 1 Elements
  const studentSelect = document.getElementById('studentSelect');
  const jobSelect = document.getElementById('jobSelect');
  const studentDetails = document.getElementById('studentDetails');
  const jobDetails = document.getElementById('jobDetails');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultsSection = document.getElementById('resultsSection');

  // POC 2 Elements
  const resumeStudentSelect = document.getElementById('resumeStudentSelect');
  const resumeJobSelect = document.getElementById('resumeJobSelect');
  const resumeDetails = document.getElementById('resumeDetails');
  const resumeJobDetails = document.getElementById('resumeJobDetails');
  const analyzeResumeBtn = document.getElementById('analyzeResumeBtn');
  const resumeResultsSection = document.getElementById('resumeResultsSection');

  // POC 3 Elements (Search)
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResultsSection = document.getElementById('searchResultsSection');
  const sampleChips = document.querySelectorAll('.sample-chip:not(.copilot-chip):not(.coach-chip)');

  // POC 4 Copilot Elements
  const copilotInput = document.getElementById('copilotInput');
  const copilotSendBtn = document.getElementById('copilotSendBtn');
  const copilotResultsSection = document.getElementById('copilotResultsSection');
  const copyDraftBtn = document.getElementById('copyDraftBtn');

  // POC 5 Career Coach Elements
  const coachStudentSelect = document.getElementById('coachStudentSelect');
  const coachRoleSelect = document.getElementById('coachRoleSelect');
  const coachStudentDetails = document.getElementById('coachStudentDetails');
  const coachRoleFocusText = document.getElementById('coachRoleFocusText');
  const coachAnalyzeBtn = document.getElementById('coachAnalyzeBtn');
  const coachResultsSection = document.getElementById('coachResultsSection');
  const coachChatInput = document.getElementById('coachChatInput');
  const coachChatSendBtn = document.getElementById('coachChatSendBtn');

  // Global Elements
  const loadingOverlay = document.getElementById('loadingOverlay');
  const errorAlert = document.getElementById('errorAlert');
  const errorMessage = document.getElementById('errorMessage');

  async function init() {
    setupNavigation();
    setupSearchHandlers();
    setupCopilotHandlers();
    setupCareerCoachHandlers();

    try {
      const [studentsRes, jobsRes] = await Promise.all([
        fetch('/api/students'),
        fetch('/api/jobs')
      ]);

      if (!studentsRes.ok || !jobsRes.ok) throw new Error('Failed to load dataset from server.');

      studentsData = await studentsRes.json();
      jobsData = await jobsRes.json();

      populateDropdowns();
    } catch (err) {
      showError('Initialization Error: ' + err.message);
    }
  }

  function setupNavigation() {
    const tabs = [
      { btn: tabMatching, view: matchingView },
      { btn: tabResume, view: resumeView },
      { btn: tabSearch, view: searchView },
      { btn: tabCopilot, view: copilotView },
      { btn: tabCareerCoach, view: careerCoachView }
    ];

    tabs.forEach(t => {
      if (!t.btn || !t.view) return;
      t.btn.addEventListener('click', () => {
        tabs.forEach(other => {
          if (other.btn && other.view) {
            other.btn.classList.remove('active');
            other.view.classList.add('hidden');
          }
        });
        t.btn.classList.add('active');
        t.view.classList.remove('hidden');
        hideError();
      });
    });
  }

  function populateDropdowns() {
    studentsData.forEach(s => {
      const opt1 = new Option(`${s.name} (${s.id}) - ${s.degree}`, s.id);
      studentSelect.appendChild(opt1);

      const opt2 = new Option(`${s.name} (${s.id}) - ${s.degree}`, s.id);
      resumeStudentSelect.appendChild(opt2);

      const opt3 = new Option(`${s.name} (${s.id}) - ${s.degree}`, s.id);
      if (coachStudentSelect) coachStudentSelect.appendChild(opt3);
    });

    jobsData.forEach(j => {
      const opt1 = new Option(`${j.role} @ ${j.company} (${j.id})`, j.id);
      jobSelect.appendChild(opt1);

      const opt2 = new Option(`${j.role} @ ${j.company} (${j.id})`, j.id);
      resumeJobSelect.appendChild(opt2);
    });

    studentSelect.addEventListener('change', () => renderStudentCard(studentSelect.value, studentDetails, analyzeBtn, studentSelect, jobSelect));
    jobSelect.addEventListener('change', () => renderJobCard(jobSelect.value, jobDetails, analyzeBtn, studentSelect, jobSelect));
    analyzeBtn.addEventListener('click', handleAnalyzeMatch);

    resumeStudentSelect.addEventListener('change', () => renderStudentCard(resumeStudentSelect.value, resumeDetails, analyzeResumeBtn, resumeStudentSelect, resumeJobSelect));
    resumeJobSelect.addEventListener('change', () => renderJobCard(resumeJobSelect.value, resumeJobDetails, analyzeResumeBtn, resumeStudentSelect, resumeJobSelect));
    analyzeResumeBtn.addEventListener('click', handleAnalyzeResume);
  }

  function renderStudentCard(studentId, targetContainer, btn, sel1, sel2) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    const certsHtml = (student.certifications || []).length > 0 
      ? student.certifications.map(c => `<span class="tag preferred">📜 ${escapeHtml(c)}</span>`).join('')
      : '<span style="font-size: 0.85rem; color: var(--text-dim);">No verified certifications</span>';

    const interviewHtml = student.interviewPerformance 
      ? `<div class="info-paragraph" style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 10px 14px; border-radius: var(--radius-sm); color: #15803D; margin-top: 4px;">
           <strong>Mock Interview Score: ${student.interviewPerformance.mockInterviewScore}%</strong> • ${escapeHtml(student.interviewPerformance.summary || '')}
         </div>`
      : '';

    targetContainer.innerHTML = `
      <div class="profile-meta-grid">
        <div class="meta-box"><label>Degree & Major</label><span>${escapeHtml(student.degree)}</span></div>
        <div class="meta-box"><label>Academic CGPA</label><span>${student.cgpa.toFixed(1)} / 10.0</span></div>
      </div>
      <div class="section-label">Verified Technical Skills</div>
      <div class="tag-cloud">${student.skills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>
      <div class="section-label">Verified Certifications</div>
      <div class="tag-cloud">${certsHtml}</div>
      ${interviewHtml ? `<div class="section-label">Previous Interview Track Record</div>${interviewHtml}` : ''}
      <div class="section-label">Experience</div>
      <div class="text-box">${escapeHtml(student.experience)}</div>
      <div class="section-label">Academic Projects</div>
      <ul class="styled-list positive" style="margin-top: 4px;">${student.projects.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
    `;
    checkEnableButton(btn, sel1, sel2);
  }

  function renderJobCard(jobId, targetContainer, btn, sel1, sel2) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    const prefCertsHtml = (job.preferredCertifications || []).length > 0
      ? job.preferredCertifications.map(c => `<span class="tag preferred">📜 ${escapeHtml(c)}</span>`).join('')
      : '<span style="font-size: 0.85rem; color: var(--text-dim);">Standard degree requirement</span>';

    const historyHtml = job.employerHiringHistory
      ? `<div class="info-paragraph" style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 10px 14px; border-radius: var(--radius-sm); color: #1E40AF; margin-top: 4px;">
           <strong>Hiring History:</strong> ${escapeHtml(job.employerHiringHistory.insightSummary || '')}
         </div>`
      : '';

    targetContainer.innerHTML = `
      <div class="profile-meta-grid">
        <div class="meta-box"><label>Role & Company</label><span>${escapeHtml(job.role)}</span><div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(job.company)}</div></div>
        <div class="meta-box"><label>Min Academic Threshold</label><span>CGPA ≥ ${job.minAcademicRequirement.minCgpa.toFixed(1)}</span><div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(job.minAcademicRequirement.degree)}</div></div>
      </div>
      <div class="section-label">Required Skills</div>
      <div class="tag-cloud">${job.requiredSkills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>
      <div class="section-label">Preferred Skills & Certifications</div>
      <div class="tag-cloud">${job.preferredSkills.map(s => `<span class="tag preferred">${escapeHtml(s)}</span>`).join('')} ${prefCertsHtml}</div>
      ${historyHtml ? `<div class="section-label">Employer Hiring History</div>${historyHtml}` : ''}
      <div class="section-label">Job Overview</div>
      <div class="text-box">${escapeHtml(job.description)}</div>
    `;
    checkEnableButton(btn, sel1, sel2);
  }

  function checkEnableButton(btn, sel1, sel2) {
    if (sel1.value && sel2.value) btn.removeAttribute('disabled');
    else btn.setAttribute('disabled', 'true');
  }

  // POC 1 Handler
  async function handleAnalyzeMatch() {
    hideError();
    resultsSection.classList.add('hidden');
    loadingOverlay.classList.remove('hidden');
    analyzeBtn.setAttribute('disabled', 'true');

    try {
      const response = await fetch('/api/analyze-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: studentSelect.value, jobId: jobSelect.value })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || data.error);
      renderMatchingResults(data);
    } catch (err) {
      showError(err.message);
    } finally {
      loadingOverlay.classList.add('hidden');
      analyzeBtn.removeAttribute('disabled');
    }
  }

  function renderMatchingResults(resData) {
    const { analysis, meta } = resData;
    document.getElementById('scoreValue').textContent = analysis.overallScore;
    document.getElementById('scoreBarFill').style.width = `${analysis.overallScore}%`;

    const eligBadge = document.getElementById('eligibilityBadge');
    eligBadge.textContent = analysis.eligibilityAssessment;
    eligBadge.className = `badge-eligibility ${analysis.eligibilityAssessment}`;

    document.getElementById('finalRecommendation').textContent = analysis.finalRecommendation;
    document.getElementById('responseMeta').textContent = `Inference: ${meta.responseTimeMs}ms • Model: ${meta.modelUsed}`;

    // Render "Why You Match" Breakdown Grid
    const whyMatchGrid = document.getElementById('whyMatchGrid');
    const whyList = analysis.whyYouMatchList || [];
    if (whyList.length > 0) {
      whyMatchGrid.innerHTML = whyList.map(item => `
        <div class="why-match-item">
          <span class="why-match-item-icon">✅</span>
          <span>${escapeHtml(item)}</span>
        </div>
      `).join('');
    } else {
      whyMatchGrid.innerHTML = `
        <div class="why-match-item">
          <span class="why-match-item-icon">📌</span>
          <span>${escapeHtml(analysis.explanationOfCompatibility || 'Evaluated against job profile.')}</span>
        </div>
      `;
    }

    document.getElementById('matchedSkills').innerHTML = (analysis.matchedSkills || []).map(s => `<span class="tag match">✓ ${escapeHtml(s)}</span>`).join('');
    document.getElementById('missingSkills').innerHTML = (analysis.missingSkills || []).map(s => `<span class="tag missing">✕ ${escapeHtml(s)}</span>`).join('');

    document.getElementById('academicAlignment').textContent = analysis.academicRequirementAlignment;
    document.getElementById('experienceAlignment').textContent = analysis.experienceAlignment;

    document.getElementById('keyStrengths').innerHTML = (analysis.keyStrengths || []).map(str => `<li>${escapeHtml(str)}</li>`).join('');
    document.getElementById('potentialGaps').innerHTML = (analysis.potentialGaps || []).map(gap => `<li>${escapeHtml(gap)}</li>`).join('');

    document.getElementById('explanationOfCompatibility').textContent = analysis.explanationOfCompatibility;
    document.getElementById('improvementSuggestions').innerHTML = (analysis.studentImprovementSuggestions || []).map(sug => `<li>${escapeHtml(sug)}</li>`).join('');

    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }

  // POC 2 Handler
  async function handleAnalyzeResume() {
    hideError();
    resumeResultsSection.classList.add('hidden');
    loadingOverlay.classList.remove('hidden');
    analyzeResumeBtn.setAttribute('disabled', 'true');

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: resumeStudentSelect.value, jobId: resumeJobSelect.value })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || data.error);
      renderResumeResults(data);
    } catch (err) {
      showError(err.message);
    } finally {
      loadingOverlay.classList.add('hidden');
      analyzeResumeBtn.removeAttribute('disabled');
    }
  }

  function renderResumeResults(resData) {
    const { hardEligibility, semanticAnalysis, meta } = resData;

    const hardBadge = document.getElementById('hardBadge');
    hardBadge.textContent = hardEligibility.statusBadge;
    hardBadge.className = `hard-badge ${hardEligibility.isEligible ? 'passed' : 'failed'}`;
    document.getElementById('hardSummary').textContent = hardEligibility.summary;

    document.getElementById('cgpaCheckItem').className = `hard-check-item ${hardEligibility.cgpaCheck.passed ? 'pass' : 'fail'}`;
    document.getElementById('cgpaCheckDetail').textContent = hardEligibility.cgpaCheck.detail;

    document.getElementById('degreeCheckItem').className = `hard-check-item ${hardEligibility.degreeCheck.passed ? 'pass' : 'fail'}`;
    document.getElementById('degreeCheckDetail').textContent = hardEligibility.degreeCheck.detail;

    document.getElementById('expCheckItem').className = `hard-check-item ${hardEligibility.experienceCheck.passed ? 'pass' : 'fail'}`;
    document.getElementById('expCheckDetail').textContent = hardEligibility.experienceCheck.detail;

    document.getElementById('resumeScoreValue').textContent = semanticAnalysis.overallAlignmentScore;
    document.getElementById('resumeScoreBarFill').style.width = `${semanticAnalysis.overallAlignmentScore}%`;
    document.getElementById('relevantExperienceText').textContent = semanticAnalysis.relevantExperience || 'N/A';
    document.getElementById('resumeResponseMeta').textContent = `Inference: ${meta.responseTimeMs}ms • Model: ${meta.modelUsed}`;

    document.getElementById('resumeMatchedSkills').innerHTML = (semanticAnalysis.matchedSkills || []).map(s => `<span class="tag match">✓ ${escapeHtml(s)}</span>`).join('');
    document.getElementById('resumeMissingRequired').innerHTML = (semanticAnalysis.missingRequiredSkills || []).map(s => `<span class="tag missing">✕ ${escapeHtml(s)}</span>`).join('');
    document.getElementById('resumeMissingPreferred').innerHTML = (semanticAnalysis.missingPreferredSkills || []).map(s => `<span class="tag missing">✕ ${escapeHtml(s)}</span>`).join('');

    document.getElementById('keywordsToEmphasize').innerHTML = (semanticAnalysis.keywordsToEmphasize || []).map(k => `<span class="tag emphasize">⭐ ${escapeHtml(k)}</span>`).join('');
    document.getElementById('relevantProjectsList').innerHTML = (semanticAnalysis.relevantProjects || []).map(p => `<li>${escapeHtml(p)}</li>`).join('');

    document.getElementById('resumeStrengths').innerHTML = (semanticAnalysis.resumeStrengths || []).map(str => `<li>${escapeHtml(str)}</li>`).join('');
    document.getElementById('resumeWeaknessesGaps').innerHTML = (semanticAnalysis.resumeWeaknessesGaps || []).map(gap => `<li>${escapeHtml(gap)}</li>`).join('');

    document.getElementById('truthfulSuggestions').innerHTML = (semanticAnalysis.jobSpecificImprovementSuggestions || []).map(sug => `<li>${escapeHtml(sug)}</li>`).join('');
    document.getElementById('finalCompatibilityExplanation').textContent = semanticAnalysis.finalCompatibilityExplanation || 'N/A';

    resumeResultsSection.classList.remove('hidden');
    resumeResultsSection.scrollIntoView({ behavior: 'smooth' });
  }

  // POC 3 Handlers (AI Placement Search)
  function setupSearchHandlers() {
    searchBtn.addEventListener('click', handlePlacementSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handlePlacementSearch();
    });

    sampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        searchInput.value = chip.getAttribute('data-query');
        handlePlacementSearch();
      });
    });
  }

  async function handlePlacementSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      showError('Please enter a natural language search query.');
      return;
    }

    hideError();
    searchResultsSection.classList.add('hidden');
    loadingOverlay.classList.remove('hidden');

    try {
      const response = await fetch('/api/search-placement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || data.error);

      renderSearchResults(data);
    } catch (err) {
      showError(err.message);
    } finally {
      loadingOverlay.classList.add('hidden');
    }
  }

  function renderSearchResults(data) {
    const { query, structuredIntent, matchingOpportunities, totalCount, meta } = data;

    document.getElementById('displayOriginalQuery').textContent = `"${query}"`;
    document.getElementById('searchResponseMeta').textContent = `Inference: ${meta.responseTimeMs}ms • Model: ${meta.modelUsed}`;

    // Render Intent Grid
    document.getElementById('intentRole').textContent = (structuredIntent.role_keywords || []).join(', ') || 'Any Role';
    document.getElementById('intentSkills').textContent = (structuredIntent.skills || []).join(', ') || 'None Specified';
    document.getElementById('intentDegree').textContent = (structuredIntent.degree || []).join(', ') || 'Any Degree';
    document.getElementById('intentCgpa').textContent = structuredIntent.minimum_cgpa ? `≥ ${structuredIntent.minimum_cgpa.toFixed(1)}` : 'No CGPA Constraint';
    document.getElementById('intentType').textContent = structuredIntent.opportunity_type || 'Any Type';
    document.getElementById('intentLevel').textContent = structuredIntent.experience_level || 'Any Level';

    // Count Badge
    const countBadge = document.getElementById('resultsCountBadge');
    countBadge.textContent = `Found ${totalCount} Matching Opportunities`;

    // Render Opportunities List
    const listContainer = document.getElementById('opportunitiesList');
    if (totalCount === 0) {
      listContainer.innerHTML = `
        <div class="empty-state" style="background: rgba(0,0,0,0.2); border-radius: var(--radius-md); padding: 40px; height: auto;">
          <div>
            <span style="font-size: 2rem; display: block; margin-bottom: 10px;">🔍 0 Opportunities Found</span>
            <p style="color: var(--text-muted);">No job opportunities matched the extracted query intent criteria.</p>
          </div>
        </div>
      `;
    } else {
      listContainer.innerHTML = matchingOpportunities.map((item, idx) => {
        const { job, relevanceScore, isCgpaEligible, matchedSkills, gaps, matchReason } = item;
        return `
          <div class="opportunity-item">
            <div class="job-item-header">
              <div class="job-title-group">
                <h3>#${idx + 1} ${escapeHtml(job.role)}</h3>
                <div class="job-company">${escapeHtml(job.company)} • ${escapeHtml(job.type || 'Full-Time')} • Min CGPA: ${job.minAcademicRequirement.minCgpa.toFixed(1)}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="job-eligibility-tag ${isCgpaEligible ? 'pass' : 'warn'}">
                  ${isCgpaEligible ? 'Eligible CGPA' : 'CGPA Threshold Mismatch'}
                </span>
                <span class="job-rank-badge">Relevance: ${relevanceScore}%</span>
              </div>
            </div>

            <div class="section-label">Required Skills Alignment</div>
            <div class="tag-cloud">
              ${job.requiredSkills.map(s => {
                const isMatched = matchedSkills.some(ms => ms.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ms.toLowerCase()));
                return `<span class="tag ${isMatched ? 'match' : ''}">${isMatched ? '✓ ' : ''}${escapeHtml(s)}</span>`;
              }).join('')}
            </div>

            <div class="match-reason">
              <strong>Match Analysis:</strong> ${escapeHtml(matchReason)}
            </div>

            ${gaps.length > 0 ? `
              <div style="font-size: 0.82rem; color: var(--accent-amber);">
                <strong>Skill Gaps:</strong> ${gaps.map(g => escapeHtml(g)).join(' • ')}
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }

    searchResultsSection.classList.remove('hidden');
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
  }

  window.handleAskCopilot = function(q) {
    if (typeof window.triggerCopilotQuery === 'function') {
      window.triggerCopilotQuery(q);
    }
  };
  window.handleCopilotQuery = window.handleAskCopilot;

  function setupCopilotHandlers() {
    window.triggerCopilotQuery = handleCopilotQuery;

    if (copilotSendBtn) {
      copilotSendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleCopilotQuery();
      });
    }
    if (copilotInput) {
      copilotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCopilotQuery();
        }
      });
    }
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.copilot-chip');
      if (chip) {
        e.preventDefault();
        const query = chip.getAttribute('data-query') || chip.textContent.trim();
        if (copilotInput) copilotInput.value = query;
        handleCopilotQuery(query);
      }
    });
    if (copyDraftBtn) {
      copyDraftBtn.addEventListener('click', () => {
        const bodyText = document.getElementById('draftBodyText').value;
        if (bodyText) {
          navigator.clipboard.writeText(bodyText);
          copyDraftBtn.textContent = '✓ Copied to Clipboard!';
          setTimeout(() => { copyDraftBtn.textContent = '📋 Copy Draft to Clipboard'; }, 3000);
        }
      });
    }
  }

  async function handleCopilotQuery(overrideQuery) {
    let query = (overrideQuery || (copilotInput ? copilotInput.value : '')).trim();
    if (!query) {
      query = 'Who needs immediate attention?';
    }

    if (copilotInput) copilotInput.value = query;
    hideError();
    if (copilotResultsSection) copilotResultsSection.classList.add('hidden');

    const loadingTitle = document.getElementById('loadingTitle');
    const loadingSubtitle = document.getElementById('loadingSubtitle');
    if (loadingTitle) loadingTitle.textContent = 'Evaluating Natural Language Query...';
    if (loadingSubtitle) loadingSubtitle.textContent = `Processing "${query}" via Placement Officer Copilot`;

    if (loadingOverlay) loadingOverlay.classList.remove('hidden');

    try {
      const response = await fetch('/api/copilot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const res = await response.json();
      if (!response.ok || !res.success) throw new Error(res.error || 'Failed to process Copilot query.');

      renderCopilotResponse(res.data, res.meta);
    } catch (err) {
      showError(err.message);
    } finally {
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
    }
  }

  function renderCopilotResponse(copilotData, meta) {
    const { headline, summary, structuredCards, communicationDraft, recommendedNextActions } = copilotData;

    document.getElementById('copilotResponseHeadline').textContent = headline || 'Placement Officer Copilot Response';
    document.getElementById('copilotResponseMeta').textContent = `Inference: ${meta?.responseTimeMs || 80}ms • Model: ${meta?.modelUsed || 'meta/llama-3.3-70b-instruct'}`;
    document.getElementById('copilotSummaryText').textContent = summary || '';

    // Render Structured Response Cards
    const cardsContainer = document.getElementById('copilotCardsContainer');
    if (structuredCards && structuredCards.length > 0) {
      cardsContainer.innerHTML = structuredCards.map((c, idx) => {
        let actionBtnText = `Draft Notice for ${c.title}`;
        let actionQuery = `Draft an email to ${c.title} for placement support`;
        if (c.type === 'drive') {
          actionBtnText = `Draft Drive Notice for ${c.title}`;
          actionQuery = `Draft an announcement notice for ${c.title}`;
        } else if (c.type === 'employer') {
          actionBtnText = `Draft Invitation to ${c.title}`;
          actionQuery = `Draft an invitation letter to ${c.title} HR`;
        }

        return `
          <div class="opportunity-item">
            <div class="job-item-header">
              <div class="job-title-group">
                <h3>#${idx + 1} ${escapeHtml(c.title)}</h3>
                <div class="job-company">${escapeHtml(c.subtitle || '')}</div>
              </div>
              <span class="hard-badge ${c.badgeClass || 'passed'}">${escapeHtml(c.badge || '')}</span>
            </div>
            ${(c.details || []).map(d => `<div class="match-reason" style="font-weight: 500;">${escapeHtml(d)}</div>`).join('')}
            ${c.action ? `<div style="font-size: 0.88rem; color: #1E40AF; font-weight: 600;">🚀 Recommended Action: ${escapeHtml(c.action)}</div>` : ''}
            <div style="margin-top: 8px;">
              <button class="sample-chip copilot-chip" data-query="${escapeHtml(actionQuery)}">⚡ ${escapeHtml(actionBtnText)}</button>
            </div>
          </div>
        `;
      }).join('');
      cardsContainer.classList.remove('hidden');
    } else {
      cardsContainer.innerHTML = '';
      cardsContainer.classList.add('hidden');
    }

    // Render Communication Draft
    const draftContainer = document.getElementById('copilotDraftContainer');
    if (communicationDraft) {
      document.getElementById('draftAudienceText').textContent = communicationDraft.audience || 'Target Candidates';
      document.getElementById('draftSubjectText').textContent = communicationDraft.subject || '';
      document.getElementById('draftBodyText').value = communicationDraft.body || '';
      draftContainer.classList.remove('hidden');
    } else {
      draftContainer.classList.add('hidden');
    }

    // Render Actions List
    const actionsList = document.getElementById('copilotActionsList');
    actionsList.innerHTML = (recommendedNextActions || []).map(act => `<li>${escapeHtml(act)}</li>`).join('');

    copilotResultsSection.classList.remove('hidden');
    copilotResultsSection.scrollIntoView({ behavior: 'smooth' });
  }

  function showError(msg) {
    errorMessage.textContent = msg;
    errorAlert.classList.remove('hidden');
  }

  function hideError() {
    errorAlert.classList.add('hidden');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // POC 5: AI STUDENT CAREER COACH HANDLERS
  // ==========================================
  const ROLE_STRATEGIES = {
    'Software Engineer': 'Evaluates algorithmic problem solving, core data structures, software design principles, git version control, and multi-language proficiency.',
    'Backend Developer': 'Evaluates microservice architecture, API design, Node.js/Java core skills, database normalization, caching strategies, and cloud deployment readiness.',
    'Frontend Developer': 'Evaluates React component architecture, modern UI state management, HTML5/CSS3 semantics, responsive web design, and REST client integration.',
    'Full Stack Developer': 'Evaluates end-to-end web architecture, frontend UI frameworks, server-side HTTP endpoints, database persistence, and containerization.',
    'AI Engineer': 'Evaluates PyTorch/TensorFlow deep learning frameworks, neural network design, model optimization, CUDA acceleration, and AI REST service deployment.',
    'Data Analyst': 'Evaluates SQL query optimization, data manipulation libraries (Pandas/NumPy), statistical analysis, visualization tools (Tableau), and business metrics.',
    'Product Manager': 'Evaluates agile methodology, product roadmap planning, user story definitions, quantitative analytics, wireframing, and stakeholder communication.',
    'Cyber Security': 'Evaluates Linux kernel fundamentals, network protocol analysis, Wireshark packet inspection, security compliance (OWASP), and penetration testing.',
    'DevOps Engineer': 'Evaluates Linux administration, Docker container orchestration, CI/CD pipeline automation, infrastructure-as-code (Terraform), and cloud monitoring.'
  };

  function setupCareerCoachHandlers() {
    if (!coachStudentSelect) return;

    coachStudentSelect.addEventListener('change', () => {
      renderCoachStudentCard(coachStudentSelect.value);
      checkCoachButtonState();
    });

    coachRoleSelect.addEventListener('change', () => {
      const selectedRole = coachRoleSelect.value;
      if (coachRoleFocusText) {
        coachRoleFocusText.textContent = ROLE_STRATEGIES[selectedRole] || ROLE_STRATEGIES['Software Engineer'];
      }
      checkCoachButtonState();
    });

    if (coachAnalyzeBtn) {
      coachAnalyzeBtn.addEventListener('click', handleAnalyzeCareerCoach);
    }

    if (coachChatSendBtn) {
      coachChatSendBtn.addEventListener('click', () => handleAskCoachChat());
    }

    if (coachChatInput) {
      coachChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAskCoachChat();
      });
    }

    // Suggested Coach Prompt Chips
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.coach-chip');
      if (chip) {
        const promptText = chip.getAttribute('data-prompt');
        if (promptText) {
          if (coachChatInput) coachChatInput.value = promptText;
          handleAskCoachChat(promptText);
        }
      }
    });
  }

  function checkCoachButtonState() {
    if (coachAnalyzeBtn) {
      coachAnalyzeBtn.disabled = !coachStudentSelect.value || !coachRoleSelect.value;
    }
  }

  function renderCoachStudentCard(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student || !coachStudentDetails) return;

    const certsHtml = (student.certifications || []).length > 0 
      ? student.certifications.map(c => `<span class="tag preferred">📜 ${escapeHtml(c)}</span>`).join('')
      : '<span style="font-size: 0.85rem; color: var(--text-dim);">No verified certifications</span>';

    const githubHtml = student.github 
      ? `<a href="${escapeHtml(student.github)}" target="_blank" style="color: #2563EB; font-weight: 600; text-decoration: underline;">${escapeHtml(student.github.replace('https://', ''))}</a>`
      : '<span style="color: var(--text-dim);">Not provided</span>';

    const portfolioHtml = student.portfolio 
      ? `<a href="${escapeHtml(student.portfolio)}" target="_blank" style="color: #16A34A; font-weight: 600; text-decoration: underline;">${escapeHtml(student.portfolio.replace('https://', ''))}</a>`
      : '<span style="color: var(--text-dim);">Not provided</span>';

    coachStudentDetails.innerHTML = `
      <div class="profile-meta-grid" style="grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));">
        <div class="meta-box"><label>Candidate Name</label><span>${escapeHtml(student.name)}</span></div>
        <div class="meta-box"><label>Branch & Degree</label><span>${escapeHtml(student.degree)}</span></div>
        <div class="meta-box"><label>Academic CGPA</label><span>${student.cgpa.toFixed(1)} / 10.0</span></div>
        <div class="meta-box"><label>Graduation Year</label><span>${student.graduationYear || 2026}</span></div>
        <div class="meta-box"><label>Resume Status</label><span style="font-weight: 700; color: #2563EB;">${escapeHtml(student.resumeStatus || 'Verified')}</span></div>
        <div class="meta-box"><label>Placement Status</label><span style="font-weight: 700; color: #16A34A;">${escapeHtml(student.placementStatus || 'Unplaced')}</span></div>
      </div>

      <div class="profile-meta-grid" style="margin-top: 10px; grid-template-columns: 1fr 1fr;">
        <div class="meta-box"><label>GitHub Profile</label><span>${githubHtml}</span></div>
        <div class="meta-box"><label>Portfolio Website</label><span>${portfolioHtml}</span></div>
      </div>

      <div class="section-label">Verified Technical Skills</div>
      <div class="tag-cloud">${student.skills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>

      <div class="section-label">Verified Certifications</div>
      <div class="tag-cloud">${certsHtml}</div>

      <div class="section-label">Internship & Practical Experience</div>
      <div class="text-box">${escapeHtml(student.experience || 'No formal internship listed.')}</div>

      <div class="section-label">Academic & Industry Projects</div>
      <ul class="styled-list positive" style="margin-top: 4px;">
        ${(student.projects || []).map(p => `<li>${escapeHtml(p)}</li>`).join('')}
      </ul>
    `;
  }

  async function handleAnalyzeCareerCoach() {
    const studentId = coachStudentSelect.value;
    const targetRole = coachRoleSelect.value;

    if (!studentId || !targetRole) {
      showError('Please select both a student profile and a target career goal.');
      return;
    }

    hideError();
    if (loadingOverlay) {
      document.getElementById('loadingTitle').textContent = 'Analyzing Placement Readiness & AI Roadmap...';
      document.getElementById('loadingSubtitle').textContent = `Executing high-dimensional candidate gap evaluation for ${targetRole} using NVIDIA Llama-3.3-70B Instruct`;
      loadingOverlay.classList.remove('hidden');
    }

    try {
      const response = await fetch('/api/career-coach/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, targetRole })
      });

      const res = await response.json();
      if (!response.ok || !res.success) throw new Error(res.error || res.message || 'Failed to analyze career readiness.');

      renderCareerCoachResults(res.analysis, res.meta);
    } catch (err) {
      showError('Career Coach Error: ' + err.message);
    } finally {
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
    }
  }

  function renderCareerCoachResults(analysis, meta) {
    const {
      executiveSummary,
      readinessScore,
      readinessExplanation,
      strengths,
      improvementAreas,
      skillGapAnalysis,
      careerRoadmap,
      resumeAdvice,
      recommendedCompanies
    } = analysis;

    document.getElementById('coachResponseMeta').textContent = `Inference: ${meta?.responseTimeMs || 140}ms • Model: ${meta?.modelUsed || 'meta/llama-3.3-70b-instruct'}`;
    document.getElementById('coachExecutiveSummary').textContent = executiveSummary || '';

    // 3. Readiness Visual Score & Progress Bar
    const scoreVal = readinessScore || 0;
    document.getElementById('coachReadinessScore').textContent = `${scoreVal}%`;
    const barFill = document.getElementById('coachReadinessBarFill');
    if (barFill) barFill.style.width = `${scoreVal}%`;
    document.getElementById('coachReadinessExplanation').textContent = readinessExplanation || '';

    // 4. Strengths List
    const strengthsList = document.getElementById('coachStrengthsList');
    if (strengthsList) {
      strengthsList.innerHTML = (strengths || []).map(s => `<li>${escapeHtml(s)}</li>`).join('');
    }

    // 5. Improvement Areas List
    const improvementList = document.getElementById('coachImprovementList');
    if (improvementList) {
      improvementList.innerHTML = (improvementAreas || []).map(imp => `<li>${escapeHtml(imp)}</li>`).join('');
    }

    // 7. Skill Gap Analysis Comparison Card
    if (skillGapAnalysis) {
      document.getElementById('coachRequiredSkills').innerHTML = (skillGapAnalysis.requiredSkills || []).map(s => `<span class="tag" style="background: #DBEAFE; color: #1E40AF;">${escapeHtml(s)}</span>`).join('');
      document.getElementById('coachCurrentSkills').innerHTML = (skillGapAnalysis.currentSkills || []).map(s => `<span class="tag" style="background: #DCFCE7; color: #15803D;">${escapeHtml(s)}</span>`).join('');
      document.getElementById('coachMissingSkills').innerHTML = (skillGapAnalysis.missingSkills || []).map(s => `<span class="tag" style="background: #FEE2E2; color: #991B1B;">${escapeHtml(s)}</span>`).join('');
    }

    // 6. Personalized Career Milestone Roadmap
    const roadmapTimeline = document.getElementById('coachRoadmapTimeline');
    if (roadmapTimeline && careerRoadmap) {
      roadmapTimeline.innerHTML = careerRoadmap.map((item, idx) => `
        <div class="roadmap-card">
          <div class="roadmap-header">
            <span class="roadmap-title">#${idx + 1} ${escapeHtml(item.title || item.week)}</span>
            <span class="milestone-badge">${escapeHtml(item.week || `Week ${idx + 1}`)}</span>
          </div>
          <p class="roadmap-focus"><strong>Focus Area:</strong> ${escapeHtml(item.focus)}</p>
          <div class="roadmap-deliverable">🎯 <strong>Target Deliverable:</strong> ${escapeHtml(item.deliverable)}</div>
        </div>
      `).join('');
    }

    // 8. Actionable Resume Suggestions
    const resumeAdviceList = document.getElementById('coachResumeAdviceList');
    if (resumeAdviceList) {
      resumeAdviceList.innerHTML = (resumeAdvice || []).map(adv => `<li>${escapeHtml(adv)}</li>`).join('');
    }

    // 9. Recommended Companies
    const companiesContainer = document.getElementById('coachRecommendedCompanies');
    if (companiesContainer && recommendedCompanies) {
      companiesContainer.innerHTML = recommendedCompanies.map(c => `
        <div class="company-recommendation-card">
          <div class="company-card-header">
            <span class="company-card-title">🏢 ${escapeHtml(c.company)}</span>
            <span class="company-relevance-badge">${escapeHtml(c.estimatedRelevance || '85% Match')}</span>
          </div>
          <div class="company-card-reason"><strong>Target Role:</strong> ${escapeHtml(c.role || 'Software Role')} • ${escapeHtml(c.reason)}</div>
          <div class="company-card-disclaimer">⚠️ ${escapeHtml(c.disclaimer || 'Recommendation only, not hiring eligibility')}</div>
        </div>
      `).join('');
    }

    coachResultsSection.classList.remove('hidden');
    coachResultsSection.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleAskCoachChat(queryText) {
    const studentId = coachStudentSelect.value;
    const targetRole = coachRoleSelect.value;
    const promptQuery = queryText || (coachChatInput ? coachChatInput.value.trim() : '');

    if (!studentId || !targetRole) {
      showError('Please select a student profile and target role before querying the Career Coach Assistant.');
      return;
    }

    if (!promptQuery) return;

    hideError();
    if (loadingOverlay) {
      document.getElementById('loadingTitle').textContent = 'Consulting AI Career Coach Assistant...';
      document.getElementById('loadingSubtitle').textContent = `Processing query: "${promptQuery.substring(0, 40)}..."`;
      loadingOverlay.classList.remove('hidden');
    }

    try {
      const response = await fetch('/api/career-coach/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, targetRole, query: promptQuery })
      });

      const res = await response.json();
      if (!response.ok || !res.success) throw new Error(res.error || res.message || 'Failed to process AI Coach chat query.');

      const chatAnswer = res.analysis?.chatAnswer || res.analysis?.executiveSummary;
      const chatBox = document.getElementById('coachChatResponseBox');
      const chatAnswerText = document.getElementById('coachChatAnswerText');

      if (chatBox && chatAnswerText) {
        chatAnswerText.textContent = chatAnswer;
        chatBox.classList.remove('hidden');
        chatBox.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      showError('Coach Assistant Error: ' + err.message);
    } finally {
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
    }
  }

  init();
});
