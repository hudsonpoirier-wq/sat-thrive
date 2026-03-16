import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { CHAPTERS } from '../data/testData.js'
import { GUIDE_CONTENT } from '../data/guideContent.js'
import { getStudiedTopics, setStudiedTopic, setChapterPractice } from '../lib/studyProgress.js'

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

function DomainList({ domains, selectedId, onSelect, completedMap }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {Object.entries(domains).map(([domain, chs]) => (
        <div key={domain}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 8 }}>
            {domain}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 10 }}>
            {chs.map(ch => {
              const hasGuide = Boolean(GUIDE_CONTENT[ch.id])
              const done = Boolean(completedMap[ch.id])
              return (
                <button
                  key={ch.id}
                  onClick={() => onSelect(ch.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: selectedId === ch.id ? '2px solid #f59e0b' : '1.5px solid #e2e8f0',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ fontWeight: 800, color: '#1a2744' }}>Ch {ch.id}: {ch.name}</div>
                    <div style={{ fontSize: 12 }}>
                      {done ? '✅' : hasGuide ? '📘' : '⏳'}
                    </div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: '#64748b' }}>{ch.domain} · Playbook p.{ch.page}</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: hasGuide ? '#10b981' : '#94a3b8', fontWeight: 800 }}>
                    {hasGuide ? 'Full guide + practice' : 'Guide coming soon'}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function PracticeProblem({ problem, idx, onAnswered, answered }) {
  const [choice, setChoice] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setChoice(null)
    setShow(false)
  }, [problem?.q])

  const isMC = Boolean(problem?.choices)
  const correct = problem?.correct
  const isCorrect = show && choice && String(choice).toUpperCase() === String(correct).toUpperCase()

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
        <div style={{ fontWeight: 800, color: '#1a2744' }}>Practice {idx + 1}</div>
        <div style={{ fontSize: 12, color: answered ? '#10b981' : '#94a3b8', fontWeight: 800 }}>
          {answered ? 'Completed' : 'Not completed'}
        </div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: '#0f172a', whiteSpace: 'pre-line' }}>{problem?.q}</div>
      {isMC && (
        <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
          {Object.entries(problem.choices).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setChoice(k)}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 10,
                border: choice === k ? '2px solid #1a2744' : '1px solid #e2e8f0',
                background: '#f8fafc',
                cursor: 'pointer',
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              <span style={{ fontWeight: 900, marginRight: 8 }}>{k}.</span> {v}
            </button>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}>
        <button
          className="btn btn-primary"
          style={{ padding: '8px 14px', fontSize: 13 }}
          onClick={() => {
            if (isMC && !choice) return
            const ok = isMC
              ? (String(choice).toUpperCase() === String(correct).toUpperCase())
              : true
            setShow(true)
            onAnswered(ok)
          }}
        >
          Check Answer →
        </button>
        {show && (
          <div style={{ fontSize: 12, fontWeight: 800, color: isCorrect ? '#10b981' : '#ef4444' }}>
            {isCorrect ? '✅ Correct' : `❌ Correct: ${correct}`}
          </div>
        )}
      </div>
      {show && (
        <div style={{ marginTop: 10, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, fontSize: 13, lineHeight: 1.6, color: '#334155' }}>
          <strong>Explanation:</strong> {problem?.exp}
        </div>
      )}
    </div>
  )
}

