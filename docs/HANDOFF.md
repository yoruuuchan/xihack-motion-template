# XiHack Motion Template — Continuation Handoff

Updated: 2026-09-22

## Current status

- Yoru's current creative assessment is **70/100**: good enough to pause and preserve as the next iteration baseline, but not final creative approval.
- The latest motion implementation is commit `33de6ac` (`Polish chapter-specific text motion`) on `main`.
- Repository: `git@github.com:yoruuuchan/xihack-motion-template.git`.
- The repository was clean and synchronized with `origin/main` when this handoff was written.
- Do not restart the design direction or reintroduce rejected experiments in a new session. Continue from the current main branch and the locks below.

## Latest creative feedback

These three points supersede the previous next-pass ordering:

1. The neumorphic / skeuomorphic feeling is still concentrated in buttons and controls. Other carriers remain too flat; the next material pass must extend a coherent raised / inset / contact relationship across panels, media wells, cards, rails, and large scene surfaces.
2. The selector has chapter-specific exit motion but effectively appears without an entrance transition. Give each return to the selector an intentional handoff from the preceding content, using a small family of different ingress types while keeping the selector temporary.
3. The three new text-motion families settle too quickly at normal speed. Lengthen their readable motion phase; do not merely slow every interpolation or consume the stable reading hold.

Do not interpret point 1 as “increase every shadow.” Strengthen material hierarchy through coordinated highlights, contact shadows, inset depth, edge response, and surface separation. Keep the image crisp enough for projection.

## Latest verified carrier

- Local file: `out/xihack-team-intro.mp4` (ignored by Git).
- H.264 + AAC, 1920×1080, 30fps, 48 kHz stereo.
- Container duration: `48.618667s`.
- Size: `7,181,794 bytes`.
- SHA-256: `44E7B5FB8A7F8B0BE1354AB077238BAA0A871E27AA0166A2ECC64DA218C24A4B`.
- Normal-speed motion excerpt: `out/text-motion-preview.mp4` (ignored by Git).
- Local BGM is present at `public/music/alanajordan-brazilian-tropicalia-instrumental-01-485592.mp3` and intentionally excluded from Git.

The final MP4 itself has been checked for Chinese, Latin, digits, punctuation, weights, and monospace roles. No unintended font fallback was observed in this carrier.

## Read first in the next session

1. `docs/HANDOFF.md`
2. `docs/REFERENCE-LOCK.md`
3. `docs/REVIEW.md`, especially rounds 6–9
4. `docs/OPTIMIZATION-PLAN.md`, especially Phase 5
5. `docs/WORKFLOW-IMPROVEMENTS.md`
6. `README.md` and `src/content.json`

## Locked decisions

- No generated placeholder team logo. Identity is carried by team and project names until a real logo exists.
- The rule is **under one minute**, not exactly one minute. Current duration follows the selected musical phrase and reading rhythm.
- The rotary selector is an action: turn, click, enter the selected chapter, then leave. It must not remain on screen as persistent decoration.
- The bottom element is a real chapter timeline driven by actual frames, not an ornamental progress bar.
- Content is project-agnostic: five story slots cover problem, insight, solution, prototype, and value.
- Team size is fixed at four for this event.
- Problem, solution, and today may use different text-motion personalities; opening, people, and closing remain quieter by design.
- 2.5D is occasional and shallow. Stable text returns to a flat, readable layout.
- The visible dial/content overlap remains six frames. Spatial motion may begin earlier, but do not restore long double-title overlap.
- Final delivery requires checking fonts in the exported carrier, not only CSS or Studio.

## Rejected or deferred directions

- Do not restore the deleted Core/RIFT experiment or the generated team mark.
- Do not make the dial a persistent chapter badge.
- Do not add a circular portal, forced blackout ending, arbitrary scene builder, or dependency upgrade merely for novelty.
- Do not promote this film to a gold example yet. It has a 70/100 paused-baseline assessment and still uses demonstration content.

## Highest-value next iteration

Start with the latest three-point creative feedback, using representative high-density content if real event material is not yet available:

1. Run a scene-wide material-depth pass so that the large content carriers belong to the same tactile system as the buttons and dial.
2. Design selector ingress transitions and their causal handoff from the outgoing chapter; use a coherent family rather than six unrelated tricks.
3. Extend and retune the existing problem / solution / today text entrances, preserving their different personalities and the later reading hold.

After those three items, replace demonstration people/progress/story media with real photos, whiteboards, recordings, and prototype footage; then decide how much raw on-site texture the today chapter should retain.

Do not start the next pass by changing colors, adding decorative UI, or expanding the runtime.

## Resume commands

```powershell
git pull --ff-only
npm install        # only if node_modules is absent or invalid
npm run preflight
npm run studio
```

Before another full render, update the Reference Lock for any new visual proposal, check only the decisive seams at normal speed, and then run one final export plus actual-carrier font verification.
