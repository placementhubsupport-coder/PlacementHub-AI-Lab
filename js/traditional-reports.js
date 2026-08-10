/**
 * PlacementHub AI Solutions — Traditional Reports (dedicated pages)
 * Preview, download, table filters only. Does not alter AI POC workflows.
 */

import {
  mockCandidates,
  mockDrives,
  mockStudentParticipationData,
  mockHiringPerformanceData
} from '../data/mockData.js';
import { showToast } from './components.js';

const REPORT_CATALOG = {
  'placement-summary': {
    title: 'Overall Placement Summary',
    type: 'PDF',
    body: `PLACEMENTHUB — OVERALL PLACEMENT SUMMARY (Demo)
================================================================================
Academic Year: 2025–26 | Generated: 07 Aug 2026
Total Class 420 | Placement Rate 92.4% | Offers 162 | Accepted 147 | PPOs 34
Avg CTC ₹14.8 LPA | Median ₹12.4 LPA | Highest ₹32.0 LPA
`
  },
  'placement-dept': {
    title: 'Department-wise Placement Report',
    type: 'Excel',
    body: null
  },
  'placement-company': {
    title: 'Company-wise Placement Report',
    type: 'PDF',
    body: `TechCorp AI Labs — 18 offers · ₹22.4 LPA avg
FinEdge Analytics — 12 offers · ₹16.8 LPA avg
DataScale Systems — 9 offers · ₹14.2 LPA avg
PuneTech Innovations — 7 offers · ₹11.5 LPA avg
Cognitive Scale AI Labs — 6 offers · ₹13.0 LPA avg
`
  },
  'placement-monthly': {
    title: 'Monthly Placement Report',
    type: 'Excel',
    body: `Month,Drives,Offers,Acceptances,Avg CTC
Jun 2026,8,28,24,₹13.2 LPA
Jul 2026,12,46,41,₹14.6 LPA
Aug 2026,14,52,48,₹15.1 LPA
Sep 2026,8,36,34,₹15.8 LPA
`
  },
  'placement-stats': {
    title: 'Placement Statistics',
    type: 'PDF',
    body: `Super Dream (≥₹20 LPA): 22 | Dream (≥₹10 LPA): 68 | Core: 57 | PPO path: 34`
  },
  'student-eligible': { title: 'Eligible Students', type: 'Excel', body: null },
  'student-registered': { title: 'Registered Students', type: 'Excel', body: null },
  'student-ppo': {
    title: 'PPO Students',
    type: 'PDF',
    body: `Arjun Verma (CSE) — TechCorp PPO ₹24.0 LPA
Priya Sharma (IT) — FinEdge · In PPO Discussion`
  },
  'student-attendance': {
    title: 'Attendance Summary',
    type: 'Excel',
    body: `Department,OA %,Interview %,Risk
CSE,98.2%,74.5%,Low
IT,95.0%,70.0%,Low
ECE,91.2%,62.5%,Medium
ME,58.4%,42.0%,High`
  },
  'student-risk': { title: 'At-Risk Students', type: 'PDF', body: null },
  'recruiter-visits': {
    title: 'Recruiter Visit Log',
    type: 'Excel',
    body: `Date,Company,Mode,Contact,Outcome
2026-06-12,TechCorp AI Labs,On-campus,Priya Nair,Drive Confirmed
2026-06-18,FinEdge Analytics,Virtual,Imran Khan,JD Shared
2026-07-02,DataScale Systems,On-campus,Anita Desai,Shortlist Finalized
2026-07-15,PuneTech Innovations,Hybrid,Rohan Mehta,Intern Offers Released`
  },
  'recruiter-active': {
    title: 'Active Recruiters',
    type: 'PDF',
    body: `Active partners: TechCorp, FinEdge, DataScale, PuneTech, Cognitive Scale.`
  },
  'recruiter-engagement': {
    title: 'Company Engagement',
    type: 'Excel',
    body: `Company,Visits,Interviewed,Offers,Index
TechCorp AI Labs,3,42,18,9.4
FinEdge Analytics,2,31,12,8.8
DataScale Systems,2,27,9,8.1`
  },
  'recruiter-offers': {
    title: 'Offer Status',
    type: 'PDF',
    body: `Extended 162 | Accepted 147 | Pending 9 | Declined 6`
  },
  'recruiter-feedback': {
    title: 'Recruiter Feedback Summary',
    type: 'PDF',
    body: `Positives: PyTorch depth, system design, communication.
Gaps: Kubernetes, SQL for ME, OA schedule collisions.`
  },
  'hiring-funnel': { title: 'Hiring Funnel', type: 'PDF', body: null },
  'hiring-acceptance': {
    title: 'Offer Acceptance',
    type: 'Excel',
    body: `Stage,Count,Rate
Offers Extended,162,100%
Offers Accepted,147,90.7%
Joined / Confirmed,141,87.0%`
  },
  'hiring-salary': {
    title: 'Salary Distribution',
    type: 'PDF',
    body: `<8 LPA 18% | 8–12 LPA 34% | 12–20 LPA 33% | 20+ LPA 15%`
  },
  'hiring-branch': { title: 'Branch-wise Hiring', type: 'Excel', body: null },
  'hiring-packages': {
    title: 'Highest Packages',
    type: 'PDF',
    body: `₹32.0 LPA TechCorp (CSE)
₹28.5 LPA Cognitive Scale (CSE)
₹24.0 LPA TechCorp PPO (CSE)
₹22.0 LPA FinEdge (IT)
₹18.0 LPA DataScale (ECE)`
  },
  'export-placement-pdf': { title: 'Placement Summary.pdf', type: 'PDF', filename: 'Placement_Summary_2026.txt', body: null },
  'export-student-xlsx': { title: 'Student Register.xlsx', type: 'Excel', filename: 'Student_Register_2026.csv', body: null },
  'export-committee-pdf': { title: 'Committee Report.pdf', type: 'PDF', filename: 'Committee_Report_2026.txt', body: null },
  'export-recruiter-xlsx': { title: 'Recruiter Summary.xlsx', type: 'Excel', filename: 'Recruiter_Summary_2026.csv', body: null },
  'export-hiring-csv': {
    title: 'Hiring Statistics.csv',
    type: 'CSV',
    filename: 'Hiring_Statistics_2026.csv',
    body: `Metric,Value
Total Drives,42
Placement Rate,92.4%
Avg CTC,₹14.8 LPA
PPOs,34`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-report-page') || 'placement';
  console.log(`[Reports] Traditional report page ready: ${page}`);
  ensurePreviewModal();
  initPage(page);
  renderDemoChart(page);
  bindPreviewDownloads();
  bindFilters(page);
});

