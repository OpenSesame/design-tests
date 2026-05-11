import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import SocialProofSignal from './SocialProofSignal'

export default function MicroContentCard({ item }) {
  const navigate = useNavigate()
  const { user } = useUser()

  // Social proof signal logic (FR-003, FR-007)
  const peerCount = item.peerCompletions?.[user.role]
  const fallbackCount = item.peerCompletions?._fallback
  const fallbackLabel = user.department ? 'department' : undefined
  const isCompleted = user.completedCourseIds?.includes(item.id)
  const showSignal = !isCompleted && (peerCount >= 2 || fallbackCount >= 2)

  return (
    <div
      onClick={() => navigate(`/watch/${item.id}`)}
      style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--outline-tertiary)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 150ms ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--outline-primary)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--outline-tertiary)'}
    >
      {/* Horizontal thumbnail + content row */}
      <div style={{ display: 'flex' }}>
        <div style={{ width: 96, minWidth: 96, position: 'relative', overflow: 'hidden' }}>
          <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(255,255,255,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="9" height="11" viewBox="0 0 9 11" fill="var(--brand)">
                <path d="M0 0l9 5.5L0 11V0z"/>
              </svg>
            </div>
          </div>
          <span style={{
            position: 'absolute', bottom: 6, right: 6,
            fontSize: 9, fontWeight: 700,
            background: 'rgba(0,0,0,0.7)', color: '#fff',
            padding: '2px 5px', borderRadius: 'var(--radius-pill)',
          }}>
            {item.duration}
          </span>
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: 0, gap: 5 }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            color: 'var(--text-hint)',
          }}>
            {item.skillTags?.[0]}
          </span>
          <p style={{
            fontSize: 13, fontWeight: 500, lineHeight: 1.45,
            color: 'var(--text-primary)',
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>
            {item.title}
          </p>
        </div>
      </div>

      {/* Social proof signal — bottom of card (FR-009), hidden on completed items (FR-007) */}
      {showSignal && (
        <SocialProofSignal
          count={peerCount}
          roleLabel={user.roleLabel}
          fallbackCount={fallbackCount}
          fallbackLabel={fallbackLabel}
        />
      )}
    </div>
  )
}
