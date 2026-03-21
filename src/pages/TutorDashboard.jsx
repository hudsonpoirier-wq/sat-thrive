import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import { TESTS, getExamFromTestId } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { ANSWER_KEY } from '../data/testData.js'
import { calcWeakTopicsForTest, getExamConfig, getExamConfigForTest, getQuestionCountForTest, getScoreColumnsForExam, scoreAttemptFromKey } from '../data/examData.js'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)

function toDayKey(iso) {
  try {
    if (!iso) return null
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return null
    return d.toISOString().slice(0, 10)
  } catch { return null }
}

function quantile(sorted, q) {
  if (!sorted?.length) return null
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  return sorted[base] + (pos - base) * (sorted[Math.min(sorted.length - 1, base + 1)] - sorted[base])
}

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)) }

function normalizeTestId(id) { return (!id || id === 'practice_test_11') ? 'pre_test' : id }

function testLabel(id) {
  const norm = normalizeTestId(id)
  const t = TESTS.find(x => x.id === norm) || TESTS.find(x => x.id === id)
  return t?.label || (norm === 'pre_test' ? 'Pre Test' : (id || 'Test'))
}

function isPreTestId(id) { return normalizeTestId(id) === 'pre_test' }

function attemptTotalScore(a) { return Number(a?.scores?.composite || a?.scores?.total || 0) }

function attemptAccuracyRecord(attempt) {
  const testId = normalizeTestId(attempt?.test_id)
  const exam = getExamFromTestId(testId)
  const totalQuestions = Math.max(1, Number(getQuestionCountForTest(testId) || 0))
  let raw = Number(attempt?.scores?.raw || 0)
  const total = attemptTotalScore(attempt)
  if (!raw && attempt?.answers) {
    try {
      const rescored = scoreAttemptFromKey(testId, attempt.answers, getAnswerKeyBySection(testId) || {})
      raw = Number(rescored?.raw || 0)
    } catch { raw = 0 }
  }
  const percent = raw > 0 ? raw / totalQuestions : 0
  return { exam, raw, total, totalQuestions, percent, display: percent > 0 ? `${Math.round(percent * 100)}% · ${String(exam || 'sat').toUpperCase()} ${total || '—'}` : null }
}

function computeAttemptWeakTopics(attempt) {
  try {
    if (Array.isArray(attempt?.weak_topics) && attempt.weak_topics.length) return attempt.weak_topics
    const tid = normalizeTestId(attempt?.test_id)
    const keyBySection = getAnswerKeyBySection(tid) || (isPreTestId(tid) ? ANSWER_KEY : null)
    if (!keyBySection) return []
    return calcWeakTopicsForTest(tid, attempt?.answers || {}, keyBySection)
  } catch { return [] }
}

function formatTopWeakness(attempt) {
  const weakTopics = computeAttemptWeakTopics(attempt)
  const topWeak = weakTopics?.[0]
  if (!topWeak) return '—'
  const exam = getExamFromTestId(attempt?.test_id)
  const cfg = getExamConfig(exam)
  const chapterMeta = cfg?.chapters?.[topWeak.ch] || {}
  const label = topWeak.name || chapterMeta?.name || topWeak.ch || 'Weak area'
  const domain = topWeak.domain || chapterMeta?.domain || ''
  return `${label}${domain ? ` · ${domain}` : ''}`
}

const cardStyle = { background: 'rgba(255,255,255,.07)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,.1)' }
const kpiStyle = { ...cardStyle, textAlign: 'center', padding: '18px 12px' }
const labelStyle = { fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 4 }
const bigNumStyle = { fontSize: 28, fontWeight: 800, color: '#fff' }

