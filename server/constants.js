export const TYPE_MAP = {
  angles: 'angle_engine',
  offer: 'offer_analysis',
  presentation: 'presentation',
  emails: 'emails',
  posts: 'facebook_posts',
};

export const SLUG_TO_TYPE = TYPE_MAP;
export const TYPE_TO_SLUG = Object.fromEntries(
  Object.entries(TYPE_MAP).map(([k, v]) => [v, k])
);

export const DEPENDENCIES = {
  angle_engine: [],
  offer_analysis: ['angle_engine'],
  presentation: ['offer_analysis'],
  emails: ['offer_analysis'],
  facebook_posts: ['offer_analysis'],
};

export const FORMAT_MAP = {
  angle_engine: 'markdown',
  offer_analysis: 'markdown',
  presentation: 'html',
  emails: 'html',
  facebook_posts: 'markdown',
};

export const DELIVERABLE_LABELS = {
  angle_engine: 'Angles & Beliefs',
  offer_analysis: 'Offer Analysis',
  presentation: 'Presentation',
  emails: 'Warm Emails',
  facebook_posts: 'Facebook Posts',
};

export const MAX_TOKENS = {
  angle_engine: 16384,
  offer_analysis: 16384,
  presentation: 32768,
  emails: 16384,
  facebook_posts: 16384,
};

export const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
export const API_TIMEOUT_MS = 120000;
export const ALL_TYPES = Object.values(TYPE_MAP);
