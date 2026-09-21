import React from 'react';
import {interpolateColors, useCurrentFrame} from 'remotion';
import data from '../content.json';
import {C, Mark, Pill, Shell, Small, Tile, mix, mono, neo, p} from '../design';

// PROPOSAL: rotary-dial spine. The whole film is the front panel of one device — a wide
// porcelain dial on the left, an inset display on the right. Each detent is a section.
// Test only: standby → 00 team (power on, camera pulls back) → 01 friction.

const DETENTS = [
  {angle: -150, num: '', word: '待机'},
  {angle: -100, num: '00', word: '团队'},
  {angle: -50, num: '01', word: '问题'},
  {angle: 0, num: '02', word: '方案'},
  {angle: 50, num: '03', word: '我们'},
  {angle: 100, num: '04', word: '今天'},
  {angle: 150, num: '05', word: '下一步'},
];

const DIAL = {cx: 480, cy: 540, size: 420};
const SCREEN = {left: 920, top: 150, width: 920, height: 780};

// Small engraved label: faint ink with a one-pixel white catch-light underneath.
const engraved: React.CSSProperties = {color: C.faint, textShadow: '0 1px 0 rgba(255,255,255,0.9)'};

const Knob: React.FC<{angle: number; press: number; lit: number; active: number}> = ({angle, press, lit, active}) => {
  const {cx, cy, size} = DIAL;
  const rim = 34;
  const R = size / 2;
  const outer = size + rim * 2;
  const seam = 14;
  const face = 22;
  const rTick = R + rim + 12;
  const rLabel = R + rim + 62;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: cx - outer / 2,
          top: cy - outer / 2,
          width: outer,
          height: outer,
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #D3D9E4 0%, #E2E7EF 100%)',
          boxShadow: 'inset 0 8px 16px rgba(143,158,191,0.5), inset 0 20px 40px rgba(143,158,191,0.25), inset 0 -2px 3px rgba(255,255,255,0.75), 0 1px 0 rgba(255,255,255,0.9)',
        }}
      />
      {DETENTS.map((d, i) => {
        const a = (d.angle * Math.PI) / 180;
        const on = i === active;
        return (
          <React.Fragment key={d.angle}>
            <div style={{position: 'absolute', left: cx - 1, top: cy - 7, width: 2, height: 14, background: on ? C.ink : 'rgba(14,21,37,0.22)', boxShadow: '1px 0 0 rgba(255,255,255,0.9)', transform: `rotate(${d.angle}deg) translateY(${-rTick}px)`}} />
            <div style={{position: 'absolute', left: cx + rLabel * Math.sin(a), top: cy - rLabel * Math.cos(a), transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 17, ...engraved, color: on ? C.ink : C.faint}}>
              {d.num ? <span style={{fontFamily: mono, letterSpacing: 1}}>{d.num}</span> : null}
              <span style={{fontWeight: 500}}>{d.word}</span>
            </div>
          </React.Fragment>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: cx - R,
          top: cy - R,
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #F7F9FC 0%, #E6EBF3 100%)',
          boxShadow: '-8px -8px 20px rgba(255,255,255,0.9), 14px 16px 34px rgba(143,158,191,0.45), 0 2px 3px rgba(20,28,51,0.12)',
          transform: `scale(${1 - 0.015 * press})`,
        }}
      >
        <div style={{position: 'absolute', inset: seam, borderRadius: '50%', background: '#DCE1EB', boxShadow: 'inset 2px 2px 4px rgba(143,158,191,0.5), inset -1px -1px 2px rgba(255,255,255,0.9)'}} />
        <div style={{position: 'absolute', inset: face, borderRadius: '50%', background: 'radial-gradient(circle at 36% 30%, #FFFFFF 0%, #F4F7FB 42%, #E3E8F1 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,1), inset 0 -3px 6px rgba(143,158,191,0.3), 0 2px 4px rgba(20,28,51,0.1)'}} />
        <div style={{position: 'absolute', inset: face, borderRadius: '50%', transform: `rotate(${angle}deg)`}}>
          <div style={{position: 'absolute', left: '50%', top: 46, width: 6, height: 64, marginLeft: -3, borderRadius: 3, background: 'rgba(14,21,37,0.14)', boxShadow: '1px 0 0 rgba(255,255,255,0.9)'}} />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 22,
              width: 14,
              height: 14,
              marginLeft: -7,
              borderRadius: '50%',
              background: interpolateColors(lit, [0, 1], ['#D5DBE6', C.teal]),
              boxShadow: lit > 0.5 ? 'inset 0 1px 1px rgba(0,0,0,0.25)' : 'inset 1px 1px 2px rgba(143,158,191,0.6), inset -1px -1px 1px rgba(255,255,255,0.9)',
            }}
          />
        </div>
      </div>
    </>
  );
};

