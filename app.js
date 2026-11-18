const filters = document.querySelector('#filters');
const card = document.querySelector('.card');
for (const tag of ['全部','恐怖','悬疑','惊悚','娱乐','休闲']) {
  const button = document.createElement('button');
  button.textContent = tag;
  button.setAttribute('aria-pressed', tag === '全部');
  button.onclick = () => {
    for (const item of filters.children) item.setAttribute('aria-pressed', item === button);
    const matches = ['全部','恐怖','惊悚'].includes(tag);
    card.hidden = !matches;
    document.querySelector('#empty').hidden = matches;
    document.querySelector('#count').textContent = matches ? '1 张游戏碟' : '0 张游戏碟';
  };
  filters.append(button);
}
const viewer = document.querySelector('#viewer');
for (const button of document.querySelectorAll('.stills button')) {
  button.onclick = () => {
    const image = viewer.querySelector('img');
    image.src = button.firstElementChild.src;
    image.alt = button.firstElementChild.alt;
    viewer.showModal();
  };
}
