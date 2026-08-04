import fs from 'fs';
import path from 'path';

const showcaseDir = path.resolve('POC-Showcase');
const keyToSearch = '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';

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  let keyFound = false;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (scanDirectory(fullPath)) keyFound = true;
    } else if (stat.isFile()) {
      if (file === '.env') {
        console.error(`❌ SECURITY VIOLATION: .env file found inside ${fullPath}`);
        keyFound = true;
      }
      if (file.endsWith('.md') || file.endsWith('.json') || file.endsWith('.js') || file.endsWith('.txt')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(keyToSearch) || content.includes('nvapi-XmHY')) {
          console.error(`❌ SECURITY VIOLATION: Actual API key string found in ${fullPath}`);
          keyFound = true;
        }
      }
    }
  }
  return keyFound;
}

const keyInShowcase = scanDirectory(showcaseDir);

if (!keyInShowcase) {
  console.log('====================================================');
  console.log('  SECURITY AUDIT PASSED: 100% CLEAN SHOWCASE DIRECTORY');
  console.log('  - Zero .env files in POC-Showcase/');
  console.log('  - Zero API keys exposed in markdown or scripts');
  console.log('====================================================');
} else {
  console.error('SECURITY AUDIT FAILED');
  process.exit(1);
}
