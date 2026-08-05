/**
 * PlacementHub AI Lab — Placement Copilot Interactive Controller
 * Handles ChatGPT/Claude/Copilot-style streaming chat session management, prompt starters,
 * mock tool call executions, rich responses with inline POC actions, and localStorage history.
 */

import { mockCandidates, mockResumes, mockDrives } from '../data/mockData.js';
import { showToast, asyncSimulateApiCall } from './components.js';

// Initial Default Sessions
const defaultSessions = [
  {
    id: 'session-1',
    title: 'TechCorp Resume Audit',
    category: 'Today',
    updatedAt: '10:42 AM',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: "Analyze Arjun Verma's resume and match score against TechCorp AI Labs criteria.",
        timestamp: '10:42 AM'
      },
      {
        id: 'msg-2',
        sender: 'assistant',
        text: "I reviewed Arjun Verma's profile and compared it against TechCorp AI Labs requirements.\n\nArjun has an exceptional **96.4% match score** with strong expertise in PyTorch, Transformers, and CUDA. His resume score is **94/100**.\n\n**Identified Skill Gaps:**\n- TensorRT-LLM\n- Kubernetes cluster deployment\n\nWould you like me to generate a targeted 7-day preparation roadmap or schedule an AI mock interview?",
        timestamp: '10:42 AM',
        toolCall: {
          name: 'Match & Resume Review',
          status: 'Done',
          details: [
            { label: 'Resume Score', val: '94 / 100' },
            { label: 'Match Score', val: '96.4%' },
            { label: 'Skill Gaps', val: 'Kubernetes, TensorRT-LLM' }
          ],
          linkText: 'View full resume review →',
          linkUrl: 'poc2-resume-analyzer.html'
        },
        actionBtn: {
          text: 'Open Candidate Matching →',
          url: 'poc1-student-job-matching.html'
        }
      }
    ]
  },
  {
    id: 'session-2',
    title: 'Batch 2026 Shortlist',
    category: 'Today',
    updatedAt: '9:15 AM',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Find all 2026 batch candidates eligible for Full Stack Developer drives.',
        timestamp: '9:15 AM'
      },
      {
        id: 'msg-4',
        sender: 'assistant',
        text: 'Evaluated 148 candidates across CSE and IT departments. Found **2 top eligible candidates** matching Full Stack criteria:\n\n1. **Priya Sharma** — Match 94.2% · CGPA 8.8 · Skills: React, Node.js, GraphQL\n2. **Rohan Gupta** — Match 91.5% · CGPA 8.5 · Skills: React, Java, Spring Boot',
        timestamp: '9:15 AM',
        toolCall: {
          name: 'Candidate Skill Alignment',
          status: 'Done',
          details: [
            { label: 'Evaluated Count', val: '148 Candidates' },
            { label: 'Top Match', val: 'Priya Sharma (94.2%)' }
          ],
          linkText: 'Open Candidate Matching →',
          linkUrl: 'poc1-student-job-matching.html'
        },
        actionBtn: {
          text: 'Compare Selected Candidates →',
          url: 'poc1-student-job-matching.html'
        }
      }
    ]
  },
  {
    id: 'session-3',
    title: 'Pune Drive Search',
    category: 'Previous 7 days',
    updatedAt: 'Aug 3',
    messages: [
      {
        id: 'msg-5',
        sender: 'user',
        text: 'Search React internships in Pune with stipend above ₹20K.',
        timestamp: 'Aug 3'
      },
      {
        id: 'msg-6',
        sender: 'assistant',
        text: 'Found **2 active placement drives** matching your criteria in Pune:\n\n- **PuneTech Innovations**: ₹25,000/mo · PPO ₹8.5-12 LPA · Deadline Aug 20\n- **Cognitive Scale AI Labs**: ₹30,000/mo · PPO ₹12-15 LPA · Deadline Sep 05',
        timestamp: 'Aug 3',
        toolCall: {
          name: 'Placement Drive Search',
          status: 'Done',
          details: [
            { label: 'Drives Found', val: '2 Active Drives' },
            { label: 'Avg Stipend', val: '₹27,500 / month' }
          ],
          linkText: 'Open Placement Search →',
          linkUrl: 'poc3-placement-search.html'
        },
        actionBtn: {
          text: 'View Drives in Placement Search →',
          url: 'poc3-placement-search.html'
        }
      }
    ]
  }
];

