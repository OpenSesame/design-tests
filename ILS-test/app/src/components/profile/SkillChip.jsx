export default function SkillChip({ label }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-4th)',
      color: 'var(--text-secondary)',
      fontSize: '13px',
      fontWeight: 500,
    }}>
      {label}
    </span>
  )
}
