# Local music assets

Music files in this directory are local render inputs and are intentionally ignored by Git.

The current demo expects:

`alanajordan-brazilian-tropicalia-instrumental-01-485592.mp3`

Source: https://pixabay.com/music/funk-brazilian-tropicalia-instrumental-01-485592/

Copy the original file here before running `npm run preflight`, Studio, or a render. To use another track, update `music` in `src/content.json` and keep the replacement audio out of Git as well.

For an intentional silent export, set `music.src` to an empty string. A non-empty path remains a production requirement: preflight checks that the file exists and that `trimStart` leaves enough audio for the complete 48.6-second cut.
