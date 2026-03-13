import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientList({ clients, selectedId, onSelect }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      width: '220px', background: '#16213e', padding: '1rem',
      borderRight: '1px solid #2a2a4a', overflowY: 'auto', height: '100vh',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Clients
      </div>

      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '0.4rem 0.6rem', marginBottom: '0.75rem',
          background: '#1a1a2e', border: '1px solid #333', borderRadius: '4px',
          color: '#e0e0e0', fontSize: '0.85rem',
        }}
      />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.map(c => (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              padding: '0.5rem 0.6rem', borderRadius: '4px', cursor: 'pointer',
              marginBottom: '0.25rem', fontSize: '0.9rem',
              background: selectedId === c.id ? 'rgba(37,99,235,0.2)' : 'transparent',
              borderLeft: selectedId === c.id ? '2px solid #2563eb' : '2px solid transparent',
              color: selectedId === c.id ? '#e0e0e0' : '#888',
            }}
          >
            {c.name}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/clients/new')}
        style={{
          marginTop: '0.75rem', padding: '0.5rem', background: '#333',
          border: 'none', borderRadius: '4px', color: '#e0e0e0',
          cursor: 'pointer', fontSize: '0.85rem',
        }}
      >
        + New Client
      </button>
    </div>
  );
}
