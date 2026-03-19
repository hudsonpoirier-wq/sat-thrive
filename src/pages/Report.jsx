import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { TESTS } from '../data/tests.js'
import { getStudiedTopics } from '../lib/studyProgress.js'
import { loadMistakes, loadReviewItems, computeDueCount } from '../lib/mistakesStore.js'
import { toLocalDateKey, computeStreak } from '../lib/progressMetrics.js'
import { encodeReportToQuery } from '../lib/reportShare.js'
import BrandLink from '../components/BrandLink.jsx'
import { resolveViewContext, withViewUser } from '../lib/viewAs.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function Navbar({ dashboardHref, mistakesHref }) {
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <BrandLink to={dashboardHref} />
      <div className="nav-actions">
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
        <Link to={mistakesHref} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
          Mistakes
        </Link>
      </div>
    </nav>
  )
}

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search || ''), [search])
}

export default function Report() {
  const { user, profile } = useAuth()
  const q = useQuery()
  const { viewUserId, isAdminPreview, isAdmin } = resolveViewContext({ userId: user?.id, profile, search: q.toString() ? `?${q.toString()}` : '' })
  const targetUser = viewUserId || user?.id
  const canView = (String(targetUser) === String(user?.id)) || isAdmin
  const viewHref = (path) => withViewUser(path, targetUser, isAdminPreview)

  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [studiedRows, setStudiedRows] = useState([])
  const [mistakes, setMistakes] = useState([])
  const [reviewItems, setReviewItems] = useState({})
  const [targetProfile, setTargetProfile] = useState(null)

  useEffect(() => {
    if (!supabase || !targetUser || !canView) return
    setLoading(true)
    Promise.all([
      supabase.from('test_attempts').select('*').eq('user_id', targetUser).order('started_at', { ascending: false }),
      supabase.from('post_scores').select('*').eq('user_id', targetUser).order('recorded_at', { ascending: false }),
      getStudiedTopics(targetUser),
      loadMistakes(targetUser),
      loadReviewItems(targetUser),
      supabase.from('profiles').select('*').eq('id', targetUser).maybeSingle(),
    ]).then(([a, p, st, m, r, pr]) => {
      setAttempts(a.data || [])
      setPostScores(p.data || [])
      setStudiedRows(st.rows || [])
      setMistakes(m.items || [])
      setReviewItems(r.items || {})
      setTargetProfile(pr.data || null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [targetUser, canView])

  const report = useMemo(() => {
    const completed = (attempts || []).filter(a => a.completed_at || a.scores?.total)
    const completedPre = completed.filter(a => a.test_id === 'pre_test' || a.test_id === 'practice_test_11')
    const bestPre = completedPre
      .map(a => a.scores?.total || 0)
      .filter(Boolean)
      .reduce((m, v) => Math.max(m, v), 0) || null
    const latestPost = postScores?.[0]?.post_score || null
    const improvement = bestPre && latestPost ? (latestPost - bestPre) : null
    const studiedCount = (studiedRows || []).filter(r => r.completed).length
    const dueReviews = computeDueCount(reviewItems)

    const activityKeys = (() => {
      const set = new Set()
      ;(attempts || []).forEach((a) => {
        const k1 = toLocalDateKey(a.started_at)
        const k2 = toLocalDateKey(a.completed_at)
        if (k1) set.add(k1)
        if (k2) set.add(k2)
      })
      ;(studiedRows || []).forEach((r) => {
        const k1 = toLocalDateKey(r.updated_at)
        const k2 = toLocalDateKey(r.completed_at)
        if (k1) set.add(k1)
        if (k2) set.add(k2)
      })
      Object.values(reviewItems || {}).forEach((it) => {
        const k = toLocalDateKey(it?.last_reviewed_at)
        if (k) set.add(k)
      })
      return set
    })()

    const streak = computeStreak(activityKeys)
    const extraTests = TESTS.filter(t => t.kind === 'extra')
    const completedExtra = completed.filter(a => extraTests.some(t => t.id === a.test_id)).length

    const series = completed
      .filter(a => a.scores?.total)
      .slice()
      .sort((x, y) => new Date(x.started_at).getTime() - new Date(y.started_at).getTime())
      .map((a) => {
        const t = TESTS.find(tt => tt.id === (a.test_id === 'practice_test_11' ? 'pre_test' : a.test_id))
        return { label: t?.label || a.test_id, date: new Date(a.started_at).toLocaleDateString(), total: a.scores.total }
      })

    return {
      generated_at: new Date().toISOString(),
      student: { name: targetProfile?.full_name || null, email: targetProfile?.email || null },
      summary: {
        best_pretest: bestPre,
        latest_post: latestPost,
        improvement,
        studied_count: studiedCount,
        due_reviews: dueReviews,
        streak_current: streak.current,
        streak_best: streak.best,
        completed_extra: completedExtra,
      },
      series,
      mistakes: (mistakes || []).slice(0, 200).map(m => ({
        test: m.test_id,
        section: m.section,
        q: m.q_num,
        chapter: m.chapter_id || null,
        created_at: m.created_at,
        note: m.note || '',
      })),
    }
  }, [attempts, postScores, studiedRows, mistakes, reviewItems, targetProfile?.full_name, targetProfile?.email])

  const shareUrl = useMemo(() => {
    if (!report) return null
    // Keep share links short and reliable (iMessage can truncate long URLs).
    const sharePayload = {
      generated_at: report.generated_at,
      student: { name: report.student?.name || null },
      summary: report.summary,
      series: report.series,
    }
    try {
      const encoded = encodeReportToQuery(sharePayload)
      return `${window.location.origin}/share?r=${encoded}`
    } catch {
      return null
    }
  }, [report])

  const trendData = useMemo(() => {
    if (!report?.series || report.series.length < 2) return null
    return {
      labels: report.series.map(s => `${s.label} · ${s.date}`),
      datasets: [{
        label: 'Total Score',
        data: report.series.map(s => s.total),
        borderColor: '#1a2744',
        backgroundColor: 'rgba(26,39,68,.08)',
        pointBackgroundColor: '#f59e0b',
        tension: 0.25,
        fill: true,
      }]
    }
  }, [report?.series])
  const completedAttempts = useMemo(() => (attempts || []).filter(a => a.completed_at || a.scores?.total), [attempts])

  if (!canView) {
    return (
      <div style={{ minHeight: '100vh', background: 'transparent' }}>
        <Navbar dashboardHref={viewHref('/dashboard')} mistakesHref={viewHref('/mistakes')} />
        <div className="page fade-up">
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>Not authorized</div>
            <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              This report link is restricted.
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'transparent' }}>
        <Navbar dashboardHref={viewHref('/dashboard')} mistakesHref={viewHref('/mistakes')} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)', color: '#64748b' }}>
          Building report…
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar dashboardHref={viewHref('/dashboard')} mistakesHref={viewHref('/mistakes')} />
      <div className="page fade-up">
        {isAdminPreview && (
          <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, rgba(26,39,68,.96), rgba(30,58,138,.94))', color: 'white' }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>Admin View</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.88 }}>
              You’re viewing this student’s report. Use the result links below to open the same detailed post-test screens they see.
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744' }}>📣 Progress Report</h1>
            <div style={{ marginTop: 4, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Generated {new Date(report.generated_at).toLocaleString()}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className="btn btn-outline"
              onClick={async () => {
                if (!shareUrl) return
                try { await navigator.clipboard.writeText(shareUrl) } catch {}
                alert('Share link copied.')
              }}
            >
              Copy share link
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'agora-progress-report.json'
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              Download JSON
            </button>
          </div>
        </div>

        {completedAttempts.length > 0 && (
          <div className="card" style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 900, color: '#1a2744' }}>Detailed Test Screens</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                  Open the exact post-test results pages this student sees after each completed test.
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {completedAttempts.slice(0, 8).map((attempt) => {
                const label = TESTS.find(t => t.id === (attempt.test_id === 'practice_test_11' ? 'pre_test' : attempt.test_id))?.label || attempt.test_id
                return (
                  <div key={attempt.id} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 900, color: '#1a2744' }}>{label}</div>
                      <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                        {new Date(attempt.started_at).toLocaleDateString()} · Total {attempt.scores?.total || '—'}
                      </div>
                    </div>
                    <Link className="btn btn-outline" to={viewHref(`/results/${attempt.id}`)}>
                      Open Results →
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="stats-grid" style={{ marginBottom: 18 }}>
          {[
            { label: 'Best Pre-Test', val: report.summary.best_pretest || '—', sub: 'Pre Test', dark: false },
            { label: 'Post-Test', val: report.summary.latest_post || '—', sub: 'Most recent', dark: false },
            { label: 'Improvement', val: report.summary.improvement != null ? `+${report.summary.improvement}` : '—', sub: 'Points', dark: !!report.summary.improvement },
            { label: 'Streak', val: `${report.summary.streak_current} days`, sub: `Best ${report.summary.streak_best}`, dark: false },
          ].map(s => (
            <div key={s.label} className={`stat-box${s.dark ? ' dark' : ''}`}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-num">{s.val}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ fontWeight: 900, color: '#1a2744' }}>Summary</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>
              Due reviews: {report.summary.due_reviews} · Optional tests completed: {report.summary.completed_extra}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 8 }}>Study Guide Progress</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>
            Completed chapters: <b>{report.summary.studied_count}/34</b>
          </div>
        </div>

        {trendData && (
          <div className="card" style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 10 }}>Score Trend</div>
            <div style={{ height: 240 }}>
              <Line data={trendData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        )}

        <div className="card">
          <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 10 }}>Mistakes (sample)</div>
          <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
            Showing the most recent {Math.min(20, report.mistakes.length)}.
          </div>
          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {report.mistakes.slice(0, 20).map((m, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 12, background: '#f8fafc' }}>
                <div style={{ fontWeight: 900, color: '#1a2744' }}>{m.test} · {m.section} · Q{m.q}{m.chapter ? ` · Ch ${m.chapter}` : ''}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: '#64748b' }}>{m.note ? `Note: ${m.note}` : 'No note yet.'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
