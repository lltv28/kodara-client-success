import { Router } from 'express';
import { generateSlug } from '../services/slugify.js';

export function clientRoutes(db) {
  const router = Router();

  router.get('/', (_req, res) => {
    const clients = db.prepare('SELECT * FROM clients ORDER BY created_at DESC').all();
    res.json(clients);
  });

  router.post('/', (req, res) => {
    const { name, background_info } = req.body;
    if (!name || !background_info) {
      return res.status(400).json({ error: 'Name and background_info required' });
    }

    const slug = generateSlug(name, db);
    const result = db.prepare(
      'INSERT INTO clients (name, slug, background_info) VALUES (?, ?, ?)'
    ).run(name, slug, background_info);

    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(client);
  });

  router.get('/:id', (req, res) => {
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const deliverables = db.prepare(`
      SELECT d.* FROM deliverables d
      INNER JOIN (
        SELECT client_id, type, MAX(version) as max_version
        FROM deliverables
        WHERE client_id = ?
        GROUP BY client_id, type
      ) latest ON d.client_id = latest.client_id
        AND d.type = latest.type
        AND d.version = latest.max_version
      ORDER BY d.type
    `).all(req.params.id);

    res.json({ ...client, deliverables });
  });

  router.put('/:id', (req, res) => {
    const { name, background_info } = req.body;
    const existing = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Client not found' });

    db.prepare(
      'UPDATE clients SET name = ?, background_info = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(name || existing.name, background_info || existing.background_info, req.params.id);

    const updated = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
    res.json(updated);
  });

  return router;
}
