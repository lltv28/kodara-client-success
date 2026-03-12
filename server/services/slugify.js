export function generateSlug(name, db) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/^-|-$/g, '');

  const exists = db.prepare("SELECT 1 FROM clients WHERE slug = ?");

  if (!exists.get(base)) return base;

  let n = 2;
  while (exists.get(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
