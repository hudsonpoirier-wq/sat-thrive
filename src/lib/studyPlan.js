const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function lsKeyTestDate(userId) {
  return `agora_sat_test_date_v1:${userId || 'anon'}`
}

export function defaultStudyPrefs() {
  return {
    days: [true, true, true, true, true, false, false], // Mon–Fri
    minutesPerDay: 45,
  }
}

export function loadStudyPrefs(userId) {
  try {
    const key = `agora_study_prefs_v1:${userId || 'anon'}`
    const raw = localStorage.getItem(key)
    if (!raw) return defaultStudyPrefs()
    const p = JSON.parse(raw)
    const base = defaultStudyPrefs()
    const days = Array.isArray(p?.days) && p.days.length === 7 ? p.days.map(Boolean) : base.days
    const minutesPerDay = Number.isFinite(Number(p?.minutesPerDay)) ? Math.max(20, Math.min(180, Number(p.minutesPerDay))) : base.minutesPerDay
    return { days, minutesPerDay }
  } catch {
    return defaultStudyPrefs()
  }
}

export function saveStudyPrefs(userId, prefs) {
  const key = `agora_study_prefs_v1:${userId || 'anon'}`
  localStorage.setItem(key, JSON.stringify(prefs))
}

export function loadSatTestDate(userId) {
  try {
    const raw = localStorage.getItem(lsKeyTestDate(userId))
    if (!raw) return ''
    const s = String(raw || '').trim()
    // stored as yyyy-mm-dd
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return ''
    return s
  } catch {
    return ''
  }
}

export function saveSatTestDate(userId, yyyyMmDd) {
  try {
    const s = String(yyyyMmDd || '').trim()
    if (!s) { localStorage.removeItem(lsKeyTestDate(userId)); return }
    localStorage.setItem(lsKeyTestDate(userId), s)
  } catch {}
}

function fmtDate(d) {
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

function next7Days(start = new Date()) {
  const s = new Date(start)
  s.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, i) => new Date(s.getTime() + i * 24 * 60 * 60 * 1000))
}

function weekdayIndex(d) {
  // JS: 0=Sun..6=Sat -> map to 0=Mon..6=Sun
  const js = d.getDay()
  return (js + 6) % 7
}

function toDateOnly(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function parseYyyyMmDd(s) {
  if (!s) return null
  const m = String(s).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const y = Number(m[1]); const mo = Number(m[2]); const da = Number(m[3])
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(da)) return null
  const d = new Date(y, mo - 1, da)
  if (d.getFullYear() !== y || d.getMonth() !== (mo - 1) || d.getDate() !== da) return null
  return toDateOnly(d)
}

function daysBetween(a, b) {
  const ms = toDateOnly(b).getTime() - toDateOnly(a).getTime()
  return Math.round(ms / (24 * 60 * 60 * 1000))
}

export function buildWeeklyStudyPlan({ scores, weakTopics, prefs }) {
  const p = prefs || defaultStudyPrefs()
  const days = next7Days(new Date())
  const activeDays = days.filter((d) => p.days[weekdayIndex(d)])
  const sessions = Math.max(3, Math.min(7, activeDays.length || 5))

  const topics = (Array.isArray(weakTopics) ? weakTopics : [])
    .filter(t => t && t.ch)
    .slice()
    .sort((a, b) => (b.count || 0) - (a.count || 0))

  const top = topics.slice(0, 6)
  const totalWeight = top.reduce((sum, t) => sum + (t.count || 1), 0) || 1

  // Allocate one focus topic per session (weighted).
  const focus = []
  for (let i = 0; i < sessions; i++) {
    const target = (i + 0.5) / sessions
    let acc = 0
    let chosen = top[top.length - 1] || null
    for (const t of top) {
      acc += (t.count || 1) / totalWeight
      if (acc >= target) { chosen = t; break }
    }
    focus.push(chosen)
  }

  const lines = []
  lines.push('📅 WEEKLY STUDY PLAN (AUTO)')
  lines.push(`Target: ${p.minutesPerDay} min/day · ${sessions} sessions this week`)
  if (scores?.total) lines.push(`Last score: ${scores.total} (R&W ${scores.rw || '—'} / Math ${scores.math || '—'})`)
  lines.push('')

  if (!top.length) {
    lines.push('No weak topics detected yet. Do 3 timed mixed sets this week + review every mistake.')
    return lines.join('\n')
  }

  lines.push('🔴 THIS WEEK\'S PRIORITIES')
  top.slice(0, 3).forEach((t, i) => {
    lines.push(`${i + 1}) Chapter ${t.ch} — ${t.name || 'Topic'} (${t.count || 0} missed)`)
  })
  lines.push('')

  lines.push('✅ HOW TO DO EACH SESSION')
  lines.push('1) 8 min: Review due items (Review Queue)')
  lines.push('2) 22 min: Study the focus chapter (read + examples)')
  lines.push('3) 15 min: Practice (aim for 25/25 mastery in Study Guide)')
  lines.push('')

  lines.push('🗓 SCHEDULE (NEXT 7 DAYS)')
  let dayCursor = 0
  for (let i = 0; i < sessions; i++) {
    const d = activeDays[dayCursor] || days[dayCursor] || new Date()
    dayCursor += 1
    const t = focus[i]
    if (!t) continue
    lines.push(`- ${fmtDate(d)}: Chapter ${t.ch} — ${t.name || 'Topic'} → /guide?chapter=${encodeURIComponent(t.ch)}`)
  }
  lines.push('')

  lines.push('🔁 RE-BALANCE RULE')
  lines.push('After your next timed test, this plan auto-updates based on the newest missed-topic counts.')
  return lines.join('\n')
}

