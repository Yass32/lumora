'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { endSession, hashPassword, MIN_PASSWORD, requireUser, startSession, temporaryPassword, verifyPassword } from '@/lib/auth'
import { getStore, newId } from '@/lib/data/store'
import { normalizeSections } from '@/content/defaults'
import {
  enquiryStatuses,
  type AboutDoc,
  type DestinationDoc,
  type EnquiryStatus,
  type ImageRef,
  type PartnerDoc,
  type ServiceDoc,
  type SettingsDoc,
  type StaffDoc,
  type StoryDoc,
  type TeamMemberDoc,
  type WhyTurkiyeDoc,
} from '@/lib/data/types'
import { locales, type Localized } from '@/lib/i18n'

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string }

/* ── Helpers ────────────────────────────────────────────── */

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function localized(v: unknown, max = 2000): Localized {
  const out: Localized = {}
  if (v && typeof v === 'object') {
    for (const l of locales) {
      const s = str((v as Record<string, unknown>)[l], max)
      if (s) out[l] = s
    }
  }
  return out
}

function image(v: unknown): ImageRef | null {
  if (!v || typeof v !== 'object') return null
  const i = v as Record<string, unknown>
  const url = str(i.url, 1000)
  const assetId = str(i.assetId, 200)
  if (!url || !assetId) return null
  if (!url.startsWith('/uploads/') && !url.startsWith('https://cdn.sanity.io/')) return null
  const focus = i.focus === 'top' || i.focus === 'bottom' ? i.focus : 'center'
  return { url, assetId, focus, alt: str(i.alt, 200) || undefined }
}

function url(v: unknown) {
  const s = str(v, 500)
  if (!s) return ''
  try {
    const u = new URL(s.startsWith('http') ? s : `https://${s}`)
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : ''
  } catch {
    return ''
  }
}

const num = (v: unknown, fallback = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : fallback)

function refreshSite() {
  revalidatePath('/', 'layout')
}

async function run(fn: () => Promise<string | void>): Promise<ActionResult> {
  try {
    const message = await fn()
    return { ok: true, message: message || undefined }
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) throw error // let redirects through
    console.error('[admin]', error)
    return { ok: false, error: error instanceof Error ? error.message : 'Something went wrong. Please try again.' }
  }
}

/* ── Sign in / out ──────────────────────────────────────── */

