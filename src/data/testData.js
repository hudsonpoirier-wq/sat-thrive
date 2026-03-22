// SAT Practice Test #11 — Official Answer Key
// Source: College Board scoring guide

export const ANSWER_KEY = {
  rw_m1: {
    1:'A',2:'C',3:'D',4:'D',5:'A',6:'B',7:'B',8:'D',9:'D',10:'C',
    11:'B',12:'D',13:'A',14:'D',15:'B',16:'A',17:'D',18:'D',19:'D',20:'D',
    21:'A',22:'B',23:'B',24:'A',25:'D',26:'D',27:'D',28:'A',29:'A',30:'C',
    31:'A',32:'D',33:'B'
  },
  rw_m2: {
    1:'C',2:'C',3:'C',4:'D',5:'B',6:'B',7:'B',8:'A',9:'B',10:'C',
    11:'B',12:'D',13:'C',14:'B',15:'C',16:'C',17:'A',18:'A',19:'B',20:'B',
    21:'B',22:'B',23:'B',24:'B',25:'A',26:'B',27:'D',28:'B',29:'C',30:'B',
    31:'C',32:'A',33:'A'
  },
  math_m1: {
    // Multiple choice
    1:'D',2:'A',3:'C',4:'A',5:'B',
    // Free response (student-produced)
    6:'75',7:'30',
    8:'A',9:'C',10:'C',11:'D',12:'B',
    13:'13',14:'15000',
    15:'A',16:'A',17:'C',18:'B',19:'D',
    20:'100',21:'29',
    22:'B',23:'B',24:'A',25:'C',26:'B',
    27:'3331'
  },
  math_m2: {
    1:'C',2:'B',3:'D',4:'D',5:'A',
    6:'8.6',7:'3600',
    8:'A',9:'B',10:'D',11:'C',12:'A',
    13:'45',14:'13',
    15:'B',16:'C',17:'D',18:'B',19:'A',
    20:'.5061|41/81',21:'302.4',
    22:'C',23:'A',24:'B',25:'B',26:'D',
    27:'157.8'
  }
}

// Free-response question numbers (student-produced answers)
export const FREE_RESPONSE = {
  math_m1: [6,7,13,14,20,21,27],
  math_m2: [6,7,13,14,20,21,27]
}

