const STORY_LAYOUTS = ['notes', 'focus', 'list', 'steps', 'timeline'];

const isRecord = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const add = (issues, path, message) => issues.push({path, message});

const requireRecord = (issues, value, path) => {
  if (!isRecord(value)) {
    add(issues, path, 'must be an object');
    return null;
  }
  return value;
};

const requireText = (issues, value, path, {allowEmpty = false} = {}) => {
  if (typeof value !== 'string') {
    add(issues, path, 'must be a string');
    return;
  }
  if (!allowEmpty && value.trim().length === 0) add(issues, path, 'must not be empty');
};

const requireNumber = (issues, value, path, {min = -Infinity, max = Infinity} = {}) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) {
    const range = min !== -Infinity && max !== Infinity ? ` from ${min} to ${max}` : min !== -Infinity ? ` greater than or equal to ${min}` : '';
    add(issues, path, `must be a finite number${range}`);
  }
};

const validateMedia = (issues, value, path) => {
  if (typeof value === 'string') return;
  const item = requireRecord(issues, value, path);
  if (!item) return;
  requireText(issues, item.src, `${path}.src`, {allowEmpty: true});
  if (item.fit !== undefined && item.fit !== 'cover' && item.fit !== 'contain') {
    add(issues, `${path}.fit`, 'must be "cover" or "contain"');
  }
  if (item.position !== undefined) requireText(issues, item.position, `${path}.position`);
  if (item.trimStart !== undefined) requireNumber(issues, item.trimStart, `${path}.trimStart`, {min: 0});
};

const validateThreePoints = (issues, value, path) => {
  if (!Array.isArray(value) || value.length !== 3) {
    add(issues, path, 'must be an array of exactly 3 non-empty strings');
    return;
  }
  value.forEach((point, index) => requireText(issues, point, `${path}[${index}]`));
};

export const validateContent = (value) => {
  const issues = [];
  const root = requireRecord(issues, value, 'root');
  if (!root) return issues;

  const event = requireRecord(issues, root.event, 'event');
  if (event) {
    requireText(issues, event.name, 'event.name');
    requireText(issues, event.meta, 'event.meta');
  }

  const team = requireRecord(issues, root.team, 'team');
  if (team) {
    requireText(issues, team.name, 'team.name');
    requireText(issues, team.tagline, 'team.tagline');
  }

  const project = requireRecord(issues, root.project, 'project');
  if (project) {
    requireText(issues, project.name, 'project.name');
    requireText(issues, project.oneLiner, 'project.oneLiner');
    requireText(issues, project.nextStep, 'project.nextStep');
  }

  if (typeof root.demo !== 'boolean') add(issues, 'demo', 'must be a boolean');

  const music = requireRecord(issues, root.music, 'music');
  if (music) {
    requireText(issues, music.src, 'music.src', {allowEmpty: true});
    requireNumber(issues, music.volume, 'music.volume', {min: 0, max: 1});
    requireNumber(issues, music.trimStart, 'music.trimStart', {min: 0});
    requireNumber(issues, music.fadeIn, 'music.fadeIn', {min: 0});
    requireNumber(issues, music.fadeOut, 'music.fadeOut', {min: 0});
  }

  if (!Array.isArray(root.story) || root.story.length !== 5) {
    add(issues, 'story', 'must be an array of exactly 5 beats');
  } else {
    root.story.forEach((value, index) => {
      const path = `story[${index}]`;
      const beat = requireRecord(issues, value, path);
      if (!beat) return;
      for (const key of ['section', 'lead', 'keyword', 'description', 'headline']) {
        requireText(issues, beat[key], `${path}.${key}`);
      }
      if (!STORY_LAYOUTS.includes(beat.layout)) add(issues, `${path}.layout`, `must be one of ${STORY_LAYOUTS.join(', ')}`);
      validateThreePoints(issues, beat.points, `${path}.points`);
      validateMedia(issues, beat.media, `${path}.media`);
    });
  }

  if (!Array.isArray(root.members) || root.members.length !== 4) {
    add(issues, 'members', 'must be an array of exactly 4 people');
  } else {
    root.members.forEach((value, index) => {
      const path = `members[${index}]`;
      const member = requireRecord(issues, value, path);
      if (!member) return;
      requireText(issues, member.name, `${path}.name`);
      requireText(issues, member.role, `${path}.role`);
      validateMedia(issues, member.media, `${path}.media`);
    });
  }

  if (!Array.isArray(root.progress) || root.progress.length < 1 || root.progress.length > 4) {
    add(issues, 'progress', 'must be an array with 1 to 4 items');
  } else {
    root.progress.forEach((value, index) => {
      const path = `progress[${index}]`;
      const item = requireRecord(issues, value, path);
      if (!item) return;
      requireText(issues, item.title, `${path}.title`);
      requireText(issues, item.description, `${path}.description`);
      validateThreePoints(issues, item.points, `${path}.points`);
      validateMedia(issues, item.media, `${path}.media`);
    });
  }

  return issues;
};
