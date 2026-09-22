# XiHack Motion Review Candidate — 2026-09-22

This prerelease carries the complete 48.6-second demo film for visual, motion, narrative, and template review. Watch the MP4 at normal speed before reading implementation details.

## Download

- Release: <https://github.com/yoruuuchan/xihack-motion-template/releases/tag/review-candidate-2026-09-22>
- MP4 asset: <https://github.com/yoruuuchan/xihack-motion-template/releases/download/review-candidate-2026-09-22/xihack-team-intro-review.mp4>
- Review prompt: [`EXTERNAL-REVIEW-PROMPT.md`](EXTERNAL-REVIEW-PROMPT.md)

## Carrier metadata

- Visual implementation: `8b3915f` (`Fix the Today checkpoint handoff`)
- H.264 video + AAC audio
- 1920×1080, 30fps, 48 kHz stereo
- Duration: 48.618667 seconds
- Size: 8,305,733 bytes
- SHA-256: `9E69E176C2DEACED260D0E60391A6572D8C62E4074391C61692909136FCB5F8B`

## Candidate scope

- Six chapters: team/project, problem, solution, people, today, next.
- The selector is a temporary navigation action, not a persistent UI badge.
- The bottom ruler is driven by actual chapter frames.
- The material hierarchy prefers inset / sunken over raised / lifted.
- Team size is fixed at four; portraits and project content are still demonstration placeholders.
- The runtime intentionally stays below one minute instead of padding to 60 seconds.

The latest repair centers the Today checkpoint, gives it a settled reading hold, and synchronizes the ruler's active chapter with the visible selector ingress. The full carrier passed TypeScript, content/media preflight, full decode, representative exported-frame review, and actual-carrier font checks.

The BGM is Alanajordan's `Brazilian Tropicalia Instrumental 01`; source and local-asset boundaries are documented in [`public/music/README.md`](../public/music/README.md). The raw audio file remains outside Git.
