import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import ExamSwitcher from '../components/ExamSwitcher.jsx'
import TopResourceNav from '../components/TopResourceNav.jsx'
import UserMenu from '../components/UserMenu.jsx'
import { loadDashboardViewData } from '../lib/dashboardData.js'
import { TESTS, getTestsForExam, getExamFromTestId, normalizeTestId } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import {
  getChaptersForExam,
  getExamConfig,
  getScoreColumnsForExam,
  scoreAttemptFromKey,
  calcWeakTopicsForTest,
} from '../data/examData.js'
import { resolveViewContext, withExam, withViewUser } from '../lib/viewAs.js'
import { chooseDashboardExam } from '../lib/examChoice.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function Navbar({ viewUserId, isAdminPreview, currentExam }) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const satHref = withViewUser(withExam('/dashboard', 'sat'), viewUserId, isAdminPreview)
  const actHref = withViewUser(withExam('/dashboard', 'act'), viewUserId, isAdminPreview)
  const calendarHref = withViewUser(withExam('/calendar', currentExam), viewUserId, isAdminPreview)
  const guideHref = withViewUser(withExam('/guide', currentExam), viewUserId, isAdminPreview)
  const mistakesHref = withViewUser(withExam('/mistakes', currentExam), viewUserId, isAdminPreview)
  const dashboardHref = withViewUser(withExam('/dashboard', currentExam), viewUserId, isAdminPreview)
  return (
    <nav className="nav">
      <BrandLink to={dashboardHref} />
      <div className="nav-actions">
        <TopResourceNav calendarHref={calendarHref} guideHref={guideHref} mistakesHref={mistakesHref} />
        <ExamSwitcher currentExam={currentExam} satHref={satHref} actHref={actHref} />
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
          style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}
          title="Go back"
        >
          ← Back
        </button>
        <Link to={dashboardHref} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
          Dashboard
        </Link>
        <UserMenu profile={profile} />
        <button className="btn btn-outline" onClick={() => signOut().then(() => navigate('/login'))}
          style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
          Sign Out
        </button>
      </div>
    </nav>
  )
}

function computeScoresFromAnswers(attempt) {
  try {
    const keyBySection = getAnswerKeyBySection(attempt?.test_id) || null
    if (!keyBySection) return null
    return scoreAttemptFromKey(attempt?.test_id, attempt?.answers || {}, keyBySection)
  } catch {
    return null
  }
}

function computeWeakTopics(attempt) {
  try {
    if (Array.isArray(attempt?.weak_topics) && attempt.weak_topics.length) return attempt.weak_topics
    const tid = normalizeTestId(attempt?.test_id)
    const keyBySection = getAnswerKeyBySection(tid) || {}
    return calcWeakTopicsForTest(tid, attempt?.answers || {}, keyBySection)
  } catch {
    return []
  }
}

