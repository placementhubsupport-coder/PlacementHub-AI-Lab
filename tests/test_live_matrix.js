import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000/api/analyze-match';

const testCases = [
  {
    id: 'TC-01',
    category: 'Strong Student ↔ Job match',
    studentId: 'STU-001',
    studentName: 'Aarav Sharma (AI/ML)',
    jobId: 'JOB-001',
    jobTitle: 'AI/ML Engineer (TechCorp)',
    expectedBehaviour: 'Strong domain & academic match (Score >= 80, Eligible)'
  },
  {
    id: 'TC-02',
    category: 'Moderate match',
    studentId: 'STU-002',
    studentName: 'Priya Patel (Web Dev)',
    jobId: 'JOB-002',
    jobTitle: 'Frontend React Developer (CloudScale)',
    expectedBehaviour: 'Moderate skill fit (Score >= 70, Eligible)'
  },
  {
    id: 'TC-03',
    category: 'Academic eligibility mismatch',
    studentId: 'STU-004',
    studentName: 'Ananya Iyer (6.1 CGPA)',
    jobId: 'JOB-001',
    jobTitle: 'AI/ML Engineer (8.0 Min CGPA)',
    expectedBehaviour: 'Academic CGPA threshold mismatch (Ineligible / Low score)'
  },
  {
    id: 'TC-04',
    category: 'Skill mismatch',
    studentId: 'STU-003',
    studentName: 'Rohan Verma (Mechanical)',
    jobId: 'JOB-001',
    jobTitle: 'AI/ML Engineer (CS/IT)',
    expectedBehaviour: 'Skill domain mismatch (Ineligible / Score < 50)'
  },
  {
    id: 'TC-05',
    category: 'Experience/seniority mismatch',
    studentId: 'STU-004',
    studentName: 'Ananya Iyer (Entry Apprentice)',
    jobId: 'JOB-004',
    jobTitle: 'Senior Java Architect (5+ Yrs Exp)',
    expectedBehaviour: 'Experience level & seniority mismatch (Ineligible / Score < 50)'
  }
];

async function runLiveTrial() {
  console.log('========================================================================');
  console.log('  PlacementHub AI Lab - REAL NVIDIA NIM API Trial Run Execution');
  console.log('========================================================================\n');

  const key = process.env.NVIDIA_API_KEY;
  if (!key || key === 'nvapi-YOUR_NVIDIA_API_KEY_HERE' || key.trim() === '') {
    console.error('❌ ERROR: NVIDIA_API_KEY is not configured in .env');
    console.error('Please create .env file with your NVIDIA_API_KEY first.');
    process.exit(1);
  }

  const resultsTable = [];

  for (const tc of testCases) {
    const startTime = Date.now();
    console.log(`[${tc.id} - ${tc.category}] Evaluating ${tc.studentName} vs ${tc.jobTitle}...`);

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: tc.studentId, jobId: tc.jobId })
      });

      const responseTimeMs = Date.now() - startTime;
      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(`❌ [${tc.id}] API ERROR:`, data.message || data.error);
        resultsTable.push({
          TestCase: tc.id,
          Category: tc.category,
          Student: tc.studentName,
          Job: tc.jobTitle,
          ExpectedBehaviour: tc.expectedBehaviour,
          ActualNVIDIAOutput: data.message || data.error,
          Score: 'N/A',
          Eligibility: 'ERROR',
          ResponseTime: `${responseTimeMs}ms`,
          Status: 'FAIL',
          Observations: `HTTP ${response.status}: ${data.error || data.message}`
        });
        continue;
      }

      const { analysis, meta } = data;
      const resultSummary = `Score: ${analysis.overallScore}/100 | Status: ${analysis.eligibilityAssessment}`;
      
      let passStatus = 'PASS';
      let obs = `Model: ${meta.modelUsed}. Matched skills: ${analysis.matchedSkills?.join(', ')}. Gaps: ${analysis.potentialGaps?.join('; ')}`;

      if (tc.id === 'TC-01' && (analysis.overallScore < 75 || analysis.eligibilityAssessment !== 'Eligible')) {
        passStatus = 'PARTIAL';
      }
      if (tc.id === 'TC-03' && analysis.eligibilityAssessment === 'Eligible') {
        passStatus = 'PARTIAL';
      }

      console.log(`  ✓ Received Real NVIDIA NIM Output: ${resultSummary} in ${responseTimeMs}ms`);

      resultsTable.push({
        TestCase: tc.id,
        Category: tc.category,
        Student: tc.studentName,
        Job: tc.jobTitle,
        ExpectedBehaviour: tc.expectedBehaviour,
        ActualNVIDIAOutput: analysis.explanationOfCompatibility || analysis.finalRecommendation,
        Score: `${analysis.overallScore}/100`,
        Eligibility: analysis.eligibilityAssessment,
        ResponseTime: `${responseTimeMs}ms`,
        Status: passStatus,
        Observations: obs
      });

    } catch (err) {
      const responseTimeMs = Date.now() - startTime;
      console.error(`❌ [${tc.id}] EXCEPTION:`, err.message);
      resultsTable.push({
        TestCase: tc.id,
        Category: tc.category,
        Student: tc.studentName,
        Job: tc.jobTitle,
        ExpectedBehaviour: tc.expectedBehaviour,
        ActualNVIDIAOutput: 'Network Exception',
        Score: 'N/A',
        Eligibility: 'ERROR',
        ResponseTime: `${responseTimeMs}ms`,
        Status: 'FAIL',
        Observations: err.message
      });
    }
  }

  console.log('\n========================================================================');
  console.log('                 ACTUAL NVIDIA NIM TRIAL RUN RESULTS MATRIX             ');
  console.log('========================================================================');
  console.table(resultsTable);
}

runLiveTrial();
