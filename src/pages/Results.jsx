import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { CHAPTERS, QUESTION_CHAPTER_MAP, MODULE_ORDER, MODULES, answerMatches } from '../data/testData.js'
import { getTestConfig } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { buildAdaptiveSchedule, loadSatTestDate, saveSatTestDate, loadStudyPrefs, saveStudyPrefs, dayLabels, normalizeWeakTopics } from '../lib/studyPlan.js'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import { resolveViewContext, withViewUser } from '../lib/viewAs.js'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function SectionBreakdown({ answers, keyBySection }) {
  const sections = [
    { key: 'rw_m1', label: 'R&W Module 1', total: 33 },
    { key: 'rw_m2', label: 'R&W Module 2', total: 33 },
    { key: 'math_m1', label: 'Math Module 1', total: 27 },
    { key: 'math_m2', label: 'Math Module 2', total: 27 },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
      {sections.map(s => {
        const sAnswers = answers[s.key] || {}
        const key = keyBySection?.[s.key] || {}
        let correct = 0
        Object.entries(sAnswers).forEach(([q, v]) => {
          const right = key?.[q]
          if (!right) return
          const ok = answerMatches(v, right)
          if (ok) correct++
        })
        const answered = Object.keys(sAnswers).length
        const pct = Math.round((correct / s.total) * 100)
        return (
          <div key={s.key} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 800, color: '#1a2744' }}>{correct}/{s.total}</div>
            <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444', borderRadius: 3, transition: 'width .8s ease' }} />
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{pct}% correct · {answered} attempted</div>
          </div>
        )
      })}
    </div>
  )
}

