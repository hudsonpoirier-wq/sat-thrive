import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase.js'
import { clearAdminTestingData } from '../lib/studyProgress.js'
import { extractAnswerKeyFromPdf } from '../lib/answerKeyExtract.js'
import UserMenu from '../components/UserMenu.jsx'
import BrandLink from '../components/BrandLink.jsx'
import Icon from '../components/AppIcons.jsx'
import { TESTS, getExamFromTestId } from '../data/tests.js'
import { ANSWER_KEY } from '../data/testData.js'
import { getAnswerKeyBySection } from '../data/answerKeys.js'
import { calcWeakTopicsForTest, getExamConfig, getExamConfigForTest, getQuestionCountForTest, getScoreColumnsForExam, scoreAttemptFromKey } from '../data/examData.js'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const FINAL_TEST_ID = 'final_test'
const REGRADER_VERSION = '2026-03-18-01'

function toDayKey(iso) {
  try {
    if (!iso) return null
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return null
    return d.toISOString().slice(0, 10)
  } catch {
    return null
  }
}

function quantile(sorted, q) {
  if (!sorted?.length) return null
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  const a = sorted[base]
  const b = sorted[Math.min(sorted.length - 1, base + 1)]
  return a + rest * (b - a)
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v))
}

function normalizeTestId(id) {
  if (!id || id === 'practice_test_11') return 'pre_test'
  return id
}

function testLabel(id) {
  const norm = normalizeTestId(id)
  const t = TESTS.find(x => x.id === norm) || TESTS.find(x => x.id === id)
  return t?.label || (norm === 'pre_test' ? 'Pre Test' : (id || 'Test'))
}

function isPreTestId(id) {
  const norm = normalizeTestId(id)
  return norm === 'pre_test'
}

function countKey(key) {
  if (!key || typeof key !== 'object') return 0
  const values = Object.values(key)
  if (values.some((value) => value && typeof value === 'object' && !Array.isArray(value))) {
    return values.reduce((sum, value) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return sum
      return sum + Object.keys(value).length
    }, 0)
  }
  return Object.keys(key || {}).length
}

function attemptTotalScore(attempt) {
  const exam = getExamFromTestId(attempt?.test_id)
  return Number(attempt?.scores?.composite || attempt?.scores?.total || 0)
}

function attemptAccuracyRecord(attempt) {
  const testId = normalizeTestId(attempt?.test_id)
  const exam = getExamFromTestId(testId)
  const totalQuestions = Math.max(1, Number(getQuestionCountForTest(testId) || 0))
  let raw = Number(attempt?.scores?.raw || 0)
  const total = attemptTotalScore(attempt)
  if (!raw && attempt?.answers) {
    try {
      const rescored = scoreAttemptFromKey(testId, attempt.answers, getAnswerKeyBySection(testId) || {})
      raw = Number(rescored?.raw || 0)
    } catch {
      raw = 0
    }
  }
  const percent = raw > 0 ? raw / totalQuestions : 0
  return {
    exam,
    raw,
    total,
    totalQuestions,
    percent,
    display: percent > 0 ? `${Math.round(percent * 100)}% · ${String(exam || 'sat').toUpperCase()} ${total || '—'}` : null,
  }
}

function formatAttemptBreakdown(attempt) {
  const exam = getExamFromTestId(attempt?.test_id)
  const columns = getScoreColumnsForExam(exam).filter((column) => column.key !== 'total')
  return columns
    .map((column) => {
      const value = attempt?.scores?.[column.key]
      return value != null ? `${column.label} ${value}` : null
    })
    .filter(Boolean)
    .join(' · ')
}

function computeAttemptWeakTopics(attempt) {
  try {
    if (Array.isArray(attempt?.weak_topics) && attempt.weak_topics.length) return attempt.weak_topics
    const tid = normalizeTestId(attempt?.test_id)
    const keyBySection = getAnswerKeyBySection(tid) || (isPreTestId(tid) ? ANSWER_KEY : null)
    if (!keyBySection) return []
    return calcWeakTopicsForTest(tid, attempt?.answers || {}, keyBySection)
  } catch {
    return []
  }
}

function formatTopWeakness(attempt) {
  const weakTopics = computeAttemptWeakTopics(attempt)
  const topWeak = weakTopics?.[0]
  if (!topWeak) return '—'
  const exam = getExamFromTestId(attempt?.test_id)
  const cfg = getExamConfig(exam)
  const chapterMeta = cfg?.chapters?.[topWeak.ch] || {}
  const label = topWeak.name || chapterMeta?.name || topWeak.ch || 'Weak area'
  const domain = topWeak.domain || chapterMeta?.domain || ''
  const moduleCode = chapterMeta?.code ? `${chapterMeta.code} · ` : ''
  const page = Number.isFinite(Number(topWeak.page ?? chapterMeta?.page)) ? ` (p.${Number(topWeak.page ?? chapterMeta?.page)})` : ''
  return `${moduleCode}${label}${domain ? ` · ${domain}` : ''}${page}`
}

function pairedTTest(pairs) {
  if (pairs.length < 2) return null
  const diffs = pairs.map(p => p.post - p.pre)
  const n = diffs.length
  const mean = diffs.reduce((a, b) => a + b, 0) / n
  const variance = diffs.reduce((s, d) => s + Math.pow(d - mean, 2), 0) / (n - 1)
  const sd = Math.sqrt(variance)
  const se = sd / Math.sqrt(n)
  const t = mean / se
  const df = n - 1
  const tAbs = Math.abs(t)
  const crit = [
    [1,12.71,63.66],[2,4.303,9.925],[3,3.182,5.841],[4,2.776,4.604],
    [5,2.571,4.032],[6,2.447,3.707],[7,2.365,3.499],[8,2.306,3.355],
    [9,2.262,3.250],[10,2.228,3.169],[15,2.131,2.947],[20,2.086,2.845],
    [30,2.042,2.750],[60,2.000,2.660],[120,1.980,2.617]
  ]
  let cv = crit[crit.length - 1]
  for (const r of crit) { if (df <= r[0]) { cv = r; break } }
  let pLabel, conf, sig
  if (tAbs > cv[2]) { pLabel = 'p < 0.01'; conf = '99%'; sig = true }
  else if (tAbs > cv[1]) { pLabel = 'p < 0.05'; conf = '95%'; sig = true }
  else { pLabel = 'p ≥ 0.05'; conf = '<95%'; sig = false }
  const d = mean / sd
  const ci = 1.96 * se
  return { n, mean, sd, se, t, df, pLabel, conf, sig, d, ci, lo: mean - ci, hi: mean + ci }
}

