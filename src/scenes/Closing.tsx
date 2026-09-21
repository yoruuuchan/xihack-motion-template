import React from 'react';
import {useCurrentFrame} from 'remotion';
import {content as data} from '../content';
import {C, FittedText, Shell, Small, p} from '../design';

export const Closing: React.FC<{durationInFrames?: number}> = ({durationInFrames = 133}) => {
  const f = useCurrentFrame();
  const enter = p(f, 0, 27);
  const settle = p(f, 18, Math.min(54, durationInFrames - 1));
  const period = p(f, 16, 32);
  return (
    <Shell>
      <div style={{position: 'absolute', left: 110, top: 52}}>
        <Small>{data.event.name} / {data.event.meta}</Small>
      </div>
      <div style={{position: 'absolute', left: 110, top: 229, opacity: enter, transform: `translateY(${65 * (1 - enter)}px)`}}>
        <Small>{data.team.name} / PRESENTS</Small>
        <FittedText
          text={data.project.name}
          measurementText={`${data.project.name}.`}
          suffix={<span style={{display: 'inline-block', color: C.teal, opacity: period, transform: `translateX(${18 * (1 - period)}px) scale(${0.72 + period * 0.28})`}}>.</span>}
          maxWidth={1240}
          maxFontSize={260}
          minFontSize={96}
          letterSpacing={-4}
          style={{marginLeft: -9, marginTop: 17, lineHeight: 1.2}}
        />
        <FittedText text={data.project.nextStep} maxWidth={1260} maxFontSize={53} minFontSize={30} fontWeight={400} style={{marginTop: 26, color: C.muted}} />
      </div>
      <div style={{position: 'absolute', right: 132, top: 325, fontSize: 260, lineHeight: 1, fontWeight: 700, letterSpacing: -12, color: C.pale2, opacity: settle}}>05</div>
      <div style={{position: 'absolute', left: 110, bottom: 142, fontSize: 24, letterSpacing: 5, opacity: p(f, 45, 70)}}>THE FIRST STEP IS OURS.</div>
    </Shell>
  );
};
