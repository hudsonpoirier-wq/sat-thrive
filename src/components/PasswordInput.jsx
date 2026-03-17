import { useMemo, useRef, useState } from 'react'

export default function PasswordInput({
  value,
  onChange,
  placeholder = '••••••••',
  minLength,
  required,
  autoComplete,
}) {
  const [reveal, setReveal] = useState(false)
  const inputRef = useRef(null)

  const display = useMemo(() => {
    const v = String(value || '')
    if (!v) return placeholder
    return reveal ? v : '•'.repeat(v.length)
  }, [value, reveal, placeholder])

  const isEmpty = !String(value || '').length
  const length = String(value || '').length

  function setCaretFromClientX(clientX, targetEl) {
    const input = inputRef.current
    if (!input) return
    const rect = (targetEl || input).getBoundingClientRect()
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width)
    const ratio = rect.width ? (x / rect.width) : 1
    const idx = Math.min(length, Math.max(0, Math.round(ratio * length)))
    input.focus()
    // Defer until after focus so selection applies reliably.
    requestAnimationFrame(() => {
      try { input.setSelectionRange(idx, idx) } catch {}
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        className="input-field"
        type="password"
        value={value}
        onChange={onChange}
        minLength={minLength}
        required={required}
        autoComplete={autoComplete}
        spellCheck={false}
        // Hide the native dots so our overlay can control the reveal area precisely.
        style={{ color: 'transparent', caretColor: '#0f172a' }}
      />

      <span
        onMouseEnter={() => setReveal(true)}
        onMouseLeave={() => setReveal(false)}
        onMouseDown={(e) => {
          // Allow precise click-to-place-caret while keeping hover-to-reveal on the dots only.
          e.preventDefault()
          setCaretFromClientX(e.clientX, e.currentTarget)
        }}
        style={{
          position: 'absolute',
          left: 14,
          right: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'block',
          pointerEvents: 'auto',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: isEmpty ? '#94a3b8' : '#1a2744',
          cursor: 'text',
        }}
        title={reveal && !isEmpty ? 'Password (revealed while hovering dots)' : undefined}
      >
        {display}
      </span>
    </div>
  )
}
