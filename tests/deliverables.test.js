import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import { createApp } from '../server/index.js';

describe('Deliverables API', () => {
  let app, agent, clientId;

  beforeEach(async () => {
    app = createApp(':memory:');
    agent = request.agent(app);

    const hash = await bcrypt.hash('pass', 10);
    app.locals.db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run('u@k.com', hash);
    await agent.post('/api/auth/login').send({ email: 'u@k.com', password: 'pass' });

    const res = await agent.post('/api/clients').send({ name: 'Test', background_info: 'Test biz info' });
    clientId = res.body.id;
  });

  it('GET /api/clients/:id/deliverables returns empty for new client', async () => {
    const res = await agent.get(`/api/clients/${clientId}/deliverables`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/clients/:id/generate validates types', async () => {
    const res = await agent.post(`/api/clients/${clientId}/generate`).send({ types: ['invalid_type'] });
    expect(res.status).toBe(400);
  });

  it('POST /api/clients/:id/generate rejects if dependency missing', async () => {
    const res = await agent.post(`/api/clients/${clientId}/generate`).send({ types: ['presentation'] });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('offer_analysis');
  });

  it('POST /api/clients/:id/generate accepts angle_engine (no deps)', async () => {
    app.locals.generateDeliverables = async () => {};
    const res = await agent.post(`/api/clients/${clientId}/generate`).send({ types: ['angle_engine'] });
    expect(res.status).toBe(202);
  });

  it('POST /api/clients/:id/generate blocks concurrent generation', async () => {
    app.locals.activeGenerations.add(clientId);
    const res = await agent.post(`/api/clients/${clientId}/generate`).send({ types: ['angle_engine'] });
    expect(res.status).toBe(409);
  });
});
