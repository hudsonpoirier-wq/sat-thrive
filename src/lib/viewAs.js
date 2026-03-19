export function isAgoraAdmin(profile) {
  return profile?.role === 'admin' && String(profile?.email || '').toLowerCase() === 'agora@admin.org'
}

export function resolveViewContext({ userId, profile, search = '' }) {
  const params = new URLSearchParams(search || '')
  const requestedUserId = String(params.get('user') || '').trim()
  const isAdmin = isAgoraAdmin(profile)
  const canPreview = Boolean(isAdmin && requestedUserId)
  const viewUserId = canPreview ? requestedUserId : (userId || '')
  const isAdminPreview = Boolean(canPreview && String(requestedUserId) !== String(userId || ''))
  return { requestedUserId, viewUserId, isAdminPreview, isAdmin }
}

export function withViewUser(path, viewUserId, isAdminPreview) {
  if (!path || !viewUserId || !isAdminPreview) return path
  const [pathname, hash = ''] = String(path).split('#')
  const [base, query = ''] = pathname.split('?')
  const params = new URLSearchParams(query)
  params.set('user', viewUserId)
  const next = `${base}?${params.toString()}`
  return hash ? `${next}#${hash}` : next
}
