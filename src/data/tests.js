import { ACT_TESTS } from './actData.js'

export const SAT_TESTS = [
  {
    id: 'pre_test',
    exam: 'sat',
    label: 'Pre Test',
    pdfUrl: '/practice-test-11.pdf',
    akUrl: '/answer-keys/pre_test.html',
    kind: 'official',
  },
  {
    id: 'final_test',
    exam: 'sat',
    label: 'Final Test',
    pdfUrl: '/final-test-questions.pdf',
    akUrl: '/answer-keys/final_test.html',
    kind: 'final',
  },
  { id: 'sat1', exam: 'sat', label: 'Skill Builder Test 1', pdfUrl: '/extra-tests/sat1.pdf', akUrl: '/answer-keys/sat1.html', kind: 'extra' },
  { id: 'sat2', exam: 'sat', label: 'Skill Builder Test 2', pdfUrl: '/extra-tests/sat2.pdf', akUrl: '/answer-keys/sat2.html', kind: 'extra' },
  { id: 'sat3', exam: 'sat', label: 'Skill Builder Test 3', pdfUrl: '/extra-tests/sat3.pdf', akUrl: '/answer-keys/sat3.html', kind: 'extra' },
  { id: 'sat4', exam: 'sat', label: 'Skill Builder Test 4', pdfUrl: '/extra-tests/sat4.pdf', akUrl: '/answer-keys/sat4.html', kind: 'extra' },
  { id: 'sat5', exam: 'sat', label: 'Skill Builder Test 5', pdfUrl: '/extra-tests/sat5.pdf', akUrl: '/answer-keys/sat5.html', kind: 'extra' },
]

export { ACT_TESTS }
export const TESTS = [...SAT_TESTS, ...ACT_TESTS]

export function normalizeTestId(id) {
  const raw = String(id || '')
  if (!raw || raw === 'practice_test_11') return 'pre_test'
  return raw
}

export function getExamFromTestId(id) {
  const raw = normalizeTestId(id)
  return raw.startsWith('act') ? 'act' : 'sat'
}

export function getTestsForExam(exam = 'sat') {
  return TESTS.filter((test) => String(test.exam || 'sat') === String(exam || 'sat'))
}

export function getTestConfig(testId) {
  const id = normalizeTestId(testId)
  if (!id) return null
  return TESTS.find(t => t.id === id) || null
}
