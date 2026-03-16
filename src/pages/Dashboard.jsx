import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { rawToScaled } from '../data/testData.js'

function Navbar() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <a className="nav-brand" href="/dashboard">SAT <span>Thrive</span></a>
      <div className="nav-actions">
        {profile?.role === 'admin' && (
          <Link to="/admin" className="btn btn-outline" style={{padding:'6px 14px',fontSize:12,color:'white',borderColor:'rgba(255,255,255,.3)'}}>
            Admin
          </Link>
        )}
        <span className="nav-user">{profile?.full_name || profile?.email}</span>
        <button className="btn btn-outline" onClick={() => signOut().then(() => navigate('/login'))}
          style={{padding:'6px 14px',fontSize:12,color:'rgba(255,255,255,.7)',borderColor:'rgba(255,255,255,.2)',background:'rgba(255,255,255,.08)'}}>
          Sign Out
        </button>
      </div>
    </nav>
  )
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [startingTest, setStartingTest] = useState(false)
  const [addingPost, setAddingPost] = useState(null)
  const [postInput, setPostInput] = useState('')

  useEffect(() => {
    if (!user) return
    Promise.all([
      supabase.from('test_attempts').select('*').eq('user_id', user.id).order('started_at', { ascending: false }),
      supabase.from('post_scores').select('*').eq('user_id', user.id).order('recorded_at', { ascending: false })
    ]).then(([a, p]) => {
      setAttempts(a.data || [])
      setPostScores(p.data || [])
      setLoading(false)
    })
  }, [user])

  async function startNewTest() {
    setStartingTest(true)
    const { data, error } = await supabase.from('test_attempts').insert({
      user_id: user.id,
      test_id: 'practice_test_11',
      current_section: 'rw_m1',
      answers: {},
      module_time_remaining: { rw_m1: 1920, rw_m2: 1920, math_m1: 2100, math_m2: 2100 }
    }).select().single()
    if (!error && data) navigate(`/test/${data.id}`)
    else setStartingTest(false)
  }

  async function savePostScore(attemptId) {
    const sc = parseInt(postInput)
    if (isNaN(sc) || sc < 400 || sc > 1600) return alert('Enter a valid score (400–1600)')
    const rw = Math.round(sc * 0.5 / 10) * 10
    const math = sc - rw
    await supabase.from('post_scores').insert({ user_id: user.id, attempt_id: attemptId, post_score: sc, post_rw: rw, post_math: math })
    const { data } = await supabase.from('post_scores').select('*').eq('user_id', user.id).order('recorded_at', { ascending: false })
    setPostScores(data || [])
    setAddingPost(null); setPostInput('')
  }

  const completed = attempts.filter(a => a.completed_at)
  const inProgress = attempts.filter(a => !a.completed_at)
  const bestScore = completed.length ? Math.max(...completed.map(a => a.scores?.total || 0)) : null
  const latestPostScore = postScores[0]?.post_score
  const improvement = bestScore && latestPostScore ? latestPostScore - bestScore : null

  if (loading) return <>
    <Navbar />
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'calc(100vh - 60px)',color:'#64748b'}}>Loading…</div>
  </>

  return (
    <>
      <Navbar />
      <div className="page fade-up">
        {/* Welcome */}
        <div style={{marginBottom:28}}>
          <h1 style={{fontFamily:'Sora,sans-serif',fontSize:26,fontWeight:800,color:'#1a2744'}}>
            Hey {profile?.full_name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p style={{color:'#64748b',marginTop:4}}>Your SAT Thrive dashboard — track your progress to 1550+</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: 'Tests Completed', val: completed.length, sub: `${inProgress.length} in progress`, dark: false },
            { label: 'Best Pre-Test Score', val: bestScore || '—', sub: 'Practice Test #11', dark: false },
            { label: 'Post-Test Score', val: latestPostScore || '—', sub: latestPostScore ? 'Most recent' : 'Not yet recorded', dark: false },
            { label: 'Total Improvement', val: improvement ? `+${improvement}` : '—', sub: 'Points gained', dark: !!improvement },
          ].map(s => (
            <div key={s.label} className={`stat-box${s.dark ? ' dark' : ''}`}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-num">{s.val}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Start test CTA */}
        <div className="card" style={{marginBottom:24, background:'linear-gradient(135deg,#1a2744,#1e3a8a)', color:'white'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16}}>
            <div>
              <div style={{fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:800, marginBottom:4}}>
                📋 SAT Practice Test #11
              </div>
              <div style={{fontSize:13, opacity:.7}}>
                4 modules · 120 questions · 2 hrs 14 min · Timed like the real SAT
              </div>
            </div>
            {inProgress.length > 0 ? (
              <div style={{display:'flex', gap:10}}>
                <button className="btn" onClick={() => navigate(`/test/${inProgress[0].id}`)}
                  style={{background:'#f59e0b', color:'#1a2744', fontWeight:700}}>
                  ▶ Resume Test
                </button>
                <button className="btn btn-outline" onClick={startNewTest} disabled={startingTest}
                  style={{borderColor:'rgba(255,255,255,.3)', color:'rgba(255,255,255,.7)', background:'rgba(255,255,255,.08)'}}>
                  Start New
                </button>
              </div>
            ) : (
              <button className="btn" onClick={startNewTest} disabled={startingTest}
                style={{background:'#f59e0b', color:'#1a2744', fontWeight:700}}>
                {startingTest ? <><span className="spinner" style={{borderTopColor:'#1a2744'}} /> Starting…</> : '🚀 Start Practice Test'}
              </button>
            )}
          </div>
        </div>

        {/* Completed tests */}
        {completed.length > 0 && (
          <div className="card">
            <h2 style={{fontFamily:'Sora,sans-serif', fontSize:16, fontWeight:700, marginBottom:16}}>
              📊 Your Test Results
            </h2>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr>
                    {['Date', 'R&W Score', 'Math Score', 'Total', 'Post-Test', 'Gain', ''].map(h => (
                      <th key={h} style={{padding:'8px 12px', textAlign:'left', fontSize:11, color:'#64748b', fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px', background:'#f8fafc', borderBottom:'1px solid #e8ecf0'}}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {completed.map(a => {
                    const post = postScores.find(p => p.attempt_id === a.id)
                    const gain = post ? post.post_score - (a.scores?.total || 0) : null
                    return (
                      <tr key={a.id} style={{borderBottom:'1px solid #f1f5f9'}}>
                        <td style={{padding:'12px'}}>{new Date(a.started_at).toLocaleDateString()}</td>
                        <td style={{padding:'12px', fontWeight:700}}>{a.scores?.rw || '—'}</td>
                        <td style={{padding:'12px', fontWeight:700}}>{a.scores?.math || '—'}</td>
                        <td style={{padding:'12px', fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:16, color:'#1a2744'}}>{a.scores?.total || '—'}</td>
                        <td style={{padding:'12px'}}>
                          {addingPost === a.id ? (
                            <div style={{display:'flex', gap:6}}>
                              <input type="number" min={400} max={1600} placeholder="Score" value={postInput} onChange={e => setPostInput(e.target.value)}
                                style={{width:80, padding:'5px 8px', border:'1.5px solid #e2e8f0', borderRadius:7, fontSize:13}} />
                              <button onClick={() => savePostScore(a.id)} style={{padding:'5px 10px', background:'#10b981', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12}}>✓</button>
                              <button onClick={() => setAddingPost(null)} style={{padding:'5px 8px', background:'#f1f5f9', border:'none', borderRadius:7, cursor:'pointer', fontSize:12}}>✗</button>
                            </div>
                          ) : post ? (
                            <span style={{fontFamily:'Sora,sans-serif', fontWeight:800, color:'#10b981'}}>{post.post_score}</span>
                          ) : (
                            <button onClick={() => setAddingPost(a.id)}
                              style={{padding:'4px 10px', background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:7, fontSize:12, cursor:'pointer', color:'#475569'}}>
                              + Add
                            </button>
                          )}
                        </td>
                        <td style={{padding:'12px'}}>
                          {gain !== null && (
                            <span style={{fontFamily:'Sora,sans-serif', fontWeight:800, color: gain > 0 ? '#10b981' : '#ef4444'}}>
                              {gain > 0 ? '+' : ''}{gain}
                            </span>
                          )}
                        </td>
                        <td style={{padding:'12px'}}>
                          <Link to={`/results/${a.id}`} style={{fontSize:12, color:'#1a2744', fontWeight:600}}>
                            View →
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
