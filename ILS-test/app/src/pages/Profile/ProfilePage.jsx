import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { skillAreasByRole, recentActivity } from '../../data/mockProfile'
import { feedItems } from '../../data/mockFeed'
import FeedStatGrid from '../../components/feed/FeedStatGrid'
import SkillChip from '../../components/profile/SkillChip'
import RecentActivityItem from '../../components/profile/RecentActivityItem'

const roleLabels = {
  manager: 'Team Manager',
  director: 'Director',
  vp: 'Vice President',
  'c-suite': 'Executive',
  ic: 'Specialist',
}

const badges = [
  { emoji: '🔥', label: 'On a Streak',     gradient: 'linear-gradient(145deg, #7c2d00, #ea580c)' },
  { emoji: '✅', label: 'First Course',    gradient: 'linear-gradient(145deg, #064e3b, #10b981)' },
  { emoji: '📚', label: 'Skill Builder',   gradient: 'linear-gradient(145deg, #1e3a5f, #3b82f6)' },
  { emoji: '⚡', label: 'Insight Seeker', gradient: 'linear-gradient(145deg, #3b0764, #a855f7)' },
  { emoji: '🎯', label: 'Goal Setter',    gradient: 'linear-gradient(145deg, #7f1d1d, #ef4444)' },
  { emoji: '🏆', label: 'Top Learner',    gradient: 'linear-gradient(145deg, #713f12, #f59e0b)' },
  { viewAll: true },
]

// Mock: last 8 weeks of daily activity (0=none, 1=light, 2=medium, 3=active)
const activityData = [
  [0,1,0,2,1,0,0],
  [1,0,2,3,0,1,0],
  [0,2,1,0,3,2,1],
  [2,0,0,1,2,0,0],
  [0,3,2,1,0,1,2],
  [1,0,1,2,3,0,0],
  [0,2,0,0,1,2,1],
  [1,1,3,2,0,0,1],
]
const dayLabels = ['M','T','W','T','F','S','S']

const activityColor = (level) => {
  if (level === 0) return 'rgba(255,255,255,0.06)'
  if (level === 1) return 'rgba(0,125,255,0.25)'
  if (level === 2) return 'rgba(0,125,255,0.55)'
  return 'var(--brand)'
}

const contentItems = feedItems.filter(i => ['micro-content','course'].includes(i.type))

const collectionTypeStyles = {
  'learning-path': { label: 'Learning Path', tabColor: '#5b21b6', tabBg: '#7c3aed' },
  skill:           { label: 'Skill',         tabColor: '#0e7490', tabBg: '#0891b2' },
  curriculum:      { label: 'Curriculum',    tabColor: '#b45309', tabBg: '#d97706' },
}

const savedItems = [
  { kind: 'single', ...contentItems[0] },
  { kind: 'single', ...contentItems[1] },
  {
    kind: 'collection', id: 'col-1', collectionType: 'learning-path',
    title: 'Leadership Foundations', itemCount: 8,
    thumbnailUrls: [
      'https://picsum.photos/seed/leadership/800/450',
      'https://picsum.photos/seed/lu1/400/700',
      'https://picsum.photos/seed/lu2/400/700',
      'https://picsum.photos/seed/lu3/400/700',
    ],
  },
  { kind: 'single', ...contentItems[3] },
  {
    kind: 'collection', id: 'col-2', collectionType: 'skill',
    title: 'Communication Essentials', itemCount: 5,
    thumbnailUrls: [
      'https://picsum.photos/seed/meeting/800/450',
      'https://picsum.photos/seed/fb1/400/700',
      'https://picsum.photos/seed/fb2/400/700',
      'https://picsum.photos/seed/feedback/800/450',
    ],
  },
  { kind: 'single', ...contentItems[4] },
  {
    kind: 'collection', id: 'col-3', collectionType: 'curriculum',
    title: 'New Manager Curriculum', itemCount: 14,
    thumbnailUrls: [
      'https://picsum.photos/seed/feedback/800/450',
      'https://picsum.photos/seed/lu4/400/700',
      'https://picsum.photos/seed/fb3/400/700',
      'https://picsum.photos/seed/lu5/400/700',
    ],
  },
  { kind: 'single', ...contentItems[5] },
]

