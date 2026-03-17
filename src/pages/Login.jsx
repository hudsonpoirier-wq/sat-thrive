import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Login() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup' | 'forgot'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const { signIn, signUp, requestPasswordReset, resendConfirmation } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    if (mode === 'forgot') {
      const { error } = await requestPasswordReset(email)
      if (error) setError(error.message)
      else setSuccess('Reset link sent. Check your email to set a new password.')
    } else if (mode === 'signup') {
      if (!fullName.trim()) { setError('Please enter your full name'); setLoading(false); return }
      const { error } = await signUp(email, password, fullName)
      if (error) setError(error.message)
      else {
        setSuccess('Account created! Check your email to confirm, then sign in.')
        // Most users expect to sign in next; keep their email filled.
        setMode('signin')
        setPassword('')
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) {
        const msg = String(error.message || 'Sign in failed')
        setError(msg)
        if (msg.toLowerCase().includes('email not confirmed')) {
          setSuccess('Tip: confirm your email first. You can resend the confirmation email below.')
        }
      }
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '18px 12px',
      background: 'radial-gradient(1200px 700px at 30% 20%, rgba(14,165,233,.18), transparent 60%), radial-gradient(900px 500px at 80% 40%, rgba(99,102,241,.18), transparent 55%), linear-gradient(135deg, #0b1220 0%, #172554 48%, #0b1220 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1320,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 18,
        borderRadius: 28,
        padding: 18,
        border: '1px solid rgba(255,255,255,.10)',
        background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
        boxShadow: '0 30px 90px rgba(0,0,0,.45)'
      }}>
        {/* Branding */}
        <div style={{
          flex: '1 1 520px',
          padding: '26px 26px 22px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
            <img
              src="/logo.png"
              alt="The Agora Project"
              style={{
                width: 150,
                height: 150,
                objectFit: 'contain',
                filter: 'drop-shadow(0 16px 30px rgba(0,0,0,.45)) drop-shadow(0 0 18px rgba(14,165,233,.22))'
              }}
            />
            <div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 44, fontWeight: 900, lineHeight: 1.05 }}>
                The Agora Project
              </div>
              <div style={{ fontSize: 16, fontWeight: 650, color: 'rgba(255,255,255,.72)', marginTop: 8 }}>
                A modern SAT prep dashboard — built for speed, focus, and results.
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10, marginTop: 10, maxWidth: 520 }}>
            {[
              { k: 'Timed Tests', v: 'Realistic modules with pace tracking and clean review.' },
              { k: 'Study Guide', v: 'Chapter practice that locks in mastery (25/25 to complete).' },
              { k: 'Progress', v: 'Charts + optional skill builders that show improvement over time.' },
            ].map(({ k, v }) => (
              <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 10, height: 10, borderRadius: 999, marginTop: 7, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }} />
                <div>
                  <div style={{ fontWeight: 850, letterSpacing: .2 }}>{k}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,.70)' }}>{v}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, fontSize: 12, color: 'rgba(255,255,255,.40)' }}>
            Based on official SAT structure and scoring conventions.
          </div>
        </div>

        {/* Auth card */}
        <div style={{
          flex: '0 1 430px',
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: 410,
            background: 'rgba(255,255,255,.92)',
            borderRadius: 22,
            padding: '34px 28px',
            border: '1px solid rgba(15,23,42,.08)',
            boxShadow: '0 18px 55px rgba(0,0,0,.22)'
          }}>
          <div style={{fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:800, color:'#1a2744', marginBottom:4}}>
            {mode === 'signin' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset your password'}
          </div>
          <div style={{fontSize:13, color:'#64748b', marginBottom:28}}>
            {mode === 'signin' ? 'Sign in to continue' : mode === 'signup' ? 'Create an account to begin' : 'We’ll email you a reset link'}
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="input-wrap">
                <label className="input-label">Full Name</label>
                <input className="input-field" type="text" placeholder="Jane Smith" value={fullName} onChange={e => setFullName(e.target.value)} required />
              </div>
            )}
            <div className="input-wrap">
              <label className="input-label">Email</label>
              <input className="input-field" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            {mode !== 'forgot' && (
              <div className="input-wrap">
                <label className="input-label">Password</label>
                <input className="input-field" type="password" placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'} value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
              </div>
            )}

            {error && <div className="error-msg" style={{marginBottom:14}}>⚠ {error}</div>}
            {success && <div style={{color:'#10b981', fontSize:13, marginBottom:14}}>✅ {success}</div>}

            <button type="submit" className="btn btn-primary" style={{width:'100%', padding:'13px', marginTop:4}} disabled={loading}>
              {loading ? <span className="spinner" /> : mode === 'signin' ? 'Sign In →' : mode === 'signup' ? 'Create Account →' : 'Send Reset Link →'}
            </button>
          </form>

          {success && mode !== 'forgot' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 12, fontSize: 13 }}>
              <button
                onClick={async () => {
                  if (!email) { setError('Enter your email first.'); return }
                  setError(''); setLoading(true)
                  const { error } = await resendConfirmation(email)
                  if (error) setError(error.message)
                  else setSuccess('Confirmation email sent. Check your inbox (and spam).')
                  setLoading(false)
                }}
                style={{ background: 'none', border: 'none', color: '#1a2744', fontWeight: 750, cursor: 'pointer', padding: 0 }}
                title="Resend the email confirmation link"
              >
                Resend confirmation
              </button>
              <button
                onClick={() => { setMode('forgot'); setError(''); setSuccess('') }}
                style={{ background: 'none', border: 'none', color: '#1a2744', fontWeight: 750, cursor: 'pointer', padding: 0 }}
                title="Send a password reset email"
              >
                Forgot password?
              </button>
            </div>
          )}

          {mode === 'signin' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 12, fontSize: 13 }}>
              <button
                onClick={() => { setMode('forgot'); setError(''); setSuccess('') }}
                style={{ background: 'none', border: 'none', color: '#1a2744', fontWeight: 750, cursor: 'pointer', padding: 0 }}
              >
                Forgot password?
              </button>
              <button
                onClick={async () => {
                  if (!email) { setError('Enter your email first.'); return }
                  setError(''); setSuccess(''); setLoading(true)
                  const { error } = await resendConfirmation(email)
                  if (error) setError(error.message)
                  else setSuccess('Confirmation email sent. Check your inbox.')
                  setLoading(false)
                }}
                style={{ background: 'none', border: 'none', color: '#1a2744', fontWeight: 750, cursor: 'pointer', padding: 0 }}
                title="If you didn’t get the signup confirmation, resend it."
              >
                Resend confirmation
              </button>
            </div>
          )}

          <div style={{textAlign:'center', marginTop:20, fontSize:13, color:'#64748b'}}>
            {mode === 'signin' ? "Don't have an account? " : mode === 'signup' ? 'Already have an account? ' : 'Remember your password? '}
            <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}
              style={{background:'none', border:'none', color:'#1a2744', fontWeight:700, cursor:'pointer', fontSize:13}}>
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
