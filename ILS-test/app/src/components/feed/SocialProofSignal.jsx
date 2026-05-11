function PeopleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="7" r="3.5" stroke="var(--brand)" strokeWidth="1.8"/>
      <path d="M2 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="18" cy="8" r="2.5" stroke="var(--brand)" strokeWidth="1.6"/>
      <path d="M22 19c0-2.485-1.79-4.5-4-4.5" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

/**
 * Ambient social proof signal rendered at the bottom of feed cards.
 *
 * Props:
 *   count        — peer completion count for the learner's role (must be >= 2 to render role-scoped copy)
 *   roleLabel    — display name of the learner's role (e.g. "Manager")
 *   fallbackCount  — optional: department/company count when role count is below threshold
 *   fallbackLabel  — optional: label for the fallback scope (e.g. "department")
 *
 * FR-002: copy format "{N} people in your role ({roleLabel}) completed this"
 * FR-003: renders nothing when count < 2 (and no valid fallback)
 * FR-004: singular/plural — "1 person" vs "3 people"
 * FR-005: non-interactive — no onClick or touch handlers
 * FR-008: visually lightweight — hint color, small font, top border only
 * FR-009: positioned at card bottom (parent card handles layout)
 */
export default function SocialProofSignal({ count, roleLabel, fallbackCount, fallbackLabel }) {
  const formatCount = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n
  const noun = (n) => n === 1 ? 'person' : 'people'

  let text = null

  if (count >= 2) {
    const display = formatCount(count)
    text = `${display} ${noun(count)} in your role (${roleLabel}) completed this`
  } else if (fallbackCount >= 2) {
    const display = formatCount(fallbackCount)
    text = `${display} ${noun(fallbackCount)} in your ${fallbackLabel ?? 'department'} completed this`
  }

  if (!text) return null

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      borderTop: '1px solid var(--outline-tertiary)',
    }}>
      <PeopleIcon />
      <span style={{
        fontSize: 11,
        color: 'var(--text-hint)',
        lineHeight: 1.4,
      }}>
        {text}
      </span>
    </div>
  )
}
