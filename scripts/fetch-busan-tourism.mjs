// Local-only collector. No credential or authenticated request URL is ever logged.
import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { readServiceKey, fetchTourismSnapshot } from '../lib/busan-tourism.mjs';
export { readServiceKey, normalizeItem, safeUrl, clean } from '../lib/busan-tourism.mjs';
const root = new URL('../', import.meta.url);
async function atomicWrite(relative, content) {
  const target = new URL(relative, root), temporary = new URL(relative + '.tmp', root);
  try { await writeFile(temporary, content); await rename(temporary, target); }
  finally { await unlink(temporary).catch(() => {}); }
}
export async function collect() {
  let key;
  try { key = readServiceKey(await readFile(new URL('.env', root), 'utf8')); } catch { throw new Error('KEY_MISSING_OR_INVALID'); }
  const data = await fetchTourismSnapshot(key);
  const json = JSON.stringify(data, null, 2);
  // Publish only normalized, explicitly allowlisted public fields. No raw response or .env copy.
  const script = '// Generated public tourism snapshot; no API credentials.\nwindow.BUSAN_TOURISM_DATA = ' + json.replaceAll('<', '\\u003c').replaceAll('\u2028', '\\u2028').replaceAll('\u2029', '\\u2029') + ';\n';
  await atomicWrite('assets/data/busan-tourism.json', json + '\n');
  await atomicWrite('js/busan-tourism-data.js', script);
  console.log(`Saved ${data.total} public attractions. Local credential was not printed or exported.`);
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  collect().catch(error => {
    const allowed = /^(KEY_MISSING_OR_INVALID|NETWORK|HTTP_\d{3}|NON_JSON_RESPONSE|API_ACCESS_OR_RESPONSE|INVALID_PAGE|PAGE_LIMIT|DATA_CHANGED_RETRY|INVALID_ITEM|COUNT_MISMATCH_OR_EMPTY|PUBLICATION_BLOCKED)$/;
    console.error('Collection failed: ' + (allowed.test(error.message) ? error.message : 'LOCAL_WRITE_OR_UNEXPECTED_ERROR') + '. Existing public snapshot was preserved where possible. No request URL or credential is logged.');
    process.exitCode = 1;
  });
}
