import rawContent from './content.json';

export type StoryLayout = 'notes' | 'focus' | 'list' | 'steps' | 'timeline';

export type MediaInput =
  | string
  | {
      src: string;
      fit?: 'cover' | 'contain';
      position?: string;
      trimStart?: number;
    };

export type StoryBeat = {
  section: string;
  lead: string;
  keyword: string;
  description: string;
  headline: string;
  layout: StoryLayout;
  points: [string, string, string];
  media: MediaInput;
};

export type Member = {
  name: string;
  role: string;
  media: MediaInput;
};

export type ProgressItem = {
  title: string;
  description: string;
  points: [string, string, string];
  media: MediaInput;
};

export type ProjectContent = {
  event: {name: string; meta: string};
  team: {name: string; tagline: string};
  project: {name: string; oneLiner: string; nextStep: string};
  demo: boolean;
  music: {src: string; volume: number};
  story: [StoryBeat, StoryBeat, StoryBeat, StoryBeat, StoryBeat];
  members: Member[];
  progress: ProgressItem[];
};

const fail = (path: string, expectation: string): never => {
  throw new Error(`content.json: ${path} must be ${expectation}`);
};

const record = (value: unknown, path: string): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(path, 'an object');
  return value as Record<string, unknown>;
};

const text = (value: unknown, path: string) => {
  if (typeof value !== 'string') fail(path, 'a string');
};

const media = (value: unknown, path: string) => {
  if (typeof value === 'string') return;
  const item = record(value, path);
  text(item.src, `${path}.src`);
  if (item.fit !== undefined && item.fit !== 'cover' && item.fit !== 'contain') fail(`${path}.fit`, '"cover" or "contain"');
  if (item.position !== undefined) text(item.position, `${path}.position`);
  if (item.trimStart !== undefined && (typeof item.trimStart !== 'number' || item.trimStart < 0)) fail(`${path}.trimStart`, 'a non-negative number');
};

const threePoints = (value: unknown, path: string) => {
  if (!Array.isArray(value) || value.length !== 3) fail(path, 'an array of exactly 3 strings');
  const points = value as unknown[];
  points.forEach((point, index) => text(point, `${path}[${index}]`));
};

const parseContent = (value: unknown): ProjectContent => {
  const root = record(value, 'root');
  const event = record(root.event, 'event');
  text(event.name, 'event.name');
  text(event.meta, 'event.meta');

  const team = record(root.team, 'team');
  text(team.name, 'team.name');
  text(team.tagline, 'team.tagline');

  const project = record(root.project, 'project');
  text(project.name, 'project.name');
  text(project.oneLiner, 'project.oneLiner');
  text(project.nextStep, 'project.nextStep');

  if (typeof root.demo !== 'boolean') fail('demo', 'a boolean');
  const music = record(root.music, 'music');
  text(music.src, 'music.src');
  if (typeof music.volume !== 'number' || music.volume < 0 || music.volume > 1) fail('music.volume', 'a number from 0 to 1');

  if (!Array.isArray(root.story) || root.story.length !== 5) fail('story', 'an array of exactly 5 beats');
  const layouts: StoryLayout[] = ['notes', 'focus', 'list', 'steps', 'timeline'];
  const story = root.story as unknown[];
  story.forEach((value, index) => {
    const beat = record(value, `story[${index}]`);
    ['section', 'lead', 'keyword', 'description', 'headline'].forEach((key) => text(beat[key], `story[${index}].${key}`));
    if (!layouts.includes(beat.layout as StoryLayout)) fail(`story[${index}].layout`, layouts.map((item) => `"${item}"`).join(', '));
    threePoints(beat.points, `story[${index}].points`);
    media(beat.media, `story[${index}].media`);
  });

  if (!Array.isArray(root.members) || root.members.length < 1 || root.members.length > 6) fail('members', 'an array with 1 to 6 items');
  const members = root.members as unknown[];
  members.forEach((value, index) => {
    const member = record(value, `members[${index}]`);
    text(member.name, `members[${index}].name`);
    text(member.role, `members[${index}].role`);
    media(member.media, `members[${index}].media`);
  });

  if (!Array.isArray(root.progress) || root.progress.length < 1 || root.progress.length > 4) fail('progress', 'an array with 1 to 4 items');
  const progress = root.progress as unknown[];
  progress.forEach((value, index) => {
    const item = record(value, `progress[${index}]`);
    text(item.title, `progress[${index}].title`);
    text(item.description, `progress[${index}].description`);
    threePoints(item.points, `progress[${index}].points`);
    media(item.media, `progress[${index}].media`);
  });

  return value as ProjectContent;
};

export const content = parseContent(rawContent);

export const resolveMedia = (input: MediaInput) =>
  typeof input === 'string'
    ? {src: input, fit: 'cover' as const, position: '50% 50%', trimStart: 0}
    : {
        src: input.src,
        fit: input.fit ?? ('cover' as const),
        position: input.position ?? '50% 50%',
        trimStart: input.trimStart ?? 0,
      };

export const hasMedia = (input: MediaInput) => resolveMedia(input).src.trim().length > 0;
