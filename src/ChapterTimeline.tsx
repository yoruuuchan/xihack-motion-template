import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, font, mono} from './design';
import {CHAPTERS, DIAL_INGRESS_FRAMES, OPENING_TIMELINE_BLUE_END, PROGRESS_CLOSING_WIPE_FRAMES, TOTAL_DURATION, chapterAtFrame, chapterSceneDuration, chapterSceneStart, chapterStart, dialPressPeak} from './timeline';

const formatTime = (seconds: number) => {
  const safe = Math.max(0, seconds);
  const whole = Math.floor(safe);
  const tenths = Math.floor((safe - whole) * 10 + 1e-6);
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}.${tenths}`;
};

export const ChapterTimeline = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {chapter, index: timelineIndex} = chapterAtFrame(frame);
  const displayFrame = Math.max(0, frame - DIAL_INGRESS_FRAMES);
  const {index: activeIndex} = chapterAtFrame(displayFrame);
  const localFrame = frame - chapterStart(timelineIndex);
  const sceneStart = chapterSceneStart(chapter);
  const sceneFrame = localFrame - sceneStart;
  const progressSceneEnd = chapterSceneDuration(chapter) - PROGRESS_CLOSING_WIPE_FRAMES + 1;
  const onOpeningBlue = chapter.id === 'team' && sceneFrame >= 0 && sceneFrame < OPENING_TIMELINE_BLUE_END;
  const onProgressBlue = chapter.id === 'today' && sceneFrame >= 0 && sceneFrame < progressSceneEnd;
  const onBlue = onOpeningBlue || onProgressBlue;
  const ink = onBlue ? 'rgba(255,255,255,0.94)' : C.ink;
  const quiet = onBlue ? 'rgba(255,255,255,0.48)' : 'rgba(14,21,37,0.38)';
  const line = onBlue ? 'rgba(255,255,255,0.28)' : 'rgba(14,21,37,0.16)';
  const progress = interpolate(frame, [0, TOTAL_DURATION - 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const clickPeak = dialPressPeak(chapter.dialFrames);
  const clickPulse = interpolate(localFrame, [clickPeak - 2, clickPeak, clickPeak + 5], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', left: 80, right: 80, bottom: 30, height: 78, color: ink, fontFamily: mono, zIndex: 50}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 30, height: 2, background: line}} />
      <div style={{position: 'absolute', left: 0, top: 30, width: `${progress * 100}%`, height: 2, background: onBlue ? 'white' : C.teal}} />
      {CHAPTERS.map((item, index) => {
        const start = chapterStart(index);
        const left = (start / TOTAL_DURATION) * 100;
        const isLast = index === CHAPTERS.length - 1;
        return (
          <React.Fragment key={item.id}>
            <div
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: 22 - (index === activeIndex ? clickPulse * 3 : 0),
                width: 2 + (index === activeIndex ? clickPulse * 2 : 0),
                height: 18 + (index === activeIndex ? clickPulse * 6 : 0),
                background: index <= activeIndex ? (onBlue ? 'white' : C.teal) : line,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: 44,
                display: 'flex',
                gap: 8,
                whiteSpace: 'nowrap',
                fontSize: index === activeIndex ? 21 : 16,
                letterSpacing: 1,
                color: index === activeIndex ? ink : quiet,
                fontWeight: index === activeIndex ? 700 : 500,
                transform: isLast ? 'translateX(-100%)' : undefined,
              }}
            >
              <span style={{fontFamily: mono}}>{item.code}</span>
              <span style={{fontFamily: font}}>{item.label}</span>
            </div>
          </React.Fragment>
        );
      })}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 22,
          width: 2,
          height: 18,
          background: frame >= TOTAL_DURATION - 1 ? (onBlue ? 'white' : C.teal) : line,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${progress * 100}%`,
          top: 24,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: onBlue ? 'white' : C.teal,
          boxShadow: `0 0 0 4px ${onBlue ? 'rgba(255,255,255,0.16)' : 'rgba(30,168,160,0.14)'}`,
          transform: 'translateX(-50%)',
        }}
      />
      <div style={{position: 'absolute', right: 0, top: 0, fontSize: 15, letterSpacing: 1.5, color: quiet}}>
        {formatTime(frame / fps)} / {formatTime(TOTAL_DURATION / fps)}
      </div>
    </div>
  );
};
