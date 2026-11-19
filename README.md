# Sole Verge 孤独的边界

孤独的边界一个人做的免费独立游戏，都放在这里。

网站：<https://bingkunwang01-cmd.github.io/save-room-arcade/>

## 网站结构

| 文件 | 作用 |
|---|---|
| `index.html` | 首页：3D 主视觉（雾、灰烬、提灯闪烁）、我的游戏、最新作品、最新动态、关于 |
| `game.html?id=<游戏id>` | 每款游戏共用的详情页，内容从 `js/games.js` 读取 |
| `js/games.js` | **所有游戏的数据都在这里**，加新游戏只改这个文件 |
| `js/site.js` | 页面逻辑（一般不用改） |
| `css/site.css` | 样式 |
| `assets/site/hero.webp` | 首页主视觉（Blender Cycles 渲染：顶光聚光灯下的锈蚀 SV 字标、一圈从地里冒出的铁刺、浸湿的纸、煤油提灯，后期加了辉光、色差、暗角和颗粒） |
| `assets/site/blood.svg` | 左上角 Logo 不定时渗血的血迹贴图 |
| `assets/site/sole-verge-keyart.webp` | Sole Verge 主视觉横幅（关于区） |
| `assets/games/<游戏id>/` | 每款游戏的封面、截图、旋转存档图标、短片 |
| `fonts/` | Cinzel（品牌字）、思源宋体 Bold（标题）、思源黑体 Bold（按钮和导航）、缝合像素字体 12px（首页左侧的像素标题和文字，只保留了网站用到的字），均为 SIL OFL 授权 |
| `hollow-ward.html` | 旧链接，会自动跳到新的空寂病院页面 |

导航里“游戏”展开就是分类菜单，分类来自 `js/games.js` 的 `genres`。首页提灯的闪光位置写在 `js/site.js` 的 `initLamp`（按 2560×1440 主视觉的比例坐标），换主视觉时一起调整。

## 加一款新游戏

1. 在 `assets/games/` 下建一个新文件夹，名字用英文，比如 `zombie-night`。
2. 放进去：
   - `cover.webp`：游戏页大图，横图，建议 1600×900
   - 若干截图 `shot-xxx.webp`（建议 1152×648），以及缩略图 `shot-xxx-thumb.webp`
   - `icon.webp`：卡片上旋转的存档图标，32 帧横向排成一条（每帧正方形）
3. 打开 `js/games.js`，复制 `hollow-ward` 那一整段，改成新游戏的内容：
   - `id` 和文件夹同名，`no` 是作品编号（002、003……）
   - `genres` 从这几个里选：`horror` 恐怖、`mystery` 悬疑、`survival` 生存、`zombie` 丧尸、`casual` 休闲、`party` 娱乐（导航分类菜单和首页标签会自动更新数量）
   - `theme.accent` / `theme.glow` 是这款游戏页面的主题色
   - `downloads` 填 GitHub Release 的下载地址
4. 提交并推送，GitHub Pages 会自动更新。

想加新的分类，在 `games.js` 的 `genres` 里加一行即可。

## 上传安装包

APK 和源码太大，不放在仓库里，放在 GitHub Releases：

1. 仓库页面 → Releases → Draft a new release
2. Tag 用 `<游戏id>-v<版本号>`，比如 `hollow-ward-v0.19`
3. 把 APK 和源码 ZIP 拖进去，发布
4. 下载地址格式：`https://github.com/bingkunwang01-cmd/save-room-arcade/releases/download/<tag>/<文件名>`

## 本地预览

```bash
python -m http.server 8000
```

然后打开 <http://localhost:8000>。

## 素材与授权

- 主视觉、Logo 和旋转存档图标都用 Blender 渲染。主视觉里的锈铁、沥青等材质和提灯、轮椅、病床、铁丝网模型来自 Poly Haven（CC0）。
- 首页的雾、聚光灯光柱、灯闪、雨丝和溅起的水花、从 SV 上滴落的血、打雷闪电都是实时叠加的（`js/site.js` 里的 `initFog` / `initWeather` / `initLightning`），位置跟着主视觉对齐（`HERO` 里的坐标来自渲染日志）。
- 闪电用了两张额外的渲染：`assets/site/hero-flash.webp`（只有闪电照亮的画面）和 `assets/site/hero-mask.png`（天空遮罩，让闪电出现在铁刺和树后面）。系统开了“减少动态效果”时不会打闪电。

## 建议 / 写邮件

首页「建议」栏可以选类型、选游戏、写内容，然后：

- **写邮件发送**：发到 `js/games.js` 里 `owner.email` 填的邮箱，点了会打开访客的邮件程序，标题和内容都已经填好。
- **在 GitHub 提交**：打开这个仓库的新 Issue 页面，标题和内容同样预先填好。
- 字体：[Cinzel](https://github.com/NDISCOVER/Cinzel)、[Noto Serif SC](https://github.com/notofonts/noto-cjk) 与 Noto Sans SC，SIL Open Font License 1.1（经 Fontsource 分片）；[缝合像素字体 Fusion Pixel](https://github.com/TakWolf/fusion-pixel-font)，SIL Open Font License 1.1。
- 像素字体只打包了网站现有文字用到的字。首页文案改了新字的话，需要重新生成子集（见 `fonts/fusion-pixel/`，用 fonttools 的 `pyftsubset`），否则缺的字会显示成普通字体。
