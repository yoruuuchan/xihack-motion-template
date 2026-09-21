import {CHAPTER_DATA, DIAL_EXIT_MOTION_FRAMES, DIAL_SCENE_OVERLAP, FPS, OPENING_TIMELINE_BLUE_END, PROGRESS_CLOSING_WIPE_FRAMES, TOTAL_DURATION, chapterSceneDuration, chapterSceneStart, chapterStart, dialClickFrame, dialExitMotionStart, dialPressPeak, dialTurnEnd} from './timeline-config.mjs';

export {DIAL_EXIT_MOTION_FRAMES, DIAL_SCENE_OVERLAP, FPS, OPENING_TIMELINE_BLUE_END, PROGRESS_CLOSING_WIPE_FRAMES, TOTAL_DURATION, chapterSceneDuration, chapterSceneStart, chapterStart, dialClickFrame, dialExitMotionStart, dialPressPeak, dialTurnEnd};

export type ChapterId = 'team' | 'problem' | 'solution' | 'people' | 'today' | 'next';

export type Chapter = {
  id: ChapterId;
  code: string;
  label: string;
  durationInFrames: number;
  dialFrames: number;
  dialTarget: number;
};

// First music-locked cut: source audio 00:56.03–01:44.63 at ~123 BPM.
// Boundaries follow detected bar/arrangement changes while preserving reading holds.
export const CHAPTERS = CHAPTER_DATA as readonly Chapter[];

export const chapterAtFrame = (frame: number) => {
  const found = CHAPTERS.findIndex(
    (_, chapterIndex) => frame < chapterStart(chapterIndex + 1),
  );
  const index = found === -1 ? CHAPTERS.length - 1 : Math.max(0, found);
  return {chapter: CHAPTERS[index], index};
};
