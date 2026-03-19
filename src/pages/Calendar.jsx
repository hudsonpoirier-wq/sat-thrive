import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import { buildAdaptiveSchedule, loadSatTestDate, loadStudyPrefs, normalizeWeakTopics } from '../lib/studyPlan.js'
import { CHAPTERS } from '../data/testData.js'
import { loadDashboardViewData, loadProfileSafe } from '../lib/dashboardData.js'
import { resolveViewContext, withViewUser } from '../lib/viewAs.js'

function Navbar({ homeHref, guideHref, isAdminPreview }) {
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <BrandLink to={homeHref} />
      <div className="nav-actions">
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
          style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}
          title="Go back"
        >
          ← Back
        </button>
        <Link to={guideHref} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.85)', borderColor: 'rgba(255,255,255,.22)', background: 'rgba(255,255,255,.08)' }}>
          Study Guide
        </Link>
        {isAdminPreview && (
          <Link to="/admin" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.85)', borderColor: 'rgba(255,255,255,.22)', background: 'rgba(255,255,255,.08)' }}>
            Admin
          </Link>
        )}
      </div>
    </nav>
  )
}

function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function endOfWeek(date) {
  const d = startOfWeek(date)
  d.setDate(d.getDate() + 6)
  return d
}

function dateKey(d) {
  return new Date(d).toISOString().slice(0, 10)
}

