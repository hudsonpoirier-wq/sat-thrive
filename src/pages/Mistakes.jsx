import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { MODULES, PDF_PAGE_MAP, freeResponseMatches } from '../data/testData.js'
import { EXTRA_PDF_PAGE_MAPS } from '../data/extraPdfPageMaps.js'
import { getTestConfig } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import PDFPage from '../components/PDFPage.jsx'
import { loadMistakes, loadReviewItems, computeDueCount, updateMistakeNote, applyReviewResult, saveReviewItem } from '../lib/mistakesStore.js'

function Navbar() {
  return (
    <nav className="nav">
      <a className="nav-brand" href="/dashboard">The Agora <span>Project</span></a>
      <div className="nav-actions">
        <Link to="/dashboard" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
          ← Dashboard
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

function pageMapFor(testId, section) {
  return (testId === 'pre_test')
    ? (PDF_PAGE_MAP?.[section] || {})
    : (EXTRA_PDF_PAGE_MAPS?.[testId]?.[section] || {})
}

function clamp01(n) {
  if (!Number.isFinite(Number(n))) return 0
  return Math.max(0, Math.min(1, Number(n)))
}

// Best-effort crop: split the current PDF page into vertical bands based on how many questions map to that page.
// This avoids inaccurate “random crops” and usually contains the selected question.
function cropForQuestion({ testId, section, qNum, pageIndex }) {
  const map = pageMapFor(testId, section)
  const samePageQs = Object.entries(map || {})
    .map(([k, v]) => ({ q: Number(k), page: Number(v) }))
    .filter(x => Number.isFinite(x.q) && Number.isFinite(x.page) && x.page === pageIndex)
    .sort((a, b) => a.q - b.q)
    .map(x => x.q)
  if (samePageQs.length <= 1) {
    return { x: 0.04, y: 0.06, w: 0.92, h: 0.86 }
  }
  const idx = Math.max(0, samePageQs.indexOf(Number(qNum)))
  const center = (idx + 0.5) / samePageQs.length
  const minH = 0.28
  const bandH = Math.max(minH, Math.min(0.55, 1 / Math.min(4, samePageQs.length)))
  const y = clamp01(center - bandH / 2 - 0.03)
  const h = clamp01(bandH + 0.06)
  return { x: 0.04, y, w: 0.92, h }
}

export default function Mistakes() {
  const { user } = useAuth()
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
  const [cropOn, setCropOn] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    setLoading(true)
    Promise.all([loadMistakes(user.id), loadReviewItems(user.id)])
      .then(([m, r]) => {
        setItems(m.items || [])
        setReviewItems(r.items || {})
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user?.id])

  const dueCount = useMemo(() => computeDueCount(reviewItems), [reviewItems])

  const filtered = useMemo(() => {
    const now = Date.now()
    const list = (items || []).slice()
    if (!filterDue) return list
    return list.filter((m) => {
      const k = `${m.test_id}:${m.section}:${m.q_num}`
      const due = new Date(reviewItems?.[k]?.due_at || 0).getTime()
      return Number.isFinite(due) && due <= now
    })
  }, [items, filterDue, reviewItems])

  const selectedCfg = selected ? getTestConfig(selected.test_id) : null
  const selectedPdfPage = selected ? pdfPageFor(selected.test_id, selected.section, selected.q_num) : 0
  const selectedCrop = useMemo(() => {
    if (!selected) return null
    return cropForQuestion({ testId: selected.test_id, section: selected.section, qNum: selected.q_num, pageIndex: selectedPdfPage })
  }, [selected?.id, selectedPdfPage])
  const selectedItemKey = selected ? `${selected.test_id}:${selected.section}:${selected.q_num}` : null
  const selectedKeyBySection = selected ? getAnswerKeyBySection(selected.test_id) : null
  const selectedCorrect = selected ? selectedKeyBySection?.[selected.section]?.[selected.q_num] : null
  const selectedIsMC = selected ? ['A', 'B', 'C', 'D'].includes(String(selectedCorrect || '').trim().toUpperCase()) : false

  useEffect(() => {
    setZoom(1)
    setRedoChoice(null)
    setRedoText('')
    setRedoFeedback(null)
    setRedoSaving(false)
    setCropOn(true)
  }, [selectedItemKey])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b', fontFamily: 'Sora,sans-serif' }}>
        Loading mistake notebook…
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar />
      <div className="page fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 14 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744' }}>🧾 Mistake Notebook</h1>
            <div style={{ marginTop: 4, color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              Your missed questions auto-save here. Add your own explanation so you don’t repeat the same mistake.
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
              Take the Pre Test or an optional Skill Builder test. Any missed questions will appear here.
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(360px, 1.3fr)', gap: 14, alignItems: 'start' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 14, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 900, color: '#1a2744' }}>Mistakes ({filtered.length})</div>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>Click one to practice</div>
              </div>
              <div style={{ maxHeight: 660, overflow: 'auto' }}>
                {filtered.map((m) => {
                  const k = `${m.test_id}:${m.section}:${m.q_num}`
                  const cfg = getTestConfig(m.test_id) || { label: m.test_id, pdfUrl: '/practice-test-11.pdf' }
                  const secLabel = MODULES?.[m.section]?.label || m.section
                  const dueAt = reviewItems?.[k]?.due_at
                  const dueSoon = dueAt && new Date(dueAt).getTime() <= Date.now()
                  const active = selected?.id === m.id
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
                        background: active ? '#eef2ff' : 'transparent',
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

            <div className="card">
              {!selected ? (
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.7 }}>
                  Select a mistake on the left to view the PDF page and add your explanation.
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontWeight: 900, color: '#1a2744' }}>
                      {selectedCfg?.label || selected.test_id} · {MODULES?.[selected.section]?.label || selected.section} · Q{selected.q_num}
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a className="btn btn-outline" href={selectedCfg?.pdfUrl || '/practice-test-11.pdf'} target="_blank" rel="noreferrer">Open PDF →</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
                      Tip: Use Crop + Zoom to focus on the exact question.
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setCropOn(v => !v)}>
                        {cropOn ? 'Cropped view' : 'Full page'}
                      </button>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.max(0.8, Math.round((z - 0.2) * 10) / 10))}>− Zoom</button>
                      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, minWidth: 74, textAlign: 'center' }}>
                        {Math.round(zoom * 100)}%
                      </div>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.min(2.2, Math.round((z + 0.2) * 10) / 10))}>+ Zoom</button>
                    </div>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
                    <PDFPage
                      pdfUrl={selectedCfg?.pdfUrl || '/practice-test-11.pdf'}
                      pageIndex={selectedPdfPage}
                      zoom={zoom}
                      maxScale={3.2}
                      crop={cropOn ? selectedCrop : null}
                    />
                  </div>

                  <div style={{ marginTop: 12, border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      <div style={{ fontWeight: 900, color: '#1a2744' }}>Quick redo (answer here)</div>
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
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, marginTop: 12 }}>
                            {['A', 'B', 'C', 'D'].map((c) => (
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
                              Open response: enter only the value/expression. Examples: <code>75</code>, <code>1/2</code>, <code>0.5</code>, <code>pi</code>, <code>3*pi/2</code>, <code>2^3</code>.
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
                            disabled={redoSaving || (selectedIsMC ? !redoChoice : !redoText.trim())}
                            onClick={async () => {
                              if (!selectedItemKey) return
                              const right = String(selectedCorrect || '').trim()
                              const ok = selectedIsMC
                                ? (String(redoChoice || '').toUpperCase() === right.toUpperCase())
                                : freeResponseMatches(redoText, right)

                              setRedoFeedback(ok ? { ok: true, msg: '✅ Correct — validated and scheduled for spaced review.' } : { ok: false, msg: '❌ Not quite — try again.' })
                              if (!ok) return

                              setRedoSaving(true)
                              try {
                                const currentItem = reviewItems?.[selectedItemKey] || { due_at: new Date().toISOString() }
                                const next = applyReviewResult(currentItem, true)
                                await saveReviewItem(user.id, selectedItemKey, next)
                                setReviewItems(prev => ({ ...(prev || {}), [selectedItemKey]: next }))
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
                      </>
                    )}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 900, color: '#64748b', marginBottom: 6 }}>Your explanation (save what you learned)</div>
                    <textarea
                      value={selected.note || ''}
                      onChange={(e) => setSelected(prev => ({ ...prev, note: e.target.value }))}
                      placeholder="Write 2–4 sentences: what you missed, what the question was testing, and the exact rule/step you’ll use next time."
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
                        disabled={savingId === selected.id}
                        onClick={async () => {
                          setSavingId(selected.id)
                          await updateMistakeNote(user.id, selected.id, selected.note || '')
                          setItems(prev => (prev || []).map(m => m.id === selected.id ? { ...m, note: selected.note || '' } : m))
                          setSavingId(null)
                        }}
                      >
                        {savingId === selected.id ? 'Saving…' : 'Save note'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
