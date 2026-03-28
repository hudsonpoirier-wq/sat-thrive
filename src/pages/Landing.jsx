import { useState, useEffect, useRef, Component } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'

const C = {
  primary: '#0ea5e9', primaryDark: '#0284c7', accent: '#f59e0b',
  navy: '#0b1220', navyMid: '#172554', dark: '#0f172a',
  white: '#ffffff', offWhite: '#f8fafc', gray: '#64748b',
  lightGray: '#94a3b8', card: 'rgba(255,255,255,.96)',
  cardBorder: 'rgba(14,165,233,.08)', green: '#10b981',
}

/* ═══ DATA ═══ */
const FEATURES = [
  { title: 'Adaptive Study Guides', desc: 'Chapter-by-chapter lessons built around your diagnostic results. Covers every SAT and ACT section with practice questions that adapt as you improve.', icon: 'book', span: 2 },
  { title: 'Full-Length Practice Tests', desc: 'Timed exams that mirror real test conditions — section breaks, pacing, and automatic scoring included.', icon: 'clock' },
  { title: 'Study Calendar', desc: 'Pick your test date and available days. The calendar fills itself with exactly what you need to cover.', icon: 'calendar' },
  { title: 'Mistake Notebook', desc: 'Wrong answers stick around. Each one gets an explanation and shows up again until you get it right.', icon: 'target' },
  { title: 'Score Breakdowns', desc: 'See exactly where your points come from. Reading, Writing, Math — broken down by topic and difficulty.', icon: 'chart' },
  { title: 'College Fit Finder', desc: 'Compare your scores against real admission data from 780+ schools. Filter by what matters to you.', icon: 'school', span: 2 },
]

const STEPS = [
  { num: '01', title: 'Take a diagnostic', desc: 'A practice test pinpoints your starting score and the specific topics that need attention.' },
  { num: '02', title: 'Follow your plan', desc: 'A study calendar fills in based on your test date, target score, and the areas where you lost the most points.' },
  { num: '03', title: 'Practice and review', desc: 'Work through targeted questions. Every mistake gets tracked and re-tested until the concept sticks.' },
  { num: '04', title: 'Show up prepared', desc: 'Take a final practice test, review your growth, and walk into the real thing knowing what to expect.' },
]

const STATS = [
  { value: 2000, suffix: '+', label: 'Practice Questions' },
  { value: 17, suffix: '', label: 'Full Practice Tests' },
  { value: 420, suffix: '+', label: 'Avg Point Gain' },
]

const SAT_SECTIONS = [
  { name: 'Reading & Writing', topics: 'Vocabulary, Evidence-Based Reading, Grammar Rules, Rhetoric' },
  { name: 'Math', topics: 'Algebra, Problem Solving, Advanced Math, Geometry, Trigonometry' },
]

const ACT_SECTIONS = [
  { name: 'English', topics: 'Grammar, Punctuation, Sentence Structure, Rhetorical Skills' },
  { name: 'Math', topics: 'Pre-Algebra through Trigonometry, Coordinate Geometry' },
  { name: 'Reading', topics: 'Prose Fiction, Social Science, Humanities, Natural Science' },
  { name: 'Science', topics: 'Data Representation, Research Summaries, Conflicting Viewpoints' },
]

/* ═══ 3D SCENE — lightweight, no jank ═══ */
function FloatingShape({ position, geometry, color, speed, scale = 1 }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime() * speed
    mesh.current.rotation.y = t * 0.15
    mesh.current.rotation.x = Math.sin(t * 0.1) * 0.08
    mesh.current.position.y = position[1] + Math.sin(t * 0.2) * 0.3
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {geometry}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.06} />
    </mesh>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.2} />
      {/* Books as simple boxes */}
      <FloatingShape position={[-3.2, 1, -3]} geometry={<boxGeometry args={[0.7, 1, 0.12]} />} color="#0ea5e9" speed={0.8} scale={0.9} />
      <FloatingShape position={[3.5, -0.5, -4]} geometry={<boxGeometry args={[0.6, 0.9, 0.1]} />} color="#1e3a8a" speed={0.6} scale={0.7} />
      <FloatingShape position={[-1.5, -1.8, -5]} geometry={<boxGeometry args={[0.5, 0.7, 0.08]} />} color="#38bdf8" speed={1.0} scale={0.6} />
      {/* Pencil as cylinder */}
      <FloatingShape position={[2.2, 1.8, -3.5]} geometry={<cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />} color="#f59e0b" speed={0.7} />
      <FloatingShape position={[-2.5, -1.2, -4]} geometry={<cylinderGeometry args={[0.03, 0.03, 1, 6]} />} color="#f59e0b" speed={0.9} />
      {/* Globe */}
      <FloatingShape position={[0.5, 1.5, -6]} geometry={<sphereGeometry args={[0.5, 12, 12]} />} color="#0ea5e9" speed={0.5} />
      {/* Background wireframes */}
      <FloatingShape position={[0, 0, -9]} geometry={<icosahedronGeometry args={[2.5, 1]} />} color="#0ea5e9" speed={0.2} />
      <FloatingShape position={[3, -2, -7]} geometry={<octahedronGeometry args={[1.2, 0]} />} color="#38bdf8" speed={0.3} />
    </>
  )
}

