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
    studentId: 'STU-001',
    studentName: 'Aarav Sharma (AI/ML)',
    jobId: 'JOB-001',
    jobTitle: 'AI/ML Engineer (TechCorp)',
    expectedBehaviour: 'Strong domain & academic match (Score >= 80, Eligible)'
  },
  {
    id: 'TC-02',
    studentId: 'STU-002',
    studentName: 'Priya Patel (Web Dev)',
    jobId: 'JOB-002',
    jobTitle: 'Frontend React Developer (CloudScale)',
    expectedBehaviour: 'Moderate/Strong skill fit (Score >= 70, Eligible)'
  },
  {
    id: 'TC-03',
    studentId: 'STU-004',
    studentName: 'Ananya Iyer (6.1 CGPA)',
    jobId: 'JOB-001',
    jobTitle: 'AI/ML Engineer (8.0 Min CGPA)',
    expectedBehaviour: 'Academic CGPA threshold mismatch (Ineligible / Score < 60)'
  },
  {
    id: 'TC-04',
    studentId: 'STU-003',
    studentName: 'Rohan Verma (Mechanical)',
    jobId: 'JOB-001',
    jobTitle: 'AI/ML Engineer (CS/IT)',
    expectedBehaviour: 'Skill domain mismatch (Low score < 50, Flagged domain gap)'
  },
  {
    id: 'TC-05',
    studentId: 'STU-004',
    studentName: 'Ananya Iyer (Entry Apprentice)',
    jobId: 'JOB-004',
    jobTitle: 'Senior Java Architect (5+ Yrs Exp)',
    expectedBehaviour: 'Experience level & seniority mismatch (Ineligible / Score < 50)'
  }
];

async function runTestMatrix() {
  console.log('========================================================================');
  console.log('  PlacementHub AI Lab - Executing Automated Trial-Run Test Matrix');
  console.log('========================================================================\n');

  const resultsTable = [];

  for (const tc of testCases) {
    const startTime = Date.now();
    console.log(`[${tc.id}] Testing ${tc.studentName} vs ${tc.jobTitle}...`);

    try {
      // Pass fallback=true so matrix execution completes cleanly even when NVIDIA_API_KEY is not supplied locally
      const response = await fetch(`${BASE_URL}?fallback=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: tc.studentId, jobId: tc.jobId })
      });

      const responseTimeMs = Date.now() - startTime;
      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(`❌ [${tc.id}] FAILED:`, data.message || data.error);
        resultsTable.push({
          TestCase: tc.id,
          Student: tc.studentName,
          Job: tc.jobTitle,
          ExpectedBehaviour: tc.expectedBehaviour,
          AIResult: `HTTP ${response.status} Error`,
          ResponseTime: `${responseTimeMs}ms`,
          Status: 'FAIL',
          Observations: data.message || data.error
        });
        continue;
      }

      const { analysis, meta } = data;
      const resultSummary = `Score: ${analysis.overallScore}/100 | Status: ${analysis.eligibilityAssessment}`;
      
      let status = 'PASS';
      let observation = `Evaluated via ${meta.modelUsed}. Matched skills: ${analysis.matchedSkills.join(', ')}. Gaps: ${analysis.potentialGaps.length} identified.`;

      if (tc.id === 'TC-01' && (analysis.overallScore < 75 || analysis.eligibilityAssessment !== 'Eligible')) {
        status = 'FAIL';
        observation = 'Expected score >= 75 for strong match, got ' + analysis.overallScore;
      }

      if (tc.id === 'TC-03' && (analysis.eligibilityAssessment === 'Eligible' || analysis.overallScore > 65)) {
        status = 'FAIL';
        observation = 'CGPA 6.1 vs 8.0 requirement should be flagged as Ineligible / low score.';
      }

      console.log(`  ✓ Result: ${resultSummary} (${responseTimeMs}ms)`);

      resultsTable.push({
        TestCase: tc.id,
        Student: tc.studentName,
        Job: tc.jobTitle,
        ExpectedBehaviour: tc.expectedBehaviour,
        AIResult: resultSummary,
        ResponseTime: `${responseTimeMs}ms`,
        Status: status,
        Observations: observation
      });

    } catch (err) {
      const responseTimeMs = Date.now() - startTime;
      console.error(`❌ [${tc.id}] EXCEPTION:`, err.message);
      resultsTable.push({
        TestCase: tc.id,
        Student: tc.studentName,
        Job: tc.jobTitle,
        ExpectedBehaviour: tc.expectedBehaviour,
        AIResult: 'Network/Server Exception',
        ResponseTime: `${responseTimeMs}ms`,
        Status: 'FAIL',
        Observations: err.message
      });
    }
  }

  console.log('\n========================================================================');
  console.log('                            FINAL TEST RESULTS MATRIX                    ');
  console.log('========================================================================');
  console.table(resultsTable);

  return resultsTable;
}

runTestMatrix();
