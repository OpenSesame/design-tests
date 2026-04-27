import { useState } from 'react'
import ProgressDots from '../../components/onboarding/ProgressDots'
import OptionPill from '../../components/onboarding/OptionPill'

const industries = [
  { label: 'Technology', value: 'tech' },
  { label: 'Finance', value: 'finance' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Retail', value: 'retail' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Professional Services', value: 'services' },
  { label: 'Education', value: 'education' },
  { label: 'Other', value: 'other' },
]

export default function StepIndustry({ onNext }) {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 24px 40px', gap: '24px' }}>
      <ProgressDots total={3} current={1} />

      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          What industry are you in?
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-hint)' }}>Helps us surface the most relevant context.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignContent: 'start' }}>
        {industries.map(ind => (
          <OptionPill key={ind.value} label={ind.label} selected={selected === ind.value} onSelect={() => setSelected(ind.value)} />
        ))}
      </div>

      <button
        onClick={() => selected && onNext({ industry: selected })}
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
