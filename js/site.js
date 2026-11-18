/* Sole Verge 孤独的边界 — 页面逻辑（首页 + 游戏页） */
(() => {
  'use strict';
  const DATA = window.SAVE_ROOM;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const page = document.body.dataset.page;

  /* ---------- Language ---------- */
  const STRINGS = {
    'nav.home': ['首页', 'Home'],
    'nav.games': ['游戏', 'Games'],
    'nav.news': ['动态', 'News'],
    'nav.about': ['关于', 'About'],
    'nav.cta': ['下载最新作', 'Get the latest'],
    'logo.sub': ['孤独的边界', '孤独的边界'],
    'hero.title': ['在孤独的边界，<br>做好玩的游戏', 'Games made alone,<br>free for everyone'],
    'hero.sub': ['恐怖、悬疑、生存、丧尸、休闲……一个人开发，全部免费下载。', 'Horror, mystery, survival, zombies and lighter fare. Made by one person, free to download.'],
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

  /* ---------- Icons (line, 24px grid) ---------- */
  const svg = (d, extra = '') => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const I = {
    download: svg('<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>'),
    arrow: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
    left: svg('<path d="m15 5-7 7 7 7"/>'),
    right: svg('<path d="m9 5 7 7-7 7"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    code: svg('<path d="m8 7-5 5 5 5"/><path d="m16 7 5 5-5 5"/><path d="m13.5 4-3 16"/>'),
    screen: svg('<rect x="3" y="6" width="18" height="13" rx="3"/><path d="m8 3 2.5 3M16 3l-2.5 3"/><path d="M9 12v2M15 12v2"/>'),
    note: svg('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
    gift: svg('<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8"/><path d="M12 8v13"/><path d="M12 8c-2-4-6-4-6-1.5S10 8 12 8zM12 8c2-4 6-4 6-1.5S14 8 12 8z"/>'),
    pad: svg('<path d="M6 8h12a4 4 0 0 1 3.9 4.8l-.9 4.4a2.5 2.5 0 0 1-4.3 1.2L14.5 16h-5l-2.2 2.4A2.5 2.5 0 0 1 3 17.2l-.9-4.4A4 4 0 0 1 6 8z"/><path d="M8 11v3M6.5 12.5h3"/><circle cx="15.5" cy="12" r=".6" fill="currentColor"/><circle cx="17.5" cy="13.5" r=".6" fill="currentColor"/>'),
    refresh: svg('<path d="M20 11a8 8 0 0 0-14.6-4.4L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.6 4.4L20 16"/><path d="M20 20v-4h-4"/>'),
    box: svg('<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>'),
    file: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),
    phone: svg('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>'),
  };

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
  const apkOf = (g) => (g.downloads || []).find((d) => d.kind === 'apk') || (g.downloads || [])[0];
  const chips = (g) => g.genres.map((id) => genreById[id]).filter(Boolean)
    .map((ge) => `<span class="chip" style="--c:${ge.color}">${esc(pick(ge))}</span>`).join('');
  const avatar = (cls = '', size = 160) => `<img class="${cls}" src="${esc(owner.avatar)}" alt="${esc(ownerName)}" width="${size}" height="${size}" onerror="this.onerror=null;this.src='${esc(owner.avatarFallback)}'">`;

  let swooshId = 0;
  function swoosh(color) {
    const id = `sw${++swooshId}`;
    return `<svg class="card__swoosh" viewBox="0 0 400 64" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="${id}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="${color}" stop-opacity="0"/><stop offset=".55" stop-color="${color}" stop-opacity=".85"/><stop offset="1" stop-color="#ffffff" stop-opacity=".9"/>
      </linearGradient></defs>
      <path d="M-10 66 C 110 62, 250 46, 410 6" stroke="url(#${id})" stroke-width="12" fill="none" opacity=".12" vector-effect="non-scaling-stroke"/>
      <path d="M-10 66 C 110 62, 250 46, 410 6" stroke="url(#${id})" stroke-width="1.6" fill="none" vector-effect="non-scaling-stroke"/>
      <path d="M120 70 C 230 64, 320 50, 410 30" stroke="url(#${id})" stroke-width="1" fill="none" opacity=".5" vector-effect="non-scaling-stroke"/>
    </svg>`;
  }

  function gameCard(g, wide = false) {
    const isNew = latest && g.id === latest.id;
    return `<article class="card${wide ? ' card--wide' : ''}">
      <div class="card__media"><img src="${esc(g.cover)}" alt="" loading="lazy"><span class="card__no">No. ${esc(g.no || '')}</span></div>
      <div class="card__body">
        <div class="tile"><span class="sprite" style="background-image:url('${esc(g.icon)}')" aria-hidden="true"></span></div>
        <div class="card__text">
          <h3 class="card__name">${esc(pick(g.title))}${isNew ? `<span class="badge">${esc(t('badge.new'))}</span>` : ''}</h3>
          <p class="card__desc">${esc(pick(g.summary))}</p>
          <div class="chips">${chips(g)}<span class="chip" style="--c:#8a93a8">v${esc(g.version)}</span></div>
        </div>
      </div>
      <span class="card__arrow">${I.arrow}</span>
      ${swoosh(g.theme?.accent || '#2f6bff')}
      <a class="card__link" href="${esc(gameUrl(g))}" aria-label="${esc(pick(g.title))}"></a>
    </article>`;
  }

  function emptyCard(genreId) {
    const ge = genreById[genreId];
    const title = ge ? t('empty.genreTitle', { genre: pick(ge) }) : t('empty.title');
    const text = ge ? t('empty.genreText') : t('empty.text');
    const follow = socials().filter((s) => s.key !== 'github')
      .map((s) => `<a class="btn btn--line btn--sm" href="${esc(s.url)}" target="_blank" rel="noopener">${s.icon}${esc(t('links.' + s.key))}</a>`).join('');
    return `<article class="card card--empty">
      <div class="card__media"><span class="sprite" style="background-image:url('assets/site/slot-empty.webp')" aria-hidden="true"></span></div>
      <div class="card__body">
        <div class="tile"><span class="sprite" style="background-image:url('assets/site/slot-empty.webp');width:52px;height:52px" aria-hidden="true"></span></div>
        <div class="card__text">
          <h3 class="card__name">${esc(title)}<span class="badge badge--dev">${esc(t('badge.dev'))}</span></h3>
          <p class="card__desc">${esc(text)}</p>
          <div class="links-row">${follow}</div>
        </div>
      </div>
      ${swoosh(ge?.color || '#7b5cff')}
    </article>`;
  }

  /* ---------- Shared chrome ---------- */
  function applyStatic() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    for (const el of $$('[data-i18n]')) el.textContent = t(el.dataset.i18n);
    for (const el of $$('[data-i18n-html]')) el.innerHTML = t(el.dataset.i18nHtml);
    const toggle = $('[data-lang]');
    if (toggle) { toggle.textContent = lang === 'zh' ? 'EN' : '中文'; toggle.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文'); }
    for (const a of $$('[data-cta]')) a.href = latest ? gameUrl(latest, '#download') : 'index.html#games';
    const gh = $('[data-github]'); if (gh) gh.href = owner.links.github;
    const bl = $('[data-bilibili]'); if (bl) bl.href = socials()[1].url;
    renderFooter();
  }

  function renderFooter() {
    const f = $('[data-footer]');
    if (!f) return;
    const home = page === 'home' ? '' : 'index.html';
    f.innerHTML = `
      <div class="shell footer__grid">
        <div class="footer__brand">
          <a class="logo" href="${home || '#top'}"><img src="assets/site/logo.webp" alt="" width="46" height="46"><span><span class="logo__name">Sole Verge</span><span class="logo__sub">${esc(t('logo.sub'))}</span></span></a>
          <p>${esc(t('footer.blurb'))}</p>
        </div>
        <div><h4>${esc(t('footer.site'))}</h4><ul>
          <li><a href="${home}#top">${esc(t('nav.home'))}</a></li>
          <li><a href="${home}#games">${esc(t('nav.games'))}</a></li>
          <li><a href="${home}#news">${esc(t('nav.news'))}</a></li>
          <li><a href="${home}#about">${esc(t('nav.about'))}</a></li></ul></div>
        <div><h4>${esc(t('footer.games'))}</h4><ul>
          ${byDate.map((g) => `<li><a href="${esc(gameUrl(g))}">${esc(pick(g.title))}</a></li>`).join('')}</ul></div>
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
  }

  /* ================= Home ================= */
  function initHome() {
    let filter = 'all';

    function renderHero() {
      const apk = latest && apkOf(latest);
      const dl = $('[data-hero-download]');
      if (dl) dl.href = apk ? apk.url : '#games';
      const line = $('[data-hero-latest]');
      if (line && latest) {
        line.innerHTML = `<i aria-hidden="true"></i><span>${esc(t('hero.latest'))}<a href="${esc(gameUrl(latest))}">${esc(pick(latest.title))} v${esc(latest.version)}</a>　${esc(pick(latest.platform))}　${esc(latest.size)}</span>`;
      }
    }

    function renderGames() {
      const tabs = $('[data-tabs]');
      const all = [{ id: 'all', label: t('genre.all'), n: DATA.games.length }]
        .concat(DATA.genres.map((g) => ({ id: g.id, label: pick(g), n: DATA.games.filter((x) => x.genres.includes(g.id)).length })));
      tabs.innerHTML = all.map((g) => `<button class="tab" type="button" data-genre="${g.id}" aria-pressed="${filter === g.id}">${esc(g.label)}<span class="tab__n">${g.n}</span></button>`).join('');
      $$('[data-genre]', tabs).forEach((b) => b.addEventListener('click', () => { filter = b.dataset.genre; renderGames(); }));
      const list = byDate.filter((g) => filter === 'all' || g.genres.includes(filter));
      const html = list.map((g, i) => gameCard(g, i === 0 && list.length % 3 !== 0));
      html.push(emptyCard(filter === 'all' ? null : filter));
      $('[data-cards]').innerHTML = html.join('');
    }

    function renderSpot() {
      const box = $('[data-spot]');
      if (!latest) { box.closest('section').hidden = true; return; }
      const g = latest; const apk = apkOf(g);
      box.style.setProperty('--g-accent', g.theme?.accent || '#d93347');
      box.innerHTML = `
        <a class="spot__media" href="${esc(gameUrl(g))}"><img src="${esc(g.shots?.[0]?.src || g.cover)}" alt="${esc(pick(g.title))}" loading="lazy"></a>
        <div>
          <p class="spot__no">No. ${esc(g.no || '')}　v${esc(g.version)}　${esc(fmtDate(g.updated))}</p>
          <h3 class="spot__title">${esc(pick(g.title))}</h3>
          <p class="spot__en">${esc(g.title.en)}</p>
          <p class="spot__tag">${esc(pick(g.summary))}</p>
          ${g.highlights ? `<div class="stats">${g.highlights.map((h) => `<div class="stat"><b>${esc(h.value)}</b><span>${esc(pick(h))}</span></div>`).join('')}</div>` : '<div style="height:32px"></div>'}
          <div class="spot__actions">
            ${apk ? `<a class="btn btn--light" href="${esc(apk.url)}">${I.download}${esc(t('spot.download', { ver: g.version }))}</a>` : ''}
            <a class="btn btn--line" href="${esc(gameUrl(g))}">${esc(t('spot.details'))}</a>
          </div>
        </div>`;
    }

    function renderNews() {
      const items = DATA.games.flatMap((g) => (g.changelog || []).map((c) => ({ g, c })))
        .sort((a, b) => b.c.date.localeCompare(a.c.date) || b.c.version.localeCompare(a.c.version, undefined, { numeric: true }))
        .slice(0, 3);
      $('[data-news]').innerHTML = items.map(({ g, c }) => `
        <a class="post" href="${esc(gameUrl(g, '#log'))}">
          <img src="${esc(c.image || g.cover)}" alt="" loading="lazy">
          <div class="post__body">
            <p class="post__meta"><span>${esc(pick(g.title))}　v${esc(c.version)}</span><span>${esc(fmtDate(c.date))}</span></p>
            <h3 class="post__title">${esc(pick(c.title) || 'v' + c.version)}</h3>
            <p class="post__text">${esc(pick(c))}</p>
          </div>
        </a>`).join('');
      const all = $('[data-news-all]');
      if (all && latest) all.href = gameUrl(latest, '#log');
    }

    function renderStudio() {
      $('[data-studio]').innerHTML = `
        <div class="studio__who">${avatar('', 84)}<div><h3 class="studio__name">${esc(ownerName)}</h3><p class="studio__handle">Sole Verge　@${esc(owner.handle)}</p></div></div>
        <p class="studio__text">${esc(t('studio.text'))}</p>
        <div class="studio__links">${socials().map((s) => `<a class="btn btn--line" href="${esc(s.url)}" target="_blank" rel="noopener">${s.icon}${esc(t('links.' + s.key))}</a>`).join('')}</div>`;
    }

    function render() { renderHero(); renderGames(); renderSpot(); renderNews(); renderStudio(); }

    // Highlight the menu entry for the section in view
    const links = $$('.menu a[href^="#"]');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'games', 'news', 'about'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });

    initChrome(render);
    applyStatic();
    render();
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
      const body = document.body;
      body.style.setProperty('--g-accent', g.theme?.accent || '#d93347');
      body.style.setProperty('--g-glow', g.theme?.glow || '#2f6bff');
      const apk = apkOf(g);
      const s = g.shots || [];
      const others = byDate.filter((x) => x.id !== g.id);
      main.innerHTML = `
        <section class="ghero">
          <div class="ghero__art"><img src="${esc(g.cover)}" alt="" fetchpriority="high"></div>
          <div class="shell ghero__content">
            <nav class="crumbs" aria-label="breadcrumb"><a href="index.html#games">${esc(t('game.crumb'))}</a><span aria-hidden="true">/</span><span>${esc(pick(g.title))}</span></nav>
            <p class="eyebrow">No. ${esc(g.no || '')}　${esc(g.title.en)}</p>
            <h1 class="ghero__title">${esc(pick(g.title))}</h1>
            <p class="ghero__tag">${esc(pick(g.tagline))}</p>
            <div class="chips" style="margin-top:18px">${chips(g)}</div>
            <div class="ghero__actions">
              ${apk ? `<a class="btn btn--light" href="${esc(apk.url)}">${I.download}${esc(pick(apk.label))}<span class="btn__meta">${esc(apk.size)}</span></a>` : ''}
              <a class="btn btn--line" href="#download">${I.code}${esc(lang === 'zh' ? '源码与安装说明' : 'Source and install guide')}</a>
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
          ${apk ? `<a class="btn btn--game" href="${esc(apk.url)}">${I.download}v${esc(g.version)}</a>` : ''}
        </div></div>

        ${s.length ? `
        <section class="section" id="shots"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.shots'))}</h2></div>
          <div class="viewer">
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
            <div class="modes">${(g.modes || []).map((m) => `<article class="mode">${m.image ? `<img src="${esc(m.image)}" alt="" loading="lazy">` : ''}<h3>${esc(pick(m.name))}</h3><p>${esc(pick(m.text))}</p></article>`).join('')}</div>
          </div>
        </div></section>

        ${g.video ? `
        <section class="section" id="clip"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.clip'))}</h2></div>
          <div class="clip"><video src="${esc(g.video.src)}" poster="${esc(g.video.poster || '')}" controls muted playsinline preload="none"></video></div>
          <p class="clip__cap">${esc(pick(g.video.caption))}</p>
        </div></section>` : ''}

        <section class="section" id="download"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.download'))}</h2></div>
          <div class="files">${(g.downloads || []).map((d) => `
            <a class="file" href="${esc(d.url)}">
              <span class="file__icon">${d.kind === 'apk' ? I.phone : I.box}</span>
              <span><span class="file__name">${esc(pick(d.label))}</span><span class="file__meta" style="display:block">${esc(d.url.split('/').pop())}　${esc(d.size)}</span></span>
              ${I.download}
            </a>`).join('')}</div>
          ${g.install ? `<ol class="steps">${g.install.map((st) => `<li>${esc(pick(st))}</li>`).join('')}</ol>` : ''}
          ${g.installNote ? `<p class="note">${esc(pick(g.installNote))}</p>` : ''}
          ${(g.downloads || []).some((d) => d.sha256) ? `<details class="sums"><summary>${esc(t('game.sums'))}</summary><dl>${g.downloads.filter((d) => d.sha256).map((d) => `<div><dt>${esc(d.url.split('/').pop())}</dt><dd>${esc(d.sha256)}</dd></div>`).join('')}</dl></details>` : ''}
        </div></section>

        ${g.changelog ? `
        <section class="section" id="log"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.log'))}</h2></div>
          <ol class="log">${g.changelog.map((c) => `<li><span class="log__ver">v${esc(c.version)}</span><span class="log__date">${esc(fmtDate(c.date))}</span><p class="log__text"><strong style="color:#fff">${esc(pick(c.title) || '')}</strong>${c.title ? '　' : ''}${esc(pick(c))}</p></li>`).join('')}</ol>
        </div></section>` : ''}

        <section class="section" id="more"><div class="shell">
          <div class="head"><h2 class="head__title">${esc(t('game.more'))}</h2><a class="head__link" href="index.html#games">${esc(t('hero.browse'))}${I.arrow}</a></div>
          <div class="cards">${others.slice(0, 2).map((x) => gameCard(x)).join('')}${emptyCard(null)}</div>
        </div></section>

        <dialog class="lightbox" data-lightbox><img data-lightbox-img alt=""><button class="lightbox__close" type="button" data-close aria-label="${esc(t('game.close'))}">${I.close}</button></dialog>`;
      bindGallery();
    }

    function bindGallery() {
      const s = g.shots || [];
      if (!s.length) return;
      const img = $('[data-viewer-img]');
      const cap = $('[data-viewer-cap]');
      const dlg = $('[data-lightbox]');
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
