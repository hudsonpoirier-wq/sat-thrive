import { Link } from 'react-router-dom'

export default function ExamSwitcher({ currentExam = 'sat', satHref = '/dashboard?exam=sat', actHref = '/dashboard?exam=act' }) {
  const tabs = [
    { id: 'sat', label: 'SAT', href: satHref },
    { id: 'act', label: 'ACT', href: actHref },
  ]
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: 4,
        borderRadius: 999,
        background: 'rgba(255,255,255,.10)',
        border: '1px solid rgba(255,255,255,.16)',
      }}
    >
      {tabs.map((tab) => {
        const active = tab.id === currentExam
        return (
          <Link
            key={tab.id}
            to={tab.href}
            style={{
              textDecoration: 'none',
              padding: '7px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: '.2px',
              color: active ? '#1a2744' : 'rgba(255,255,255,.88)',
              background: active ? 'white' : 'transparent',
              boxShadow: active ? '0 10px 24px rgba(15,23,42,.18)' : 'none',
            }}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