export async function login(_prev: { error?: string; email?: string } | undefined, form: FormData): Promise<{ error?: string; email?: string }> {
  const email = str(form.get('email'), 200).toLowerCase()
  const password = String(form.get('password') ?? '')
  if (!email || !password) return { error: 'Enter your email and password.', email }

  const store = getStore()
  const staff = await store.list('staffUser')
  let user = staff.find((s) => s.email.toLowerCase() === email) ?? null

  if (user) {
    if (!(await verifyPassword(password, user.passwordHash))) user = null
  } else if (staff.length === 0) {
    // First sign-in ever: the owner account comes from ADMIN_EMAIL / ADMIN_PASSWORD.
    const ownerEmail = (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase()
    const ownerPassword = process.env.ADMIN_PASSWORD ?? ''
    if (ownerEmail && ownerPassword && email === ownerEmail && password === ownerPassword) {
      user = await store.save<StaffDoc>({
        _id: newId('staff'),
        _type: 'staffUser',
        name: process.env.ADMIN_NAME?.trim() || 'Admin',
        email,
        role: 'admin',
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString(),
      })
    } else if (!ownerEmail || !ownerPassword) {
      return { error: 'No staff accounts exist yet. Set ADMIN_EMAIL and ADMIN_PASSWORD (see README), then sign in with them.', email }
    }
  }

  if (!user) {
    await new Promise((r) => setTimeout(r, 600)) // slow down password guessing
    return { error: 'That email and password don’t match an account.', email }
  }
  try {
    await startSession(user)
  } catch {
    return { error: 'Sign-in is not set up: AUTH_SECRET is missing (see README).', email }
  }
  redirect('/admin/content')
}

export async function logout() {
  await endSession()
  redirect('/admin/login')
}

/* ── Site settings & hero ───────────────────────────────── */

export async function saveSettings(input: Partial<SettingsDoc>): Promise<ActionResult> {
  return run(async () => {
    await requireUser()
    const store = getStore()
    const current = (await store.get('siteSettings', 'siteSettings')) ?? { _id: 'siteSettings', _type: 'siteSettings' as const }
    const next: SettingsDoc = { ...current }
    if ('heroImage' in input) next.heroImage = image(input.heroImage)
    for (const key of ['whatsappZimbabwe', 'phoneTurkiye', 'address'] as const) if (key in input) next[key] = str(input[key], 200)
    if ('email' in input) {
      const e = str(input.email, 200)
      if (e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error('That email address doesn’t look right.')
      next.email = e
    }
    if ('instagram' in input) next.instagram = url(input.instagram)
    if ('tiktok' in input) next.tiktok = url(input.tiktok)
    await store.save(next)
    refreshSite()
  })
}

/* ── Homepage section order & visibility ────────────────── */

export async function saveSections(sections: { key: string; visible: boolean }[]): Promise<ActionResult> {
  return run(async () => {
    await requireUser()
    const clean = normalizeSections(sections.map((s) => ({ key: String(s.key), visible: !!s.visible })))
    await getStore().save({ _id: 'homepage', _type: 'homepage', sections: clean })
    refreshSite()
  })
}

/* ── Why Türkiye & About ────────────────────────────────── */

export async function saveWhyTurkiye(input: WhyTurkiyeDoc): Promise<ActionResult> {
  return run(async () => {
    await requireUser()
    await getStore().save<WhyTurkiyeDoc>({
      _id: 'whyTurkiye',
      _type: 'whyTurkiye',
      eyebrow: localized(input.eyebrow, 120),
      heading: localized(input.heading, 200),
      body: localized(input.body, 1500),
      points: (input.points ?? []).slice(0, 6).map((p) => ({ title: localized(p.title, 120), text: localized(p.text, 500) })),
    })
    refreshSite()
  })
}

export async function saveAbout(input: AboutDoc): Promise<ActionResult> {
  return run(async () => {
    await requireUser()
    await getStore().save<AboutDoc>({
      _id: 'about',
      _type: 'about',
      eyebrow: localized(input.eyebrow, 120),
      heading: localized(input.heading, 200),
      paragraphs: (input.paragraphs ?? []).slice(0, 6).map((p) => localized(p, 2000)),
    })
    refreshSite()
  })
}

/* ── Lists: services, team, stories, partners ──────────── */

type ListType = 'service' | 'destination' | 'teamMember' | 'story' | 'partner'

function cleanListItem(type: ListType, input: Record<string, unknown>) {
  const _id = str(input._id, 80) || newId(type)
  const order = num(input.order, Date.now() % 100000)
  switch (type) {
    case 'service': {
      const stage = input.stage === 2 || input.stage === 3 ? input.stage : 1
      const title = localized(input.title, 120)
      if (!title.en) throw new Error('Add the service name in English.')
      return { _id, _type: 'service', order, stage, title, description: localized(input.description, 400) } satisfies ServiceDoc
    }
    case 'destination': {
      const name = localized(input.name, 80)
      if (!name.en) throw new Error('Add the country name in English.')
      const code = str(input.code, 3).toUpperCase().replace(/[^A-Z]/g, '') || name.en.slice(0, 2).toUpperCase()
      return { _id, _type: 'destination', order, code, name, summary: localized(input.summary, 300), photo: image(input.photo) } satisfies DestinationDoc
    }
    case 'teamMember': {
      const name = str(input.name, 120)
      if (!name) throw new Error('Add a name.')
      return {
        _id,
        _type: 'teamMember',
        order,
        name,
        role: localized(input.role, 120),
        office: input.office === 'Türkiye' ? 'Türkiye' : 'Zimbabwe',
        photo: image(input.photo),
      } satisfies TeamMemberDoc
    }
    case 'story': {
      const studentName = str(input.studentName, 120)
      if (!studentName) throw new Error('Add the student’s name.')
      return {
        _id,
        _type: 'story',
        order,
        studentName,
        programme: str(input.programme, 120),
        university: str(input.university, 160),
        city: str(input.city, 80),
        quote: localized(input.quote, 600),
        photo: image(input.photo),
      } satisfies StoryDoc
    }
    case 'partner': {
      const name = str(input.name, 160)
      if (!name) throw new Error('Add the university name.')
      return { _id, _type: 'partner', order, name, website: url(input.website), logo: image(input.logo) } satisfies PartnerDoc
    }
  }
}

export async function saveListItem(type: ListType, input: Record<string, unknown>): Promise<ActionResult & { id?: string }> {
  let id = ''
  const result = await run(async () => {
    await requireUser()
    const doc = cleanListItem(type, input)
    id = doc._id
    await getStore().save(doc)
    refreshSite()
  })
  return result.ok ? { ...result, id } : result
}

export async function deleteListItem(type: ListType, id: string): Promise<ActionResult> {
  return run(async () => {
    await requireUser()
    const doc = await getStore().get(type, id)
    if (!doc) return
    await getStore().remove(id)
    refreshSite()
  })
}

export async function reorderList(type: ListType, ids: string[]): Promise<ActionResult> {
  return run(async () => {
    await requireUser()
    const store = getStore()
    const existing = new Set((await store.list(type)).map((d) => d._id))
    let i = 0
    for (const id of ids) if (existing.has(id)) await store.patch(id, { order: ++i * 10 })
    refreshSite()
  })
}

/* ── Enquiries ──────────────────────────────────────────── */

export async function updateEnquiry(id: string, input: { status?: string; notes?: string }): Promise<ActionResult> {
  return run(async () => {
    await requireUser()
    const store = getStore()
    if (!(await store.get('enquiry', id))) throw new Error('This enquiry no longer exists.')
    const set: Record<string, unknown> = {}
    if (input.status && (enquiryStatuses as readonly string[]).includes(input.status)) set.status = input.status as EnquiryStatus
    if (typeof input.notes === 'string') set.notes = str(input.notes, 3000)
    await store.patch(id, set)
    revalidatePath('/admin/enquiries')
  })
}

export async function deleteEnquiry(id: string): Promise<ActionResult> {
  return run(async () => {
    await requireUser('admin')
    await getStore().remove(id)
    revalidatePath('/admin/enquiries')
  })
}

/* ── Staff accounts ─────────────────────────────────────── */

export async function createStaff(input: { name: string; email: string; role: string }): Promise<ActionResult & { password?: string }> {
  let password = ''
  const result = await run(async () => {
    await requireUser('admin')
    const name = str(input.name, 120)
    const email = str(input.email, 200).toLowerCase()
    if (!name) throw new Error('Add a name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('That email address doesn’t look right.')
    const store = getStore()
    if ((await store.list('staffUser')).some((s) => s.email.toLowerCase() === email)) throw new Error('Someone already uses that email.')
    password = temporaryPassword()
    await store.save<StaffDoc>({
      _id: newId('staff'),
      _type: 'staffUser',
      name,
      email,
      role: input.role === 'admin' ? 'admin' : 'editor',
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    })
    revalidatePath('/admin/staff')
  })
  return result.ok ? { ...result, password } : result
}

export async function resetStaffPassword(id: string): Promise<ActionResult & { password?: string }> {
  let password = ''
  const result = await run(async () => {
    await requireUser('admin')
    const store = getStore()
    if (!(await store.get('staffUser', id))) throw new Error('This account no longer exists.')
    password = temporaryPassword()
    await store.patch(id, { passwordHash: await hashPassword(password) })
  })
  return result.ok ? { ...result, password } : result
}

export async function deleteStaff(id: string): Promise<ActionResult> {
  return run(async () => {
    const me = await requireUser('admin')
    if (id === me._id) throw new Error('You can’t remove your own account.')
    await getStore().remove(id)
    revalidatePath('/admin/staff')
  })
}

export async function changePassword(_prev: ActionResult | undefined, form: FormData): Promise<ActionResult> {
  return run(async () => {
    const me = await requireUser()
    const current = String(form.get('current') ?? '')
    const next = String(form.get('next') ?? '')
    const confirm = String(form.get('confirm') ?? '')
    const store = getStore()
    const user = await store.get('staffUser', me._id)
    if (!user || !(await verifyPassword(current, user.passwordHash))) throw new Error('Your current password isn’t right.')
    if (next.length < MIN_PASSWORD) throw new Error(`Use at least ${MIN_PASSWORD} characters.`)
    if (next !== confirm) throw new Error('The two new passwords don’t match.')
    await store.patch(user._id, { passwordHash: await hashPassword(next) })
    return 'Password changed.'
  })
}
