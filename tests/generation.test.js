import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createDb } from '../server/db/setup.js';
import { buildPrompt, generateDeliverables } from '../server/services/generation.js';

describe('buildPrompt', () => {
  it('builds angle_engine prompt with background_info as user message', () => {
    const result = buildPrompt('angle_engine', 'Client background here', {});
    expect(result.systemPrompt.length).toBeGreaterThan(0);
    expect(result.userMessage).toBe('Client background here');
  });

  it('builds offer_analysis prompt with angle_engine output as context', () => {
    const result = buildPrompt('offer_analysis', 'Background', {
      angle_engine: 'Angles output here',
    });
    expect(result.userMessage).toContain('Background');
    expect(result.userMessage).toContain('Angles output here');
  });

  it('builds presentation prompt with offer_analysis output', () => {
    const result = buildPrompt('presentation', 'Background', {
      offer_analysis: 'Offer output here',
    });
    expect(result.systemPrompt.length).toBeGreaterThan(0);
    expect(result.userMessage).toContain('Offer output here');
  });
});

describe('generateDeliverables', () => {
  let db;

  beforeEach(() => {
    db = createDb(':memory:');
    db.prepare("INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)").run('Test', 'test', 'Test info');
  });

  it('creates deliverable rows and updates status on success', async () => {
    const mockClient = {
      messages: {
        create: vi.fn().mockResolvedValue({
          content: [{ type: 'text', text: '# Generated content' }],
        }),
      },
    };

    const activeGenerations = new Set();
    await generateDeliverables(1, ['angle_engine'], db, mockClient, activeGenerations);

    const deliverable = db.prepare("SELECT * FROM deliverables WHERE client_id = 1 AND type = 'angle_engine'").get();
    expect(deliverable.status).toBe('ready');
    expect(deliverable.content).toBe('# Generated content');
    expect(deliverable.format).toBe('markdown');
    expect(activeGenerations.has(1)).toBe(false);
  });

  it('sets error status on API failure', async () => {
    const mockClient = {
      messages: {
        create: vi.fn().mockRejectedValue(new Error('API error')),
      },
    };

    const activeGenerations = new Set();
    await generateDeliverables(1, ['angle_engine'], db, mockClient, activeGenerations);

    const deliverable = db.prepare("SELECT * FROM deliverables WHERE client_id = 1 AND type = 'angle_engine'").get();
    expect(deliverable.status).toBe('error');
    expect(deliverable.error_message).toContain('API error');
  });

  it('generates in dependency order', async () => {
    const mockClient = {
      messages: {
        create: vi.fn().mockResolvedValue({
          content: [{ type: 'text', text: 'output' }],
        }),
      },
    };

    const activeGenerations = new Set();
    await generateDeliverables(1, ['offer_analysis', 'angle_engine'], db, mockClient, activeGenerations);

    const all = db.prepare("SELECT type FROM deliverables WHERE client_id = 1 ORDER BY id").all();
    expect(all[0].type).toBe('angle_engine');
    expect(all[1].type).toBe('offer_analysis');
  });
});
