import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function pairedTTest(pairs) {
  if (pairs.length < 2) return null
  const diffs = pairs.map(p => p.post - p.pre)
  const n = diffs.length
  const mean = diffs.reduce((a, b) => a + b, 0) / n
  const variance = diffs.reduce((s, d) => s + Math.pow(d - mean, 2), 0) / (n - 1)
  const sd = Math.sqrt(variance)
  const se = sd / Math.sqrt(n)
  const t = mean / se
  const df = n - 1
  const tAbs = Math.abs(t)
  const crit = [
    [1,12.71,63.66],[2,4.303,9.925],[3,3.182,5.841],[4,2.776,4.604],
    [5,2.571,4.032],[6,2.447,3.707],[7,2.365,3.499],[8,2.306,3.355],
    [9,2.262,3.250],[10,2.228,3.169],[15,2.131,2.947],[20,2.086,2.845],
    [30,2.042,2.750],[60,2.000,2.660],[120,1.980,2.617]
  ]
  let cv = crit[crit.length - 1]
  for (const r of crit) { if (df <= r[0]) { cv = r; break } }
  let pLabel, conf, sig
  if (tAbs > cv[2]) { pLabel = 'p < 0.01'; conf = '99%'; sig = true }
  else if (tAbs > cv[1]) { pLabel = 'p < 0.05'; conf = '95%'; sig = true }
  else { pLabel = 'p ≥ 0.05'; conf = '<95%'; sig = false }
  const d = mean / sd
  const ci = 1.96 * se
  return { n, mean, sd, se, t, df, pLabel, conf, sig, d, ci, lo: mean - ci, hi: mean + ci }
}

