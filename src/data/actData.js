import { ACT_ANSWER_KEYS, ACT_SECTION_PAGE_RANGES } from './actGenerated.js'
export { ACT_ANSWER_KEYS, ACT_SECTION_PAGE_RANGES }

function mapAllQuestions(total, chapterId) {
  return Object.fromEntries(Array.from({ length: total }, (_, index) => [index + 1, chapterId]))
}

function interpolateScore(score, table) {
  const sorted = [...table].sort((a, b) => a.score - b.score)
  if (score <= sorted[0].score) return sorted[0].percentile
  if (score >= sorted[sorted.length - 1].score) return sorted[sorted.length - 1].percentile
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1]
    const next = sorted[i]
    if (score <= next.score) {
      const ratio = (score - prev.score) / Math.max(1, next.score - prev.score)
      return Math.round(prev.percentile + ratio * (next.percentile - prev.percentile))
    }
  }
  return sorted[sorted.length - 1].percentile
}

export const ACT_MODULES = {
  act_english: { label: 'English', module: 'Section 1', section: 'English', questions: 75, time: 2700 },
  act_math: { label: 'Math', module: 'Section 2', section: 'Math', questions: 60, time: 3600 },
  act_reading: { label: 'Reading', module: 'Section 3', section: 'Reading', questions: 40, time: 2100 },
  act_science: { label: 'Science', module: 'Section 4', section: 'Science', questions: 40, time: 2100 },
}

export const ACT_MODULE_ORDER = ['act_english', 'act_math', 'act_reading', 'act_science']

export const ACT_CHAPTERS = {
  'act-english': {
    name: 'English: Usage & Rhetoric',
    page: 'ACT English',
    domain: 'ACT English',
    subject: 'English',
    color: '#3b82f6',
  },
  'act-math': {
    name: 'Math: Algebra, Geometry & Trig',
    page: 'ACT Math',
    domain: 'ACT Math',
    subject: 'Math',
    color: '#10b981',
  },
  'act-reading': {
    name: 'Reading: Passage Analysis',
    page: 'ACT Reading',
    domain: 'ACT Reading',
    subject: 'Reading',
    color: '#8b5cf6',
  },
  'act-science': {
    name: 'Science: Data, Experiments & Viewpoints',
    page: 'ACT Science',
    domain: 'ACT Science',
    subject: 'Science',
    color: '#f97316',
  },
}

export const ACT_QUESTION_CHAPTER_MAP = {
  act_english: mapAllQuestions(75, 'act-english'),
  act_math: mapAllQuestions(60, 'act-math'),
  act_reading: mapAllQuestions(40, 'act-reading'),
  act_science: mapAllQuestions(40, 'act-science'),
}

export const ACT_TESTS = [
  {
    id: 'act1',
    exam: 'act',
    label: 'ACT Pre Test',
    shortLabel: 'Pre Test',
    pdfUrl: '/act-tests/ACT_Practice_Test_1.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_1_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_1_Answer_Key_and_Explanations.pdf',
    kind: 'official',
  },
  {
    id: 'act2',
    exam: 'act',
    label: 'ACT Practice Test 2',
    shortLabel: 'Practice 2',
    pdfUrl: '/act-tests/ACT_Practice_Test_2.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_2_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_2_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act3',
    exam: 'act',
    label: 'ACT Practice Test 3',
    shortLabel: 'Practice 3',
    pdfUrl: '/act-tests/ACT_Practice_Test_3.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_3_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_3_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act4',
    exam: 'act',
    label: 'ACT Practice Test 4',
    shortLabel: 'Practice 4',
    pdfUrl: '/act-tests/ACT_Practice_Test_4.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_4_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_4_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act5',
    exam: 'act',
    label: 'ACT Practice Test 5',
    shortLabel: 'Practice 5',
    pdfUrl: '/act-tests/ACT_Practice_Test_5.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_5_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_5_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act6',
    exam: 'act',
    label: 'ACT Practice Test 6',
    shortLabel: 'Practice 6',
    pdfUrl: '/act-tests/ACT_Practice_Test_6.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_6_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_6_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act7',
    exam: 'act',
    label: 'ACT Practice Test 7',
    shortLabel: 'Practice 7',
    pdfUrl: '/act-tests/ACT_Practice_Test_7.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_7_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_7_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act8',
    exam: 'act',
    label: 'ACT Practice Test 8',
    shortLabel: 'Practice 8',
    pdfUrl: '/act-tests/ACT_Practice_Test_8.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_8_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_8_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act9',
    exam: 'act',
    label: 'ACT Practice Test 9',
    shortLabel: 'Practice 9',
    pdfUrl: '/act-tests/ACT_Practice_Test_9.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_9_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_9_Answer_Key_and_Explanations.pdf',
    kind: 'extra',
  },
  {
    id: 'act10',
    exam: 'act',
    label: 'ACT Final Test',
    shortLabel: 'Final Test',
    pdfUrl: '/act-tests/ACT_Practice_Test_10.pdf',
    akUrl: '/act-tests/ACT_Practice_Test_10_Answer_Key_and_Explanations.pdf',
    explanationUrl: '/act-tests/ACT_Practice_Test_10_Answer_Key_and_Explanations.pdf',
    kind: 'final',
  },
]

function scaleActSection(raw, total) {
  const n = Number(raw || 0)
  const t = Math.max(1, Number(total || 1))
  return Math.max(1, Math.min(36, Math.round(1 + (n / t) * 35)))
}

export function rawToActScaled(rawEnglish, rawMath, rawReading, rawScience) {
  const english = scaleActSection(rawEnglish, ACT_MODULES.act_english.questions)
  const math = scaleActSection(rawMath, ACT_MODULES.act_math.questions)
  const reading = scaleActSection(rawReading, ACT_MODULES.act_reading.questions)
  const science = scaleActSection(rawScience, ACT_MODULES.act_science.questions)
  const total = Math.max(1, Math.min(36, Math.round((english + math + reading + science) / 4)))
  return { english, math, reading, science, total, composite: total }
}

const ACT_PERCENTILES = [
  { score: 1, percentile: 1 },
  { score: 10, percentile: 3 },
  { score: 13, percentile: 8 },
  { score: 16, percentile: 28 },
  { score: 18, percentile: 44 },
  { score: 20, percentile: 59 },
  { score: 22, percentile: 71 },
  { score: 24, percentile: 80 },
  { score: 26, percentile: 87 },
  { score: 28, percentile: 91 },
  { score: 30, percentile: 95 },
  { score: 32, percentile: 97 },
  { score: 34, percentile: 99 },
  { score: 36, percentile: 99 },
]

export function actScoreToPercentile(score) {
  return interpolateScore(Number(score || 0), ACT_PERCENTILES)
}

export function getActSectionPageRange(testId, moduleId) {
  return ACT_SECTION_PAGE_RANGES?.[String(testId || '')]?.[String(moduleId || '')] || null
}

export function getActAnswerKey(testId) {
  return ACT_ANSWER_KEYS?.[String(testId || '')] || null
}
