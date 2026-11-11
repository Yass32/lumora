import 'server-only'
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getStore } from '@/lib/data/store'
import type { StaffDoc } from '@/lib/data/types'
import { SESSION_COOKIE, SESSION_DAYS, signSession, verifySession } from './session-token'

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>

export async function hashPassword(password: string) {
  const salt = randomBytes(16)
  const hash = await scrypt(password, salt, 64)
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, saltHex, hashHex] = stored.split('$')
  if (scheme !== 'scrypt' || !saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, 'hex')
  const actual = await scrypt(password, Buffer.from(saltHex, 'hex'), expected.length)
  return timingSafeEqual(actual, expected)
}

/** A readable temporary password, e.g. "lumora-4821-kavu" */
export function temporaryPassword() {
  const words = ['kavu', 'mira', 'tano', 'zuva', 'nyika', 'gold', 'dove', 'nile', 'sena', 'ruva']
  const n = randomBytes(2).readUInt16BE() % 9000 + 1000
  return `lumora-${n}-${words[randomBytes(1)[0] % words.length]}`
}

export { MIN_PASSWORD_LENGTH as MIN_PASSWORD } from '@/components/admin/constants'

export async function startSession(user: StaffDoc) {
  const token = await signSession({ sub: user._id, role: user.role, name: user.name })
  const jar = await cookies()
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function endSession() {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
}

export type CurrentUser = Pick<StaffDoc, '_id' | 'name' | 'email' | 'role'>

/** The signed-in staff member, or null. Re-checks the account still exists. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const jar = await cookies()
  const session = await verifySession(jar.get(SESSION_COOKIE)?.value)
  if (!session) return null
  const user = await getStore().get('staffUser', session.sub)
  if (!user) return null
  return { _id: user._id, name: user.name, email: user.email, role: user.role }
}

/** Use at the top of every admin page and action. */
export async function requireUser(role?: 'admin'): Promise<CurrentUser> {
  const user = await getCurrentUser()
  if (!user) redirect('/admin/login')
  if (role === 'admin' && user.role !== 'admin') throw new Error('Only admins can do this.')
  return user
}
