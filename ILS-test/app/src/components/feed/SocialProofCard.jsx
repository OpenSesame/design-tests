import { feedItems } from '../../data/mockFeed'

function FeaturedSocialProof({ item }) {
  const linked = feedItems.find(f => f.id === item.linkedItemId)

  return (
    <div style={{
      background: 'var(--surface-primary)',
      border: '1px solid var(--outline-tertiary)',
      borderLeft: '3px solid var(--brand)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Stat */}
      <div style={{ padding: '14px 16px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'var(--brand-light)',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="4" stroke="var(--brand)" strokeWidth="1.8"/>
            <path d="M3 20c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M19 8v8M15 12h8" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5, paddingTop: 2 }}>
          {item.socialText}
        </p>
      </div>

      {/* Linked course CTA */}
      {linked && (
        <div style={{
          margin: '0 12px 12px',
          background: 'var(--surface-tertiary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          cursor: 'pointer',
        }}>
          <div style={{ width: 56, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
            <img src={linked.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
              marginBottom: 2,
            }}>
              {linked.title}
            </p>
            <span style={{ fontSize: 11, color: 'var(--text-hint)' }}>{linked.duration}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      )}
    </div>
  )
}

function AmbientSocialProof({ item }) {
  return (
    <div style={{
      background: 'var(--surface-tertiary)',
      border: '1px solid var(--outline-tertiary)',
      borderRadius: 'var(--radius-lg)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'var(--brand-light)',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="4" stroke="var(--brand)" strokeWidth="1.8"/>
          <path d="M3 20c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M19 8v8M15 12h8" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>
        {item.socialText}
      </p>
    </div>
  )
}

export default function SocialProofCard({ item }) {
  return item.featured
    ? <FeaturedSocialProof item={item} />
    : <AmbientSocialProof item={item} />
}
