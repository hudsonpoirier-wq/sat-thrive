import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [status, setStatus] = useState({ loading: true, msg: 'Opening reset link…' })
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [pwVisible, setPwVisible] = useState(false)
  const [pw2Visible, setPw2Visible] = useState(false)
  const [pwPeek, setPwPeek] = useState('')
  const [pw2Peek, setPw2Peek] = useState('')
  const peek1Timer = useRef(null)
  const peek2Timer = useRef(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setStatus({ loading: false, msg: 'Supabase is not configured.' })
      return
    }
    ;(async () => {
      try {
        const url = window.location.href
        const hasCode = new URL(url).searchParams.get('code')
        const hash = window.location.hash || ''
        const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash)
        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (hasCode) {
          const { error } = await supabase.auth.exchangeCodeForSession(url)
          if (error) throw error
        } else if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token })
          if (error) throw error
        }

        const { data } = await supabase.auth.getSession()
        if (!data?.session) {
          setStatus({ loading: false, msg: 'This reset link is invalid or expired. Please request a new one.' })
          return
        }
        setStatus({ loading: false, msg: '' })
      } catch (e) {
        setStatus({ loading: false, msg: e?.message || 'Could not open reset link.' })
      }
    })()
  }, [])

  async function updatePassword() {
    if (password.length < 8) return alert('Password must be at least 8 characters.')
    if (password !== confirm) return alert('Passwords do not match.')
    if (!supabase) return
    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      alert(error.message)
      setSaving(false)
      return
    }
    await supabase.auth.signOut()
    alert('Password updated. Please sign in with your new password.')
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'transparent' }}>
      <div className="card" style={{ maxWidth: 520, width: '100%' }}>
        <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 18, fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>
          Reset password
        </div>
        {status.loading ? (
          <div style={{ color: '#64748b' }}>{status.msg}</div>
        ) : status.msg ? (
          <div style={{ color: '#ef4444', fontWeight: 800 }}>{status.msg}</div>
        ) : (
          <>
            <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
              Enter a new password (8+ characters).
            </div>
            <div className="input-wrap">
              <label className="input-label">New password</label>
              <div className="pw-wrap">
                <input
                  className="input-field"
                  type={pwVisible ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    const next = e.target.value
                    if (!pwVisible && next.length > password.length) {
                      setPwPeek(next.slice(-1))
                      clearTimeout(peek1Timer.current)
                      peek1Timer.current = setTimeout(() => setPwPeek(''), 700)
                    }
                    setPassword(next)
                  }}
                  minLength={8}
                />
                {!!pwPeek && !pwVisible && <span className="pw-peek">{pwPeek}</span>}
                <button type="button" className="pw-eye" aria-label={pwVisible ? 'Hide password' : 'Show password'} onClick={() => setPwVisible(v => !v)}>
                  {pwVisible ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <div className="input-wrap">
              <label className="input-label">Confirm password</label>
              <div className="pw-wrap">
                <input
                  className="input-field"
                  type={pw2Visible ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => {
                    const next = e.target.value
                    if (!pw2Visible && next.length > confirm.length) {
                      setPw2Peek(next.slice(-1))
                      clearTimeout(peek2Timer.current)
                      peek2Timer.current = setTimeout(() => setPw2Peek(''), 700)
                    }
                    setConfirm(next)
                  }}
                  minLength={8}
                />
                {!!pw2Peek && !pw2Visible && <span className="pw-peek">{pw2Peek}</span>}
                <button type="button" className="pw-eye" aria-label={pw2Visible ? 'Hide password' : 'Show password'} onClick={() => setPw2Visible(v => !v)}>
                  {pw2Visible ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: 13, marginTop: 6 }} disabled={saving} onClick={updatePassword}>
              {saving ? 'Saving…' : 'Update password →'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
