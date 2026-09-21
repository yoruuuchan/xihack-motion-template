import React from 'react';
import {useCurrentFrame} from 'remotion';
import data from '../content.json';
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

export const SampleCard: React.FC<{kind: string; t?: number}> = ({kind, t = 0}) => {
  const blue = kind === 'align' || kind === 'tasks';
  const stages = ['想法', '行动', '反馈'];
  const activeStage = Math.round(t * 2);
  return (
    <div style={{position: 'absolute', inset: 0, background: blue ? C.blue : C.surface, color: blue ? 'white' : C.ink, padding: '34px 42px', overflow: 'hidden'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontFamily: mono, fontSize: 18, letterSpacing: 1, opacity: 0.7}}>relay / workspace</span>
        <Pill variant={blue ? 'blueChip' : 'mute'} size={15}>概念演示</Pill>
      </div>
      {kind === 'scatter' ? (
        <>
          <div style={{fontSize: 44, fontWeight: 700, marginTop: 32}}>好想法，散落在各处。</div>
          <Note text="刚刚想到……" x={48} y={200} rotate={-7} />
          <Note text="谁来做这件事？" x={436} y={192} rotate={6} dark />
          <Note text="下一步是什么？" x={220} y={350} rotate={-2} />
        </>
      ) : null}
      {kind === 'align' ? (
        <>
          <div style={{fontSize: 50, fontWeight: 700, marginTop: 50}}>先对齐一个问题。</div>
          <div style={{fontSize: 29, opacity: 0.8, marginTop: 20}}>从模糊的方向，到共同的起点。</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 66}}>
            {['场景', '使用者', '关键阻碍'].map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 ? <Connector light /> : null}
                <Pill variant={i === 2 ? 'frostOn' : 'blueChip'} size={30} style={{fontWeight: 600}}>{s}</Pill>
              </React.Fragment>
            ))}
          </div>
        </>
      ) : null}
      {kind === 'collect' ? (
        <>
          <div style={{fontSize: 47, fontWeight: 700, marginTop: 30}}>一个地方，接住所有想法。</div>
          {['一句讨论，一条线索', '一张草图，一个方向', '一个决定，一起往前'].map((s, i) => (
            <div
              key={s}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                marginTop: i === 0 ? 34 : 24,
                fontSize: 29,
                fontWeight: 500,
                padding: '18px 28px',
                borderRadius: R.inner,
                background: C.surface,
                boxShadow: i === 1 ? neo.selected : neo.raised,
              }}
            >
              <Dot color={i === 1 ? C.blue : C.teal} />
              {s}
            </div>
          ))}
        </>
      ) : null}
      {kind === 'tasks' ? (
        <>
          <div style={{fontSize: 49, fontWeight: 700, marginTop: 34}}>从想法，到可执行。</div>
          <div style={{display: 'flex', gap: 24, marginTop: 46}}>
            {['定义', '搭建', '验证'].map((s, i) => (
              <div key={s} style={{flex: 1, padding: '24px 26px', height: 216, borderRadius: R.inner, background: C.blue, boxShadow: neo.raisedBlue}}>
                <div style={{fontFamily: mono, fontSize: 18, opacity: 0.6}}>0{i + 1}</div>
                <div style={{fontSize: 38, fontWeight: 700, marginTop: 22}}>{s}</div>
                <div style={{height: 6, width: 74, borderRadius: R.pill, background: i === 2 ? C.teal : 'rgba(255,255,255,0.7)', marginTop: 40}} />
              </div>
            ))}
          </div>
        </>
      ) : null}
      {kind === 'handoff' ? (
        <>
          <div style={{fontSize: 50, fontWeight: 700, marginTop: 30}}>下一步，有人接住。</div>
          <div style={{position: 'relative', marginTop: 56, height: 62}}>
            {stages.map((s, i) => (
              <div key={s} style={{position: 'absolute', left: `${i * 50}%`, transform: 'translateX(-50%)', marginLeft: i === 0 ? 46 : i === 2 ? -46 : 0}}>
                <Pill variant={i === activeStage ? 'chipOn' : 'chip'} size={30} style={{fontWeight: 600}}>{s}</Pill>
              </div>
            ))}
          </div>
          <Track progress={t} width={766} style={{marginTop: 30}} />
          <div style={{fontSize: 24, color: C.muted, marginTop: 44}}>把每一次讨论，接到真实行动。</div>
        </>
      ) : null}
    </div>
  );
};

