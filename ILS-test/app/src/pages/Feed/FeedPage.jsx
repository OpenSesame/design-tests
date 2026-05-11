import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useFeed } from '../../hooks/useFeed'
import HeroCard from '../../components/feed/HeroCard'
import FeedContainer from '../../components/feed/FeedContainer'

const greetingByHour = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff5252" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

function AISearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7"/>
      <path d="M16.5 16.5L21 21"/>
      <path d="M11 7.5L11.8 9.7L14 10.5L11.8 11.3L11 13.5L10.2 11.3L8 10.5L10.2 9.7L11 7.5Z" strokeWidth="1.2" fill="currentColor" stroke="none"/>
    </svg>
  )
}

const exploreCategories = [
  { id: 'finance', label: 'Finance', emoji: '📊', featured: true, thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80' },
  { id: 'leadership', label: 'Leadership', emoji: '😎' },
  { id: 'tech', label: 'Tech Skills', emoji: '🖥️' },
  { id: 'business', label: 'Business Skills', emoji: '📋' },
  { id: 'dei', label: 'DEI', emoji: '❤️' },
  { id: 'science', label: 'Science', emoji: '🔬' },
]

function AISearchBar() {
  return (
    <div style={{
      borderRadius: 100, position: 'relative',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1f3c 50%, #0a2a1a 100%)',
      border: '1px solid rgba(0, 125, 255, 0.3)',
      padding: '1px',
      cursor: 'text',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', height: '200%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,125,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', borderRadius: 100,
        background: 'linear-gradient(135deg, rgba(10,10,26,0.95) 0%, rgba(13,31,60,0.95) 50%, rgba(10,42,26,0.95) 100%)',
      }}>
        <div style={{ color: 'rgba(0,200,150,0.9)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <AISearchIcon />
        </div>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', flex: 1, letterSpacing: '-0.01em' }}>
          Ask your AI Coach anything…
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,200,150,0.7)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          AI
        </span>
      </div>
    </div>
  )
}

function ExploreTab() {
  const featured = exploreCategories[0]
  const grid = exploreCategories.slice(1, 3)
  const list = exploreCategories.slice(3)

  return (
    <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ marginBottom: 12 }}><AISearchBar /></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Top categories</span>
        <button style={{ background: 'none', border: 'none', padding: 0, fontSize: 13, color: 'var(--brand)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>View All</button>
      </div>

      {/* Featured category */}
      <div style={{
        borderRadius: 16, overflow: 'hidden', position: 'relative', height: 180, cursor: 'pointer',
        background: '#1a1a2e',
      }}>
        <img src={featured.thumbnail} alt={featured.label} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
        <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 22, fontWeight: 700, color: '#fff' }}>{featured.label}</span>
      </div>

      {/* 2-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {grid.map(cat => (
          <div key={cat.id} style={{
            background: 'var(--surface-primary)', borderRadius: 12,
            border: '1px solid var(--outline-tertiary)',
            padding: '16px 14px', display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 18 }}>{cat.emoji}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{cat.label}</span>
          </div>
        ))}
      </div>

      {/* List rows */}
      {list.map(cat => (
        <div key={cat.id} style={{
          background: 'var(--surface-primary)', borderRadius: 12,
          border: '1px solid var(--outline-tertiary)',
          padding: '16px 14px', display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 18 }}>{cat.emoji}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{cat.label}</span>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Top publishers</span>
        <button style={{ background: 'none', border: 'none', padding: 0, fontSize: 13, color: 'var(--brand)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>View All</button>
      </div>
    </div>
  )
}

export default function FeedPage() {
  const { user } = useUser()
  const items = useFeed(user)
  const [activeTab, setActiveTab] = useState('for-you')

  const greeting = `${greetingByHour()}, ${user.name?.split(' ')[0] || 'there'}`
  const industryLabel = user.industry
    ? user.industry.charAt(0).toUpperCase() + user.industry.slice(1)
    : null

  const heroes = items.slice(0, 2)
  const rest = items.slice(2)

  const tabStyle = (tab) => ({
    background: 'none', border: 'none', padding: '6px 0', margin: 0,
    fontSize: 20, fontWeight: activeTab === tab ? 700 : 400,
    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-hint)',
    cursor: 'pointer', fontFamily: 'inherit',
  })

  return (
    <div style={{ flex: 1, paddingBottom: '96px' }}>
      {/* Header */}
      <header style={{
        padding: '24px 20px 0',
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--surface-secondary)',
      }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, paddingBottom: 16 }}>
          {[['for-you', 'For You'], ['explore', 'Explore']].map(([id, label]) => (
            <button key={id} style={tabStyle(id)} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'for-you' && (
        <>
          {/* AI Search */}
          <div style={{ padding: '20px 20px 0' }}>
            <AISearchBar />
          </div>

          {/* Hero section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 20px 0' }}>
            {industryLabel && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 17, fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Popular insight among CHROs in {industryLabel}
                </span>
              </div>
            )}
            {heroes.map(item => item && <HeroCard key={item.id} item={item} />)}
          </div>

          {/* Section break */}
          <div style={{
            padding: '40px 20px 24px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-hint)', whiteSpace: 'nowrap',
            }}>
              More for you
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--outline-tertiary)' }} />
          </div>

          {/* Regular feed */}
          <div style={{ padding: '0 20px' }}>
            <FeedContainer items={rest} />
          </div>
        </>
      )}

      {activeTab === 'explore' && (
        <div style={{ paddingTop: 20 }}>
          <ExploreTab />
        </div>
      )}
    </div>
  )
}
