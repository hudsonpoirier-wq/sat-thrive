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
          // Focus the real input; avoid selecting overlay text.
          e.preventDefault()
          inputRef.current?.focus()
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
        }}
        title={reveal && !isEmpty ? 'Password (revealed while hovering dots)' : undefined}
      >
        {display}
      </span>
    </div>
  )
}

