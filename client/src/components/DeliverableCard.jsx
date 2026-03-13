const STATUS_COLORS = {
  ready: '#4ade80',
  generating: '#facc15',
  pending: '#facc15',
  error: '#f87171',
};

const LABELS = {
  angle_engine: 'Angles & Beliefs',
  offer_analysis: 'Offer Analysis',
  presentation: 'Presentation',
  emails: 'Warm Emails',
  facebook_posts: 'Facebook Posts',
};

const TYPE_TO_SLUG = {
  angle_engine: 'angles',
  offer_analysis: 'offer',
  presentation: 'presentation',
  emails: 'emails',
  facebook_posts: 'posts',
};

export default function DeliverableCard({ type, deliverable, clientSlug, onRegenerate, missingDeps }) {
  const status = deliverable?.status;
  const borderColor = status ? STATUS_COLORS[status] : '#555';
  const depsReady = missingDeps.length === 0;

  const statusText = status === 'ready'
    ? `v${deliverable.version} · Ready`
    : status === 'generating' || status === 'pending'
    ? 'Generating...'
    : status === 'error'
    ? `Error: ${deliverable.error_message || 'Unknown'}`
    : !depsReady
    ? `Requires: ${missingDeps.map(d => LABELS[d] || d).join(', ')}`
    : 'Not generated';

  return (
    <div style={{
      background: '#16213e', borderRadius: '6px', padding: '1rem',
      borderLeft: `3px solid ${borderColor}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{LABELS[type]}</div>
        <div style={{ fontSize: '0.75rem', color: borderColor }}>
          {status === 'ready' ? 'Ready' : status === 'generating' || status === 'pending' ? 'Generating...' : status === 'error' ? 'Error' : ''}
        </div>
      </div>

      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
        {statusText}
      </div>

      {status === 'ready' && (
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
          <a
            href={`/share/${clientSlug}/${TYPE_TO_SLUG[type]}`}
            target="_blank"
            rel="noopener"
            style={{
              background: '#2563eb', padding: '0.2rem 0.6rem', borderRadius: '3px',
              fontSize: '0.75rem', color: 'white', textDecoration: 'none',
            }}
          >
            View
          </a>
          <button
            onClick={() => onRegenerate(type)}
            style={{
              background: '#333', padding: '0.2rem 0.6rem', borderRadius: '3px',
              fontSize: '0.75rem', color: '#e0e0e0', border: 'none', cursor: 'pointer',
            }}
          >
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
