export default function StepWelcome({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', padding: '48px 24px 40px' }}>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '48px' }}>
          ILS
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Your next chapter<br />starts here.
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          We'll make your first few minutes feel eerily well-matched.
        </p>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: 'var(--text-hint)', textAlign: 'center', marginBottom: '16px' }}>
          Takes about 60 seconds
        </p>
        <button
          onClick={onNext}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--brand)',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 150ms ease',
          }}
          onMouseEnter={e => e.target.style.background = 'var(--brand-dark)'}
          onMouseLeave={e => e.target.style.background = 'var(--brand)'}
        >
          Let's go →
        </button>
      </div>
    </div>
  )
}
