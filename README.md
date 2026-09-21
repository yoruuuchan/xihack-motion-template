# XiHack Motion Template

一个为 XiHack 首日团队介绍准备的 Remotion 工程：60 秒、1920×1080、30fps。现场只需要替换项目内容和素材，不需要改场景代码。

这个仓库同时保留两条线：

- `XiHackTeamIntro`：可完整导出的 60 秒结构基线。它来自 9 月 20 日的 Akari / filmstrip 主片，目前只承担“内容和时间轴可运行”的职责，**不代表视觉定稿**。
- `DialTest`：8 秒旋钮选段试验。方向已经明确为“旋钮选择主题 → 转场进入主题场景 → 旋钮离场”，不是让大旋钮常驻整片；目前只做到待机、团队、问题三个状态，细节仍要逐项优化。

## 现场使用

```powershell
npm install
npm run preflight
npm run studio
npm run render
```

默认导出到 `out/xihack-team-intro.mp4`。Remotion Studio 中选择 `DialTest` 可单独检查旋钮试验。

现场只改 [`src/content.json`](src/content.json) 与 `public/` 下的素材：

1. 填 `team.name`、`team.tagline`。
2. 填 `project.name`、`project.oneLiner`、`project.nextStep`。
3. 把 `story` 的五段换成当前项目的“问题 → 洞察 → 方案 → 原型 → 价值”。五段是当前 60 秒时间轴的固定叙事槽，不再绑定 Relay 项目。
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
- `src/scenes/Story.tsx`：通用的五段项目叙事，不包含 Relay 专属词汇。
- `src/scenes/Field.tsx`：自适应 1–6 人、1–4 条进展。
- `src/scenes/Dial.tsx`：旋钮方向试验；暂未接入 60 秒主片。
- `src/design.tsx`：颜色、字体、阴影和基础视觉组件。
- `scripts/preflight.mjs`：现场替换后的单次快速检查。
- `docs/REFERENCE-LOCK.md`：已经确认与尚未确认的视觉边界。

## 视觉与版权说明

当前主片使用 yoru-and-akari Console 设计系统的 Akari 色值和新拟态原语；这一版已经被明确判定为不够好看，保留它是为了让后续优化有稳定的代码和时间轴基线，而不是延续这套审美。下一阶段以 `DialTest` 为起点逐个确认旋钮、转场、构图、字体层级和素材进入方式。

字体：Latin 使用 Geist / Geist Mono，中文使用 Source Han Sans SC，均以 SIL OFL 随工程本地加载。Remotion 的使用受其自身许可约束。