export default function Admin() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const isAdmin = profile?.role === 'admin' && String(profile?.email || '').toLowerCase() === 'agora@admin.org'
  const [students, setStudents] = useState([])
  const [attempts, setAttempts] = useState([])
  const [postScores, setPostScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('students')
  const [keysByTest, setKeysByTest] = useState({})
  const [testKeyStatus, setTestKeyStatus] = useState({ loading: false, msg: '' })
  const [resettingUserId, setResettingUserId] = useState(null)
  const [resetMsg, setResetMsg] = useState('')
  const [regrading, setRegrading] = useState(false)
  const [analyticsExam, setAnalyticsExam] = useState('sat')
  const [affiliationFilter, setAffiliationFilter] = useState('')

  const fetchAdminSnapshot = useCallback(async () => {
    const [p, a, ps, ak] = await Promise.allSettled([
      supabase.from('profiles').select('id,email,full_name,role,affiliation,created_at').order('created_at', { ascending: false }),
      supabase.from('test_attempts').select('id,user_id,test_id,started_at,completed_at,scores,weak_topics,answers').not('completed_at', 'is', null).order('started_at', { ascending: false }).limit(2000),
      supabase.from('post_scores').select('attempt_id,post_score,post_rw,post_math,recorded_at').order('recorded_at', { ascending: false }).limit(5000),
      supabase.from('test_answer_keys').select('*'),
    ])
    const akMap = {}
    for (const row of (ak.status === 'fulfilled' ? (ak.value.data || []) : [])) akMap[row.test_id] = row.answer_key
    return {
      students: p.status === 'fulfilled' ? (p.value.data || []) : [],
      attempts: a.status === 'fulfilled' ? (a.value.data || []) : [],
      postScores: ps.status === 'fulfilled' ? (ps.value.data || []) : [],
      keysByTest: akMap,
    }
  }, [])

  useEffect(() => {
    if (!supabase) return
    if (profile && !isAdmin) {
      navigate('/dashboard')
      return
    }
    let cancelled = false
    async function load() {
      setLoading(true)
      const snapshot = await fetchAdminSnapshot()
      if (cancelled) return
      setStudents(snapshot.students)
      setAttempts(snapshot.attempts)
      setPostScores(snapshot.postScores)
      setKeysByTest(snapshot.keysByTest || {})
      setLoading(false)
    }
    load().catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [profile, isAdmin, navigate, fetchAdminSnapshot])

  useEffect(() => {
    if (!supabase || !isAdmin) return
    let disposed = false
    let debounce = null

    const refresh = async () => {
      try {
        const snapshot = await fetchAdminSnapshot()
        if (disposed) return
        setStudents(snapshot.students)
        setAttempts(snapshot.attempts)
        setPostScores(snapshot.postScores)
        setKeysByTest(snapshot.keysByTest || {})
      } catch {}
    }

    const queueRefresh = () => {
      clearTimeout(debounce)
      debounce = setTimeout(refresh, 250)
    }

    // Unique channel name per browser tab so multiple admins don't conflict
    const channelId = `admin-live:${Date.now()}-${Math.random().toString(36).slice(2)}`
    const channel = supabase
      .channel(channelId)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, queueRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'test_attempts' }, queueRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_scores' }, queueRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mistakes' }, queueRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'studied_topics' }, queueRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'review_items' }, queueRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'test_answer_keys' }, queueRefresh)
      .subscribe()

    const interval = setInterval(refresh, 15000)

    return () => {
      disposed = true
      clearTimeout(debounce)
      clearInterval(interval)
      supabase.removeChannel(channel)
    }
  }, [isAdmin, fetchAdminSnapshot])

  async function resetStudentData(userId, email) {
    if (!supabase || !isAdmin) return
    const ok = window.confirm(
      `Reset this student's progress?\n\nThis will delete their tests, post-test scores, and study guide progress:\n${email || userId}\n\nTheir login account will still exist.`
    )
    if (!ok) return
    setResettingUserId(userId)
    setResetMsg('')
    try {
      const rpc = await supabase.rpc('admin_reset_user', { target_user_id: userId })
      if (rpc.error) {
        const msg = String(rpc.error.message || '')
        // Back-compat: if the RPC isn't installed yet, fall back to direct deletes.
        if (msg.toLowerCase().includes('could not find the function') || msg.toLowerCase().includes('admin_reset_user')) {
          const ps = await supabase.from('post_scores').delete().eq('user_id', userId)
          if (ps.error) throw ps.error
          const ta = await supabase.from('test_attempts').delete().eq('user_id', userId)
          if (ta.error) throw ta.error
          const st = await supabase.from('studied_topics').delete().eq('user_id', userId)
          if (st.error && !String(st.error.message || '').includes("Could not find the table 'public.studied_topics'")) {
            throw st.error
          }
          const ms = await supabase.from('mistakes').delete().eq('user_id', userId)
          if (ms.error && !String(ms.error.message || '').toLowerCase().includes('could not find the table')) {
            throw ms.error
          }
          const rv = await supabase.from('review_items').delete().eq('user_id', userId)
          if (rv.error && !String(rv.error.message || '').toLowerCase().includes('could not find the table')) {
            throw rv.error
          }
        } else {
          throw rpc.error
        }
      }
      setResetMsg('Success: student reset complete.')
      // Refresh tables
      const [a, p] = await Promise.all([
        supabase.from('test_attempts').select('id,user_id,test_id,started_at,completed_at,scores,weak_topics,answers').eq('is_sandbox', false).not('completed_at', 'is', null).order('started_at', { ascending: false }).limit(2000),
        supabase.from('post_scores').select('attempt_id,post_score,post_rw,post_math,recorded_at').eq('is_sandbox', false).order('recorded_at', { ascending: false }).limit(5000),
      ])
      setAttempts(a.data || [])
      setPostScores(p.data || [])
    } catch (e) {
      setResetMsg(`Error: reset failed: ${e?.message || 'Unknown error'}`)
    } finally {
      setResettingUserId(null)
    }
  }

  async function deleteStudentAccount(userId, email) {
    if (!supabase || !isAdmin) return
    const ok = window.confirm(
      `Delete this student's account permanently?\n\nThis will remove their login and delete all their data:\n${email || userId}\n\nThis cannot be undone.`
    )
    if (!ok) return
    setResettingUserId(userId)
    setResetMsg('')
    try {
      const { data: sess } = await supabase.auth.getSession()
      const token = sess?.session?.access_token
      if (!token) throw new Error('Missing session token')
      const res = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_id: userId }),
      })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out?.error || 'Delete failed')
      setResetMsg('Success: student deleted.')
      const p = await supabase.from('profiles').select('id,email,full_name,role,created_at').order('created_at', { ascending: false })
      setStudents(p.data || [])
    } catch (e) {
      setResetMsg(`Error: delete failed: ${e?.message || 'Unknown error'}`)
    } finally {
      setResettingUserId(null)
    }
  }

  async function resetMyData() {
    if (!supabase || !isAdmin || !profile?.id) return
    const ok = window.confirm('Reset your admin testing data?\n\nThis will delete your tests, scores, and study progress.')
    if (!ok) return
    setResettingUserId(profile.id)
    setResetMsg('')
    try {
      const rpc = await supabase.rpc('reset_my_data')
      if (rpc.error) {
        const msg = String(rpc.error.message || '')
        if (msg.toLowerCase().includes('could not find the function') || msg.toLowerCase().includes('reset_my_data')) {
          const ps = await supabase.from('post_scores').delete().eq('user_id', profile.id)
          if (ps.error) throw ps.error
          const ta = await supabase.from('test_attempts').delete().eq('user_id', profile.id)
          if (ta.error) throw ta.error
          const st = await supabase.from('studied_topics').delete().eq('user_id', profile.id)
          if (st.error && !String(st.error.message || '').includes("Could not find the table 'public.studied_topics'")) {
            throw st.error
          }
          const ms = await supabase.from('mistakes').delete().eq('user_id', profile.id)
          if (ms.error && !String(ms.error.message || '').toLowerCase().includes('could not find the table')) {
            throw ms.error
          }
          const rv = await supabase.from('review_items').delete().eq('user_id', profile.id)
          if (rv.error && !String(rv.error.message || '').toLowerCase().includes('could not find the table')) {
            throw rv.error
          }
        } else {
          throw rpc.error
        }
      }
      await clearAdminTestingData(profile.id)
      setResetMsg('Success: your data was reset.')
      setTimeout(() => { window.location.assign('/dashboard') }, 400)
    } catch (e) {
      setResetMsg(`Error: reset failed: ${e?.message || 'Unknown error'}`)
    } finally {
      setResettingUserId(null)
    }
  }

  async function runRegrade({ silent = false } = {}) {
    if (!supabase || !isAdmin || regrading) return
    setRegrading(true)
    if (!silent) setResetMsg('')
    try {
      const { data: sess } = await supabase.auth.getSession()
      const token = sess?.session?.access_token
      if (!token) throw new Error('Missing session token')
      const res = await fetch('/api/admin/regrade-tests', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out?.error || 'Regrade failed')
      const msg = `Success: regraded ${out.updated || 0} of ${out.scanned || 0} completed attempts.`
      if (!silent) setResetMsg(msg)
      try { localStorage.setItem(`agora_regrader_version:${profile?.id || 'admin'}`, REGRADER_VERSION) } catch {}

      const [a, p] = await Promise.all([
        supabase.from('test_attempts').select('id,user_id,test_id,started_at,completed_at,scores,weak_topics,answers').not('completed_at', 'is', null).order('started_at', { ascending: false }).limit(2000),
        supabase.from('post_scores').select('attempt_id,post_score,post_rw,post_math,recorded_at').order('recorded_at', { ascending: false }).limit(5000),
      ])
      setAttempts(a.data || [])
      setPostScores(p.data || [])
    } catch (e) {
      if (!silent) setResetMsg(`Error: regrade failed: ${e?.message || 'Unknown error'}`)
    } finally {
      setRegrading(false)
    }
  }

  useEffect(() => {
    if (!isAdmin || !profile?.id) return
    try {
      const key = `agora_regrader_version:${profile.id}`
      const seen = localStorage.getItem(key)
      if (seen === REGRADER_VERSION) return
      runRegrade({ silent: true })
    } catch {
      runRegrade({ silent: true })
    }
  }, [isAdmin, profile?.id])

  // keysByTest is now loaded as part of fetchAdminSnapshot and refreshed in real-time

  // Build paired data
  const computed = useMemo(() => {
    const studentById = new Map(students.map(s => [s.id, s]))
    const attemptsByUser = new Map()
    const bestPreByUser = new Map()
    const bestExtraByUser = new Map()
    const bestByUser = new Map()
    const extraIds = new Set(TESTS.filter(t => t.kind === 'extra').map(t => t.id))
    for (const a of attempts) {
      const list = attemptsByUser.get(a.user_id) || []
      list.push(a)
      attemptsByUser.set(a.user_id, list)
      const totalAny = attemptAccuracyRecord(a)
      const prevBest = bestByUser.get(a.user_id)
      if (
        !prevBest ||
        totalAny.percent > prevBest.percent ||
        (totalAny.percent === prevBest.percent && totalAny.total > prevBest.total)
      ) bestByUser.set(a.user_id, totalAny)
      const isPre = a.test_id === 'pre_test' || a.test_id === 'practice_test_11' || !a.test_id
      if (isPre) {
        const total = attemptTotalScore(a)
        const prev = bestPreByUser.get(a.user_id) || 0
        if (total > prev) bestPreByUser.set(a.user_id, total)
      }
      if (extraIds.has(a.test_id) && (a.completed_at || a.scores?.total)) {
        const total = attemptTotalScore(a)
        const prev = bestExtraByUser.get(a.user_id) || 0
        if (total > prev) bestExtraByUser.set(a.user_id, total)
      }
    }
    const postByAttemptId = new Map()
    for (const p of postScores) {
      if (!p?.attempt_id) continue
      if (!postByAttemptId.has(p.attempt_id)) postByAttemptId.set(p.attempt_id, p)
    }
    const pairsPost = []
    for (const a of attempts) {
      const post = postByAttemptId.get(a.id)
      if (!post) continue
      const student = studentById.get(a.user_id)
      pairsPost.push({
        pre: a.scores?.total,
        post: post.post_score,
        name: student?.full_name || 'Unknown',
      })
    }
    const pairsOptional = []
    for (const [userId, pre] of bestPreByUser.entries()) {
      const post = bestExtraByUser.get(userId)
      if (!pre || !post) continue
      const student = studentById.get(userId)
      pairsOptional.push({
        pre,
        post,
        name: student?.full_name || 'Unknown',
      })
    }
    return { studentById, attemptsByUser, bestByUser, bestPreByUser, bestExtraByUser, postByAttemptId, pairsPost, pairsOptional }
  }, [students, attempts, postScores])

  const pairs = computed.pairsPost
  const pairsOpt = computed.pairsOptional

  const stats = pairedTTest(pairs)
  const avgImprovement = pairs.length > 0 ? Math.round(pairs.reduce((s, p) => s + (p.post - p.pre), 0) / pairs.length) : null
  const statsOpt = pairedTTest(pairsOpt)
  const avgImprovementOpt = pairsOpt.length > 0 ? Math.round(pairsOpt.reduce((s, p) => s + (p.post - p.pre), 0) / pairsOpt.length) : null

  const chartData = pairs.length > 0 ? {
    labels: pairs.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [
      { label: 'Pre-Test', data: pairs.map(p => p.pre), backgroundColor: '#94a3b8', borderRadius: 6, borderSkipped: false },
      { label: 'Post-Test', data: pairs.map(p => p.post), backgroundColor: '#1a2744', borderRadius: 6, borderSkipped: false },
    ]
  } : null

  const gainData = pairs.length > 0 ? {
    labels: pairs.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [{
      label: 'Point Gain',
      data: pairs.map(p => p.post - p.pre),
      backgroundColor: pairs.map(p => p.post >= p.pre ? '#10b981' : '#ef4444'),
      borderRadius: 6, borderSkipped: false,
    }]
  } : null

  const chartDataOpt = pairsOpt.length > 0 ? {
    labels: pairsOpt.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [
      { label: 'Pre-Test', data: pairsOpt.map(p => p.pre), backgroundColor: '#94a3b8', borderRadius: 6, borderSkipped: false },
      { label: 'Best Optional', data: pairsOpt.map(p => p.post), backgroundColor: '#0ea5e9', borderRadius: 6, borderSkipped: false },
    ]
  } : null

  const gainDataOpt = pairsOpt.length > 0 ? {
    labels: pairsOpt.map(p => p.name?.split(' ')[0] || '?'),
    datasets: [{
      label: 'Point Gain',
      data: pairsOpt.map(p => p.post - p.pre),
      backgroundColor: pairsOpt.map(p => p.post >= p.pre ? '#10b981' : '#ef4444'),
      borderRadius: 6, borderSkipped: false,
    }]
  } : null

  const tabs = [
    { id: 'students', label: 'Students', icon: 'students' },
    { id: 'results', label: 'Test Results', icon: 'results' },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
    { id: 'affiliations', label: 'Affiliations', icon: 'students' },
    { id: 'impact', label: 'Proof of Impact', icon: 'report' },
    { id: 'tests', label: 'Tests', icon: 'test' },
  ]

  // Compute all unique affiliations and per-affiliation stats (including unaffiliated)
  const affiliationData = useMemo(() => {
    const affiliations = new Map()
    const unaffiliated = { name: 'Unaffiliated', students: [], studentIds: new Set() }
    for (const s of students) {
      const aff = (s.affiliation || '').trim()
      if (!aff) {
        unaffiliated.students.push(s)
        unaffiliated.studentIds.add(s.id)
        continue
      }
      const key = aff.toLowerCase()
      if (!affiliations.has(key)) affiliations.set(key, { name: aff, students: [], studentIds: new Set() })
      affiliations.get(key).students.push(s)
      affiliations.get(key).studentIds.add(s.id)
    }
    const result = []
    for (const [, group] of affiliations) {
      const groupAttempts = attempts.filter(a => group.studentIds.has(a.user_id))
      const totals = groupAttempts.map(a => Number(a.scores?.composite || a.scores?.total || 0)).filter(t => t > 0)
      const sorted = totals.slice().sort((a, b) => a - b)
      const avg = totals.length ? totals.reduce((s, v) => s + v, 0) / totals.length : null
      result.push({
        name: group.name,
        studentCount: group.students.length,
        attemptCount: groupAttempts.length,
        avgScore: avg,
        median: sorted.length ? quantile(sorted, 0.5) : null,
        studentIds: group.studentIds,
      })
    }
    result.sort((a, b) => b.studentCount - a.studentCount)
    // Add unaffiliated group at the end if any exist
    if (unaffiliated.students.length > 0) {
      const groupAttempts = attempts.filter(a => unaffiliated.studentIds.has(a.user_id))
      const totals = groupAttempts.map(a => Number(a.scores?.composite || a.scores?.total || 0)).filter(t => t > 0)
      const sorted = totals.slice().sort((a, b) => a - b)
      const avg = totals.length ? totals.reduce((s, v) => s + v, 0) / totals.length : null
      result.push({
        name: 'Unaffiliated',
        studentCount: unaffiliated.students.length,
        attemptCount: groupAttempts.length,
        avgScore: avg,
        median: sorted.length ? quantile(sorted, 0.5) : null,
        studentIds: unaffiliated.studentIds,
        isUnaffiliated: true,
      })
    }
    return result
  }, [students, attempts])

  const affiliationNames = useMemo(() => affiliationData.map(a => a.name), [affiliationData])

  // Filter students/attempts by selected affiliation for the main analytics
  const filteredStudents = useMemo(() => {
    if (!affiliationFilter) return students
    if (affiliationFilter === '__unaffiliated__') return students.filter(s => !(s.affiliation || '').trim())
    const key = affiliationFilter.toLowerCase()
    return students.filter(s => (s.affiliation || '').toLowerCase() === key)
  }, [students, affiliationFilter])

  const filteredStudentIds = useMemo(() => new Set(filteredStudents.map(s => s.id)), [filteredStudents])

  const filteredAttempts = useMemo(() => {
    if (!affiliationFilter) return attempts
    return attempts.filter(a => filteredStudentIds.has(a.user_id))
  }, [attempts, affiliationFilter, filteredStudentIds])

  const analytics = useMemo(() => {
    const examMode = analyticsExam === 'act' ? 'act' : 'sat'
    const analyticsExamConfig = getExamConfig(examMode)
    const analyticsScoreColumns = getScoreColumnsForExam(examMode)
    const now = Date.now()
    const daysAgo = (n) => now - n * 24 * 60 * 60 * 1000
    const recent7 = daysAgo(7)
    const recent30 = daysAgo(30)

    const allAttempts = (filteredAttempts || []).filter((attempt) => getExamFromTestId(attempt?.test_id) === examMode)
    const totals = []
    const totalsPre = []
    const totalsExtra = []
    const totalsFinal = []
    const sectionBuckets = Object.fromEntries(
      analyticsScoreColumns
        .filter((column) => column.key !== 'total')
        .map((column) => [column.key, []])
    )

    const byTest = new Map()
    const attemptsByDay = new Map() // day -> count
    const completesByDay = new Map()

    const weakByDomain = new Map()
    const weakByChapter = new Map()

    const activeUsers7 = new Set()
    const activeUsers30 = new Set()

    const computeScaledFromAnswers = (attempt) => {
      try {
        const tid = normalizeTestId(attempt?.test_id)
        const keyBySection = getAnswerKeyBySection(tid) || (isPreTestId(tid) ? ANSWER_KEY : null)
        if (!keyBySection) return null
        const scaled = scoreAttemptFromKey(tid, attempt?.answers || {}, keyBySection)
        return scaled?.total ? scaled : null
      } catch {
        return null
      }
    }

    for (const a of allAttempts) {
      const tid = normalizeTestId(a.test_id)
      if (getExamFromTestId(tid) !== examMode) continue
      const sc = a.scores || {}
      let total = Number(sc.composite || sc.total || 0)
      const sectionValues = Object.fromEntries(
        analyticsScoreColumns
          .filter((column) => column.key !== 'total')
          .map((column) => [column.key, Number(sc[column.key] || sc.sections?.[column.key] || 0)])
      )
      const started = new Date(a.started_at || a.completed_at || 0).getTime()

      // Some older rows only stored `total` (or lost section splits). Recompute from answers when possible.
      if (a.answers && Object.keys(a.answers || {}).length && (!total || Object.values(sectionValues).some((value) => !value))) {
        const computed = computeScaledFromAnswers(a)
        if (computed) {
          if (!total) total = Number(computed.composite || computed.total || 0)
          for (const column of analyticsScoreColumns.filter((entry) => entry.key !== 'total')) {
            if (!sectionValues[column.key]) {
              sectionValues[column.key] = Number(computed[column.key] || computed.sections?.[column.key] || 0)
            }
          }
        }
      }

      if (started && started >= recent7) activeUsers7.add(a.user_id)
      if (started && started >= recent30) activeUsers30.add(a.user_id)

      if (total) {
        totals.push(total)
        for (const [key, value] of Object.entries(sectionValues)) {
          if (value) sectionBuckets[key].push(value)
        }
        if (isPreTestId(tid)) totalsPre.push(total)
        else if (tid === analyticsExamConfig.finalTestId || (examMode === 'sat' && tid === FINAL_TEST_ID)) totalsFinal.push(total)
        else totalsExtra.push(total)

        const row = byTest.get(tid) || { count: 0, totals: [], sections: Object.fromEntries(Object.keys(sectionBuckets).map((key) => [key, []])) }
        row.count += 1
        row.totals.push(total)
        for (const [key, value] of Object.entries(sectionValues)) {
          if (value) row.sections[key].push(value)
        }
        byTest.set(tid, row)
      }

      const dayStarted = toDayKey(a.started_at)
      const dayCompleted = toDayKey(a.completed_at)
      if (dayStarted) attemptsByDay.set(dayStarted, (attemptsByDay.get(dayStarted) || 0) + 1)
      if (dayCompleted) completesByDay.set(dayCompleted, (completesByDay.get(dayCompleted) || 0) + 1)

      const wt = computeAttemptWeakTopics(a)
      for (const t of wt) {
        const domain = t?.domain || 'Other'
        const ch = t?.ch || null
        const c = Number(t?.count || 0)
        if (c > 0) {
          weakByDomain.set(domain, (weakByDomain.get(domain) || 0) + c)
          if (ch) weakByChapter.set(ch, (weakByChapter.get(ch) || 0) + c)
        }
      }
    }

    const totalsSorted = totals.slice().sort((a, b) => a - b)
    const avg = (arr) => arr.length ? (arr.reduce((s, v) => s + v, 0) / arr.length) : null

    const summary = {
      exam: examMode,
      active7: activeUsers7.size,
      active30: activeUsers30.size,
      avgTotal: avg(totals),
      avgSections: Object.fromEntries(Object.entries(sectionBuckets).map(([key, values]) => [key, avg(values)])),
      median: quantile(totalsSorted, 0.5),
      p25: quantile(totalsSorted, 0.25),
      p75: quantile(totalsSorted, 0.75),
      avgPre: avg(totalsPre),
      avgExtra: avg(totalsExtra),
      avgFinal: avg(totalsFinal),
    }

    const testRows = Array.from(byTest.entries()).map(([id, row]) => {
      const totalsS = row.totals.slice().sort((a, b) => a - b)
      return {
        id,
        label: testLabel(id),
        count: row.count,
        avgTotal: avg(row.totals),
        avgSections: Object.fromEntries(Object.entries(row.sections || {}).map(([key, values]) => [key, avg(values)])),
        median: quantile(totalsS, 0.5),
      }
    }).sort((a, b) => (b.count - a.count) || String(a.label).localeCompare(String(b.label)))

    const topDomains = Array.from(weakByDomain.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)

    const topChapters = Array.from(weakByChapter.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    const allDays = Array.from(new Set([...attemptsByDay.keys(), ...completesByDay.keys()])).sort()
    const activitySeries = {
      labels: allDays.map(d => d),
      datasets: [
        {
          label: 'Attempts started',
          data: allDays.map(d => attemptsByDay.get(d) || 0),
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14,165,233,.08)',
          pointRadius: 2,
          tension: 0.25,
          fill: true,
        },
        {
          label: 'Attempts completed',
          data: allDays.map(d => completesByDay.get(d) || 0),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,.06)',
          pointRadius: 2,
          tension: 0.25,
          fill: true,
        },
      ],
    }

    const histogram = (() => {
      const starts = examMode === 'act' ? [1, 6, 11, 16, 21, 26, 31] : [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600]
      const counts = new Array(starts.length).fill(0)
      for (const t of totals) {
        if (examMode === 'act') {
          const cl = clamp(t, 1, 36)
          const idx = Math.min(starts.length - 1, Math.floor((cl - 1) / 5))
          counts[idx] += 1
        } else {
          const cl = clamp(t, 400, 1600)
          const idx = Math.min(starts.length - 1, Math.floor((cl - 400) / 100))
          counts[idx] += 1
        }
      }
      return {
        labels: starts.map((start) => examMode === 'act' ? `${start}-${Math.min(36, start + 4)}` : `${start}-${Math.min(1600, start + 99)}`),
        datasets: [{
          label: 'Students',
          data: counts,
          backgroundColor: 'rgba(26,39,68,.85)',
          borderRadius: 6,
          borderSkipped: false,
        }]
      }
    })()

    const byTestChart = {
      labels: testRows.map(r => r.label),
      datasets: [
        {
          label: examMode === 'act' ? 'Avg Composite' : 'Avg Total',
          data: testRows.map(r => (Number.isFinite(Number(r.avgTotal)) ? Math.round(r.avgTotal) : null)),
          backgroundColor: '#1a2744',
          borderRadius: 6,
          borderSkipped: false,
        },
        ...analyticsScoreColumns
          .filter((column) => column.key !== 'total')
          .map((column, index) => ({
            label: `Avg ${column.label}`,
            data: testRows.map((row) => (Number.isFinite(Number(row.avgSections?.[column.key])) ? Math.round(row.avgSections[column.key]) : null)),
            backgroundColor: ['#0ea5e9', '#f59e0b', '#8b5cf6', '#10b981'][index % 4],
            borderRadius: 6,
            borderSkipped: false,
          })),
      ],
    }

    const domainsChart = {
      labels: topDomains.map(([d]) => d),
      datasets: [{
        label: 'Misses',
        data: topDomains.map(([, c]) => c),
        backgroundColor: topDomains.map((_, i) => ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#64748b'][i % 8]),
        borderRadius: 6,
        borderSkipped: false,
      }]
    }

    const chaptersChart = {
      labels: topChapters.map(([ch]) => `Ch ${ch}`),
      datasets: [{
        label: 'Misses',
        data: topChapters.map(([, c]) => c),
        backgroundColor: '#ef4444',
        borderRadius: 6,
        borderSkipped: false,
      }]
    }

    return { summary, testRows, histogram, byTestChart, domainsChart, chaptersChart, activitySeries, topChapters, topDomains, scoreColumns: analyticsScoreColumns }
  }, [filteredAttempts, analyticsExam])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>Loading…</div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
		      <nav className="nav">
	        <BrandLink />
	        <div className="nav-actions">
	          <UserMenu profile={profile} />
	          <button
	            className="btn btn-outline"
	            onClick={() => runRegrade({ silent: false })}
	            disabled={regrading}
	            style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.9)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}
	            title="Regrade completed attempts using the latest answer-format logic"
	          >
	            {regrading ? 'Regrading…' : 'Regrade Attempts'}
	          </button>
	          <button
	            className="btn btn-outline"
	            onClick={resetMyData}
	            disabled={resettingUserId === profile?.id}
	            style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.9)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}
	            title="Reset your admin testing data"
	          >
	            {resettingUserId === profile?.id ? 'Resetting…' : 'Reset My Data'}
	          </button>
          <Link to="/dashboard" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name="back" size={15} />
            Dashboard
          </Link>
          <button className="btn btn-outline" onClick={() => signOut().then(() => navigate('/login'))}
            style={{ padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)' }}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Tab bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8ecf0', display: 'flex', padding: '0 32px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '14px 20px', border: 'none', background: 'none', fontFamily: 'Sora,sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', color: tab === t.id ? '#1a2744' : '#64748b', borderBottom: `3px solid ${tab === t.id ? '#f59e0b' : 'transparent'}`, transition: 'all .2s', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name={t.icon} size={16} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="page fade-up">
        {/* Summary stats */}
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          {[
            { label: 'Total Students', val: students.length, icon: 'students', dark: false },
            { label: 'Completed Tests', val: attempts.length, icon: 'check', dark: false },
            { label: 'Paired Records', val: pairs.length, icon: 'chart', dark: false },
            { label: 'Avg Improvement', val: avgImprovement !== null ? `+${avgImprovement} pts` : '—', icon: 'trend', dark: !!avgImprovement },
          ].map(s => (
            <div key={s.label} className={`stat-box${s.dark ? ' dark' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: s.dark ? 'rgba(255,255,255,.12)' : 'rgba(14,165,233,.10)',
                color: s.dark ? 'white' : '#0f172a',
              }}>
                <Icon name={s.icon} size={20} />
              </div>
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-num" style={{ fontSize: 22 }}>{s.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Students tab */}
        {tab === 'students' && (
          <div className="card" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, margin: 0 }}>All Students</h3>
              {affiliationNames.length > 0 && (
                <select
                  value={affiliationFilter}
                  onChange={(e) => setAffiliationFilter(e.target.value)}
                  style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, fontFamily: 'Sora,sans-serif', fontWeight: 600, background: '#fff', color: '#1a2744', cursor: 'pointer' }}
                >
                  <option value="">All Affiliations</option>
                  {affiliationData.filter(a => !a.isUnaffiliated).map((a) => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                  {affiliationData.some(a => a.isUnaffiliated) && (
                    <option value="__unaffiliated__">Unaffiliated</option>
                  )}
                </select>
              )}
            </div>
            {resetMsg && (
              <div style={{ marginBottom: 12, fontSize: 13, color: resetMsg.toLowerCase().startsWith('success:') ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                {resetMsg}
              </div>
            )}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Name', 'Email', 'Role', 'Affiliation', 'Joined', 'Tests', 'Best Score', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', background: '#f8fafc', borderBottom: '1px solid #e8ecf0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(s => {
                  const userAttempts = computed.attemptsByUser.get(s.id) || []
                  const best = computed.bestByUser.get(s.id) || null
                  const isSelf = s.id === profile?.id
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>
                        <Link to={`/dashboard?user=${encodeURIComponent(s.id)}`} style={{ color: '#1a2744', textDecoration: 'none' }}>
                          {s.full_name || '—'}
                        </Link>
                      </td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: 13 }}>{s.email}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: s.role === 'admin' ? '#fef3c7' : s.role === 'tutor' ? '#dbeafe' : '#f0fdf4', color: s.role === 'admin' ? '#92400e' : s.role === 'tutor' ? '#1e40af' : '#166534' }}>
                          {s.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: 13 }}>{s.affiliation || '—'}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: 13 }}>{new Date(s.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '12px' }}>{userAttempts.length}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, color: '#1a2744' }} title={best ? `${best.raw}/${best.totalQuestions} correct` : undefined}>
                        {best?.display || '—'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                          <button
                            className="btn btn-outline"
                            style={{ padding: '6px 10px', fontSize: 12, opacity: resettingUserId === s.id ? 0.6 : 1 }}
                            disabled={resettingUserId === s.id}
                            onClick={() => resetStudentData(s.id, s.email)}
                            title="Delete this student's tests, scores, and study progress"
                          >
                            {resettingUserId === s.id ? 'Resetting…' : 'Reset'}
                          </button>
                          <Link className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} to={`/dashboard?user=${encodeURIComponent(s.id)}`}>
                            View UI →
                          </Link>
                          <Link className="btn btn-outline" style={{ padding: '6px 10px', fontSize: 12 }} to={`/report?user=${encodeURIComponent(s.id)}`}>
                            Report →
                          </Link>
                          {!isSelf && (
                            <button
                              className="btn btn-outline"
                              style={{ padding: '6px 10px', fontSize: 12, borderColor: '#fecaca', color: '#b91c1c' }}
                              disabled={resettingUserId === s.id}
                              onClick={() => deleteStudentAccount(s.id, s.email)}
                              title="Permanently delete this user (requires server key on Vercel)"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Results tab */}
        {tab === 'results' && (
          <div className="card" style={{ overflowX: 'auto' }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>All Completed Tests</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Student', 'Exam', 'Test', 'Date', 'Breakdown', 'Total', 'Post-Test', 'Gain', 'Top Weakness', ''].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', background: '#f8fafc', borderBottom: '1px solid #e8ecf0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attempts.map(a => {
                  const student = computed.studentById.get(a.user_id)
                  const post = computed.postByAttemptId.get(a.id)
                  const exam = getExamFromTestId(a.test_id)
                  const total = attemptTotalScore(a)
                  const gain = post ? post.post_score - total : null
                  return (
                    <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>
                        <Link to={`/dashboard?user=${encodeURIComponent(a.user_id)}`} style={{ color: '#1a2744', textDecoration: 'none' }}>
                          {student?.full_name || 'Unknown'}
                        </Link>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, background: exam === 'act' ? 'rgba(59,130,246,.10)' : 'rgba(245,158,11,.12)', color: exam === 'act' ? '#2563eb' : '#b45309' }}>
                          {exam.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontWeight: 800, color: '#1a2744' }}>{testLabel(a.test_id)}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: 13 }}>{new Date(a.started_at).toLocaleDateString()}</td>
                      <td style={{ padding: '12px', fontSize: 12, color: '#475569' }}>{formatAttemptBreakdown(a) || '—'}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 15, color: '#1a2744' }}>{total || '—'}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, color: '#10b981' }}>{post?.post_score || '—'}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 800, color: gain > 0 ? '#10b981' : gain < 0 ? '#ef4444' : '#64748b' }}>
                        {gain !== null ? `${gain > 0 ? '+' : ''}${gain}` : '—'}
                      </td>
                      <td style={{ padding: '12px', fontSize: 12, color: '#475569' }}>
                        {formatTopWeakness(a)}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Link to={`/results/${a.id}?user=${encodeURIComponent(a.user_id)}`} style={{ fontSize: 12, color: '#1a2744', fontWeight: 600 }}>View →</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Analytics tab */}
        {tab === 'analytics' && (
          <div style={{ display: 'grid', gap: 18 }}>
            <div className="card">
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 900, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="chart" size={17} />
                Program Analytics
              </h3>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>
                Review completed {analyticsExam.toUpperCase()} attempts with separate analytics for SAT and ACT.
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                {['sat', 'act'].map((mode) => (
                  <button
                    key={mode}
                    className="btn btn-outline"
                    onClick={() => setAnalyticsExam(mode)}
                    style={{
                      padding: '7px 12px',
                      background: analyticsExam === mode ? 'rgba(14,165,233,.10)' : 'white',
                      borderColor: analyticsExam === mode ? 'rgba(14,165,233,.35)' : '#e2e8f0',
                      color: analyticsExam === mode ? '#0f172a' : '#64748b',
                    }}
                  >
                    {mode.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI grid */}
            <div className="stats-grid" style={{ marginBottom: 0 }}>
              {[
                { label: 'Active (7d)', val: analytics.summary.active7, sub: 'Students with a test this week', icon: 'activity' },
                { label: 'Active (30d)', val: analytics.summary.active30, sub: 'Students with a test this month', icon: 'calendar' },
                { label: analyticsExam === 'act' ? 'Avg Composite' : 'Avg Total', val: analytics.summary.avgTotal ? Math.round(analytics.summary.avgTotal) : '—', sub: 'Across all tests', icon: 'chart' },
                ...analytics.scoreColumns
                  .filter((column) => column.key !== 'total')
                  .slice(0, 3)
                  .map((column, index) => ({
                    label: `Avg ${column.label}`,
                    val: analytics.summary.avgSections?.[column.key] ? Math.round(analytics.summary.avgSections[column.key]) : '—',
                    sub: 'Section average',
                    icon: index === 0 ? 'guide' : index === 1 ? 'math' : 'results',
                  })),
                { label: 'Median', val: analytics.summary.median ? Math.round(analytics.summary.median) : '—', sub: 'Total score', icon: 'target' },
              ].map(s => (
                <div key={s.label} className="stat-box" style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(14,165,233,.10)',
                    color: '#0f172a',
                  }}>
                    <Icon name={s.icon} size={20} />
                  </div>
                  <div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-num" style={{ fontSize: 22 }}>{s.val}</div>
                    <div className="stat-sub">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity over time */}
            <div className="card">
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="calendar" size={17} />
                Activity Over Time
              </h3>
              <div style={{ height: 220 }}>
                <Line data={analytics.activitySeries} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 } } } },
                  scales: {
                    x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 10 } } },
                    y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 10 } }, beginAtZero: true }
                  }
                }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
              {/* Score distribution */}
              <div className="card">
                <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="chart" size={17} />
                  Score Distribution
                </h3>
                <div style={{ height: 220 }}>
                  <Bar data={analytics.histogram} options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 10 } } },
                      y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 10 } }, beginAtZero: true }
                    }
                  }} />
                </div>
              </div>

              {/* Averages by test */}
              <div className="card">
                <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="final" size={17} />
                  Averages by Test
                </h3>
                <div style={{ height: 220 }}>
                  <Bar data={analytics.byTestChart} options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { labels: { font: { family: 'DM Sans', size: 11 } } } },
                    scales: {
                      x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 10 } } },
                      y: { min: analyticsExam === 'act' ? 1 : 200, max: analyticsExam === 'act' ? 36 : 1600, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 10 } } }
                    }
                  }} />
                </div>
              </div>
            </div>

            {/* Weakness analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
              <div className="card">
                <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="warning" size={17} />
                  Most Missed Domains
                </h3>
                <div style={{ height: 240 }}>
                  <Bar data={analytics.domainsChart} options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 10 } } },
                      y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 10 } }, beginAtZero: true }
                    }
                  }} />
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="guide" size={17} />
                  Most Missed Chapters
                </h3>
                <div style={{ height: 240 }}>
                  <Bar data={analytics.chaptersChart} options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 10 } } },
                      y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 10 } }, beginAtZero: true }
                    }
                  }} />
                </div>
              </div>
            </div>

            {/* Test summary table */}
            <div className="card" style={{ overflowX: 'auto' }}>
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="results" size={17} />
                Test Summary
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Test', 'Attempts', analyticsExam === 'act' ? 'Avg Composite' : 'Avg Total', 'Median', ...analytics.scoreColumns.filter((column) => column.key !== 'total').map((column) => `Avg ${column.label}`)].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', background: '#f8fafc', borderBottom: '1px solid #e8ecf0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analytics.testRows.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 900, color: '#1a2744' }}>{r.label}</td>
                      <td style={{ padding: '12px' }}>{r.count}</td>
                      <td style={{ padding: '12px', fontFamily: 'Sora,sans-serif', fontWeight: 900 }}>{r.avgTotal ? Math.round(r.avgTotal) : '—'}</td>
                      <td style={{ padding: '12px' }}>{r.median ? Math.round(r.median) : '—'}</td>
                      {analytics.scoreColumns.filter((column) => column.key !== 'total').map((column) => (
                        <td key={`${r.id}-${column.key}`} style={{ padding: '12px' }}>
                          {r.avgSections?.[column.key] ? Math.round(r.avgSections[column.key]) : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Affiliations tab */}
        {tab === 'affiliations' && (
          <div style={{ display: 'grid', gap: 20 }}>
            {affiliationData.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>No affiliations found. Students and tutors can set their affiliation on signup.</div>
            ) : (
              <>
                {/* Comparison bar chart */}
                <div className="card">
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Affiliation Comparison</h3>
                  <Bar
                    data={{
                      labels: affiliationData.map(a => a.name),
                      datasets: [
                        { label: 'Students', data: affiliationData.map(a => a.studentCount), backgroundColor: '#3b82f6', borderRadius: 6, borderSkipped: false },
                        { label: 'Test Attempts', data: affiliationData.map(a => a.attemptCount), backgroundColor: '#10b981', borderRadius: 6, borderSkipped: false },
                      ],
                    }}
                    options={{ responsive: true, plugins: { legend: { labels: { font: { size: 11 } } } }, scales: { x: { ticks: { font: { size: 10 } } }, y: { beginAtZero: true, ticks: { font: { size: 10 } } } } }}
                  />
                </div>

                {/* Avg score comparison */}
                {affiliationData.some(a => a.avgScore) && (
                  <div className="card">
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Average Score by Affiliation</h3>
                    <Bar
                      data={{
                        labels: affiliationData.filter(a => a.avgScore).map(a => a.name),
                        datasets: [{
                          label: 'Avg Score',
                          data: affiliationData.filter(a => a.avgScore).map(a => Math.round(a.avgScore)),
                          backgroundColor: affiliationData.filter(a => a.avgScore).map((_, i) => ['#1a2744', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#06b6d4', '#ef4444'][i % 8]),
                          borderRadius: 6,
                          borderSkipped: false,
                        }],
                      }}
                      options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { font: { size: 10 } } }, y: { beginAtZero: false, ticks: { font: { size: 10 } } } } }}
                    />
                  </div>
                )}

                {/* Per-affiliation stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                  {affiliationData.map((aff) => (
                    <div key={aff.name} className="card" style={{ cursor: 'pointer', borderLeft: aff.isUnaffiliated ? '3px solid #94a3b8' : undefined }} onClick={() => { setAffiliationFilter(aff.isUnaffiliated ? '__unaffiliated__' : aff.name); setTab('students') }}>
                      <h4 style={{ fontFamily: 'Sora,sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#1a2744' }}>{aff.name}</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Students</div>
                          <div style={{ fontSize: 22, fontWeight: 800, color: '#1a2744' }}>{aff.studentCount}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Tests</div>
                          <div style={{ fontSize: 22, fontWeight: 800, color: '#1a2744' }}>{aff.attemptCount}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Avg Score</div>
                          <div style={{ fontSize: 22, fontWeight: 800, color: '#1a2744' }}>{aff.avgScore ? Math.round(aff.avgScore) : '—'}</div>
                        </div>
                      </div>
                      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                        {aff.median ? `Median: ${Math.round(aff.median)}` : ''} · Click to filter
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Proof of Impact tab */}
        {tab === 'impact' && (
          <div>
            {pairs.length < 2 ? (
              <div className="card" style={{ textAlign: 'center', padding: '60px 24px', color: '#94a3b8' }}>
                <div style={{ marginBottom: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 54, height: 54, borderRadius: 16, background: 'rgba(148,163,184,.12)', color: '#64748b' }}>
                  <Icon name="clock" size={28} />
                </div>
                <h3 style={{ color: '#475569', marginBottom: 4 }}>Need at least 2 paired records</h3>
                <p>Currently {pairs.length} student(s) with both pre and post scores. Add post-test scores in the database to generate the impact report.</p>
              </div>
            ) : (
              <>
                {/* Charts */}
                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Score Comparison: Pre vs Post</h3>
                  <div style={{ height: 260 }}>
                    <Bar data={chartData} options={{
                      responsive: true, maintainAspectRatio: false,
                      plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 } } } },
                      scales: {
                        x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                        y: { min: 300, max: 1600, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                      }
                    }} />
                  </div>
                </div>

                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Point Gain Per Student</h3>
                  <div style={{ height: 180 }}>
                    <Bar data={gainData} options={{
                      responsive: true, maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                        y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                      }
                    }} />
                  </div>
                </div>

                {/* T-test stats */}
                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name="math" size={17} />
                    Paired T-Test Statistics
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                    {stats && [
                      { l: 'Sample (n)', v: stats.n },
                      { l: 'Mean Gain', v: `${stats.mean.toFixed(1)} pts` },
                      { l: 'Std Deviation', v: stats.sd.toFixed(1) },
                      { l: 'Std Error', v: stats.se.toFixed(1) },
                      { l: 'T-Statistic', v: stats.t.toFixed(3) },
                      { l: 'Degrees of Freedom', v: stats.df },
                      { l: 'P-Value (two-tailed)', v: stats.pLabel },
                      { l: "Cohen's d", v: stats.d.toFixed(2) },
                    ].map(s => (
                      <div key={s.l} style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.3px', marginBottom: 3 }}>{s.l}</div>
                        <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: 15, color: '#1a2744' }}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  {stats && (
                    <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', background: '#f8fafc', padding: '10px 14px', borderRadius: 8 }}>
                      95% Confidence Interval: [+{stats.lo.toFixed(0)}, +{stats.hi.toFixed(0)}] points improvement
                    </div>
                  )}
                </div>

                {/* Proof of impact box */}
                {stats && (
                  <div className="proof-box">
                    {stats.sig ? (
                      <>
                        <div className="proof-verified">Proof of Impact — Statistically Verified</div>
                        <div className="proof-statement">
                          "Our students improved by an average of {Math.round(stats.mean)} points."
                        </div>
                        <div style={{ fontSize: 15, opacity: .9, marginBottom: 16 }}>
                          "There is a {stats.conf} probability this improvement was caused by our program, not chance ({stats.pLabel})."
                        </div>
                        <div className="proof-stats">
                          Cohen's d = {stats.d.toFixed(2)} ({stats.d > 0.8 ? 'Large' : stats.d > 0.5 ? 'Medium' : 'Small'} effect size) ·
                          CI₉₅: [+{stats.lo.toFixed(0)}, +{stats.hi.toFixed(0)}] ·
                          n = {stats.n} students ·
                          t({stats.df}) = {stats.t.toFixed(3)}, {stats.pLabel}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>More data needed</div>
                        <div style={{ fontSize: 14, opacity: .8 }}>
                          With n={stats.n} students, the result has not yet reached statistical significance ({stats.pLabel}).
                          Continue collecting post-test scores to build the evidence base.
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Optional practice proof (best optional vs best pre) */}
            <div style={{ marginTop: 20 }}>
              {pairsOpt.length < 2 ? (
                <div className="card" style={{ textAlign: 'center', padding: '44px 24px', color: '#94a3b8' }}>
                  <div style={{ marginBottom: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 14, background: 'rgba(14,165,233,.10)', color: '#0ea5e9' }}>
                    <Icon name="refresh" size={24} />
                  </div>
                  <h3 style={{ color: '#475569', marginBottom: 4 }}>Optional practice proof needs more data</h3>
                  <p>Currently {pairsOpt.length} student(s) have both a pre-test score and at least one optional test score.</p>
                </div>
              ) : (
                <>
                  <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Score Comparison: Pre vs Best Optional</h3>
                    <div style={{ height: 260 }}>
                      <Bar data={chartDataOpt} options={{
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 } } } },
                        scales: {
                          x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                          y: { min: 300, max: 1600, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                        }
                      }} />
                    </div>
                  </div>

                  <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Point Gain Per Student (Optional)</h3>
                    <div style={{ height: 180 }}>
                      <Bar data={gainDataOpt} options={{
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 } } },
                          y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'DM Sans', size: 11 } } }
                        }
                      }} />
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon name="math" size={17} />
                      Paired T-Test (Optional)
                    </h3>
                    {statsOpt && (
                      <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>
                        n={statsOpt.n} · mean gain {statsOpt.mean.toFixed(1)} · {statsOpt.pLabel} · Cohen’s d {statsOpt.d.toFixed(2)} · avg gain {avgImprovementOpt} points
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

	        {/* Tests tab */}
	        {tab === 'tests' && (
	          <div className="card">
	            <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="test" size={17} />
                Test Setup
              </h3>
	            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 14 }}>
	              Manage your test PDFs and answer keys. Skill Builder keys can be imported directly from the scoring guide PDFs.
	            </div>

		            <div style={{ display: 'grid', gap: 12 }}>
		              {TESTS.map((t) => {
		                const builtIn = getAnswerKeyBySection(t.id)
		                const stored = keysByTest?.[t.id] || null
                    const bundledPdf = (!builtIn && !stored && t.akUrl) ? 'Bundled AK PDF (auto)' : null
		                const builtInCount = countKey(builtIn)
		                const storedCount = countKey(stored)
		                const showCount = builtIn ? builtInCount : storedCount
		                return (
		                  <div key={t.id} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, background: '#f8fafc' }}>
		                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
		                      <div>
		                        <div style={{ fontWeight: 900, color: '#1a2744', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                              <span>{t.label}</span>
                              <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, background: t.exam === 'act' ? 'rgba(59,130,246,.10)' : 'rgba(245,158,11,.12)', color: t.exam === 'act' ? '#2563eb' : '#b45309' }}>
                                {(t.exam || 'sat').toUpperCase()}
                              </span>
                            </div>
		                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
		                          Answer key: {builtIn
		                            ? `Built-in (${builtInCount} answers)`
		                            : (stored ? `Loaded (${storedCount} answers)` : (bundledPdf || 'Not set'))}
		                          {stored && builtIn && storedCount !== builtInCount && (
		                            <span style={{ marginLeft: 8, color: '#ef4444', fontWeight: 800 }}>
		                              (DB has {storedCount})
		                            </span>
		                          )}
		                        </div>
		                      </div>
		                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
		                        {t.akUrl && (
		                          <a className="btn btn-outline" href={t.akUrl} target="_blank" rel="noreferrer" title="Open the answer key and explanations">
		                            {t.explanationUrl ? 'Open AK + Explanations →' : 'Open AK →'}
		                          </a>
		                        )}
		                        {builtIn && storedCount > 0 && storedCount !== builtInCount && (
		                          <button
		                            className="btn btn-outline"
		                            disabled={testKeyStatus.loading}
		                            onClick={async () => {
		                              setTestKeyStatus({ loading: true, msg: `Fixing ${t.label} answer key to ${builtInCount}…` })
		                              try {
		                                const up = await supabase.from('test_answer_keys').upsert({ test_id: t.id, answer_key: builtIn, updated_at: new Date().toISOString() })
		                                if (up.error) throw up.error
		                                setKeysByTest(prev => ({ ...(prev || {}), [t.id]: builtIn }))
		                                setTestKeyStatus({ loading: false, msg: `Success: fixed ${t.label} (${builtInCount} answers)` })
		                              } catch (e) {
		                                setTestKeyStatus({ loading: false, msg: `Error: ${e?.message || 'Could not fix key'}` })
		                              }
		                            }}
		                            title="Your database has an older/incomplete key. This overwrites it with the built-in full key."
		                          >
		                            Fix to {builtInCount}
		                          </button>
		                        )}
		                        {t.akUrl && (
		                          <button
		                            className="btn btn-outline"
		                            disabled={testKeyStatus.loading}
		                            onClick={async () => {
		                              setTestKeyStatus({ loading: true, msg: `Importing ${t.label} answer key…` })
		                              try {
		                                // Prefer the app's bundled built-in key when available (avoids partial PDF parsing).
		                                const fromBuiltIn = getAnswerKeyBySection(t.id)
		                                const toSave = fromBuiltIn || (await (async () => {
		                                  const res = await fetch(t.akUrl)
		                                  if (!res.ok) throw new Error('Could not fetch bundled answer key PDF.')
		                                  const buf = new Uint8Array(await res.arrayBuffer())
		                                  return await extractAnswerKeyFromPdf(buf)
		                                })())
		                                const up = await supabase.from('test_answer_keys').upsert({ test_id: t.id, answer_key: toSave, updated_at: new Date().toISOString() })
		                                if (up.error) throw up.error
		                                setKeysByTest(prev => ({ ...(prev || {}), [t.id]: toSave }))
		                                setTestKeyStatus({ loading: false, msg: `Success: imported ${t.label} (${countKey(toSave)} answers)` })
		                              } catch (e) {
		                                const msg = String(e?.message || 'Import failed')
		                                const hint = msg.toLowerCase().includes('row-level security') || msg.toLowerCase().includes('not authorized')
		                                  ? ' (Tip: run the Supabase schema + make sure agora@admin.org has role=admin in profiles.)'
		                                  : ''
		                                setTestKeyStatus({ loading: false, msg: `Error: ${msg}${hint}` })
		                              }
		                            }}
	                            title="Import from the bundled scoring guide PDF"
	                          >
	                            Import bundled AK
	                          </button>
	                        )}
		                        <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
		                          Upload AK PDF…
		                          <input
		                            type="file"
		                            accept="application/pdf"
		                            style={{ display: 'none' }}
		                            onChange={async (e) => {
		                              const file = e.target.files?.[0]
		                              if (!file) return
		                              setTestKeyStatus({ loading: true, msg: `Parsing ${t.label}…` })
		                              try {
		                                const buf = new Uint8Array(await file.arrayBuffer())
		                                const parsed = await extractAnswerKeyFromPdf(buf)
		                                const parsedCount = countKey(parsed)
		                                if (parsedCount < 10) throw new Error('Could not find enough answers in the PDF.')
		                                const up = await supabase.from('test_answer_keys').upsert({ test_id: t.id, answer_key: parsed, updated_at: new Date().toISOString() })
		                                if (up.error) throw up.error
		                                setKeysByTest(prev => ({ ...(prev || {}), [t.id]: parsed }))
		                                setTestKeyStatus({ loading: false, msg: `Success: saved ${t.label} (${parsedCount} answers)` })
		                              } catch (err) {
		                                const msg = String(err?.message || 'Could not parse PDF')
		                                const hint = msg.toLowerCase().includes('row-level security') || msg.toLowerCase().includes('not authorized')
		                                  ? ' (Tip: run the Supabase schema + make sure agora@admin.org has role=admin in profiles.)'
		                                  : ''
		                                setTestKeyStatus({ loading: false, msg: `Error: ${msg}${hint}` })
		                              } finally {
		                                e.target.value = ''
		                              }
		                            }}
		                          />
		                        </label>
		                        <a className="btn btn-outline" href={t.pdfUrl} target="_blank" rel="noreferrer">Open PDF →</a>
		                      </div>
		                    </div>
		                  </div>
		                )
		              })}
		            </div>

	            {testKeyStatus.msg && (
	              <div style={{ marginTop: 12, fontSize: 12, color: testKeyStatus.msg.toLowerCase().startsWith('success:') ? '#10b981' : '#ef4444', fontWeight: 900 }}>
	                {testKeyStatus.loading ? 'Working: ' : ''}{testKeyStatus.msg}
	              </div>
	            )}

		            <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>
		              Final Test page: <Link to="/final" style={{ color: '#1a2744', fontWeight: 800 }}>Open →</Link>
		            </div>
		          </div>
		        )}
      </div>
    </div>
  )
}
