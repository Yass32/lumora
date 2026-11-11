'use client'

import { useState, type ReactNode } from 'react'
import { saveAbout, saveSettings, saveWhyTurkiye } from '@/lib/admin/actions'
import { focusPosition, type AboutDoc, type SettingsDoc, type WhyTurkiyeDoc } from '@/lib/data/types'
import { pick, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'
import { ImageField } from './ImageField'
import { field, label, textarea, btnSecondary, btnIcon } from './styles'
import { Badge, LangNotice, LangTabs, Notice, SaveBar, setLocalized, useAction, useDirty } from './ui'

export function EditorCard({ title, badge, children }: { title: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex min-w-0 flex-[999_1_460px] flex-col gap-5 rounded-[18px] border border-line bg-white p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{title}</h2>
        {badge}
      </div>
      {children}
    </section>
  )
}

export function PreviewColumn({ label: heading, children, note = 'Changes show here as you type. Visitors see them after you save.' }: { label: string; children: ReactNode; note?: string }) {
  return (
    <aside className="flex min-w-[260px] max-w-[360px] flex-[1_1_300px] flex-col gap-2.5" aria-label="Live preview">
      <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted">Live preview · {heading}</span>
      {children}
      <span className="text-xs leading-relaxed text-muted">{note}</span>
    </aside>
  )
}

function Field({ id, title, children, hint }: { id: string; title: string; children: ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={label}>
        {title} {hint && <span className="font-normal text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

/* ── Hero: photo only ───────────────────────────────────── */

export function HeroEditor({ settings }: { settings: SettingsDoc }) {
  const { value, setValue, dirty, markSaved } = useDirty(settings.heroImage ?? null)
  const { run, pending, status } = useAction()
  const src = value?.url ?? '/images/bosphorus-hero.png'
  return (
    <>
      <EditorCard title="Hero image" badge={<Badge tone="green">Shared by all languages</Badge>}>
        <Notice>The hero headline and buttons are fixed and already translated into all four languages. Here you only change the photo.</Notice>
        <ImageField
          value={value}
          onChange={setValue}
          fallbackUrl="/images/bosphorus-hero.png"
          fallbackLabel="Showing the built-in Istanbul & Bosphorus illustration."
          shape="arch"
          withAlt
          withFocus
          help="Use a tall photo, at least 1200 px high. JPG, PNG or WebP, up to 4 MB."
        />
        <SaveBar dirty={dirty} pending={pending} status={status} onSave={() => run(() => saveSettings({ heroImage: value }), 'Saved', markSaved)} />
      </EditorCard>
      <PreviewColumn label="All languages">
        <div className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-cream p-[18px] shadow-[0_10px_28px_rgba(14,59,24,0.08)]">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-ink">Study in Türkiye from Zimbabwe</span>
          <span className="font-display text-2xl font-semibold leading-[1.1] text-forest">
            Your future in Türkiye, guided from <em>application to arrival.</em>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="h-[200px] w-full rounded-t-[100px] rounded-b-xl object-cover"
            style={{ objectPosition: value ? focusPosition[value.focus ?? 'center'] : '50% 70%' }}
          />
        </div>
      </PreviewColumn>
    </>
  )
}

/* ── Contact details & social links ─────────────────────── */

export function ContactEditor({ settings }: { settings: SettingsDoc }) {
  const pickFields = (s: SettingsDoc) => ({
    whatsappZimbabwe: s.whatsappZimbabwe ?? '',
    phoneTurkiye: s.phoneTurkiye ?? '',
    email: s.email ?? '',
    address: s.address ?? '',
    instagram: s.instagram ?? '',
    tiktok: s.tiktok ?? '',
  })
  const { value, setValue, dirty, markSaved } = useDirty(pickFields(settings))
  const { run, pending, status } = useAction()
  const set = (k: keyof typeof value) => (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, [k]: e.target.value })
  return (
    <EditorCard title="Booking form, contact details & social links">
      <Notice>These details appear in the top bar, the booking section and the footer. Every WhatsApp button opens a chat with the Zimbabwe number.</Notice>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="c-wa" title="WhatsApp number (Zimbabwe)">
          <input id="c-wa" className={field} value={value.whatsappZimbabwe} onChange={set('whatsappZimbabwe')} placeholder="+263 77 342 7153" />
        </Field>
        <Field id="c-tr" title="Phone / WhatsApp (Türkiye)">
          <input id="c-tr" className={field} value={value.phoneTurkiye} onChange={set('phoneTurkiye')} placeholder="+90 534 236 73 46" />
        </Field>
        <Field id="c-email" title="Email">
          <input id="c-email" type="email" className={field} value={value.email} onChange={set('email')} />
        </Field>
        <Field id="c-address" title="Office address">
          <input id="c-address" className={field} value={value.address} onChange={set('address')} />
        </Field>
        <Field id="c-ig" title="Instagram link">
          <input id="c-ig" className={field} value={value.instagram} onChange={set('instagram')} placeholder="https://www.instagram.com/…" />
        </Field>
        <Field id="c-tt" title="TikTok link">
          <input id="c-tt" className={field} value={value.tiktok} onChange={set('tiktok')} placeholder="https://www.tiktok.com/@…" />
        </Field>
      </div>
      <SaveBar dirty={dirty} pending={pending} status={status} onSave={() => run(() => saveSettings(value), 'Saved', markSaved)} />
    </EditorCard>
  )
}

/* ── Why Türkiye ────────────────────────────────────────── */

export function WhyTurkiyeEditor({ doc }: { doc: WhyTurkiyeDoc }) {
  const { value, setValue, dirty, markSaved } = useDirty(doc)
  const [lang, setLang] = useState<Locale>('en')
  const { run, pending, status } = useAction()
  const all = [value.eyebrow, value.heading, value.body, ...value.points.flatMap((p) => [p.title, p.text])]
  const dir = 'ltr'

  const setPoint = (i: number, key: 'title' | 'text', text: string) =>
    setValue({ ...value, points: value.points.map((p, j) => (j === i ? { ...p, [key]: setLocalized(p[key], lang, text) } : p)) })
  const movePoint = (i: number, d: -1 | 1) => {
    const points = [...value.points]
    ;[points[i], points[i + d]] = [points[i + d], points[i]]
    setValue({ ...value, points })
  }

  return (
    <>
      <EditorCard title="Why Türkiye section">
        <LangTabs lang={lang} onChange={setLang} values={all} />
        <LangNotice lang={lang} />
        <div dir={dir} className="flex flex-col gap-4">
          <Field id="w-eyebrow" title="Small heading">
            <input id="w-eyebrow" className={field} value={value.eyebrow[lang] ?? ''} placeholder={lang !== 'en' ? value.eyebrow.en : ''} onChange={(e) => setValue({ ...value, eyebrow: setLocalized(value.eyebrow, lang, e.target.value) })} />
          </Field>
          <Field id="w-heading" title="Section title">
            <input id="w-heading" className={field} value={value.heading[lang] ?? ''} placeholder={lang !== 'en' ? value.heading.en : ''} onChange={(e) => setValue({ ...value, heading: setLocalized(value.heading, lang, e.target.value) })} />
          </Field>
          <Field id="w-body" title="Paragraph">
            <textarea id="w-body" rows={5} className={textarea} value={value.body[lang] ?? ''} placeholder={lang !== 'en' ? value.body.en : ''} onChange={(e) => setValue({ ...value, body: setLocalized(value.body, lang, e.target.value) })} />
          </Field>

          <div className="flex flex-col gap-3 pt-2">
            <h3 className="text-base font-bold">Reasons ({value.points.length})</h3>
            {value.points.map((p, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-[14px] border border-line bg-[#fdfbf5] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Reason {i + 1}</span>
                  <div className="flex gap-1">
                    <button type="button" className={btnIcon} disabled={i === 0} onClick={() => movePoint(i, -1)} aria-label={`Move reason ${i + 1} up`}><Icon name="up" size={18} /></button>
                    <button type="button" className={btnIcon} disabled={i === value.points.length - 1} onClick={() => movePoint(i, 1)} aria-label={`Move reason ${i + 1} down`}><Icon name="down" size={18} /></button>
                    <button type="button" className={btnIcon} onClick={() => setValue({ ...value, points: value.points.filter((_, j) => j !== i) })} aria-label={`Remove reason ${i + 1}`}><Icon name="trash" size={18} /></button>
                  </div>
                </div>
                <Field id={`w-p${i}-t`} title="Title">
                  <input id={`w-p${i}-t`} className={field} value={p.title[lang] ?? ''} placeholder={lang !== 'en' ? p.title.en : ''} onChange={(e) => setPoint(i, 'title', e.target.value)} />
                </Field>
                <Field id={`w-p${i}-x`} title="Text">
                  <textarea id={`w-p${i}-x`} rows={2} className={textarea} value={p.text[lang] ?? ''} placeholder={lang !== 'en' ? p.text.en : ''} onChange={(e) => setPoint(i, 'text', e.target.value)} />
                </Field>
              </div>
            ))}
            {value.points.length < 6 && (
              <button type="button" className={`${btnSecondary} self-start`} onClick={() => setValue({ ...value, points: [...value.points, { title: {}, text: {} }] })}>
                <Icon name="plus" size={16} /> Add a reason
              </button>
            )}
          </div>
        </div>
        <SaveBar dirty={dirty} pending={pending} status={status} onSave={() => run(() => saveWhyTurkiye(value), 'Saved', markSaved)} />
      </EditorCard>
      <PreviewColumn label={lang.toUpperCase()}>
        <div className="flex flex-col gap-3 rounded-[18px] bg-forest p-[22px] shadow-[0_10px_28px_rgba(14,59,24,0.12)]">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">{pick(value.eyebrow, lang)}</span>
          <span className="font-display text-[26px] font-semibold leading-[1.12] text-white">{pick(value.heading, lang)}</span>
          <span className="text-[13px] leading-relaxed text-on-dark">{pick(value.body, lang)}</span>
          <ul className="mt-1 flex flex-col gap-2">
            {value.points.map((p, i) => (
              <li key={i} className="rounded-lg border border-gold/35 px-3 py-2 text-[12px] text-on-dark">
                <strong className="block text-white">{pick(p.title, lang)}</strong>
                {pick(p.text, lang)}
              </li>
            ))}
          </ul>
        </div>
      </PreviewColumn>
    </>
  )
}

/* ── About us ───────────────────────────────────────────── */

export function AboutEditor({ doc }: { doc: AboutDoc }) {
  const { value, setValue, dirty, markSaved } = useDirty(doc)
  const [lang, setLang] = useState<Locale>('en')
  const { run, pending, status } = useAction()
  const all = [value.eyebrow, value.heading, ...value.paragraphs]
  return (
    <>
      <EditorCard title="About us section">
        <LangTabs lang={lang} onChange={setLang} values={all} />
        <LangNotice lang={lang} />
        <Field id="a-eyebrow" title="Small heading">
          <input id="a-eyebrow" className={field} value={value.eyebrow[lang] ?? ''} placeholder={lang !== 'en' ? value.eyebrow.en : ''} onChange={(e) => setValue({ ...value, eyebrow: setLocalized(value.eyebrow, lang, e.target.value) })} />
        </Field>
        <Field id="a-heading" title="Section title">
          <input id="a-heading" className={field} value={value.heading[lang] ?? ''} placeholder={lang !== 'en' ? value.heading.en : ''} onChange={(e) => setValue({ ...value, heading: setLocalized(value.heading, lang, e.target.value) })} />
        </Field>
        {value.paragraphs.map((p, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={`a-p${i}`} className={label}>Paragraph {i + 1}</label>
              {value.paragraphs.length > 1 && (
                <button type="button" className={btnIcon} aria-label={`Remove paragraph ${i + 1}`} onClick={() => setValue({ ...value, paragraphs: value.paragraphs.filter((_, j) => j !== i) })}>
                  <Icon name="trash" size={18} />
                </button>
              )}
            </div>
            <textarea id={`a-p${i}`} rows={5} className={textarea} value={p[lang] ?? ''} placeholder={lang !== 'en' ? p.en : ''} onChange={(e) => setValue({ ...value, paragraphs: value.paragraphs.map((q, j) => (j === i ? setLocalized(q, lang, e.target.value) : q)) })} />
          </div>
        ))}
        {value.paragraphs.length < 6 && (
          <button type="button" className={`${btnSecondary} self-start`} onClick={() => setValue({ ...value, paragraphs: [...value.paragraphs, {}] })}>
            <Icon name="plus" size={16} /> Add a paragraph
          </button>
        )}
        <Notice>Team members are managed separately, under <strong>Team members</strong> in the menu.</Notice>
        <SaveBar dirty={dirty} pending={pending} status={status} onSave={() => run(() => saveAbout(value), 'Saved', markSaved)} />
      </EditorCard>
      <PreviewColumn label={lang.toUpperCase()}>
        <div className="flex flex-col gap-3 rounded-[18px] border border-line bg-cream p-[22px] shadow-[0_10px_28px_rgba(14,59,24,0.08)]">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-ink">{pick(value.eyebrow, lang)}</span>
          <span className="font-display text-[26px] font-semibold leading-[1.12] text-forest">{pick(value.heading, lang)}</span>
          {value.paragraphs.map((p, i) => (
            <span key={i} className="text-[13px] leading-relaxed text-body">{pick(p, lang)}</span>
          ))}
        </div>
      </PreviewColumn>
    </>
  )
}
