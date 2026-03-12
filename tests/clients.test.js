import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import { createApp } from '../server/index.js';

describe('Clients API', () => {
  let app, agent;

  beforeEach(async () => {
    app = createApp(':memory:');
    agent = request.agent(app);

    const hash = await bcrypt.hash('pass', 10);
    app.locals.db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run('u@k.com', hash);
    await agent.post('/api/auth/login').send({ email: 'u@k.com', password: 'pass' });
  });

  it('GET /api/clients returns empty list', async () => {
    const res = await agent.get('/api/clients');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/clients creates a client', async () => {
    const res = await agent.post('/api/clients').send({
      name: 'Simone',
      background_info: 'Business coach helping CEOs',
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Simone');
    expect(res.body.slug).toBe('simone');
  });

  it('POST /api/clients auto-increments slug on collision', async () => {
    await agent.post('/api/clients').send({ name: 'Simone', background_info: 'info1' });
    const res = await agent.post('/api/clients').send({ name: 'Simone', background_info: 'info2' });
    expect(res.body.slug).toBe('simone-2');
  });

  it('GET /api/clients/:id returns client with deliverables', async () => {
    const create = await agent.post('/api/clients').send({ name: 'Maverick', background_info: 'Grant AI' });
    const res = await agent.get(`/api/clients/${create.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Maverick');
    expect(res.body.deliverables).toEqual([]);
  });

  it('PUT /api/clients/:id updates client info', async () => {
    const create = await agent.post('/api/clients').send({ name: 'Alisa', background_info: 'old' });
    const res = await agent.put(`/api/clients/${create.body.id}`).send({
      name: 'Alisa Updated',
      background_info: 'new info',
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Alisa Updated');
    expect(res.body.background_info).toBe('new info');
  });

  it('GET /api/clients/:id returns 404 for nonexistent', async () => {
    const res = await agent.get('/api/clients/999');
    expect(res.status).toBe(404);
  });
});
