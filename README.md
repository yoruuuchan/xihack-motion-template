# XiHack · Relay 动效演示

60 秒，1920×1080，30fps。视觉走 yoru-and-akari Console 设计系统的 Akari 主题：冷瓷底、皇家蓝大色块，唯一辅助强调色为 Frost `#1EA8A0`，无橘色。结构语言是 Console 的新拟态——卡片只靠双色阴影成形（外凸 / 内凹），胶囊 chip 与徽章，内凹轨 + 外凸活动块的分段指示器，内凹滑杆 + 白色旋钮的进度条；空素材位显示为内凹槽，放入真实素材后变成外凸卡面。所有配方集中在 `src/design.tsx` 的 `neo` 与原语组件（Card / Well / Pill / Segmented / Track / Tile）。音乐暂空。

示例队名、项目、成员、进展及产品界面均为演示，不是真实参赛内容。成员段为明确标注的人物素材占位；进展段为示例草图。此版本用于看分镜、色彩、动效及整体节奏。

## 使用

```powershell
npm install
npm run studio
npm run render
```

填写 `src/content.json`：team、project、tagline、relay、members、progress、next。当前 demo 按4名成员、5个接力段、3条进展排版；本轮没有制作任意人数自动排版。正式模板根据现场人数再调整。

图片和视频放入 `public/`，对应 `media` 填相对路径，例如 `members/a.mp4`，不要加 public 前缀。支持 png/jpg 等图片和 mp4/mov/webm；素材应覆盖对应片段长度，提前裁好入点。音乐同样放 public，填写 music。真实资料全部替换后再把 demo 改为 false。

默认 `npm run render` 导出 `out/xihack-relay-demo.mp4`。本地预览可以拖动时间轴。素材替换后建议只看对应段落和一次最终成片，不做重复测试矩阵。

本机 demo 为避免重复下载，以目录链接复用相邻 yoru-motion-system 的同版本 node_modules。迁移到另一台机器时，只带源文件、public 和 package.json，再执行 npm install；不要复制此依赖目录链接。

## 参考与边界

见 `docs/REFERENCE-LOCK.md`。借用了 Shotcraft 的文字与素材同步步进语法，未复制上游页面占位代码。新拟态阴影、圆角、胶囊、分段控件的配方来自设计系统的 README 与 `preview/` 卡片，按视频尺度放大约 2.5 倍。新动画数值为待用户审美确认的演示选择。演示图形为本项目绘制。

字体：Latin 用 Geist 与 Geist Mono（设计系统自托管的 Latin 子集，SIL OFL），中文用 Source Han Sans SC（SIL OFL），全部随工程本地加载。Remotion 的使用受其自身许可约束。
