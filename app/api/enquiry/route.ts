import { NextResponse } from 'next/server'
import { getWriteClient } from '@/sanity/client'
import { isLocale } from '@/lib/i18n'

const MAX = { name: 120, phone: 40, email: 160, level: 80, programme: 160, intake: 60, message: 3000 }

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true })

  const enquiry = {
    name: clean(body.name, MAX.name),
    phone: clean(body.phone, MAX.phone),
    email: clean(body.email, MAX.email),
    level: clean(body.level, MAX.level),
    programme: clean(body.programme, MAX.programme),
    intake: clean(body.intake, MAX.intake),
    message: clean(body.message, MAX.message),
    language: isLocale(clean(body.language, 5)) ? clean(body.language, 5) : 'en',
  }

  if (!enquiry.name || !enquiry.phone) {
    return NextResponse.json({ ok: false, error: 'Name and WhatsApp number are required' }, { status: 422 })
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) enquiry.email = ''

  const submittedAt = new Date().toISOString()
  let saved = false
  let emailed = false

  const sanity = getWriteClient()
  if (sanity) {
    try {
      await sanity.create({ _type: 'enquiry', status: 'new', submittedAt, ...enquiry })
      saved = true
    } catch (error) {
      console.error('[enquiry] Could not save to Sanity', error)
    }
  }

  emailed = await sendEmail(enquiry, submittedAt)

  if (!saved && !emailed) {
    // Nothing could store the enquiry: log it so it's still in the server logs, and tell the visitor to use WhatsApp.
    console.warn('[enquiry] Not stored (CMS and email not configured):', { ...enquiry, submittedAt })
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ ok: false, error: 'Enquiries are not set up yet' }, { status: 503 })
    }
  }

  return NextResponse.json({ ok: true, saved, emailed })
}

async function sendEmail(e: Record<string, string>, submittedAt: string) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_NOTIFY_EMAIL
  if (!key || !to) return false

  const rows: [string, string][] = [
    ['Name', e.name],
    ['WhatsApp', e.phone],
    ['Email', e.email || '—'],
    ['Level', e.level],
    ['Programme', e.programme || '—'],
    ['Intake', e.intake],
    ['Website language', e.language],
    ['Message', e.message || '—'],
    ['Received', new Date(submittedAt).toUTCString()],
  ]
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)
  const html = `<h2 style="font-family:Georgia,serif;color:#0e3b18">New consultation request</h2><table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5b6659;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL || 'Lumora Website <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()),
        reply_to: e.email || undefined,
        subject: `New enquiry: ${e.name} (${e.programme || e.level})`,
        html,
      }),
    })
    if (!res.ok) console.error('[enquiry] Email failed', res.status, await res.text())
    return res.ok
  } catch (error) {
    console.error('[enquiry] Email failed', error)
    return false
  }
}
