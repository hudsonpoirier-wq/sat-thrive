export const TESTS = [
  {
    id: 'pre_test',
    label: 'Pre Test',
    pdfUrl: '/practice-test-11.pdf',
    kind: 'official',
  },
  {
    id: 'final_test',
    label: 'Final Test',
    pdfUrl: '/final-test-questions.pdf',
    akUrl: '/final-test-answer-key.pdf',
    kind: 'final',
  },
  { id: 'sat1', label: 'Skill Builder Test 1', pdfUrl: '/extra-tests/sat1.pdf', akUrl: '/extra-tests/ak1.pdf', kind: 'extra' },
  { id: 'sat2', label: 'Skill Builder Test 2', pdfUrl: '/extra-tests/sat2.pdf', akUrl: '/extra-tests/ak2.pdf', kind: 'extra' },
  { id: 'sat3', label: 'Skill Builder Test 3', pdfUrl: '/extra-tests/sat3.pdf', akUrl: '/extra-tests/ak3.pdf', kind: 'extra' },
  { id: 'sat4', label: 'Skill Builder Test 4', pdfUrl: '/extra-tests/sat4.pdf', akUrl: '/extra-tests/ak4.pdf', kind: 'extra' },
  { id: 'sat5', label: 'Skill Builder Test 5', pdfUrl: '/extra-tests/sat5.pdf', akUrl: '/extra-tests/ak5.pdf', kind: 'extra' },
]

export function getTestConfig(testId) {
  const id = String(testId || '')
  if (!id) return null
  if (id === 'practice_test_11') return TESTS.find(t => t.id === 'pre_test')
  return TESTS.find(t => t.id === id) || null
}