// Controller State
let sessions = JSON.parse(localStorage.getItem('ph_copilot_sessions') || 'null');
if (!sessions || sessions.length === 0) {
  sessions = defaultSessions;
  localStorage.setItem('ph_copilot_sessions', JSON.stringify(sessions));
}

let activeSessionId = sessions[0].id;
let isStreaming = false;
let streamInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initSessionsSidebar();
  initComposer();
  initHeaderActions();
  initContextRail();
  renderSession();
});

// ============================================================================
// 1. SESSIONS SIDEBAR MANAGEMENT
// ============================================================================
function initSessionsSidebar() {
  const btnNew = document.getElementById('btn-new-session');
  if (btnNew) {
    btnNew.addEventListener('click', () => {
      createNewSession();
    });
  }

  renderSessionsList();
}

function renderSessionsList() {
  const container = document.getElementById('sessions-nav-container');
  if (!container) return;

  const todaySessions = sessions.filter(s => s.category === 'Today');
  const pastSessions = sessions.filter(s => s.category !== 'Today');

  let html = '';

  if (todaySessions.length > 0) {
    html += `
      <div class="wf-sidebar-section">
        <div class="wf-sidebar-label">Today</div>
        <ul class="wf-sidebar-nav">
          ${todaySessions.map(s => renderSessionNavItem(s)).join('')}
        </ul>
      </div>
    `;
  }

  if (pastSessions.length > 0) {
    html += `
      <div class="wf-sidebar-section">
        <div class="wf-sidebar-label">Previous 7 days</div>
        <ul class="wf-sidebar-nav">
          ${pastSessions.map(s => renderSessionNavItem(s)).join('')}
        </ul>
      </div>
    `;
  }

  container.innerHTML = html;

  // Click handlers for switching active session
  container.querySelectorAll('.session-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-session-id');
      activeSessionId = id;
      renderSessionsList();
      renderSession();
    });
  });
}

function renderSessionNavItem(s) {
  const isActive = s.id === activeSessionId;
  const activeClass = isActive ? 'wf-sidebar-link active' : 'wf-sidebar-link';
  const lastMsg = s.messages.length > 0 ? s.messages[s.messages.length - 1].text.slice(0, 24) + '...' : 'New chat';

  return `
    <li>
      <a href="#" class="${activeClass} session-nav-link" data-session-id="${s.id}" style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px; height: auto; padding: 8px 10px;">
        <span style="font-size: 12px; font-weight: 600;">${s.title}</span>
        <span style="font-size: 11px; opacity: 0.7;">${lastMsg}</span>
      </a>
    </li>
  `;
}

function createNewSession() {
  const newId = `session-${Date.now()}`;
  const newSession = {
    id: newId,
    title: `New Session #${sessions.length + 1}`,
    category: 'Today',
    updatedAt: 'Just now',
    messages: []
  };

  sessions.unshift(newSession);
  saveSessions();
  activeSessionId = newId;
  renderSessionsList();
  renderSession();
  showToast('Created new Placement Copilot session.', 'info');
}

function saveSessions() {
  localStorage.setItem('ph_copilot_sessions', JSON.stringify(sessions));
}

