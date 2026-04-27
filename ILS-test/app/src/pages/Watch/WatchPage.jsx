import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { feedItems } from '../../data/mockFeed'

const WATCH_ITEMS = feedItems.filter(i => ['micro-content', 'course'].includes(i.type))

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
)
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
)
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)
const DotsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
)
const CaptionsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M7 12h4M7 16h8M15 12h2"/>
  </svg>
)
const BookmarkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
)
const ThumbUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
)
const ThumbDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z"/>
    <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  </svg>
)

// ─── OpenSesame Logomark ──────────────────────────────────────────────────────

const OSLogo = () => (
  <svg width="30" height="30" viewBox="0 0 332 332" fill="#fff">
    <path d="M181.64,181.63c6.99-6.99,39.06-4.56,57.83,14.2c13.59,13.59,13.84,33.38,1.79,45.43s-31.84,11.79-45.43-1.79C177.07,220.7,174.64,188.63,181.64,181.63z M150.37,150.36c7-7,4.57-39.06-14.2-57.83c-13.59-13.59-33.38-13.84-45.43-1.79s-11.79,31.83,1.79,45.43C111.3,154.93,143.37,157.36,150.37,150.36z M161.62,161.6 M195.84,92.53c-8.01,8.01-13.04,18.43-15.63,28.3c-3.29,11.91-6.64,28.82-18.59,40.77c-11.95,11.95-28.86,15.3-40.77,18.59c-9.87,2.59-20.29,7.63-28.3,15.63c-13.59,13.59-13.84,33.38-1.79,45.43s31.83,11.79,45.43-1.79c7.97-7.97,13-18.35,15.6-28.18c3.29-11.92,6.63-28.9,18.62-40.89c11.99-11.99,28.97-15.32,40.89-18.62c9.83-2.6,20.21-7.63,28.18-15.6c13.59-13.59,13.84-33.38,1.79-45.43C229.22,78.68,209.43,78.93,195.84,92.53z"/>
  </svg>
)

// ─── Top Info Bar ─────────────────────────────────────────────────────────────

function TopInfoBar({ category, onExpand, onLogoClick }) {
  return (
    <div style={{
      position: 'absolute', top: 14, left: 16, right: 16, zIndex: 30,
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRadius: 'var(--radius-pill)',
      padding: '9px 14px',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <button onClick={onLogoClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', lineHeight: 0 }}>
        <OSLogo />
      </button>
      <span style={{
        flex: 1, fontSize: 15, fontWeight: 600, color: '#fff',
        textAlign: 'center', letterSpacing: '-0.01em',
      }}>
        {category || 'Learning'}
      </span>
      <button
        onClick={onExpand}
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: 2, display: 'flex' }}
      >
        <ChevronDown />
      </button>
    </div>
  )
}

// ─── Category Dropdown ────────────────────────────────────────────────────────

function CategoryDropdown({ item, onClose }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { requestAnimationFrame(() => setMounted(true)) }, [])

  const skill = item?.skillTags?.[0] || 'Learning'
  const courseCount = feedItems.filter(i => i.type === 'course' && i.skillTags?.includes(skill)).length || 3
  const descriptions = {
    Leadership: 'Build the skills to lead teams, navigate ambiguity, and develop people who grow.',
    Coaching: 'Master the conversations that unlock potential and build trust on your team.',
    Communication: 'Communicate with clarity, influence, and precision in any context.',
    'Decision-Making': 'Develop frameworks for high-quality decisions under pressure and uncertainty.',
    Influence: 'Earn buy-in and drive change without relying on positional authority.',
    Negotiation: 'Build leverage, manage concessions, and reach agreements that hold.',
    Strategy: 'Think longer, see further, and connect daily decisions to long-term outcomes.',
    Compliance: 'Understand your responsibilities and stay current with evolving regulations.',
    'Data Literacy': 'Read data confidently, ask sharper questions, and make evidence-backed calls.',
    Productivity: 'Structure your time and energy to protect the work that actually matters.',
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40 }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: 8, left: 12, right: 12,
          background: 'rgba(18,17,28,0.97)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '22px 20px 20px',
          transform: mounted ? 'translateY(0)' : 'translateY(-14px)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 300ms cubic-bezier(0.34, 1.2, 0.64, 1), opacity 220ms ease',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </button>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.01em' }}>
          {skill}
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 16 }}>
          {descriptions[skill] || 'Explore content curated for your goals and role.'}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{courseCount} courses</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>·</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{courseCount * 5 + 2}m total</span>
        </div>
        <button style={{
          width: '100%', padding: '11px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          More Categories
        </button>
      </div>
    </div>
  )
}

