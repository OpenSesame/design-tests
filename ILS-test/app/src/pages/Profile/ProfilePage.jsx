import { useUser } from '../../context/UserContext'
import { identityStrings, skillAreasByRole, recentActivity } from '../../data/mockProfile'
import IdentityBanner from '../../components/profile/IdentityBanner'
import StatRow from '../../components/profile/StatRow'
import SkillChip from '../../components/profile/SkillChip'
import RecentActivityItem from '../../components/profile/RecentActivityItem'

export default function ProfilePage() {
  const { user } = useUser()

  const role = user.role || 'ic'
  const aspirationIndex = user.aspirationIndex ?? 0
  const identityKey = `${role}-${aspirationIndex}`
  const identity = identityStrings[identityKey] || identityStrings[`${role}-0`] || identityStrings['ic-0']
  const skills = skillAreasByRole[role] || skillAreasByRole['ic']

  return (
    <div style={{ flex: 1, paddingBottom: '80px' }}>
      <header style={{
        padding: '20px 20px 12px',
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--surface-secondary)',
        borderBottom: '1px solid var(--outline-tertiary)',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {user.name || 'Your Profile'}
        </h1>
      </header>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <IdentityBanner identityString={identity} />

        <StatRow
          hoursThisMonth={user.hoursThisMonth}
          completedCount={user.completedCourseIds?.length ?? 0}
          streak={user.streak}
        />

        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-hint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Skills You're Building
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map(s => <SkillChip key={s} label={s} />)}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-hint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
            Recently Completed
          </h2>
          <div style={{ background: 'var(--surface-primary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--outline-tertiary)', padding: '0 16px' }}>
            {recentActivity.map(item => (
              <RecentActivityItem key={item.id} title={item.title} completedAt={item.completedAt} />
            ))}
          </div>
        </div>

        {user.aspiration && (
          <div style={{
            background: 'var(--surface-tertiary)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
          }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-hint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Your Focus
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              "{user.aspiration}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
