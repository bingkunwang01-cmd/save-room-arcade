/*
 * Sole Verge 孤独的边界 — 网站数据
 * ------------------------------------------------------------
 * 加新游戏：在下面的 games 数组里复制一份 hollow-ward，改成新游戏的内容，
 * 图片放到 assets/games/<id>/ 文件夹。游戏页地址会是 game.html?id=<id>。
 * 详细步骤见仓库根目录的 README.md。
 */
window.SAVE_ROOM = {
  owner: {
    name: { zh: '孤独的边界', en: 'Sole Verge' },
    handle: 'bingkunwang01-cmd',
    // 直接用 GitHub 头像；加载失败时用仓库里的备份
    avatar: 'https://github.com/bingkunwang01-cmd.png?size=320',
    avatarFallback: 'assets/site/avatar.webp',
    links: {
      github: 'https://github.com/bingkunwang01-cmd',
      douyin: 'https://v.douyin.com/FZuIHI8DvAE/',
      bilibili: 'https://b23.tv/uol5fhZ',
      x: 'https://x.com/Lonelnx',
    },
    // 「建议」里“写邮件发送”会发到这个邮箱
    email: 'bingkunwang01@gmail.com',
  },

  // 游戏分类。color 是这个分类在网站上的标记色
  genres: [
    { id: 'horror',   zh: '恐怖', en: 'Horror',   color: '#c4222a', icon: 'skull', desc: { zh: '黑暗里的追逐与惊吓', en: 'Chases and scares in the dark' } },
    { id: 'mystery',  zh: '悬疑', en: 'Mystery',  color: '#8f7bd6', icon: 'eye',   desc: { zh: '线索、谜题和真相', en: 'Clues, puzzles and the truth' } },
    { id: 'survival', zh: '生存', en: 'Survival', color: '#7fa86a', icon: 'flame', desc: { zh: '物资、体力和抉择', en: 'Supplies, stamina and choices' } },
    { id: 'zombie',   zh: '丧尸', en: 'Zombie',   color: '#a4b045', icon: 'hand',  desc: { zh: '尸潮来袭，守住据点', en: 'Hold the line against the horde' } },
    { id: 'casual',   zh: '休闲', en: 'Casual',   color: '#6fb8b2', icon: 'cup',   desc: { zh: '放松一下，随时能玩', en: 'Something lighter, any time' } },
    { id: 'party',    zh: '娱乐', en: 'Party',    color: '#d4a64a', icon: 'dice',  desc: { zh: '和朋友一起闹', en: 'Fun with friends' } },
  ],

  games: [
    {
      id: 'hollow-ward',
      // 作品编号，按发布顺序递增
      no: '001',
      title: { zh: '空寂病院', en: 'Hollow Ward' },
      tagline: { zh: '150 本书。三层医院。唯一的出口。', en: '150 books. Three floors. One way out.' },
      genres: ['horror', 'survival'],
      // 游戏页的主题色：accent 用在按钮和标记上，glow 用在画面光晕上
      theme: { accent: '#c4222a', glow: '#7fd39b', ink: '#e8e3d7' },
      version: '0.19',
      updated: '2026-11-18',
      platform: { zh: '安卓（ARM64）', en: 'Android (ARM64)' },
      size: '129.9 MB',
      engine: 'Godot 4',
      languages: { zh: '简体中文、英文', en: 'Chinese, English' },
      online: { zh: '离线，无内购', en: 'Offline, no purchases' },
      icon: 'assets/games/hollow-ward/icon.webp',
      cover: 'assets/games/hollow-ward/cover.webp',
      // 游戏页和首页“最新作品”里的三个数字
      highlights: [
        { value: '150', zh: '本书要找齐', en: 'books to find' },
        { value: '3', zh: '层病区', en: 'hospital floors' },
        { value: '5', zh: '名可选角色', en: 'playable characters' },
      ],
      summary: {
        zh: '第一人称医院追逐。三层病区里藏着 150 本书，找齐它们，再回到一楼入口逃出去。',
        en: 'A first-person hospital chase. Find all 150 books across three floors, then get back to the entrance.',
      },
      about: [
        {
          zh: '怪物会锁定你、绕路包抄，还能顺着楼梯跨层追过来。你能依靠的只有一把单发手枪、柜子、低矮的通风管，以及每个角色自己的技能。',
          en: 'The creatures lock on, flank you and follow you between floors. All you have is a single-shot pistol, lockers, crawl vents and each character’s own skills.',
        },
        {
          zh: '走廊里会随机出现毒气、地震和红色警报。被抓住会损失一条命并回到入口，已经收集的书会保留。游戏每隔一会儿自动存档，退出后可以接着玩。',
          en: 'Poison gas, earthquakes and red alerts break out at random. Getting caught costs a life and sends you back to the entrance, but you keep your books. The game saves often, so you can always continue.',
        },
      ],
      modes: [
        {
          name: { zh: '经典模式', en: 'Classic' },
          image: 'assets/games/hollow-ward/shot-exit.webp',
          text: {
            zh: '原本的病院追逐。五名角色可选：有人能扔闹钟引开怪物，有人能冲刺，有人能回溯十秒前的位置。',
            en: 'The original chase. Pick one of five characters: one throws an alarm clock to lure monsters, one can sprint, one can rewind ten seconds.',
          },
        },
        {
          name: { zh: '游戏机模式', en: 'Arcade Machine' },
          image: 'assets/games/hollow-ward/shot-machine.webp',
          text: {
            zh: '一楼入口多了一台摇奖机。奖品可能是无敌和双倍速度，也可能是飞蛾、触手，甚至一只追着你不放的恶魔。中三次奖，机器就报废。',
            en: 'A prize machine waits at the entrance. You might win invincibility or double speed, or moths, tentacles, even a demon that never stops chasing. Three prizes and the machine breaks for good.',
          },
        },
      ],
      shots: [
        { src: 'assets/games/hollow-ward/shot-title.webp', thumb: 'assets/games/hollow-ward/shot-title-thumb.webp', zh: '标题画面', en: 'Title screen' },
        { src: 'assets/games/hollow-ward/shot-exit.webp', thumb: 'assets/games/hollow-ward/shot-exit-thumb.webp', zh: '一楼出口', en: 'Ground-floor exit' },
        { src: 'assets/games/hollow-ward/shot-machine.webp', thumb: 'assets/games/hollow-ward/shot-machine-thumb.webp', zh: '命运摇摇乐', en: 'The prize machine' },
        { src: 'assets/games/hollow-ward/shot-corridor.webp', thumb: 'assets/games/hollow-ward/shot-corridor-thumb.webp', zh: '派对走廊', en: 'Party corridor' },
        { src: 'assets/games/hollow-ward/shot-birthday.webp', thumb: 'assets/games/hollow-ward/shot-birthday-thumb.webp', zh: '病房里的生日宴', en: 'Birthday in the ward' },
        { src: 'assets/games/hollow-ward/shot-parry.webp', thumb: 'assets/games/hollow-ward/shot-parry-thumb.webp', zh: '举剑格挡', en: 'Sword parry' },
      ],
      video: {
        src: 'assets/games/hollow-ward/clip-v016.mp4',
        poster: 'assets/games/hollow-ward/clip-poster.webp',
        caption: { zh: 'v0.16 实机画面，19 秒，无声', en: 'v0.16 in-engine footage, 19 s, silent' },
      },
      downloads: [
        {
          kind: 'apk',
          label: { zh: '下载安卓版', en: 'Download for Android' },
          url: 'https://github.com/bingkunwang01-cmd/save-room-arcade/releases/download/hollow-ward-v0.19/HollowWard-0.19-android.apk',
          size: '129.9 MB',
          sha256: '30dafe72d5cb4a1497f8351e9c3b7c5c2f84c530ebc8cdff41c1b143841f6e4c',
        },
        {
          kind: 'source',
          label: { zh: '下载 Godot 源码', en: 'Download Godot source' },
          url: 'https://github.com/bingkunwang01-cmd/save-room-arcade/releases/download/hollow-ward-v0.19/HollowWard-0.19-Godot-Source.zip',
          size: '127.6 MB',
          sha256: '99e016fe94b482de5fffcc6018a21ba79f9b871d6b0b211f4a14ac1c7ab3ee96',
        },
      ],
      install: [
        { zh: '用手机下载 APK，或者在电脑下载后传到手机。', en: 'Download the APK on your phone, or copy it over from a computer.' },
        { zh: '打开文件。如果手机提示“禁止安装未知来源应用”，在弹出的设置里允许一次。', en: 'Open the file. If your phone blocks unknown apps, allow it once in the prompt.' },
        { zh: '横屏打开游戏。在 Settings → Language 里可以切换成简体中文。', en: 'Play in landscape. Switch language under Settings → Language.' },
      ],
      installNote: {
        zh: '装过旧版本？直接覆盖安装就行，存档会保留。目前只有安卓版，暂时没有 iPhone 版。',
        en: 'Installed an older build? Install over it and your save stays. Android only for now.',
      },
      changelog: [
        {
          version: '0.19', date: '2026-11-18', image: 'assets/games/hollow-ward/shot-exit.webp',
          title: { zh: '音效全面重做', en: 'A new layer of sound' },
          zh: '音效重做：翻书、金属、木头和鞋底的碰撞声换成了新素材，枪声重新合成。',
          en: 'New foley for book pages, metal, wood and footsteps, and a rebuilt gunshot.',
        },
        {
          version: '0.16', date: '2026-11-17', image: 'assets/games/hollow-ward/shot-birthday.webp',
          title: { zh: '病房里的生日宴', en: 'A birthday in the ward' },
          zh: '游戏机模式铺上派对地毯，每层加入生日桌、双层蛋糕、漂浮气球和会响的八音盒。恢复完整原尺寸素材。',
          en: 'Arcade Mode gets party carpets, birthday tables, cakes, drifting balloons and working music boxes. Full-size art restored.',
        },
        {
          version: '0.15', date: '2026-11-17', image: 'assets/games/hollow-ward/shot-corridor.webp',
          title: { zh: '狂欢派对与炸弹人', en: 'Party time, and the bomber charges' },
          zh: '每三分钟一次的 30 秒派对事件：狂欢小丑会扔盒子把你绊倒。炸弹人学会蓄力冲刺。',
          en: 'A 30-second party breaks out every three minutes: the clown throws boxes that trip you. The bomber learns to charge.',
        },
        {
          version: '0.14', date: '2026-11-17', image: 'assets/games/hollow-ward/shot-parry.webp',
          title: { zh: '剑技与马戏团摇奖机', en: 'Sword skills and a carnival cabinet' },
          zh: '新的书本模型和楼梯；新增掷剑和剑格挡技能；摇奖机换上马戏团外壳和彩灯。',
          en: 'New book models and stairs, sword skills, and a carnival cabinet for the prize machine.',
        },
        {
          version: '0.13', date: '2026-11-17', image: 'assets/games/hollow-ward/shot-machine.webp',
          title: { zh: '游戏机模式上线', en: 'Arcade Mode arrives' },
          zh: '加入游戏机模式：18 种奖品，好坏各半。',
          en: 'Arcade Mode arrives with 18 prizes, good and bad.',
        },
      ],
    },
  ],
};
