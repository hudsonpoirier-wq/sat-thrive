import { useRef, useEffect, useState, Children, cloneElement } from 'react'

/**
 * Wrap any element to animate it when it scrolls into view.
 *
 * Props:
 *   animation - CSS class: 'anim-fade-up' | 'anim-fade-left' | 'anim-fade-right' | 'anim-scale-up'
 *               | 'anim-blur-in' | 'anim-slide-up' | 'anim-bounce-in' | 'anim-flip-in'
 *   delay     - delay in ms (default 0)
 *   duration  - duration in ms (default 600)
 *   threshold - 0-1 how much visible before triggering (default 0.15)
 *   stagger   - if wrapping multiple children, stagger each by this many ms (default 0)
 *   once      - only animate once (default true)
 */
export default function AnimateOnScroll({
  children,
  animation = 'anim-fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  stagger = 0,
  once = true,
  className = '',
  style = {},
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  // If stagger > 0 and there are multiple children, wrap each with its own delay
  if (stagger > 0 && Children.count(children) > 1) {
    return (
      <Tag ref={ref} className={className} style={style}>
        {Children.map(children, (child, i) => (
          <div
            className={`anim-target ${animation} ${visible ? 'anim-visible' : ''}`}
            style={{
              '--anim-delay': `${delay + i * stagger}ms`,
              '--anim-duration': `${duration}ms`,
            }}
          >
            {child}
          </div>
        ))}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={`anim-target ${animation} ${visible ? 'anim-visible' : ''} ${className}`}
      style={{
        '--anim-delay': `${delay}ms`,
        '--anim-duration': `${duration}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

/**
 * Lightweight hook version for custom usage.
 */
export function useScrollVisible(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}
