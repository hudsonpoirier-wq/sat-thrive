import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { getTestConfig } from '../data/tests.js'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'

const FINAL_TEST_ID = 'final_test'

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <BrandLink />
      <div className="nav-actions">
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
          style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.08)' }}
          title="Go back"
        >
          <Icon name="back" size={15} />
          Back
        </button>
        <Link
          to="/dashboard"
          className="btn btn-outline"
          style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  )
}

export default function FinalTest() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const cfg = getTestConfig(FINAL_TEST_ID)

  const [loading, setLoading] = useState(true)
  const [inProgress, setInProgress] = useState(null)
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    if (!supabase || !user?.id) return
    setLoading(true)
    supabase.from('test_attempts')
      .select('*')
      .eq('user_id', user.id)
      .eq('test_id', FINAL_TEST_ID)
      .is('completed_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setInProgress(data || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user?.id])

  async function startFinal() {
    if (!supabase || !user?.id) return
    setStarting(true)
    const payload = {
      user_id: user.id,
      test_id: FINAL_TEST_ID,
      current_section: 'rw_m1',
      answers: {},
      module_time_remaining: { rw_m1: 1920, rw_m2: 1920, math_m1: 2100, math_m2: 2100 }
    }
    const res = await supabase.from('test_attempts').insert(payload).select().single()
    if (!res.error && res.data) navigate(`/test/${res.data.id}`)
    else {
      alert(res.error?.message || 'Could not start final test. Please try again.')
      setStarting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar />
      <div className="page fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 20, fontWeight: 900, color: '#1a2744', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="final" size={20} />
              Final Test
            </h1>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 4, lineHeight: 1.6 }}>
              This uses the same timed test engine as the Pre Test and Skill Builder tests.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {cfg?.pdfUrl && (
              <a className="btn btn-outline" href={cfg.pdfUrl} target="_blank" rel="noreferrer">Open PDF →</a>
            )}
            {cfg?.akUrl && (
              <a className="btn btn-outline" href={cfg.akUrl} target="_blank" rel="noreferrer" title="Admin-only hint: students shouldn't use this during the test">
                Open AK →
              </a>
            )}
            {inProgress?.id ? (
              <button className="btn" style={{ background: '#1a2744', color: 'white', fontWeight: 900 }} onClick={() => navigate(`/test/${inProgress.id}`)} disabled={loading}>
                Resume →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={startFinal} disabled={starting || loading}>
                {starting ? 'Starting…' : 'Start Final Test →'}
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.7 }}>
            {loading ? 'Checking for an in-progress attempt…' : (
              inProgress ? (
                <>You have an in-progress final test attempt. Click <b>Resume</b> to continue.</>
              ) : (
                <>When you click <b>Start Final Test</b>, we create a new attempt and open the timed test interface.</>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