// Chapter map — each chapter from the Agora Project Playbook
export const CHAPTERS = {
  '2.1': { name: 'Words in Context', page: 6, domain: 'Craft & Structure', color: '#3b82f6' },
  '2.2': { name: 'Text Structure & Purpose', page: 7, domain: 'Craft & Structure', color: '#3b82f6' },
  '2.3': { name: 'Cross-Text Connections', page: 7, domain: 'Craft & Structure', color: '#3b82f6' },
  '3.1': { name: 'Central Ideas & Literalism', page: 9, domain: 'Information & Ideas', color: '#8b5cf6' },
  '3.2': { name: 'Command of Evidence: Textual', page: 9, domain: 'Information & Ideas', color: '#8b5cf6' },
  '3.3': { name: 'Command of Evidence: Graphs', page: 10, domain: 'Information & Ideas', color: '#8b5cf6' },
  '3.4': { name: 'Inferences & Extreme Language', page: 10, domain: 'Information & Ideas', color: '#8b5cf6' },
  '4.1': { name: 'Sentence Boundaries', page: 12, domain: 'Standard English Conventions', color: '#ec4899' },
  '4.2': { name: 'Colon & Dash Rules', page: 13, domain: 'Standard English Conventions', color: '#ec4899' },
  '4.3': { name: 'Subject-Verb Agreement', page: 13, domain: 'Standard English Conventions', color: '#ec4899' },
  '4.4': { name: 'Non-Essential Clauses', page: 14, domain: 'Standard English Conventions', color: '#ec4899' },
  '4.5': { name: 'Apostrophes', page: 14, domain: 'Standard English Conventions', color: '#ec4899' },
  '4.6': { name: 'Dangling Modifiers', page: 15, domain: 'Standard English Conventions', color: '#ec4899' },
  '5.1': { name: 'Rhetorical Synthesis', page: 16, domain: 'Expression of Ideas', color: '#f59e0b' },
  '5.2': { name: 'Transitions: The Family Tree', page: 16, domain: 'Expression of Ideas', color: '#f59e0b' },
  '5.3': { name: 'Concision (Shorter is Better)', page: 17, domain: 'Expression of Ideas', color: '#f59e0b' },
  '6.1': { name: 'Desmos Regression (Free Points)', page: 18, domain: 'Desmos Hacks', color: '#10b981' },
  '6.2': { name: 'Desmos: Systems & Intersections', page: 19, domain: 'Desmos Hacks', color: '#10b981' },
  '7.1': { name: 'Linear Equations (y=mx+b)', page: 20, domain: 'Heart of Algebra', color: '#10b981' },
  '7.2': { name: 'Systems of Linear Equations', page: 20, domain: 'Heart of Algebra', color: '#10b981' },
  '7.3': { name: 'Linear Inequalities', page: 21, domain: 'Heart of Algebra', color: '#10b981' },
  '7.4': { name: 'Absolute Value Equations', page: 22, domain: 'Heart of Algebra', color: '#10b981' },
  '8.1': { name: 'Percentages & Multiplier Method', page: 23, domain: 'Problem Solving & Data', color: '#06b6d4' },
  '8.2': { name: 'Ratios, Rates & Proportions', page: 23, domain: 'Problem Solving & Data', color: '#06b6d4' },
  '8.3': { name: 'Unit Conversions', page: 24, domain: 'Problem Solving & Data', color: '#06b6d4' },
  '8.4': { name: 'Statistics: Mean/Median/SD', page: 24, domain: 'Problem Solving & Data', color: '#06b6d4' },
  '9.1': { name: 'Quadratics: The Three Forms', page: 25, domain: 'Advanced Math', color: '#f97316' },
  '9.2': { name: 'The Discriminant (Δ=b²-4ac)', page: 25, domain: 'Advanced Math', color: '#f97316' },
  '9.3': { name: 'Exponential Functions', page: 26, domain: 'Advanced Math', color: '#f97316' },
  '9.4': { name: 'Operations with Polynomials', page: 26, domain: 'Advanced Math', color: '#f97316' },
  '10.1': { name: 'Lines & Angles', page: 27, domain: 'Geometry & Trig', color: '#ef4444' },
  '10.2': { name: 'Triangles', page: 27, domain: 'Geometry & Trig', color: '#ef4444' },
  '10.3': { name: 'Trigonometry (SOHCAHTOA)', page: 28, domain: 'Geometry & Trig', color: '#ef4444' },
  '10.4': { name: 'Circles', page: 28, domain: 'Geometry & Trig', color: '#ef4444' },
}

// Question → Chapter mapping (which chapter does each question test?)
export const QUESTION_CHAPTER_MAP = {
  rw_m1: {
    1:'2.1',2:'2.1',3:'2.1',4:'2.2',5:'2.1',6:'2.3',7:'2.1',8:'2.1',9:'2.2',10:'3.1',
    11:'3.2',12:'3.2',13:'3.3',14:'3.4',15:'3.1',16:'3.2',17:'3.4',18:'5.1',19:'5.2',20:'5.2',
    21:'5.1',22:'5.2',23:'5.3',24:'5.2',25:'5.3',26:'5.1',27:'5.2',28:'4.1',29:'4.1',30:'4.2',
    31:'4.3',32:'4.4',33:'4.5'
  },
  rw_m2: {
    1:'2.1',2:'2.1',3:'2.2',4:'2.1',5:'2.3',6:'2.1',7:'2.1',8:'2.2',9:'2.1',10:'3.2',
    11:'3.1',12:'3.3',13:'3.4',14:'3.2',15:'3.1',16:'3.4',17:'3.2',18:'5.1',19:'5.2',20:'5.1',
    21:'5.2',22:'5.3',23:'5.2',24:'5.3',25:'5.1',26:'5.2',27:'4.1',28:'4.3',29:'4.4',30:'4.6',
    31:'4.1',32:'4.2',33:'4.5'
  },
  math_m1: {
    1:'7.1',2:'7.1',3:'7.2',4:'7.1',5:'7.3',6:'7.4',7:'7.2',8:'7.1',9:'7.1',10:'9.1',
    11:'9.1',12:'9.2',13:'9.3',14:'9.4',15:'9.1',16:'9.2',17:'9.3',18:'9.4',19:'8.1',20:'8.2',
    21:'8.3',22:'8.4',23:'8.1',24:'10.1',25:'10.2',26:'10.3',27:'10.4'
  },
  math_m2: {
    1:'7.1',2:'7.2',3:'7.1',4:'7.3',5:'7.2',6:'7.1',7:'6.2',8:'7.4',9:'7.1',10:'9.1',
    11:'9.2',12:'9.3',13:'9.4',14:'9.1',15:'9.2',16:'6.1',17:'9.3',18:'9.4',19:'8.1',20:'8.2',
    21:'8.3',22:'8.4',23:'10.1',24:'10.2',25:'10.3',26:'10.4',27:'10.4'
  }
}

