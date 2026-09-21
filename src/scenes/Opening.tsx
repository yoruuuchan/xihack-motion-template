import React from 'react';
import {useCurrentFrame} from 'remotion';
import {content as data} from '../content';
import {C, Pill, Shell, Small, mix, p, wash} from '../design';

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
        <div style={{fontSize: 174, fontWeight: 700, letterSpacing: -6}}>{data.team.name}</div>
        <Small style={{marginTop: 30, opacity: 1 - handoff}}>DIFFERENT MINDS. ONE NEXT STEP.</Small>
      </div>
      <div style={{position: 'absolute', left: 116, top: 318, opacity: reveal, transform: `translateY(${105 * (1 - reveal) - exit * 25}px)`}}>
        <Pill variant="frost" size={20} style={{fontWeight: 600, letterSpacing: 3}}>INTRODUCING OUR PROJECT</Pill>
        <div style={{fontSize: 260, lineHeight: 1.12, fontWeight: 700, letterSpacing: -16, marginLeft: -11, marginTop: 14}}>
          {data.project.name}<span style={{color: C.teal}}>.</span>
        </div>
        <div style={{fontSize: 47, marginTop: 20, opacity: p(f, 90, 112)}}>{data.project.oneLiner}</div>
      </div>
      <div style={{position: 'absolute', right: 68, top: 350, writingMode: 'vertical-rl', color: 'white', fontSize: 21, letterSpacing: 5, opacity: handoff}}>TEAM / PROJECT</div>
      <div style={{position: 'absolute', left: 120, bottom: 142, fontSize: 21, color: onBase ? C.muted : 'white'}}>一起，把想法往前推一步。</div>
    </Shell>
  );
};
