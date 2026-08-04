import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'http://localhost:3000/api/career-coach/analyze';

const testCases = [
  {
    id: 'COACH-TC-01',
    studentId: 'STU-001',
    targetRole: 'AI Engineer',
    query: 'How can I improve my placement chances'
  },
  {
    id: 'COACH-TC-02',
    studentId: 'STU-002',
    targetRole: 'Frontend Developer',
    query: 'What projects should I build'
  },
  {
    id: 'COACH-TC-03',
    studentId: 'STU-004',
    targetRole: 'Backend Developer',
    query: 'Suggest a 30-day preparation plan'
  },
  {
    id: 'COACH-TC-04',
    studentId: 'STU-003',
    targetRole: 'DevOps Engineer',
    query: 'Which companies should I target'
  }
];

async function runCareerCoachTests() {
  console.log('========================================================================');
  console.log('  PlacementHub AI Lab - Executing POC 5 Career Coach Test Suite');
  console.log('========================================================================\n');

  let passedCount = 0;

  for (const tc of testCases) {
    console.log(`[${tc.id}] Testing ${tc.studentId} targeting ${tc.targetRole}...`);
    try {
      const response = await fetch(`${BASE_URL}?fallback=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: tc.studentId, targetRole: tc.targetRole, query: tc.query })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(`❌ [${tc.id}] FAILED:`, data.error || data.message);
        continue;
      }

      const { analysis, meta } = data;
      console.log(`  ✓ Readiness Score: ${analysis.readinessScore}%`);
      console.log(`  ✓ Strengths: ${analysis.strengths.length} items`);
      console.log(`  ✓ Improvement Areas: ${analysis.improvementAreas.length} items`);
      console.log(`  ✓ Skill Gap Missing: ${analysis.skillGapAnalysis.missingSkills.join(', ')}`);
      console.log(`  ✓ Milestone Roadmap: ${analysis.careerRoadmap.length} weeks`);
      console.log(`  ✓ Recommended Companies: ${analysis.recommendedCompanies.length} items`);
      console.log(`  ✓ Disclaimer: "${analysis.disclaimer || analysis.recommendedCompanies[0]?.disclaimer}"`);
      if (analysis.chatAnswer) {
        console.log(`  ✓ Chat Answer: "${analysis.chatAnswer.substring(0, 80)}..."`);
      }
      console.log(`  ✓ Inference Meta: ${meta.modelUsed} (${meta.responseTimeMs}ms)\n`);

      passedCount++;
    } catch (err) {
      console.error(`❌ [${tc.id}] EXCEPTION:`, err.message);
    }
  }

  console.log('========================================================================');
  console.log(`  Summary: ${passedCount} / ${testCases.length} Test Cases Passed Successfully.`);
  console.log('========================================================================\n');
}

runCareerCoachTests();
