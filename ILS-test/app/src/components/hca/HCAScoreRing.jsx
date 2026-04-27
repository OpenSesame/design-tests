import { tierConfig } from '../../data/mockHCA'

const R = 72
const CX = 90
const CY = 90
const STROKE = 12
const CIRCUMFERENCE = 2 * Math.PI * R

export default function HCAScoreRing({ score, tier, previousScore }) {
  const tierColor = tierConfig[tier]?.color ?? 'var(--brand)'
  const dashOffset = CIRCUMFERENCE * (1 - score / 100)
  const delta = score - previousScore

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', width: 180, height: 180 }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Track */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="var(--surface-4th)"
            strokeWidth={STROKE}
          />
          {/* Progress arc */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke={tierColor}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        {/* Center label */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2px',
        }}>
          <span style={{ fontSize: '38px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-hint)', fontWeight: 400 }}>/ 100</span>
        </div>
      </div>

      {/* Tier + delta */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          background: tierColor + '18',
          border: `1px solid ${tierColor}40`,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: tierColor, display: 'inline-block' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: tierColor }}>
            {tier} Tier
          </span>
        </div>
        <span style={{ fontSize: '12px', color: delta >= 0 ? 'var(--success)' : 'var(--error)', fontWeight: 500 }}>
          {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)} pts vs last month
        </span>
      </div>
    </div>
  )
}
