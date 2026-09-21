import React from 'react';
import {interpolateColors, useCurrentFrame} from 'remotion';
import {content as data} from '../content';
import {C, Pill, Shell, Small, io, mix, mono, neo, p} from '../design';
import {DIAL_SCENE_OVERLAP, type ChapterId} from '../timeline';

// DIRECTION: the rotary selector chooses a section, then yields to that section's scene.
// It is a transition device, not a permanent overlay. DialCue drives all six chapters
// in the main film; DialTest keeps the interaction isolated for visual refinement.

export const DETENTS = [
  {angle: -150, num: '', word: '待机'},
  {angle: -100, num: '00', word: '团队'},
  {angle: -50, num: '01', word: '问题'},
  {angle: 0, num: '02', word: '方案'},
  {angle: 50, num: '03', word: '我们'},
  {angle: 100, num: '04', word: '今天'},
  {angle: 150, num: '05', word: '下一步'},
];

const DIAL = {cx: 470, cy: 540, size: 374};
const SCREEN = {left: 920, top: 150, width: 920, height: 780};

// The music-led version treats the selector as a compact hi-fi control, not a soft UI widget.
const engraved: React.CSSProperties = {color: C.faint, textShadow: '0 1px 0 rgba(255,255,255,0.72)'};

const Knob: React.FC<{angle: number; press: number; lit: number; active: number}> = ({angle, press, lit, active}) => {
  const {cx, cy, size} = DIAL;
  const rim = 30;
  const R = size / 2;
  const outer = size + rim * 2;
  const seam = 12;
  const face = 21;
  const rTick = R + rim + 11;
  const rLabel = R + rim + 56;
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
          background: 'conic-gradient(from 210deg, #AEB7C5 0deg, #F7F4EC 78deg, #C5CCD6 166deg, #F8F5EE 262deg, #ADB6C4 360deg)',
          border: '2px solid rgba(14,21,37,0.16)',
          boxShadow: '0 28px 64px rgba(44,57,91,0.25), inset 0 0 0 7px rgba(255,255,255,0.34), inset 0 -8px 18px rgba(79,91,119,0.18)',
        }}
      />
      {DETENTS.map((d, i) => {
        const a = (d.angle * Math.PI) / 180;
        const on = i === active;
        return (
          <React.Fragment key={d.angle}>
            <div style={{position: 'absolute', left: cx - (on ? 2 : 1), top: cy - 9, width: on ? 4 : 2, height: on ? 18 : 14, background: on ? C.teal : 'rgba(14,21,37,0.25)', boxShadow: on ? '0 0 0 4px rgba(30,168,160,0.12)' : '1px 0 0 rgba(255,255,255,0.72)', transform: `rotate(${d.angle}deg) translateY(${-rTick}px)`}} />
            <div style={{position: 'absolute', left: cx + rLabel * Math.sin(a), top: cy - rLabel * Math.cos(a), transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 18, ...engraved, color: on ? C.ink : C.faint, fontWeight: on ? 700 : 500}}>
              {d.num ? <span style={{fontFamily: mono, letterSpacing: 1}}>{d.num}</span> : null}
              <span>{d.word}</span>
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
          background: 'linear-gradient(145deg, #FBF9F3 0%, #E5E8EC 58%, #C9D0D9 100%)',
          border: '2px solid rgba(14,21,37,0.18)',
          boxShadow: '0 20px 36px rgba(52,65,99,0.28), inset 0 2px 1px rgba(255,255,255,0.9), inset 0 -5px 9px rgba(74,87,119,0.2)',
          scale: 1 - 0.025 * press,
        }}
      >
        <div style={{position: 'absolute', inset: seam, borderRadius: '50%', background: '#B7C0CC', boxShadow: 'inset 0 3px 7px rgba(42,55,86,0.34), inset 0 -2px 3px rgba(255,255,255,0.65)'}} />
        <div style={{position: 'absolute', inset: face, borderRadius: '50%', background: 'radial-gradient(circle at 34% 27%, #FFFDF7 0%, #F1EFE9 44%, #D5DBE2 100%)', boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.9), inset 0 -4px 8px rgba(78,91,121,0.2), 0 3px 7px rgba(20,28,51,0.14)'}} />
        <div style={{position: 'absolute', inset: 70, borderRadius: '50%', border: '1px solid rgba(14,21,37,0.1)', boxShadow: '0 1px 0 rgba(255,255,255,0.7)'}} />
        <div style={{position: 'absolute', inset: face, borderRadius: '50%', transform: `rotate(${angle}deg)`}}>
          <div style={{position: 'absolute', left: '50%', top: 36, width: 5, height: 78, marginLeft: -2.5, borderRadius: 3, background: C.ink, boxShadow: '1px 0 0 rgba(255,255,255,0.6)'}} />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 18,
              width: 16,
              height: 16,
              marginLeft: -8,
              borderRadius: '50%',
              background: interpolateColors(lit, [0, 1], ['#D5DBE6', C.teal]),
              boxShadow: lit > 0.5 ? '0 0 0 5px rgba(30,168,160,0.14), inset 0 1px 1px rgba(0,0,0,0.18)' : 'inset 1px 1px 2px rgba(143,158,191,0.6)',
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

const exitMotion: Record<ChapterId, {scale: number; x: number; y: number; rotate: number; textX: number}> = {
  team: {scale: 1.72, x: -40, y: 10, rotate: 0, textX: 90},
  problem: {scale: 1.18, x: -250, y: 0, rotate: -7, textX: 150},
  solution: {scale: 1.62, x: 85, y: -30, rotate: 8, textX: -80},
  people: {scale: 1.4, x: 20, y: 100, rotate: -5, textX: 70},
  today: {scale: 1.2, x: 250, y: 0, rotate: 7, textX: -150},
  next: {scale: 0.72, x: -120, y: 0, rotate: 0, textX: 80},
};

export const DialCue: React.FC<{chapterId: ChapterId; fromIndex: number; toIndex: number; durationInFrames: number}> = ({chapterId, fromIndex, toIndex, durationInFrames}) => {
  const f = useCurrentFrame();
  const from = DETENTS[Math.max(0, Math.min(DETENTS.length - 1, fromIndex))];
  const to = DETENTS[Math.max(0, Math.min(DETENTS.length - 1, toIndex))];
  const turnEnd = Math.max(12, durationInFrames - 15);
  const turn = p(f, 1, turnEnd, io);
  const snap = Math.sin(p(f, turnEnd - 4, turnEnd + 4, io) * Math.PI) * 2.8;
  const press = p(f, turnEnd - 2, turnEnd + 2) - p(f, turnEnd + 2, turnEnd + 7);
  const exit = p(
    f,
    durationInFrames - DIAL_SCENE_OVERLAP,
    durationInFrames - 1,
    io,
  );
  const angle = mix(from.angle, to.angle, turn) + snap;
  const active = turn > 0.7 ? toIndex : fromIndex;
  const motion = exitMotion[chapterId];
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - Math.min(1, exit * 2)}}>
      <Shell>
        <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent 0 119px, rgba(14,21,37,0.025) 119px 120px)'}} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: '720px 540px',
            translate: `${260 + motion.x * exit}px ${motion.y * exit}px`,
            scale: mix(1, motion.scale, exit),
            rotate: `${motion.rotate * exit}deg`,
          }}
        >
          <Knob angle={angle} press={press} lit={1} active={active} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 1190,
            top: 360,
            opacity: p(f, 4, 12) * (1 - exit),
            translate: `${motion.textX * exit}px ${mix(24, 0, p(f, 4, 12))}px`,
          }}
        >
          <div style={{fontFamily: mono, fontSize: 22, letterSpacing: 4, color: C.faint}}>CHAPTER / {to.num}</div>
          <div style={{fontSize: 136, fontWeight: 700, letterSpacing: -6, marginTop: 8}}>{to.word}</div>
          <div style={{width: 310, height: 3, background: C.teal, marginTop: 34}} />
          <div style={{fontFamily: mono, fontSize: 17, letterSpacing: 3, color: C.faint, marginTop: 18}}>TURN · CLICK · ENTER</div>
        </div>
      </Shell>
    </div>
  );
};

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
  const first = data.story[0];

  return (
    <Shell>
      <div style={{position: 'absolute', inset: 0, transformOrigin: `${DIAL.cx}px ${DIAL.cy}px`, transform: `translateX(${tx}px) scale(${s})`}}>
        <div style={{position: 'absolute', left: 80, top: 52, opacity: p(f, 70, 84)}}>
          <Small style={engraved}>{data.event.name} / {data.event.meta}</Small>
        </div>
        <Knob angle={angle} press={click1 + click2} lit={lit} active={active} />
        <Display on={power}>
          <div style={{position: 'absolute', left: 80, top: 90, right: 80, opacity: Math.max(0, in00 - out00), transform: `translateY(${mix(24, 0, in00) - 24 * out00}px)`}}>
            <div style={{fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1}}>{data.team.name}</div>
            <Small style={{marginTop: 44, color: C.muted}}>DIFFERENT MINDS. ONE NEXT STEP.</Small>
            <div style={{fontSize: 40, marginTop: 150, color: C.muted, opacity: p(f, 84, 100)}}>{data.team.tagline}</div>
          </div>
          <div style={{position: 'absolute', left: 80, top: 90, right: 80, opacity: in01, transform: `translateY(${mix(24, 0, in01)}px)`}}>
            <Pill variant="chip" size={20} style={{fontWeight: 600, letterSpacing: 3}}>{first.section}</Pill>
            <div style={{fontSize: 58, marginTop: 44}}>{first.lead}</div>
            <div style={{fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 1.15, color: C.blue, opacity: word, transform: `translateY(${30 * (1 - word)}px)`}}>
              {first.keyword}<span style={{color: C.ink}}>。</span>
            </div>
            <div style={{fontSize: 31, lineHeight: 1.7, marginTop: 24, color: C.muted, opacity: word}}>{first.description}</div>
          </div>
        </Display>
      </div>
    </Shell>
  );
};
