(function () {
  'use strict';
  const config = window.RAON_INQUIRY_CONFIG || {};
  const ready = () => config.enabled === true && /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(config.supabaseUrl) && config.publishableKey?.startsWith('sb_publishable_') && /^[a-z_][a-z0-9_]*$/.test(config.table) && config.retention && config.privacyVersion && config.privacyContact;
  let sequence = 0;
  function mount(container, options = {}) {
    const id = `raon-inquiry-${++sequence}`;
    const active = Boolean(ready());
    container.innerHTML = `<form class="raon-inquiry" aria-label="제작·협업 문의 양식">
      <p class="raon-form-notice" role="status"></p>
      <fieldset><legend class="sr-only">문의 정보</legend>
      <label for="${id}-category">문의 유형</label><select id="${id}-category" name="category" required></select>
      <label for="${id}-name">이름 또는 닉네임</label><input id="${id}-name" name="name" autocomplete="name" maxlength="60" required>
      <label for="${id}-email">회신받을 이메일</label><input id="${id}-email" name="email" type="email" autocomplete="email" maxlength="254" required>
      <label for="${id}-message">문의 내용</label><textarea id="${id}-message" name="message" rows="4" minlength="10" maxlength="3000" placeholder="원하는 작업과 일정, 궁금한 내용을 10자 이상 작성해 주세요." required></textarea>
      <details><summary>개인정보 수집·이용 안내</summary><p class="raon-privacy"></p></details>
      <label class="raon-consent"><input type="checkbox" name="consent" required><span>[필수] 개인정보 수집·이용에 동의합니다.</span></label>
      <p class="raon-small">이름·이메일·문의 내용은 대화 저장 기능에 저장하지 않습니다.</p>
      <button class="raon-primary" type="submit">문의 접수하기</button></fieldset>
      <p class="raon-form-result" role="status" aria-live="polite" tabindex="-1"></p></form>`;
    const form = container.querySelector('form');
    const notice = form.querySelector('.raon-form-notice');
    const result = form.querySelector('.raon-form-result');
    const fields = form.querySelector('fieldset');
    const categories = config.categories || {};
    for (const [value, label] of Object.entries(categories)) form.elements.category.add(new Option(label, value));
    if (categories[options.category]) form.elements.category.value = options.category;
    notice.textContent = active ? '개인정보 동의 후 문의를 접수하는 양식입니다.' : '현재 온라인 문의 접수 준비 중입니다. 연결 설정 전에는 개인정보 입력과 전송이 비활성화된 상태입니다.';
    form.querySelector('.raon-privacy').textContent = active
      ? `수집 목적: 문의 확인 및 회신. 수집 항목: 이름·닉네임, 이메일, 문의 유형, 문의 내용. 보유 기간: ${config.retention}. 개인정보 문의: ${config.privacyContact}. 동의를 거부할 수 있으며 거부 시 온라인 문의 접수가 제한됩니다.`
      : '개인정보 보유 기간과 처리 담당자 안내를 준비 중입니다. 현재 개인정보를 수집하거나 저장하지 않습니다.';
    fields.disabled = !active;
    let pending = false;
    let requestId = null;
    let lastBody = '';
    let controller = null;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!ready() || pending || !form.reportValidity()) return;
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const category = form.elements.category.value;
      if (!name || message.length < 10 || !categories[category] || !form.elements.consent.checked) {
        result.textContent = '문의 내용과 개인정보 동의 확인이 필요한 상태입니다.';
        return;
      }
      if (!window.crypto?.randomUUID) {
        result.textContent = '보안 연결(HTTPS)에서 접수 가능한 양식입니다.';
        return;
      }
      const signature = JSON.stringify([name, email, message, category]);
      if (signature !== lastBody) { requestId = crypto.randomUUID(); lastBody = signature; }
      pending = true;
      controller = new AbortController();
      fields.disabled = true;
      result.textContent = '문의를 전송 중인 상태입니다.';
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(`${config.supabaseUrl}/rest/v1/${config.table}?on_conflict=id`, {
          method: 'POST', signal: controller.signal,
          headers: { 'Content-Type': 'application/json', apikey: config.publishableKey, Prefer: 'resolution=ignore-duplicates,return=minimal' },
          body: JSON.stringify({ id: requestId, name, email, category, message, consent: true, privacy_version: config.privacyVersion, source: options.source === 'contact_page' ? 'contact_page' : 'chatbot' })
        });
        if (!response.ok) throw new Error('Submission rejected');
        form.reset();
        result.textContent = '문의가 정상적으로 접수된 상태입니다. 관리자가 내용을 확인하는 순서입니다.';
        notice.textContent = '접수 완료입니다. 추가 문의가 있으면 새 양식에 작성할 수 있습니다.';
        requestId = null; lastBody = '';
      } catch {
        result.textContent = '접수 완료를 확인하지 못한 상태입니다. 연결을 확인한 뒤 다시 시도해 주세요. 입력한 내용은 현재 양식에 유지된 상태입니다.';
      } finally {
        clearTimeout(timeout);
        pending = false;
        fields.disabled = false;
      }
    });
    return () => { controller?.abort(); form.reset(); container.replaceChildren(); };
  }
  window.RaonInquiry = { mount, ready };
  document.querySelectorAll('[data-inquiry-form]').forEach(container => mount(container, { source: 'contact_page' }));
})();
