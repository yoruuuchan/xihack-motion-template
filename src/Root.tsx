import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,staticFile} from 'remotion';
import {Opening} from './scenes/Opening';
import {Relay} from './scenes/Relay';
import {Team,Progress} from './scenes/Field';
import {Closing} from './scenes/Closing';
import {DialTest} from './scenes/Dial';
import {DemoStamp,font} from './design';
import data from './content.json';
const Film=()=><AbsoluteFill style={{fontFamily:font}}>
 <Sequence from={0} durationInFrames={240} name="团队 / 项目"><Opening/></Sequence>
 <Sequence from={240} durationInFrames={540} name="问题 / 方案 / 接力"><Relay/></Sequence>
 <Sequence from={780} durationInFrames={420} name="团队实拍"><Team/></Sequence>
 <Sequence from={1200} durationInFrames={420} name="当天进展"><Progress/></Sequence>
 <Sequence from={1620} durationInFrames={180} name="下一步"><Closing/></Sequence>
 {data.music?<Audio src={staticFile(data.music)}/>:null}
 {data.demo?<DemoStamp/>:null}
</AbsoluteFill>;
export const Root=()=> <>
 <Composition id="XiHackRelay" component={Film} width={1920} height={1080} fps={30} durationInFrames={1800}/>
 <Composition id="DialTest" component={DialTest} width={1920} height={1080} fps={30} durationInFrames={240}/>
</>;
