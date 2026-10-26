(function () {
  'use strict';
  if (document.querySelector('.raon-widget')) return;
  const flow = window.RAON_CHATBOT_DATA;
  const core = window.RaonChatCore;
  if (!flow || !core) return;
  const storageKey = 'tourism-archive:raon:v1';
  let state;
  let storageAvailable = true;
  try { state = core.restore(flow, sessionStorage.getItem(storageKey)); } catch { storageAvailable = false; }
  const initial = () => ({ version: flow.version, current: flow.start, trail: [flow.start], messages: [{ role: 'bot', id: flow.start }], pendingChoices: [], open: false });
  state ||= initial();
  let disposeForm = null;
  const widget = document.createElement('div');
  widget.className = 'raon-widget';
  widget.innerHTML = `<button class="raon-launcher" type="button" aria-label="라온 안내봇 열기" aria-expanded="false" aria-controls="raon-panel"><img src="${flow.avatar}" alt="" width="56" height="56"><span>라온에게 물어보기</span><b aria-hidden="true">↗</b></button>
    <section id="raon-panel" class="raon-panel" role="dialog" aria-labelledby="raon-title" hidden>
      <header class="raon-header"><img src="${flow.avatar}" alt="라온 고양이 캐릭터" width="48" height="48"><div><p class="raon-overline">YOUR ARCHIVE GUIDE</p><h2 id="raon-title">라온의 안내 데스크</h2><p>관광 콘텐츠 아카이브</p></div><button class="raon-close" type="button" aria-label="대화창 닫기">×</button></header>
      <div class="raon-description"><span aria-hidden="true">●</span> 포트폴리오부터 제작 문의까지, 등록된 안내로 연결합니다.</div>
      <div class="raon-messages" role="log" aria-label="라온과 나눈 대화" aria-live="polite" aria-relevant="additions text"></div>
      <div class="raon-actions" aria-label="다음 선택지"></div>
      <div class="raon-form-host"></div>
      <nav class="raon-controls" aria-label="대화 이동"><button type="button" data-command="back">← 이전으로</button><button type="button" data-command="home">처음으로</button><button type="button" data-command="reset">대화 초기화</button></nav>
      <form class="raon-input-form" aria-label="질문 입력"><label class="sr-only" for="raon-question">질문</label><input id="raon-question" type="text" maxlength="300" autocomplete="off" placeholder="예: 카드뉴스를 보고 싶어요"><button type="submit" aria-label="질문 보내기">↑</button></form>
      <p class="raon-footnote">등록된 질문·답변으로만 안내합니다. 개인정보는 문의 양식에 입력해 주세요.</p>
    </section>`;
  document.body.appendChild(widget);
  const panel = widget.querySelector('.raon-panel');
  const launcher = widget.querySelector('.raon-launcher');
  const log = widget.querySelector('.raon-messages');
  const actions = widget.querySelector('.raon-actions');
  const formHost = widget.querySelector('.raon-form-host');
  const input = widget.querySelector('#raon-question');
  function persist() {
    state.messages = state.messages.slice(-60);
    state.trail = state.trail.slice(-40);
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { storageAvailable = false; }
  }
  function setOpen(open, focus = false) {
    state.open = open;
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? '라온 안내봇 접기' : '라온 안내봇 열기');
    document.body.classList.toggle('raon-chat-open', open);
    if (focus) (open ? widget.querySelector('.raon-close') : launcher).focus();
  }
  function addBubble(role, text) {
    const bubble = document.createElement('div');
    bubble.className = `raon-message raon-message-${role}`;
    const label = document.createElement('span');
    label.className = 'raon-message-label'; label.textContent = role === 'bot' ? '라온' : '나';
    const content = document.createElement('p'); content.textContent = text;
    bubble.append(label, content); log.appendChild(bubble);
  }
  function renderLog() {
    log.replaceChildren();
    state.messages.forEach(item => addBubble(item.role, item.role === 'bot' ? flow.nodes[item.id].answer : item.id === flow.fallback ? '등록된 항목에 없는 질문' : flow.nodes[item.id].title));
  }
  function renderChoices(ids) {
    const restoreFocus = actions.contains(document.activeElement);
    actions.replaceChildren();
    const choices = ids || state.pendingChoices;
    const buttons = choices?.length ? choices.map(id => ({ label: flow.nodes[id].title, next: id })) : flow.nodes[state.current].buttons;
    for (const entry of buttons) {
      const button = document.createElement(entry.href ? 'a' : 'button');
      button.textContent = entry.label;
      if (entry.href) button.href = entry.href;
      else { button.type = 'button'; button.addEventListener('click', () => navigate(entry.next)); }
      actions.appendChild(button);
    }
    widget.querySelector('[data-command="back"]').disabled = state.trail.length < 2;
    if (restoreFocus) actions.querySelector('button, a')?.focus();
  }
  function renderForm() {
    disposeForm?.(); disposeForm = null;
    const category = state.pendingChoices?.length ? null : flow.nodes[state.current].form;
    if (category && window.RaonInquiry) disposeForm = window.RaonInquiry.mount(formHost, { source: 'chatbot', category });
    panel.classList.toggle('raon-has-form', Boolean(category));
  }
  function navigate(id, options = {}) {
    if (!flow.nodes[id]) id = flow.fallback;
    if (options.user !== false) state.messages.push({ role: 'user', id });
    state.current = id;
    state.pendingChoices = [];
    if (options.push !== false) state.trail.push(id);
    state.messages.push({ role: 'bot', id });
    renderLog(); renderChoices(); renderForm(); persist();
    log.scrollTop = log.scrollHeight;
  }
  launcher.addEventListener('click', () => { setOpen(!state.open, true); persist(); });
  widget.querySelector('.raon-close').addEventListener('click', () => { setOpen(false, true); persist(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && state.open) { setOpen(false, true); persist(); } });
  widget.querySelector('.raon-controls').addEventListener('click', event => {
    const command = event.target.closest('[data-command]')?.dataset.command;
    if (command === 'home') navigate(flow.start);
    if (command === 'back' && state.trail.length > 1) { state.trail.pop(); navigate(state.trail[state.trail.length - 1], { push: false, user: false }); }
    if (command === 'reset') {
      disposeForm?.(); disposeForm = null;
      try { sessionStorage.removeItem(storageKey); } catch { /* Storage can be unavailable on local files. */ }
      state = initial(); state.open = true; input.value = '';
      renderLog(); renderChoices(); renderForm(); setOpen(true); input.focus();
    }
  });
  widget.querySelector('.raon-input-form').addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    const matches = core.match(flow, text);
    if (matches.length > 1) {
      disposeForm?.(); disposeForm = null;
      panel.classList.remove('raon-has-form');
      state.pendingChoices = matches;
      addBubble('bot', '여러 안내 항목에 해당하는 질문입니다. 아래에서 원하는 항목을 선택해 주세요.');
      renderChoices(matches); persist(); log.scrollTop = log.scrollHeight;
      return;
    }
    // Store registered labels only: free-text personal information never enters sessionStorage.
    navigate(matches[0] || flow.fallback);
  });
  renderLog(); renderChoices(); renderForm(); setOpen(state.open);
  if (!storageAvailable) widget.querySelector('.raon-footnote').textContent = '현재 브라우저에서는 대화 저장을 사용할 수 없습니다. 개인정보는 문의 양식에 입력해 주세요.';
})();
