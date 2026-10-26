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
  { action: 'dance', image: 'busan-otter-haro.png', line: '부산 여행 중!', label: '웹페이지 아래에서 춤추는 귀여운 부산 수달' },
  { action: 'market', image: 'busan-otter-haro-point.png', line: '구포시장 가고 싶다.', label: '구포시장을 가리키며 소개하는 귀여운 부산 수달' },
  { action: 'food', image: 'busan-otter-haro-heart.png', line: '시장에 가면 국수도 있고~꿀떡도 있고...', label: '두 손으로 하트를 만들며 시장 음식을 좋아하는 귀여운 부산 수달' },
  { action: 'haeundae', image: 'busan-otter-haro-wink.png', line: '바다 보러 해운대 갈래?', label: '한쪽 눈을 윙크하며 해운대 여행을 제안하는 귀여운 부산 수달' },
  { action: 'dalmaji', image: 'busan-otter-haro-dreamy.png', line: '달맞이길이 예쁘다는데..', label: '두 손을 모으고 달맞이길을 기대하는 귀여운 부산 수달' },
  { action: 'coffee', image: 'busan-otter-haro-thinking.png', line: '커피 마시러 갈까?', label: '한 손으로 볼을 짚고 커피 여행을 생각하는 귀여운 부산 수달' },
  { action: 'reading', image: 'busan-otter-haro-dreamy.png', line: 'F1963에 가서 책 같이 읽을까?', label: '두 손을 모으고 F1963 방문을 기대하는 귀여운 부산 수달' },
  { action: 'art', image: 'busan-otter-haro-point.png', line: '예술 문화 즐기려면 F1963가야지!', label: '부산 예술 문화를 가리키며 소개하는 귀여운 부산 수달' }
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
