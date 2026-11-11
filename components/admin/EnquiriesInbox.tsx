'use client'

import { useMemo, useState } from 'react'
import { deleteEnquiry, updateEnquiry } from '@/lib/admin/actions'
import type { EnquiryDoc, EnquiryStatus } from '@/lib/data/types'
import { localeNames, isLocale } from '@/lib/i18n'
import { Icon } from './Icon'
import { btnDanger, btnPrimary, field, label, textarea } from './styles'
import { Badge, useAction } from './ui'

export const statusInfo: Record<EnquiryStatus, { label: string; tone: 'amber' | 'blue' | 'purple' | 'green' | 'gray' }> = {
  new: { label: 'New', tone: 'amber' },
  contacted: { label: 'Contacted', tone: 'blue' },
  applying: { label: 'Applying', tone: 'purple' },
  enrolled: { label: 'Enrolled', tone: 'green' },
  closed: { label: 'Not proceeding', tone: 'gray' },
}
const statuses = Object.keys(statusInfo) as EnquiryStatus[]

const greeting: Record<string, (name: string) => string> = {
  en: (n) => `Hi ${n}, this is Lumora Global Education. Thank you for your enquiry about studying in Türkiye.`,
  sn: (n) => `Mhoro ${n}, ndiLumora Global Education. Tatenda nechikumbiro chako chekudzidza kuTürkiye.`,
  tr: (n) => `Merhaba ${n}, ben Lumora Global Education'dan yazıyorum. Türkiye'de eğitim talebiniz için teşekkür ederiz.`,
  fr: (n) => `Bonjour ${n}, ici Lumora Global Education. Merci pour votre demande concernant des études en Turquie.`,
}

