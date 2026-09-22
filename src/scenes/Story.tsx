import React from 'react';
import {useCurrentFrame} from 'remotion';
import {content as data, hasMedia, type StoryBeat} from '../content';
import {C, Card, Dot, FittedText, LocalMedia, MaterialPlate, Pill, R, Rail, Segmented, Shell, Track, Well, io, material, mix, mono, neo, p} from '../design';

const Note: React.FC<{text: string; x: number; y: number; rotate?: number; dark?: boolean}> = ({text, x, y, rotate = 0, dark}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 270,
      padding: '26px 28px',
      borderRadius: R.inner,
      background: dark ? material.blue : material.surface,
      color: dark ? 'white' : C.ink,
      boxShadow: dark ? `${neo.raisedBlue}, ${neo.faceBlue}` : `${neo.raised}, ${neo.face}`,
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
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: blue ? material.blueDeep : material.sunken,
        color: blue ? 'white' : C.ink,
        boxShadow: blue ? neo.insetBlue : neo.insetDeep,
        padding: '34px 42px',
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontFamily: mono, fontSize: 18, letterSpacing: 1, opacity: 0.7}}>project / canvas</span>
        {data.demo ? <Pill variant={blue ? 'blueChip' : 'mute'} size={15}>概念演示</Pill> : null}
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
              <React.Fragment key={`${index}-${point}`}>
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
              key={`${index}-${point}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                marginTop: index === 0 ? 34 : 24,
                fontSize: 29,
                fontWeight: 500,
                padding: '18px 28px',
                borderRadius: R.inner,
                background: material.sunken,
                boxShadow: index === 1 ? neo.selected : neo.inset,
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
              <div key={`${index}-${point}`} style={{flex: 1, padding: '24px 26px', height: 216, borderRadius: R.inner, background: material.blueDeep, boxShadow: neo.insetBlue}}>
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
              <div key={`${index}-${point}`} style={{position: 'absolute', left: `${index * 50}%`, transform: 'translateX(-50%)', marginLeft: index === 0 ? 46 : index === beat.points.length - 1 ? -46 : 0}}>
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

export const Story: React.FC<{beatIndices?: number[]; durationInFrames?: number; railLabel?: string}> = ({
  beatIndices = [0, 1, 2, 3, 4],
  durationInFrames = 540,
  railLabel = 'PROJECT STORY',
}) => {
  const f = useCurrentFrame();
  const beats = beatIndices.map((index) => data.story[index]);
  const beatDuration = durationInFrames / beats.length;
  const switches = beats.map((_, index) => index * beatDuration);
  const lastIndex = beats.length - 1;
  // 16-frame rolling window inherited from WordRelayFilmstrip.tsx v3.
  let step = 0;
  for (const switchFrame of switches.slice(1)) step += p(f, switchFrame, switchFrame + 16, io);
  const current = Math.min(lastIndex, switches.filter((switchFrame) => switchFrame <= f).length - 1);
  const local = f - switches[current];
  const problemChapter = beatIndices[0] === 0;
  const solutionChapter = beatIndices[0] === 2;
  // Solution uses one motion engine: the inherited axis locks, opens the headline,
  // then reveals the explanation. It is fully settled before the reading hold.
  const solutionEngine = solutionChapter ? p(local, 0, 38, io) : 0;
  const labelIn = solutionChapter ? p(solutionEngine, 0, 0.24) : p(local, 0, 15);
  const leadIn = solutionChapter ? p(solutionEngine, 0.06, 0.48) : p(local, 0, problemChapter ? 25 : 27);
  const keywordIn = solutionChapter ? p(solutionEngine, 0.22, 0.74) : p(local, 5, problemChapter ? 30 : 32);
  const descriptionIn = solutionChapter ? p(solutionEngine, 0.48, 0.94) : p(local, 11, problemChapter ? 35 : 37);
  const segmentedIn = solutionChapter ? p(solutionEngine, 0.7, 1) : p(local, 18, 39);
  const activeBeat = beats[current];
  const expansion = beatIndices[current] === 4 && hasMedia(activeBeat.media)
    ? p(local, Math.max(24, beatDuration - 37), Math.max(44, beatDuration - 17), io)
    : 0;
  const timelineT = current === lastIndex ? p(local, 20, 72, io) : 0;
  const x = mix(110, 0, expansion);
  const y = mix(285, 0, expansion);
  const w = mix(850, 1920, expansion);
  const h = mix(510, 1080, expansion);
  return (
    <Shell>
      <MaterialPlate style={{position: 'absolute', left: 1038, top: 132, width: 822, height: 812, opacity: 1 - expansion}} />
      <Rail label={railLabel} event={data.event.name} meta={data.event.meta} />
      <Well deep style={{position: 'absolute', left: 52, top: 150, width: 958, height: 780, borderRadius: 48, opacity: 1 - expansion}} />
      <div style={{position: 'absolute', left: x, top: y, width: w, height: h, zIndex: 4, transformOrigin: '0 0', clipPath: 'inset(-135px -58px -135px -58px)'}}>
        <div style={{position: 'absolute', width: 850, height: 510, transformOrigin: '0 0', transform: `scale(${w / 850}, ${h / 510})`}}>
          {beats.map((beat, index) => (
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
              <SampleCard beat={beat} t={index === lastIndex ? timelineT : 0} />
              {hasMedia(beat.media) ? (
                <LocalMedia
                  asset={beat.media}
                  from={Math.round(switches[index])}
                  durationInFrames={Math.ceil(durationInFrames - switches[index])}
                  style={{position: 'absolute', inset: 0}}
                />
              ) : null}
            </Card>
          ))}
        </div>
      </div>
      {solutionChapter ? (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 1074,
            top: 540,
            width: 310,
            height: 3,
            borderRadius: 999,
            background: C.teal,
            boxShadow: '0 0 0 5px rgba(30,168,160,0.08)',
            transform: 'translate(-50%, -50%) rotate(90deg) scaleX(1.55)',
            transformOrigin: 'center',
            opacity: mix(0.96, 0.28, p(local, 0, 18)),
            zIndex: 5,
          }}
        />
      ) : null}
      <div style={{position: 'absolute', left: 1092, top: 300, width: 700, opacity: 1 - expansion, zIndex: 5, perspective: 1100, perspectiveOrigin: '0% 45%', transformStyle: 'preserve-3d'}}>
        <div style={{opacity: labelIn, transform: `translate3d(${-24 * (1 - labelIn)}px, 0, 0)`, transformOrigin: 'left center'}}>
          <Pill variant={current < 2 ? 'chip' : 'frost'} size={20} style={{fontWeight: 600, letterSpacing: 3}}>{activeBeat.section}</Pill>
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 400,
            marginTop: 40,
            opacity: leadIn,
            transformOrigin: 'left center',
            transform: problemChapter
              ? `translate3d(0, ${-82 * (1 - leadIn)}px, ${-24 * (1 - leadIn)}px) rotateX(${12 * (1 - leadIn)}deg)`
              : solutionChapter
                ? `translate3d(0, ${58 * (1 - leadIn)}px, ${-18 * (1 - leadIn)}px) rotateZ(${8 * (1 - leadIn)}deg)`
                : `translateY(${30 * (1 - leadIn)}px)`,
          }}
        >
          {activeBeat.lead}
        </div>
        <div style={{height: 169, overflow: 'hidden'}}>
          <FittedText
            text={activeBeat.keyword}
            measurementText={`${activeBeat.keyword}。`}
            suffix={<span style={{color: C.ink}}>。</span>}
            maxWidth={700}
            maxFontSize={133}
            minFontSize={72}
            letterSpacing={-6}
            style={{
              lineHeight: 1.2,
              color: current < 2 ? C.blue : C.teal,
              opacity: keywordIn,
              transformOrigin: 'left center',
              transform: problemChapter
                ? `translate3d(${152 * (1 - keywordIn)}px, 0, ${34 * (1 - keywordIn)}px) rotateY(${-10 * (1 - keywordIn)}deg)`
                : solutionChapter
                  ? `translate3d(${-22 * (1 - keywordIn)}px, ${12 * (1 - keywordIn)}px, ${28 * (1 - keywordIn)}px) rotateY(${-11 * (1 - keywordIn)}deg) rotateZ(${2.5 * (1 - keywordIn)}deg)`
                  : `translateY(${30 * (1 - keywordIn)}px)`,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 31,
            lineHeight: 1.7,
            maxWidth: 600,
            marginTop: 30,
            opacity: descriptionIn,
            transformOrigin: 'left center',
            transform: problemChapter
              ? `translate3d(0, ${76 * (1 - descriptionIn)}px, ${-20 * (1 - descriptionIn)}px) rotateX(${-8 * (1 - descriptionIn)}deg)`
              : solutionChapter
                ? `translate3d(0, ${-54 * (1 - descriptionIn)}px, ${-22 * (1 - descriptionIn)}px) rotateZ(${-7 * (1 - descriptionIn)}deg)`
                : `translateY(${24 * (1 - descriptionIn)}px)`,
          }}
        >
          {activeBeat.description}
        </div>
        <div style={{opacity: segmentedIn, transform: `translateY(${18 * (1 - segmentedIn)}px)`}}>
          <Segmented count={beats.length} pos={step} width={Math.max(240, beats.length * 84)} style={{marginTop: 48}} />
        </div>
      </div>
    </Shell>
  );
};
