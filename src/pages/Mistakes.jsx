import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { MODULES, PDF_PAGE_MAP } from '../data/testData.js'
import { EXTRA_PDF_PAGE_MAPS } from '../data/extraPdfPageMaps.js'
import { getTestConfig } from '../data/tests.js'
import PDFPage from '../components/PDFPage.jsx'
import { loadMistakes, loadReviewItems, computeDueCount, updateMistakeNote } from '../lib/mistakesStore.js'

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

export default function Mistakes() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [reviewItems, setReviewItems] = useState({})
  const [selected, setSelected] = useState(null)
  const [filterDue, setFilterDue] = useState(false)
  const [savingId, setSavingId] = useState(null)

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
            <button className="btn btn-primary" onClick={() => navigate('/review')}>
              Review Due →
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
                        {m.chapter_id ? `Study Guide: Ch ${m.chapter_id}` : 'Study Guide: —'} · Your answer: <b>{String(m.given || '').trim() || '—'}</b>
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
                      <button className="btn btn-primary" onClick={() => navigate(`/review?item=${encodeURIComponent(`${selected.test_id}:${selected.section}:${selected.q_num}`)}`)}>
                        Review this →
                      </button>
                    </div>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
                    <PDFPage pdfUrl={selectedCfg?.pdfUrl || '/practice-test-11.pdf'} pageIndex={selectedPdfPage} />
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