// ─── Utility Panel ────────────────────────────────────────────────────────────

function UtilityPanel({ item, layer, onBack, onTitleTap, onOverflowTap }) {
  const titleText = item?.title || ''
  const marqueeContent = `${titleText}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${titleText}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`

  return (
    <div style={{
      position: 'absolute', bottom: 20, left: 16, right: 16, zIndex: 30,
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRadius: 'var(--radius-pill)',
      padding: '13px 16px',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          color: layer === 'bottom' ? '#fff' : 'rgba(255,255,255,0.45)',
          display: 'flex', alignItems: 'center', flexShrink: 0,
          transition: 'color 200ms ease',
        }}
      >
        <ChevronLeft />
      </button>

      {/* Marquee title */}
      <div
        onClick={onTitleTap}
        style={{ flex: 1, overflow: 'hidden', cursor: 'pointer', minWidth: 0 }}
      >
        <span style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontSize: 14, fontWeight: 500, color: '#fff',
          animation: 'marquee 16s linear infinite',
        }}>
          {marqueeContent}
        </span>
      </div>

      <button
        onClick={onOverflowTap}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', flexShrink: 0,
        }}
      >
        <DotsIcon />
      </button>
    </div>
  )
}

// ─── Course Detail Sheet ──────────────────────────────────────────────────────