class WebGLBoundary extends Component {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? null : this.props.children }
}

function Background3D() {
  return (
    <WebGLBoundary>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }} style={{ background: 'transparent' }}
          onCreated={({ gl, invalidate }) => { setInterval(invalidate, 50) }}>
          <Scene3D />
        </Canvas>
      </div>
    </WebGLBoundary>
  )
}

/* ═══ HOOKS ═══ */
function useCountUp(target, duration, start) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let frame, t0
    const step = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, start])
  return val
}

/* ═══ SUB-COMPONENTS ═══ */
function SectionHeading({ children, sub, label, dark }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
      {label && <p style={{ fontSize: 12, fontWeight: 700, color: C.primary, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 14 }}>{label}</p>}
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: dark ? C.white : C.dark, marginBottom: 14, lineHeight: 1.15 }}>{children}</h2>
      {sub && <p style={{ color: dark ? C.lightGray : C.gray, fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>{sub}</p>}
    </div>
  )
}

function FeatureIcon({ type }) {
  const icons = {
    book: <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2.5 2.5 0 012.5-2.5H20v17H6.5z" />,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    chart: <path d="M18 20V10M12 20V4M6 20v-6" />,
    school: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" /></>,
  }
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[type]}</svg>
}

function StatItem({ stat, index, inView }) {
  const count = useCountUp(stat.value, 1800, inView)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} style={{ textAlign: 'center', flex: '1 1 160px' }}>
      <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: C.white }}>{count}{stat.suffix}</div>
      <div style={{ color: C.lightGray, fontSize: 13, marginTop: 6, fontWeight: 500, letterSpacing: '0.5px' }}>{stat.label}</div>
    </motion.div>
  )
}

