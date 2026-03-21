export function isAgoraAdmin(profile) {
  return profile?.role === 'admin' && String(profile?.email || '').toLowerCase() === 'agora@admin.org'
}

export function isTutorRole(profile) {
  return profile?.role === 'tutor'
}

export function resolveViewContext({ userId, profile, search = '' }) {
  const params = new URLSearchParams(search || '')
  const requestedUserId = String(params.get('user') || '').trim()
  const isAdmin = isAgoraAdmin(profile)
  const isTutor = isTutorRole(profile)
  const canPreview = Boolean((isAdmin || isTutor) && requestedUserId)
  const viewUserId = canPreview ? requestedUserId : (userId || '')
  const isAdminPreview = Boolean(canPreview && String(requestedUserId) !== String(userId || ''))
  return { requestedUserId, viewUserId, isAdminPreview, isAdmin, isTutor }
}

export function withViewUser(path, viewUserId, isAdminPreview) {
  if (!path || !viewUserId || !isAdminPreview) return path
  return withQueryParam(path, 'user', viewUserId)
}

export function withQueryParam(path, key, value) {
  if (!path || !key || value == null || value === '') return path
  const [pathname, hash = ''] = String(path).split('#')
  const [base, query = ''] = pathname.split('?')
  const params = new URLSearchParams(query)
  params.set(key, value)
  const next = `${base}?${params.toString()}`
  return hash ? `${next}#${hash}` : next
}

export function withExam(path, exam) {
  return withQueryParam(path, 'exam', exam)
}
