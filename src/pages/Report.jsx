import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { TESTS } from '../data/tests.js'
import { getStudiedTopics } from '../lib/studyProgress.js'
import { loadMistakes, loadReviewItems, computeDueCount } from '../lib/mistakesStore.js'
import { toLocalDateKey, computeStreak, computeWeeklyProgress, computeLevelAndBadges } from '../lib/progressMetrics.js'
import { encodeReportToQuery } from '../lib/reportShare.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function Navbar() {
  return (
    <nav className="nav">
      <a className="nav-brand" href="/dashboard">The Agora <span>Project</span></a>
      <div className="nav-actions">
        <Link to="/dashboard" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
          ← Dashboard
        </Link>
        <Link to="/mistakes" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
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
  const targetUser = q.get('user') || user?.id
  const isAdmin = profile?.role === 'admin' && String(profile?.email || '').toLowerCase() === 'agora@admin.org'
  const canView = (String(targetUser) === String(user?.id)) || isAdmin

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
    const weekly = computeWeeklyProgress(activityKeys, 5)
    const extraTests = TESTS.filter(t => t.kind === 'extra')
    const completedExtra = completed.filter(a => extraTests.some(t => t.id === a.test_id)).length
    const level = computeLevelAndBadges({
      hasPretest: completedPre.length > 0,
      studiedCount,
      totalChapters: 34,
      completedExtra,
      streakCurrent: streak.current,
      streakBest: streak.best,
      dueReviews,
    })

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
        level: level.level,
        level_title: level.title,
        badges: level.badges.filter(b => b.earned).map(b => b.label),
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
      weekly,
    }
  }, [attempts, postScores, studiedRows, mistakes, reviewItems, targetProfile?.full_name, targetProfile?.email])

  const shareUrl = useMemo(() => {
    if (!report) return null
    const encoded = encodeReportToQuery(report)
    return `${window.location.origin}/share?r=${encoded}`
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

  if (!canView) {
    return (
      <div style={{ minHeight: '100vh', background: 'transparent' }}>
        <Navbar />
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
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)', color: '#64748b' }}>
          Building report…
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar />
      <div className="page fade-up">
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
            <div style={{ fontWeight: 900, color: '#1a2744' }}>Level & Badges</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>
              L{report.summary.level} · {report.summary.level_title} · Due reviews: {report.summary.due_reviews}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {(report.summary.badges || []).length ? report.summary.badges.map((b) => (
              <div key={b} style={{ padding: '8px 10px', borderRadius: 999, background: 'rgba(245,158,11,.16)', border: '1px solid rgba(245,158,11,.35)', fontSize: 12, fontWeight: 900, color: '#7c2d12' }}>
                🏅 {b}
              </div>
            )) : (
              <div style={{ color: '#64748b', fontSize: 13 }}>No badges yet.</div>
            )}
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
