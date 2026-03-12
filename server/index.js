import express from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createDb } from './db/setup.js';
import { authRoutes } from './routes/auth.js';
import { requireAuth } from './middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SQLiteStore = connectSqlite3(session);

export function createApp(dbPath) {
  const app = express();
  const db = createDb(dbPath);

  app.locals.db = db;
  app.locals.activeGenerations = new Set();

  app.use(express.json({ limit: '5mb' }));

  const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  // Use SQLite session store in production, memory store for tests
  if (dbPath !== ':memory:') {
    sessionConfig.store = new SQLiteStore({
      dir: path.dirname(dbPath),
      db: 'sessions.db',
    });
  }

  app.use(session(sessionConfig));

  // Public routes (no auth required)
  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes(db));

  // Protected API routes (added in later tasks)
  app.use('/api', requireAuth);

  return app;
}

// Start server if run directly
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const dataDir = process.env.DATA_DIR || './data';
  fs.mkdirSync(dataDir, { recursive: true });

  const app = createApp(path.join(dataDir, 'kodara.db'));
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
