import { describe, it, expect, beforeEach } from 'vitest';
import { createDb } from '../server/db/setup.js';
import { generateSlug } from '../server/services/slugify.js';

describe('generateSlug', () => {
  let db;

  beforeEach(() => {
    db = createDb(':memory:');
  });

  it('lowercases and hyphenates', () => {
    expect(generateSlug('Simone Brown', db)).toBe('simone-brown');
  });

  it('strips non-alphanumeric characters', () => {
    expect(generateSlug("O'Brien & Co.", db)).toBe('obrien-co');
  });

  it('appends -2 on first collision', () => {
    db.prepare("INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)").run('A', 'simone', 'x');
    expect(generateSlug('Simone', db)).toBe('simone-2');
  });

  it('appends -3 on second collision', () => {
    db.prepare("INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)").run('A', 'simone', 'x');
    db.prepare("INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)").run('B', 'simone-2', 'x');
    expect(generateSlug('Simone', db)).toBe('simone-3');
  });
});
