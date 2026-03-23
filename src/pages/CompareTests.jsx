import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import { saveLocalPreferredExam } from '../lib/examChoice.js'

const rows = [
  { label: 'Timing style', sat: 'Adaptive sections, more time per question', act: 'Faster pace, more questions per minute' },
  { label: 'Math focus', sat: 'More algebra/data emphasis', act: 'Broader mix including more geometry/trig' },
  { label: 'Reading style', sat: 'Shorter passages and paired texts', act: 'Longer passages and faster transitions' },
  { label: 'Science', sat: 'No separate science section', act: 'Dedicated science reasoning section' },
]

export default function CompareTests() {
  const { user, profile, setPreferredExam } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState('')

  // Tutors/admins don't take tests
  if (profile?.role === 'tutor') return <Navigate to="/tutor" replace />
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />

  async function choose(exam) {
    if (saving) return
    setSaving(exam)
    try {
      saveLocalPreferredExam(user?.id, exam)
      await setPreferredExam(exam).catch(() => {})
    } catch {}
    navigate(`/welcome?exam=${exam}`, { replace: true })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <nav className="nav">
        <BrandLink to="/dashboard" />
      </nav>
      <div className="page fade-up exam-choice-page" style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div className="card exam-choice-card">
          <div className="exam-choice-hero">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ width: 52, height: 52, borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14,165,233,.10)', color: '#1a2744' }}>
              <Icon name="chart" size={22} />
              </span>
              <div>
                <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 30, fontWeight: 900, color: '#1a2744' }}>Not sure which test fits you best?</div>
                <div style={{ color: '#64748b', marginTop: 4, fontSize: 15, lineHeight: 1.7 }}>Here's a quick side-by-side comparison. Pick the one that feels like the better starting point—then we'll build the right dashboard for it.</div>
              </div>
            </div>
          </div>

          <div className="exam-compare-grid" style={{ marginBottom: 20 }}>
            <div className="exam-compare-highlight">
              <div className="exam-choice-badge">SAT</div>
              <div className="exam-choice-title" style={{ marginTop: 10 }}>Best if you want a steadier pace</div>
              <div className="exam-choice-copy">SAT gives you a little more time per question and leans heavily on algebra, data, and concise reading/writing tasks.</div>
            </div>
            <div className="exam-compare-highlight">
              <div className="exam-choice-badge">ACT</div>
              <div className="exam-choice-title" style={{ marginTop: 10 }}>Best if you move quickly</div>
              <div className="exam-choice-copy">ACT rewards speed, endurance, and quick interpretation across English, Math, Reading, and Science.</div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 14px', color: '#64748b', fontSize: 12, textTransform: 'uppercase' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '12px 14px', color: '#1a2744' }}>SAT</th>
                  <th style={{ textAlign: 'left', padding: '12px 14px', color: '#1a2744' }}>ACT</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: '14px', borderTop: '1px solid #e2e8f0', fontWeight: 900, color: '#1a2744' }}>{row.label}</td>
                    <td style={{ padding: '14px', borderTop: '1px solid #e2e8f0', color: '#475569', lineHeight: 1.6 }}>{row.sat}</td>
                    <td style={{ padding: '14px', borderTop: '1px solid #e2e8f0', color: '#475569', lineHeight: 1.6 }}>{row.act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" disabled={!!saving} onClick={() => choose('sat')} style={{ opacity: saving && saving !== 'sat' ? 0.5 : 1, transition: 'opacity .2s' }}>
              {saving === 'sat' ? 'Opening SAT…' : 'Try SAT First'}
            </button>
            <button className="btn btn-primary" disabled={!!saving} onClick={() => choose('act')} style={{ opacity: saving && saving !== 'act' ? 0.5 : 1, transition: 'opacity .2s' }}>
              {saving === 'act' ? 'Opening ACT…' : 'Try ACT First'}
            </button>
            <button className="btn btn-outline" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
