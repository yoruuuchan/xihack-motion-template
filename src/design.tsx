import React from 'react';
import {fitText} from '@remotion/layout-utils';
import {AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {resolveMedia, type MediaInput} from './content';

loadFont({family: 'Geist', url: staticFile('fonts/Geist.woff2'), weight: '100 900'});
loadFont({family: 'Geist Mono', url: staticFile('fonts/GeistMono.woff2'), weight: '100 900'});
loadFont({family: 'Han', url: staticFile('fonts/SourceHanSansSC-Bold.woff2'), weight: '700'});
loadFont({family: 'Han', url: staticFile('fonts/SourceHanSansSC-Regular.woff2'), weight: '400'});

// Akari palette from colors_and_type.css [data-theme=akari]. Ember is intentionally absent.
export const C = {
  blue: '#4F6CE8',
  blueDeep: '#3D58D4',
  deep: '#2E44B0',
  pale: '#DCE3FE',
  pale2: '#B9C6FD',
  base: '#E8ECF3',
  surface: '#EFF2F8',
  elevated: '#F6F8FC',
  sunken: '#DEE3EC',
  ink: '#0E1525',
  muted: '#394560',
  faint: '#6B7793',
  teal: '#1EA8A0',
  tealPale: '#DBF2F0',
  tealDeep: '#188078',
};
export const font = '"Geist", "Han", sans-serif';
export const mono = '"Geist Mono", Consolas, monospace';

// ASSUMPTION: new scene timings are demo art direction, not measured reference values.
// Ease-out uses the Console token (0.22, 1, 0.36, 1); filmstrip travel uses in-out.
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const io = Easing.bezier(0.65, 0, 0.35, 1);
export const p = (f: number, a: number, b: number, e = ease) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Console neumorphism, scaled ~2.5x from the 390px mobile recipes (ASSUMPTION for video scale).
const hi = 'rgba(255,255,255,0.95)';
const lo = 'rgba(143,158,191,0.45)';
const loSoft = 'rgba(143,158,191,0.28)';
const blueHi = 'rgba(255,255,255,0.12)';
const blueLo = 'rgba(24,39,99,0.40)';
export const neo = {
  raised: `-10px -10px 30px ${hi}, 10px 10px 35px ${loSoft}`,
  lifted: `-15px -15px 45px ${hi}, 20px 20px 55px ${lo}`,
  inset: `inset 8px 8px 15px ${loSoft}, inset -8px -8px 15px ${hi}`,
  insetDeep: `inset 10px 10px 20px ${lo}, inset -8px -8px 15px ${hi}`,
  chip: `-3px -3px 8px ${hi}, 5px 5px 12px rgba(143,158,191,0.30)`,
  pressed: 'inset 5px 5px 10px rgba(0,0,0,0.18)',
  selected: `inset 8px 8px 15px ${loSoft}, inset -5px -5px 12px ${hi}, 0 0 0 3px ${C.blue}`,
  primary: '0 10px 30px rgba(79,108,232,0.30), inset 0 2px 0 rgba(255,255,255,0.18)',
  track: `inset 5px 5px 10px rgba(143,158,191,0.40), inset -3px -3px 8px ${hi}`,
  segActive: '-5px -5px 12px rgba(255,255,255,0.85), 5px 5px 15px rgba(143,158,191,0.30)',
  knob: '0 4px 12px rgba(0,0,0,0.18)',
  raisedBlue: `-10px -10px 30px ${blueHi}, 12px 12px 36px ${blueLo}`,
  insetBlue: `inset 8px 8px 16px rgba(24,39,99,0.38), inset -6px -6px 14px ${blueHi}`,
  trackBlue: 'inset 5px 5px 12px rgba(24,39,99,0.45), inset -4px -4px 10px rgba(255,255,255,0.10)',
  segActiveBlue: '0 6px 16px rgba(24,39,99,0.35)',
  panelInset: 'inset 18px 18px 38px rgba(119,135,171,0.34), inset -15px -15px 34px rgba(255,255,255,0.88), 0 2px 0 rgba(255,255,255,0.46)',
  panelInsetBlue: 'inset 18px 18px 38px rgba(24,39,99,0.46), inset -15px -15px 34px rgba(255,255,255,0.10), 0 2px 0 rgba(255,255,255,0.07)',
  face: 'inset 2px 2px 1px rgba(255,255,255,0.90), inset -3px -3px 8px rgba(107,123,158,0.16)',
  faceBlue: 'inset 2px 2px 1px rgba(255,255,255,0.16), inset -4px -4px 10px rgba(20,32,82,0.26)',
  pressedBlue: 'inset 6px 6px 14px rgba(24,39,99,0.38), inset -4px -4px 10px rgba(255,255,255,0.13)',
  badge: '-2px -2px 5px rgba(255,255,255,0.78), 3px 3px 7px rgba(119,135,171,0.24), inset 1px 1px 0 rgba(255,255,255,0.72)',
  badgeInset: 'inset 2px 2px 5px rgba(119,135,171,0.27), inset -2px -2px 5px rgba(255,255,255,0.74)',
};
export const R = {card: 40, inner: 28, pill: 999};

// Subtle gradients describe the direction of light; they are material surfaces, not decorative color effects.
export const material = {
  surface: 'linear-gradient(145deg, #FAFBFE 0%, #F0F3F8 48%, #E4E9F2 100%)',
  elevated: 'linear-gradient(145deg, #FFFFFF 0%, #F5F7FB 50%, #E8EDF5 100%)',
  sunken: 'linear-gradient(145deg, #D5DCE7 0%, #E0E5EE 45%, #EAF0F6 100%)',
  blue: 'linear-gradient(145deg, #637CEF 0%, #4F6CE8 48%, #3A54C7 100%)',
  blueDeep: 'linear-gradient(145deg, #344DBB 0%, #405BCB 46%, #526DDB 100%)',
  teal: 'linear-gradient(145deg, #35BAB2 0%, #1EA8A0 52%, #178A83 100%)',
  tealPale: 'linear-gradient(145deg, #EBFAF8 0%, #DBF2F0 52%, #C5E8E5 100%)',
  pale: 'linear-gradient(145deg, #EEF2FF 0%, #DCE3FE 52%, #C9D4FC 100%)',
  white: 'linear-gradient(145deg, #FFFFFF 0%, #F7F8FB 52%, #E4E9F1 100%)',
};

// Page wash from --page-wash; the lower-left glow uses frost instead of ember.
const baseWash = `radial-gradient(120% 80% at 80% -10%, rgba(79,108,232,0.07), transparent 60%), radial-gradient(90% 70% at 0% 100%, rgba(30,168,160,0.05), transparent 55%), ${C.base}`;
const blueWash = `radial-gradient(120% 80% at 80% -10%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(90% 70% at 0% 100%, rgba(24,39,99,0.18), transparent 55%), ${C.blue}`;
export const wash = (bg: string) => (bg === C.blue ? blueWash : baseWash);

export const Small: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{fontSize: 22, fontWeight: 600, letterSpacing: 3, ...style}}>{children}</div>
);

