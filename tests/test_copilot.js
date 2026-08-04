import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://localhost:3000/api/copilot/query';

const copilotTestCases = [
  {
    id: 'COPILOT-01',
    capability: 'Student Risk Detection',
    query: 'Which students are likely to remain unplaced?'
  },
  {
    id: 'COPILOT-02',
    capability: 'Employer Recommendation',
    query: 'Which companies should we invite for Mechanical students?'
  },
  {
    id: 'COPILOT-03',
    capability: 'Placement Insights',
    query: 'Which department is falling behind in placement rate?'
  },
  {
    id: 'COPILOT-04',
    capability: 'Drive Health Monitoring',
    query: 'Which placement drives need immediate attention?'
  },
  {
    id: 'COPILOT-05',
    capability: 'Communication Assistant',
    query: 'Draft an email to unplaced students for resume review'
  },
  {
    id: 'COPILOT-06',
    capability: 'Report Copilot',
    query: 'What is the overall placement rate and batch summary?'
  }
];

async function runCopilotTests() {
  console.log('========================================================================');
  console.log('  PlacementHub AI Lab - Executing Placement Copilot (POC 4) Test Suite');
  console.log('========================================================================\n');

  for (const tc of copilotTestCases) {
    const startTime = Date.now();
    console.log(`[${tc.id}] Capability: ${tc.capability} | Query: "${tc.query}"`);

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: tc.query })
      });

      const responseTimeMs = Date.now() - startTime;
      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(`❌ [${tc.id}] FAILED:`, data.error || 'Unknown Error');
      } else {
        const { data: copilotData, meta } = data;
        console.log(`  ✓ Headline: ${copilotData.headline}`);
        console.log(`  ✓ Summary: ${copilotData.summary.substring(0, 100)}...`);
        console.log(`  ✓ Execution: ${responseTimeMs}ms (${meta.modelUsed})\n`);
      }
    } catch (err) {
      console.error(`❌ [${tc.id}] EXCEPTION:`, err.message);
    }
  }
}

runCopilotTests();
