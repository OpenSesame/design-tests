export default function RecentActivityItem({ title, completedAt }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid var(--outline-tertiary)',
    }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        background: 'var(--success-light)',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M5 12l5 5L19 7" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p style={{ flex: 1, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
        {title}
      </p>
      <span style={{ fontSize: '12px', color: 'var(--text-hint)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {completedAt}
      </span>
    </div>
  )
}
