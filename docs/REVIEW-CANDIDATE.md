# XiHack Motion Today-Rhythm Candidate — 2026-09-23

This prerelease carries the four-person master and its explicit five-person derivative after the three-beat Today rhythm pass. Both are complete 48.6-second demo films. Watch the four-person MP4 at normal speed first, especially Today at 35.4–43.3 seconds; then use the five-person film to judge the People chapter and its return into Today.

## Download

- Release: <https://github.com/yoruuuchan/xihack-motion-template/releases/tag/today-rhythm-candidate-2026-09-23>
- Four-person MP4: <https://github.com/yoruuuchan/xihack-motion-template/releases/download/today-rhythm-candidate-2026-09-23/xihack-team-intro-4p-today-rhythm.mp4>
- Five-person MP4: <https://github.com/yoruuuchan/xihack-motion-template/releases/download/today-rhythm-candidate-2026-09-23/xihack-team-intro-5p-today-rhythm.mp4>
- Preceding dual candidate for A/B: <https://github.com/yoruuuchan/xihack-motion-template/releases/tag/scene-return-candidate-2026-09-23>
- Review prompt: [`EXTERNAL-REVIEW-PROMPT.md`](EXTERNAL-REVIEW-PROMPT.md)

## Carrier metadata

- Both: H.264 video + AAC audio; 1920×1080; 30fps; 48 kHz stereo; 48.618667 seconds
- Four-person size: 8,796,642 bytes
- Four-person SHA-256: `1D87BFA7C7B7D7EEA5FF825D077B7BFBA28315BE4B0B4D3164E862198E7172FA`
- Five-person size: 8,895,856 bytes
- Five-person SHA-256: `79DB53F3CE5F59BF9B6912D4267A735B0A57C11BFFF471B80A27446C5CA249DC`

## Candidate scope

- Six chapters: team/project, problem, solution, people, today, next.
- The selector is a temporary navigation action, not a persistent UI badge.
- The bottom ruler is driven by actual chapter frames.
- The material hierarchy prefers inset / sunken over raised / lifted.
- The four-person master and five-person derivative are separate authored compositions; portraits and project content are still demonstration placeholders.
- The runtime intentionally stays below one minute instead of padding to 60 seconds.

The new pass changes only Today’s internal three-item progression. Its first item establishes a locked three-point view; the middle item enlarges its evidence slot and unfolds the corresponding text; the final item settles into a quieter result list before the existing checkpoint takes over. At item boundaries, the outgoing card remains briefly visible while the next arrives. The preceding scene-to-selector return, bottom ruler, six chapter boundaries, BGM, and four/five-person People compositions remain intact.

Both carriers passed TypeScript, variant-specific content/media preflight, full decode, representative exported-frame review, and actual-carrier font checks. A Today excerpt exists locally at `out/today-three-beat-variation-preview.mp4`. Browser policy prevented the agent from playing that local file in-browser, so the rhythm still needs normal-speed human review; source and frame checks alone do not establish aesthetic approval.

The BGM is Alanajordan's `Brazilian Tropicalia Instrumental 01`; source and local-asset boundaries are documented in [`public/music/README.md`](../public/music/README.md). The raw audio file remains outside Git.
