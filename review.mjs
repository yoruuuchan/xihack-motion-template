import {bundle} from '@remotion/bundler';
import {openBrowser, selectComposition, renderStill} from '@remotion/renderer';
import path from 'node:path';
const executable=process.env.REMOTION_BROWSER_EXECUTABLE;
const frames=process.argv.slice(2).map(Number);
const list=frames.length?frames:[55,175,290,500,710,950,1400,1740];
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('out/bundle')});
const browser=await openBrowser('chrome',{browserExecutable:executable});
try {
 const composition=await selectComposition({serveUrl,id:'XiHackRelay',puppeteerInstance:browser});
 for(const frame of list) {
  await renderStill({serveUrl,composition,frame,scale:1,output:`out/review-${frame}.png`,puppeteerInstance:browser});
  console.log(`Reviewed frame ${frame}`);
 }
} finally {await browser.close({silent:true});}
