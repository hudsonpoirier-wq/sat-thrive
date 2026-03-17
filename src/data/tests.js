export const TESTS = [
  {
    id: 'pre_test',
    label: 'Pre Test',
    pdfUrl: '/practice-test-11.pdf',
    akUrl: '/answer-keys/pre_test.html',
    kind: 'official',
  },
  {
    id: 'final_test',
    label: 'Final Test',
    pdfUrl: '/final-test-questions.pdf',
    akUrl: '/answer-keys/final_test.html',
    kind: 'final',
  },
  { id: 'sat1', label: 'Skill Builder Test 1', pdfUrl: '/extra-tests/sat1.pdf', akUrl: '/answer-keys/sat1.html', kind: 'extra' },
  { id: 'sat2', label: 'Skill Builder Test 2', pdfUrl: '/extra-tests/sat2.pdf', akUrl: '/answer-keys/sat2.html', kind: 'extra' },
  { id: 'sat3', label: 'Skill Builder Test 3', pdfUrl: '/extra-tests/sat3.pdf', akUrl: '/answer-keys/sat3.html', kind: 'extra' },
  { id: 'sat4', label: 'Skill Builder Test 4', pdfUrl: '/extra-tests/sat4.pdf', akUrl: '/answer-keys/sat4.html', kind: 'extra' },
  { id: 'sat5', label: 'Skill Builder Test 5', pdfUrl: '/extra-tests/sat5.pdf', akUrl: '/answer-keys/sat5.html', kind: 'extra' },
]

export function getTestConfig(testId) {
  const id = String(testId || '')
  if (!id) return null
  if (id === 'practice_test_11') return TESTS.find(t => t.id === 'pre_test')
  return TESTS.find(t => t.id === id) || null
}
