import { CHAPTERS } from '../data/testData.js'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const READING_DOMAINS = new Set([
  'Craft & Structure',
  'Information & Ideas',
  'Standard English Conventions',
  'Expression of Ideas',
])

function lsKeyTestDate(userId) {
  return `agora_sat_test_date_v1:${userId || 'anon'}`
}

export function defaultStudyPrefs() {
  return {
    days: [true, true, true, true, true, false, false], // Mon–Fri
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
    return { days }
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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return ''
    return s
  } catch {
    return ''
  }
}

export function saveSatTestDate(userId, yyyyMmDd) {
  try {
    const s = String(yyyyMmDd || '').trim()
    if (!s) {
      localStorage.removeItem(lsKeyTestDate(userId))
      return
    }
    localStorage.setItem(lsKeyTestDate(userId), s)
  } catch {}
}

export function normalizeWeakTopics(input) {
  try {
    // 1) Array form: [{ ch, count, name, ... }, ...]
    if (Array.isArray(input)) {
      return input
        .map((t) => {
          const chRaw = t?.ch ?? t?.chapter_id ?? t?.chapter ?? t?.id
          const ch = chRaw == null ? null : String(chRaw)
          const countRaw = t?.count ?? t?.missed ?? t?.wrong ?? t?.n
          const count = Number.isFinite(Number(countRaw)) ? Number(countRaw) : 0
          if (!ch || count <= 0) return null
          const meta = CHAPTERS?.[ch] || {}
          return { ...(meta || {}), ...(t || {}), ch, count }
        })
        .filter(Boolean)
        .sort((a, b) => (Number(b.count) || 0) - (Number(a.count) || 0))
    }

    // 2) Object form: { "12": 3, "7": 1, ... } or { counts: {...} }
    const obj = input && typeof input === 'object' ? input : null
    const counts = obj?.counts && typeof obj.counts === 'object' ? obj.counts : obj
    if (!counts || typeof counts !== 'object') return []

    return Object.entries(counts)
      .map(([ch, c]) => {
        const count = Number.isFinite(Number(c)) ? Number(c) : 0
        if (!ch || count <= 0) return null
        const meta = CHAPTERS?.[String(ch)] || {}
        return { ...(meta || {}), ch: String(ch), count }
      })
      .filter(Boolean)
      .sort((a, b) => (Number(b.count) || 0) - (Number(a.count) || 0))
  } catch {
    return []
  }
}

