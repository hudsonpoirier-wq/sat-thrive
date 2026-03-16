import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Login() {
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
      const { error } = await signUp(email, password, fullName)
      if (error) setError(error.message)
      else setSuccess('Account created! Check your email to confirm, then sign in.')
    } else {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(135deg, #1a2744 0%, #1e3a8a 50%, #1a2744 100%)'
    }}>
      {/* Left branding panel */}
      <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'60px', color:'white', maxWidth:560}}>
        <div style={{fontFamily:'Sora,sans-serif', fontSize:36, fontWeight:800, lineHeight:1.1, marginBottom:20}}>
          🎯 SAT Thrive
          <div style={{fontSize:18, fontWeight:600, color:'rgba(255,255,255,.7)', marginTop:6}}>
            The 1550+ Architect Strategy
          </div>
        </div>
        <p style={{fontSize:16, color:'rgba(255,255,255,.6)', lineHeight:1.7, marginBottom:32, maxWidth:400}}>
          Take real SAT practice tests, get a custom study plan mapped to your playbook, and track your improvement with proven statistics.
        </p>
        {['📖 Real SAT questions with timed modules', '🗺 Study plans mapped to exact Playbook pages', '📊 Statistical proof of your improvement'].map(t => (
          <div key={t} style={{display:'flex', alignItems:'center', gap:12, marginBottom:14, fontSize:15, color:'rgba(255,255,255,.85)'}}>
            {t}
          </div>
        ))}
        <div style={{marginTop:40, fontSize:12, color:'rgba(255,255,255,.35)'}}>
          Based on Official College Board Guidelines
        </div>
      </div>

      {/* Right auth form */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'40px', flex:'0 0 460px'}}>
        <div style={{background:'white', borderRadius:20, padding:'40px', width:'100%', maxWidth:400, boxShadow:'0 20px 60px rgba(0,0,0,.3)'}}>
          <div style={{fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:800, color:'#1a2744', marginBottom:4}}>
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </div>
          <div style={{fontSize:13, color:'#64748b', marginBottom:28}}>
            {mode === 'signin' ? 'Sign in to continue your SAT prep' : 'Start your journey to 1550+'}
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
              <input className="input-field" type="password" placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'} value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
            </div>

            {error && <div className="error-msg" style={{marginBottom:14}}>⚠ {error}</div>}
            {success && <div style={{color:'#10b981', fontSize:13, marginBottom:14}}>✅ {success}</div>}

            <button type="submit" className="btn btn-primary" style={{width:'100%', padding:'13px', marginTop:4}} disabled={loading}>
              {loading ? <span className="spinner" /> : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          <div style={{textAlign:'center', marginTop:20, fontSize:13, color:'#64748b'}}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}
              style={{background:'none', border:'none', color:'#1a2744', fontWeight:700, cursor:'pointer', fontSize:13}}>
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