function QuestionReview({ answers, keyBySection, guideHref }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="eye" size={17} />
        Question-by-Question Review
      </h3>
      {MODULE_ORDER.map(mod => {
        const modAnswers = answers[mod] || {}
        const key = keyBySection?.[mod] || {}
        const chMap = QUESTION_CHAPTER_MAP[mod]
        const total = MODULES[mod].questions
        const wrongs = []
        for (let q = 1; q <= total; q++) {
          const given = modAnswers[q]
          const right = key?.[q]
          if (!right) continue
          const isCorrect = given && answerMatches(given, right)
          if (!isCorrect) wrongs.push({ q, given, right, ch: chMap[q] })
        }
        if (wrongs.length === 0) return (
          <div key={mod} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', marginBottom: 8 }}>
              {MODULES[mod].label} — {MODULES[mod].module} <span style={{ color: '#10b981' }}>(Perfect)</span>
            </div>
          </div>
        )
        return (
          <div key={mod} style={{ marginBottom: 20 }}>
            <button onClick={() => setExpanded(expanded === mod ? null : mod)}
              style={{ width: '100%', textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: 13, fontWeight: 700 }}>
                {MODULES[mod].label} — {MODULES[mod].module}
              </span>
              <span style={{ fontSize: 12, color: '#ef4444', fontWeight: 700 }}>
                {wrongs.length} wrong {expanded === mod ? '▲' : '▼'}
              </span>
            </button>
            {expanded === mod && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {wrongs.map(({ q, given, right, ch }) => {
                  const chData = CHAPTERS[ch]
                  const hint = chData
                    ? `Hint: revisit Chapter ${ch} and solve the problem again using the core rule from ${chData.name}. Focus on the setup before checking any final answer.`
                    : 'Hint: slow down the setup, identify what the question is really asking for, and try the problem again before checking anything else.'
                  return (
                    <div key={q} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
                      <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 15, color: '#dc2626', minWidth: 28 }}>Q{q}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12 }}>
                          Your answer: <strong style={{ color: '#dc2626' }}>{given || '—'}</strong>
                        </div>
                        <div style={{ fontSize: 12, color: '#475569', marginTop: 4, lineHeight: 1.55 }}>
                          <strong style={{ color: '#1a2744' }}>Hint:</strong> {hint}
                        </div>
                        {chData && (
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            <Icon name="guide" size={13} />
                            <span>Study Guide:</span>
                            <Link to={guideHref(ch)} style={{ color: '#1a2744', fontWeight: 800 }}>
                              Chapter {ch} — {chData.name}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ResultScheduleTaskLink({ task, viewHref }) {
  const accent = task.type === 'guide' ? '#1a2744' : task.type === 'mistakes' ? '#f59e0b' : '#0ea5e9'
  const icon = task.type === 'guide' ? 'guide' : task.type === 'mistakes' ? 'mistakes' : 'results'
  return (
    <Link
      to={viewHref(task.href)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        textDecoration: 'none',
        color: '#0f172a',
        background: 'white',
      }}
    >
      <span style={{
        width: 30,
        height: 30,
        borderRadius: 10,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${accent}14`,
        color: accent,
        flexShrink: 0,
      }}>
        <Icon name={icon} size={15} />
      </span>
      <span style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: '#1a2744', lineHeight: 1.35 }}>{task.title}</div>
        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginTop: 2 }}>{task.subtitle}</div>
      </span>
    </Link>
  )
}

export default function Results() {
  const { attemptId } = useParams()
  const { user, profile } = useAuth()
  const location = useLocation()
  const { viewUserId, isAdminPreview } = resolveViewContext({ userId: user?.id, profile, search: location.search })
  const navigate = useNavigate()
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [prefs, setPrefs] = useState(() => loadStudyPrefs(viewUserId))
  const [satDate, setSatDate] = useState(() => loadSatTestDate(viewUserId))
  const viewHref = (path) => withViewUser(path, viewUserId, isAdminPreview)
  const readOnlyView = isAdminPreview

  useEffect(() => {
    setPrefs(loadStudyPrefs(viewUserId))
    setSatDate(loadSatTestDate(viewUserId))
  }, [viewUserId])

  useEffect(() => {
    if (!supabase || !viewUserId) return
    supabase.from('test_attempts').select('*').eq('id', attemptId).eq('user_id', viewUserId).single()
      .then(({ data }) => {
        if (!data) { navigate(viewHref('/dashboard')); return }
        if (!data.completed_at) { navigate(readOnlyView ? viewHref('/dashboard') : `/test/${attemptId}`); return }
        setAttempt(data)
        if (!readOnlyView) {
          try {
            const key = `agora_viewed_results_v1:${viewUserId}`
            const raw = localStorage.getItem(key)
            const obj = raw ? JSON.parse(raw) : {}
            obj[String(attemptId)] = new Date().toISOString()
            localStorage.setItem(key, JSON.stringify(obj))
          } catch {}
        }
        setLoading(false)
      })
  }, [attemptId, viewUserId, navigate, readOnlyView])

  const scores = attempt?.scores || {}
  const weakTopics = normalizeWeakTopics(attempt?.weak_topics || [])
  const answers = attempt?.answers || {}
  const keyBySection = getAnswerKeyBySection(attempt?.test_id)
  const isPreTest = attempt?.test_id === 'pre_test' || attempt?.test_id === 'practice_test_11' || !attempt?.test_id
  const reviewCount = useMemo(() => {
    if (!keyBySection) return 0
    let wrong = 0
    for (const [section, key] of Object.entries(keyBySection || {})) {
      for (const [q, right] of Object.entries(key || {})) {
        const given = answers?.[section]?.[q]
        if (given == null || String(given).trim() === '') continue
        const ok = answerMatches(given, right)
        if (!ok) wrong += 1
      }
    }
    return wrong
  }, [answers, keyBySection])

  const journeySchedule = useMemo(() => buildAdaptiveSchedule({
    weakTopics,
    studiedMap: {},
    reviewCount,
    hasViewedResults: true,
    hasTakenPretest: true,
    prefs,
    testDate: satDate,
  }), [weakTopics, reviewCount, prefs, satDate])

  const resultDayCards = journeySchedule?.days?.slice(0, 3) || []

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>
      Loading results…
    </div>
  )

  // Domain summary for chart
  const domainCounts = {}
  weakTopics.forEach(t => {
    const d = t.domain || 'Other'
    domainCounts[d] = (domainCounts[d] || 0) + t.count
  })
  const chartData = {
    labels: Object.keys(domainCounts),
    datasets: [{
      label: 'Questions Missed',
      data: Object.values(domainCounts),
      backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'],
      borderRadius: 8,
      borderSkipped: false,
    }]
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      {/* Nav */}
      <nav className="nav">
        <BrandLink to={viewHref('/dashboard')} />
        <div className="nav-actions">
          <button
            className="btn btn-outline"
            onClick={() => navigate(-1)}
            style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}
            title="Go back"
          >
            <Icon name="back" size={15} />
            Back
          </button>
          <Link to={viewHref('/dashboard')} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
            <Icon name="home" size={15} />
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="page fade-up">
        {isAdminPreview && (
          <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, rgba(26,39,68,.96), rgba(30,58,138,.94))', color: 'white' }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>Admin View</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.88 }}>
              You’re viewing this student’s post-test results in read-only mode.
            </div>
          </div>
        )}
        {/* Score Hero */}
        <div className="results-score-hero" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', opacity: .6, marginBottom: 8 }}>
            {(getTestConfig(attempt.test_id)?.label || 'Pre Test')} — Score
          </div>
          <div className="results-total">{scores.total || '—'}</div>
          <div className="results-label">out of 1600</div>
          <div className="section-scores">
            <div className="section-score-item">
              <div className="section-score-num">{scores.rw || '—'}</div>
              <div className="section-score-lbl">Reading & Writing</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,.2)' }} />
            <div className="section-score-item">
              <div className="section-score-num">{scores.math || '—'}</div>
              <div className="section-score-lbl">Math</div>
            </div>
          </div>
          <div style={{ marginTop: 16, fontSize: 13, opacity: .6 }}>
            Completed {new Date(attempt.completed_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

	        {/* Section breakdown */}
	        {keyBySection ? (
	          <SectionBreakdown answers={answers} keyBySection={keyBySection} />
	        ) : (
	          <div className="card" style={{ marginBottom: 24, color: '#64748b', lineHeight: 1.7 }}>
	            Detailed module-by-module review isn’t available for this test yet.
	          </div>
	        )}

	        {/* Weak topics */}
	        {isPreTest && weakTopics.length > 0 && (
          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="warning" size={17} />
              Weak Areas — Mapped to Your Playbook
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
              These are the chapters to focus on first. Study them in order of urgency.
            </p>
            <div>
              {weakTopics.map((t, i) => (
                <div key={t.ch} className="topic-chip" style={{ borderLeftColor: t.color || '#e2e8f0' }}>
                  <div className="count-badge">{t.count}</div>
                  <div>
                    <div className="ch-name">
                      <span style={{ color: '#94a3b8', fontSize: 11, marginRight: 6 }}>#{i + 1}</span>
                      {t.name}
                    </div>
                    <div className="ch-page" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="guide" size={13} />
                      <span>Chapter {t.ch} · Playbook page {t.page}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

	        {/* Domain chart */}
	        {isPreTest && Object.keys(domainCounts).length > 0 && (
          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="chart" size={17} />
              Missed Questions by Domain
            </h3>
            <div style={{ height: 220 }}>
              <Bar data={chartData} options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                  y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                }
              }} />
            </div>
          </div>
        )}

        {/* Smart Journey Planner */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="calendar" size={17} />
                Smart Journey Planner
              </h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Instead of a static weekly plan, your next steps update from this test’s weak topics, your availability, and your target SAT date.
              </p>
            </div>
            <Link className="btn btn-outline" to={viewHref('/calendar')} style={{ flexShrink: 0 }}>
              Open Full Calendar →
            </Link>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, background: '#f8fafc', marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748b', fontWeight: 900 }}>
                Test date:
                <input
                  type="date"
                  value={satDate || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    setSatDate(value)
                    saveSatTestDate(viewUserId, value)
                  }}
                  disabled={readOnlyView}
                  style={{ padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, background: 'white' }}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900 }}>Available days:</div>
              {dayLabels().map((d, i) => {
                const enabled = !!prefs?.days?.[i]
                return (
                  <button
                    key={d}
                    type="button"
                    className="btn btn-outline"
                    disabled={readOnlyView}
                    onClick={() => {
                      const next = { ...(prefs || loadStudyPrefs(viewUserId)) }
                      next.days = (next.days || Array(7).fill(false)).map(Boolean)
                      next.days[i] = !next.days[i]
                      setPrefs(next)
                      try { saveStudyPrefs(viewUserId, next) } catch {}
                    }}
                    style={{
                      padding: '7px 12px',
                      fontSize: 12,
                      background: enabled ? 'rgba(14,165,233,.10)' : 'white',
                      borderColor: enabled ? 'rgba(14,165,233,.35)' : '#e2e8f0',
                      color: enabled ? '#0f172a' : '#64748b',
                    }}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: journeySchedule?.needsMoreTime ? '#92400e' : '#64748b', lineHeight: 1.6 }}>
              {journeySchedule?.needsMoreTime
                ? <>Plan for about <b>{journeySchedule.requiredMinutesPerDay} minutes on each study day</b> to stay on track. If that feels too heavy, add more available days or move your test date back.</>
                : <>This plan updates from your latest results, and any missed day rolls forward into the next available study day automatically.</>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
            {resultDayCards.map((day, idx) => (
              <div
                key={day.key}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 14,
                  padding: 14,
                  background: idx === 0 ? 'linear-gradient(135deg, rgba(14,165,233,.10), rgba(99,102,241,.10))' : '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 900, color: '#1a2744' }}>
                      {idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : 'The Day After'}
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
                <div style={{ display: 'grid', gap: 8 }}>
                  {day.tasks.length ? day.tasks.map((task) => (
                    <ResultScheduleTaskLink key={task.id} task={task} viewHref={viewHref} />
                  )) : (
                    <div style={{ padding: '12px', border: '1px dashed #cbd5e1', borderRadius: 12, color: '#64748b', fontSize: 12, lineHeight: 1.6 }}>
                      No required tasks for this day. Use it as a catch-up or light review day.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

	        {/* Q-by-Q review */}
	        {keyBySection && <QuestionReview answers={answers} keyBySection={keyBySection} guideHref={(chapterId) => viewHref(`/guide?chapter=${encodeURIComponent(chapterId)}`)} />}

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingBottom: 40 }}>
          <Link to={viewHref('/dashboard')} className="btn btn-primary">
            <Icon name="back" size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
