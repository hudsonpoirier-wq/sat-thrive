import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <nav className="nav">
        <BrandLink to="/dashboard" />
      </nav>
      <div className="page fade-up" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ width: 44, height: 44, borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14,165,233,.10)', color: '#1a2744' }}>
              <Icon name="chart" size={22} />
            </span>
            <div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 26, fontWeight: 900, color: '#1a2744' }}>SAT vs ACT</div>
              <div style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Here’s the quick difference so you can choose which dashboard to try first.</div>
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
            <button className="btn btn-primary" disabled={saving === 'sat'} onClick={() => choose('sat')}>
              {saving === 'sat' ? 'Opening SAT…' : 'Try SAT First'}
            </button>
            <button className="btn btn-primary" disabled={saving === 'act'} onClick={() => choose('act')}>
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
