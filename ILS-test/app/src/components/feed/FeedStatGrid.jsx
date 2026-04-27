function StatTile({ icon, value, label }) {
  return (
    <div style={{
      background: 'var(--surface-primary)',
      border: '1px solid var(--outline-tertiary)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px 12px',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}
        <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
      </div>
      <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-hint)', letterSpacing: '0.02em' }}>
        {label}
      </span>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-hint)" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand)" stroke="none">
      <path d="M12 2c0 0-6 5-6 11a6 6 0 0 0 12 0c0-6-6-11-6-11zm0 16a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z"/>
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 24 24" fill="var(--info)" stroke="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  )
}

export default function FeedStatGrid({ user }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <StatTile
        icon={<ClockIcon />}
        value={`${user.hoursThisMonth}h`}
        label="Learning this month"
      />
      <StatTile
        icon={<CheckIcon />}
        value={user.totalSkills ?? user.completedCourseIds?.length ?? 0}
        label="Total skills"
      />
      <StatTile
        icon={<FlameIcon />}
        value={`${user.streak} days`}
        label="Learning streak"
      />
      <StatTile
        icon={<LightningIcon />}
        value={user.industryInsights ?? 0}
        label="Industry insights"
      />
    </div>
  )
}
