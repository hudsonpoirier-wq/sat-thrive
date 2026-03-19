import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { rawToScaled, answerMatches } from '../data/testData.js'
import { loadSatTestDate, loadStudyPrefs, normalizeWeakTopics, buildAdaptiveSchedule } from '../lib/studyPlan.js'
import { CHAPTERS } from '../data/testData.js'
import UserMenu from '../components/UserMenu.jsx'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import { TESTS } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { loadDashboardViewData, loadProfileSafe } from '../lib/dashboardData.js'
import { resolveViewContext, withViewUser } from '../lib/viewAs.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function Navbar({ viewUserId, isAdminPreview }) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const isAdmin = profile?.role === 'admin' && String(profile?.email || '').toLowerCase() === 'agora@admin.org'
  return (
    <nav className="nav">
      <BrandLink to={withViewUser('/dashboard', viewUserId, isAdminPreview)} />
      <div className="nav-actions">
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

function ScoreOverviewCard({ label, value, sub, icon, dark = false, to = '' }) {
  const content = (
    <div className={`stat-box${dark ? ' dark' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', height: '100%' }}>
      <div style={{
        width: 42,
        height: 42,
        borderRadius: 12,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark ? 'rgba(255,255,255,.14)' : 'rgba(14,165,233,.10)',
        color: dark ? 'white' : '#0f172a',
      }}>
        <Icon name={icon} size={20} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="stat-label">{label}</div>
        <div className="stat-num" style={{ fontSize: 22 }}>{value}</div>
        <div className="stat-sub">{sub}</div>
      </div>
    </div>
  )

  if (!to) return content
  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {content}
    </Link>
  )
}

function ScheduleTaskLink({ task, compact = false, stopParentClick = false }) {
  const accent = task.type === 'guide' ? '#1a2744' : task.type === 'mistakes' ? '#f59e0b' : '#0ea5e9'
  const icon = task.type === 'guide' ? 'guide' : task.type === 'mistakes' ? 'mistakes' : 'results'
  return (
    <Link
      to={task.href}
      onClick={stopParentClick ? (event) => event.stopPropagation() : undefined}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: compact ? '8px 10px' : '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        textDecoration: 'none',
        color: '#0f172a',
        background: 'white',
      }}
    >
      <span style={{
        width: compact ? 28 : 32,
        height: compact ? 28 : 32,
        borderRadius: 10,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${accent}14`,
        color: accent,
        flexShrink: 0,
      }}>
        <Icon name={icon} size={compact ? 15 : 16} />
      </span>
      <span style={{ minWidth: 0 }}>
        <div style={{ fontSize: compact ? 12 : 13, fontWeight: 900, color: '#1a2744', lineHeight: 1.35 }}>{task.title}</div>
        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginTop: 2 }}>{task.subtitle}</div>
      </span>
    </Link>
  )
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { viewUserId, isAdminPreview } = useMemo(
    () => resolveViewContext({ userId: user?.id, profile, search: location.search }),
    [user?.id, profile, location.search]
  )
  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [studied, setStudied] = useState({})
  const [studiedRows, setStudiedRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [startingTest, setStartingTest] = useState(false)
  const [addingPost, setAddingPost] = useState(null)
  const [postInput, setPostInput] = useState('')
  const [confirmStart, setConfirmStart] = useState(false)
  const [confirmExtraTestId, setConfirmExtraTestId] = useState(null)
  const [reviewItems, setReviewItems] = useState({})
  const [mistakes, setMistakes] = useState([])
  const [satDate, setSatDate] = useState(() => loadSatTestDate(viewUserId))
  const [studyPrefs, setStudyPrefs] = useState(() => loadStudyPrefs(viewUserId))
  const [targetProfile, setTargetProfile] = useState(null)

  useEffect(() => {
    setSatDate(loadSatTestDate(viewUserId))
    setStudyPrefs(loadStudyPrefs(viewUserId))
  }, [viewUserId])

  const displayProfile = isAdminPreview ? targetProfile : profile
  const readOnlyView = isAdminPreview
  const viewHref = (path) => withViewUser(path, viewUserId, isAdminPreview)

  function hasViewedResultsForAttempt(attemptId) {
    if (!viewUserId || !attemptId) return false
    try {
      const key = `agora_viewed_results_v1:${viewUserId}`
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
      const scoreMod = (section, sectionAnswers) => {
        const key = keyBySection?.[section] || {}
        const total = Object.keys(key).length
        let correct = 0
        for (const [qStr, right] of Object.entries(key)) {
          const given = sectionAnswers?.[qStr]
          if (right == null) continue
          const ok = answerMatches(given, right)
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
    if (!user || !viewUserId) return
    let cancelled = false

    async function loadDashboardData() {
      setLoading(true)
      try {
        const [dataRes, previewRes] = await Promise.allSettled([
          loadDashboardViewData(viewUserId),
          isAdminPreview ? loadProfileSafe(viewUserId) : Promise.resolve(null),
        ])

        const data = dataRes.status === 'fulfilled' ? dataRes.value : null
        const previewProfile = previewRes.status === 'fulfilled' ? previewRes.value : null
        const rows = data?.attempts || []
        const posts = data?.postScores || []

        if (cancelled) return

        setAttempts(rows)
        setPostScores(posts)
        setTargetProfile(previewProfile || null)
        setStudied(data?.studiedMap || {})
        setStudiedRows(data?.studiedRows || [])
        setReviewItems(data?.reviewItems || {})
        setMistakes(data?.mistakes || [])

        if (readOnlyView) return
        const needsPatch = rows.filter(r => (r.completed_at || r.scores?.total) && (!r.scores || !r.scores.total) && r.answers && Object.keys(r.answers || {}).length)
        needsPatch.slice(0, 3).forEach(async (r) => {
          const computed = computeScoresFromAnswers(r)
          if (!computed?.total) return
          try {
            await supabase.from('test_attempts').update({ scores: computed }).eq('id', r.id)
            if (cancelled) return
            setAttempts(prev => (prev || []).map(x => x.id === r.id ? { ...x, scores: computed } : x))
          } catch {}
        })
      } catch {
        if (cancelled) return
        setAttempts([])
        setPostScores([])
        setStudied({})
        setStudiedRows([])
        setReviewItems({})
        setMistakes([])
        setTargetProfile(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadDashboardData()

    return () => {
      cancelled = true
    }
  }, [user, viewUserId, isAdminPreview, readOnlyView])

  async function startNewTest(testId = 'pre_test') {
    if (readOnlyView) return
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
    if (readOnlyView) return
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
  const completedWithScores = completed
    .map((attempt) => ({ attempt, scores: attempt.scores?.total ? attempt.scores : (computeScoresFromAnswers(attempt) || attempt.scores || {}) }))
    .filter((entry) => entry.scores?.total)
  const fullLengthRecords = completedWithScores.filter(({ attempt }) => {
    const cfg = TESTS.find((t) => t.id === (attempt.test_id === 'practice_test_11' ? 'pre_test' : attempt.test_id))
    return cfg && cfg.kind !== 'extra'
  })
  const bestSatRecord = completedWithScores.reduce((best, entry) => {
    if (!best) return entry
    return Number(entry.scores.total || 0) > Number(best.scores.total || 0) ? entry : best
  }, null)
  const highestTestRecord = fullLengthRecords.reduce((best, entry) => {
    if (!best) return entry
    return Number(entry.scores.total || 0) > Number(best.scores.total || 0) ? entry : best
  }, null)
  const mostRecentRecord = completedWithScores[0] || null
  const latestPostScore = postScores[0]?.post_score
  const improvement = bestScore && latestPostScore ? latestPostScore - bestScore : null
  const studiedCount = Object.values(studied).filter(Boolean).length
  const studiedPct = Math.round((studiedCount / 34) * 100)
  const hasStartedGuide = (studiedRows || []).some((r) => {
    const g = r?.practice?.guide
    if (r?.practice?.meta?.guide_started_at) return true
    return g && typeof g === 'object' && Object.values(g).some(Boolean)
  })
  const hasStudyPlan = Boolean(satDate)
  const extraTests = TESTS.filter(t => t.kind === 'extra')
  const completedExtra = completed.filter(a => extraTests.some(t => t.id === a.test_id))
  const hasTakenPretest = completedPre.length > 0
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
  const reviewTodoCount = Math.max(0, (latestMistakes?.length || 0) - (latestValidated || 0))

  const journeySchedule = useMemo(() => {
    if (!hasTakenPretest || !latestCompleted) return null
    const schedule = buildAdaptiveSchedule({
      weakTopics: deriveWeakTopicsForAttempt(latestCompleted),
      studiedMap: studied,
      reviewCount: reviewTodoCount,
      hasViewedResults: viewedLatestResults,
      hasTakenPretest: true,
      prefs: studyPrefs,
      testDate: satDate,
    })
    return {
      ...schedule,
      days: (schedule?.days || []).map((day) => ({
        ...day,
        tasks: (day.tasks || []).map((task) => {
          const href = task.type === 'results' ? `/results/${latestCompleted.id}` : task.href
          return { ...task, href: viewHref(href) }
        }),
      })),
    }
  }, [hasTakenPretest, latestCompleted, studied, reviewTodoCount, viewedLatestResults, studyPrefs, satDate, mistakes, viewHref])

  const scheduleDayCards = useMemo(() => {
    const days = journeySchedule?.days || []
    if (!days.length) return []
    const primary = days.filter((day) => day.isActive && day.tasks.length > 0)
    const fallback = days.filter((day) => day.isActive || day.tasks.length > 0)
    return (primary.length ? primary : fallback).slice(0, 3)
  }, [journeySchedule])

  function scheduleCardTitle(day, idx) {
    if (idx === 0 && day?.isToday) return 'Today'
    if (idx === 0) return 'Next Study Day'
    if (idx === 1) return 'Following Study Day'
    return 'Coming Up'
  }

  useEffect(() => {
    setConfirmExtraTestId(null)
  }, [hasTakenPretest])

  function deriveWeakTopicsForAttempt(attempt) {
    const normalized = normalizeWeakTopics(attempt?.weak_topics || [])
    if (normalized.length) return normalized
    const list = (mistakes || [])
      .filter((m) => String(m.attempt_id || '') === String(attempt?.id || '') && m.chapter_id)
    const counts = {}
    for (const m of list) {
      const ch = String(m.chapter_id)
      counts[ch] = (counts[ch] || 0) + 1
    }
    return Object.entries(counts)
      .map(([ch, count]) => ({ ...(CHAPTERS?.[ch] || {}), ch, count }))
      .filter((t) => t.ch && Number(t.count) > 0)
      .sort((a, b) => (Number(b.count) || 0) - (Number(a.count) || 0))
  }

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
    <Navbar viewUserId={viewUserId} isAdminPreview={isAdminPreview} />
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'calc(100vh - 60px)',color:'#64748b'}}>Loading…</div>
  </>

  return (
    <>
      <Navbar viewUserId={viewUserId} isAdminPreview={isAdminPreview} />
      <div className="page fade-up">
        {isAdminPreview && (
          <div className="card" style={{ marginBottom: 18, background: 'linear-gradient(135deg, rgba(26,39,68,.96), rgba(30,58,138,.94))', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>Admin View</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.88 }}>
                  You’re previewing {displayProfile?.full_name || 'this student'}’s dashboard. Troubleshooting links work, but data-changing actions are read-only here.
                </div>
              </div>
              <Link className="btn btn-outline" to="/admin" style={{ color: 'white', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}>
                Back to Admin
              </Link>
            </div>
          </div>
        )}

        {/* Welcome */}
        <div style={{marginBottom:28}}>
          <h1 style={{fontFamily:'Sora,sans-serif',fontSize:26,fontWeight:800,color:'#1a2744'}}>
            {`Hey there ${displayProfile?.full_name?.split(' ')[0] || 'there'}!`}
          </h1>
          <p style={{color:'#64748b',marginTop:4}}>Your Agora Project dashboard — track your SAT progress</p>
        </div>

        {/* Score overview */}
	        <div className="stats-grid">
            <ScoreOverviewCard
              label="Best SAT Score"
              value={bestSatRecord?.scores?.total || '—'}
              sub={bestSatRecord ? `${TESTS.find((t) => t.id === (bestSatRecord.attempt.test_id === 'practice_test_11' ? 'pre_test' : bestSatRecord.attempt.test_id))?.label || 'Completed test'}` : 'All-time high'}
              icon="sparkle"
              dark={Boolean(bestSatRecord?.scores?.total)}
              to={bestSatRecord ? viewHref(`/results/${bestSatRecord.attempt.id}`) : ''}
            />
            <ScoreOverviewCard
              label="Highest Test"
              value={highestTestRecord?.scores?.total || '—'}
              sub={highestTestRecord ? `${TESTS.find((t) => t.id === (highestTestRecord.attempt.test_id === 'practice_test_11' ? 'pre_test' : highestTestRecord.attempt.test_id))?.label || 'Highest full-length test'}` : 'No full-length test recorded yet'}
              icon="test"
              to={highestTestRecord ? viewHref(`/results/${highestTestRecord.attempt.id}`) : ''}
            />
            <ScoreOverviewCard
              label="Most Recent Test"
              value={mostRecentRecord?.scores?.total || '—'}
              sub={mostRecentRecord ? `${TESTS.find((t) => t.id === (mostRecentRecord.attempt.test_id === 'practice_test_11' ? 'pre_test' : mostRecentRecord.attempt.test_id))?.label || 'Latest test'} · ${new Date(mostRecentRecord.attempt.started_at).toLocaleDateString()}` : 'No completed attempt yet'}
              icon="results"
              to={mostRecentRecord ? viewHref(`/results/${mostRecentRecord.attempt.id}`) : ''}
            />
            <ScoreOverviewCard
              label="Total Improvement"
              value={improvement ? `+${improvement}` : '—'}
              sub={improvement ? 'Post-test minus best pre-test' : `${completed.length} completed · ${inProgress.length} in progress`}
              icon="chart"
              dark={Boolean(improvement)}
            />
        </div>

	        {/* Pre Test CTA (hidden after completion) */}
	        {(completedPre.length === 0 || preInProgress) && (
	          <div className="card" style={{marginBottom:24, background:'linear-gradient(135deg,#1a2744,#1e3a8a)', color:'white'}}>
	            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16}}>
	              <div>
	                <div style={{fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:800, marginBottom:4, display: 'flex', alignItems: 'center', gap: 8}}>
	                  <Icon name="test" size={18} />
	                  Pre Test
	                </div>
	                <div style={{fontSize:13, opacity:.7}}>
	                  4 modules · 120 questions · 2 hrs 14 min · Timed like the real SAT
	                </div>
	              </div>
	              {preInProgress ? (
	                <div style={{display:'flex', gap:10}}>
	                  <button className="btn" disabled={readOnlyView} onClick={() => navigate(`/test/${preInProgress.id}`)}
	                    style={{background:'#f59e0b', color:'#1a2744', fontWeight:700}}>
	                    {readOnlyView ? 'Preview only' : '▶ Resume'}
	                  </button>
	                </div>
	              ) : (
	                <button className="btn" onClick={() => startNewTest('pre_test')} disabled={startingTest || readOnlyView}
	                  style={{background:'#f59e0b', color:'#1a2744', fontWeight:700}}>
	                  {readOnlyView ? 'Preview only' : startingTest ? <><span className="spinner" style={{borderTopColor:'#1a2744'}} /> Starting…</> : 'Start Pre Test'}
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
	                  <button className="btn" onClick={() => startNewTest('pre_test')} disabled={readOnlyView} style={{ background: '#f59e0b', color: '#1a2744', fontWeight: 800 }}>
	                    {readOnlyView ? 'Preview only' : 'Start Test'}
	                  </button>
	                </div>
	              </div>
	            )}
	          </div>
	        )}

        {/* Today / work-ahead */}
        {hasTakenPretest && journeySchedule && (
          <div id="today-tasks-card" className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="task" size={18} />
                  Today’s Tasks
                </h2>
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                  Your schedule adapts automatically based on what is still unfinished. You can also work ahead by opening tomorrow’s tasks early.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="calendar" size={16} />
                  {journeySchedule.hasTestDate ? 'Calendar runs through 3 days before your test.' : 'Set a test date to expand the full calendar.'}
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate(viewHref('/calendar'))}
                  style={{ padding: '8px 12px', fontSize: 12 }}
                >
                  Edit Test Date &amp; Availability
                </button>
                <Link className="btn btn-outline" to={viewHref('/calendar')} style={{ padding: '8px 12px', fontSize: 12 }}>
                  View Calendar →
                </Link>
              </div>
            </div>

            {journeySchedule.needsMoreTime && (
              <div style={{ marginBottom: 14, padding: 12, borderRadius: 12, background: 'rgba(245,158,11,.10)', border: '1px solid rgba(245,158,11,.28)', color: '#92400e', fontSize: 13, lineHeight: 1.6 }}>
                Based on your remaining work and availability, plan for <b>about {journeySchedule.requiredMinutesPerDay} minutes on each study day</b> to stay on track. If that feels too heavy, add more available days or move your test date back.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
              {scheduleDayCards.map((day, idx) => (
                <div
                  key={day.key}
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(viewHref(`/calendar?day=${encodeURIComponent(day.key)}`))}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      navigate(viewHref(`/calendar?day=${encodeURIComponent(day.key)}`))
                    }
                  }}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 14,
                    padding: 14,
                    background: idx === 0 ? 'linear-gradient(135deg, rgba(14,165,233,.10), rgba(99,102,241,.10))' : '#f8fafc',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 900, color: '#1a2744' }}>
                        {scheduleCardTitle(day, idx)}
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{day.label}</div>
                    </div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 900,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: day.focus === 'Reading' ? 'rgba(59,130,246,.12)' : day.focus === 'Math' ? 'rgba(16,185,129,.12)' : 'rgba(148,163,184,.14)',
                      color: day.focus === 'Reading' ? '#2563eb' : day.focus === 'Math' ? '#059669' : '#64748b',
                    }}>
                      {day.focus}
                    </div>
                  </div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 800, marginBottom: 10 }}>
                    {day.estimatedMinutes ? `Planned for about ${day.estimatedMinutes} minutes · ` : ''}Missed work automatically rolls into your next available study day.
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {day.tasks.length ? day.tasks.map((task) => (
                      <ScheduleTaskLink key={task.id} task={task} compact stopParentClick />
                    )) : (
                      <div style={{ padding: '12px', border: '1px dashed #cbd5e1', borderRadius: 12, color: '#64748b', fontSize: 12, lineHeight: 1.6 }}>
                        No assigned tasks for this day. Use it as a catch-up or light review day.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Journey tracker + Study Guide */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="task" size={18} />
                Smart Journey
              </h2>
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

          <div className="journey-grid" style={{ marginTop: 16 }}>
            {(() => {
              const toReview = Math.max(0, (latestMistakes?.length || 0) - (latestValidated || 0))
              const steps = [
                {
                  title: '1) Take the Pretest',
                  status: hasTakenPretest ? 'DONE' : (preInProgress ? 'IN PROGRESS' : 'TODO'),
                  desc: 'Take the full timed Pre Test to set your baseline.',
                  onClick: () => {
                    if (readOnlyView) return
                    if (preInProgress?.id) navigate(`/test/${preInProgress.id}`)
                    else startNewTest('pre_test')
                  },
                },
                {
                  title: '2) Study Plan',
                  status: !hasTakenPretest ? 'LOCKED' : (hasStudyPlan ? 'DONE' : 'TODO'),
                  desc: 'Set your SAT date (or best estimate) and use the plan for guidance (updates after each test).',
                  onClick: () => navigate(viewHref('/calendar')),
                },
                {
                  title: '3) Review Results',
                  status: !hasTakenPretest ? 'LOCKED' : (viewedLatestResults ? 'DONE' : 'TODO'),
                  desc: latestCompleted?.id ? 'Open your most recent results and identify weak topics.' : 'Complete a test to unlock results.',
                  onClick: () => {
                    if (!latestCompleted?.id) return
                    navigate(viewHref(`/results/${latestCompleted.id}`))
                  },
                },
                {
                  title: '4) Review Missed Questions',
                  status: !hasTakenPretest ? 'LOCKED' : reviewJourneyStatus,
                  desc: !hasTakenPretest
                    ? 'Take the Pre Test to generate your mistake list.'
                    : `To review: ${toReview} · Validated: ${latestValidated}/${latestMistakes.length}`,
                  onClick: () => navigate(viewHref('/mistakes')),
                },
                {
                  title: '5) Study Guide',
                  status: studiedCount >= 34 ? 'DONE' : (hasStartedGuide ? 'IN PROGRESS' : 'TODO'),
                  desc: 'Master chapters (25/25) to mark them complete.',
                  onClick: () => navigate(viewHref('/guide')),
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
	            <button className="btn btn-outline" onClick={() => navigate(viewHref('/report'))} disabled={!hasTakenPretest}>
	              Progress Report →
	            </button>
	            {(() => {
	              const unlocked = studiedCount >= 34 && hasTakenPretest
	              return (
	            <button
	              className="btn"
	              onClick={() => startNewTest('final_test')}
	              disabled={!unlocked || readOnlyView}
	              style={{
	                background: unlocked ? '#10b981' : '#e2e8f0',
	                color: unlocked ? 'white' : '#64748b',
	                fontWeight: 900,
	              }}
	              title={unlocked ? 'Final test unlocked' : 'Finish the Journey Tracker to unlock the Final Test'}
	            >
	              {unlocked ? 'Final Test' : 'Final Test (Unlocks after Journey Tracker)'}
	            </button>
	              )
	            })()}
	          </div>
	          {!(studiedCount >= 34 && hasTakenPretest) && (
	            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: '#64748b' }}>
	              The <b>Final Test unlocks automatically</b> once you complete the Journey Tracker (Pre Test + review results + review missed questions + complete the Study Guide).
	            </div>
	          )}
	        </div>

        {/* Optional extra practice */}
        {hasTakenPretest && (
          <>
            {extraTests.length > 0 && (
              <div className="card dashboard-practice-card" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon name="sparkle" size={18} />
                      Extra Practice (Optional)
                    </h2>
                    <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                      Optional skill builders to reinforce weak topics and track improvement.
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900 }}>
                    Completed: {completedExtra.length}/{extraTests.length}
                  </div>
                </div>

                <div className="dashboard-practice-grid" style={{ '--practice-count': extraTests.length }}>
                  {extraTests.map((t) => {
                    const done = completed.some((a) => a.test_id === t.id && (a.completed_at || a.scores?.total))
                    const prog = inProgress.find((a) => a.test_id === t.id)
                    return (
                      <div key={t.id} className="dashboard-practice-tile">
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                          <div style={{ fontWeight: 900, color: '#1a2744', minWidth: 0, overflowWrap: 'anywhere' }}>{t.label}</div>
                          <div style={{ fontSize: 12, fontWeight: 900, color: done ? '#10b981' : '#94a3b8', whiteSpace: 'nowrap' }}>
                            {done ? 'DONE' : prog ? 'IN PROGRESS' : 'OPTIONAL'}
                          </div>
                        </div>
                        <div className="dashboard-practice-actions">
                          {prog ? (
                            <button className="btn" style={{ background: '#1a2744', color: 'white', fontWeight: 900 }} disabled={readOnlyView} onClick={() => navigate(`/test/${prog.id}`)}>
                              {readOnlyView ? 'Preview only' : 'Resume →'}
                            </button>
                          ) : (
                            <>
                              <button
                                className="btn"
                                style={{ background: '#1a2744', color: 'white', fontWeight: 900 }}
                                disabled={readOnlyView}
                                onClick={() => setConfirmExtraTestId((prev) => (prev === t.id ? null : t.id))}
                              >
                                {readOnlyView ? 'Preview only' : 'Start →'}
                              </button>
                              {confirmExtraTestId === t.id && (
                                <div style={{ marginTop: 10, width: '100%', background: 'rgba(255,255,255,.65)', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 }}>
                                  <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>Start this optional test now?</div>
                                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                                    This is optional, but it helps reinforce weak topics and track improvement.
                                  </div>
                                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                                    <button className="btn btn-outline" style={{ padding: '8px 12px' }} onClick={() => setConfirmExtraTestId(null)}>
                                      Cancel
                                    </button>
                                    <button
                                      className="btn"
                                      style={{ background: '#1a2744', color: 'white', fontWeight: 900, padding: '8px 12px' }}
                                      onClick={() => {
                                        setConfirmExtraTestId(null)
                                        startNewTest(t.id)
                                      }}
                                    >
                                      Start
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          {done && (
                            <button
                              className="btn btn-outline"
                              onClick={() => {
                                const last = completed.find((a) => a.test_id === t.id)
                                if (last) navigate(viewHref(`/results/${last.id}`))
                              }}
                            >
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
          </>
        )}

        {/* Completed tests */}
        {completed.length > 0 && (
          <div className="card">
            <h2 style={{fontFamily:'Sora,sans-serif', fontSize:16, fontWeight:700, marginBottom:16}}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Icon name="results" size={18} />
                Your Test Results
              </span>
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
                              <button onClick={() => savePostScore(a.id)} style={{padding:'5px 10px', background:'#10b981', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12}}>Save</button>
                              <button onClick={() => setAddingPost(null)} style={{padding:'5px 8px', background:'#f1f5f9', border:'none', borderRadius:7, cursor:'pointer', fontSize:12}}>Cancel</button>
                            </div>
                          ) : post ? (
                            <span style={{fontFamily:'Sora,sans-serif', fontWeight:800, color:'#10b981'}}>{post.post_score}</span>
                          ) : (
                            <button onClick={() => setAddingPost(a.id)}
                              disabled={readOnlyView}
                              style={{padding:'4px 10px', background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:7, fontSize:12, cursor:'pointer', color:'#475569'}}>
                              {readOnlyView ? 'Preview only' : '+ Add'}
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
                          <Link to={viewHref(`/results/${a.id}`)} style={{fontSize:12, color:'#1a2744', fontWeight:600}}>
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
            <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="chart" size={18} />
              Your Improvement
            </h2>
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