type FittedTextProps = {
  text: string;
  measurementText?: string;
  suffix?: React.ReactNode;
  maxWidth: number;
  maxFontSize: number;
  minFontSize: number;
  fontWeight?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
};

export const FittedText: React.FC<FittedTextProps> = ({text, measurementText, suffix, maxWidth, maxFontSize, minFontSize, fontWeight = 700, letterSpacing = 0, style}) => {
  const measured = Math.min(
    maxFontSize,
    fitText({
      text: measurementText ?? text,
      withinWidth: maxWidth,
      fontFamily: font,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
      validateFontIsLoaded: false,
    }).fontSize,
  );
  const fontSize = Math.max(minFontSize, measured);
  const scaleX = measured < minFontSize ? measured / minFontSize : 1;
  const customTransform = style?.transform ?? '';
  return (
    <div
      style={{
        width: maxWidth / scaleX,
        maxWidth: `${100 / scaleX}%`,
        whiteSpace: 'nowrap',
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight: 1,
        ...style,
        transform: `scaleX(${scaleX}) ${customTransform}`.trim(),
        transformOrigin: style?.transformOrigin ?? 'left center',
      }}
    >
      {text}{suffix}
    </div>
  );
};

export const Media: React.FC<{asset: MediaInput; style?: React.CSSProperties}> = ({asset, style}) => {
  const {fps} = useVideoConfig();
  const item = resolveMedia(asset);
  const mediaStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: item.fit,
    objectPosition: item.position,
    ...style,
  };
  return /\.(mp4|mov|webm)$/i.test(item.src) ? (
    <OffthreadVideo src={staticFile(item.src)} muted trimBefore={Math.round(item.trimStart * fps)} style={mediaStyle} />
  ) : (
    <Img src={staticFile(item.src)} style={mediaStyle} />
  );
};

