'use strict';

const byId = id => document.getElementById(id);
const all = selector => Array.from(document.querySelectorAll(selector));
const home = document.body.dataset.page === 'home';
const preferQuiet = matchMedia('(prefers-reduced-motion: reduce)');
const defaults = () => ({ crt: true, motion: !preferQuiet.matches, bounds: false });
let state = { ...defaults(), language: 'zh', favorite: false };
try {
  const saved = JSON.parse(localStorage.getItem('sole-verge-settings') || '{}');
  for (const key of ['crt', 'motion', 'bounds', 'favorite']) {
    if (typeof saved[key] === 'boolean') state[key] = saved[key];
  }
  if (saved.language === 'en') state.language = 'en';
} catch { /* Browser storage is optional. */ }
function persist() {
  try { localStorage.setItem('sole-verge-settings', JSON.stringify(state)); } catch {}
}
const t = (zh, en) => state.language === 'zh' ? zh : en;
let tag = 'all';
let savedOnly = false;
let slide = 0;
let still = 0;
let watching = false;
const slides = [
  ['key-art.png','Sole Verge · 主视觉','Sole Verge · Key art'],
  ['hall.png','空寂病院 · 派对走廊','Hollow Ward · Party corridor'],
  ['cake.png','空寂病院 · 生日宴','Hollow Ward · Birthday table']
];
const stills = [
  ['hall.png','派对走廊','Party corridor'], ['cake.png','一楼生日宴','Birthday table'],
  ['guard.png','举剑格挡','Sword guard']
];
function animateIn(node) {
  if (!state.motion || !node.animate) return;
  node.animate([{ opacity: .48 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
}
function showSlide(animate = false) {
  const [file, zh, en] = slides[slide];
  const img = byId('key');
  img.src = 'assets/' + file;
  img.alt = t(zh, en);
  img.dataset.slide = slide;
  byId('artTitle').textContent = t(zh, en);
  byId('artNo').textContent = '0' + (slide + 1) + ' / 03';
  if (animate) animateIn(img);
}
function filterLibrary() {
  const query = byId('search').value.trim().toLowerCase();
  const matches = ['all','horror','thriller'].includes(tag) &&
    (!savedOnly || state.favorite) &&
    query.split(/\s+/).every(word => '空寂病院 hollow ward 恐怖 惊悚 第一人称 horror thriller first-person android 安卓'.includes(word));
  byId('record').hidden = !matches;
  byId('empty').hidden = matches;
  byId('saved').setAttribute('aria-pressed', savedOnly);
  for (const button of all('[data-tag]')) button.setAttribute('aria-pressed', button.dataset.tag === tag);
}
function renderFavorite() {
  for (const button of all('.favorite')) {
    button.textContent = state.favorite ? t('♥ 已收藏','♥ Saved') : t('♡ 收藏游戏','♡ Save game');
    button.setAttribute('aria-pressed', state.favorite);
  }
  if (home) filterLibrary();
}
function renderLanguage() {
  const english = state.language === 'en';
  document.documentElement.lang = english ? 'en' : 'zh-CN';
  document.title = home ? t('Sole Verge · 独立游戏馆','Sole Verge · Independent Games') : t('空寂病院 · Sole Verge','Hollow Ward · Sole Verge');
  for (const node of all('[data-zh][data-en]')) node.textContent = node.dataset[state.language];
  byId('lang').textContent = t('EN / 中文','中文 / EN');
  byId('lang').setAttribute('aria-label',t('Switch to English','切换到简体中文'));
  if (home) {
    byId('search').placeholder = t('搜索游戏名称或类型','Search by title or genre');
    showSlide();
  }
  renderFavorite();
}
function renderOptions() {
  for (const key of ['crt','motion','bounds']) byId(key).checked = state[key];
  document.body.classList.toggle('crt', state.crt);
  document.body.classList.toggle('bounds', state.bounds);
  document.body.classList.toggle('no-motion', !state.motion);
  document.documentElement.classList.toggle('no-scroll', !state.motion);
}
function updateSize() { byId('vp').textContent = innerWidth + ' × ' + innerHeight + ' px'; }
byId('lang').onclick = () => {
  state.language = state.language === 'zh' ? 'en' : 'zh';
  renderLanguage(); persist();
};
for (const button of all('.favorite')) button.onclick = () => {
  state.favorite = !state.favorite;
  renderFavorite(); persist();
};
byId('settings').onclick = () => { updateSize(); byId('options').showModal(); };
window.addEventListener('resize', updateSize);
for (const key of ['crt','motion','bounds']) byId(key).onchange = () => {
  state[key] = byId(key).checked;
  renderOptions(); persist();
};
byId('reset').onclick = () => { Object.assign(state, defaults()); renderOptions(); persist(); };
for (const dialog of all('dialog')) {
  dialog.querySelector('.close').onclick = () => dialog.close();
  dialog.onclick = e => {
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
  };
}
if (home) {
  function advance(step) { slide = (slide + step + slides.length) % slides.length; showSlide(true); }
  byId('prev').onclick = () => advance(-1);
  byId('next').onclick = () => advance(1);
  const frame = document.querySelector('.frame');
  frame.onkeydown = e => {
    if (['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); advance(e.key === 'ArrowLeft' ? -1 : 1); }
  };
  const art = document.querySelector('.keyart');
  art.onpointermove = e => {
    if (!state.motion || e.pointerType !== 'mouse') return;
    const r = art.getBoundingClientRect();
    art.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5) * 5 + 'px');
    art.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5) * 3 + 'px');
  };
  art.onpointerleave = () => { art.style.removeProperty('--px'); art.style.removeProperty('--py'); };
  let start;
  art.ontouchstart = e => { const p = e.touches[0]; start = [p.clientX,p.clientY]; };
  art.ontouchend = e => {
    if (!start) return;
    const p = e.changedTouches[0], dx = p.clientX - start[0], dy = p.clientY - start[1];
    if (Math.abs(dx) > 44 && Math.abs(dx) > 1.5 * Math.abs(dy)) advance(dx < 0 ? 1 : -1);
    start = null;
  };
  byId('search').oninput = filterLibrary;
  byId('saved').onclick = () => { savedOnly = !savedOnly; filterLibrary(); };
  for (const b of all('[data-tag]')) b.onclick = () => { tag = b.dataset.tag; filterLibrary(); };
  byId('clear').onclick = () => { tag = 'all'; savedOnly = false; byId('search').value = ''; filterLibrary(); byId('search').focus(); };
}
function displayStill() {
  const [file, zh, en] = stills[still];
  const img = new Image();
  img.src = 'assets/' + file; img.alt = t(zh,en);
  byId('mediaTitle').textContent = img.alt;
  byId('screen').replaceChildren(img);
  byId('position').textContent = (still + 1) + ' / ' + stills.length;
  animateIn(img);
}
function stepStill(direction) {
  still = (still + direction + stills.length) % stills.length;
  displayStill();
}
for (const button of all('.still')) button.onclick = () => {
  watching = false; still = Number(button.dataset.index); displayStill();
  byId('mediaControls').hidden = false; byId('media').showModal();
};
for (const b of all('[data-step]')) b.onclick = () => stepStill(Number(b.dataset.step));
byId('media').onkeydown = e => {
  if (!watching && ['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); stepStill(e.key === 'ArrowLeft' ? -1 : 1); }
};
for (const b of all('.open-video')) b.onclick = () => {
  watching = true;
  const video = document.createElement('video');
  video.controls = true; video.playsInline = true;
  video.poster = 'assets/hall.png'; video.src = 'assets/party.mp4';
  byId('mediaTitle').textContent = t('空寂病院 · 派对实机短片','Hollow Ward · Party gameplay');
  byId('mediaControls').hidden = true;
  byId('screen').replaceChildren(video);
  byId('media').showModal();
  video.play().catch(() => {});
};
byId('media').onclose = () => { byId('screen').querySelector('video')?.pause(); byId('screen').replaceChildren(); };
renderLanguage(); renderOptions();
