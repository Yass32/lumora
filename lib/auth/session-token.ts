import { jwtVerify, SignJWT } from 'jose'

/** Shared by the proxy and server code. No Node-only imports here. */
export const SESSION_COOKIE = 'lumora_admin'
export const SESSION_DAYS = 7

export type SessionPayload = { sub: string; role: 'admin' | 'editor'; name: string }

const DEV_SECRET = 'dev-only-secret-change-me-in-production-0123456789'

export function getSecret(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET
  if (secret && secret.length >= 32) return new TextEncoder().encode(secret)
  if (process.env.NODE_ENV !== 'production') return new TextEncoder().encode(DEV_SECRET)
  return null
}

export async function signSession(payload: SessionPayload) {
  const secret = getSecret()
  if (!secret) throw new Error('AUTH_SECRET is missing or shorter than 32 characters')
  return new SignJWT({ role: payload.role, name: payload.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret)
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  const secret = getSecret()
  if (!token || !secret) return null
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
    if (!payload.sub) return null
    return { sub: payload.sub, role: payload.role === 'admin' ? 'admin' : 'editor', name: String(payload.name ?? '') }
  } catch {
    return null
  }
}