export default function Overview() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = useMemo(() => new URLSearchParams(location.search || ''), [location.search])
  const requestedExam = String(searchParams.get('exam') || '').toLowerCase()
  const { viewUserId, isAdminPreview } = useMemo(
    () => resolveViewContext({ userId: user?.id, profile, search: location.search }),
    [user?.id, profile, location.search]
  )

  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [studied, setStudied] = useState({})
  const [studiedRows, setStudiedRows] = useState([])
  const [mistakes, setMistakes] = useState([])
  const [reviewItems, setReviewItems] = useState({})
  const [loading, setLoading] = useState(true)

  const chosenExam = chooseDashboardExam({ user, attempts, explicitExam: requestedExam })
  const exam = requestedExam === 'act' || requestedExam === 'sat' ? requestedExam : chosenExam
  const examConfig = getExamConfig(exam)
  const examTests = getTestsForExam(exam)
  const chaptersForExam = getChaptersForExam(exam)
  const scoreColumns = getScoreColumnsForExam(exam)
  const viewHref = (path) => withViewUser(withExam(path, exam), viewUserId, isAdminPreview)

  useEffect(() => {
    if (!user || !viewUserId) return
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const data = await loadDashboardViewData(viewUserId)
        if (cancelled) return
        setAttempts(data?.attempts || [])
        setPostScores(data?.postScores || [])
        setStudied(data?.studiedMap || {})
        setStudiedRows(data?.studiedRows || [])
        setMistakes(data?.mistakes || [])
        setReviewItems(data?.reviewItems || {})
      } catch {
        if (cancelled) return
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user, viewUserId])

  const examAttemptIds = new Set(examTests.map((t) => t.id))
  const examAttempts = attempts.filter((a) => examAttemptIds.has(normalizeTestId(a?.test_id)))
  const completed = examAttempts.filter((a) => a.completed_at || a.scores?.total)
  const completedWithScores = completed
    .map((attempt) => ({
      attempt,
      scores: attempt.scores?.total ? attempt.scores : (computeScoresFromAnswers(attempt) || attempt.scores || {}),
    }))
    .filter((e) => e.scores?.total)

  const studiedForExam = Object.fromEntries(Object.entries(studied || {}).filter(([ch]) => Boolean(chaptersForExam?.[ch])))
  const studiedCount = Object.values(studiedForExam).filter(Boolean).length
  const studiedPct = Math.round((studiedCount / Math.max(1, examConfig.guideCompletionTarget)) * 100)
  const mistakesForExam = (mistakes || []).filter((m) => getExamFromTestId(m?.test_id) === exam)
  const validatedCount = mistakesForExam.filter((m) => {
    const k = `${m.test_id}:${m.section}:${m.q_num}`
    return reviewItems?.[k]?.last_correct === true
  }).length

  // Best, lowest, most recent
  const best = completedWithScores.reduce((b, e) => (!b || Number(e.scores.total) > Number(b.scores.total) ? e : b), null)
  const lowest = completedWithScores.reduce((b, e) => (!b || Number(e.scores.total) < Number(b.scores.total) ? e : b), null)
  const recent = completedWithScores[0] || null
  const improvement = recent && lowest ? Number(recent.scores.total) - Number(lowest.scores.total) : null

  // Section averages
  const sectionAvgs = useMemo(() => {
    const cols = scoreColumns.filter((c) => c.key !== 'total')
    return cols.map((col) => {
      const vals = completedWithScores.map((e) => Number(e.scores[col.key] || 0)).filter((v) => v > 0)
      const avg = vals.length ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length) : null
      return { label: col.label, key: col.key, avg }
    })
  }, [completedWithScores, scoreColumns])

  // Score trend data
  const trendData = useMemo(() => {
    const sorted = [...completedWithScores].reverse()
    return {
      labels: sorted.map((e) => {
        const t = TESTS.find((x) => x.id === normalizeTestId(e.attempt.test_id))
        return t?.shortLabel || t?.label || 'Test'
      }),
      datasets: [{
        label: exam === 'act' ? 'ACT Composite' : 'SAT Total',
        data: sorted.map((e) => Number(e.scores.total || e.scores.composite || 0)),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14,165,233,.15)',
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#0ea5e9',
      }],
    }
  }, [completedWithScores, exam])

  // Section trend data
  const sectionTrendData = useMemo(() => {
    const sorted = [...completedWithScores].reverse()
    const cols = scoreColumns.filter((c) => c.key !== 'total')
    const colors = ['#2563eb', '#10b981', '#8b5cf6', '#f97316']
    return {
      labels: sorted.map((e) => {
        const t = TESTS.find((x) => x.id === normalizeTestId(e.attempt.test_id))
        return t?.shortLabel || t?.label || 'Test'
      }),
      datasets: cols.map((col, i) => ({
        label: col.label,
        data: sorted.map((e) => Number(e.scores[col.key] || 0)),
        borderColor: colors[i % colors.length],
        backgroundColor: `${colors[i % colors.length]}22`,
        tension: 0.3,
        pointRadius: 4,
      })),
    }
  }, [completedWithScores, scoreColumns])

  // Top weak topics (aggregated across all completed attempts)
  const topWeakTopics = useMemo(() => {
    const counts = {}
    for (const { attempt } of completedWithScores) {
      const weak = computeWeakTopics(attempt)
      for (const topic of weak) {
        const ch = String(topic.ch || '')
        if (!ch) continue
        if (!counts[ch]) counts[ch] = { ...topic, ch, count: 0 }
        counts[ch].count += Number(topic.count || 1)
      }
    }
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 8)
  }, [completedWithScores])

  // Test history table
  const testHistory = useMemo(() => {
    return completedWithScores.map(({ attempt, scores }) => {
      const test = TESTS.find((t) => t.id === normalizeTestId(attempt.test_id))
      return {
        id: attempt.id,
        label: test?.label || 'Test',
        date: attempt.started_at ? new Date(attempt.started_at).toLocaleDateString() : '—',
        total: scores.total || scores.composite || '—',
        sections: scoreColumns.filter((c) => c.key !== 'total').map((c) => ({ label: c.label, val: scores[c.key] || '—' })),
      }
    })
  }, [completedWithScores, scoreColumns])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'transparent' }}>
        <Navbar viewUserId={viewUserId} isAdminPreview={isAdminPreview} currentExam={exam} />
        <div className="page fade-up" style={{ textAlign: 'center', paddingTop: 80, color: '#64748b' }}>Loading...</div>
      </div>
    )
  }

  const statBoxStyle = { display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }
  const iconBoxStyle = {
    width: 40, height: 40, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(14,165,233,.10)', color: '#0f172a',
  }
  const darkIconBoxStyle = { ...iconBoxStyle, background: 'rgba(255,255,255,.12)', color: 'white' }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar viewUserId={viewUserId} isAdminPreview={isAdminPreview} currentExam={exam} />
      <div className="page fade-up">
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="chart" size={22} />
            My {exam.toUpperCase()} Overview
          </h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Your complete {exam.toUpperCase()} performance stats and progress</p>
        </div>

        {/* KPI Grid */}
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          {[
            { label: 'Tests Completed', val: completed.length, icon: 'check', dark: false },
            { label: exam === 'act' ? 'Best Composite' : 'Best Score', val: best ? best.scores.total : '—', icon: 'sparkle', dark: Boolean(best) },
            { label: 'Most Recent', val: recent ? recent.scores.total : '—', icon: 'results', dark: false },
            { label: 'Improvement', val: improvement !== null ? `${improvement > 0 ? '+' : ''}${improvement}` : '—', icon: 'trend', dark: improvement !== null && improvement > 0 },
            ...sectionAvgs.map((s) => ({ label: `Avg ${s.label}`, val: s.avg ?? '—', icon: 'target', dark: false })),
            { label: 'Guide Progress', val: `${studiedPct}%`, icon: 'guide', dark: false },
            { label: 'Mistakes Reviewed', val: `${validatedCount}/${mistakesForExam.length}`, icon: 'mistakes', dark: validatedCount === mistakesForExam.length && mistakesForExam.length > 0 },
          ].map((s) => (
            <div key={s.label} className={`stat-box${s.dark ? ' dark' : ''}`} style={statBoxStyle}>
              <div style={s.dark ? darkIconBoxStyle : iconBoxStyle}>
                <Icon name={s.icon} size={20} />
              </div>
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-num" style={{ fontSize: 22 }}>{s.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Score Trend Chart */}
        {completedWithScores.length >= 2 && (
          <div className="card" style={{ marginBottom: 18 }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="chart" size={17} />
              Score Trend
            </h3>
            <div style={{ height: 220 }}>
              <Line data={trendData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 } } } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 10 } } },
                  y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 10 } }, beginAtZero: false },
                },
              }} />
            </div>
          </div>
        )}

        {/* Section Breakdown Trend */}
        {completedWithScores.length >= 2 && sectionAvgs.length > 1 && (
          <div className="card" style={{ marginBottom: 18 }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="results" size={17} />
              Section Scores Over Time
            </h3>
            <div style={{ height: 220 }}>
              <Line data={sectionTrendData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { font: { family: 'DM Sans', size: 11 } } } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 10 } } },
                  y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 10 } }, beginAtZero: false },
                },
              }} />
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18, marginBottom: 18 }}>
          {/* Weak Topics */}
          <div className="card">
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="mistakes" size={17} />
              Top Weak Areas
            </h3>
            {topWeakTopics.length === 0 && (
              <p style={{ color: '#94a3b8', fontSize: 13 }}>No weak topics detected yet. Complete a test to see your weak areas.</p>
            )}
            {topWeakTopics.map((topic, i) => {
              const chMeta = chaptersForExam?.[topic.ch] || {}
              const label = topic.name || chMeta.name || `Topic ${topic.ch}`
              const domain = topic.domain || chMeta.domain || ''
              return (
                <div key={topic.ch} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                  borderBottom: i < topWeakTopics.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(239,68,68,.10)', color: '#ef4444', fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744' }}>{label}</div>
                    {domain && <div style={{ fontSize: 11, color: '#94a3b8' }}>{domain}</div>}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', flexShrink: 0 }}>
                    {topic.count} missed
                  </span>
                </div>
              )
            })}
          </div>

          {/* Test History */}
          <div className="card">
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="test" size={17} />
              Test History
            </h3>
            {testHistory.length === 0 && (
              <p style={{ color: '#94a3b8', fontSize: 13 }}>No completed tests yet.</p>
            )}
            <div style={{ display: 'grid', gap: 8 }}>
              {testHistory.map((t) => (
                <Link
                  key={t.id}
                  to={viewHref(`/results/${t.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                    padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 10, textDecoration: 'none', color: '#0f172a',
                    background: 'white',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.date}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: '#1a2744' }}>{t.total}</span>
                    {t.sections.map((s) => (
                      <span key={s.label} style={{ fontSize: 11, color: '#64748b', textAlign: 'center' }}>
                        <div style={{ fontWeight: 600 }}>{s.val}</div>
                        <div style={{ fontSize: 9, opacity: 0.7 }}>{s.label}</div>
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Study Guide Progress */}
        <div className="card" style={{ marginBottom: 18 }}>
          <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="guide" size={17} />
            Study Guide Progress
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 10, borderRadius: 5, background: '#f1f5f9', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min(100, studiedPct)}%`, height: '100%', borderRadius: 5,
                background: studiedPct >= 100 ? '#059669' : '#0ea5e9', transition: 'width .5s ease',
              }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: studiedPct >= 100 ? '#059669' : '#1a2744', flexShrink: 0 }}>
              {studiedCount}/{examConfig.guideCompletionTarget} modules
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            {studiedPct >= 100
              ? 'All study guide modules completed!'
              : `${examConfig.guideCompletionTarget - studiedCount} modules remaining`}
          </div>
        </div>

        {/* Mistakes Review Progress */}
        <div className="card" style={{ marginBottom: 18 }}>
          <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="mistakes" size={17} />
            Mistake Review Progress
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 10, borderRadius: 5, background: '#f1f5f9', overflow: 'hidden' }}>
              <div style={{
                width: `${mistakesForExam.length ? Math.min(100, Math.round((validatedCount / mistakesForExam.length) * 100)) : 0}%`,
                height: '100%', borderRadius: 5,
                background: validatedCount === mistakesForExam.length && mistakesForExam.length > 0 ? '#059669' : '#f59e0b',
                transition: 'width .5s ease',
              }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: validatedCount === mistakesForExam.length && mistakesForExam.length > 0 ? '#059669' : '#1a2744', flexShrink: 0 }}>
              {validatedCount}/{mistakesForExam.length} reviewed
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            {mistakesForExam.length === 0
              ? 'No mistakes recorded yet.'
              : validatedCount === mistakesForExam.length
                ? 'All mistakes reviewed!'
                : `${mistakesForExam.length - validatedCount} mistakes still need review`}
          </div>
        </div>
      </div>
    </div>
  )
}
