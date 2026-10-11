#!/usr/bin/env node
/* ==========================================================================
   CHECK-I18N-COMPLETENESS.JS
   Dev tool, not a site feature. Diffs the key sets across the EN/JA/HI
   locale blocks in data/translations.js and reports anything present in
   one language but missing in another.

   This exists because of real, manually-found mismatches during this
   project's build — this would have caught them automatically instead.

   Usage:  node check-i18n-completeness.js [path/to/translations.js]
   Exit code 0 = all three locales have identical key sets.
   Exit code 1 = at least one mismatch found (also printed to stdout).

   How it works: this is a structural check, not a full JS parser. It reads
   window.PORTFOLIO_I18N by actually executing the file in a sandboxed
   context (so nested objects/arrays are handled correctly, not approximated
   with regex), then walks the resulting object tree to collect every leaf
   key path (e.g. "skills.t4.evidence") per locale and diffs the three sets.
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = process.argv[2] || path.join(__dirname, 'data', 'translations.js');

if (!fs.existsSync(filePath)) {
  console.error(`[i18n-check] File not found: ${filePath}`);
  console.error('Usage: node check-i18n-completeness.js [path/to/translations.js]');
  process.exit(2);
}

const source = fs.readFileSync(filePath, 'utf-8');

// Execute in an isolated sandbox with a minimal `window` stand-in — the
// file only ever does `window.PORTFOLIO_I18N = {...}`, nothing else.
const sandbox = { window: {} };
vm.createContext(sandbox);
try {
  vm.runInContext(source, sandbox, { filename: filePath });
} catch (err) {
  console.error(`[i18n-check] Failed to evaluate ${filePath}: ${err.message}`);
  process.exit(2);
}

const dict = sandbox.window.PORTFOLIO_I18N;
if (!dict || typeof dict !== 'object') {
  console.error('[i18n-check] window.PORTFOLIO_I18N was not found or is not an object after evaluating the file.');
  process.exit(2);
}

const locales = Object.keys(dict);
if (locales.length < 2) {
  console.log(`[i18n-check] Only ${locales.length} locale(s) found (${locales.join(', ') || 'none'}) — nothing to diff.`);
  process.exit(0);
}

/** Collect every leaf key path in an object, e.g. {a:{b:1}} -> ['a.b'] */
function collectKeyPaths(obj, prefix = '') {
  const out = [];
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    if (prefix) out.push(prefix);
    return out;
  }
  for (const key of Object.keys(obj)) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    out.push(...collectKeyPaths(obj[key], nextPrefix));
  }
  return out;
}

const keySets = {};
for (const locale of locales) {
  keySets[locale] = new Set(collectKeyPaths(dict[locale]));
}

// Union of every key across every locale, so we can check who's missing what.
const allKeys = new Set();
for (const locale of locales) for (const k of keySets[locale]) allKeys.add(k);

let mismatchCount = 0;
const report = [];

for (const key of Array.from(allKeys).sort()) {
  const missingFrom = locales.filter(locale => !keySets[locale].has(key));
  if (missingFrom.length > 0) {
    mismatchCount++;
    report.push(`  ${key}  →  missing in: ${missingFrom.join(', ')}`);
  }
}

console.log(`[i18n-check] Locales found: ${locales.join(', ')}`);
console.log(`[i18n-check] Total unique key paths across all locales: ${allKeys.size}`);

if (mismatchCount === 0) {
  console.log('[i18n-check] PASS — every locale has an identical key set. Nothing missing.');
  process.exit(0);
} else {
  console.log(`[i18n-check] FAIL — ${mismatchCount} key path(s) are missing from at least one locale:\n`);
  console.log(report.join('\n'));
  console.log(`\n[i18n-check] Fix these before shipping — a missing key silently falls back to`);
  console.log('whatever English (or placeholder "…") text was already in the HTML for that');
  console.log('element, in that locale only, which is easy to miss visually.');
  process.exit(1);
}
