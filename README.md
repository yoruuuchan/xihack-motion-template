# XiHack Motion Template

一个为 XiHack 首日团队介绍准备的 Remotion 工程：一分钟以内、1920×1080、30fps。现场只需要替换项目内容和素材，不需要改场景代码。

当前有两个 composition：

- `XiHackTeamIntro`：当前为 48.6 秒的 BGM 对拍版本。六个章节都由旋钮短暂选档；上一章末帧会先接住下一枚旋钮的方向化入场，选档后再以不同方向缩放 / 推进进入内容，旋钮不会常驻。问题、方案和今天分别使用较长的异向聚拢、克制铰链与浅层 2.5D 文字入场，其余章节保持安静对照。开场、Story、今天和收尾使用同一套以 inset / sunken 为主、raised / lifted 为辅的材质层级；人物卡仍是等待真实照片的占位结构。章节边界同时服从乐句、重拍和文字阅读停顿，不为凑满一分钟拉长。
- `DialTest`：8 秒旋钮组件试验，用于单独检查材质、档位、按压和离场；不再与主片割裂成另一条叙事方案。

底部是主片唯一的全局进度信息：章节刻度按真实帧数比例排列，游标与时间码跟随当前帧。修改 `src/timeline-config.mjs` 的章节时长，会同时更新场景排布、旋钮点击声和时间标尺。

## 现场使用

```powershell
npm install
npm run preflight
npm run studio
npm run render
```

默认导出到 `out/xihack-team-intro.mp4`。Remotion Studio 中选择 `DialTest` 可单独检查旋钮。

现场只改 [`src/content.json`](src/content.json) 与 `public/` 下的素材：

1. 填 `team.name`、`team.tagline`。
2. 填 `project.name`、`project.oneLiner`、`project.nextStep`。
3. 把 `story` 的五段换成当前项目的“问题 → 洞察 → 方案 → 原型 → 价值”。五段是通用叙事槽，不再绑定 Relay 项目。
4. 填满 **4 名** `members`。本届队伍人数已经锁定为四人，人物章按四张卡专门排版。
5. 填 1–4 条 `progress`，记录当天真正完成的事。
6. 把图片、视频和音乐放进 `public/`，在对应 `media` / `music.src` 中填写相对路径，不要带 `public/` 前缀。
7. 运行 `npm run preflight`，再预览或导出。

`story[].layout` 是视觉版式，不是项目类型。当前可选值为 `notes`、`focus`、`list`、`steps`、`timeline`；每段的 `points` 固定填三项。进展允许 1–4 条；四条时会自动缩短单条入场，并在章节结束前给出四项总结。

最简单的素材写法是字符串：

```json
"media": "members/member-a.mp4"
```

需要控制裁切或视频入点时，也可以写成对象：

```json
"media": {
  "src": "demo/product.mp4",
  "fit": "cover",
  "position": "50% 35%",
  "trimStart": 1.2
}
```

`fit` 支持 `cover` / `contain`，`position` 使用 CSS `object-position` 语法，`trimStart` 单位为秒。人像通常用 `cover`；白板、界面录屏通常先用 `contain`，避免裁掉界面边缘。故事和进展中的每段视频都从自己的条目起点重新计时，再叠加 `trimStart`，不会因为排在第二、第三项而提前播放。

故事、人物和进展视频默认静音，避免多个素材音轨叠加；只有 `music.src` 会进入成片声音。音乐可配置 `volume`、`trimStart`、`fadeIn` 和 `fadeOut`，后三项单位均为秒。`fadeIn` / `fadeOut` 可填 `0` 表示不淡化；两者之和不能超过 48.6 秒。若确实需要无声导出，把 `music.src` 设为 `""`，preflight 会明确显示 silent mode；只要路径非空，音乐缺失仍会阻止导出。

`preflight` 与 Studio 共用同一份内容结构校验，会检查五段故事、四名成员、进展数量、空字段、素材路径、文字风险和淡化边界。有 `ffprobe` 时还会检查音视频时长、裁切入点、编码、尺寸和旋转信息；H.264 MP4 是比赛现场最稳的动态素材格式。`demo` 改为 `false` 后会同时移除右下角演示戳和“概念演示 / 人物素材位 / 示例草图”等编辑提示，空素材仍会使用正式可看的内容卡降级。真实参赛内容可以只保留在本地，不必提交到仓库。

## 工程结构

- `src/content.json`：唯一的现场内容入口。
- `src/content-validation.mjs`：Studio 与 preflight 共用的内容契约。
- `src/content.ts`：内容类型与媒体默认值。
- `src/timeline-config.mjs`：六章时长、帧率与共享时序的跨运行时单一来源。
- `src/timeline.ts`：带 TypeScript 类型的时间线导出与当前章节查询。
- `src/Soundtrack.tsx`：BGM 裁切、头尾淡化和旋钮机械点击声。
- `src/ChapterTimeline.tsx`：按实际帧数绘制章节刻度、游标和时间码。
- `src/scenes/Story.tsx`：通用的五段项目叙事，不包含 Relay 专属词汇。
- `src/scenes/Field.tsx`：固定四人构图、1–4 条进展。
- `src/scenes/Dial.tsx`：主片章节选择器和独立 `DialTest`。
- `src/design.tsx`：颜色、字体、阴影和基础视觉组件。
- `scripts/preflight.mjs`：现场替换后的单次快速检查。
- `docs/REFERENCE-LOCK.md`：已经确认与尚未确认的视觉边界。
- `docs/WORKFLOW-IMPROVEMENTS.md`：从本片迭代提炼出的通用 Remotion 制作与验收流程提案。
- `docs/HANDOFF.md`：当前候选成片、保留的 70 分旧基线、最终载体信息、锁定边界和下一窗口恢复入口。

## 视觉与版权说明

当前主片仍沿用部分 yoru-and-akari Console 设计系统的 Akari 色值和新拟态原语；这一版已经完成主要信息载体的逐块材质审计，并按用户偏好确立“内凹 > 外凸”的层级，同时保留旋钮入场和较长文字动效。页面 wash、满幅蓝底、时间标尺和连接线仍按环境 / 功能职责保持克制，不会为了拟物被强行卡片化。当前仍需用户按正常速度评片，不冒充最终视觉批准。人物章节明确保持占位版式，等真实成员照片到位后再决定其最终材质与构图。此前生成的团队图形标志已经完全删除，正式标识未提供前不再用占位图形冒充 logo。

## 当前 BGM

当前使用 Alanajordan 的 `Brazilian Tropicalia Instrumental 01`，从原曲约 `00:56.03` 起取 48.6 秒，并在片头 / 片尾做短淡化。音乐文件因授权与仓库体积不进入 Git；把下载文件放到 `public/music/alanajordan-brazilian-tropicalia-instrumental-01-485592.mp3` 即可复现带声音的导出。来源和许可说明见 [`public/music/README.md`](public/music/README.md)。

字体：Latin 使用 Geist / Geist Mono，中文使用 Source Han Sans SC，均以 SIL OFL 随工程本地加载。Remotion 的使用受其自身许可约束。
