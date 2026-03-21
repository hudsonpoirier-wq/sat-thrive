import { supabase } from './supabase.js'

const LS_KEY_PREFIX = 'agora_studied_topics_v1:'

function lsKey(userId) {
  return `${LS_KEY_PREFIX}${userId || 'anon'}`
}

function readLocal(userId) {
  try {
    return JSON.parse(localStorage.getItem(lsKey(userId)) || '{}')
  } catch {
    return {}
  }
}

function writeLocal(userId, map) {
  localStorage.setItem(lsKey(userId), JSON.stringify(map || {}))
}

export async function getStudiedTopics(userId) {
  if (!userId) return { source: 'none', map: {} }
  if (!supabase) return { source: 'local', map: readLocal(userId) }
  const { data, error } = await supabase
    .from('studied_topics')
    .select('chapter_id,completed,practice,updated_at,completed_at')
    .eq('user_id', userId)
  if (error) return { source: 'local', map: readLocal(userId) }
  const map = {}
  const practiceByChapter = {}
  const rows = []
  for (const row of data || []) {
    map[row.chapter_id] = Boolean(row.completed)
    if (row.practice && typeof row.practice === 'object') practiceByChapter[row.chapter_id] = row.practice
    rows.push(row)
  }
  writeLocal(userId, map)
  return { source: 'supabase', map, practiceByChapter, rows }
}

export async function setStudiedTopic(userId, chapterId, completed) {
  if (!userId || !chapterId || typeof chapterId !== 'string' || chapterId.length > 60) return
  const local = readLocal(userId)
  local[chapterId] = Boolean(completed)
  writeLocal(userId, local)
  if (!supabase) return
  await supabase
    .from('studied_topics')
    .upsert({
      user_id: userId,
      chapter_id: chapterId,
      completed: Boolean(completed),
      completed_at: completed ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
}

export async function setChapterGuidePractice(userId, chapterId, guideMap, existingPractice) {
  if (!userId || !chapterId || typeof chapterId !== 'string' || chapterId.length > 60) return
  if (!guideMap || typeof guideMap !== 'object' || Array.isArray(guideMap)) return
  const nextPractice = {
    ...(existingPractice && typeof existingPractice === 'object' ? existingPractice : {}),
    guide: guideMap,
  }
  if (!supabase) return
  await supabase
    .from('studied_topics')
    .upsert({
      user_id: userId,
      chapter_id: chapterId,
      practice: nextPractice,
      updated_at: new Date().toISOString(),
    })
}

export async function markChapterGuideStarted(userId, chapterId, existingPractice) {
  if (!userId || !chapterId || typeof chapterId !== 'string' || chapterId.length > 60) return
  const nowIso = new Date().toISOString()
  const base = (existingPractice && typeof existingPractice === 'object') ? existingPractice : {}
  const meta = (base.meta && typeof base.meta === 'object') ? base.meta : {}
  if (meta.guide_started_at) return
  const nextPractice = { ...base, meta: { ...meta, guide_started_at: nowIso } }
  if (!supabase) return
  await supabase
    .from('studied_topics')
    .upsert({
      user_id: userId,
      chapter_id: chapterId,
      practice: nextPractice,
      updated_at: nowIso,
    })
}

export async function clearAdminTestingData(userId) {
  if (!userId || !supabase) return
  // Best-effort cleanup; safe even if some columns/tables aren't migrated yet.
  try { await supabase.from('post_scores').delete().eq('user_id', userId) } catch {}
  try { await supabase.from('test_attempts').delete().eq('user_id', userId) } catch {}
  try { await supabase.from('studied_topics').delete().eq('user_id', userId) } catch {}
  try { localStorage.removeItem(lsKey(userId)) } catch {}
}
