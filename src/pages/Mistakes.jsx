import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx'
import { PDF_PAGE_MAP, answerMatches, isMultipleChoiceAnswer } from '../data/testData.js'
import { EXTRA_PDF_PAGE_MAPS } from '../data/extraPdfPageMaps.js'
import { getTestConfig } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import PDFPage from '../components/PDFPage.jsx'
import PDFSectionStack from '../components/PDFSectionStack.jsx'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import ExamSwitcher from '../components/ExamSwitcher.jsx'
import TopResourceNav from '../components/TopResourceNav.jsx'
import { loadMistakes, loadReviewItems, computeDueCount, updateMistakeNote, applyReviewResult, saveReviewItem } from '../lib/mistakesStore.js'
import { getChoiceOptionsForQuestion, getExamConfigForTest, getGuideContentForExam, getPdfViewerModeForTest, getSectionPageRangesForTest } from '../data/examData.js'
import { resolveViewContext, withExam, withViewUser } from '../lib/viewAs.js'
import { getInitialPreferredExam } from '../lib/examChoice.js'
import { buildQuestionHintLadder } from '../lib/questionHints.js'
import { hasUnlockedResources } from '../lib/pretestGate.js'
import { useToast } from '../components/Toast.jsx'
import Sidebar from '../components/Sidebar.jsx'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

/* ── framer-motion variants ── */
const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}
const listItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}
const panelSlideIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.35, ease: 'easeOut' },
}

const textCache = {}

const ALL_GUIDE_CONTENT = {
  ...getGuideContentForExam('sat'),
  ...getGuideContentForExam('act'),
}

/* Navbar removed — using Sidebar */

function parseItemKey(k) {
  const parts = String(k || '').split(':')
  if (parts.length < 3) return null
  const q = Number(parts[2])
  return { test_id: parts[0], section: parts[1], q_num: q }
}

function estimateActQuestionTarget(testId, section, qNum) {
  const range = getSectionPageRangesForTest(testId)?.[section]
  const totalQuestions = Number(getExamConfigForTest(testId)?.modules?.[section]?.questions || 0)
  if (!Array.isArray(range) || range.length < 2 || !totalQuestions) return { pageIndex: 0, scrollRatio: 0 }
  const start = Number(range[0] || 0)
  const end = Math.max(start, Number(range[1] || start))
  const pageCount = Math.max(1, end - start + 1)
  const progress = Math.max(0, Math.min(0.999, (Number(qNum || 1) - 1) / totalQuestions))
  const offset = progress * pageCount
  const pageOffset = Math.min(pageCount - 1, Math.floor(offset))
  return {
    pageIndex: start + pageOffset,
    scrollRatio: Math.max(0, Math.min(0.92, offset - pageOffset)),
  }
}

function pdfPageFor(testId, section, qNum) {
  const map = (testId === 'pre_test')
    ? (PDF_PAGE_MAP?.[section] || {})
    : (EXTRA_PDF_PAGE_MAPS?.[testId]?.[section] || {})
  if (String(testId || '').startsWith('act')) return estimateActQuestionTarget(testId, section, qNum)
  if (Number.isFinite(Number(map?.[qNum]))) return { pageIndex: map[qNum], scrollRatio: 0 }
  for (let q = qNum - 1; q >= 1; q--) {
    if (Number.isFinite(Number(map?.[q]))) return { pageIndex: map[q], scrollRatio: 0 }
  }
  return { pageIndex: 0, scrollRatio: 0 }
}

function buildMistakeHints(mistake, isMC, questionText = '') {
  const chapterMeta = ALL_GUIDE_CONTENT?.[mistake?.chapter_id] || {}
  return buildQuestionHintLadder({
    exam: String(mistake?.test_id || '').startsWith('act') ? 'act' : 'sat',
    section: mistake?.section || '',
    qNum: mistake?.q_num || 0,
    isMC,
    chapterName: chapterMeta?.name || '',
    chapterCode: chapterMeta?.code || '',
    concepts: chapterMeta?.concepts || [],
    questionText,
    answerChoices: isMC ? getChoiceOptionsForQuestion(mistake?.test_id, mistake?.section, mistake?.q_num) : [],
  })
}

