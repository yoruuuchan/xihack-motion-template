import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,staticFile} from 'remotion';
import {Opening} from './scenes/Opening';
import {Story} from './scenes/Story';
import {Team,Progress} from './scenes/Field';
import {Closing} from './scenes/Closing';
import {DialTest} from './scenes/Dial';
import {DemoStamp,font} from './design';
import {content as data} from './content';
const Film=()=><AbsoluteFill style={{fontFamily:font}}>
 <Sequence from={0} durationInFrames={240} name="团队 / 项目"><Opening/></Sequence>
 <Sequence from={240} durationInFrames={540} name="问题 / 洞察 / 方案"><Story/></Sequence>
 <Sequence from={780} durationInFrames={420} name="团队实拍"><Team/></Sequence>
 <Sequence from={1200} durationInFrames={420} name="当天进展"><Progress/></Sequence>
 <Sequence from={1620} durationInFrames={180} name="下一步"><Closing/></Sequence>
 {data.music.src?<Audio src={staticFile(data.music.src)} volume={data.music.volume}/>:null}
 {data.demo?<DemoStamp/>:null}
</AbsoluteFill>;
export const Root=()=> <>
 <Composition id="XiHackTeamIntro" component={Film} width={1920} height={1080} fps={30} durationInFrames={1800}/>
 <Composition id="DialTest" component={DialTest} width={1920} height={1080} fps={30} durationInFrames={240}/>
</>;
