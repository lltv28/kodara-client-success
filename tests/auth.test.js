import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../server/index.js';

describe('Auth', () => {
  let app;

  beforeEach(() => {
    app = createApp(':memory:');
  });

  it('POST /api/auth/login returns 401 with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'bad@email.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('GET /api/auth/me returns 401 when not logged in', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('POST /api/auth/login returns 200 with valid credentials', async () => {
    const bcrypt = await import('bcryptjs');
    const hash = await bcrypt.hash('testpass', 10);
    app.locals.db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run('test@kodara.com', hash);

    const agent = request.agent(app);
    const res = await agent
      .post('/api/auth/login')
      .send({ email: 'test@kodara.com', password: 'testpass' });
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@kodara.com');

    const me = await agent.get('/api/auth/me');
    expect(me.status).toBe(200);
    expect(me.body.email).toBe('test@kodara.com');
  });

  it('POST /api/auth/logout clears session', async () => {
    const bcrypt = await import('bcryptjs');
    const hash = await bcrypt.hash('testpass', 10);
    app.locals.db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run('test@kodara.com', hash);

    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ email: 'test@kodara.com', password: 'testpass' });
    await agent.post('/api/auth/logout');

    const me = await agent.get('/api/auth/me');
    expect(me.status).toBe(401);
  });

  it('protects /api/clients when not logged in', async () => {
    const res = await request(app).get('/api/clients');
    expect(res.status).toBe(401);
  });
});
