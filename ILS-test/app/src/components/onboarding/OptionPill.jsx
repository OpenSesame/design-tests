export default function OptionPill({ label, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      style={{
        padding: '10px 16px',
        borderRadius: 'var(--radius-pill)',
        border: selected ? '2px solid var(--brand)' : '1.5px solid var(--outline-primary)',
        background: selected ? 'var(--brand-light)' : 'var(--surface-primary)',
        color: selected ? 'var(--brand)' : 'var(--text-secondary)',
        fontFamily: 'inherit',
        fontSize: '14px',
        fontWeight: selected ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 150ms ease',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {label}
    </button>
  )
}
