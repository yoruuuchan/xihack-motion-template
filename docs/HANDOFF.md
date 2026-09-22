# XiHack Motion Template — Continuation Handoff

Updated: 2026-09-23

## Current status

- The previously reviewed **70/100** carrier is preserved locally as `out/xihack-team-intro-70-baseline.mp4`; it is no longer the latest render and was not overwritten.
- Yoru rated the preceding candidate at about **78/100**. The new four-person carrier implements the accepted cross-review pass but has not yet received a replacement score; do not describe it as final visual approval.
- The latest visual implementation is commit `0fea80a` (`Add causal handoff and five-person variant`) on `main`.
- Repository: `git@github.com:yoruuuchan/xihack-motion-template.git`.
- The implementation and this handoff are committed to `main`; verify synchronization with `origin/main` before resuming. Both public review carriers are attached to the `four-five-candidate-2026-09-23` GitHub prerelease rather than committed as repository blobs.
- Do not restart the design direction or reintroduce rejected experiments in a new session. Continue from the current main branch and the locks below.

## Latest creative feedback — implemented in the current candidate

The current candidate addresses the three points from the 70/100 review and the subsequent material requests:

1. A shared material plate and strengthened Card / Well surfaces extend raised / inset / contact depth across opening, story, progress, and closing.
2. Every returning selector now enters over a held final frame from the preceding scene, using a coherent family of lateral, vertical, and depth moves. Chapter boundaries and the six-frame selector-to-content overlap are unchanged.
3. Problem, solution, and today text motion now uses staggered 23–39-frame windows while retaining the original stable reading holds and 48.6-second runtime.
4. Remaining Story / Today fallback canvases, state blocks, semantic pills, shared tiles, and the DialTest display use one tactile material system. Environmental washes and functional lines remain intentionally un-carded.
5. Material hierarchy is now **inset > raised**: display beds, persistent information carriers, list rows, and selected states are predominantly sunken; raised depth is reserved for pick-up-able, focused, or operable foreground objects.

The opening-bottom sentence `一起，把想法往前推一步。` has been removed with no replacement copy. The same inset-first preference is recorded in the source DESIGN system at commit `834b075`.

Do not interpret point 1 as “increase every shadow.” Strengthen material hierarchy through coordinated highlights, contact shadows, inset depth, edge response, and surface separation. Keep the image crisp enough for projection.

Implementation exception approved by Yoru and honored in code: the people chapter and its four / five placeholder portrait cards are not part of the material-depth pass. Only count-specific width, gap, identity type size, and focus cadence differ; portrait material waits for real member media.

## Latest verified carriers

- Four-person file: `out/xihack-team-intro-4p-optimized.mp4` (ignored by Git), 8,128,744 bytes, SHA-256 `AE2ACADFB5FB9AB3B47835E7CC884C68E6383FAE88E91CB4BCDDBBD155202341`.
- Five-person file: `out/xihack-team-intro-5p-optimized.mp4` (ignored by Git), 8,248,967 bytes, SHA-256 `929CF9D47D153DABF1A96B4EC3E0911E832190A94BB072EDE2BB22FB57F1DAF7`.
- Both: H.264 + AAC, 1920×1080, 30fps, 48 kHz stereo, `48.618667s`.
- Public review release: `https://github.com/yoruuuchan/xihack-motion-template/releases/tag/four-five-candidate-2026-09-23`.
- Direct four-person MP4: `https://github.com/yoruuuchan/xihack-motion-template/releases/download/four-five-candidate-2026-09-23/xihack-team-intro-4p-optimized.mp4`.
- Direct five-person MP4: `https://github.com/yoruuuchan/xihack-motion-template/releases/download/four-five-candidate-2026-09-23/xihack-team-intro-5p-optimized.mp4`.
- Five-person normal-speed People preview: `out/people-5p-preview.mp4` (ignored by Git).
- Four-person normal-speed Solution handoff preview: `out/solution-handoff-4p-final-preview.mp4` (ignored by Git).
- Normal-speed checkpoint handoff excerpt: `out/checkpoint-handoff-preview.mp4` (ignored by Git).
- Normal-speed ingress / text excerpt: `out/v2-motion-preview.mp4` (9.728 seconds, ignored by Git).
- Preserved 70/100 carrier: `out/xihack-team-intro-70-baseline.mp4`, SHA-256 `44E7B5FB8A7F8B0BE1354AB077238BAA0A871E27AA0166A2ECC64DA218C24A4B` (ignored by Git).
- Local BGM is present at `public/music/alanajordan-brazilian-tropicalia-instrumental-01-485592.mp3` and intentionally excluded from Git.

