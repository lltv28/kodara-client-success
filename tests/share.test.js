import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../server/index.js';

describe('Share routes', () => {
  let app;

  beforeEach(() => {
    app = createApp(':memory:');
    const db = app.locals.db;

    db.prepare("INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)").run('Simone', 'simone', 'info');

    db.prepare(`INSERT INTO deliverables (client_id, type, format, status, content, version)
      VALUES (1, 'angle_engine', 'markdown', 'ready', '# Angles\n\nSome content here', 1)`).run();

    db.prepare(`INSERT INTO deliverables (client_id, type, format, status, content, version)
      VALUES (1, 'presentation', 'html', 'ready', '<html><body><h1>Deck</h1></body></html>', 1)`).run();
  });

  it('GET /share/simone/angles returns rendered markdown', async () => {
    const res = await request(app).get('/share/simone/angles');
    expect(res.status).toBe(200);
    expect(res.type).toBe('text/html');
    expect(res.text).toContain('<h1>Angles</h1>');
    expect(res.text).toContain('share.css');
  });

  it('GET /share/simone/presentation returns raw HTML', async () => {
    const res = await request(app).get('/share/simone/presentation');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<h1>Deck</h1>');
  });

  it('GET /share/simone/offer returns 404 when not generated', async () => {
    const res = await request(app).get('/share/simone/offer');
    expect(res.status).toBe(404);
  });

  it('GET /share/nonexistent/angles returns 404', async () => {
    const res = await request(app).get('/share/nonexistent/angles');
    expect(res.status).toBe(404);
  });

  it('does not require auth', async () => {
    const res = await request(app).get('/share/simone/angles');
    expect(res.status).toBe(200);
  });
});
