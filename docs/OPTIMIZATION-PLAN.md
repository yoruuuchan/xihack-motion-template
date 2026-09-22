# XiHack Motion Template — Optimization Plan

Baseline: `main @ 36461e3`

Created: 2026-09-21
Execution rule: work file by file, keep this checklist current, and render only after the decisive seams pass.

## Locked decisions

- [x] The optimized **4-person** film remains the primary composition. Add one explicit **5-person** derivative after the four-person carrier passes; do not build an arbitrary 1–6-person layout engine.
- [x] Keep the six chapters and the 48.6-second music-led cut.
- [x] Keep the rotary selector as a brief navigation action; it must not remain on-screen as a badge.
- [x] Keep `DIAL_SCENE_OVERLAP` at 6 frames. Make the spatial motion start earlier instead of restoring the rejected 10–12-frame double-title overlap.
- [x] Keep the current BGM, true timeline, no placeholder logo, and the generic project narrative.
- [x] Do not mix a Remotion dependency upgrade into this visual/reliability pass.

## Phase 1 — Content and media reliability

### `src/content-validation.mjs` + `src/content-validation.d.mts`

- [x] Create one browser-safe validator shared by runtime loading and preflight.
- [x] Require non-empty event, team, project, story, member, and progress text where the main film depends on it.
- [x] Require exactly 4 members, 5 story beats, 3 points per beat/item, and 1–4 progress items.
- [x] Validate layouts, media objects, `fit`, `position`, non-negative media trim, music volume, and music fade values.

### `src/content.ts`

- [x] Replace the duplicated runtime validator with the shared validator.
- [x] Preserve typed `ProjectContent`, `resolveMedia()`, and `hasMedia()` helpers.

### `scripts/preflight.mjs`

- [x] Reuse the shared structural validator so “preflight passed” and Studio agree.
- [x] Replace unrealistic text thresholds and cover every visible/fallback text field.
- [x] Probe audio/video duration, codec, dimensions, and rotation with `ffprobe` when available.
- [x] Reject trim points beyond the source and music that cannot cover the 48.6-second cut.
- [x] Warn for HEVC/non-H.264 video and for `cover` on likely screen recordings.
- [x] Print the per-item reading budget for progress entries, especially the 4-item case.
- [x] Document explicit silent mode (`music.src: ""`) without weakening the missing-file production gate.

### `src/design.tsx`

- [x] Add reusable fitted hero/keyword text primitives with explicit width and font-size bounds.
- [x] Add a media-local timeline wrapper so every video starts from its own content segment plus `trimStart`.
- [x] Keep all animations frame-driven.

## Phase 2 — Scene correctness and four-person presentation

### `src/scenes/Opening.tsx`

- [x] Fit long team/project names safely.
- [x] Use `team.tagline` in the main film instead of a hard-coded substitute.

### `src/scenes/Closing.tsx`

- [x] Fit long project names and keep the `05` clear of the title box.
- [x] Give the teal period a restrained selector-to-title handoff.

### `src/scenes/Story.tsx`

- [x] Give each real video beat its own local clock.
- [x] Fit long keywords without silent clipping.
- [x] Hide editing-only labels when `demo` is false.
- [x] Enable a restrained final-solution expansion only for real media; keep fallback cards framed.
- [x] Replace duplicate-prone React keys.

### `src/scenes/Field.tsx`

- [x] Lock and tune the team composition for exactly four members.
- [x] Keep each member name attached to the corresponding card; use focus motion for emphasis, not identity delivery.
- [x] Give each progress video its own local clock.
- [x] Shorten four-item entry motion and add a compact recap before the chapter closes.
- [x] Hide editing-only placeholder labels when `demo` is false.
- [x] Replace duplicate-prone React keys.

## Phase 3 — Timing and rotary polish

### `src/timeline.ts`

- [x] Export shared helpers for scene start, turn end, press peak, click frame, and early exit motion.
- [x] Keep the six-frame visual overlap while starting spatial exit motion 4–6 frames earlier.
- [x] Export shared opening/progress background windows for the true timeline.

### `src/Soundtrack.tsx`

- [x] Use the shared click-frame helper.
- [x] Make zero fade a valid “no fade” setting and prevent overlapping/invalid interpolation ranges.

### `src/scenes/Dial.tsx`

- [x] Derive detent numbers/labels from `CHAPTERS`; keep only the physical angles local.
- [x] Separate early spatial exit progress from the short opacity handoff.
- [x] Add a restrained LED pulse on the shared press/click frame.
- [x] Preserve the current non-persistent selector behavior.

### `src/ChapterTimeline.tsx`

