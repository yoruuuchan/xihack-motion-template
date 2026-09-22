import React from 'react';
import {useCurrentFrame} from 'remotion';
import {content as data} from '../content';
import {C, FittedText, MaterialPlate, Pill, Shell, Small, mix, p, wash} from '../design';

export const Opening: React.FC<{durationInFrames?: number}> = ({durationInFrames = 175}) => {
  const f = useCurrentFrame();
  const arrive = p(f, 0, 20);
  const handoff = p(f, 50, 84);
  const reveal = p(f, 65, 98);
  const exit = p(f, durationInFrames - 20, durationInFrames - 1);
  // The wipe edge passes the team block early in the hand-off, so ink flips before 0.5.
  const onBase = handoff > 0.3;
  return (
    <Shell bg={C.blue}>
      {/* The wipe stops 176px short of the right edge, leaving the blue shell as the side strip. */}
      <div style={{position: 'absolute', inset: 0, background: wash(C.base), clipPath: `inset(0 ${mix(100, (176 / 1920) * 100, handoff)}% 0 0)`}} />
      <MaterialPlate
        onBlue
        style={{
          position: 'absolute',
          left: 72,
          top: 132,
          width: 1656,
          height: 782,
          opacity: arrive * (1 - handoff),
          translate: `0 ${34 * (1 - arrive)}px`,
          scale: mix(0.985, 1, arrive),
        }}
      />
      <MaterialPlate
        style={{
          position: 'absolute',
          left: 72,
          top: 132,
          width: 1656,
          height: 782,
          opacity: handoff,
          translate: `${34 * (1 - handoff)}px 0`,
          scale: mix(0.985, 1, handoff),
        }}
      />
      <div style={{position: 'absolute', left: 80, top: 52, color: onBase ? C.ink : 'white', opacity: arrive}}>
        <Small>{data.event.name} <span style={{opacity: 0.5}}> / </span> {data.event.meta}</Small>
      </div>
      <div
        style={{
          position: 'absolute',
          left: mix(126, 112, handoff),
          top: mix(330, 158, handoff),
          transformOrigin: '0 0',
          transform: `translateY(${90 * (1 - arrive)}px) scale(${mix(1.13, 1, arrive) * mix(1, 0.31, handoff)})`,
          color: onBase ? C.ink : 'white',
          whiteSpace: 'nowrap',
        }}
      >
        <FittedText text={data.team.name} maxWidth={1480} maxFontSize={174} minFontSize={92} letterSpacing={-6} />
        <Small style={{marginTop: 30, opacity: 1 - handoff}}>{data.team.tagline}</Small>
      </div>
      <div style={{position: 'absolute', left: 116, top: 318, opacity: reveal, transform: `translateY(${105 * (1 - reveal) - exit * 25}px)`}}>
        <Pill variant="frost" size={20} style={{fontWeight: 600, letterSpacing: 3}}>INTRODUCING OUR PROJECT</Pill>
        <FittedText
          text={data.project.name}
          measurementText={`${data.project.name}.`}
          suffix={<span style={{color: C.teal}}>.</span>}
          maxWidth={1480}
          maxFontSize={260}
          minFontSize={104}
          letterSpacing={-4}
          style={{marginLeft: -11, marginTop: 14, lineHeight: 1.12}}
        />
        <FittedText text={data.project.oneLiner} maxWidth={1510} maxFontSize={47} minFontSize={28} fontWeight={400} style={{marginTop: 20, opacity: p(f, 90, 112)}} />
      </div>
      <div style={{position: 'absolute', right: 68, top: 350, writingMode: 'vertical-rl', color: 'white', fontSize: 21, letterSpacing: 5, opacity: handoff}}>TEAM / PROJECT</div>
    </Shell>
  );
};
