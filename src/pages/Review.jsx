import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import PDFPage from '../components/PDFPage.jsx'
import { MODULES, PDF_PAGE_MAP, answerMatches, isMultipleChoiceAnswer } from '../data/testData.js'
import { EXTRA_PDF_PAGE_MAPS } from '../data/extraPdfPageMaps.js'
import { getTestConfig } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import Sidebar from '../components/Sidebar.jsx'
import {
  loadMistakes,
  loadReviewItems,
  nextDueItemKey,
  computeDueCount,
  applyReviewResult,
  saveReviewItem,
  updateMistakeNote,
} from '../lib/mistakesStore.js'

/* Navbar removed — using Sidebar */

function pdfPageFor(testId, section, qNum) {
  const map = (testId === 'pre_test')
    ? (PDF_PAGE_MAP?.[section] || {})
    : (EXTRA_PDF_PAGE_MAPS?.[testId]?.[section] || {})
  if (Number.isFinite(Number(map?.[qNum]))) return map[qNum]
  for (let q = qNum - 1; q >= 1; q--) {
    if (Number.isFinite(Number(map?.[q]))) return map[q]
  }
  return 0
}

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search || ''), [search])
}

export default function Review() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const q = useQuery()
  const forcedItem = q.get('item')

  const [loading, setLoading] = useState(true)
  const [mistakes, setMistakes] = useState([])
  const [reviewItems, setReviewItems] = useState({})
  const [itemKey, setItemKey] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user?.id) return
    let cancelled = false
    setLoading(true)
    Promise.allSettled([loadMistakes(user.id), loadReviewItems(user.id)])
      .then(([m, r]) => {
        if (cancelled) return
        setMistakes(m.status === 'fulfilled' ? (m.value.items || []) : [])
        setReviewItems(r.status === 'fulfilled' ? (r.value.items || {}) : {})
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const dueCount = useMemo(() => computeDueCount(reviewItems), [reviewItems])

  useEffect(() => {
    if (loading) return
    const next = forcedItem || nextDueItemKey(reviewItems)
    setItemKey(next || null)
    setAnswer('')
    setFeedback(null)
  }, [loading, forcedItem, reviewItems])

  const current = useMemo(() => {
    if (!itemKey) return null
    const [test_id, section, qStr] = String(itemKey).split(':')
    const q_num = Number(qStr)
    const cfg = getTestConfig(test_id)
    const mistake = (mistakes || []).find(m => m.test_id === test_id && m.section === section && Number(m.q_num) === q_num) || null
    const keyBySection = getAnswerKeyBySection(test_id)
    const correct = keyBySection?.[section]?.[q_num]
    return { itemKey, test_id, section, q_num, cfg, mistake, correct }
  }, [itemKey, mistakes])

  useEffect(() => {
    setNote(current?.mistake?.note || '')
  }, [current?.mistake?.id])

  // PDF alignment controls (same storage as TestTaking)
  const [pdfOffsetsByTest, setPdfOffsetsByTest] = useState({})
  const [pdfOverridesByTest, setPdfOverridesByTest] = useState({})
  const [pdfZoom, setPdfZoom] = useState(1)
  useEffect(() => {
    try { setPdfOffsetsByTest(JSON.parse(localStorage.getItem('agora_pdf_offsets_v2') || '{}') || {}) } catch {}
    try { setPdfOverridesByTest(JSON.parse(localStorage.getItem('agora_pdf_overrides_v2') || '{}') || {}) } catch {}
  }, [])
  useEffect(() => { setPdfZoom(1) }, [current?.itemKey])
  useEffect(() => {
    try { localStorage.setItem('agora_pdf_offsets_v2', JSON.stringify(pdfOffsetsByTest || {})) } catch {}
  }, [pdfOffsetsByTest])
  useEffect(() => {
    try { localStorage.setItem('agora_pdf_overrides_v2', JSON.stringify(pdfOverridesByTest || {})) } catch {}
  }, [pdfOverridesByTest])

  function setPdfOffsetFor(testId, moduleId, nextOffset) {
    setPdfOffsetsByTest(prev => ({
      ...(prev || {}),
      [testId]: { ...(prev?.[testId] || {}), [moduleId]: nextOffset }
    }))
  }

  function setPdfOverrideFor(testId, moduleId, qNum, pageIndex) {
    setPdfOverridesByTest(prev => ({
      ...(prev || {}),
      [testId]: {
        ...(prev?.[testId] || {}),
        [moduleId]: { ...(prev?.[testId]?.[moduleId] || {}), [qNum]: pageIndex }
      }
    }))
  }

  function clearPdfOverrideFor(testId, moduleId, qNum) {
    setPdfOverridesByTest(prev => {
      const next = { ...(prev || {}) }
      const mod = { ...(next?.[testId]?.[moduleId] || {}) }
      delete mod[qNum]
      next[testId] = { ...(next?.[testId] || {}), [moduleId]: mod }
      return next
    })
  }

  const pdfPage = useMemo(() => {
    if (!current?.test_id || !current?.section || !current?.q_num) return 0
    const base = pdfPageFor(current.test_id, current.section, current.q_num)
    const offset = Number(pdfOffsetsByTest?.[current.test_id]?.[current.section] || 0)
    const override = pdfOverridesByTest?.[current.test_id]?.[current.section]?.[current.q_num]
    return Math.max(0, Number.isFinite(Number(override)) ? Number(override) : (base + offset))
  }, [current?.itemKey, pdfOffsetsByTest, pdfOverridesByTest])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b', fontFamily: 'Sora,sans-serif' }}>
        Loading review queue…
      </div>
    )
  }

  if (!current?.itemKey) {
    return (
      <div className="app-layout has-sidebar">
        <Sidebar currentExam="sat" />
        <div className="page fade-up">
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>No reviews due</div>
            <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Your spaced-repetition queue is clear. Keep taking timed sets and your missed questions will appear here.
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
              <button className="btn btn-outline" onClick={() => navigate('/mistakes')}>Open Mistakes →</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const mod = MODULES?.[current.section]
  const correct = current.correct
  const isFR = correct != null && !isMultipleChoiceAnswer(correct)

  const ok = (() => {
    if (feedback?.result == null) return null
    return feedback.result
  })()

  return (
    <div className="app-layout has-sidebar">
      <Sidebar currentExam="sat" />
      <div className="page fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="refresh" size={20} />
              Spaced Review
            </h1>
            <div style={{ marginTop: 4, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Due now: <b>{dueCount}</b> · Reviewing: <b>{current.cfg?.label || current.test_id}</b> · {mod?.label || current.section} · Q{current.q_num}
              {current.mistake?.chapter_id ? <> · Study Guide: <b>Ch {current.mistake.chapter_id}</b></> : null}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <a className="btn btn-outline" href={current.cfg?.pdfUrl || '/practice-test-11.pdf'} target="_blank" rel="noreferrer">Open PDF →</a>
            <button className="btn btn-outline" onClick={() => navigate('/mistakes')}>Mistakes →</button>
          </div>
        </div>

        {!correct ? (
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 8 }}>Missing answer key</div>
            <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              This review item can't be checked yet because the answer key isn't loaded for this test.
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 1.3fr) minmax(320px, 1fr)', gap: 14, alignItems: 'start' }}>
            <div className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
                    PDF page <span style={{ color: '#0f172a' }}>{pdfPage + 1}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, padding: '2px 10px', borderRadius: 999, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    {mod?.label || current.section} · Q{current.q_num}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setPdfZoom(z => Math.max(0.8, Math.round((z - 0.2) * 10) / 10))}>− Zoom</button>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, minWidth: 64, textAlign: 'center' }}>
                    {Math.round(pdfZoom * 100)}%
                  </div>
                  <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setPdfZoom(z => Math.min(2.2, Math.round((z + 0.2) * 10) / 10))}>+ Zoom</button>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '6px 10px', fontSize: 12 }}
                    onClick={() => {
                      const page = window.prompt('Set the PDF page number for this question (1-based):', String(pdfPage + 1))
                      const n = Number(String(page || '').trim())
                      if (!Number.isFinite(n) || n < 1) return
                      setPdfOverrideFor(current.test_id, current.section, current.q_num, Math.max(0, Math.floor(n - 1)))
                    }}
                    title="If the mapping is glitchy, set an exact page"
                  >
                    Set page
                  </button>
                  {Number.isFinite(Number(pdfOverridesByTest?.[current.test_id]?.[current.section]?.[current.q_num])) && (
                    <button
                      className="btn btn-outline"
                      style={{ padding: '6px 10px', fontSize: 12 }}
                      onClick={() => clearPdfOverrideFor(current.test_id, current.section, current.q_num)}
                    >
                      Clear override
                    </button>
                  )}
                  <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }}
                    onClick={() => setPdfOffsetFor(current.test_id, current.section, Number(pdfOffsetsByTest?.[current.test_id]?.[current.section] || 0) - 1)}>
                    −1 page
                  </button>
                  <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }}
                    onClick={() => setPdfOffsetFor(current.test_id, current.section, Number(pdfOffsetsByTest?.[current.test_id]?.[current.section] || 0) + 1)}>
                    +1 page
                  </button>
                </div>
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
                <PDFPage pdfUrl={current.cfg?.pdfUrl || '/practice-test-11.pdf'} pageIndex={pdfPage} zoom={pdfZoom} maxScale={3.2} />
              </div>
            </div>

            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 8 }}>Answer</div>
              <div style={{ marginTop: -2, marginBottom: 10, fontSize: 12, color: '#64748b', fontWeight: 900 }}>
                You are working on: <span style={{ color: '#0f172a' }}>{current.cfg?.label || current.test_id}</span> · <span style={{ color: '#0f172a' }}>{mod?.label || current.section}</span> · <span style={{ color: '#0f172a' }}>Q{current.q_num}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                {isFR
                  ? <>Enter your answer as a number or simple expression (examples: <code>1/2</code>, <code>0.5</code>, <code>15,000</code>, <code>pi</code>, <code>3*pi/2</code>). Equivalent fractions and comma-formatted numbers count. Don't include units or extra words.</>
                  : 'Pick A, B, C, or D.'}
              </div>

              {isFR ? (
                <input
                  type="text"
                  className="free-response-input"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your answer"
                  autoComplete="off"
                />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                  {['A', 'B', 'C', 'D'].map((l) => (
                    <button
                      key={l}
                      className="btn"
                      style={{
                        background: answer === l ? '#1a2744' : '#f1f5f9',
                        color: answer === l ? 'white' : '#1a2744',
                        fontWeight: 900,
                        border: '1px solid #e2e8f0'
                      }}
                      onClick={() => setAnswer(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    if (!answer.trim()) return
                    const isCorrect = answerMatches(answer, correct)
                    setFeedback({ result: isCorrect })
                    const next = applyReviewResult(reviewItems?.[current.itemKey], isCorrect)
                    await saveReviewItem(user.id, current.itemKey, next)
                    setReviewItems(prev => ({ ...(prev || {}), [current.itemKey]: next }))
                  }}
                >
                  Check →
                </button>
                  {feedback && (
                    <div style={{ fontSize: 12, fontWeight: 900, color: ok ? '#10b981' : '#ef4444' }}>
                    {ok ? 'Correct' : 'Not quite'}
                    </div>
                  )}
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    // Next due item
                    const next = nextDueItemKey(reviewItems)
                    navigate(next ? `/review?item=${encodeURIComponent(next)}` : '/review')
                  }}
                >
                  Next →
                </button>
              </div>

              <div style={{ marginTop: 14, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: '#64748b', marginBottom: 6 }}>Your explanation (optional)</div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write the exact rule/step you'll use next time."
                  style={{
                    width: '100%',
                    minHeight: 90,
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
                    Quick formula: "I missed ___ because ___. Next time I will ___."
                  </div>
                  <button
                    className="btn"
                    style={{ background: '#1a2744', color: 'white', fontWeight: 900 }}
                    disabled={saving}
                    onClick={async () => {
                      if (!current?.mistake?.id) return
                      setSaving(true)
                      await updateMistakeNote(user.id, current.mistake.id, note || '')
                      setMistakes(prev => (prev || []).map(m => m.id === current.mistake.id ? { ...m, note: note || '' } : m))
                      setSaving(false)
                    }}
                  >
                    {saving ? 'Saving…' : 'Save note'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
