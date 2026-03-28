import { useState, useEffect, useRef, useMemo, useCallback, Component } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ═══ COLORS — matches original Agora theme ═══ */
const C = {
  primary: '#0ea5e9',
  primaryDark: '#0284c7',
  accent: '#f59e0b',
  navy: '#0b1220',
  navyMid: '#172554',
  dark: '#0f172a',
  white: '#ffffff',
  offWhite: '#f8fafc',
  gray: '#64748b',
  lightGray: '#94a3b8',
  card: 'rgba(255,255,255,.96)',
  cardBorder: 'rgba(14,165,233,.08)',
  green: '#10b981',
}

/* ═══ DATA ═══ */
const FEATURES = [
  { title: 'Adaptive Study Guides', desc: 'Master Reading & Writing with passage-based practice. Conquer Math with step-by-step formula guides that adjust as your scores improve.', icon: 'book', span: 2 },
  { title: 'Timed Practice Tests', desc: 'Full-length SAT and ACT simulations with real section timing, automatic scoring, and detailed breakdowns.', icon: 'clock' },
  { title: 'Smart Study Calendar', desc: 'Set your test date and target score. Get a day-by-day plan that adapts to your schedule and weak areas.', icon: 'calendar' },
  { title: 'Mistake Tracker', desc: 'Every wrong answer is saved with explanations. Review errors by question type and topic until the pattern clicks.', icon: 'target' },
  { title: 'Score Analytics', desc: 'Section breakdowns for Reading, Writing, and Math. Percentile tracking and super-score calculations after every test.', icon: 'chart' },
  { title: 'College Recruiting', desc: 'See your admission chances at 780+ schools based on your scores. Filter by region, size, cost, and major.', icon: 'school', span: 2 },
]

const STEPS = [
  { num: '01', title: 'Take a Diagnostic', desc: 'Start with a practice exam so we know exactly where you stand.' },
  { num: '02', title: 'Get Your Study Plan', desc: 'We build a personalized schedule based on your test date and weak areas.' },
  { num: '03', title: 'Practice with Purpose', desc: 'Work through adaptive questions that target your actual weak spots.' },
  { num: '04', title: 'Walk in Ready', desc: 'Take a final mock exam and head into test day with real confidence.' },
]

const STATS = [
  { value: 780, suffix: '+', label: 'Partner Schools' },
  { value: 2000, suffix: '+', label: 'Practice Questions' },
  { value: 200, suffix: '+', label: 'Avg Point Improvement' },
  { value: 100, suffix: '%', label: 'Free to Use' },
]

const TESTIMONIALS = [
  { text: 'I went from a 1090 to a 1380 in two months. The study plan actually worked.', name: 'Sarah M.', detail: 'Junior, +290 points' },
  { text: 'The mistake tracker changed everything. I stopped making the same errors on Reading.', name: 'James K.', detail: 'Senior, +240 points' },
  { text: 'Way better than expensive prep courses. And it is free.', name: 'Maria L.', detail: 'Sophomore, +180 points' },
]

/* ═══ 3D SCENE ═══ */
function FloatingBook({ position, color, speed }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * speed * 0.3
    mesh.current.rotation.x = Math.sin(t * speed * 0.2) * 0.15
  })
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[0.8, 1.1, 0.15]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.12} roughness={0.4} metalness={0.1} />
      </mesh>
    </Float>
  )
}

function FloatingPencil({ position, speed }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.z = Math.sin(t * speed * 0.25) * 0.3 + 0.5
  })
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={mesh} position={position}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshPhysicalMaterial color="#f59e0b" transparent opacity={0.1} />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#0ea5e9" />
      <pointLight position={[-5, -3, 3]} intensity={0.2} color="#f59e0b" />
      <FloatingBook position={[-3, 1.5, -3]} color="#0ea5e9" speed={1.2} />
      <FloatingBook position={[3.5, -1, -4]} color="#38bdf8" speed={0.8} />
      <FloatingBook position={[-1, -2, -5]} color="#1e3a8a" speed={1.5} />
      <FloatingPencil position={[2, 2, -3]} speed={1.0} />
      <FloatingPencil position={[-2.5, -1.5, -4]} speed={1.3} />
      <mesh position={[0, 0, -8]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.04} />
      </mesh>
      <mesh position={[1, -1, -6]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.03} />
      </mesh>
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
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }} style={{ background: 'transparent' }}>
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

