import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

function isChoiceLetter(v) {
  const s = String(v || '').trim().toUpperCase()
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'].includes(s)
}

function looksLikeFreeResponse(v) {
  const s = String(v || '').trim()
  if (!s) return false
  // Accept values like: 29, 8.6, .5061, 30; -30, 3331, 15/2, (3)^2, pi, π
  return /[0-9π]/i.test(s) && /^[0-9.+/()^piπ\-\s;,]+$/i.test(s)
}

function normalizeActAnswerLetter(value) {
  const s = String(value || '').trim().toUpperCase()
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'].includes(s) ? s : null
}

function parseActSectionPairs(text, maxQuestion) {
  const out = {}
  const regex = /(\d{1,2})\.\s*([A-Z])/g
  let match
  while ((match = regex.exec(String(text || ''))) !== null) {
    const qNum = Number(match[1])
    const answer = normalizeActAnswerLetter(match[2])
    if (!Number.isFinite(qNum) || qNum < 1 || qNum > maxQuestion || !answer) continue
    out[qNum] = answer
  }
  return out
}

export async function extractActAnswerKeyFromPdf(buf) {
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise
  const pageTexts = []
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const tc = await page.getTextContent()
    const text = (tc.items || []).map((item) => String(item.str || '')).join(' ')
    pageTexts.push(text)
  }

  const fullText = pageTexts.join('\n')
  if (!/English Test/i.test(fullText) || !/Mathematics Test/i.test(fullText) || !/Reading Test/i.test(fullText)) {
    throw new Error('Not an ACT answer key PDF.')
  }

  const englishText = fullText.match(/English Test([\s\S]*?)Mathematics Test/i)?.[1] || ''
  const mathText = fullText.match(/Mathematics Test([\s\S]*?)Reading Test/i)?.[1] || ''
  const readingText = fullText.match(/Reading Test([\s\S]*?)Science(?:\s+Reasoning)? Test/i)?.[1] || ''
  const scienceText = fullText.match(/Science(?:\s+Reasoning)? Test([\s\S]*)/i)?.[1] || ''

  const parsed = {
    act_english: parseActSectionPairs(englishText, 75),
    act_math: parseActSectionPairs(mathText, 60),
    act_reading: parseActSectionPairs(readingText, 40),
    act_science: parseActSectionPairs(scienceText, 40),
  }

  const total = Object.values(parsed).reduce((sum, section) => sum + Object.keys(section || {}).length, 0)
  if (total < 200) throw new Error('Could not find enough ACT answers in this PDF.')
  return parsed
}