// Module metadata
export const MODULES = {
  rw_m1: { label: 'Reading and Writing', module: 'Module 1', section: 'Section 1', questions: 33, time: 1920 },
  rw_m2: { label: 'Reading and Writing', module: 'Module 2', section: 'Section 1', questions: 33, time: 1920 },
  math_m1: { label: 'Math', module: 'Module 1', section: 'Section 2', questions: 27, time: 2100 },
  math_m2: { label: 'Math', module: 'Module 2', section: 'Section 2', questions: 27, time: 2100 },
}

export const MODULE_ORDER = ['rw_m1', 'rw_m2', 'math_m1', 'math_m2']

// PDF page index (0-based) for each question in the practice test PDF
// The file to place in /public/ is: practice-test-11.pdf (Part2 of your split PDFs)
export const PDF_PAGE_MAP = {
  rw_m1: {
    1:3,2:3,3:4,4:4,5:4,6:5,7:5,8:5,9:6,10:6,
    11:7,12:7,13:8,14:8,15:9,16:9,17:10,18:10,19:11,20:11,
    21:11,22:12,23:12,24:12,25:12,26:13,27:13,28:13,29:13,30:14,
    31:14,32:15,33:15
  },
  rw_m2: {
    1:17,2:17,3:18,4:18,5:18,6:19,7:19,8:19,9:20,10:20,
    11:21,12:21,13:22,14:22,15:23,16:23,17:24,18:24,19:25,20:25,
    21:25,22:26,23:26,24:26,25:26,26:27,27:27,28:27,29:28,30:28,
    31:28,32:29,33:29
  },
  math_m1: {
    1:33,2:33,3:33,4:34,5:34,6:34,7:34,8:35,9:35,10:35,
    11:35,12:36,13:36,14:36,15:36,16:37,17:37,18:37,19:38,20:38,
    21:38,22:39,23:39,24:39,25:40,26:40,27:40
  },
  math_m2: {
    1:43,2:43,3:43,4:44,5:44,6:44,7:44,8:44,9:45,10:45,
    11:45,12:46,13:46,14:46,15:46,16:47,17:47,18:47,19:48,20:48,
    21:49,22:49,23:49,24:50,25:50,26:50,27:50
  }
}

// Score conversion (raw → scaled)
export function rawToScaled(rawRW, rawMath) {
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
  const rnd10 = v => Math.round(v / 10) * 10
  const rw = rnd10(clamp(200 + (rawRW / 66) * 600, 200, 800))
  const math = rnd10(clamp(200 + (rawMath / 54) * 600, 200, 800))
  return { rw, math, total: rw + math }
}

