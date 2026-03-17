import fs from 'node:fs'
import path from 'node:path'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'

const ROOT = path.resolve(process.cwd())
const EXTRA_DIR = path.join(ROOT, 'public', 'extra-tests')

const TESTS = [
  { id: 'sat1', ak: 'ak1.pdf', pdf: 'sat1.pdf' },
  { id: 'sat2', ak: 'ak2.pdf', pdf: 'sat2.pdf' },
  { id: 'sat3', ak: 'ak3.pdf', pdf: 'sat3.pdf' },
  { id: 'sat4', ak: 'ak4.pdf', pdf: 'sat4.pdf' },
  { id: 'sat5', ak: 'ak5.pdf', pdf: 'sat5.pdf' },
]

function sumCounts(key) {
  if (!key || typeof key !== 'object') return 0
  if (!key.rw_m1) return Object.keys(key).length
  return Object.keys(key.rw_m1 || {}).length
    + Object.keys(key.rw_m2 || {}).length
    + Object.keys(key.math_m1 || {}).length
    + Object.keys(key.math_m2 || {}).length
}

function isChoiceLetter(v) {
  const s = String(v || '').trim().toUpperCase()
  return s === 'A' || s === 'B' || s === 'C' || s === 'D'
}

function looksLikeFreeResponse(v) {
  const s = String(v || '').trim()
  if (!s) return false
  return /[0-9π]/i.test(s) && /^[0-9.+/()^piπ\-\s;,]+$/i.test(s)
}

async function loadPdfFromBuf(buf) {
  return pdfjsLib.getDocument({ data: buf, disableWorker: true }).promise
}

async function extractCollegeBoardAnswerKeyFromScoringGuide(buf) {
  // Returns { rw_m1:{}, rw_m2:{}, math_m1:{}, math_m2:{} }
  const pdf = await loadPdfFromBuf(buf)
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

    const cols = picked.sort((a, b) => a - b)
    function nearestColIndex(x) {
      let best = 0
      let bestD = Infinity
      for (let i = 0; i < cols.length; i++) {
        const d = Math.abs(x - cols[i])
        if (d < bestD) { bestD = d; best = i }
      }
      return best
    }

    const out = { rw_m1: {}, rw_m2: {}, math_m1: {}, math_m2: {} }
    for (const qt of qTokens) {
      const idx = nearestColIndex(qt.x)
      const section = sections[idx]
      if (!section) continue
      if (qt.q > maxQ[section]) continue

      const sameRow = items.filter(i => Math.abs(i.y - qt.y) < 6)
      const candidates = sameRow
        .filter(i => (isChoiceLetter(i.s) || looksLikeFreeResponse(i.s)) && i.x > qt.x)
        .sort((a, b) => a.x - b.x)
      const ans = candidates[0]?.s
      if (!ans) continue
      out[section][qt.q] = String(ans).toUpperCase().replace('Π', 'PI')
    }

    const count = sumCounts(out)
    if (count < 80) return null
    return out
  }

  for (let p = 1; p <= pdf.numPages; p++) {
    const parsed = await tryParsePage(p)
    if (parsed) return parsed
  }
  throw new Error('Could not find the answer key table in this PDF.')
}

