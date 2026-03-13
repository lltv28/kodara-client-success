import { useState } from 'react';
import { api } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await api.login(email, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0f0f1a',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1a1a2e', padding: '2rem', borderRadius: '12px',
        width: '100%', maxWidth: '380px', color: '#e0e0e0',
      }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
          Kodara Client Success
        </h1>

        {error && <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888' }}>Email</label>
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          required autoFocus
          style={{
            width: '100%', padding: '0.6rem', marginBottom: '1rem',
            background: '#16213e', border: '1px solid #333', borderRadius: '6px',
            color: '#e0e0e0', fontSize: '1rem',
          }}
        />

        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888' }}>Password</label>
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%', padding: '0.6rem', marginBottom: '1.5rem',
            background: '#16213e', border: '1px solid #333', borderRadius: '6px',
            color: '#e0e0e0', fontSize: '1rem',
          }}
        />

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '0.7rem', background: '#2563eb',
          color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem',
          cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
