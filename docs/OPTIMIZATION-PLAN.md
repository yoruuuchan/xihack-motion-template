# XiHack Motion Template — Optimization Plan

Baseline: `main @ 36461e3`

Created: 2026-09-21
Execution rule: work file by file, keep this checklist current, and render only after the decisive seams pass.

## Locked decisions

- [x] Team size is exactly **4 people**. Do not build 1–6-person layout branches.
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