// Calculate weak topics from wrong answers
export function calcWeakTopics(answers) {
  const counts = {}
  Object.entries(answers).forEach(([section, sectionAnswers]) => {
    const key = ANSWER_KEY[section]
    const chMap = QUESTION_CHAPTER_MAP[section]
    if (!key || !chMap) return
    Object.entries(sectionAnswers).forEach(([qNum, given]) => {
      const correct = key[qNum]
      const ch = chMap[qNum]
      if (!ch) return
      const isCorrect = FREE_RESPONSE[section]?.includes(Number(qNum))
        ? freeResponseMatches(given, correct)
        : String(given).toUpperCase() === String(correct).toUpperCase()
      if (!isCorrect) {
        counts[ch] = (counts[ch] || 0) + 1
      }
    })
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([ch, count]) => ({ ch, count, ...CHAPTERS[ch] }))
}

function normalizeFreeResponseInput(value) {
  let normalized = String(value ?? '').trim()
    .replace(/[−–—]/g, '-')     // normalize dash variants to ASCII minus
    .replace(/\s+/g, ' ')        // collapse multiple spaces to one
  // Strip thousands-separator commas (1,000 or 1, 000)
  let prev = null
  while (normalized !== prev) {
    prev = normalized
    normalized = normalized.replace(/(\d),\s*(?=\d)/g, '$1')
  }
  return normalized
}

function splitAcceptedAnswers(value) {
  return String(value ?? '')
    .split(/[;\n|]/g)
    .flatMap(part => part.split(/,\s+/g))
    .map(part => part.trim())
    .filter(Boolean)
}

export function isChoiceLetter(value) {
  const s = String(value ?? '').trim().toUpperCase()
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'].includes(s)
}

export function isMultipleChoiceAnswer(correct) {
  const rawCorrect = String(correct ?? '').trim()
  if (!rawCorrect) return false
  const options = splitAcceptedAnswers(rawCorrect)
  const list = options.length ? options : [rawCorrect]
  return list.some(isChoiceLetter)
}

function parseFreeResponse(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return { kind: 'empty', raw: '' }
  const tupleRaw = raw.replace(/[−–—]/g, '-')
  if (/^\(\s*[+-]?\d+(?:\.\d+)?(?:\s*,\s*[+-]?\d+(?:\.\d+)?)+\s*\)$/.test(tupleRaw)) {
    return { kind: 'text', raw: tupleRaw.replace(/\s/g, '') }
  }
  const normalized = normalizeFreeResponseInput(raw)
  const mixedFrac = normalized.match(/^([+-]?\d+)\s+(\d+)\/(\d+)$/)
  if (mixedFrac) {
    const whole = Number(mixedFrac[1])
    const num = Number(mixedFrac[2])
    const den = Number(mixedFrac[3])
    if (Number.isFinite(whole) && Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
      const sign = whole < 0 ? -1 : 1
      return { kind: 'num', value: whole + sign * (num / den), raw: normalized }
    }
  }

  // Remove all whitespace, then strip any remaining digit commas
  let cleaned = normalized.replace(/\s/g, '')
  { let p = null; while (cleaned !== p) { p = cleaned; cleaned = cleaned.replace(/(\d),(?=\d)/g, '$1') } }
  const frac = cleaned.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/)
  if (frac) {
    const num = Number(frac[1])
    const den = Number(frac[2])
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) return { kind: 'num', value: num / den, raw: cleaned }
  }

  // Expression support for student-produced responses (safe parsing; no eval):
  // - pi / π
  // - exponents using ^
  // - + - * / and parentheses
  function normalizeExpr(input) {
    let s = String(input || '').toLowerCase().replace(/\s/g, '').replace(/π/g, 'pi')
    if (!s) return ''
    // Insert implicit multiplication (e.g., 2pi, (2)(3), pi2, 2(pi))
    s = s.replace(/(\d)(pi)/g, '$1*pi')
    s = s.replace(/(pi)(\d)/g, '$1*$2')
    s = s.replace(/(\))(\d|pi|\()/g, '$1*$2')
    s = s.replace(/(\d|pi)(\()/g, '$1*(')
    return s
  }

  function tokenizeExpr(expr) {
    const tokens = []
    let i = 0
    while (i < expr.length) {
      const ch = expr[i]
      if (ch === 'p' && expr.slice(i, i + 2) === 'pi') {
        tokens.push({ type: 'num', value: Math.PI })
        i += 2
        continue
      }
      if (ch === '(' || ch === ')') {
        tokens.push({ type: ch })
        i += 1
        continue
      }
      if ('+-*/^'.includes(ch)) {
        tokens.push({ type: 'op', op: ch })
        i += 1
        continue
      }
      if ((ch >= '0' && ch <= '9') || ch === '.') {
        let j = i + 1
        while (j < expr.length && ((expr[j] >= '0' && expr[j] <= '9') || expr[j] === '.')) j++
        const num = Number(expr.slice(i, j))
        if (!Number.isFinite(num)) return null
        tokens.push({ type: 'num', value: num })
        i = j
        continue
      }
      return null
    }
    return tokens
  }

  function evalExpr(expr) {
    if (!expr || expr.length > 64) return null
    const tokens = tokenizeExpr(expr)
    if (!tokens) return null

    const prec = { 'u-': 5, '^': 4, '*': 3, '/': 3, '+': 2, '-': 2 }
    const rightAssoc = new Set(['^', 'u-'])
    const out = []
    const stack = []
    let prev = null

    for (const t of tokens) {
      if (t.type === 'num') {
        out.push(t)
        prev = 'num'
        continue
      }
      if (t.type === '(') {
        stack.push(t)
        prev = '('
        continue
      }
      if (t.type === ')') {
        while (stack.length && stack[stack.length - 1].type !== '(') out.push(stack.pop())
        if (!stack.length) return null
        stack.pop()
        prev = ')'
        continue
      }
      if (t.type === 'op') {
        let op = t.op
        // unary minus
        if (op === '-' && (prev === null || prev === 'op' || prev === '(')) op = 'u-'
        const p = prec[op]
        if (!p) return null
        while (stack.length) {
          const top = stack[stack.length - 1]
          if (top.type !== 'op') break
          const p2 = prec[top.op]
          if (p2 > p || (p2 === p && !rightAssoc.has(op))) out.push(stack.pop())
          else break
        }
        stack.push({ type: 'op', op })
        prev = 'op'
        continue
      }
      return null
    }

    while (stack.length) {
      const top = stack.pop()
      if (top.type === '(') return null
      out.push(top)
    }

    const st = []
    for (const t of out) {
      if (t.type === 'num') { st.push(t.value); continue }
      if (t.type === 'op') {
        if (t.op === 'u-') {
          if (st.length < 1) return null
          st.push(-st.pop())
          continue
        }
        if (st.length < 2) return null
        const b = st.pop()
        const a = st.pop()
        let v
        if (t.op === '+') v = a + b
        else if (t.op === '-') v = a - b
        else if (t.op === '*') v = a * b
        else if (t.op === '/') v = a / b
        else if (t.op === '^') v = Math.pow(a, b)
        else return null
        if (!Number.isFinite(v)) return null
        st.push(v)
        continue
      }
      return null
    }
    if (st.length !== 1) return null
    return st[0]
  }

  const expr = normalizeExpr(cleaned)
  const exprVal = evalExpr(expr)
  if (Number.isFinite(exprVal)) return { kind: 'num', value: exprVal, raw: expr }

  const asNum = Number(cleaned)
  if (Number.isFinite(asNum)) return { kind: 'num', value: asNum, raw: cleaned }
  return { kind: 'text', raw: cleaned }
}