export const LocalMedia: React.FC<{
  asset: MediaInput;
  from: number;
  durationInFrames: number;
  style?: React.CSSProperties;
}> = ({asset, from, durationInFrames, style}) => {
  const item = resolveMedia(asset);
  if (!/\.(mp4|mov|webm)$/i.test(item.src)) return <Media asset={asset} style={style} />;
  return (
    <Sequence from={from} durationInFrames={Math.max(1, durationInFrames)} layout="none">
      <Media asset={asset} style={style} />
    </Sequence>
  );
};

export const Shell: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg = C.base}) => (
  <AbsoluteFill style={{background: wash(bg), color: C.ink, fontFamily: font, overflow: 'hidden'}}>{children}</AbsoluteFill>
);

export const MaterialPlate: React.FC<{children?: React.ReactNode; onBlue?: boolean; style?: React.CSSProperties}> = ({children, onBlue, style}) => (
  <div
    style={{
      position: 'relative',
      borderRadius: 52,
      background: onBlue
        ? material.blueDeep
        : material.sunken,
      boxShadow: onBlue ? neo.panelInsetBlue : neo.panelInset,
      boxSizing: 'border-box',
      overflow: 'hidden',
      isolation: 'isolate',
      ...style,
    }}
  >
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: onBlue
          ? 'linear-gradient(145deg, rgba(20,32,82,0.18), transparent 30%, transparent 70%, rgba(255,255,255,0.08))'
          : 'linear-gradient(145deg, rgba(107,123,158,0.10), transparent 30%, transparent 70%, rgba(255,255,255,0.38))',
      }}
    />
    {children}
  </div>
);

