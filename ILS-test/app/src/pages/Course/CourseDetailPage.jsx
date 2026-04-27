import { useParams, useNavigate } from 'react-router-dom'
import { feedItems } from '../../data/mockFeed'

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-hint)" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

const LESSONS = {
  'Leadership': [
    'Why most leadership models miss the point',
    'The mindset shift that changes how you show up',
    'Practical tools for this week',
    'Navigating the hardest moments',
    'Building the long-term habit',
  ],
  'Compliance': [
    'What the updated regulations require',
    'Recognizing situations in the workplace',
    'Your responsibilities and boundaries',
    'Reporting procedures and protections',
    'Assessment and certification',
  ],
  'Decision-Making': [
    'Why pressure distorts decision quality',
    'The pre-mortem: deciding in reverse',
    'Frameworks for time-constrained choices',
    'Reading incomplete data confidently',
    'After the decision: learning fast',
  ],
  'Influence': [
    'The difference between persuasion and manipulation',
    'Mapping stakeholder motivations',
    'Building the case they actually care about',
    'Handling resistance without losing ground',
    'Making the ask at the right moment',
  ],
  'Negotiation': [
    'Reframing negotiation as problem-solving',
    'Establishing your BATNA',
    'Anchoring and making the first move',
    'Managing concessions strategically',
    'Reaching agreements that hold',
  ],
  'Data Literacy': [
    'What most dashboards are actually telling you',
    'The questions that reveal hidden assumptions',
    'Reading variance and outliers correctly',
    'Building a data-informed habit',
    'When to trust the numbers — and when to push back',
  ],
  default: [
    'Setting the foundation',
    'Core frameworks in practice',
    'Applying the concepts to your context',
    'Common pitfalls and how to avoid them',
    'Summary and next steps',
  ],
}

function getLessons(item) {
  const skill = item.skillTags?.[0]
  const titles = LESSONS[skill] || LESSONS.default
  const total = parseInt(item.duration) || 30
  const n = titles.length
  const intro = Math.max(3, Math.round(total * 0.12))
  const outro = Math.max(3, Math.round(total * 0.12))
  const mid = Math.round((total - intro - outro) / (n - 2))
  return titles.map((title, i) => ({
    id: i + 1,
    title,
    duration: `${i === 0 ? intro : i === n - 1 ? outro : mid} min`,
  }))
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const item = feedItems.find(i => i.id === id)
  if (!item) return null

  const lessons = getLessons(item)
  const dueDate = item.isRequired && item.dueDate
    ? new Date(item.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    : null

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--surface-secondary)', paddingBottom: 100 }}>

      {/* Hero image */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        <img src={item.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(13,13,20,0.85) 100%)',
        }} />
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: 52, left: 20,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', cursor: 'pointer',
          }}
        >
          <BackIcon />
        </button>
        {item.isRequired && (
          <div style={{
            position: 'absolute', bottom: 20, left: 20,
            padding: '4px 10px', borderRadius: 'var(--radius-pill)',
            background: 'rgba(255,82,82,0.2)', border: '1px solid rgba(255,82,82,0.4)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--error)',
          }}>
            Required · Due {dueDate}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '28px 20px 0' }}>
        {item.skillTags?.[0] && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--brand)',
            display: 'block', marginBottom: 10,
          }}>
            {item.skillTags[0]}
          </span>
        )}

        <h1 style={{
          fontSize: 24, fontWeight: 600, lineHeight: 1.3,
          color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 14,
        }}>
          {item.title}
        </h1>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 28 }}>
          {item.description}
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 20,
          padding: '18px 0',
          borderTop: '1px solid var(--outline-tertiary)',
          borderBottom: '1px solid var(--outline-tertiary)',
          marginBottom: 36,
        }}>
          {[
            { value: item.duration, label: 'Total length' },
            { value: lessons.length, label: 'Lessons' },
            { value: '0%', label: 'Complete' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: 'flex', flex: 1 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{s.value}</span>
                <span style={{ fontSize: 11, color: 'var(--text-hint)', fontWeight: 500 }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, background: 'var(--outline-tertiary)', marginRight: 20 }} />}
            </div>
          ))}
        </div>

        {/* Lessons */}
        <h2 style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--text-hint)', marginBottom: 4,
        }}>
          Lessons
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lessons.map((lesson, i) => (
            <div
              key={lesson.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '18px 0',
                borderBottom: i < lessons.length - 1 ? '1px solid var(--outline-tertiary)' : 'none',
                opacity: i === 0 ? 1 : 0.45,
                cursor: i === 0 ? 'pointer' : 'default',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: i === 0 ? 'var(--brand-light)' : 'var(--surface-primary)',
                border: `1px solid ${i === 0 ? 'var(--outline-spotlight)' : 'var(--outline-tertiary)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {i === 0
                  ? <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand)' }}>{lesson.id}</span>
                  : <LockIcon />
                }
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  {lesson.title}
                </p>
                <span style={{ fontSize: 11, color: 'var(--text-hint)', marginTop: 3, display: 'block' }}>
                  {lesson.duration}
                </span>
              </div>
              {i === 0 && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '16px 20px 40px',
        background: 'linear-gradient(to top, var(--surface-secondary) 75%, transparent)',
      }}>
        <button style={{
          width: '100%', padding: '15px 24px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--brand)', border: 'none',
          fontSize: 15, fontWeight: 600, color: 'white',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Start course
        </button>
      </div>
    </div>
  )
}