const Display: React.FC<{on: number; children?: React.ReactNode}> = ({on, children}) => (
  <div style={{position: 'absolute', ...SCREEN, borderRadius: 48, background: interpolateColors(on, [0, 1], [C.sunken, '#E6EAF2']), boxShadow: neo.insetDeep, overflow: 'hidden'}}>{children}</div>
);

export const DialTest = () => {
  const f = useCurrentFrame();
  const turn1 = p(f, 20, 38);
  const click1 = p(f, 36, 40) - p(f, 40, 46);
  const lit = p(f, 38, 46);
  const zoom = p(f, 44, 80);
  const power = p(f, 52, 66);
  const in00 = p(f, 58, 76);
  const out00 = p(f, 150, 160);
  const turn2 = p(f, 150, 168);
  const click2 = p(f, 166, 170) - p(f, 170, 176);
  const in01 = p(f, 168, 186);
  const word = p(f, 176, 190);

  const angle = mix(-150, -100, turn1) + mix(0, 50, turn2);
  const active = turn2 > 0.98 ? 2 : turn1 > 0.98 ? 1 : 0;
  const s = mix(1.9, 1, zoom);
  const tx = mix(620, 0, zoom);
  const first = data.relay[0];

  return (
    <Shell>
      <div style={{position: 'absolute', inset: 0, transformOrigin: `${DIAL.cx}px ${DIAL.cy}px`, transform: `translateX(${tx}px) scale(${s})`}}>
        <div style={{position: 'absolute', left: 80, top: 52, opacity: p(f, 70, 84)}}>
          <Small style={engraved}>{data.event} / {data.location}</Small>
        </div>
        <Knob angle={angle} press={click1 + click2} lit={lit} active={active} />
        <Display on={power}>
          <div style={{position: 'absolute', left: 80, top: 90, right: 80, opacity: Math.max(0, in00 - out00), transform: `translateY(${mix(24, 0, in00) - 24 * out00}px)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 32}}>
              <Tile size={120} variant="surface"><Mark size={70} /></Tile>
              <div style={{fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1}}>{data.team}</div>
            </div>
            <Small style={{marginTop: 44, color: C.muted}}>DIFFERENT MINDS. ONE NEXT STEP.</Small>
            <div style={{fontSize: 40, marginTop: 150, color: C.muted, opacity: p(f, 84, 100)}}>{data.tagline}</div>
          </div>
          <div style={{position: 'absolute', left: 80, top: 90, right: 80, opacity: in01, transform: `translateY(${mix(24, 0, in01)}px)`}}>
            <Pill variant="chip" size={20} style={{fontWeight: 600, letterSpacing: 3}}>{first.label}</Pill>
            <div style={{fontSize: 58, marginTop: 44}}>当想法</div>
            <div style={{fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 1.15, color: C.blue, opacity: word, transform: `translateY(${30 * (1 - word)}px)`}}>
              {first.verb}<span style={{color: C.ink}}>。</span>
            </div>
            <div style={{fontSize: 31, lineHeight: 1.7, marginTop: 24, color: C.muted, opacity: word}}>{first.description}</div>
          </div>
        </Display>
      </div>
    </Shell>
  );
};