export const Relay = () => {
  const f = useCurrentFrame();
  const switches = [0, 105, 210, 315, 420];
  // 16-frame rolling window inherited from WordRelayFilmstrip.tsx v3.
  let step = 0;
  for (const s of switches.slice(1)) step += p(f, s, s + 16, io);
  const current = Math.min(4, switches.filter((s) => s <= f).length - 1);
  const local = f - switches[current];
  const word = p(local, 5, 17);
  const expansion = p(f, 484, 539, io);
  const handoffT = current === 4 ? p(local, 20, 72, io) : 0;
  const x = mix(110, 0, expansion);
  const y = mix(285, 0, expansion);
  const w = mix(850, 1920, expansion);
  const h = mix(510, 1080, expansion);
  return (
    <Shell>
      <div style={{position: 'absolute', inset: '0 0 0 1030px', background: C.pale, opacity: 1 - expansion}} />
      <Rail label={current < 2 ? '02 / THE QUESTION' : '03 / THE APPROACH'} duration={540} />
      <Well deep style={{position: 'absolute', left: 52, top: 150, width: 958, height: 780, borderRadius: 48, opacity: 1 - expansion}} />
      <div style={{position: 'absolute', left: x, top: y, width: w, height: h, zIndex: 4, transformOrigin: '0 0', clipPath: 'inset(-135px -58px -135px -58px)'}}>
        <div style={{position: 'absolute', width: 850, height: 510, transformOrigin: '0 0', transform: `scale(${w / 850}, ${h / 510})`}}>
          {data.relay.map((r, i) => (
            <Card
              key={r.kind}
              lifted={i === current}
              style={{
                position: 'absolute',
                left: 0,
                top: (i - step) * 605,
                width: 850,
                height: 510,
                overflow: 'hidden',
                borderRadius: mix(R.card, 0, expansion),
                opacity: expansion > 0 && i !== 4 ? 1 - expansion : 1,
              }}
            >
              {r.media ? <Media src={r.media} /> : <SampleCard kind={r.kind} t={i === 4 ? handoffT : 0} />}
            </Card>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: 1092, top: 300, width: 700, opacity: 1 - expansion, zIndex: 5}}>
        <Pill variant={current < 2 ? 'chip' : 'frost'} size={20} style={{fontWeight: 600, letterSpacing: 3}}>{data.relay[current].label}</Pill>
        <div style={{fontSize: 58, fontWeight: 400, marginTop: 40}}>{current === 0 ? '当想法' : '让想法'}</div>
        <div style={{height: 169, overflow: 'hidden'}}>
          <div style={{fontSize: 133, fontWeight: 700, letterSpacing: -6, lineHeight: 1.2, color: current < 2 ? C.blue : C.teal, opacity: word, transform: `translateY(${30 * (1 - word)}px)`}}>
            {data.relay[current].verb}<span style={{color: C.ink}}>。</span>
          </div>
        </div>
        <div style={{fontSize: 31, lineHeight: 1.7, maxWidth: 600, marginTop: 30, opacity: word}}>{data.relay[current].description}</div>
        <Segmented count={5} pos={step} width={420} style={{marginTop: 48}} />
      </div>
      <Tile size={96} variant="surface" style={{position: 'absolute', right: 100, bottom: 104, opacity: 1 - expansion}}>
        <Mark size={54} />
      </Tile>
    </Shell>
  );
};
