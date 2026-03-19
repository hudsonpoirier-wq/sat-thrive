import { Link } from 'react-router-dom'
import Icon from './AppIcons.jsx'

const items = [
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'guide', label: 'Study Guide', icon: 'guide' },
  { id: 'mistakes', label: 'Missed Questions', icon: 'mistakes' },
]

export default function TopResourceNav({
  calendarHref = '/calendar',
  guideHref = '/guide',
  mistakesHref = '/mistakes',
  current = '',
  hidden = false,
}) {
  if (hidden) return null

  const hrefById = {
    calendar: calendarHref,
    guide: guideHref,
    mistakes: mistakesHref,
  }

  return (
    <div className="top-resource-nav" aria-label="Study navigation shortcuts">
      {items.map((item) => {
        const active = item.id === current
        return (
          <Link
            key={item.id}
            to={hrefById[item.id]}
            className={`top-resource-link${active ? ' active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon name={item.icon} size={14} />
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
