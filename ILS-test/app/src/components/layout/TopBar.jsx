export default function TopBar({ title, subtitle }) {
  return (
    <header style={{
      padding: '20px 20px 12px',
      background: 'var(--surface-secondary)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--outline-tertiary)',
    }}>
      {title && (
        <h1 style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)' }}>
          {title}
        </h1>
      )}
      {subtitle && (
        <p style={{ fontSize: '13px', color: 'var(--text-hint)', marginTop: '2px' }}>
          {subtitle}
        </p>
      )}
    </header>
  )
}
