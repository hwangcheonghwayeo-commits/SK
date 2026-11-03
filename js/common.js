const menuButton=document.querySelector('.menu-toggle');const menu=document.querySelector('.main-nav');
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const isOpen=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));document.body.classList.toggle('menu-open',isOpen)});menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));}

// The same local scripts work on every portfolio page, including file:// previews.
(function loadRaonGuide() {
  const base = new URL('.', document.currentScript.src);
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet'; stylesheet.href = new URL('../css/chatbot.css?v=20261029-ridibatang-2', base).href;
  document.head.appendChild(stylesheet);
  ['chatbot-data.js', 'chatbot-core.js', 'inquiry.js', 'chatbot.js'].reduce((loaded, name) => loaded.then(() => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(name, base).href; script.onload = resolve; script.onerror = reject;
    document.body.appendChild(script);
  })), Promise.resolve()).catch(() => {
    const help = document.createElement('a');
    help.className = 'raon-launcher'; help.href = 'contact.html'; help.textContent = '문의 페이지 열기 ↗';
    help.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:80'; document.body.appendChild(help);
  });
})();

const mascot = document.createElement('aside');
mascot.className = 'busan-mascot';
mascot.setAttribute('role', 'img');
mascot.innerHTML = `
  <span class="mascot-bubble" aria-hidden="true"></span>
  <img class="mascot-character" src="" alt="" width="512" height="512">
  <span class="mascot-shadow" aria-hidden="true"></span>`;
document.body.appendChild(mascot);

const mascotImage = mascot.querySelector('.mascot-character');
const mascotBubble = mascot.querySelector('.mascot-bubble');
const mioImagePath = 'assets/images/common/on-mio-mascot.png';
// Registered page-specific dialogue only; no generated replies or live statistics.
const mioPageLines = {
  'index.html': [
    '안녕! 나는 미오야. 같이 둘러볼까?',
    '부산의 이야기가 콘텐츠가 됐어!',
    '관광 자료부터 차근차근 살펴보자.',
    '여행 서비스 아이디어도 구경해 봐!',
    '카드뉴스와 영상에 내 이야기도 있어!',
    '우리 채널의 성장 기록도 볼 수 있어.',
    '브랜드에 담긴 이야기도 궁금하지?',
    '궁금한 건 라온이에게 물어봐!'
  ],
  'report.html': [
    '부산의 다음 여행지, 같이 찾아볼까?',
    'F1963에는 어떤 이야기가 있을까?',
    '구포시장 조사 카드도 읽어 봐!',
    '달맞이길과 문탠로드도 살펴보자.',
    '아래 목록에서 부산 명소를 찾아봐!',
    '지역이나 검색어로 장소를 골라 봐.',
    '장소의 상세 정보를 펼쳐 볼까?',
    '자료의 출처와 기준일도 꼭 확인해!'
  ],
  'service.html': [
    '저장한 여행지, 코스로 이어 볼까?',
    'RouteMate의 여행 준비 흐름이야!',
    '장소를 모으는 것부터 시작해 봐.',
    '세 가지 코스의 차이가 궁금해!',
    '예약과 티켓을 잇는 흐름도 살펴봐.',
    '체험판 화면을 직접 둘러볼까?',
    '모바일에서의 사용 모습도 생각해 봐.',
    '어떤 문제를 풀려 했는지 읽어 봐!'
  ],
  'routemate.html': [
    'RouteMate가 만들어진 이야기야!',
    '저장은 쉬운데, 계획은 어렵지?',
    '여행 코스 세 가지를 비교해 봐.',
    '예약 센터는 어떻게 연결될까?',
    '티켓 보관함의 흐름도 살펴보자.',
    '광안리 코스 소개가 기다리고 있어!',
    '기획부터 구현까지 함께 읽어 볼까?',
    '체험판에서 화면 구성을 구경해 봐!'
  ],
  'contents.html': [
    '부산 이야기를 담은 콘텐츠 모음이야!',
    '카드뉴스와 영상을 같이 구경할까?',
    '송도 바다를 건너는 순간이 궁금해!',
    '케이블카 이용 가이드도 살펴봐.',
    '예약 사이트별 조건도 확인해 줘!',
    '어떤 장면이 가장 마음에 들어?',
    'SNS 채널에서도 우리를 만나 봐!',
    '장소의 이야기가 콘텐츠로 이어져!'
  ],
  'sns.html': [
    '우리 인스타와 유튜브를 소개할게!',
    '채널 카드에서 대표 게시물을 봐 줘!',
    '조회수와 좋아요는 서로 다른 지표야.',
    '이번 주 수집 기록을 같이 읽어 볼까?',
    '비교할 땐 집계 기간도 확인해 줘!',
    '게시물마다 어떤 반응이 있었을까?',
    '어디서 봤는지 지역 분포도 살펴봐!',
    '미확보는 0이라는 뜻이 아니야!'
  ],
  'brand.html': [
    '브랜드에 담긴 이야기를 만나 볼까?',
    '여기는 HARO 브랜드 가이드야!',
    '로고에는 어떤 의미가 담겼을까?',
    '브랜드의 색을 함께 살펴보자.',
    '작은 모양도 인상을 바꿀 수 있어!',
    '같은 브랜드답게 보이는 비결은 뭘까?',
    '디자인의 기준을 차근차근 읽어 봐.',
    '가장 기억에 남는 모습은 어떤 거야?'
  ],
  'final.html': [
    '팀 프로젝트의 흐름을 살펴볼까?',
    '조사에서 기획으로 이야기가 이어져!',
    '어떤 문제를 발견했는지 읽어 봐.',
    '콘텐츠의 방향을 정하는 과정이야.',
    '기획이 제작으로 이어지는 순간!',
    '결과물을 담는 공간도 살펴보자.',
    '역할과 과정을 함께 정리하는 거야.',
    '배운 점과 다음 방향도 중요해!'
  ],
  'contact.html': [
    '함께 만들고 싶은 이야기가 있어?',
    '콘텐츠 제작이나 협업 문의 공간이야!',
    '접수 가능 상태를 먼저 확인해 줘.',
    '문의 목적을 간단히 정리해 볼까?',
    '어떤 작업이 필요한지 알려 줘!',
    '개인정보 안내도 먼저 읽어 줘.',
    '문의 전 동의 항목도 확인해 줘!',
    '사이트 안내가 필요하면 라온이에게!'
  ]
};
const mioPageName = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
const mioActions = ['dance', 'market', 'food', 'haeundae', 'dalmaji', 'coffee', 'reading', 'art'];
const mascotStates = (mioPageLines[mioPageName] || mioPageLines['index.html'])
  .map((line, index) => ({ action: mioActions[index % mioActions.length], line }));

mascotImage.src = mioImagePath;

let mascotStateIndex = 0;
let mascotOnLeft = false;
function showMascotState(index) {
  const state = mascotStates[index];
  mascot.className = `busan-mascot action-${state.action}`;
  mascot.classList.toggle('is-left', mascotOnLeft);
  mascotBubble.textContent = state.line;
  mascot.setAttribute('aria-label', `페이지 안내 캐릭터 미오: ${state.line}`);
  mascotBubble.classList.remove('bubble-pop');
  void mascotBubble.offsetWidth;
  mascotBubble.classList.add('bubble-pop');
}

showMascotState(mascotStateIndex);
window.setInterval(() => {
  mascotStateIndex = (mascotStateIndex + 1) % mascotStates.length;
  if (mascotStateIndex === 0) mascotOnLeft = !mascotOnLeft;
  showMascotState(mascotStateIndex);
}, 5000);
