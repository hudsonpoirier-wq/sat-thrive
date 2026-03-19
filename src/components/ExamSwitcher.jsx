import { Link } from 'react-router-dom'

export default function ExamSwitcher({ currentExam = 'sat', satHref = '/dashboard?exam=sat', actHref = '/dashboard?exam=act' }) {
  const tabs = [
    { id: 'sat', label: 'SAT', sub: 'Dashboard', href: satHref },
    { id: 'act', label: 'ACT', sub: 'Dashboard', href: actHref },
  ]
  return (
    <div className="exam-switcher" role="tablist" aria-label="Switch exam dashboard">
      {tabs.map((tab) => {
        const active = tab.id === currentExam
        return (
          <Link
            key={tab.id}
            to={tab.href}
            role="tab"
            aria-selected={active}
            aria-current={active ? 'page' : undefined}
            className={`exam-switcher-tab${active ? ' active' : ''}`}
          >
            <span className="exam-switcher-label">{tab.label}</span>
            <span className="exam-switcher-sub">{tab.sub}</span>
          </Link>
        )
      })}
    </div>
  )
}
