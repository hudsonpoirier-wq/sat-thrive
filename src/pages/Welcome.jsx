import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Icon from '../components/AppIcons.jsx'

const sf = 'Sora, sans-serif'

/* ─── Shared helpers ─────────────────────────────────── */

function MockFrame({ children, label }) {
  return (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ padding: '6px 14px', background: '#e2e8f0', fontSize: 10, fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'flex', gap: 4 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
        </span>
        {label}
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  )
}

function Tip({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', color: 'white', fontSize: 11, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{n}</span>
      <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.65 }}>{children}</span>
    </div>
  )
}

function Section({ icon, title, subtitle, children }) {
  return (
    <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 8px 30px rgba(0,0,0,.08)', padding: '28px 28px 24px', marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Icon name={icon} size={18} />
        </div>
        <div>
          <div style={{ fontFamily: sf, fontSize: 18, fontWeight: 900, color: '#0f172a' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ marginTop: 16 }}>{children}</div>
    </div>
  )
}

function MiniCard({ children, style }) {
  return <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e2e8f0', padding: '8px 12px', fontSize: 11, ...style }}>{children}</div>
}

/* ─── Student Sections ───────────────────────────────── */

function StudentSections({ exam }) {
  const label = exam === 'act' ? 'ACT' : 'SAT'
  const maxScore = exam === 'act' ? '36' : '1600'
  const sampleScore = exam === 'act' ? '28' : '1280'
  const sampleRecent = exam === 'act' ? '30' : '1310'
  const sampleImprovement = exam === 'act' ? '+2' : '+30'
  const sections = exam === 'act'
    ? ['English: 29', 'Math: 27', 'Reading: 30', 'Science: 28']
    : ['Reading: 640', 'Math: 670']

  return (
    <>
      {/* Dashboard */}
      <Section icon="home" title="Your Dashboard" subtitle="Your home base for everything">
        <MockFrame label="Dashboard">
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'Best Score', value: sampleScore, sub: `/ ${maxScore}` },
              { label: 'Most Recent', value: sampleRecent },
              { label: 'Improvement', value: sampleImprovement, color: '#10b981' },
            ].map(c => (
              <MiniCard key={c.label} style={{ flex: '1 1 0', minWidth: 80, textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 700 }}>{c.label}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: c.color || '#0f172a', fontFamily: sf }}>{c.value}</div>
                {c.sub && <div style={{ fontSize: 9, color: '#94a3b8' }}>{c.sub}</div>}
              </MiniCard>
            ))}
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#64748b', marginBottom: 6 }}>YOUR JOURNEY</div>
          {[
            { step: '1) Take the Pre-Test', status: 'TODO', color: '#94a3b8' },
            { step: '2) Study Plan', status: 'LOCKED', color: '#cbd5e1' },
            { step: '3) Review Results', status: 'LOCKED', color: '#cbd5e1' },
            { step: '4) Review Mistakes', status: 'LOCKED', color: '#cbd5e1' },
            { step: '5) Study Guide', status: 'TODO', color: '#94a3b8' },
          ].map(s => (
            <div key={s.step} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 4, fontSize: 11 }}>
              <span style={{ fontWeight: 700, color: '#334155' }}>{s.step}</span>
              <span style={{ fontWeight: 800, fontSize: 9, color: s.color }}>{s.status}</span>
            </div>
          ))}
        </MockFrame>
        <Tip n={1}>Your <strong>score cards</strong> at the top track your best, most recent, and improvement scores across all tests.</Tip>
        <Tip n={2}>Follow the <strong>5-step journey</strong>: start with the Pre-Test, then unlock your Study Plan, Results, Mistake Review, and Study Guide.</Tip>
        <Tip n={3}>Steps unlock as you go — <strong>complete the Pre-Test first</strong> to unlock everything else.</Tip>
      </Section>

      {/* Test Taking */}
      <Section icon="test" title="Taking a Test" subtitle="Timed sections with the real test PDF">
        <MockFrame label={`Test — ${label} Pre-Test · Section 1`}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 120, flexShrink: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', marginBottom: 4 }}>QUESTIONS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
                {Array.from({ length: 16 }, (_, i) => {
                  const isActive = i === 2
                  const isAnswered = i < 2
                  const isMarked = i === 5
                  return (
                    <div key={i} style={{
                      width: 22, height: 22, borderRadius: 6, fontSize: 9, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid',
                      borderColor: isActive ? '#0ea5e9' : isAnswered ? '#10b981' : isMarked ? '#f59e0b' : '#e2e8f0',
                      background: isActive ? 'rgba(14,165,233,.1)' : isAnswered ? 'rgba(16,185,129,.08)' : isMarked ? '#fef9c3' : 'white',
                      color: isActive ? '#0ea5e9' : isAnswered ? '#10b981' : isMarked ? '#92400e' : '#94a3b8',
                    }}>
                      {i + 1}
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: 8, padding: '5px 8px', background: '#fef9c3', borderRadius: 6, fontSize: 9, fontWeight: 700, color: '#92400e', textAlign: 'center', border: '1px solid #fde68a' }}>
                Mark to Come Back
              </div>
            </div>
            <div style={{ flex: 1, background: '#e2e8f0', borderRadius: 8, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#94a3b8' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>📄</div>
                <div>Test PDF</div>
                <div style={{ fontSize: 9 }}>Scrollable pages</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderRadius: 6, padding: '6px 10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>Section 1 of {exam === 'act' ? '4' : '4'}</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#0f172a', fontFamily: 'monospace' }}>32:15</span>
          </div>
        </MockFrame>
        <Tip n={1}>The <strong>test PDF</strong> displays on the right — scroll through it just like the real exam.</Tip>
        <Tip n={2}>Click any <strong>question number</strong> on the left to jump to that question in the PDF.</Tip>
        <Tip n={3}>Use <strong>"Mark to Come Back"</strong> (yellow) to flag questions you want to revisit before submitting.</Tip>
        <Tip n={4}>The <strong>timer</strong> counts down for each section. Green = answered, blue = current, gray = unanswered.</Tip>
        <Tip n={5}>Use <strong>arrow keys</strong> (← → ↑ ↓) to navigate between questions quickly.</Tip>
      </Section>

      {/* Results */}
      <Section icon="results" title="Your Results" subtitle="See exactly where you stand">
        <MockFrame label={`Results — ${label} Pre-Test`}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 700 }}>TOTAL SCORE</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', fontFamily: sf }}>{sampleScore}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            {sections.map(s => (
              <MiniCard key={s} style={{ flex: '1 1 0', minWidth: 60, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#334155' }}>{s}</div>
              </MiniCard>
            ))}
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#64748b', marginBottom: 4 }}>WEAK TOPICS</div>
          {['Algebra & Functions', 'Craft & Structure', 'Data Analysis'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', fontSize: 11 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ color: '#334155' }}>{t}</span>
            </div>
          ))}
        </MockFrame>
        <Tip n={1}>See your <strong>total score</strong> and <strong>per-section breakdown</strong> after every test.</Tip>
        <Tip n={2}><strong>Weak topics</strong> are identified automatically — these feed directly into your study plan.</Tip>
        <Tip n={3}>Your study calendar and guide <strong>prioritize these weak areas</strong> to help you improve fastest.</Tip>
      </Section>

      {/* Study Guide */}
      <Section icon="guide" title="Study Guide" subtitle="Master every topic chapter by chapter">
        <MockFrame label={`Study Guide — ${label}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { ch: 'Ch 1: Linear Equations', pct: 100, done: true },
              { ch: 'Ch 2: Systems of Equations', pct: 60, done: false },
              { ch: 'Ch 3: Quadratic Functions', pct: 0, done: false },
              { ch: 'Ch 4: Data & Statistics', pct: 0, done: false },
            ].map(c => (
              <div key={c.ch} style={{ background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', padding: '8px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: '#334155' }}>
                  <span>{c.ch}</span>
                  {c.done
                    ? <span style={{ color: '#10b981', fontSize: 9, fontWeight: 800 }}>COMPLETE</span>
                    : <span style={{ color: '#94a3b8', fontSize: 9 }}>{c.pct}%</span>
                  }
                </div>
                <div style={{ height: 4, background: '#f1f5f9', borderRadius: 99, marginTop: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, background: c.done ? '#10b981' : '#0ea5e9', borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', padding: '8px 10px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', marginBottom: 4 }}>PRACTICE QUESTION</div>
            <div style={{ fontSize: 11, color: '#334155', marginBottom: 6 }}>If 2x + 5 = 13, what is x?</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {['A) 2', 'B) 4', 'C) 6', 'D) 8'].map(a => (
                <span key={a} style={{
                  padding: '3px 10px', fontSize: 10, borderRadius: 4,
                  border: '1px solid',
                  borderColor: a === 'B) 4' ? '#10b981' : '#e2e8f0',
                  background: a === 'B) 4' ? 'rgba(16,185,129,.1)' : 'white',
                  color: '#334155',
                  fontWeight: a === 'B) 4' ? 700 : 400,
                }}>{a}</span>
              ))}
            </div>
          </div>
        </MockFrame>
        <Tip n={1}>Work through <strong>chapters</strong> organized by topic at your own pace.</Tip>
        <Tip n={2}>Each chapter has <strong>multiple-choice practice questions</strong> to test your understanding.</Tip>
        <Tip n={3}>Complete all chapters ({exam === 'act' ? '44' : '25'}) to mark the Study Guide step as done on your dashboard.</Tip>
      </Section>

      {/* Calendar */}
      <Section icon="calendar" title="Calendar & Study Plan" subtitle="A personalized day-by-day schedule">
        <MockFrame label="Calendar">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 10 }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#94a3b8', padding: 2 }}>{d}</div>
            ))}
            {Array.from({ length: 28 }, (_, i) => {
              const day = i + 1
              const hasTask = [3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26].includes(day)
              const isTestDay = day === 28
              return (
                <div key={i} style={{
                  textAlign: 'center', fontSize: 10, padding: '4px 2px', borderRadius: 4,
                  background: isTestDay ? 'rgba(239,68,68,.1)' : hasTask ? 'rgba(14,165,233,.08)' : 'transparent',
                  color: isTestDay ? '#ef4444' : hasTask ? '#0369a1' : '#64748b',
                  fontWeight: isTestDay || hasTask ? 700 : 400,
                  border: isTestDay ? '1px solid rgba(239,68,68,.3)' : 'none',
                }}>
                  {day}
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#64748b', marginBottom: 4 }}>TODAY'S TASKS</div>
          {['Study: Ch 2 Systems of Equations', 'Review: 3 missed questions', 'Check: Latest results'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 3, fontSize: 10 }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, border: '1.5px solid #cbd5e1' }} />
              <span style={{ color: '#334155' }}>{t}</span>
            </div>
          ))}
        </MockFrame>
        <Tip n={1}>Set your <strong>official test date</strong> and which days you're available to study.</Tip>
        <Tip n={2}>Your schedule <strong>adapts automatically</strong> based on weak topics and how much time you have left.</Tip>
        <Tip n={3}>Each task links directly to the right page — just <strong>click to start</strong>.</Tip>
        <Tip n={4}>Red dates mark your <strong>test day</strong>. Blue dates have study tasks assigned.</Tip>
      </Section>

      {/* Mistakes */}
      <Section icon="mistakes" title="Mistake Notebook" subtitle="Review and master every missed question">
        <MockFrame label="Mistake Notebook">
          {[
            { q: 'Q12 — Algebra', status: 'To Review', color: '#f59e0b' },
            { q: 'Q7 — Reading Comp', status: 'Solved ✓', color: '#10b981' },
            { q: 'Q23 — Data Analysis', status: 'To Review', color: '#f59e0b' },
            { q: 'Q31 — Grammar', status: 'To Review', color: '#f59e0b' },
          ].map(m => (
            <div key={m.q} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 3, fontSize: 11 }}>
              <span style={{ color: '#334155', fontWeight: 600 }}>{m.q}</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: m.color }}>{m.status}</span>
            </div>
          ))}
          <div style={{ marginTop: 6, textAlign: 'center' }}>
            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', color: 'white', borderRadius: 8, fontSize: 11, fontWeight: 800 }}>Next unsolved →</span>
          </div>
        </MockFrame>
        <Tip n={1}>Every question you miss is <strong>automatically added</strong> to your Mistake Notebook.</Tip>
        <Tip n={2}>Review each mistake and answer it correctly to mark it as <strong>solved</strong>.</Tip>
        <Tip n={3}><strong>"Next unsolved"</strong> jumps straight to the next question you haven't reviewed yet.</Tip>
        <Tip n={4}>Uses <strong>spaced repetition</strong> — questions resurface over time to lock in your learning.</Tip>
      </Section>

      {/* Navigation */}
      <Section icon="target" title="Quick Navigation" subtitle="Get around fast with the top bar">
        <MockFrame label="Navigation Bar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a2744', borderRadius: 8, padding: '8px 14px' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: 'white' }}>AGORA</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Calendar', 'Guide', 'Mistakes'].map(b => (
                <span key={b} style={{ padding: '4px 10px', fontSize: 9, fontWeight: 700, background: 'rgba(14,165,233,.15)', borderRadius: 6, color: 'rgba(255,255,255,.85)' }}>{b}</span>
              ))}
              <span style={{ padding: '4px 10px', fontSize: 9, fontWeight: 700, background: 'rgba(14,165,233,.25)', borderRadius: 6, color: 'white', border: '1px solid rgba(14,165,233,.4)' }}>{label}</span>
            </div>
          </div>
        </MockFrame>
        <Tip n={1}>The <strong>top bar</strong> gives you one-click access to Calendar, Study Guide, and Mistakes from any page.</Tip>
        <Tip n={2}>Use the <strong>exam switcher</strong> ({label} badge) to toggle between your SAT and ACT dashboards anytime.</Tip>
        <Tip n={3}>Click the <strong>AGORA logo</strong> to return to your dashboard from anywhere.</Tip>
      </Section>
    </>
  )
}

/* ─── Tutor Sections ─────────────────────────────────── */

function TutorSections() {
  return (
    <>
      {/* Students */}
      <Section icon="students" title="Your Students" subtitle="View everyone affiliated with your school">
        <MockFrame label="Tutor Dashboard — Students">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #e2e8f0' }}>
                {['Name', 'Email', 'Tests', 'Best Score', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '4px 6px', fontWeight: 800, color: '#64748b', fontSize: 9 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alex Johnson', email: 'alex@school.edu', tests: 3, score: 'SAT 1340' },
                { name: 'Maria Garcia', email: 'maria@school.edu', tests: 2, score: 'ACT 29' },
                { name: 'Sam Chen', email: 'sam@school.edu', tests: 1, score: 'SAT 1180' },
              ].map(s => (
                <tr key={s.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '6px', fontWeight: 700, color: '#334155' }}>{s.name}</td>
                  <td style={{ padding: '6px', color: '#94a3b8' }}>{s.email}</td>
                  <td style={{ padding: '6px', color: '#334155' }}>{s.tests}</td>
                  <td style={{ padding: '6px', fontWeight: 700, color: '#0f172a' }}>{s.score}</td>
                  <td style={{ padding: '6px' }}>
                    <span style={{ fontSize: 9, padding: '2px 6px', background: 'rgba(14,165,233,.08)', color: '#0369a1', borderRadius: 4, fontWeight: 700, marginRight: 3 }}>View</span>
                    <span style={{ fontSize: 9, padding: '2px 6px', background: 'rgba(14,165,233,.08)', color: '#0369a1', borderRadius: 4, fontWeight: 700 }}>Report</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MockFrame>
        <Tip n={1}>See all students <strong>affiliated with your school</strong> in one searchable table.</Tip>
        <Tip n={2}>Track each student's <strong>test count</strong> and <strong>best score</strong> at a glance.</Tip>
        <Tip n={3}>Click <strong>"View"</strong> to preview any student's full dashboard exactly as they see it.</Tip>
        <Tip n={4}>Click <strong>"Report"</strong> to see their detailed progress report with score breakdowns.</Tip>
      </Section>

      {/* Test Results */}
      <Section icon="results" title="Test Results" subtitle="Every completed test from your students">
        <MockFrame label="Tutor Dashboard — Test Results">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #e2e8f0' }}>
                {['Student', 'Test', 'Date', 'Score', 'Top Weakness'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '4px 6px', fontWeight: 800, color: '#64748b', fontSize: 9 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alex J.', test: 'SAT Pre-Test', date: 'Mar 15', score: '1280', weak: 'Algebra' },
                { name: 'Maria G.', test: 'ACT Pre-Test', date: 'Mar 14', score: '27', weak: 'Science' },
                { name: 'Alex J.', test: 'SAT Practice 1', date: 'Mar 18', score: '1340', weak: 'Geometry' },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '6px', fontWeight: 600, color: '#334155' }}>{r.name}</td>
                  <td style={{ padding: '6px', color: '#334155' }}>{r.test}</td>
                  <td style={{ padding: '6px', color: '#94a3b8' }}>{r.date}</td>
                  <td style={{ padding: '6px', fontWeight: 700, color: '#0f172a' }}>{r.score}</td>
                  <td style={{ padding: '6px', color: '#ef4444', fontSize: 9 }}>{r.weak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </MockFrame>
        <Tip n={1}>See <strong>every completed test</strong> from your students in one place, sorted by date.</Tip>
        <Tip n={2}>Track scores, dates, and <strong>top weaknesses</strong> to identify who needs the most help.</Tip>
        <Tip n={3}>Results update <strong>in real time</strong> — new scores appear as soon as students finish a test.</Tip>
      </Section>

      {/* Analytics */}
      <Section icon="chart" title="Analytics" subtitle="Track performance across your students">
        <MockFrame label="Tutor Dashboard — Analytics">
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Students', value: '12' },
              { label: 'Active (7d)', value: '8' },
              { label: 'Avg Score', value: '1285' },
              { label: 'Median', value: '1310' },
            ].map(k => (
              <MiniCard key={k.label} style={{ flex: '1 1 0', minWidth: 55, textAlign: 'center' }}>
                <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700 }}>{k.label}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', fontFamily: sf }}>{k.value}</div>
              </MiniCard>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', padding: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>SCORE DISTRIBUTION</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
              {[15, 25, 40, 60, 80, 55, 30, 10].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: 'linear-gradient(180deg, #0ea5e9, #6366f1)', borderRadius: '3px 3px 0 0', minWidth: 0 }} />
              ))}
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>MOST MISSED TOPICS</div>
            {['Algebra & Functions', 'Data Interpretation', 'Grammar & Usage'].map((t, i) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${80 - i * 20}%`, background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#0ea5e9', borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 9, color: '#64748b', fontWeight: 600, flexShrink: 0, width: 90, textAlign: 'right' }}>{t}</span>
              </div>
            ))}
          </div>
        </MockFrame>
        <Tip n={1}>Track <strong>key metrics</strong>: student count, active users, average and median scores.</Tip>
        <Tip n={2}>The <strong>score distribution</strong> chart shows how your students' scores spread out.</Tip>
        <Tip n={3}>Identify the <strong>most commonly missed topics</strong> across all students to guide group instruction.</Tip>
        <Tip n={4}>Toggle between <strong>SAT and ACT</strong> analytics separately.</Tip>
      </Section>

      {/* Previewing */}
      <Section icon="eye" title="Previewing Student Work" subtitle="See any student's dashboard as they see it">
        <MockFrame label="Tutor View — Alex Johnson's Dashboard">
          <div style={{ background: '#fef3c7', borderRadius: 6, padding: '8px 12px', fontSize: 10, color: '#92400e', fontWeight: 600, marginBottom: 8, border: '1px solid #fde68a' }}>
            Tutor View — You're previewing Alex Johnson's dashboard (read-only)
          </div>
          <div style={{ fontSize: 11, color: '#64748b', textAlign: 'center', padding: 20 }}>
            [Student's full dashboard appears here with their real data]
          </div>
        </MockFrame>
        <Tip n={1}>Click <strong>"View"</strong> on any student to see their exact dashboard with real data.</Tip>
        <Tip n={2}>Preview mode is <strong>read-only</strong> — you can look but can't modify their data or start tests.</Tip>
        <Tip n={3}>A yellow banner at the top always reminds you that you're in preview mode.</Tip>
      </Section>

      {/* Navigation */}
      <Section icon="target" title="Quick Navigation" subtitle="Find your way around">
        <MockFrame label="Navigation Bar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a2744', borderRadius: 8, padding: '8px 14px' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: 'white' }}>AGORA</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ padding: '4px 10px', fontSize: 9, fontWeight: 700, background: 'rgba(14,165,233,.15)', borderRadius: 6, color: 'rgba(255,255,255,.85)' }}>Students</span>
              <span style={{ padding: '4px 10px', fontSize: 9, fontWeight: 700, background: 'rgba(14,165,233,.25)', borderRadius: 6, color: 'white', border: '1px solid rgba(14,165,233,.4)' }}>My Dashboard</span>
            </div>
          </div>
        </MockFrame>
        <Tip n={1}>Click <strong>"Students"</strong> in the top bar to access your Tutor Dashboard with student lists, results, and analytics.</Tip>
        <Tip n={2}>Click <strong>"My Dashboard"</strong> to return to the standard student view (you also have your own SAT/ACT practice dashboard).</Tip>
        <Tip n={3}>Click the <strong>AGORA logo</strong> to return to your dashboard from anywhere.</Tip>
      </Section>
    </>
  )
}

