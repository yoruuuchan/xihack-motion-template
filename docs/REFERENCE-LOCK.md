# XiHack Motion Template — Reference Lock

2026-09-20：用户曾同意 Akari 色卡的视频化方案、文字与画面接力方向，指定以 #1EA8A0 替换橘色，并授权制作 demo。2026-09-21 用户明确认为该 60 秒主片不好看；现仅把它保留为内容与时间轴基线，不再把它视为视觉批准。

| 段落 | 可定位来源 | 借用什么 |
|---|---|---|
| 团队 → 项目 | remotion-dev/remotion packages/template-helloworld/src/HelloWorld.tsx；本轮已同意的团队名让位方案 | 主体持续移位成为署名，新的主标题接管画面 |
| 问题 → 方案 | video-shotcraft @0d6f0b57f0d4d6700761644c07f7ef03c3e50234 demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx | 素材仅在切词窗口步进、等高素材、文字块中心对齐素材中心、切换后静置 |
| 素材展开 → 实拍 | 同一 filmstrip 母版 + 本轮已同意的素材展开提案 | 当前素材位置连续扩大到满画幅，不额外引入3D运镜 |
| 人物与进展 | 同一 filmstrip 的图文同步原则，用户同意的实拍姓名与进展包装 | 素材占主要面积，名字/进展跟随对应素材切换 |
| 收尾 | 开场母版逆向收束 + 已讨论的团队/项目共同落版 | 名称层级保持一致，完成后停止运动 |
| 颜色 | E:/DESIGN/yoru-and-akari Console Design System/colors_and_type.css [data-theme=akari] | 皇家蓝 #4F6CE8、冷瓷 #E8ECF3、浅蓝 #DCE3FE、墨色 #0E1525、Frost #1EA8A0；不使用 Ember |
| 新拟态结构（全片） | 同一设计系统 README.md「Shadows — the core motif」「Hover / press / focus」「Selected / active」「Radii」；preview/shadows-neo.html | 卡片只靠双色阴影成形（白高光 + 冷灰低光），不描边、不画左侧色条；raised / lifted / inset 三档；按压 = 外凸翻内凹；选中 = 内凹 + 1.5px 主色描边（视频放大为 3px）；圆角 16→40、12→28 |
| 胶囊与徽章 | preview/badges-chips.html、preview/buttons.html | chip 默认外凸小阴影，选中态主色底 + 内凹；badge 用 100 阶淡底 + 700 阶深字（frost / mute / info）；DEMO 戳、概念演示、成员角色、段落标签全部走这一套 |
| 分段指示器 / 滑杆 | preview/toggles-segmented.html（segmented + slider） | 场景内部可保留必要的局部状态切换；旧版每场重复出现的装饰性底栏已删除，全片底部只保留一条按真实章节时长绘制的时间标尺 |
| 素材位与列表行 | preview/channel-cards.html；README「Behavior cheatsheet」 | 空素材位 = 内凹槽（占位人物坐在凹槽里），有素材 = 外凸卡面；collect 卡的三行按 settings row 做外凸行 + 状态圆点，中间行为选中态 |
| 页面底色 | colors_and_type.css --page-wash | 冷瓷面右上一点蓝色 wash、左下一点 frost wash（原配方为 ember，按本片约束替换）；蓝底段用同结构的白 / 深蓝 wash |
| 字体 | 同一设计系统 fonts/fonts-local.css | Latin 用 Geist（可变字重）与 Geist Mono，中文用 Source Han Sans SC；Inter 只是设计系统的 fallback，已移除 |

色卡借用不等于采用整套 Console UI。中文字号、画幅布局、主色大面积使用、满幅素材和新时长是本次演示的适配。所有新增 timing 均为 ASSUMPTION，未冒充参考测量。

2026-09-20（第二轮）：用户指出首版只借了色值、丢了新拟态，指定以设计系统的内凹 / 外凸 / 胶囊语法重做。阴影与圆角按 ~2.5× 放大属于 ASSUMPTION（设计系统以 390px 手机宽为基准，片子 1920 宽且投影观看）；蓝底段的外凸 / 内凹变体（白高光 12%、深蓝低光 40%）是设计系统未定义的适配，同为 ASSUMPTION。

**DIRECTION LOCKED，DETAILS NOT APPROVED（`XiHackTeamIntro` + 测试合成 `DialTest` / `src/scenes/Dial.tsx`）**：旋钮像滚筒洗衣机的档位选择器；扭到一个档位即选择对应主题，并触发缩放、推进或其他转场进入该主题场景。旋钮只在“选择 / 跳转”的必要时刻出现，进入场景后应离场，不能常驻整片。主片现已覆盖“团队 / 项目、问题、方案、我们、今天、下一步”六档；旋钮尺寸、材质、排版、运镜、按压反馈与离场方式均尚未逐项批准。

`content.json` 已从 Relay 语义解耦为通用的“问题 → 洞察 → 方案 → 原型 → 价值”五段叙事槽。示例队名、项目、成员和产品界面均为演示，不能视作真实参赛信息。实拍占位不生成虚构人物；正式实拍可以通过 content.json 指定本地照片/视频。无音乐版本，待用户提供选曲。

2026-09-21（第四轮锁定）：

- 删除此前生成的团队图形标志，不替换为另一个占位 logo；只保留团队名 / 项目名的文字身份。
- 比赛约束是“一分钟以内”，不再为了凑满 60 秒拉长镜头。当前 48 秒只是无 BGM 的节奏骨架，正式时长由选曲的完整乐句和阅读停顿共同决定。
- 旋钮进入主片，每章短暂出现完成选档，随后通过缩放 / 淡出与内容场景重叠 10 帧；它是导航动作，不是常驻装饰。
- 旧版各场底部的装饰条全部退出；新的全局时间标尺按照六章真实帧数成比例放置刻度，并显示实际游标与 `当前时间 / 总时间`。

Reference Compare：正式导出前批量抽取关键帧，对照已读取的参考帧与这里的构图/颜色约定。只处理具体问题，不做多风格测试矩阵。
