import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { CHAPTERS, freeResponseMatches } from '../data/testData.js'
import { GUIDE_CONTENT } from '../data/guideContent.js'
import { getStudiedTopics, setStudiedTopic, setChapterGuidePractice, markChapterGuideStarted } from '../lib/studyProgress.js'

function Navbar() {
  return (
    <nav className="nav">
      <a className="nav-brand" href="/dashboard">The Agora <span>Project</span></a>
      <div className="nav-actions">
        <Link to="/guide" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.85)', borderColor: 'rgba(255,255,255,.22)', background: 'rgba(255,255,255,.08)' }}>
          Study Guide
        </Link>
        <Link to="/dashboard" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
          ← Dashboard
        </Link>
      </div>
    </nav>
  )
}

function DomainList({ domains, selectedId, onSelect, completedMap, practiceByChapter }) {
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
              const practice = practiceByChapter?.[ch.id] || {}
              const guideMap = extractGuideMap(practice)
              const correctCount = Object.values(guideMap || {}).filter(Boolean).length
              const started = Boolean(practice?.meta?.guide_started_at) || Object.keys(guideMap || {}).length > 0
              const inProgress = !done && started
              const status = done ? 'Completed' : inProgress ? 'In progress' : 'Not started'
              const statusColor = done ? '#10b981' : inProgress ? '#f59e0b' : '#ef4444'
              const statusBg = done ? 'rgba(16,185,129,.10)' : inProgress ? 'rgba(245,158,11,.12)' : 'rgba(239,68,68,.10)'
              const statusBorder = done ? 'rgba(16,185,129,.25)' : inProgress ? 'rgba(245,158,11,.35)' : 'rgba(239,68,68,.25)'
              return (
                <button
                  key={ch.id}
                  onClick={() => onSelect(ch.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: selectedId === ch.id ? '2px solid #f59e0b' : `1.5px solid ${statusBorder}`,
                    background: hasGuide ? statusBg : 'white',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 900, color: '#1a2744', flex: '1 1 auto', minWidth: 0, overflowWrap: 'anywhere', lineHeight: 1.25 }}>
                      Ch {ch.id}: {ch.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      {hasGuide && (
                        <span style={{
                          fontSize: 11,
                          fontWeight: 900,
                          padding: '3px 10px',
                          borderRadius: 999,
                          background: 'rgba(255,255,255,.7)',
                          border: `1px solid ${statusBorder}`,
                          color: statusColor,
                          whiteSpace: 'nowrap',
                        }}>
                          {status}
                        </span>
                      )}
                      <div style={{ fontSize: 12, lineHeight: 1 }}>
                        {done ? '✅' : inProgress ? '🟡' : hasGuide ? '🔴' : '⏳'}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: '#64748b' }}>{ch.domain} · Playbook p.{ch.page}</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: hasGuide ? '#10b981' : '#94a3b8', fontWeight: 800 }}>
                    {hasGuide ? 'Full guide + practice' : 'Guide coming soon'}
                  </div>
                  {hasGuide && (
                    <div style={{ marginTop: 8, fontSize: 11, color: '#64748b', fontWeight: 800 }}>
                      Practice: {Math.min(25, correctCount)}/25 correct
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function hashString(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

function seededShuffle(arr, seed) {
  const out = arr.slice()
  let x = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5
    const j = Math.abs(x) % (i + 1)
    const tmp = out[i]; out[i] = out[j]; out[j] = tmp
  }
  return out
}

function buildHintLadder(concepts, seed, isMC) {
  const bodies = (concepts || []).map(c => c.body).filter(Boolean)
  const defaults = isMC
    ? [
      'Re-read the question and predict what the correct answer should DO before looking at choices.',
      'Eliminate 2 choices by matching the logic and tone of the sentence, then re-check the remaining two.',
    ]
    : [
      'Write down what the question is asking for (the exact value/expression). Keep units and words out of your final answer.',
      'Check your algebra carefully, then verify with a quick plug-in or estimate to see if your answer makes sense.',
    ]

  const shuffled = bodies.length ? seededShuffle(bodies, seed) : defaults
  const step1 = shuffled[0] || defaults[0]
  const step2 = shuffled[1] || defaults[1]
  const step3 = isMC
    ? 'Example workflow: (1) Underline the contrast/continuation words, (2) eliminate two choices with one-sentence reasons, (3) plug the remaining choice back into the sentence/passage and read it aloud.'
    : 'Example format: give a simplified value like `3/2`, `0.75`, or `pi/4`. Use `pi` (or `π`) for π, and use `^` for exponents (e.g., `2^3`).'
  return [step1, step2, step3]
}

function extractGuideMap(practice) {
  if (!practice || typeof practice !== 'object') return {}
  if (practice.guide && typeof practice.guide === 'object') return practice.guide
  // Legacy format: practice stored directly as { [idx]: true } (numeric keys).
  const keys = Object.keys(practice || {})
  const looksLikeLegacy = keys.length > 0 && keys.every(k => /^\d+$/.test(String(k)))
  if (looksLikeLegacy) return practice
  // If the row only has test metadata (ex: practice.test.correct/total), that does NOT mean the guide is in progress.
  return {}
}

function PracticeProblem({ problem, idx, onAnswered, answered, concepts }) {
  const [choice, setChoice] = useState(null)
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [hintStep, setHintStep] = useState(0)

  useEffect(() => {
    setChoice(null)
    setText('')
    setShow(false)
    setReveal(false)
    setHintStep(0)
  }, [problem?.q])

  const isMC = Boolean(problem?.choices)
  const correctOrig = String(problem?.correct || '').toUpperCase()
  const qSeed = hashString(`${problem?.q || ''}::${idx}`)

  const shuffledChoices = useMemo(() => {
    if (!isMC) return null
    const original = Object.entries(problem.choices || {}) // [['A','text'],...]
    const order = seededShuffle(original, qSeed)
    const labels = ['A', 'B', 'C', 'D']
    const mapped = order.map(([origKey, text], i) => ({ label: labels[i], origKey, text }))
    const correctLabel = mapped.find(m => m.origKey === correctOrig)?.label || null
    return { mapped, correctLabel }
  }, [isMC, problem?.q])

  const isCorrect = show && (
    isMC
      ? (choice && shuffledChoices?.correctLabel && choice === shuffledChoices.correctLabel)
      : (text.trim().length > 0 && freeResponseMatches(text, problem?.correct))
  )
  const ladder = useMemo(() => buildHintLadder(concepts, qSeed, isMC), [concepts, qSeed, isMC])

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
        <div style={{ fontWeight: 800, color: '#1a2744' }}>Practice {idx + 1}</div>
        <div style={{ fontSize: 12, color: answered ? '#10b981' : '#94a3b8', fontWeight: 800 }}>
          {answered ? 'Completed' : 'Not completed'}
        </div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: '#0f172a', whiteSpace: 'pre-line' }}>{problem?.q}</div>
      <div style={{ marginTop: 10, fontSize: 12, color: '#94a3b8' }}>
        Pick your answer, then click <b>Check</b> to submit it.
      </div>
      {isMC && (
        <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
          {(shuffledChoices?.mapped || []).map(({ label, text }) => (
            <button
              key={label}
              onClick={() => {
                setChoice(label)
                // Require clicking "Check" to evaluate (changing the choice should clear prior feedback).
                setShow(false)
                setReveal(false)
                setHintStep(0)
              }}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 10,
                border: choice === label ? '2px solid #1a2744' : '1px solid #e2e8f0',
                background: '#f8fafc',
                cursor: 'pointer',
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              <span style={{ fontWeight: 900, marginRight: 8 }}>{label}.</span> {text}
            </button>
          ))}
        </div>
      )}
      {!isMC && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Open response: enter only the value/expression. Examples: <code>75</code>, <code>1/2</code>, <code>0.5</code>, <code>pi</code>, <code>3*pi/2</code>, <code>2^3</code>.
          </div>
          <input
            type="text"
            className="free-response-input"
            placeholder="Your answer"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              // Require clicking "Check" to evaluate.
              setShow(false)
              setReveal(false)
              setHintStep(0)
            }}
            autoComplete="off"
          />
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}>
        <button
          className="btn btn-primary"
          style={{ padding: '8px 14px', fontSize: 13 }}
          onClick={() => {
            if (isMC && !choice) return
            if (!isMC && !text.trim()) return
            const ok = isMC ? (choice === shuffledChoices?.correctLabel) : freeResponseMatches(text, problem?.correct)
            setShow(true)
            setHintStep(0)
            if (ok) onAnswered(true)
          }}
        >
          Check (submit) →
        </button>
        {show && !isCorrect && (
          <button
            className="btn btn-outline"
            style={{ padding: '8px 14px', fontSize: 13 }}
            onClick={() => { setChoice(null); setShow(false); setReveal(false) }}
          >
            Try again
          </button>
        )}
        {show && (
          <div style={{ fontSize: 12, fontWeight: 800, color: isCorrect ? '#10b981' : '#ef4444' }}>
            {isCorrect ? '✅ Correct' : `❌ Not quite`}
          </div>
        )}
      </div>
      {show && !isCorrect && (
        <div style={{ marginTop: 10, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: 12, fontSize: 13, lineHeight: 1.65, color: '#7c2d12' }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Hint ladder (no answer given)</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className="btn btn-outline"
                style={{ padding: '7px 12px', fontSize: 12 }}
                onClick={() => setHintStep(s => Math.max(s, n))}
              >
                Hint {n}
              </button>
            ))}
            <button
              className="btn btn-outline"
              style={{ padding: '7px 12px', fontSize: 12 }}
              onClick={() => setReveal(true)}
              title="This explanation may reveal the correct answer—use after you’ve tried the hints."
            >
              Reveal explanation
            </button>
          </div>
          <ul style={{ marginLeft: 18 }}>
            {ladder.slice(0, hintStep).map((h, i) => <li key={i} style={{ marginBottom: 6 }}>{h}</li>)}
            {hintStep === 0 && <li style={{ marginBottom: 6 }}>Start with Hint 1.</li>}
          </ul>
        </div>
      )}
      {(reveal || isCorrect) && (
        <div style={{ marginTop: 10, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, fontSize: 13, lineHeight: 1.6, color: '#334155' }}>
          <strong>Explanation:</strong> {problem?.exp}
        </div>
      )}
    </div>
  )
}

