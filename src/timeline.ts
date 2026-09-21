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
export const CHAPTERS: readonly Chapter[] = [
  {id: 'team', code: '00', label: '团队 / 项目', durationInFrames: 260, dialFrames: 45, dialTarget: 1},
  {id: 'problem', code: '01', label: '问题', durationInFrames: 202, dialFrames: 30, dialTarget: 2},
  {id: 'solution', code: '02', label: '方案', durationInFrames: 317, dialFrames: 30, dialTarget: 3},
  {id: 'people', code: '03', label: '我们', durationInFrames: 260, dialFrames: 30, dialTarget: 4},
  {id: 'today', code: '04', label: '今天', durationInFrames: 260, dialFrames: 30, dialTarget: 5},
  {id: 'next', code: '05', label: '下一步', durationInFrames: 159, dialFrames: 24, dialTarget: 6},
] as const;

export const DIAL_SCENE_OVERLAP = 6;
export const TOTAL_DURATION = CHAPTERS.reduce((sum, chapter) => sum + chapter.durationInFrames, 0);

export const chapterStart = (index: number) =>
  CHAPTERS.slice(0, index).reduce((sum, chapter) => sum + chapter.durationInFrames, 0);

export const chapterAtFrame = (frame: number) => {
  const found = CHAPTERS.findIndex(
    (_, chapterIndex) => frame < chapterStart(chapterIndex + 1),
  );
  const index = found === -1 ? CHAPTERS.length - 1 : Math.max(0, found);
  return {chapter: CHAPTERS[index], index};
};
