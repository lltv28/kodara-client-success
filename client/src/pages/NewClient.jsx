import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const ALL_TYPES = ['angle_engine', 'offer_analysis', 'presentation', 'emails', 'facebook_posts'];
const LABELS = {
  angle_engine: 'Angles & Beliefs',
  offer_analysis: 'Offer Analysis',
  presentation: 'Presentation',
  emails: 'Warm Emails',
  facebook_posts: 'Facebook Posts',
};

export default function NewClient() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [bgInfo, setBgInfo] = useState('');
  const [genTypes, setGenTypes] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggle = (type) => {
    const next = new Set(genTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setGenTypes(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const client = await api.createClient({ name, background_info: bgInfo });
      if (genTypes.size > 0) {
        await api.generate(client.id, [...genTypes]);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0f0f1a', color: '#e0e0e0',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1a1a2e', padding: '2rem', borderRadius: '12px',
        width: '100%', maxWidth: '600px',
      }}>
        <h1 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 600 }}>New Client</h1>

        {error && <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#888' }}>
          Client Name
        </label>
        <input
          value={name} onChange={e => setName(e.target.value)}
          required autoFocus placeholder="e.g., Simone"
          style={{
            width: '100%', padding: '0.6rem', marginBottom: '1rem',
            background: '#16213e', border: '1px solid #333', borderRadius: '6px',
            color: '#e0e0e0', fontSize: '1rem',
          }}
        />

        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#888' }}>
          Background Info
        </label>
        <textarea
          value={bgInfo} onChange={e => setBgInfo(e.target.value)}
          required rows={12}
          placeholder="Paste all business info here..."
          style={{
            width: '100%', padding: '0.6rem', marginBottom: '1rem',
            background: '#16213e', border: '1px solid #333', borderRadius: '6px',
            color: '#e0e0e0', fontSize: '0.9rem', resize: 'vertical',
          }}
        />

        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888' }}>
          Generate on creation (optional)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {ALL_TYPES.map(type => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={genTypes.has(type)} onChange={() => toggle(type)} />
              {LABELS[type]}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" disabled={loading} style={{
            padding: '0.7rem 1.5rem', background: '#2563eb', color: 'white',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Creating...' : 'Create Client'}
          </button>
          <button type="button" onClick={() => navigate('/')} style={{
            padding: '0.7rem 1.5rem', background: '#333', color: '#e0e0e0',
            border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer',
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