export function buildStudyPlanToTestDate({ scores, weakTopics, prefs, testDate }) {
  const p = prefs || defaultStudyPrefs()
  const start = toDateOnly(new Date())
  const target = parseYyyyMmDd(testDate)
  if (!target) return buildWeeklyStudyPlan({ scores, weakTopics, prefs: p })

  // End 3 days before the test.
  const end = toDateOnly(new Date(target))
  end.setDate(end.getDate() - 3)
  const horizonDays = daysBetween(start, end)
  if (!Number.isFinite(horizonDays) || horizonDays < 7) {
    return buildWeeklyStudyPlan({ scores, weakTopics, prefs: p })
  }

  // Build all session dates up to end (respecting selected days-of-week).
  const sessionDates = []
  for (let i = 0; i <= horizonDays; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    if (p.days[weekdayIndex(d)]) sessionDates.push(d)
  }
  const sessions = Math.max(3, Math.min(120, sessionDates.length))

  const topics = (Array.isArray(weakTopics) ? weakTopics : [])
    .filter(t => t && t.ch)
    .slice()
    .sort((a, b) => (b.count || 0) - (a.count || 0))

  const top = topics.slice(0, 8)
  const totalWeight = top.reduce((sum, t) => sum + (t.count || 1), 0) || 1

  // Allocate a focus topic per session (weighted) across the full horizon.
  const focus = []
  for (let i = 0; i < sessions; i++) {
    const targetP = (i + 0.5) / sessions
    let acc = 0
    let chosen = top[top.length - 1] || null
    for (const t of top) {
      acc += (t.count || 1) / totalWeight
      if (acc >= targetP) { chosen = t; break }
    }
    focus.push(chosen)
  }

  const lines = []
  lines.push('🗓 STUDY PLAN (TO TEST DATE)')
  lines.push(`SAT test date: ${fmtDate(target)} · Plan runs until: ${fmtDate(end)} (3-day taper)`)
  lines.push(`Target: ${p.minutesPerDay} min/day · ${sessions} sessions planned`)
  if (scores?.total) lines.push(`Last score: ${scores.total} (R&W ${scores.rw || '—'} / Math ${scores.math || '—'})`)
  lines.push('')

  if (!top.length) {
    lines.push('No weak topics detected yet. Do 2 timed sets/week + review every mistake + keep mastery streak in the Study Guide.')
    return lines.join('\n')
  }

  lines.push('🔴 TOP PRIORITIES (FROM MISSED TOPICS)')
  top.slice(0, 5).forEach((t, i) => {
    lines.push(`${i + 1}) Chapter ${t.ch} — ${t.name || 'Topic'} (${t.count || 0} missed)`)
  })
  lines.push('')

  lines.push('✅ SESSION TEMPLATE')
  lines.push('1) 10 min: Mistake Notebook (redo + write your explanation)')
  lines.push('2) 20 min: Study the focus chapter (guide + examples)')
  lines.push('3) 15 min: Practice (aim 25/25 mastery in Study Guide)')
  lines.push('')

  lines.push('🗓 SCHEDULE (UNTIL 3 DAYS BEFORE TEST)')
  for (let i = 0; i < sessions; i++) {
    const d = sessionDates[i]
    const t = focus[i]
    if (!d || !t) continue
    lines.push(`- ${fmtDate(d)}: Chapter ${t.ch} — ${t.name || 'Topic'} → /guide?chapter=${encodeURIComponent(t.ch)}`)
  }
  lines.push('')

  lines.push('🧊 FINAL 3-DAY TAPER')
  lines.push('- 3 days out: Light review only (notes + 1 short set).')
  lines.push('- 2 days out: Only the hardest 10 mistakes + formulas.')
  lines.push('- 1 day out: Rest + confidence review.')
  return lines.join('\n')
}

export function buildPlanFromAttempt(attempt, userId) {
  const prefs = loadStudyPrefs(userId)
  const testDate = loadSatTestDate(userId)
  return buildStudyPlanToTestDate({
    scores: attempt?.scores || {},
    weakTopics: attempt?.weak_topics || [],
    prefs,
    testDate,
  })
}

export function dayLabels() {
  return DAYS.slice()
}
