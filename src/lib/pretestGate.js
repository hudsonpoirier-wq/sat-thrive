function keyFor(userId, exam = 'sat') {
  return `agora_pretest_unlock_v1:${exam}:${userId || 'anon'}`
}

export function hasUnlockedResources(userId, exam = 'sat') {
  try {
    return localStorage.getItem(keyFor(userId, exam)) === '1'
  } catch {
    return false
  }
}

export function setUnlockedResources(userId, exam = 'sat', unlocked = true) {
  try {
    const key = keyFor(userId, exam)
    if (unlocked) localStorage.setItem(key, '1')
    else localStorage.removeItem(key)
  } catch {}
}
