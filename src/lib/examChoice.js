import { getExamFromTestId } from '../data/tests.js'
import { getQuestionCountForTest, scoreAttemptFromKey } from '../data/examData.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'

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

function completedAttempt(attempt) {
  return Boolean(attempt?.completed_at || attempt?.scores?.total)
}

function attemptPercentCorrect(attempt) {
  const testId = attempt?.test_id
  const totalQuestions = Math.max(1, Number(getQuestionCountForTest(testId) || 0))
  const storedRaw = Number(attempt?.scores?.raw || 0)
  if (storedRaw > 0) return storedRaw / totalQuestions

  const keyBySection = getAnswerKeyBySection(testId)
  if (keyBySection && attempt?.answers && Object.keys(attempt.answers || {}).length) {
    const rescored = scoreAttemptFromKey(testId, attempt.answers, keyBySection)
    const raw = Number(rescored?.raw || 0)
    if (raw > 0) return raw / totalQuestions
  }

  return 0
}

export function bestAccuracyByExam(attempts = []) {
  const out = { sat: 0, act: 0 }
  for (const attempt of attempts || []) {
    if (!completedAttempt(attempt)) continue
    const exam = getExamFromTestId(attempt?.test_id)
    const pct = attemptPercentCorrect(attempt)
    out[exam] = Math.max(out[exam], pct)
  }
  return out
}

export function chooseDashboardExam({ user, attempts = [], explicitExam = '' }) {
  const picked = normalizeExam(explicitExam || '', '')
  if (picked) return picked

  const accuracy = bestAccuracyByExam(attempts)
  if (accuracy.act > accuracy.sat) return 'act'
  if (accuracy.sat > accuracy.act && accuracy.sat > 0) return 'sat'

  const fromUser = getUserPreferredExam(user)
  if (fromUser) return fromUser

  const fromLocal = loadLocalPreferredExam(user?.id)
  if (fromLocal) return fromLocal

  if (accuracy.sat > 0) return 'sat'
  if (accuracy.act > 0) return 'act'
  return 'sat'
}

export function userNeedsExamChoice(user, attempts = []) {
  if (getUserPreferredExam(user)) return false
  if (loadLocalPreferredExam(user?.id)) return false
  return !(attempts || []).length
}