// ============================================================================
// 2. CHAT STREAM & MESSAGES RENDERING
// ============================================================================
function renderSession() {
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const titleHeader = document.getElementById('session-title-header');
  const streamContainer = document.getElementById('chat-message-stream');
  const emptyState = document.getElementById('chat-empty-state');

  if (titleHeader && activeSession) {
    titleHeader.textContent = activeSession.title;
  }

  if (!streamContainer) return;

  if (!activeSession || activeSession.messages.length === 0) {
    streamContainer.innerHTML = '';
    if (emptyState) {
      emptyState.style.display = 'flex';
      streamContainer.appendChild(emptyState);
      initPromptChips();
    }
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  streamContainer.innerHTML = activeSession.messages.map(m => {
    if (m.sender === 'user') {
      return `
        <div class="wf-chat-bubble wf-chat-bubble-user">
          <span class="wf-chat-meta">You · ${m.timestamp}</span>
          <p>${escapeHtml(m.text)}</p>
        </div>
      `;
    } else {
      let toolCallHTML = '';
      if (m.toolCall) {
        toolCallHTML = `
          <div class="wf-tool-call-card" style="margin: 8px 0;">
            <div class="wf-tool-call-header" style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 600; color: var(--text-muted); border-bottom: 1px solid var(--border-subtle); padding-bottom: 4px; margin-bottom: 6px;">
              <span>⚡ Tool Executed: ${m.toolCall.name}</span>
              <span class="wf-badge wf-badge-dark">${m.toolCall.status}</span>
            </div>
            <div class="wf-tool-call-body" style="font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
              ${m.toolCall.details.map(d => `<div style="display: flex; justify-content: space-between;"><span>${d.label}</span><strong>${d.val}</strong></div>`).join('')}
            </div>
            <div class="wf-tool-call-footer" style="margin-top: 6px; font-size: 11px;">
              <a href="${m.toolCall.linkUrl}" style="color: var(--text-muted); text-decoration: underline;">${m.toolCall.linkText}</a>
            </div>
          </div>
        `;
      }

      let actionBtnHTML = '';
      if (m.actionBtn) {
        actionBtnHTML = `
          <a href="${m.actionBtn.url}" class="wf-btn wf-btn-xs wf-btn-primary wf-inline-action" style="margin-top: 10px; display: inline-block;">${m.actionBtn.text}</a>
        `;
      }

      return `
        <div class="wf-chat-bubble wf-chat-bubble-ai">
          <span class="wf-chat-meta">Placement Assistant · ${m.timestamp}</span>
          <div class="wf-chat-text" style="font-size: 13px; line-height: 1.5; white-space: pre-wrap;">${formatAiMarkdown(m.text)}</div>
          ${toolCallHTML}
          ${actionBtnHTML}
          <div style="display: flex; gap: 8px; margin-top: 8px; font-size: 11px;">
            <button class="wf-btn-ghost wf-btn-xs btn-copy-msg" data-msg-text="${encodeURIComponent(m.text)}" style="color: var(--text-muted);">Copy</button>
            <button class="wf-btn-ghost wf-btn-xs btn-regen-msg" style="color: var(--text-muted);">Regenerate</button>
          </div>
        </div>
      `;
    }
  }).join('');

  // Scroll stream to bottom
  streamContainer.scrollTop = streamContainer.scrollHeight;

  // Copy & Regenerate handlers
  streamContainer.querySelectorAll('.btn-copy-msg').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = decodeURIComponent(e.target.getAttribute('data-msg-text'));
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied Copilot response to clipboard.', 'success');
      });
    });
  });

  streamContainer.querySelectorAll('.btn-regen-msg').forEach(btn => {
    btn.addEventListener('click', () => {
      if (activeSession.messages.length >= 2) {
        const lastUserMsg = activeSession.messages.filter(m => m.sender === 'user').pop();
        if (lastUserMsg) handleSendMessage(lastUserMsg.text);
      }
    });
  });
}

function initPromptChips() {
  const container = document.getElementById('chat-prompt-chips');
  if (!container) return;

  container.querySelectorAll('.wf-prompt-chip').forEach(chip => {
    chip.style.cursor = 'pointer';
    chip.addEventListener('click', () => {
      const promptText = chip.textContent.trim();
      handleSendMessage(promptText);
    });
  });
}

// ============================================================================
// 3. COMPOSER & STREAMING AI ENGINE
// ============================================================================
function initComposer() {
  const textarea = document.getElementById('chat-input-textarea');
  const btnSend = document.getElementById('btn-send-chat');
  const btnStop = document.getElementById('btn-stop-chat');

  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const text = textarea.value.trim();
        if (text && !isStreaming) {
          textarea.value = '';
          handleSendMessage(text);
        }
      }
    });
  }

  if (btnSend) {
    btnSend.addEventListener('click', () => {
      if (textarea && textarea.value.trim() && !isStreaming) {
        const text = textarea.value.trim();
        textarea.value = '';
        handleSendMessage(text);
      }
    });
  }

  if (btnStop) {
    btnStop.addEventListener('click', () => {
      if (isStreaming && streamInterval) {
        clearInterval(streamInterval);
        isStreaming = false;
        toggleComposerButtons(false);
        showToast('Stopped response generation.', 'warning');
      }
    });
  }
}

function toggleComposerButtons(streaming) {
  const btnSend = document.getElementById('btn-send-chat');
  const btnStop = document.getElementById('btn-stop-chat');
  if (btnSend) btnSend.style.display = streaming ? 'none' : 'inline-flex';
  if (btnStop) btnStop.style.display = streaming ? 'inline-flex' : 'none';
}

