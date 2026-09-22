import {bundle} from '@remotion/bundler';
import {openBrowser, selectComposition, renderStill} from '@remotion/renderer';
import path from 'node:path';
import {CHAPTER_DATA, TOTAL_DURATION, chapterSceneStart, chapterStart, dialClickFrame} from './src/timeline-config.mjs';
const executable=process.env.REMOTION_BROWSER_EXECUTABLE;
const compositionId=process.env.REVIEW_COMPOSITION || 'XiHackTeamIntro';
const frames=process.argv.slice(2).map(Number);
const defaultFrames = [
  12,
  ...CHAPTER_DATA.flatMap((chapter, index) => [
    dialClickFrame(index),
    chapterStart(index) + chapterSceneStart(chapter) + 18,
  ]),
  chapterStart(1) + chapterSceneStart(CHAPTER_DATA[1]) - 4,
  chapterStart(1) + chapterSceneStart(CHAPTER_DATA[1]),
  chapterStart(1) + chapterSceneStart(CHAPTER_DATA[1]) + 4,
  TOTAL_DURATION - 23,
];
const list=frames.length?frames:[...new Set(defaultFrames)].sort((a,b)=>a-b);
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('out/bundle')});
const browser=await openBrowser('chrome',{browserExecutable:executable});
try {
 const composition=await selectComposition({serveUrl,id:compositionId,puppeteerInstance:browser});
 for(const frame of list) {
  await renderStill({serveUrl,composition,frame,scale:1,output:`out/review-${frame}.png`,puppeteerInstance:browser});
  console.log(`Reviewed frame ${frame}`);
 }
} finally {await browser.close({silent:true});}
