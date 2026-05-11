export default function SkillChip({ label, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--surface-4th)',
        color: 'var(--text-secondary)',
        fontSize: '13px',
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        transition: onClick ? 'background 150ms' : undefined,
      }}
    >
      {label}
    </span>
  )
}
