import { Link, useLocation } from 'react-router-dom'

export default function ExamSwitcher({ currentExam = 'sat', satHref = '/dashboard?exam=sat', actHref = '/dashboard?exam=act' }) {
  const location = useLocation()
  const searchExam = String(new URLSearchParams(location.search || '').get('exam') || '').toLowerCase()
  const normalizedExam = searchExam === 'act' || searchExam === 'sat'
    ? searchExam
    : (currentExam === 'act' || currentExam === 'sat' ? currentExam : 'sat')
  const tabs = [
    { id: 'sat', label: 'SAT', sub: 'Dashboard', href: satHref },
    { id: 'act', label: 'ACT', sub: 'Dashboard', href: actHref },
  ]
  return (
    <div className={`exam-switcher exam-switcher-${normalizedExam}`} role="tablist" aria-label="Switch exam dashboard">
      <span className="exam-switcher-indicator" aria-hidden="true" />
      {tabs.map((tab) => {
        const active = tab.id === normalizedExam
        return (
          <Link
            key={tab.id}
            to={tab.href}
            role="tab"
            aria-selected={active}
            aria-current={active ? 'page' : undefined}
            className={`exam-switcher-tab${active ? ' active' : ''}`}
            data-exam={tab.id}
          >
            <span className="exam-switcher-label">{tab.label}</span>
            <span className="exam-switcher-sub">{tab.sub}</span>
          </Link>
        )
      })}
    </div>
  )
}