/** Build visible static demo bars (px heights — % heights collapse in wireframe chart groups). */
function renderDemoChart(page) {
  const mount = document.getElementById('report-demo-chart');
  if (!mount) return;

  let items = [];
  let caption = 'Demo chart';

  if (page === 'placement' || page === 'hiring') {
    caption = page === 'placement' ? 'Placement rate by department' : 'Hiring conversion by department';
    items = (mockHiringPerformanceData.departments || []).map((d) => ({
      label: d.dept,
      value: parseFloat(String(d.placementRate).replace('%', '')) || 0,
      tip: d.placementRate
    }));
  } else if (page === 'student') {
    caption = 'Avg participation score by department';
    const buckets = {};
    (mockStudentParticipationData.students || []).forEach((s) => {
      if (!buckets[s.department]) buckets[s.department] = [];
      buckets[s.department].push(Number(s.participationScore) || 0);
    });
    items = Object.keys(buckets).map((dept) => {
      const vals = buckets[dept];
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      return { label: dept, value: avg, tip: `${avg.toFixed(0)} / 100` };
    });
    if (!items.length) {
      items = (mockStudentParticipationData.funnel || []).slice(0, 5).map((f) => ({
        label: f.stage.split(' ')[0],
        value: parseFloat(String(f.percentage).replace('%', '')) || 0,
        tip: f.percentage
      }));
    }
  } else if (page === 'recruiter') {
    caption = 'Drive fit score by company';
    items = (mockDrives || []).slice(0, 5).map((d) => ({
      label: String(d.company).split(' ')[0].slice(0, 8),
      value: Number(d.matchScore) || 0,
      tip: `${d.matchScore}%`
    }));
  } else if (page === 'export') {
    caption = 'Export packages by format';
    const counts = { PDF: 0, Excel: 0, CSV: 0 };
    Object.values(REPORT_CATALOG).forEach((meta) => {
      if (counts[meta.type] != null) counts[meta.type] += 1;
    });
    items = Object.entries(counts).map(([label, value]) => ({
      label,
      value,
      tip: `${value} packs`
    }));
  }

  if (!items.length) {
    mount.innerHTML = '<p style="font-size:13px;color:var(--text-muted);margin:0;">No demo chart data.</p>';
    return;
  }

  const max = Math.max(...items.map((i) => i.value), 1);
  const bars = items
    .map((item, idx) => {
      const px = Math.max(28, Math.round((item.value / max) * 120));
      const secondary = idx >= Math.ceil(items.length / 2) ? ' secondary' : '';
      return `<div class="wf-chart-bar-group">
<div class="wf-chart-bar${secondary}" style="height:${px}px;" title="${item.tip || item.value}"></div>
<span class="wf-chart-label">${item.label}</span>
<span class="wf-chart-label" style="color:var(--text-secondary);">${item.tip || item.value}</span>
</div>`;
    })
    .join('');

  mount.innerHTML = `<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">${caption}</div>
<div class="wf-chart-bars">${bars}</div>`;
}