export default function Guide() {
  const { user } = useAuth()
  const [selectedId, setSelectedId] = useState(null)
  const [completedMap, setCompletedMap] = useState({})
  const [savedPracticeByChapter, setSavedPracticeByChapter] = useState({})

  useEffect(() => {
    if (!user?.id) return
    getStudiedTopics(user.id).then(({ map, practiceByChapter }) => {
      setCompletedMap(map || {})
      setSavedPracticeByChapter(practiceByChapter || {})
    })
  }, [user?.id])

  const domains = useMemo(() => {
    const grouped = {}
    Object.entries(CHAPTERS).forEach(([id, ch]) => {
      if (!grouped[ch.domain]) grouped[ch.domain] = []
      grouped[ch.domain].push({ id, ...ch })
    })
    for (const k of Object.keys(grouped)) grouped[k].sort((a, b) => String(a.id).localeCompare(String(b.id)))
    return grouped
  }, [])

  const ch = selectedId ? CHAPTERS[selectedId] : null
  const content = selectedId ? GUIDE_CONTENT[selectedId] : null
  const problems = content?.problems || []
  const expandedProblems = useMemo(() => {
    if (!problems.length) return []
    const out = []
    for (let i = 0; i < 25; i++) {
      const base = problems[i % problems.length]
      out.push({ ...base, q: i < problems.length ? base.q : `${base.q}\n\n(Variant ${i - problems.length + 1})` })
    }
    return out
  }, [problems])

  const completedCount = Object.values(completedMap).filter(Boolean).length
  const totalChapters = Object.keys(CHAPTERS).length
  const pct = Math.round((completedCount / Math.max(1, totalChapters)) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <Navbar />
      <div className="page fade-up">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744' }}>📖 Study Guide</h1>
            <div style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
              Work through chapters, complete practice, and mark each chapter done.
            </div>
          </div>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 14px', minWidth: 280 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', fontWeight: 800 }}>
              <span>Progress</span>
              <span>{completedCount}/{totalChapters}</span>
            </div>
            <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden', marginTop: 8 }}>
              <div style={{ height: '100%', width: `${pct}%`, background: '#10b981', transition: 'width .6s ease' }} />
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>{pct}% of chapters completed</div>
          </div>
        </div>

        {!selectedId ? (
          <DomainList domains={domains} selectedId={selectedId} onSelect={setSelectedId} completedMap={completedMap} />
        ) : (
          <div>
            <button onClick={() => setSelectedId(null)} className="btn btn-outline" style={{ marginBottom: 14 }}>
              ← Back to chapters
            </button>

            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 18, fontWeight: 900, color: '#1a2744' }}>
                    Chapter {selectedId}: {ch?.name}
                  </div>
                  <div style={{ marginTop: 6, color: '#64748b', fontSize: 13 }}>{ch?.domain} · Playbook p.{ch?.page}</div>
                </div>
                {(() => {
                  const saved = savedPracticeByChapter[selectedId] || {}
                  const allCorrect = expandedProblems.length > 0 && expandedProblems.every((_, i) => Boolean(saved[i]))
                  return (
                <button
                  className="btn"
                  disabled={!allCorrect && !completedMap[selectedId]}
                  style={{
                    opacity: (!allCorrect && !completedMap[selectedId]) ? .6 : 1,
                    cursor: (!allCorrect && !completedMap[selectedId]) ? 'not-allowed' : 'pointer',
                    background: completedMap[selectedId] ? '#10b981' : '#f59e0b',
                    color: '#1a2744',
                    fontWeight: 800
                  }}
                  onClick={async () => {
                    const next = !completedMap[selectedId]
                    if (next && !allCorrect) return
                    const updated = { ...completedMap, [selectedId]: next }
                    setCompletedMap(updated)
                    await setStudiedTopic(user.id, selectedId, next)
                  }}
                >
                  {completedMap[selectedId] ? '✅ Marked Complete' : 'Mark Chapter Complete'}
                </button>
                  )
                })()}
              </div>
            </div>

            {!content ? (
              <div className="card" style={{ padding: 18, color: '#64748b' }}>
                This chapter guide isn’t available yet.
              </div>
            ) : (
              <>
                <div className="card" style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 900, marginBottom: 10, color: '#1a2744' }}>Guide</div>
                  <div style={{ color: '#334155', lineHeight: 1.75, fontSize: 14, whiteSpace: 'pre-line' }}>
                    {content.intro}
                  </div>
                  <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                    {(content.concepts || []).map((c, i) => (
                      <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, background: '#f8fafc' }}>
                        <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>{c.title}</div>
                        <div style={{ color: '#334155', lineHeight: 1.65, fontSize: 13 }}>{c.body}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                  <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 900, color: '#1a2744' }}>🎯 Practice Problems</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
                    {Object.values(savedPracticeByChapter[selectedId] || {}).filter(Boolean).length}/{expandedProblems.length} correct
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {expandedProblems.map((p, idx) => (
                    <PracticeProblem
                      key={idx}
                      idx={idx}
                      problem={p}
                      answered={Boolean((savedPracticeByChapter[selectedId] || {})[idx])}
                      onAnswered={async (correct) => {
                        const next = { ...(savedPracticeByChapter[selectedId] || {}), [idx]: Boolean(correct) }
                        setSavedPracticeByChapter(prev => ({ ...prev, [selectedId]: next }))
                        await setChapterPractice(user.id, selectedId, next)
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
