import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import PasswordInput from '../components/PasswordInput.jsx'

export default function Login() {
  const navigate = useNavigate()
  const finalBrandRef = useRef(null)
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [introPhase, setIntroPhase] = useState('center')
  const [introMetrics, setIntroMetrics] = useState({
    dx: 0,
    dy: 0,
    left: 0,
    top: 0,
    width: 0,
    scale: 1.7,
  })
  const { signIn, signUp } = useAuth()

  useLayoutEffect(() => {
    function updateIntroMetrics() {
      if (!finalBrandRef.current) return
      const rect = finalBrandRef.current.getBoundingClientRect()
      const dx = Math.round((window.innerWidth / 2) - (rect.left + (rect.width / 2)))
      const dy = Math.round((window.innerHeight / 2) - (rect.top + (rect.height / 2)))
      const maxScaleByWidth = rect.width ? (window.innerWidth - 120) / rect.width : 1.7
      const scale = Math.max(1.45, Math.min(1.85, maxScaleByWidth))
      setIntroMetrics({
        dx,
        dy,
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        width: Math.round(rect.width),
        scale: Number(scale.toFixed(2)),
      })
    }

    updateIntroMetrics()
    const resizeObserver = finalBrandRef.current ? new ResizeObserver(updateIntroMetrics) : null
    if (finalBrandRef.current && resizeObserver) resizeObserver.observe(finalBrandRef.current)
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateIntroMetrics).catch(() => {})
    }
    window.addEventListener('resize', updateIntroMetrics)
    return () => {
      window.removeEventListener('resize', updateIntroMetrics)
      resizeObserver?.disconnect()
    }
  }, [])

  useEffect(() => {
    const moveTimer = window.setTimeout(() => setIntroPhase('move'), 2300)
    const revealTimer = window.setTimeout(() => setIntroPhase('reveal'), 3750)
    const doneTimer = window.setTimeout(() => setIntroPhase('done'), 4050)
    return () => {
      window.clearTimeout(moveTimer)
      window.clearTimeout(revealTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  const showLoginContent = introPhase === 'reveal' || introPhase === 'done'
  const introOverlayStyle = {
    '--intro-dx': `${introMetrics.dx}px`,
    '--intro-dy': `${introMetrics.dy}px`,
    '--intro-scale': introMetrics.scale,
    '--intro-final-left': `${introMetrics.left}px`,
    '--intro-final-top': `${introMetrics.top}px`,
    '--intro-final-width': `${introMetrics.width}px`,
  }

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
          setSuccess('Account created! Let’s choose your first test…')
          setLoading(false)
          navigate('/choose-test', { replace: true })
          return
        }
        setSuccess('Account created! Sign in, then choose whether you want to start with SAT or ACT.')
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
    <div className={`login-shell ${introPhase !== 'done' ? 'intro-active' : ''} intro-${introPhase}`}>
      <div className={`login-intro-stage intro-${introPhase}`} style={introOverlayStyle} aria-hidden="true">
        <div className={`login-intro-brand intro-${introPhase}`}>
          <div className="login-logo-wrap">
            <img
              src="/logo.png"
              alt=""
              className="login-logo"
            />
          </div>
          <div className="login-brand-text">
            <div className="login-title">
              The Agora Project
            </div>
            <div className="login-subtitle">
              Built for speed, focus, and results.
            </div>
          </div>
        </div>
      </div>
      <div className={`login-wrap intro-phase-${introPhase}`}>
        {/* Branding */}
        <div className="login-brand">
          <div ref={finalBrandRef} className="login-brand-anchor" aria-hidden="true" />

          <div className={`login-points ${!showLoginContent ? 'intro-content-hidden' : ''}`}>
              {[
              { k: 'Timed Tests', v: 'Realistic SAT and ACT sections with pacing, review, and admin support.' },
              { k: 'Study Guide', v: 'Separate SAT and ACT study guides that lock in mastery chapter by chapter.' },
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

          <div className={`login-footnote ${!showLoginContent ? 'intro-content-hidden' : ''}`}>
            Built around official SAT and ACT structures with separate dashboards for each track.
          </div>
        </div>

        {/* Auth card */}
        <div className={`login-auth-col ${!showLoginContent ? 'intro-content-hidden' : ''}`}>
          {showLoginContent ? (
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

              {error && <div className="error-msg" style={{marginBottom:14}}>Error: {error}</div>}
              {success && <div style={{color:'#10b981', fontSize:13, marginBottom:14}}>Success: {success}</div>}

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
          ) : (
            <div className="login-card login-card-placeholder" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  )
}
