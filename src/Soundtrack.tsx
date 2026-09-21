import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {content as data} from './content';
import {CHAPTERS, TOTAL_DURATION, chapterStart} from './timeline';

const clickFrame = (index: number) => {
  const chapter = CHAPTERS[index];
  const turnEnd = Math.max(12, chapter.dialFrames - 15);
  return chapterStart(index) + turnEnd + 2;
};

export const Soundtrack = () => {
  const {fps} = useVideoConfig();
  const trimBefore = Math.round(data.music.trimStart * fps);
  const fadeInFrames = Math.max(1, Math.round(data.music.fadeIn * fps));
  const fadeOutFrames = Math.max(1, Math.round(data.music.fadeOut * fps));

  return (
    <>
      {data.music.src ? (
        <Audio
          src={staticFile(data.music.src)}
          trimBefore={trimBefore}
          trimAfter={trimBefore + TOTAL_DURATION}
          volume={(frame) =>
            data.music.volume *
            interpolate(
              frame,
              [0, fadeInFrames, TOTAL_DURATION - fadeOutFrames, TOTAL_DURATION - 1],
              [0, 1, 1, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            )
          }
        />
      ) : null}
      {CHAPTERS.map((chapter, index) => (
        <Sequence key={chapter.id} from={clickFrame(index)} durationInFrames={6} layout="none" name={`${chapter.label} / CLICK`}>
          <Audio src={staticFile('sfx/dial-click.wav')} volume={0.46} />
        </Sequence>
      ))}
    </>
  );
};
