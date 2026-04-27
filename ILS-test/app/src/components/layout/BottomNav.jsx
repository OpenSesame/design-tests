import { NavLink } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const BUYER_ROLES = new Set(['c-suite', 'vp', 'director'])

const baseTabs = [
  {
    to: '/feed',
    label: 'Feed',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="8" height="8" rx="2" fill={active ? 'var(--brand)' : 'none'} stroke={active ? 'var(--brand)' : 'var(--text-hint)'} strokeWidth="1.8"/>
        <rect x="13" y="3" width="8" height="8" rx="2" fill={active ? 'var(--brand)' : 'none'} stroke={active ? 'var(--brand)' : 'var(--text-hint)'} strokeWidth="1.8"/>
        <rect x="3" y="13" width="8" height="8" rx="2" fill={active ? 'var(--brand)' : 'none'} stroke={active ? 'var(--brand)' : 'var(--text-hint)'} strokeWidth="1.8"/>
        <rect x="13" y="13" width="8" height="8" rx="2" fill="none" stroke={active ? 'var(--brand)' : 'var(--text-hint)'} strokeWidth="1.8" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" fill={active ? 'var(--brand)' : 'none'} stroke={active ? 'var(--brand)' : 'var(--text-hint)'} strokeWidth="1.8"/>
        <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke={active ? 'var(--brand)' : 'var(--text-hint)'} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const hcaTab = {
  to: '/hca',
  label: 'Analytics',
  icon: (active) => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <polyline
        points="3,17 8,11 12,14 17,7 21,10"
        stroke={active ? 'var(--brand)' : 'var(--text-hint)'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <line x1="3" y1="20" x2="21" y2="20" stroke={active ? 'var(--brand)' : 'var(--text-hint)'} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
}

export default function BottomNav() {
  const { user } = useUser()
  const tabs = BUYER_ROLES.has(user.role) ? [...baseTabs, hcaTab] : baseTabs

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--surface-primary)',
      borderTop: '1px solid var(--outline-tertiary)',
      display: 'flex',
      justifyContent: 'center',
      gap: '0',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {tabs.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '10px 28px',
            textDecoration: 'none',
            color: isActive ? 'var(--brand)' : 'var(--text-hint)',
            background: isActive ? 'var(--brand-light)' : 'transparent',
            transition: 'background 150ms ease, color 150ms ease',
          })}
        >
          {({ isActive }) => (
            <>
              {icon(isActive)}
              <span style={{ fontSize: '11px', fontWeight: isActive ? 600 : 400, letterSpacing: '0.02em' }}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
