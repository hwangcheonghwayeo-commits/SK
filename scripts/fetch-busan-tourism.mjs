// Local-only collector. No credential or authenticated request URL is ever logged.
import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const root = new URL('../', import.meta.url);
export const endpoint = 'https://apis.data.go.kr/6260000/AttractionService/getAttractionKr';
export function readServiceKey(env) {
  const line = env.replace(/^\uFEFF/, '').match(/^[\t ]*(?:export[\t ]+)?BUSAN_TOURISM_API_KEY[\t ]*=[\t ]*(.*)$/m)?.[1]?.trim();
  if (!line) throw new Error('KEY_MISSING');
  let key = /^(["']).*\1$/.test(line) ? line.slice(1, -1) : line.replace(/\s+#.*$/, '').trim();
  if (!/^[A-Za-z0-9%+/_=.~-]{16,2048}$/.test(key)) throw new Error('KEY_INVALID');
  if (/%[0-9a-f]{2}/i.test(key)) { try { key = decodeURIComponent(key); } catch { throw new Error('KEY_INVALID'); } }
  return key;
}
export function clean(value, limit = 20000) {
  return String(value ?? '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<br\s*\/?\s*>/gi, '\n').replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;/g, "'").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, limit);
}
export function safeUrl(value, image = false) {
  try {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const url = new URL(raw.startsWith('/uploadImgs/') ? 'https://www.visitbusan.net' + raw : raw);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || [...url.searchParams.keys()].some(key => /servicekey|apikey|access_token/i.test(key))) return '';
    if (image && url.protocol === 'http:') url.protocol = 'https:';
    return url.href;
  } catch { return ''; }
}
export function normalizeItem(row) {
  const lat = Number(row.LAT), lng = Number(row.LNG);
  return {
    id: clean(row.UC_SEQ, 40), name: clean(row.MAIN_TITLE || row.PLACE || row.TITLE, 300),
    district: clean(row.GUGUN_NM, 100), title: clean(row.TITLE, 500), subtitle: clean(row.SUBTITLE, 500),
    address: clean(row.ADDR1, 1000), telephone: clean(row.CNTCT_TEL, 500),
    homepage: safeUrl(row.HOMEPAGE_URL), image: safeUrl(row.MAIN_IMG_THUMB || row.MAIN_IMG_NORMAL, true),
    transport: clean(row.TRFC_INFO), days: clean(row.USAGE_DAY), holidays: clean(row.HLDY_INFO),
    hours: clean(row.USAGE_DAY_WEEK_AND_TIME), fee: clean(row.USAGE_AMOUNT), accessibility: clean(row.MIDDLE_SIZE_RM1), description: clean(row.ITEMCNTNTS),
    latitude: Number.isFinite(lat) && lat >= 33 && lat <= 37 ? lat : null,
    longitude: Number.isFinite(lng) && lng >= 127 && lng <= 131 ? lng : null
  };
}
async function getPage(key, page) {
  const url = new URL(endpoint);
  url.search = new URLSearchParams({ ServiceKey: key, pageNo: String(page), numOfRows: '100', resultType: 'json' }).toString();
  let response;
  try { response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(25000), headers: { Accept: 'application/json' } }); }
  catch { throw new Error('NETWORK'); }
  if (!response.ok) throw new Error('HTTP_' + response.status);
  let data;
  try { data = await response.json(); } catch { throw new Error('NON_JSON_RESPONSE'); }
  const body = data.getAttractionKr;
  const header = Array.isArray(body?.header) ? body.header[0] : body?.header;
  if (!body || !['00', '0', '0000'].includes(String(header?.resultCode ?? header?.code ?? body.resultCode))) throw new Error('API_ACCESS_OR_RESPONSE');
  const rawItems = body.item ?? body.items?.item ?? [];
  const items = Array.isArray(rawItems) ? rawItems : rawItems && typeof rawItems === 'object' ? [rawItems] : [];
  const total = Number(body.totalCount);
  if (!Number.isInteger(total) || total < 0 || total > 5000 || (total > 0 && !items.length)) throw new Error('INVALID_PAGE');
  return { items, total };
}
async function atomicWrite(relative, content) {
  const target = new URL(relative, root), temporary = new URL(relative + '.tmp', root);
  try { await writeFile(temporary, content); await rename(temporary, target); }
  finally { await unlink(temporary).catch(() => {}); }
}
export async function collect() {
  let key;
  try { key = readServiceKey(await readFile(new URL('.env', root), 'utf8')); } catch { throw new Error('KEY_MISSING_OR_INVALID'); }
  const first = await getPage(key, 1);
  const rows = [...first.items];
  let page = 1;
  while (rows.length < first.total) {
    if (++page > 50) throw new Error('PAGE_LIMIT');
    const next = await getPage(key, page);
    if (next.total !== first.total || !next.items.length) throw new Error('DATA_CHANGED_RETRY');
    rows.push(...next.items);
  }
  const unique = new Map();
  for (const row of rows) { const item = normalizeItem(row); if (!item.id || !item.name) throw new Error('INVALID_ITEM'); unique.set(item.id, item); }
  if (unique.size !== first.total || unique.size === 0) throw new Error('COUNT_MISMATCH_OR_EMPTY');
  const data = { version: 1, collectedAt: new Date().toISOString(), timezone: 'Asia/Seoul', source: { provider: '부산광역시', service: '부산명소정보 서비스', catalogUrl: 'https://www.data.go.kr/data/15063481/openapi.do', endpoint, license: '이용허락범위 제한 없음 (공공데이터포털 안내 기준)' }, total: unique.size, items: [...unique.values()].sort((a, b) => a.name.localeCompare(b.name, 'ko')) };
  const json = JSON.stringify(data, null, 2);
  for (const secret of new Set([key, encodeURIComponent(key)])) if (json.includes(secret)) throw new Error('PUBLICATION_BLOCKED');
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
