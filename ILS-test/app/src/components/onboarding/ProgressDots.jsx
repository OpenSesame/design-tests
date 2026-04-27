export default function ProgressDots({ total, current }) {
  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? '20px' : '8px',
            height: '8px',
            borderRadius: 'var(--radius-pill)',
            background: i === current ? 'var(--brand)' : 'var(--outline-primary)',
            transition: 'width 200ms ease, background 200ms ease',
          }}
        />
      ))}
    </div>
  )
}
