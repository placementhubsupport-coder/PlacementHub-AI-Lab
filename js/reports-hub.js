/**
 * PlacementHub AI Solutions — Traditional Reports Hub Controller
 * Preview + demo download only. Does not alter AI POC workflows.
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
Audience: Placement Committee / Dean / TPO

KEY METRICS
--------------------------------------------------------------------------------
Total Graduating Class .............. 420
Overall Placement Rate .............. 92.4%
Offers Extended ..................... 162
Offers Accepted ..................... 147
PPOs ................................ 34
Average CTC ......................... ₹14.8 LPA
Median CTC .......................... ₹12.4 LPA
Highest Package ..................... ₹32.0 LPA

NOTES
--------------------------------------------------------------------------------
Figures sourced from demo campus drive ledgers. For AI deep-dives use Tools 5–6.
`
  },
  'placement-dept': {
    title: 'Department-wise Placement Report',
    type: 'Excel',
    body: `Department,Total Students,Placed,Placement Rate,Avg CTC,Highest CTC
CSE,180,172,95.5%,₹18.2 LPA,₹32.0 LPA
IT,120,112,93.3%,₹15.4 LPA,₹24.0 LPA
ECE,80,71,88.7%,₹11.8 LPA,₹18.0 LPA
ME,40,33,82.5%,₹8.5 LPA,₹14.0 LPA
`
  },
  'placement-company': {
    title: 'Company-wise Placement Report',
    type: 'PDF',
    body: `PLACEMENTHUB — COMPANY-WISE PLACEMENT REPORT (Demo)
================================================================================
TechCorp AI Labs ............. 18 offers · Avg ₹22.4 LPA · Domain: AI/ML
FinEdge Analytics ............ 12 offers · Avg ₹16.8 LPA · Domain: FinTech
DataScale Systems ............ 9 offers · Avg ₹14.2 LPA · Domain: Backend
PuneTech Innovations ......... 7 offers · Avg ₹11.5 LPA · Domain: Frontend
Cognitive Scale AI Labs ...... 6 offers · Avg ₹13.0 LPA · Domain: AI UI
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
    body: `PLACEMENTHUB — PLACEMENT STATISTICS PACK (Demo)
================================================================================
Super Dream (≥ ₹20 LPA) ...... 22 students
Dream (≥ ₹10 LPA) ............ 68 students
Core / Service ............... 57 students
Internship + PPO path ........ 34 students
`
  },
  'student-eligible': {
    title: 'Eligible Students Register',
    type: 'Excel',
    body: null
  },
  'student-registered': {
    title: 'Registered Students',
    type: 'Excel',
    body: null
  },
  'student-ppo': {
    title: 'PPO Students',
    type: 'PDF',
    body: `PLACEMENTHUB — PPO STUDENTS (Demo)
================================================================================
Arjun Verma (CSE) — TechCorp AI Labs PPO · ₹24.0 LPA
Priya Sharma (IT) — FinEdge Analytics · In PPO Discussion
`
  },
  'student-attendance': {
    title: 'Attendance Summary',
    type: 'Excel',
    body: `Department,OA Attendance %,Interview Attendance %,Drop-Off Risk
CSE,98.2%,74.5%,Low
IT,95.0%,70.0%,Low
ECE,91.2%,62.5%,Medium
ME,58.4%,42.0%,High
`
  },
  'student-risk': {
    title: 'At-Risk Students',
    type: 'PDF',
    body: null
  },
  'recruiter-visits': {
    title: 'Recruiter Visit Log',
    type: 'Excel',
    body: `Date,Company,Mode,Contact,Outcome
2026-06-12,TechCorp AI Labs,On-campus,Priya Nair,Drive Confirmed
2026-06-18,FinEdge Analytics,Virtual,Imran Khan,JD Shared
2026-07-02,DataScale Systems,On-campus,Anita Desai,Shortlist Finalized
2026-07-15,PuneTech Innovations,Hybrid,Rohan Mehta,Intern Offers Released
`
  },
  'recruiter-active': {
    title: 'Active Recruiters',
    type: 'PDF',
    body: `Active recruiter partners (Demo): TechCorp, FinEdge, DataScale, PuneTech, Cognitive Scale.
Pipeline stage: Confirmation → JD Lock → OA → Interviews → Offers.
`
  },
  'recruiter-engagement': {
    title: 'Company Engagement',
    type: 'Excel',
    body: `Company,Visits,Students Interviewed,Offers,Engagement Index
TechCorp AI Labs,3,42,18,9.4
FinEdge Analytics,2,31,12,8.8
DataScale Systems,2,27,9,8.1
`
  },
  'recruiter-offers': {
    title: 'Offer Status',
    type: 'PDF',
    body: `Offers Extended: 162 | Accepted: 147 | Pending: 9 | Declined: 6
Top pending partners: 2 FinTech, 1 DeepTech.
`
  },
  'recruiter-feedback': {
    title: 'Recruiter Feedback Summary',
    type: 'PDF',
    body: `Common positives: PyTorch depth, system design interviews, professional communication.
Common gaps: Kubernetes exposure, SQL for ME tracks, schedule collisions on OA days.
`
  },
  'hiring-funnel': {
    title: 'Hiring Funnel',
    type: 'PDF',
    body: null
  },
  'hiring-acceptance': {
    title: 'Offer Acceptance',
    type: 'Excel',
    body: `Stage,Count,Rate
Offers Extended,162,100%
Offers Accepted,147,90.7%
Joined / Confirmed,141,87.0%
`
  },
  'hiring-salary': {
    title: 'Salary Distribution',
    type: 'PDF',
    body: `Bands: <8 LPA 18% | 8–12 LPA 34% | 12–20 LPA 33% | 20+ LPA 15%
Mean ₹14.8 LPA · Median ₹12.4 LPA · Mode band 8–12 LPA
`
  },
  'hiring-branch': {
    title: 'Branch-wise Hiring',
    type: 'Excel',
    body: null
  },
  'hiring-packages': {
    title: 'Highest Packages',
    type: 'PDF',
    body: `1. ₹32.0 LPA — TechCorp AI Labs (CSE)
2. ₹28.5 LPA — Cognitive Scale (CSE)
3. ₹24.0 LPA — TechCorp PPO (CSE)
4. ₹22.0 LPA — FinEdge Analytics (IT)
5. ₹18.0 LPA — DataScale Systems (ECE)
`
  },
  'export-placement-pdf': {
    title: 'Placement Summary.pdf',
    type: 'PDF',
    filename: 'Placement_Summary_2026.txt',
    body: null
  },
  'export-student-xlsx': {
    title: 'Student Register.xlsx',
    type: 'Excel',
    filename: 'Student_Register_2026.csv',
    body: null
  },
  'export-committee-pdf': {
    title: 'Committee Report.pdf',
    type: 'PDF',
    filename: 'Committee_Report_2026.txt',
    body: null
  },
  'export-recruiter-xlsx': {
    title: 'Recruiter Summary.xlsx',
    type: 'Excel',
    filename: 'Recruiter_Summary_2026.csv',
    body: null
  },
  'export-hiring-csv': {
    title: 'Hiring Statistics.csv',
    type: 'CSV',
    filename: 'Hiring_Statistics_2026.csv',
    body: `Metric,Value
Total Drives,42
Placement Rate,92.4%
Avg CTC,₹14.8 LPA
PPOs,34
`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Reports] Traditional Reports Hub initialized');
  renderStudentPreviewTable();
  renderRecruiterPreviewTable();
  renderHiringSummaryTable();
  bindPreviewDownloads();
  syncHashNav();
  window.addEventListener('hashchange', syncHashNav);
});

function syncHashNav() {
  const hash = (location.hash || '#placement').replace('#', '');
  document.querySelectorAll('.wf-sidebar-link[href*="reports-hub.html#"]').forEach((link) => {
    const linkHash = (link.getAttribute('href') || '').split('#')[1];
    link.classList.toggle('active', linkHash === hash);
  });
}

function deriveRollNo(candidate, index) {
  const dept = candidate.department || 'GEN';
  return `2022${dept}${String(10 + index).padStart(3, '0')}`;
}

function renderStudentPreviewTable() {
  const tbody = document.getElementById('student-report-tbody');
  if (!tbody) return;

  const rows = mockCandidates.slice(0, 6).map((c, i) => {
    const roll = deriveRollNo(c, i);
    return `<tr>
<td style="font-family: var(--font-mono); font-size: 12px;">${roll}</td>
<td><strong>${c.name}</strong></td>
<td><span class="wf-badge wf-badge-outline">${c.department}</span></td>
<td>${c.cgpa}</td>
<td><span class="wf-badge wf-badge-dark">${c.status}</span></td>
</tr>`;
  }).join('');

  tbody.innerHTML = rows;
}

function renderRecruiterPreviewTable() {
  const tbody = document.getElementById('recruiter-report-tbody');
  if (!tbody) return;

  const rows = mockDrives.slice(0, 5).map((d) => `<tr>
<td><strong>${d.company}</strong></td>
<td>${d.title}</td>
<td>${d.location}</td>
<td>${d.deadline}</td>
<td><span class="wf-badge wf-badge-dark">${d.matchScore}% fit</span></td>
</tr>`).join('');

  tbody.innerHTML = rows;
}

function renderHiringSummaryTable() {
  const tbody = document.getElementById('hiring-report-tbody');
  if (!tbody) return;
  const depts = mockHiringPerformanceData.departments || [];
  tbody.innerHTML = depts.map((d) => `<tr>
<td><strong>${d.dept}</strong></td>
<td>${d.totalStudents}</td>
<td>${d.placedCount} (${d.placementRate})</td>
<td>${d.avgCtc}</td>
<td>${d.highestCtc}</td>
<td>${d.topRecruiter}</td>
</tr>`).join('');
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
    .map((f) => `${f.stage.padEnd(24, ' ')} ${String(f.count).padStart(4, ' ')}  ${f.percentage || f.conversion || ''}`)
    .join('\n');
  return `PLACEMENTHUB — HIRING / PARTICIPATION FUNNEL (Demo)\n================================================================================\n${funnel}\n`;
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
    case 'student-eligible':
    case 'student-registered':
    case 'export-student-xlsx':
      return buildStudentRegisterCsv();
    case 'student-risk':
      return buildRiskListText();
    case 'hiring-funnel':
      return buildFunnelText();
    case 'hiring-branch':
    case 'export-hiring-csv':
      return meta.body || buildBranchCsv();
    case 'export-placement-pdf':
      return REPORT_CATALOG['placement-summary'].body;
    case 'export-committee-pdf':
      return `PLACEMENTHUB COMMITTEE REPORT (Demo)\n================================================================================\nDate: 2026-08-07\n\n${REPORT_CATALOG['placement-summary'].body}\n\n${buildRiskListText()}`;
    case 'export-recruiter-xlsx':
      return REPORT_CATALOG['recruiter-visits'].body;
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
  const content = resolveReportBody(reportId, meta);
  body.textContent = content;
  modal.style.display = 'flex';
  modal.setAttribute('data-active-report', reportId);
  showToast('Preview available — generated from demo dataset', 'info', 2200);
}

function closePreview() {
  const modal = document.getElementById('report-preview-modal');
  if (modal) modal.style.display = 'none';
}

function bindPreviewDownloads() {
  document.querySelectorAll('[data-report-preview]').forEach((btn) => {
    btn.addEventListener('click', () => openPreview(btn.getAttribute('data-report-preview')));
  });
  document.querySelectorAll('[data-report-download]').forEach((btn) => {
    btn.addEventListener('click', () => downloadReport(btn.getAttribute('data-report-download')));
  });

  const closeBtn = document.getElementById('report-preview-close');
  const backdrop = document.getElementById('report-preview-backdrop');
  const downloadBtn = document.getElementById('report-preview-download');

  if (closeBtn) closeBtn.addEventListener('click', closePreview);
  if (backdrop) backdrop.addEventListener('click', closePreview);
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const modal = document.getElementById('report-preview-modal');
      const id = modal ? modal.getAttribute('data-active-report') : null;
      if (id) downloadReport(id);
    });
  }
}
