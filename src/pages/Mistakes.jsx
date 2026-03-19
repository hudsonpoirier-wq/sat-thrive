import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { MODULES, PDF_PAGE_MAP, freeResponseMatches } from '../data/testData.js'
import { EXTRA_PDF_PAGE_MAPS } from '../data/extraPdfPageMaps.js'
import { getTestConfig } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import PDFPage from '../components/PDFPage.jsx'
import BrandLink from '../components/BrandLink.jsx'
import { loadMistakes, loadReviewItems, computeDueCount, updateMistakeNote, applyReviewResult, saveReviewItem } from '../lib/mistakesStore.js'
import { resolveViewContext, withViewUser } from '../lib/viewAs.js'

function Navbar({ viewUserId, isAdminPreview }) {
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <BrandLink to={withViewUser('/dashboard', viewUserId, isAdminPreview)} />
      <div className="nav-actions">
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
          style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}
          title="Go back"
        >
          ← Back
        </button>
        <Link to={withViewUser('/dashboard', viewUserId, isAdminPreview)} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
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

export default function Mistakes() {
  const { user, profile } = useAuth()
  const location = useLocation()
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

  const viewHref = (path) => withViewUser(path, viewUserId, isAdminPreview)

  useEffect(() => {
    if (!viewUserId) return
    setLoading(true)
    Promise.all([loadMistakes(viewUserId), loadReviewItems(viewUserId)])
      .then(([m, r]) => {
        setItems(m.items || [])
        setReviewItems(r.items || {})
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [viewUserId])

  const dueCount = useMemo(() => computeDueCount(reviewItems), [reviewItems])

  const filtered = useMemo(() => {
    const now = Date.now()
    const list = (items || []).slice()
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
  const selectedPdfPage = selected ? pdfPageFor(selected.test_id, selected.section, selected.q_num) : 0
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
  }, [selectedItemKey])

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

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar viewUserId={viewUserId} isAdminPreview={isAdminPreview} />
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
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744' }}>🧾 Mistake Notebook</h1>
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
              Take the Pre Test or an optional Skill Builder test. Any missed questions will appear here.
            </div>
          </div>
        ) : (
          <>
            {!selected ? (
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: 14, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 900, color: '#1a2744' }}>Mistakes ({filtered.length})</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>Click one to practice</div>
                </div>
                <div style={{ maxHeight: 720, overflow: 'auto' }}>
                  {filtered.map((m) => {
                    const k = `${m.test_id}:${m.section}:${m.q_num}`
                    const cfg = getTestConfig(m.test_id) || { label: m.test_id, pdfUrl: '/practice-test-11.pdf' }
                    const secLabel = MODULES?.[m.section]?.label || m.section
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
                  <button className="btn btn-outline" onClick={() => setSelected(null)}>← Back to list</button>
                  <div style={{ fontWeight: 900, color: '#1a2744', fontSize: 15 }}>
                    <span style={{ fontWeight: 900 }}>Answering:</span> {selectedCfg?.label || selected.test_id} · {MODULES?.[selected.section]?.label || selected.section} · <span style={{ fontWeight: 900 }}>Q{selected.q_num}</span>
                  </div>
                  <a className="btn btn-outline" href={selectedCfg?.pdfUrl || '/practice-test-11.pdf'} target="_blank" rel="noreferrer">Open PDF →</a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
                    Use zoom if the page is hard to read. <span style={{ color: '#1a2744', fontWeight: 900 }}>Scroll down</span> to answer and check.
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.max(0.8, Math.round((z - 0.25) * 100) / 100))}>− Zoom</button>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, minWidth: 74, textAlign: 'center' }}>
                      {Math.round(zoom * 100)}%
                    </div>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => setZoom(z => Math.min(3.0, Math.round((z + 0.25) * 100) / 100))}>+ Zoom</button>
                  </div>
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'auto', background: 'white', marginBottom: 14 }}>
                  <PDFPage
                    pdfUrl={selectedCfg?.pdfUrl || '/practice-test-11.pdf'}
                    pageIndex={selectedPdfPage}
                    zoom={zoom}
                    maxScale={6}
                  />
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, background: '#f8fafc' }}>
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
                              const ok = selectedIsMC
                                ? (String(redoChoice || '').toUpperCase() === right.toUpperCase())
                                : freeResponseMatches(redoText, right)

                              setRedoFeedback(ok ? { ok: true, msg: '✅ Correct — nice work!' } : { ok: false, msg: '❌ Not quite — try again.' })
                              if (!ok) return

                              setRedoSaving(true)
                              try {
                                const currentItem = reviewItems?.[selectedItemKey] || { due_at: new Date().toISOString() }
                                const next = applyReviewResult(currentItem, true)
                                await saveReviewItem(viewUserId, selectedItemKey, next)
                                setReviewItems(prev => ({ ...(prev || {}), [selectedItemKey]: next }))
                                // Remove from list immediately.
                                setItems(prev => (prev || []).filter(m => m.id !== selected.id))
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

                        {redoFeedback?.ok && (
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                            <button className="btn btn-outline" onClick={() => setSelected(null)}>Back to list</button>
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
