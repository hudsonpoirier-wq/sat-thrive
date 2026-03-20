import { useEffect, useMemo, useState } from 'react'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(Boolean(query.matches))
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return reduced
}

function parseMetric(value) {
  const raw = String(value ?? '').trim()
  if (!raw || raw === '—') return null
  const match = raw.match(/^([^\d-+]*)([+-]?\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  return {
    prefix: match[1] || '',
    number: Number(match[2]),
    suffix: match[3] || '',
    decimals: String(match[2]).includes('.') ? String(match[2]).split('.')[1].length : 0,
  }
}

export default function AnimatedNumber({ value, duration = 800, className = '', style = {} }) {
  const reducedMotion = useReducedMotion()
  const parsed = useMemo(() => parseMetric(value), [value])
  const [display, setDisplay] = useState(() => parsed ? parsed.number : value)

  useEffect(() => {
    if (!parsed || reducedMotion) {
      setDisplay(parsed ? parsed.number : value)
      return
    }

    let frame = 0
    let start = 0
    const from = 0
    const to = parsed.number
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min(1, (timestamp - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + ((to - from) * eased))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    setDisplay(from)
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [parsed, value, duration, reducedMotion])

  if (!parsed) {
    return <span className={className} style={style}>{value}</span>
  }

  const numeric = Number(display || 0)
  const rendered = `${parsed.prefix}${numeric.toFixed(parsed.decimals)}${parsed.suffix}`
  return <span className={className} style={style}>{rendered}</span>
}
