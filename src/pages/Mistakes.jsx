import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const textCache = {}

const ALL_GUIDE_CONTENT = {
  ...getGuideContentForExam('sat'),
  ...getGuideContentForExam('act'),
}

function Navbar({ dashboardHref, guideHref, mistakesHref, calendarHref, currentExam, satHref, actHref, showResources = true }) {
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <BrandLink to={dashboardHref} />
      <div className="nav-actions">
        <TopResourceNav hidden={!showResources} current="mistakes" calendarHref={calendarHref} guideHref={guideHref} mistakesHref={mistakesHref} />
        <ExamSwitcher currentExam={currentExam} satHref={satHref} actHref={actHref} />
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
          style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}
          title="Go back"
        >
          ← Back
        </button>
        <Link to={dashboardHref} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
          Dashboard
        </Link>
      </div>
    </nav>
  )
}

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

  const dueCount = useMemo(() => computeDueCount(reviewItems), [reviewItems])

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
        Loading mistake notebook…
      </div>
    )
  }

  const nextMistake = (() => {
    if (!selected) return null
    const idx = filtered.findIndex((m) => m.id === selected.id)
    if (idx < 0) return filtered[0] || null
    return filtered[idx + 1] || filtered[0] || null
  })()

  const answerPanel = selected ? (
    <div className={`mistake-answer-box act-floating ${redoFeedback ? (redoFeedback.ok ? 'answer-feedback-correct' : 'answer-feedback-wrong') : ''}`} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, background: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ fontWeight: 900, color: '#1a2744' }}>Answer Q{selected.q_num} (quick redo)</div>
        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
          {selectedCorrect != null ? 'Click Check to validate.' : 'Answer key missing for this question.'}
        </div>
      </div>

      {selectedCorrect == null ? (
        <div style={{ marginTop: 10, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
          This question can’t be validated yet because the answer key isn’t loaded.
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
                disabled={!nextMistake || nextMistake?.id === selected.id}
                onClick={() => {
                  if (nextMistake) setSelected(nextMistake)
                }}
              >
                Next question →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  ) : null

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar
        dashboardHref={viewHref('/dashboard')}
        guideHref={viewHref('/guide')}
        mistakesHref={viewHref('/mistakes')}
        calendarHref={viewHref('/calendar')}
        currentExam={exam}
        satHref={satHref}
        actHref={actHref}
        showResources={showResourceNav}
      />
      <div className="page fade-up">
        {isAdminPreview && (
          <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, rgba(26,39,68,.96), rgba(30,58,138,.94))', color: 'white' }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>Admin View</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.88 }}>
              You’re viewing this student’s Mistake Notebook in read-only mode. Notes and validations won’t overwrite their data.
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 14 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="mistakes" size={20} />
              Mistake Notebook
            </h1>
            <div style={{ marginTop: 4, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Your missed questions auto-save here. Adding an explanation is <b>optional</b>, but it helps you avoid repeating the same mistake.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn btn-outline" onClick={() => setFilterDue(v => !v)}>
              {filterDue ? 'Showing: Due now' : `Filter: Due now (${dueCount})`}
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>No mistakes yet</div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Take a {exam === 'act' ? 'practice ACT' : 'Pre Test or optional Skill Builder test'}. Any missed questions will appear here.
              </div>
            </div>
        ) : (
          <>
            {!selected ? (
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: 14, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 900, color: '#1a2744' }}>Mistakes ({filtered.length})</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>Click one to open its full question page</div>
                </div>
                <div style={{ maxHeight: 720, overflow: 'auto' }}>
                  {filtered.map((m) => {
                    const k = `${m.test_id}:${m.section}:${m.q_num}`
                    const cfg = getTestConfig(m.test_id) || { label: m.test_id, pdfUrl: '/practice-test-11.pdf' }
                    const secLabel = getExamConfigForTest(m.test_id)?.modules?.[m.section]?.label || m.section
                    const dueAt = reviewItems?.[k]?.due_at
                    const dueSoon = dueAt && new Date(dueAt).getTime() <= Date.now()
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelected(m)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: 14,
                          border: 0,
                          borderBottom: '1px solid #e2e8f0',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                          <div style={{ fontWeight: 900, color: '#1a2744' }}>{cfg.label} · {secLabel} · Q{m.q_num}</div>
                          <div style={{ fontSize: 12, fontWeight: 900, color: dueSoon ? '#ef4444' : '#94a3b8' }}>
                            {dueSoon ? 'DUE' : '—'}
                          </div>
                        </div>
                        <div style={{ marginTop: 6, fontSize: 12, color: '#64748b' }}>
                          {m.chapter_id ? `Study Guide: Ch ${m.chapter_id}` : 'Study Guide: —'} · Your answer: <b>{String(m.given || '').trim() || 'Unanswered'}</b>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button className="btn btn-outline" onClick={() => setSelected(null)}>
                      <Icon name="back" size={16} />
                      Back to list
                    </button>
                    <Link className="btn btn-outline" to={viewHref('/dashboard')}>
                      <Icon name="home" size={16} />
                      Back to Dashboard
                    </Link>
                  </div>
                    <div style={{ fontWeight: 900, color: '#1a2744', fontSize: 15 }}>
                    <span style={{ fontWeight: 900 }}>Answering:</span> {selectedCfg?.label || selected.test_id} · {selectedModule?.label || selected.section} · <span style={{ fontWeight: 900 }}>Q{selected.q_num}</span>
                  </div>
                  <a className="btn btn-outline" href={selectedCfg?.pdfUrl || '/practice-test-11.pdf'} target="_blank" rel="noreferrer">Open PDF →</a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
                    Use zoom if the page is hard to read. <span style={{ color: '#1a2744', fontWeight: 900 }}>Your answer box stays visible below</span> while you scroll the question.
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.max(0.8, Math.round((z - 0.25) * 100) / 100))}>− Zoom</button>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, minWidth: 74, textAlign: 'center' }}>
                      {Math.round(zoom * 100)}%
                    </div>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.min(3.0, Math.round((z + 0.25) * 100) / 100))}>+ Zoom</button>
                  </div>
                </div>

                {answerPanel}

                <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, background: 'white', marginBottom: 14 }}>
                  {Array.isArray(selectedSectionRange) ? (
                    <PDFSectionStack
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
                    <div style={{ fontSize: 12, fontWeight: 900, color: '#64748b', marginBottom: 6 }}>Optional explanation (save what you learned)</div>
                    <textarea
                      value={selected.note || ''}
                      onChange={(e) => setSelected(prev => ({ ...prev, note: e.target.value }))}
                      placeholder="Write 2–4 sentences: what you missed, what the question was testing, and the exact rule/step you’ll use next time."
                      readOnly={isAdminPreview}
                      style={{
                        width: '100%',
                        minHeight: 110,
                        padding: 12,
                        borderRadius: 12,
                        border: '1.5px solid #e2e8f0',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'DM Sans, system-ui, -apple-system, Segoe UI, sans-serif',
                        fontSize: 13,
                        lineHeight: 1.6
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                      <div style={{ color: '#94a3b8', fontSize: 12 }}>
                        Tip: Avoid “I’ll be more careful.” Write the specific method you’ll apply.
                      </div>
                      <button
                        className="btn"
                        style={{ background: '#1a2744', color: 'white', fontWeight: 900 }}
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
