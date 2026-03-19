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

function detectPhrases(questionText = '') {
  const text = String(questionText || '').replace(/\s+/g, ' ').trim()
  const lower = text.toLowerCase()
  const phrase = (...patterns) => {
    for (const pattern of patterns) {
      const match = lower.match(pattern)
      if (match?.[0]) return match[0]
    }
    return ''
  }
  return {
    relationship: phrase(/linear relationship/, /proportional relationship/, /exponential relationship/, /system of equations/, /quadratic function/, /probability/, /percent increase/, /mean|median/, /circle|triangle|angle/, /slope/, /intercept/),
    readingTask: phrase(/main idea/, /author'?s purpose/, /most nearly means/, /best supports/, /primarily serves to/, /based on the passage/, /the passage suggests/),
    scienceTask: phrase(/according to figure \d+/, /according to table \d+/, /based on the data/, /experiment \d+/, /scientist \d+/, /study \d+/),
    grammarTask: phrase(/which choice/, /most effectively/, /sentence placement/, /punctuation/, /transition/),
  }
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

function buildTargetedHint({ exam, section, qNum, isMC, chapterName, chapterCode, questionText, signals, phrases }) {
  const family = sectionFamily(exam, section)
  const moduleLabel = chapterCode ? `${chapterCode} — ${chapterName}` : chapterName
  if (family === 'math') {
    if (signals.graph) return `For Q${qNum}, start with the visual before the algebra. Read the labels, units, and what each axis or entry represents, then decide which relationship the question is asking you to use${phrases.relationship ? ` (${phrases.relationship})` : ''}.`
    if (signals.geometry) return `For Q${qNum}, sketch or relabel the figure with every given value first. Then mark the exact part you need to find so you do not solve for an intermediate quantity by mistake.`
    if (signals.percent) return `For Q${qNum}, translate the wording into a ratio or percent equation before calculating. Be careful about what is the base amount and what is the change.`
    if (moduleLabel) return `For Q${qNum}, treat this as a ${moduleLabel} question. Write the relationship you expect from that skill first, then use the choices only to confirm your setup.`
    return `For Q${qNum}, write the setup before doing arithmetic. If the choices are close, the setup matters more than the computation speed.`
  }
  if (family === 'english') {
    if (signals.transition) return `For Q${qNum}, ignore the answer choices for a second and decide how the sentence should connect to the ideas around it—continuation, contrast, cause/effect, or conclusion. Then pick the choice that does exactly that.`
    if (signals.punctuation) return `For Q${qNum}, check whether the sentence has one complete thought or two. Use that to decide if the punctuation should join, separate, or set off information.`
    return `For Q${qNum}, reread the sentence before and after the underlined part. The correct ACT English answer has to be grammatically correct and fit the paragraph’s flow.`
  }
  if (family === 'reading-writing') {
    if (signals.transition) return `For Q${qNum}, decide what the sentence or paragraph needs next—support, contrast, continuation, or conclusion—before comparing the choices.`
    if (signals.punctuation) return `For Q${qNum}, test the structure of the sentence first. Ask whether the punctuation changes meaning, separates full ideas, or simply adds extra detail.`
    return `For Q${qNum}, go back to the exact sentence and ask what job the correct answer must do there: clarify, connect ideas, or improve precision.`
  }
  if (family === 'reading') {
    return `For Q${qNum}, find the exact part of the passage that answers the question${phrases.readingTask ? ` about ${phrases.readingTask}` : ''}. Do not choose until you can point to the supporting words in the text.`
  }
  if (family === 'science') {
    if (signals.graph || phrases.scienceTask) return `For Q${qNum}, begin with ${phrases.scienceTask || 'the relevant figure or table'}. Read the labels and units, then trace only the data needed for this question before looking at the answer choices.`
    return `For Q${qNum}, decide whether the question is asking about a trend, a comparison, or an experimental setup. Then use the data first and the science vocabulary second.`
  }
  return isMC
    ? `For Q${qNum}, predict what the correct answer should do before reading the choices. That will make it easier to eliminate choices that only sound right.`
    : `For Q${qNum}, write down the exact value or expression the question wants, solve for only that, and make sure your final response is in the right format.`
}

function buildProcessHint({ exam, section, qNum, isMC, signals, phrases }) {
  const family = sectionFamily(exam, section)
  if (family === 'math') {
    if (signals.graph) return 'Use a two-step process: first identify the relationship from the graph/table, then calculate only after you know which values belong in the equation.'
    return isMC
      ? 'Try working the problem without the choices first. Once you get a result or estimate, compare it to the choices and eliminate anything that cannot match your setup.'
      : 'Check each transformation in your work line by line. Most misses here come from one setup slip that carries through the rest of the problem.'
  }
  if (family === 'english' || family === 'reading-writing') {
    return phrases.grammarTask
      ? `This is a ${phrases.grammarTask} style question. Explain out loud why each wrong choice fails—grammar, logic, repetition, or flow—before you settle on the final answer.`
      : 'Eliminate answer choices with a specific reason, not a feeling. The best choice should improve both correctness and flow.'
  }
  if (family === 'reading') return 'Prove the answer directly from the passage. If two choices seem plausible, the better one will be supported more precisely by the wording on the page.'
  if (family === 'science') return 'Identify exactly which figure, table, or experiment the question belongs to, then narrow your attention to that one source before comparing answer choices.'
  return buildSectionHint({ exam, section, isMC, qNum, signals })
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
  const phrases = detectPhrases(questionText)
  const seed = hashString(`${exam}:${section}:${chapterCode || chapterName}:${qNum}:${questionText}`)
  const shuffledConcepts = conceptBodies.length ? seededShuffle(conceptBodies, seed) : []
  const sectionHint = buildSectionHint({ exam, section, isMC, qNum, signals })
  const checkHint = buildCheckHint({ exam, section, isMC, signals })

  const step1 = buildTargetedHint({ exam, section, qNum, isMC, chapterName, chapterCode, questionText, signals, phrases })
  const conceptHint = shuffledConcepts[0] ? firstSentence(shuffledConcepts[0]) : ''
  const step2 = `${buildProcessHint({ exam, section, qNum, isMC, signals, phrases })}${conceptHint ? ` ${conceptHint}` : ''}`
  const step3 = checkHint

  return [step1, step2, step3]
}

export function buildQuestionHintSummary(options = {}) {
  return buildQuestionHintLadder(options)[0]
}
