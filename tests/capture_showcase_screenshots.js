import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const SHOWCASE_DIR = path.resolve('POC-Showcase');

// Ensure screenshot directories exist
const dirs = [
  path.join(SHOWCASE_DIR, 'screenshots'),
  path.join(SHOWCASE_DIR, 'POC-01-Student-Job-Matching', 'screenshots'),
  path.join(SHOWCASE_DIR, 'POC-02-Resume-Analyzer', 'screenshots'),
  path.join(SHOWCASE_DIR, 'POC-03-Natural-Language-Placement-Search', 'screenshots'),
  path.join(SHOWCASE_DIR, 'POC-04-Placement-Copilot', 'screenshots')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

async function captureScreenshots() {
  console.log('====================================================');
  console.log('  Capturing Clean Showcase Screenshots via Playwright');
  console.log('====================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  
  // Inject client-side fetch override to force mock fallback mode for instant clean rendering
  await context.addInitScript(() => {
    const origFetch = window.fetch;
    window.fetch = function (url, opts) {
      if (typeof url === 'string' && url.includes('/api/') && opts && opts.method === 'POST') {
        const urlWithFallback = url.includes('?') ? url + '&fallback=true' : url + '?fallback=true';
        try {
          const bodyObj = JSON.parse(opts.body || '{}');
          bodyObj.forceMock = true;
          opts.body = JSON.stringify(bodyObj);
        } catch (e) {}
        return origFetch(urlWithFallback, opts);
      }
      return origFetch(url, opts);
    };
  });

  const page = await context.newPage();

  // 1. Overall App Interface & POC 1 Matching Screen
  console.log('Capturing Overall Interface & POC 1 Screen...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'screenshots', '01-overall-app-interface.png') });
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-01-Student-Job-Matching', 'screenshots', '01-matching-screen.png') });

  // Perform POC 1 Match Analysis
  console.log('Performing POC 1 Match Analysis...');
  await page.selectOption('#studentSelect', 'STU-001');
  await page.selectOption('#jobSelect', 'JOB-001');
  await page.click('#analyzeBtn');
  await page.waitForSelector('#resultsSection:not(.hidden)', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-01-Student-Job-Matching', 'screenshots', '02-matching-result.png') });

  // 2. POC 2 Resume Analyzer Screen & Results
  console.log('Capturing POC 2 Resume Analyzer Screen & Results...');
  await page.click('#tabResume');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-02-Resume-Analyzer', 'screenshots', '01-resume-analyzer-screen.png') });

  await page.selectOption('#resumeStudentSelect', 'STU-006');
  await page.selectOption('#resumeJobSelect', 'JOB-001');
  await page.click('#analyzeResumeBtn');
  await page.waitForSelector('#resumeResultsSection:not(.hidden)', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-02-Resume-Analyzer', 'screenshots', '02-hard-and-semantic-result.png') });

  // 3. POC 3 Natural-Language Placement Search Screen & Results
  console.log('Capturing POC 3 Placement Search Screen & Results...');
  await page.click('#tabSearch');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-03-Natural-Language-Placement-Search', 'screenshots', '01-search-screen.png') });

  await page.fill('#searchInput', 'Find AI internships for CSE students with Python skills and CGPA above 8');
  await page.click('#searchBtn');
  await page.waitForSelector('#searchResultsSection:not(.hidden)', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-03-Natural-Language-Placement-Search', 'screenshots', '02-intent-and-matching-results.png') });

  // 4. POC 4 Placement Copilot Screen & Results
  console.log('Capturing POC 4 Placement Copilot Screen & Results...');
  await page.click('#tabCopilot');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-04-Placement-Copilot', 'screenshots', '01-copilot-screen.png') });

  await page.fill('#copilotInput', 'Who needs immediate attention?');
  await page.click('#askCopilotBtn');
  await page.waitForSelector('#copilotResultsSection:not(.hidden)', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOWCASE_DIR, 'POC-04-Placement-Copilot', 'screenshots', '02-copilot-advisory-result.png') });

  await browser.close();
  console.log('✓ All 9 Showcase Screenshots Captured Successfully!');
}

captureScreenshots().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
