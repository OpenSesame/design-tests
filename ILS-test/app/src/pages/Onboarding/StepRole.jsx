import { useState } from 'react'
import ProgressDots from '../../components/onboarding/ProgressDots'
import OptionPill from '../../components/onboarding/OptionPill'

const roles = [
  { label: 'Individual Contributor', value: 'ic' },
  { label: 'Manager', value: 'manager' },
  { label: 'Senior Manager / Director', value: 'director' },
  { label: 'VP / Head of', value: 'vp' },
  { label: 'C-Suite / Executive', value: 'c-suite' },
  { label: 'Other', value: 'other' },
]

export default function StepRole({ onNext }) {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 24px 40px', gap: '24px' }}>
      <ProgressDots total={3} current={0} />

      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          What's your current role?
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-hint)' }}>We'll tune your feed from day one.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignContent: 'start' }}>
        {roles.map(r => (
          <OptionPill key={r.value} label={r.label} selected={selected === r.value} onSelect={() => setSelected(r.value)} />
        ))}
      </div>

      <button
        onClick={() => selected && onNext({ role: selected })}
        disabled={!selected}
        style={{
          width: '100%', padding: '14px',
          borderRadius: 'var(--radius-pill)',
          background: selected ? 'var(--brand)' : 'var(--surface-4th)',
          color: selected ? '#fff' : 'var(--text-disabled)',
          fontSize: '16px', fontWeight: 600, border: 'none',
          cursor: selected ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', transition: 'all 150ms ease',
        }}
      >
        Continue
      </button>
    </div>
  )
}
