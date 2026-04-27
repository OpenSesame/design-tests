export default function SkillGapRow({ skill, gapPercent, atRisk, department, rank }) {
  const barColor = gapPercent >= 60 ? 'var(--error)' : gapPercent >= 45 ? 'var(--warning)' : 'var(--text-hint)'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '6px',
      padding: '14px 0',
      borderBottom: '1px solid var(--outline-tertiary)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <span style={{
            fontSize: '11px', fontWeight: 600, color: 'var(--text-hint)',
            minWidth: '18px', textAlign: 'right',
          }}>
            {rank}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {skill}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-hint)', marginTop: '2px' }}>{department}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--error)' }}>{atRisk}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-hint)' }}>at risk</div>
        </div>
      </div>

      {/* Gap bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '26px' }}>
        <div style={{
          flex: 1, height: '5px', borderRadius: 'var(--radius-pill)',
          background: 'var(--surface-4th)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${gapPercent}%`,
            background: barColor,
            borderRadius: 'var(--radius-pill)',
            transition: 'width 0.4s ease',
          }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: barColor, minWidth: '32px', textAlign: 'right' }}>
          {gapPercent}%
        </span>
      </div>
    </div>
  )
}
