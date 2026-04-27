import { hcaData } from '../../data/mockHCA'
import HCAScoreRing from '../../components/hca/HCAScoreRing'
import CapabilityVelocityChart from '../../components/hca/CapabilityVelocityChart'
import SkillGapRow from '../../components/hca/SkillGapRow'

function IndicatorRow({ label, value, delta, positive }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '4px',
      padding: '12px 0',
      borderBottom: '1px solid var(--outline-tertiary)',
    }}>
      <span style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: 1.3 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</span>
        <span style={{
          fontSize: '11px', fontWeight: 500,
          color: positive ? 'var(--success)' : 'var(--error)',
        }}>
          {positive ? '↑' : '↓'} {delta}
        </span>
      </div>
    </div>
  )
}

function SectionLabel({ children, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{children}</span>
      {tag && (
        <span style={{
          fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          padding: '2px 7px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--info-light)',
          color: 'var(--info)',
        }}>
          {tag}
        </span>
      )}
    </div>
  )
}

export default function HCAPage() {
  const { orgName, overallScore, previousScore, readinessTier, nextTier, nextTierThreshold,
    velocityData, skillGaps, leadingIndicators, laggingIndicators } = hcaData

  const pointsToNextTier = nextTierThreshold - overallScore

  return (
    <div style={{
      maxWidth: '480px', margin: '0 auto',
      padding: '0 16px 96px',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 0 16px',
        borderBottom: '1px solid var(--outline-tertiary)',
        marginBottom: '20px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-hint)', marginBottom: '4px' }}>
          Human Capital Analytics
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {orgName}
          </h1>
          <span style={{ fontSize: '12px', color: 'var(--text-hint)' }}>Apr 2026</span>
        </div>
      </div>

      {/* Score card */}
      <div style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--outline-tertiary)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}>
        <HCAScoreRing score={overallScore} tier={readinessTier} previousScore={previousScore} />

        {/* Next tier progress */}
        <div style={{
          width: '100%',
          padding: '12px 16px',
          background: 'var(--surface-secondary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {pointsToNextTier} pts to <strong style={{ color: 'var(--brand)' }}>{nextTier} Tier</strong>
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-hint)' }}>{overallScore} / {nextTierThreshold}</span>
          </div>
          <div style={{ height: '6px', background: 'var(--surface-4th)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${((overallScore - 60) / (nextTierThreshold - 60)) * 100}%`,
              background: 'var(--brand)',
              borderRadius: 'var(--radius-pill)',
            }} />
          </div>
        </div>
      </div>

      {/* Capability velocity */}
      <div style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--outline-tertiary)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 20px 12px',
        marginBottom: '16px',
      }}>
        <SectionLabel>Capability Velocity</SectionLabel>
        <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '12px' }}>
          HCA score trajectory, last 6 months
        </p>
        <CapabilityVelocityChart data={velocityData} />
      </div>

      {/* Skill gaps */}
      <div style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--outline-tertiary)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 20px 4px',
        marginBottom: '16px',
      }}>
        <SectionLabel>Top Skill Gaps</SectionLabel>
        <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '4px' }}>
          Ranked by estimated business risk
        </p>
        {skillGaps.map((gap, i) => (
          <SkillGapRow key={gap.skill} {...gap} rank={i + 1} />
        ))}
      </div>

      {/* Leading & Lagging indicators */}
      <div style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--outline-tertiary)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <SectionLabel tag="Leading">Predictive</SectionLabel>
            {leadingIndicators.map(ind => (
              <IndicatorRow key={ind.label} {...ind} />
            ))}
          </div>
          <div>
            <SectionLabel tag="Lagging">Outcomes</SectionLabel>
            {laggingIndicators.map(ind => (
              <IndicatorRow key={ind.label} {...ind} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
