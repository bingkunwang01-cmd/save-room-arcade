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
    'nav.feedback': ['建议', 'Feedback'],
    'fb.title': ['提建议', 'Send feedback'],
    'fb.lead': ['卡关了、发现了 bug、想玩什么样的新游戏，都可以写给我。每一条我都会认真看。', 'Stuck somewhere, found a bug, or want a certain kind of game? Write to me. I read every message.'],
    'fb.type': ['类型', 'Type'],
    'fb.t.idea': ['建议', 'Idea'],
    'fb.t.bug': ['Bug', 'Bug'],
    'fb.t.wish': ['想玩的游戏', 'Game wish'],
    'fb.t.other': ['其他', 'Other'],
    'fb.game': ['关于哪款游戏', 'Which game'],
    'fb.game.none': ['不限', 'Not about a game'],
    'fb.msg': ['想说的话', 'Your message'],
    'fb.msg.ph': ['比如：第二层的门打不开，我的手机型号是……', "e.g. the door on floor 2 won't open, my phone is…"],
    'fb.contact': ['怎么回复你（可选）', 'How to reply (optional)'],
    'fb.contact.ph': ['邮箱、B 站 ID 或 QQ', 'Email, Bilibili ID or QQ'],
    'fb.mail': ['写邮件发送', 'Send by email'],
    'fb.issue': ['在 GitHub 提交', 'Post on GitHub'],
    'fb.empty': ['先写点内容再发送吧。', 'Write something first.'],
    'fb.sent.mail': ['已经打开你的邮件程序，确认后点发送就好。', 'Your email app is open. Press send there.'],
    'fb.sent.issue': ['已在新标签页打开 GitHub，登录后点 Submit 就好。', 'GitHub is open in a new tab. Sign in and press Submit.'],
    'fb.direct': ['直接写信', 'Email me directly'],
    'fb.elsewhere': ['也可以在这里找我', 'Or find me here'],
    'fb.subject': ['[孤独的边界] ', '[Sole Verge] '],
    'fb.from': ['回复方式', 'Reply to'],
    'nav.cta': ['下载最新作', 'Get the latest'],
    'logo.sub': ['孤独的边界', '孤独的边界'],
    'mega.all': ['全部游戏', 'All games'],
    'mega.allText': ['一个人做的游戏都在这里，全部免费。按类型挑一款吧。', 'Every game I have made, all free. Pick a genre.'],
    'mega.latest': ['最新', 'Latest'],
    'hero.title': ['欢迎来到<br>孤独的边界', 'Welcome to<br>Sole Verge'],
    'hero.sub': ['一个人做的<wbr>恐怖、<wbr>悬疑与<wbr>生存游戏，<wbr>全部免费下载。<br>雾很大，<wbr>记得带上灯。', 'Horror, mystery and survival games made by one person, free to download.<br>The fog is thick. Bring a lantern.'],
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
    'links.x': ['X', 'X'],
    'footer.blurb': ['孤独的边界的独立游戏。一个人开发，全部免费。', 'Independent games by 孤独的边界. Made solo, always free.'],
    'footer.site': ['网站', 'Site'],
    'footer.games': ['游戏', 'Games'],
    'footer.follow': ['关注', 'Follow'],
    'footer.made': ['用 Godot 和 Blender 制作', 'Made with Godot and Blender'],
    'footer.credit': ['网站由孤独的边界和 Claude 一起制作', 'Site made by 孤独的边界 and Claude, together'],
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
    x: '<path d="M4 4l16 16M20 4 4 20" opacity="0"/><path d="M4.5 4h4.2l10.8 16h-4.2z"/><path d="M19.5 4 13.4 11M10.6 13 4.5 20"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
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
    ...(owner.links.x ? [{ key: 'x', icon: I.x, url: owner.links.x }] : []),
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
  // Liquid filter for the avatar rim and the logo: blur + alpha threshold fuses blobs, a faint sheen keeps it wet without looking like plastic
  function injectBloodFilter() {
    if ($('#sv-liquid-defs')) return;
    const defs = document.createElement('div');
    defs.id = 'sv-liquid-defs';
    defs.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
      <filter id="sv-liquid-sm" x="-30%" y="-30%" width="160%" height="170%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="b"/>
        <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" result="goo"/>
        <feGaussianBlur in="goo" stdDeviation=".8" result="h"/>
        <feSpecularLighting in="h" surfaceScale="1.6" specularConstant=".55" specularExponent="42" lighting-color="#ffd9d9" result="sp"><feDistantLight azimuth="235" elevation="52"/></feSpecularLighting>
        <feComposite in="sp" in2="goo" operator="in" result="spi"/>
        <feComposite in="goo" in2="spi" operator="arithmetic" k1="0" k2=".92" k3=".55" k4="0"/>
      </filter>
    </svg>`;
    document.body.appendChild(defs);
  }

  // Buttons: a thin, translucent film of dark blood rises on hover, its surface rolling gently with a wet edge
  function bloodButtons(root = document) {
    for (const btn of $$('.btn', root)) {
      if (btn.dataset.blood) continue;
      btn.dataset.blood = '1';
      btn.addEventListener('pointerenter', () => build(btn), { once: true });
      btn.addEventListener('focus', () => build(btn), { once: true });
    }
    function build(btn) {
      if (btn.querySelector('.bleed')) return;
      const w = btn.offsetWidth, h = btn.offsetHeight, id = 'bl' + Math.random().toString(36).slice(2, 8);
      const len = Math.max(90, Math.round(w / 1.5)), len2 = Math.round(len * 1.35);
      const surf = (amp, L, y0) => { let d = `M0 ${y0}`; for (let x = 0; x < w * 2 + L * 2; x += L) d += ` q ${L / 4} ${-amp} ${L / 2} 0 t ${L / 2} 0`; return d; };
      const body = (amp, L, y0) => `${surf(amp, L, y0)} V ${h + 40} H 0 Z`;
      const el = document.createElement('span');
      el.className = 'bleed';
      el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0"/><stop offset=".3"/><stop offset="1"/></linearGradient></defs>
        <g class="bleed__rise" style="--h:${h + 12}px">
          <g class="bleed__wave bleed__wave--back" style="--len:${len2}px"><path class="bleed__under" d="${body(1.2, len2, 5)}"/></g>
          <g class="bleed__wave" style="--len:${len}px"><path class="bleed__body" d="${body(1.5, len, 6.5)}" fill="url(#${id})"/><path class="bleed__lip" d="${surf(1.5, len, 7.6)}"/><path class="bleed__shine" d="${surf(1.5, len, 6.2)}"/></g>
        </g></svg>`;
      btn.prepend(el);
      requestAnimationFrame(() => btn.classList.add('has-bleed'));
    }
  }

  // Avatar with a blood-soaked rim that keeps dripping
  function bloodFrame(size = 96) {
    const cx = 60, cy = 56, r = 48;
    const drips = [[34, 20, 7.5, 0], [58, 44, 9, 2.4], [84, 30, 8, 1.1], [104, 52, 10.5, 3.6], [128, 26, 6.5, 5.2], [150, 14, 8, 6.4], [70, 34, 7, 4.4]];
    const parts = drips.map(([deg, len, dur, delay], k) => {
      const a = (deg * Math.PI) / 180;
      const x = (cx + r * Math.cos(a)).toFixed(1), y = (cy + r * Math.sin(a)).toFixed(1);
      return `<g class="drip" style="--l:${len}px;--d:${dur}s;--w:${delay}s">
        <path d="M${x} ${y} v${len}" pathLength="100" stroke-width="${k % 2 ? 4 : 5}"/>
        <circle class="drip__bulb" cx="${x}" cy="${y}" r="${k % 2 ? 3.6 : 4.4}"/>
        <circle class="drip__drop" cx="${x}" cy="${y}" r="3.2"/>
      </g>`;
    }).join('');
    const pool = Array.from({ length: 14 }, (_, i) => {
      const a = Math.PI + (i / 13) * Math.PI; const rr = r + (i % 3) - 1;
      return `<circle cx="${(cx + rr * Math.cos(a)).toFixed(1)}" cy="${(cy + rr * Math.sin(a)).toFixed(1)}" r="${(4 + (i * 7) % 4).toFixed(1)}"/>`;
    }).join('');
    return `<span class="bframe" style="--s:${size}px">${avatar(size)}
      <svg class="bframe__svg" viewBox="0 0 120 170" aria-hidden="true"><g filter="url(#sv-liquid-sm)" class="bframe__liquid">
        <circle class="bframe__ring" cx="${cx}" cy="${cy}" r="${r}"/>
        <g class="bframe__pool">${pool}</g>
        ${parts}
      </g></svg></span>`;
  }
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
        <a href="${homeUrl('#top')}">${esc(t('nav.home'))}</a><a href="${homeUrl('#games')}">${esc(t('nav.games'))}</a><a href="${homeUrl('#news')}">${esc(t('nav.news'))}</a><a href="${homeUrl('#about')}">${esc(t('nav.about'))}</a><a href="${homeUrl('#feedback')}">${esc(t('nav.feedback'))}</a>
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

  // Anchors measured in the hero render (fractions of the 2560x1440 frame): lantern flame, logo, the lit pool on the ground and the spotlight above frame
  const HERO = { flame: [0.866, 0.485], logo: [0.70, 0.49], ground: [0.70, 0.67], key: [0.80, -2.41], poolW: 0.25,
    // ends of the blood runs on the S and V: [u, v, length of the run in metres, v of the ground below]
    drips: [[0.7045, 0.4525, 0.45, 0.700], [0.5615, 0.4621, 0.43, 0.664], [0.8237, 0.4016, 0.28, 0.688], [0.5709, 0.3935, 0.21, 0.664], [0.8277, 0.3829, 0.21, 0.688], [0.6169, 0.4091, 0.14, 0.668], [0.6073, 0.3713, 0.14, 0.666], [0.5753, 0.3733, 0.14, 0.664]] };
  // Live screen positions shared by the glow, fog, beam and ash
  const scene = { on: false, lamp: { x: -1, y: -1 }, apex: { x: 0, y: 0 }, pool: { x: 0, y: 0 }, logo: { x: 0, y: 0 }, poolW: 0, flick: 1, flash: 0, scale: 1, drips: [] };
  function mapHero() {
    const img = $('.hero__art img'), hero = $('.hero');
    if (!img || !hero) return;
    const IW = 2560, IH = 1440, cw = img.clientWidth, ch = img.clientHeight;
    const s = Math.max(cw / IW, ch / IH);
    const pos = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
    const ox = (cw - IW * s) * (Number.isFinite(pos[0]) ? pos[0] : 0.5), oy = (ch - IH * s) * (Number.isFinite(pos[1]) ? pos[1] : 0.5);
    const at = ([u, v]) => ({ x: ox + u * IW * s, y: oy + v * IH * s });
    scene.on = true; scene.lamp = at(HERO.flame); scene.apex = at(HERO.key); scene.pool = at(HERO.ground); scene.poolW = HERO.poolW * IW * s; scene.scale = s;
    const logo = at(HERO.logo); scene.logo = logo;
    scene.drips = HERO.drips.map(([u, v, len, fv]) => { const p = at([u, v]); return { x: p.x, y0: p.y, len, floor: at([u, fv]).y }; });
    hero.style.setProperty('--lx', `${((logo.x / hero.clientWidth) * 100).toFixed(1)}%`);
    hero.style.setProperty('--ly', `${((logo.y / hero.clientHeight) * 100).toFixed(1)}%`);
    const lamp = $('[data-lamp]');
    if (lamp) { lamp.style.left = `${scene.lamp.x}px`; lamp.style.top = `${scene.lamp.y}px`; lamp.style.transform = `scale(${Math.max(0.5, s * 1.4)})`; }
    document.dispatchEvent(new Event('hero:mapped'));
  }
  // How much of the spotlight shaft covers a point (0..1), same cone the fog shader draws
  function inBeam(x, y) {
    if (!scene.on) return 0;
    const ax = scene.pool.x - scene.apex.x, ay = scene.pool.y - scene.apex.y, L2 = ax * ax + ay * ay;
    const rx = x - scene.apex.x, ry = y - scene.apex.y;
    const t = (rx * ax + ry * ay) / L2;
    if (t <= 0 || t > 1.12) return 0;
    const lat = Math.abs(rx * ay - ry * ax) / Math.sqrt(L2), wv = t * scene.poolW;
    const m = 1 - Math.min(1, Math.max(0, (lat - wv * 0.5) / (wv * 0.5)));
    return m * (t > 1 ? 1 - (t - 1) / 0.12 : 1);
  }
  // An old lamp: steady most of the time, then a short stutter every few seconds
  function initFlicker(hero) {
    if (quiet) return;
    let next = performance.now() + 4000, seq = [];
    const tick = (now) => {
      if (now > next && !seq.length) {
        seq = Array.from({ length: 4 + (Math.random() * 6 | 0) }, () => [0.35 + Math.random() * 0.55, 40 + Math.random() * 110]);
        next = now + 6000 + Math.random() * 9000;
      }
      if (seq.length) {
        const [v, d] = seq[0]; scene.flick = v; seq[0][1] = d - 16;
        if (seq[0][1] <= 0) seq.shift();
        if (!seq.length) scene.flick = 1;
      }
      hero.style.setProperty('--flick', scene.flick.toFixed(3));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Rain in three depths (streaks light up inside the spotlight), splashes on the wet ground, a little dust in the beam,
  // and on the home page blood that gathers at the ends of the SV's drips and falls into the pool
  function initWeather(canvas, opts = {}) {
    if (!canvas || quiet) return;
    const ctx = canvas.getContext('2d');
    const withDrops = !!opts.drops, density = opts.density ?? 1;
    let w = 0, h = 0, rain = [], motes = [], splashes = [], drops = [], raf = 0, visible = true, t = 0, last = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const L = [{ n: 260, len: [7, 13], v: [9, 13], a: [0.05, 0.13], wd: 0.7 }, { n: 110, len: [16, 28], v: [15, 20], a: [0.07, 0.17], wd: 1 }, { n: 14, len: [46, 80], v: [26, 34], a: [0.05, 0.1], wd: 2.2 }];
    const rnd = (m) => m[0] + Math.random() * (m[1] - m[0]);
    const slant = 0.16;
    const makeRain = (layer, top) => { const c = L[layer]; return { layer, x: Math.random() * (w + 200) - 100, y: top ? -Math.random() * 120 : Math.random() * h, len: rnd(c.len), v: rnd(c.v), a: rnd(c.a) }; };
    const makeMote = () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.6 + Math.random() * 1.2, ph: Math.random() * 6.28, sp: 0.004 + Math.random() * 0.01 });
    const groundTop = () => (scene.on ? scene.pool.y - (scene.pool.y - scene.logo.y) * 0.35 : h * 0.62);
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const k = Math.max(0.3, Math.min(1.3, (w * h) / 1300000)) * density;
      rain = [].concat(...L.map((c, i) => Array.from({ length: Math.round(c.n * k) }, () => makeRain(i))));
      motes = Array.from({ length: Math.round(46 * k) }, makeMote);
      if (withDrops) drops = (scene.drips || []).map((p, i) => ({ ...p, phase: 'grow', g: Math.random() * 0.6, wait: 400 + i * 380 + Math.random() * 2400, y: 0, vy: 0 }));
    };
    const step = (now) => {
      raf = 0; const dt = Math.min(50, now - last); last = now; t += dt / 16.7;
      ctx.clearRect(0, 0, w, h);
      const flash = scene.flash || 0, fl = scene.flick;
      // rain
      ctx.lineCap = 'round';
      for (const r of rain) {
        r.y += r.v * dt / 16.7; r.x += r.v * slant * dt / 16.7;
        if (r.y > h + 20) { Object.assign(r, makeRain(r.layer, true)); continue; }
        const lit = inBeam(r.x, r.y) * fl;
        let warm = 0;
        if (scene.lamp.x > 0) { const dx = r.x - scene.lamp.x, dy = r.y - scene.lamp.y; warm = Math.max(0, 1 - Math.hypot(dx, dy) / 160); }
        const a = Math.min(0.85, r.a * (1 + 4.2 * lit + 2.5 * warm + 5 * flash));
        const c = 150 + 95 * Math.min(1, lit + flash);
        ctx.strokeStyle = `rgba(${c + 40 * warm | 0},${c + 8 | 0},${c + 18 - 60 * warm | 0},${a.toFixed(3)})`;
        ctx.lineWidth = L[r.layer].wd;
        ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x - r.len * slant, r.y - r.len); ctx.stroke();
      }
      // splashes on the ground, mostly where the light falls
      const gy = groundTop();
      const spawn = (w / 1440) * 1.6 * density * dt / 16.7;
      for (let i = 0; i < spawn + (Math.random() < spawn % 1 ? 1 : 0); i++) {
        const y = gy + Math.random() ** 0.7 * (h - gy);
        splashes.push({ x: Math.random() * w, y, age: 0, s: 0.5 + (y - gy) / Math.max(1, h - gy) });
      }
      for (const s of splashes) {
        s.age += dt;
        const k = s.age / 360, lit = Math.max(inBeam(s.x, s.y - 4), 0.15) * fl + flash;
        const a = (1 - k) * Math.min(0.75, 0.12 + 0.6 * lit);
        if (a <= 0) continue;
        ctx.strokeStyle = `rgba(210,218,228,${a.toFixed(3)})`; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.ellipse(s.x, s.y, 1 + k * 7 * s.s, (1 + k * 7 * s.s) * 0.28, 0, 0, 6.283); ctx.stroke();
        if (k < 0.5) { ctx.fillStyle = `rgba(220,226,234,${(a * 0.9).toFixed(3)})`; ctx.fillRect(s.x - 2 * k * s.s * 6, s.y - 9 * s.s * k * (1 - k) * 4, 1.2, 1.2); ctx.fillRect(s.x + 2 * k * s.s * 6, s.y - 7 * s.s * k * (1 - k) * 4, 1.2, 1.2); }
      }
      splashes = splashes.filter((s) => s.age < 360);
      // dust that only shows in the light
      for (const m of motes) {
        m.ph += m.sp * dt / 16.7; m.x += Math.sin(m.ph) * 0.15 + 0.05; m.y += Math.cos(m.ph * 0.7) * 0.1 + 0.03;
        if (m.x > w + 5) m.x = -5; if (m.y > h + 5) m.y = -5;
        const lit = inBeam(m.x, m.y) * fl;
        if (lit < 0.05) continue;
        ctx.fillStyle = `rgba(226,232,240,${(0.5 * lit).toFixed(3)})`; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill();
      }
      // blood: a bead swells at the end of a drip, lets go, falls and splashes
      if (withDrops && scene.on) {
        const sc = scene.scale;
        for (const d of drops) {
          if (d.wait > 0) { d.wait -= dt; continue; }
          const x = d.x, r0 = Math.max(1.8, 6.4 * sc);
          if (d.phase === 'grow') {
            d.g += dt / (2200 + d.len * 2600);
            const r = r0 * (0.35 + 0.65 * Math.min(1, d.g));
            drawDrop(x, d.y0 + r * 0.9 * Math.min(1, d.g), r, Math.min(1, d.g) * 0.4);
            if (d.g >= 1) { d.phase = 'fall'; d.y = d.y0 + r0 * 0.9; d.vy = 0.4; }
          } else if (d.phase === 'fall') {
            d.vy += 0.032 * dt; d.y += d.vy * dt / 16.7;
            drawDrop(x, d.y, r0 * 0.9, Math.min(1.6, d.vy / 6));
            if (d.y >= d.floor) { d.phase = 'hit'; d.age = 0; }
          } else {
            d.age += dt; const k = d.age / 420;
            ctx.fillStyle = `rgba(70,4,8,${(0.7 * (1 - k)).toFixed(3)})`;
            ctx.beginPath(); ctx.ellipse(x, d.floor, r0 * (1 + k * 2.4), r0 * (1 + k * 2.4) * 0.3, 0, 0, 6.283); ctx.fill();
            if (k >= 1) Object.assign(d, { phase: 'grow', g: 0, wait: 1500 + Math.random() * 5200 });
          }
        }
      }
      if (visible) raf = requestAnimationFrame(step);
    };
    function drawDrop(x, y, r, stretch) {
      ctx.save(); ctx.translate(x, y); ctx.scale(1, 1 + stretch);
      const g = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r * 1.1);
      g.addColorStop(0, 'rgba(150,18,24,.95)'); g.addColorStop(0.55, 'rgba(88,6,12,.92)'); g.addColorStop(1, 'rgba(30,1,4,.9)');
      ctx.fillStyle = g; ctx.beginPath();
      ctx.moveTo(0, -r * 1.7); ctx.bezierCurveTo(r * 0.55, -r * 0.9, r, -r * 0.2, r, r * 0.25); ctx.arc(0, r * 0.25, r, 0, Math.PI); ctx.bezierCurveTo(-r, -r * 0.2, -r * 0.55, -r * 0.9, 0, -r * 1.7);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,215,215,.55)'; ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.05, Math.max(0.6, r * 0.22), 0, 6.283); ctx.fill();
      ctx.restore();
    }
    resize(); window.addEventListener('resize', resize);
    document.addEventListener('hero:mapped', resize);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(step); } }).observe(canvas);
    raf = requestAnimationFrame(step);
  }

  // Lightning: a pre-rendered "lit by lightning" pass is screen-blended over the hero, and a jagged bolt is drawn
  // through a sky mask so it stays behind the spikes and the fence. Two pulses at most, never more than twice a second.
  function initLightning(hero) {
    const art = $('.hero__art', hero), flashImg = $('.hero__flash', hero), bolt = $('.hero__bolt', hero);
    if (!art || !flashImg || !bolt || quiet) return;
    const ctx = bolt.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let path = [];
    const size = () => { bolt.width = bolt.clientWidth * dpr; bolt.height = bolt.clientHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const jag = (x0, y0, x1, y1, rough, depth, out) => {
      if (depth === 0) { out.push([x1, y1]); return; }
      const mx = (x0 + x1) / 2 + (Math.random() - 0.5) * rough, my = (y0 + y1) / 2 + (Math.random() - 0.5) * rough * 0.3;
      jag(x0, y0, mx, my, rough / 2, depth - 1, out); jag(mx, my, x1, y1, rough / 2, depth - 1, out);
    };
    const makeBolt = () => {
      const W = bolt.clientWidth, H = bolt.clientHeight;
      const x0 = W * (0.4 + Math.random() * 0.55), x1 = x0 + (Math.random() - 0.5) * W * 0.18, y1 = H * (0.36 + Math.random() * 0.12);
      const main = [[x0, -10]]; jag(x0, -10, x1, y1, W * 0.12, 7, main);
      const branches = [];
      for (let i = 0; i < 3; i++) {
        const s = main[(main.length * (0.2 + Math.random() * 0.5)) | 0], dir = Math.random() < 0.5 ? -1 : 1;
        const b = [s]; jag(s[0], s[1], s[0] + dir * W * (0.05 + Math.random() * 0.08), s[1] + H * (0.06 + Math.random() * 0.1), W * 0.05, 5, b); branches.push(b);
      }
      return [main, ...branches];
    };
    const draw = (a) => {
      ctx.clearRect(0, 0, bolt.clientWidth, bolt.clientHeight);
      if (a <= 0) return;
      path.forEach((p, i) => {
        const main = i === 0;
        for (const [wid, al, col] of [[26, 0.07, '150,175,255'], [11, 0.18, '185,205,255'], [4, 0.45, '215,228,255'], [main ? 2.4 : 1.3, 1, '246,249,255']]) {
          ctx.strokeStyle = `rgba(${col},${(al * a * (main ? 1 : 0.7)).toFixed(3)})`; ctx.lineWidth = wid * (main ? 1 : 0.6); ctx.lineJoin = 'round';
          ctx.beginPath(); p.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
        }
      });
    };
    const set = (a) => { scene.flash = a; flashImg.style.opacity = (a * 0.85).toFixed(3); hero.style.setProperty('--flash', a.toFixed(3)); draw(a); };
    const strike = () => {
      size(); path = makeBolt();
      const seq = [[0, 1], [70, 0.15], [150, 0.75], [230, 0.3]];
      seq.forEach(([at, a]) => setTimeout(() => set(a), at));
      const t0 = performance.now() + 230;
      const fade = (now) => { const k = Math.min(1, (now - t0) / 700); set(0.3 * (1 - k) ** 2); if (k < 1) requestAnimationFrame(fade); else set(0); };
      setTimeout(() => requestAnimationFrame(fade), 230);
      setTimeout(() => { art.classList.add('is-rumble'); setTimeout(() => art.classList.remove('is-rumble'), 650); }, 1100);
      setTimeout(strike, 9000 + Math.random() * 13000);
    };
    window.addEventListener('resize', size);
    setTimeout(strike, 3200);
  }

  // Light layer (screen-blended): rolling fog, the spotlight shaft with drifting dust, the lantern's warm bloom
  function initFog(canvas, strength = 1, beam = false) {
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uLamp;uniform float uK;uniform vec2 uA;uniform vec2 uG;uniform float uW;uniform float uBeam;uniform float uFlick;uniform float uFlash;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes; float asp=uRes.x/uRes.y; vec2 p=vec2(uv.x,1.-uv.y);
  vec2 q0=vec2(uv.x*asp,uv.y)*2.2; float t=uTime*.03;
  vec2 q=vec2(fbm(q0+vec2(t,0.)),fbm(q0+vec2(-t*.6,t*.25)+5.2));
  float f=fbm(q0*1.2+q*1.6+vec2(t*1.8,0.));
  float ground=smoothstep(.6,.0,uv.y);
  float band=exp(-pow((uv.y-.42)/.15,2.))*.4;
  float d=smoothstep(.32,.85,f)*(.6*ground+band+.1)*uK;
  vec3 col=mix(vec3(.5,.4,.4),vec3(.7,.62,.61),smoothstep(.3,.9,f))*d*.62;
  if(uBeam>0.){
    vec2 A=uA*vec2(asp,1.),G=uG*vec2(asp,1.),P=p*vec2(asp,1.),ax=G-A,rp=P-A;
    float L2=dot(ax,ax),tt=dot(rp,ax)/L2,lat=abs(rp.x*ax.y-rp.y*ax.x)/sqrt(L2),wv=max(tt,0.)*uW*asp;
    float m=(1.-smoothstep(wv*.5,wv,lat))*smoothstep(0.,.04,tt)*(1.-smoothstep(1.,1.1,tt));
    vec2 rq=vec2(dot(rp,normalize(vec2(-ax.y,ax.x))),dot(rp,normalize(ax)));
    float wisp=smoothstep(.42,.9,fbm(rq*vec2(9.,1.6)+vec2(t*.8,-t*3.)))*(.6+.4*fbm(P*4.+t));
    float core=1.-smoothstep(0.,wv*.85,lat);
    float b=m*(.18+wisp*1.1)*(.35+.65*core)*(.5+.5*(1.-tt))*uFlick;
    col+=vec3(.76,.84,.96)*b*.13*uBeam;
    vec2 e=(P-G)/vec2(uW*asp*1.1,uW*asp*.28);
    col+=vec3(.66,.73,.84)*exp(-dot(e,e)*1.5)*.045*uFlick*uBeam;
  }
  if(uLamp.x>0.){vec2 dl=(p-uLamp)*vec2(asp,1.);float g=exp(-dot(dl,dl)*30.);col+=vec3(1.,.52,.22)*g*(.18+.1*smoothstep(.3,.8,f));}
  col+=vec3(.7,.78,.95)*uFlash*(.16+.4*smoothstep(.25,.9,f))*(.35+.65*smoothstep(.2,.95,uv.y));
  gl_FragColor=vec4(col,1.);
}`;
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
    const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (k) => gl.getUniformLocation(prog, k);
    const u = Object.fromEntries(['uRes', 'uTime', 'uLamp', 'uK', 'uA', 'uG', 'uW', 'uBeam', 'uFlick', 'uFlash'].map((k) => [k, U(k)]));
    let raf = 0, visible = true; const t0 = performance.now();
    canvas.classList.add('is-live');
    const resize = () => { canvas.width = Math.max(2, canvas.clientWidth * 0.5 | 0); canvas.height = Math.max(2, canvas.clientHeight * 0.5 | 0); gl.viewport(0, 0, canvas.width, canvas.height); };
    const frame = () => {
      raf = 0;
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, quiet ? 40 : (performance.now() - t0) / 1000);
      gl.uniform1f(u.uK, strength);
      const on = beam && scene.on;
      gl.uniform2f(u.uLamp, on && scene.lamp.x > 0 ? scene.lamp.x / cw : -1, on ? scene.lamp.y / ch : -1);
      gl.uniform1f(u.uBeam, on ? 1 : 0);
      gl.uniform2f(u.uA, scene.apex.x / cw, scene.apex.y / ch);
      gl.uniform2f(u.uG, scene.pool.x / cw, scene.pool.y / ch);
      gl.uniform1f(u.uW, scene.poolW / cw);
      gl.uniform1f(u.uFlick, scene.flick);
      gl.uniform1f(u.uFlash, on ? scene.flash : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !quiet) raf = requestAnimationFrame(frame);
    };
    resize(); window.addEventListener('resize', () => { resize(); if (!raf) raf = requestAnimationFrame(frame); });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }).observe(canvas);
    raf = requestAnimationFrame(frame);
  }

  // Keep every hero effect pinned to the render as the image is cover-fitted
  function initHeroScene() {
    const hero = $('.hero');
    if (!hero) return;
    mapHero(); window.addEventListener('resize', mapHero);
    $('.hero__art img')?.addEventListener('load', mapHero);
    initFlicker(hero);
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
          <li><a href="${homeUrl('#about')}">${esc(t('nav.about'))}</a></li>
          <li><a href="${homeUrl('#feedback')}">${esc(t('nav.feedback'))}</a></li></ul></div>
        <div><h4>${esc(t('footer.games'))}</h4><ul>
          ${byDate.map((g) => `<li><a href="${esc(gameUrl(g))}">${esc(pick(g.title))}</a></li>`).join('')}
          ${DATA.genres.slice(0, 4).map((g) => `<li><a href="${homeUrl('#cat-' + g.id)}">${esc(pick(g))}</a></li>`).join('')}</ul></div>
        <div><h4>${esc(t('footer.follow'))}</h4><ul>
          ${socials().map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(t('links.' + s.key))}</a></li>`).join('')}</ul></div>
      </div>
      <div class="shell footer__base"><span>© ${new Date().getFullYear()} Sole Verge　${esc(ownerName)}</span><span>${esc(t('footer.made'))}　·　${esc(t('footer.credit'))}</span></div>`;
  }

  function initChrome(render) {
    injectBloodFilter();
    const rebind = () => bloodButtons();
    new MutationObserver(rebind).observe(document.body, { childList: true, subtree: true });
    rebind();
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
        <div class="studio__who">${bloodFrame(88)}<div><h3 class="studio__name">${esc(ownerName)}</h3><p class="studio__handle">Sole Verge　@${esc(owner.handle)}</p></div></div>
        <p class="studio__text">${esc(t('studio.text'))}</p>
        <div class="studio__links">${socials().map((s) => `<a class="btn btn--line" href="${esc(s.url)}" target="_blank" rel="noopener">${s.icon}${esc(t('links.' + s.key))}</a>`).join('')}</div>`;
    }

    // Feedback: compose a message, then hand it to the visitor's email app or a prefilled GitHub issue (no server needed)
    let fbState = { type: 'idea', game: '', msg: '', contact: '' };
    function renderFeedback() {
      const box = $('[data-feedback]');
      if (!box) return;
      const types = ['idea', 'bug', 'wish', 'other'];
      const mail = (owner.email || '').trim();
      box.innerHTML = `${ornaments(true)}
        <div class="feedback__intro">
          <span class="feedback__seal" aria-hidden="true">${I.mail}</span>
          <p class="feedback__lead">${esc(t('fb.lead'))}</p>
          ${mail ? `<p class="feedback__label">${esc(t('fb.direct'))}</p><a class="feedback__mail" href="mailto:${esc(mail)}">${esc(mail)}</a>` : ''}
          <p class="feedback__label">${esc(t('fb.elsewhere'))}</p>
          <div class="feedback__links">${socials().map((x) => `<a href="${esc(x.url)}" target="_blank" rel="noopener">${x.icon}<span>${esc(t('links.' + x.key))}</span></a>`).join('')}</div>
        </div>
        <form class="feedback__form" novalidate>
          <fieldset class="seg"><legend>${esc(t('fb.type'))}</legend>
            ${types.map((k) => `<label class="seg__opt"><input type="radio" name="fbtype" value="${k}"${fbState.type === k ? ' checked' : ''}><span>${esc(t('fb.t.' + k))}</span></label>`).join('')}
          </fieldset>
          <label class="field"><span>${esc(t('fb.game'))}</span>
            <select name="fbgame"><option value="">${esc(t('fb.game.none'))}</option>${byDate.map((g) => `<option value="${esc(g.id)}"${fbState.game === g.id ? ' selected' : ''}>${esc(pick(g.title))}</option>`).join('')}</select></label>
          <label class="field"><span>${esc(t('fb.msg'))}</span>
            <textarea name="fbmsg" rows="6" maxlength="3000" placeholder="${esc(t('fb.msg.ph'))}">${esc(fbState.msg)}</textarea></label>
          <label class="field"><span>${esc(t('fb.contact'))}</span>
            <input name="fbcontact" type="text" maxlength="120" autocomplete="email" placeholder="${esc(t('fb.contact.ph'))}" value="${esc(fbState.contact)}"></label>
          <div class="feedback__actions">
            ${mail ? `<button class="btn btn--light" type="submit" data-send="mail">${I.mail}${esc(t('fb.mail'))}</button>` : ''}
            <button class="btn ${mail ? 'btn--line' : 'btn--light'}" type="${mail ? 'button' : 'submit'}" data-send="issue">${I.github}${esc(t('fb.issue'))}</button>
          </div>
          <p class="feedback__status" role="status" aria-live="polite" data-fb-status></p>
        </form>`;
      const form = $('form', box), status = $('[data-fb-status]', box);
      const read = () => {
        fbState = { type: (form.querySelector('input[name="fbtype"]:checked') || {}).value || 'idea', game: form.fbgame.value, msg: form.fbmsg.value.trim(), contact: form.fbcontact.value.trim() };
        return fbState;
      };
      form.addEventListener('input', read);
      const compose = () => {
        const st = read();
        const g = DATA.games.find((x) => x.id === st.game);
        const subject = `${t('fb.subject')}${t('fb.t.' + st.type)}${g ? ' · ' + pick(g.title) : ''}`;
        const body = `${st.msg}\n\n——\n${t('fb.type')}: ${t('fb.t.' + st.type)}${g ? `\n${t('fb.game')}: ${pick(g.title)} v${g.version}` : ''}${st.contact ? `\n${t('fb.from')}: ${st.contact}` : ''}`;
        return { subject, body };
      };
      const send = (how) => {
        if (read().msg.length < 2) { status.textContent = t('fb.empty'); status.dataset.tone = 'warn'; form.fbmsg.focus(); return; }
        const { subject, body } = compose();
        if (how === 'mail') {
          location.href = `mailto:${encodeURIComponent(mail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          status.textContent = t('fb.sent.mail');
        } else {
          window.open(`https://github.com/${encodeURIComponent(owner.handle)}/save-room-arcade/issues/new?title=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank', 'noopener');
          status.textContent = t('fb.sent.issue');
        }
        status.dataset.tone = 'ok';
      };
      form.addEventListener('submit', (e) => { e.preventDefault(); send(e.submitter?.dataset.send || (mail ? 'mail' : 'issue')); });
      $$('[data-send="issue"][type="button"]', form).forEach((b) => b.addEventListener('click', () => send('issue')));
    }

    function render() { renderHero(); renderGames(); renderSpot(); renderNews(); renderStudio(); renderFeedback(); }

    const links = $$('.menu > a[href^="#"], .menu__trigger[data-target]');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle('is-active', (a.getAttribute('href') || '#' + a.dataset.target) === '#' + e.target.id));
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'games', 'news', 'about', 'feedback'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    window.addEventListener('hashchange', readHash);
    window.addEventListener('resize', moveInk);
    document.fonts?.ready.then(moveInk);

    initChrome(render);
    applyStatic();
    render();
    readHash();
    initHeroScene();
    initFog($('.hero__fogfx'), 0.55, true);
    initWeather($('.hero__ash'), { drops: true });
    initLightning($('.hero'));
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
          <canvas class="hero__fogfx" aria-hidden="true"></canvas>
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
      initFog($('.ghero .hero__fogfx'), 0.7);
      initWeather($('.ghero .hero__ash'), { density: 0.6 });
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
