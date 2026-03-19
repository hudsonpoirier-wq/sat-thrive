import { supabase } from './supabase.js'
import { getStudiedTopics } from './studyProgress.js'
import { loadMistakes, loadReviewItems } from './mistakesStore.js'

export async function loadProfileSafe(userId) {
  if (!supabase || !userId) return null
  try {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    return data || null
  } catch {
    return null
  }
}

export async function loadDashboardViewData(userId) {
  if (!userId) {
    return {
      attempts: [],
      postScores: [],
      studiedMap: {},
      studiedRows: [],
      mistakes: [],
      reviewItems: {},
    }
  }
  if (!supabase) {
    return {
      attempts: [],
      postScores: [],
      studiedMap: {},
      studiedRows: [],
      mistakes: [],
      reviewItems: {},
    }
  }

  const [attemptsRes, postScoresRes, studiedRes, mistakesRes, reviewRes] = await Promise.allSettled([
    supabase.from('test_attempts').select('*').eq('user_id', userId).order('started_at', { ascending: false }),
    supabase.from('post_scores').select('*').eq('user_id', userId).order('recorded_at', { ascending: false }),
    getStudiedTopics(userId),
    loadMistakes(userId),
    loadReviewItems(userId),
  ])

  const attempts = attemptsRes.status === 'fulfilled' ? (attemptsRes.value.data || []) : []
  const postScores = postScoresRes.status === 'fulfilled' ? (postScoresRes.value.data || []) : []
  const studiedMap = studiedRes.status === 'fulfilled' ? (studiedRes.value.map || {}) : {}
  const studiedRows = studiedRes.status === 'fulfilled' ? (studiedRes.value.rows || []) : []
  const mistakes = mistakesRes.status === 'fulfilled' ? (mistakesRes.value.items || []) : []
  const reviewItems = reviewRes.status === 'fulfilled' ? (reviewRes.value.items || {}) : {}

  return { attempts, postScores, studiedMap, studiedRows, mistakes, reviewItems }
}
