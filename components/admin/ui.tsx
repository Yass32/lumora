'use client'

import { useCallback, useEffect, useState, useTransition, type ReactNode } from 'react'
import type { ActionResult } from '@/lib/admin/actions'
import { locales, localeNames, type Locale, type Localized } from '@/lib/i18n'
import { Icon } from './Icon'
import { btnPrimary } from './styles'

export function PageHeader({ crumbs, title, children }: { crumbs: string[]; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line bg-white px-5 py-4 sm:px-8">
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] text-muted">
          {crumbs.slice(0, -1).map((c) => (
            <span key={c}>
              {c} ›{' '}
            </span>
          ))}
          <span className="font-semibold text-ink">{crumbs[crumbs.length - 1]}</span>
        </span>
        <h1 className="font-display text-[32px] font-semibold leading-tight text-forest">{title}</h1>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2.5">{children}</div>}
    </div>
  )
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warn' | 'error' | 'success'; children: ReactNode }) {
  const styles = {
    info: 'bg-[#f4f8f2] border-[#d5e6d1] text-[#24402a]',
    warn: 'bg-[#fbf3dc] border-[#ebd79a] text-[#4a3b0b]',
    error: 'bg-[#f7e3df] border-[#eac3bb] text-[#8a2a19]',
    success: 'bg-[#e3f0e1] border-[#c5dfc1] text-[#1b5e20]',
  }[tone]
  return (
    <div role={tone === 'error' ? 'alert' : undefined} className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`}>
      <Icon name={tone === 'success' ? 'check' : tone === 'info' ? 'info' : 'warn'} size={18} className="mt-0.5" />
      <div>{children}</div>
    </div>
  )
}

export function Badge({ tone, children }: { tone: 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'gray'; children: ReactNode }) {
  const styles = {
    green: 'bg-[#e3f0e1] text-[#1b5e20]',
    amber: 'bg-[#fbf3dc] text-[#7a5c0e]',
    red: 'bg-[#f7e3df] text-[#9a2e1c]',
    blue: 'bg-[#e6eef7] text-[#24496e]',
    purple: 'bg-[#efe6f5] text-[#5b2d7a]',
    gray: 'bg-[#eeece6] text-[#4d5a50]',
  }[tone]
  return <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${styles}`}>{children}</span>
}

/** Runs a server action and keeps track of saving / saved / error. */
export function useAction() {
  const [pending, start] = useTransition()
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => {
    if (status?.ok) {
      const t = setTimeout(() => setStatus(null), 3000)
      return () => clearTimeout(t)
    }
  }, [status])

  const run = useCallback(
    <R extends ActionResult>(fn: () => Promise<R>, okText = 'Saved', onOk?: (r: R) => void) =>
      new Promise<R | null>((resolve) => {
        setStatus(null)
        start(async () => {
          try {
            const result = await fn()
            if (result.ok) {
              setStatus({ ok: true, text: result.message || okText })
              onOk?.(result)
            } else setStatus({ ok: false, text: result.error })
            resolve(result)
          } catch {
            setStatus({ ok: false, text: 'Could not reach the server. Check your connection and try again.' })
            resolve(null)
          }
        })
      }),
    [],
  )
  return { run, pending, status, setStatus }
}

export function SaveBar({
  dirty,
  pending,
  status,
  onSave,
  label = 'Save changes',
  note,
}: {
  dirty: boolean
  pending: boolean
  status: { ok: boolean; text: string } | null
  onSave: () => void
  label?: string
  note?: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 border-t border-line pt-5">
      <div className="mr-auto min-h-5 text-[13px]" aria-live="polite">
        {status && !status.ok && <span className="font-semibold text-[#8a2a19]">{status.text}</span>}
        {status?.ok && (
          <span className="inline-flex items-center gap-1.5 font-semibold text-leaf">
            <Icon name="check" size={16} /> {status.text}. The website updates within a minute.
          </span>
        )}
        {!status && dirty && (
          <span className="inline-flex items-center gap-2 text-muted">
            <span className="block h-2 w-2 rounded-full bg-gold" /> Unsaved changes
          </span>
        )}
        {!status && !dirty && note && <span className="text-muted">{note}</span>}
      </div>
      <button type="button" onClick={onSave} disabled={!dirty || pending} className={btnPrimary}>
        {pending ? 'Saving…' : label}
      </button>
    </div>
  )
}

/* ── Languages ──────────────────────────────────────────── */

export function langComplete(values: (Localized | undefined)[], lang: Locale) {
  return values.every((v) => !!v?.[lang]?.trim())
}

export function LangTabs({ lang, onChange, values }: { lang: Locale; onChange: (l: Locale) => void; values: (Localized | undefined)[] }) {
  return (
    <div role="tablist" aria-label="Language" className="flex flex-wrap gap-2 border-b border-line pb-3.5">
      {locales.map((l) => {
        const selected = l === lang
        const complete = langComplete(values, l)
        return (
          <button
            key={l}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(l)}
            className={`flex min-h-11 items-center gap-2 rounded-[10px] border-2 px-3.5 text-sm ${
              selected ? 'border-leaf bg-white' : 'border-transparent bg-[#f6f3ea] hover:bg-[#efe9d9]'
            }`}
          >
            <span className="font-bold">{localeNames[l].short}</span>
            {complete ? <Badge tone="green">Complete</Badge> : <Badge tone={l === 'en' ? 'red' : 'amber'}>Missing text</Badge>}
          </button>
        )
      })}
    </div>
  )
}

export function LangNotice({ lang }: { lang: Locale }) {
  if (lang === 'en') return null
  return (
    <Notice tone={lang === 'sn' ? 'warn' : 'info'}>
      {lang === 'sn'
        ? 'Have a Shona speaker on the team check new Shona text. Empty fields show the English text on the website.'
        : `Editing the ${localeNames[lang].native} version. Empty fields show the English text on the website.`}
    </Notice>
  )
}

export function setLocalized(value: Localized | undefined, lang: Locale, text: string): Localized {
  return { ...(value ?? {}), [lang]: text }
}

export function useDirty<T>(initial: T) {
  const [value, setValue] = useState(initial)
  const [saved, setSaved] = useState(() => JSON.stringify(initial))
  const dirty = JSON.stringify(value) !== saved
  return { value, setValue, dirty, markSaved: () => setSaved(JSON.stringify(value)) }
}
