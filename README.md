# XiHack Motion Template

一个为 XiHack 首日团队介绍准备的 Remotion 工程：一分钟以内、1920×1080、30fps。现场只需要替换项目内容和素材，不需要改场景代码。

当前有两个 composition：

- `XiHackTeamIntro`：当前为 48 秒的无 BGM 结构剪辑。六个章节都由旋钮短暂选档，再缩放 / 淡出进入内容；旋钮不会常驻。48 秒不是目标时长，拿到 BGM 后会根据乐句、重拍和文字阅读停顿重新分配。
- `DialTest`：8 秒旋钮组件试验，用于单独检查材质、档位、按压和离场；不再与主片割裂成另一条叙事方案。

底部是主片唯一的全局进度信息：章节刻度按真实帧数比例排列，游标与时间码跟随当前帧。修改 `src/timeline.ts` 的章节时长，会同时更新场景排布和时间标尺。

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
4. 填 1–6 名 `members`。
5. 填 1–4 条 `progress`，记录当天真正完成的事。
6. 把图片、视频和音乐放进 `public/`，在对应 `media` / `music.src` 中填写相对路径，不要带 `public/` 前缀。
7. 运行 `npm run preflight`，再预览或导出。

`story[].layout` 是视觉版式，不是项目类型。当前可选值为 `notes`、`focus`、`list`、`steps`、`timeline`；每段的 `points` 固定填三项。成员和进展数量会自动重新分配卡片宽度与停留时间。

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

`fit` 支持 `cover` / `contain`，`position` 使用 CSS `object-position` 语法，`trimStart` 单位为秒。故事、人物和进展中的视频默认静音，避免多个素材音轨叠加；只有 `music.src` 会进入成片声音，`music.volume` 为 0–1。

`preflight` 会检查段落数量、成员/进展范围、素材路径和常见文字溢出风险。`demo` 改为 `false` 后会移除右下角演示戳。真实参赛内容可以只保留在本地，不必提交到仓库。

## 工程结构

- `src/content.json`：唯一的现场内容入口。
- `src/content.ts`：内容类型、运行时校验与媒体默认值。
- `src/timeline.ts`：六章时长、旋钮停留和主片总时长的单一来源。
- `src/ChapterTimeline.tsx`：按实际帧数绘制章节刻度、游标和时间码。
- `src/scenes/Story.tsx`：通用的五段项目叙事，不包含 Relay 专属词汇。
- `src/scenes/Field.tsx`：自适应 1–6 人、1–4 条进展。
- `src/scenes/Dial.tsx`：主片章节选择器和独立 `DialTest`。
- `src/design.tsx`：颜色、字体、阴影和基础视觉组件。
- `scripts/preflight.mjs`：现场替换后的单次快速检查。
- `docs/REFERENCE-LOCK.md`：已经确认与尚未确认的视觉边界。

## 视觉与版权说明

当前主片仍沿用部分 yoru-and-akari Console 设计系统的 Akari 色值和新拟态原语；这一版尚未获得视觉批准。现阶段先确认信息结构、旋钮职责和真实时间标尺，再逐项优化旋钮材质、转场、构图、字体层级和素材进入方式。此前生成的团队图形标志已经完全删除，正式标识未提供前不再用占位图形冒充 logo。

## BGM 交接建议

可以现在就提供完整音频文件，或给 2–3 首候选和来源 / 授权信息，不需要提前剪成一分钟。优先选择有清晰 4 / 8 小节结构、前后有呼吸空间、中段有一次明显抬升、能在 40–55 秒形成完整段落的音乐；纯音乐或人声稀疏会更容易承载现场文字。拿到音乐后再测拍点并调整章节边界，不会为了“每拍都切”牺牲阅读停顿。

字体：Latin 使用 Geist / Geist Mono，中文使用 Source Han Sans SC，均以 SIL OFL 随工程本地加载。Remotion 的使用受其自身许可约束。