export default function Guide() {
  const { user } = useAuth()
  const location = useLocation()
  const [selectedId, setSelectedId] = useState(null)
  const [completedMap, setCompletedMap] = useState({})
  const [practiceByChapter, setPracticeByChapter] = useState({})

  useEffect(() => {
    const sp = new URLSearchParams(location.search || '')
    const id = sp.get('chapter')
    if (id && CHAPTERS[id]) setSelectedId(id)
  }, [location.search])

  useEffect(() => {
    if (!user?.id) return
    getStudiedTopics(user.id).then(({ map, practiceByChapter }) => {
      setCompletedMap(map || {})
      setPracticeByChapter(practiceByChapter || {})
    })
  }, [user?.id])

  useEffect(() => {
    if (!user?.id || !selectedId) return
    const existingPractice = practiceByChapter?.[selectedId] || {}
    if (existingPractice?.meta?.guide_started_at) return
    // Mark the chapter as "started" so the dashboard list reflects In progress only after opening it.
    markChapterGuideStarted(user.id, selectedId, existingPractice).catch(() => {})
    setPracticeByChapter(prev => {
      const base = prev?.[selectedId] && typeof prev[selectedId] === 'object' ? prev[selectedId] : {}
      const meta = base.meta && typeof base.meta === 'object' ? base.meta : {}
      return { ...(prev || {}), [selectedId]: { ...base, meta: { ...meta, guide_started_at: new Date().toISOString() } } }
    })
  }, [user?.id, selectedId])

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
  const selectedPractice = selectedId ? (practiceByChapter[selectedId] || {}) : {}
  const selectedGuideMap = selectedId ? extractGuideMap(selectedPractice) : {}

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar />
      <div className="page fade-up">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
	          <div>
	            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 900, color: '#1a2744' }}>📖 Study Guide</h1>
	            <div style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
	              Work through chapters, complete practice, and mark each chapter done. To mark a chapter complete, you must get all 25 practice questions correct.
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
          <DomainList domains={domains} selectedId={selectedId} onSelect={setSelectedId} completedMap={completedMap} practiceByChapter={practiceByChapter} />
        ) : (
          <div>
            <button onClick={() => setSelectedId(null)} className="btn btn-outline" style={{ marginBottom: 14 }}>
              ← Back to Study Guide
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
	                  const allCorrect = expandedProblems.length > 0 && expandedProblems.every((_, i) => Boolean(selectedGuideMap[i]))
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
	                    {Object.values(selectedGuideMap || {}).filter(Boolean).length}/{expandedProblems.length} correct
	                  </div>
	                </div>
	                <div style={{ display: 'grid', gap: 12 }}>
	                  {expandedProblems.map((p, idx) => (
	                    <PracticeProblem
                      key={idx}
	                      idx={idx}
	                      problem={p}
	                      concepts={content.concepts}
	                      answered={Boolean(selectedGuideMap[idx])}
	                      onAnswered={async (correct) => {
	                        if (!correct) return
	                        const existingPractice = practiceByChapter[selectedId] || {}
	                        const existingGuide = extractGuideMap(existingPractice)
	                        const nextGuide = { ...existingGuide, [idx]: true }
	                        const nextPractice = { ...(existingPractice && typeof existingPractice === 'object' ? existingPractice : {}), guide: nextGuide }
	                        setPracticeByChapter(prev => ({ ...prev, [selectedId]: nextPractice }))
	                        await setChapterGuidePractice(user.id, selectedId, nextGuide, existingPractice)
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
