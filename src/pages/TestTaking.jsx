import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import PDFPage from '../components/PDFPage.jsx'
import {
  MODULES, MODULE_ORDER, PDF_PAGE_MAP,
  ANSWER_KEY, QUESTION_CHAPTER_MAP, CHAPTERS, rawToScaled, freeResponseMatches
} from '../data/testData.js'
import { getTestConfig } from '../data/tests.js'
import { extractAnswerKeyFromPdf } from '../lib/answerKeyExtract.js'
import { EXTRA_PDF_PAGE_MAPS } from '../data/extraPdfPageMaps.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { saveMistakes, ensureReviewItems } from '../lib/mistakesStore.js'

function isChoiceLetter(v) {
  const s = String(v || '').trim().toUpperCase()
  return s === 'A' || s === 'B' || s === 'C' || s === 'D'
}

function scoreFromKey(section, sectionAnswers, sectionKey) {
  const total = MODULES[section]?.questions || 0
  let correct = 0
  for (let q = 1; q <= total; q++) {
    const right = sectionKey?.[q]
    if (right == null) continue
    const given = sectionAnswers?.[q]
    const ok = isChoiceLetter(right)
      ? String(given || '').toUpperCase() === String(right).toUpperCase()
      : freeResponseMatches(given, right)
    if (ok) correct++
  }
  return { correct, total, wrong: total - correct }
}

