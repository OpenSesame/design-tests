import { useNavigate } from 'react-router-dom'

export default function CourseCard({ item }) {
  const navigate = useNavigate()
  const tag = item.skillTags?.[0] || 'Learning'
  const footerMeta = item.isRequired
    ? `Due ${new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : item.duration

  return (
    <div
      onClick={() => navigate(`/watch/${item.id}`)}
      style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--outline-tertiary)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        cursor: 'pointer',
        transition: 'border-color 150ms ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--outline-primary)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--outline-tertiary)'}
    >
      <div style={{ width: 96, minWidth: 96, overflow: 'hidden' }}>
        <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ padding: '14px 16px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
        <div>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            color: 'var(--text-hint)', display: 'block', marginBottom: 5,
          }}>
            {tag}
          </span>
          <h3 style={{
            fontSize: 13, fontWeight: 600, lineHeight: 1.45,
            color: 'var(--text-primary)',
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>
            {item.title}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ fontSize: 11, color: 'var(--text-hint)' }}>{footerMeta}</span>
          {/* Ghost button — doesn't compete with hero CTA */}
          <button style={{
            padding: '5px 13px',
            borderRadius: 'var(--radius-pill)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: 11, fontWeight: 600,
            border: '1px solid var(--outline-primary)',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'border-color 150ms ease, color 150ms ease',
          }}>
            View more
          </button>
        </div>
      </div>
    </div>
  )
}
