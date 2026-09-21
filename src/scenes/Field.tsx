import React from 'react';
import {useCurrentFrame} from 'remotion';
import data from '../content.json';
import {C, Card, Media, Pill, R, Rail, Segmented, Shell, Small, io, mix, mono, neo, p, wash} from '../design';

// Empty media slot reads as a sunken well; real media sits on the raised card face.
const Portrait: React.FC<{index: number}> = ({index}) => {
  const tone = index % 2 ? C.blue : C.pale2;
  return (
    <div style={{position: 'absolute', inset: 18, borderRadius: R.inner, background: C.sunken, boxShadow: neo.insetDeep, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 28, top: 22, fontFamily: mono, fontSize: 84, fontWeight: 500, color: tone, opacity: 0.35}}>0{index + 1}</div>
      <svg viewBox="0 0 400 600" width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
        <circle cx={200 + index * 8} cy="230" r="72" fill={tone} />
        <path d="M38 600V479C38 370 116 334 200 334C284 334 362 370 362 479V600Z" fill={tone} />
      </svg>
      <div style={{position: 'absolute', bottom: 22, left: 22}}>
        <Pill variant="mute" size={16} style={{letterSpacing: 2}}>人物素材位 / 0{index + 1}</Pill>
      </div>
    </div>
  );
};

export const Team = () => {
  const f = useCurrentFrame();
  const idx = Math.min(data.members.length - 1, Math.floor(Math.max(0, f - 32) / 82));
  const together = p(f, 337, 370, io);
  const entrance = p(f, 0, 24);
  const active = data.members[idx];
  return (
    <Shell>
      <Rail label="04 / THE PEOPLE" duration={420} />
      <div style={{position: 'absolute', left: 110, top: 150, opacity: entrance}}>
        <Small style={{color: C.tealDeep}}>MEET THE TEAM</Small>
        <div style={{fontSize: 70, fontWeight: 700, marginTop: 14}}>不同的人，同一个下一步。</div>
      </div>
      {data.members.map((member, i) => {
        const selected = i === idx;
        const activeAmount = (i === 0 ? 1 : p(f, 32 + i * 82, 50 + i * 82)) - (i === data.members.length - 1 ? 0 : p(f, 32 + (i + 1) * 82, 50 + (i + 1) * 82));
        const cardY = mix(mix(345, 305, activeAmount), 321, together);
        const cardH = mix(mix(487, 527, activeAmount), 480, together);
        const appear = p(f, i * 4, 24 + i * 4);
        const ring = selected || together > 0.5 ? `, 0 0 0 3px ${C.blue}` : '';
        return (
          <div
            key={member.name}
            style={{
              position: 'absolute',
              left: 110 + i * 432,
              top: cardY + (1 - appear) * 180,
              width: 405,
              height: cardH,
              opacity: appear,
              borderRadius: R.card,
              overflow: 'hidden',
              background: C.surface,
              boxShadow: (selected ? neo.lifted : neo.raised) + ring,
            }}
          >
            {member.media ? <Media src={member.media} /> : <Portrait index={i} />}
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
      {!data.members.some((m) => m.media) ? (
        <div style={{position: 'absolute', right: 110, top: 232}}>
          <Pill variant="mute" size={18}>演示占位 · 现场替换为人物实拍</Pill>
        </div>
      ) : null}
    </Shell>
  );
};

const Sketch: React.FC<{index: number}> = ({index}) => {
  const steps = index === 0 ? ['场景', '阻碍', '机会'] : index === 1 ? ['收集', '拆解', '接力'] : ['尝试', '反馈', '调整'];
  return (
    <div style={{position: 'absolute', inset: 0, background: C.surface, padding: '52px 64px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Small style={{fontSize: 20, color: C.faint}}>FIELD NOTES / DAY 01</Small>
        <Pill variant="mute" size={16}>示例草图</Pill>
      </div>
      <div style={{fontSize: 54, fontWeight: 700, marginTop: 40}}>{['先找到那个问题。', '把想法，摆到桌面上。', '交给真实的使用者。'][index]}</div>
      <div style={{display: 'flex', gap: 24, alignItems: 'center', marginTop: 56}}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
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
              <div style={{fontSize: 40, fontWeight: 700, marginTop: 14}}>{s}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{marginTop: 48}}>
        <Pill variant="mute" size={20}>实拍 / 白板 / 原型录屏素材位</Pill>
      </div>
    </div>
  );
};

export const Progress = () => {
  const f = useCurrentFrame();
  const idx = Math.min(2, Math.floor(f / 130));
  const pos = p(f, 130, 143) + p(f, 260, 273);
  const enter = p(f % 130, 0, 18);
  const closing = p(f, 385, 419, io);
  const r = data.progress[idx];
  return (
    <Shell bg={C.blue}>
      <Rail label="05 / IN THE MAKING" duration={420} light />
      <div style={{position: 'absolute', left: 110, top: 150, color: 'white'}}>
        <Small style={{opacity: 0.7}}>DAY ONE</Small>
        <div style={{fontSize: 75, fontWeight: 700, marginTop: 10}}>今天，向前一步。</div>
      </div>
      <Card onBlue style={{position: 'absolute', left: 110, top: 329, width: 1040, height: 570, overflow: 'hidden', transform: `translateY(${24 * (1 - enter)}px) scale(${mix(1, 0.97, closing)})`, opacity: enter}}>
        {r.media ? <Media src={r.media} /> : <Sketch index={idx} />}
      </Card>
      <div style={{position: 'absolute', left: 1230, top: 385, width: 590, color: 'white'}}>
        <div style={{fontSize: 95, fontWeight: 700, letterSpacing: -5, opacity: 0.25}}>0{idx + 1}</div>
        <div style={{fontSize: 64, fontWeight: 700, marginTop: 25, opacity: enter}}>{r.title}</div>
        <div style={{fontSize: 31, lineHeight: 1.8, marginTop: 30, maxWidth: 540, opacity: enter}}>{r.description}</div>
        <Segmented count={3} pos={pos} width={300} onBlue style={{marginTop: 44}} />
      </div>
      <div style={{position: 'absolute', inset: 0, background: wash(C.base), clipPath: `inset(${100 * (1 - closing)}% 0 0 0)`}} />
    </Shell>
  );
};
