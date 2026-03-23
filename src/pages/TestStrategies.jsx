import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Icon from '../components/AppIcons.jsx'
import { getInitialPreferredExam } from '../lib/examChoice.js'

const sf = 'Sora, sans-serif'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [.22, 1, .36, 1] },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [.22, 1, .36, 1] } },
}

/* ═══════════════════════════════════════════
   STRATEGY DATA
   ═══════════════════════════════════════════ */

const SAT_STRATEGIES = {
  overview: {
    title: 'SAT Overview',
    icon: 'test',
    items: [
      { q: 'How long is the SAT?', a: 'The digital SAT is 2 hours and 14 minutes total, split into two main sections. There is no separate experimental section.' },
      { q: 'What are the sections?', a: 'Reading & Writing (two modules, 32 questions each, 64 total) and Math (two modules, 22 questions each, 44 total). Total: 108 questions.' },
      { q: 'How does the adaptive format work?', a: 'Each section has two modules. Your performance on Module 1 determines the difficulty of Module 2. A harder Module 2 means a higher score ceiling — it\'s a good thing.' },
      { q: 'Is there a break?', a: 'Yes — a 10-minute break between the Reading & Writing section and the Math section.' },
      { q: 'What is the scoring range?', a: '400–1600 total. Reading & Writing: 200–800. Math: 200–800. There is no penalty for wrong answers.' },
    ],
  },
  whatToBring: {
    title: 'What to Bring on Test Day',
    icon: 'check',
    items: [
      { q: 'Required items', a: 'Your admission ticket (printed or on phone), a valid photo ID, a fully charged laptop or tablet with the Bluebook app installed, and your charger.' },
      { q: 'Calculator policy', a: 'A built-in Desmos calculator is available on-screen for the entire Math section. You may also bring an approved physical calculator (TI-84, etc.) as a backup.' },
      { q: 'What about pencils?', a: 'The digital SAT is taken on a device — no pencils or paper needed. However, you may bring scratch paper or a pen for notes if your testing center allows it. Some centers provide scratch paper.' },
      { q: 'Snacks and water?', a: 'Bring a snack and water for the break. You can\'t eat during the test, but the 10-minute break is a good time to refuel.' },
    ],
  },
  timing: {
    title: 'Timing Strategy',
    icon: 'clock',
    items: [
      { q: 'Reading & Writing timing', a: 'Each R&W module gives you 32 minutes for 32 questions — about 1 minute per question. Flag hard ones and come back. The passage is short (1–2 paragraphs per question), so don\'t overthink.' },
      { q: 'Math timing', a: 'Each Math module gives you 35 minutes for 22 questions — about 1 minute 35 seconds per question. Earlier questions are usually faster; save time for the harder ones at the end.' },
      { q: 'Using the built-in timer', a: 'Bluebook shows a countdown timer. Check it every 5 questions or so. If you\'re halfway through questions, you should be at or before the halfway time mark.' },
      { q: 'When to move on', a: 'If a question has taken more than 2 minutes, flag it and move on. One hard question isn\'t worth three easier ones.' },
    ],
  },
  guessing: {
    title: 'Guessing & Elimination',
    icon: 'target',
    items: [
      { q: 'Is there a penalty for guessing?', a: 'No. There is no penalty for wrong answers on the SAT. Never leave a question blank — always guess if you\'re unsure.' },
      { q: 'How to eliminate answers', a: 'Try to eliminate at least 2 choices before guessing. Even eliminating 1 wrong answer improves your odds from 25% to 33%. Eliminating 2 gives you a 50/50 shot.' },
      { q: 'Strategic guessing on R&W', a: 'Look for answers that are too extreme, too narrow, or not supported by the passage. The correct answer on the SAT almost always has direct textual evidence.' },
      { q: 'Strategic guessing on Math', a: 'Try plugging answer choices back into the problem (backsolving). Start with choice B or C. If the answer doesn\'t need to be exact, estimate and eliminate.' },
    ],
  },
  navigation: {
    title: 'Skipping & Navigation',
    icon: 'back',
    items: [
      { q: 'Can I go back to questions I skipped?', a: 'Yes — within each module, you can move forward and backward freely. Use the Flag button to mark questions you want to revisit.' },
      { q: 'Can I go back to a previous module?', a: 'No. Once you finish Module 1 and move to Module 2, you cannot return to Module 1. Make sure you\'re satisfied before submitting a module.' },
      { q: 'Best skip strategy', a: 'First pass: answer everything you can quickly. Second pass: tackle flagged questions with remaining time. Final 30 seconds: fill in any blanks with your best guess.' },
    ],
  },
  sectionTips: {
    title: 'Section-Specific Tips',
    icon: 'guide',
    items: [
      { q: 'Reading & Writing tips', a: 'Read the question first, then the passage. The passage is short — read it completely, don\'t skim. For vocabulary-in-context questions, cover the original word and predict what fits. For evidence questions, the answer is always in the text.' },
      { q: 'Math — no calculator mental tricks', a: 'Even though Desmos is available, mental math is faster for simple operations. Know your common fractions-to-decimals conversions, perfect squares up to 15², and basic angle relationships.' },
      { q: 'Math — common traps', a: 'Watch for unit conversions (minutes vs. hours, inches vs. feet). Read what the question actually asks — sometimes they want 2x, not x. Check that your answer makes sense in context.' },
      { q: 'Using Desmos effectively', a: 'Graph both sides of an equation to find intersections. Use tables to test values. Type in the full equation — Desmos solves systems of equations, quadratics, and inequalities instantly.' },
    ],
  },
  mindset: {
    title: 'Test Day Mindset',
    icon: 'sparkle',
    items: [
      { q: 'The night before', a: 'Don\'t cram. Review your weakest formulas for 20 minutes, then stop. Pack everything you need. Set two alarms. Get 7–8 hours of sleep.' },
      { q: 'Morning routine', a: 'Eat a solid breakfast with protein and complex carbs. Arrive 15–30 minutes early. Do a few easy practice problems to warm up your brain.' },
      { q: 'During the test', a: 'If you feel stuck, take 3 deep breaths. Remember that a harder Module 2 is a good sign. Stay focused on the current question — don\'t think about the last one.' },
      { q: 'After a tough section', a: 'Don\'t dwell. The break exists for a reason — use it to reset mentally. Eat your snack, drink water, stretch, and approach Math with fresh eyes.' },
    ],
  },
}

