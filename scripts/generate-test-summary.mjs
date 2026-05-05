import fs from 'node:fs';
import path from 'node:path';
import xlsx from 'xlsx';

const root = process.cwd();
const reportJsonPath = path.join(root, 'test-results', 'report.json');
const outDir = path.join(root, 'reports');
const markdownPath = path.join(outDir, 'test-summary.md');
const csvPath = path.join(outDir, 'test-summary.csv');
const xlsxPath = path.join(outDir, 'test-summary.xlsx');
const readmePath = path.join(root, 'README.md');

if (!fs.existsSync(reportJsonPath)) {
  console.log('No test-results/report.json found, skipping summary generation.');
  process.exit(0);
}

const raw = JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'));
const stats = raw.stats ?? {};

const summary = {
  total: stats.expected ?? 0,
  passed: (stats.expected ?? 0) - (stats.unexpected ?? 0) - (stats.skipped ?? 0),
  failed: stats.unexpected ?? 0,
  flaky: stats.flaky ?? 0,
  skipped: stats.skipped ?? 0,
  durationMs: stats.duration ?? 0
};

fs.mkdirSync(outDir, { recursive: true });

const md = [
  '# Test Summary',
  '',
  `Generated at: ${new Date().toISOString()}`,
  '',
  `- Total: ${summary.total}`,
  `- Passed: ${summary.passed}`,
  `- Failed: ${summary.failed}`,
  `- Flaky: ${summary.flaky}`,
  `- Skipped: ${summary.skipped}`,
  `- Duration (ms): ${summary.durationMs}`,
  '',
  '> This file is auto-generated from Playwright JSON report.',
  ''
].join('\n');

fs.writeFileSync(markdownPath, md, 'utf8');

const csv = [
  'metric,value',
  `total,${summary.total}`,
  `passed,${summary.passed}`,
  `failed,${summary.failed}`,
  `flaky,${summary.flaky}`,
  `skipped,${summary.skipped}`,
  `durationMs,${summary.durationMs}`
].join('\n');
fs.writeFileSync(csvPath, csv, 'utf8');

const ws = xlsx.utils.json_to_sheet([
  { metric: 'total', value: summary.total },
  { metric: 'passed', value: summary.passed },
  { metric: 'failed', value: summary.failed },
  { metric: 'flaky', value: summary.flaky },
  { metric: 'skipped', value: summary.skipped },
  { metric: 'durationMs', value: summary.durationMs }
]);
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, 'summary');
xlsx.writeFile(wb, xlsxPath);

if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf8');
  const updated = readme.replace(
    /!\[Tests\]\(https:\/\/img\.shields\.io\/badge\/Tests-[^)]+\)/,
    `![Tests](https://img.shields.io/badge/Tests-${summary.passed}%20Passed-brightgreen)`
  );
  fs.writeFileSync(readmePath, updated, 'utf8');
}

console.log('Generated reports:');
console.log(`- ${markdownPath}`);
console.log(`- ${csvPath} (Google Sheets-ready)`);
console.log(`- ${xlsxPath} (Microsoft Excel-ready)`);

