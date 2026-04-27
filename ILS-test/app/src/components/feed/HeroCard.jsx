import { useNavigate } from 'react-router-dom'

const CHIP_STYLE = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '4px 9px',
  borderRadius: 'var(--radius-pill)',
  background: 'rgba(0,0,0,0.55)',
  backdropFilter: 'blur(6px)',
  border: '1px solid rgba(255,255,255,0.12)',
  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.9)',
}

function ImageChips({ type, duration }) {
  const icon = type === 'micro-content'
    ? <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor"><path d="M0 0l9 5L0 10V0z"/></svg>
    : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>

  const label = type === 'micro-content' ? 'Video' : 'Course'

  return (
    <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6 }}>
      <div style={CHIP_STYLE}>
        {icon}
        {label}
      </div>
      <div style={{ ...CHIP_STYLE, gap: 4 }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        {duration}
      </div>
    </div>
  )
}

function HeroMicroContent({ item }) {
  const navigate = useNavigate()
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/watch/${item.id}`)}>
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)',
        }} />
        <ImageChips type="micro-content" duration={item.duration} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="white"><path d="M1 1l16 9-16 9V1z"/></svg>
          </div>
        </div>
      </div>

      <div style={{ padding: '22px 20px 28px' }}>
        <h2 style={{
          fontSize: 20, fontWeight: 600, lineHeight: 1.3,
          color: 'var(--text-primary)', letterSpacing: '-0.01em',
          marginBottom: 18,
        }}>
          {item.title}
        </h2>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', padding: 0,
          color: 'var(--brand)', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Watch now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function HeroCourse({ item }) {
  const navigate = useNavigate()
  const duration = item.isRequired
    ? `Due ${new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : item.duration

  return (
    <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/watch/${item.id}`)}>
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(13,13,20,0.6) 100%)',
        }} />
        <ImageChips type="course" duration={duration} />
      </div>

      <div style={{ padding: '22px 20px 28px' }}>
        <h2 style={{
          fontSize: 20, fontWeight: 600, lineHeight: 1.3,
          color: 'var(--text-primary)', letterSpacing: '-0.01em',
          marginBottom: 10,
        }}>
          {item.title}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 22 }}>
          {item.description}
        </p>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', padding: 0,
          color: 'var(--brand)', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          View more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function HeroCard({ item }) {
  return (
    <div style={{
      background: 'var(--surface-primary)',
      border: '1px solid var(--outline-tertiary)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {item.type === 'micro-content' ? <HeroMicroContent item={item} /> : <HeroCourse item={item} />}
    </div>
  )
}
