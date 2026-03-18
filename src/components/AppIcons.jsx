const iconProps = {
  fill: 'none',
  viewBox: '0 0 24 24',
  strokeWidth: 1.9,
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const ICONS = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  guide: (
    <>
      <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12v16.5A1.5 1.5 0 0 0 17.5 18H7a2.5 2.5 0 0 0-2.5 2.5z" />
      <path d="M7 3v17.5A2.5 2.5 0 0 1 9.5 18H20" />
      <path d="M10 7h6" />
      <path d="M10 11h6" />
    </>
  ),
  admin: (
    <>
      <path d="M12 3.5 4.5 7v5c0 4.8 3.2 7.9 7.5 9 4.3-1.1 7.5-4.2 7.5-9V7z" />
      <path d="M9.5 12 11 13.5 14.5 10" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M7.5 15.5 11 11l3 2 4.5-6" />
    </>
  ),
  results: (
    <>
      <path d="M6 4.5h9l3 3V19.5A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5z" />
      <path d="M15 4.5V8h3" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </>
  ),
  mistakes: (
    <>
      <path d="M12 3 2.8 19h18.4z" />
      <path d="M12 9v4.5" />
      <path d="M12 17h.01" />
    </>
  ),
  final: (
    <>
      <path d="M5 18V6" />
      <path d="M5 7h10l-2 3 2 3H5" />
      <path d="m16 16 1.6 3.2L21 20l-2.4 2.3.6 3.2-2.8-1.5-2.8 1.5.6-3.2L12 20l3.4-.8z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
      <path d="M8 14h3M13 14h3M8 18h3" />
    </>
  ),
  task: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8.5 12 2.2 2.2 4.8-4.8" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4L19 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </>
  ),
  report: (
    <>
      <path d="M6 19.5h12" />
      <path d="M8 16V9" />
      <path d="M12 16V5.5" />
      <path d="M16 16v-3.5" />
    </>
  ),
  students: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M4.5 18a4.5 4.5 0 0 1 9 0" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M14.5 18a3.5 3.5 0 0 1 6 0" />
    </>
  ),
  test: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z" />
      <path d="m19 15 .8 2 .2.2-2 .8-.2.2-.8-2-.2-.2 2-.8zM5 14l.7 1.7L7.5 16l-1.8.7L5 18.5l-.7-1.8L2.5 16l1.8-.3z" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V8a4 4 0 1 1 8 0v2" />
    </>
  ),
}

export function Icon({ name, size = 18, style, className }) {
  const glyph = ICONS[name] || ICONS.chart
  return (
    <svg
      {...iconProps}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0, ...style }}
      className={className}
    >
      {glyph}
    </svg>
  )
}

export default Icon
