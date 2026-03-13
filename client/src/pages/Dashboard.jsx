import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import ClientList from '../components/ClientList';
import ClientDetail from '../components/ClientDetail';

export default function Dashboard({ user, onLogout }) {
  const [clients, setClients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const loadClients = useCallback(async () => {
    const data = await api.getClients();
    setClients(data);
  }, []);

  const loadClient = useCallback(async () => {
    if (!selectedId) return;
    const data = await api.getClient(selectedId);
    setSelectedClient(data);
  }, [selectedId]);

  useEffect(() => {
    loadClients().then(() => {});
  }, [loadClients]);

  useEffect(() => { loadClient(); }, [selectedId, loadClient]);

  // Auto-select first client
  useEffect(() => {
    if (!selectedId && clients.length > 0) {
      setSelectedId(clients[0].id);
    }
  }, [clients, selectedId]);

  // Poll for generation status every 5 seconds
  useEffect(() => {
    if (!selectedClient) return;
    const hasActive = selectedClient.deliverables?.some(
      d => d.status === 'generating' || d.status === 'pending'
    );
    if (!hasActive) return;

    const interval = setInterval(loadClient, 5000);
    return () => clearInterval(interval);
  }, [selectedClient, loadClient]);

  const handleLogout = async () => {
    await api.logout();
    onLogout();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0f0f1a', color: '#e0e0e0' }}>
      <ClientList
        clients={clients}
        selectedId={selectedId}
        onSelect={(id) => { setSelectedId(id); setSelectedClient(null); }}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0.75rem 1.5rem', borderBottom: '1px solid #2a2a4a',
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Kodara Client Success</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>{user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.3rem 0.6rem', background: '#333', color: '#e0e0e0',
                border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {selectedClient ? (
          <ClientDetail
            client={selectedClient}
            onUpdate={() => { loadClient(); loadClients(); }}
          />
        ) : (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#888', fontSize: '0.9rem',
          }}>
            {clients.length === 0 ? 'No clients yet. Click "+ New Client" to get started.' : 'Select a client'}
          </div>
        )}
      </div>
    </div>
  );
}