const ACT_STRATEGIES = {
  overview: {
    title: 'ACT Overview',
    icon: 'test',
    items: [
      { q: 'How long is the ACT?', a: 'The ACT is 2 hours and 55 minutes without the optional Writing section, or 3 hours 35 minutes with it. It\'s a paper-based test (though a digital option is growing).' },
      { q: 'What are the sections?', a: 'English (75 questions, 45 min), Math (60 questions, 60 min), Reading (40 questions, 35 min), and Science (40 questions, 35 min). Optional: Writing (1 essay, 40 min). Total: 215 questions.' },
      { q: 'What order are the sections?', a: 'Always: English → Math → Reading → Science → Writing (if taking it). There is a 10-minute break after the Math section.' },
      { q: 'What is the scoring range?', a: '1–36 composite (average of all four section scores). Each section is scored 1–36. There is no penalty for wrong answers.' },
      { q: 'Do questions get harder?', a: 'Yes — on the English and Math sections, questions generally progress from easier to harder. Reading and Science do not follow a strict difficulty order.' },
    ],
  },
  whatToBring: {
    title: 'What to Bring on Test Day',
    icon: 'check',
    items: [
      { q: 'Required items', a: 'Your admission ticket (printed), a valid photo ID, several sharpened No. 2 pencils (not mechanical), and a good eraser.' },
      { q: 'Calculator policy', a: 'You may use an approved calculator on the Math section ONLY. TI-84, TI-Nspire (non-CAS), and most standard graphing calculators are allowed. No calculators with CAS, Wi-Fi, or QWERTY keyboards. NO calculator on Science.' },
      { q: 'What NOT to bring', a: 'No phones or smartwatches (must be completely off and stored away). No scratch paper — you can write in your test booklet. No highlighters or colored pencils.' },
      { q: 'Comfort items', a: 'Bring a snack and drink for the break, a watch without an alarm (to track time), and dress in layers — testing rooms vary in temperature.' },
    ],
  },
  timing: {
    title: 'Timing Strategy',
    icon: 'clock',
    items: [
      { q: 'English timing (36 seconds per question)', a: 'This is the fastest-paced section per question but passages are familiar. Read each passage naturally, answering grammar questions as you go. Don\'t read the whole passage first — answer inline.' },
      { q: 'Math timing (60 seconds per question)', a: 'Questions #1–30 should take under 45 seconds each. Bank that time for #40–60, which are much harder. If you can\'t solve #55–60, guess and move on.' },
      { q: 'Reading timing (52 seconds per question)', a: 'You have 35 minutes for 4 passages with 10 questions each. Spend ~8 minutes per passage (3 min reading + 5 min answering). Start with your strongest passage type.' },
      { q: 'Science timing (52 seconds per question)', a: 'Don\'t read the whole experiment description first. Go straight to the questions, then refer back to the data. Most answers come from reading graphs and tables, not understanding the experiment.' },
    ],
  },
  guessing: {
    title: 'Guessing & Elimination',
    icon: 'target',
    items: [
      { q: 'Is there a penalty for guessing?', a: 'No. There is no penalty for wrong answers on the ACT. Fill in every bubble — never leave anything blank.' },
      { q: 'How to eliminate answers', a: 'The ACT loves "distractor" answers that are partially correct. Eliminate answers that are too extreme, only half-right, or use words from the passage out of context.' },
      { q: 'English elimination', a: 'When in doubt, the shortest answer is often correct on the ACT English section. "OMIT the underlined portion" is correct about 25% of the time — don\'t be afraid to pick it.' },
      { q: 'Math elimination', a: 'The ACT gives 5 answer choices (A–E). Plug in simple numbers (0, 1, 2) to test formulas. On geometry problems, estimate visually — figures are drawn roughly to scale.' },
      { q: 'Bubble strategy for time crunch', a: 'If you\'re running out of time, guess the same letter for all remaining questions (e.g., all C/H). Statistically, this is better than random guessing since ACT answer distributions are roughly even.' },
    ],
  },
  navigation: {
    title: 'Skipping & Going Back',
    icon: 'back',
    items: [
      { q: 'Can I go back to questions I skipped?', a: 'Yes — within each section, you can flip back and forth freely in your test booklet. Circle skipped questions in your booklet so you can find them quickly.' },
      { q: 'Can I go back to a previous section?', a: 'No. When time is called on a section, you must stop. You cannot go back to a previous section or work ahead to the next section. Proctors watch for this.' },
      { q: 'Best skip strategy for ACT', a: 'English/Math: skip anything that takes more than 60–90 seconds. Mark it in your booklet, leave the bubble blank, and come back. Reading/Science: skip the hardest passage and come back if time allows.' },
      { q: 'Bubble sheet management', a: 'If you skip questions, be very careful with your bubble sheet alignment. Every few questions, check that your bubble number matches the question number. Mis-bubbling is one of the most common ACT mistakes.' },
    ],
  },
  sectionTips: {
    title: 'Section-Specific Tips',
    icon: 'guide',
    items: [
      { q: 'English — grammar rules to know', a: 'Master comma rules (introductory clauses, lists, appositives), subject-verb agreement with tricky intervening phrases, pronoun ambiguity, and parallel structure. These cover ~60% of English questions.' },
      { q: 'English — rhetorical questions', a: 'For "Which choice best accomplishes the goal?" questions, read the stated goal carefully. The answer must match both the tone and content of what\'s being asked for.' },
      { q: 'Math — difficulty progression', a: 'Questions go from easy (#1–20) to medium (#21–40) to hard (#41–60). If you\'re aiming for a 25+, focus on getting #1–40 right. If aiming for 30+, you need most of #41–50 too.' },
      { q: 'Reading — passage order strategy', a: 'The four passage types are always: Prose Fiction, Social Science, Humanities, Natural Science. Start with the type you\'re fastest at. Many students find Social Science or Natural Science easiest.' },
      { q: 'Science — it\'s not really "science"', a: 'ACT Science is a data interpretation test. You don\'t need to know chemistry or biology — you need to read graphs, compare data trends, and find patterns. Only 2–3 questions per test require outside science knowledge.' },
      { q: 'Science — conflicting viewpoints', a: 'One passage will present 2–3 scientists with different views. Read each viewpoint separately and note where they agree vs. disagree. Questions ask you to identify which scientist would agree/disagree with a statement.' },
    ],
  },
  mindset: {
    title: 'Test Day Mindset',
    icon: 'sparkle',
    items: [
      { q: 'The night before', a: 'Lay out your ticket, ID, pencils, calculator, snack, and watch. Review the math formulas you\'re weakest on for 15 minutes, then stop. Set two alarms and get a full night\'s sleep.' },
      { q: 'Morning routine', a: 'Eat breakfast with protein (eggs, yogurt, peanut butter). Arrive 30 minutes early — latecomers may be turned away. Use the wait time to do a few easy warm-up problems.' },
      { q: 'Pacing mentality', a: 'The ACT is a speed test — most students don\'t finish every section. That\'s normal. It\'s better to get 35 questions right with confidence than to rush through all 40 and miss 15.' },
      { q: 'Between sections', a: 'When a section ends, let it go. You can\'t change it. Take a deep breath and focus 100% on the next section. Use the break after Math to stretch, eat, and reset.' },
    ],
  },
}

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

