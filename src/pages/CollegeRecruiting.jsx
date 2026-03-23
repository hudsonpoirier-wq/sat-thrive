import { useState, useMemo, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { getInitialPreferredExam } from '../lib/examChoice.js'
import { getExamConfig, getScoreColumnsForExam } from '../data/examData.js'
import { getExamFromTestId, normalizeTestId, getTestsForExam } from '../data/tests.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { scoreAttemptFromKey } from '../data/examData.js'
import {
  COLLEGES,
  computeAdmissionChance,
  getMatchTier,
  STATES,
  REGIONS,
  REGION_LABELS,
  SETTINGS,
  SIZE_LABELS,
  TAG_LABELS,
  ALL_TAGS,
  STATE_NAMES,
  MAJORS,
  getMajorsForCollege,
} from '../data/collegeData.js'
import Sidebar from '../components/Sidebar.jsx'
import Icon from '../components/AppIcons.jsx'

/* ── Rank tiers as numeric priority for sorting ── */
const RANK_TIER_ORDER = { top10: 1, top25: 2, top50: 3, top100: 4, top200: 5, other: 6 }

/* ── Cost filter presets ── */
const COST_PRESETS = [
  { label: 'Under $10k', max: 10000 },
  { label: '$10k–$25k', min: 10000, max: 25000 },
  { label: '$25k–$50k', min: 25000, max: 50000 },
  { label: '$50k+', min: 50000 },
]

/* ── Use the rank field from the database (falls back to array index) ── */
const COLLEGES_RANKED = COLLEGES.map((c, i) => ({ ...c, rank: c.rank || (i + 1) }))

const PAGE_SIZE = 50

function computeScoresFromAnswers(attempt) {
  try {
    const keyBySection = getAnswerKeyBySection(attempt?.test_id) || null
    if (!keyBySection) return null
    return scoreAttemptFromKey(attempt?.test_id, attempt?.answers || {}, keyBySection)
  } catch {
    return null
  }
}

function formatCost(amount) {
  if (amount === 0) return 'Free'
  if (amount >= 1000) return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}k`
  return `$${amount.toLocaleString()}`
}

function formatEnrollment(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
  return n.toLocaleString()
}

/* ── College domain derivation for logos ── */
const DOMAIN_OVERRIDES = {
  'Harvard University': 'harvard.edu',
  'Stanford University': 'stanford.edu',
  'Massachusetts Institute of Technology': 'mit.edu',
  'California Institute of Technology': 'caltech.edu',
  'Georgia Institute of Technology': 'gatech.edu',
  'United States Military Academy': 'westpoint.edu',
  'United States Naval Academy': 'usna.edu',
  'United States Air Force Academy': 'usafa.edu',
  'William & Mary': 'wm.edu',
  'University of California, Berkeley': 'berkeley.edu',
  'University of California, Los Angeles': 'ucla.edu',
  'University of California, San Diego': 'ucsd.edu',
  'University of California, Davis': 'ucdavis.edu',
  'University of California, Irvine': 'uci.edu',
  'University of California, Santa Barbara': 'ucsb.edu',
  'University of Southern California': 'usc.edu',
  'University of North Carolina at Chapel Hill': 'unc.edu',
  'University of Illinois Urbana-Champaign': 'illinois.edu',
  'University of Texas at Austin': 'utexas.edu',
  'University of Wisconsin-Madison': 'wisc.edu',
  'Washington University in St. Louis': 'wustl.edu',
  'Carnegie Mellon University': 'cmu.edu',
  'New York University': 'nyu.edu',
  'Boston College': 'bc.edu',
  'Brigham Young University': 'byu.edu',
  'Wake Forest University': 'wfu.edu',
  'Rhode Island School of Design': 'risd.edu',
  'School of the Art Institute of Chicago': 'saic.edu',
  'Case Western Reserve University': 'case.edu',
  'Rensselaer Polytechnic Institute': 'rpi.edu',
  'Worcester Polytechnic Institute': 'wpi.edu',
  'Stevens Institute of Technology': 'stevens.edu',
  'North Carolina A&T State University': 'ncat.edu',
  'Florida A&M University': 'famu.edu',
  'Texas A&M University': 'tamu.edu',
  'Penn State University': 'psu.edu',
  'Pennsylvania State University': 'psu.edu',
  'Ohio State University': 'osu.edu',
  'Michigan State University': 'msu.edu',
  'Arizona State University': 'asu.edu',
  'Iowa State University': 'iastate.edu',
  'Colorado State University': 'colostate.edu',
  'San Diego State University': 'sdsu.edu',
  'Florida State University': 'fsu.edu',
  'North Carolina State University': 'ncsu.edu',
}

function getCollegeDomain(college) {
  if (DOMAIN_OVERRIDES[college.name]) return DOMAIN_OVERRIDES[college.name]
  // Try to derive from name: "Foo University" → "foo.edu"
  const name = college.name.toLowerCase()
    .replace(/^the /, '')
    .replace(/university of /i, '')
    .replace(/ university$/i, '')
    .replace(/ college$/i, '')
    .replace(/ institute$/i, '')
    .replace(/ at .*$/, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .split(/\s+/)
  if (name.length === 1) return `${name[0]}.edu`
  // Use alias if it's short
  const alias = (college.alias || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  if (alias.length >= 2 && alias.length <= 12) return `${alias}.edu`
  return `${name[0]}.edu`
}

function CollegeLogo({ college, size = 36 }) {
  const [failed, setFailed] = useState(false)
  const domain = getCollegeDomain(college)
  const initials = (college.alias || college.name).split(/[\s&]+/).filter(w => w.length > 1).slice(0, 2).map(w => w[0].toUpperCase()).join('')

  if (failed) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 10, flexShrink: 0,
        background: 'linear-gradient(135deg, #1e3a8a, #0ea5e9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontFamily: 'Sora, sans-serif', fontWeight: 800,
        fontSize: size * 0.35, letterSpacing: '-0.02em',
      }}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{
        width: size, height: size, borderRadius: 10, flexShrink: 0,
        objectFit: 'contain', background: '#f8fafc',
        border: '1px solid #e2e8f0',
      }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════ */
export default function CollegeRecruiting() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const requestedExam = new URLSearchParams(location.search).get('exam')
  const exam = requestedExam === 'act' || requestedExam === 'sat' ? requestedExam : getInitialPreferredExam(user)

  /* ── State ── */
  const [attempts, setAttempts] = useState([])
  const [scoreMode, setScoreMode] = useState('superscore') // superscore | highest | custom
  const [customScore, setCustomScore] = useState('')
  const [search, setSearch] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('rank')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Filters
  const [typeFilter, setTypeFilter] = useState([])         // ['public','private']
  const [costFilter, setCostFilter] = useState([])          // indices into COST_PRESETS
  const [regionFilter, setRegionFilter] = useState([])
  const [stateFilter, setStateFilter] = useState([])
  const [sizeFilter, setSizeFilter] = useState([])
  const [settingFilter, setSettingFilter] = useState([])
  const [tagFilter, setTagFilter] = useState([])
  const [tierFilter, setTierFilter] = useState([])          // ['Safety','Target','Reach','Long Reach']
  const [majorFilter, setMajorFilter] = useState('')         // single major string
  const [selectedCollege, setSelectedCollege] = useState(null) // college object for detail modal

  const isAct = exam === 'act'
  const scoreMin = isAct ? 1 : 400
  const scoreMax = isAct ? 36 : 1600

  /* ── Fetch attempts ── */
  useEffect(() => {
    if (!user?.id) return
    supabase.from('test_attempts').select('*').eq('user_id', user.id)
      .then(({ data }) => { setAttempts(data || []) })
  }, [user?.id])

  /* ── Compute scores from attempts ── */
  const { superscore, highestScore } = useMemo(() => {
    const examTests = getTestsForExam(exam)
    const examTestIds = new Set(examTests.map(t => t.id))
    const examAttempts = attempts.filter(a => examTestIds.has(normalizeTestId(a?.test_id)))
    const completed = examAttempts.filter(a => a.completed_at || a.scores?.total)
    const completedWithScores = completed
      .map(attempt => ({
        attempt,
        scores: attempt.scores?.total ? attempt.scores : (computeScoresFromAnswers(attempt) || attempt.scores || {}),
      }))
      .filter(entry => entry.scores?.total)

    // Superscore
    let ss = null
    if (completedWithScores.length) {
      if (isAct) {
        let bestEng = 0, bestMath = 0, bestRead = 0, bestSci = 0
        for (const { scores } of completedWithScores) {
          bestEng = Math.max(bestEng, Number(scores.english || 0))
          bestMath = Math.max(bestMath, Number(scores.math || 0))
          bestRead = Math.max(bestRead, Number(scores.reading || 0))
          bestSci = Math.max(bestSci, Number(scores.science || 0))
        }
        if (bestEng || bestMath || bestRead || bestSci) {
          ss = Math.round((bestEng + bestMath + bestRead + bestSci) / 4)
        }
      } else {
        let bestRW = 0, bestMath = 0
        for (const { scores } of completedWithScores) {
          bestRW = Math.max(bestRW, Number(scores.rw || 0))
          bestMath = Math.max(bestMath, Number(scores.math || 0))
        }
        if (bestRW || bestMath) ss = bestRW + bestMath
      }
    }

    // Highest single-test score
    let hs = null
    for (const { scores } of completedWithScores) {
      const total = Number(scores.total || scores.composite || 0)
      if (total > (hs || 0)) hs = total
    }

    return { superscore: ss, highestScore: hs }
  }, [attempts, exam, isAct])

  /* ── Active score ── */
  const activeScore = useMemo(() => {
    if (scoreMode === 'custom') {
      const v = Number(customScore)
      if (!v || v < scoreMin || v > scoreMax) return null
      return v
    }
    if (scoreMode === 'highest') return highestScore
    return superscore
  }, [scoreMode, customScore, superscore, highestScore, scoreMin, scoreMax])

  /* ── Filtered & sorted colleges ── */
  const filteredColleges = useMemo(() => {
    const q = search.toLowerCase().trim()

    let list = COLLEGES_RANKED.map(college => {
      const chance = activeScore ? computeAdmissionChance(activeScore, college, exam) : null
      const tier = chance !== null ? getMatchTier(chance) : null
      return { ...college, chance, tier }
    })

    // Search
    if (q) {
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.alias && c.alias.toLowerCase().includes(q)) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase() === q ||
        (STATE_NAMES[c.state] || '').toLowerCase().includes(q)
      )
    }

    // Type
    if (typeFilter.length) list = list.filter(c => typeFilter.includes(c.type))

    // Cost
    if (costFilter.length) {
      list = list.filter(c => {
        return costFilter.some(idx => {
          const preset = COST_PRESETS[idx]
          const cost = c.costOut
          if (preset.min != null && cost < preset.min) return false
          if (preset.max != null && cost >= preset.max) return false
          return true
        })
      })
    }

    // Region
    if (regionFilter.length) list = list.filter(c => regionFilter.includes(c.region))

    // State
    if (stateFilter.length) list = list.filter(c => stateFilter.includes(c.state))

    // Size
    if (sizeFilter.length) list = list.filter(c => sizeFilter.includes(c.size))

    // Setting
    if (settingFilter.length) list = list.filter(c => settingFilter.includes(c.setting))

    // Tags
    if (tagFilter.length) list = list.filter(c => tagFilter.some(t => c.tags.includes(t)))

    // Match tier
    if (tierFilter.length) list = list.filter(c => c.tier && tierFilter.includes(c.tier.label))

    // Major
    if (majorFilter) list = list.filter(c => getMajorsForCollege(c).includes(majorFilter))

    // Sort
    list.sort((a, b) => {
      switch (sortBy) {
        case 'chance':
          return (b.chance || 0) - (a.chance || 0)
        case 'chance-reverse':
          return (a.chance || 0) - (b.chance || 0)
        case 'cost':
          return a.costOut - b.costOut
        case 'cost-reverse':
          return b.costOut - a.costOut
        case 'acceptance':
          return b.acceptance - a.acceptance
        case 'acceptance-reverse':
          return a.acceptance - b.acceptance
        case 'enrollment':
          return b.enrollment - a.enrollment
        case 'enrollment-reverse':
          return a.enrollment - b.enrollment
        case 'sat':
          return (b.sat75 || 0) - (a.sat75 || 0)
        case 'sat-reverse':
          return (a.sat75 || 0) - (b.sat75 || 0)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'name-reverse':
          return b.name.localeCompare(a.name)
        case 'rank-reverse': {
          const tra = RANK_TIER_ORDER[a.rankTier] || 99
          const trb = RANK_TIER_ORDER[b.rankTier] || 99
          if (tra !== trb) return trb - tra
          return b.rank - a.rank
        }
        case 'rank':
        default: {
          const ta = RANK_TIER_ORDER[a.rankTier] || 99
          const tb = RANK_TIER_ORDER[b.rankTier] || 99
          if (ta !== tb) return ta - tb
          return a.rank - b.rank
        }
      }
    })

    return list
  }, [search, activeScore, exam, typeFilter, costFilter, regionFilter, stateFilter, sizeFilter, settingFilter, tagFilter, tierFilter, majorFilter, sortBy])

  const displayedColleges = filteredColleges.slice(0, visibleCount)
  const hasMore = visibleCount < filteredColleges.length

  /* ── Filter helpers ── */
  function toggle(arr, setter, val) {
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
    setVisibleCount(PAGE_SIZE)
  }

  function clearAllFilters() {
    setTypeFilter([])
    setCostFilter([])
    setRegionFilter([])
    setStateFilter([])
    setSizeFilter([])
    setSettingFilter([])
    setTagFilter([])
    setTierFilter([])
    setMajorFilter('')
    setSearch('')
  }

  const activeFilterCount = typeFilter.length + costFilter.length + regionFilter.length +
    stateFilter.length + sizeFilter.length + settingFilter.length + tagFilter.length + tierFilter.length + (majorFilter ? 1 : 0)

  /* ═══════════════════════════════════════════════════════════ */
  /* ── Render ── */
  /* ═══════════════════════════════════════════════════════════ */
  return (
    <div className="app-layout has-sidebar">
      <Sidebar currentExam={exam} />

      <div className="page fade-up">
        {/* ── Hero ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1a2744 50%, #1e3a5f 100%)',
          borderRadius: 20,
          padding: '48px 40px 40px',
          marginBottom: 28,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,.15), transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: '30%',
            width: 300, height: 150, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,.1), transparent 70%)',
          }} />
          <h1 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 32,
            fontWeight: 900,
            color: 'white',
            margin: 0,
            position: 'relative',
          }}>
            <Icon name="star" size={28} style={{ marginRight: 10, verticalAlign: 'middle', opacity: 0.8 }} />
            College Recruiting
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: 15,
            marginTop: 8,
            position: 'relative',
            maxWidth: 600,
            lineHeight: 1.6,
          }}>
            Explore colleges and see your estimated admission chances based on your {isAct ? 'ACT' : 'SAT'} scores.
            Filter by region, size, cost, and more to find your best-fit schools.
          </p>
        </div>

        {/* ── Score Selector ── */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 14, color: '#0f172a' }}>
              Your Score
            </span>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              ({isAct ? 'ACT' : 'SAT'} — used to estimate admission chances)
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { key: 'superscore', label: 'Superscore', value: superscore },
              { key: 'highest', label: 'Highest Score', value: highestScore },
              { key: 'custom', label: 'Custom Score', value: null },
            ].map(opt => {
              const active = scoreMode === opt.key
              return (
                <motion.button
                  key={opt.key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setScoreMode(opt.key)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    border: active ? '2px solid #0ea5e9' : '1.5px solid #e2e8f0',
                    background: active ? 'linear-gradient(135deg, rgba(14,165,233,.08), rgba(59,130,246,.05))' : 'white',
                    color: active ? '#0ea5e9' : '#334155',
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: 'Sora, sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all .2s',
                  }}
                >
                  {opt.label}
                  {opt.value != null && (
                    <span style={{
                      background: active ? '#0ea5e9' : '#e2e8f0',
                      color: active ? 'white' : '#475569',
                      padding: '2px 8px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 800,
                    }}>
                      {opt.value}
                    </span>
                  )}
                </motion.button>
              )
            })}

            {scoreMode === 'custom' && (
              <input
                type="number"
                min={scoreMin}
                max={scoreMax}
                placeholder={`${scoreMin}–${scoreMax}`}
                value={customScore}
                onChange={e => setCustomScore(e.target.value)}
                style={{
                  width: 120,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1.5px solid #e2e8f0',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: 'Sora, sans-serif',
                  color: '#0f172a',
                  outline: 'none',
                }}
              />
            )}

            {activeScore && (
              <div style={{
                marginLeft: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                color: 'white',
                fontWeight: 800,
                fontSize: 16,
                fontFamily: 'Sora, sans-serif',
                boxShadow: '0 3px 12px rgba(14,165,233,.3)',
              }}>
                {activeScore}
              </div>
            )}

            {!activeScore && (
              <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 8 }}>
                {scoreMode === 'custom'
                  ? `Enter a score between ${scoreMin} and ${scoreMax}`
                  : 'Complete a practice test to see your score'}
              </span>
            )}
          </div>
        </div>

        {/* ── Search + Sort bar ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <Icon name="search" size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search colleges by name or alias..."
              value={search}
              onChange={e => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE) }}
              style={{
                width: '100%',
                padding: '12px 14px 12px 40px',
                borderRadius: 12,
                border: '1.5px solid #e2e8f0',
                fontSize: 14,
                color: '#0f172a',
                outline: 'none',
                background: 'white',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '12px 14px',
              borderRadius: 12,
              border: '1.5px solid #e2e8f0',
              fontSize: 13,
              fontWeight: 600,
              color: '#334155',
              background: 'white',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="rank">Sort: Rank (Best First)</option>
            <option value="rank-reverse">Sort: Rank (Lowest First)</option>
            <option value="chance">Sort: Admission Chance (High → Low)</option>
            <option value="chance-reverse">Sort: Admission Chance (Low → High)</option>
            <option value="cost">Sort: Cost (Low → High)</option>
            <option value="cost-reverse">Sort: Cost (High → Low)</option>
            <option value="acceptance">Sort: Acceptance Rate (High → Low)</option>
            <option value="acceptance-reverse">Sort: Acceptance Rate (Low → High)</option>
            <option value="enrollment">Sort: Enrollment (Large → Small)</option>
            <option value="enrollment-reverse">Sort: Enrollment (Small → Large)</option>
            <option value="sat">Sort: SAT Score (High → Low)</option>
            <option value="sat-reverse">Sort: SAT Score (Low → High)</option>
            <option value="name">Sort: Name (A → Z)</option>
            <option value="name-reverse">Sort: Name (Z → A)</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{
              padding: '12px 18px',
              borderRadius: 12,
              border: filtersOpen ? '2px solid #0ea5e9' : '1.5px solid #e2e8f0',
              background: filtersOpen ? 'rgba(14,165,233,.06)' : 'white',
              color: filtersOpen ? '#0ea5e9' : '#334155',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Icon name="settings" size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span style={{
                background: '#0ea5e9',
                color: 'white',
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 800,
              }}>
                {activeFilterCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* ── Filters Panel ── */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card"
            style={{ padding: '20px 24px', marginBottom: 20, overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 14, color: '#0f172a' }}>
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #fca5a5',
                    background: 'rgba(239,68,68,.06)',
                    color: '#ef4444',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {/* Type */}
              <FilterGroup label="Type">
                {['public', 'private'].map(t => (
                  <FilterCheckbox key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} checked={typeFilter.includes(t)} onChange={() => toggle(typeFilter, setTypeFilter, t)} />
                ))}
              </FilterGroup>

              {/* Cost */}
              <FilterGroup label="Cost (Out-of-State)">
                {COST_PRESETS.map((p, i) => (
                  <FilterCheckbox key={i} label={p.label} checked={costFilter.includes(i)} onChange={() => toggle(costFilter, setCostFilter, i)} />
                ))}
              </FilterGroup>

              {/* Region */}
              <FilterGroup label="Region">
                {REGIONS.map(r => (
                  <FilterCheckbox key={r} label={REGION_LABELS[r]} checked={regionFilter.includes(r)} onChange={() => toggle(regionFilter, setRegionFilter, r)} />
                ))}
              </FilterGroup>

              {/* Size */}
              <FilterGroup label="Size">
                {Object.entries(SIZE_LABELS).map(([k, v]) => (
                  <FilterCheckbox key={k} label={v} checked={sizeFilter.includes(k)} onChange={() => toggle(sizeFilter, setSizeFilter, k)} />
                ))}
              </FilterGroup>

              {/* Setting */}
              <FilterGroup label="Setting">
                {SETTINGS.map(s => (
                  <FilterCheckbox key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} checked={settingFilter.includes(s)} onChange={() => toggle(settingFilter, setSettingFilter, s)} />
                ))}
              </FilterGroup>

              {/* Match Tier */}
              <FilterGroup label="Match Tier">
                {['Safety', 'Target', 'Reach', 'Long Reach'].map(t => {
                  const tier = getMatchTier(t === 'Safety' ? 80 : t === 'Target' ? 50 : t === 'Reach' ? 30 : 10)
                  return (
                    <FilterCheckbox key={t} label={t} checked={tierFilter.includes(t)} onChange={() => toggle(tierFilter, setTierFilter, t)} color={tier.color} />
                  )
                })}
              </FilterGroup>

              {/* Major */}
              <div style={{ gridColumn: 'span 2' }}>
                <FilterGroup label="Major">
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <select
                      value={majorFilter}
                      onChange={e => { setMajorFilter(e.target.value); setVisibleCount(PAGE_SIZE) }}
                      style={{
                        flex: 1,
                        minWidth: 200,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e2e8f0',
                        fontSize: 13,
                        color: majorFilter ? '#0f172a' : '#94a3b8',
                        fontWeight: majorFilter ? 700 : 400,
                        background: 'white',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <option value="">All Majors</option>
                      {MAJORS.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    {majorFilter && (
                      <button
                        onClick={() => setMajorFilter('')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          border: '1px solid #fca5a5',
                          background: 'rgba(239,68,68,.06)',
                          color: '#ef4444',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </FilterGroup>
              </div>

              {/* Tags */}
              <div style={{ gridColumn: 'span 2' }}>
                <FilterGroup label="Tags">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ALL_TAGS.map(t => (
                      <FilterCheckbox key={t} label={TAG_LABELS[t]} checked={tagFilter.includes(t)} onChange={() => toggle(tagFilter, setTagFilter, t)} pill />
                    ))}
                  </div>
                </FilterGroup>
              </div>

              {/* State */}
              <div style={{ gridColumn: 'span 2' }}>
                <FilterGroup label="State">
                  <select
                    multiple
                    value={stateFilter}
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions, o => o.value)
                      setStateFilter(selected)
                      setVisibleCount(PAGE_SIZE)
                    }}
                    style={{
                      width: '100%',
                      minHeight: 80,
                      maxHeight: 140,
                      borderRadius: 10,
                      border: '1.5px solid #e2e8f0',
                      padding: 6,
                      fontSize: 12,
                      color: '#334155',
                      outline: 'none',
                    }}
                  >
                    {STATES.map(s => (
                      <option key={s} value={s}>{STATE_NAMES[s] || s} ({s})</option>
                    ))}
                  </select>
                  {stateFilter.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                      {stateFilter.map(s => (
                        <span key={s} onClick={() => setStateFilter(prev => prev.filter(x => x !== s))} style={{
                          padding: '3px 10px',
                          borderRadius: 6,
                          background: 'rgba(14,165,233,.1)',
                          color: '#0ea5e9',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}>
                          {s} &times;
                        </span>
                      ))}
                    </div>
                  )}
                </FilterGroup>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Results count ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
            {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''} found
          </span>
          {activeFilterCount > 0 && (
            <button onClick={clearAllFilters} style={{
              fontSize: 12, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer',
              textDecoration: 'underline',
            }}>
              Reset filters
            </button>
          )}
        </div>

        {/* ── College Grid ── */}
        {displayedColleges.length === 0 ? (
          <div className="card" style={{
            padding: '60px 40px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>
              <Icon name="search" size={48} />
            </div>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 18, color: '#0f172a', margin: '0 0 8px' }}>
              No colleges match{search.trim() ? ` "${search.trim()}"` : ' your filters'}
            </h3>
            <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
              {search.trim() && activeFilterCount > 0
                ? `You have ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active that may be hiding results. Try clearing filters.`
                : 'Try adjusting your search or filters to see more results.'}
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
              {search.trim() && activeFilterCount > 0 && (
                <button
                  onClick={() => { setTypeFilter([]); setCostFilter([]); setRegionFilter([]); setStateFilter([]); setSizeFilter([]); setSettingFilter([]); setTagFilter([]); setTierFilter([]); setMajorFilter(''); setVisibleCount(PAGE_SIZE) }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Clear Filters (Keep Search)
                </button>
              )}
              <button
                onClick={clearAllFilters}
                style={{
                  padding: '10px 24px',
                  borderRadius: 10,
                  border: search.trim() && activeFilterCount > 0 ? '1.5px solid #e2e8f0' : 'none',
                  background: search.trim() && activeFilterCount > 0 ? 'white' : 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                  color: search.trim() && activeFilterCount > 0 ? '#334155' : 'white',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Clear Everything
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: 16,
          }}>
            {displayedColleges.map((college, i) => (
              <CollegeCard key={college.name} college={college} exam={exam} index={i} onClick={() => setSelectedCollege(college)} />
            ))}
          </div>
        )}

        {/* ── Show More ── */}
        {hasMore && (
          <div style={{ textAlign: 'center', padding: '28px 0 16px' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
              style={{
                padding: '12px 32px',
                borderRadius: 12,
                border: '1.5px solid #e2e8f0',
                background: 'white',
                color: '#334155',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Show More ({filteredColleges.length - visibleCount} remaining)
            </motion.button>
          </div>
        )}

        {/* Bottom spacer */}
        <div style={{ height: 40 }} />
      </div>

      {/* ── College Detail Modal — rendered outside .page to avoid overflow:clip ── */}
      {selectedCollege && (
        <CollegeDetailModal
          college={selectedCollege}
          exam={exam}
          activeScore={activeScore}
          onClose={() => setSelectedCollege(null)}
        />
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════ */
/* ── Sub-components ── */
/* ═══════════════════════════════════════════════════════════ */

function FilterGroup({ label, children }) {
  return (
    <div>
      <div style={{
        fontSize: 11,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#64748b',
        marginBottom: 8,
      }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function FilterCheckbox({ label, checked, onChange, color, pill }) {
  if (pill) {
    return (
      <button
        onClick={onChange}
        style={{
          padding: '5px 12px',
          borderRadius: 8,
          border: checked ? '1.5px solid #0ea5e9' : '1.5px solid #e2e8f0',
          background: checked ? 'rgba(14,165,233,.08)' : 'white',
          color: checked ? '#0ea5e9' : '#64748b',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all .15s',
        }}
      >
        {label}
      </button>
    )
  }
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      fontSize: 13,
      color: '#334155',
      padding: '3px 0',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ accentColor: color || '#0ea5e9', width: 15, height: 15 }}
      />
      <span style={{ fontWeight: checked ? 700 : 500, color: checked ? (color || '#0f172a') : '#64748b' }}>
        {label}
      </span>
    </label>
  )
}

function CollegeCard({ college, exam, index, onClick }) {
  const isAct = exam === 'act'
  const low = isAct ? college.act25 : college.sat25
  const high = isAct ? college.act75 : college.sat75
  const tier = college.tier
  const chance = college.chance

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.4), duration: 0.3 }}
      className="card"
      onClick={onClick}
      style={{
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow .2s ease, transform .2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
    >
      {/* Tier stripe */}
      {tier && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: tier.color,
        }} />
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 0, alignItems: 'flex-start' }}>
          <CollegeLogo college={college} size={40} />
          <div style={{ minWidth: 0 }}>
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              fontSize: 15,
              color: '#0f172a',
              margin: 0,
              lineHeight: 1.3,
            }}>
              {college.name}
            </h3>
            {college.alias !== college.name && (
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{college.alias}</div>
            )}
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
              {college.city}, {STATE_NAMES[college.state] || college.state}
            </div>
          </div>
        </div>

        {/* Tier badge + chance */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          {tier && (
            <div style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: 8,
              background: tier.bg,
              color: tier.color,
              fontSize: 11,
              fontWeight: 800,
              border: `1px solid ${tier.color}22`,
            }}>
              {tier.label}
            </div>
          )}
          {chance !== null && (
            <div style={{
              fontSize: 22,
              fontWeight: 900,
              fontFamily: 'Sora, sans-serif',
              color: tier?.color || '#334155',
              marginTop: 4,
            }}>
              {chance}%
            </div>
          )}
        </div>
      </div>

      {/* Badges row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <Badge
          label={college.type === 'public' ? 'Public' : 'Private'}
          color={college.type === 'public' ? '#059669' : '#7c3aed'}
          bg={college.type === 'public' ? 'rgba(5,150,105,.08)' : 'rgba(124,58,237,.08)'}
        />
        <Badge
          label={`${formatEnrollment(college.enrollment)} students`}
          color="#64748b"
          bg="rgba(100,116,139,.08)"
        />
        <Badge
          label={college.size === 'small' ? 'Small' : college.size === 'medium' ? 'Medium' : 'Large'}
          color="#475569"
          bg="rgba(71,85,105,.08)"
        />
        <Badge
          label={`${(college.acceptance * 100).toFixed(college.acceptance < 0.1 ? 1 : 0)}% acceptance`}
          color="#0ea5e9"
          bg="rgba(14,165,233,.08)"
        />
        <Badge
          label={`#${college.rank}`}
          color="#f59e0b"
          bg="rgba(245,158,11,.08)"
        />
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        padding: '10px 0 0',
        borderTop: '1px solid #f1f5f9',
      }}>
        <StatCell label="In-State" value={formatCost(college.costIn)} />
        <StatCell label="Out-of-State" value={formatCost(college.costOut)} />
        <StatCell label={`${isAct ? 'ACT' : 'SAT'} 25th`} value={low || '—'} />
        <StatCell label={`${isAct ? 'ACT' : 'SAT'} 75th`} value={high || '—'} />
      </div>

      {/* Tags */}
      {college.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
          {college.tags.map(tag => (
            <span key={tag} style={{
              padding: '2px 8px',
              borderRadius: 6,
              background: '#f1f5f9',
              color: '#64748b',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'capitalize',
            }}>
              {TAG_LABELS[tag] || tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function Badge({ label, color, bg }) {
  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: 6,
      background: bg,
      color: color,
      fontSize: 11,
      fontWeight: 700,
    }}>
      {label}
    </span>
  )
}

function StatCell({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', fontFamily: 'Sora, sans-serif' }}>
        {value}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════ */
/* ── College Detail Modal ── */
/* ═══════════════════════════════════════════════════════════ */
function CollegeDetailModal({ college, exam, activeScore, onClose }) {
  const isAct = exam === 'act'
  const chance = activeScore ? computeAdmissionChance(activeScore, college, exam) : null
  const tier = chance !== null ? getMatchTier(chance) : null
  const majors = getMajorsForCollege(college)
  const domain = getCollegeDomain(college)

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent background scroll — target the .page scroll container, not body
  useEffect(() => {
    const page = document.querySelector('.app-layout .page')
    if (page) { page.style.overflow = 'hidden' }
    document.body.style.overflow = 'hidden'
    return () => {
      if (page) { page.style.overflow = '' }
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15,23,42,.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 20, width: '100%', maxWidth: 720,
          maxHeight: '90vh', overflow: 'auto', position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,.3)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky', top: 12, float: 'right', marginRight: 12, marginTop: 12,
            width: 36, height: 36, borderRadius: 12, border: 'none',
            background: 'rgba(0,0,0,.06)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#64748b', zIndex: 2,
          }}
        >
          &times;
        </button>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
          padding: '32px 32px 28px', borderRadius: '20px 20px 0 0',
        }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <CollegeLogo college={college} size={56} />
            <div>
              <h2 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 24,
                color: 'white', margin: 0, lineHeight: 1.2,
              }}>
                {college.name}
              </h2>
              {college.alias !== college.name && (
                <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 14, marginTop: 4 }}>{college.alias}</div>
              )}
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 13, marginTop: 6 }}>
                {college.city}, {STATE_NAMES[college.state] || college.state} &middot; {college.setting.charAt(0).toUpperCase() + college.setting.slice(1)} &middot; {college.type === 'public' ? 'Public' : 'Private'}
              </div>
            </div>
          </div>

          {/* Chance banner */}
          {tier && (
            <div style={{
              marginTop: 20, display: 'flex', alignItems: 'center', gap: 16,
              background: 'rgba(255,255,255,.1)', borderRadius: 14, padding: '14px 20px',
            }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 900, color: tier.color }}>
                {chance}%
              </div>
              <div>
                <div style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 8,
                  background: tier.bg, color: tier.color, fontSize: 12, fontWeight: 800,
                  border: `1px solid ${tier.color}33`, marginBottom: 4,
                }}>
                  {tier.label}
                </div>
                <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 12 }}>
                  Estimated admission chance based on your {isAct ? 'ACT' : 'SAT'} score of {activeScore}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '24px 32px 32px' }}>
          {/* Quick stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12, marginBottom: 24,
          }}>
            <DetailStat label="National Rank" value={`#${college.rank}`} icon="star" color="#f59e0b" />
            <DetailStat label="Acceptance Rate" value={`${(college.acceptance * 100).toFixed(college.acceptance < 0.1 ? 1 : 0)}%`} icon="target" color="#0ea5e9" />
            <DetailStat label="Enrollment" value={college.enrollment.toLocaleString()} icon="students" color="#8b5cf6" />
            <DetailStat label="School Size" value={college.size === 'small' ? 'Small (<5k)' : college.size === 'medium' ? 'Medium (5k-15k)' : 'Large (15k+)'} icon="info" color="#64748b" />
          </div>

          {/* Cost */}
          <DetailSection title="Cost & Tuition" icon="chart">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>In-State Tuition</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 900, color: '#0f172a' }}>
                  {college.costIn === 0 ? 'Free' : `$${college.costIn.toLocaleString()}`}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>per year</div>
              </div>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Out-of-State Tuition</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 900, color: '#0f172a' }}>
                  {college.costOut === 0 ? 'Free' : `$${college.costOut.toLocaleString()}`}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>per year</div>
              </div>
            </div>
          </DetailSection>

          {/* Test Scores */}
          <DetailSection title="Test Score Ranges" icon="test">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>SAT Range</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 900, color: '#0f172a' }}>{college.sat25}</span>
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>–</span>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 900, color: '#0f172a' }}>{college.sat75}</span>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>25th – 75th percentile</div>
                {activeScore && !isAct && (
                  <div style={{
                    marginTop: 8, fontSize: 12, fontWeight: 700,
                    color: activeScore >= college.sat75 ? '#059669' : activeScore >= college.sat25 ? '#f59e0b' : '#ef4444',
                  }}>
                    Your score: {activeScore} ({activeScore >= college.sat75 ? 'Above 75th' : activeScore >= college.sat25 ? 'In range' : 'Below 25th'})
                  </div>
                )}
              </div>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>ACT Range</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 900, color: '#0f172a' }}>{college.act25}</span>
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>–</span>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 900, color: '#0f172a' }}>{college.act75}</span>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>25th – 75th percentile</div>
                {activeScore && isAct && (
                  <div style={{
                    marginTop: 8, fontSize: 12, fontWeight: 700,
                    color: activeScore >= college.act75 ? '#059669' : activeScore >= college.act25 ? '#f59e0b' : '#ef4444',
                  }}>
                    Your score: {activeScore} ({activeScore >= college.act75 ? 'Above 75th' : activeScore >= college.act25 ? 'In range' : 'Below 25th'})
                  </div>
                )}
              </div>
            </div>
          </DetailSection>

          {/* Location & Campus */}
          <DetailSection title="Location & Campus" icon="info">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              <InfoRow label="City" value={college.city} />
              <InfoRow label="State" value={STATE_NAMES[college.state] || college.state} />
              <InfoRow label="Region" value={REGION_LABELS[college.region] || college.region} />
              <InfoRow label="Setting" value={college.setting.charAt(0).toUpperCase() + college.setting.slice(1)} />
              <InfoRow label="Type" value={college.type === 'public' ? 'Public University' : 'Private University'} />
              <InfoRow label="Undergraduate Enrollment" value={college.enrollment.toLocaleString()} />
            </div>
          </DetailSection>

          {/* Tags */}
          {college.tags.length > 0 && (
            <DetailSection title="School Features" icon="star">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {college.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px', borderRadius: 10,
                    background: '#f1f5f9', color: '#334155',
                    fontSize: 13, fontWeight: 700,
                  }}>
                    {TAG_LABELS[tag] || tag}
                  </span>
                ))}
              </div>
            </DetailSection>
          )}

          {/* Majors */}
          <DetailSection title={`Popular Majors (${majors.length})`} icon="guide">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {majors.map(m => (
                <span key={m} style={{
                  padding: '5px 12px', borderRadius: 8,
                  background: 'rgba(14,165,233,.06)', border: '1px solid rgba(14,165,233,.12)',
                  color: '#0369a1', fontSize: 12, fontWeight: 600,
                }}>
                  {m}
                </span>
              ))}
            </div>
          </DetailSection>

          {/* Visit website */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a
              href={`https://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 12,
                background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                color: 'white', fontWeight: 800, fontSize: 14,
                textDecoration: 'none',
                fontFamily: 'Sora, sans-serif',
                boxShadow: '0 4px 16px rgba(14,165,233,.3)',
              }}
            >
              Visit {college.alias || college.name} Website &rarr;
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DetailSection({ title, icon, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
        fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 800, color: '#0f172a',
      }}>
        <Icon name={icon} size={16} />
        {title}
      </div>
      {children}
    </div>
  )
}

function DetailStat({ label, value, icon, color }) {
  return (
    <div style={{
      padding: 14, background: '#f8fafc', borderRadius: 12,
      border: '1px solid #e2e8f0', textAlign: 'center',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10, margin: '0 auto 8px',
        background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={16} style={{ color }} />
      </div>
      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 900, color: '#0f172a' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{value}</div>
    </div>
  )
}
