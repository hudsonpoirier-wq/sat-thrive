import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { clearAdminTestingData } from '../lib/studyProgress.js'
import { extractAnswerKeyFromPdf } from '../lib/answerKeyExtract.js'
import UserMenu from '../components/UserMenu.jsx'
import { TESTS } from '../data/tests.js'
import { ANSWER_KEY } from '../data/testData.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const FINAL_TEST_ID = 'final_test'

function countKey(key) {
  if (!key || typeof key !== 'object') return 0
  if (key.rw_m1) {
    return Object.keys(key.rw_m1 || {}).length
      + Object.keys(key.rw_m2 || {}).length
      + Object.keys(key.math_m1 || {}).length
      + Object.keys(key.math_m2 || {}).length
  }
  return Object.keys(key).length
}

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
  const isAdmin = profile?.role === 'admin' && String(profile?.email || '').toLowerCase() === 'agora@admin.org'
  const [students, setStudents] = useState([])
  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('students')
  const [keysByTest, setKeysByTest] = useState({})
  const [testKeyStatus, setTestKeyStatus] = useState({ loading: false, msg: '' })
  const [resettingUserId, setResettingUserId] = useState(null)
  const [resetMsg, setResetMsg] = useState('')

  useEffect(() => {
    if (!supabase) return
    if (profile && !isAdmin) {
      navigate('/dashboard')
      return
    }
    async function load() {
      setLoading(true)
      const [p, a, ps] = await Promise.all([
        supabase.from('profiles').select('id,email,full_name,role,created_at').order('created_at', { ascending: false }),
        supabase.from('test_attempts').select('id,user_id,test_id,started_at,completed_at,scores,weak_topics').not('completed_at', 'is', null).order('started_at', { ascending: false }).limit(2000),
        supabase.from('post_scores').select('attempt_id,post_score,post_rw,post_math,recorded_at').order('recorded_at', { ascending: false }).limit(5000),
      ])
      setStudents(p.data || [])
      setAttempts(a.data || [])
      setPostScores(ps.data || [])
      setLoading(false)
    }
    load().catch(() => setLoading(false))
  }, [profile, isAdmin, navigate])

  async function resetStudentData(userId, email) {
    if (!supabase || !isAdmin) return
    const ok = window.confirm(
      `Reset this student's progress?\n\nThis will delete their tests, post-test scores, and study guide progress:\n${email || userId}\n\nTheir login account will still exist.`
    )
    if (!ok) return
    setResettingUserId(userId)
    setResetMsg('')
    try {
      const rpc = await supabase.rpc('admin_reset_user', { target_user_id: userId })
      if (rpc.error) {
        const msg = String(rpc.error.message || '')
        // Back-compat: if the RPC isn't installed yet, fall back to direct deletes.
        if (msg.toLowerCase().includes('could not find the function') || msg.toLowerCase().includes('admin_reset_user')) {
          const ps = await supabase.from('post_scores').delete().eq('user_id', userId)
          if (ps.error) throw ps.error
          const ta = await supabase.from('test_attempts').delete().eq('user_id', userId)
          if (ta.error) throw ta.error
          const st = await supabase.from('studied_topics').delete().eq('user_id', userId)
          if (st.error && !String(st.error.message || '').includes("Could not find the table 'public.studied_topics'")) {
            throw st.error
          }
        } else {
          throw rpc.error
        }
      }
      setResetMsg('✅ Student reset complete.')
      // Refresh tables
      const [a, p] = await Promise.all([
        supabase.from('test_attempts').select('id,user_id,started_at,completed_at,scores,weak_topics').eq('is_sandbox', false).not('completed_at', 'is', null).order('started_at', { ascending: false }).limit(2000),
        supabase.from('post_scores').select('attempt_id,post_score,post_rw,post_math,recorded_at').eq('is_sandbox', false).order('recorded_at', { ascending: false }).limit(5000),
      ])
      setAttempts(a.data || [])
      setPostScores(p.data || [])
    } catch (e) {
      setResetMsg(`⚠️ Reset failed: ${e?.message || 'Unknown error'}`)
    } finally {
      setResettingUserId(null)
    }
  }

  async function resetMyData() {
    if (!supabase || !isAdmin || !profile?.id) return
    const ok = window.confirm('Reset your admin testing data?\n\nThis will delete your tests, scores, and study progress.')
    if (!ok) return
    setResettingUserId(profile.id)
    setResetMsg('')
    try {
      const rpc = await supabase.rpc('reset_my_data')
      if (rpc.error) {
        const msg = String(rpc.error.message || '')
        if (msg.toLowerCase().includes('could not find the function') || msg.toLowerCase().includes('reset_my_data')) {
          const ps = await supabase.from('post_scores').delete().eq('user_id', profile.id)
          if (ps.error) throw ps.error
          const ta = await supabase.from('test_attempts').delete().eq('user_id', profile.id)
          if (ta.error) throw ta.error
          const st = await supabase.from('studied_topics').delete().eq('user_id', profile.id)
          if (st.error && !String(st.error.message || '').includes("Could not find the table 'public.studied_topics'")) {
            throw st.error
          }
        } else {
          throw rpc.error
        }
      }
      await clearAdminTestingData(profile.id)
      setResetMsg('✅ Your data was reset.')
      setTimeout(() => { window.location.assign('/dashboard') }, 400)
    } catch (e) {
      setResetMsg(`⚠️ Reset failed: ${e?.message || 'Unknown error'}`)
    } finally {
      setResettingUserId(null)
    }
  }

  useEffect(() => {
    if (!supabase || profile?.role !== 'admin') return
    supabase.from('test_answer_keys').select('*')
      .then(({ data }) => {
        const map = {}
        for (const row of data || []) map[row.test_id] = row.answer_key
        setKeysByTest(map)
      })
      .catch(() => {})
  }, [profile?.role])

  // Build paired data
  const computed = useMemo(() => {
    const studentById = new Map(students.map(s => [s.id, s]))
    const attemptsByUser = new Map()
    const bestPreByUser = new Map()
    const bestExtraByUser = new Map()
    const extraIds = new Set(TESTS.filter(t => t.kind === 'extra').map(t => t.id))
    for (const a of attempts) {
      const list = attemptsByUser.get(a.user_id) || []
      list.push(a)
      attemptsByUser.set(a.user_id, list)
      const isPre = a.test_id === 'pre_test' || a.test_id === 'practice_test_11' || !a.test_id
      if (isPre) {
        const total = a.scores?.total || 0
        const prev = bestPreByUser.get(a.user_id) || 0
        if (total > prev) bestPreByUser.set(a.user_id, total)
      }
      if (extraIds.has(a.test_id) && (a.completed_at || a.scores?.total)) {
        const total = a.scores?.total || 0
        const prev = bestExtraByUser.get(a.user_id) || 0
        if (total > prev) bestExtraByUser.set(a.user_id, total)
      }
    }
    const postByAttemptId = new Map()
    for (const p of postScores) {
      if (!p?.attempt_id) continue
      if (!postByAttemptId.has(p.attempt_id)) postByAttemptId.set(p.attempt_id, p)
    }
    const pairsPost = []
    for (const a of attempts) {
      const post = postByAttemptId.get(a.id)
      if (!post) continue
      const student = studentById.get(a.user_id)
      pairsPost.push({
        pre: a.scores?.total,
        post: post.post_score,
        name: student?.full_name || 'Unknown',
      })
    }
    const pairsOptional = []
    for (const [userId, pre] of bestPreByUser.entries()) {
      const post = bestExtraByUser.get(userId)
      if (!pre || !post) continue
      const student = studentById.get(userId)
      pairsOptional.push({
        pre,
        post,
        name: student?.full_name || 'Unknown',
      })
    }
    return { studentById, attemptsByUser, bestPreByUser, bestExtraByUser, postByAttemptId, pairsPost, pairsOptional }
  }, [students, attempts, postScores])

  const pairs = computed.pairsPost
  const pairsOpt = computed.pairsOptional

  const stats = pairedTTest(pairs)
  const avgImprovement = pairs.length > 0 ? Math.round(pairs.reduce((s, p) => s + (p.post - p.pre), 0) / pairs.length) : null
  const statsOpt = pairedTTest(pairsOpt)
  const avgImprovementOpt = pairsOpt.length > 0 ? Math.round(pairsOpt.reduce((s, p) => s + (p.post - p.pre), 0) / pairsOpt.length) : null

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

  const chartDataOpt = pairsOpt.length > 0 ? {
    labels: pairsOpt.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [
      { label: 'Pre-Test', data: pairsOpt.map(p => p.pre), backgroundColor: '#94a3b8', borderRadius: 6, borderSkipped: false },
      { label: 'Best Optional', data: pairsOpt.map(p => p.post), backgroundColor: '#0ea5e9', borderRadius: 6, borderSkipped: false },
    ]
  } : null

  const gainDataOpt = pairsOpt.length > 0 ? {
    labels: pairsOpt.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [{
      label: 'Point Gain',
      data: pairsOpt.map(p => p.post - p.pre),
      backgroundColor: pairsOpt.map(p => p.post >= p.pre ? '#10b981' : '#ef4444'),
      borderRadius: 6, borderSkipped: false,
    }]
  } : null

  const tabs = [
    { id: 'students', label: '👥 Students' },
    { id: 'results', label: '📋 Test Results' },
    { id: 'impact', label: '📊 Proof of Impact' },
    { id: 'tests', label: '🧩 Tests' },
  ]

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>Loading…</div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
		      <nav className="nav">
	        <a className="nav-brand" href="/dashboard">The Agora <span>Project</span></a>
	        <div className="nav-actions">
	          <UserMenu profile={profile} />
	          <button
	            className="btn btn-outline"
	            onClick={resetMyData}
	            disabled={resettingUserId === profile?.id}
	            style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.9)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}
	            title="Reset your admin testing data"
	          >
	            {resettingUserId === profile?.id ? 'Resetting…' : 'Reset My Data'}
	          </button>
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
            {resetMsg && (
              <div style={{ marginBottom: 12, fontSize: 13, color: resetMsg.startsWith('✅') ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                {resetMsg}
              </div>
            )}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Name', 'Email', 'Role', 'Joined', 'Tests', 'Best Score', 'Actions'].map(h => (
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
                      <td style={{ padding: '12px' }}>
                        <button
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', fontSize: 12, opacity: resettingUserId === s.id ? 0.6 : 1 }}
                          disabled={resettingUserId === s.id}
                          onClick={() => resetStudentData(s.id, s.email)}
                          title="Delete this student's tests, scores, and study progress"
                        >
                          {resettingUserId === s.id ? 'Resetting…' : 'Reset'}
                        </button>
                      </td>
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

            {/* Optional practice proof (best optional vs best pre) */}
            <div style={{ marginTop: 20 }}>
              {pairsOpt.length < 2 ? (
                <div className="card" style={{ textAlign: 'center', padding: '44px 24px', color: '#94a3b8' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🧠</div>
                  <h3 style={{ color: '#475569', marginBottom: 4 }}>Optional practice proof needs more data</h3>
                  <p>Currently {pairsOpt.length} student(s) have both a pre-test score and at least one optional test score.</p>
                </div>
              ) : (
                <>
                  <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Score Comparison: Pre vs Best Optional</h3>
                    <div style={{ height: 260 }}>
                      <Bar data={chartDataOpt} options={{
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
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Point Gain Per Student (Optional)</h3>
                    <div style={{ height: 180 }}>
                      <Bar data={gainDataOpt} options={{
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                          y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                        }
                      }} />
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>📐 Paired T-Test (Optional)</h3>
                    {statsOpt && (
                      <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>
                        n={statsOpt.n} · mean gain {statsOpt.mean.toFixed(1)} · {statsOpt.pLabel} · Cohen’s d {statsOpt.d.toFixed(2)} · avg gain {avgImprovementOpt} points
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

	        {/* Tests tab */}
	        {tab === 'tests' && (
	          <div className="card">
	            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🧩 Test Setup</h3>
	            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 14 }}>
	              Manage your test PDFs and answer keys. Skill Builder keys can be imported directly from the scoring guide PDFs.
	            </div>

		            <div style={{ display: 'grid', gap: 12 }}>
		              {TESTS.map((t) => {
		                const builtIn = getAnswerKeyBySection(t.id)
		                const stored = keysByTest?.[t.id] || null
		                const builtInCount = countKey(builtIn)
		                const storedCount = countKey(stored)
		                const showCount = builtIn ? builtInCount : storedCount
		                return (
		                  <div key={t.id} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, background: '#f8fafc' }}>
		                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
		                      <div>
		                        <div style={{ fontWeight: 900, color: '#1a2744' }}>{t.label}</div>
		                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
		                          Answer key: {builtIn
		                            ? `Built-in (${builtInCount} answers)`
		                            : (stored ? `Loaded (${storedCount} answers)` : 'Not set')}
		                          {stored && builtIn && storedCount !== builtInCount && (
		                            <span style={{ marginLeft: 8, color: '#ef4444', fontWeight: 800 }}>
		                              (DB has {storedCount})
		                            </span>
		                          )}
		                        </div>
		                      </div>
		                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
		                        {t.akUrl && (
		                          <a className="btn btn-outline" href={t.akUrl} target="_blank" rel="noreferrer" title="Open the answer key PDF">
		                            Open AK →
		                          </a>
		                        )}
		                        {builtIn && storedCount && storedCount !== builtInCount && t.id !== 'pre_test' && (
		                          <button
		                            className="btn btn-outline"
		                            disabled={testKeyStatus.loading}
		                            onClick={async () => {
		                              setTestKeyStatus({ loading: true, msg: `Fixing ${t.label} answer key to ${builtInCount}…` })
		                              try {
		                                const up = await supabase.from('test_answer_keys').upsert({ test_id: t.id, answer_key: builtIn, updated_at: new Date().toISOString() })
		                                if (up.error) throw up.error
		                                setKeysByTest(prev => ({ ...(prev || {}), [t.id]: builtIn }))
		                                setTestKeyStatus({ loading: false, msg: `✅ Fixed ${t.label} (${builtInCount} answers)` })
		                              } catch (e) {
		                                setTestKeyStatus({ loading: false, msg: `⚠️ ${e?.message || 'Could not fix key'}` })
		                              }
		                            }}
		                            title="Your database has an older/incomplete key. This overwrites it with the built-in full key."
		                          >
		                            Fix to {builtInCount}
		                          </button>
		                        )}
		                        {t.akUrl && (
		                          <button
		                            className="btn btn-outline"
		                            disabled={testKeyStatus.loading}
		                            onClick={async () => {
		                              setTestKeyStatus({ loading: true, msg: `Importing ${t.label} answer key…` })
		                              try {
		                                // Prefer the app's bundled built-in key when available (avoids partial PDF parsing).
		                                const fromBuiltIn = getAnswerKeyBySection(t.id)
		                                const toSave = fromBuiltIn || (await (async () => {
		                                  const res = await fetch(t.akUrl)
		                                  if (!res.ok) throw new Error('Could not fetch bundled answer key PDF.')
		                                  const buf = new Uint8Array(await res.arrayBuffer())
		                                  return await extractAnswerKeyFromPdf(buf)
		                                })())
		                                const up = await supabase.from('test_answer_keys').upsert({ test_id: t.id, answer_key: toSave, updated_at: new Date().toISOString() })
		                                if (up.error) throw up.error
		                                setKeysByTest(prev => ({ ...(prev || {}), [t.id]: toSave }))
		                                setTestKeyStatus({ loading: false, msg: `✅ Imported ${t.label} (${countKey(toSave)} answers)` })
		                              } catch (e) {
		                                const msg = String(e?.message || 'Import failed')
		                                const hint = msg.toLowerCase().includes('row-level security') || msg.toLowerCase().includes('not authorized')
		                                  ? ' (Tip: run the Supabase schema + make sure agora@admin.org has role=admin in profiles.)'
		                                  : ''
		                                setTestKeyStatus({ loading: false, msg: `⚠️ ${msg}${hint}` })
		                              }
		                            }}
	                            title="Import from the bundled scoring guide PDF"
	                          >
	                            Import bundled AK
	                          </button>
	                        )}
		                        {t.id !== 'pre_test' && (
		                          <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
		                            Upload AK PDF…
	                            <input
	                              type="file"
	                              accept="application/pdf"
	                              style={{ display: 'none' }}
	                              onChange={async (e) => {
	                              const file = e.target.files?.[0]
	                              if (!file) return
	                              setTestKeyStatus({ loading: true, msg: `Parsing ${t.label}…` })
		                              try {
		                                const buf = new Uint8Array(await file.arrayBuffer())
		                                const parsed = await extractAnswerKeyFromPdf(buf)
		                                const parsedCount = parsed?.rw_m1
		                                  ? (Object.keys(parsed.rw_m1 || {}).length + Object.keys(parsed.rw_m2 || {}).length + Object.keys(parsed.math_m1 || {}).length + Object.keys(parsed.math_m2 || {}).length)
		                                  : Object.keys(parsed || {}).length
		                                if (parsedCount < 10) throw new Error('Could not find enough answers in the PDF.')
		                                const up = await supabase.from('test_answer_keys').upsert({ test_id: t.id, answer_key: parsed, updated_at: new Date().toISOString() })
		                                if (up.error) throw up.error
		                                setKeysByTest(prev => ({ ...(prev || {}), [t.id]: parsed }))
		                                setTestKeyStatus({ loading: false, msg: `✅ Saved ${t.label} (${parsedCount} answers)` })
		                              } catch (err) {
		                                const msg = String(err?.message || 'Could not parse PDF')
		                                const hint = msg.toLowerCase().includes('row-level security') || msg.toLowerCase().includes('not authorized')
		                                  ? ' (Tip: run the Supabase schema + make sure agora@admin.org has role=admin in profiles.)'
		                                  : ''
		                                setTestKeyStatus({ loading: false, msg: `⚠️ ${msg}${hint}` })
		                              } finally {
		                                e.target.value = ''
		                              }
	                              }}
	                            />
	                          </label>
	                        )}
		                        <a className="btn btn-outline" href={t.pdfUrl} target="_blank" rel="noreferrer">Open PDF →</a>
		                      </div>
		                    </div>
		                  </div>
		                )
		              })}
		            </div>

	            {testKeyStatus.msg && (
	              <div style={{ marginTop: 12, fontSize: 12, color: testKeyStatus.msg.startsWith('✅') ? '#10b981' : '#ef4444', fontWeight: 900 }}>
	                {testKeyStatus.loading ? '⏳ ' : ''}{testKeyStatus.msg}
	              </div>
	            )}

		            <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>
		              Final Test page: <Link to="/final" style={{ color: '#1a2744', fontWeight: 800 }}>Open →</Link>
		            </div>
		          </div>
		        )}
      </div>
    </div>
  )
}
