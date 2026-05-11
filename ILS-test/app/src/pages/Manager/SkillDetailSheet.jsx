import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { teamMembers, teamSkillGaps, skillInfo, catalogSuggestions } from '../../data/teamData'

const PROFICIENT_THRESHOLD = 70

function categorizeMember(member, skillName) {
  const skill = member.skills.find(s => s.name === skillName)
  const proficiency = skill ? skill.proficiency : 0
  const hasTrained = member.trainingHistory.some(h => h.skill === skillName)

  if (proficiency >= PROFICIENT_THRESHOLD) return 'verified'
  if (hasTrained) return 'trained'
  return 'needs'
}

function MemberChip({ member, sublabel, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', cursor: onClick ? 'pointer' : 'default' }}
    >
      <img src={member.avatar} alt={member.name}
        style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{member.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>{member.role}{sublabel ? ` · ${sublabel}` : ''}</div>
      </div>
      {onClick && (
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: 'var(--text-hint)', flexShrink: 0 }}>
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}

function ContentRow({ item }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0',
      borderBottom: '1px solid var(--outline-tertiary)',
    }}>
      <img src={item.thumbnail} alt={item.title}
        style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 3 }}>
          {item.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>{item.type} · {item.duration}</div>
      </div>
    </div>
  )
}

function GroupSection({ label, color, dotColor, members, sublabelFn, onMemberTap }) {
  if (members.length === 0) return null
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color, letterSpacing: '0.02em' }}>
          {label} ({members.length})
        </span>
      </div>
      <div style={{ paddingLeft: 16, borderLeft: '1px solid var(--outline-tertiary)' }}>
        {members.map(m => (
          <MemberChip
            key={m.id}
            member={m}
            sublabel={sublabelFn ? sublabelFn(m) : null}
            onClick={onMemberTap ? () => onMemberTap(m) : undefined}
          />
        ))}
      </div>
    </div>
  )
}

const criticalityConfig = {
  'Critical': { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  'High':     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  'Medium':   { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
}

export default function SkillDetailSheet({ skillName, onClose, onAssign }) {
  const navigate = useNavigate()
  const [trainingExpanded, setTrainingExpanded] = useState(true)

  function handleMemberTap(member) {
    onClose()
    navigate(`/team-member/${member.id}`)
  }

  const info = skillInfo[skillName]
  const content = info?.content || catalogSuggestions.slice(0, 3)
  const gap = teamSkillGaps.find(g => g.skill === skillName)
  const cc = gap ? (criticalityConfig[gap.criticalityLabel] || criticalityConfig['Medium']) : null

  const verified = teamMembers.filter(m => categorizeMember(m, skillName) === 'verified')
  const trained  = teamMembers.filter(m => categorizeMember(m, skillName) === 'trained')
  const needs    = teamMembers.filter(m => categorizeMember(m, skillName) === 'needs')

  const proficiencyLabel = (m) => {
    const s = m.skills.find(sk => sk.name === skillName)
    return s ? `${s.proficiency}% proficiency` : null
  }

  const trainedLabel = (m) => {
    const history = m.trainingHistory.filter(h => h.skill === skillName)
    return `Completed ${history.length} course${history.length !== 1 ? 's' : ''}`
  }

  // Lock body scroll while sheet is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200,
      }} />

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--surface-secondary)',
        borderRadius: '24px 24px 0 0',
        zIndex: 201,
        maxHeight: '92vh',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Drag handle */}
        <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--outline-tertiary)', margin: '12px auto 0', flexShrink: 0 }} />

        {/* Fixed header — skill name + close only */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px 12px', flexShrink: 0,
          borderBottom: '1px solid var(--outline-tertiary)',
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
            {skillName}
          </div>
          <button onClick={onClose} style={{
            background: 'var(--surface-tertiary)', border: 'none',
            width: 30, height: 30, borderRadius: '50%',
            fontSize: 15, color: 'var(--text-secondary)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Scrollable body — description scrolls with rest of content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }}>

          {info && (
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
              {info.description}
            </div>
          )}

          {/* Criticality + coverage stats */}
          {gap && cc && (
            <div style={{
              display: 'flex', gap: 10, marginBottom: 24,
            }}>
              <div style={{
                flex: 1, padding: '12px 14px', borderRadius: 12,
                background: cc.bg, border: `1px solid ${cc.color}22`,
              }}>
                <div style={{ fontSize: 11, color: cc.color, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Criticality
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: cc.color }}>{gap.criticality}<span style={{ fontSize: 13, fontWeight: 400 }}>/10</span></div>
                <div style={{ fontSize: 12, color: cc.color, opacity: 0.8 }}>{gap.criticalityLabel}</div>
              </div>
              <div style={{
                flex: 1, padding: '12px 14px', borderRadius: 12,
                background: 'var(--surface-primary)', border: '1px solid var(--outline-tertiary)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-hint)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Coverage
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: gap.weak > gap.total / 2 ? '#ef4444' : '#00b482' }}>
                  {gap.total - gap.weak}<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-hint)' }}>/{gap.total}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>{gap.weak} need training</div>
              </div>
            </div>
          )}

          {/* Team breakdown */}
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-hint)', marginBottom: 16 }}>
            Team Breakdown
          </div>

          <GroupSection
            label="Assessed & verified"
            color="#00b482" dotColor="#00b482"
            members={verified}
            sublabelFn={proficiencyLabel}
            onMemberTap={handleMemberTap}
          />
          <GroupSection
            label="Training completed"
            color="#3b82f6" dotColor="#3b82f6"
            members={trained}
            sublabelFn={trainedLabel}
            onMemberTap={handleMemberTap}
          />
          <GroupSection
            label="Needs training"
            color="#f59e0b" dotColor="#f59e0b"
            members={needs}
            sublabelFn={() => 'Not yet assigned'}
            onMemberTap={handleMemberTap}
          />

          {/* Training — collapsable, at bottom */}
          <button
            onClick={() => setTrainingExpanded(e => !e)}
            style={{
              width: '100%', background: 'none', border: 'none', padding: '16px 0 0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', marginBottom: trainingExpanded ? 8 : 0,
              borderTop: '1px solid var(--outline-tertiary)',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-hint)' }}>
              Training
            </span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
              style={{ transform: trainingExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'var(--text-hint)', flexShrink: 0 }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {trainingExpanded && (
            <div>
              {content.map(c => <ContentRow key={c.id} item={c} />)}
            </div>
          )}

          <div style={{ height: 100 }} />
        </div>

        {/* Sticky CTA */}
        <div style={{
          padding: '12px 20px 40px',
          borderTop: '1px solid var(--outline-tertiary)',
          background: 'var(--surface-secondary)',
          flexShrink: 0,
        }}>
          <button
            onClick={() => onAssign(skillName)}
            style={{
              width: '100%', padding: '14px', borderRadius: 100,
              background: '#fff', border: 'none',
              fontSize: 15, fontWeight: 600, color: '#111',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Assign Training
          </button>
        </div>
      </div>
    </>
  )
}
