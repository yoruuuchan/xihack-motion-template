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

## Phase 6 — Material depth, selector ingress, and motion duration (future pass)

### Material system

- [ ] Audit which large carriers still read as flat: scene panels, media wells, cards, rails, and background surfaces.
- [ ] Extend the existing raised / lifted / inset hierarchy through shared tokens instead of isolated one-off shadows.
- [ ] Balance highlight edges, contact shadows, inset depth, and surface separation; do not globally increase blur or darkness.
- [ ] Check the material pass on both cold-porcelain and blue scenes at projection distance.

### Selector ingress

- [ ] Add an explicit ingress phase to the shared dial timing instead of letting each `DialCue` appear fully formed.
- [ ] Design a small coherent family of ingress transitions from outgoing content into the selector; chapter variation is allowed, random effect switching is not.
- [ ] Preserve the temporary-selector rule and the existing six-frame selector-to-content visible overlap.
- [ ] Validate at least one light-background and one blue-background ingress at normal speed before rolling it across all chapters.

### Text-motion duration

- [ ] Retune problem, solution, and today entrances from the current short settle toward an initial 24–32-frame test range.
- [ ] Preserve the three distinct motion personalities and return every 2.5D transform to a flat stable state.
- [ ] Keep the stable reading hold and total chapter durations; use better acceleration, stagger, and settling rather than uniform slow motion.

### Acceptance

- [ ] Produce one normal-speed comparison containing selector ingress plus the three longer text entrances.
- [ ] Inspect decisive frames and consecutive-frame strips only for the changed seams.
- [ ] Render one full final MP4 after creative direction passes; repeat actual-carrier font fallback checks.
