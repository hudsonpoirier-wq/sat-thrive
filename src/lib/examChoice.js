import { getExamFromTestId } from '../data/tests.js'
import { scoreToPercentile } from '../data/examData.js'

export function normalizeExam(value, fallback = 'sat') {
  const exam = String(value || '').toLowerCase()
  return exam === 'act' || exam === 'sat' ? exam : fallback
}

function prefKey(userId) {
  return `agora_preferred_exam_v1:${userId || 'anon'}`
}

export function loadLocalPreferredExam(userId) {
  try {
    const raw = localStorage.getItem(prefKey(userId))
    return normalizeExam(raw, '')
  } catch {
    return ''
  }
}

export function saveLocalPreferredExam(userId, exam) {
  try {
    localStorage.setItem(prefKey(userId), normalizeExam(exam))
  } catch {}
}

export function getUserPreferredExam(user) {
  return normalizeExam(user?.user_metadata?.preferred_exam || '', '')
}

export function getInitialPreferredExam(user) {
  return getUserPreferredExam(user) || loadLocalPreferredExam(user?.id) || 'sat'
}

function extractAttemptScore(attempt, exam) {
  const scores = attempt?.scores || {}
  if (exam === 'act') return Number(scores?.composite || scores?.total || 0)
  return Number(scores?.total || 0)
}

export function bestPercentileByExam(attempts = []) {
  const out = { sat: 0, act: 0 }
  for (const attempt of attempts || []) {
    if (!(attempt?.completed_at || attempt?.scores?.total)) continue
    const exam = getExamFromTestId(attempt?.test_id)
    const score = extractAttemptScore(attempt, exam)
    if (!score) continue
    out[exam] = Math.max(out[exam], scoreToPercentile(exam, score))
  }
  return out
}

export function chooseDashboardExam({ user, attempts = [], explicitExam = '' }) {
  const picked = normalizeExam(explicitExam || '', '')
  if (picked) return picked

  const percentiles = bestPercentileByExam(attempts)
  if (percentiles.act > percentiles.sat) return 'act'
  if (percentiles.sat > percentiles.act && percentiles.sat > 0) return 'sat'

  const fromUser = getUserPreferredExam(user)
  if (fromUser) return fromUser

  const fromLocal = loadLocalPreferredExam(user?.id)
  if (fromLocal) return fromLocal

  if (percentiles.sat > 0 || percentiles.act === 0) return 'sat'
  return 'sat'
}

export function userNeedsExamChoice(user, attempts = []) {
  if (getUserPreferredExam(user)) return false
  if (loadLocalPreferredExam(user?.id)) return false
  return !(attempts || []).length
}
