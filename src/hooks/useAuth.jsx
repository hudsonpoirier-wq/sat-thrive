import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

function SupabaseNotConfigured() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', padding: 24 }}>
      <div style={{ maxWidth: 640, width: '100%', background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24, boxShadow: '0 2px 16px rgba(15,31,61,.09)' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0f1f3d', marginBottom: 8 }}>Missing Supabase environment variables</div>
        <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>
          This deployment needs Supabase credentials to run. Add these environment variables in Vercel (Project → Settings → Environment Variables), then redeploy:
        </div>
        <pre style={{ background: '#0b1220', color: '#e2e8f0', padding: 14, borderRadius: 10, overflowX: 'auto', fontSize: 12, lineHeight: 1.5 }}>
{`VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...`}
        </pre>
        <div style={{ color: '#64748b', fontSize: 12, marginTop: 12 }}>
          Local dev: create a <code>.env</code> file with the same keys, then restart <code>npm run dev</code>.
        </div>
      </div>
    </div>
  )
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setUser(null)
      setProfile(null)
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    if (!supabase) return
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
    setLoading(false)
  }

  async function signUp(email, password, fullName) {
    if (!supabase) return { data: null, error: new Error('Supabase is not configured') }
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } }
    })
    return { data, error }
  }

  async function signIn(email, password) {
    if (!supabase) return { data: null, error: new Error('Supabase is not configured') }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  if (!supabase && !loading) return <SupabaseNotConfigured />

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
