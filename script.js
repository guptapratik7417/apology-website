// Personalize the recipient here.
const PERSONALIZATION = {
  name: 'Shivangi'
};

document.querySelectorAll('[data-name]').forEach(node => { node.textContent = PERSONALIZATION.name; });

const song = document.querySelector('#apology-song');
async function startSong() {
  if (!song.paused) return;
  try {
    await song.play();
    const button = document.querySelector('.sound-toggle');
    button.classList.add('active');
    button.setAttribute('aria-label', 'Pause the song');
  } catch (error) {
    showToast('Tap the music button to play the melody');
  }
}

const panels = [...document.querySelectorAll('.page-panel')];
let activePage = 0;
function showPage(index) {
  activePage = (index + panels.length) % panels.length;
  panels.forEach((panel, pageIndex) => {
    const selected = pageIndex === activePage;
    panel.classList.toggle('active', selected);
    panel.setAttribute('aria-hidden', String(!selected));
  });
  document.querySelectorAll('.page-count').forEach(node => { node.textContent = `${activePage + 1} / ${panels.length}`; });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('.next-page').forEach(button => button.addEventListener('click', () => {
  startSong();
  showPage(activePage + 1);
}));
document.querySelectorAll('.prev-page').forEach(button => button.addEventListener('click', () => showPage(activePage - 1)));
document.querySelector('.restart-page').addEventListener('click', () => showPage(0));
showPage(0);
let pageTouchX = 0;
document.addEventListener('touchstart', event => { pageTouchX = event.changedTouches[0].screenX; }, { passive: true });
document.addEventListener('touchend', event => {
  const delta = event.changedTouches[0].screenX - pageTouchX;
  if (Math.abs(delta) > 80) showPage(activePage + (delta < 0 ? 1 : -1));
}, { passive: true });
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') showPage(activePage + 1);
  if (event.key === 'ArrowLeft') showPage(activePage - 1);
});

const envelope = document.querySelector('.envelope-wrap');
const letterSection = document.querySelector('.letter-section');
function openLetter() {
  envelope.classList.add('open');
  letterSection.classList.add('open');
  window.setTimeout(() => letterSection.scrollIntoView({ behavior: 'smooth', block: 'center' }), 220);
}
envelope.addEventListener('click', openLetter);
envelope.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLetter(); }
});

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}
document.querySelector('.gift-toggle').addEventListener('click', () => {
  showToast('A little surprise, just for you 💌');
  for (let i = 0; i < 26; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti';
    bit.textContent = ['♥', '💜', '💙', '✦'][Math.floor(Math.random() * 4)];
    bit.style.left = `${Math.random() * 100}vw`;
    bit.style.animationDuration = `${2 + Math.random() * 2.5}s`;
    bit.style.fontSize = `${14 + Math.random() * 20}px`;
    document.body.append(bit);
    bit.addEventListener('animationend', () => bit.remove(), { once: true });
  }
});

// Browsers require a user gesture before playing audio; the button toggles the supplied song.
document.querySelector('.sound-toggle').addEventListener('click', async event => {
  const button = event.currentTarget;
  if (song.paused) {
    try {
      await song.play();
      button.classList.add('active');
      button.setAttribute('aria-label', 'Pause the song');
      showToast('A little melody is playing ♫');
    } catch (error) {
      showToast('Tap again to play the melody');
    }
  } else {
    song.pause();
    button.classList.remove('active');
    button.setAttribute('aria-label', 'Play the song');
    showToast('Melody paused');
  }
});

const cards = [...document.querySelectorAll('.polaroid')];
const memoryPhotos = ['assets/moment-1.jpeg', 'assets/moment-2.jpeg', 'assets/moment-3.jpeg'];
let memoryIndex = 0;
function updateMemoryDeck() {
  cards.forEach((card, position) => {
    const photoIndex = (memoryIndex + position - 1 + memoryPhotos.length) % memoryPhotos.length;
    const image = card.querySelector('img');
    image.hidden = false;
    image.src = memoryPhotos[photoIndex];
  });
}
function rotateMemories(direction = 1) {
  memoryIndex = (memoryIndex + direction + memoryPhotos.length) % memoryPhotos.length;
  updateMemoryDeck();
}
updateMemoryDeck();
cards.forEach((card, index) => card.addEventListener('click', () => rotateMemories(index === 0 ? -1 : 1)));
const deck = document.querySelector('.polaroid-deck');
let touchStartX = 0;
deck.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
deck.addEventListener('touchend', event => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 35) rotateMemories(delta < 0 ? 1 : -1);
}, { passive: true });
deck.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') rotateMemories(1);
  if (event.key === 'ArrowLeft') rotateMemories(-1);
});
