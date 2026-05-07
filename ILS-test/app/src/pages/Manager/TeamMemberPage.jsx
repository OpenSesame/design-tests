import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { teamMembers, catalogSuggestions, skillInfo, statusConfig } from '../../data/teamData'

function BackIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

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
    <div style={{ height: 4, borderRadius: 99, background: 'var(--outline-tertiary)', overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${Math.min(value, 100)}%`,
        background: color || 'var(--brand)', borderRadius: 99,
        transition: 'width 0.4s ease',
      }} />
    </div>
  )
}

function proficiencyColor(value) {
  if (value >= 70) return '#00b482'
  if (value >= 45) return '#f59e0b'
  return '#ef4444'
}

function AssignModal({ member, onClose }) {
  const [selectedContent, setSelectedContent] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--surface-secondary)',
        zIndex: 300, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Assigned!</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Learning assigned to {member.name}
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: 8, padding: '12px 32px', borderRadius: 100,
            background: '#fff', border: 'none',
            fontSize: 15, fontWeight: 600, color: '#111',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
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
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 20px 0',
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Assign Learning</div>
          <div style={{ fontSize: 12, color: 'var(--text-hint)', marginTop: 2 }}>To {member.name}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'var(--surface-tertiary)', border: 'none',
            width: 32, height: 32, borderRadius: '50%',
            fontSize: 16, color: 'var(--text-secondary)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }}>
        {(() => {
          const firstName = member.name.split(' ')[0]

          // Build skill-gap content: first course from each gap skill, deduplicated
          const gapContent = []
          const seenIds = new Set()
          member.skillGaps.forEach(g => {
            const courses = skillInfo[g.name]?.content || []
            courses.slice(0, 2).forEach(c => {
              if (!seenIds.has(c.id)) { seenIds.add(c.id); gapContent.push({ ...c, skill: g.name }) }
            })
          })

          // Popular-among-role: catalog items not already in gap content
          const popularContent = catalogSuggestions.filter(c => !seenIds.has(c.id))

          const ContentRow = ({ item }) => (
            <div
              onClick={() => setSelectedContent(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0', cursor: 'pointer',
                borderBottom: '1px solid var(--outline-tertiary)',
                opacity: 1,
              }}
            >
              <img src={item.thumbnail} alt={item.title}
                style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3, lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>{item.type} · {item.duration}</div>
                {item.skill && (
                  <div style={{ fontSize: 11, color: '#f59e0b', marginTop: 3, fontWeight: 500 }}>
                    Addresses {item.skill}
                  </div>
                )}
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${selectedContent === item.id ? '#fff' : 'var(--outline-tertiary)'}`,
                background: selectedContent === item.id ? '#fff' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selectedContent === item.id && <span style={{ color: '#111', fontSize: 12 }}>✓</span>}
              </div>
            </div>
          )

          return (
            <>
              {gapContent.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                      {firstName}'s skill gaps
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>
                      Targets {member.skillGaps.map(g => g.name).join(' and ')}
                    </div>
                  </div>
                  {gapContent.map(c => <ContentRow key={c.id} item={c} />)}
                </div>
              )}

              {popularContent.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                      Popular among {member.role}s
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-hint)' }}>
                      Commonly assigned for this position
                    </div>
                  </div>
                  {popularContent.map(c => <ContentRow key={c.id} item={c} />)}
                </div>
              )}
            </>
          )
        })()}
      </div>

      <div style={{ padding: '16px 20px 40px', borderTop: '1px solid var(--outline-tertiary)' }}>
        <button
          onClick={() => selectedContent && setConfirmed(true)}
          style={{
            width: '100%', padding: '14px', borderRadius: 100,
            background: selectedContent ? '#fff' : 'var(--surface-tertiary)',
            border: 'none',
            fontSize: 15, fontWeight: 600,
            color: selectedContent ? '#111' : 'var(--text-hint)',
            cursor: selectedContent ? 'pointer' : 'default',
            fontFamily: 'inherit',
          }}
        >
          {selectedContent ? 'Assign to ' + member.name.split(' ')[0] : 'Select content'}
        </button>
      </div>
    </div>
  )
}

