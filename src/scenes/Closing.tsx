import React from 'react';
import {useCurrentFrame} from 'remotion';
import {content as data} from '../content';
import {C, Mark, Shell, Small, Tile, Track, p} from '../design';

export const Closing = () => {
  const f = useCurrentFrame();
  const enter = p(f, 0, 27);
  const tile = p(f, 12, 40);
  return (
    <Shell>
      <div style={{position: 'absolute', left: 110, top: 52}}>
        <Small>{data.event.name} / {data.event.meta}</Small>
      </div>
      <div style={{position: 'absolute', left: 110, top: 229, opacity: enter, transform: `translateY(${65 * (1 - enter)}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Tile size={64} variant="surface"><Mark size={38} /></Tile>
          <Small>{data.team.name} / PRESENTS</Small>
        </div>
        <div style={{fontSize: 260, fontWeight: 700, letterSpacing: -16, lineHeight: 1.2, marginLeft: -9, marginTop: 17}}>
          {data.project.name}<span style={{color: C.teal}}>.</span>
        </div>
        <div style={{fontSize: 53, marginTop: 26, color: C.muted}}>{data.project.nextStep}</div>
      </div>
      <Tile size={240} style={{position: 'absolute', right: 133, top: 340, opacity: tile, transform: `translateX(${100 * (1 - tile)}px)`}}>
        <Mark size={150} color="white" />
      </Tile>
      <Track progress={p(f, 30, 68)} width={1700} style={{position: 'absolute', left: 110, bottom: 151}} />
      <div style={{position: 'absolute', left: 110, bottom: 84, fontSize: 24, letterSpacing: 5, opacity: p(f, 45, 70)}}>THE FIRST STEP IS OURS.</div>
    </Shell>
  );
};
