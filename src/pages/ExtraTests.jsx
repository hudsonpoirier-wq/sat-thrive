import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Icon from '../components/AppIcons.jsx'
import { getInitialPreferredExam } from '../lib/examChoice.js'
import { getTestsForExam, getExamFromTestId, normalizeTestId } from '../data/tests.js'
import { getExamConfig } from '../data/examData.js'
import { resolveViewContext, withExam, withViewUser } from '../lib/viewAs.js'
import { hasUnlockedResources } from '../lib/pretestGate.js'
import { supabase } from '../lib/supabase.js'

export default function ExtraTests() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const requestedExam = useMemo(() => String(new URLSearchParams(location.search).get('exam') || '').toLowerCase(), [location.search])
  const exam = requestedExam === 'act' || requestedExam === 'sat' ? requestedExam : getInitialPreferredExam(user)
  const examConfig = useMemo(() => getExamConfig(exam), [exam])
  const examTests = useMemo(() => getTestsForExam(exam), [exam])
  const { viewUserId, isAdminPreview } = useMemo(
    () => resolveViewContext({ userId: user?.id, profile, search: location.search }),
    [user?.id, profile, location.search]
  )
  const readOnlyView = isAdminPreview

  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState([])
  const [startingTest, setStartingTest] = useState(null)
  const [confirmTestId, setConfirmTestId] = useState(null)

  const extraTests = useMemo(() => examTests.filter(t => t.kind === 'extra'), [examTests])
  const hasTakenPretest = useMemo(() => {
    return attempts.some(a =>
      (a.completed_at || a.scores?.total || a.scores?.composite) &&
      normalizeTestId(a.test_id) === examConfig.preTestId
    )
  }, [attempts, examConfig.preTestId])

  useEffect(() => {
    if (!viewUserId || !supabase) { setLoading(false); return }
    let cancelled = false
    supabase
      .from('test_attempts')
      .select('id, test_id, completed_at, scores, current_module')
      .eq('user_id', viewUserId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!cancelled) {
          setAttempts((data || []).filter(a => getExamFromTestId(a.test_id) === exam))
          setLoading(false)
        }
      })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [viewUserId, exam])

  const completed = useMemo(() => attempts.filter(a => a.completed_at || a.scores?.total), [attempts])
  const inProgress = useMemo(() => attempts.filter(a => !a.completed_at && !a.scores?.total && a.current_module), [attempts])
  const completedExtra = completed.filter(a => extraTests.some(t => t.id === a.test_id))

  const viewHref = (path) => withViewUser(withExam(path, exam), viewUserId, isAdminPreview)

  async function startNewTest(testId) {
    if (readOnlyView || startingTest || !supabase || !user?.id) return
    setStartingTest(testId)
    try {
      const existing = await supabase
        .from('test_attempts')
        .select('id')
        .eq('user_id', user.id)
        .eq('test_id', testId)
        .is('completed_at', null)
        .order('created_at', { ascending: false })
        .limit(1)
      if (existing.data?.length) {
        navigate(`/test/${existing.data[0].id}`)
        return
      }
      const { data, error } = await supabase
        .from('test_attempts')
        .insert({ user_id: user.id, test_id: testId })
        .select('id')
        .single()
      if (error) throw error
      navigate(`/test/${data.id}`)
    } catch (err) {
      console.error('Failed to start test:', err)
      setStartingTest(null)
    }
  }

  if (loading) {
    return (
      <div className="app-layout has-sidebar">
        <Sidebar currentExam={exam} />
        <div className="page fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ color: '#94a3b8', fontSize: 15, fontWeight: 500 }}>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-layout has-sidebar">
      <Sidebar currentExam={exam} />
      <div className="page fade-up">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: 28 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(15,23,42,.3)',
              }}
            >
              <Icon name="test" size={22} style={{ color: '#fff' }} />
            </motion.div>
            <div>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: 26, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                Extra Tests
              </h1>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 1.6 }}>
                Optional {examConfig.label} practice tests to reinforce weak topics and track your improvement over time.
              </div>
            </div>
          </div>
        </motion.div>

        {!hasTakenPretest ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: 520, margin: '40px auto', textAlign: 'center',
              padding: '48px 32px', borderRadius: 20,
              background: '#fff', border: '1.5px solid rgba(14,165,233,.15)',
              boxShadow: '0 4px 24px rgba(14,165,233,.08)',
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(245,158,11,.3)', marginBottom: 16,
            }}>
              <Icon name="lock" size={28} style={{ color: '#fff' }} />
            </div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: 18, color: '#0f172a', marginBottom: 8 }}>
              Complete your Pre Test first
            </div>
            <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>
              Take the {examConfig.label} Pre Test to unlock extra practice tests.
              They'll help you target weak areas and measure your progress.
            </div>
            <button
              onClick={() => navigate(viewHref('/dashboard'))}
              style={{
                marginTop: 20, padding: '10px 24px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
                color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 3px 12px rgba(14,165,233,.3)',
              }}
            >
              Go to Dashboard
            </button>
          </motion.div>
        ) : (
          <>
            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              style={{
                display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20,
              }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 14px', borderRadius: 20,
                background: 'rgba(14,165,233,.08)', color: '#0369a1',
                fontSize: 12, fontWeight: 800,
              }}>
                {extraTests.length} test{extraTests.length !== 1 ? 's' : ''} available
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 14px', borderRadius: 20,
                background: completedExtra.length > 0 ? 'rgba(16,185,129,.08)' : 'rgba(148,163,184,.08)',
                color: completedExtra.length > 0 ? '#047857' : '#64748b',
                fontSize: 12, fontWeight: 800,
              }}>
                {completedExtra.length}/{extraTests.length} completed
              </span>
            </motion.div>

            {/* Test grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {extraTests.map((t, i) => {
                const done = completed.some(a => a.test_id === t.id)
                const prog = inProgress.find(a => a.test_id === t.id)
                const isConfirming = confirmTestId === t.id
                const isStarting = startingTest === t.id

                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    style={{
                      background: '#fff',
                      borderRadius: 18,
                      border: done ? '1.5px solid rgba(16,185,129,.25)' : '1.5px solid rgba(14,165,233,.12)',
                      padding: '24px',
                      boxShadow: '0 2px 12px rgba(15,23,42,.06)',
                      transition: 'all .2s ease',
                      display: 'flex', flexDirection: 'column', gap: 14,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 24px rgba(14,165,233,.12)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(15,23,42,.06)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: done
                            ? 'linear-gradient(135deg, #10b981, #059669)'
                            : 'linear-gradient(135deg, #0f172a, #1e3a8a)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Icon name={done ? 'check' : 'test'} size={20} style={{ color: '#fff' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 900, fontSize: 16, color: '#0f172a', lineHeight: 1.3 }}>
                            {t.label}
                          </div>
                          <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                            {examConfig.label} &middot; Full timed test
                          </div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 900, padding: '4px 10px', borderRadius: 999,
                        background: done ? 'rgba(16,185,129,.1)' : prog ? 'rgba(245,158,11,.1)' : 'rgba(148,163,184,.06)',
                        color: done ? '#10b981' : prog ? '#f59e0b' : '#94a3b8',
                        whiteSpace: 'nowrap',
                      }}>
                        {done ? 'COMPLETED' : prog ? 'IN PROGRESS' : 'OPTIONAL'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto' }}>
                      {prog ? (
                        <button
                          onClick={() => navigate(`/test/${prog.id}`)}
                          disabled={readOnlyView}
                          style={{
                            padding: '10px 20px', borderRadius: 12, border: 'none',
                            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                            color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                            boxShadow: '0 3px 12px rgba(245,158,11,.3)',
                          }}
                        >
                          Resume →
                        </button>
                      ) : !done ? (
                        <>
                          <button
                            onClick={() => setConfirmTestId(isConfirming ? null : t.id)}
                            disabled={readOnlyView || isStarting}
                            style={{
                              padding: '10px 20px', borderRadius: 12, border: 'none',
                              background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
                              color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                              boxShadow: '0 3px 12px rgba(14,165,233,.3)',
                              opacity: readOnlyView ? 0.5 : 1,
                            }}
                          >
                            {isStarting ? 'Starting...' : 'Start Test →'}
                          </button>
                        </>
                      ) : null}
                      {done && (
                        <button
                          onClick={() => {
                            const last = completed.find(a => a.test_id === t.id)
                            if (last) navigate(viewHref(`/results/${last.id}`))
                          }}
                          style={{
                            padding: '10px 20px', borderRadius: 12,
                            border: '1.5px solid rgba(14,165,233,.2)',
                            background: '#fff', color: '#0ea5e9',
                            fontSize: 13, fontWeight: 800, cursor: 'pointer',
                          }}
                        >
                          View Results →
                        </button>
                      )}
                      {!done && !prog && (
                        <a
                          href={t.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: '10px 16px', borderRadius: 12,
                            border: '1.5px solid rgba(148,163,184,.2)',
                            background: '#fff', color: '#64748b',
                            fontSize: 13, fontWeight: 700, cursor: 'pointer',
                            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5,
                          }}
                        >
                          <Icon name="eye" size={14} /> Preview PDF
                        </a>
                      )}
                    </div>

                    {isConfirming && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.25 }}
                        style={{
                          background: 'rgba(14,165,233,.04)',
                          border: '1px solid rgba(14,165,233,.12)',
                          borderRadius: 12, padding: 14,
                        }}
                      >
                        <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: 6, fontSize: 14 }}>
                          Start this test now?
                        </div>
                        <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                          This is a full timed {examConfig.label} test. Once you start, your timer runs. You can pause and resume later.
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                          <button
                            onClick={() => setConfirmTestId(null)}
                            style={{
                              padding: '8px 16px', borderRadius: 10,
                              border: '1.5px solid #e2e8f0', background: '#fff',
                              color: '#475569', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => { setConfirmTestId(null); startNewTest(t.id) }}
                            disabled={isStarting}
                            style={{
                              padding: '8px 16px', borderRadius: 10, border: 'none',
                              background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
                              color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(14,165,233,.3)',
                            }}
                          >
                            {isStarting ? 'Starting...' : 'Start'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {extraTests.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '48px 32px', borderRadius: 20,
                background: '#fff', border: '1.5px dashed rgba(148,163,184,.2)',
                color: '#64748b', fontSize: 14, lineHeight: 1.7,
              }}>
                No extra tests available for {examConfig.label} yet.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