- [x] Use shared scene/background timing instead of mirrored magic numbers.
- [x] Increase only the active chapter label to projection-safe size.
- [x] Add a subtle click response derived from the same click frame.

### `src/Root.tsx`

- [x] Replace the fall-through scene selector with an exhaustive `ChapterId` mapping.
- [x] Use the shared chapter-scene-start helper.

## Phase 4 — Review, documentation, and final artifact

### `review.mjs`

- [x] Generate decisive frames from timeline helpers: dial, click, handoff, stable content, and closing.

### `README.md` and docs

- [x] Document the fixed four-person contract, silent mode, fallback-only fields, supported media, and preflight behavior.
- [x] Record accepted/rejected cross-review proposals and the final verification result.

### Acceptance

- [x] `npm run check`
- [x] `npm run preflight`
- [x] Long Chinese project name and long English project name stills.
- [x] Four-person stable/focus stills.
- [x] Four-progress timing/recap stills.
- [x] Numbered-video verification for the second story beat and second progress item.
- [x] Default/zero/overlong fade checks.
- [x] Final full render with H.264 video, AAC audio, 1920×1080, 30fps, under 60 seconds.
- [x] Key frames extracted from the final MP4, not only Studio renders.
- [x] Commit and push; raw BGM remains ignored.

## Phase 5 — Chapter-specific text motion (2026-09-22)

### `docs/REFERENCE-LOCK.md`

- [x] Record the user's flexible motion brief as permission to choose the best-fit effect rather than reproduce a prescribed fan or fly-in.
- [x] Lock the scope to semantic-line motion, sparse CSS 2.5D, stable reading holds, and no new Three.js dependency.

### `src/scenes/Story.tsx`

- [x] Give the problem chapter an asymmetric three-line convergence without changing the final layout.
- [x] Give the solution chapter a restrained shared-axis hinge/fan entrance that fully straightens before the reading hold.
- [x] Keep beat switching, media clocks, final-solution expansion, and text fitting intact.

### `src/scenes/Field.tsx`

- [x] Give the progress number, title, and description a shallow CSS perspective stack.
- [x] Keep four-item timing, local media clocks, recap wipe, and stable text positions intact.

### Deliberate restraint

- [x] Preserve the existing opening handoff, four-person focus behavior, and quiet closing instead of adding a new effect to every scene.
- [x] Keep all motion frame-driven and dependency-free.

### Acceptance

- [x] `npm run check` and `npm run preflight`.
- [x] Review decisive entry and settled frames for problem, solution, and progress.
- [x] Generate a normal-speed preview of all three new entrance families for the design review.
- [x] Yoru reviewed the current carrier and rated it 70/100; preserve it as a paused iteration baseline, not final creative approval.
- [x] Render and inspect the final MP4, including font fallback checks for Chinese, Latin, digits, and punctuation.

## Phase 6 — Material depth, selector ingress, and motion duration (2026-09-22)

### Material system

- [x] Audit which large carriers still read as flat in opening, story, progress, closing, and global surfaces. Exclude the people chapter and placeholder portrait cards.
- [x] Extend the existing raised / lifted / inset hierarchy through shared tokens instead of isolated one-off shadows.
- [x] Balance highlight edges, contact shadows, inset depth, and surface separation; do not globally increase blur or darkness.
- [x] Check the material pass on both cold-porcelain and blue scenes at projection distance.

### Selector ingress

- [x] Add an explicit ingress phase to the shared dial timing instead of letting each `DialCue` appear fully formed.
- [x] Design a small coherent family of ingress transitions from outgoing content into the selector; chapter variation is allowed, random effect switching is not.
- [x] Preserve the temporary-selector rule and the existing six-frame selector-to-content visible overlap.
- [x] Validate light-background and blue-background ingress at normal speed before the final render.

### Text-motion duration

- [x] Retune problem, solution, and today entrances from the current short settle toward an initial 24–32-frame test range.
- [x] Preserve the three distinct motion personalities and return every 2.5D transform to a flat stable state.
- [x] Keep the stable reading hold and total chapter durations; use better acceleration, stagger, and settling rather than uniform slow motion.

### Acceptance

- [x] Produce one normal-speed comparison containing selector ingress plus the three longer text entrances.
- [x] Inspect decisive frames and consecutive-frame strips only for the changed seams.
- [x] Render one full final MP4 after creative direction passes; repeat actual-carrier font fallback checks.

## Phase 7 — Complete tactile carrier audit and opening copy trim (2026-09-22)

### Surface classification

- [x] Audit every remaining direct background in `src/` and distinguish information / state / media carriers from environmental washes, functional lines, status points, physical dial parts, and real media.
- [x] Keep page washes, the full-bleed blue chapter, the true chapter timeline, and thin connectors as environmental or functional surfaces instead of wrapping them in decorative cards.
- [x] Preserve the approved exception: the people chapter and its four placeholder portrait cards remain unchanged until real member media exists.

