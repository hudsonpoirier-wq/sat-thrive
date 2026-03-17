import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'

const FINAL_TEST_ID = 'final_test'
const FINAL_PDF_URL = '/final-test-questions.pdf'

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

function normalizeChoice(v) {
  return String(v || '').trim().toUpperCase()
}

export default function FinalTest() {
  const { user } = useAuth()
  const [keyRow, setKeyRow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)

  useEffect(() => {
    if (!supabase || !user?.id) return
    supabase.from('test_answer_keys').select('*').eq('test_id', FINAL_TEST_ID).single()
      .then(({ data }) => {
        setKeyRow(data || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user?.id])

  const answerKey = useMemo(() => (keyRow?.answer_key && typeof keyRow.answer_key === 'object') ? keyRow.answer_key : null, [keyRow])
  const qNums = useMemo(() => {
    if (!answerKey) return []
    const nums = Object.keys(answerKey)
      .map(k => parseInt(k, 10))
      .filter(n => Number.isFinite(n))
      .sort((a, b) => a - b)
    return nums
  }, [answerKey])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>
      Loading final test…
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar />
      <div className="page fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 20, fontWeight: 900, color: '#1a2744' }}>🏁 Final Test</h1>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
              Open the PDF and enter your answers below to score yourself.
            </div>
          </div>
          {score && (
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 14px', minWidth: 220 }}>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.6px' }}>Score</div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 26, fontWeight: 900, color: '#1a2744', marginTop: 4 }}>
                {score.correct}/{score.total}
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{score.pct}% correct</div>
            </div>
          )}
        </div>

        {!answerKey ? (
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, color: '#1a2744', marginBottom: 6 }}>Answer key not set yet</div>
            <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
              An admin needs to upload the final test answer key in the Admin panel before this can be scored.
            </div>
          </div>
        ) : (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ fontWeight: 900, color: '#1a2744' }}>Test PDF</div>
                <a className="btn btn-outline" href={FINAL_PDF_URL} target="_blank" rel="noreferrer">
                  Open PDF in new tab →
                </a>
              </div>
              <div style={{ marginTop: 12, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
                <iframe title="Final Test PDF" src={FINAL_PDF_URL} style={{ width: '100%', height: 640, border: 0 }} />
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <div style={{ fontWeight: 900, color: '#1a2744' }}>Answer Sheet</div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const total = qNums.length
                    let correct = 0
                    for (const n of qNums) {
                      if (normalizeChoice(answers[n]) === normalizeChoice(answerKey[n])) correct++
                    }
                    const pct = total ? Math.round((correct / total) * 100) : 0
                    setScore({ total, correct, pct })
                  }}
                >
                  Score my answers →
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 10 }}>
                {qNums.map((n) => (
                  <label key={n} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#64748b' }}>Q{n}</div>
                    <input
                      value={answers[n] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [n]: e.target.value }))}
                      placeholder="A-D"
                      maxLength={2}
                      style={{
                        padding: '10px 10px',
                        borderRadius: 12,
                        border: '1.5px solid #e2e8f0',
                        outline: 'none',
                        fontWeight: 900,
                        textAlign: 'center',
                        fontFamily: 'Sora,sans-serif',
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
