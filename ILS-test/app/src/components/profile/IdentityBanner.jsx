export default function IdentityBanner({ identityString }) {
  return (
    <div style={{
      background: 'var(--brand-light)',
      border: '1px solid var(--brand-hover)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
    }}>
      <p style={{
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: 1.5,
        color: 'var(--text-primary)',
        marginBottom: '8px',
      }}>
        {identityString || "You're becoming the kind of professional others learn from."}
      </p>
      <p style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: 1.4 }}>
        Based on what you've told us and what you're working on.
      </p>
    </div>
  )
}