async function extractSimpleAnswerKeyFromAnswerKeyPdf(buf) {
  // Returns { rw_m1:{}, rw_m2:{}, math_m1:{}, math_m2:{} } when headings are present.
  const pdf = await loadPdfFromBuf(buf)
  const out = { rw_m1: {}, rw_m2: {}, math_m1: {}, math_m2: {} }
  const maxQ = { rw_m1: 33, rw_m2: 33, math_m1: 27, math_m2: 27 }
  const rePair = /(^|\s)(\d{1,2})\s*([A-D])(?=\s|$)/g

  function detectSection(text) {
    const t = String(text || '').toLowerCase()
    const isRW = t.includes('reading') || t.includes('writing') || t.includes('r&w')
    const isMath = t.includes('math')
    const m1 = t.includes('module 1') || t.includes('mod 1')
    const m2 = t.includes('module 2') || t.includes('mod 2')
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

  const total = sumCounts(out)
  if (total < 40) throw new Error('Could not find enough answers in this PDF.')
  return out
}

async function extractAnswerKeyFromPdf(buf) {
  try {
    return await extractCollegeBoardAnswerKeyFromScoringGuide(buf)
  } catch {
    return await extractSimpleAnswerKeyFromAnswerKeyPdf(buf)
  }
}

function detectModuleFromText(text) {
  const t = String(text || '').toLowerCase()
  const isRW = t.includes('reading') && t.includes('writing')
  const isMath = t.includes('math')
  const m1 = /module\s*1/.test(t) || /mod\s*1/.test(t)
  const m2 = /module\s*2/.test(t) || /mod\s*2/.test(t)
  if (isRW && m1) return 'rw_m1'
  if (isRW && m2) return 'rw_m2'
  if (isMath && m1) return 'math_m1'
  if (isMath && m2) return 'math_m2'
  return null
}

async function extractPdfPageMap(pdfPath) {
  const buf = fs.readFileSync(pdfPath)
  const pdf = await loadPdfFromBuf(new Uint8Array(buf))
  const out = { rw_m1: {}, rw_m2: {}, math_m1: {}, math_m2: {} }
  const maxQ = { rw_m1: 33, rw_m2: 33, math_m1: 27, math_m2: 27 }

  // First pass: find module start pages so we can assign pages reliably even when the
  // per-page header doesn't repeat on every page.
  const starts = { rw_m1: null, rw_m2: null, math_m1: null, math_m2: null }
  const looseHits = { rw_m1: [], rw_m2: [], math_m1: [], math_m2: [] }
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const tc = await page.getTextContent()
    const text = (tc.items || []).map(i => String(i.str || '')).join(' ')
    const modLoose = detectModuleFromText(text)
    if (modLoose) looseHits[modLoose].push(p)

    const tl = String(text || '').toLowerCase()
    const hasDirections = tl.includes('directions')
    const hasQuestions = tl.includes('questions')
    // Strict starts use the directions page (avoids picking TOC pages that mention modules).
    if (modLoose && hasDirections && hasQuestions && starts[modLoose] == null) starts[modLoose] = p
  }

  // Fallback heuristics if some headings weren't detected.
  if (starts.rw_m1 == null) starts.rw_m1 = looseHits.rw_m1[0] || 1
  if (starts.rw_m2 == null) starts.rw_m2 = looseHits.rw_m2[0] || Math.max(starts.rw_m1 + 1, 1)
  // For math, prefer later hits (TOCs often mention "module 1" early).
  if (starts.math_m1 == null) starts.math_m1 = (looseHits.math_m1[looseHits.math_m1.length - 1] || Math.max(starts.rw_m2 + 1, 1))
  if (starts.math_m2 == null) starts.math_m2 = (looseHits.math_m2[looseHits.math_m2.length - 1] || Math.max(starts.math_m1 + 1, 1))

  function moduleForPage(p) {
    if (p >= starts.math_m2) return 'math_m2'
    if (p >= starts.math_m1) return 'math_m1'
    if (p >= starts.rw_m2) return 'rw_m2'
    return 'rw_m1'
  }

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const tc = await page.getTextContent()
    const items = (tc.items || [])
      .map(i => ({ s: String(i.str || '').trim(), x: i.transform?.[4] ?? 0, y: i.transform?.[5] ?? 0 }))
      .filter(i => i.s)
    const text = items.map(i => i.s).join(' ')

    const current = moduleForPage(p)

    // Many SAT PDFs don't include the word "Question". Instead, the question number appears
    // as a left-margin token in one or more columns. We detect the densest x-clusters of
    // 1–2 digit tokens and treat them as question-number columns.
    const nums = items
      .map(i => {
        const m = String(i.s || '').trim().match(/^(\d{1,2})[.)]?$/)
        return { ...i, n: m ? parseInt(m[1], 10) : null }
      })
      .filter(i => Number.isFinite(i.n) && i.n >= 1 && i.n <= maxQ[current])
    if (!nums.length) continue

    const xs = nums.map(n => n.x).sort((a, b) => a - b)
    const clusters = []
    const thresh = 60
    for (const x of xs) {
      const last = clusters[clusters.length - 1]
      if (!last || Math.abs(x - last.center) > thresh) clusters.push({ center: x, n: 1 })
      else { last.center = (last.center * last.n + x) / (last.n + 1); last.n += 1 }
    }
    clusters.sort((a, b) => b.n - a.n)
    const picked = clusters.slice(0, 3).map(c => c.center)

    for (const cx of picked) {
      const colTokens = nums.filter(n => Math.abs(n.x - cx) < 28)
      for (const n of colTokens) {
        if (out[current][n.n] == null) out[current][n.n] = p - 1
      }
    }
  }

  return out
}

function toModuleExport(name, obj) {
  return `export const ${name} = ${JSON.stringify(obj, null, 2)}\n`
}

async function main() {
  const answerKeys = {}
  const pageMaps = {}

  for (const t of TESTS) {
    const akPath = path.join(EXTRA_DIR, t.ak)
    const pdfPath = path.join(EXTRA_DIR, t.pdf)
    if (!fs.existsSync(akPath)) throw new Error(`Missing ${akPath}`)
    if (!fs.existsSync(pdfPath)) throw new Error(`Missing ${pdfPath}`)

    const akBuf = new Uint8Array(fs.readFileSync(akPath))
    const key = await extractAnswerKeyFromPdf(akBuf)
    const count = sumCounts(key)
    const per = {
      rw_m1: Object.keys(key.rw_m1 || {}).length,
      rw_m2: Object.keys(key.rw_m2 || {}).length,
      math_m1: Object.keys(key.math_m1 || {}).length,
      math_m2: Object.keys(key.math_m2 || {}).length,
    }
    if (count !== 120 || per.rw_m1 !== 33 || per.rw_m2 !== 33 || per.math_m1 !== 27 || per.math_m2 !== 27) {
      throw new Error(`${t.id} answer key parsed incomplete (total=${count}, rw_m1=${per.rw_m1}, rw_m2=${per.rw_m2}, math_m1=${per.math_m1}, math_m2=${per.math_m2}).`)
    }
    answerKeys[t.id] = key

    const pm = await extractPdfPageMap(pdfPath)
    const pmCount = Object.keys(pm.rw_m1).length + Object.keys(pm.rw_m2).length + Object.keys(pm.math_m1).length + Object.keys(pm.math_m2).length
    if (pmCount < 80) {
      // Mapping might still be okay with per-module offsets + overrides, but warn loudly.
      console.warn(`WARN: ${t.id} page map only has ${pmCount} question mappings.`)
    }
    pageMaps[t.id] = pm
  }

  const outKeysPath = path.join(ROOT, 'src', 'data', 'extraAnswerKeys.js')
  const outMapsPath = path.join(ROOT, 'src', 'data', 'extraPdfPageMaps.js')
  fs.writeFileSync(outKeysPath, `// Auto-generated by scripts/generateExtraTestAssets.mjs\n${toModuleExport('EXTRA_ANSWER_KEYS', answerKeys)}`)
  fs.writeFileSync(outMapsPath, `// Auto-generated by scripts/generateExtraTestAssets.mjs\n${toModuleExport('EXTRA_PDF_PAGE_MAPS', pageMaps)}`)

  console.log('Wrote:', outKeysPath)
  console.log('Wrote:', outMapsPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
