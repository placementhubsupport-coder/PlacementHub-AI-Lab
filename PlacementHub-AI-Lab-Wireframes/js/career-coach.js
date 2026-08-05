/**
 * PlacementHub AI Lab — Career Coach Interactive Controller
 * Handles 6-stage readiness roadmap progression, active stage checklist workspace, 7-day planner,
 * skills matrix sorting, practice interview AI grading, celebration modal, and localStorage state persistence.
 */

import { mockCareerRoadmap, mockCandidates } from '../data/mockData.js';
import { showToast, openModal, closeModal, showLoadingOverlay, hideLoadingOverlay, asyncSimulateApiCall } from './components.js';

// Default State Definition
const defaultCoachState = {
  activeStageIndex: 2, // Stage 3 (0-indexed)
  stages: [
    {
      id: 1,
      title: 'Baseline Assessment',
      subtitle: 'Complete',
      status: 'completed',
      tasks: [
        { text: 'Complete initial skill diagnostic test', completed: true },
        { text: 'Set target placement roles & companies', completed: true },
        { text: 'Upload baseline resume draft', completed: true }
      ]
    },
    {
      id: 2,
      title: 'Resume Optimization',
      subtitle: 'Score 94/100',
      status: 'completed',
      tasks: [
        { text: 'Run AI ATS keyword audit', completed: true },
        { text: 'Apply AI phrasing suggestions to project section', completed: true },
        { text: 'Achieve ATS resume score ≥90/100', completed: true }
      ]
    },
    {
      id: 3,
      title: 'Technical Preparation',
      subtitle: 'DSA · GPU Labs',
      status: 'active',
      tasks: [
        { text: 'Solve 15 graph algorithm problems (BFS / DFS)', completed: true },
        { text: 'Complete GPU memory hierarchy lab', completed: true },
        { text: 'NVIDIA TensorRT-LLM Quantization Lab', completed: false },
        { text: 'Pass Stage 3 practice technical interview (≥80%)', completed: false }
      ]
    },
    {
      id: 4,
      title: 'System Design',
      subtitle: 'Architecture practice',
      status: 'locked',
      tasks: [
        { text: 'Design high-throughput vector search API (FAISS + Redis)', completed: false },
        { text: 'Review microservices load balancing & DB sharding', completed: false },
        { text: 'Complete System Design mock interview round', completed: false }
      ]
    },
    {
      id: 5,
      title: 'Practice Interviews',
      subtitle: 'HR & Technical rounds',
      status: 'locked',
      tasks: [
        { text: 'Complete 3 AI technical mock interviews via Copilot', completed: false },
        { text: 'Complete HR behavioral & leadership assessment', completed: false }
      ]
    },
    {
      id: 6,
      title: 'Placement Clearance',
      subtitle: 'Final clearance',
      status: 'locked',
      tasks: [
        { text: 'Achieve 100% placement readiness score', completed: false },
        { text: 'Apply to top tier placement drives', completed: false }
      ]
    }
  ],
  weeklyTasks: [
    { day: 'Mon', label: 'React 18 SSR', completed: true },
    { day: 'Tue', label: '3× Graph problems', completed: true },
    { day: 'Wed', label: 'TensorRT Lab', completed: false, isToday: true },
    { day: 'Thu', label: 'Practice Interview', completed: false },
    { day: 'Fri', label: 'System Design', completed: false },
    { day: 'Sat', label: 'Review & Notes', completed: false },
    { day: 'Sun', label: 'Rest day', completed: false }
  ],
  skills: [
    { name: 'TensorRT-LLM Quantization', req: 'Advanced', current: 'Beginner', gap: 'High', action: 'NVIDIA DLI Course →' },
    { name: 'Kubernetes', req: 'Intermediate', current: 'None', gap: 'High', action: 'K8s for ML →' },
    { name: 'Graph Algorithms', req: 'Advanced', current: 'Intermediate', gap: 'Medium', action: 'Practice problems →' },
    { name: 'Distributed Systems', req: 'Intermediate', current: 'Basic', gap: 'Medium', action: 'Practice via Assistant →' },
    { name: 'PyTorch 2.0', req: 'Advanced', current: 'Advanced', gap: 'None', action: 'Mastered' },
    { name: 'FAISS Vector Search', req: 'Advanced', current: 'Advanced', gap: 'None', action: 'Mastered' }
  ]
};

// Controller State
let state = JSON.parse(localStorage.getItem('ph_career_coach_state') || 'null');
if (!state) {
  state = defaultCoachState;
  localStorage.setItem('ph_career_coach_state', JSON.stringify(state));
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initRoadmap();
  initWeeklyPlanner();
  initSkillsMatrix();
  initPracticeQA();
  initLearningModules();
  renderAll();
});

