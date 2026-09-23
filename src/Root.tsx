import React from 'react';
import {AbsoluteFill,Composition,Freeze,Sequence} from 'remotion';
import {Opening} from './scenes/Opening';
import {Story} from './scenes/Story';
import {Team,Progress} from './scenes/Field';
import {Closing} from './scenes/Closing';
import {DialCue, DialTest} from './scenes/Dial';
import {DemoStamp,font} from './design';
import {content as data, contentFive, type Member} from './content';
import {ChapterTimeline} from './ChapterTimeline';
import {Soundtrack} from './Soundtrack';
import {CHAPTERS, FPS, TOTAL_DURATION, chapterSceneDuration, chapterSceneStart, chapterStart, type ChapterId} from './timeline';

const sceneByChapter = {
  team: (durationInFrames: number) => <Opening durationInFrames={durationInFrames} />,
  problem: (durationInFrames: number) => <Story beatIndices={[0, 1]} durationInFrames={durationInFrames} railLabel="01 / THE PROBLEM" />,
  solution: (durationInFrames: number) => <Story beatIndices={[2, 3, 4]} durationInFrames={durationInFrames} railLabel="02 / THE SOLUTION" />,
  people: (durationInFrames: number, members: Member[]) => <Team durationInFrames={durationInFrames} members={members} />,
  today: (durationInFrames: number) => <Progress durationInFrames={durationInFrames} />,
  next: (durationInFrames: number) => <Closing durationInFrames={durationInFrames} />,
} satisfies Record<ChapterId, (durationInFrames: number, members: Member[]) => React.ReactNode>;

type FilmProps = {teamSize: 4 | 5};

const Film: React.FC<FilmProps> = ({teamSize}) => {
  const members = teamSize === 5 ? contentFive.members : data.members;
  return <AbsoluteFill style={{fontFamily: font}}>
    {CHAPTERS.map((chapter, index) => {
      const sceneStart = chapterSceneStart(chapter);
      const sceneDuration = chapter.durationInFrames - sceneStart;
      const previous = index > 0 ? CHAPTERS[index - 1] : null;
      const previousSceneDuration = previous ? chapterSceneDuration(previous) : 0;
      return (
        <Sequence key={chapter.id} from={chapterStart(index)} durationInFrames={chapter.durationInFrames} name={`${chapter.code} / ${chapter.label}`}>
          <Sequence from={sceneStart} durationInFrames={sceneDuration} name={`${chapter.label} / SCENE`}>
            {sceneByChapter[chapter.id](sceneDuration, members)}
          </Sequence>
          <Sequence durationInFrames={chapter.dialFrames} name={`${chapter.label} / DIAL`}>
            <DialCue
              chapterId={chapter.id}
              fromIndex={Math.max(0, chapter.dialTarget - 1)}
              toIndex={chapter.dialTarget}
              durationInFrames={chapter.dialFrames}
              previousScene={previous ? (
                <Freeze frame={previousSceneDuration - 1}>
                  {sceneByChapter[previous.id](previousSceneDuration, members)}
                </Freeze>
              ) : undefined}
            />
          </Sequence>
        </Sequence>
      );
    })}
    <Soundtrack />
    <ChapterTimeline />
    {data.demo ? <DemoStamp /> : null}
  </AbsoluteFill>;
};
export const Root=()=> <>
 <Composition id="XiHackTeamIntro" component={Film} defaultProps={{teamSize: 4}} width={1920} height={1080} fps={FPS} durationInFrames={TOTAL_DURATION}/>
 <Composition id="XiHackTeamIntro5P" component={Film} defaultProps={{teamSize: 5}} width={1920} height={1080} fps={FPS} durationInFrames={TOTAL_DURATION}/>
 <Composition id="DialTest" component={DialTest} width={1920} height={1080} fps={FPS} durationInFrames={240}/>
</>;
