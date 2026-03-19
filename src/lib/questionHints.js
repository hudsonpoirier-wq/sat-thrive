function hashString(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

function seededShuffle(arr, seed) {
  const out = arr.slice()
  let x = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    const j = Math.abs(x) % (i + 1)
    const tmp = out[i]
    out[i] = out[j]
    out[j] = tmp
  }
  return out
}

function firstSentence(text = '') {
  const cleaned = String(text || '').replace(/\s+/g, ' ').trim()
  if (!cleaned) return ''
  const match = cleaned.match(/.+?[.!?](?:\s|$)/)
  return (match?.[0] || cleaned).trim()
}

function inferSignals({ questionText = '', chapterName = '', section = '', exam = '' }) {
  const haystack = `${questionText} ${chapterName} ${section} ${exam}`.toLowerCase()
  return {
    graph: /(graph|table|chart|scatter|histogram|axis|axes)/.test(haystack),
    passage: /(passage|author|paragraph|sentence|lines?|claim|purpose|tone|inference)/.test(haystack),
    transition: /(transition|conclude|introduce|add|contrast|however|therefore|moreover)/.test(haystack),
    punctuation: /(comma|semicolon|colon|dash|apostrophe|punctuation)/.test(haystack),
    equations: /(equation|expression|system|function|solve|factor|slope|intercept|exponent|quadratic|linear)/.test(haystack),
    percent: /(percent|probability|ratio|rate|proportion)/.test(haystack),
    geometry: /(triangle|circle|angle|area|volume|radius|diameter|perimeter)/.test(haystack),
    science: /(experiment|hypothesis|scientist|study|sample|temperature|reaction|trial)/.test(haystack),
  }
}

function sectionFamily(exam, section) {
  const key = String(section || '').toLowerCase()
  if (exam === 'act') {
    if (key.includes('english')) return 'english'
    if (key.includes('math')) return 'math'
    if (key.includes('reading')) return 'reading'
    if (key.includes('science')) return 'science'
  }
  if (key.includes('rw')) return 'reading-writing'
  if (key.includes('math')) return 'math'
  return 'general'
}

function buildSectionHint({ exam, section, isMC, qNum, signals }) {
  const family = sectionFamily(exam, section)
  if (family === 'english') {
    if (signals.transition) return 'Cover the choices first and decide whether the sentence needs contrast, continuation, cause/effect, or conclusion. Then pick the choice that matches that job.'
    if (signals.punctuation) return 'Read the sentence around the underline as one full thought. Decide whether the punctuation should join, separate, or emphasize ideas before comparing answer choices.'
    return 'Read one sentence before and one sentence after the tested spot. On ACT English, the best answer has to fit the grammar and the paragraph’s flow at the same time.'
  }
  if (family === 'reading') {
    return signals.passage
      ? `Go back to the exact part of the passage tied to Q${qNum || ''}. Prove your answer with a word or phrase from the passage before selecting a choice.`
      : 'Find the smallest part of the passage that answers the question directly. Don’t choose an option just because it sounds generally true.'
  }
  if (family === 'science') {
    if (signals.graph) return 'Start with the figure or table title, then read the axes/labels and units. On ACT Science, many misses happen before the actual comparison even starts.'
    if (signals.science) return 'Identify what changed in the experiment and what stayed controlled. Then answer only what the data or setup actually supports.'
    return 'Anchor yourself in the visual first: title, axes, trends, then specific row/column values. Use the data before the science vocabulary.'
  }
  if (family === 'math') {
    if (signals.graph) return 'Use the graph or table first: labels, units, intercepts, and trends often give the setup before you do any algebra.'
    if (signals.percent) return 'Translate the words into a ratio, rate, or proportion before calculating. Keep track of what the final number is supposed to represent.'
    if (signals.geometry) return 'Sketch or label the figure with the given values first. Geometry errors usually come from using the right formula on the wrong quantity.'
    if (!isMC) return 'Set up the equation carefully before doing arithmetic. Then check whether your final free-response entry is the exact value the question asks for.'
    return 'Write the equation or relationship first, then compare the result to the answer choices. If choices are close together, verify by plugging your result back into the question.'
  }
  if (family === 'reading-writing') {
    if (signals.transition) return 'Decide what relationship the sentence needs—contrast, support, continuation, or conclusion—before you look at the answer choices.'
    if (signals.punctuation) return 'Read the full sentence aloud in your head. Ask whether the punctuation should combine ideas, separate them, or set extra information apart.'
    if (signals.passage) return 'Return to the exact sentence or lines that the question depends on. The best SAT R&W answer should be supported directly by the text, not just sound nice.'
    return 'Ask what the sentence or paragraph must accomplish here—clarity, logic, or style—then eliminate choices that do not serve that purpose.'
  }
  return isMC
    ? 'Predict what the correct answer should do before reading the choices. Then eliminate options that do not match that prediction.'
    : 'Write down exactly what the question is asking for, solve for only that quantity, and check that your final entry is in an accepted format.'
}

function buildCheckHint({ exam, section, isMC, signals }) {
  const family = sectionFamily(exam, section)
  if (!isMC) {
    if (family === 'math') return exam === 'act'
      ? 'Before you hit Check, make sure your number is simplified and matches the exact quantity requested—not an intermediate step.'
      : 'Before you hit Check, make sure your entry is simplified and equivalent forms like fractions or decimals would still represent the same value.'
    return 'Before you hit Check, reread the prompt and confirm your response answers the exact question—not just part of it.'
  }
  if (family === 'science' || signals.graph) return 'Once you think you have it, verify it against the visual one more time. A quick reread of the axis, label, or trend can catch most last-second misses.'
  if (family === 'reading' || family === 'reading-writing' || family === 'english') return 'Once you narrow it down, plug the choice back into the sentence or passage and read it straight through. The correct answer should sound supported, precise, and necessary.'
  return 'After narrowing it down, test your answer against the original problem one more time. The correct choice should satisfy every condition in the question.'
}

export function buildQuestionHintLadder({
  exam = 'sat',
  section = '',
  qNum = 0,
  isMC = false,
  chapterName = '',
  chapterCode = '',
  concepts = [],
  questionText = '',
} = {}) {
  const conceptBodies = (concepts || []).map((concept) => concept?.body).filter(Boolean)
  const conceptLead = firstSentence(conceptBodies[0] || '')
  const signals = inferSignals({ questionText, chapterName, section, exam })
  const seed = hashString(`${exam}:${section}:${chapterCode || chapterName}:${qNum}:${questionText}`)
  const shuffledConcepts = conceptBodies.length ? seededShuffle(conceptBodies, seed) : []
  const sectionHint = buildSectionHint({ exam, section, isMC, qNum, signals })
  const checkHint = buildCheckHint({ exam, section, isMC, signals })

  const step1 = chapterName
    ? `This question is testing ${chapterCode ? `${chapterCode} — ` : ''}${chapterName}. Before solving, say the rule or idea you expect to use.${conceptLead ? ` ${conceptLead}` : ''}`
    : sectionHint
  const step2 = shuffledConcepts[1]
    ? `${sectionHint} ${firstSentence(shuffledConcepts[1])}`
    : sectionHint
  const step3 = checkHint

  return [step1, step2, step3]
}

export function buildQuestionHintSummary(options = {}) {
  return buildQuestionHintLadder(options)[0]
}