function deriveRollNo(candidate, index) {
  const dept = candidate.department || 'GEN';
  return `2022${dept}${String(10 + index).padStart(3, '0')}`;
}

function ensurePreviewModal() {
  if (document.getElementById('report-preview-modal')) return;
  document.body.insertAdjacentHTML('beforeend', `
<div id="report-preview-modal" class="wf-modal-backdrop" style="display:none;align-items:center;justify-content:center;position:fixed;inset:0;z-index:10000;background:rgba(17,24,39,0.45);" data-active-report="">
<div id="report-preview-backdrop" style="position:absolute;inset:0;"></div>
<div class="wf-modal-dialog wf-modal-visible" style="position:relative;z-index:2;width:min(720px,92vw);max-height:80vh;overflow:auto;border-style:solid;border-color:var(--border-medium);background:var(--bg-surface);">
<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;">
<div>
<div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Report Preview</div>
<strong id="report-preview-title" style="font-size:16px;">Report</strong>
</div>
<div style="display:flex;gap:8px;align-items:center;">
<span id="report-preview-type" class="wf-badge wf-badge-dark">PDF</span>
<button class="wf-btn wf-btn-xs wf-btn-ghost" id="report-preview-close" type="button">Close</button>
</div>
</div>
<pre id="report-preview-body" style="white-space:pre-wrap;font-family:var(--font-mono);font-size:12px;line-height:1.55;background:var(--bg-muted);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:14px;color:var(--text-primary);max-height:48vh;overflow:auto;"></pre>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">
<button class="wf-btn wf-btn-sm wf-btn-secondary" type="button" id="report-preview-close-2">Close</button>
<button class="wf-btn wf-btn-sm wf-btn-primary" id="report-preview-download" type="button">Download Demo File</button>
</div>
</div>
</div>`);
}

function initPage(page) {
  if (page === 'placement') renderPlacementTable();
  if (page === 'student') renderStudentTable();
  if (page === 'recruiter') renderRecruiterTable();
  if (page === 'hiring') renderHiringTable();
  if (page === 'export') { /* static table in HTML */ }
}

function renderPlacementTable(filter = {}) {
  const tbody = document.getElementById('report-main-tbody');
  if (!tbody) return;
  const query = (filter.q || '').toLowerCase();
  const dept = filter.dept || 'ALL';
  let rows = (mockHiringPerformanceData.departments || []).filter((d) => {
    const matchesDept = dept === 'ALL' || d.dept === dept;
    const hay = `${d.dept} ${d.topRecruiter} ${d.placementRate}`.toLowerCase();
    return matchesDept && (!query || hay.includes(query));
  });
  tbody.innerHTML = rows.map((d) => `<tr>
<td><strong>${d.dept}</strong></td>
<td>${d.totalStudents}</td>
<td>${d.placedCount}</td>
<td>${d.placementRate}</td>
<td>${d.avgCtc}</td>
<td>${d.highestCtc}</td>
<td>${d.topRecruiter}</td>
</tr>`).join('') || `<tr><td colspan="7">No departments match filters.</td></tr>`;
}

