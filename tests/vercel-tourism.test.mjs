import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHandler } from '../api/busan-tourism.mjs';
import { fetchTourismSnapshot } from '../lib/busan-tourism.mjs';
function response() { return { headers: {}, statusCode: 0, text: '', setHeader(key, value) { this.headers[key] = value; }, end(text) { this.text = text; } }; }
const request = (method = 'GET', url = '/api/busan-tourism') => ({ method, url });
const fakeKey = 'local-test-key-never-production';
const publicData = { version: 1, total: 1, items: [{ id: '1', name: '테스트 장소' }] };
test('server API deduplicates concurrent upstream calls and expires its cache', async () => {
  let loads = 0, clock = 0;
  const handler = createHandler({ keyProvider: () => fakeKey, now: () => clock, load: async () => { loads++; await new Promise(resolve => setTimeout(resolve, 5)); return publicData; } });
  const first = response(), second = response();
  await Promise.all([handler(request(), first), handler(request(), second)]);
  assert.equal(loads, 1); assert.equal(first.statusCode, 200);
  assert.equal(first.text.includes(fakeKey), false);
  assert.ok(first.headers['Vercel-CDN-Cache-Control'].includes('s-maxage=3600'));
  await handler(request(), response()); assert.equal(loads, 1);
  clock = 15 * 60 * 1000 + 1;
  await handler(request(), response()); assert.equal(loads, 2);
});
test('missing credentials, upstream exceptions and unsupported requests are never leaked/cached', async () => {
  const missing = response(); await createHandler({ keyProvider: () => '' })(request(), missing);
  assert.equal(missing.statusCode, 503); assert.equal(missing.headers['Cache-Control'], 'no-store');
  const failed = response(); await createHandler({ keyProvider: () => fakeKey, load: async () => { throw new Error('secret=' + fakeKey); } })(request(), failed);
  assert.equal(failed.statusCode, 503); assert.equal(failed.text.includes(fakeKey), false);
  const handler = createHandler({ keyProvider: () => fakeKey, load: async () => { throw new Error('should not run'); } });
  const post = response(); await handler(request('POST'), post); assert.equal(post.statusCode, 405);
  const query = response(); await handler(request('GET', '/api/busan-tourism?url=https://example.com'), query); assert.equal(query.statusCode, 400);
});
test('production normalizer blocks an upstream response that echoes the server credential', async () => {
  const fetchImpl = async () => ({ ok: true, json: async () => ({ getAttractionKr: { header: { code: '00' }, totalCount: 1, item: [{ UC_SEQ: 1, MAIN_TITLE: '명소', ITEMCNTNTS: fakeKey }] } }) });
  await assert.rejects(fetchTourismSnapshot(fakeKey, { fetchImpl }), /PUBLICATION_BLOCKED/);
});
test('Vercel output contains only intended public content and enables same-origin server API', async () => {
  const output = new URL('../public/', import.meta.url);
  const names = await readdir(output);
  for (const forbidden of ['.env', '.env.example', 'scripts', 'lib', 'api', 'tests', 'routemate-app', '.git']) assert.equal(names.includes(forbidden), false, forbidden);
  const source = await readFile(new URL('../report.html', import.meta.url), 'utf8');
  const built = await readFile(new URL('report.html', output), 'utf8');
  assert.equal(source.includes('data-tourism-api='), false);
  assert.ok(built.includes('data-tourism-api="/api/busan-tourism"'));
  assert.equal(built.includes('<script src="js/busan-tourism-data.js'), false);
});
