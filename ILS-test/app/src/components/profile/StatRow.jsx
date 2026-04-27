function Stat({ value, label }) {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '16px 8px' }}>
      <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-hint)', marginTop: '4px', fontWeight: 400 }}>
        {label}
      </div>
    </div>
  )
}

export default function StatRow({ hoursThisMonth, completedCount, streak }) {
  return (
    <div style={{
      background: 'var(--surface-primary)',
      border: '1px solid var(--outline-tertiary)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <Stat value={`${hoursThisMonth}h`} label="this month" />
      <div style={{ width: '1px', height: '40px', background: 'var(--outline-tertiary)' }} />
      <Stat value={completedCount} label="completed" />
      <div style={{ width: '1px', height: '40px', background: 'var(--outline-tertiary)' }} />
      <Stat value={`${streak}d`} label="streak" />
    </div>
  )
}