function fmtDate(d) {
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

function dateKeyLocal(d) {
  const x = toDateOnly(d)
  const y = x.getFullYear()
  const m = String(x.getMonth() + 1).padStart(2, '0')
  const day = String(x.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
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
  const y = Number(m[1])
  const mo = Number(m[2])
  const da = Number(m[3])
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(da)) return null
  const d = new Date(y, mo - 1, da)
  if (d.getFullYear() !== y || d.getMonth() !== mo - 1 || d.getDate() !== da) return null
  return toDateOnly(d)
}

function daysBetween(a, b) {
  const ms = toDateOnly(b).getTime() - toDateOnly(a).getTime()
  return Math.round(ms / (24 * 60 * 60 * 1000))
}

export function chapterSubject(input) {
  const chapterId = typeof input === 'string' ? input : input?.ch
  const domain = CHAPTERS?.[chapterId]?.domain || input?.domain || ''
  return READING_DOMAINS.has(domain) ? 'Reading' : 'Math'
}

function chapterTaskUnits(count) {
  const n = Number(count || 0)
  if (n >= 6) return 3
  if (n >= 3) return 2
  return 1
}

function buildChapterQueues(weakTopics, studiedMap) {
  const reading = []
  const math = []
  for (const topic of normalizeWeakTopics(weakTopics)) {
    if (!topic?.ch || studiedMap?.[String(topic.ch)]) continue
    const units = chapterTaskUnits(topic.count)
    const base = {
      type: 'guide',
      chapterId: String(topic.ch),
      title: `Study Guide · Chapter ${topic.ch}`,
      subtitle: `${topic.name || 'Topic'} · ${topic.count || 0} missed`,
      href: `/guide?chapter=${encodeURIComponent(String(topic.ch))}`,
      subject: chapterSubject(topic),
      weight: Number(topic.count || 1),
      estimatedMinutes: Math.max(15, Math.min(32, 14 + Number(topic.count || 1) * 3)),
    }
    for (let i = 0; i < units; i++) {
      const task = units > 1
        ? { ...base, id: `${base.chapterId}-${i + 1}`, subtitle: `${base.subtitle} · Session ${i + 1}/${units}` }
        : { ...base, id: base.chapterId }
      if (task.subject === 'Reading') reading.push(task)
      else math.push(task)
    }
  }
  const byWeight = (a, b) => (b.weight - a.weight) || String(a.chapterId).localeCompare(String(b.chapterId))
  reading.sort(byWeight)
  math.sort(byWeight)
  return { reading, math }
}

function takeNextTask(queue, blockedChapterIds = new Set()) {
  if (!Array.isArray(queue) || !queue.length) return null
  const index = queue.findIndex((task) => !blockedChapterIds.has(String(task.chapterId || '')))
  if (index === -1) return null
  return queue.splice(index, 1)[0]
}

export function buildAdaptiveSchedule({
  weakTopics,
  studiedMap,
  reviewCount = 0,
  hasTakenPretest = false,
  prefs,
  testDate,
  fromDate = new Date(),
}) {
  const p = prefs || defaultStudyPrefs()
  const start = toDateOnly(fromDate)
  const target = parseYyyyMmDd(testDate)
  let end = target ? toDateOnly(target) : toDateOnly(new Date(start.getTime() + 13 * 24 * 60 * 60 * 1000))
  if (target) end.setDate(end.getDate() - 3)
  if (end.getTime() < start.getTime()) {
    end = toDateOnly(new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000))
  }

  const days = []
  for (let i = 0; ; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push({
      key: dateKeyLocal(d),
      date: d,
      label: fmtDate(d),
      isToday: i === 0,
      isActive: Boolean(p.days[weekdayIndex(d)]),
      tasks: [],
    })
    if (dateKeyLocal(d) === dateKeyLocal(end)) break
  }

  const activeDays = days.filter((d) => d.isActive)
  const usableDays = activeDays.length ? activeDays : days
  const { reading, math } = buildChapterQueues(weakTopics, studiedMap || {})
  const pendingReviewCount = Math.max(0, Number(reviewCount || 0))
  let reviewBlocks = Math.ceil(pendingReviewCount / 5)
  let reviewLeft = pendingReviewCount
  const reviewMinutes = Array.from({ length: reviewBlocks }, (_, index) => {
    const amount = Math.min(5, Math.max(1, pendingReviewCount - index * 5 || 5))
    return Math.max(12, amount * 3)
  }).reduce((sum, value) => sum + value, 0)
  const totalUnits = reading.length + math.length + reviewBlocks
  const totalMinutes = [...reading, ...math].reduce((sum, task) => sum + Number(task.estimatedMinutes || 0), 0) + reviewMinutes
  const requiredMinutesPerDay = Math.max(20, Math.ceil((totalMinutes / Math.max(1, usableDays.length)) / 5) * 5)
  const effectiveMinutesPerDay = requiredMinutesPerDay
  const avgTasksNeeded = Math.ceil(totalUnits / Math.max(1, usableDays.length))
  const capacityByTime = Math.max(1, Math.floor(effectiveMinutesPerDay / 15))
  const tasksPerDay = Math.max(1, Math.min(Math.max(8, avgTasksNeeded), Math.max(avgTasksNeeded, capacityByTime)))
  let nextSubject = reading.length >= math.length ? 'Reading' : 'Math'

  for (const day of usableDays) {
    const tasks = []
    let usedMinutes = 0
    const chapterIdsUsedToday = new Set()

    if (reviewBlocks > 0 && tasks.length < tasksPerDay) {
      const amount = Math.min(5, Math.max(1, reviewLeft || 5))
      const reviewTask = {
        id: `review-${day.key}`,
        type: 'mistakes',
        subject: 'Mixed',
        title: `Review ${amount} missed question${amount === 1 ? '' : 's'}`,
        subtitle: 'Use the Mistake Notebook and validate each one you fix.',
        href: '/mistakes',
        estimatedMinutes: Math.max(12, amount * 3),
      }
      if (!tasks.length || usedMinutes + reviewTask.estimatedMinutes <= effectiveMinutesPerDay) {
        tasks.push(reviewTask)
        usedMinutes += reviewTask.estimatedMinutes
      }
      reviewLeft = Math.max(0, reviewLeft - amount)
      reviewBlocks -= 1
    }

    while (tasks.length < tasksPerDay && (reading.length || math.length)) {
      const preferredQueue = nextSubject === 'Reading' ? reading : math
      const fallbackQueue = nextSubject === 'Reading' ? math : reading
      let task = takeNextTask(preferredQueue, chapterIdsUsedToday)
      if (!task) task = takeNextTask(fallbackQueue, chapterIdsUsedToday)
      if (!task) break
      const estimatedMinutes = Number(task.estimatedMinutes || 20)
      if (tasks.length > 0 && usedMinutes + estimatedMinutes > effectiveMinutesPerDay) {
        if (task.subject === 'Reading') reading.unshift(task)
        else math.unshift(task)
        break
      }
      tasks.push(task)
      if (task.chapterId) chapterIdsUsedToday.add(String(task.chapterId))
      usedMinutes += estimatedMinutes
      if (reading.length && math.length) {
        nextSubject = task.subject === 'Reading' ? 'Math' : 'Reading'
      }
    }

    day.tasks = tasks
    const subjects = new Set(tasks.map((task) => task.subject).filter((subject) => subject === 'Reading' || subject === 'Math'))
    day.focus = subjects.size > 1 ? 'Mixed' : tasks.find((task) => task.subject === 'Reading' || task.subject === 'Math')?.subject || (tasks.length ? 'Mixed' : 'Rest')
    day.estimatedMinutes = usedMinutes
  }

  const overflowTasks = []
  while (reviewBlocks > 0) {
    const amount = Math.min(5, Math.max(1, reviewLeft || 5))
    overflowTasks.push({
      id: `review-overflow-${overflowTasks.length + 1}`,
      type: 'mistakes',
      subject: 'Mixed',
      title: `Review ${amount} missed question${amount === 1 ? '' : 's'}`,
      subtitle: 'Use the Mistake Notebook and validate each one you fix.',
      href: '/mistakes',
      estimatedMinutes: Math.max(12, amount * 3),
    })
    reviewLeft = Math.max(0, reviewLeft - amount)
    reviewBlocks -= 1
  }
  overflowTasks.push(...reading, ...math)

  if (overflowTasks.length && usableDays.length) {
    let dayIndex = 0
    for (const task of overflowTasks) {
      const targetDay = usableDays[dayIndex % usableDays.length]
      targetDay.tasks.push(task)
      targetDay.estimatedMinutes = Number(targetDay.estimatedMinutes || 0) + Number(task.estimatedMinutes || 0)
      const subjects = new Set(targetDay.tasks.map((item) => item.subject).filter((subject) => subject === 'Reading' || subject === 'Math'))
      targetDay.focus = subjects.size > 1
        ? 'Mixed'
        : targetDay.tasks.find((item) => item.subject === 'Reading' || item.subject === 'Math')?.subject || (targetDay.tasks.length ? 'Mixed' : 'Rest')
      dayIndex += 1
    }
  }

  return {
    startKey: days[0]?.key || '',
    endKey: days[days.length - 1]?.key || '',
    tasksPerDay,
    days,
    activeDays: usableDays,
    totalTasks: totalUnits,
    totalMinutes,
    hasTestDate: Boolean(target),
    requiredMinutesPerDay,
    effectiveMinutesPerDay,
    needsMoreTime: requiredMinutesPerDay > 90,
  }
}