function renderStudentTable(filter = {}) {
  const tbody = document.getElementById('report-main-tbody');
  if (!tbody) return;
  const query = (filter.q || '').toLowerCase();
  const dept = filter.dept || 'ALL';
  const status = filter.status || 'ALL';
  const rows = mockCandidates
    .map((c, i) => ({ ...c, rollNo: deriveRollNo(c, i) }))
    .filter((c) => {
      const matchesDept = dept === 'ALL' || c.department === dept;
      const matchesStatus = status === 'ALL' || c.status === status;
      const hay = `${c.rollNo} ${c.name} ${c.department} ${c.status}`.toLowerCase();
      return matchesDept && matchesStatus && (!query || hay.includes(query));
    });
  tbody.innerHTML = rows.map((c) => `<tr>
<td style="font-family:var(--font-mono);font-size:12px;">${c.rollNo}</td>
<td><strong>${c.name}</strong></td>
<td><span class="wf-badge wf-badge-outline">${c.department}</span></td>
<td>${c.cgpa}</td>
<td><span class="wf-badge wf-badge-dark">${c.status}</span></td>
</tr>`).join('') || `<tr><td colspan="5">No students match filters.</td></tr>`;
}

function renderRecruiterTable(filter = {}) {
  const tbody = document.getElementById('report-main-tbody');
  if (!tbody) return;
  const query = (filter.q || '').toLowerCase();
  const rows = mockDrives.filter((d) => {
    const hay = `${d.company} ${d.title} ${d.location}`.toLowerCase();
    return !query || hay.includes(query);
  });
  tbody.innerHTML = rows.map((d) => `<tr>
<td><strong>${d.company}</strong></td>
<td>${d.title}</td>
<td>${d.location}</td>
<td>${d.deadline}</td>
<td>${d.batch || '2026 Batch'}</td>
<td><span class="wf-badge wf-badge-dark">${d.matchScore}%</span></td>
</tr>`).join('') || `<tr><td colspan="6">No recruiters match filters.</td></tr>`;
}

function renderHiringTable(filter = {}) {
  const tbody = document.getElementById('report-main-tbody');
  if (!tbody) return;
  const query = (filter.q || '').toLowerCase();
  const dept = filter.dept || 'ALL';
  const rows = (mockHiringPerformanceData.departments || []).filter((d) => {
    const matchesDept = dept === 'ALL' || d.dept === dept;
    const hay = `${d.dept} ${d.topRecruiter}`.toLowerCase();
    return matchesDept && (!query || hay.includes(query));
  });
  tbody.innerHTML = rows.map((d) => `<tr>
<td><strong>${d.dept}</strong></td>
<td>${d.totalStudents}</td>
<td>${d.placedCount} (${d.placementRate})</td>
<td>${d.avgCtc}</td>
<td>${d.highestCtc}</td>
<td>${d.topRecruiter}</td>
<td><span class="wf-badge wf-badge-dark">${d.conversionIndex}</span></td>
</tr>`).join('') || `<tr><td colspan="7">No rows match filters.</td></tr>`;
}

function bindFilters(page) {
  const search = document.getElementById('report-search-input');
  const dept = document.getElementById('report-dept-filter');
  const status = document.getElementById('report-status-filter');
  const apply = () => {
    const filter = {
      q: search ? search.value.trim() : '',
      dept: dept ? dept.value : 'ALL',
      status: status ? status.value : 'ALL'
    };
    if (page === 'placement') renderPlacementTable(filter);
    if (page === 'student') renderStudentTable(filter);
    if (page === 'recruiter') renderRecruiterTable(filter);
    if (page === 'hiring') renderHiringTable(filter);
  };
  if (search) search.addEventListener('input', apply);
  if (dept) dept.addEventListener('change', apply);
  if (status) status.addEventListener('change', apply);
}

function buildStudentRegisterCsv() {
  const header = 'Roll No,Student Name,Department,CGPA,Status,Target Role';
  const lines = mockCandidates.map((c, i) =>
    `${deriveRollNo(c, i)},${c.name},${c.department},${c.cgpa},${c.status},"${c.targetRole}"`
  );
  return [header, ...lines].join('\n');
}

function buildRiskListText() {
  const risks = (mockStudentParticipationData.predictiveCohort || [])
    .map((s) => `- ${s.name} (${s.rollNo}, ${s.department}) · ${s.riskScore} · ${s.predictedStage}`)
    .join('\n');
  return `PLACEMENTHUB — AT-RISK STUDENTS (Demo)\n================================================================================\n${risks}\n`;
}

