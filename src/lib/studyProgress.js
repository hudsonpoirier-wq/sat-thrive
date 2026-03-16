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
    .select('chapter_id,completed,practice')
    .eq('user_id', userId)
  if (error) return { source: 'local', map: readLocal(userId) }
  const map = {}
  const practiceByChapter = {}
  for (const row of data || []) {
    map[row.chapter_id] = Boolean(row.completed)
    if (row.practice && typeof row.practice === 'object') practiceByChapter[row.chapter_id] = row.practice
  }
  writeLocal(userId, map)
  return { source: 'supabase', map, practiceByChapter }
}

export async function setStudiedTopic(userId, chapterId, completed) {
  if (!userId || !chapterId) return
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
  if (!userId || !chapterId || !guideMap || typeof guideMap !== 'object') return
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

export async function clearAdminTestingData(userId) {
  if (!userId || !supabase) return
  // Best-effort cleanup; safe even if some columns/tables aren't migrated yet.
  try { await supabase.from('post_scores').delete().eq('user_id', userId) } catch {}
  try { await supabase.from('test_attempts').delete().eq('user_id', userId) } catch {}
  try { await supabase.from('studied_topics').delete().eq('user_id', userId) } catch {}
  try { localStorage.removeItem(lsKey(userId)) } catch {}
}