export default function CalendarPage() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const { viewUserId, isAdminPreview } = useMemo(
    () => resolveViewContext({ userId: user?.id, profile, search: location.search }),
    [user?.id, profile, location.search]
  )

  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState([])
  const [studied, setStudied] = useState({})
  const [mistakes, setMistakes] = useState([])
  const [reviewItems, setReviewItems] = useState({})
  const [targetProfile, setTargetProfile] = useState(null)
  const [selectedDayKey, setSelectedDayKey] = useState('')

  useEffect(() => {
    if (!viewUserId) return
    let cancelled = false
    setLoading(true)

    Promise.all([
      loadDashboardViewData(viewUserId),
      isAdminPreview ? loadProfileSafe(viewUserId) : Promise.resolve(null),
    ]).then(([data, previewProfile]) => {
      if (cancelled) return
      setAttempts(data.attempts || [])
      setStudied(data.studiedMap || {})
      setMistakes(data.mistakes || [])
      setReviewItems(data.reviewItems || {})
      setTargetProfile(previewProfile || null)
      setLoading(false)
    }).catch(() => {
      if (cancelled) return
      setAttempts([])
      setStudied({})
      setMistakes([])
      setReviewItems({})
      setTargetProfile(null)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [viewUserId, isAdminPreview])

  const displayProfile = isAdminPreview ? targetProfile : profile
  const completed = attempts.filter(a => a.completed_at || a.scores?.total)
  const latestCompleted = completed[0] || null
  const hasTakenPretest = completed.some(a => a.test_id === 'pre_test' || a.test_id === 'practice_test_11')
  const latestMistakes = latestCompleted ? (mistakes || []).filter(m => String(m.attempt_id || '') === String(latestCompleted.id)) : []
  const latestValidated = latestMistakes.filter((m) => {
    const key = `${m.test_id}:${m.section}:${m.q_num}`
    return reviewItems?.[key]?.last_correct === true
  }).length
  const reviewTodoCount = Math.max(0, latestMistakes.length - latestValidated)

  const deriveWeakTopicsForAttempt = (attempt) => {
    const normalized = normalizeWeakTopics(attempt?.weak_topics || [])
    if (normalized.length) return normalized
    const list = (mistakes || []).filter((m) => String(m.attempt_id || '') === String(attempt?.id || '') && m.chapter_id)
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

  const schedule = useMemo(() => {
    if (!latestCompleted || !hasTakenPretest) return null
    return buildAdaptiveSchedule({
      weakTopics: deriveWeakTopicsForAttempt(latestCompleted),
      studiedMap: studied,
      reviewCount: reviewTodoCount,
      hasViewedResults: false,
      hasTakenPretest: true,
      prefs: loadStudyPrefs(viewUserId),
      testDate: loadSatTestDate(viewUserId),
    })
  }, [latestCompleted, hasTakenPretest, studied, reviewTodoCount, viewUserId, mistakes])

  const homeHref = withViewUser('/dashboard', viewUserId, isAdminPreview)
  const guideHref = withViewUser('/guide', viewUserId, isAdminPreview)
  const resultsHref = latestCompleted ? withViewUser(`/results/${latestCompleted.id}`, viewUserId, isAdminPreview) : homeHref

  const calendarCells = useMemo(() => {
    if (!schedule?.days?.length) return []
    const first = startOfWeek(schedule.days[0].date)
    const last = endOfWeek(schedule.days[schedule.days.length - 1].date)
    const map = new Map((schedule.days || []).map((day) => [day.key, day]))
    const cells = []
    const cursor = new Date(first)
    while (cursor.getTime() <= last.getTime()) {
      const key = dateKey(cursor)
      cells.push({ key, date: new Date(cursor), day: map.get(key) || null })
      cursor.setDate(cursor.getDate() + 1)
    }
    return cells
  }, [schedule])

  useEffect(() => {
    if (!schedule?.days?.length) return
    setSelectedDayKey((prev) => prev || schedule.days[0].key)
  }, [schedule])

  const selectedDay = useMemo(() => {
    if (!schedule?.days?.length) return null
    return schedule.days.find((day) => day.key === selectedDayKey) || schedule.days[0] || null
  }, [schedule, selectedDayKey])

  const viewHref = (path) => withViewUser(path, viewUserId, isAdminPreview)

  if (loading) {
    return (
      <>
        <Navbar homeHref={homeHref} guideHref={guideHref} isAdminPreview={isAdminPreview} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)', color: '#64748b' }}>
          Loading calendar…
        </div>
      </>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar homeHref={homeHref} guideHref={guideHref} isAdminPreview={isAdminPreview} />
      <div className="page fade-up">
        {isAdminPreview && (
          <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, rgba(26,39,68,.96), rgba(30,58,138,.94))', color: 'white' }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>Admin View</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.88 }}>
              You’re previewing {displayProfile?.full_name || 'this student'}’s adaptive schedule. This view is read-only.
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="calendar" size={20} />
              Smart Journey Calendar
            </h1>
            <div style={{ marginTop: 4, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Click a day to see the exact study guide chapters and follow-up tasks assigned between now and the test window.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn btn-outline" to={guideHref}>Open Study Guide →</Link>
            <Link className="btn btn-outline" to={resultsHref}>Latest Results →</Link>
          </div>
        </div>

        {!schedule ? (
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>No calendar yet</div>
            <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Take the Pre Test first, then the Smart Journey calendar will fill in with day-by-day study guide tasks.
            </div>
          </div>
        ) : (
          <div className="calendar-layout">
            <div className="card" style={{ padding: 16 }}>
              <div className="calendar-weekdays">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
                  <div key={label}>{label}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {calendarCells.map(({ key, date, day }) => {
                  const isSelected = selectedDay?.key === key
                  const isInPlan = Boolean(day)
                  const isToday = Boolean(day?.isToday)
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => isInPlan && setSelectedDayKey(key)}
                      disabled={!isInPlan}
                      className={`calendar-cell${isSelected ? ' selected' : ''}${isToday ? ' today' : ''}${!isInPlan ? ' muted' : ''}`}
                    >
                      <div className="calendar-cell-date">{date.getDate()}</div>
                      {isInPlan ? (
                        <>
                          <div className="calendar-cell-focus">{day.focus}</div>
                          <div className="calendar-cell-count">
                            {day.tasks.length ? `${day.tasks.length} task${day.tasks.length === 1 ? '' : 's'}` : 'Review / rest'}
                          </div>
                        </>
                      ) : (
                        <div className="calendar-cell-count">—</div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              {selectedDay ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 4 }}>
                        {selectedDay.isToday ? 'Today' : selectedDay.date.toLocaleDateString(undefined, { weekday: 'long' })}
                      </div>
                      <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 20, fontWeight: 900, color: '#1a2744' }}>
                        {selectedDay.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div style={{
                      padding: '6px 12px',
                      borderRadius: 999,
                      background: selectedDay.focus === 'Reading' ? 'rgba(59,130,246,.12)' : selectedDay.focus === 'Math' ? 'rgba(16,185,129,.12)' : 'rgba(148,163,184,.16)',
                      color: selectedDay.focus === 'Reading' ? '#2563eb' : selectedDay.focus === 'Math' ? '#059669' : '#64748b',
                      fontSize: 12,
                      fontWeight: 900,
                    }}>
                      {selectedDay.focus}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    {selectedDay.tasks.length ? selectedDay.tasks.map((task) => (
                      <Link
                        key={task.id}
                        to={viewHref(task.href)}
                        style={{
                          textDecoration: 'none',
                          color: '#0f172a',
                          border: '1px solid #e2e8f0',
                          borderRadius: 14,
                          padding: 14,
                          background: '#f8fafc',
                        }}
                      >
                        <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 4 }}>{task.title}</div>
                        <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{task.subtitle}</div>
                      </Link>
                    )) : (
                      <div style={{ border: '1px dashed #cbd5e1', borderRadius: 14, padding: 14, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                        No required tasks on this day. Use it for catch-up, a light review set, or a confidence reset.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ color: '#64748b', fontSize: 13 }}>Select a day to see its tasks.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
