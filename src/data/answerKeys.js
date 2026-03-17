import { ANSWER_KEY } from './testData.js'
import { EXTRA_ANSWER_KEYS } from './extraAnswerKeys.js'

export function getAnswerKeyBySection(testId) {
  const id = String(testId || '')
  if (id === 'pre_test' || id === 'practice_test_11' || !id) return ANSWER_KEY
  return EXTRA_ANSWER_KEYS?.[id] || null
}

