// Requires a local Playwright installation and Edge; no external services are written to.
const { chromium } = require(process.env.RAON_PLAYWRIGHT_MODULE || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const server = http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { response.writeHead(400).end(); return; }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep) || !mime[path.extname(file)] || !fs.existsSync(file)) { response.writeHead(404).end(); return; }
  response.setHeader('Content-Type', mime[path.extname(file)] + (['.html', '.js', '.json', '.css', '.svg'].includes(path.extname(file)) ? '; charset=utf-8' : ''));
  fs.createReadStream(file).pipe(response);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage({ viewport: { width: 1365, height: 950 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin + '/index.html');
    await page.locator('.raon-launcher').click();
    const panel = page.locator('#raon-panel');
    await panel.getByRole('button', { name: '포트폴리오 둘러보기', exact: true }).click();
    await panel.getByRole('button', { name: 'HARO 브랜드', exact: true }).click();
    await page.reload();
    await panel.getByRole('link', { name: '브랜드 가이드 보기 ↗' }).waitFor();
    await panel.getByRole('link', { name: '브랜드 가이드 보기 ↗' }).click();
    await page.waitForURL('**/brand.html');
    await panel.getByRole('link', { name: '브랜드 가이드 보기 ↗' }).waitFor();
    await panel.getByRole('button', { name: '← 이전으로' }).click();
    await panel.getByRole('button', { name: '관광 조사 · REPORT', exact: true }).waitFor();
    await panel.getByRole('button', { name: '처음으로', exact: true }).click();
    await panel.getByRole('button', { name: '프로젝트 안내', exact: true }).waitFor();
    await panel.locator('#raon-question').fill('<script>alert(1)</script> 내일 환율');
    await panel.getByRole('button', { name: '질문 보내기' }).click();
    assert.ok((await panel.locator('.raon-messages').innerText()).includes('등록된 안내를 찾지 못했어요.'));
    assert.equal(await page.evaluate(() => sessionStorage.getItem('tourism-archive:raon:v1').includes('<script>')), false);
    await panel.getByRole('button', { name: '대화 초기화', exact: true }).click();
    assert.equal(await page.evaluate(() => sessionStorage.getItem('tourism-archive:raon:v1')), null);
    assert.equal(await panel.locator('.raon-message').count(), 1);
    await panel.getByRole('button', { name: '제작·협업 문의', exact: true }).click();
    await panel.getByRole('button', { name: '콘텐츠 제작 문의', exact: true }).click();
    assert.equal(await panel.locator('[name=name]').isDisabled(), true);
    assert.ok((await panel.locator('.raon-form-notice').innerText()).includes('준비 중'));

    // Use an intercepted Supabase endpoint to verify consent, source mapping, retry and zero PII in sessionStorage.
    const requests = [];
    let fail = true;
    await page.route('https://testproject.supabase.co/rest/v1/test_inquiries*', async route => {
      requests.push(route.request().postDataJSON());
      if (fail) { fail = false; await route.fulfill({ status: 500, body: '{}' }); }
      else await route.fulfill({ status: 201, body: '' });
    });
    await page.evaluate(() => Object.assign(window.RAON_INQUIRY_CONFIG, { enabled: true, supabaseUrl: 'https://testproject.supabase.co', publishableKey: 'sb_publishable_test', table: 'test_inquiries', privacyVersion: 'TEST', retention: '테스트에서만 사용하는 기간', privacyContact: 'test@example.com' }));
    await panel.getByRole('button', { name: '다른 문의 유형' }).click();
    await panel.getByRole('button', { name: '콘텐츠 제작 문의', exact: true }).click();
    const form = panel.locator('.raon-inquiry');
    await form.locator('[name=name]').fill('테스트 이름');
    await form.locator('[name=email]').fill('private@example.com');
    await form.locator('[name=message]').fill('이것은 외부에 저장하지 않는 테스트 문의 내용입니다.');
    await form.getByRole('button', { name: '문의 접수하기' }).click();
    assert.equal(requests.length, 0, 'consent must block network submission');
    await form.locator('[name=consent]').check();
    await form.getByRole('button', { name: '문의 접수하기' }).click();
    await page.waitForFunction(() => document.querySelector('.raon-form-result').textContent.includes('확인하지 못한'));
    assert.equal(await form.locator('[name=email]').inputValue(), 'private@example.com');
    await form.getByRole('button', { name: '문의 접수하기' }).click();
    await page.waitForFunction(() => document.querySelector('.raon-form-result').textContent.includes('정상적으로 접수'));
    assert.equal(requests.length, 2);
    assert.equal(requests[0].id, requests[1].id, 'retry reuses idempotency key');
    assert.equal(requests[1].source, 'chatbot');
    assert.equal(requests[1].category, 'content');
    assert.equal(requests[1].consent, true);
    assert.equal(await page.evaluate(() => sessionStorage.getItem('tourism-archive:raon:v1').includes('private@example.com')), false);
    assert.equal(await form.locator('[name=email]').inputValue(), '');
    await page.goto(origin + '/contact.html');
    assert.equal(await page.locator('[data-inquiry-form] [name=name]').isDisabled(), true);
    await page.evaluate(() => {
      Object.assign(window.RAON_INQUIRY_CONFIG, { enabled: true, supabaseUrl: 'https://testproject.supabase.co', publishableKey: 'sb_publishable_test', table: 'test_inquiries', privacyVersion: 'TEST', retention: 'テスト', privacyContact: 'test@example.com' });
      window.RaonInquiry.mount(document.querySelector('[data-inquiry-form]'), { source: 'contact_page' });
    });
    const contact = page.locator('[data-inquiry-form] form');
    await contact.locator('[name=name]').fill('테스트');
    await contact.locator('[name=email]').fill('private@example.com');
    await contact.locator('[name=message]').fill('문의 페이지 공통 저장소 검증을 위한 테스트입니다.');
    await contact.locator('[name=consent]').check();
    await contact.getByRole('button', { name: '문의 접수하기' }).click();
    await page.waitForFunction(() => document.querySelector('[data-inquiry-form] .raon-form-result').textContent.includes('정상적으로 접수'));
    assert.equal(requests[2].source, 'contact_page');

    await page.goto(origin + '/sns.html');
    await page.locator('.raon-launcher').click();
    if (await panel.isHidden()) await page.locator('.raon-launcher').click();
    await panel.getByRole('button', { name: '대화 초기화', exact: true }).click();
    const preview = path.join(root, '.chatbot-preview');
    fs.mkdirSync(preview, { recursive: true });
    await page.screenshot({ path: path.join(preview, 'desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await panel.getByRole('button', { name: '프로젝트 안내', exact: true }).click();
    await page.screenshot({ path: path.join(preview, 'mobile.png') });
    const box = await panel.boundingBox();
    assert.ok(box.x >= 0 && box.y >= 0 && box.x + box.width <= 390 && box.y + box.height <= 844);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.keyboard.press('Escape');
    assert.equal(await panel.isHidden(), true);
    assert.equal(await page.locator('.raon-launcher').getAttribute('aria-expanded'), 'false');

    const local = await browser.newPage();
    await local.goto(pathToFileURL(path.join(root, 'index.html')).href);
    await local.locator('.raon-launcher').click();
    await local.locator('#raon-panel').getByRole('button', { name: '포트폴리오 둘러보기', exact: true }).waitFor();
    assert.deepEqual(errors, []);
    console.log('PASS: navigation, page/reload persistence, reset, fallback, disabled integration, consent, mocked failure/retry/success, shared contact storage, privacy, mobile layout, Escape, file://');
    console.log('Preview files: ' + preview);
  } finally {
    await browser?.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
