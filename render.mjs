import {bundle} from '@remotion/bundler';
import {selectComposition,renderMedia} from '@remotion/renderer';
import path from 'node:path';
const browserExecutable=process.env.REMOTION_BROWSER_EXECUTABLE;
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('out/bundle')});
const composition=await selectComposition({serveUrl,id:'XiHackTeamIntro',browserExecutable});
let last=-1;
await renderMedia({serveUrl,composition,browserExecutable,codec:'h264',crf:19,concurrency:2,timeoutInMilliseconds:120000,outputLocation:'out/xihack-team-intro.mp4',onProgress:({progress})=>{const percent=Math.floor(progress*10)*10;if(percent!==last){last=percent;console.log(`Render ${percent}%`);}}});
console.log('Complete: out/xihack-team-intro.mp4');
