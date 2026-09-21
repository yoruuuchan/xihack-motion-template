import React from 'react';
import {useCurrentFrame} from 'remotion';
import {content as data, hasMedia, type StoryBeat} from '../content';
import {C, Card, Dot, Mark, Media, Pill, R, Rail, Segmented, Shell, Tile, Track, Well, io, mix, mono, neo, p} from '../design';

const Note: React.FC<{text: string; x: number; y: number; rotate?: number; dark?: boolean}> = ({text, x, y, rotate = 0, dark}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 270,
      padding: '26px 28px',
      borderRadius: R.inner,
      background: dark ? C.blue : C.surface,
      color: dark ? 'white' : C.ink,
      boxShadow: dark ? neo.pressed : neo.raised,
      transform: `rotate(${rotate}deg)`,
      fontSize: 30,
      fontWeight: 700,
    }}
  >
    {text}
  </div>
);

const Connector: React.FC<{light?: boolean; width?: number}> = ({light, width = 44}) => (
  <div style={{width, height: 3, borderRadius: R.pill, background: light ? 'rgba(255,255,255,0.35)' : C.teal, flexShrink: 0}} />
);

export const SampleCard: React.FC<{beat: StoryBeat; t?: number}> = ({beat, t = 0}) => {
  const blue = beat.layout === 'focus' || beat.layout === 'steps';
  const activeStage = Math.round(t * (beat.points.length - 1));
  return (
    <div style={{position: 'absolute', inset: 0, background: blue ? C.blue : C.surface, color: blue ? 'white' : C.ink, padding: '34px 42px', overflow: 'hidden'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontFamily: mono, fontSize: 18, letterSpacing: 1, opacity: 0.7}}>project / canvas</span>
        <Pill variant={blue ? 'blueChip' : 'mute'} size={15}>概念演示</Pill>
      </div>
      {beat.layout === 'notes' ? (
        <>
          <div style={{fontSize: 44, fontWeight: 700, marginTop: 32}}>{beat.headline}</div>
          <Note text={beat.points[0]} x={48} y={200} rotate={-7} />
          <Note text={beat.points[1]} x={436} y={192} rotate={6} dark />
          <Note text={beat.points[2]} x={220} y={350} rotate={-2} />
        </>
      ) : null}
      {beat.layout === 'focus' ? (
        <>
          <div style={{fontSize: 50, fontWeight: 700, marginTop: 50}}>{beat.headline}</div>
          <div style={{fontSize: 29, opacity: 0.8, marginTop: 20}}>{beat.description}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 66}}>
            {beat.points.map((point, index) => (
              <React.Fragment key={point}>
                {index > 0 ? <Connector light /> : null}
                <Pill variant={index === beat.points.length - 1 ? 'frostOn' : 'blueChip'} size={30} style={{fontWeight: 600}}>{point}</Pill>
              </React.Fragment>
            ))}
          </div>
        </>
      ) : null}
      {beat.layout === 'list' ? (
        <>
          <div style={{fontSize: 47, fontWeight: 700, marginTop: 30}}>{beat.headline}</div>
          {beat.points.map((point, index) => (
            <div
              key={point}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                marginTop: index === 0 ? 34 : 24,
                fontSize: 29,
                fontWeight: 500,
                padding: '18px 28px',
                borderRadius: R.inner,
                background: C.surface,
                boxShadow: index === 1 ? neo.selected : neo.raised,
              }}
            >
              <Dot color={index === 1 ? C.blue : C.teal} />
              {point}
            </div>
          ))}
        </>
      ) : null}
      {beat.layout === 'steps' ? (
        <>
          <div style={{fontSize: 49, fontWeight: 700, marginTop: 34}}>{beat.headline}</div>
          <div style={{display: 'flex', gap: 24, marginTop: 46}}>
            {beat.points.map((point, index) => (
              <div key={point} style={{flex: 1, padding: '24px 26px', height: 216, borderRadius: R.inner, background: C.blue, boxShadow: neo.raisedBlue}}>
                <div style={{fontFamily: mono, fontSize: 18, opacity: 0.6}}>0{index + 1}</div>
                <div style={{fontSize: 38, fontWeight: 700, marginTop: 22}}>{point}</div>
                <div style={{height: 6, width: 74, borderRadius: R.pill, background: index === beat.points.length - 1 ? C.teal : 'rgba(255,255,255,0.7)', marginTop: 40}} />
              </div>
            ))}
          </div>
        </>
      ) : null}
      {beat.layout === 'timeline' ? (
        <>
          <div style={{fontSize: 50, fontWeight: 700, marginTop: 30}}>{beat.headline}</div>
          <div style={{position: 'relative', marginTop: 56, height: 62}}>
            {beat.points.map((point, index) => (
              <div key={point} style={{position: 'absolute', left: `${index * 50}%`, transform: 'translateX(-50%)', marginLeft: index === 0 ? 46 : index === beat.points.length - 1 ? -46 : 0}}>
                <Pill variant={index === activeStage ? 'chipOn' : 'chip'} size={30} style={{fontWeight: 600}}>{point}</Pill>
              </div>
            ))}
          </div>
          <Track progress={t} width={766} style={{marginTop: 30}} />
          <div style={{fontSize: 24, color: C.muted, marginTop: 44}}>{beat.description}</div>
        </>
      ) : null}
    </div>
  );
};

