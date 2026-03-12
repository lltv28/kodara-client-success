import { describe, it, expect, beforeEach } from 'vitest';
import { createDb } from '../server/db/setup.js';

describe('Database setup', () => {
  let db;

  beforeEach(() => {
    db = createDb(':memory:');
  });

  it('creates users table', () => {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").all();
    expect(tables).toHaveLength(1);
  });

  it('creates clients table', () => {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='clients'").all();
    expect(tables).toHaveLength(1);
  });

  it('creates deliverables table', () => {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='deliverables'").all();
    expect(tables).toHaveLength(1);
  });

  it('enforces unique client slug', () => {
    db.prepare("INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)").run('A', 'a', 'info');
    expect(() => {
      db.prepare("INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)").run('B', 'a', 'info');
    }).toThrow();
  });

  it('enforces unique user email', () => {
    db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run('a@b.com', 'hash');
    expect(() => {
      db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run('a@b.com', 'hash2');
    }).toThrow();
  });
});
