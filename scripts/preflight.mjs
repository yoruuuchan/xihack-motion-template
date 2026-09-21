import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentPath = path.join(root, 'src', 'content.json');
const publicRoot = path.join(root, 'public');
const errors = [];
const warnings = [];

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

const checkMedia = (value, label, allowAudio = false) => {
  const src = getMediaSource(value, label).trim();
  if (!src) return;
  if (path.isAbsolute(src) || src.split(/[\\/]+/).includes('..')) {
    errors.push(`${label} must stay inside public/: ${src}`);
    return;
  }
  const allowed = allowAudio ? /\.(mp3|wav|m4a|aac|flac|ogg)$/i : /\.(png|jpe?g|webp|gif|avif|mp4|mov|webm)$/i;
  if (!allowed.test(src)) warnings.push(`${label} has an uncommon extension: ${src}`);
  if (!existsSync(path.join(publicRoot, src))) errors.push(`${label} does not exist under public/: ${src}`);
};

const warnLength = (value, limit, label) => {
  if (typeof value === 'string' && [...value].length > limit) warnings.push(`${label} is ${[...value].length} characters; the current layout is tuned for about ${limit}.`);
};

const data = readJson();
if (data) {
  if (!Array.isArray(data.story) || data.story.length !== 5) errors.push('story must contain exactly 5 beats for the current 60-second timeline.');
  if (!Array.isArray(data.members) || data.members.length < 1 || data.members.length > 6) errors.push('members must contain 1 to 6 people.');
  if (!Array.isArray(data.progress) || data.progress.length < 1 || data.progress.length > 4) errors.push('progress must contain 1 to 4 items.');

  warnLength(data.team?.name, 24, 'team.name');
  warnLength(data.project?.name, 28, 'project.name');
  warnLength(data.project?.oneLiner, 42, 'project.oneLiner');

  if (Array.isArray(data.story)) {
    data.story.forEach((beat, index) => {
      warnLength(beat?.keyword, 12, `story[${index}].keyword`);
      warnLength(beat?.description, 48, `story[${index}].description`);
      checkMedia(beat?.media, `story[${index}].media`);
    });
  }
  if (Array.isArray(data.members)) {
    data.members.forEach((member, index) => {
      warnLength(member?.name, 20, `members[${index}].name`);
      warnLength(member?.role, 32, `members[${index}].role`);
      checkMedia(member?.media, `members[${index}].media`);
    });
  }
  if (Array.isArray(data.progress)) {
    data.progress.forEach((item, index) => {
      warnLength(item?.title, 18, `progress[${index}].title`);
      warnLength(item?.description, 46, `progress[${index}].description`);
      checkMedia(item?.media, `progress[${index}].media`);
    });
  }
  checkMedia(data.music?.src ?? '', 'music.src', true);
}

for (const warning of warnings) console.warn(`WARN  ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length > 0) process.exit(1);
console.log(`Preflight passed: 5 story beats, ${data.members.length} members, ${data.progress.length} progress items, ${warnings.length} warning(s).`);