function CourseDetailSheet({ item, onClose }) {
  const [mounted, setMounted] = useState(false)
  const [closing, setClosing] = useState(false)
  useEffect(() => { requestAnimationFrame(() => setMounted(true)) }, [])
  const dragY = useRef(null)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 340)
  }, [onClose])

  const visible = mounted && !closing
  const skill = item?.skillTags?.[0]

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: visible ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
      transition: 'background 300ms ease',
    }} onClick={handleClose}>
      <div
        onClick={e => e.stopPropagation()}
        onPointerDown={e => { dragY.current = e.clientY }}
        onPointerUp={e => {
          if (dragY.current !== null && e.clientY - dragY.current > 60) handleClose()
          dragY.current = null
        }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--surface-primary)',
          borderRadius: '20px 20px 0 0',
          maxHeight: '88dvh', overflowY: 'auto',
          paddingBottom: 40,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 340ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
        </div>
        <button
          onClick={handleClose}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', padding: '16px 20px 8px',
            color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <ChevronLeft />
          Course Detail
        </button>
        <div style={{ padding: '4px 20px 0' }}>
          {skill && (
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--brand)',
              display: 'block', marginBottom: 8,
            }}>
              {skill}
            </span>
          )}
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>
            {item?.title}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
            {item?.description}
          </p>
          <div style={{ borderTop: '1px solid var(--outline-tertiary)', paddingTop: 20, marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>What you'll learn</p>
            {[
              'Practical frameworks you can apply immediately',
              'How to handle the most common challenges',
              'What high performers do differently in this area',
            ].map((point, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 2 }}>→</span>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderTop: '1px solid var(--outline-tertiary)', marginTop: 8,
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-hint)' }}>Rate this course</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}><ThumbUpIcon /></button>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}><ThumbDownIcon /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Overflow Menu Sheet ──────────────────────────────────────────────────────

function OverflowMenuSheet({ onClose, onOpenDetail }) {
  const [mounted, setMounted] = useState(false)
  const [closing, setClosing] = useState(false)
  useEffect(() => { requestAnimationFrame(() => setMounted(true)) }, [])
  const dragY = useRef(null)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 340)
  }, [onClose])

  const visible = mounted && !closing
  const menuItems = ['Course detail', 'Outline', 'Languages', 'Help']

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: visible ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
      transition: 'background 300ms ease',
    }} onClick={handleClose}>
      <div
        onClick={e => e.stopPropagation()}
        onPointerDown={e => { dragY.current = e.clientY }}
        onPointerUp={e => {
          if (dragY.current !== null && e.clientY - dragY.current > 60) handleClose()
          dragY.current = null
        }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--surface-primary)',
          borderRadius: '20px 20px 0 0',
          paddingBottom: 40,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 340ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 20px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 24px 28px', borderBottom: '1px solid var(--outline-tertiary)' }}>
          {[
            { icon: <CaptionsIcon />, label: 'Captions' },
            { icon: <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>1.5x</span>, label: 'Play Speed' },
            { icon: <BookmarkIcon />, label: 'Save' },
          ].map(({ icon, label }) => (
            <button key={label} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              color: 'var(--text-primary)',
            }}>
              {icon}
              <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-hint)' }}>{label}</span>
            </button>
          ))}
        </div>
        {menuItems.map((label, i) => (
          <button
            key={label}
            onClick={() => { if (label === 'Course detail') { handleClose(); setTimeout(onOpenDetail, 340) } else handleClose() }}
            style={{
              width: '100%', padding: '17px 24px',
              background: 'none', border: 'none',
              borderBottom: i < menuItems.length - 1 ? '1px solid var(--outline-tertiary)' : 'none',
              textAlign: 'left', fontSize: 16, fontWeight: 400,
              color: 'var(--text-primary)', cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main WatchPage ───────────────────────────────────────────────────────────

export default function WatchPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const startIndex = Math.max(0, WATCH_ITEMS.findIndex(i => i.id === id))
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [layer, setLayer] = useState('top')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [panelState, setPanelState] = useState(null)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const pointerStartX = useRef(null)
  const pointerStartY = useRef(null)
  const swipeDirRef = useRef('up')

  const currentItem = WATCH_ITEMS[currentIndex]
  const hasSeries = (currentItem?.series?.length || 0) > 0
  const slides = currentItem?.series || []

  const handleBack = useCallback(() => {
    if (layer === 'bottom') { setLayer('top'); setCurrentSlide(0) }
    else navigate(-1)
  }, [layer, navigate])

  // Pointer events work on both touch devices and mouse (desktop preview)
  const handlePointerDown = (e) => {
    pointerStartX.current = e.clientX
    pointerStartY.current = e.clientY
  }
  const handlePointerUp = (e) => {
    if (pointerStartX.current === null) return
    const dx = pointerStartX.current - e.clientX
    const dy = pointerStartY.current - e.clientY
    pointerStartX.current = null
    pointerStartY.current = null

    if (layer === 'top') {
      if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx)) {
        if (dy > 0 && currentIndex < WATCH_ITEMS.length - 1) {
          swipeDirRef.current = 'up'
          setCurrentIndex(i => i + 1)
          setPanelState(null)
          setCategoryOpen(false)
        } else if (dy < 0 && currentIndex > 0) {
          swipeDirRef.current = 'down'
          setCurrentIndex(i => i - 1)
          setPanelState(null)
          setCategoryOpen(false)
        }
      }
    } else {
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && currentSlide < slides.length - 1) {
          swipeDirRef.current = 'right'
          setCurrentSlide(s => s + 1)
        } else if (dx < 0 && currentSlide > 0) {
          swipeDirRef.current = 'left'
          setCurrentSlide(s => s - 1)
        }
      }
    }
  }

  const caption = layer === 'bottom'
    ? slides[currentSlide]?.caption
    : currentItem?.description?.split('.')[0]

  const bgImage = layer === 'bottom'
    ? (slides[currentSlide]?.thumbnailUrl || currentItem?.thumbnailUrl)
    : null

  const overlay = 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 35%, transparent 45%, rgba(0,0,0,0.78) 100%)'

  // Progress: slide progress for bottom, 30% static for top
  const progress = layer === 'bottom' && slides.length > 1
    ? (currentSlide / (slides.length - 1)) * 100
    : 30

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 100, overflow: 'hidden' }}>

      {/* ── Top layer: swipe-navigated single item ── */}
      {layer === 'top' && (
        <div
          style={{ position: 'absolute', inset: 0 }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div
            key={currentIndex}
            style={{
              position: 'absolute', inset: 0, overflow: 'hidden',
              animation: `${swipeDirRef.current === 'up' ? 'slideInFromBottom' : 'slideInFromTop'} 320ms cubic-bezier(0.32, 0.72, 0, 1)`,
            }}
          >
            <img src={currentItem?.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: overlay }} />
          </div>
        </div>
      )}

      {/* ── Bottom layer: horizontal slides ── */}
      {layer === 'bottom' && (
        <div
          style={{ position: 'absolute', inset: 0 }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div
            key={currentSlide}
            style={{
              position: 'absolute', inset: 0, overflow: 'hidden',
              animation: `${swipeDirRef.current === 'right' ? 'slideInFromRight' : 'slideInFromLeft'} 320ms cubic-bezier(0.32, 0.72, 0, 1)`,
            }}
          >
            <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: overlay }} />
          </div>

          {currentSlide > 0 && (
            <button
              onClick={() => setCurrentSlide(s => s - 1)}
              style={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.9)', cursor: 'pointer',
              }}
            >
              <ChevronLeft />
            </button>
          )}
          {currentSlide < slides.length - 1 && (
            <button
              onClick={() => setCurrentSlide(s => s + 1)}
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.9)', cursor: 'pointer',
              }}
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}

      {/* ── Floating UI ── */}

      <TopInfoBar category={currentItem?.skillTags?.[0]} onExpand={() => setCategoryOpen(true)} onLogoClick={() => navigate('/feed')} />

      {/* Slide indicator */}
      {layer === 'bottom' && (
        <div style={{
          position: 'absolute', bottom: 90, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 20,
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>
            {currentSlide + 1}/{slides.length}
          </span>
          <div style={{ display: 'flex', gap: 5 }}>
            {slides.map((_, i) => (
              <div key={i} style={{
                width: i === currentSlide ? 20 : 6, height: 4, borderRadius: 2,
                background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.35)',
                transition: 'width 200ms ease',
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      {caption && (
        <div style={{
          position: 'absolute',
          bottom: layer === 'bottom' ? 210 : (hasSeries ? 148 : 104),
          left: 20, right: 20, zIndex: 20,
        }}>
          <p style={{
            fontSize: 26, fontWeight: 700, color: '#fff',
            lineHeight: 1.25, letterSpacing: '-0.01em',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}>
            {caption}
          </p>
        </div>
      )}

      {/* "More from this Course/Video" */}
      {hasSeries && layer === 'top' && (
        <button
          onClick={() => { setLayer('bottom'); setCurrentSlide(0); setPanelState(null) }}
          style={{
            position: 'absolute', bottom: 76, left: '50%', transform: 'translateX(-50%)',
            zIndex: 20, whiteSpace: 'nowrap',
            padding: '11px 22px', borderRadius: 'var(--radius-pill)',
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          More from this {currentItem?.type === 'micro-content' ? 'Video' : 'Course'}
          <ChevronRight />
        </button>
      )}

      {/* Utility panel */}
      <UtilityPanel
        item={currentItem}
        layer={layer}
        onBack={handleBack}
        onTitleTap={() => setPanelState('detail')}
        onOverflowTap={() => setPanelState('overflow')}
      />

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.12)', zIndex: 35 }}>
        <div style={{
          height: '100%', background: 'var(--brand)',
          width: `${progress}%`,
          transition: 'width 300ms ease',
        }} />
      </div>

      {/* ── Overlays ── */}
      {categoryOpen && <CategoryDropdown item={currentItem} onClose={() => setCategoryOpen(false)} />}
      {panelState === 'detail' && <CourseDetailSheet item={currentItem} onClose={() => setPanelState(null)} />}
      {panelState === 'overflow' && (
        <OverflowMenuSheet
          onClose={() => setPanelState(null)}
          onOpenDetail={() => setPanelState('detail')}
        />
      )}
    </div>
  )
}
