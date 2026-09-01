const menuButton=document.querySelector('.menu-toggle');const menu=document.querySelector('.main-nav');
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const isOpen=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));document.body.classList.toggle('menu-open',isOpen)});menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));}

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
const mascotStates = [
  { action: 'dance', image: 'busan-otter-dance.png', line: '부산 여행 중!', label: '웹페이지 아래에서 춤추는 귀여운 부산 수달' },
  { action: 'market', image: 'busan-otter-market.png', line: '구포시장 가고 싶다.', label: '구포시장으로 걸어가며 신나게 가리키는 부산 수달' },
  { action: 'food', image: 'busan-otter-market-food.png', line: '시장에 가면 국수도 있고~꿀떡도 있고...', label: '시장 국수와 꿀떡을 맛있게 먹는 부산 수달' },
  { action: 'haeundae', image: 'busan-otter-haeundae.png', line: '바다 보러 해운대 갈래?', label: '튜브를 끼고 해운대 바다를 바라보는 부산 수달' },
  { action: 'dalmaji', image: 'busan-otter-dalmaji.png', line: '달맞이길이 예쁘다는데..', label: '달을 바라보며 달맞이길을 떠올리는 부산 수달' },
  { action: 'coffee', image: 'busan-otter-coffee.png', line: '커피 마시러 갈까?', label: '따뜻한 커피를 마시는 부산 수달' },
  { action: 'reading', image: 'busan-otter-reading.png', line: 'F1963에 가서 책 같이 읽을까?', label: '책을 펼쳐 읽고 있는 부산 수달' },
  { action: 'art', image: 'busan-otter-art.png', line: '예술 문화 즐기려면 F1963가야지!', label: '붓과 팔레트를 들고 예술을 즐기는 부산 수달' }
];

mascotStates.forEach(state => {
  const preload = new Image();
  preload.src = `assets/images/common/${state.image}`;
});

let mascotStateIndex = 0;
let mascotOnLeft = false;
function showMascotState(index) {
  const state = mascotStates[index];
  mascot.className = `busan-mascot action-${state.action}`;
  mascot.classList.toggle('is-left', mascotOnLeft);
  mascotImage.src = `assets/images/common/${state.image}`;
  mascotBubble.textContent = state.line;
  mascot.setAttribute('aria-label', state.label);
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