function when(iso: string) {
  const d = new Date(iso)
  const days = Math.floor((Date.now() - d.getTime()) / 86400000)
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  if (days < 1 && new Date().getDate() === d.getDate()) return `Today, ${time}`
  if (days < 2) return `Yesterday, ${time}`
  if (days < 7) return `${days} days ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function EnquiriesInbox({ initial, canDelete }: { initial: EnquiryDoc[]; canDelete: boolean }) {
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState<EnquiryStatus | 'all'>('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(initial[0]?._id ?? null)

  const counts = useMemo(() => Object.fromEntries(statuses.map((s) => [s, items.filter((i) => i.status === s).length])) as Record<EnquiryStatus, number>, [items])
  const visible = items.filter((i) => {
    if (filter !== 'all' && i.status !== filter) return false
    const q = query.trim().toLowerCase()
    return !q || [i.name, i.phone, i.email, i.programme].some((v) => v?.toLowerCase().includes(q))
  })
  const selected = items.find((i) => i._id === selectedId) ?? null

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 pt-7 sm:px-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(['new', 'contacted', 'applying', 'enrolled'] as const).map((s) => (
          <div key={s} className="flex flex-col gap-1 rounded-2xl border border-line bg-white px-5 py-4">
            <span className="text-[13px] text-muted">{statusInfo[s].label}</span>
            <span className="font-display text-[34px] font-bold leading-none text-forest">{counts[s]}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div className="min-w-0 flex-[999_1_560px] overflow-hidden rounded-[18px] border border-line bg-white">
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3.5">
            {(['all', ...statuses] as const).map((s) => {
              const active = filter === s
              const n = s === 'all' ? items.length : counts[s]
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(s)}
                  className={`min-h-9 rounded-full px-3.5 text-[13px] font-semibold ${active ? 'bg-leaf text-white' : 'border border-line bg-white hover:bg-cream'}`}
                >
                  {s === 'all' ? 'All' : statusInfo[s].label} · {n}
                </button>
              )
            })}
            <label className="relative ml-auto flex items-center">
              <span className="sr-only">Search enquiries</span>
              <Icon name="search" size={16} className="pointer-events-none absolute left-3 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, phone, programme"
                className="min-h-10 w-[240px] max-w-full rounded-full border border-[#cfc3a0] bg-[#fdfbf5] pl-9 pr-3 text-sm focus:border-leaf focus:outline-none"
              />
            </label>
          </div>

          {visible.length === 0 ? (
            <p className="p-10 text-center text-sm text-muted">
              {items.length === 0 ? 'No enquiries yet. Requests from the website’s booking form will appear here.' : 'Nothing matches this filter.'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="text-left text-xs tracking-[0.06em] text-muted">
                    <th scope="col" className="px-4 py-3 font-bold">STUDENT</th>
                    <th scope="col" className="px-4 py-3 font-bold">PROGRAMME</th>
                    <th scope="col" className="px-4 py-3 font-bold">LEVEL</th>
                    <th scope="col" className="px-4 py-3 font-bold">INTAKE</th>
                    <th scope="col" className="px-4 py-3 font-bold">RECEIVED</th>
                    <th scope="col" className="px-4 py-3 font-bold">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((e) => {
                    const sel = e._id === selectedId
                    return (
                      <tr
                        key={e._id}
                        onClick={() => setSelectedId(e._id)}
                        className={`cursor-pointer border-t border-[#efe7cf] ${sel ? 'bg-[#f1f7ef]' : e.status === 'new' ? 'bg-[#fffdf6] hover:bg-[#faf6ec]' : 'hover:bg-[#faf6ec]'}`}
                      >
                        <td className="px-4 py-3.5">
                          <button type="button" onClick={() => setSelectedId(e._id)} className="text-left" aria-label={`Open enquiry from ${e.name}`}>
                            <span className={`block ${e.status === 'new' ? 'font-bold' : 'font-semibold'}`}>{e.name}</span>
                            <span className="text-[13px] text-muted">{e.phone}</span>
                          </button>
                        </td>
                        <td className="px-4 py-3.5">{e.programme || '—'}</td>
                        <td className="px-4 py-3.5">{e.level || '—'}</td>
                        <td className="px-4 py-3.5">{e.intake || '—'}</td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-muted">{when(e.submittedAt)}</td>
                        <td className="px-4 py-3.5">
                          <Badge tone={statusInfo[e.status].tone}>{statusInfo[e.status].label}</Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selected && (
          <Detail
            key={selected._id}
            enquiry={selected}
            canDelete={canDelete}
            onUpdate={(next) => setItems((all) => all.map((i) => (i._id === next._id ? next : i)))}
            onDelete={() => {
              setItems((all) => all.filter((i) => i._id !== selected._id))
              setSelectedId(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

function Detail({ enquiry, canDelete, onUpdate, onDelete }: { enquiry: EnquiryDoc; canDelete: boolean; onUpdate: (e: EnquiryDoc) => void; onDelete: () => void }) {
  const [status, setStatus] = useState(enquiry.status)
  const [notes, setNotes] = useState(enquiry.notes ?? '')
  const save = useAction()
  const dirty = status !== enquiry.status || notes !== (enquiry.notes ?? '')
  const phone = enquiry.phone.replace(/[^\d]/g, '').replace(/^0/, '263')
  const lang = isLocale(enquiry.language) ? enquiry.language : 'en'
  const firstName = enquiry.name.split(' ')[0]
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(greeting[lang](firstName))}`

  const row = (k: string, v?: string) => (
    <div>
      <div className="text-xs text-muted">{k}</div>
      <div className="font-semibold [overflow-wrap:anywhere]">{v || '—'}</div>
    </div>
  )

  return (
    <aside aria-label={`Enquiry from ${enquiry.name}`} className="flex min-w-[290px] max-w-[400px] flex-[1_1_320px] flex-col gap-[18px] rounded-[18px] border border-line bg-white p-6 lg:sticky lg:top-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e3f0e1] text-lg font-bold text-leaf">{enquiry.name.charAt(0).toUpperCase()}</span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-lg font-bold">{enquiry.name}</span>
          <span className="text-[13px] text-muted">Received {when(enquiry.submittedAt)} · via website form</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 text-sm">
        {row('WhatsApp', enquiry.phone)}
        {row('Email', enquiry.email)}
        {row('Programme', enquiry.programme)}
        {row('Intake', enquiry.intake)}
        {row('Website language', localeNames[lang].native)}
        {row('Level', enquiry.level)}
      </div>

      {enquiry.message && <p className="whitespace-pre-wrap rounded-xl border border-[#efe7cf] bg-[#fdfbf5] p-3.5 text-sm leading-relaxed text-body">{enquiry.message}</p>}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="enq-status" className={label}>Status</label>
        <select id="enq-status" className={field} value={status} onChange={(e) => setStatus(e.target.value as EnquiryStatus)}>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {statusInfo[s].label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="enq-notes" className={label}>
          Internal notes <span className="font-normal text-muted">(only staff see this)</span>
        </label>
        <textarea id="enq-notes" rows={3} className={textarea} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="mr-auto text-[13px]" aria-live="polite">
          {save.status && !save.status.ok && <span className="font-semibold text-[#8a2a19]">{save.status.text}</span>}
          {save.status?.ok && <span className="font-semibold text-leaf">✓ {save.status.text}</span>}
        </span>
        <button
          type="button"
          className={btnPrimary}
          disabled={!dirty || save.pending}
          onClick={() => save.run(() => updateEnquiry(enquiry._id, { status, notes }), 'Saved', () => onUpdate({ ...enquiry, status, notes }))}
        >
          {save.pending ? 'Saving…' : 'Save'}
        </button>
      </div>

      <a href={wa} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-leaf text-[15px] font-bold text-white no-underline hover:bg-forest">
        <Icon name="whatsapp" size={18} /> Reply on WhatsApp
      </a>
      {enquiry.email && (
        <a href={`mailto:${enquiry.email}?subject=${encodeURIComponent('Your enquiry with Lumora Global Education')}`} className="text-center text-sm font-semibold text-leaf">
          Reply by email
        </a>
      )}

      {canDelete && (
        <button
          type="button"
          className={`${btnDanger} self-start`}
          onClick={async () => {
            if (!window.confirm(`Delete the enquiry from ${enquiry.name}? This can’t be undone.`)) return
            const r = await save.run(() => deleteEnquiry(enquiry._id), 'Deleted')
            if (r?.ok) onDelete()
          }}
        >
          <Icon name="trash" size={16} /> Delete enquiry
        </button>
      )}
    </aside>
  )
}
