'use client'

import { useState, type FormEvent } from 'react'
import type { Dictionary } from '@/content/dictionary'
import type { Locale } from '@/lib/i18n'
import { CheckIcon, WhatsAppIcon } from './icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const input =
  'min-h-12 w-full rounded-[10px] border border-[#cfc3a0] bg-[#fdfbf5] px-3.5 text-[15px] text-ink placeholder:text-[#8a8f80] focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/25'
const label = 'text-sm font-semibold'

export function EnquiryForm({
  t,
  locale,
  whatsappHref,
  whatsappLabel,
  destinations,
}: {
  t: Dictionary['form']
  locale: Locale
  whatsappHref: string
  whatsappLabel: string
  destinations: { value: string; label: string }[]
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [problem, setProblem] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    if (!data.name?.trim() || !data.phone?.trim()) {
      setProblem(t.required)
      return
    }
    setProblem(null)
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, language: locale }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-4 rounded-3xl border border-line bg-white p-9">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e3f0e1] text-leaf">
          <CheckIcon size={28} strokeWidth={2.6} />
        </span>
        <p className="font-display text-3xl font-semibold leading-tight text-forest">{t.success}</p>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-leaf">
          <WhatsAppIcon size={18} />
          {whatsappLabel}
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-x-5 gap-y-[18px] rounded-3xl border border-line bg-white p-6 sm:grid-cols-2 sm:p-9">
      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-name" className={label}>
          {t.name}
        </label>
        <input id="f-name" name="name" type="text" required autoComplete="name" placeholder={t.namePlaceholder} className={input} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-phone" className={label}>
          {t.phone}
        </label>
        <input id="f-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+263" className={input} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-email" className={label}>
          {t.email} <span className="font-normal text-muted">{t.optional}</span>
        </label>
        <input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={input} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-destination" className={label}>
          {t.destination}
        </label>
        <select id="f-destination" name="destination" className={input} defaultValue="">
          <option value="">{t.notSure}</option>
          {destinations.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-level" className={label}>
          {t.level}
        </label>
        <select id="f-level" name="level" className={input}>
          {t.levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-programme" className={label}>
          {t.programme}
        </label>
        <input id="f-programme" name="programme" type="text" placeholder={t.programmePlaceholder} className={input} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-intake" className={label}>
          {t.intake}
        </label>
        <select id="f-intake" name="intake" className={input}>
          {t.intakes.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="f-message" className={label}>
          {t.message} <span className="font-normal text-muted">{t.optional}</span>
        </label>
        <textarea id="f-message" name="message" rows={4} className={`${input} resize-y py-3`} />
      </div>

      {(problem || status === 'error') && (
        <p role="alert" className="rounded-[10px] bg-[#f7e3df] px-4 py-3 text-sm font-semibold text-[#8a2a19] sm:col-span-2">
          {problem ?? t.error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted">{t.privacy}</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="min-h-[52px] shrink-0 rounded-full bg-leaf px-8 text-base font-bold text-white transition-colors hover:bg-forest disabled:opacity-70"
        >
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </div>
    </form>
  )
}