/* ─── Admin Sections ─────────────────────────────────── */

function AdminSections() {
  return (
    <>
      {/* Student Management */}
      <Section icon="admin" title="Student Management" subtitle="Full control over all user accounts">
        <MockFrame label="Admin — Students">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #e2e8f0' }}>
                {['Name', 'Role', 'Affiliation', 'Tests', 'Best', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '4px 6px', fontWeight: 800, color: '#64748b', fontSize: 9 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alex Johnson', role: 'Student', aff: 'Lincoln HS', tests: 3, score: '1340', roleColor: '#10b981' },
                { name: 'Ms. Davis', role: 'Tutor', aff: 'Lincoln HS', tests: 0, score: '—', roleColor: '#0ea5e9' },
                { name: 'Sam Chen', role: 'Student', aff: 'Oak Academy', tests: 1, score: '1180', roleColor: '#10b981' },
              ].map(s => (
                <tr key={s.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '5px 6px', fontWeight: 700, color: '#334155' }}>{s.name}</td>
                  <td style={{ padding: '5px 6px' }}>
                    <span style={{ fontSize: 8, fontWeight: 800, padding: '2px 6px', borderRadius: 4, color: s.roleColor, background: `${s.roleColor}15` }}>{s.role}</span>
                  </td>
                  <td style={{ padding: '5px 6px', color: '#64748b', fontSize: 10 }}>{s.aff}</td>
                  <td style={{ padding: '5px 6px', color: '#334155' }}>{s.tests}</td>
                  <td style={{ padding: '5px 6px', fontWeight: 700 }}>{s.score}</td>
                  <td style={{ padding: '5px 6px' }}>
                    <span style={{ display: 'flex', gap: 3 }}>
                      {['Reset', 'View', 'Report', 'Delete'].map(a => (
                        <span key={a} style={{ fontSize: 8, padding: '2px 5px', background: a === 'Delete' ? 'rgba(239,68,68,.08)' : 'rgba(14,165,233,.08)', color: a === 'Delete' ? '#ef4444' : '#0369a1', borderRadius: 4, fontWeight: 700 }}>{a}</span>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MockFrame>
        <Tip n={1}>See <strong>every user</strong> in the system — students, tutors, and admins — with their role badge.</Tip>
        <Tip n={2}><strong>Filter by affiliation</strong> using the dropdown to focus on a specific school.</Tip>
        <Tip n={3}><strong>Reset</strong> clears a student's tests, scores, and study progress so they can start fresh.</Tip>
        <Tip n={4}><strong>View</strong> opens their dashboard in read-only preview. <strong>Report</strong> shows detailed analytics.</Tip>
        <Tip n={5}><strong>Delete</strong> permanently removes a user account — use with caution.</Tip>
      </Section>

      {/* Analytics */}
      <Section icon="chart" title="Program Analytics" subtitle="Organization-wide performance metrics">
        <MockFrame label="Admin — Analytics">
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Registered', value: '48' },
              { label: 'Students', value: '42' },
              { label: 'Tutors', value: '5' },
              { label: 'Tests', value: '127' },
              { label: 'Avg Gain', value: '+45', color: '#10b981' },
            ].map(k => (
              <MiniCard key={k.label} style={{ flex: '1 1 0', minWidth: 50, textAlign: 'center' }}>
                <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700 }}>{k.label}</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: k.color || '#0f172a', fontFamily: sf }}>{k.value}</div>
              </MiniCard>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>ACTIVITY OVER TIME</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
              {[20, 35, 50, 45, 60, 70, 55, 80, 65, 75, 90, 85].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: 'linear-gradient(180deg, #0ea5e9, #6366f1)', borderRadius: '2px 2px 0 0', minWidth: 0 }} />
              ))}
            </div>
          </div>
        </MockFrame>
        <Tip n={1}>Summary cards show <strong>total registrations, test completions, and average improvement</strong> at a glance.</Tip>
        <Tip n={2}>Charts cover <strong>activity trends, score distributions, averages by test, and most missed topics</strong>.</Tip>
        <Tip n={3}>Filter analytics by <strong>affiliation</strong> to compare performance between different schools.</Tip>
        <Tip n={4}>Toggle between <strong>SAT and ACT</strong> for separate analytics views.</Tip>
      </Section>

      {/* Affiliations */}
      <Section icon="folder" title="Affiliations" subtitle="Compare performance across schools">
        <MockFrame label="Admin — Affiliations">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { name: 'Lincoln High School', students: 18, tests: 52, avg: 1285 },
              { name: 'Oak Academy', students: 12, tests: 34, avg: 1320 },
              { name: 'Riverside Prep', students: 8, tests: 21, avg: 1250 },
            ].map(a => (
              <MiniCard key={a.name} style={{ flex: '1 1 120px' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 11, marginBottom: 4 }}>{a.name}</div>
                <div style={{ display: 'flex', gap: 8, fontSize: 9, color: '#64748b' }}>
                  <span>{a.students} students</span>
                  <span>{a.tests} tests</span>
                </div>
                <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2 }}>Avg: <strong style={{ color: '#0f172a' }}>{a.avg}</strong></div>
              </MiniCard>
            ))}
          </div>
        </MockFrame>
        <Tip n={1}>See <strong>side-by-side stats</strong> for every school or organization in your system.</Tip>
        <Tip n={2}>Click any affiliation card to <strong>filter</strong> the Students and Analytics tabs to just that group.</Tip>
        <Tip n={3}>Compare <strong>student counts, test counts, and average scores</strong> across all affiliations.</Tip>
      </Section>

      {/* Proof of Impact */}
      <Section icon="trend" title="Proof of Impact" subtitle="Statistical evidence that the program works">
        <MockFrame label="Admin — Proof of Impact">
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <MiniCard style={{ flex: '1 1 0', textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700 }}>PRE-TEST AVG</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', fontFamily: sf }}>1215</div>
            </MiniCard>
            <MiniCard style={{ flex: '1 1 0', textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700 }}>POST-TEST AVG</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#10b981', fontFamily: sf }}>1310</div>
            </MiniCard>
            <MiniCard style={{ flex: '1 1 0', textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700 }}>MEAN GAIN</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#10b981', fontFamily: sf }}>+95</div>
            </MiniCard>
          </div>
          <div style={{ background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', padding: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#166534', marginBottom: 4 }}>STATISTICALLY SIGNIFICANT</div>
            <div style={{ fontSize: 9, color: '#15803d', lineHeight: 1.6 }}>
              p-value: 0.001 · Cohen's d: 0.82 (large effect)<br />
              95% CI: [+72, +118] points
            </div>
          </div>
        </MockFrame>
        <Tip n={1}>Compare <strong>pre-test vs post-test averages</strong> across all students with paired data.</Tip>
        <Tip n={2}>See full <strong>statistical analysis</strong>: paired t-test, p-value, Cohen's d effect size, and confidence intervals.</Tip>
        <Tip n={3}>Use this data to <strong>demonstrate program effectiveness</strong> to stakeholders and funders.</Tip>
      </Section>

      {/* Test Management */}
      <Section icon="test" title="Test Management" subtitle="Manage PDFs and answer keys">
        <MockFrame label="Admin — Tests">
          {['SAT Pre-Test', 'SAT Practice 1', 'SAT Practice 2', 'ACT Pre-Test'].map(t => (
            <div key={t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'white', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 3, fontSize: 11 }}>
              <span style={{ fontWeight: 700, color: '#334155' }}>{t}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <span style={{ fontSize: 8, padding: '2px 6px', background: 'rgba(16,185,129,.08)', color: '#10b981', borderRadius: 4, fontWeight: 700 }}>PDF ✓</span>
                <span style={{ fontSize: 8, padding: '2px 6px', background: 'rgba(16,185,129,.08)', color: '#10b981', borderRadius: 4, fontWeight: 700 }}>Key ✓</span>
              </div>
            </div>
          ))}
        </MockFrame>
        <Tip n={1}>View the <strong>status of every test</strong> — which ones have PDFs and answer keys ready.</Tip>
        <Tip n={2}><strong>Upload PDFs</strong> and the system can auto-extract answer keys from scoring guides.</Tip>
        <Tip n={3}>Use <strong>"Regrade Attempts"</strong> in the toolbar to rescore all tests after updating an answer key.</Tip>
      </Section>

      {/* Navigation */}
      <Section icon="target" title="Quick Navigation" subtitle="Admin toolbar overview">
        <MockFrame label="Admin Navigation Bar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a2744', borderRadius: 8, padding: '8px 14px', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: 'white' }}>AGORA</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Regrade', 'Reset My Data', 'Back to Dashboard'].map(b => (
                <span key={b} style={{ padding: '4px 10px', fontSize: 9, fontWeight: 700, background: 'rgba(14,165,233,.15)', borderRadius: 6, color: 'rgba(255,255,255,.85)' }}>{b}</span>
              ))}
              <span style={{ padding: '4px 10px', fontSize: 9, fontWeight: 700, background: 'rgba(239,68,68,.15)', borderRadius: 6, color: '#fca5a5' }}>Sign Out</span>
            </div>
          </div>
        </MockFrame>
        <Tip n={1}><strong>"Regrade Attempts"</strong> rescores all completed tests with the latest answer key logic.</Tip>
        <Tip n={2}><strong>"Reset My Data"</strong> clears your own test data (useful when testing the platform yourself).</Tip>
        <Tip n={3}><strong>"Back to Dashboard"</strong> returns you to the standard student dashboard view.</Tip>
      </Section>
    </>
  )
}