export const Story = () => {
  const f = useCurrentFrame();
  const switches = data.story.map((_, index) => index * 105);
  const lastIndex = data.story.length - 1;
  // 16-frame rolling window inherited from WordRelayFilmstrip.tsx v3.
  let step = 0;
  for (const switchFrame of switches.slice(1)) step += p(f, switchFrame, switchFrame + 16, io);
  const current = Math.min(lastIndex, switches.filter((switchFrame) => switchFrame <= f).length - 1);
  const local = f - switches[current];
  const word = p(local, 5, 17);
  const expansion = p(f, switches[lastIndex] + 64, 539, io);
  const timelineT = current === lastIndex ? p(local, 20, 72, io) : 0;
  const x = mix(110, 0, expansion);
  const y = mix(285, 0, expansion);
  const w = mix(850, 1920, expansion);
  const h = mix(510, 1080, expansion);
  const activeBeat = data.story[current];
  return (
    <Shell>
      <div style={{position: 'absolute', inset: '0 0 0 1030px', background: C.pale, opacity: 1 - expansion}} />
      <Rail label="02 / PROJECT STORY" duration={540} event={data.event.name} meta={data.event.meta} />
      <Well deep style={{position: 'absolute', left: 52, top: 150, width: 958, height: 780, borderRadius: 48, opacity: 1 - expansion}} />
      <div style={{position: 'absolute', left: x, top: y, width: w, height: h, zIndex: 4, transformOrigin: '0 0', clipPath: 'inset(-135px -58px -135px -58px)'}}>
        <div style={{position: 'absolute', width: 850, height: 510, transformOrigin: '0 0', transform: `scale(${w / 850}, ${h / 510})`}}>
          {data.story.map((beat, index) => (
            <Card
              key={`${beat.layout}-${index}`}
              lifted={index === current}
              style={{
                position: 'absolute',
                left: 0,
                top: (index - step) * 605,
                width: 850,
                height: 510,
                overflow: 'hidden',
                borderRadius: mix(R.card, 0, expansion),
                opacity: expansion > 0 && index !== lastIndex ? 1 - expansion : 1,
              }}
            >
              {hasMedia(beat.media) ? <Media asset={beat.media} /> : <SampleCard beat={beat} t={index === lastIndex ? timelineT : 0} />}
            </Card>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: 1092, top: 300, width: 700, opacity: 1 - expansion, zIndex: 5}}>
        <Pill variant={current < 2 ? 'chip' : 'frost'} size={20} style={{fontWeight: 600, letterSpacing: 3}}>{activeBeat.section}</Pill>
        <div style={{fontSize: 58, fontWeight: 400, marginTop: 40}}>{activeBeat.lead}</div>
        <div style={{height: 169, overflow: 'hidden'}}>
          <div style={{fontSize: 133, fontWeight: 700, letterSpacing: -6, lineHeight: 1.2, color: current < 2 ? C.blue : C.teal, opacity: word, transform: `translateY(${30 * (1 - word)}px)`}}>
            {activeBeat.keyword}<span style={{color: C.ink}}>。</span>
          </div>
        </div>
        <div style={{fontSize: 31, lineHeight: 1.7, maxWidth: 600, marginTop: 30, opacity: word}}>{activeBeat.description}</div>
        <Segmented count={data.story.length} pos={step} width={420} style={{marginTop: 48}} />
      </div>
      <Tile size={96} variant="surface" style={{position: 'absolute', right: 100, bottom: 104, opacity: 1 - expansion}}>
        <Mark size={54} />
      </Tile>
    </Shell>
  );
};