export default function TeamMemberPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [assignOpen, setAssignOpen] = useState(false)

  const member = teamMembers.find(m => m.id === Number(id))
  if (!member) return null

  const sc = statusConfig[member.status]

  const tabStyle = (tab) => ({
    background: 'none', border: 'none', padding: '10px 0', margin: 0,
    fontSize: 15, fontWeight: activeTab === tab ? 700 : 400,
    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-hint)',
    cursor: 'pointer', fontFamily: 'inherit',
    borderBottom: `2px solid ${activeTab === tab ? 'var(--text-primary)' : 'transparent'}`,
  })

  return (
    <div style={{ flex: 1, paddingBottom: 96 }}>
      {/* Back nav */}
      <div style={{ padding: '16px 20px 0' }}>
        <button
          onClick={() => navigate('/manager')}
          style={{
            background: 'none', border: 'none', padding: 0,
            display: 'flex', alignItems: 'center', gap: 4,
            color: 'var(--text-secondary)', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14,
          }}
        >
          <BackIcon /> Back to team
        </button>
      </div>

      {/* Member header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src={member.avatar} alt={member.name}
          style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{member.name}</div>
          <div style={{ fontSize: 14, color: 'var(--text-hint)', marginBottom: 8 }}>{member.role}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
              background: sc.bg, color: sc.color,
            }}>
              {sc.label}
            </span>
            {member.streak > 0 && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
                background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
              }}>
                🔥 {member.streak} day streak
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 28, padding: '20px 20px 0',
        borderBottom: '1px solid var(--outline-tertiary)',
        position: 'sticky', top: 0, background: 'var(--surface-secondary)', zIndex: 10,
      }}>
        {[['overview', 'Overview'], ['history', 'Training History']].map(([id, label]) => (
          <button key={id} style={tabStyle(id)} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ padding: '24px 20px 0' }}>

          {/* Skill Proficiency */}
          <SectionLabel>Skills</SectionLabel>
          {(() => {
            const assessed = member.skills.filter(s => s.proficiency >= 70)
            const trained  = member.skills.filter(s => s.proficiency >= 45 && s.proficiency < 70)
            const gaps     = member.skills.filter(s => s.proficiency < 45)

            const Group = ({ label, color, bg, items }) => items.length === 0 ? null : (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color }}>{label}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {items.map(s => (
                    <span key={s.name} style={{
                      fontSize: 13, fontWeight: 500,
                      padding: '5px 12px', borderRadius: 99,
                      background: bg, color,
                      border: `1px solid ${color}33`,
                    }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )

            return (
              <div style={{ marginBottom: 28 }}>
                <Group label="Assessed" color="#00b482" bg="rgba(0,180,130,0.1)"  items={assessed} />
                <Group label="Trained"  color="#3b82f6" bg="rgba(59,130,246,0.1)" items={trained} />
              </div>
            )
          })()}

          {/* Skill Gaps */}
          {member.skillGaps.length > 0 && (
            <>
              <SectionLabel>Skill Gaps</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {member.skillGaps.map(g => (
                  <div key={g.name} style={{
                    padding: '14px 16px', borderRadius: 14,
                    background: 'var(--surface-primary)',
                    border: '1px solid var(--outline-tertiary)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{g.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-hint)' }}>
                        {g.current}% → <span style={{ color: '#00b482' }}>{g.target}% target</span>
                      </span>
                    </div>
                    {/* Dual bar: current vs target */}
                    <div style={{ position: 'relative', height: 6, borderRadius: 99, background: 'var(--outline-tertiary)' }}>
                      {/* Target marker */}
                      <div style={{
                        position: 'absolute', top: -3, left: `${g.target}%`,
                        width: 2, height: 12, background: '#00b482', borderRadius: 1,
                        transform: 'translateX(-50%)',
                      }} />
                      {/* Current bar */}
                      <div style={{
                        height: '100%', width: `${g.current}%`,
                        background: '#ef4444', borderRadius: 99,
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      <span style={{ fontSize: 11, color: '#ef4444' }}>Current: {g.current}%</span>
                      <span style={{ fontSize: 11, color: 'var(--text-hint)' }}>Gap: {g.target - g.current}pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Active Learning */}
          <SectionLabel>Active Learning</SectionLabel>
          {member.assigned.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {member.assigned.map(a => (
                <div key={a.id} style={{
                  padding: '14px 16px', borderRadius: 14,
                  background: 'var(--surface-primary)',
                  border: '1px solid var(--outline-tertiary)',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{a.title}</div>
                  <ProgressBar value={a.progress} />
                  <div style={{ fontSize: 12, color: 'var(--text-hint)', marginTop: 5 }}>{a.progress}% complete</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--text-hint)', fontStyle: 'italic', marginBottom: 28 }}>
              No active learning assigned
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div style={{ padding: '24px 20px 0' }}>
          <SectionLabel>Completed Training</SectionLabel>
          {member.trainingHistory.length > 0 ? (
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute', left: 16, top: 8, bottom: 8,
                width: 1, background: 'var(--outline-tertiary)',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {member.trainingHistory.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 16, paddingBottom: 20, position: 'relative',
                  }}>
                    {/* Dot */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--surface-primary)',
                      border: '1px solid var(--outline-tertiary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, zIndex: 1,
                    }}>
                      ✓
                    </div>
                    <div style={{ flex: 1, paddingTop: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                        {item.title}
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
                          background: 'var(--surface-tertiary)', color: 'var(--text-hint)',
                        }}>
                          {item.type}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--text-hint)' }}>{item.duration}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-hint)', marginLeft: 'auto' }}>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--text-hint)', fontStyle: 'italic' }}>
              No training completed yet
            </div>
          )}
        </div>
      )}

      {/* Sticky assign CTA */}
      <div style={{
        position: 'fixed', bottom: 60, left: 0, right: 0,
        padding: '12px 20px',
        background: 'linear-gradient(to top, var(--surface-secondary) 60%, transparent)',
      }}>
        <button
          onClick={() => setAssignOpen(true)}
          style={{
            width: '100%', padding: '14px', borderRadius: 100,
            background: '#fff', border: 'none',
            fontSize: 15, fontWeight: 600, color: '#111',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Assign Learning
        </button>
      </div>

      {assignOpen && (
        <AssignModal member={member} onClose={() => setAssignOpen(false)} />
      )}
    </div>
  )
}
