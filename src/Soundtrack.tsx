import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {content as data} from './content';
import {CHAPTERS, TOTAL_DURATION, dialClickFrame} from './timeline';

export const Soundtrack = () => {
  const {fps} = useVideoConfig();
  const trimBefore = Math.round(data.music.trimStart * fps);
  const fadeInFrames = Math.min(TOTAL_DURATION - 1, Math.round(data.music.fadeIn * fps));
  const fadeOutFrames = Math.min(TOTAL_DURATION - 1, Math.round(data.music.fadeOut * fps));

  const volumeAtFrame = (frame: number) => {
    const fadeIn = fadeInFrames === 0
      ? 1
      : interpolate(frame, [0, fadeInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const fadeOut = fadeOutFrames === 0
      ? 1
      : interpolate(frame, [TOTAL_DURATION - fadeOutFrames, TOTAL_DURATION - 1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return data.music.volume * Math.min(fadeIn, fadeOut);
  };

  return (
    <>
      {data.music.src ? (
        <Audio
          src={staticFile(data.music.src)}
          trimBefore={trimBefore}
          trimAfter={trimBefore + TOTAL_DURATION}
          volume={volumeAtFrame}
        />
      ) : null}
      {CHAPTERS.map((chapter, index) => (
        <Sequence key={chapter.id} from={dialClickFrame(index)} durationInFrames={6} layout="none" name={`${chapter.label} / CLICK`}>
          <Audio src={staticFile('sfx/dial-click.wav')} volume={0.46} />
        </Sequence>
      ))}
    </>
  );
};
