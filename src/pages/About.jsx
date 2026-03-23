import { useAuth } from '../hooks/useAuth.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Icon from '../components/AppIcons.jsx'
import { motion } from 'framer-motion'

const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

const features = [
  {
    icon: 'clock',
    title: 'Timed Practice Tests',
    desc: 'Realistic SAT and ACT sections with built-in timers that mirror actual test conditions.',
  },
  {
    icon: 'guide',
    title: 'Adaptive Study Guide',
    desc: 'Personalized chapter-by-chapter learning tailored to your diagnostic results.',
  },
  {
    icon: 'calendar',
    title: 'Smart Journey Calendar',
    desc: 'Day-by-day study plans that fit your schedule and keep you on track.',
  },
  {
    icon: 'mistakes',
    title: 'Mistake Notebook',
    desc: 'Track and review every error with spaced repetition so you never repeat the same mistake.',
  },
  {
    icon: 'folder',
    title: 'More Practice',
    desc: '800+ extra questions per test to sharpen your skills beyond the core curriculum.',
  },
  {
    icon: 'chart',
    title: 'Progress Tracking',
    desc: 'Charts, reports, and improvement metrics that show exactly how far you\u2019ve come.',
  },
]

const steps = [
  { num: 1, label: 'Take a diagnostic pre-test', desc: 'A full-length practice exam identifies your starting point and pinpoints every area that needs work.' },
  { num: 2, label: 'Get your personalized study plan', desc: 'AGORA builds a custom calendar and study guide based on your weak areas and available time.' },
  { num: 3, label: 'Work through study guide chapters and practice', desc: 'Focused lessons and targeted drills reinforce concepts until they stick.' },
  { num: 4, label: 'Take the final test and see your improvement', desc: 'A second full-length exam measures your growth so you can walk into test day with confidence.' },
]

const card = {
  background: '#fff',
  border: '1px solid rgba(14,165,233,.1)',
  borderRadius: 16,
  boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(14,165,233,.06)',
  padding: '36px 32px',
  marginBottom: 28,
}

const sectionTitle = {
  fontFamily: 'Sora, sans-serif',
  fontSize: 22,
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: 8,
}

const sectionSub = {
  fontSize: 15,
  color: '#475569',
  lineHeight: 1.7,
}

export default function About() {
  const { profile } = useAuth()

  return (
    <div className="app-layout has-sidebar">
      <Sidebar currentExam="sat" />
      <div className="page fade-up">
        {/* ---------- hero ---------- */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', padding: '48px 24px 32px' }}
        >
          <img
            src="/logo.png"
            alt="The Agora Project"
            style={{
              width: 100,
              height: 100,
              objectFit: 'contain',
              marginBottom: 20,
              filter: 'drop-shadow(0 4px 12px rgba(14,165,233,.25))',
            }}
          />
          <h1
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 36,
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 8px',
            }}
          >
            The Agora Project
          </h1>
          <p
            style={{
              fontSize: 17,
              color: '#64748b',
              fontWeight: 500,
              margin: 0,
            }}
          >
            Built for speed, focus, and results
          </p>
        </motion.div>

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 60px' }}>
          {/* ---------- what is agora ---------- */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={card}
          >
            <h2 style={sectionTitle}>What is AGORA?</h2>
            <p style={sectionSub}>
              AGORA is an adaptive SAT/ACT test-prep platform designed to meet
              every student exactly where they are. It starts with a diagnostic
              test that maps your strengths and weaknesses, then generates a
              fully personalized study plan so you spend time only on what
              matters most.
            </p>
            <p style={{ ...sectionSub, marginTop: 12 }}>
              As you work through practice questions and study guide chapters,
              AGORA continuously tracks your progress, identifies weak areas,
              and provides targeted practice. The result is faster improvement,
              less wasted time, and a clear path to your goal score.
            </p>
          </motion.div>

          {/* ---------- features ---------- */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginBottom: 28 }}
          >
            <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Features</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 18,
              }}
            >
              {features.map((f) => (
                <div
                  key={f.title}
                  style={{
                    ...card,
                    marginBottom: 0,
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={f.icon} size={22} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#0f172a',
                        margin: '0 0 6px',
                      }}
                    >
                      {f.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---------- how it works ---------- */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={card}
          >
            <h2 style={sectionTitle}>How It Works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 16 }}>
              {steps.map((s) => (
                <div key={s.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                      color: '#fff',
                      fontFamily: 'Sora, sans-serif',
                      fontWeight: 800,
                      fontSize: 15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#0f172a',
                        margin: '0 0 4px',
                      }}
                    >
                      {s.label}
                    </p>
                    <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---------- for tutors ---------- */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={card}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Icon name="students" size={20} />
              </div>
              <h2 style={{ ...sectionTitle, marginBottom: 0 }}>For Tutors</h2>
            </div>
            <p style={sectionSub}>
              Tutor accounts give educators a bird's-eye view of every assigned
              student's journey. Monitor diagnostic scores, study guide progress,
              practice-test results, and mistake patterns from a single
              dashboard — so you can focus tutoring sessions on the topics that
              will move the needle most.
            </p>
          </motion.div>

          {/* ---------- for administrators ---------- */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={card}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Icon name="admin" size={20} />
              </div>
              <h2 style={{ ...sectionTitle, marginBottom: 0 }}>For Administrators</h2>
            </div>
            <p style={sectionSub}>
              Admin tools let program coordinators manage student rosters,
              assign tutors, and review aggregate performance data across an
              entire cohort. Create accounts in bulk, reset passwords, and
              export reports — everything you need to keep a test-prep program
              running smoothly at scale.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