async function loadPdfTextRange(pdfUrl, startPageIndex, endPageIndex) {
  const url = String(pdfUrl || '').trim()
  if (!url) return ''
  if (!textCache[url]) {
    const task = pdfjsLib.getDocument(url)
    textCache[url] = task.promise.catch((error) => {
      delete textCache[url]
      throw error
    })
  }
  const pdf = await textCache[url]
  const parts = []
  const start = Math.max(0, Number(startPageIndex || 0))
  const end = Math.max(start, Number(endPageIndex || start))
  for (let pageIndex = start; pageIndex <= end; pageIndex += 1) {
    const page = await pdf.getPage(pageIndex + 1)
    const text = await page.getTextContent()
    const line = (text?.items || []).map((item) => item?.str || '').join(' ')
    parts.push(line)
  }
  return parts.join(' ')
}

function digitsOnly(value) {
  return String(value || '').replace(/[^\d]/g, '')
}

function extractQuestionSnippet(items = [], startIndex = 0, qNum = 0) {
  const wanted = String(qNum || '')
  const out = []
  for (let index = startIndex; index < items.length; index += 1) {
    const str = String(items[index]?.str || '').trim()
    if (index > startIndex) {
      const nextDigits = digitsOnly(str)
      if (nextDigits && nextDigits !== wanted && nextDigits.length <= 2 && /^[\d.)\]]+$/.test(str)) break
    }
    if (str) out.push(str)
    if (out.join(' ').length > 320) break
  }
  return out.join(' ').replace(/\s+/g, ' ').trim()
}

function findQuestionAnchorOnPage(items = [], qNum = 0) {
  const wanted = String(qNum || '')
  const patterns = [
    new RegExp(`^${wanted}[.)\\]]?$`),
    new RegExp(`^Q${wanted}$`, 'i'),
    new RegExp(`^${wanted}$`),
  ]

  for (let index = 0; index < items.length; index += 1) {
    const here = String(items[index]?.str || '').trim()
    const next = String(items[index + 1]?.str || '').trim()
    const joined = `${here}${next}`.replace(/\s+/g, '')
    const joinedDigits = digitsOnly(joined)
    const hereDigits = digitsOnly(here)
    const directMatch = patterns.some((pattern) => pattern.test(here)) || (hereDigits === wanted && /^[\d.)\]]+$/.test(here))
    const splitMatch = joinedDigits === wanted && /^[\d.)\]]*$/.test(joined.replace(/[0-9]/g, ''))
    if (directMatch || splitMatch) {
      return {
        index,
        y: Number(items[index]?.transform?.[5] || 0),
        snippet: extractQuestionSnippet(items, index, qNum),
      }
    }
  }

  return null
}

async function findQuestionPageInSection(pdfUrl, startPageIndex, endPageIndex, qNum, preferredPageIndex = null) {
  const url = String(pdfUrl || '').trim()
  if (!url || !Number.isFinite(Number(qNum))) return null
  if (!textCache[url]) {
    const task = pdfjsLib.getDocument(url)
    textCache[url] = task.promise.catch((error) => {
      delete textCache[url]
      throw error
    })
  }
  const pdf = await textCache[url]
  const start = Math.max(0, Number(startPageIndex || 0))
  const end = Math.max(start, Number(endPageIndex || start))
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index)
  const orderedPages = pages.slice().sort((a, b) => {
    const pa = preferredPageIndex == null ? Number.MAX_SAFE_INTEGER : Math.abs(a - preferredPageIndex)
    const pb = preferredPageIndex == null ? Number.MAX_SAFE_INTEGER : Math.abs(b - preferredPageIndex)
    return pa - pb
  })
  let best = null
  for (const pageIndex of orderedPages) {
    const page = await pdf.getPage(pageIndex + 1)
    const text = await page.getTextContent()
    const items = text?.items || []
    const anchor = findQuestionAnchorOnPage(items, qNum)
    const viewport = page.getViewport({ scale: 1 })
    if (anchor) {
      const ratio = Math.max(0, Math.min(0.96, 1 - (anchor.y / Math.max(1, viewport.height || 1))))
      return { pageIndex, scrollRatio: ratio, snippet: anchor.snippet }
    }
    const joined = items.map((item) => item?.str || '').join(' ')
    const score = joined.includes(` ${qNum} `) || joined.includes(`${qNum}.`) || joined.includes(`${qNum})`) ? 1 : 0
    if (score > 0 && (!best || score > best.score)) best = { pageIndex, score, scrollRatio: 0, snippet: '' }
  }
  return best || null
}

