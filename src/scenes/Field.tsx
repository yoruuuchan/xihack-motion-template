import React from 'react';
import {useCurrentFrame} from 'remotion';
import {content as data, hasMedia, type ProgressItem} from '../content';
import {C, Card, LocalMedia, Media, Pill, R, Rail, Segmented, Shell, Small, io, mix, mono, neo, p, wash} from '../design';
import {PROGRESS_CLOSING_WIPE_FRAMES} from '../timeline';

// Empty media slot reads as a sunken well; real media sits on the raised card face.
const Portrait: React.FC<{index: number; showLabel: boolean}> = ({index, showLabel}) => {
  const tone = index % 2 ? C.blue : C.pale2;
  return (
    <div style={{position: 'absolute', inset: 18, borderRadius: R.inner, background: C.sunken, boxShadow: neo.insetDeep, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 28, top: 22, fontFamily: mono, fontSize: 84, fontWeight: 500, color: tone, opacity: 0.35}}>0{index + 1}</div>
      <svg viewBox="0 0 400 600" width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
        <circle cx={200 + index * 8} cy="230" r="72" fill={tone} />
        <path d="M38 600V479C38 370 116 334 200 334C284 334 362 370 362 479V600Z" fill={tone} />
      </svg>
      {showLabel ? <div style={{position: 'absolute', top: 22, right: 22}}><Pill variant="mute" size={16} style={{letterSpacing: 2}}>人物素材位 / 0{index + 1}</Pill></div> : null}
    </div>
  );
};

export const Team: React.FC<{durationInFrames?: number}> = ({durationInFrames = 232}) => {
  const f = useCurrentFrame();
  const memberCount = 4;
  const focusStart = 24;
  const togetherStart = durationInFrames - 70;
  const memberWindow = (togetherStart - focusStart) / memberCount;
  const idx = Math.min(memberCount - 1, Math.floor(Math.max(0, f - focusStart) / memberWindow));
  const together = p(f, togetherStart, togetherStart + 30, io);
  const entrance = p(f, 0, 24);
  const active = data.members[idx];
  const gap = 27;
  const cardWidth = 405;
  const rowWidth = cardWidth * memberCount + gap * (memberCount - 1);
  const rowLeft = (1920 - rowWidth) / 2;
  return (
    <Shell>
      <Rail label="03 / THE PEOPLE" event={data.event.name} meta={data.event.meta} />
      <div style={{position: 'absolute', left: 110, top: 150, opacity: entrance}}>
        <Small style={{color: C.tealDeep}}>MEET THE TEAM</Small>
        <div style={{fontSize: 70, fontWeight: 700, marginTop: 14}}>不同的人，同一个下一步。</div>
      </div>
      {data.members.map((member, i) => {
        const selected = i === idx;
        const focusIn = focusStart + i * memberWindow;
        const focusOut = focusStart + (i + 1) * memberWindow;
        const activeAmount = (i === 0 ? 1 : p(f, focusIn, focusIn + 12)) - (i === memberCount - 1 ? 0 : p(f, focusOut, focusOut + 12));
        const cardY = mix(mix(345, 305, activeAmount), 321, together);
        const cardH = mix(mix(487, 527, activeAmount), 480, together);
        const appear = p(f, i * 4, 24 + i * 4);
        const ring = selected || together > 0.5 ? `, 0 0 0 3px ${C.blue}` : '';
        return (
          <div
            key={`${i}-${member.name}`}
            style={{
              position: 'absolute',
              left: rowLeft + i * (cardWidth + gap),
              top: cardY + (1 - appear) * 180,
              width: cardWidth,
              height: cardH,
              opacity: appear,
              borderRadius: R.card,
              overflow: 'hidden',
              background: C.surface,
              boxShadow: (selected ? neo.lifted : neo.raised) + ring,
            }}
          >
            {hasMedia(member.media) ? <Media asset={member.media} /> : <Portrait index={i} showLabel={data.demo} />}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '54px 24px 19px',
                color: hasMedia(member.media) ? 'white' : C.ink,
                background: hasMedia(member.media)
                  ? 'linear-gradient(transparent, rgba(14,21,37,0.82))'
                  : 'linear-gradient(transparent, rgba(239,242,248,0.96))',
              }}
            >
              <div style={{fontSize: 30, fontWeight: 700}}>{member.name}</div>
              <div style={{fontSize: 17, letterSpacing: 1, marginTop: 7, opacity: 0.78}}>{member.role}</div>
            </div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 110, top: 862, display: 'flex', gap: 28, alignItems: 'center', opacity: 1 - together}}>
        <div style={{fontSize: 48, fontWeight: 700}}>{active.name}</div>
        <Pill variant="chip" size={24}>{active.role}</Pill>
      </div>
      <div style={{position: 'absolute', left: 110, top: 863, opacity: together, fontSize: 45, fontWeight: 700}}>
        一起讨论。一起动手。<span style={{color: C.teal}}>一起往前。</span>
      </div>
      {data.demo && !data.members.some((member) => hasMedia(member.media)) ? (
        <div style={{position: 'absolute', right: 110, top: 232}}>
          <Pill variant="mute" size={18}>演示占位 · 现场替换为人物实拍</Pill>
        </div>
      ) : null}
    </Shell>
  );
};