/* ═══ MAIN PAGE ═══ */
export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [activeExam, setActiveExam] = useState('sat')
  const pageRef = useRef(null)
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollTop > 60)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const sections = activeExam === 'sat' ? SAT_SECTIONS : ACT_SECTIONS

  return (
    <div ref={pageRef} style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: 'var(--agora-bg)', scrollBehavior: 'smooth' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 clamp(20px, 4vw, 48px)',
        background: scrolled ? 'rgba(11,18,32,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/logo.png" alt="The Agora Project" style={{ width: 34, height: 34, borderRadius: 9 }} />
            <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 16, color: C.white }}>The Agora Project</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link to="/login" style={{ padding: '8px 18px', color: C.lightGray, textDecoration: 'none', fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans'", borderRadius: 9, border: '1px solid rgba(255,255,255,0.08)' }}>Sign In</Link>
            <Link to="/login" style={{ padding: '8px 22px', background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: "'Sora'", borderRadius: 9, boxShadow: '0 3px 12px rgba(14,165,233,.2)' }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '100px 20px 60px', textAlign: 'center' }}>
        <Background3D />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <motion.img
            src="/logo.png" alt="The Agora Project"
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 88, height: 88, borderRadius: 20, marginBottom: 24, filter: 'drop-shadow(0 6px 24px rgba(14,165,233,.3))' }}
          />
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ fontFamily: "'Sora'", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: C.white, lineHeight: 1.1, marginBottom: 18, letterSpacing: '-0.5px' }}>
            SAT and ACT prep that{' '}
            <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>actually works</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
            style={{ fontSize: 17, color: C.lightGray, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px' }}>
            Take a diagnostic. Get a study plan. Practice the topics where you actually lose points. Track everything.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" style={{ padding: '14px 34px', background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: 'white', textDecoration: 'none', fontSize: 15, fontWeight: 600, fontFamily: "'Sora'", borderRadius: 11, boxShadow: '0 6px 24px rgba(14,165,233,.25)' }}>
              Start Free
            </Link>
            <a href="#how-it-works" style={{ padding: '14px 28px', color: C.lightGray, textDecoration: 'none', fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans'", borderRadius: 11, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 6 }}>
              How It Works
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </a>
          </motion.div>

          {/* Score cards with CSS float animation (no jank) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { label: 'Score', val: '1420', c: C.primary, delay: 0.7, anim: 'floatA' },
              { label: 'Improvement', val: '+420', c: C.green, delay: 0.8, anim: 'floatB' },
              { label: 'Streak', val: '14 days', c: C.accent, delay: 0.9, anim: 'floatC' },
            ].map((d) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: d.delay, duration: 0.5, type: 'spring', stiffness: 100 }}
                className={d.anim}
                style={{
                  background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14,
                  padding: '14px 22px', minWidth: 120, cursor: 'default',
                  transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                }}>
                <div style={{ color: C.lightGray, fontSize: 11, marginBottom: 3 }}>{d.label}</div>
                <div style={{ fontFamily: "'Sora'", fontSize: 24, fontWeight: 800, color: d.c }}>{d.val}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE COVER — Interactive SAT/ACT toggle */}
      <section style={{ padding: 'clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px)', background: C.white }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHeading label="Coverage" sub="Every section of both exams, broken down by topic.">
            What We Cover
          </SectionHeading>

          {/* Exam toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 40 }}>
            {['sat', 'act'].map(ex => (
              <button key={ex} onClick={() => setActiveExam(ex)} style={{
                padding: '10px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: "'Sora'", fontWeight: 700, fontSize: 14, letterSpacing: '0.5px',
                transition: 'all 0.25s',
                background: activeExam === ex ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)' : '#f1f5f9',
                color: activeExam === ex ? 'white' : C.gray,
                boxShadow: activeExam === ex ? '0 4px 16px rgba(14,165,233,.2)' : 'none',
              }}>
                {ex.toUpperCase()}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeExam} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
              style={{ display: 'grid', gridTemplateColumns: sections.length <= 2 ? '1fr 1fr' : 'repeat(2, 1fr)', gap: 16 }}>
              {sections.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,.03)' }}>
                  <h4 style={{ fontFamily: "'Sora'", fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{s.name}</h4>
                  <p style={{ color: C.gray, fontSize: 13, lineHeight: 1.6 }}>{s.topics}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: 'clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px)', background: C.offWhite }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <SectionHeading label="Features" sub="One platform. Every tool you need.">
            How AGORA Helps You Improve
          </SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(14,165,233,.08)' }}
                style={{
                  gridColumn: f.span ? `span ${f.span}` : 'span 1',
                  background: C.card, borderRadius: 16, padding: 28,
                  border: `1px solid ${C.cardBorder}`, boxShadow: '0 2px 12px rgba(0,0,0,.03)',
                  transition: 'all 0.25s ease', cursor: 'default',
                }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 16 }}>
                  <FeatureIcon type={f.icon} />
                </div>
                <h3 style={{ fontFamily: "'Sora'", fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ color: C.gray, fontSize: 13.5, lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: 'clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px)', background: C.white }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <SectionHeading label="Process" sub="Four steps. No fluff.">
            How It Works
          </SectionHeading>
          <div style={{ position: 'relative', paddingLeft: 48 }}>
            <div style={{ position: 'absolute', left: 17, top: 6, bottom: 6, width: 2, background: 'linear-gradient(180deg, #0ea5e9, #38bdf8, #e2e8f0)' }} />
            {STEPS.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                style={{ position: 'relative', marginBottom: i < STEPS.length - 1 ? 40 : 0 }}>
                <div style={{
                  position: 'absolute', left: -48, top: 0, width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Sora'", fontSize: 12, fontWeight: 700, color: 'white',
                  boxShadow: '0 3px 12px rgba(14,165,233,.2)',
                }}>{s.num}</div>
                <h3 style={{ fontFamily: "'Sora'", fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{s.title}</h3>
                <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: 'clamp(70px, 8vw, 100px) clamp(20px, 4vw, 48px)', background: C.navy }}>
        <div ref={statsRef} style={{ maxWidth: 700, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 6vw, 72px)', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => <StatItem key={s.label} stat={s} index={i} inView={statsInView} />)}
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section style={{ padding: 'clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px)', background: C.offWhite }}>
        <SectionHeading label="Preview" sub="See your scores, weak areas, and next steps all in one place.">
          Your Dashboard
        </SectionHeading>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }}
          style={{ maxWidth: 860, margin: '0 auto', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(14,165,233,.1)', boxShadow: '0 24px 72px rgba(0,0,0,.12)' }}>
          <div style={{ background: C.navy, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
            <div style={{ marginLeft: 12, flex: 1, height: 24, borderRadius: 7, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>theagoraproject.app/dashboard</div>
          </div>
          <div style={{ padding: 24, background: C.navy, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { label: 'Current Score', value: '1380', sub: '+120 from baseline', color: C.primary },
              { label: 'Study Progress', value: '67%', color: C.accent },
              { label: 'Streak', value: '14 days', sub: 'Keep going', color: '#a78bfa' },
            ].map(c => (
              <div key={c.label} style={{ flex: '1 1 180px', background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginBottom: 5 }}>{c.label}</div>
                <div style={{ fontFamily: "'Sora'", fontSize: 32, fontWeight: 800, color: c.color }}>{c.value}</div>
                {c.sub && <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 3 }}>{c.sub}</div>}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SAT vs ACT — Which one? */}
      <section style={{ padding: 'clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px)', background: C.white }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHeading label="Comparison" sub="Not sure which test to take? Take both and compare your results.">
            SAT or ACT?
          </SectionHeading>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { name: 'SAT', time: '2 hrs 14 min', sections: '2 sections', scoring: '400-1600', color: C.primary },
              { name: 'ACT', time: '2 hrs 55 min', sections: '4 sections', scoring: '1-36', color: C.accent },
            ].map(t => (
              <div key={t.name} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,.03)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Sora'", fontSize: 28, fontWeight: 800, color: t.color, marginBottom: 12 }}>{t.name}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[t.time, t.sections, `Score: ${t.scoring}`].map(line => (
                    <div key={line} style={{ color: C.gray, fontSize: 14, padding: '6px 0', borderBottom: `1px solid ${C.cardBorder}` }}>{line}</div>
                  ))}
                </div>
                <Link to="/login" style={{ display: 'inline-block', marginTop: 20, padding: '10px 24px', background: t.color === C.primary ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)' : 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: 'white', textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: "'Sora'", borderRadius: 9 }}>
                  Try {t.name}
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT US */}
      <section style={{ padding: 'clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px)', background: C.offWhite }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHeading label="About Us">
            Why We Built This
          </SectionHeading>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 'clamp(28px, 4vw, 40px)', boxShadow: '0 4px 20px rgba(0,0,0,.04)' }}>
            <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              AGORA started because we saw the same problem over and over: students spending hundreds of hours studying the wrong things. Expensive prep courses teach to the middle. Textbooks cover everything but prioritize nothing. Students walk into test day hoping they studied enough instead of knowing they did.
            </p>
            <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              We built AGORA to fix that. The platform starts with a diagnostic that maps exactly where you lose points — not just "math" or "reading," but the specific question types and concepts that cost you the most. From there, every study session, every practice question, and every review is targeted at closing those gaps.
            </p>
            <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.8 }}>
              It supports both the SAT and ACT, adapts to your schedule, and tracks your progress down to the individual topic. No filler. No busywork. Just the work that actually moves your score. And it is completely free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(90px, 10vw, 140px) 20px', textAlign: 'center', background: C.navy, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 42px)', color: C.white, marginBottom: 14 }}>
            Take a free diagnostic today
          </h2>
          <p style={{ color: C.lightGray, fontSize: 16, maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Find out where you stand, get a personalized study plan, and start improving.
          </p>
          <Link to="/login" style={{
            display: 'inline-block', padding: '14px 40px',
            background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: 'white',
            textDecoration: 'none', fontSize: 16, fontWeight: 600, fontFamily: "'Sora'", borderRadius: 12,
            boxShadow: '0 8px 32px rgba(14,165,233,.25)',
          }}>
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 20px', background: C.dark, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <img src="/logo.png" alt="" style={{ width: 24, height: 24, borderRadius: 6 }} />
          <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>The Agora Project</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>Built by students, for students.</p>
      </footer>

      <style>{`
        @keyframes floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes floatB { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes floatC { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .floatA { animation: floatA 4s ease-in-out infinite; }
        .floatB { animation: floatB 4.5s ease-in-out 0.5s infinite; }
        .floatC { animation: floatC 3.8s ease-in-out 1s infinite; }
        .floatA:hover, .floatB:hover, .floatC:hover {
          animation-play-state: paused;
          transform: translateY(-4px) scale(1.05) !important;
          box-shadow: 0 12px 36px rgba(14,165,233,0.15);
          border-color: rgba(14,165,233,0.2);
        }
        @media (max-width: 900px) {
          #features > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #features > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
