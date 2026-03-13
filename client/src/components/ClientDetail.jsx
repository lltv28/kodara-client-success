import { useState } from 'react';
import { api } from '../api';
import DeliverableCard from './DeliverableCard';
import GeneratePanel from './GeneratePanel';

const ALL_TYPES = ['angle_engine', 'offer_analysis', 'presentation', 'emails', 'facebook_posts'];
const DEPENDENCIES = {
  angle_engine: [],
  offer_analysis: ['angle_engine'],
  presentation: ['offer_analysis'],
  emails: ['offer_analysis'],
  facebook_posts: ['offer_analysis'],
};

export default function ClientDetail({ client, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(client.name);
  const [bgInfo, setBgInfo] = useState(client.background_info);
  const [saving, setSaving] = useState(false);

  const deliverableMap = {};
  (client.deliverables || []).forEach(d => { deliverableMap[d.type] = d; });

  const readyTypes = Object.entries(deliverableMap)
    .filter(([, d]) => d.status === 'ready')
    .map(([type]) => type);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateClient(client.id, { name, background_info: bgInfo });
      setEditing(false);
      onUpdate();
    } catch {
      // handled by api wrapper
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerate = async (type) => {
    try {
      await api.generate(client.id, [type]);
      onUpdate();
    } catch {
      // handled by api wrapper
    }
  };

  return (
    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        {editing ? (
          <div>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                fontSize: '1.4rem', fontWeight: 600, background: '#16213e',
                border: '1px solid #333', borderRadius: '4px', padding: '0.3rem 0.5rem',
                color: '#e0e0e0', width: '100%', marginBottom: '0.5rem',
              }}
            />
            <textarea
              value={bgInfo}
              onChange={e => setBgInfo(e.target.value)}
              rows={8}
              style={{
                width: '100%', background: '#16213e', border: '1px solid #333',
                borderRadius: '4px', padding: '0.5rem', color: '#e0e0e0',
                fontSize: '0.85rem', resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '0.3rem 0.8rem', background: '#2563eb', color: 'white',
                border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer',
              }}>Save</button>
              <button onClick={() => { setEditing(false); setName(client.name); setBgInfo(client.background_info); }} style={{
                padding: '0.3rem 0.8rem', background: '#333', color: '#e0e0e0',
                border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer',
              }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h2
              onClick={() => setEditing(true)}
              style={{ fontSize: '1.4rem', fontWeight: 600, cursor: 'pointer' }}
              title="Click to edit"
            >
              {client.name}
            </h2>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>
              /{client.slug} · Click name to edit
            </div>
          </div>
        )}
      </div>

      <GeneratePanel
        clientId={client.id}
        existingTypes={readyTypes}
        onStarted={onUpdate}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {ALL_TYPES.map(type => (
          <DeliverableCard
            key={type}
            type={type}
            deliverable={deliverableMap[type]}
            clientSlug={client.slug}
            onRegenerate={handleRegenerate}
            missingDeps={DEPENDENCIES[type].filter(dep => !readyTypes.includes(dep))}
          />
        ))}
      </div>
    </div>
  );
}