function saveState() {
  localStorage.setItem('ph_career_coach_state', JSON.stringify(state));
}

// ============================================================================
// 1. READINESS CALCULATION & HEADER
// ============================================================================
function calculateOverallReadiness() {
  const totalTasks = state.stages.reduce((sum, s) => sum + s.tasks.length, 0);
  const doneTasks = state.stages.reduce((sum, s) => sum + s.tasks.filter(t => t.completed).length, 0);
  
  // Base score 60% + completed task proportion * 40%
  const taskPct = totalTasks > 0 ? (doneTasks / totalTasks) * 40 : 0;
  const stagePct = (state.stages.filter(s => s.status === 'completed').length / state.stages.length) * 40;
  
  let readiness = Math.round(20 + taskPct + stagePct);
  if (readiness > 100) readiness = 100;
  return readiness;
}

function initHeader() {
  const btnExport = document.getElementById('btn-export-progress');
  if (btnExport) {
    btnExport.addEventListener('click', async () => {
      showLoadingOverlay(document.body, 'Generating Career Progress Report...');
      await asyncSimulateApiCall(null, 1000);
      hideLoadingOverlay(document.body);

      const readiness = calculateOverallReadiness();
      const report = `PlacementHub AI Lab — Career Readiness Report
Candidate: Arjun Verma (B.Tech CSE, CGPA 9.4)
Date: ${new Date().toLocaleString()}
Overall Placement Readiness: ${readiness}%
Active Stage: Stage ${state.activeStageIndex + 1} — ${state.stages[state.activeStageIndex].title}
==================================================
COMPLETED ROADMAP STAGES:
${state.stages.map(s => ` [${s.status === 'completed' ? '✓' : ' '}] Stage ${s.id}: ${s.title} (${s.subtitle})`).join('\n')}

SKILL MATRIX GAPS:
${state.skills.map(sk => ` - ${sk.name} (Required: ${sk.req}, Gap: ${sk.gap})`).join('\n')}
==================================================
PLACEMENTHUB CAREER COACH ENGINE`;

      const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Career_Readiness_Report_Arjun_Verma.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Exported Career Progress Report text file.', 'success');
    });
  }
}

function renderHeader() {
  const badgeEl = document.getElementById('readiness-badge');
  const textEl = document.getElementById('readiness-text-content');
  const miniStepperContainer = document.getElementById('mini-stepper-container');
  const readiness = calculateOverallReadiness();
  const currentStage = state.stages[state.activeStageIndex];

  if (badgeEl) badgeEl.textContent = `Stage ${currentStage.id} ${currentStage.status === 'completed' ? 'Cleared' : 'Active'}`;
  if (textEl) textEl.textContent = `Readiness: ${readiness}% · ${currentStage.title} in progress · Mock Interviews: 4/5 passed`;

  if (miniStepperContainer) {
    let html = '';
    state.stages.forEach((s, idx) => {
      let stepClass = '';
      if (s.status === 'completed') stepClass = 'done';
      else if (idx === state.activeStageIndex) stepClass = 'active';

      html += `<span class="wf-mini-step ${stepClass}">${s.id}${s.status === 'completed' ? ' ✓' : ''}</span>`;
      if (idx < state.stages.length - 1) html += `<span class="wf-mini-step-connector"></span>`;
    });
    html += `<span style="font-size: 12px; color: var(--text-muted); margin-left: 6px;">Stage ${currentStage.id} of 6 — ${currentStage.title}</span>`;
    miniStepperContainer.innerHTML = html;
  }
}

// ============================================================================
// 2. 6-STAGE ROADMAP & WORKSPACE
// ============================================================================
function initRoadmap() {
  const btnCompleteStage = document.getElementById('btn-mark-stage-complete');
  if (btnCompleteStage) {
    btnCompleteStage.addEventListener('click', () => {
      markCurrentStageComplete();
    });
  }
}

