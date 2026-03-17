import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { rawToScaled, freeResponseMatches } from '../data/testData.js'
import { getStudiedTopics } from '../lib/studyProgress.js'
import { loadMistakes, loadReviewItems, computeDueCount } from '../lib/mistakesStore.js'
import { buildWeeklyStudyPlan, buildStudyPlanToTestDate, loadSatTestDate, saveSatTestDate, loadStudyPrefs } from '../lib/studyPlan.js'
import UserMenu from '../components/UserMenu.jsx'
import { TESTS } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function Navbar() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const isAdmin = profile?.role === 'admin' && String(profile?.email || '').toLowerCase() === 'agora@admin.org'
  return (
    <nav className="nav">
      <a className="nav-brand" href="/dashboard">The Agora <span>Project</span></a>
      <div className="nav-actions">
        <Link
          to="/guide"
          className="btn btn-outline"
          style={{
            padding: '6px 14px',
            fontSize: 12,
            color: 'rgba(255,255,255,.9)',
            borderColor: 'rgba(255,255,255,.3)',
            background: 'rgba(255,255,255,.08)'
          }}
        >
          Study Guide
        </Link>
        {isAdmin && (
          <Link
            to="/admin"
            className="btn btn-outline"
            style={{
              padding: '6px 14px',
              fontSize: 12,
              color: 'rgba(255,255,255,.9)',
              borderColor: 'rgba(255,255,255,.3)',
              background: 'rgba(255,255,255,.08)'
            }}
          >
            Admin
          </Link>
        )}
        <UserMenu profile={profile} />
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
  const [studied, setStudied] = useState({})
  const [studiedRows, setStudiedRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [startingTest, setStartingTest] = useState(false)
  const [addingPost, setAddingPost] = useState(null)
  const [postInput, setPostInput] = useState('')
  const [confirmStart, setConfirmStart] = useState(false)
  const [reviewItems, setReviewItems] = useState({})
  const [mistakes, setMistakes] = useState([])
  const [planText, setPlanText] = useState('')
  const [rebalancing, setRebalancing] = useState(false)
  const [satDate, setSatDate] = useState(() => loadSatTestDate(user?.id))

  useEffect(() => { setSatDate(loadSatTestDate(user?.id)) }, [user?.id])

  function hasViewedResultsForAttempt(attemptId) {
    if (!user?.id || !attemptId) return false
    try {
      const key = `agora_viewed_results_v1:${user.id}`
      const raw = localStorage.getItem(key)
      const obj = raw ? JSON.parse(raw) : {}
      return Boolean(obj?.[String(attemptId)])
    } catch {
      return false
    }
  }

  function computeScoresFromAnswers(attempt) {
    try {
      const keyBySection = getAnswerKeyBySection(attempt?.test_id) || null
      if (!keyBySection) return null
      const ans = attempt?.answers || {}
      const isChoiceLetter = (v) => {
        const s = String(v || '').trim().toUpperCase()
        return s === 'A' || s === 'B' || s === 'C' || s === 'D'
      }
      const scoreMod = (section, sectionAnswers) => {
        const key = keyBySection?.[section] || {}
        const total = Object.keys(key).length
        let correct = 0
        for (const [qStr, right] of Object.entries(key)) {
          const given = sectionAnswers?.[qStr]
          if (right == null) continue
          const ok = isChoiceLetter(right)
            ? String(given || '').toUpperCase() === String(right).toUpperCase()
            : freeResponseMatches(given, right)
          if (ok) correct++
        }
        return { correct, total }
      }
      const rwM1 = scoreMod('rw_m1', ans.rw_m1)
      const rwM2 = scoreMod('rw_m2', ans.rw_m2)
      const mM1 = scoreMod('math_m1', ans.math_m1)
      const mM2 = scoreMod('math_m2', ans.math_m2)
      const rawRW = (rwM1.correct || 0) + (rwM2.correct || 0)
      const rawMath = (mM1.correct || 0) + (mM2.correct || 0)
      return rawToScaled(rawRW, rawMath)
    } catch {
      return null
    }
  }

  useEffect(() => {
    if (!user) return
    Promise.all([
      supabase.from('test_attempts').select('*').eq('user_id', user.id).order('started_at', { ascending: false }),
      supabase.from('post_scores').select('*').eq('user_id', user.id).order('recorded_at', { ascending: false })
    ]).then(([a, p]) => {
      const rows = a.data || []
      setAttempts(rows)
      setPostScores(p.data || [])
      try {
        const firstCompleted = (rows || []).find(r => r.completed_at || r.scores?.total) || null
        setPlanText(firstCompleted?.study_plan || '')
      } catch {}
      getStudiedTopics(user.id).then(({ map, rows: stRows }) => {
        setStudied(map || {})
        setStudiedRows(stRows || [])
        loadReviewItems(user.id).then((r) => setReviewItems(r.items || {})).catch(() => {})
        loadMistakes(user.id).then((m) => setMistakes(m.items || [])).catch(() => {})
        setLoading(false)
      })

      // If an attempt was completed but scores didn't persist for some reason,
      // compute them client-side and patch the row (best-effort).
      const needsPatch = rows.filter(r => (r.completed_at || r.scores?.total) && (!r.scores || !r.scores.total) && r.answers && Object.keys(r.answers || {}).length)
      needsPatch.slice(0, 3).forEach(async (r) => {
        const computed = computeScoresFromAnswers(r)
        if (!computed?.total) return
        try {
          await supabase.from('test_attempts').update({ scores: computed }).eq('id', r.id)
          setAttempts(prev => (prev || []).map(x => x.id === r.id ? { ...x, scores: computed } : x))
        } catch {}
      })
    })
  }, [user])

  async function startNewTest(testId = 'pre_test') {
    if (testId === 'pre_test') {
      if (!confirmStart) { setConfirmStart(true); return }
      setConfirmStart(false)
    }
    setStartingTest(true)
    const payload = {
      user_id: user.id,
      test_id: testId,
      current_section: 'rw_m1',
      answers: {},
      module_time_remaining: { rw_m1: 1920, rw_m2: 1920, math_m1: 2100, math_m2: 2100 }
    }
    const res = await supabase.from('test_attempts').insert(payload).select().single()
    if (!res.error && res.data) navigate(`/test/${res.data.id}`)
    else {
      alert(res.error?.message || 'Could not start test. Please try again.')
      setStartingTest(false)
    }
  }

  async function savePostScore(attemptId) {
    const sc = parseInt(postInput)
    if (isNaN(sc) || sc < 400 || sc > 1600) return alert('Enter a valid score (400–1600)')
    const rw = Math.round(sc * 0.5 / 10) * 10
    const math = sc - rw
    const payload = { user_id: user.id, attempt_id: attemptId, post_score: sc, post_rw: rw, post_math: math }
    const ins = await supabase.from('post_scores').insert(payload)
    if (ins.error) alert(ins.error.message)
    const { data } = await supabase.from('post_scores').select('*').eq('user_id', user.id).order('recorded_at', { ascending: false })
    setPostScores(data || [])
    setAddingPost(null); setPostInput('')
  }

  const completed = attempts.filter(a => a.completed_at || a.scores?.total)
  const inProgress = attempts.filter(a => !a.completed_at)
  const latestCompleted = completed.length ? completed[0] : null
  const completedPre = completed.filter(a => a.test_id === 'pre_test' || a.test_id === 'practice_test_11')
  const preInProgress = inProgress.find(a => a.test_id === 'pre_test' || a.test_id === 'practice_test_11')
  const preTotals = completedPre.map(a => a.scores?.total || computeScoresFromAnswers(a)?.total || 0)
  const bestScore = preTotals.length ? Math.max(...preTotals) : null
  const latestPostScore = postScores[0]?.post_score
  const improvement = bestScore && latestPostScore ? latestPostScore - bestScore : null
  const studiedCount = Object.values(studied).filter(Boolean).length
  const studiedPct = Math.round((studiedCount / 34) * 100)
  const hasStartedGuide = (studiedRows || []).some((r) => {
    const g = r?.practice?.guide
    if (r?.practice?.meta?.guide_started_at) return true
    return g && typeof g === 'object' && Object.values(g).some(Boolean)
  })
  const hasStudyPlan = completed.some(a => a.study_plan)
  const extraTests = TESTS.filter(t => t.kind === 'extra')
  const completedExtra = completed.filter(a => extraTests.some(t => t.id === a.test_id))
  const hasTakenPretest = completedPre.length > 0
  const dueReviews = computeDueCount(reviewItems)
  const viewedLatestResults = latestCompleted ? hasViewedResultsForAttempt(latestCompleted.id) : false
  const latestMistakes = latestCompleted ? (mistakes || []).filter(m => String(m.attempt_id || '') === String(latestCompleted.id)) : []
  const latestValidated = latestMistakes.filter((m) => {
    const k = `${m.test_id}:${m.section}:${m.q_num}`
    return reviewItems?.[k]?.last_correct === true
  }).length
  const reviewJourneyStatus = (() => {
    const total = latestMistakes.length
    if (!hasTakenPretest) return 'LOCKED'
    if (total === 0) return 'DONE'
    if (latestValidated === 0) return 'NOT STARTED'
    if (latestValidated < total) return 'IN PROGRESS'
    return 'DONE'
  })()

  const trendAttempts = completed
    .map(a => ({ a, scores: a.scores?.total ? a.scores : (computeScoresFromAnswers(a) || a.scores || {}) }))
    .filter(x => x.scores?.total)
    .sort((x, y) => new Date(x.a.started_at).getTime() - new Date(y.a.started_at).getTime())

  const trendData = trendAttempts.length >= 2 ? {
    labels: trendAttempts.map(x => {
      const t = TESTS.find(tt => tt.id === (x.a.test_id === 'practice_test_11' ? 'pre_test' : x.a.test_id))
      const d = new Date(x.a.started_at).toLocaleDateString()
      return `${t?.label || x.a.test_id} · ${d}`
    }),
    datasets: [{
      label: 'Total Score',
      data: trendAttempts.map(x => x.scores.total),
      borderColor: '#1a2744',
      backgroundColor: 'rgba(26,39,68,.08)',
      pointBackgroundColor: '#f59e0b',
      tension: 0.25,
      fill: true,
    }]
  } : null

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
          <p style={{color:'#64748b',marginTop:4}}>Your Agora Project dashboard — track your SAT progress</p>
        </div>

        {/* Stats */}
	        <div className="stats-grid">
	          {[
	            { label: 'Tests Completed', val: completed.length, sub: `${inProgress.length} in progress`, dark: false },
	            { label: 'Best Pre-Test Score', val: bestScore || '—', sub: 'Pre Test', dark: false },
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

	        {/* Pre Test CTA (hidden after completion) */}
	        {(completedPre.length === 0 || preInProgress) && (
	          <div className="card" style={{marginBottom:24, background:'linear-gradient(135deg,#1a2744,#1e3a8a)', color:'white'}}>
	            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16}}>
	              <div>
	                <div style={{fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:800, marginBottom:4}}>
	                  📋 Pre Test
	                </div>
	                <div style={{fontSize:13, opacity:.7}}>
	                  4 modules · 120 questions · 2 hrs 14 min · Timed like the real SAT
	                </div>
	              </div>
	              {preInProgress ? (
	                <div style={{display:'flex', gap:10}}>
	                  <button className="btn" onClick={() => navigate(`/test/${preInProgress.id}`)}
	                    style={{background:'#f59e0b', color:'#1a2744', fontWeight:700}}>
	                    ▶ Resume
	                  </button>
	                </div>
	              ) : (
	                <button className="btn" onClick={() => startNewTest('pre_test')} disabled={startingTest}
	                  style={{background:'#f59e0b', color:'#1a2744', fontWeight:700}}>
	                  {startingTest ? <><span className="spinner" style={{borderTopColor:'#1a2744'}} /> Starting…</> : '🚀 Start Pre Test'}
	                </button>
	              )}
	            </div>
	            {confirmStart && (
	              <div style={{ marginTop: 14, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 14, padding: 14 }}>
	                <div style={{ fontWeight: 800, marginBottom: 6 }}>Ready to start?</div>
	                <div style={{ fontSize: 13, opacity: .8, lineHeight: 1.6 }}>
	                  This is a full timed test (about 2.5 hours with a break). Once you start, your timer runs.
	                </div>
	                <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
	                  <button className="btn" onClick={() => setConfirmStart(false)} style={{ background: 'rgba(255,255,255,.14)', color: 'white' }}>
	                    Cancel
	                  </button>
	                  <button className="btn" onClick={() => startNewTest('pre_test')} style={{ background: '#f59e0b', color: '#1a2744', fontWeight: 800 }}>
	                    ✅ Yes — Start Test
	                  </button>
	                </div>
	              </div>
	            )}
	          </div>
	        )}

        {/* Journey tracker + Study Guide */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6 }}>🗺 Journey Tracker</h2>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                Work through these steps to be ready for the final test. <b>Click the tiles</b> to jump to each step.
              </div>
            </div>
            <div style={{ minWidth: 260 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', fontWeight: 800 }}>
                <span>Study Progress</span>
                <span>{studiedCount}/34</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ height: '100%', width: `${Math.min(100, studiedPct)}%`, background: studiedPct >= 80 ? '#10b981' : studiedPct >= 40 ? '#f59e0b' : '#ef4444', transition: 'width .6s ease' }} />
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>{studiedPct}% complete</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12, marginTop: 16 }}>
            {(() => {
              const toReview = Math.max(0, (latestMistakes?.length || 0) - (latestValidated || 0))
              const steps = [
                {
                  title: '1) Take the Pretest',
                  status: hasTakenPretest ? 'DONE' : (preInProgress ? 'IN PROGRESS' : 'TODO'),
                  desc: 'Take the full timed Pre Test to set your baseline.',
                  onClick: () => {
                    if (preInProgress?.id) navigate(`/test/${preInProgress.id}`)
                    else startNewTest('pre_test')
                  },
                },
                {
                  title: '2) Study Plan',
                  status: !hasTakenPretest ? 'LOCKED' : (hasStudyPlan ? 'DONE' : 'TODO'),
                  desc: 'Set your SAT date and use the plan for guidance (updates after each test).',
                  onClick: () => {
                    const el = document.getElementById('study-plan-card')
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  },
                },
                {
                  title: '3) Review Results',
                  status: !hasTakenPretest ? 'LOCKED' : (viewedLatestResults ? 'DONE' : 'TODO'),
                  desc: latestCompleted?.id ? 'Open your most recent results and identify weak topics.' : 'Complete a test to unlock results.',
                  onClick: () => {
                    if (!latestCompleted?.id) return
                    navigate(`/results/${latestCompleted.id}`)
                  },
                },
                {
                  title: '4) Study Guide',
                  status: studiedCount >= 34 ? 'DONE' : (hasStartedGuide ? 'IN PROGRESS' : 'TODO'),
                  desc: 'Master chapters (25/25) to mark them complete.',
                  onClick: () => navigate('/guide'),
                },
                {
                  title: '5) Review Missed Questions',
                  status: !hasTakenPretest ? 'LOCKED' : reviewJourneyStatus,
                  desc: !hasTakenPretest
                    ? 'Take the Pre Test to generate your mistake list.'
                    : `To review: ${toReview} · Validated: ${latestValidated}/${latestMistakes.length}`,
                  onClick: () => navigate('/mistakes'),
                },
              ]

              const statusColor = (st) => (
                st === 'DONE' ? '#10b981'
                  : st === 'IN PROGRESS' ? '#f59e0b'
                    : st === 'NOT STARTED' ? '#ef4444'
                      : st === 'READY' ? '#1a2744'
                        : st === 'LOCKED' ? '#94a3b8'
                          : '#94a3b8'
              )

              return steps.map((s) => {
                const disabled = s.status === 'LOCKED'
                return (
                  <button
                    key={s.title}
                    onClick={s.onClick}
                    disabled={disabled}
                    style={{
                      textAlign: 'left',
                      border: '1px solid #e2e8f0',
                      borderRadius: 14,
                      padding: 14,
                      background: disabled ? '#f1f5f9' : '#f8fafc',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      opacity: disabled ? 0.7 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                      <div style={{ fontWeight: 900, color: '#1a2744' }}>{s.title}</div>
                      <div style={{ fontSize: 12, fontWeight: 900, color: statusColor(s.status) }}>{s.status}</div>
                    </div>
                    <div style={{ marginTop: 6, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</div>
                  </button>
                )
              })
            })()}
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={() => navigate('/report')} disabled={!hasTakenPretest}>
              Progress Report →
            </button>
            <button
              className="btn"
              onClick={() => startNewTest('final_test')}
              disabled={!(studiedCount >= 34 && hasTakenPretest)}
              style={{
                background: studiedCount >= 34 && hasTakenPretest ? '#10b981' : '#e2e8f0',
                color: studiedCount >= 34 && hasTakenPretest ? 'white' : '#64748b',
                fontWeight: 900,
              }}
              title={studiedCount >= 34 && hasTakenPretest ? 'Final test unlocked' : 'Complete the guide + pretest to unlock'}
            >
              🏁 Final Test
            </button>
          </div>
        </div>

        {/* Study plan guidance (auto-rebalances) */}
        {hasTakenPretest && (
          <div id="study-plan-card" className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6 }}>🗓 Study Plan</h2>
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                  Add your SAT date to generate a plan from now until <b>3 days before</b> your test.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748b', fontWeight: 900 }}>
                  Test date:
                  <input
                    type="date"
                    value={satDate || ''}
                    onChange={(e) => {
                      const v = e.target.value
                      setSatDate(v)
                      saveSatTestDate(user?.id, v)
                      if (!latestCompleted) return
                      try {
                        const prefs = loadStudyPrefs(user?.id)
                        const txt = buildStudyPlanToTestDate({
                          scores: latestCompleted?.scores || {},
                          weakTopics: latestCompleted?.weak_topics || [],
                          prefs,
                          testDate: v,
                        })
                        setPlanText(txt)
                        supabase
                          .from('test_attempts')
                          .update({ study_plan: txt })
                          .eq('id', latestCompleted.id)
                          .eq('user_id', user.id)
                          .catch(() => {})
                      } catch {}
                    }}
                    style={{ padding: '7px 10px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12, fontWeight: 900, color: '#0f172a', background: 'white' }}
                  />
                </label>
                <button
                  className="btn btn-outline"
                  disabled={!planText}
                  onClick={async () => {
                    try { await navigator.clipboard.writeText(String(planText || '')) } catch {}
                  }}
                >
                  Copy
                </button>
                <button
                  className="btn btn-primary"
                  disabled={rebalancing || !latestCompleted}
                  onClick={async () => {
                    if (!latestCompleted) return
                    setRebalancing(true)
                    try {
                      const prefs = loadStudyPrefs(user?.id)
                      const txt = buildStudyPlanToTestDate({
                        scores: latestCompleted?.scores || {},
                        weakTopics: latestCompleted?.weak_topics || [],
                        prefs,
                        testDate: satDate,
                      })
                      setPlanText(txt)
                      await supabase
                        .from('test_attempts')
                        .update({ study_plan: txt })
                        .eq('id', latestCompleted.id)
                        .eq('user_id', user.id)
                    } catch {
                      // no-op
                    }
                    setRebalancing(false)
                  }}
                >
                  {rebalancing ? 'Rebalancing…' : 'Rebalance now'}
                </button>
              </div>
            </div>

            <div style={{ marginTop: 12, border: '1px solid #e2e8f0', borderRadius: 14, background: '#f8fafc', padding: 14 }}>
              {planText ? (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace', fontSize: 12.5, lineHeight: 1.65, color: '#0f172a' }}>
                  {planText}
                </pre>
              ) : (
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                  Your study plan will appear here after you submit a test.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Optional extra practice tests (hidden until pretest is taken) */}
        {hasTakenPretest && extraTests.length > 0 && (
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6 }}>🧠 Extra Practice (Optional)</h2>
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                  These tests are optional skill builders. They’re not required, but they help reinforce your weak topics and track improvement.
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900 }}>
                Completed: {completedExtra.length}/{extraTests.length}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 14 }}>
              {extraTests.map(t => {
                const done = completed.some(a => a.test_id === t.id && (a.completed_at || a.scores?.total))
                const prog = inProgress.find(a => a.test_id === t.id)
                return (
                  <div key={t.id} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                      <div style={{ fontWeight: 900, color: '#1a2744' }}>{t.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 900, color: done ? '#10b981' : '#94a3b8' }}>
                        {done ? 'DONE' : prog ? 'IN PROGRESS' : 'OPTIONAL'}
                      </div>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {prog ? (
                        <button className="btn" style={{ background: '#1a2744', color: 'white', fontWeight: 900 }} onClick={() => navigate(`/test/${prog.id}`)}>
                          Resume →
                        </button>
                      ) : (
                        <button className="btn" style={{ background: '#1a2744', color: 'white', fontWeight: 900 }} onClick={() => startNewTest(t.id)}>
                          Start →
                        </button>
                      )}
                      {done && (
                        <button className="btn btn-outline" onClick={() => {
                          const last = completed.find(a => a.test_id === t.id)
                          if (last) navigate(`/results/${last.id}`)
                        }}>
                          View Results →
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

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
	                    {['Test', 'Date', 'R&W Score', 'Math Score', 'Total', 'Post-Test', 'Gain', ''].map(h => (
	                      <th key={h} style={{padding:'8px 12px', textAlign:'left', fontSize:11, color:'#64748b', fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px', background:'#f8fafc', borderBottom:'1px solid #e8ecf0'}}>
	                        {h}
	                      </th>
	                    ))}
	                  </tr>
	                </thead>
	                <tbody>
		                  {completed.map(a => {
		                    const rowScores = a.scores?.total ? a.scores : (computeScoresFromAnswers(a) || a.scores || {})
		                    const cfg = TESTS.find(t => t.id === (a.test_id === 'practice_test_11' ? 'pre_test' : a.test_id))
		                    const post = postScores.find(p => p.attempt_id === a.id)
		                    const gain = post ? post.post_score - (rowScores?.total || 0) : null
		                    return (
		                      <tr key={a.id} style={{borderBottom:'1px solid #f1f5f9'}}>
		                        <td style={{padding:'12px', fontWeight:800, color:'#1a2744'}}>{cfg?.label || a.test_id}</td>
		                        <td style={{padding:'12px'}}>{new Date(a.started_at).toLocaleDateString()}</td>
		                        <td style={{padding:'12px', fontWeight:700}}>{rowScores?.rw || '—'}</td>
		                        <td style={{padding:'12px', fontWeight:700}}>{rowScores?.math || '—'}</td>
	                        <td style={{padding:'12px', fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:16, color:'#1a2744'}}>{rowScores?.total || '—'}</td>
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

        {/* Score trend (hidden until pretest is taken) */}
        {hasTakenPretest && trendData && (
          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6 }}>📈 Your Improvement</h2>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>
              Track how your scores change across the Pre Test and optional skill builders.
            </div>
            <div style={{ height: 220 }}>
              <Line
                data={trendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { font: { family: 'DM Sans', size: 10 } }, grid: { display: false } },
                    y: { ticks: { font: { family: 'DM Sans', size: 10 } }, grid: { color: '#f1f5f9' } }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
