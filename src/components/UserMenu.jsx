import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function UserMenu({ profile }) {
  const [open, setOpen] = useState(false)
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')
  const [pw1Visible, setPw1Visible] = useState(false)
  const [pw2Visible, setPw2Visible] = useState(false)
  const [pw1Peek, setPw1Peek] = useState('')
  const [pw2Peek, setPw2Peek] = useState('')
  const peek1Timer = useRef(null)
  const peek2Timer = useRef(null)
  const [status, setStatus] = useState({ kind: '', msg: '' }) // '' | 'ok' | 'err'
  const wrapRef = useRef(null)

  useEffect(() => {
    function onDoc(e) {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  async function updatePassword() {
    setStatus({ kind: '', msg: '' })
    const next = String(pw1 || '')
    if (next.length < 8) return setStatus({ kind: 'err', msg: 'Password must be at least 8 characters.' })
    if (next !== pw2) return setStatus({ kind: 'err', msg: 'Passwords do not match.' })
    if (!supabase) return setStatus({ kind: 'err', msg: 'Supabase is not configured.' })
    const { error } = await supabase.auth.updateUser({ password: next })
    if (error) return setStatus({ kind: 'err', msg: error.message })
    setPw1(''); setPw2('')
    setStatus({ kind: 'ok', msg: 'Password updated.' })
  }

  const label = profile?.email || 'Account'

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="btn btn-outline"
        style={{
          padding: '6px 12px',
          fontSize: 12,
          color: 'rgba(255,255,255,.85)',
          borderColor: 'rgba(255,255,255,.2)',
          background: 'rgba(255,255,255,.08)',
          maxWidth: 240,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        title="Account settings"
      >
        {label} ▾
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 10px)',
          width: 320,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          boxShadow: '0 12px 40px rgba(15,31,61,.18)',
          padding: 14,
          zIndex: 50
        }}>
          <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Account</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Signed in as <span style={{ fontWeight: 800, color: '#1a2744' }}>{profile?.email || '—'}</span>
          </div>

          <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Change password</div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="pw-wrap">
              <input
                className="input-field"
                type={pw1Visible ? 'text' : 'password'}
                placeholder="New password (min 8)"
                value={pw1}
                onChange={(e) => {
                  const next = e.target.value
                  if (!pw1Visible && next.length > pw1.length) {
                    setPw1Peek(next.slice(-1))
                    clearTimeout(peek1Timer.current)
                    peek1Timer.current = setTimeout(() => setPw1Peek(''), 700)
                  }
                  setPw1(next)
                }}
                minLength={8}
              />
              {!!pw1Peek && !pw1Visible && <span className="pw-peek">{pw1Peek}</span>}
              <button type="button" className="pw-eye" aria-label={pw1Visible ? 'Hide password' : 'Show password'} onClick={() => setPw1Visible(v => !v)}>
                {pw1Visible ? '🙈' : '👁'}
              </button>
            </div>
            <div className="pw-wrap">
              <input
                className="input-field"
                type={pw2Visible ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={pw2}
                onChange={(e) => {
                  const next = e.target.value
                  if (!pw2Visible && next.length > pw2.length) {
                    setPw2Peek(next.slice(-1))
                    clearTimeout(peek2Timer.current)
                    peek2Timer.current = setTimeout(() => setPw2Peek(''), 700)
                  }
                  setPw2(next)
                }}
                minLength={8}
              />
              {!!pw2Peek && !pw2Visible && <span className="pw-peek">{pw2Peek}</span>}
              <button type="button" className="pw-eye" aria-label={pw2Visible ? 'Hide password' : 'Show password'} onClick={() => setPw2Visible(v => !v)}>
                {pw2Visible ? '🙈' : '👁'}
              </button>
            </div>
            <button className="btn btn-primary" type="button" onClick={updatePassword} style={{ width: '100%' }}>
              Update password
            </button>
            {status.msg && (
              <div style={{ fontSize: 12, fontWeight: 800, color: status.kind === 'ok' ? '#10b981' : '#ef4444' }}>
                {status.kind === 'ok' ? '✅ ' : '⚠️ '}{status.msg}
              </div>
            )}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10, lineHeight: 1.5 }}>
            If you see a “reauthenticate” error, sign out and sign back in, then try again.
          </div>
        </div>
      )}
    </div>
  )
}
