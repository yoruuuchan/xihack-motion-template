import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,staticFile} from 'remotion';
import {Opening} from './scenes/Opening';
import {Story} from './scenes/Story';
import {Team,Progress} from './scenes/Field';
import {Closing} from './scenes/Closing';
import {DialCue, DialTest} from './scenes/Dial';
import {DemoStamp,font} from './design';
import {content as data} from './content';
import {ChapterTimeline} from './ChapterTimeline';
import {CHAPTERS, DIAL_SCENE_OVERLAP, TOTAL_DURATION, chapterStart} from './timeline';

const chapterScene = (id: (typeof CHAPTERS)[number]['id'], durationInFrames: number) => {
  if (id === 'team') return <Opening durationInFrames={durationInFrames} />;
  if (id === 'problem') return <Story beatIndices={[0, 1]} durationInFrames={durationInFrames} railLabel="01 / THE PROBLEM" />;
  if (id === 'solution') return <Story beatIndices={[2, 3, 4]} durationInFrames={durationInFrames} railLabel="02 / THE SOLUTION" />;
  if (id === 'people') return <Team durationInFrames={durationInFrames} />;
  if (id === 'today') return <Progress durationInFrames={durationInFrames} />;
  return <Closing durationInFrames={durationInFrames} />;
};

const Film = () => (
  <AbsoluteFill style={{fontFamily: font}}>
    {CHAPTERS.map((chapter, index) => {
      const sceneStart = chapter.dialFrames - DIAL_SCENE_OVERLAP;
      const sceneDuration = chapter.durationInFrames - sceneStart;
      return (
        <Sequence key={chapter.id} from={chapterStart(index)} durationInFrames={chapter.durationInFrames} name={`${chapter.code} / ${chapter.label}`}>
          <Sequence from={sceneStart} durationInFrames={sceneDuration} name={`${chapter.label} / SCENE`}>
            {chapterScene(chapter.id, sceneDuration)}
          </Sequence>
          <Sequence durationInFrames={chapter.dialFrames} name={`${chapter.label} / DIAL`}>
            <DialCue fromIndex={Math.max(0, chapter.dialTarget - 1)} toIndex={chapter.dialTarget} durationInFrames={chapter.dialFrames} />
          </Sequence>
        </Sequence>
      );
    })}
    {data.music.src ? <Audio src={staticFile(data.music.src)} volume={data.music.volume} /> : null}
    <ChapterTimeline />
    {data.demo ? <DemoStamp /> : null}
  </AbsoluteFill>
);
export const Root=()=> <>
 <Composition id="XiHackTeamIntro" component={Film} width={1920} height={1080} fps={30} durationInFrames={TOTAL_DURATION}/>
 <Composition id="DialTest" component={DialTest} width={1920} height={1080} fps={30} durationInFrames={240}/>
</>;
