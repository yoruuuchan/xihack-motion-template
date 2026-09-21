import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {validateContent} from '../src/content-validation.mjs';
import {CHAPTER_DATA, DIAL_SCENE_OVERLAP, FPS, PROGRESS_CLOSING_WIPE_FRAMES, TOTAL_DURATION} from '../src/timeline-config.mjs';

const root = process.cwd();
const contentPath = path.join(root, 'src', 'content.json');
const publicRoot = path.join(root, 'public');
const filmSeconds = TOTAL_DURATION / FPS;
const errors = [];
const warnings = [];
const info = [];

const readJson = () => {
  try {
    return JSON.parse(readFileSync(contentPath, 'utf8'));
  } catch (error) {
    errors.push(`src/content.json cannot be parsed: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
};

const getMediaSource = (value, label) => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && typeof value.src === 'string') return value.src;
  errors.push(`${label} must be a public/ relative path or a media object with a src field.`);
  return '';
};

const getTrimStart = (value) => value && typeof value === 'object' && typeof value.trimStart === 'number' ? value.trimStart : 0;
const getFit = (value) => value && typeof value === 'object' && typeof value.fit === 'string' ? value.fit : 'cover';

let ffprobeAvailable;
const canProbe = () => {
  if (ffprobeAvailable !== undefined) return ffprobeAvailable;
  const result = spawnSync('ffprobe', ['-version'], {encoding: 'utf8', windowsHide: true});
  ffprobeAvailable = result.status === 0;
  if (!ffprobeAvailable) warnings.push('ffprobe is unavailable; codec, duration, dimensions, and rotation checks were skipped.');
  return ffprobeAvailable;
};

const probe = (absolutePath, label) => {
  if (!canProbe()) return null;
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', absolutePath], {encoding: 'utf8', windowsHide: true});
  if (result.status !== 0) {
    errors.push(`${label} cannot be decoded by ffprobe: ${(result.stderr || 'unknown media error').trim()}`);
    return null;
  }
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    errors.push(`${label} returned invalid ffprobe output: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
};

const mediaDuration = (metadata, stream) => {
  const value = Number(metadata?.format?.duration ?? stream?.duration);
  return Number.isFinite(value) ? value : null;
};

const rotationOf = (stream) => {
  const tagRotation = Number(stream?.tags?.rotate);
  if (Number.isFinite(tagRotation)) return tagRotation;
  const sideRotation = stream?.side_data_list?.map((item) => Number(item.rotation)).find(Number.isFinite);
  return sideRotation ?? 0;
};

const checkMedia = (value, label, {audio = false, expectedSeconds} = {}) => {
  const src = getMediaSource(value, label).trim();
  if (!src) return;
  if (path.isAbsolute(src) || src.split(/[\\/]+/).includes('..')) {
    errors.push(`${label} must stay inside public/: ${src}`);
    return;
  }
  const allowed = audio ? /\.(mp3|wav|m4a|aac|flac|ogg)$/i : /\.(png|jpe?g|webp|gif|avif|mp4|mov|webm)$/i;
  if (!allowed.test(src)) warnings.push(`${label} has an uncommon extension: ${src}`);
  const absolutePath = path.join(publicRoot, src);
  if (!existsSync(absolutePath)) {
    errors.push(`${label} does not exist under public/: ${src}`);
    return;
  }

  const metadata = probe(absolutePath, label);
  if (!metadata) return;
  const stream = metadata.streams?.find((item) => item.codec_type === (audio ? 'audio' : 'video'));
  if (!stream) {
    errors.push(`${label} has no ${audio ? 'audio' : 'visual'} stream: ${src}`);
    return;
  }
  const duration = mediaDuration(metadata, stream);
  const trimStart = getTrimStart(value);
  if (duration !== null && trimStart >= duration) errors.push(`${label}.trimStart (${trimStart.toFixed(2)}s) is beyond the ${duration.toFixed(2)}s source.`);
  if (duration !== null && expectedSeconds && duration - trimStart + 0.05 < expectedSeconds) {
    warnings.push(`${label} has ${(duration - trimStart).toFixed(2)}s after trim; its visible slot is about ${expectedSeconds.toFixed(2)}s.`);
  }
  if (audio && duration !== null && trimStart + filmSeconds > duration + 0.05) {
    errors.push(`${label} needs ${(trimStart + filmSeconds).toFixed(2)}s of source audio, but the file is ${duration.toFixed(2)}s.`);
  }

  const isMotion = /\.(mp4|mov|webm)$/i.test(src);
  if (isMotion) {
    if (stream.codec_name !== 'h264') warnings.push(`${label} uses ${stream.codec_name ?? 'an unknown codec'}; H.264 MP4 is the safest event-day format.`);
    const rotation = rotationOf(stream);
    if (rotation % 360 !== 0) warnings.push(`${label} carries ${rotation} degree rotation metadata; verify the rendered orientation.`);
    if (getFit(value) === 'cover' && /(screen|record|capture|demo|prototype|browser|ui|录屏)/i.test(src)) {
      warnings.push(`${label} looks like a screen recording but uses cover; contain usually preserves interface edges.`);
    }
  }
  const dimensions = stream.width && stream.height ? `${stream.width}x${stream.height}` : 'dimensions unavailable';
  info.push(`${label}: ${stream.codec_name ?? 'unknown codec'}, ${dimensions}${duration === null ? '' : `, ${duration.toFixed(2)}s`}`);
};

const warnLength = (value, limit, label) => {
  if (typeof value === 'string' && [...value].length > limit) warnings.push(`${label} is ${[...value].length} characters; preview the fitted result (guideline: about ${limit}).`);
};

const checkRequiredAsset = (relativePath) => {
  if (!existsSync(path.join(publicRoot, relativePath))) errors.push(`Required runtime asset is missing: public/${relativePath}`);
};

const chapter = (id) => CHAPTER_DATA.find((item) => item.id === id);
const sceneFrames = (item) => item.durationInFrames - (item.dialFrames - DIAL_SCENE_OVERLAP);

const data = readJson();
if (data) {
  for (const issue of validateContent(data)) errors.push(`${issue.path} ${issue.message}.`);

  warnLength(data.event?.name, 20, 'event.name');
  warnLength(data.event?.meta, 20, 'event.meta');
  warnLength(data.team?.name, 12, 'team.name');
  warnLength(data.team?.tagline, 34, 'team.tagline');
  warnLength(data.project?.name, 14, 'project.name');
  warnLength(data.project?.oneLiner, 32, 'project.oneLiner');
  warnLength(data.project?.nextStep, 32, 'project.nextStep');

  const problem = chapter('problem');
  const solution = chapter('solution');
  if (Array.isArray(data.story)) {
    data.story.forEach((beat, index) => {
      warnLength(beat?.section, 24, `story[${index}].section`);
      warnLength(beat?.lead, 16, `story[${index}].lead`);
      warnLength(beat?.keyword, 6, `story[${index}].keyword`);
      warnLength(beat?.description, 40, `story[${index}].description`);
      warnLength(beat?.headline, 18, `story[${index}].headline`);
      beat?.points?.forEach?.((point, pointIndex) => warnLength(point, 8, `story[${index}].points[${pointIndex}]`));
      const expectedSeconds = index < 2 ? sceneFrames(problem) / 2 / FPS : sceneFrames(solution) / 3 / FPS;
      checkMedia(beat?.media, `story[${index}].media`, {expectedSeconds});
    });
  }

  const people = chapter('people');
  if (Array.isArray(data.members)) {
    data.members.forEach((member, index) => {
      warnLength(member?.name, 12, `members[${index}].name`);
      warnLength(member?.role, 22, `members[${index}].role`);
      checkMedia(member?.media, `members[${index}].media`, {expectedSeconds: sceneFrames(people) / FPS});
    });
  }

  const today = chapter('today');
  const progressCount = Array.isArray(data.progress) && data.progress.length > 0 ? data.progress.length : 1;
  const progressBudget = (sceneFrames(today) - PROGRESS_CLOSING_WIPE_FRAMES) / progressCount / FPS;
  info.push(`progress reading budget: ${progressBudget.toFixed(2)}s per item for ${progressCount} item(s), followed by a ${(PROGRESS_CLOSING_WIPE_FRAMES / FPS).toFixed(2)}s recap wipe.`);
  if (Array.isArray(data.progress)) {
    data.progress.forEach((item, index) => {
      warnLength(item?.title, 10, `progress[${index}].title`);
      warnLength(item?.description, 34, `progress[${index}].description`);
      item?.points?.forEach?.((point, pointIndex) => warnLength(point, 8, `progress[${index}].points[${pointIndex}]`));
      checkMedia(item?.media, `progress[${index}].media`, {expectedSeconds: progressBudget});
    });
  }

  const musicSource = typeof data.music?.src === 'string' ? data.music.src.trim() : '';
  if (musicSource) checkMedia(data.music, 'music.src', {audio: true});
  else info.push('music.src is empty: explicit silent mode is active.');

  if (typeof data.music?.fadeIn === 'number' && typeof data.music?.fadeOut === 'number' && data.music.fadeIn + data.music.fadeOut > filmSeconds) {
    errors.push(`music.fadeIn + music.fadeOut must not exceed the ${filmSeconds.toFixed(2)}s film duration.`);
  }
}

checkRequiredAsset('sfx/dial-click.wav');
for (const filename of ['Geist.woff2', 'GeistMono.woff2', 'SourceHanSansSC-Bold.woff2', 'SourceHanSansSC-Regular.woff2']) {
  checkRequiredAsset(`fonts/${filename}`);
}

for (const message of info) console.log(`INFO  ${message}`);
for (const warning of warnings) console.warn(`WARN  ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length > 0) process.exit(1);
console.log(`Preflight passed: 5 story beats, 4 members, ${data?.progress?.length ?? 0} progress items, ${warnings.length} warning(s).`);
