import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import PDFPage from '../components/PDFPage.jsx'
import {
  MODULES, MODULE_ORDER, PDF_PAGE_MAP,
  ANSWER_KEY, FREE_RESPONSE, calcWeakTopics, rawToScaled, scoreSection
} from '../data/testData.js'

const PDF_URL = '/practice-test-11.pdf'

function Timer({ seconds, onExpire, onTick }) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [hidden, setHidden] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    setTimeLeft(seconds)
    if (onTick) onTick(seconds)
  }, [seconds])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(intervalRef.current); onExpire(); return 0 }
        if (onTick) onTick(t - 1)
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [onExpire, onTick])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isWarning = timeLeft <= 300 // 5 min warning
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <div className={`timer-display${isWarning ? ' warning' : ''}`} onClick={() => setHidden(h => !h)} title="Click to hide/show">
      <span className="timer-icon">⏱</span>
      {hidden ? '--:--' : formatted}
    </div>
  )
}

function BreakScreen({ nextModule, onContinue }) {
  const [breakTime, setBreakTime] = useState(600) // 10 min break
  useEffect(() => {
    const iv = setInterval(() => setBreakTime(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(iv)
  }, [])
  const mins = Math.floor(breakTime / 60)
  const secs = breakTime % 60
  return (
    <div className="break-screen">
      <div style={{ fontSize: 64, marginBottom: 16 }}>☕</div>
      <div className="break-title">Section Break</div>
      <div className="break-sub">
        Take a 10-minute break. Next up: {MODULES[nextModule]?.label} – {MODULES[nextModule]?.module}
      </div>
      <div className="break-timer" style={{ color: breakTime <= 120 ? '#ef4444' : '#1a2744' }}>
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
      <button className="btn btn-primary" style={{ marginTop: 32, padding: '14px 40px', fontSize: 16 }} onClick={onContinue}>
        Start Next Module →
      </button>
      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>You can also start early by clicking the button above</p>
    </div>
  )
}

export default function TestTaking() {
  const { attemptId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentModule, setCurrentModule] = useState('rw_m1')
  const [currentQ, setCurrentQ] = useState(1)
  const [answers, setAnswers] = useState({}) // { rw_m1: { 1: 'A', 2: 'C', ... }, ... }
  const [markedForReview, setMarkedForReview] = useState({}) // { rw_m1: [2, 5], ... }
  const [moduleTimeLeft, setModuleTimeLeft] = useState({})
  const [timerLeft, setTimerLeft] = useState(null)
  const [showBreak, setShowBreak] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const saveTimer = useRef(null)

  useEffect(() => {
    if (!supabase || !user?.id) return
    supabase.from('test_attempts').select('*').eq('id', attemptId).eq('user_id', user.id).single()
      .then(({ data }) => {
        if (!data) { navigate('/dashboard'); return }
        if (data.is_sandbox) {
          // Sandbox attempts are for admin testing and should not persist across sessions.
          // We allow completing/viewing within the session, but they won't show on dashboards.
        }
        if (data.completed_at) { navigate(`/results/${attemptId}`); return }
        setAttempt(data)
        setCurrentModule(data.current_section || 'rw_m1')
        setAnswers(data.answers || {})
        setModuleTimeLeft(data.module_time_remaining || { rw_m1: 1920, rw_m2: 1920, math_m1: 2100, math_m2: 2100 })
        setLoading(false)
      })
  }, [attemptId, user?.id, navigate])

  const saveProgress = useCallback(async (updatedAnswers, mod, timeRemaining) => {
    if (!attemptId) return
    await supabase.from('test_attempts').update({
      current_section: mod,
      answers: updatedAnswers,
      module_time_remaining: timeRemaining,
    }).eq('id', attemptId)
  }, [attemptId])

  // Debounced auto-save
  function triggerSave(updatedAnswers, mod, timeRem) {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => saveProgress(updatedAnswers, mod, timeRem), 2000)
  }

  function setAnswer(qNum, value) {
    const updated = {
      ...answers,
      [currentModule]: { ...(answers[currentModule] || {}), [qNum]: value }
    }
    setAnswers(updated)
    triggerSave(updated, currentModule, moduleTimeLeft)
  }

  function toggleMark(qNum) {
    setMarkedForReview(prev => {
      const list = prev[currentModule] || []
      return { ...prev, [currentModule]: list.includes(qNum) ? list.filter(q => q !== qNum) : [...list, qNum] }
    })
  }

  async function advanceModule() {
    const idx = MODULE_ORDER.indexOf(currentModule)
    if (idx >= MODULE_ORDER.length - 1) {
      await submitTest()
    } else {
      const nextMod = MODULE_ORDER[idx + 1]
      // Show break between sections
      if (currentModule === 'rw_m2' && nextMod === 'math_m1') {
        setShowBreak(true)
      } else {
        setCurrentModule(nextMod)
        setCurrentQ(1)
        await saveProgress(answers, nextMod, moduleTimeLeft)
      }
    }
  }

  function startNextModule() {
    const idx = MODULE_ORDER.indexOf(currentModule)
    const nextMod = MODULE_ORDER[idx + 1]
    setShowBreak(false)
    setCurrentModule(nextMod)
    setCurrentQ(1)
    saveProgress(answers, nextMod, moduleTimeLeft)
  }

  async function submitTest() {
    setSubmitting(true)
    const rwM1 = scoreSection('rw_m1', answers.rw_m1)
    const rwM2 = scoreSection('rw_m2', answers.rw_m2)
    const mM1 = scoreSection('math_m1', answers.math_m1)
    const mM2 = scoreSection('math_m2', answers.math_m2)
    const rawRW = rwM1.correct + rwM2.correct
    const rawMath = mM1.correct + mM2.correct
    const scores = rawToScaled(rawRW, rawMath)
    const weakTopics = calcWeakTopics(answers)

    await supabase.from('test_attempts').update({
      completed_at: new Date().toISOString(),
      answers,
      scores,
      weak_topics: weakTopics.slice(0, 15),
    }).eq('id', attemptId)

    navigate(`/results/${attemptId}`)
  }

  function handleTimerExpire() {
    advanceModule()
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Sora,sans-serif', color: '#64748b' }}>
      Loading test…
    </div>
  )

  if (showBreak) {
    const idx = MODULE_ORDER.indexOf(currentModule)
    const nextMod = MODULE_ORDER[idx + 1]
    return <BreakScreen nextModule={nextMod} onContinue={startNextModule} />
  }

  const mod = MODULES[currentModule]
  const totalQ = mod.questions
  const pageMap = PDF_PAGE_MAP[currentModule] || {}
  const pdfPage = pageMap[currentQ] ?? 0
  const modAnswers = answers[currentModule] || {}
  const currentAnswer = modAnswers[currentQ]
  const markedList = markedForReview[currentModule] || []
  const isMarked = markedList.includes(currentQ)
  const isFR = (FREE_RESPONSE[currentModule] || []).includes(currentQ)
  const isLastQ = currentQ === totalQ
  const isLastModule = MODULE_ORDER.indexOf(currentModule) === MODULE_ORDER.length - 1
  const choices = ['A', 'B', 'C', 'D']

  const moduleTotalTime = mod.time
  const currentLeft = timerLeft ?? (moduleTimeLeft[currentModule] || moduleTotalTime)
  const elapsed = Math.max(0, moduleTotalTime - currentLeft)
  const secPerQ = moduleTotalTime / totalQ
  const targetElapsed = (currentQ - 1) * secPerQ
  const delta = Math.round(targetElapsed - elapsed) // + means ahead, - means behind
  const paceLabel = (() => {
    const abs = Math.abs(delta)
    const mm = Math.floor(abs / 60)
    const ss = abs % 60
    const fmt = `${mm}:${String(ss).padStart(2, '0')}`
    if (abs < 10) return 'On pace'
    return delta > 0 ? `Ahead by ${fmt}` : `Behind by ${fmt}`
  })()

  return (
    <div className="test-layout">
      {/* Header */}
      <div className="test-header">
        <div className="test-header-left">
          <div className="test-section-label">{mod.section} · SAT Practice Test #11</div>
          <div className="test-module-label">{mod.label} — {mod.module}</div>
        </div>
        <Timer
          key={currentModule}
          seconds={moduleTimeLeft[currentModule] || mod.time}
          onExpire={handleTimerExpire}
          onTick={(t) => setTimerLeft(t)}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, minWidth: 160 }}>
          <div style={{
            fontSize: 12,
            fontWeight: 800,
            color: paceLabel === 'On pace' ? 'rgba(255,255,255,.75)' : (delta > 0 ? '#86efac' : '#fecaca'),
            background: 'rgba(255,255,255,.08)',
            border: '1px solid rgba(255,255,255,.14)',
            padding: '6px 10px',
            borderRadius: 999,
            lineHeight: 1,
            whiteSpace: 'nowrap'
          }}>
            {paceLabel}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', fontWeight: 700 }}>
            Target: {Math.floor(targetElapsed / 60)}:{String(Math.round(targetElapsed % 60)).padStart(2, '0')} by Q{currentQ}
          </div>
        </div>
        <div className="test-header-right">
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>
            {Object.keys(modAnswers).length}/{totalQ} answered
          </div>
          {isLastModule && (
            <button className="btn" onClick={submitTest} disabled={submitting}
              style={{ background: '#f59e0b', color: '#1a2744', fontWeight: 700, padding: '7px 16px', fontSize: 13 }}>
              {submitting ? 'Submitting…' : '📊 Submit Test'}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="test-body">
        {/* PDF Panel */}
        <div className="test-pdf-panel">
          <div style={{ width: '100%', maxWidth: 760 }}>
            <PDFPage pdfUrl={PDF_URL} pageIndex={pdfPage} />
          </div>
        </div>

        {/* Answer Panel */}
        <div className="test-answer-panel">
          {/* Q Navigator */}
          <div className="q-navigator">
            {Array.from({ length: totalQ }, (_, i) => i + 1).map(n => {
              const isAnswered = !!modAnswers[n]
              const isMrk = markedList.includes(n)
              const isCurr = n === currentQ
              return (
                <button key={n} className={`q-nav-btn${isCurr ? ' current' : ''}${isAnswered ? ' answered' : ''}${isMrk ? ' marked' : ''}`}
                  onClick={() => setCurrentQ(n)} title={`Q${n}${isMrk ? ' ★' : ''}${isAnswered ? ' ✓' : ''}`}>
                  {n}
                </button>
              )
            })}
          </div>

          {/* Panel header */}
          <div className="answer-panel-header">
            <div className="q-label">Question {currentQ}</div>
            <div className="q-counter">{mod.label} · {mod.module}</div>
            <button className={`mark-review-btn${isMarked ? ' marked' : ''}`} onClick={() => toggleMark(currentQ)}>
              {isMarked ? '★ Marked for Review' : '☆ Mark for Review'}
            </button>
          </div>

          {/* Answer choices */}
          <div className="answer-choices">
            {isFR ? (
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>
                  Enter your answer (numbers only):
                </div>
                <input
                  type="text"
                  className="free-response-input"
                  placeholder="Your answer"
                  value={currentAnswer || ''}
                  onChange={e => setAnswer(currentQ, e.target.value)}
                  autoComplete="off"
                />
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
                  Decimals OK. Enter as fraction (1/2) or decimal (.5)
                </div>
              </div>
            ) : (
              choices.map(letter => (
                <button
                  key={letter}
                  className={`choice-btn${currentAnswer === letter ? ' selected' : ''}`}
                  onClick={() => setAnswer(currentQ, letter)}
                >
                  <span className="choice-letter">{letter}</span>
                  <span style={{ paddingTop: 4, fontWeight: 800 }}>Choose {letter}</span>
                </button>
              ))
            )}
          </div>

          {/* Navigation */}
          <div className="answer-panel-footer">
            <div className="nav-btns">
              <button className="nav-btn nav-btn-back" onClick={() => setCurrentQ(q => Math.max(1, q - 1))} disabled={currentQ === 1}>
                ← Back
              </button>
              {isLastQ ? (
                <button className="nav-btn nav-btn-submit" onClick={advanceModule} disabled={submitting}>
                  {isLastModule ? (submitting ? 'Submitting…' : 'Submit Test ✓') : 'End Module →'}
                </button>
              ) : (
                <button className="nav-btn nav-btn-next" onClick={() => setCurrentQ(q => Math.min(totalQ, q + 1))}>
                  Next →
                </button>
              )}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>
              {currentQ}/{totalQ}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
