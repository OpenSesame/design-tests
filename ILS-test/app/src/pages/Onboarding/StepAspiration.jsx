import { useState } from 'react'
import ProgressDots from '../../components/onboarding/ProgressDots'

const aspirations = [
  "Being the person who makes my team exceptionally capable",
  "Building deep expertise that earns me a seat at the table",
  "Leading through ambiguity without losing people",
  "Developing the kind of judgment others trust in high-stakes moments",
]

export default function StepAspiration({ onNext }) {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 24px 40px', gap: '24px' }}>
      <ProgressDots total={3} current={2} />

      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          What do you most want to be known for in the next 12 months?
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {aspirations.map((a, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-lg)',
              border: selected === i ? '2px solid var(--brand)' : '1.5px solid var(--outline-primary)',
              background: selected === i ? 'var(--brand-light)' : 'var(--surface-primary)',
              color: selected === i ? 'var(--brand-dark)' : 'var(--text-secondary)',
              fontSize: '14px', fontWeight: selected === i ? 600 : 400,
              lineHeight: 1.5, textAlign: 'left',
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 150ms ease',
            }}
          >
            {a}
          </button>
        ))}
      </div>

      <button
        onClick={() => selected !== null && onNext({ aspiration: aspirations[selected], aspirationIndex: selected })}
        disabled={selected === null}
        style={{
          width: '100%', padding: '14px',
          borderRadius: 'var(--radius-pill)',
          background: selected !== null ? 'var(--brand)' : 'var(--surface-4th)',
          color: selected !== null ? '#fff' : 'var(--text-disabled)',
          fontSize: '16px', fontWeight: 600, border: 'none',
          cursor: selected !== null ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', transition: 'all 150ms ease',
        }}
      >
        Build my feed →
      </button>
    </div>
  )
}