export default function Admin() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('students')

  useEffect(() => {
    if (!supabase) return
    if (profile && profile.role !== 'admin') {
      navigate('/dashboard')
      return
    }
    async function load() {
      setLoading(true)
      const [p, a, ps] = await Promise.all([
        supabase.from('profiles').select('id,email,full_name,role,created_at').order('created_at', { ascending: false }),
        supabase.from('test_attempts').select('id,user_id,started_at,completed_at,scores,weak_topics').not('completed_at', 'is', null).order('started_at', { ascending: false }).limit(2000),
        supabase.from('post_scores').select('attempt_id,post_score,post_rw,post_math,recorded_at').order('recorded_at', { ascending: false }).limit(5000),
      ])
      setStudents(p.data || [])
      setAttempts(a.data || [])
      setPostScores(ps.data || [])
      setLoading(false)
    }
    load().catch(() => setLoading(false))
  }, [profile, navigate])

  // Build paired data
  const computed = useMemo(() => {
    const studentById = new Map(students.map(s => [s.id, s]))
    const attemptsByUser = new Map()
    const bestPreByUser = new Map()
    for (const a of attempts) {
      const list = attemptsByUser.get(a.user_id) || []
      list.push(a)
      attemptsByUser.set(a.user_id, list)
      const total = a.scores?.total || 0
      const prev = bestPreByUser.get(a.user_id) || 0
      if (total > prev) bestPreByUser.set(a.user_id, total)
    }
    const postByAttemptId = new Map()
    for (const p of postScores) {
      if (!p?.attempt_id) continue
      if (!postByAttemptId.has(p.attempt_id)) postByAttemptId.set(p.attempt_id, p)
    }
    const pairs = []
    for (const a of attempts) {
      const post = postByAttemptId.get(a.id)
      if (!post) continue
      const student = studentById.get(a.user_id)
      pairs.push({
        pre: a.scores?.total,
        post: post.post_score,
        name: student?.full_name || 'Unknown',
      })
    }
    return { studentById, attemptsByUser, bestPreByUser, postByAttemptId, pairs }
  }, [students, attempts, postScores])

  const pairs = computed.pairs

  const stats = pairedTTest(pairs)
  const avgImprovement = pairs.length > 0 ? Math.round(pairs.reduce((s, p) => s + (p.post - p.pre), 0) / pairs.length) : null

  const chartData = pairs.length > 0 ? {
    labels: pairs.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [
      { label: 'Pre-Test', data: pairs.map(p => p.pre), backgroundColor: '#94a3b8', borderRadius: 6, borderSkipped: false },
      { label: 'Post-Test', data: pairs.map(p => p.post), backgroundColor: '#1a2744', borderRadius: 6, borderSkipped: false },
    ]
  } : null

  const gainData = pairs.length > 0 ? {
    labels: pairs.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [{
      label: 'Point Gain',
      data: pairs.map(p => p.post - p.pre),
      backgroundColor: pairs.map(p => p.post >= p.pre ? '#10b981' : '#ef4444'),
      borderRadius: 6, borderSkipped: false,
    }]
  } : null

  const tabs = [
    { id: 'students', label: '👥 Students' },
    { id: 'results', label: '📋 Test Results' },
    { id: 'impact', label: '📊 Proof of Impact' },
  ]

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>Loading…</div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <nav className="nav">
        <a className="nav-brand" href="/dashboard">The Agora <span>Project</span></a>
        <div className="nav-actions">
          <span className="nav-user">Admin Panel</span>
          <Link to="/dashboard" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
            ← Dashboard
          </Link>
          <button className="btn btn-outline" onClick={() => signOut().then(() => navigate('/login'))}
            style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Tab bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8ecf0', display: 'flex', padding: '0 32px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '14px 20px', border: 'none', background: 'none', fontFamily: 'Sora,sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', color: tab === t.id ? '#1a2744' : '#64748b', borderBottom: `3px solid ${tab === t.id ? '#f59e0b' : 'transparent'}`, transition: 'all .2s', whiteSpace: 'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="page fade-up">
        {/* Summary stats */}
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          {[
            { label: 'Total Students', val: students.length, icon: '👥', dark: false },
            { label: 'Completed Tests', val: attempts.length, icon: '✅', dark: false },
            { label: 'Paired Records', val: pairs.length, icon: '📊', dark: false },
            { label: 'Avg Improvement', val: avgImprovement !== null ? `+${avgImprovement} pts` : '—', icon: '📈', dark: !!avgImprovement },
          ].map(s => (
            <div key={s.label} className={`stat-box${s.dark ? ' dark' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-num" style={{ fontSize: 22 }}>{s.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Students tab */}
        {tab === 'students' && (
          <div className="card" style={{ overflowX: 'auto' }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>All Students</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Name', 'Email', 'Role', 'Joined', 'Tests', 'Best Score'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', background: '#f8fafc', borderBottom: '1px solid #e8ecf0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(s => {
                  const userAttempts = computed.attemptsByUser.get(s.id) || []
                  const best = computed.bestPreByUser.get(s.id) || null
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{s.full_name || '—'}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: 13 }}>{s.email}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: s.role === 'admin' ? '#fef3c7' : s.role === 'tutor' ? '#dbeafe' : '#f0fdf4', color: s.role === 'admin' ? '#92400e' : s.role === 'tutor' ? '#1e40af' : '#166534' }}>
                          {s.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: 13 }}>{new Date(s.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '12px' }}>{userAttempts.length}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, color: '#1a2744' }}>{best || '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Results tab */}
        {tab === 'results' && (
          <div className="card" style={{ overflowX: 'auto' }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>All Completed Tests</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Student', 'Date', 'R&W', 'Math', 'Total', 'Post-Test', 'Gain', 'Top Weakness', ''].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', background: '#f8fafc', borderBottom: '1px solid #e8ecf0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attempts.map(a => {
                  const student = computed.studentById.get(a.user_id)
                  const post = computed.postByAttemptId.get(a.id)
                  const gain = post ? post.post_score - (a.scores?.total || 0) : null
                  const topWeak = a.weak_topics?.[0]
                  return (
                    <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{student?.full_name || 'Unknown'}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: 13 }}>{new Date(a.started_at).toLocaleDateString()}</td>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{a.scores?.rw || '—'}</td>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{a.scores?.math || '—'}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 15, color: '#1a2744' }}>{a.scores?.total || '—'}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, color: '#10b981' }}>{post?.post_score || '—'}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, color: gain > 0 ? '#10b981' : gain < 0 ? '#ef4444' : '#64748b' }}>
                        {gain !== null ? `${gain > 0 ? '+' : ''}${gain}` : '—'}
                      </td>
                      <td style={{ padding: '12px', fontSize: 12, color: '#475569' }}>
                        {topWeak ? `${topWeak.name} (p.${topWeak.page})` : '—'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Link to={`/results/${a.id}`} style={{ fontSize: 12, color: '#1a2744', fontWeight: 600 }}>View →</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Proof of Impact tab */}
        {tab === 'impact' && (
          <div>
            {pairs.length < 2 ? (
              <div className="card" style={{ textAlign: 'center', padding: '60px 24px', color: '#94a3b8' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>⏳</div>
                <h3 style={{ color: '#475569', marginBottom: 4 }}>Need at least 2 paired records</h3>
                <p>Currently {pairs.length} student(s) with both pre and post scores. Add post-test scores in the database to generate the impact report.</p>
              </div>
            ) : (
              <>
                {/* Charts */}
                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Score Comparison: Pre vs Post</h3>
                  <div style={{ height: 260 }}>
                    <Bar data={chartData} options={{
                      responsive: true, maintainAspectRatio: false,
                      plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 } } } },
                      scales: {
                        x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                        y: { min: 300, max: 1600, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                      }
                    }} />
                  </div>
                </div>

                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Point Gain Per Student</h3>
                  <div style={{ height: 180 }}>
                    <Bar data={gainData} options={{
                      responsive: true, maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                        y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                      }
                    }} />
                  </div>
                </div>

                {/* T-test stats */}
                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>📐 Paired T-Test Statistics</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                    {stats && [
                      { l: 'Sample (n)', v: stats.n },
                      { l: 'Mean Gain', v: `${stats.mean.toFixed(1)} pts` },
                      { l: 'Std Deviation', v: stats.sd.toFixed(1) },
                      { l: 'Std Error', v: stats.se.toFixed(1) },
                      { l: 'T-Statistic', v: stats.t.toFixed(3) },
                      { l: 'Degrees of Freedom', v: stats.df },
                      { l: 'P-Value (two-tailed)', v: stats.pLabel },
                      { l: "Cohen's d", v: stats.d.toFixed(2) },
                    ].map(s => (
                      <div key={s.l} style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.3px', marginBottom: 3 }}>{s.l}</div>
                        <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: 15, color: '#1a2744' }}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  {stats && (
                    <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', background: '#f8fafc', padding: '10px 14px', borderRadius: 8 }}>
                      95% Confidence Interval: [+{stats.lo.toFixed(0)}, +{stats.hi.toFixed(0)}] points improvement
                    </div>
                  )}
                </div>

                {/* Proof of impact box */}
                {stats && (
                  <div className="proof-box">
                    {stats.sig ? (
                      <>
                        <div className="proof-verified">✅ Proof of Impact — Statistically Verified</div>
                        <div className="proof-statement">
                          "Our students improved by an average of {Math.round(stats.mean)} points."
                        </div>
                        <div style={{ fontSize: 15, opacity: .9, marginBottom: 16 }}>
                          "There is a {stats.conf} probability this improvement was caused by our program, not chance ({stats.pLabel})."
                        </div>
                        <div className="proof-stats">
                          Cohen's d = {stats.d.toFixed(2)} ({stats.d > 0.8 ? 'Large' : stats.d > 0.5 ? 'Medium' : 'Small'} effect size) ·
                          CI₉₅: [+{stats.lo.toFixed(0)}, +{stats.hi.toFixed(0)}] ·
                          n = {stats.n} students ·
                          t({stats.df}) = {stats.t.toFixed(3)}, {stats.pLabel}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>More data needed</div>
                        <div style={{ fontSize: 14, opacity: .8 }}>
                          With n={stats.n} students, the result has not yet reached statistical significance ({stats.pLabel}).
                          Continue collecting post-test scores to build the evidence base.
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