export const Card: React.FC<{children?: React.ReactNode; lifted?: boolean; onBlue?: boolean; style?: React.CSSProperties}> = ({children, lifted, onBlue, style}) => (
  <div
    style={{
      background: material.surface,
      borderRadius: R.card,
      boxShadow: `${onBlue ? neo.raisedBlue : lifted ? neo.lifted : neo.raised}, ${neo.face}`,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Well: React.FC<{children?: React.ReactNode; deep?: boolean; onBlue?: boolean; style?: React.CSSProperties}> = ({children, deep, onBlue, style}) => (
  <div
    style={{
      background: onBlue
        ? material.blueDeep
        : material.sunken,
      borderRadius: R.card,
      boxShadow: onBlue ? neo.insetBlue : deep ? neo.insetDeep : neo.inset,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

type PillVariant = 'chip' | 'chipOn' | 'mute' | 'frost' | 'info' | 'blueChip' | 'blueOn' | 'frostOn';
const pillStyles: Record<PillVariant, React.CSSProperties> = {
  chip: {background: material.sunken, color: C.muted, boxShadow: neo.badgeInset},
  chipOn: {background: material.blue, color: 'white', boxShadow: neo.pressedBlue},
  frostOn: {background: material.teal, color: 'white', boxShadow: neo.pressedBlue},
  mute: {background: material.sunken, color: C.faint, boxShadow: neo.badgeInset},
  frost: {background: material.tealPale, color: C.tealDeep, boxShadow: neo.badgeInset},
  info: {background: material.pale, color: C.deep, boxShadow: neo.badgeInset},
  blueChip: {background: material.blueDeep, color: 'white', boxShadow: neo.pressedBlue},
  blueOn: {background: material.elevated, color: C.ink, boxShadow: neo.badgeInset},
};
export const Pill: React.FC<{children: React.ReactNode; variant?: PillVariant; size?: number; style?: React.CSSProperties}> = ({children, variant = 'chip', size = 24, style}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.5,
      padding: `${size * 0.42}px ${size * 1.05}px`,
      borderRadius: R.pill,
      fontSize: size,
      fontWeight: 500,
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      ...pillStyles[variant],
      ...style,
    }}
  >
    {children}
  </div>
);

export const Dot: React.FC<{color?: string; size?: number}> = ({color = C.teal, size = 14}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: R.pill,
      background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.76) 0 11%, ${color} 34%, ${color} 100%)`,
      boxShadow: 'inset -2px -2px 4px rgba(14,21,37,0.18), 2px 2px 5px rgba(119,135,171,0.22)',
      flexShrink: 0,
    }}
  />
);

// Sunken pill track with a raised pill that slides between numbered segments (toggles-segmented.html).
export const Segmented: React.FC<{count: number; pos: number; width: number; height?: number; onBlue?: boolean; style?: React.CSSProperties}> = ({count, pos, width, height = 54, onBlue, style}) => {
  const pad = 7;
  const segW = (width - pad * 2) / count;
  return (
    <div style={{position: 'relative', width, height, borderRadius: R.pill, background: onBlue ? material.blueDeep : material.sunken, boxShadow: onBlue ? neo.trackBlue : neo.track, ...style}}>
      <div style={{position: 'absolute', top: pad, left: pad + pos * segW, width: segW, height: height - pad * 2, borderRadius: R.pill, background: material.elevated, boxShadow: `${onBlue ? neo.segActiveBlue : neo.segActive}, ${neo.face}`}} />
      {Array.from({length: count}, (_, i) => (
        <div key={i} style={{position: 'absolute', top: 0, left: pad + i * segW, width: segW, height, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 19, fontWeight: 500, color: Math.abs(pos - i) < 0.5 ? C.ink : onBlue ? 'rgba(255,255,255,0.55)' : C.faint}}>
          0{i + 1}
        </div>
      ))}
    </div>
  );
};

// Inset slider track with primary fill and a white knob (toggles-segmented.html, slider block).
export const Track: React.FC<{progress: number; width: number; onBlue?: boolean; knob?: boolean; style?: React.CSSProperties}> = ({progress, width, onBlue, knob = true, style}) => {
  const h = 14;
  const fillW = Math.max(h, width * progress);
  return (
    <div style={{position: 'relative', width, height: h, borderRadius: R.pill, background: onBlue ? material.blueDeep : material.sunken, boxShadow: onBlue ? neo.trackBlue : neo.track, ...style}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: fillW, borderRadius: R.pill, background: onBlue ? 'white' : `linear-gradient(90deg, #6E89F2, ${C.blue})`}} />
      {knob ? <div style={{position: 'absolute', top: h / 2 - 18, left: fillW - 18, width: 36, height: 36, borderRadius: R.pill, background: material.white, boxShadow: `${neo.knob}, ${neo.face}`}} /> : null}
    </div>
  );
};

// 14-rounded squircle at 40px in the avatar recipe; same proportion here.
export const Tile: React.FC<{size: number; variant?: 'primary' | 'surface' | 'onBlue'; children?: React.ReactNode; style?: React.CSSProperties}> = ({size, variant = 'primary', children, style}) => {
  const look: Record<string, React.CSSProperties> = {
    primary: {background: material.blue, boxShadow: `${neo.primary}, ${neo.faceBlue}`},
    surface: {background: material.surface, boxShadow: `${neo.raised}, ${neo.face}`},
    onBlue: {background: material.blue, boxShadow: `${neo.raisedBlue}, ${neo.faceBlue}`},
  };
  return (
    <div style={{width: size, height: size, borderRadius: size * 0.35, display: 'grid', placeItems: 'center', ...look[variant], ...style}}>{children}</div>
  );
};

export const DemoStamp = () => (
  <div style={{position: 'absolute', right: 80, bottom: 116, zIndex: 55}}>
    <Pill variant="mute" size={18} style={{letterSpacing: 2}}>DEMO · 演示内容</Pill>
  </div>
);

export const Rail: React.FC<{label: string; event: string; meta: string; light?: boolean}> = ({label, event, meta, light}) => (
  <div style={{position: 'absolute', top: 52, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: light ? 'white' : C.ink}}>
    <Small>{event} <span style={{opacity: 0.45}}> / </span> {meta}</Small>
    <Pill variant={light ? 'blueOn' : 'chipOn'} size={20} style={{fontWeight: 600, letterSpacing: 3}}>{label}</Pill>
  </div>
);
