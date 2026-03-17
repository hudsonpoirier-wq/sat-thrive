import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import PasswordInput from '../components/PasswordInput.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const { signIn, signUp } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    if (mode === 'signup') {
      if (!fullName.trim()) { setError('Please enter your full name'); setLoading(false); return }
      const { data, error } = await signUp(email, password, fullName)
      if (error) setError(error.message)
      else {
        // If "Confirm email" is OFF in Supabase, signUp returns a session immediately.
        if (data?.session) {
          setSuccess('Account created! Signing you in…')
          setLoading(false)
          navigate('/dashboard', { replace: true })
          return
        }
        setSuccess('Account created! You can sign in now.')
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
    <div className="login-shell">
      <div className="login-wrap">
        {/* Branding */}
        <div className="login-brand">
          <div className="login-brand-row">
            <img
              src="/logo.png"
              alt="The Agora Project"
              className="login-logo"
            />
            <div className="login-brand-text">
              <div className="login-title">
                The Agora Project
              </div>
              <div className="login-subtitle">
                Built for speed, focus, and results.
              </div>
            </div>
          </div>

          <div className="login-points">
            {[
              { k: 'Timed Tests', v: 'Realistic modules with pace tracking and clean review.' },
              { k: 'Study Guide', v: 'Chapter practice that locks in mastery (25/25 to complete).' },
              { k: 'Progress', v: 'Charts + optional skill builders that show improvement over time.' },
            ].map(({ k, v }) => (
              <div key={k} className="login-point">
                <div className="login-dot" />
                <div className="login-point-text">
                  <div className="login-point-title">{k}</div>
                  <div className="login-point-sub">{v}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="login-footnote">
            Based on official SAT structure and scoring conventions.
          </div>
        </div>

        {/* Auth card */}
        <div className="login-auth-col">
          <div className="login-card">
          <div className="login-card-title">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </div>
          <div className="login-card-subtitle">
            {mode === 'signin' ? 'Sign in to continue' : 'Create an account to begin'}
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
            <div className="input-wrap">
              <label className="input-label">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                minLength={8}
                required
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </div>

            {error && <div className="error-msg" style={{marginBottom:14}}>⚠ {error}</div>}
            {success && <div style={{color:'#10b981', fontSize:13, marginBottom:14}}>✅ {success}</div>}

            <button type="submit" className="btn btn-primary" style={{width:'100%', padding:'13px', marginTop:4}} disabled={loading}>
              {loading ? <span className="spinner" /> : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          <div className="login-switch">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}
              className="login-switch-btn">
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