export default function Mistakes() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const requestedExam = useMemo(() => String(new URLSearchParams(location.search || '').get('exam') || '').toLowerCase(), [location.search])
  const exam = requestedExam === 'act' || requestedExam === 'sat' ? requestedExam : getInitialPreferredExam(user)
  const { viewUserId, isAdminPreview } = useMemo(
    () => resolveViewContext({ userId: user?.id, profile, search: location.search }),
    [user?.id, profile, location.search]
  )
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [reviewItems, setReviewItems] = useState({})
  const [selected, setSelected] = useState(null)
  const [filterDue, setFilterDue] = useState(false)
  const [savingId, setSavingId] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [redoChoice, setRedoChoice] = useState(null)
  const [redoText, setRedoText] = useState('')
  const [redoFeedback, setRedoFeedback] = useState(null)
  const [redoSaving, setRedoSaving] = useState(false)
  const [hintStep, setHintStep] = useState(0)
  const [questionContextText, setQuestionContextText] = useState('')
  const [solvedIds, setSolvedIds] = useState(new Set())

  const addToast = useToast()
  const viewHref = (path) => withViewUser(withExam(path, exam), viewUserId, isAdminPreview)
  const satHref = withViewUser(withExam('/dashboard', 'sat'), viewUserId, isAdminPreview)
  const actHref = withViewUser(withExam('/dashboard', 'act'), viewUserId, isAdminPreview)
  const showResourceNav = hasUnlockedResources(viewUserId, exam)

  useEffect(() => {
    if (!viewUserId) return
    let cancelled = false
    setLoading(true)
    Promise.allSettled([loadMistakes(viewUserId), loadReviewItems(viewUserId)])
      .then(([m, r]) => {
        if (cancelled) return
        setItems(m.status === 'fulfilled' ? (m.value.items || []) : [])
        setReviewItems(r.status === 'fulfilled' ? (r.value.items || {}) : {})
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [viewUserId])

  const dueCount = useMemo(() => computeDueCount(reviewItems, new Date(), { exam }), [reviewItems, exam])

  const filtered = useMemo(() => {
    const now = Date.now()
    const list = (items || []).slice()
      .filter((m) => String(m?.test_id || '').startsWith('act') ? exam === 'act' : exam === 'sat')
      // Hide validated items (once correct, it comes off the list).
      .filter((m) => {
        const k = `${m.test_id}:${m.section}:${m.q_num}`
        return reviewItems?.[k]?.last_correct !== true
      })
    if (!filterDue) return list
    return list.filter((m) => {
      const k = `${m.test_id}:${m.section}:${m.q_num}`
      const due = new Date(reviewItems?.[k]?.due_at || 0).getTime()
      return Number.isFinite(due) && due <= now
    })
  }, [items, filterDue, reviewItems])

  const selectedCfg = selected ? getTestConfig(selected.test_id) : null
  const selectedExamConfig = selected ? getExamConfigForTest(selected.test_id) : null
  const selectedModule = selectedExamConfig?.modules?.[selected?.section]
  const selectedViewerMode = selected ? getPdfViewerModeForTest(selected.test_id) : 'single'
  const selectedSectionRange = useMemo(() => {
    if (!selected) return null
    // Use configured ranges if available (ACT)
    const configured = getSectionPageRangesForTest(selected.test_id)?.[selected.section]
    if (configured) return configured
    // For SAT, compute range from PDF page maps
    const map = (selected.test_id === 'pre_test' || selected.test_id === 'practice_test_11')
      ? (PDF_PAGE_MAP?.[selected.section] || {})
      : (EXTRA_PDF_PAGE_MAPS?.[selected.test_id]?.[selected.section] || {})
    const pages = Object.values(map).filter((p) => Number.isFinite(Number(p)) && Number(p) > 0)
    if (!pages.length) return null
    return [Math.min(...pages), Math.max(...pages)]
  }, [selected?.test_id, selected?.section])
  const [resolvedPdfTarget, setResolvedPdfTarget] = useState({ pageIndex: 0, scrollRatio: 0 })
  const selectedItemKey = selected ? `${selected.test_id}:${selected.section}:${selected.q_num}` : null
  const selectedKeyBySection = selected ? getAnswerKeyBySection(selected.test_id) : null
  const selectedCorrect = selected ? selectedKeyBySection?.[selected.section]?.[selected.q_num] : null
  const selectedIsMC = selected ? isMultipleChoiceAnswer(selectedCorrect) : false
  const selectedChoices = selected ? getChoiceOptionsForQuestion(selected.test_id, selected.section, selected.q_num) : ['A', 'B', 'C', 'D']

  useEffect(() => {
    setZoom(1)
    setRedoChoice(null)
    setRedoText('')
    setRedoFeedback(null)
    setRedoSaving(false)
    setHintStep(0)
    setQuestionContextText('')
  }, [selectedItemKey])

  useEffect(() => {
    // Don't auto-deselect if user just answered correctly (let them pick Next or Back)
    if (redoFeedback?.ok) return
    if (selected && !filtered.some((item) => item.id === selected.id)) {
      setSelected(null)
    }
  }, [filtered, selected, redoFeedback])

  useEffect(() => {
    if (!selected) {
      setResolvedPdfTarget({ pageIndex: 0, scrollRatio: 0 })
      return
    }
    setResolvedPdfTarget(pdfPageFor(selected.test_id, selected.section, selected.q_num))
  }, [selectedItemKey, selected?.test_id, selected?.section, selected?.q_num])

  useEffect(() => {
    let cancelled = false
    async function refineTarget() {
      if (!selectedCfg?.pdfUrl || !Array.isArray(selectedSectionRange)) return
      try {
        const target = await findQuestionPageInSection(
          selectedCfg.pdfUrl,
          selectedSectionRange[0],
          selectedSectionRange[1],
          selected?.q_num,
          resolvedPdfTarget.pageIndex
        )
        if (!cancelled && Number.isFinite(Number(target?.pageIndex))) {
          setResolvedPdfTarget((prev) => ({
            ...prev,
            pageIndex: Number(target.pageIndex),
            scrollRatio: Number.isFinite(Number(target.scrollRatio)) ? Number(target.scrollRatio) : prev.scrollRatio,
          }))
          if (target?.snippet) setQuestionContextText(target.snippet)
        }
      } catch {}
    }
    refineTarget()
    return () => {
      cancelled = true
    }
  }, [selectedItemKey, selectedCfg?.pdfUrl, selectedViewerMode, selectedSectionRange, selected?.q_num])

  useEffect(() => {
    let cancelled = false
    async function loadContext() {
      if (!selected || !selectedCfg?.pdfUrl) return
      try {
        if (Array.isArray(selectedSectionRange) && questionContextText) return
        const start = resolvedPdfTarget.pageIndex
        const end = Array.isArray(selectedSectionRange)
          ? Math.min(selectedSectionRange[1], start + 1)
          : start
        const text = await loadPdfTextRange(selectedCfg.pdfUrl, start, end)
        if (!cancelled) setQuestionContextText(text)
      } catch {
        if (!cancelled) setQuestionContextText('')
      }
    }
    loadContext()
    return () => {
      cancelled = true
    }
  }, [selected, selectedCfg?.pdfUrl, resolvedPdfTarget.pageIndex, selectedViewerMode, selectedSectionRange, questionContextText])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b', fontFamily: 'Sora,sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
            margin: '0 auto 12px',
            animation: 'pulse 1.5s ease-in-out infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="mistakes" size={20} style={{ color: 'white' }} />
          </div>
          <span style={{ fontSize: 14 }}>Loading mistake notebook…</span>
        </div>
      </div>
    )
  }

  const nextMistake = (() => {
    if (!selected) return null
    const idx = filtered.findIndex((m) => m.id === selected.id)
    if (idx < 0) return filtered.find(m => !solvedIds.has(m.id)) || null
    // Find next unsolved mistake after current index, then wrap around
    for (let i = 1; i < filtered.length; i++) {
      const candidate = filtered[(idx + i) % filtered.length]
      if (!solvedIds.has(candidate.id)) return candidate
    }
    return null
  })()

  const answerPanel = selected ? (
    <motion.div
      {...panelSlideIn}
      className={`${redoFeedback ? (redoFeedback.ok ? 'answer-feedback-correct' : 'answer-feedback-wrong') : ''}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 26, height: 26, borderRadius: 8,
            background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
            color: '#fff', fontSize: 11, fontWeight: 900,
          }}>Q{selected.q_num}</span>
          <span style={{ fontWeight: 900, color: '#0f172a', fontSize: 15 }}>Quick Redo</span>
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>
          {selectedCorrect != null ? 'Click Check to validate' : 'Answer key missing'}
        </div>
      </div>

      {selectedCorrect == null ? (
        <div style={{ marginTop: 10, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
          This question can't be validated yet because the answer key isn't loaded.
        </div>
      ) : (
        <>
          {selectedIsMC ? (
            <div
              className={`mistake-choice-grid${exam === 'act' ? ' act' : ''}`}
              style={{
                display: 'grid',
                gridTemplateColumns: exam === 'act'
                  ? 'repeat(auto-fit, minmax(72px, 1fr))'
                  : `repeat(${selectedChoices.length >= 5 ? 5 : 4}, minmax(0, 1fr))`,
                gap: 10,
                marginTop: 12,
              }}
            >
              {selectedChoices.map((c) => (
                <button
                  key={c}
                  className="btn btn-outline"
                  style={{
                    padding: '10px 12px',
                    fontWeight: 900,
                    borderColor: redoChoice === c ? '#1a2744' : '#e2e8f0',
                    background: redoChoice === c ? 'rgba(26,39,68,.08)' : 'white',
                  }}
                  onClick={() => {
                    setRedoChoice(c)
                    setRedoFeedback(null)
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
                Open response: enter only the value/expression. Equivalent fractions and comma-formatted numbers count. Examples: <code>75</code>, <code>1/2</code>, <code>0.5</code>, <code>15,000</code>, <code>pi</code>, <code>3*pi/2</code>, <code>2^3</code>.
              </div>
              <input
                type="text"
                className="free-response-input"
                placeholder="Your answer"
                value={redoText}
                onChange={(e) => {
                  setRedoText(e.target.value)
                  setRedoFeedback(null)
                }}
                autoComplete="off"
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              disabled={isAdminPreview || redoSaving || (selectedIsMC ? !redoChoice : !redoText.trim())}
              onClick={async () => {
                if (isAdminPreview || !selectedItemKey) return
                const right = String(selectedCorrect || '').trim()
                const submitted = selectedIsMC ? redoChoice : redoText
                const ok = answerMatches(submitted, right)

                setRedoFeedback(ok ? { ok: true, msg: 'Correct — nice work.' } : { ok: false, msg: 'Not quite — try the hints and check again.' })
                if (!ok) setHintStep((step) => Math.max(step, 1))
                if (!ok) return
                setSolvedIds(prev => new Set(prev).add(selected.id))

                setRedoSaving(true)
                try {
                  const currentItem = reviewItems?.[selectedItemKey] || { due_at: new Date().toISOString() }
                  const next = applyReviewResult(currentItem, true)
                  await saveReviewItem(viewUserId, selectedItemKey, next)
                  const updatedReview = { ...(reviewItems || {}), [selectedItemKey]: next }
                  setReviewItems(updatedReview)
                  // Don't remove from items yet — let user pick "Next" or "Back to list"
                  if (addToast) {
                    const remaining = (items || []).filter(m => m.id !== selected.id).filter(m => {
                      const k = `${m.test_id}:${m.section}:${m.q_num}`
                      return updatedReview?.[k]?.last_correct !== true
                    }).filter(m => String(m?.test_id || '').startsWith('act') ? exam === 'act' : exam === 'sat').length
                    if (remaining === 0) {
                      addToast("Good job on Q" + selected.q_num + "! You've completed all your missed questions!", 'success')
                    } else {
                      addToast("Good job on Q" + selected.q_num + "! " + remaining + " question" + (remaining === 1 ? "" : "s") + " left in your Mistake Notebook.", 'success')
                    }
                  }
                } finally {
                  setRedoSaving(false)
                }
              }}
            >
              {redoSaving ? 'Saving…' : 'Check →'}
            </button>
            {redoFeedback && (
              <div style={{ fontSize: 12, fontWeight: 900, color: redoFeedback.ok ? '#10b981' : '#ef4444' }}>
                {redoFeedback.msg}
              </div>
            )}
          </div>

          {redoFeedback && !redoFeedback.ok && (
            <div style={{ marginTop: 8, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '8px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                <div style={{ fontWeight: 900, color: '#9a3412', fontSize: 12 }}>Hints</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      className="btn btn-outline"
                      style={{ padding: '4px 8px', fontSize: 11, background: 'white' }}
                      onClick={() => setHintStep((step) => Math.max(step, n))}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              {hintStep > 0 && (
                <ul style={{ margin: '6px 0 0 14px', padding: 0, color: '#7c2d12', fontSize: 12, lineHeight: 1.5 }}>
                  {buildMistakeHints(selected, selectedIsMC, questionContextText).slice(0, hintStep).map((hint, index) => (
                    <li key={`${selectedItemKey}-hint-${index}`} style={{ marginBottom: 3 }}>{hint}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {redoFeedback?.ok && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <button className="btn btn-outline" onClick={() => setSelected(null)}>
                <Icon name="back" size={16} />
                Back to list
              </button>
              <button
                className="btn btn-primary"
                disabled={!nextMistake}
                onClick={() => {
                  if (nextMistake) setSelected(nextMistake)
                }}
              >
                {nextMistake ? 'Next unsolved →' : 'All done!'}
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  ) : null

  return (
    <div className="app-layout has-sidebar">
      <Sidebar currentExam={exam} />
      <div className="page fade-up">
        {isAdminPreview && (
          <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, rgba(26,39,68,.96), rgba(30,58,138,.94))', color: 'white' }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>Admin View</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.88 }}>
              You're viewing this student's Mistake Notebook in read-only mode. Notes and validations won't overwrite their data.
            </div>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 20 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(14,165,233,.3)', flexShrink: 0,
              }}
            >
              <Icon name="mistakes" size={22} style={{ color: '#fff' }} />
            </motion.div>
            <div>
              <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 24, fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                Mistake Notebook
              </h1>
              <div style={{ marginTop: 4, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                Your missed questions auto-save here. Adding an explanation is <b>optional</b>, but it helps you avoid repeating the same mistake.
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats bar + filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 20,
                background: 'rgba(14,165,233,.08)', color: '#0369a1',
                fontSize: 12, fontWeight: 800,
              }}
            >
              {filtered.length} mistake{filtered.length !== 1 ? 's' : ''}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 20,
                background: 'rgba(16,185,129,.08)', color: '#047857',
                fontSize: 12, fontWeight: 800,
              }}
            >
              {solvedIds.size} validated
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 20,
                background: dueCount > 0 ? 'rgba(239,68,68,.08)' : 'rgba(148,163,184,.08)',
                color: dueCount > 0 ? '#dc2626' : '#64748b',
                fontSize: 12, fontWeight: 800,
              }}
            >
              {dueCount} due
            </motion.span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilterDue(false)}
              style={{
                padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 800,
                border: filterDue ? '1.5px solid #e2e8f0' : 'none',
                background: !filterDue ? 'linear-gradient(135deg, #0ea5e9, #3b82f6)' : '#fff',
                color: !filterDue ? '#fff' : '#475569',
                cursor: 'pointer', transition: 'all .2s ease',
                boxShadow: !filterDue ? '0 2px 8px rgba(14,165,233,.25)' : '0 1px 3px rgba(0,0,0,.04)',
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilterDue(true)}
              style={{
                padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 800,
                border: !filterDue ? '1.5px solid #e2e8f0' : 'none',
                background: filterDue ? 'linear-gradient(135deg, #0ea5e9, #3b82f6)' : '#fff',
                color: filterDue ? '#fff' : '#475569',
                cursor: 'pointer', transition: 'all .2s ease',
                boxShadow: filterDue ? '0 2px 8px rgba(14,165,233,.25)' : '0 1px 3px rgba(0,0,0,.04)',
              }}
            >
              Due now ({dueCount})
            </button>
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              maxWidth: 480, margin: '60px auto', textAlign: 'center',
              padding: '48px 32px', borderRadius: 20,
              background: '#fff',
              border: '1.5px solid rgba(16,185,129,.15)',
              boxShadow: '0 4px 24px rgba(16,185,129,.08)',
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(16,185,129,.3)',
              marginBottom: 16,
            }}>
              <Icon name="check" size={28} style={{ color: '#fff' }} />
            </div>
            <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 900, fontSize: 18, color: '#0f172a', marginBottom: 8 }}>
              {filterDue ? 'Nothing due right now' : 'No mistakes yet'}
            </div>
            <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>
              {filterDue
                ? "You're all caught up! Check back later or switch to All to review previous mistakes."
                : `Take a ${exam === 'act' ? 'practice ACT' : 'Pre Test or optional Skill Builder test'}. Any missed questions will appear here for review.`}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="mistake-list"
                variants={listStagger}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {filtered.map((m) => {
                  const k = `${m.test_id}:${m.section}:${m.q_num}`
                  const cfg = getTestConfig(m.test_id) || { label: m.test_id, pdfUrl: '/practice-test-11.pdf' }
                  const secLabel = getExamConfigForTest(m.test_id)?.modules?.[m.section]?.label || m.section
                  const dueAt = reviewItems?.[k]?.due_at
                  const dueSoon = dueAt && new Date(dueAt).getTime() <= Date.now()
                  const solved = solvedIds.has(m.id)
                  return (
                    <motion.button
                      key={m.id}
                      variants={listItem}
                      whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(14,165,233,.12)', borderColor: '#0ea5e9' }}
                      onClick={() => setSelected(m)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '14px 16px',
                        border: solved
                          ? '1.5px solid rgba(16,185,129,.25)'
                          : '1.5px solid rgba(14,165,233,.12)',
                        borderLeft: solved
                          ? '3px solid #10b981'
                          : '1.5px solid rgba(14,165,233,.12)',
                        borderRadius: 14,
                        background: solved
                          ? 'linear-gradient(135deg, rgba(16,185,129,.04), rgba(16,185,129,.01))'
                          : '#fff',
                        cursor: 'pointer',
                        opacity: solved ? 0.75 : 1,
                        boxShadow: '0 2px 8px rgba(15,23,42,.05)',
                        transition: 'all .2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            minWidth: 28, height: 28, borderRadius: 8,
                            background: solved
                              ? 'rgba(16,185,129,.12)'
                              : 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                            color: solved ? '#059669' : '#fff',
                            fontSize: 11, fontWeight: 900, flexShrink: 0,
                            padding: '0 6px',
                          }}>
                            Q{m.q_num}
                          </span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 14, color: solved ? '#059669' : '#0f172a' }}>
                              {solved ? '✓ ' : ''}{cfg.label} · {secLabel}
                            </div>
                            <div style={{ marginTop: 3, fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
                              {m.chapter_id ? `Ch ${m.chapter_id}` : 'No chapter'} · Your answer: <b style={{ color: '#64748b' }}>{String(m.given || '').trim() || 'Unanswered'}</b>
                            </div>
                          </div>
                        </div>
                        <span style={{
                          fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 12,
                          background: solved
                            ? 'rgba(16,185,129,.1)'
                            : dueSoon ? 'rgba(239,68,68,.08)' : 'rgba(148,163,184,.06)',
                          color: solved ? '#059669' : (dueSoon ? '#dc2626' : '#94a3b8'),
                          flexShrink: 0,
                        }}>
                          {solved ? 'DONE' : (dueSoon ? 'DUE' : '—')}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            ) : (
              <motion.div
                key="mistake-detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ overflow: 'visible' }}
              >
                {/* Nav bar */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14,
                  background: '#fff', border: '1.5px solid rgba(14,165,233,.12)', borderRadius: 14,
                  boxShadow: '0 2px 8px rgba(15,23,42,.04)', padding: '12px 16px',
                }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="btn btn-outline" onClick={() => setSelected(null)}>
                      <Icon name="back" size={16} />
                      Back to list
                    </button>
                    <Link className="btn btn-outline" to={viewHref('/dashboard')}>
                      <Icon name="home" size={16} />
                      Dashboard
                    </Link>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: 28, height: 28, borderRadius: 8,
                      background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                      color: '#fff', fontSize: 11, fontWeight: 900, padding: '0 6px',
                    }}>Q{selected.q_num}</span>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: 14 }}>
                      {selectedCfg?.label || selected.test_id} · {selectedModule?.label || selected.section}
                    </span>
                  </div>
                  <a className="btn btn-outline" href={selectedCfg?.pdfUrl || '/practice-test-11.pdf'} target="_blank" rel="noreferrer">Open PDF →</a>
                </div>

                {/* Answer box - sticky at page level, outside any overflow container */}
                <div style={{
                  position: 'sticky', top: 0, zIndex: 20,
                  background: '#fff',
                  borderRadius: 16,
                  border: '1.5px solid rgba(14,165,233,.18)',
                  boxShadow: '0 4px 24px rgba(15,23,42,.12)',
                  marginBottom: 14,
                  padding: '18px 20px',
                }}>
                  {answerPanel}
                </div>

                {/* Zoom controls */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10,
                  background: '#fff', border: '1.5px solid rgba(14,165,233,.12)', borderRadius: 12,
                  padding: '10px 16px',
                }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
                    Scroll down to see the question. Answer box stays pinned at the top.
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.max(0.8, Math.round((z - 0.25) * 100) / 100))}>− Zoom</button>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, minWidth: 74, textAlign: 'center' }}>
                      {Math.round(zoom * 100)}%
                    </div>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.min(3.0, Math.round((z + 0.25) * 100) / 100))}>+ Zoom</button>
                  </div>
                </div>

                {/* PDF viewer - full width, scrolls below the sticky answer box */}
                <div style={{ border: '1.5px solid rgba(14,165,233,.12)', borderRadius: 16, background: 'white', boxShadow: '0 2px 8px rgba(15,23,42,.04)' }}>
                  {Array.isArray(selectedSectionRange) ? (
                    <PDFSectionStack
                      key={selectedItemKey}
                      pdfUrl={selectedCfg?.pdfUrl || '/practice-test-11.pdf'}
                      startPage={selectedSectionRange[0]}
                      endPage={selectedSectionRange[1]}
                      zoom={zoom}
                      initialPageIndex={resolvedPdfTarget.pageIndex}
                      initialScrollRatio={resolvedPdfTarget.scrollRatio}
                      containerStyle={{ maxHeight: 'none', height: 'auto', overflowY: 'visible', padding: 10, paddingTop: 0 }}
                    />
                  ) : (
                    <PDFPage
                      pdfUrl={selectedCfg?.pdfUrl || '/practice-test-11.pdf'}
                      pageIndex={resolvedPdfTarget.pageIndex}
                      zoom={zoom}
                      maxScale={6}
                    />
                  )}
                </div>

                {exam !== 'act' && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>Optional explanation (save what you learned)</div>
                    <textarea
                      value={selected.note || ''}
                      onChange={(e) => setSelected(prev => ({ ...prev, note: e.target.value }))}
                      placeholder="Write 2–4 sentences: what you missed, what the question was testing, and the exact rule/step you'll use next time."
                      readOnly={isAdminPreview}
                      style={{
                        width: '100%',
                        minHeight: 110,
                        padding: 12,
                        borderRadius: 12,
                        border: '1.5px solid rgba(14,165,233,.12)',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'DM Sans, system-ui, -apple-system, Segoe UI, sans-serif',
                        fontSize: 13,
                        lineHeight: 1.6
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                      <div style={{ color: '#94a3b8', fontSize: 12 }}>
                        Tip: Avoid "I'll be more careful." Write the specific method you'll apply.
                      </div>
                      <button
                        className="btn"
                        style={{ background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', color: 'white', fontWeight: 800, borderRadius: 10, boxShadow: '0 2px 8px rgba(14,165,233,.2)' }}
                        disabled={isAdminPreview || savingId === selected.id}
                        onClick={async () => {
                          if (isAdminPreview) return
                          setSavingId(selected.id)
                          await updateMistakeNote(viewUserId, selected.id, selected.note || '')
                          setItems(prev => (prev || []).map(m => m.id === selected.id ? { ...m, note: selected.note || '' } : m))
                          setSavingId(null)
                        }}
                      >
                        {isAdminPreview ? 'Preview only' : savingId === selected.id ? 'Saving…' : 'Save note'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