function calcWeakTopicsFromKey(allAnswers, keyBySection) {
  const counts = {}
  Object.entries(allAnswers || {}).forEach(([section, sectionAnswers]) => {
    const key = keyBySection?.[section]
    const chMap = QUESTION_CHAPTER_MAP?.[section]
    if (!key || !chMap) return
    const total = MODULES[section]?.questions || 0
    for (let q = 1; q <= total; q++) {
      const given = sectionAnswers?.[q]
      const right = key?.[q]
      if (right == null) continue
      const ch = chMap?.[q]
      if (!ch) continue
      const ok = isChoiceLetter(right)
        ? String(given || '').toUpperCase() === String(right).toUpperCase()
        : freeResponseMatches(given, right)
      if (!ok) counts[ch] = (counts[ch] || 0) + 1
    }
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([ch, count]) => ({ ch, count, ...CHAPTERS[ch] }))
}

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
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [testConfig, setTestConfig] = useState(null)
  const [keyBySection, setKeyBySection] = useState(null)
  const [keyStatus, setKeyStatus] = useState({ loading: false, msg: '' })
  const [currentModule, setCurrentModule] = useState('rw_m1')
  const [currentQ, setCurrentQ] = useState(1)
  const [answers, setAnswers] = useState({}) // { rw_m1: { 1: 'A', 2: 'C', ... }, ... }
  const [markedForReview, setMarkedForReview] = useState({}) // { rw_m1: [2, 5], ... }
  const [moduleTimeLeft, setModuleTimeLeft] = useState({})
  const [timerLeft, setTimerLeft] = useState(null)
  const [showBreak, setShowBreak] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [pdfOffsetsByTest, setPdfOffsetsByTest] = useState({}) // { [testId]: { rw_m1: 0, ... } } (0-based page offsets)
  const [pdfOverridesByTest, setPdfOverridesByTest] = useState({}) // { [testId]: { rw_m1: { [qNum]: pageIndex }, ... } }
  const saveTimer = useRef(null)

  useEffect(() => {
    try {
      const rawV2 = localStorage.getItem('agora_pdf_offsets_v2')
      if (rawV2) { setPdfOffsetsByTest(JSON.parse(rawV2) || {}); return }
      const rawV1 = localStorage.getItem('agora_pdf_offsets_v1')
      if (rawV1) {
        const legacy = JSON.parse(rawV1) || {}
        setPdfOffsetsByTest({ pre_test: legacy })
      }
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('agora_pdf_offsets_v2', JSON.stringify(pdfOffsetsByTest || {})) } catch {}
  }, [pdfOffsetsByTest])

  useEffect(() => {
    try {
      const rawV2 = localStorage.getItem('agora_pdf_overrides_v2')
      if (rawV2) { setPdfOverridesByTest(JSON.parse(rawV2) || {}); return }
      const rawV1 = localStorage.getItem('agora_pdf_overrides_v1')
      if (rawV1) {
        const legacy = JSON.parse(rawV1) || {}
        setPdfOverridesByTest({ pre_test: legacy })
      }
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('agora_pdf_overrides_v2', JSON.stringify(pdfOverridesByTest || {})) } catch {}
  }, [pdfOverridesByTest])

  const currentTestId = attempt?.test_id || testConfig?.id || 'pre_test'
  const pdfOffsets = pdfOffsetsByTest?.[currentTestId] || {}
  const pdfOverrides = pdfOverridesByTest?.[currentTestId] || {}

  function setPdfOffsetFor(moduleId, nextOffset) {
    setPdfOffsetsByTest(prev => ({
      ...(prev || {}),
      [currentTestId]: { ...(prev?.[currentTestId] || {}), [moduleId]: nextOffset }
    }))
  }

  function setPdfOverrideFor(moduleId, qNum, pageIndex) {
    setPdfOverridesByTest(prev => ({
      ...(prev || {}),
      [currentTestId]: {
        ...(prev?.[currentTestId] || {}),
        [moduleId]: { ...(prev?.[currentTestId]?.[moduleId] || {}), [qNum]: pageIndex }
      }
    }))
  }

  function clearPdfOverrideFor(moduleId, qNum) {
    setPdfOverridesByTest(prev => {
      const next = { ...(prev || {}) }
      const mod = { ...(next?.[currentTestId]?.[moduleId] || {}) }
      delete mod[qNum]
      next[currentTestId] = { ...(next?.[currentTestId] || {}), [moduleId]: mod }
      return next
    })
  }

  useEffect(() => {
    if (!supabase || !user?.id) return
    supabase.from('test_attempts').select('*').eq('id', attemptId).eq('user_id', user.id).single()
      .then(({ data }) => {
        if (!data) { navigate('/dashboard'); return }
        if (data.completed_at) { navigate(`/results/${attemptId}`); return }
        setAttempt(data)
        const cfg = getTestConfig(data.test_id) || getTestConfig('pre_test')
        setTestConfig(cfg)
        setCurrentModule(data.current_section || 'rw_m1')
        setAnswers(data.answers || {})
        setModuleTimeLeft(data.module_time_remaining || { rw_m1: 1920, rw_m2: 1920, math_m1: 2100, math_m2: 2100 })
        setLoading(false)
      })
  }, [attemptId, user?.id, navigate])

  useEffect(() => {
    if (!supabase || !attempt?.test_id) return
    const cfg = getTestConfig(attempt.test_id) || getTestConfig('pre_test')
    const builtIn = getAnswerKeyBySection(cfg?.id)
    if (builtIn) {
      // Sanity check: optional tests must have a full 120-question key.
      if (cfg?.id && cfg.id !== 'pre_test' && builtIn?.rw_m1) {
        const total = Object.keys(builtIn.rw_m1 || {}).length
          + Object.keys(builtIn.rw_m2 || {}).length
          + Object.keys(builtIn.math_m1 || {}).length
          + Object.keys(builtIn.math_m2 || {}).length
        if (total < 110) {
          setKeyBySection(null)
          setKeyStatus({ loading: false, msg: 'Answer key is incomplete for this test build. Please contact the admin.' })
          return
        }
      }
      setKeyBySection(builtIn)
      setKeyStatus({ loading: false, msg: '' })
      return
    }

    const CACHE_KEY = 'agora_answer_keys_cache_v1'
    const readCache = (testId) => {
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        const obj = raw ? JSON.parse(raw) : {}
        return obj?.[testId] || null
      } catch {
        return null
      }
    }
    const writeCache = (testId, keyObj) => {
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        const obj = raw ? JSON.parse(raw) : {}
        obj[testId] = keyObj
        localStorage.setItem(CACHE_KEY, JSON.stringify(obj))
      } catch {}
    }

    const cached = readCache(cfg.id)
    if (cached) {
      setKeyBySection(cached)
      setKeyStatus({ loading: false, msg: '' })
      return
    }

    setKeyStatus({ loading: true, msg: 'Loading answer key…' })
    ;(async () => {
      // 1) Try Supabase (if the admin imported keys)
      try {
        const { data } = await supabase.from('test_answer_keys').select('*').eq('test_id', cfg.id).single()
        if (data?.answer_key) {
          setKeyBySection(data.answer_key)
          writeCache(cfg.id, data.answer_key)
          setKeyStatus({ loading: false, msg: '' })
          return
        }
      } catch {}

      // 2) Built-in fallback: parse the bundled AK PDF (no admin setup required)
      if (cfg.akUrl) {
        try {
          const res = await fetch(cfg.akUrl)
          if (!res.ok) throw new Error('Could not fetch bundled answer key.')
          const buf = new Uint8Array(await res.arrayBuffer())
          const parsed = await extractAnswerKeyFromPdf(buf)
          setKeyBySection(parsed)
          writeCache(cfg.id, parsed)
          setKeyStatus({ loading: false, msg: '' })
          return
        } catch (e) {
          setKeyBySection(null)
          setKeyStatus({ loading: false, msg: `Could not load answer key: ${e?.message || 'unknown error'}` })
          return
        }
      }

      setKeyBySection(null)
      setKeyStatus({ loading: false, msg: 'Missing answer key.' })
    })()
  }, [attempt?.test_id])

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
    const rwM1 = scoreFromKey('rw_m1', answers.rw_m1, keyBySection?.rw_m1)
    const rwM2 = scoreFromKey('rw_m2', answers.rw_m2, keyBySection?.rw_m2)
    const mM1 = scoreFromKey('math_m1', answers.math_m1, keyBySection?.math_m1)
    const mM2 = scoreFromKey('math_m2', answers.math_m2, keyBySection?.math_m2)
    const rawRW = (rwM1.correct || 0) + (rwM2.correct || 0)
    const rawMath = (mM1.correct || 0) + (mM2.correct || 0)
    const scores = rawToScaled(rawRW, rawMath)
    const weakTopics = calcWeakTopicsFromKey(answers, keyBySection || ANSWER_KEY)

    const up = await supabase.from('test_attempts').update({
      completed_at: new Date().toISOString(),
      answers,
      scores,
      // Store the full set so domain/topic charts are accurate (avoid truncating to top N).
      weak_topics: weakTopics.slice(0, 250),
    }).eq('id', attemptId)
    if (up.error) {
      alert(up.error.message || 'Could not submit test. Please try again.')
      setSubmitting(false)
      return
    }

    // Mistake notebook + spaced repetition queue (auto-save missed questions).
    try {
      const testId = attempt?.test_id || testConfig?.id || 'pre_test'
      const mistakes = []
      let attemptedTotal = 0
      let totalQuestions = 0
      for (const section of MODULE_ORDER) {
        const key = (keyBySection?.[section] || ANSWER_KEY?.[section] || {})
        const total = MODULES[section]?.questions || 0
        totalQuestions += total
        const sectionAnswers = answers?.[section] || {}
        for (let q = 1; q <= total; q++) {
          const right = key?.[q]
          if (right == null) continue
          const given = sectionAnswers?.[q]
          const attempted = String(given ?? '').trim().length > 0
          if (attempted) attemptedTotal += 1
          const ok = isChoiceLetter(right)
            ? String(given).toUpperCase() === String(right).toUpperCase()
            : freeResponseMatches(given, right)
          if (ok) continue
          if (!attempted) continue
          mistakes.push({
            test_id: testId,
            attempt_id: attemptId,
            section,
            q_num: q,
            given: String(given ?? ''),
            correct: String(right ?? ''),
            chapter_id: QUESTION_CHAPTER_MAP?.[section]?.[q] || null,
          })
        }
      }
      const includeUnanswered = attemptedTotal < Math.max(10, Math.round(totalQuestions * 0.25))
      if (includeUnanswered) {
        for (const section of MODULE_ORDER) {
          const key = (keyBySection?.[section] || ANSWER_KEY?.[section] || {})
          const total = MODULES[section]?.questions || 0
          const sectionAnswers = answers?.[section] || {}
          for (let q = 1; q <= total; q++) {
            const right = key?.[q]
            if (right == null) continue
            const given = sectionAnswers?.[q]
            const attempted = String(given ?? '').trim().length > 0
            if (attempted) continue
            mistakes.push({
              test_id: testId,
              attempt_id: attemptId,
              section,
              q_num: q,
              given: '',
              correct: String(right ?? ''),
              chapter_id: QUESTION_CHAPTER_MAP?.[section]?.[q] || null,
              note: 'Unanswered',
            })
          }
        }
      }

      const capped = mistakes.slice(0, 200)
      if (capped.length && user?.id) {
        const saved = await saveMistakes(user.id, capped)
        await ensureReviewItems(user.id, saved.items || capped)
      }
    } catch {}

    // Auto-check Study Guide chapters that were mastered on the test (all questions correct for that chapter).
    try {
      const nowIso = new Date().toISOString()
      const stats = {}
      for (const section of MODULE_ORDER) {
        const key = (keyBySection?.[section] || ANSWER_KEY?.[section] || {})
        const chMap = QUESTION_CHAPTER_MAP[section] || {}
        const total = MODULES[section]?.questions || 0
        const sectionAnswers = answers?.[section] || {}
        for (let q = 1; q <= total; q++) {
          const ch = chMap[q]
          const right = key[q]
          if (!ch || !right) continue
          if (!stats[ch]) stats[ch] = { total: 0, correct: 0, allCorrect: true }
          stats[ch].total += 1
          const given = sectionAnswers[q]
          const attempted = String(given ?? '').trim().length > 0
          const ok = attempted && (isChoiceLetter(right)
            ? String(given).toUpperCase() === String(right).toUpperCase()
            : freeResponseMatches(given, right))
          if (ok) stats[ch].correct += 1
          else stats[ch].allCorrect = false
        }
      }

      const chapters = Object.keys(stats)
      if (chapters.length) {
        const { data: existingRows } = await supabase
          .from('studied_topics')
          .select('chapter_id,completed,completed_at,practice')
          .eq('user_id', user.id)
          .in('chapter_id', chapters)

        const existingBy = {}
        for (const r of existingRows || []) existingBy[r.chapter_id] = r

        const upserts = chapters.map((chapterId) => {
          const s = stats[chapterId]
          const existing = existingBy[chapterId]
          const existingPractice = (existing?.practice && typeof existing.practice === 'object') ? existing.practice : {}
          const nextPractice = {
            ...existingPractice,
            test: {
              correct: s.correct,
              total: s.total,
              mastered: Boolean(s.allCorrect && s.total > 0),
              attempt_id: attemptId,
              updated_at: nowIso,
            }
          }
          const mastered = Boolean(s.allCorrect && s.total > 0)
          const completed = Boolean(existing?.completed || mastered)
          return {
            user_id: user.id,
            chapter_id: chapterId,
            completed,
            completed_at: completed ? (existing?.completed ? existing?.completed_at : nowIso) : null,
            practice: nextPractice,
            updated_at: nowIso,
          }
        })

        await supabase.from('studied_topics').upsert(upserts)
      }
    } catch {}

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

  if (keyStatus.loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Sora,sans-serif', color: '#64748b' }}>
        Loading answer key…
      </div>
    )
  }

  if (!keyBySection && keyStatus.msg) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#f1f5f9' }}>
        <div style={{ maxWidth: 720, width: '100%', background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
          <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Missing answer key</div>
          <div style={{ color: '#64748b', lineHeight: 1.6, fontSize: 14, marginBottom: 12 }}>
            {keyStatus.msg}
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      </div>
    )
  }

  if (showBreak) {
    const idx = MODULE_ORDER.indexOf(currentModule)
    const nextMod = MODULE_ORDER[idx + 1]
    return <BreakScreen nextModule={nextMod} onContinue={startNextModule} />
  }

  const mod = MODULES[currentModule]
  const totalQ = mod.questions
  const pageMap = (testConfig?.id === 'pre_test')
    ? (PDF_PAGE_MAP[currentModule] || {})
    : (EXTRA_PDF_PAGE_MAPS?.[testConfig?.id]?.[currentModule] || {})
  const basePdfPage = (() => {
    if (Number.isFinite(Number(pageMap?.[currentQ]))) return pageMap[currentQ]
    // Fallback: use the nearest previous mapped question page.
    for (let q = currentQ - 1; q >= 1; q--) {
      if (Number.isFinite(Number(pageMap?.[q]))) return pageMap[q]
    }
    return 0
  })()
  const pdfOffset = Number(pdfOffsets?.[currentModule] || 0)
  const overridePage = pdfOverrides?.[currentModule]?.[currentQ]
  const pdfPage = Math.max(0, Number.isFinite(Number(overridePage)) ? Number(overridePage) : (basePdfPage + pdfOffset))
  const modAnswers = answers[currentModule] || {}
  const currentAnswer = modAnswers[currentQ]
  const markedList = markedForReview[currentModule] || []
  const isMarked = markedList.includes(currentQ)
  const right = keyBySection?.[currentModule]?.[currentQ]
  const isFR = right != null && !isChoiceLetter(right)
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
	          <div className="test-section-label">{mod.section} · {testConfig?.label || 'Pre Test'}</div>
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
	            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
	              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 800 }}>
	                PDF page <span style={{ color: '#0f172a' }}>{pdfPage + 1}</span>
	                <span style={{ color: '#94a3b8', fontWeight: 700 }}>
	                  {Number.isFinite(Number(overridePage)) ? ' · (override)' : ` · offset ${pdfOffset >= 0 ? `+${pdfOffset}` : pdfOffset}`}
	                </span>
	              </div>
	              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <a
                    className="btn btn-outline"
                    style={{ padding: '6px 10px', fontSize: 12 }}
                    href={testConfig?.pdfUrl || '/practice-test-11.pdf'}
                    target="_blank"
                    rel="noreferrer"
                    title="Open the full test PDF in a new tab"
                  >
                    Open PDF →
                  </a>
                  {profile?.role === 'admin' && testConfig?.akUrl && (
                    <a
                      className="btn btn-outline"
                      style={{ padding: '6px 10px', fontSize: 12 }}
                      href={testConfig.akUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Admin-only: open the answer key PDF in a new tab"
                    >
                      Open AK →
                    </a>
                  )}
	                <button
	                  className="btn btn-outline"
	                  style={{ padding: '6px 10px', fontSize: 12 }}
	                  onClick={() => {
	                    const page = window.prompt('Set the PDF page number for this question (1-based):', String(pdfPage + 1))
	                    const n = Number(String(page || '').trim())
	                    if (!Number.isFinite(n) || n < 1) return
	                    const idx = Math.max(0, Math.floor(n - 1))
	                    setPdfOverrideFor(currentModule, currentQ, idx)
	                  }}
	                  title="If the mapping is glitchy, set an exact PDF page for this question"
	                >
	                  Set page
	                </button>
	                {Number.isFinite(Number(overridePage)) && (
	                  <button
	                    className="btn btn-outline"
	                    style={{ padding: '6px 10px', fontSize: 12 }}
	                    onClick={() => clearPdfOverrideFor(currentModule, currentQ)}
	                    title="Remove the per-question page override"
	                  >
	                    Clear override
	                  </button>
	                )}
	                <button
	                  className="btn btn-outline"
	                  style={{ padding: '6px 10px', fontSize: 12 }}
	                  onClick={() => setPdfOffsetFor(currentModule, Number(pdfOffsets?.[currentModule] || 0) - 1)}
	                  title="If the PDF is behind, decrease the offset"
	                >
	                  −1 page
	                </button>
	                <button
	                  className="btn btn-outline"
	                  style={{ padding: '6px 10px', fontSize: 12 }}
	                  onClick={() => setPdfOffsetFor(currentModule, Number(pdfOffsets?.[currentModule] || 0) + 1)}
	                  title="If the PDF is ahead, increase the offset"
	                >
	                  +1 page
	                </button>
	                <button
	                  className="btn btn-outline"
	                  style={{ padding: '6px 10px', fontSize: 12 }}
	                  onClick={() => setPdfOffsetFor(currentModule, 0)}
	                  title="Reset PDF alignment for this module"
	                >
	                  Reset
	                </button>
	              </div>
	            </div>
	            <PDFPage key={`${currentModule}:${pdfPage}`} pdfUrl={testConfig?.pdfUrl || '/practice-test-11.pdf'} pageIndex={pdfPage} />
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
                  Enter your answer (numbers or simple expressions):
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
                  Examples: <code>75</code>, <code>1/2</code>, <code>.5</code>, <code>pi</code> (or <code>π</code>), <code>2^3</code>, <code>3*pi/2</code>
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
