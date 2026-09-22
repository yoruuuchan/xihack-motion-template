# XiHack Motion Four/Five-Person Candidate — 2026-09-23

This prerelease carries the optimized four-person master and its explicit five-person derivative. Both are complete 48.6-second demo films for visual, motion, narrative, and template review. Watch the four-person MP4 at normal speed first; then use the five-person film to judge the People chapter adaptation.

## Download

- Release: <https://github.com/yoruuuchan/xihack-motion-template/releases/tag/four-five-candidate-2026-09-23>
- Four-person MP4: <https://github.com/yoruuuchan/xihack-motion-template/releases/download/four-five-candidate-2026-09-23/xihack-team-intro-4p-optimized.mp4>
- Five-person MP4: <https://github.com/yoruuuchan/xihack-motion-template/releases/download/four-five-candidate-2026-09-23/xihack-team-intro-5p-optimized.mp4>
- Review prompt: [`EXTERNAL-REVIEW-PROMPT.md`](EXTERNAL-REVIEW-PROMPT.md)

## Carrier metadata

- Visual implementation: `0fea80a` (`Add causal handoff and five-person variant`)
- Both: H.264 video + AAC audio; 1920×1080; 30fps; 48 kHz stereo; 48.618667 seconds
- Four-person size: 8,128,744 bytes
- Four-person SHA-256: `AE2ACADFB5FB9AB3B47835E7CC884C68E6383FAE88E91CB4BCDDBBD155202341`
- Five-person size: 8,248,967 bytes
- Five-person SHA-256: `929CF9D47D153DABF1A96B4EC3E0911E832190A94BB072EDE2BB22FB57F1DAF7`

## Candidate scope

- Six chapters: team/project, problem, solution, people, today, next.
- The selector is a temporary navigation action, not a persistent UI badge.
- The bottom ruler is driven by actual chapter frames.
- The material hierarchy prefers inset / sunken over raised / lifted.
- The four-person master and five-person derivative are separate authored compositions; portraits and project content are still demonstration placeholders.
- The runtime intentionally stays below one minute instead of padding to 60 seconds.

The latest pass lets the Solution selector underline become the Story chapter's shared motion axis, drives its text hierarchy from one staged engine, refines the selector press, and adds a production placeholder gate. The five-person composition changes only its member list, five-card dimensions, attached identity text, and focus cadence. Both carriers passed TypeScript, variant-specific content/media preflight, full decode, representative exported-frame review, and actual-carrier font checks.

The BGM is Alanajordan's `Brazilian Tropicalia Instrumental 01`; source and local-asset boundaries are documented in [`public/music/README.md`](../public/music/README.md). The raw audio file remains outside Git.
