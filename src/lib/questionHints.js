/* ─────────────────────────────────────────────────────────────
   questionHints.js – deeply question-specific hint generation
   ───────────────────────────────────────────────────────────── */

// ── utility helpers ──────────────────────────────────────────

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

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function truncate(text, max = 120) {
  if (text.length <= max) return text
  return text.slice(0, max - 1).trim() + '…'
}

// ── section family detection ─────────────────────────────────

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

// ── deep question text parsing ───────────────────────────────

function parseQuestionText(questionText) {
  const text = clean(questionText)
  const lower = text.toLowerCase()

  // Extract all numbers (including negatives, decimals, fractions, percents)
  const numbers = [...new Set(
    (text.match(/-?\d+(?:\.\d+)?(?:\/\d+)?%?/g) || [])
  )].slice(0, 8)

  // Extract equations and expressions: y = 3x + 7, f(x) = ..., 2x + 5 = 11, etc.
  const equations = [...new Set(
    (text.match(/[a-zA-Z]\s*\([^)]*\)\s*=\s*[^,.;?]+/g) || [])                   // f(x) = ...
      .concat(text.match(/[a-zA-Z]\s*=\s*[-\d][^,.;?]{2,}/g) || [])               // y = 3x + 7
      .concat(text.match(/\d+[a-zA-Z][^,.;?]*=\s*[^,.;?]+/g) || [])              // 2x + 5 = 11
      .concat(text.match(/[a-zA-Z]\s*[<>≤≥]\s*[^,.;?]+/g) || [])                 // inequalities
      .map(e => e.trim())
  )].slice(0, 4)

  // Extract standalone variables/unknowns (single letters used algebraically)
  const variables = [...new Set(
    (text.match(/\b([a-zA-Z])\b/g) || [])
      .filter(v => !/^[AI]$/.test(v))  // exclude articles
      .filter(v => {
        const idx = text.indexOf(v)
        const context = text.slice(Math.max(0, idx - 3), idx + 4)
        return /[\d=+\-*/^()]/.test(context) || /solve for|value of|find/i.test(lower)
      })
  )].slice(0, 5)

  // Extract references to figures, tables, graphs, paragraphs, lines
  const references = [...new Set(
    (text.match(/(?:figure|table|graph|chart|diagram|experiment|paragraph|passage|sentence|lines?)\s*\d*/gi) || [])
      .map(r => r.trim())
  )].slice(0, 4)

  // Detect what the question is asking for
  const askPatterns = [
    { pattern: /what is the (?:value of|slope of|y-intercept of|solution to|result of)\s+([^?]+)/i, type: 'find_value' },
    { pattern: /solve for\s+([a-zA-Z])/i, type: 'solve_variable' },
    { pattern: /find the (?:value of|length of|area of|volume of|measure of|probability of)\s+([^?]+)/i, type: 'find_value' },
    { pattern: /what is\s+([^?]+)\??/i, type: 'find_value' },
    { pattern: /which (?:of the following\s+)?(?:best\s+)?(?:describes|explains|supports|completes|states|represents)\s+([^?]+)/i, type: 'best_choice' },
    { pattern: /which choice\s+(?:most\s+)?(?:effectively|accurately|logically)\s+([^?]+)/i, type: 'best_choice' },
    { pattern: /the (?:main|central|primary) (?:purpose|idea|point|argument|claim)\s+(?:of|in)\s+([^?]+)/i, type: 'main_idea' },
    { pattern: /(?:the )?author(?:'s)?\s+(?:primary\s+)?(?:purpose|tone|attitude|perspective)\s+(?:is|in)\s+([^?]+)/i, type: 'author_purpose' },
    { pattern: /(?:most nearly|most closely) means/i, type: 'vocabulary' },
    { pattern: /(?:as used in|in context).+?(?:most nearly|most closely)?\s*means/i, type: 'vocabulary' },
    { pattern: /how (?:many|much|long|far|often)\s+([^?]+)/i, type: 'how_many' },
    { pattern: /(?:according to|based on) (?:the )?(passage|figure|table|graph|data|experiment|study|results)/i, type: 'reference_based' },
    { pattern: /if\s+(.+?),\s*(?:what|which|how|then)\s+([^?]+)/i, type: 'conditional' },
    { pattern: /(?:increase|decrease|change|differ|compare|relationship|correlation)/i, type: 'comparison' },
    { pattern: /(?:equivalent|equal|same as|simplified|rewritten)/i, type: 'equivalence' },
    { pattern: /(?:sentence|placement|transition|conclusion|introduction)/i, type: 'structure' },
    { pattern: /(?:punctuation|comma|semicolon|colon|dash|apostrophe)/i, type: 'punctuation' },
  ]

  let askType = 'unknown'
  let askTarget = ''
  for (const { pattern, type } of askPatterns) {
    const m = lower.match(pattern)
    if (m) {
      askType = type
      askTarget = (m[1] || '').trim()
      break
    }
  }

  // Extract key quoted phrases or emphasized text
  const quotedPhrases = [...new Set(
    (text.match(/"([^"]+)"/g) || []).concat(text.match(/'([^']+)'/g) || [])
  )].map(q => q.replace(/['"]/g, '')).slice(0, 3)

  // Extract the final question sentence (the actual ask)
  const sentences = text.split(/(?<=[.?!])\s+/)
  const questionSentence = sentences.filter(s => s.includes('?')).pop()
    || sentences[sentences.length - 1]
    || ''

  // Detect specific math topics
  const mathTopic = detectMathTopic(lower, equations)

  // Detect reading/writing task type
  const rwTask = detectRWTask(lower)

  // Detect science specifics
  const scienceInfo = detectScienceInfo(text, lower)

  // Extract key phrases from passage-based questions
  const passageSnippets = extractPassageSnippets(text)

  return {
    text,
    lower,
    numbers,
    equations,
    variables,
    references,
    askType,
    askTarget,
    quotedPhrases,
    questionSentence: clean(questionSentence),
    mathTopic,
    rwTask,
    scienceInfo,
    passageSnippets,
  }
}

function detectMathTopic(lower, equations) {
  if (/slope|y\s*=\s*m\s*x|rate of change/.test(lower)) return 'slope'
  if (/y-intercept|initial value|when x\s*=\s*0|b in y\s*=/.test(lower)) return 'y-intercept'
  if (/system of|simultaneous/.test(lower)) return 'system-of-equations'
  if (/quadratic|parabola|x\s*\^?\s*2|factor/.test(lower)) return 'quadratic'
  if (/exponent|exponential|growth|decay/.test(lower)) return 'exponential'
  if (/percent|%/.test(lower)) return 'percent'
  if (/probability|likely|chance|odds/.test(lower)) return 'probability'
  if (/mean|average|median|mode|standard deviation/.test(lower)) return 'statistics'
  if (/triangle|angle|degree|right angle|hypotenuse|pythagorean/.test(lower)) return 'triangle'
  if (/circle|radius|diameter|circumference|arc/.test(lower)) return 'circle'
  if (/area|perimeter|volume|surface area/.test(lower)) return 'geometry-measure'
  if (/ratio|proportion|scale/.test(lower)) return 'ratio'
  if (/inequality|greater than|less than|at least|at most/.test(lower)) return 'inequality'
  if (/absolute value|\|[^|]+\|/.test(lower)) return 'absolute-value'
  if (/linear|straight line/.test(lower)) return 'linear'
  if (equations.length > 0) return 'algebra'
  return null
}

function detectRWTask(lower) {
  if (/main (?:idea|purpose|point|argument|claim)/.test(lower)) return 'main-idea'
  if (/author'?s (?:purpose|tone|attitude|perspective)/.test(lower)) return 'author-purpose'
  if (/most (?:nearly|closely) means|in context/.test(lower)) return 'vocabulary-in-context'
  if (/(?:best|most effectively) (?:supports|strengthens|weakens|undermines)/.test(lower)) return 'evidence-support'
  if (/inference|(?:can be|most reasonably) (?:inferred|concluded)/.test(lower)) return 'inference'
  if (/transition|however|therefore|moreover|consequently|furthermore/.test(lower)) return 'transition'
  if (/sentence (?:\d+ )?(?:best|most effectively) (?:serves|functions)/.test(lower)) return 'sentence-function'
  if (/punctuation|comma|semicolon|colon|dash/.test(lower)) return 'punctuation'
  if (/(?:which choice|revision).+?(?:combines|joins|connects)/.test(lower)) return 'sentence-combining'
  if (/placement|best (?:placed|position)/.test(lower)) return 'sentence-placement'
  if (/(?:complete|fill).+?(?:blank|sentence|summary)/.test(lower)) return 'completion'
  if (/graph|chart|table|data/.test(lower)) return 'data-rhetoric'
  return null
}

function detectScienceInfo(text, lower) {
  const temps = text.match(/\d+\s*°?\s*[CF]\b/g) || []
  const units = [...new Set((text.match(/\b\d+\s*(?:m\/s|kg|g|mL|L|mol|M|cm|mm|km|Hz|N|J|W|Pa|atm|pH|ppm)\b/gi) || []))].slice(0, 4)
  const experimentRef = lower.match(/experiment\s*\d+/g) || []
  const scientistRef = lower.match(/scientist\s*\d+/g) || []
  const studyRef = lower.match(/study\s*\d+/g) || []
  const figureRef = text.match(/(?:figure|table|graph|chart)\s*\d+/gi) || []
  const trendWords = lower.match(/\b(increase|decrease|remain|constant|directly|inversely|proportional|correlat)\w*/g) || []
  return {
    temps: [...new Set(temps)],
    units,
    experimentRef: [...new Set(experimentRef)],
    scientistRef: [...new Set(scientistRef)],
    studyRef: [...new Set(studyRef)],
    figureRef: [...new Set(figureRef)],
    trendWords: [...new Set(trendWords)],
  }
}

function extractPassageSnippets(text) {
  // Pull key phrases that might be from a passage: quoted text, or sentences
  // that don't look like answer choices
  const quoted = (text.match(/"([^"]{10,})"/g) || []).map(q => q.replace(/"/g, ''))
  const sentences = text.split(/(?<=[.!?])\s+/)
    .filter(s => s.length > 20 && !/^[A-D][.)]\s/.test(s))
    .slice(0, 3)
  return { quoted, keySentences: sentences }
}

// ── hint builders per domain ─────────────────────────────────

function buildMathHints(parsed, { qNum, isMC, chapterName, concepts, answerChoices }) {
  const { numbers, equations, variables, mathTopic, askType, askTarget, questionSentence, references } = parsed
  const conceptTitles = (concepts || []).map(c => c?.title).filter(Boolean)

  // ── Hint 1: point to the right approach ──
  let h1 = ''
  const topicStrategies = {
    'slope': `This question is about slope. Look for the rate of change — how much y changes for each unit change in x.${equations.length ? ` The equation ${equations[0]} is in or can be rearranged to y = mx + b form, where m is the slope.` : ''}`,
    'y-intercept': `This question asks for the y-intercept — the value of y when x = 0.${equations.length ? ` In the equation ${equations[0]}, identify the constant term (the b in y = mx + b).` : ''}`,
    'system-of-equations': `You need to solve a system of equations.${equations.length >= 2 ? ` You have ${equations[0]} and ${equations[1]}. Decide whether substitution or elimination is faster.` : ' Look for two equations with the same variables and decide whether substitution or elimination is more efficient.'}`,
    'quadratic': `This is a quadratic problem.${equations.length ? ` Look at ${equations[0]} and decide whether to factor, use the quadratic formula, or complete the square.` : ' Identify the quadratic expression and decide whether factoring, the quadratic formula, or completing the square is the best approach.'}`,
    'exponential': `This involves exponential growth or decay.${numbers.length >= 2 ? ` The values ${numbers.slice(0, 3).join(', ')} suggest you need to identify the base and the rate.` : ' Look for the initial value and the growth/decay factor.'}`,
    'percent': `This is a percent problem.${numbers.length ? ` You're working with ${numbers.filter(n => n.includes('%')).join(', ') || numbers.slice(0, 2).join(' and ')}.` : ''} Remember: part = percent × whole. Identify which value is the whole, which is the part, and which is the percent.`,
    'probability': `This is a probability question.${numbers.length ? ` The values ${numbers.slice(0, 3).join(', ')} give you the counts or totals you need.` : ''} Probability = favorable outcomes ÷ total outcomes. Make sure you identify both correctly.`,
    'statistics': `This is a statistics question asking about ${askTarget || 'a measure of center or spread'}.${numbers.length ? ` You're working with the values ${numbers.slice(0, 4).join(', ')}.` : ''} Make sure you're computing the right statistic for what the question asks.`,
    'triangle': `This is a triangle problem.${numbers.length ? ` You're given measurements like ${numbers.slice(0, 3).join(', ')}.` : ''} Identify whether you need the Pythagorean theorem, trigonometry, or angle relationships.`,
    'circle': `This is a circle problem.${numbers.length ? ` You're given ${numbers.slice(0, 2).join(' and ')}.` : ''} Decide whether you need the circumference (2πr), area (πr²), or arc length formula.`,
    'geometry-measure': `This is a measurement problem asking for ${askTarget || 'a geometric quantity'}.${numbers.length ? ` Use the given values ${numbers.slice(0, 3).join(', ')} in the appropriate formula.` : ' Identify which formula applies and which measurements you have.'}`,
    'ratio': `This is a ratio/proportion problem.${numbers.length >= 2 ? ` Set up a proportion using ${numbers[0]} and ${numbers[1]}.` : ' Set up a proportion relating the given quantities.'} Cross-multiply to solve.`,
    'inequality': `This involves an inequality.${equations.length ? ` Look at ${equations[0]}.` : ''} Solve it like an equation, but remember to flip the inequality sign if you multiply or divide by a negative number.`,
    'absolute-value': `This involves absolute value.${equations.length ? ` With ${equations[0]}, ` : ''}Remember that |expression| = value means expression = value OR expression = -value. Set up both cases.`,
    'linear': `This is a linear equation/relationship problem.${equations.length ? ` The equation ${equations[0]} is linear.` : ''} Identify the slope (rate of change) and y-intercept (starting value).`,
    'algebra': `Start by identifying what you're solving for in ${equations[0] || 'the equation'}.${variables.length ? ` Isolate ${variables[0]} step by step.` : ' Isolate the variable step by step.'}`,
  }

  if (mathTopic && topicStrategies[mathTopic]) {
    h1 = topicStrategies[mathTopic]
  } else if (equations.length) {
    h1 = `Start with the equation ${equations[0]}.${askTarget ? ` The question asks for ${truncate(askTarget, 60)}, so identify which part of the equation gives you that.` : ' Identify what the question is asking you to find and which part of the equation relates to it.'}`
  } else if (references.length) {
    h1 = `Look at ${references[0]} carefully. Read the labels and units, then identify which values from the ${references[0].toLowerCase()} you need to answer the question.`
  } else if (numbers.length >= 2) {
    h1 = `The question gives you the values ${numbers.slice(0, 4).join(', ')}. Figure out the relationship between these numbers — are they being added, multiplied, compared, or used in a formula?`
  } else if (chapterName) {
    h1 = `This is a ${chapterName} problem. ${askTarget ? `You need to find ${truncate(askTarget, 60)}.` : 'Identify exactly what quantity the question is asking for.'} Set up the problem using the ${chapterName.toLowerCase()} approach before calculating.`
  } else {
    h1 = `Read the question carefully and identify exactly what value or expression you need to find.${askTarget ? ` The question asks for ${truncate(askTarget, 60)}.` : ''} Write down what you know before calculating.`
  }

  // ── Hint 2: reference specific values and suggest next step ──
  let h2 = ''
  if (equations.length && variables.length) {
    const solveVar = variables[0]
    h2 = `In ${equations[0]}, isolate ${solveVar} by performing inverse operations step by step.`
    if (numbers.length) {
      h2 += ` Substitute the known values (${numbers.slice(0, 3).join(', ')}) and simplify.`
    }
    if (equations.length >= 2) {
      h2 += ` You can also use the second equation ${equations[1]} — try substitution by solving one equation for ${solveVar} and plugging it into the other.`
    }
  } else if (mathTopic === 'slope' && numbers.length >= 2) {
    h2 = `Calculate slope = (y₂ - y₁) / (x₂ - x₁). Use the points or values from the question: ${numbers.slice(0, 4).join(', ')}.${equations.length ? ` Or if you have ${equations[0]}, just identify the coefficient of x.` : ''}`
  } else if (mathTopic === 'percent' && numbers.length) {
    const percentNums = numbers.filter(n => n.includes('%'))
    const plainNums = numbers.filter(n => !n.includes('%'))
    if (percentNums.length && plainNums.length) {
      h2 = `Convert ${percentNums[0]} to a decimal and multiply by ${plainNums[0]} to find the part. Or set up: ${percentNums[0]} of ${plainNums[0]} = (${percentNums[0].replace('%', '')}/100) × ${plainNums[0]}.`
    } else {
      h2 = `Set up the percent equation with ${numbers.slice(0, 3).join(', ')}. Remember: percent = (part/whole) × 100.`
    }
  } else if (mathTopic === 'probability') {
    h2 = `Count the favorable outcomes and divide by the total outcomes.${numbers.length >= 2 ? ` From the given values (${numbers.slice(0, 4).join(', ')}), identify which is the favorable count and which is the total.` : ''}`
  } else if (references.length && numbers.length) {
    h2 = `From ${references[0]}, locate the values ${numbers.slice(0, 3).join(', ')}. Use these specific data points to calculate what the question asks for.`
  } else if (numbers.length >= 2) {
    h2 = `Work with the given numbers: ${numbers.slice(0, 4).join(', ')}.${askType === 'find_value' ? ` Perform the operations needed to get ${askTarget || 'the answer'}.` : ' Determine which operation connects these values to what the question asks.'}${isMC ? ` Then match your result to the answer choices.` : ''}`
  } else if (askType === 'conditional') {
    h2 = `Substitute the given condition into the equation or relationship and solve.${equations.length ? ` Plug the condition into ${equations[0]}.` : ''}`
  } else {
    h2 = `${askTarget ? `To find ${truncate(askTarget, 60)}, ` : ''}set up the equation or expression first, then solve step by step.${conceptTitles.length ? ` Apply the concept of ${conceptTitles[0]}.` : ''}${isMC ? ' Compare your result to the answer choices.' : ' Double-check your arithmetic.'}`
  }

  // ── Hint 3: almost give it away ──
  let h3 = ''
  if (mathTopic === 'slope' && equations.length) {
    h3 = `The equation ${equations[0]} ${/=\s*\d/.test(equations[0]) ? 'can be rearranged into' : 'is already close to'} y = mx + b form. The coefficient of x is the slope. ${numbers.length ? `With the values ${numbers.slice(0, 3).join(', ')}, ` : ''}compute m directly.${isMC ? ` Your answer should match one of ${answerChoices?.join(', ') || 'the choices'}.` : ''}`
  } else if (mathTopic === 'system-of-equations' && equations.length >= 2) {
    h3 = `Take ${equations[0]} and solve for one variable. Substitute that expression into ${equations[1]}. This gives you a single equation with one unknown — solve it, then back-substitute to find the other variable.${isMC ? ` Check which answer choice matches.` : ''}`
  } else if (mathTopic === 'quadratic' && equations.length) {
    h3 = `For ${equations[0]}: try factoring first. If it factors into (x - a)(x - b) = 0, the solutions are x = a and x = b. If factoring is hard, use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a.${numbers.length ? ` With coefficients from the values ${numbers.slice(0, 3).join(', ')}.` : ''}`
  } else if (equations.length && variables.length) {
    h3 = `Here is the exact method: take ${equations[0]}${equations.length >= 2 ? ` and ${equations[1]}` : ''}, isolate ${variables[0]}.${numbers.length ? ` After substituting ${numbers.slice(0, 2).join(' and ')}, you should be able to compute ${variables[0]} directly.` : ' Perform each inverse operation carefully.'}${isMC ? ` Verify your result matches one of the answer choices.` : ' Verify by plugging your answer back into the original equation.'}`
  } else if (numbers.length >= 2) {
    h3 = `Use the values ${numbers.slice(0, 4).join(', ')} directly.${mathTopic === 'percent' ? ' Convert the percent to a decimal, multiply or divide as needed.' : ''}${mathTopic === 'probability' ? ' Divide favorable by total.' : ''}${mathTopic === 'statistics' ? ' Add all values and divide by the count for mean, or order them for median.' : ''} The calculation is straightforward once you set it up correctly — ${askTarget ? `you should get ${truncate(askTarget, 50)}` : 'compute and verify'}.${isMC ? ` Match to ${answerChoices?.join(', ') || 'the choices'}.` : ''}`
  } else {
    h3 = `${askTarget ? `To get ${truncate(askTarget, 60)}: ` : ''}work through the problem step by step.${equations.length ? ` From ${equations[0]}, solve directly.` : ''}${chapterName ? ` Use the standard ${chapterName.toLowerCase()} method.` : ''} Show every step and verify your final answer is exactly what the question asks for — not an intermediate result.${isMC ? ` Plug your answer back in to confirm.` : ''}`
  }

  return [h1, h2, h3]
}

function buildReadingHints(parsed, { qNum, chapterName, concepts }) {
  const { rwTask, askType, askTarget, quotedPhrases, passageSnippets, references, questionSentence } = parsed
  const conceptTitles = (concepts || []).map(c => c?.title).filter(Boolean)

  // ── Hint 1 ──
  let h1 = ''
  const taskStrategies = {
    'main-idea': `This question asks for the main idea or central claim. Don't get distracted by details — ask yourself: "What is the ONE point the entire passage is making?" Skim the first and last sentences of each paragraph for the big picture.`,
    'author-purpose': `This asks about the author's purpose. Ask yourself WHY the author wrote this — to inform, persuade, compare, criticize, or describe? Look at the overall structure and tone of the passage.`,
    'vocabulary-in-context': `This is a vocabulary-in-context question${quotedPhrases.length ? ` about "${quotedPhrases[0]}"` : ''}. The correct answer depends on how the word/phrase is used in THIS specific passage, not its most common dictionary meaning.`,
    'evidence-support': `This asks which evidence best supports a claim. Go back to the passage and find the specific sentence or lines that directly prove or back up the stated claim. The right answer will be the most direct, concrete evidence.`,
    'inference': `This is an inference question. The answer won't be stated directly — you need to figure out what the passage IMPLIES. But don't go too far: the correct inference is strongly supported by what's actually written.`,
    'sentence-function': `This asks what a sentence does in the passage. Think about its structural role: Does it introduce a new idea? Provide evidence? Offer a counterargument? Transition to a new topic?`,
    'data-rhetoric': `This question involves data from a graph, chart, or table alongside the passage text.${references.length ? ` Focus on ${references[0]} and` : ''} identify the specific data point that answers the question.`,
  }

  if (rwTask && taskStrategies[rwTask]) {
    h1 = taskStrategies[rwTask]
  } else if (references.length) {
    h1 = `Go back to ${references[0]} in the passage. The answer to this question is directly tied to what you find there. Read that section carefully before looking at the answer choices.`
  } else if (quotedPhrases.length) {
    h1 = `The question references "${truncate(quotedPhrases[0], 80)}". Go back to where this appears in the passage and read the surrounding sentences to understand the context.`
  } else if (askTarget) {
    h1 = `This question asks about ${truncate(askTarget, 80)}. Locate the specific part of the passage that addresses this and read it carefully before choosing.`
  } else {
    h1 = `Before looking at the answer choices, go back to the passage and find the specific section that answers this question. ${chapterName ? `This is a ${chapterName} question — ` : ''}the correct answer will be directly supported by the text.`
  }

  // ── Hint 2 ──
  let h2 = ''
  if (rwTask === 'vocabulary-in-context' && quotedPhrases.length) {
    h2 = `Replace "${quotedPhrases[0]}" with each answer choice in the original sentence. Which one preserves the author's meaning in this specific context? The passage's topic and tone should help you eliminate choices that don't fit.`
  } else if (rwTask === 'evidence-support') {
    h2 = `For each answer choice, ask: "Does this sentence/passage DIRECTLY support the claim?" Eliminate any choice that is true but doesn't specifically address the question. The best evidence is the most direct and specific connection.`
  } else if (rwTask === 'inference') {
    h2 = `Test each answer choice: Can you point to specific words or sentences in the passage that lead to this conclusion? If you can't find textual support, eliminate that choice. The correct inference requires evidence, not just plausibility.`
  } else if (passageSnippets.quoted.length) {
    h2 = `Focus on the passage text "${truncate(passageSnippets.quoted[0], 80)}". This is a key detail. How does it connect to what the question is asking? The correct answer will align closely with this specific wording.`
  } else if (references.length) {
    h2 = `In ${references[0]}, identify the key claim or detail. Now compare each answer choice against that specific part of the text. Eliminate any choice that goes beyond what the passage actually states.`
  } else {
    h2 = `Narrow it down to two choices, then compare them head-to-head. Which one is more precisely supported by the passage's actual wording?${conceptTitles.length ? ` Think about the concept of ${conceptTitles[0]}.` : ''} Avoid choices that are "true in general" but not supported by THIS passage.`
  }

  // ── Hint 3 ──
  let h3 = ''
  if (rwTask === 'vocabulary-in-context') {
    h3 = `The answer is the word/phrase that means the same thing as ${quotedPhrases.length ? `"${quotedPhrases[0]}"` : 'the tested word'} in THIS sentence. Substitute your answer into the passage and read it — the meaning of the sentence should stay exactly the same.`
  } else if (rwTask === 'main-idea') {
    h3 = `The main idea should cover the WHOLE passage, not just one paragraph. Eliminate any choice that is too narrow (only about one detail) or too broad (goes beyond what the passage discusses). The correct answer captures the passage's central argument or topic.`
  } else if (rwTask === 'author-purpose') {
    h3 = `Think about the passage structure: what does the author do in the beginning, middle, and end? The purpose is the overall goal.${passageSnippets.keySentences.length ? ` The passage includes statements like "${truncate(passageSnippets.keySentences[0], 60)}" — what is the author trying to accomplish with this?` : ''} Choose the answer that describes the WHY, not just the WHAT.`
  } else {
    h3 = `Find the single sentence or phrase in the passage that most directly answers the question.${quotedPhrases.length ? ` Look near "${truncate(quotedPhrases[0], 60)}".` : ''}${references.length ? ` Focus on ${references[0]}.` : ''} The correct answer will practically paraphrase or directly match that part of the passage. If you can't point to supporting text, reconsider your choice.`
  }

  return [h1, h2, h3]
}

function buildEnglishHints(parsed, { qNum, chapterName, concepts }) {
  const { rwTask, quotedPhrases, passageSnippets, references, questionSentence, lower } = parsed
  const conceptTitles = (concepts || []).map(c => c?.title).filter(Boolean)

  // ── Hint 1 ──
  let h1 = ''
  const taskStrategies = {
    'transition': `This question asks you to choose the best transition.${quotedPhrases.length ? ` Near "${truncate(quotedPhrases[0], 60)}", ` : ' '}read the sentence before and after the blank. What is the logical relationship — contrast (but/however), continuation (also/furthermore), cause-effect (therefore/consequently), or example (for instance)?`,
    'punctuation': `This is a punctuation question. Read the full sentence and identify the grammatical structures on each side of the punctuation mark. Is it separating two complete sentences? Setting off a nonessential phrase? Introducing a list? The grammar determines the correct punctuation.`,
    'sentence-placement': `This asks about sentence placement. Read the sentence and ask: what does it refer to? It should go immediately after the sentence that introduces the concept it discusses, and before any sentence that builds on its information.`,
    'sentence-combining': `This asks you to combine sentences. The best version keeps all the important information from both sentences while being grammatically correct and concise. Eliminate choices that change the meaning, are redundant, or create run-ons.`,
    'sentence-function': `Ask what role this sentence plays in the paragraph. Is it a topic sentence, a supporting detail, a transition, or a conclusion? The correct answer describes the sentence's structural purpose.`,
    'completion': `Read the surrounding context to determine what information logically fits in the blank. The correct completion should match the paragraph's topic, tone, and level of specificity.`,
  }

  if (rwTask && taskStrategies[rwTask]) {
    h1 = taskStrategies[rwTask]
  } else if (/concise|wordy|redundan/.test(lower)) {
    h1 = `This is a conciseness question. The shortest answer that preserves the full meaning is usually correct. Eliminate choices that repeat ideas already stated elsewhere in the sentence or paragraph.`
  } else if (/subject.?verb|agreement|verb.?tense/.test(lower) || chapterName?.toLowerCase().includes('agreement')) {
    h1 = `This tests subject-verb agreement or verb tense. Find the actual subject of the sentence (ignore phrases between the subject and verb), then make sure the verb matches in number and tense.`
  } else if (/pronoun|antecedent|its|their|they/.test(lower) || chapterName?.toLowerCase().includes('pronoun')) {
    h1 = `This tests pronoun usage. Identify what the pronoun refers to (its antecedent), then check that the pronoun matches in number and clarity. If "they" or "it" could refer to multiple things, the pronoun is ambiguous.`
  } else if (/parallel|structure/.test(lower) || chapterName?.toLowerCase().includes('parallel')) {
    h1 = `This tests parallel structure. Find the list or comparison in the sentence, then make sure every item follows the same grammatical pattern (all nouns, all -ing verbs, all infinitives, etc.).`
  } else if (/modifier|modifying|dangling|misplaced/.test(lower)) {
    h1 = `This tests modifier placement. A modifier must be right next to the word it describes. Check: does the phrase after the comma or dash actually modify the word immediately next to it?`
  } else if (chapterName) {
    h1 = `This is a ${chapterName} question. Read the sentence with the underlined portion and one sentence on each side. Before looking at the choices, decide what the underlined section needs to accomplish — grammar, clarity, or flow.`
  } else {
    h1 = `Read the sentence with the underlined part and the sentences around it. Determine what's being tested: grammar, punctuation, word choice, or sentence structure. Then eliminate choices that have clear errors.`
  }

  // ── Hint 2 ──
  let h2 = ''
  if (rwTask === 'transition') {
    h2 = `Cover the answer choices. Based on the surrounding sentences, write down what type of transition you expect (contrast, continuation, cause-effect, etc.). Then find the choice that matches your prediction.${quotedPhrases.length ? ` The context around "${truncate(quotedPhrases[0], 50)}" should guide you.` : ''}`
  } else if (rwTask === 'punctuation') {
    h2 = `Test whether each side of the punctuation mark is a complete sentence. Two complete sentences need a period, semicolon, or comma + conjunction — never just a comma (that's a comma splice). A semicolon and period are interchangeable; a comma alone is not.`
  } else if (/concise|wordy/.test(lower)) {
    h2 = `Compare the choices: which one says the same thing in fewer words without losing meaning? If two words mean the same thing in context, one of them is redundant and should be cut.`
  } else if (passageSnippets.keySentences.length) {
    h2 = `Read the surrounding text: "${truncate(passageSnippets.keySentences[0], 80)}". Plug each answer choice into this context and listen for what sounds complete, grammatically correct, and not redundant.`
  } else {
    h2 = `Plug each answer choice into the sentence and read it in full. Eliminate any choice that creates a grammatical error, changes the intended meaning, or sounds awkward in context.${conceptTitles.length ? ` The grammar rule being tested is related to ${conceptTitles[0]}.` : ''}`
  }

  // ── Hint 3 ──
  let h3 = ''
  if (rwTask === 'transition') {
    h3 = `The sentence before the blank and the sentence after give you the relationship. If they present opposing ideas, use a contrast word (however, nevertheless). If the second supports or adds to the first, use a continuation word (furthermore, additionally). If one causes the other, use a cause-effect word (therefore, consequently). Pick the choice that creates this exact relationship.`
  } else if (rwTask === 'punctuation') {
    h3 = `Here's the decision tree: (1) Two complete sentences on both sides → use period, semicolon, or comma + FANBOYS conjunction. (2) Nonessential information → set off with commas, dashes, or parentheses. (3) A list or explanation follows → use a colon. Apply this to the sentence and select the correct punctuation.`
  } else if (/concise/.test(lower)) {
    h3 = `Choose the shortest option that preserves the complete meaning. If "NO CHANGE" is longer than another option that says the same thing, eliminate it. The answer is almost always the most concise, non-redundant version.`
  } else {
    h3 = `Read your chosen answer back into the full paragraph. It should be (1) grammatically correct, (2) clear in meaning, (3) consistent in style with the rest of the passage, and (4) not redundant. If it fails any of these, try the next choice.${chapterName ? ` Apply the ${chapterName} rule directly.` : ''}`
  }

  return [h1, h2, h3]
}

function buildScienceHints(parsed, { qNum, chapterName, concepts }) {
  const { scienceInfo, references, numbers, askType, askTarget, quotedPhrases, questionSentence, lower } = parsed
  const { temps, units, experimentRef, scientistRef, studyRef, figureRef, trendWords } = scienceInfo
  const conceptTitles = (concepts || []).map(c => c?.title).filter(Boolean)

  // ── Hint 1 ──
  let h1 = ''
  if (scientistRef.length >= 2) {
    h1 = `This question involves ${scientistRef.join(' and ')} — they have different viewpoints or hypotheses. Read each scientist's claim carefully and identify exactly where they agree and disagree before looking at the answer choices.`
  } else if (experimentRef.length) {
    h1 = `Focus on ${experimentRef[0]}. Identify what was being tested (independent variable), what was measured (dependent variable), and what was kept the same (controlled variables). The answer depends on understanding this experimental setup.`
  } else if (figureRef.length) {
    h1 = `Start with ${figureRef[0]}. Read the title, axis labels, and units before looking at any data points. Understanding what the figure shows is more important than any individual value.`
  } else if (trendWords.length) {
    h1 = `The question asks about a ${trendWords[0]} trend. Look at the data to see if values go up, go down, or stay the same as the independent variable changes. Focus on the overall pattern, not individual data points.`
  } else {
    h1 = `Identify which figure, table, or passage section contains the data you need. Read the labels, units, and any descriptions before trying to answer. On ACT Science, most errors happen because students look at the wrong data source.`
  }

  // ── Hint 2 ──
  let h2 = ''
  if (figureRef.length && numbers.length) {
    h2 = `In ${figureRef[0]}, locate the specific values ${numbers.slice(0, 3).join(', ')}${units.length ? ` (measured in ${units[0]})` : ''}. Trace the data at ${numbers[0]} on the axis and read the corresponding value.${askTarget ? ` You're looking for ${truncate(askTarget, 60)}.` : ''}`
  } else if (experimentRef.length && numbers.length) {
    h2 = `In ${experimentRef[0]}, find the trial or condition with ${numbers.slice(0, 2).join(' and ')}${temps.length ? ` at ${temps[0]}` : ''}. Compare the result at that point to what the question asks about.`
  } else if (scientistRef.length >= 2) {
    h2 = `Compare ${scientistRef[0]}'s claim directly to ${scientistRef[1]}'s claim. ${askTarget ? `The question asks about ${truncate(askTarget, 60)} — ` : ''}find the specific sentence where each scientist addresses this point. Their disagreement often comes down to one key detail.`
  } else if (trendWords.length && references.length) {
    h2 = `In ${references[0]}, track how the dependent variable changes as the independent variable ${trendWords[0]}s.${numbers.length ? ` Focus on the data at ${numbers.slice(0, 2).join(' and ')}.` : ''} Describe the trend in simple terms before matching it to an answer choice.`
  } else if (numbers.length) {
    h2 = `The question references the values ${numbers.slice(0, 4).join(', ')}${units.length ? ` (${units.join(', ')})` : ''}. Find exactly where these appear in the data and determine the relationship between them.`
  } else {
    h2 = `${references.length ? `In ${references[0]}, ` : ''}identify the specific data point or comparison the question asks about.${conceptTitles.length ? ` This relates to ${conceptTitles[0]}.` : ''} Trace the values carefully through the data — many wrong answers come from reading the wrong row/column.`
  }

  // ── Hint 3 ──
  let h3 = ''
  if (figureRef.length && numbers.length) {
    h3 = `Go to ${figureRef[0]} and put your finger on ${numbers[0]} on the x-axis (or find it in the table). Read straight across/up to find the corresponding y-value.${numbers.length >= 2 ? ` Then do the same for ${numbers[1]} and compare the two values.` : ''} The answer is the choice that matches this specific data reading${units.length ? `, keeping units in ${units[0]}` : ''}.`
  } else if (scientistRef.length >= 2) {
    h3 = `For each answer choice, check: would ${scientistRef[0]} agree? Would ${scientistRef[1]} agree? The correct answer is the only one that matches the specific scientist's stated position. Their claims are usually clearly stated in their respective paragraphs — quote their exact words to yourself.`
  } else if (experimentRef.length) {
    h3 = `In ${experimentRef[0]}, the independent variable was changed and the dependent variable was measured.${temps.length ? ` At ${temps[0]}, ` : ' '}${numbers.length ? `the data shows values of ${numbers.slice(0, 3).join(', ')}.` : 'look at what the data shows.'} The correct answer directly reflects what this data demonstrates — don't add interpretation beyond what the numbers show.`
  } else {
    h3 = `The answer is directly readable from the data.${references.length ? ` In ${references[0]}, ` : ''}${numbers.length ? `look at ${numbers.slice(0, 3).join(', ')} and ` : ''}read the exact values. Don't overthink the science — the ACT Science section tests data reading more than scientific knowledge. Pick the answer that most precisely matches what the data shows.`
  }

  return [h1, h2, h3]
}

function buildRWHints(parsed, { qNum, chapterName, concepts, isMC }) {
  const { rwTask, askType, askTarget, quotedPhrases, passageSnippets, references, questionSentence, lower } = parsed
  const conceptTitles = (concepts || []).map(c => c?.title).filter(Boolean)

  // SAT Reading & Writing is a combined section — determine if this leans reading or writing
  const isWritingFocused = rwTask && ['transition', 'punctuation', 'sentence-combining', 'sentence-placement', 'completion'].includes(rwTask)
    || /underlined|replace|revise|which choice/.test(lower)

  if (isWritingFocused) {
    return buildEnglishHints(parsed, { qNum, chapterName, concepts })
  }

  // Reading-focused SAT R&W questions
  // ── Hint 1 ──
  let h1 = ''
  const taskStrategies = {
    'main-idea': `This question asks for the main idea or purpose of the passage. Read the first and last sentences, then ask: "What is the ONE point the author is making?" Eliminate answer choices that are too specific (just one detail) or too broad.`,
    'author-purpose': `This asks why the author wrote this text. Look at the overall structure: is the author explaining, arguing, comparing, or describing? The purpose should cover the whole passage, not just one part.`,
    'vocabulary-in-context': `This asks what ${quotedPhrases.length ? `"${truncate(quotedPhrases[0], 50)}"` : 'a word/phrase'} means as used in the passage. Go back to the exact sentence, read the surrounding context, and determine the specific shade of meaning here.`,
    'evidence-support': `This asks for evidence that supports a claim. Find the claim in the passage first, then identify which answer choice provides the most direct, specific proof of that claim.`,
    'inference': `This is an inference question. The correct answer is strongly implied by the text but not directly stated. Look for clues in word choice, details, and the author's tone.`,
    'data-rhetoric': `This question asks about data from a graph, chart, or table.${references.length ? ` Focus on ${references[0]}.` : ''} Read the data labels carefully and identify the specific values the question asks about before choosing an answer.`,
  }

  if (rwTask && taskStrategies[rwTask]) {
    h1 = taskStrategies[rwTask]
  } else if (references.length) {
    h1 = `Go back to ${references[0]} in the passage. Read that section carefully and identify the key detail or claim before comparing answer choices.`
  } else if (quotedPhrases.length) {
    h1 = `The question references "${truncate(quotedPhrases[0], 80)}". Find this in the passage and read the sentences around it. The answer depends on understanding this specific context.`
  } else if (chapterName) {
    h1 = `This is a ${chapterName} question. Go back to the passage and identify the specific information the question targets. The correct answer will be directly supported by the text.`
  } else {
    h1 = `Before looking at the choices, go back to the passage and identify exactly what part answers this question. The correct SAT R&W answer is always supported by specific words in the text.`
  }

  // ── Hint 2 ──
  let h2 = ''
  if (rwTask === 'vocabulary-in-context') {
    h2 = `Try replacing ${quotedPhrases.length ? `"${quotedPhrases[0]}"` : 'the tested word'} with each answer choice. Read the full sentence with each substitution. The correct answer preserves the exact meaning the author intended in this context — not the most common definition.`
  } else if (quotedPhrases.length) {
    h2 = `The passage states "${truncate(quotedPhrases[0], 80)}". Use this specific wording to evaluate each answer choice. The best answer aligns closely with what the text actually says, not what seems generally true.`
  } else if (passageSnippets.keySentences.length) {
    h2 = `A key sentence in the passage is: "${truncate(passageSnippets.keySentences[0], 80)}". How does this relate to what the question asks?${askTarget ? ` Focus on the connection to ${truncate(askTarget, 50)}.` : ''} The answer should be traceable to specific passage wording.`
  } else {
    h2 = `Narrow your choices to two. For each remaining option, can you point to a specific sentence or phrase in the passage that supports it? The answer with stronger textual evidence is correct.${conceptTitles.length ? ` Apply the concept of ${conceptTitles[0]}.` : ''}`
  }

  // ── Hint 3 ──
  let h3 = ''
  if (rwTask === 'vocabulary-in-context') {
    h3 = `Substitute your answer into the sentence and read it aloud. The meaning of the entire sentence should remain unchanged. If the sentence's meaning shifts even slightly, that choice is wrong. The correct answer is a precise synonym in this context.`
  } else if (rwTask === 'main-idea') {
    h3 = `The main idea must account for the entire passage. If a choice only covers one paragraph or one example, it's too narrow. If it makes a claim broader than what the passage discusses, it's too broad. The correct answer is the Goldilocks option — just right in scope.`
  } else if (rwTask === 'evidence-support') {
    h3 = `For each answer choice, ask: "Does this directly prove the specific claim in question?" Not "is this true?" or "is this related?" — but "does this prove it?" The correct evidence has the tightest logical connection to the claim.`
  } else {
    h3 = `The correct answer will practically paraphrase a specific part of the passage.${quotedPhrases.length ? ` Look near "${truncate(quotedPhrases[0], 50)}" for the supporting text.` : ''}${references.length ? ` Focus on ${references[0]}.` : ''} If you can't point to exact words in the passage that support your choice, reconsider.`
  }

  return [h1, h2, h3]
}

function buildGeneralHints(parsed, { qNum, isMC, chapterName, concepts, answerChoices }) {
  const { askType, askTarget, numbers, equations, references, quotedPhrases, questionSentence } = parsed
  const conceptTitles = (concepts || []).map(c => c?.title).filter(Boolean)

  let h1 = ''
  if (askTarget) {
    h1 = `The question asks you to find ${truncate(askTarget, 80)}. Before diving into calculations or choices, make sure you understand exactly what's being asked.${chapterName ? ` This is a ${chapterName} problem.` : ''}`
  } else if (chapterName) {
    h1 = `This is a ${chapterName} problem. Identify what the question is asking for, then apply the standard approach for this topic.`
  } else {
    h1 = `Read the question carefully and identify exactly what you need to find.${isMC ? ' Predict the answer before looking at the choices.' : ' Write down what you know and what you need to find.'}`
  }

  let h2 = ''
  if (numbers.length && equations.length) {
    h2 = `Use the equation ${equations[0]} with the values ${numbers.slice(0, 3).join(', ')}. Substitute the known quantities and solve for the unknown.`
  } else if (numbers.length) {
    h2 = `The question gives you ${numbers.slice(0, 4).join(', ')}. Determine how these values relate to each other and to what you're solving for.${conceptTitles.length ? ` This connects to ${conceptTitles[0]}.` : ''}`
  } else if (references.length) {
    h2 = `Focus on ${references[0]}. Extract the specific information you need from there to answer the question.`
  } else {
    h2 = `${conceptTitles.length ? `Apply the concept of ${conceptTitles[0]}. ` : ''}Break the problem into steps: what do you know, what do you need, and what's the bridge between them?`
  }

  let h3 = ''
  if (isMC) {
    h3 = `Work the problem completely, then match your answer to the choices (${answerChoices?.join(', ') || 'A, B, C, D'}).${equations.length ? ` From ${equations[0]}, ` : ' '}If two choices look similar, plug each back into the original problem to see which one actually works.`
  } else {
    h3 = `Solve step by step and verify your final answer.${equations.length ? ` Starting from ${equations[0]}, ` : ' '}Make sure your answer is the exact quantity the question asks for — not an intermediate step — and that it's in the right format.`
  }

  return [h1, h2, h3]
}

// ── deduplication ────────────────────────────────────────────

function distinctHints(hints) {
  const out = []
  for (const hint of hints) {
    const cleaned = clean(hint)
    if (!cleaned) continue
    if (!out.some(existing => existing.toLowerCase() === cleaned.toLowerCase())) {
      out.push(cleaned)
    }
  }
  return out
}

// ── public API ───────────────────────────────────────────────

export function buildQuestionHintLadder({
  exam = 'sat',
  section = '',
  qNum = 0,
  isMC = false,
  chapterName = '',
  chapterCode = '',
  concepts = [],
  questionText = '',
  answerChoices = [],
} = {}) {
  const parsed = parseQuestionText(questionText)
  const family = sectionFamily(exam, section)
  const opts = { qNum, isMC, chapterName, chapterCode, concepts, answerChoices }

  let rawHints
  switch (family) {
    case 'math':
      rawHints = buildMathHints(parsed, opts)
      break
    case 'reading':
      rawHints = buildReadingHints(parsed, opts)
      break
    case 'english':
      rawHints = buildEnglishHints(parsed, opts)
      break
    case 'reading-writing':
      rawHints = buildRWHints(parsed, opts)
      break
    case 'science':
      rawHints = buildScienceHints(parsed, opts)
      break
    default:
      rawHints = buildGeneralHints(parsed, opts)
  }

  return distinctHints(rawHints).slice(0, 3)
}

export function buildQuestionHintSummary(options = {}) {
  return buildQuestionHintLadder(options)[0]
}