function renderRoadmap() {
  const container = document.getElementById('roadmap-stages-container');
  const headerBadge = document.getElementById('roadmap-header-badge');
  const currentStage = state.stages[state.activeStageIndex];

  if (headerBadge) {
    headerBadge.textContent = `Stage ${currentStage.id} ${currentStage.status === 'completed' ? 'Cleared' : 'Active'}`;
  }

  if (!container) return;

  container.innerHTML = state.stages.map((s, idx) => {
    let statusClass = '';
    let badgeText = `Stage ${s.id}`;

    if (s.status === 'completed') {
      statusClass = 'completed';
      badgeText = `Stage ${s.id} ✓`;
    } else if (idx === state.activeStageIndex) {
      statusClass = 'active';
      badgeText = `Stage ${s.id} — Active`;
    }

    return `
      <div class="wf-timeline-step-prominent ${statusClass}" data-stage-idx="${idx}" style="cursor: pointer;">
        <span class="wf-timeline-step-badge">${badgeText}</span>
        <span class="wf-timeline-step-title">${s.title}</span>
        <span style="font-size: 11px; color: ${idx === state.activeStageIndex ? 'var(--text-secondary)' : 'var(--text-muted)'}; font-weight: 500;">${s.subtitle}</span>
      </div>
    `;
  }).join('');

  container.querySelectorAll('[data-stage-idx]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-stage-idx'));
      const targetStage = state.stages[idx];

      if (targetStage.status === 'locked') {
        showToast(`Stage ${targetStage.id} is locked. Complete Stage ${targetStage.id - 1} first!`, 'warning');
      } else {
        state.activeStageIndex = idx;
        saveState();
        renderAll();
      }
    });
  });

  renderActiveWorkspace();
}

function renderActiveWorkspace() {
  const currentStage = state.stages[state.activeStageIndex];
  const titleEl = document.getElementById('stage-workspace-title');
  const descEl = document.getElementById('stage-workspace-desc');
  const badgeEl = document.getElementById('stage-workspace-badge');
  const checklistContainer = document.getElementById('stage-checklist-container');
  const criteriaEl = document.getElementById('stage-completion-criteria');
  const btnComplete = document.getElementById('btn-mark-stage-complete');

  if (titleEl) titleEl.textContent = `Stage ${currentStage.id} — ${currentStage.title}`;
  if (descEl) descEl.textContent = `Tasks, 7-day plan, and completion criteria for Stage ${currentStage.id}`;

  if (badgeEl) {
    badgeEl.textContent = currentStage.status === 'completed' ? 'Completed ✓' : (currentStage.status === 'active' ? 'In Progress' : 'Locked');
    badgeEl.className = currentStage.status === 'completed' ? 'wf-badge wf-badge-dark' : 'wf-badge wf-badge-outline';
  }

  if (btnComplete) {
    btnComplete.style.display = currentStage.status === 'completed' ? 'none' : 'inline-block';
  }

  if (checklistContainer) {
    checklistContainer.innerHTML = currentStage.tasks.map((task, tIdx) => `
      <label style="display: flex; gap: 8px; align-items: flex-start; cursor: pointer;">
        <input type="checkbox" class="task-checkbox" data-task-idx="${tIdx}" ${task.completed ? 'checked' : ''} style="margin-top: 2px;">
        <span style="${task.completed ? 'color: var(--text-muted); text-decoration: line-through;' : ''}">${task.text}</span>
      </label>
    `).join('');

    checklistContainer.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const tIdx = parseInt(cb.getAttribute('data-task-idx'));
        currentStage.tasks[tIdx].completed = cb.checked;
        saveState();
        renderHeader();
        renderActiveWorkspace();
      });
    });
  }

  const doneCount = currentStage.tasks.filter(t => t.completed).length;
  if (criteriaEl) {
    criteriaEl.innerHTML = `<strong>To complete this stage:</strong> ${doneCount} of ${currentStage.tasks.length} tasks done.`;
  }
}

function markCurrentStageComplete() {
  const currentStage = state.stages[state.activeStageIndex];
  currentStage.status = 'completed';
  currentStage.tasks.forEach(t => t.completed = true);

  // Unlock next stage if exists
  if (state.activeStageIndex < state.stages.length - 1) {
    const nextStage = state.stages[state.activeStageIndex + 1];
    if (nextStage.status === 'locked') {
      nextStage.status = 'active';
    }
    state.activeStageIndex += 1;
    saveState();
    renderAll();
    showToast(`🎉 Stage ${currentStage.id} completed! Unlocked Stage ${nextStage.id}.`, 'success');
  } else {
    // All 6 stages completed!
    saveState();
    renderAll();
    openModal('modal-placement-ready');
    showToast('🎉 All 6 stages cleared! Placement Ready!', 'success');
  }
}

// ============================================================================
// 3. WEEKLY PLANNER (7-DAY PLAN)
// ============================================================================
function initWeeklyPlanner() {
  // Attached via renderWeeklyPlanner
}