const Sketch: React.FC<{item: ProgressItem}> = ({item}) => {
  return (
    <div style={{position: 'absolute', inset: 0, background: C.surface, padding: '52px 64px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Small style={{fontSize: 20, color: C.faint}}>FIELD NOTES / DAY 01</Small>
        {data.demo ? <Pill variant="mute" size={16}>示例草图</Pill> : <Pill variant="frost" size={16}>现场进展</Pill>}
      </div>
      <div style={{fontSize: 54, fontWeight: 700, marginTop: 40}}>{item.title}</div>
      <div style={{display: 'flex', gap: 24, alignItems: 'center', marginTop: 56}}>
        {item.points.map((point, i) => (
          <React.Fragment key={`${i}-${point}`}>
            {i > 0 ? <div style={{width: 36, height: 3, borderRadius: R.pill, background: C.teal, flexShrink: 0}} /> : null}
            <div
              style={{
                width: 205,
                height: 180,
                borderRadius: R.inner,
                background: i === 1 ? C.blue : C.surface,
                color: i === 1 ? 'white' : C.ink,
                boxShadow: i === 1 ? neo.pressed : neo.raised,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: 29,
              }}
            >
              <div style={{fontFamily: mono, fontSize: 18, opacity: 0.6}}>0{i + 1}</div>
              <div style={{fontSize: 40, fontWeight: 700, marginTop: 14}}>{point}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {data.demo ? <div style={{marginTop: 48}}><Pill variant="mute" size={20}>实拍 / 白板 / 原型录屏素材位</Pill></div> : null}
    </div>
  );
};

export const Progress: React.FC<{durationInFrames?: number}> = ({durationInFrames = 247}) => {
  const f = useCurrentFrame();
  const progressCount = data.progress.length;
  const activeDuration = durationInFrames - PROGRESS_CLOSING_WIPE_FRAMES;
  const segmentDuration = activeDuration / progressCount;
  const idx = Math.min(progressCount - 1, Math.floor(f / segmentDuration));
  let pos = 0;
  for (let index = 1; index < progressCount; index++) pos += p(f, index * segmentDuration, index * segmentDuration + 13);
  const localFrame = f - idx * segmentDuration;
  const enter = p(localFrame, 0, progressCount === 4 ? 10 : 18);
  const numberIn = p(localFrame, 0, 9);
  const titleIn = p(localFrame, 3, 14);
  const descriptionIn = p(localFrame, 7, 19);
  const segmentedIn = p(localFrame, 11, 23);
  const closing = p(f, durationInFrames - PROGRESS_CLOSING_WIPE_FRAMES, durationInFrames - 1, io);
  const r = data.progress[idx];
  return (
    <Shell bg={C.blue}>
      <Rail label="04 / IN THE MAKING" event={data.event.name} meta={data.event.meta} light />
      <div style={{position: 'absolute', left: 110, top: 150, color: 'white'}}>
        <Small style={{opacity: 0.7}}>DAY ONE</Small>
        <div style={{fontSize: 75, fontWeight: 700, marginTop: 10}}>今天，向前一步。</div>
      </div>
      <Card onBlue style={{position: 'absolute', left: 110, top: 329, width: 1040, height: 570, overflow: 'hidden', transform: `translateY(${24 * (1 - enter)}px) scale(${mix(1, 0.97, closing)})`, opacity: enter}}>
        <Sketch item={r} />
        {hasMedia(r.media) ? (
          <LocalMedia
            asset={r.media}
            from={Math.floor(idx * segmentDuration)}
            durationInFrames={Math.ceil(durationInFrames - idx * segmentDuration)}
            style={{position: 'absolute', inset: 0}}
          />
        ) : null}
      </Card>
      <div style={{position: 'absolute', left: 1230, top: 385, width: 590, color: 'white', perspective: 1050, perspectiveOrigin: '0% 45%', transformStyle: 'preserve-3d'}}>
        <div
          style={{
            fontSize: 95,
            fontWeight: 700,
            letterSpacing: -5,
            opacity: numberIn * 0.25,
            transformOrigin: 'left bottom',
            transform: `translate3d(0, ${-26 * (1 - numberIn)}px, ${-120 * (1 - numberIn)}px) rotateX(${14 * (1 - numberIn)}deg)`,
          }}
        >
          0{idx + 1}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            marginTop: 25,
            opacity: titleIn,
            transformOrigin: 'left center',
            transform: `translate3d(${128 * (1 - titleIn)}px, 0, ${48 * (1 - titleIn)}px) rotateY(${-12 * (1 - titleIn)}deg)`,
          }}
        >
          {r.title}
        </div>
        <div
          style={{
            fontSize: 31,
            lineHeight: 1.8,
            marginTop: 30,
            maxWidth: 540,
            opacity: descriptionIn,
            transformOrigin: 'left top',
            transform: `translate3d(0, ${72 * (1 - descriptionIn)}px, ${-34 * (1 - descriptionIn)}px) rotateX(${-9 * (1 - descriptionIn)}deg)`,
          }}
        >
          {r.description}
        </div>
        <div style={{opacity: segmentedIn, transform: `translate3d(0, ${20 * (1 - segmentedIn)}px, ${-16 * (1 - segmentedIn)}px)`}}>
          <Segmented count={progressCount} pos={pos} width={Math.max(180, progressCount * 100)} onBlue style={{marginTop: 44}} />
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, zIndex: 10, background: wash(C.base), clipPath: `inset(${100 * (1 - closing)}% 0 0 0)`}}>
        <div style={{position: 'absolute', left: 110, right: 110, top: 560}}>
          <Small style={{color: C.tealDeep}}>DAY ONE / CHECKPOINT</Small>
          <div style={{fontSize: 68, fontWeight: 700, marginTop: 12}}>今天，我们推进了这些。</div>
          <div style={{display: 'grid', gridTemplateColumns: `repeat(${progressCount}, minmax(0, 1fr))`, gap: 20, marginTop: 46}}>
            {data.progress.map((item, index) => (
              <div key={`${index}-${item.title}`} style={{padding: '24px 25px', borderRadius: R.inner, background: C.surface, boxShadow: neo.raised, display: 'flex', alignItems: 'center', gap: 18}}>
                <span style={{fontFamily: mono, fontSize: 18, color: C.tealDeep}}>0{index + 1}</span>
                <span style={{fontSize: 26, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
};
