import { useState } from 'react';
import { api } from '../api';

const ALL_TYPES = ['angle_engine', 'offer_analysis', 'presentation', 'emails', 'facebook_posts'];
const LABELS = {
  angle_engine: 'Angles & Beliefs',
  offer_analysis: 'Offer Analysis',
  presentation: 'Presentation',
  emails: 'Warm Emails',
  facebook_posts: 'Facebook Posts',
};
const DEPENDENCIES = {
  angle_engine: [],
  offer_analysis: ['angle_engine'],
  presentation: ['offer_analysis'],
  emails: ['offer_analysis'],
  facebook_posts: ['offer_analysis'],
};

export default function GeneratePanel({ clientId, existingTypes, onStarted }) {
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const readyTypes = new Set(existingTypes);

  const canSelect = (type) => {
    if (readyTypes.has(type)) return false;
    for (const dep of DEPENDENCIES[type]) {
      if (!readyTypes.has(dep) && !selected.has(dep)) return false;
    }
    return true;
  };

  const toggle = (type) => {
    const next = new Set(selected);
    if (next.has(type)) {
      next.delete(type);
      for (const t of ALL_TYPES) {
        if (DEPENDENCIES[t].includes(type) && !readyTypes.has(type)) {
          next.delete(t);
        }
      }
    } else {
      next.add(type);
    }
    setSelected(next);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      await api.generate(clientId, [...selected]);
      setSelected(new Set());
      onStarted();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {ALL_TYPES.map(type => {
          const enabled = canSelect(type);
          const checked = selected.has(type);
          return (
            <label key={type} style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              fontSize: '0.8rem', color: enabled ? '#e0e0e0' : '#555',
              cursor: enabled ? 'pointer' : 'not-allowed',
            }}>
              <input
                type="checkbox"
                checked={checked}
                disabled={!enabled}
                onChange={() => toggle(type)}
              />
              {LABELS[type]}
              {readyTypes.has(type) && <span style={{ color: '#4ade80' }}> ✓</span>}
            </label>
          );
        })}
      </div>

      {error && <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{error}</div>}

      {selected.size > 0 && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            padding: '0.4rem 1rem', background: '#2563eb', color: 'white',
            border: 'none', borderRadius: '4px', fontSize: '0.85rem',
            cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Starting...' : `Generate ${selected.size} deliverable${selected.size > 1 ? 's' : ''}`}
        </button>
      )}
    </div>
  );
}
