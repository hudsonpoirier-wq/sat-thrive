import { Link } from 'react-router-dom'

export default function BrandLink({ to = '/dashboard', size = 'md' }) {
  const imageSize = size === 'sm' ? 28 : 34
  const fontSize = size === 'sm' ? 17 : 18

  return (
    <Link
      to={to}
      className="nav-brand"
      title="Go to dashboard"
      aria-label="The Agora Project home"
    >
      <img
        src="/logo.png"
        alt=""
        className="nav-brand-logo"
        width={imageSize}
        height={imageSize}
      />
      <span className="nav-brand-text" style={{ fontSize }}>
        The Agora <span>Project</span>
      </span>
    </Link>
  )
}
