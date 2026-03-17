import { createClient } from '@supabase/supabase-js'

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return json(res, 500, { error: 'Missing server configuration' })

  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return json(res, 401, { error: 'Missing bearer token' })

  let payload = {}
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
  } catch {
    return json(res, 400, { error: 'Invalid JSON body' })
  }

  const targetUserId = payload.user_id || payload.userId
  if (!targetUserId) return json(res, 400, { error: 'Missing user_id' })

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

  try {
    const { data: u, error: uErr } = await admin.auth.getUser(token)
    if (uErr) return json(res, 401, { error: 'Invalid session' })
    const requesterId = u?.user?.id
    const requesterEmail = String(u?.user?.email || '').toLowerCase()

    const { data: prof, error: pErr } = await admin
      .from('profiles')
      .select('id,email,role')
      .eq('id', requesterId)
      .maybeSingle()
    if (pErr) return json(res, 403, { error: 'Not authorized' })

    const isAdmin = prof?.role === 'admin' && String(prof?.email || '').toLowerCase() === 'agora@admin.org' && requesterEmail === 'agora@admin.org'
    if (!isAdmin) return json(res, 403, { error: 'Not authorized' })

    // Prevent deleting the Agora admin account from the UI.
    if (String(targetUserId) === String(requesterId)) return json(res, 400, { error: 'Cannot delete your own admin account' })

    const { error: delErr } = await admin.auth.admin.deleteUser(String(targetUserId))
    if (delErr) return json(res, 400, { error: delErr.message || 'Delete failed' })

    return json(res, 200, { ok: true })
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Server error' })
  }
}

