'use client'

import { useState, type ReactNode } from 'react'
import { deleteListItem, reorderList, saveListItem } from '@/lib/admin/actions'
import type { PartnerDoc, ServiceDoc, StoryDoc, TeamMemberDoc } from '@/lib/data/types'
import { pick, type Locale, type Localized } from '@/lib/i18n'
import { EditorCard } from './editors'
import { Icon } from './Icon'
import { ImageField } from './ImageField'
import { btnDanger, btnIcon, btnPrimary, btnSecondary, field, label, textarea } from './styles'
import { Badge, LangNotice, LangTabs, Notice, setLocalized, useAction } from './ui'

type ListType = 'service' | 'teamMember' | 'story' | 'partner'
type Item = { _id: string; order: number; [k: string]: unknown }
type Row<T> = { key: string; item: T; saved: string; isNew: boolean }

type Config<T extends Item> = {
  type: ListType
  title: string
  addLabel: string
  emptyText: string
  intro?: ReactNode
  blank: () => T
  summary: (item: T) => { title: string; subtitle?: string; image?: string | null; badge?: ReactNode }
  localized?: (item: T) => (Localized | undefined)[]
  form: (item: T, set: (next: T) => void, lang: Locale) => ReactNode
  canSwap?: (a: T, b: T) => boolean
}

function ListEditor<T extends Item>({ items, config }: { items: T[]; config: Config<T> }) {
  const [rows, setRows] = useState<Row<T>[]>(() => items.map((item) => ({ key: item._id, item, saved: JSON.stringify(item), isNew: false })))
  const [open, setOpen] = useState<string | null>(null)
  const [counter, setCounter] = useState(0)
  const order = useAction()

  function add() {
    const key = `new-${counter}`
    setCounter(counter + 1)
    const item = config.blank()
    setRows([...rows, { key, item, saved: '', isNew: true }])
    setOpen(key)
  }

  function move(index: number, d: -1 | 1) {
    const next = [...rows]
    ;[next[index], next[index + d]] = [next[index + d], next[index]]
    setRows(next)
    const ids = next.filter((r) => !r.isNew).map((r) => r.item._id)
    order.run(() => reorderList(config.type, ids), 'Order saved')
  }

  return (
    <EditorCard title={config.title} badge={<Badge tone="gray">{rows.filter((r) => !r.isNew).length} saved</Badge>}>
      {config.intro}
      {order.status && !order.status.ok && <Notice tone="error">{order.status.text}</Notice>}
      {rows.length === 0 && <p className="rounded-xl border border-dashed border-[#cfc3a0] p-6 text-center text-sm text-muted">{config.emptyText}</p>}
      <ul className="flex flex-col gap-3">
        {rows.map((row, i) => {
          const s = config.summary(row.item)
          const isOpen = open === row.key
          const prev = rows[i - 1]
          const next = rows[i + 1]
          const canUp = !!prev && !row.isNew && !prev.isNew && (config.canSwap?.(row.item, prev.item) ?? true)
          const canDown = !!next && !row.isNew && !next.isNew && (config.canSwap?.(row.item, next.item) ?? true)
          return (
            <li key={row.key} className={`rounded-[14px] border ${isOpen ? 'border-leaf' : 'border-line'} bg-white`}>
              <div className="flex items-center gap-3 p-3">
                {s.image !== undefined && (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#e9e1cb] text-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {s.image ? <img src={s.image} alt="" className="h-full w-full object-cover" /> : <Icon name="image" size={18} />}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{s.title || <span className="text-muted">New item</span>}</p>
                  {s.subtitle && <p className="truncate text-[13px] text-muted">{s.subtitle}</p>}
                </div>
                {s.badge}
                {row.isNew && <Badge tone="amber">Not saved</Badge>}
                <div className="flex gap-0.5">
                  <button type="button" className={btnIcon} disabled={!canUp || order.pending} onClick={() => move(i, -1)} aria-label={`Move ${s.title} up`}>
                    <Icon name="up" size={18} />
                  </button>
                  <button type="button" className={btnIcon} disabled={!canDown || order.pending} onClick={() => move(i, 1)} aria-label={`Move ${s.title} down`}>
                    <Icon name="down" size={18} />
                  </button>
                </div>
                <button type="button" className={btnSecondary} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : row.key)}>
                  {isOpen ? 'Close' : 'Edit'}
                </button>
              </div>
              {isOpen && (
                <ItemForm
                  row={row}
                  config={config}
                  onChange={(item) => setRows((all) => all.map((r) => (r.key === row.key ? { ...r, item } : r)))}
                  onSaved={(id) =>
                    setRows((all) => all.map((r) => (r.key === row.key ? { ...r, item: { ...r.item, _id: id }, saved: JSON.stringify({ ...r.item, _id: id }), isNew: false } : r)))
                  }
                  onDeleted={() => {
                    setRows((all) => all.filter((r) => r.key !== row.key))
                    setOpen(null)
                  }}
                />
              )}
            </li>
          )
        })}
      </ul>
      <button type="button" className={`${btnPrimary} self-start`} onClick={add}>
        <Icon name="plus" size={16} /> {config.addLabel}
      </button>
    </EditorCard>
  )
}