function ProfileTab({ user }) {
  const skills = skillAreasByRole[user.role] || skillAreasByRole['ic']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 20px' }}>

      {/* Your Progress */}
      <section>
        <h2 style={sectionLabel}>Your Progress</h2>
        <FeedStatGrid user={user} />
      </section>

      {/* Achievements */}
      <section>
        <h2 style={sectionLabel}>Achievements</h2>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', margin: '0 -20px', padding: '0 20px 4px' }}>
          {badges.map((b, i) => b.viewAll ? (
            <div key="view-all" style={{
              flexShrink: 0, width: 72,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: 'var(--surface-primary)',
                border: '1px solid var(--outline-tertiary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                fontSize: 20,
              }}>
                →
              </div>
              <span style={{
                fontSize: 11, fontWeight: 500, color: 'var(--text-hint)',
                textAlign: 'center', lineHeight: 1.3,
              }}>
                View all
              </span>
            </div>
          ) : (
            <div key={b.label} style={{
              flexShrink: 0, width: 72,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: b.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                fontSize: 28,
              }}>
                {b.emoji}
              </div>
              <span style={{
                fontSize: 11, fontWeight: 500, color: 'var(--text-hint)',
                textAlign: 'center', lineHeight: 1.3,
              }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 style={sectionLabel}>Skills You're Building</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map(s => <SkillChip key={s} label={s} />)}
        </div>
      </section>

      {/* Recently Completed */}
      <section>
        <h2 style={sectionLabel}>Recently Completed</h2>
        <div style={{
          background: 'var(--surface-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--outline-tertiary)',
          padding: '0 16px',
        }}>
          {recentActivity.map(item => (
            <RecentActivityItem key={item.id} title={item.title} completedAt={item.completedAt} />
          ))}
        </div>
      </section>

      {/* Activity Graph */}
      <section>
        <h2 style={sectionLabel}>Activity</h2>
        <div style={{
          background: 'var(--surface-primary)',
          border: '1px solid var(--outline-tertiary)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
        }}>
          {/* Day labels */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(7, 1fr)`, gap: 5, marginBottom: 6 }}>
            {dayLabels.map((d, i) => (
              <span key={i} style={{ fontSize: 10, color: 'var(--text-hint)', textAlign: 'center', fontWeight: 500 }}>{d}</span>
            ))}
          </div>
          {/* Grid */}
          {activityData.map((week, wi) => (
            <div key={wi} style={{ display: 'grid', gridTemplateColumns: `repeat(7, 1fr)`, gap: 5, marginBottom: 5 }}>
              {week.map((level, di) => (
                <div key={di} style={{
                  aspectRatio: '1',
                  borderRadius: 3,
                  background: activityColor(level),
                }} />
              ))}
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'var(--text-hint)', marginTop: 10, textAlign: 'right' }}>Last 8 weeks</p>
        </div>
      </section>

    </div>
  )
}

function SingleCard({ item, navigate }) {
  return (
    <div
      onClick={() => navigate(`/watch/${item.id}`)}
      style={{ borderRadius: 14, overflow: 'hidden', background: 'var(--surface-primary)', border: '1px solid var(--outline-tertiary)', cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', height: 100 }}>
        <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
        <span style={{ position: 'absolute', bottom: 7, left: 8, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {item.type === 'micro-content' ? `▶ ${item.duration}` : item.duration}
        </span>
      </div>
      <div style={{ padding: '10px 10px 12px' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
          {item.title}
        </p>
      </div>
    </div>
  )
}

function CollectionCard({ item }) {
  const { label, tabBg } = collectionTypeStyles[item.collectionType]
  const thumbs = item.thumbnailUrls
  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      background: 'var(--surface-primary)',
      border: '1px solid var(--outline-tertiary)',
      cursor: 'pointer',
    }}>
      {/* 2×2 thumbnail grid */}
      <div style={{ position: 'relative', height: 100 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '100%', gap: 1, background: 'var(--outline-tertiary)' }}>
          {thumbs.slice(0, 4).map((url, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        {/* Type label — top left inside boundary */}
        <span style={{
          position: 'absolute', top: 7, left: 7,
          background: tabBg,
          color: '#fff',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
          padding: '3px 8px', borderRadius: 20,
        }}>
          {label}
        </span>
        {/* Item count — bottom left */}
        <span style={{
          position: 'absolute', bottom: 7, left: 8,
          fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}>
          {item.itemCount} items
        </span>
      </div>

      <div style={{ padding: '10px 10px 12px' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
          {item.title}
        </p>
      </div>
    </div>
  )
}

function SavedTab() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all',        label: 'All' },
    { id: 'single',     label: 'Individual' },
    { id: 'collection', label: 'Lists' },
  ]

  const visible = savedItems.filter(i => filter === 'all' || i.kind === filter)

  return (
    <div style={{ padding: '20px 20px 0' }}>
      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {filters.map(f => {
          const active = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '4px 12px', borderRadius: 100,
                background: active ? 'var(--surface-tertiary)' : 'transparent',
                border: `1px solid ${active ? 'var(--outline-secondary, var(--text-hint))' : 'var(--outline-tertiary)'}`,
                color: active ? 'var(--text-primary)' : 'var(--text-hint)',
                fontSize: 12, fontWeight: active ? 600 : 400,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background 150ms, color 150ms',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, rowGap: 20 }}>
        {visible.map(item =>
          item.kind === 'collection'
            ? <CollectionCard key={item.id} item={item} />
            : <SingleCard key={item.id} item={item} navigate={navigate} />
        )}
      </div>
    </div>
  )
}

const sectionLabel = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: 'var(--text-hint)',
  marginBottom: 12,
}

export default function ProfilePage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('profile')

  const role = user.role || 'ic'
  const title = `${roleLabels[role] || 'Learner'} at OpenSesame`
  const handle = `@${user.name?.split(' ')[0]?.toLowerCase() || 'user'}`

  const tabStyle = (tab) => ({
    background: 'none', border: 'none', padding: '10px 0', margin: 0,
    fontSize: 15, fontWeight: activeTab === tab ? 700 : 400,
    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-hint)',
    cursor: 'pointer', fontFamily: 'inherit', flex: 1,
  })

  return (
    <div style={{ flex: 1, paddingBottom: '80px' }}>

      {/* Hero */}
      <div style={{ padding: '32px 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%', overflow: 'hidden',
          border: '3px solid #8B6430',
          boxShadow: '0 0 0 1px rgba(139,100,48,0.3), 0 4px 20px rgba(0,0,0,0.4)',
          flexShrink: 0,
        }}>
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
            {user.name || 'Your Profile'}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '0 0 4px' }}>
            {title}
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-hint)', margin: 0 }}>
            {handle} · Joined March 2024
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--outline-tertiary)',
        padding: '0 20px',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--surface-secondary)',
      }}>
        {[['profile', 'Profile'], ['saved', 'Saved']].map(([id, label]) => (
          <button key={id} style={tabStyle(id)} onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' ? <ProfileTab user={user} /> : <SavedTab />}
    </div>
  )
}