/* ═══ COMPONENTS ═══ */
function SectionHeading({ children, sub, label }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
      {label && <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 14 }}>{label}</p>}
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: C.dark, marginBottom: 16, lineHeight: 1.15 }}>{children}</h2>
      {sub && <p style={{ color: C.gray, fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>{sub}</p>}
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
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[type]}</svg>
}

function StatItem({ stat, index, inView }) {
  const count = useCountUp(stat.value, 2000, inView)
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} style={{ textAlign: 'center', flex: '1 1 180px' }}>
      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: C.primary }}>{count}{stat.suffix}</div>
      <div style={{ color: C.gray, fontSize: 14, marginTop: 6, fontWeight: 500 }}>{stat.label}</div>
    </motion.div>
  )
}

/* ═══ LANDING PAGE ═══ */
export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)
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

  useEffect(() => {
    if (carouselPaused) return
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [carouselPaused])

  return (
    <div ref={pageRef} style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: 'var(--agora-bg)', scrollBehavior: 'smooth' }}>

      {/* ─── NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 clamp(20px, 4vw, 48px)',
        background: scrolled ? 'rgba(11,18,32,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="/logo.png" alt="The Agora Project" style={{ width: 36, height: 36, borderRadius: 10, filter: 'drop-shadow(0 2px 8px rgba(14,165,233,.3))' }} />
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 17, color: C.white }}>The Agora Project</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/login" style={{ padding: '9px 20px', color: C.lightGray, textDecoration: 'none', fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>Sign In</Link>
            <Link to="/login" style={{ padding: '9px 24px', background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: "'Sora', sans-serif", borderRadius: 10, boxShadow: '0 4px 16px rgba(14,165,233,.25)', transition: 'all 0.2s' }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '120px 20px 80px', textAlign: 'center' }}>
        <Background3D />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
          {/* Logo slides up from bottom */}
          <motion.img
            src="/logo.png" alt="The Agora Project"
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 100, height: 100, borderRadius: 22, marginBottom: 28, filter: 'drop-shadow(0 8px 30px rgba(14,165,233,.35))' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 800, color: C.white, lineHeight: 1.08, marginBottom: 20, letterSpacing: '-1px' }}
          >
            Your Path to a{' '}
            <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Perfect Score</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ fontSize: 19, color: C.lightGray, lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}
          >
            Personalized SAT and ACT prep with adaptive study guides, timed practice tests, and real-time progress tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/login" style={{
              padding: '15px 36px', background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
              color: 'white', textDecoration: 'none', fontSize: 16, fontWeight: 600,
              fontFamily: "'Sora', sans-serif", borderRadius: 12,
              boxShadow: '0 8px 30px rgba(14,165,233,.3)',
              transition: 'all 0.3s',
            }}>
              Start Free
            </Link>
            <a href="#features" style={{
              padding: '15px 30px', color: C.lightGray, textDecoration: 'none',
              fontSize: 15, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
              borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              See How It Works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </a>
          </motion.div>

          {/* Floating score preview cards */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 56, flexWrap: 'wrap' }}>
            {[
              { label: 'Score', value: '1420', color: C.primary },
              { label: 'Improvement', value: '+340', color: C.green },
              { label: 'Streak', value: '14 days', color: C.accent },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 80 }}
                style={{
                  background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
                  padding: '16px 24px', minWidth: 130,
                }}
              >
                <div style={{ color: C.lightGray, fontSize: 12, marginBottom: 4 }}>{card.label}</div>
                <div style={{ fontFamily: "'Sora'", fontSize: 26, fontWeight: 800, color: card.color }}>{card.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)', background: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeading label="Features" sub="Everything you need to raise your score, all in one platform.">
            Built for Real Improvement
          </SectionHeading>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(14,165,233,.1)' }}
                style={{
                  gridColumn: f.span ? `span ${f.span}` : 'span 1',
                  background: C.card, borderRadius: 18, padding: 30,
                  border: `1px solid ${C.cardBorder}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,.04)',
                  transition: 'all 0.3s ease', cursor: 'default',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', marginBottom: 18,
                }}>
                  <FeatureIcon type={f.icon} />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{ padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)', background: C.white }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <SectionHeading label="How It Works" sub="From sign-up to test day in four steps.">
            Simple, Structured, Effective
          </SectionHeading>

          <div style={{ position: 'relative', paddingLeft: 52 }}>
            <div style={{ position: 'absolute', left: 19, top: 8, bottom: 8, width: 2, background: 'linear-gradient(180deg, #0ea5e9, #38bdf8, #e2e8f0)' }} />
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ position: 'relative', marginBottom: i < STEPS.length - 1 ? 44 : 0 }}
              >
                <div style={{
                  position: 'absolute', left: -52, top: 0, width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Sora'", fontSize: 13, fontWeight: 700, color: 'white',
                  boxShadow: '0 4px 16px rgba(14,165,233,.25)',
                }}>{s.num}</div>
                <h3 style={{ fontFamily: "'Sora'", fontSize: 17, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ padding: 'clamp(80px, 10vw, 100px) clamp(20px, 4vw, 48px)', background: C.navy }}>
        <div ref={statsRef} style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 5vw, 56px)', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => <StatItem key={s.label} stat={s} index={i} inView={statsInView} />)}
        </div>
      </section>

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)', background: C.offWhite }}>
        <SectionHeading label="Preview" sub="Your personalized command center for test prep.">
          Your Study Dashboard
        </SectionHeading>
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 900, margin: '0 auto', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(14,165,233,.12)', boxShadow: '0 30px 90px rgba(0,0,0,.15)', perspective: 1200 }}
        >
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)', background: C.navy }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ marginLeft: 14, flex: 1, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>theagoraproject.app/dashboard</div>
          </div>
          <div style={{ padding: 28, background: C.navy, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Current Score', value: '1380', sub: '+120 from baseline', color: C.primary },
              { label: 'Study Progress', value: '67%', sub: null, color: C.accent },
              { label: 'Streak', value: '14 days', sub: 'Keep it going!', color: '#a78bfa' },
            ].map(c => (
              <div key={c.label} style={{ flex: '1 1 200px', background: `rgba(255,255,255,0.04)`, borderRadius: 16, padding: 22, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontFamily: "'Sora'", fontSize: 36, fontWeight: 800, color: c.color }}>{c.value}</div>
                {c.sub && <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 4 }}>{c.sub}</div>}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)', background: C.white }}>
        <SectionHeading label="Testimonials" sub="Real results from real students.">
          Students See the Difference
        </SectionHeading>
        <div
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
          style={{ maxWidth: 560, margin: '0 auto', position: 'relative', minHeight: 200 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              style={{
                background: C.card, border: `1px solid ${C.cardBorder}`,
                borderRadius: 20, padding: '32px 28px', textAlign: 'center',
                boxShadow: '0 8px 30px rgba(0,0,0,.06)',
              }}
            >
              <p style={{ fontSize: 17, color: C.gray, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <div style={{ fontFamily: "'Sora'", fontWeight: 700, color: C.dark, fontSize: 15 }}>{TESTIMONIALS[activeTestimonial].name}</div>
              <div style={{ color: C.primary, fontSize: 13, marginTop: 4, fontWeight: 600 }}>{TESTIMONIALS[activeTestimonial].detail}</div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 24 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 28 : 10, height: 10, borderRadius: 5, background: i === activeTestimonial ? C.primary : '#e2e8f0', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: 'clamp(100px, 12vw, 160px) 20px', textAlign: 'center', background: C.navy, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 46px)', color: C.white, marginBottom: 16 }}>
            Ready to raise your score?
          </h2>
          <p style={{ color: C.lightGray, fontSize: 17, maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Join students already prepping smarter with a plan built around their goals.
          </p>
          <Link to="/login" style={{
            display: 'inline-block', padding: '16px 44px',
            background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: 'white',
            textDecoration: 'none', fontSize: 18, fontWeight: 600,
            fontFamily: "'Sora'", borderRadius: 14,
            boxShadow: '0 12px 40px rgba(14,165,233,.3)',
          }}>
            Get Started — It's Free
          </Link>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '36px 20px', background: C.dark, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 26, height: 26, borderRadius: 7 }} />
          <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>The Agora Project</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>Built by students, for students.</p>
      </footer>

      <style>{`
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
