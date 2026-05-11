import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { team, teamMembers, teamSkillGaps, catalogSuggestions, activePrograms, statusConfig, skillInfo } from '../../data/teamData'
import SkillDetailSheet from './SkillDetailSheet'

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
      textTransform: 'uppercase', color: 'var(--text-hint)',
      marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

function ProgressBar({ value, color }) {
  return (
    <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${value}%`, background: color || 'rgba(255,255,255,0.7)', borderRadius: 99 }} />
    </div>
  )
}

const criticalityConfig = {
  'Critical': { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  barColor: '#ef4444' },
  'High':     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', barColor: '#f59e0b' },
  'Medium':   { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', barColor: '#3b82f6' },
}

function SkillGapCard({ gap, onSkillTap }) {
  const cc = criticalityConfig[gap.criticalityLabel] || criticalityConfig['Medium']

  return (
    <div
      onClick={() => onSkillTap(gap.skill)}
      style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--outline-tertiary)',
        borderRadius: 14,
        padding: '14px 16px',
        cursor: 'pointer',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{gap.skill}</span>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
          textTransform: 'uppercase', padding: '3px 9px', borderRadius: 99,
          background: cc.bg, color: cc.color,
        }}>
          {gap.criticalityLabel}
        </span>
      </div>

      {/* Who's missing — avatar stack + coverage count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--text-hint)' }}>
          {gap.weak} of {gap.total} need training
        </span>
        <div style={{ color: 'var(--text-hint)', display: 'flex', alignItems: 'center' }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function MemberRow({ member, onTap }) {
  const sc = statusConfig[member.status]
  return (
    <div
      onClick={() => onTap(member.id)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 0',
        borderBottom: '1px solid var(--outline-tertiary)',
        cursor: 'pointer',
      }}
    >
      <img src={member.avatar} alt={member.name}
        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{member.name}</span>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
            background: sc.bg, color: sc.color, flexShrink: 0,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            {sc.label}
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-hint)', marginBottom: 8 }}>{member.role}</div>
        {member.assigned.length > 0 ? (
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 5 }}>
              {member.assigned[0].title}
            </div>
            <ProgressBar value={member.assigned[0].progress} />
            <div style={{ fontSize: 11, color: 'var(--text-hint)', marginTop: 3 }}>
              {member.assigned[0].progress}% complete
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--text-hint)', fontStyle: 'italic' }}>No active learning</div>
        )}
      </div>
      <div style={{ color: 'var(--text-hint)', fontSize: 18, paddingTop: 10, flexShrink: 0 }}>›</div>
    </div>
  )
}

function AssignModal({ preselectedSkill, onClose }) {
  const [selectedMembers, setSelectedMembers] = useState([])
  const [confirmed, setConfirmed] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(false)

  const content = preselectedSkill && skillInfo[preselectedSkill]
    ? skillInfo[preselectedSkill].content
    : catalogSuggestions

  const toggleMember = (id) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (confirmed) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--surface-secondary)',
        zIndex: 300, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Assigned!</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', padding: '0 32px' }}>
          Training assigned to {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''}
        </div>
        <button onClick={onClose} style={{
          marginTop: 8, padding: '12px 32px', borderRadius: 100,
          background: '#fff', border: 'none',
          fontSize: 15, fontWeight: 600, color: '#111',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Done
        </button>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--surface-secondary)',
      zIndex: 300, display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '20px 20px 16px', flexShrink: 0,
        borderBottom: '1px solid var(--outline-tertiary)',
      }}>
        <div>
          {preselectedSkill && (
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-hint)', marginBottom: 4 }}>
              Assigning
            </div>
          )}
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
            {preselectedSkill || 'Training'}
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'var(--surface-tertiary)', border: 'none',
          width: 32, height: 32, borderRadius: '50%',
          fontSize: 16, color: 'var(--text-secondary)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 2,
        }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }}>

        {/* Assign To — first */}
        <SectionLabel>Assign To</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 28 }}>
          {teamMembers.map(m => {
            const checked = selectedMembers.includes(m.id)
            return (
              <div
                key={m.id}
                onClick={() => toggleMember(m.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 12, cursor: 'pointer',
                  background: checked ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
              >
                <img src={m.avatar} alt={m.name}
                  style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>{m.role}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: `2px solid ${checked ? '#fff' : 'var(--outline-tertiary)'}`,
                  background: checked ? '#fff' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {checked && <span style={{ color: '#111', fontSize: 12, lineHeight: 1 }}>✓</span>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Training Content — collapsible */}
        <button
          onClick={() => setContentExpanded(e => !e)}
          style={{
            width: '100%', background: 'none', border: 'none', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', marginBottom: contentExpanded ? 12 : 24,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-hint)' }}>
            Training Content
          </span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            style={{ transform: contentExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'var(--text-hint)' }}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {contentExpanded && (
          <div style={{ marginBottom: 24 }}>
            {content.map((c, i) => (
              <div key={c.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < content.length - 1 ? '1px solid var(--outline-tertiary)' : 'none',
              }}>
                <img src={c.thumbnail} alt={c.title}
                  style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>{c.type} · {c.duration}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <div style={{ padding: '16px 20px 40px', borderTop: '1px solid var(--outline-tertiary)', flexShrink: 0 }}>
        <button
          onClick={() => selectedMembers.length > 0 && setConfirmed(true)}
          style={{
            width: '100%', padding: '14px', borderRadius: 100,
            background: selectedMembers.length > 0 ? '#fff' : 'var(--surface-tertiary)',
            border: 'none',
            fontSize: 15, fontWeight: 600,
            color: selectedMembers.length > 0 ? '#111' : 'var(--text-hint)',
            cursor: selectedMembers.length > 0 ? 'pointer' : 'default',
            fontFamily: 'inherit',
          }}
        >
          {selectedMembers.length > 0
            ? `Assign to ${selectedMembers.length} member${selectedMembers.length !== 1 ? 's' : ''}`
            : 'Select team members'}
        </button>
      </div>
    </div>
  )
}

export default function ManagerPage() {
  const navigate = useNavigate()
  const [assignOpen, setAssignOpen] = useState(false)
  const [assignSkill, setAssignSkill] = useState(null)
  const [skillDetailSkill, setSkillDetailSkill] = useState(null)

  const [gapPage, setGapPage] = useState(0)
  const gapScrollRef = useRef(null)

  const onTrackCount = teamMembers.filter(m => m.status === 'on-track').length

  const goToGapPage = (newPage) => {
    if (!gapScrollRef.current) return
    const totalPages = Math.ceil(teamSkillGaps.length / 3)
    const page = Math.max(0, Math.min(newPage, totalPages - 1))
    setGapPage(page)
    gapScrollRef.current.scrollTo({ left: page * gapScrollRef.current.offsetWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = gapScrollRef.current
    if (!el) return
    const onScroll = () => {
      const page = Math.round(el.scrollLeft / el.offsetWidth)
      setGapPage(page)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const openAssign = (skill = null) => {
    setSkillDetailSkill(null)
    setAssignSkill(skill)
    setAssignOpen(true)
  }

  const closeAssign = () => {
    setAssignOpen(false)
    setAssignSkill(null)
  }

  return (
    <div style={{ flex: 1, paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ marginBottom: 2 }}>
          <div style={{ fontSize: 13, color: 'var(--text-hint)', marginBottom: 4 }}>Your Team</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            {team.name}
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>
          {teamMembers.length} direct reports · {onTrackCount} on track
        </div>
      </div>

      {/* Team Skill Gaps */}
      <div style={{ padding: '28px 20px 0' }}>
        {(() => {
          const pages = []
          for (let i = 0; i < teamSkillGaps.length; i += 3) pages.push(teamSkillGaps.slice(i, i + 3))
          const totalPages = pages.length
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-hint)' }}>Team Skill Gaps</div>
                {totalPages > 1 ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <button
                      onClick={() => goToGapPage(gapPage - 1)}
                      disabled={gapPage === 0}
                      style={{
                        background: 'none', border: 'none', padding: '2px 6px',
                        cursor: gapPage === 0 ? 'default' : 'pointer',
                        color: gapPage === 0 ? 'rgba(255,255,255,0.2)' : 'var(--text-hint)',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <span style={{ fontSize: 12, color: 'var(--text-hint)', fontWeight: 500, minWidth: 28, textAlign: 'center' }}>
                      {gapPage + 1}/{totalPages}
                    </span>
                    <button
                      onClick={() => goToGapPage(gapPage + 1)}
                      disabled={gapPage === totalPages - 1}
                      style={{
                        background: 'none', border: 'none', padding: '2px 6px',
                        cursor: gapPage === totalPages - 1 ? 'default' : 'pointer',
                        color: gapPage === totalPages - 1 ? 'rgba(255,255,255,0.2)' : 'var(--text-hint)',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize: 12, color: 'var(--text-hint)', fontWeight: 500 }}>{teamSkillGaps.length} total</span>
                )}
              </div>
              <div
                ref={gapScrollRef}
                style={{
                  display: 'flex',
                  overflowX: 'auto', scrollbarWidth: 'none',
                  scrollSnapType: 'x mandatory',
                  gap: 0,
                }}
              >
                {pages.map((page, pi) => (
                  <div key={pi} style={{
                    minWidth: '100%', flexShrink: 0,
                    scrollSnapAlign: 'start',
                    display: 'flex', flexDirection: 'column', gap: 10,
                  }}>
                    {page.map(gap => (
                      <SkillGapCard key={gap.skill} gap={gap} onSkillTap={setSkillDetailSkill} />
                    ))}
                  </div>
                ))}
              </div>
            </>
          )
        })()}
      </div>

      {/* Team Members */}
      <div style={{ padding: '28px 20px 0' }}>
        <SectionLabel>Team Members</SectionLabel>
        <div>
          {teamMembers.map(m => (
            <MemberRow key={m.id} member={m} onTap={(id) => navigate(`/team-member/${id}`)} />
          ))}
        </div>
      </div>

      {/* Active Programs */}
      <div style={{ padding: '28px 20px 0' }}>
        <SectionLabel>Active Programs</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activePrograms.map(p => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderRadius: 14,
              background: 'var(--surface-primary)',
              border: '1px solid var(--outline-tertiary)',
            }}>
              <img src={p.thumbnail} alt={p.title}
                style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-hint)', marginBottom: 6 }}>{p.completed} of {p.total} completed</div>
                <ProgressBar value={(p.completed / p.total) * 100} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {skillDetailSkill && (
        <SkillDetailSheet
          skillName={skillDetailSkill}
          onClose={() => setSkillDetailSkill(null)}
          onAssign={openAssign}
        />
      )}

      {assignOpen && (
        <AssignModal preselectedSkill={assignSkill} onClose={closeAssign} />
      )}

      {/* Sticky Assign CTA */}
      <div style={{
        position: 'fixed', bottom: 60, left: 0, right: 0,
        padding: '12px 20px',
        background: 'linear-gradient(to top, var(--surface-secondary) 60%, transparent)',
      }}>
        <button
          onClick={() => openAssign()}
          style={{
            width: '100%', padding: '11px', borderRadius: 100,
            background: '#fff', border: 'none',
            fontSize: 15, fontWeight: 600, color: '#111',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Assign Learning
        </button>
      </div>
    </div>
  )
}