export default function TutorDashboard() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const isTutor = profile?.role === 'tutor' && profile?.affiliation
  const [students, setStudents] = useState([])
  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('students')
  const [analyticsExam, setAnalyticsExam] = useState('sat')

  const fetchData = useCallback(async () => {
    if (!supabase) return { students: [], attempts: [], postScores: [] }
    const [p, a, ps] = await Promise.allSettled([
      supabase.from('profiles').select('id,email,full_name,role,affiliation,created_at').order('created_at', { ascending: false }),
      supabase.from('test_attempts').select('id,user_id,test_id,started_at,completed_at,scores,weak_topics,answers').not('completed_at', 'is', null).order('started_at', { ascending: false }).limit(2000),
      supabase.from('post_scores').select('attempt_id,post_score,post_rw,post_math,recorded_at').order('recorded_at', { ascending: false }).limit(5000),
    ])
    return {
      students: (p.status === 'fulfilled' ? (p.value.data || []) : []).filter(s => s.role !== 'tutor' && s.role !== 'admin'),
      attempts: a.status === 'fulfilled' ? (a.value.data || []) : [],
      postScores: ps.status === 'fulfilled' ? (ps.value.data || []) : [],
    }
  }, [])

  useEffect(() => {
    if (!supabase) return
    if (profile && !isTutor) { navigate('/dashboard'); return }
    let cancelled = false
    fetchData().then((data) => {
      if (cancelled) return
      setStudents(data.students)
      setAttempts(data.attempts)
      setPostScores(data.postScores)
      setLoading(false)
    }).catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [profile, isTutor, navigate, fetchData])

  // Real-time refresh
  useEffect(() => {
    if (!supabase || !isTutor) return
    let disposed = false, debounce = null
    const refresh = async () => {
      try {
        const data = await fetchData()
        if (disposed) return
        setStudents(data.students)
        setAttempts(data.attempts)
        setPostScores(data.postScores)
      } catch {}
    }
    const queue = () => { clearTimeout(debounce); debounce = setTimeout(refresh, 300) }
    const channelId = `tutor-live:${Date.now()}-${Math.random().toString(36).slice(2)}`
    const channel = supabase.channel(channelId)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, queue)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'test_attempts' }, queue)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_scores' }, queue)
      .subscribe()
    const interval = setInterval(refresh, 20000)
    return () => { disposed = true; clearTimeout(debounce); clearInterval(interval); supabase.removeChannel(channel) }
  }, [isTutor, fetchData])

  const studentIds = useMemo(() => new Set(students.map(s => s.id)), [students])
  const filteredAttempts = useMemo(() => attempts.filter(a => studentIds.has(a.user_id)), [attempts, studentIds])

  const computed = useMemo(() => {
    const studentById = new Map(students.map(s => [s.id, s]))
    const bestByUser = new Map()
    for (const a of filteredAttempts) {
      const rec = attemptAccuracyRecord(a)
      const prev = bestByUser.get(a.user_id)
      if (!prev || rec.percent > prev.percent || (rec.percent === prev.percent && rec.total > prev.total)) bestByUser.set(a.user_id, rec)
    }
    const postByAttemptId = new Map()
    for (const p of postScores) { if (p?.attempt_id && !postByAttemptId.has(p.attempt_id)) postByAttemptId.set(p.attempt_id, p) }
    return { studentById, bestByUser, postByAttemptId }
  }, [students, filteredAttempts, postScores])

  const analytics = useMemo(() => {
    const examMode = analyticsExam === 'act' ? 'act' : 'sat'
    const scoreColumns = getScoreColumnsForExam(examMode)
    const now = Date.now()
    const recent7 = now - 7 * 86400000
    const recent30 = now - 30 * 86400000
    const allAttempts = filteredAttempts.filter(a => getExamFromTestId(a?.test_id) === examMode)
    const totals = [], sectionBuckets = Object.fromEntries(scoreColumns.filter(c => c.key !== 'total').map(c => [c.key, []]))
    const byTest = new Map(), attemptsByDay = new Map(), completesByDay = new Map()
    const weakByDomain = new Map(), weakByChapter = new Map()
    const activeUsers7 = new Set(), activeUsers30 = new Set()

    for (const a of allAttempts) {
      const tid = normalizeTestId(a.test_id)
      const sc = a.scores || {}
      let total = Number(sc.composite || sc.total || 0)
      const sectionValues = Object.fromEntries(scoreColumns.filter(c => c.key !== 'total').map(c => [c.key, Number(sc[c.key] || sc.sections?.[c.key] || 0)]))
      if (a.answers && Object.keys(a.answers).length && (!total || Object.values(sectionValues).some(v => !v))) {
        try {
          const keyBySection = getAnswerKeyBySection(tid) || (isPreTestId(tid) ? ANSWER_KEY : null)
          if (keyBySection) {
            const computed = scoreAttemptFromKey(tid, a.answers, keyBySection)
            if (computed?.total) {
              if (!total) total = Number(computed.composite || computed.total || 0)
              for (const col of scoreColumns.filter(c => c.key !== 'total')) {
                if (!sectionValues[col.key]) sectionValues[col.key] = Number(computed[col.key] || computed.sections?.[col.key] || 0)
              }
            }
          }
        } catch {}
      }
      const started = new Date(a.started_at || a.completed_at || 0).getTime()
      if (started >= recent7) activeUsers7.add(a.user_id)
      if (started >= recent30) activeUsers30.add(a.user_id)
      if (total) {
        totals.push(total)
        for (const [key, value] of Object.entries(sectionValues)) { if (value) sectionBuckets[key].push(value) }
        const row = byTest.get(tid) || { count: 0, totals: [], sections: Object.fromEntries(Object.keys(sectionBuckets).map(k => [k, []])) }
        row.count += 1; row.totals.push(total)
        for (const [key, value] of Object.entries(sectionValues)) { if (value) row.sections[key].push(value) }
        byTest.set(tid, row)
      }
      const dayS = toDayKey(a.started_at), dayC = toDayKey(a.completed_at)
      if (dayS) attemptsByDay.set(dayS, (attemptsByDay.get(dayS) || 0) + 1)
      if (dayC) completesByDay.set(dayC, (completesByDay.get(dayC) || 0) + 1)
      for (const t of computeAttemptWeakTopics(a)) {
        const c = Number(t?.count || 0)
        if (c > 0) {
          weakByDomain.set(t?.domain || 'Other', (weakByDomain.get(t?.domain || 'Other') || 0) + c)
          if (t?.ch) weakByChapter.set(t.ch, (weakByChapter.get(t.ch) || 0) + c)
        }
      }
    }
    const avg = arr => arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null
    const sorted = totals.slice().sort((a, b) => a - b)
    const summary = {
      exam: examMode, active7: activeUsers7.size, active30: activeUsers30.size,
      avgTotal: avg(totals),
      avgSections: Object.fromEntries(Object.entries(sectionBuckets).map(([k, v]) => [k, avg(v)])),
      median: quantile(sorted, 0.5),
    }
    const testRows = Array.from(byTest.entries()).map(([id, row]) => {
      const s = row.totals.slice().sort((a, b) => a - b)
      return { id, label: testLabel(id), count: row.count, avgTotal: avg(row.totals), avgSections: Object.fromEntries(Object.entries(row.sections).map(([k, v]) => [k, avg(v)])), median: quantile(s, 0.5) }
    }).sort((a, b) => b.count - a.count)
    const topDomains = Array.from(weakByDomain.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8)
    const topChapters = Array.from(weakByChapter.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10)
    const allDays = Array.from(new Set([...attemptsByDay.keys(), ...completesByDay.keys()])).sort()
    const activitySeries = { labels: allDays, datasets: [
      { label: 'Started', data: allDays.map(d => attemptsByDay.get(d) || 0), borderColor: '#0ea5e9', backgroundColor: 'rgba(14,165,233,.08)', pointRadius: 2, tension: 0.25, fill: true },
      { label: 'Completed', data: allDays.map(d => completesByDay.get(d) || 0), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,.06)', pointRadius: 2, tension: 0.25, fill: true },
    ]}
    const histogram = (() => {
      const starts = examMode === 'act' ? [1, 6, 11, 16, 21, 26, 31] : [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600]
      const counts = new Array(starts.length).fill(0)
      for (const t of totals) {
        const cl = examMode === 'act' ? clamp(t, 1, 36) : clamp(t, 400, 1600)
        const idx = Math.min(starts.length - 1, Math.floor(examMode === 'act' ? (cl - 1) / 5 : (cl - 400) / 100))
        counts[idx] += 1
      }
      return { labels: starts.map(s => examMode === 'act' ? `${s}-${Math.min(36, s + 4)}` : `${s}-${Math.min(1600, s + 99)}`), datasets: [{ label: 'Students', data: counts, backgroundColor: 'rgba(26,39,68,.85)', borderRadius: 6, borderSkipped: false }] }
    })()
    const domainsChart = { labels: topDomains.map(([d]) => d), datasets: [{ label: 'Misses', data: topDomains.map(([, c]) => c), backgroundColor: topDomains.map((_, i) => ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#64748b'][i % 8]), borderRadius: 6, borderSkipped: false }] }
    const chaptersChart = { labels: topChapters.map(([ch]) => `Ch ${ch}`), datasets: [{ label: 'Misses', data: topChapters.map(([, c]) => c), backgroundColor: '#ef4444', borderRadius: 6, borderSkipped: false }] }
    return { summary, testRows, histogram, domainsChart, chaptersChart, activitySeries, scoreColumns }
  }, [filteredAttempts, analyticsExam])

  const tabs = [
    { id: 'students', label: 'Students', icon: 'students' },
    { id: 'results', label: 'Test Results', icon: 'results' },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
  ]

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>Loading…</div>

  const s = analytics.summary
  const chartOpts = (title, yMax) => ({ responsive: true, plugins: { legend: { display: true, labels: { color: 'rgba(255,255,255,.6)', font: { size: 11 } } }, tooltip: { backgroundColor: '#1a2744' } }, scales: { x: { ticks: { color: 'rgba(255,255,255,.5)', font: { size: 10 } }, grid: { display: false } }, y: { beginAtZero: true, max: yMax || undefined, ticks: { color: 'rgba(255,255,255,.45)', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,.06)' } } } })

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <nav className="nav">
        <BrandLink />
        <div className="nav-actions">
          <Link to="/dashboard" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}>
            My Dashboard
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>
            <Icon name="students" size={20} style={{ marginRight: 8, verticalAlign: '-3px' }} />
            {profile?.affiliation || 'My Students'}
          </h1>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginTop: 4 }}>{students.length} student{students.length !== 1 ? 's' : ''} enrolled</div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '8px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700,
              background: tab === t.id ? '#1a2744' : 'rgba(255,255,255,.06)', color: tab === t.id ? '#fff' : 'rgba(255,255,255,.5)', transition: 'all .2s',
            }}>
              <Icon name={t.icon} size={14} style={{ marginRight: 6, verticalAlign: '-2px' }} />{t.label}
            </button>
          ))}
        </div>

        {/* Students tab */}
        {tab === 'students' && (
          <div style={cardStyle}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: 'rgba(255,255,255,.85)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px', color: 'rgba(255,255,255,.45)' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Joined</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Tests</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Best Score</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st) => {
                    const best = computed.bestByUser.get(st.id)
                    const userAttempts = filteredAttempts.filter(a => a.user_id === st.id)
                    return (
                      <tr key={st.id} style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 600 }}>{st.full_name || '—'}</td>
                        <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,.5)' }}>{st.email}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', color: 'rgba(255,255,255,.4)' }}>{st.created_at ? new Date(st.created_at).toLocaleDateString() : '—'}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>{userAttempts.length}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700 }}>{best?.display || '—'}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <Link to={`/dashboard?user=${st.id}`} style={{ color: '#0ea5e9', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View</Link>
                          {' · '}
                          <Link to={`/report?user=${st.id}`} style={{ color: '#8b5cf6', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>Report</Link>
                        </td>
                      </tr>
                    )
                  })}
                  {!students.length && (
                    <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: 'rgba(255,255,255,.35)' }}>No students with your affiliation yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results tab */}
        {tab === 'results' && (
          <div style={cardStyle}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: 'rgba(255,255,255,.85)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px', color: 'rgba(255,255,255,.45)' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Student</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Test</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Date</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Total</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Top Weakness</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttempts.slice(0, 200).map((a) => {
                    const st = computed.studentById.get(a.user_id)
                    const total = attemptTotalScore(a)
                    return (
                      <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 600 }}>{st?.full_name || '—'}</td>
                        <td style={{ padding: '10px 12px' }}>{testLabel(a.test_id)}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', color: 'rgba(255,255,255,.4)' }}>{a.completed_at ? new Date(a.completed_at).toLocaleDateString() : '—'}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700 }}>{total || '—'}</td>
                        <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,.5)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formatTopWeakness(a)}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <Link to={`/results/${a.id}?user=${a.user_id}`} style={{ color: '#0ea5e9', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View</Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics tab */}
        {tab === 'analytics' && (
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Exam toggle */}
            <div style={{ display: 'flex', gap: 8 }}>
              {['sat', 'act'].map((ex) => (
                <button key={ex} onClick={() => setAnalyticsExam(ex)} style={{
                  padding: '7px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700,
                  background: analyticsExam === ex ? '#1a2744' : 'rgba(255,255,255,.06)', color: analyticsExam === ex ? '#fff' : 'rgba(255,255,255,.4)', transition: 'all .2s',
                }}>{ex.toUpperCase()}</button>
              ))}
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              <div style={kpiStyle}><div style={labelStyle}>Students</div><div style={bigNumStyle}>{students.length}</div></div>
              <div style={kpiStyle}><div style={labelStyle}>Active (7d)</div><div style={bigNumStyle}>{s.active7}</div></div>
              <div style={kpiStyle}><div style={labelStyle}>Active (30d)</div><div style={bigNumStyle}>{s.active30}</div></div>
              <div style={kpiStyle}><div style={labelStyle}>Avg {s.exam === 'act' ? 'Composite' : 'Total'}</div><div style={bigNumStyle}>{s.avgTotal ? Math.round(s.avgTotal) : '—'}</div></div>
              <div style={kpiStyle}><div style={labelStyle}>Median</div><div style={bigNumStyle}>{s.median ? Math.round(s.median) : '—'}</div></div>
              {analytics.scoreColumns.filter(c => c.key !== 'total').map((col) => (
                <div key={col.key} style={kpiStyle}><div style={labelStyle}>Avg {col.label}</div><div style={bigNumStyle}>{s.avgSections?.[col.key] ? Math.round(s.avgSections[col.key]) : '—'}</div></div>
              ))}
            </div>

            {/* Activity */}
            {analytics.activitySeries.labels.length > 0 && (
              <div style={cardStyle}><div style={{ ...labelStyle, marginBottom: 12 }}>Activity Over Time</div><Line data={analytics.activitySeries} options={chartOpts('Activity')} /></div>
            )}

            {/* Score Distribution */}
            <div style={cardStyle}><div style={{ ...labelStyle, marginBottom: 12 }}>Score Distribution</div><Bar data={analytics.histogram} options={chartOpts('Distribution')} /></div>

            {/* Weakness charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {analytics.domainsChart.labels.length > 0 && (
                <div style={cardStyle}><div style={{ ...labelStyle, marginBottom: 12 }}>Most Missed Domains</div><Bar data={analytics.domainsChart} options={chartOpts('Domains')} /></div>
              )}
              {analytics.chaptersChart.labels.length > 0 && (
                <div style={cardStyle}><div style={{ ...labelStyle, marginBottom: 12 }}>Most Missed Chapters</div><Bar data={analytics.chaptersChart} options={chartOpts('Chapters')} /></div>
              )}
            </div>

            {/* Test summary table */}
            {analytics.testRows.length > 0 && (
              <div style={cardStyle}>
                <div style={{ ...labelStyle, marginBottom: 12 }}>Test Summary</div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, color: 'rgba(255,255,255,.85)' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 10, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>
                        <th style={{ padding: '8px 10px', textAlign: 'left' }}>Test</th>
                        <th style={{ padding: '8px 10px', textAlign: 'center' }}>Attempts</th>
                        <th style={{ padding: '8px 10px', textAlign: 'center' }}>Avg Total</th>
                        <th style={{ padding: '8px 10px', textAlign: 'center' }}>Median</th>
                        {analytics.scoreColumns.filter(c => c.key !== 'total').map((col) => (
                          <th key={col.key} style={{ padding: '8px 10px', textAlign: 'center' }}>Avg {col.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.testRows.map((row) => (
                        <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                          <td style={{ padding: '8px 10px', fontWeight: 600 }}>{row.label}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>{row.count}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700 }}>{row.avgTotal ? Math.round(row.avgTotal) : '—'}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>{row.median ? Math.round(row.median) : '—'}</td>
                          {analytics.scoreColumns.filter(c => c.key !== 'total').map((col) => (
                            <td key={col.key} style={{ padding: '8px 10px', textAlign: 'center' }}>{row.avgSections?.[col.key] ? Math.round(row.avgSections[col.key]) : '—'}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
