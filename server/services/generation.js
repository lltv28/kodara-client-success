import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEPENDENCIES, FORMAT_MAP, MAX_TOKENS, CLAUDE_MODEL } from '../constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');

function loadPrompt(filename) {
  return fs.readFileSync(path.join(PROMPTS_DIR, filename), 'utf-8');
}

let prompts = {};
try {
  prompts = {
    angle_engine: loadPrompt('angle-beliefladder-engine.md'),
    offer_analysis: loadPrompt('offer-analysis.md'),
    presentation: loadPrompt('offer-present.md'),
    emails: loadPrompt('warm-emails.md'),
    facebook_posts: loadPrompt('facebook-posts.md'),
    angles_ref: loadPrompt('angles.txt'),
    beliefladder_ref: loadPrompt('beliefladder.txt'),
    design_system: loadPrompt('DESIGN_SYSTEM.md'),
  };
} catch {
  // Prompt files may not exist in test env if copy-prompts hasn't run
}

export function buildPrompt(type, backgroundInfo, upstreamOutputs) {
  let systemPrompt = '';
  let userMessage = '';

  switch (type) {
    case 'angle_engine':
      systemPrompt = [prompts.angle_engine, prompts.angles_ref, prompts.beliefladder_ref]
        .filter(Boolean).join('\n\n---\n\n');
      userMessage = backgroundInfo;
      break;

    case 'offer_analysis':
      systemPrompt = prompts.offer_analysis || '';
      userMessage = backgroundInfo;
      if (upstreamOutputs.angle_engine) {
        userMessage += `\n\n---\n\nANGLES & BELIEF LADDER ANALYSIS:\n\n${upstreamOutputs.angle_engine}`;
      }
      break;

    case 'presentation':
      systemPrompt = [prompts.presentation, prompts.design_system]
        .filter(Boolean).join('\n\n---\n\n');
      userMessage = upstreamOutputs.offer_analysis || '';
      break;

    case 'emails':
      systemPrompt = prompts.emails || '';
      userMessage = backgroundInfo;
      if (upstreamOutputs.offer_analysis) {
        userMessage += `\n\n---\n\nOFFER ANALYSIS:\n\n${upstreamOutputs.offer_analysis}`;
      }
      break;

    case 'facebook_posts':
      systemPrompt = prompts.facebook_posts || '';
      userMessage = backgroundInfo;
      if (upstreamOutputs.offer_analysis) {
        userMessage += `\n\n---\n\nOFFER ANALYSIS:\n\n${upstreamOutputs.offer_analysis}`;
      }
      break;
  }

  return { systemPrompt, userMessage };
}

function topologicalSort(types) {
  const sorted = [];
  const visited = new Set();
  const typeSet = new Set(types);

  function visit(type) {
    if (visited.has(type)) return;
    visited.add(type);
    for (const dep of DEPENDENCIES[type]) {
      if (typeSet.has(dep)) visit(dep);
    }
    sorted.push(type);
  }

  types.forEach(visit);
  return sorted;
}

async function callWithRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isRateLimit = err.status === 429 || err.error?.type === 'rate_limit_error';
      if (!isRateLimit || attempt === maxRetries) throw err;
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

export async function generateDeliverables(clientId, types, db, anthropicClient, activeGenerations) {
  try {
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(clientId);
    if (!client) throw new Error('Client not found');

    const sortedTypes = topologicalSort(types);
    const outputs = {};

    const existing = db.prepare(
      "SELECT type, content FROM deliverables WHERE client_id = ? AND status = 'ready' ORDER BY version DESC"
    ).all(clientId);

    for (const row of existing) {
      if (!outputs[row.type]) outputs[row.type] = row.content;
    }

    for (const type of sortedTypes) {
      const existingVersion = db.prepare(
        'SELECT MAX(version) as v FROM deliverables WHERE client_id = ? AND type = ?'
      ).get(clientId, type);

      const version = (existingVersion?.v || 0) + 1;

      const result = db.prepare(`
        INSERT INTO deliverables (client_id, type, format, status, version, model)
        VALUES (?, ?, ?, 'generating', ?, ?)
      `).run(clientId, type, FORMAT_MAP[type], version, CLAUDE_MODEL);

      const deliverableId = result.lastInsertRowid;

      try {
        const { systemPrompt, userMessage } = buildPrompt(type, client.background_info, outputs);

        const response = await callWithRetry(() =>
          anthropicClient.messages.create({
            model: CLAUDE_MODEL,
            max_tokens: MAX_TOKENS[type],
            system: systemPrompt,
            messages: [{ role: 'user', content: userMessage }],
          })
        );

        const content = response.content[0].text;
        outputs[type] = content;

        db.prepare(`
          UPDATE deliverables SET status = 'ready', content = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(content, deliverableId);

      } catch (err) {
        db.prepare(`
          UPDATE deliverables SET status = 'error', error_message = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(err.message, deliverableId);
        break;
      }
    }
  } finally {
    activeGenerations.delete(clientId);
  }
}
