import { useNavigate } from 'react-router-dom'

function HeroMicroContent({ item }) {
  const navigate = useNavigate()
  return (
    <div
      style={{ cursor: 'pointer', position: 'relative', height: 320, borderRadius: 24, overflow: 'hidden' }}
      onClick={() => navigate(`/watch/${item.id}`)}
    >
      <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Floating info panel */}
      <div style={{
        position: 'absolute', bottom: 12, left: 8, right: 8,
        background: 'rgba(18,18,26,0.82)',
        backdropFilter: 'blur(16px)',
        borderRadius: 14,
        padding: '14px 16px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h2 style={{
          fontSize: 18, fontWeight: 600, lineHeight: 1.3,
          color: '#fff', letterSpacing: '-0.01em', margin: '0 0 4px',
        }}>
          {item.title}
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
          Video · {item.duration}
        </p>
      </div>
    </div>
  )
}

function HeroCourse({ item }) {
  const navigate = useNavigate()
  const durationLabel = item.isRequired
    ? `Due ${new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : item.duration

  return (
    <div
      style={{ cursor: 'pointer', position: 'relative', height: 320, borderRadius: 24, overflow: 'hidden' }}
      onClick={() => navigate(`/watch/${item.id}`)}
    >
      <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Floating info panel */}
      <div style={{
        position: 'absolute', bottom: 12, left: 8, right: 8,
        background: 'rgba(18,18,26,0.82)',
        backdropFilter: 'blur(16px)',
        borderRadius: 14,
        padding: '14px 16px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h2 style={{
          fontSize: 18, fontWeight: 600, lineHeight: 1.3,
          color: '#fff', letterSpacing: '-0.01em', margin: '0 0 4px',
        }}>
          {item.title}
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
          Course · {durationLabel}
        </p>
      </div>
    </div>
  )
}

export default function HeroCard({ item }) {
  return item.type === 'micro-content' ? <HeroMicroContent item={item} /> : <HeroCourse item={item} />
}