async function handleSendMessage(userText) {
  const activeSession = sessions.find(s => s.id === activeSessionId);
  if (!activeSession) return;

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Update session title if first message
  if (activeSession.messages.length === 0) {
    activeSession.title = userText.slice(0, 26) + (userText.length > 26 ? '...' : '');
  }

  // Append user message
  activeSession.messages.push({
    id: `msg-${Date.now()}`,
    sender: 'user',
    text: userText,
    timestamp: nowTime
  });

  saveSessions();
  renderSessionsList();
  renderSession();

  // Show Loading & Streaming state
  isStreaming = true;
  toggleComposerButtons(true);

  const streamContainer = document.getElementById('chat-message-stream');
  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'wf-chat-bubble wf-chat-bubble-ai';
  loadingBubble.innerHTML = `
    <span class="wf-chat-meta">Placement Assistant · ${nowTime}</span>
    <div class="wf-tool-call-card" style="max-width: 320px; margin-top: 6px;">
      <div class="wf-tool-call-header" style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: var(--text-muted);">
        <span>⚡ Executing Placement AI Analysis...</span>
        <span class="wf-badge wf-badge-outline">Running</span>
      </div>
      <div class="wf-tool-call-body" style="padding-top: 6px;">
        <span class="wf-skeleton" style="width: 220px; height: 10px; display: block;"></span>
        <span class="wf-skeleton" style="width: 150px; height: 10px; display: block; margin-top: 4px;"></span>
      </div>
    </div>
  `;

  if (streamContainer) {
    streamContainer.appendChild(loadingBubble);
    streamContainer.scrollTop = streamContainer.scrollHeight;
  }

  await asyncSimulateApiCall(null, 1100);

  // Generate Response
  const aiResponse = generateIntelligentResponse(userText);

  // Character streaming animation
  let currentLength = 0;
  const fullText = aiResponse.text;

  if (loadingBubble && loadingBubble.parentNode) {
    loadingBubble.parentNode.removeChild(loadingBubble);
  }

  activeSession.messages.push({
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: fullText,
    timestamp: nowTime,
    toolCall: aiResponse.toolCall,
    actionBtn: aiResponse.actionBtn
  });

  saveSessions();
  renderSession();

  isStreaming = false;
  toggleComposerButtons(false);
  updateContextRailFromQuery(userText);
}

function generateIntelligentResponse(userQuery) {
  const q = userQuery.toLowerCase();

  if (q.includes('arjun') || q.includes('resume')) {
    const cand = mockCandidates.find(c => c.name.includes('Arjun')) || mockCandidates[0];
    return {
      text: `Analyzed **${cand.name}'s** resume and ATS benchmark score.\n\n- **Overall Score:** ${cand.resumeScore} / 100\n- **Match Confidence:** ${cand.matchScore}%\n- **Target Role:** ${cand.targetRole}\n- **Top Skills:** ${cand.skills.join(', ')}\n- **Skill Gaps:** ${cand.missingSkills.join(', ')}\n\n**Recommendation:** Arjun demonstrates strong research and architectural capabilities but should add cloud deployment projects.`,
      toolCall: {
        name: 'Resume Audit Engine',
        status: 'Done',
        details: [
          { label: 'Resume File', val: 'Arjun_Verma_Resume.pdf' },
          { label: 'ATS Score', val: `${cand.resumeScore} / 100` }
        ],
        linkText: 'Open Resume Review →',
        linkUrl: 'poc2-resume-analyzer.html'
      },
      actionBtn: {
        text: 'Review Resume in Resume Review →',
        url: 'poc2-resume-analyzer.html'
      }
    };
  }

  if (q.includes('search') || q.includes('react') || q.includes('pune') || q.includes('drive')) {
    return {
      text: `Ran natural language placement search for **"${userQuery}"**.\n\nFound **2 matching drives**:\n1. **PuneTech Innovations** — Frontend React Intern (₹25,000/mo · PPO ₹8.5-12 LPA)\n2. **Cognitive Scale AI Labs** — React & AI UI Developer (₹30,000/mo · PPO ₹12-15 LPA)`,
      toolCall: {
        name: 'Placement Drive Search',
        status: 'Done',
        details: [
          { label: 'Drives Found', val: '2 Active Drives' },
          { label: 'Location', val: 'Pune / Remote' }
        ],
        linkText: 'View drives in Placement Search →',
        linkUrl: 'poc3-placement-search.html'
      },
      actionBtn: {
        text: 'Open Placement Search →',
        url: 'poc3-placement-search.html'
      }
    };
  }

  if (q.includes('strategy') || q.includes('cse') || q.includes('batch')) {
    return {
      text: `Generated **2026 Batch CSE Placement Strategy**:\n\n1. **High-Tier AI Roles (35%):** Prioritize PyTorch, CUDA, and LLM fine-tuning benchmarks.\n2. **Full-Stack Drives (45%):** Focus on React 18, TypeScript, and REST APIs.\n3. **Skill Gap Mitigation:** Conduct 2-day workshops on Docker and Kubernetes.`,
      toolCall: {
        name: 'Batch Placement Strategy',
        status: 'Done',
        details: [
          { label: 'Target Batch', val: '2026 B.Tech CSE' },
          { label: 'Readiness Index', val: '92.4%' }
        ],
        linkText: 'Open Career Coach →',
        linkUrl: 'poc5-career-coach.html'
      },
      actionBtn: {
        text: 'Launch Strategy in Career Coach →',
        url: 'poc5-career-coach.html'
      }
    };
  }

  // Default response
  return {
    text: `Processed query against PlacementHub AI Solutions database.\n\nEvaluated candidate pool (${mockCandidates.length} students), active drives (${mockDrives.length} listings), and resume benchmarks.\n\nWould you like me to run skill matching, review specific candidate resumes, or search upcoming placement drives?`,
    toolCall: {
      name: 'Placement AI Knowledge Engine',
      status: 'Done',
      details: [
        { label: 'Indexed Candidates', val: `${mockCandidates.length} Students` },
        { label: 'Active Drives', val: `${mockDrives.length} Listings` }
      ],
      linkText: 'Open Candidate Matching →',
      linkUrl: 'poc1-student-job-matching.html'
    },
    actionBtn: {
      text: 'Go to Candidate Matching →',
      url: 'poc1-student-job-matching.html'
    }
  };
}

