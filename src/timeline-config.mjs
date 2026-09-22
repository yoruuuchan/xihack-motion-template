export const FPS = 30;
export const DIAL_SCENE_OVERLAP = 6;
export const DIAL_EXIT_MOTION_FRAMES = 11;
export const DIAL_INGRESS_FRAMES = 10;
export const OPENING_TIMELINE_BLUE_END = 66;
export const PROGRESS_CLOSING_WIPE_FRAMES = 35;

export const CHAPTER_DATA = [
  {id: 'team', code: '00', label: '团队 / 项目', durationInFrames: 260, dialFrames: 45, dialTarget: 1},
  {id: 'problem', code: '01', label: '问题', durationInFrames: 202, dialFrames: 30, dialTarget: 2},
  {id: 'solution', code: '02', label: '方案', durationInFrames: 317, dialFrames: 30, dialTarget: 3},
  {id: 'people', code: '03', label: '我们', durationInFrames: 260, dialFrames: 30, dialTarget: 4},
  {id: 'today', code: '04', label: '今天', durationInFrames: 260, dialFrames: 30, dialTarget: 5},
  {id: 'next', code: '05', label: '下一步', durationInFrames: 159, dialFrames: 24, dialTarget: 6},
];

export const TOTAL_DURATION = CHAPTER_DATA.reduce((sum, chapter) => sum + chapter.durationInFrames, 0);
export const chapterStart = (index) => CHAPTER_DATA.slice(0, index).reduce((sum, chapter) => sum + chapter.durationInFrames, 0);
export const chapterSceneStart = (chapter) => chapter.dialFrames - DIAL_SCENE_OVERLAP;
export const chapterSceneDuration = (chapter) => chapter.durationInFrames - chapterSceneStart(chapter);
export const dialTurnEnd = (dialFrames) => Math.max(12, dialFrames - 15);
export const dialPressPeak = (dialFrames) => dialTurnEnd(dialFrames) + 2;
export const dialClickFrame = (index) => chapterStart(index) + dialPressPeak(CHAPTER_DATA[index].dialFrames);
export const dialExitMotionStart = (dialFrames) => dialFrames - DIAL_EXIT_MOTION_FRAMES;
export const dialIngressEnd = (dialFrames) => Math.min(DIAL_INGRESS_FRAMES, dialTurnEnd(dialFrames) - 2);
