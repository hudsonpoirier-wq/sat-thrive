import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { CHAPTERS, ANSWER_KEY, QUESTION_CHAPTER_MAP, FREE_RESPONSE, MODULE_ORDER, MODULES, freeResponseMatches } from '../data/testData.js'
import { getTestConfig } from '../data/tests.js'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function SectionBreakdown({ answers }) {
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
        const key = ANSWER_KEY[s.key]
        const fr = FREE_RESPONSE[s.key] || []
        let correct = 0
        Object.entries(sAnswers).forEach(([q, v]) => {
          const right = key[q]
          if (!right) return
          const ok = fr.includes(Number(q))
            ? freeResponseMatches(v, right)
            : String(v).toUpperCase() === String(right).toUpperCase()
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

function QuestionReview({ answers }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>🔍 Question-by-Question Review</h3>
      {MODULE_ORDER.map(mod => {
        const modAnswers = answers[mod] || {}
        const key = ANSWER_KEY[mod]
        const chMap = QUESTION_CHAPTER_MAP[mod]
        const fr = FREE_RESPONSE[mod] || []
        const total = MODULES[mod].questions
        const wrongs = []
        for (let q = 1; q <= total; q++) {
          const given = modAnswers[q]
          const right = key[q]
          if (!right) continue
          const isCorrect = fr.includes(q)
            ? given && freeResponseMatches(given, right)
            : given && String(given).toUpperCase() === String(right).toUpperCase()
          if (!isCorrect) wrongs.push({ q, given, right, ch: chMap[q] })
        }
        if (wrongs.length === 0) return (
          <div key={mod} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', marginBottom: 8 }}>
              ✅ {MODULES[mod].label} — {MODULES[mod].module} <span style={{ color: '#10b981' }}>(Perfect!)</span>
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
                  return (
                    <div key={q} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
                      <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 15, color: '#dc2626', minWidth: 28 }}>Q{q}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12 }}>
                          Your answer: <strong style={{ color: '#dc2626' }}>{given || '—'}</strong>
                          &nbsp;&nbsp;Correct: <strong style={{ color: '#10b981' }}>{right}</strong>
                        </div>
                        {chData && (
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                            📖 Study Guide: <Link to={`/guide?chapter=${encodeURIComponent(ch)}`} style={{ color: '#1a2744', fontWeight: 800 }}>
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

export default function Results() {
  const { attemptId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState('')
  const [generatingPlan, setGeneratingPlan] = useState(false)
  const [planSaved, setPlanSaved] = useState(false)

  useEffect(() => {
    if (!supabase || !user?.id) return
    supabase.from('test_attempts').select('*').eq('id', attemptId).eq('user_id', user.id).single()
      .then(({ data }) => {
        if (!data) { navigate('/dashboard'); return }
        if (!data.completed_at) { navigate(`/test/${attemptId}`); return }
        setAttempt(data)
        if (data.study_plan) setPlan(data.study_plan)
        setLoading(false)
      })
  }, [attemptId, user?.id, navigate])

  async function generatePlan() {
    setGeneratingPlan(true)
    try {
      const txt = buildStudyPlan(attempt)
      setPlan(txt)
      await supabase.from('test_attempts').update({ study_plan: txt }).eq('id', attemptId).eq('user_id', user.id)
      setPlanSaved(true)
    } catch (e) {
      setPlan('Error generating plan. Please try again.')
    }
    setGeneratingPlan(false)
  }

  function buildStudyPlan(a) {
    const scores = a.scores || {}
    const weakTopics = Array.isArray(a.weak_topics) ? a.weak_topics.slice() : []
    weakTopics.sort((x, y) => (y.count || 0) - (x.count || 0))
    const top = weakTopics.slice(0, 3)

    const lines = []
    lines.push('▶ SCORE ASSESSMENT')
    lines.push(`Current score: ${scores.total || '—'} (R&W: ${scores.rw || '—'}, Math: ${scores.math || '—'}).`)
    lines.push('This 8-week plan targets your highest-missed Playbook areas first, then builds speed + accuracy with mixed sets.')
    lines.push('')

    lines.push('🔴 TOP 3 PRIORITIES')
    if (top.length) {
      top.forEach((t, i) => {
        const ch = t.ch ? `Ch ${t.ch}` : 'Ch ?'
        const pg = t.page ? `p.${t.page}` : 'p.?'
        const misses = t.count ? `${t.count} missed` : 'missed'
        lines.push(`${i + 1}) ${t.name || 'Topic'} — ${ch}, ${pg} — ${misses}`)
      })
    } else {
      lines.push('1) No weak topics identified — focus on timed mixed practice + an error log.')
    }
    lines.push('')

    lines.push('📅 8-WEEK ROADMAP')
    lines.push(`Weeks 1–2: Fix top weakness (${top[0]?.name || 'highest-missed area'}). 3 drills/week + 1 timed mini-set; review every mistake.`)
    lines.push(`Weeks 3–4: Fix #2 weakness (${top[1]?.name || 'next priority'}). Add 2 mixed-topic sets/week to keep earlier skills fresh.`)
    lines.push(`Weeks 5–6: Fix #3 weakness (${top[2]?.name || 'third priority'}). Increase timing pressure; practice skipping + returning.`)
    lines.push('Weeks 7–8: Full SAT simulation: 1 full test/week + deep review. Re-drill recurring error types from your log.')
    lines.push('')

    lines.push('📌 TUTOR NOTES')
    lines.push('• Track every miss: why it happened + the rule to prevent it next time.')
    lines.push('• 30–45 minutes/day beats weekend cram sessions.')
    lines.push('• After each timed set: redo missed questions untimed until you can explain the logic.')
    return lines.join('\n')
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>
      Loading results…
    </div>
  )

  const scores = attempt.scores || {}
  const weakTopics = attempt.weak_topics || []
  const answers = attempt.answers || {}
  const isPreTest = attempt?.test_id === 'pre_test' || attempt?.test_id === 'practice_test_11' || !attempt?.test_id

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
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Nav */}
      <nav className="nav">
        <a className="nav-brand" href="/dashboard">The Agora <span>Project</span></a>
        <div className="nav-actions">
          <Link to="/dashboard" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
            ← Dashboard
          </Link>
        </div>
      </nav>

      <div className="page fade-up">
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
	        {isPreTest ? (
	          <SectionBreakdown answers={answers} />
	        ) : (
	          <div className="card" style={{ marginBottom: 24, color: '#64748b', lineHeight: 1.7 }}>
	            Detailed module-by-module review is currently available for the Pre Test only.
	          </div>
	        )}

	        {/* Weak topics */}
	        {isPreTest && weakTopics.length > 0 && (
	          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
              🚩 Weak Areas — Mapped to Your Playbook
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
                    <div className="ch-page">📖 Chapter {t.ch} · Playbook page {t.page}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

	        {/* Domain chart */}
	        {isPreTest && Object.keys(domainCounts).length > 0 && (
	          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
              📊 Missed Questions by Domain
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

        {/* Study Plan */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16 }}>
            <div>
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 2 }}>📚 Your 8-Week Study Plan</h3>
              <p style={{ fontSize: 13, color: '#64748b' }}>AI-generated plan mapped to exact Playbook chapters</p>
            </div>
            <button className="btn btn-primary" onClick={generatePlan} disabled={generatingPlan} style={{ flexShrink: 0 }}>
              {generatingPlan ? <><span className="spinner" /> Generating…</> : plan ? '🔄 Regenerate' : '🤖 Generate Plan'}
            </button>
          </div>
          {plan ? (
            <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.8, color: '#374151', background: '#f8fafc', borderRadius: 12, padding: 20, borderLeft: '4px solid #f59e0b' }}>
              {plan}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 24px', color: '#94a3b8' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📖</div>
              <div>Click "Generate Plan" to get your personalized 8-week roadmap</div>
            </div>
          )}
        </div>

	        {/* Q-by-Q review */}
	        {isPreTest && <QuestionReview answers={answers} />}

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingBottom: 40 }}>
          <Link to="/dashboard" className="btn btn-primary">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