function StrategySection({ section, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <motion.div variants={cardAnim} style={{
      background: '#fff',
      border: '1px solid rgba(14,165,233,.12)',
      borderRadius: 18,
      boxShadow: '0 2px 12px rgba(15,23,42,.05)',
      overflow: 'hidden',
      marginBottom: 14,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', gap: 14,
          background: open ? 'linear-gradient(135deg, rgba(14,165,233,.06), rgba(59,130,246,.03))' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background .2s',
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: open
            ? 'linear-gradient(135deg, #0ea5e9, #3b82f6)'
            : 'linear-gradient(135deg, rgba(14,165,233,.12), rgba(59,130,246,.08))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'all .2s',
          boxShadow: open ? '0 4px 12px rgba(14,165,233,.25)' : 'none',
        }}>
          <Icon name={section.icon} size={20} style={{ color: open ? 'white' : '#0ea5e9' }} />
        </div>
        <div style={{ flex: 1, fontFamily: sf, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>
          {section.title}
        </div>
        <span style={{
          fontSize: 18, color: '#94a3b8', transition: 'transform .2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          &#9660;
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{ padding: '0 24px 22px' }}
        >
          {section.items.map((item, i) => (
            <div key={i} style={{
              padding: '16px 0',
              borderTop: i === 0 ? '1px solid rgba(14,165,233,.08)' : '1px solid #f1f5f9',
            }}>
              <div style={{
                fontFamily: sf, fontSize: 14, fontWeight: 700, color: '#0f172a',
                marginBottom: 6, display: 'flex', alignItems: 'flex-start', gap: 8,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: 'rgba(14,165,233,.10)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 900, color: '#0ea5e9',
                  flexShrink: 0, marginTop: 1,
                }}>
                  Q
                </span>
                {item.q}
              </div>
              <div style={{
                fontSize: 14, color: '#475569', lineHeight: 1.7,
                paddingLeft: 30,
              }}>
                {item.a}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function TestStrategies() {
  const { user } = useAuth()
  const location = useLocation()
  const requestedExam = new URLSearchParams(location.search).get('exam')
  const exam = requestedExam === 'act' || requestedExam === 'sat' ? requestedExam : getInitialPreferredExam(user)

  const strategies = exam === 'act' ? ACT_STRATEGIES : SAT_STRATEGIES
  const sections = useMemo(() => Object.values(strategies), [strategies])

  return (
    <div className="app-layout has-sidebar">
      <Sidebar currentExam={exam} />
      <div className="page fade-up">
        {/* Hero */}
        <motion.div
          {...fadeUp}
          style={{
            background: 'linear-gradient(135deg, #0c4a6e, #1e3a8a)',
            borderRadius: 20,
            padding: '36px 32px',
            marginBottom: 28,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 160, height: 160, borderRadius: '50%',
            background: 'rgba(14,165,233,.15)',
          }} />
          <div style={{
            position: 'absolute', bottom: -20, left: '40%',
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(59,130,246,.1)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(14,165,233,.4)',
              }}>
                <Icon name="target" size={26} style={{ color: 'white' }} />
              </div>
              <div>
                <h1 style={{
                  fontFamily: sf, fontSize: 28, fontWeight: 900,
                  margin: 0, letterSpacing: '-0.3px', color: '#ffffff',
                }}>
                  {exam === 'act' ? 'ACT' : 'SAT'} Test Strategies
                </h1>
                <p style={{
                  margin: '4px 0 0', fontSize: 15,
                  color: 'rgba(255,255,255,.7)', lineHeight: 1.5,
                }}>
                  Everything you need to know before test day — structure, timing, what to bring, and how to maximize your score.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick stats bar */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12, marginBottom: 28,
          }}
        >
          {exam === 'sat' ? (
            <>
              <QuickStat label="Duration" value="2h 14m" icon="clock" />
              <QuickStat label="Questions" value="108" icon="test" />
              <QuickStat label="Sections" value="2" icon="folder" />
              <QuickStat label="Score Range" value="400–1600" icon="chart" />
              <QuickStat label="Wrong Penalty" value="None" icon="check" accent="green" />
            </>
          ) : (
            <>
              <QuickStat label="Duration" value="2h 55m" icon="clock" />
              <QuickStat label="Questions" value="215" icon="test" />
              <QuickStat label="Sections" value="4" icon="folder" />
              <QuickStat label="Score Range" value="1–36" icon="chart" />
              <QuickStat label="Wrong Penalty" value="None" icon="check" accent="green" />
            </>
          )}
        </motion.div>

        {/* Strategy sections */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          {sections.map((section, i) => (
            <StrategySection key={section.title} section={section} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function QuickStat({ label, value, icon, accent }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(14,165,233,.12)',
      borderRadius: 14,
      padding: '18px 16px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(15,23,42,.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: accent === 'green'
          ? 'linear-gradient(90deg, #10b981, #059669)'
          : 'linear-gradient(90deg, #0ea5e9, #3b82f6)',
      }} />
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: accent === 'green' ? 'rgba(16,185,129,.12)' : 'rgba(14,165,233,.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 8px',
      }}>
        <Icon name={icon} size={16} style={{ color: accent === 'green' ? '#059669' : '#0ea5e9' }} />
      </div>
      <div style={{ fontFamily: sf, fontSize: 20, fontWeight: 900, color: '#0f172a' }}>
        {value}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.5px', marginTop: 2 }}>
        {label}
      </div>
    </div>
  )
}
