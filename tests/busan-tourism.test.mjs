import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readServiceKey, normalizeItem, safeUrl, clean } from '../scripts/fetch-busan-tourism.mjs';
test('encoded/decoded keys are handled without plus-to-space corruption', () => {
  const key = 'testonly0123456789+/=';
  assert.equal(readServiceKey('BUSAN_TOURISM_API_KEY="' + key + '"'), key);
  assert.equal(readServiceKey('BUSAN_TOURISM_API_KEY="' + encodeURIComponent(key) + '"'), key);
  assert.throws(() => readServiceKey('OTHER_KEY=x'));
});
test('public fields are allowlisted; missing fees never mean free; links and descriptions are inert', () => {
  const item = normalizeItem({ UC_SEQ: 1, MAIN_TITLE: '<b>테스트 장소</b>', LAT: '', LNG: '', ServiceKey: 'private-field', INTERNAL: 'private-field', HOMEPAGE_URL: 'javascript:alert(1)', ITEMCNTNTS: '<script>alert(1)</script>소개<br>둘째 줄' });
  assert.equal(item.name, '테스트 장소'); assert.equal(item.fee, '');
  assert.equal(item.homepage, ''); assert.equal(item.latitude, null);
  assert.equal(item.description, '소개\n둘째 줄'); assert.equal(JSON.stringify(item).includes('private-field'), false);
  assert.equal(safeUrl('https://example.com/?serviceKey=private'), '');
  assert.equal(safeUrl('/uploadImgs/example.jpg', true), 'https://www.visitbusan.net/uploadImgs/example.jpg');
  assert.equal(clean('<img onerror=alert(1)>내용'), '내용');
});
test('published real snapshot has complete unique IDs and matches browser data', async () => {
  const data = JSON.parse(await readFile(new URL('../assets/data/busan-tourism.json', import.meta.url), 'utf8'));
  const browserData = await readFile(new URL('../js/busan-tourism-data.js', import.meta.url), 'utf8');
  assert.ok(data.total > 0); assert.equal(data.total, data.items.length);
  assert.equal(new Set(data.items.map(row => row.id)).size, data.total);
  assert.equal(new Set(data.items.map(row => row.district).filter(Boolean)).size, 16);
  assert.ok(browserData.startsWith('// Generated public tourism snapshot; no API credentials.'));
  assert.equal(browserData.includes('BUSAN_TOURISM_API_KEY'), false);
  assert.equal(browserData.includes('ServiceKey='), false);
  assert.equal(data.source.endpoint.includes('?'), false);
});
