import { useState } from 'react'

export default function NudgeCard({ item }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div style={{
      background: 'var(--brand-light)',
      border: '1px solid var(--brand-hover)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="var(--brand)" strokeWidth="1.8"/>
        <path d="M12 11v5M12 8h.01" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      <p style={{ fontSize: '13px', color: 'var(--brand-dark)', lineHeight: 1.5, flex: 1 }}>
        {item.nudgeText}
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--brand)', padding: '0', flexShrink: 0, lineHeight: 1,
          fontFamily: 'inherit', fontSize: '16px',
        }}
      >
        ×
      </button>
    </div>
  )
}
