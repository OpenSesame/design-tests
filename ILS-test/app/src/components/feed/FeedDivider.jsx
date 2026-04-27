export default function FeedDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--outline-tertiary)' }} />
      {label && (
        <span style={{ fontSize: '11px', color: 'var(--text-hint)', fontWeight: 500, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
          {label}
        </span>
      )}
      {label && <div style={{ flex: 1, height: '1px', background: 'var(--outline-tertiary)' }} />}
    </div>
  )
}