function buildFunnelText() {
  const funnel = (mockHiringPerformanceData.funnel || mockStudentParticipationData.funnel || [])
    .map((f) => `${f.stage.padEnd(24, ' ')} ${String(f.count).padStart(4, ' ')}  ${f.percentage || ''}`)
    .join('\n');
  return `PLACEMENTHUB — HIRING FUNNEL (Demo)\n================================================================================\n${funnel}\n`;
}

function buildBranchCsv() {
  const header = 'Department,Total,Placed,Rate,Avg CTC,Highest CTC';
  const lines = (mockHiringPerformanceData.departments || []).map((d) =>
    `${d.dept},${d.totalStudents},${d.placedCount},${d.placementRate},${d.avgCtc},${d.highestCtc}`
  );
  return [header, ...lines].join('\n');
}

function resolveReportBody(reportId, meta) {
  if (meta.body) return meta.body;
  switch (reportId) {
    case 'placement-dept':
    case 'hiring-branch':
      return buildBranchCsv();
    case 'student-eligible':
    case 'student-registered':
    case 'export-student-xlsx':
      return buildStudentRegisterCsv();
    case 'student-risk':
      return buildRiskListText();
    case 'hiring-funnel':
      return buildFunnelText();
    case 'export-placement-pdf':
      return REPORT_CATALOG['placement-summary'].body;
    case 'export-committee-pdf':
      return `PLACEMENTHUB COMMITTEE REPORT (Demo)\n\n${REPORT_CATALOG['placement-summary'].body}\n\n${buildRiskListText()}`;
    case 'export-recruiter-xlsx':
      return REPORT_CATALOG['recruiter-visits'].body;
    case 'export-hiring-csv':
      return buildBranchCsv();
    default:
      return `${meta.title}\n\nGenerated from PlacementHub demo dataset.\n`;
  }
}

function buildFilename(meta) {
  if (meta.filename) return meta.filename;
  const stamp = new Date().toISOString().slice(0, 10);
  const base = meta.title.replace(/[^\w]+/g, '_').replace(/^_|_$/g, '');
  if (meta.type === 'Excel' || meta.type === 'CSV') return `${base}_${stamp}.csv`;
  return `${base}_${stamp}.txt`;
}

function downloadReport(reportId) {
  const meta = REPORT_CATALOG[reportId];
  if (!meta) return;
  const content = resolveReportBody(reportId, meta);
  const safeName = buildFilename(meta);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast(`Downloaded demo file: ${safeName}`, 'success');
}

function openPreview(reportId) {
  const meta = REPORT_CATALOG[reportId];
  if (!meta) return;
  const modal = document.getElementById('report-preview-modal');
  const title = document.getElementById('report-preview-title');
  const body = document.getElementById('report-preview-body');
  const typeBadge = document.getElementById('report-preview-type');
  if (!modal || !title || !body) return;
  title.textContent = meta.title;
  if (typeBadge) typeBadge.textContent = meta.type;
  body.textContent = resolveReportBody(reportId, meta);
  modal.style.display = 'flex';
  modal.classList.add('wf-backdrop-visible');
  modal.setAttribute('data-active-report', reportId);
  showToast('Preview available — generated from demo dataset', 'info', 2200);
}

function closePreview() {
  const modal = document.getElementById('report-preview-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('wf-backdrop-visible');
  }
}

function bindPreviewDownloads() {
  document.querySelectorAll('[data-report-preview]').forEach((btn) => {
    btn.addEventListener('click', () => openPreview(btn.getAttribute('data-report-preview')));
  });
  document.querySelectorAll('[data-report-download]').forEach((btn) => {
    btn.addEventListener('click', () => downloadReport(btn.getAttribute('data-report-download')));
  });
  const closeBtn = document.getElementById('report-preview-close');
  const closeBtn2 = document.getElementById('report-preview-close-2');
  const backdrop = document.getElementById('report-preview-backdrop');
  const downloadBtn = document.getElementById('report-preview-download');
  if (closeBtn) closeBtn.addEventListener('click', closePreview);
  if (closeBtn2) closeBtn2.addEventListener('click', closePreview);
  if (backdrop) backdrop.addEventListener('click', closePreview);
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const modal = document.getElementById('report-preview-modal');
      const id = modal ? modal.getAttribute('data-active-report') : null;
      if (id) downloadReport(id);
    });
  }
}
