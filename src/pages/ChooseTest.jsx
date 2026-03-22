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
    navigate(`/welcome?exam=${exam}`, { replace: true })
  }

  return (
    <div className="login-shell">
      <div className="page fade-up exam-choice-page" style={{ maxWidth: 980, margin: '0 auto', paddingTop: 30 }}>
        <div className="exam-choice-brand">
          <BrandLink to="/dashboard" />
        </div>
        <div className="card exam-choice-card">
          <div className="exam-choice-hero">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 12 }}>
              <span style={{ width: 52, height: 52, borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14,165,233,.10)', color: '#1a2744' }}>
                <Icon name="test" size={22} />
              </span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 30, fontWeight: 900, color: '#1a2744' }}>Choose your starting track</div>
                <div style={{ color: '#64748b', marginTop: 4, fontSize: 15, lineHeight: 1.7 }}>Pick the exam you want to try first. SAT and ACT stay fully separate, and you can switch between them anytime from the top of the site.</div>
              </div>
            </div>
            <div className="exam-choice-note" style={{ justifyContent: 'center' }}>
              Your stronger exam becomes your default dashboard later, based on percentage correct.
            </div>
          </div>

          <div className="exam-choice-grid two-up">
            <button className="exam-choice-option" disabled={saving === 'sat'} onClick={() => choose('sat')}>
              <span className="exam-choice-badge">SAT</span>
              <span className="exam-choice-title">{saving === 'sat' ? 'Setting up SAT…' : 'Start with SAT'}</span>
              <span className="exam-choice-copy">Adaptive sections, a steadier pace, and no separate science section.</span>
            </button>
            <button className="exam-choice-option" disabled={saving === 'act'} onClick={() => choose('act')}>
              <span className="exam-choice-badge">ACT</span>
              <span className="exam-choice-title">{saving === 'act' ? 'Setting up ACT…' : 'Start with ACT'}</span>
              <span className="exam-choice-copy">A faster pace with English, Math, Reading, and Science all tested separately.</span>
            </button>
            <button className="exam-choice-option muted wide" onClick={() => navigate('/compare-tests')}>
              <span className="exam-choice-badge">Compare</span>
              <span className="exam-choice-title">I’m not sure yet</span>
              <span className="exam-choice-copy">See the differences side by side first, then choose the better test to try.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
