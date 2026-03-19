import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import { saveLocalPreferredExam } from '../lib/examChoice.js'

export default function ChooseTest() {
  const { user, setPreferredExam } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState('')

  async function choose(exam) {
    setSaving(exam)
    saveLocalPreferredExam(user?.id, exam)
    await setPreferredExam(exam).catch(() => {})
    navigate(`/dashboard?exam=${exam}`, { replace: true })
  }

  return (
    <div className="login-shell">
      <nav className="nav">
        <BrandLink to="/dashboard" />
      </nav>
      <div className="page fade-up" style={{ maxWidth: 980, margin: '0 auto', paddingTop: 40 }}>
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ width: 44, height: 44, borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14,165,233,.10)', color: '#1a2744' }}>
              <Icon name="test" size={22} />
            </span>
            <div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 26, fontWeight: 900, color: '#1a2744' }}>Which test are you preparing for?</div>
              <div style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Pick your starting track. You can still switch between SAT and ACT anytime from the top of the site.</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 20 }}>
            <button className="btn btn-primary" style={{ minHeight: 120, fontSize: 18 }} disabled={saving === 'sat'} onClick={() => choose('sat')}>
              {saving === 'sat' ? 'Setting up SAT…' : 'SAT'}
            </button>
            <button className="btn btn-primary" style={{ minHeight: 120, fontSize: 18 }} disabled={saving === 'act'} onClick={() => choose('act')}>
              {saving === 'act' ? 'Setting up ACT…' : 'ACT'}
            </button>
            <button className="btn btn-outline" style={{ minHeight: 120, fontSize: 18 }} onClick={() => navigate('/compare-tests')}>
              I’m not sure yet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