export function buildWeeklyStudyPlan({ scores, weakTopics, prefs }) {
  const p = prefs || defaultStudyPrefs()
  const days = next7Days(new Date())
  const activeDays = days.filter((d) => p.days[weekdayIndex(d)])
  const sessions = Math.max(3, Math.min(7, activeDays.length || 5))

  const topics = normalizeWeakTopics(weakTopics)
  const top = topics.slice(0, 6)
  const totalWeight = top.reduce((sum, t) => sum + (t.count || 1), 0) || 1

  const focus = []
  for (let i = 0; i < sessions; i++) {
    const target = (i + 0.5) / sessions
    let acc = 0
    let chosen = top[top.length - 1] || null
    for (const t of top) {
      acc += (t.count || 1) / totalWeight
      if (acc >= target) {
        chosen = t
        break
      }
    }
    focus.push(chosen)
  }

  const lines = []
  lines.push('WEEKLY STUDY PLAN (AUTO)')
  lines.push(`Recommended pace: about ${Math.max(20, Math.ceil((45 * sessions) / Math.max(1, sessions) / 5) * 5)} min per study day · ${sessions} sessions this week`)
  if (scores?.total) lines.push(`Last score: ${scores.total} (R&W ${scores.rw || '—'} / Math ${scores.math || '—'})`)
  lines.push('')

  if (!top.length) {
    lines.push('No weak topics detected yet. Do 3 timed mixed sets this week + review every mistake.')
    return lines.join('\n')
  }

  lines.push("THIS WEEK'S PRIORITIES")
  top.slice(0, 3).forEach((t, i) => {
    lines.push(`${i + 1}) Chapter ${t.ch} — ${t.name || 'Topic'} (${t.count || 0} missed)`)
  })
  lines.push('')

  lines.push('HOW TO DO EACH SESSION')
  lines.push('1) 8 min: Review missed questions (Mistake Notebook)')
  lines.push('2) 22 min: Study the focus chapter (read + examples)')
  lines.push('3) 15 min: Practice (aim for 25/25 mastery in Study Guide)')
  lines.push('')

  lines.push('SCHEDULE (NEXT 7 DAYS)')
  let dayCursor = 0
  for (let i = 0; i < sessions; i++) {
    const d = activeDays[dayCursor] || days[dayCursor] || new Date()
    dayCursor += 1
    const t = focus[i]
    if (!t) continue
    lines.push(`- ${fmtDate(d)}: Chapter ${t.ch} — ${t.name || 'Topic'} → /guide?chapter=${encodeURIComponent(t.ch)}`)
  }
  lines.push('')

  lines.push('RE-BALANCE RULE')
  lines.push('After your next timed test, this plan auto-updates based on the newest missed-topic counts.')
  return lines.join('\n')
}

