/* Sole Verge 孤独的边界 — 页面逻辑（首页 + 游戏页） */
(() => {
  'use strict';
  const DATA = window.SAVE_ROOM;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const page = document.body.dataset.page;
  const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Language ---------- */
  const STRINGS = {
    'nav.home': ['首页', 'Home'],
    'nav.games': ['游戏', 'Games'],
    'nav.news': ['动态', 'News'],
    'nav.about': ['关于', 'About'],
    'nav.cta': ['下载最新作', 'Get the latest'],
    'logo.sub': ['孤独的边界', '孤独的边界'],
    'mega.all': ['全部游戏', 'All games'],
    'mega.allText': ['一个人做的游戏都在这里，全部免费。按类型挑一款吧。', 'Every game I have made, all free. Pick a genre.'],
    'mega.latest': ['最新', 'Latest'],
    'hero.title': ['欢迎来到<br>孤独的边界', 'Welcome to<br>Sole Verge'],
    'hero.sub': ['一个人做的恐怖、悬疑与生存游戏，全部免费下载。雾很大，记得带上灯。', 'Horror, mystery and survival games made by one person, free to download. The fog is thick. Bring a lantern.'],
    'hero.download': ['立即下载', 'Download now'],
    'hero.browse': ['浏览全部游戏', 'Browse all games'],
    'hero.latest': ['最新版本：', 'Latest build: '],
    'value.free': ['全部免费', 'Free, always'],
    'value.free.sub': ['不收钱，没有内购', 'No price, no purchases'],
    'value.offline': ['离线可玩', 'Plays offline'],
    'value.offline.sub': ['下载安装就能玩', 'Install and play'],
    'value.updates': ['持续更新', 'Always updating'],
    'value.updates.sub': ['每个版本都有记录', 'Every build is logged'],
    'value.source': ['源码公开', 'Open source'],
    'value.source.sub': ['Godot 工程随包附带', 'Godot projects included'],
    'games.title': ['我的游戏', 'Games'],
    'genre.all': ['全部', 'All'],
    'badge.new': ['最新', 'New'],
    'badge.dev': ['制作中', 'In development'],
    'empty.title': ['下一款游戏', 'The next game'],
    'empty.text': ['悬疑、生存还是丧尸？新作的进度会先发在 B 站和抖音。', 'Mystery, survival or zombies? Progress goes up on Bilibili and Douyin first.'],
    'empty.genreTitle': ['{genre}新作', 'A {genre} game'],
    'empty.genreText': ['这个分类还没有游戏，正在做了。关注 B 站和抖音，第一时间看预告。', 'Nothing here yet. Follow on Bilibili and Douyin to catch the first teaser.'],
    'empty.signal': ['信号中断', 'Signal lost'],
    'spot.title': ['最新作品', 'Latest release'],
    'spot.download': ['下载 v{ver}', 'Download v{ver}'],
    'spot.details': ['查看详情', 'View details'],
    'news.title': ['最新动态', 'News'],
    'news.all': ['全部更新记录', 'Full changelog'],
    'studio.title': ['关于', 'About'],
    'studio.text': ['我一个人写代码、画素材、做音效，用 Godot 和 Blender 做游戏。这里的每款游戏都免费。接下来想做悬疑、生存和丧尸，也想做点轻松的小游戏。', 'I write the code, make the art and the sound on my own, in Godot and Blender. Every game here is free. Mystery, survival and zombie games are next, plus a few lighter ones.'],
    'links.github': ['GitHub', 'GitHub'],
    'links.bilibili': ['哔哩哔哩', 'Bilibili'],
    'links.douyin': ['抖音', 'Douyin'],
    'footer.blurb': ['孤独的边界的独立游戏。一个人开发，全部免费。', 'Independent games by 孤独的边界. Made solo, always free.'],
    'footer.site': ['网站', 'Site'],
    'footer.games': ['游戏', 'Games'],
    'footer.follow': ['关注', 'Follow'],
    'footer.made': ['用 Godot 和 Blender 制作', 'Made with Godot and Blender'],
    'game.crumb': ['游戏', 'Games'],
    'spec.version': ['版本', 'Version'],
    'spec.platform': ['平台', 'Platform'],
    'spec.size': ['大小', 'Size'],
    'spec.engine': ['引擎', 'Engine'],
    'spec.lang': ['语言', 'Languages'],
    'spec.online': ['联网', 'Online'],
    'sub.shots': ['画面', 'Screens'],
    'sub.about': ['玩法', 'Gameplay'],
    'sub.clip': ['短片', 'Clip'],
    'sub.download': ['下载', 'Download'],
    'sub.log': ['更新记录', 'Changelog'],
    'game.shots': ['实机画面', 'Screenshots'],
    'game.about': ['这是什么游戏', 'About the game'],
    'game.clip': ['实机短片', 'Gameplay clip'],
    'game.download': ['下载与安装', 'Download and install'],
    'game.source': ['源码与安装说明', 'Source and install guide'],
    'game.log': ['更新记录', 'Changelog'],
    'game.more': ['更多游戏', 'More games'],
    'game.sums': ['文件校验（SHA-256）', 'File checksums (SHA-256)'],
    'game.prev': ['上一张', 'Previous'],
    'game.next': ['下一张', 'Next'],
    'game.zoom': ['查看大图', 'View full size'],
    'game.close': ['关闭', 'Close'],
    'notfound.title': ['没找到这款游戏', 'Game not found'],
    'notfound.text': ['链接可能写错了，回首页看看。', 'The link may be wrong. Head back home.'],
    'notfound.back': ['回到首页', 'Back home'],
  };
  let lang = 'zh';
  try { if (localStorage.getItem('sv-lang') === 'en') lang = 'en'; } catch (e) { /* storage is optional */ }
  const t = (key, vars = {}) => {
    const pair = STRINGS[key];
    let s = pair ? pair[lang === 'zh' ? 0 : 1] : key;
    for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(v);
    return s;
  };
  const pick = (o) => (o && typeof o === 'object' ? (o[lang] ?? o.zh) : o ?? '');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return lang === 'zh' ? `${y} 年 ${m} 月 ${d} 日` : new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  };

  /* ---------- Icons ---------- */
  const svg = (d, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const P = {
    download: '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    left: '<path d="m15 5-7 7 7 7"/>',
    right: '<path d="m9 5 7 7-7 7"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    code: '<path d="m8 7-5 5 5 5"/><path d="m16 7 5 5-5 5"/><path d="m13.5 4-3 16"/>',
    screen: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="m8 3 2.5 3M16 3l-2.5 3"/><path d="M9 12v2M15 12v2"/>',
    note: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
    radio: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8 17 3"/><circle cx="8.5" cy="14" r="2.5"/><path d="M14 12h4M14 15h4M14 18h2"/>',
    skull: '<path d="M12 3c-4.4 0-7.5 3-7.5 7 0 2.4 1.1 4 2.5 5v3h10v-3c1.4-1 2.5-2.6 2.5-5 0-4-3.1-7-7.5-7z"/><circle cx="9" cy="11" r="1.6"/><circle cx="15" cy="11" r="1.6"/><path d="M10 18v3M14 18v3M12 14v1.5"/>',
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M5 4l1.3 1.6M19 4l-1.3 1.6"/>',
    flame: '<path d="M12 3c1 3.5 5 5.6 5 10a5 5 0 0 1-10 0c0-2.4 1.3-3.8 2.5-5 .2 1.8 1 2.8 2 3.2C11 9 11.2 6 12 3z"/><path d="M4 21h16"/>',
    hand: '<path d="M8 21v-6.5L6.2 11a1.4 1.4 0 0 1 2.3-1.5L10 11.5V5a1.3 1.3 0 0 1 2.6 0v5.5V4a1.3 1.3 0 0 1 2.6 0v6.5V6a1.3 1.3 0 0 1 2.6 0v8.5c0 3-1 4.8-2.3 6.5"/><path d="M3 21h18"/>',
    cup: '<path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M9 3c-1 1.2 1 2 0 3.4M13 3c-1 1.2 1 2 0 3.4"/>',
    dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><circle cx="8.5" cy="8.5" r="1.1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.1" fill="currentColor"/><circle cx="12" cy="12" r="1.1" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.1" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.1" fill="currentColor"/>',
    caret: '<path d="m6 9 6 6 6-6"/>',
  };
  const I = Object.fromEntries(Object.entries(P).map(([k, d]) => [k, svg(d)]));
  I.down = svg(P.download, 'i i--down');
  I.go = svg(P.arrow, 'i i--go');

  /* ---------- Data helpers ---------- */
  const owner = DATA.owner;
  const ownerName = owner.name.zh;
  const socials = () => [
    { key: 'github', icon: I.code, url: owner.links.github },
    { key: 'bilibili', icon: I.screen, url: owner.links.bilibili || `https://search.bilibili.com/upuser?keyword=${encodeURIComponent(ownerName)}` },
    { key: 'douyin', icon: I.note, url: owner.links.douyin || `https://www.douyin.com/search/${encodeURIComponent(ownerName)}?type=user` },
  ];
  const genreById = Object.fromEntries(DATA.genres.map((g) => [g.id, g]));
  const byDate = [...DATA.games].sort((a, b) => b.updated.localeCompare(a.updated));
  const latest = byDate[0];
  const gameUrl = (g, hash = '') => `game.html?id=${encodeURIComponent(g.id)}${hash}`;
  const homeUrl = (hash) => (page === 'home' ? hash : `index.html${hash}`);
  const apkOf = (g) => (g.downloads || []).find((d) => d.kind === 'apk') || (g.downloads || [])[0];
  const chips = (g) => g.genres.map((id) => genreById[id]).filter(Boolean)
    .map((ge) => `<span class="chip" style="--c:${ge.color}">${esc(pick(ge))}</span>`).join('');
  const avatar = (size = 160) => `<img src="${esc(owner.avatar)}" alt="${esc(ownerName)}" width="${size}" height="${size}" onerror="this.onerror=null;this.src='${esc(owner.avatarFallback)}'">`;
  const ornaments = (rivets = false) => `<span class="orn orn--tl"></span><span class="orn orn--tr"></span><span class="orn orn--bl"></span><span class="orn orn--br"></span>${rivets ? '<span class="rivet rivet--a"></span><span class="rivet rivet--b"></span>' : ''}`;

  function gameCard(g, wide = false) {
    const isNew = latest && g.id === latest.id;
    return `<article class="frame card${wide ? ' card--wide' : ''}">
      ${ornaments(true)}
      <div class="card__media"><img src="${esc(g.cover)}" alt="" loading="lazy"><span class="scan"></span></div>
      <span class="plate">No. ${esc(g.no || '')}</span>
      <div class="card__body">
        <div class="tile"><span class="sprite" style="background-image:url('${esc(g.icon)}')" aria-hidden="true"></span></div>
        <div class="card__text">
          <h3 class="card__name">${esc(pick(g.title))}${isNew ? `<span class="badge">${esc(t('badge.new'))}</span>` : ''}</h3>
          <p class="card__desc">${esc(pick(g.summary))}</p>
          <div class="chips">${chips(g)}</div>
        </div>
      </div>
      <div class="card__foot">
        <span class="serial">SV-${esc(g.no || '')}　/　${esc(g.title.en.toUpperCase())}　/　V${esc(g.version)}</span>
        <span class="go">${I.go}</span>
      </div>
      <a class="card__link" href="${esc(gameUrl(g))}" aria-label="${esc(pick(g.title))}"></a>
    </article>`;
  }

  function emptyCard(genreId) {
    const ge = genreById[genreId];
    const title = ge ? t('empty.genreTitle', { genre: pick(ge) }) : t('empty.title');
    const text = ge ? t('empty.genreText') : t('empty.text');
    const follow = socials().filter((s) => s.key !== 'github')
      .map((s) => `<a class="btn btn--line btn--sm" href="${esc(s.url)}" target="_blank" rel="noopener">${s.icon}${esc(t('links.' + s.key))}</a>`).join('');
    return `<article class="frame card card--empty">
      ${ornaments(true)}
      <div class="card__media"><div class="nosignal"><b>NO SIGNAL</b><span>${esc(t('empty.signal'))}</span></div></div>
      <div class="card__body">
        <div class="tile">${ge ? svg(P[ge.icon] || P.radio) : I.radio}</div>
        <div class="card__text">
          <h3 class="card__name">${esc(title)}<span class="badge badge--dev">${esc(t('badge.dev'))}</span></h3>
          <p class="card__desc">${esc(text)}</p>
          <div class="links-row">${follow}</div>
        </div>
      </div>
      <div class="card__foot"><span class="serial">SV-???　/　COMING SOON</span></div>
    </article>`;
  }

  /* ---------- Shared chrome ---------- */
  function renderMega() {
    const mega = $('[data-mega]');
    if (!mega) return;
    const count = (id) => DATA.games.filter((g) => g.genres.includes(id)).length;
    mega.innerHTML = `<div class="shell mega__inner">
      <nav class="mega__links" aria-label="菜单">
        <a href="${homeUrl('#top')}">${esc(t('nav.home'))}</a><a href="${homeUrl('#games')}">${esc(t('nav.games'))}</a><a href="${homeUrl('#news')}">${esc(t('nav.news'))}</a><a href="${homeUrl('#about')}">${esc(t('nav.about'))}</a>
      </nav>
      <div class="mega__all">
        <h3>${esc(t('mega.all'))}</h3>
        <p>${esc(t('mega.allText'))}</p>
        ${latest ? `<a class="mega__latest" href="${esc(gameUrl(latest))}"><img src="${esc(latest.cover)}" alt=""><span><b>${esc(pick(latest.title))}</b><span>${esc(t('mega.latest'))}　v${esc(latest.version)}</span></span></a>` : ''}
        <a class="btn btn--line btn--sm" href="${homeUrl('#cat-all')}" data-cat="all" style="align-self:flex-start">${esc(t('hero.browse'))}${I.go}</a>
      </div>
      <div class="mega__grid">${DATA.genres.map((g, k) => `
        <a class="cat" href="${homeUrl('#cat-' + g.id)}" data-cat="${g.id}" style="--k:${k};--c:${g.color}">
          <span class="cat__icon">${svg(P[g.icon] || P.box, '')}</span>
          <span><b>${esc(pick(g))}</b><span>${esc(pick(g.desc))}</span></span>
          <span class="cat__n">${String(count(g.id)).padStart(2, '0')}</span>
        </a>`).join('')}</div>
    </div>`;
  }

  function initMega() {
    const item = $('.menu__item');
    const mega = $('[data-mega]');
    const nav = $('.nav');
    if (!item || !mega) return;
    const trigger = $('.menu__trigger', item);
    let timer = 0;
    const open = () => { clearTimeout(timer); item.classList.add('is-open'); mega.classList.add('is-open'); nav.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { item.classList.remove('is-open'); mega.classList.remove('is-open'); nav.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
    const later = () => { clearTimeout(timer); timer = setTimeout(close, 180); };
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', later);
    mega.addEventListener('mouseenter', open);
    mega.addEventListener('mouseleave', later);
    trigger.addEventListener('click', () => (mega.classList.contains('is-open') ? close() : open()));
    const btn = $('[data-menu-btn]');
    btn?.addEventListener('click', () => {
      const on = !mega.classList.contains('is-open');
      on ? open() : close();
      btn.classList.toggle('is-open', on); btn.setAttribute('aria-expanded', String(on));
      document.documentElement.classList.toggle('menu-locked', on);
    });
    mega.addEventListener('click', (e) => { if (e.target.closest('a') && btn) { btn.classList.remove('is-open'); document.documentElement.classList.remove('menu-locked'); } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    mega.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  }

  // The logo bleeds at random moments
  function initBleed() {
    const mark = $('.mark');
    if (!mark || quiet) return;
    const bleed = () => {
      mark.classList.remove('is-bleeding');
      void mark.offsetWidth;
      mark.classList.add('is-bleeding');
    };
    const schedule = (first) => setTimeout(() => { bleed(); schedule(false); }, first ? 2200 : 7000 + Math.random() * 9000);
    schedule(true);
    mark.closest('a')?.addEventListener('mouseenter', bleed);
  }

  // Ash drifting through the hero, as in a certain foggy town
  function initAsh(canvas) {
    if (!canvas || quiet) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, flakes = [], raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const make = (y) => ({ x: Math.random() * w, y: y ?? Math.random() * h, r: 0.6 + Math.random() * 2.2, vy: 0.15 + Math.random() * 0.45, sway: Math.random() * Math.PI * 2, sp: 0.004 + Math.random() * 0.01, a: 0.15 + Math.random() * 0.4, rot: Math.random() * Math.PI });
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(160, (w * h) / 9000));
      flakes = Array.from({ length: n }, () => make());
    };
    const step = () => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.sway += f.sp; f.y += f.vy; f.x += Math.sin(f.sway) * 0.35 + 0.08; f.rot += 0.01;
        if (f.y > h + 6 || f.x > w + 6) Object.assign(f, make(-6));
        ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot);
        ctx.fillStyle = `rgba(214, 210, 200, ${f.a})`;
        ctx.beginPath(); ctx.ellipse(0, 0, f.r, f.r * 0.62, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
      if (visible) raf = requestAnimationFrame(step);
    };
    resize(); window.addEventListener('resize', resize);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(step); }).observe(canvas);
    raf = requestAnimationFrame(step);
  }

  // Keep the flicker glow on top of the lantern flame in the hero render
  function initLamp() {
    const lamp = $('[data-lamp]');
    const img = $('.hero__art img');
    if (!lamp || !img) return;
    const U = 0.881, V = 0.5033, IW = 2560, IH = 1440;
    const place = () => {
      const cw = img.clientWidth, ch = img.clientHeight;
      const s = Math.max(cw / IW, ch / IH);
      const pos = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
      const ox = (cw - IW * s) * (pos[0] ?? 0.5), oy = (ch - IH * s) * (pos[1] ?? 0.5);
      lamp.style.left = `${ox + U * IW * s}px`; lamp.style.top = `${oy + V * IH * s}px`;
      lamp.style.transform = `scale(${Math.max(0.6, s * 1.6)})`;
    };
    place(); window.addEventListener('resize', place);
  }

  function initReveal() {
    const v = $('.values');
    if (!v) return;
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { v.classList.add('is-in'); o.disconnect(); } }, { threshold: 0.4 }).observe(v);
  }

  function applyStatic() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    for (const el of $$('[data-i18n]')) el.textContent = t(el.dataset.i18n);
    for (const el of $$('[data-i18n-html]')) el.innerHTML = t(el.dataset.i18nHtml);
    const toggle = $('[data-lang]');
    if (toggle) { toggle.textContent = lang === 'zh' ? 'EN' : '中文'; toggle.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文'); }
    for (const a of $$('[data-cta]')) a.href = latest ? gameUrl(latest, '#download') : homeUrl('#games');
    const gh = $('[data-github]'); if (gh) gh.href = owner.links.github;
    const bl = $('[data-bilibili]'); if (bl) bl.href = socials()[1].url;
    renderMega();
    renderFooter();
  }

  function renderFooter() {
    const f = $('[data-footer]');
    if (!f) return;
    f.innerHTML = `
      <div class="shell footer__grid">
        <div class="footer__brand">
          <a class="logo" href="${homeUrl('#top')}"><span class="mark"><img src="assets/site/logo.webp" alt="" width="48" height="48"></span><span><span class="logo__name">Sole Verge</span><span class="logo__sub">${esc(t('logo.sub'))}</span></span></a>
          <p>${esc(t('footer.blurb'))}</p>
        </div>
        <div><h4>${esc(t('footer.site'))}</h4><ul>
          <li><a href="${homeUrl('#top')}">${esc(t('nav.home'))}</a></li>
          <li><a href="${homeUrl('#games')}">${esc(t('nav.games'))}</a></li>
          <li><a href="${homeUrl('#news')}">${esc(t('nav.news'))}</a></li>
          <li><a href="${homeUrl('#about')}">${esc(t('nav.about'))}</a></li></ul></div>
        <div><h4>${esc(t('footer.games'))}</h4><ul>
          ${byDate.map((g) => `<li><a href="${esc(gameUrl(g))}">${esc(pick(g.title))}</a></li>`).join('')}
          ${DATA.genres.slice(0, 4).map((g) => `<li><a href="${homeUrl('#cat-' + g.id)}">${esc(pick(g))}</a></li>`).join('')}</ul></div>
        <div><h4>${esc(t('footer.follow'))}</h4><ul>
          ${socials().map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(t('links.' + s.key))}</a></li>`).join('')}</ul></div>
      </div>
      <div class="shell footer__base"><span>© ${new Date().getFullYear()} Sole Verge　${esc(ownerName)}</span><span>${esc(t('footer.made'))}</span></div>`;
  }

  function initChrome(render) {
    const nav = $('.nav');
    const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    $('[data-lang]')?.addEventListener('click', () => {
      lang = lang === 'zh' ? 'en' : 'zh';
      try { localStorage.setItem('sv-lang', lang); } catch (e) { /* ignore */ }
      applyStatic();
      render();
    });
    initMega();
    initBleed();
  }

  /* ================= Home ================= */
  function initHome() {
    let filter = 'all';

    function renderHero() {
      const apk = latest && apkOf(latest);
      const dl = $('[data-hero-download]');
      if (dl) dl.href = apk ? apk.url : '#games';
      const line = $('[data-hero-latest]');
      if (line && latest) line.innerHTML = `<i aria-hidden="true"></i><span>${esc(t('hero.latest'))}<a href="${esc(gameUrl(latest))}">${esc(pick(latest.title))} v${esc(latest.version)}</a>　${esc(pick(latest.platform))}　${esc(latest.size)}</span>`;
    }

    function moveInk() {
      const tabs = $('[data-tabs]'); const ink = $('.tabs__ink', tabs); const on = $('[aria-pressed="true"]', tabs);
      if (!ink || !on) return;
      ink.style.width = `${on.offsetWidth}px`;
      ink.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop - 4}px)`;
    }

    function renderGames() {
      const tabs = $('[data-tabs]');
      const all = [{ id: 'all', label: t('genre.all'), n: DATA.games.length }]
        .concat(DATA.genres.map((g) => ({ id: g.id, label: pick(g), n: DATA.games.filter((x) => x.genres.includes(g.id)).length })));
      tabs.innerHTML = '<span class="tabs__ink" aria-hidden="true"></span>' + all.map((g) => `<button class="tab" type="button" data-genre="${g.id}" aria-pressed="${filter === g.id}">${esc(g.label)}<span class="tab__n">${g.n}</span></button>`).join('');
      $$('[data-genre]', tabs).forEach((b) => b.addEventListener('click', () => setFilter(b.dataset.genre)));
      requestAnimationFrame(moveInk);
      const list = byDate.filter((g) => filter === 'all' || g.genres.includes(filter));
      const html = list.map((g, i) => gameCard(g, i === 0 && list.length % 3 !== 0));
      html.push(emptyCard(filter === 'all' ? null : filter));
      $('[data-cards]').innerHTML = html.join('');
    }

    function setFilter(id, scroll = false) {
      filter = genreById[id] ? id : 'all';
      renderGames();
      if (scroll) document.getElementById('games')?.scrollIntoView({ behavior: quiet ? 'auto' : 'smooth' });
    }

    function readHash() {
      const m = location.hash.match(/^#cat-([\w-]+)/);
      if (m) setFilter(m[1], true);
    }

    function renderSpot() {
      const box = $('[data-spot]');
      if (!latest) { box.closest('section').hidden = true; return; }
      const g = latest; const apk = apkOf(g);
      box.innerHTML = `
        <a class="frame spot__media" href="${esc(gameUrl(g))}">${ornaments()}<img src="${esc(g.shots?.[0]?.src || g.cover)}" alt="${esc(pick(g.title))}" loading="lazy"></a>
        <div>
          <p class="spot__no">No. ${esc(g.no || '')}　V${esc(g.version)}　${esc(fmtDate(g.updated))}</p>
          <h3 class="spot__title">${esc(pick(g.title))}</h3>
          <p class="spot__en">${esc(g.title.en)}</p>
          <p class="spot__tag">${esc(pick(g.summary))}</p>
          ${g.highlights ? `<div class="stats">${g.highlights.map((h) => `<div class="stat"><b>${esc(h.value)}</b><span>${esc(pick(h))}</span></div>`).join('')}</div>` : '<div style="height:32px"></div>'}
          <div class="spot__actions">
            ${apk ? `<a class="btn btn--light" href="${esc(apk.url)}">${I.down}${esc(t('spot.download', { ver: g.version }))}</a>` : ''}
            <a class="btn btn--line" href="${esc(gameUrl(g))}">${esc(t('spot.details'))}${I.go}</a>
          </div>
        </div>`;
    }

    function renderNews() {
      const items = DATA.games.flatMap((g) => (g.changelog || []).map((c) => ({ g, c })))
        .sort((a, b) => b.c.date.localeCompare(a.c.date) || b.c.version.localeCompare(a.c.version, undefined, { numeric: true }))
        .slice(0, 3);
      $('[data-news]').innerHTML = items.map(({ g, c }) => `
        <a class="frame post" href="${esc(gameUrl(g, '#log'))}">${ornaments()}
          <div class="post__img"><img src="${esc(c.image || g.cover)}" alt="" loading="lazy"></div>
          <div class="post__body">
            <p class="post__meta"><span><b>V${esc(c.version)}</b>　${esc(pick(g.title))}</span><span>${esc(fmtDate(c.date))}</span></p>
            <h3 class="post__title">${esc(pick(c.title) || 'v' + c.version)}</h3>
            <p class="post__text">${esc(pick(c))}</p>
          </div>
        </a>`).join('');
      const all = $('[data-news-all]');
      if (all && latest) all.href = gameUrl(latest, '#log');
    }

    function renderStudio() {
      $('[data-studio]').innerHTML = `
        <div class="studio__who">${avatar(84)}<div><h3 class="studio__name">${esc(ownerName)}</h3><p class="studio__handle">Sole Verge　@${esc(owner.handle)}</p></div></div>
        <p class="studio__text">${esc(t('studio.text'))}</p>
        <div class="studio__links">${socials().map((s) => `<a class="btn btn--line" href="${esc(s.url)}" target="_blank" rel="noopener">${s.icon}${esc(t('links.' + s.key))}</a>`).join('')}</div>`;
    }

    function render() { renderHero(); renderGames(); renderSpot(); renderNews(); renderStudio(); }

    const links = $$('.menu > a[href^="#"], .menu__trigger[data-target]');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle('is-active', (a.getAttribute('href') || '#' + a.dataset.target) === '#' + e.target.id));
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'games', 'news', 'about'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    window.addEventListener('hashchange', readHash);
    window.addEventListener('resize', moveInk);
    document.fonts?.ready.then(moveInk);

    initChrome(render);
    applyStatic();
    render();
    readHash();
    initAsh($('.hero__ash'));
    initLamp();
    initReveal();
  }

  /* ================= Game page ================= */
  function initGame() {
    const id = new URLSearchParams(location.search).get('id') || '';
    const g = DATA.games.find((x) => x.id === id);
    let shot = 0;

    function render() {
      const main = $('[data-game]');
      if (!g) {
        document.title = `${t('notfound.title')} | Sole Verge`;
        main.innerHTML = `<section class="notfound"><div class="shell"><h1>${esc(t('notfound.title'))}</h1><p>${esc(t('notfound.text'))}</p><a class="btn btn--light" href="index.html">${esc(t('notfound.back'))}</a></div></section>`;
        return;
      }
      document.title = `${pick(g.title)}${lang === 'zh' ? ' ' + g.title.en : ''} | Sole Verge`;
      const apk = apkOf(g);
      const s = g.shots || [];
      const others = byDate.filter((x) => x.id !== g.id);
      main.innerHTML = `
        <section class="ghero">
          <div class="ghero__art"><img src="${esc(g.cover)}" alt="" fetchpriority="high"></div>
          <canvas class="hero__ash" aria-hidden="true"></canvas>
          <div class="shell ghero__content">
            <nav class="crumbs" aria-label="breadcrumb"><a href="index.html#games">${esc(t('game.crumb'))}</a><span aria-hidden="true">/</span><span>${esc(pick(g.title))}</span></nav>
            <p class="eyebrow">No. ${esc(g.no || '')}　${esc(g.title.en)}</p>
            <h1 class="ghero__title">${esc(pick(g.title))}</h1>
            <p class="ghero__tag">${esc(pick(g.tagline))}</p>
            <div class="chips" style="margin-top:18px">${chips(g)}</div>
            <div class="ghero__actions">
              ${apk ? `<a class="btn btn--light" href="${esc(apk.url)}">${I.down}${esc(pick(apk.label))}<span class="btn__meta">${esc(apk.size)}</span></a>` : ''}
              <a class="btn btn--line" href="#download">${I.code}${esc(t('game.source'))}</a>
            </div>
          </div>
          <div class="shell">
            <dl class="specs">
              <div class="spec"><dt>${esc(t('spec.version'))}</dt><dd>v${esc(g.version)}</dd></div>
              <div class="spec"><dt>${esc(t('spec.platform'))}</dt><dd>${esc(pick(g.platform))}</dd></div>
              <div class="spec"><dt>${esc(t('spec.size'))}</dt><dd>${esc(g.size)}</dd></div>
              <div class="spec"><dt>${esc(t('spec.engine'))}</dt><dd>${esc(g.engine || '')}</dd></div>
              <div class="spec"><dt>${esc(t('spec.lang'))}</dt><dd>${esc(pick(g.languages))}</dd></div>
              <div class="spec"><dt>${esc(t('spec.online'))}</dt><dd>${esc(pick(g.online))}</dd></div>
            </dl>
          </div>
        </section>

        <div class="subnav"><div class="shell subnav__row">
          <span class="subnav__title">${esc(pick(g.title))}</span>
          ${s.length ? `<a href="#shots">${esc(t('sub.shots'))}</a>` : ''}
          <a href="#about">${esc(t('sub.about'))}</a>
          ${g.video ? `<a href="#clip">${esc(t('sub.clip'))}</a>` : ''}
          <a href="#download">${esc(t('sub.download'))}</a>
          ${g.changelog ? `<a href="#log">${esc(t('sub.log'))}</a>` : ''}
          ${apk ? `<a class="btn btn--blood" href="${esc(apk.url)}">${I.down}V${esc(g.version)}</a>` : ''}
        </div></div>

        ${s.length ? `
        <section class="section" id="shots"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.shots'))}</h2></div>
          <div class="frame viewer">${ornaments()}
            <img data-viewer-img src="${esc(s[0].src)}" alt="${esc(pick(s[0]))}">
            <button class="viewer__zoom" type="button" data-zoom aria-label="${esc(t('game.zoom'))}"></button>
            <span class="viewer__cap" data-viewer-cap>${esc(pick(s[0]))}</span>
            ${s.length > 1 ? `<button class="viewer__nav viewer__nav--prev" type="button" data-step="-1" aria-label="${esc(t('game.prev'))}">${I.left}</button>
            <button class="viewer__nav viewer__nav--next" type="button" data-step="1" aria-label="${esc(t('game.next'))}">${I.right}</button>` : ''}
          </div>
          <div class="thumbs">${s.map((x, i) => `<button class="thumb" type="button" data-shot="${i}" aria-current="${i === 0}" aria-label="${esc(pick(x))}"><img src="${esc(x.thumb || x.src)}" alt="" loading="lazy"></button>`).join('')}</div>
        </div></section>` : ''}

        <section class="section" id="about"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.about'))}</h2></div>
          <div class="split">
            <div class="prose">${(g.about || []).map((p) => `<p>${esc(pick(p))}</p>`).join('')}
              ${g.highlights ? `<div class="stats" style="margin-bottom:0">${g.highlights.map((h) => `<div class="stat"><b>${esc(h.value)}</b><span>${esc(pick(h))}</span></div>`).join('')}</div>` : ''}
            </div>
            <div class="modes">${(g.modes || []).map((m) => `<article class="frame mode">${ornaments()}${m.image ? `<img src="${esc(m.image)}" alt="" loading="lazy">` : ''}<h3>${esc(pick(m.name))}</h3><p>${esc(pick(m.text))}</p></article>`).join('')}</div>
          </div>
        </div></section>

        ${g.video ? `
        <section class="section" id="clip"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.clip'))}</h2></div>
          <div class="frame clip">${ornaments()}<video src="${esc(g.video.src)}" poster="${esc(g.video.poster || '')}" controls muted playsinline preload="none"></video></div>
          <p class="clip__cap">${esc(pick(g.video.caption))}</p>
        </div></section>` : ''}

        <section class="section" id="download"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.download'))}</h2></div>
          <div class="files">${(g.downloads || []).map((d) => `
            <a class="frame file" href="${esc(d.url)}">${ornaments()}
              <span class="file__icon">${d.kind === 'apk' ? I.phone : I.box}</span>
              <span><span class="file__name">${esc(pick(d.label))}</span><span class="file__meta">${esc(d.url.split('/').pop())}　${esc(d.size)}</span></span>
              ${I.download}
            </a>`).join('')}</div>
          ${g.install ? `<ol class="steps">${g.install.map((st) => `<li class="frame">${ornaments()}${esc(pick(st))}</li>`).join('')}</ol>` : ''}
          ${g.installNote ? `<p class="note">${esc(pick(g.installNote))}</p>` : ''}
          ${(g.downloads || []).some((d) => d.sha256) ? `<details class="sums"><summary>${esc(t('game.sums'))}</summary><dl>${g.downloads.filter((d) => d.sha256).map((d) => `<div><dt>${esc(d.url.split('/').pop())}</dt><dd>${esc(d.sha256)}</dd></div>`).join('')}</dl></details>` : ''}
        </div></section>

        ${g.changelog ? `
        <section class="section" id="log"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.log'))}</h2></div>
          <ol class="log">${g.changelog.map((c) => `<li><span class="log__ver">V${esc(c.version)}</span><span class="log__date">${esc(fmtDate(c.date))}</span><p class="log__text">${c.title ? `<strong>${esc(pick(c.title))}</strong>　` : ''}${esc(pick(c))}</p></li>`).join('')}</ol>
        </div></section>` : ''}

        <section class="section" id="more"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.more'))}</h2><a class="head__link" href="index.html#games">${esc(t('hero.browse'))}${I.go}</a></div>
          <div class="cards">${others.slice(0, 2).map((x) => gameCard(x)).join('')}${emptyCard(null)}</div>
        </div></section>

        <dialog class="lightbox" data-lightbox><img data-lightbox-img alt=""><button class="lightbox__close" type="button" data-close aria-label="${esc(t('game.close'))}">${I.close}</button></dialog>`;
      bindGallery();
      initAsh($('.ghero .hero__ash'));
    }

    function bindGallery() {
      const s = g.shots || [];
      if (!s.length) return;
      const img = $('[data-viewer-img]'); const cap = $('[data-viewer-cap]'); const dlg = $('[data-lightbox]');
      const show = (i) => {
        shot = (i + s.length) % s.length;
        img.src = s[shot].src; img.alt = pick(s[shot]); cap.textContent = pick(s[shot]);
        $$('[data-shot]').forEach((b) => b.setAttribute('aria-current', String(Number(b.dataset.shot) === shot)));
        if (dlg.open) $('[data-lightbox-img]').src = s[shot].src;
      };
      shot = 0;
      $$('[data-step]').forEach((b) => b.addEventListener('click', () => show(shot + Number(b.dataset.step))));
      $$('[data-shot]').forEach((b) => b.addEventListener('click', () => show(Number(b.dataset.shot))));
      $('[data-zoom]').addEventListener('click', () => { $('[data-lightbox-img]').src = s[shot].src; dlg.showModal(); });
      $('[data-close]').addEventListener('click', () => dlg.close());
      dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') show(shot + (e.key === 'ArrowRight' ? 1 : -1)); });
    }

    initChrome(render);
    applyStatic();
    render();
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) requestAnimationFrame(() => el.scrollIntoView()); }
  }

  if (page === 'home') initHome();
  else if (page === 'game') initGame();
})();
