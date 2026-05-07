import { NavLink } from 'react-router-dom'

function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1V10.5z"
        fill={active ? 'var(--brand)' : 'none'}
        stroke={active ? 'var(--brand)' : 'var(--text-hint)'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlayIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9"
        fill={active ? 'var(--brand)' : 'none'}
        stroke={active ? 'var(--brand)' : 'var(--text-hint)'}
        strokeWidth="1.8"/>
      <path d="M10 8.5l5 3.5-5 3.5V8.5z"
        fill={active ? '#fff' : 'var(--text-hint)'}
        stroke="none"/>
    </svg>
  )
}

function TeamIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="9" cy="7" r="3"
        fill={active ? 'var(--brand)' : 'none'}
        stroke={active ? 'var(--brand)' : 'var(--text-hint)'}
        strokeWidth="1.8"/>
      <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
        stroke={active ? 'var(--brand)' : 'var(--text-hint)'}
        strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="17" cy="8" r="2.5"
        fill={active ? 'var(--brand)' : 'none'}
        stroke={active ? 'var(--brand)' : 'var(--text-hint)'}
        strokeWidth="1.6"/>
      <path d="M20.5 20c0-2.485-1.567-4.5-3.5-4.5"
        stroke={active ? 'var(--brand)' : 'var(--text-hint)'}
        strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function Avatar({ active }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
      border: `2px solid ${active ? 'var(--brand)' : 'transparent'}`,
      boxSizing: 'border-box',
    }}>
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}

export default function BottomNav() {
  const tabs = [
    { to: '/feed',        icon: (active) => <HomeIcon active={active} /> },
    { to: '/watch/f-001', icon: (active) => <PlayIcon active={active} /> },
    { to: '/manager',     icon: (active) => <TeamIcon active={active} /> },
    { to: '/profile',     icon: (active) => <Avatar active={active} /> },
  ]

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--surface-primary)',
      borderTop: '1px solid var(--outline-tertiary)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
      height: 60,
    }}>
      {tabs.map(({ to, icon }) => (
        <NavLink
          key={to}
          to={to}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 14px', textDecoration: 'none' }}
        >
          {({ isActive }) => icon(isActive)}
        </NavLink>
      ))}
    </nav>
  )
}