// ============================================================================
// 4. HEADER ACTIONS & CONTEXT RAIL
// ============================================================================
function initHeaderActions() {
  const btnClear = document.getElementById('btn-clear-session');
  const btnDelete = document.getElementById('btn-delete-session');

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      const activeSession = sessions.find(s => s.id === activeSessionId);
      if (activeSession) {
        activeSession.messages = [];
        saveSessions();
        renderSession();
        showToast('Cleared session message history.', 'info');
      }
    });
  }

  if (btnDelete) {
    btnDelete.addEventListener('click', () => {
      if (sessions.length <= 1) {
        showToast('Cannot delete the only active session.', 'warning');
        return;
      }

      sessions = sessions.filter(s => s.id !== activeSessionId);
      activeSessionId = sessions[0].id;
      saveSessions();
      renderSessionsList();
      renderSession();
      showToast('Deleted copilot session.', 'info');
    });
  }
}

function initContextRail() {
  const btnToggle = document.getElementById('btn-toggle-context-rail');
  const rail = document.getElementById('context-rail-aside');
  const stateText = document.getElementById('context-rail-state-text');

  if (btnToggle && rail) {
    btnToggle.addEventListener('click', () => {
      const isExpanded = rail.classList.contains('expanded');
      if (isExpanded) {
        rail.classList.remove('expanded');
        rail.style.width = '44px';
        rail.style.minWidth = '44px';
        if (stateText) stateText.textContent = 'Collapsed';
      } else {
        rail.classList.add('expanded');
        rail.style.width = '260px';
        rail.style.minWidth = '260px';
        if (stateText) stateText.textContent = 'Expanded';
      }
    });
  }
}

function updateContextRailFromQuery(query) {
  const candNameEl = document.getElementById('ctx-cand-name');
  const candRoleEl = document.getElementById('ctx-cand-role');

  if (query.toLowerCase().includes('priya')) {
    if (candNameEl) candNameEl.textContent = 'Priya Sharma';
    if (candRoleEl) candRoleEl.textContent = 'Full Stack Dev · FinEdge';
  } else if (query.toLowerCase().includes('rohan')) {
    if (candNameEl) candNameEl.textContent = 'Rohan Gupta';
    if (candRoleEl) candRoleEl.textContent = 'Backend Dev · DataScale';
  } else {
    if (candNameEl) candNameEl.textContent = 'Arjun Verma';
    if (candRoleEl) candRoleEl.textContent = 'AI Research Eng · TechCorp';
  }
}

// Helpers
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatAiMarkdown(str) {
  let formatted = escapeHtml(str);
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return formatted;
}