export function buildStudyPlanToTestDate({ scores, weakTopics, prefs, testDate }) {
  const p = prefs || defaultStudyPrefs()
  const start = toDateOnly(new Date())
  const target = parseYyyyMmDd(testDate)
  if (!target) return buildWeeklyStudyPlan({ scores, weakTopics, prefs: p })

  const end = toDateOnly(new Date(target))
  end.setDate(end.getDate() - 3)
  const horizonDays = daysBetween(start, end)
  if (!Number.isFinite(horizonDays) || horizonDays < 7) {
    return buildWeeklyStudyPlan({ scores, weakTopics, prefs: p })
  }

  const sessionDates = []
  for (let i = 0; i <= horizonDays; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    if (p.days[weekdayIndex(d)]) sessionDates.push(d)
  }
  const sessions = Math.max(3, Math.min(120, sessionDates.length))

  const topics = normalizeWeakTopics(weakTopics)
  const top = topics.slice(0, 8)
  const totalWeight = top.reduce((sum, t) => sum + (t.count || 1), 0) || 1

  const focus = []
  for (let i = 0; i < sessions; i++) {
    const targetP = (i + 0.5) / sessions
    let acc = 0
    let chosen = top[top.length - 1] || null
    for (const t of top) {
      acc += (t.count || 1) / totalWeight
      if (acc >= targetP) {
        chosen = t
        break
      }
    }
    focus.push(chosen)
  }

  const lines = []
  lines.push('STUDY PLAN (TO TEST DATE)')
  lines.push(`SAT test date: ${fmtDate(target)} · Plan runs until: ${fmtDate(end)} (3-day taper)`)
  const recommendedMinutes = Math.max(20, Math.ceil((top.reduce((sum, t) => sum + chapterTaskUnits(t.count) * Math.max(15, Math.min(32, 14 + Number(t.count || 1) * 3)), 0) / Math.max(1, sessions)) / 5) * 5)
  lines.push(`Recommended pace: about ${recommendedMinutes} min per study day · ${sessions} sessions planned`)
  if (scores?.total) lines.push(`Last score: ${scores.total} (R&W ${scores.rw || '—'} / Math ${scores.math || '—'})`)
  lines.push('')

  if (!top.length) {
    lines.push('No weak topics detected yet. Take a test, then review your mistakes and start the Study Guide mastery sets.')
    return lines.join('\n')
  }

  lines.push('TOP PRIORITIES (FROM MISSED TOPICS)')
  top.slice(0, 5).forEach((t, i) => {
    lines.push(`${i + 1}) Chapter ${t.ch} — ${t.name || 'Topic'} (${t.count || 0} missed)`)
  })
  lines.push('')

  lines.push('SESSION TEMPLATE')
  lines.push('1) 10 min: Mistake Notebook (redo + optional explanation)')
  lines.push('2) 20 min: Study the focus chapter (guide + examples)')
  lines.push('3) 15 min: Practice (aim 25/25 mastery in Study Guide)')
  lines.push('')

  lines.push('SCHEDULE (UNTIL 3 DAYS BEFORE TEST)')
  for (let i = 0; i < sessions; i++) {
    const d = sessionDates[i]
    const t = focus[i]
    if (!d || !t) continue
    lines.push(`- ${fmtDate(d)}: Chapter ${t.ch} — ${t.name || 'Topic'} → /guide?chapter=${encodeURIComponent(t.ch)}`)
  }
  lines.push('')

  lines.push('FINAL 3-DAY TAPER')
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
    weakTopics: normalizeWeakTopics(attempt?.weak_topics || []),
    prefs,
    testDate,
  })
}

export function dayLabels() {
  return DAYS.slice()
}
