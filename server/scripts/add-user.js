import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { createDb } from '../db/setup.js';

const args = process.argv.slice(2);
const emailIdx = args.indexOf('--email');
const passIdx = args.indexOf('--password');

if (emailIdx === -1 || passIdx === -1) {
  console.error('Usage: npm run add-user -- --email user@example.com --password yourpassword');
  process.exit(1);
}

const email = args[emailIdx + 1];
const password = args[passIdx + 1];

const dataDir = process.env.DATA_DIR || './data';
fs.mkdirSync(dataDir, { recursive: true });

const db = createDb(path.join(dataDir, 'kodara.db'));
const hash = await bcrypt.hash(password, 10);

try {
  db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash);
  console.log(`User ${email} created successfully.`);
} catch (e) {
  if (e.message.includes('UNIQUE')) {
    console.error(`User ${email} already exists.`);
    process.exit(1);
  }
  throw e;
}
