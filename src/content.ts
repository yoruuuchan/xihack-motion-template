import rawContent from './content.json';
import {validateContent} from './content-validation.mjs';

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
  music: {
    src: string;
    volume: number;
    trimStart: number;
    fadeIn: number;
    fadeOut: number;
  };
  story: [StoryBeat, StoryBeat, StoryBeat, StoryBeat, StoryBeat];
  members: Member[];
  progress: ProgressItem[];
};

const contentIssues = validateContent(rawContent);
if (contentIssues.length > 0) {
  throw new Error(`Invalid content.json:\n${contentIssues.map(({path, message}) => `- ${path} ${message}`).join('\n')}`);
}

export const content = rawContent as ProjectContent;

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