function renderWeeklyPlanner() {
  const container = document.getElementById('week-grid-container');
  if (!container) return;

  container.innerHTML = state.weeklyTasks.map((t, idx) => {
    let dayClass = 'wf-week-day';
    if (t.completed) dayClass += ' done';
    if (t.isToday) dayClass += ' today';

    return `
      <div class="${dayClass}" data-week-idx="${idx}" style="cursor: pointer;">
        <span class="wf-week-day-label">${t.day}${t.isToday ? ' ·' : ''}</span>
        <span class="wf-week-day-task">${t.label}</span>
      </div>
    `;
  }).join('');

  container.querySelectorAll('[data-week-idx]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-week-idx'));
      state.weeklyTasks[idx].completed = !state.weeklyTasks[idx].completed;
      saveState();
      renderWeeklyPlanner();
      showToast(`Updated ${state.weeklyTasks[idx].day} task state.`, 'info');
    });
  });
}

// ============================================================================
// 4. SKILLS MATRIX & GAPS
// ============================================================================
function initSkillsMatrix() {
  const sortSelect = document.getElementById('sort-skills-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'name-asc') {
        state.skills.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        const gapOrder = { High: 3, Medium: 2, None: 1 };
        state.skills.sort((a, b) => gapOrder[b.gap] - gapOrder[a.gap]);
      }
      renderSkillsMatrix();
    });
  }
}

function renderSkillsMatrix() {
  const tbody = document.getElementById('skills-matrix-tbody');
  if (!tbody) return;

  tbody.innerHTML = state.skills.map(sk => {
    const isMastered = sk.gap === 'None';
    const gapBadgeClass = isMastered ? 'wf-badge' : 'wf-badge wf-badge-outline';

    return `
      <tr>
        <td><strong>${sk.name}</strong></td>
        <td>${sk.req}</td>
        <td>${sk.current}</td>
        <td><span class="${gapBadgeClass}">${sk.gap}</span></td>
        <td>
          ${isMastered ? '<span style="color: var(--text-muted); font-size: 12px;">Mastered</span>' : `<button class="wf-btn wf-btn-xs btn-skill-action">${sk.action}</button>`}
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.btn-skill-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseSec = document.getElementById('course-tensorrt');
      if (courseSec) courseSec.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ============================================================================
// 5. PRACTICE INTERVIEWS AI EVALUATOR
// ============================================================================
function initPracticeQA() {
  const btnSubmit1 = document.getElementById('btn-submit-qa-1');
  const btnSubmit2 = document.getElementById('btn-submit-qa-2');

  if (btnSubmit1) {
    btnSubmit1.addEventListener('click', async () => {
      const text = document.getElementById('qa-textarea-1').value.trim();
      const resultBox = document.getElementById('qa-grade-result-1');

      if (!text) {
        showToast('Please type an answer before submitting.', 'warning');
        return;
      }

      showLoadingOverlay(document.body, 'Evaluating GPU Architecture response with AI...');
      await asyncSimulateApiCall(null, 1100);
      hideLoadingOverlay(document.body);

      if (resultBox) resultBox.style.display = 'block';
      showToast('AI graded Q1 response: 92/100 (Strong Match)!', 'success');
    });
  }

  if (btnSubmit2) {
    btnSubmit2.addEventListener('click', async () => {
      const text = document.getElementById('qa-textarea-2').value.trim();
      const resultBox = document.getElementById('qa-grade-result-2');

      if (!text) {
        showToast('Please type an answer before submitting.', 'warning');
        return;
      }

      showLoadingOverlay(document.body, 'Evaluating System Design response with AI...');
      await asyncSimulateApiCall(null, 1000);
      hideLoadingOverlay(document.body);

      if (resultBox) resultBox.style.display = 'block';
      showToast('AI graded Q2 response: 88/100!', 'success');
    });
  }
}

// ============================================================================
// 6. LEARNING MODULES & MODAL TRIGGERS
// ============================================================================
function initLearningModules() {
  document.querySelectorAll('.btn-toggle-course').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-course-id');
      if (id === 'c1') {
        document.getElementById('course-progress-bar-1').style.width = '100%';
        document.getElementById('course-status-1').textContent = '100% · Completed ✓';
      } else {
        document.getElementById('course-progress-bar-2').style.width = '100%';
        document.getElementById('course-status-2').textContent = '100% · Completed ✓';
      }
      btn.textContent = 'Completed ✓';
      btn.disabled = true;
      showToast('Marked learning module complete.', 'success');
    });
  });

  // Modal close triggers
  document.querySelectorAll('#modal-placement-ready .modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => closeModal('modal-placement-ready'));
  });
}

function renderAll() {
  renderHeader();
  renderRoadmap();
  renderWeeklyPlanner();
  renderSkillsMatrix();
}
