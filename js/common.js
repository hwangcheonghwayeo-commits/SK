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
const mascotStates = [
  { action: 'dance', line: '부산 여행 중!' },
  { action: 'market', line: '구포시장 가고 싶다.' },
  { action: 'food', line: '시장에 가면 국수도 있고~꿀떡도 있고...' },
  { action: 'haeundae', line: '바다 보러 해운대 갈래?' },
  { action: 'dalmaji', line: '달맞이길이 예쁘다는데..' },
  { action: 'coffee', line: '커피 마시러 갈까?' },
  { action: 'reading', line: 'F1963에 가서 책 같이 읽을까?' },
  { action: 'art', line: '예술 문화 즐기려면 F1963가야지!' }
];

mascotImage.src = mioImagePath;

let mascotStateIndex = 0;
let mascotOnLeft = false;
function showMascotState(index) {
  const state = mascotStates[index];
  mascot.className = `busan-mascot action-${state.action}`;
  mascot.classList.toggle('is-left', mascotOnLeft);
  mascotBubble.textContent = state.line;
  mascot.setAttribute('aria-label', `부산 여행 안내 캐릭터 미오: ${state.line}`);
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
