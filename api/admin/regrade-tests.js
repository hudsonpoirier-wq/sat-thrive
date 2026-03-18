import { createClient } from '@supabase/supabase-js'
import { ANSWER_KEY, CHAPTERS, MODULES, QUESTION_CHAPTER_MAP, freeResponseMatches, rawToScaled } from '../../src/data/testData.js'
import { getAnswerKeyBySection } from '../../src/data/answerKeys.js'

const ADMIN_EMAIL = 'agora@admin.org'

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function normalizeTestId(id) {
  if (!id || id === 'practice_test_11') return 'pre_test'
  return id
}

function getKeyForTest(testId) {
  const normalized = normalizeTestId(testId)
  return getAnswerKeyBySection(normalized) || (normalized === 'pre_test' ? ANSWER_KEY : null)
}

function isChoiceLetter(value) {
  const s = String(value || '').trim().toUpperCase()
  return s === 'A' || s === 'B' || s === 'C' || s === 'D'
}

function computeScoresAndWeakTopics(attempt) {
  const keyBySection = getKeyForTest(attempt?.test_id)
  const answers = attempt?.answers || {}
  if (!keyBySection || !answers || typeof answers !== 'object') return null

  const counts = {}
  let rawRW = 0
  let rawMath = 0

  for (const section of Object.keys(MODULES)) {
    const key = keyBySection?.[section] || {}
    const sectionAnswers = answers?.[section] || {}
    const chapterMap = QUESTION_CHAPTER_MAP?.[section] || {}
    const totalQ = MODULES?.[section]?.questions || 0

    for (let q = 1; q <= totalQ; q++) {
      const right = key?.[q]
      if (right == null) continue
      const given = sectionAnswers?.[q]
      const ok = isChoiceLetter(right)
        ? String(given || '').toUpperCase() === String(right).toUpperCase()
        : freeResponseMatches(given, right)

      if (ok) {
        if (section.startsWith('rw_')) rawRW += 1
        else rawMath += 1
      } else {
        const chapterId = chapterMap?.[q]
        if (chapterId) counts[chapterId] = (counts[chapterId] || 0) + 1
      }
    }
  }

  const scores = rawToScaled(rawRW, rawMath)
  const weakTopics = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([ch, count]) => ({ ch, count, ...(CHAPTERS?.[ch] || {}) }))

  return { scores, weakTopics }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return json(res, 500, { error: 'Missing server configuration' })

  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return json(res, 401, { error: 'Missing bearer token' })

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

  try {
    const { data: userData, error: userErr } = await admin.auth.getUser(token)
    if (userErr) return json(res, 401, { error: 'Invalid session' })
    const requesterId = userData?.user?.id
    const requesterEmail = String(userData?.user?.email || '').toLowerCase()

    const { data: profile, error: profileErr } = await admin
      .from('profiles')
      .select('id,email,role')
      .eq('id', requesterId)
      .maybeSingle()

    if (profileErr) return json(res, 403, { error: 'Not authorized' })

    const isAdmin = profile?.role === 'admin'
      && String(profile?.email || '').toLowerCase() === ADMIN_EMAIL
      && requesterEmail === ADMIN_EMAIL
    if (!isAdmin) return json(res, 403, { error: 'Not authorized' })

    const { data: attempts, error: attemptsErr } = await admin
      .from('test_attempts')
      .select('id,test_id,answers,scores,weak_topics')
      .not('completed_at', 'is', null)
      .limit(5000)

    if (attemptsErr) return json(res, 500, { error: attemptsErr.message || 'Failed to load attempts' })

    let scanned = 0
    let updated = 0

    for (const attempt of attempts || []) {
      if (!attempt?.answers || !Object.keys(attempt.answers || {}).length) continue
      scanned += 1
      const next = computeScoresAndWeakTopics(attempt)
      if (!next) continue

      const scoresChanged = JSON.stringify(attempt.scores || {}) !== JSON.stringify(next.scores || {})
      const weakChanged = JSON.stringify(attempt.weak_topics || []) !== JSON.stringify(next.weakTopics || [])
      if (!scoresChanged && !weakChanged) continue

      const { error: updateErr } = await admin
        .from('test_attempts')
        .update({ scores: next.scores, weak_topics: next.weakTopics })
        .eq('id', attempt.id)

      if (!updateErr) updated += 1
    }

    return json(res, 200, { ok: true, scanned, updated })
  } catch (error) {
    return json(res, 500, { error: error?.message || 'Server error' })
  }
}
