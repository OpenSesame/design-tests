import { useUser } from '../../context/UserContext'
import { useFeed } from '../../hooks/useFeed'
import HeroCard from '../../components/feed/HeroCard'
import FeedContainer from '../../components/feed/FeedContainer'
import FeedStatGrid from '../../components/feed/FeedStatGrid'
import { identityStrings } from '../../data/mockProfile'

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

export default function FeedPage() {
  const { user } = useUser()
  const items = useFeed(user)

  const greeting = `${greetingByHour()}, ${user.name?.split(' ')[0] || 'there'}`
  const identity = (user.role && user.aspirationIndex !== null)
    ? identityStrings[`${user.role}-${user.aspirationIndex}`]
    : null
  const industryLabel = user.industry
    ? user.industry.charAt(0).toUpperCase() + user.industry.slice(1)
    : null

  const heroes = items.slice(0, 2)
  const rest = items.slice(2)

  return (
    <div style={{ flex: 1, paddingBottom: '96px' }}>
      {/* Header */}
      <header style={{
        padding: '24px 20px 24px',
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--surface-secondary)',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {greeting}
        </h1>
      </header>

      {/* YOUR GOAL */}
      {identity && (
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--text-hint)',
            }}>
              Your Goal
            </span>
            <button style={{
              background: 'none', border: 'none', padding: 0,
              fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--brand)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Edit
            </button>
          </div>
          <p style={{
            fontSize: 22, fontWeight: 400, lineHeight: 1.35,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
          }}>
            {identity}
          </p>
        </div>
      )}

      {/* Stats grid */}
      <div style={{ padding: '0 20px 32px' }}>
        <FeedStatGrid user={user} />
      </div>

      {/* Social proof banner */}
      {industryLabel && (
        <div style={{
          padding: '0 20px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <HeartIcon />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
            Popular insight among CHROs in {industryLabel}
          </span>
        </div>
      )}

      {/* Hero section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 20px' }}>
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
    </div>
  )
}