/* ─── Main Component ─────────────────────────────────── */

export default function Welcome() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const exam = params.get('exam') || 'sat'
  const role = profile?.role || 'student'

  const isAdmin = role === 'admin'
  const isTutor = role === 'tutor'
  const label = exam === 'act' ? 'ACT' : 'SAT'

  const heroSubtitle = isAdmin
    ? "Here's a quick tour of your Admin Dashboard and all the tools at your disposal."
    : isTutor
      ? "Here's a quick tour of your Tutor Dashboard and how to track your students' progress."
      : `You chose ${label} — great choice! Here's a quick tour of everything you can do.`

  const roleBadge = isAdmin ? 'Admin' : isTutor ? 'Tutor' : 'Student'

  function handleGetStarted() {
    if (isAdmin) navigate('/admin', { replace: true })
    else if (isTutor) navigate('/dashboard', { replace: true })
    else navigate(`/dashboard?exam=${exam}`, { replace: true })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(170deg, #0f172a 0%, #1e3a5f 40%, #0ea5e9 100%)',
      padding: '40px 20px 60px',
    }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 40, color: 'white' }}>
          <div style={{
            display: 'inline-block', padding: '4px 14px',
            background: 'rgba(255,255,255,.12)', borderRadius: 20,
            fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,.8)',
            marginBottom: 16, border: '1px solid rgba(255,255,255,.15)',
          }}>
            {roleBadge} Account
          </div>
          <div style={{ fontFamily: sf, fontSize: 28, fontWeight: 900, marginBottom: 8, lineHeight: 1.3 }}>
            Welcome to The Agora Project
          </div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            {heroSubtitle}
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,.45)' }}>
            Scroll down to explore each feature ↓
          </div>
        </div>

        {/* Role-specific sections */}
        {isAdmin ? <AdminSections /> : isTutor ? <TutorSections /> : <StudentSections exam={exam} />}

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button
            onClick={handleGetStarted}
            className="btn btn-primary"
            style={{
              padding: '16px 48px', fontSize: 17, fontWeight: 900,
              borderRadius: 14, boxShadow: '0 8px 24px rgba(14,165,233,.4)',
            }}
          >
            {isAdmin ? 'Go to Admin Dashboard →' : isTutor ? 'Go to Dashboard →' : 'Get Started →'}
          </button>
        </div>
      </div>
    </div>
  )
}
