(function () {
  'use strict';
  const data = window.BUSAN_TOURISM_DATA;
  const list = document.querySelector('#tourism-results');
  if (!list) return;
  const count = document.querySelector('#tourism-result-count');
  const more = document.querySelector('#tourism-more');
  const pageStatus = document.querySelector('#tourism-page-status');
  const empty = document.querySelector('#tourism-empty');
  if (!data || !Array.isArray(data.items)) { count.textContent = '관광 데이터를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.'; return; }
  const form = document.querySelector('#tourism-search-form');
  const query = document.querySelector('#tourism-query');
  const district = document.querySelector('#tourism-district');
  const pageSize = 12;
  let matched = [], visible = 0;
  const text = value => String(value || '').trim() || '정보 미제공';
  const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g, '');
  function element(tag, className, content) { const node = document.createElement(tag); if (className) node.className = className; if (content !== undefined) node.textContent = content; return node; }
  function link(label, href, className) {
    try {
      const url = new URL(href);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
      const node = element('a', className, label); node.href = url.href; node.target = '_blank'; node.rel = 'noopener noreferrer'; return node;
    } catch { return null; }
  }
  function field(label, value) { const row = document.createElement('div'); row.append(element('dt', '', label), element('dd', '', text(value))); return row; }
  const searchItems = data.items.map(item => ({ item, search: normalize([item.name, item.title, item.subtitle, item.district, item.address, item.description].join(' ')) }));
  const districts = [...new Set(data.items.map(item => item.district).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ko'));
  districts.forEach(name => district.add(new Option(name, name)));
  document.querySelector('#tourism-total').textContent = data.items.length.toLocaleString('ko-KR');
  document.querySelector('#tourism-district-total').textContent = String(districts.length);
  const collected = new Date(data.collectedAt);
  document.querySelector('#tourism-date').textContent = Number.isNaN(collected.valueOf()) ? '정보 미제공' : new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(collected);
  function card(item) {
    const row = element('li', 'tourism-item');
    const photo = element('div', 'tourism-photo');
    const fallback = element('span', 'tourism-photo-fallback', 'BUSAN\nPLACE ARCHIVE');
    photo.appendChild(fallback);
    if (item.image) {
      const safeImage = link('', item.image);
      if (safeImage) {
        const image = document.createElement('img'); image.src = safeImage.href; image.alt = item.name + ' 관광명소 사진'; image.loading = 'lazy'; image.decoding = 'async'; image.referrerPolicy = 'no-referrer'; image.width = 360; image.height = 260;
        image.addEventListener('error', () => image.remove(), { once: true }); photo.appendChild(image);
      }
    }
    const content = element('article', 'tourism-item-content');
    const header = element('div', 'tourism-item-heading');
    const title = element('h3', '', item.name);
    header.append(element('span', 'tourism-district-tag', text(item.district)), title);
    content.appendChild(header);
    if (item.title && item.title !== item.name) content.appendChild(element('p', 'tourism-item-lead', item.title));
    const facts = element('dl', 'tourism-item-facts'); facts.append(field('주소', item.address), field('운영시간', item.hours || item.days), field('이용요금', item.fee)); content.appendChild(facts);
    const details = element('details', 'tourism-details');
    details.appendChild(element('summary', '', '장소 소개·이용 정보 펼쳐보기'));
    const body = element('div', 'tourism-detail-body');
    body.appendChild(element('p', 'tourism-description', text(item.description)));
    const extra = element('dl', 'tourism-detail-facts');
    extra.append(field('문의 전화', item.telephone), field('운영일', item.days), field('휴무일', item.holidays), field('교통정보', item.transport), field('편의시설', item.accessibility));
    body.appendChild(extra);
    const links = element('div', 'tourism-item-links');
    if (item.homepage) { const homepage = link('시설 홈페이지 ↗', item.homepage); if (homepage) links.appendChild(homepage); }
    const map = link('지도에서 위치 찾기 ↗', 'https://map.kakao.com/link/search/' + encodeURIComponent((item.address || '부산') + ' ' + item.name));
    if (map) links.appendChild(map);
    body.appendChild(links); details.appendChild(body); content.appendChild(details);
    row.append(photo, content); return row;
  }
  function appendPage(focusNew = false) {
    const batch = matched.slice(visible, visible + pageSize);
    const fragment = document.createDocumentFragment(); batch.forEach(item => fragment.appendChild(card(item)));
    const firstNew = fragment.firstElementChild;
    visible += batch.length; list.appendChild(fragment);
    more.hidden = visible >= matched.length;
    pageStatus.textContent = matched.length ? `${matched.length.toLocaleString('ko-KR')}곳 중 ${visible.toLocaleString('ko-KR')}곳 표시` : '';
    if (focusNew && firstNew) { const summary = firstNew.querySelector('summary'); summary?.focus({ preventScroll: true }); firstNew.scrollIntoView({ block: 'nearest', behavior: 'auto' }); }
  }
  function filter() {
    const search = normalize(query.value);
    matched = searchItems.filter(entry => (!district.value || entry.item.district === district.value) && (!search || entry.search.includes(search))).map(entry => entry.item);
    visible = 0; list.replaceChildren(); empty.hidden = matched.length !== 0;
    count.textContent = `검색 결과 ${matched.length.toLocaleString('ko-KR')}곳 / 전체 ${data.items.length.toLocaleString('ko-KR')}곳`;
    appendPage();
  }
  query.addEventListener('input', filter); district.addEventListener('change', filter);
  form.addEventListener('submit', event => { event.preventDefault(); filter(); });
  form.addEventListener('reset', () => { query.value = ''; district.value = ''; filter(); });
  more.addEventListener('click', () => appendPage(true));
  filter();
})();
