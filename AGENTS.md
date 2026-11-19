# AGENTS.md — Sole Verge（孤独的边界）游戏网站

给接手这个仓库的 AI 助手（Codex、Claude 等）看的项目说明。人类读者请看 README.md。
这个网站由 孤独的边界（@bingkunwang01-cmd）和 Claude 一起做，Codex 也会参与。改之前先读完这页。

## 和用户沟通

- 用户叫 **小千**，用中文交流，语气温和。用户不是程序员：说明要用白话，需要用户手动操作时给一步一步的步骤。
- 用户说"上传/推上去"才推送到 GitHub；没说就只在本地提交。

## 项目是什么

- 纯静态网站，部署在 GitHub Pages：https://bingkunwang01-cmd.github.io/save-room-arcade/ （`main` 分支根目录，推上去 1–2 分钟生效）。
- 没有构建步骤、没有框架、没有 npm 依赖。直接改 HTML/CSS/JS。
- 风格：寂静岭式恐怖、PS2 复古、暗红色调、雾、雨、血。要"高级、不廉价"。

## 文件结构

| 路径 | 作用 |
| --- | --- |
| `index.html` | 首页：主视觉、游戏列表、最新作品、动态、关于、建议（反馈表单） |
| `game.html?id=<id>` | 游戏详情页模板，内容全部来自 `js/games.js` |
| `js/games.js` | **所有数据**：作者信息、链接、邮箱、分类、每款游戏（版本、下载、截图、更新记录） |
| `js/site.js` | 全部逻辑：中英文文案 `STRINGS`、渲染、按钮血液、雾/光柱/雨/闪电/滴血特效、反馈表单 |
| `css/site.css` | 全部样式 |
| `assets/site/` | 主视觉 `hero.webp`、闪电图层 `hero-flash.webp`、天空遮罩 `hero-mask.png`、logo、og 图 |
| `assets/games/<id>/` | 每款游戏的封面、截图、图标、视频 |
| `fonts/` | 自带字体（全部 SIL OFL）。像素字体是**子集**，只含网站现有的字 |

## 常见任务

- **发新版本 / 加新游戏**：只改 `js/games.js`（README 有步骤）。安装包放 GitHub Release，tag 格式 `<游戏id>-v<版本>`，例如 `hollow-ward-v0.19`；`downloads[].url` 和 `sha256` 要对上。单个文件超过 100 MB 不能进仓库，只能放 Release。
- **改文案**：`js/site.js` 里的 `STRINGS`，每条是 `[中文, English]`。首页左侧（主标题、副标题、eyebrow、版本行）用像素字体 `SV Pixel`；如果加了新汉字，要重新做字体子集：
  `pyftsubset fusion-pixel-12px-proportional-zh_hans.ttf.woff2 --text-file=chars.txt --flavor=woff2 --output-file=fonts/fusion-pixel/fusion-pixel-12px-sv.woff2`
  （原字体来自 TakWolf/fusion-pixel-font 的 Release）。像素字号保持 12 的整数倍（12/24/60/72px）。
- **主视觉**：是 Blender 渲染图，渲染脚本不在这个仓库里（在用户电脑的 `HollowWard-v0.19/_website-assets/render_hero8.py`）。换图后要同步 `js/site.js` 里的 `HERO` 坐标（灯笼、logo、地面、血滴锚点，都是 0–1 的图片坐标），否则光柱/灯光/滴血会错位。

## 约定

- 双语：任何新文字都要在 `STRINGS` 里加中英文两份。
- 颜色基调：底色 `--bg #0b0c0c`，骨白 `--bone`，血红 `--blood #8c1217`。红色要克制：大面积用半透明暗红，不要纯红块。
- 动效要尊重 `prefers-reduced-motion`（代码里的 `quiet` 变量）；闪电每秒不超过两次闪光。
- 手机端（≤640px）一定要检查：主视觉 `object-position` 对准 logo，像素字不要断词（副标题用 `<wbr>` + `word-break: keep-all`）。
- 提交作者用用户的 GitHub 身份；AI 参与的提交在末尾加 `Co-Authored-By:` 署名。

## 已知限制

- 反馈表单没有服务器：靠 `mailto:` 打开访客邮件程序，或打开预填好的 GitHub Issue。
- 头像直接用 GitHub 头像，加载失败时退回 `assets/site/avatar.webp`。
