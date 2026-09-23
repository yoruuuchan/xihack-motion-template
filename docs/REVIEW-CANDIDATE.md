# XiHack Motion Scene-Return Candidate — 2026-09-23

This prerelease carries the four-person master and its explicit five-person derivative after the page-to-selector return pass. Both are complete 48.6-second demo films. Watch the four-person MP4 at normal speed first, especially its five scene-to-dial seams; then use the five-person film to judge the People chapter and its return into Today.

## Download

- Release: <https://github.com/yoruuuchan/xihack-motion-template/releases/tag/scene-return-candidate-2026-09-23>
- Four-person MP4: <https://github.com/yoruuuchan/xihack-motion-template/releases/download/scene-return-candidate-2026-09-23/xihack-team-intro-4p-scene-return.mp4>
- Five-person MP4: <https://github.com/yoruuuchan/xihack-motion-template/releases/download/scene-return-candidate-2026-09-23/xihack-team-intro-5p-scene-return.mp4>
- Preceding dual candidate for A/B: <https://github.com/yoruuuchan/xihack-motion-template/releases/tag/four-five-candidate-2026-09-23>
- Review prompt: [`EXTERNAL-REVIEW-PROMPT.md`](EXTERNAL-REVIEW-PROMPT.md)

## Carrier metadata

- Both: H.264 video + AAC audio; 1920×1080; 30fps; 48 kHz stereo; 48.618667 seconds
- Four-person size: 8,995,652 bytes
- Four-person SHA-256: `1E139C3816F8A0B6433BE3056B5528E2F42233336CFE2958F1498E3F0EC5084A`
- Five-person size: 9,095,007 bytes
- Five-person SHA-256: `D6CB311A0EE394B04A6C9A1C28EF6876DB5503AA2230D933EABD60AC9FC81BCD`

## Candidate scope

- Six chapters: team/project, problem, solution, people, today, next.
- The selector is a temporary navigation action, not a persistent UI badge.
- The bottom ruler is driven by actual chapter frames.
- The material hierarchy prefers inset / sunken over raised / lifted.
- The four-person master and five-person derivative are separate authored compositions; portraits and project content are still demonstration placeholders.
- The runtime intentionally stays below one minute instead of padding to 60 seconds.

The new pass makes the previous full scene contract toward the selector during each of the five returns. The page lifts from the background, follows a short curved path, narrows into the dial, and fades only near arrival. The dial and its chapter title form underneath; the bottom ruler's progress and timecode remain frame-accurate while the active chapter label changes after the return. The first boot and selector-to-content overlap remain as before. The same motion component drives the four- and five-person versions, including the five-card People exit.

Both carriers passed TypeScript, variant-specific content/media preflight, full decode, representative exported-frame review, and actual-carrier font checks. Preview excerpts exist locally for the four-person Opening → Problem and Today → Next seams and the five-person People → Today seam. Final aesthetic approval still belongs to a normal-speed human viewing; the source and frame checks alone do not establish it.

The BGM is Alanajordan's `Brazilian Tropicalia Instrumental 01`; source and local-asset boundaries are documented in [`public/music/README.md`](../public/music/README.md). The raw audio file remains outside Git.