### Tactile material pass

- [x] Add shared directional material gradients and face-light recipes in `src/design.tsx`; reuse them in Card, Well, Pill, Segmented, Track, Tile, and `MaterialPlate`.
- [x] Give all five Story fallback canvases and their notes / list / steps elements raised, pressed, or inset relationships instead of pure flat fills.
- [x] Give Today's fallback canvas, step blocks, and recap rows the same surface hierarchy on both light and blue backgrounds.
- [x] Bring the isolated `DialTest` display surface into the same material system without changing the main selector mechanics.
- [x] Delete the opening-bottom sentence `一起，把想法往前推一步。` without replacement copy.

## Phase 8 — Inset-first hierarchy (2026-09-22)

### Preference lock

- [x] Record the user's explicit material preference as **inset > raised** in this project's Reference Lock.
- [x] Record the same preference, its semantic use, and its restraint boundary in the source DESIGN system's `SKILL.md` and `README.md`.

### Film application

- [x] Make large presentation plates, Story fallback canvases, list rows, Today's fallback canvas, step blocks, recap rows, and semantic badges predominantly inset / sunken.
- [x] Retain raised / lifted depth for pick-up-able or operable foreground objects such as notes, media cards, the selector, and active thumbs.
- [x] Keep page planes, functional lines, and the people placeholders unchanged.

### Acceptance

- [x] `npm run check`, `npm run preflight`, and `git diff --check`.
- [x] Inspect frames 70 / 330 / 420 / 540 / 640 / 735 / 950 / 1120 / 1295 / 1380 before export.
- [x] Render a full H.264 + AAC carrier and decode it end to end with no ffmpeg error.
- [x] Inspect frames 70 / 330 / 540 / 950 / 1120 / 1295 / 1380 from the exported MP4; confirm the people placeholders remain unchanged.
- [x] Check Chinese, Latin, digits, punctuation, weights, and monospace roles in the exported carrier; no unintended fallback observed.

## Phase 9 — Today checkpoint handoff repair (2026-09-22)

### `src/scenes/Field.tsx` + shared timing

- [x] Move the recap plate and its content from the accidental lower-third resting position into a centered checkpoint composition.
- [x] Keep the existing 35-frame recap budget, finish the reveal after 20 frames, and preserve a 15-frame fully settled reading hold.
- [x] Export the hold duration through the shared browser / preflight timeline contract.

### `src/ChapterTimeline.tsx`

- [x] Keep the true progress line, playhead, timecode, background state, and click pulse on the actual frame.
- [x] Delay only the active chapter label by the shared 10-frame selector ingress so the visible outgoing scene is never cleanly paired with the next chapter name.

### Acceptance

- [x] `npm run check`, `npm run preflight`, and `git diff --check`.
- [x] Inspect source-rendered frames 1264 / 1274 / 1284 / 1295 / 1299 / 1304 / 1309 / 1313.
- [x] Render the 1254–1334 normal-speed handoff excerpt before the final carrier.
- [x] Render and decode the complete H.264 + AAC carrier.
- [x] Inspect frames 1295 / 1299 / 1309 / 1400 from the exported MP4 and repeat the CJK / Latin / mono font-fallback check.

## Phase 10 — Causal handoff, production gate, and four/five-person carriers (2026-09-22)

### Record first

- [x] Record the accepted review decisions in `docs/REFERENCE-LOCK.md` before visual implementation.
- [x] Preserve the rejected scan-line, theatrical timeline, silent-default, and placeholder-portrait-polish directions.

### Four-person master

- [x] Give the Solution selector underline and Story text a shared geometric axis across the existing six-frame overlap.
- [x] Drive the Solution lead / keyword / description from one staged motion engine and preserve a stable reading hold.
- [x] Refine the selector press into a restrained contact → trigger → release curve without moving the shared click frame.
- [x] Add a `demo=false` placeholder hard gate and a concise final-content summary to preflight.
- [x] Run typecheck, preflight, decisive stills, one normal-speed transition preview, a full four-person render, full decode, final-carrier frames, and font-fallback review.

### Five-person derivative

- [x] Add a separate five-person content override and composition; inherit all non-member content from the optimized four-person master.
- [x] Tune only the five-card width, gap, attached identity text, and focus cadence; keep placeholder portrait styling unchanged.
- [x] Render the five-person People chapter preview first, then the complete five-person carrier after the layout passes.
- [x] Verify H.264 + AAC, 1920×1080, 30fps, under 60 seconds, end-to-end decode, and final-carrier font behavior for both versions.