export async function extractCollegeBoardAnswerKeyFromScoringGuide(buf) {
  // Returns { rw_m1:{}, rw_m2:{}, math_m1:{}, math_m2:{} }
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise
  const sections = ['rw_m1', 'rw_m2', 'math_m1', 'math_m2']
  const maxQ = { rw_m1: 33, rw_m2: 33, math_m1: 27, math_m2: 27 }

  async function tryParsePage(p) {
    const page = await pdf.getPage(p)
    const tc = await page.getTextContent()
    const items = (tc.items || [])
      .map(i => ({ s: String(i.str || '').trim(), x: i.transform?.[4] ?? 0, y: i.transform?.[5] ?? 0 }))
      .filter(i => i.s)

    const qTokens = items
      .map(i => ({ ...i, q: /^\d{1,2}$/.test(i.s) ? parseInt(i.s, 10) : null }))
      .filter(i => Number.isFinite(i.q) && i.q >= 1 && i.q <= 33)

    if (qTokens.length < 60) return null

    const xs = qTokens.map(t => t.x).sort((a, b) => a - b)
    const clusters = []
    const thresh = 40
    for (const x of xs) {
      const last = clusters[clusters.length - 1]
      if (!last || Math.abs(x - last.center) > thresh) clusters.push({ center: x, n: 1 })
      else { last.center = (last.center * last.n + x) / (last.n + 1); last.n += 1 }
    }
    clusters.sort((a, b) => b.n - a.n)
    const top = clusters.slice(0, 6).sort((a, b) => a.center - b.center)

    // Pick 4 well-separated centers.
    const picked = []
    for (const c of top) {
      if (!picked.length || Math.abs(c.center - picked[picked.length - 1]) > 60) picked.push(c.center)
      if (picked.length === 4) break
    }
    if (picked.length < 4) return null

    function colIndex(x) {
      let best = 0
      let bestD = Infinity
      for (let i = 0; i < picked.length; i++) {
        const d = Math.abs(x - picked[i])
        if (d < bestD) { bestD = d; best = i }
      }
      return best
    }

    const rows = {}
    for (const t of items) {
      const q = /^\d{1,2}$/.test(t.s) ? parseInt(t.s, 10) : null
      if (!Number.isFinite(q) || q < 1 || q > 33) continue
      const key = `${colIndex(t.x)}:${Math.round(t.y / 2) * 2}:${q}`
      if (!rows[key]) rows[key] = []
      rows[key].push(t)
    }

    const keyBySection = { rw_m1: {}, rw_m2: {}, math_m1: {}, math_m2: {} }
    // For each question token, pick the nearest answer token on the same row to the right.
    for (const t of qTokens) {
      const col = colIndex(t.x)
      const sec = sections[col]
      if (!sec) continue

      const sameRow = items.filter(i => Math.abs(i.y - t.y) < 6)
      const candidates = sameRow
        .filter(i => (isChoiceLetter(i.s) || looksLikeFreeResponse(i.s)) && i.x > t.x)
        .sort((a, b) => a.x - b.x)
      const pick = candidates[0]?.s
      if (!pick) continue

      if (t.q <= maxQ[sec]) keyBySection[sec][t.q] = String(pick).trim().toUpperCase().replace('Π', 'PI')
    }

    const total = Object.keys(keyBySection.rw_m1).length
      + Object.keys(keyBySection.rw_m2).length
      + Object.keys(keyBySection.math_m1).length
      + Object.keys(keyBySection.math_m2).length
    if (total < 80) return null
    return keyBySection
  }

  for (let p = 1; p <= pdf.numPages; p++) {
    const parsed = await tryParsePage(p)
    if (parsed) return parsed
  }

  throw new Error('Could not find the answer key table in this PDF.')
}

export async function extractSimpleAnswerKeyFromAnswerKeyPdf(buf) {
  // Returns { rw_m1:{}, rw_m2:{}, math_m1:{}, math_m2:{} } when headings are present.
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise
  const out = { rw_m1: {}, rw_m2: {}, math_m1: {}, math_m2: {} }
  const maxQ = { rw_m1: 33, rw_m2: 33, math_m1: 27, math_m2: 27 }
  const rePair = /(^|\s)(\d{1,2})\s*([A-D])(?=\s|$)/g

  function detectSection(text) {
    const t = String(text || '').toLowerCase()
    const isRW = t.includes('reading') || t.includes('writing') || t.includes('r&w')
    const isMath = t.includes('math')
    const m1 = /module\s*1/.test(t) || /mod\s*1/.test(t)
    const m2 = /module\s*2/.test(t) || /mod\s*2/.test(t)
    if (isRW && m1) return 'rw_m1'
    if (isRW && m2) return 'rw_m2'
    if (isMath && m1) return 'math_m1'
    if (isMath && m2) return 'math_m2'
    return null
  }

  let current = null
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const tc = await page.getTextContent()
    const text = (tc.items || []).map(i => String(i.str || '')).join(' ')
    current = detectSection(text) || current
    const sec = current
    if (!sec) continue

    let m
    while ((m = rePair.exec(text)) !== null) {
      const q = parseInt(m[2], 10)
      const a = String(m[3] || '').toUpperCase()
      if (!Number.isFinite(q) || q < 1 || q > maxQ[sec]) continue
      out[sec][q] = a
    }
  }

  const total = Object.keys(out.rw_m1).length + Object.keys(out.rw_m2).length + Object.keys(out.math_m1).length + Object.keys(out.math_m2).length
  if (total < 40) throw new Error('Could not find enough answers in this PDF.')
  return out
}

export async function extractAnswerKeyFromPdf(buf) {
  try {
    return await extractActAnswerKeyFromPdf(buf)
  } catch {}
  try {
    return await extractCollegeBoardAnswerKeyFromScoringGuide(buf)
  } catch {
    return await extractSimpleAnswerKeyFromAnswerKeyPdf(buf)
  }
}
