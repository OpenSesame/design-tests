const roleLabels = {
  manager:   'Manager',
  director:  'Senior Manager',
  vp:        'VP / Head of',
  'c-suite': 'C-Suite Executive',
  ic:        'Individual Contributor',
  other:     'Professional',
}

function FlameIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand)" stroke="none">
      <path d="M12 2c0 0-6 5-6 11a6 6 0 0 0 12 0c0-6-6-11-6-11zm0 16a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-hint)" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}

function StatCell({ icon, value, label, accent, border }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '4px 0',
      borderRight: border ? '1px solid var(--outline-tertiary)' : 'none',
    }}>
      <div>{icon}</div>
      <span style={{
        fontSize: 28, fontWeight: 700, lineHeight: 1,
        color: accent || 'var(--text-primary)',
        letterSpacing: '-0.02em',
        marginTop: 2,
      }}>
        {value}
      </span>
      <span style={{
        fontSize: 10, fontWeight: 500, letterSpacing: '0.05em',
        textTransform: 'uppercase', color: 'var(--text-hint)',
        textAlign: 'center', lineHeight: 1.4,
      }}>
        {label}
      </span>
    </div>
  )
}

export default function FeedDashboard({ user }) {
  const roleLabel  = roleLabels[user.role]
  const industryLabel = user.industry
    ? user.industry.charAt(0).toUpperCase() + user.industry.slice(1)
    : null
  const completions = user.completedCourseIds?.length ?? 0

  return (
    <div style={{
      background: 'var(--surface-primary)',
      border: '1px solid var(--outline-tertiary)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Role + industry */}
      {roleLabel && (
        <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
            textTransform: 'uppercase', color: 'var(--text-hint)',
          }}>
            {roleLabel}
          </span>
          {industryLabel && (
            <>
              <span style={{ color: 'var(--outline-secondary)', fontSize: 11 }}>·</span>
              <span style={{
                fontSize: 11, fontWeight: 500,
                color: 'var(--text-hint)',
              }}>
                {industryLabel}
              </span>
            </>
          )}
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'flex', padding: '18px 12px 20px' }}>
        <StatCell
          icon={<FlameIcon />}
          value={user.streak}
          label={`Day Streak`}
          accent="var(--brand)"
          border
        />
        <StatCell
          icon={<ClockIcon />}
          value={`${user.hoursThisMonth}h`}
          label="This Month"
          border
        />
        <StatCell
          icon={<CheckIcon />}
          value={completions}
          label="Completed"
          accent="var(--success)"
        />
      </div>

    </div>
  )
}