export function freeResponseMatches(given, correct) {
  const g = parseFreeResponse(given)
  const rawCorrect = String(correct ?? '').trim()
  if (!rawCorrect) return false
  if (g.kind === 'empty') return false

  // Support multiple accepted answers like: "30; -30" or "1/2, 0.5"
  // without breaking numeric commas like "15,000".
  const options = splitAcceptedAnswers(rawCorrect)
  const list = options.length ? options : [rawCorrect]

  for (const opt of list) {
    const c = parseFreeResponse(opt)
    if (c.kind === 'empty') continue
    if (g.kind === 'num' && c.kind === 'num') {
      if (Math.abs(g.value - c.value) < 1e-9) return true
      continue
    }
    // Case-insensitive text comparison (covers tuples, text answers)
    if (g.raw.toLowerCase() === c.raw.toLowerCase()) return true
  }
  return false
}

export function answerMatches(given, correct) {
  const rawCorrect = String(correct ?? '').trim()
  if (!rawCorrect) return false
  const rawGiven = String(given ?? '').trim()
  if (!rawGiven) return false

  const options = splitAcceptedAnswers(rawCorrect)
  const list = options.length ? options : [rawCorrect]

  for (const opt of list) {
    if (isChoiceLetter(opt) && rawGiven.toUpperCase() === String(opt).trim().toUpperCase()) {
      return true
    }
  }

  for (const opt of list) {
    if (isChoiceLetter(opt)) continue
    if (freeResponseMatches(rawGiven, opt)) return true
  }

  return false
}

// Score individual section from answers
export function scoreSection(section, answers) {
  const key = ANSWER_KEY[section]
  let correct = 0, total = Object.keys(key).length
  Object.entries(answers || {}).forEach(([qNum, given]) => {
    const rightAnswer = key[qNum]
    if (!rightAnswer) return
    const isCorrect = answerMatches(given, rightAnswer)
    if (isCorrect) correct++
  })
  return { correct, total, wrong: total - correct }
}