function ItemForm<T extends Item>({
  row,
  config,
  onChange,
  onSaved,
  onDeleted,
}: {
  row: Row<T>
  config: Config<T>
  onChange: (item: T) => void
  onSaved: (id: string) => void
  onDeleted: () => void
}) {
  const [lang, setLang] = useState<Locale>('en')
  const { run, pending, status } = useAction()
  const dirty = row.isNew || JSON.stringify(row.item) !== row.saved

  return (
    <div className="flex flex-col gap-4 border-t border-line p-4 sm:p-5">
      {config.localized && (
        <>
          <LangTabs lang={lang} onChange={setLang} values={config.localized(row.item)} />
          <LangNotice lang={lang} />
        </>
      )}
      {config.form(row.item, onChange, lang)}
      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
        <span className="mr-auto text-[13px]" aria-live="polite">
          {status && !status.ok && <span className="font-semibold text-[#8a2a19]">{status.text}</span>}
          {status?.ok && <span className="font-semibold text-leaf">✓ {status.text}</span>}
          {!status && dirty && <span className="text-muted">Unsaved changes</span>}
        </span>
        <button
          type="button"
          className={btnDanger}
          disabled={pending}
          onClick={async () => {
            if (row.isNew) return onDeleted()
            if (!window.confirm(`Delete “${config.summary(row.item).title}”? This can’t be undone.`)) return
            const r = await run(() => deleteListItem(config.type, row.item._id), 'Deleted')
            if (r?.ok) onDeleted()
          }}
        >
          <Icon name="trash" size={16} /> {row.isNew ? 'Discard' : 'Delete'}
        </button>
        <button
          type="button"
          className={btnPrimary}
          disabled={!dirty || pending}
          onClick={() =>
            run(
              () => saveListItem(config.type, { ...row.item, _id: row.isNew ? '' : row.item._id, order: row.isNew ? Date.now() % 1e9 : row.item.order }),
              'Saved',
              (r) => r.id && onSaved(r.id),
            )
          }
        >
          {pending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}

/* ── Field helpers ──────────────────────────────────────── */

function F({ id, title, hint, children }: { id: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={label}>
        {title} {hint && <span className="font-normal text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

function LocalInput({ id, value, lang, onChange, multiline }: { id: string; value: Localized | undefined; lang: Locale; onChange: (v: Localized) => void; multiline?: boolean }) {
  const props = {
    id,
    value: value?.[lang] ?? '',
    placeholder: lang !== 'en' ? value?.en ?? '' : '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(setLocalized(value, lang, e.target.value)),
  }
  return multiline ? <textarea rows={3} className={textarea} {...props} /> : <input className={field} {...props} />
}

/* ── The four lists ─────────────────────────────────────── */

const stageNames = { 1: 'Before you leave', 2: 'When you arrive', 3: 'Settling in & beyond' } as const

export function ServicesEditor({ items }: { items: ServiceDoc[] }) {
  return (
    <ListEditor<ServiceDoc & Item>
      items={items as (ServiceDoc & Item)[]}
      config={{
        type: 'service',
        title: 'Services',
        addLabel: 'Add a service',
        emptyText: 'No services yet.',
        intro: <Notice>Services are shown in three stages and numbered automatically. Use the arrows to change the order within a stage.</Notice>,
        blank: () => ({ _id: '', _type: 'service', order: 0, stage: 1, title: {}, description: {} }) as ServiceDoc & Item,
        summary: (s) => ({ title: s.title.en ?? '', subtitle: s.description.en, badge: <Badge tone={s.stage === 2 ? 'blue' : 'gray'}>Stage {s.stage}</Badge> }),
        localized: (s) => [s.title, s.description],
        canSwap: (a, b) => a.stage === b.stage,
        form: (s, set, lang) => (
          <>
            <F id={`s-stage-${s._id}`} title="Stage">
              <select id={`s-stage-${s._id}`} className={field} value={s.stage} onChange={(e) => set({ ...s, stage: Number(e.target.value) as 1 | 2 | 3 })}>
                {([1, 2, 3] as const).map((n) => (
                  <option key={n} value={n}>
                    {n} · {stageNames[n]}
                  </option>
                ))}
              </select>
            </F>
            <F id={`s-title-${s._id}`} title="Service name">
              <LocalInput id={`s-title-${s._id}`} value={s.title} lang={lang} onChange={(title) => set({ ...s, title })} />
            </F>
            <F id={`s-desc-${s._id}`} title="Short description">
              <LocalInput id={`s-desc-${s._id}`} value={s.description} lang={lang} onChange={(description) => set({ ...s, description })} multiline />
            </F>
          </>
        ),
      }}
    />
  )
}

export function TeamEditor({ items }: { items: TeamMemberDoc[] }) {
  return (
    <ListEditor<TeamMemberDoc & Item>
      items={items as (TeamMemberDoc & Item)[]}
      config={{
        type: 'teamMember',
        title: 'Team members',
        addLabel: 'Add a team member',
        emptyText: 'No team members yet. The team block stays hidden on the website until you add someone.',
        intro: <Notice>Team members appear in the “About us” section. A square photo works best.</Notice>,
        blank: () => ({ _id: '', _type: 'teamMember', order: 0, name: '', role: {}, office: 'Zimbabwe', photo: null }) as TeamMemberDoc & Item,
        summary: (m) => ({ title: m.name, subtitle: [pick(m.role, 'en'), m.office].filter(Boolean).join(' · '), image: m.photo?.url ?? null }),
        localized: (m) => [m.role],
        form: (m, set, lang) => (
          <>
            <ImageField value={m.photo} onChange={(photo) => set({ ...m, photo })} shape="square" withFocus />
            <div className="grid gap-4 sm:grid-cols-2">
              <F id={`t-name-${m._id}`} title="Full name">
                <input id={`t-name-${m._id}`} className={field} value={m.name} onChange={(e) => set({ ...m, name: e.target.value })} />
              </F>
              <F id={`t-office-${m._id}`} title="Based in">
                <select id={`t-office-${m._id}`} className={field} value={m.office} onChange={(e) => set({ ...m, office: e.target.value as TeamMemberDoc['office'] })}>
                  <option>Zimbabwe</option>
                  <option>Türkiye</option>
                </select>
              </F>
            </div>
            <F id={`t-role-${m._id}`} title="Role" hint={`(${lang.toUpperCase()})`}>
              <LocalInput id={`t-role-${m._id}`} value={m.role} lang={lang} onChange={(role) => set({ ...m, role })} />
            </F>
          </>
        ),
      }}
    />
  )
}

export function StoriesEditor({ items }: { items: StoryDoc[] }) {
  return (
    <ListEditor<StoryDoc & Item>
      items={items as (StoryDoc & Item)[]}
      config={{
        type: 'story',
        title: 'Student stories',
        addLabel: 'Add a student story',
        emptyText: 'No stories yet. The section stays hidden on the website until you add one.',
        intro: <Notice>Use the student’s own words, and ask their permission before publishing their name and photo.</Notice>,
        blank: () => ({ _id: '', _type: 'story', order: 0, studentName: '', programme: '', university: '', city: '', quote: {}, photo: null }) as StoryDoc & Item,
        summary: (s) => ({ title: s.studentName, subtitle: [s.programme, s.university].filter(Boolean).join(' · '), image: s.photo?.url ?? null }),
        localized: (s) => [s.quote],
        form: (s, set, lang) => (
          <>
            <ImageField value={s.photo} onChange={(photo) => set({ ...s, photo })} shape="wide" withFocus />
            <div className="grid gap-4 sm:grid-cols-2">
              <F id={`st-name-${s._id}`} title="Student name">
                <input id={`st-name-${s._id}`} className={field} value={s.studentName} onChange={(e) => set({ ...s, studentName: e.target.value })} />
              </F>
              <F id={`st-prog-${s._id}`} title="Programme">
                <input id={`st-prog-${s._id}`} className={field} value={s.programme ?? ''} onChange={(e) => set({ ...s, programme: e.target.value })} placeholder="e.g. Medicine" />
              </F>
              <F id={`st-uni-${s._id}`} title="University">
                <input id={`st-uni-${s._id}`} className={field} value={s.university ?? ''} onChange={(e) => set({ ...s, university: e.target.value })} />
              </F>
              <F id={`st-city-${s._id}`} title="City">
                <input id={`st-city-${s._id}`} className={field} value={s.city ?? ''} onChange={(e) => set({ ...s, city: e.target.value })} placeholder="e.g. Istanbul" />
              </F>
            </div>
            <F id={`st-quote-${s._id}`} title="Quote" hint={`(${lang.toUpperCase()})`}>
              <LocalInput id={`st-quote-${s._id}`} value={s.quote} lang={lang} onChange={(quote) => set({ ...s, quote })} multiline />
            </F>
          </>
        ),
      }}
    />
  )
}

export function PartnersEditor({ items }: { items: PartnerDoc[] }) {
  return (
    <ListEditor<PartnerDoc & Item>
      items={items as (PartnerDoc & Item)[]}
      config={{
        type: 'partner',
        title: 'Partner universities',
        addLabel: 'Add a university',
        emptyText: 'No partner universities yet. The logo strip stays hidden on the website until you add one with a logo.',
        intro: <Notice>Logos show in a strip under the hero. A PNG with a transparent background looks best.</Notice>,
        blank: () => ({ _id: '', _type: 'partner', order: 0, name: '', website: '', logo: null }) as PartnerDoc & Item,
        summary: (p) => ({
          title: p.name,
          subtitle: p.website,
          image: p.logo?.url ?? null,
          badge: p.logo ? undefined : <Badge tone="amber">No logo · hidden</Badge>,
        }),
        form: (p, set) => (
          <>
            <ImageField value={p.logo} onChange={(logo) => set({ ...p, logo })} shape="logo" />
            <div className="grid gap-4 sm:grid-cols-2">
              <F id={`p-name-${p._id}`} title="University name">
                <input id={`p-name-${p._id}`} className={field} value={p.name} onChange={(e) => set({ ...p, name: e.target.value })} />
              </F>
              <F id={`p-web-${p._id}`} title="Website" hint="(optional)">
                <input id={`p-web-${p._id}`} className={field} value={p.website ?? ''} onChange={(e) => set({ ...p, website: e.target.value })} placeholder="https://" />
              </F>
            </div>
          </>
        ),
      }}
    />
  )
}
