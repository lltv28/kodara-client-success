import { Router } from 'express';
import { ALL_TYPES, DEPENDENCIES } from '../constants.js';

export function deliverableRoutes(db) {
  const router = Router({ mergeParams: true });

  router.get('/deliverables', (req, res) => {
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

    res.json(deliverables);
  });

  router.post('/generate', (req, res) => {
    const clientId = parseInt(req.params.id);
    const { types } = req.body;

    if (!types || !Array.isArray(types) || types.length === 0) {
      return res.status(400).json({ error: 'types array required' });
    }

    const invalid = types.filter(t => !ALL_TYPES.includes(t));
    if (invalid.length > 0) {
      return res.status(400).json({ error: `Invalid types: ${invalid.join(', ')}` });
    }

    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const activeGenerations = req.app.locals.activeGenerations;
    if (activeGenerations.has(clientId)) {
      return res.status(409).json({ error: 'Generation already in progress for this client' });
    }

    const existing = db.prepare(`
      SELECT DISTINCT type FROM deliverables
      WHERE client_id = ? AND status = 'ready'
    `).all(clientId).map(r => r.type);

    const willGenerate = new Set(types);

    for (const type of types) {
      for (const dep of DEPENDENCIES[type]) {
        if (!existing.includes(dep) && !willGenerate.has(dep)) {
          return res.status(400).json({
            error: `${type} requires ${dep} to be generated first`,
          });
        }
      }
    }

    // Lock before responding to prevent race condition
    activeGenerations.add(clientId);

    res.status(202).json({ message: 'Generation started', types });

    const generateFn = req.app.locals.generateDeliverables;
    if (generateFn) {
      generateFn(clientId, types, db).catch(err => {
        console.error('Generation error:', err);
      });
    }
  });

  return router;
}
