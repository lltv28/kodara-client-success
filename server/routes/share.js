import { Router } from 'express';
import { marked } from 'marked';
import { SLUG_TO_TYPE } from '../constants.js';

export function shareRoutes(db) {
  const router = Router();

  router.get('/:slug/:type', (req, res) => {
    const { slug, type: urlType } = req.params;
    const dbType = SLUG_TO_TYPE[urlType];

    if (!dbType) return res.status(404).send('Not found');

    const client = db.prepare('SELECT * FROM clients WHERE slug = ?').get(slug);
    if (!client) return res.status(404).send('Not found');

    const deliverable = db.prepare(`
      SELECT * FROM deliverables
      WHERE client_id = ? AND type = ? AND status = 'ready' AND published = 1
      ORDER BY version DESC LIMIT 1
    `).get(client.id, dbType);

    if (!deliverable) return res.status(404).send('Not found');

    if (deliverable.format === 'html') {
      res.type('html').send(deliverable.content);
    } else {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${client.name} — ${urlType}</title>
  <link rel="stylesheet" href="/share.css">
</head>
<body>
${marked(deliverable.content)}
</body>
</html>`;
      res.type('html').send(html);
    }
  });

  return router;
}
