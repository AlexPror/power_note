const KEY = '7v_session'

export async function hashPin(scope, pin) {
  const data = new TextEncoder().encode(`${scope}:${pin}`)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function readSession() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeSession(session) {
  localStorage.setItem(KEY, JSON.stringify({ ...session, at: Date.now() }))
}

export function clearSession() {
  localStorage.removeItem(KEY)
}

export function isStaff(session) {
  return session?.role === 'admin' || session?.role === 'trainer'
}

export function canViewAthlete(session, slug) {
  if (!session) return false
  if (isStaff(session)) return true
  return session.role === 'family' && session.slug === slug
}
