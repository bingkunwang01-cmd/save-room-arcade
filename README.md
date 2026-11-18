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
| `assets/site/hero.webp` | 首页主视觉（Blender Cycles 渲染：带血的旧金属 SV 字标、锈铁链、维多利亚提灯、雾中的铁丝网和路灯） |
| `assets/site/blood.svg` | 左上角 Logo 不定时渗血的血迹贴图 |
| `assets/site/sole-verge-keyart.webp` | Sole Verge 主视觉横幅（关于区） |
| `assets/games/<游戏id>/` | 每款游戏的封面、截图、旋转存档图标、短片 |
| `fonts/` | Cinzel（品牌字）、思源宋体 Bold（标题）、思源黑体 Bold（按钮和导航），中文按需分片加载，均为 SIL OFL 授权 |
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

- 主视觉、Logo 和旋转存档图标都用 Blender 渲染。
- 字体：[Cinzel](https://github.com/NDISCOVER/Cinzel)、[Noto Serif SC](https://github.com/notofonts/noto-cjk) 与 Noto Sans SC，SIL Open Font License 1.1（经 Fontsource 分片）。
