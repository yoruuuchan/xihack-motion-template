import React from 'react';
import {AbsoluteFill,Composition,Sequence} from 'remotion';
import {Opening} from './scenes/Opening';
import {Story} from './scenes/Story';
import {Team,Progress} from './scenes/Field';
import {Closing} from './scenes/Closing';
import {DialCue, DialTest} from './scenes/Dial';
import {DemoStamp,font} from './design';
import {content as data} from './content';
import {ChapterTimeline} from './ChapterTimeline';
import {Soundtrack} from './Soundtrack';
import {CHAPTERS, FPS, TOTAL_DURATION, chapterSceneStart, chapterStart, type ChapterId} from './timeline';

const sceneByChapter = {
  team: (durationInFrames: number) => <Opening durationInFrames={durationInFrames} />,
  problem: (durationInFrames: number) => <Story beatIndices={[0, 1]} durationInFrames={durationInFrames} railLabel="01 / THE PROBLEM" />,
  solution: (durationInFrames: number) => <Story beatIndices={[2, 3, 4]} durationInFrames={durationInFrames} railLabel="02 / THE SOLUTION" />,
  people: (durationInFrames: number) => <Team durationInFrames={durationInFrames} />,
  today: (durationInFrames: number) => <Progress durationInFrames={durationInFrames} />,
  next: (durationInFrames: number) => <Closing durationInFrames={durationInFrames} />,
} satisfies Record<ChapterId, (durationInFrames: number) => React.ReactNode>;

const Film = () => (
  <AbsoluteFill style={{fontFamily: font}}>
    {CHAPTERS.map((chapter, index) => {
      const sceneStart = chapterSceneStart(chapter);
      const sceneDuration = chapter.durationInFrames - sceneStart;
      return (
        <Sequence key={chapter.id} from={chapterStart(index)} durationInFrames={chapter.durationInFrames} name={`${chapter.code} / ${chapter.label}`}>
          <Sequence from={sceneStart} durationInFrames={sceneDuration} name={`${chapter.label} / SCENE`}>
            {sceneByChapter[chapter.id](sceneDuration)}
          </Sequence>
          <Sequence durationInFrames={chapter.dialFrames} name={`${chapter.label} / DIAL`}>
            <DialCue chapterId={chapter.id} fromIndex={Math.max(0, chapter.dialTarget - 1)} toIndex={chapter.dialTarget} durationInFrames={chapter.dialFrames} />
          </Sequence>
        </Sequence>
      );
    })}
    <Soundtrack />
    <ChapterTimeline />
    {data.demo ? <DemoStamp /> : null}
  </AbsoluteFill>
);
export const Root=()=> <>
 <Composition id="XiHackTeamIntro" component={Film} width={1920} height={1080} fps={FPS} durationInFrames={TOTAL_DURATION}/>
 <Composition id="DialTest" component={DialTest} width={1920} height={1080} fps={FPS} durationInFrames={240}/>
</>;