Both final MP4s were checked for Chinese, Latin, digits, punctuation, weights, and monospace roles. No unintended font fallback was observed. Exported frames also confirm the Solution handoff axis, four / five-person identity transition, centered Today checkpoint, and `04 → 05` ruler handoff.

## Read first in the next session

1. `docs/HANDOFF.md`
2. `docs/REFERENCE-LOCK.md`
3. `docs/REVIEW.md`, especially rounds 14–15
4. `docs/OPTIMIZATION-PLAN.md`, especially Phase 10
5. `docs/WORKFLOW-IMPROVEMENTS.md`
6. `README.md` and `src/content.json`

## Locked decisions

- No generated placeholder team logo. Identity is carried by team and project names until a real logo exists.
- The rule is **under one minute**, not exactly one minute. Current duration follows the selected musical phrase and reading rhythm.
- The rotary selector is an action: turn, click, enter the selected chapter, then leave. It must not remain on screen as persistent decoration.
- The bottom element is a real chapter timeline driven by actual frames, not an ornamental progress bar.
- Content is project-agnostic: five story slots cover problem, insight, solution, prototype, and value.
- The four-person composition remains the master. A separate five-person composition inherits every non-member decision and uses one authored five-card layout; do not turn this into an arbitrary 1–6-person engine.
- Problem, solution, and today may use different text-motion personalities; opening, people, and closing remain quieter by design.
- 2.5D is occasional and shallow. Stable text returns to a flat, readable layout.
- The visible dial/content overlap remains six frames. Spatial motion may begin earlier, but do not restore long double-title overlap.
- Final delivery requires checking fonts in the exported carrier, not only CSS or Studio.
- When either material treatment is semantically valid, prefer inset / sunken over raised / lifted. Preserve some raised foreground objects so the inset hierarchy remains legible.

## Rejected or deferred directions

- Do not restore the deleted Core/RIFT experiment or the generated team mark.
- Do not make the dial a persistent chapter badge.
- Do not add a circular portal, forced blackout ending, arbitrary scene builder, or dependency upgrade merely for novelty.
- Do not promote this film to a gold example yet. The preceding candidate was rated about 78/100, the preserved earlier carrier is the 70/100 paused baseline, and the new dual candidate still uses demonstration content.

## Highest-value next iteration

Start by watching the current full carrier at normal speed. The next useful work is content-led rather than another blanket style pass:

1. Record only the remaining specific motion or material seams that still feel weak in the current candidate; do not reopen the whole visual system without evidence from normal-speed viewing.
2. Replace demonstration project copy and story/progress media with the real event content, then validate text fitting, media crops, and local video clocks.
3. Replace the four / five people placeholders when real portraits arrive. Their current material treatment was deliberately left untouched, so make the final people decision from the actual photos rather than from silhouettes.

After real whiteboards, recordings, and prototype footage arrive, decide how much raw on-site texture the today chapter should retain.

Do not start the next pass by changing colors, adding decorative UI, or expanding the runtime.

## Resume commands

```powershell
git pull --ff-only
npm install        # only if node_modules is absent or invalid
npm run preflight
npm run preflight:5p
npm run studio
```

Before another full render, update the Reference Lock for any new visual proposal, check only the decisive seams at normal speed, and then run one final export plus actual-carrier font verification.
