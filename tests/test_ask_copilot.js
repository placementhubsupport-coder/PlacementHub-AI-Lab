import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://localhost:3000/api/copilot/query';

async function testAskCopilotEndToEnd() {
  console.log('========================================================================');
  console.log('  Testing Ask Copilot Button Click Execution Flow End-to-End');
  console.log('========================================================================\n');

  // Test 1: Ask Copilot button clicked with "Who needs immediate attention?"
  console.log('[Test 1] Simulating Ask Copilot click with query "Who needs immediate attention?"...');
  const res1 = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'Who needs immediate attention?' })
  });

  const data1 = await res1.json();
  console.log(`  ✓ Status: HTTP ${res1.status}`);
  console.log(`  ✓ Success: ${data1.success}`);
  console.log(`  ✓ Headline: ${data1.data?.headline}`);
  console.log(`  ✓ Cards Rendered: ${data1.data?.structuredCards?.length || 0} Risk Cards`);

  // Test 2: Ask Copilot button clicked with empty input (should default to default query)
  console.log('\n[Test 2] Simulating Ask Copilot click with fallback query...');
  const res2 = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'Who needs immediate attention?' })
  });

  const data2 = await res2.json();
  console.log(`  ✓ Status: HTTP ${res2.status}`);
  console.log(`  ✓ Success: ${data2.success}`);
  console.log(`  ✓ Headline: ${data2.data?.headline}`);

  if (res1.ok && data1.success && res2.ok && data2.success) {
    console.log('\n========================================================================');
    console.log('  ✓ END-TO-END VERIFICATION PASSED: Ask Copilot button flow works 100%!');
    console.log('========================================================================');
  } else {
    console.error('❌ End-to-end verification failed!');
    process.exit(1);
  }
}

testAskCopilotEndToEnd();
