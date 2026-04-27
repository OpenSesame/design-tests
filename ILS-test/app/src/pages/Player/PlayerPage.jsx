import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { feedItems } from '../../data/mockFeed'

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  )
}

export default function PlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)

  const item = feedItems.find(i => i.id === id)
  const related = feedItems.filter(i => i.type === 'micro-content' && i.id !== id).slice(0, 3)

  if (!item) return null

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--surface-secondary)', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ padding: '52px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', padding: '8px', margin: '-8px',
            color: 'var(--text-primary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center',
          }}
        >
          <BackIcon />
        </button>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-hint)' }}>
          Now Playing
        </span>
        <div style={{ width: 36 }} />
      </div>

      {/* Video area */}
      <div
        style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => setIsPlaying(p => !p)}
      >
        <img
          src={item.thumbnailUrl} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isPlaying ? 0.5 : 0.75 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)' }} />

        {/* Play / Pause */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isPlaying
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
            }
          </div>
        </div>

        {/* Progress + time */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div style={{ padding: '0 14px 8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>0:32</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{item.duration}</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', position: 'relative' }}>
            <div style={{ height: '100%', width: '30%', background: 'var(--brand)' }} />
            <div style={{
              position: 'absolute', top: '50%', left: '30%',
              transform: 'translate(-50%, -50%)',
              width: 10, height: 10, borderRadius: '50%', background: 'var(--brand)',
            }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px 16px', flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {item.skillTags?.[0] && (
            <span style={{
              padding: '4px 10px', borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-primary)', border: '1px solid var(--outline-tertiary)',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--text-hint)',
            }}>
              {item.skillTags[0]}
            </span>
          )}
          <span style={{
            padding: '4px 10px', borderRadius: 'var(--radius-pill)',
            background: 'var(--surface-primary)', border: '1px solid var(--outline-tertiary)',
            fontSize: 11, fontWeight: 500, color: 'var(--text-hint)',
          }}>
            {item.duration}
          </span>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 12 }}>
          {item.title}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {item.description}
        </p>
      </div>

      {/* Up next */}
      <div style={{ padding: '8px 20px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-hint)', whiteSpace: 'nowrap' }}>
            Up next
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--outline-tertiary)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {related.map(r => (
            <div
              key={r.id}
              onClick={() => navigate(`/player/${r.id}`)}
              style={{ display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer' }}
            >
              <div style={{ position: 'relative', width: 88, height: 56, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                <img src={r.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M0 0l12 7L0 14V0z"/></svg>
                </div>
                <span style={{
                  position: 'absolute', bottom: 4, right: 4,
                  fontSize: 9, fontWeight: 700, color: '#fff',
                  background: 'rgba(0,0,0,0.7)', padding: '2px 4px', borderRadius: 3,
                }}>
                  {r.duration}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: 'var(--text-primary)',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {r.title}
                </p>
                <span style={{ fontSize: 11, color: 'var(--text-hint)', marginTop: 3, display: 'block' }}>
                  {r.skillTags?.[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
