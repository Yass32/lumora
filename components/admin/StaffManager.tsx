'use client'

import { useState } from 'react'
import { createStaff, deleteStaff, resetStaffPassword } from '@/lib/admin/actions'
import { Icon } from './Icon'
import { btnDanger, btnPrimary, btnSecondary, field, label } from './styles'
import { Badge, Notice, useAction } from './ui'

type Staff = { _id: string; name: string; email: string; role: 'admin' | 'editor'; createdAt: string }

export function StaffManager({ initial, meId }: { initial: Staff[]; meId: string }) {
  const [staff, setStaff] = useState(initial)
  const [form, setForm] = useState({ name: '', email: '', role: 'editor' })
  const [secret, setSecret] = useState<{ who: string; password: string } | null>(null)
  const action = useAction()

  return (
    <div className="flex flex-wrap items-start gap-6 px-5 pb-10 pt-7 sm:px-8">
      <section className="flex min-w-0 flex-[999_1_520px] flex-col gap-4 rounded-[18px] border border-line bg-white p-6">
        <h2 className="text-xl font-bold">Team accounts ({staff.length})</h2>
        {secret && (
          <Notice tone="success">
            Temporary password for <strong>{secret.who}</strong>: <code className="rounded bg-white px-1.5 py-0.5 text-[15px] font-bold">{secret.password}</code>
            <br />
            Copy it now and send it to them privately. It won’t be shown again. They can change it under <strong>My account</strong>.
          </Notice>
        )}
        {action.status && !action.status.ok && <Notice tone="error">{action.status.text}</Notice>}
        <ul className="flex flex-col divide-y divide-line">
          {staff.map((s) => (
            <li key={s._id} className="flex flex-wrap items-center gap-3 py-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-forest">{s.name.charAt(0).toUpperCase()}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {s.name} {s._id === meId && <span className="font-normal text-muted">(you)</span>}
                </p>
                <p className="truncate text-[13px] text-muted">{s.email}</p>
              </div>
              <Badge tone={s.role === 'admin' ? 'green' : 'gray'}>{s.role === 'admin' ? 'Admin' : 'Editor'}</Badge>
              {s._id !== meId && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={btnSecondary}
                    disabled={action.pending}
                    onClick={async () => {
                      if (!window.confirm(`Reset ${s.name}'s password? Their old password will stop working.`)) return
                      const r = await action.run(() => resetStaffPassword(s._id), 'Password reset')
                      if (r?.ok && 'password' in r && r.password) setSecret({ who: s.name, password: r.password })
                    }}
                  >
                    Reset password
                  </button>
                  <button
                    type="button"
                    className={btnDanger}
                    disabled={action.pending}
                    aria-label={`Remove ${s.name}`}
                    onClick={async () => {
                      if (!window.confirm(`Remove ${s.name}? They won’t be able to sign in any more.`)) return
                      const r = await action.run(() => deleteStaff(s._id), 'Removed')
                      if (r?.ok) setStaff((all) => all.filter((x) => x._id !== s._id))
                    }}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <form
        className="flex min-w-[280px] flex-[1_1_320px] flex-col gap-4 rounded-[18px] border border-line bg-white p-6"
        onSubmit={async (e) => {
          e.preventDefault()
          const r = await action.run(() => createStaff(form), 'Account created')
          if (r?.ok && 'password' in r && r.password) {
            setSecret({ who: form.name, password: r.password })
            setStaff((all) => [...all, { _id: crypto.randomUUID(), name: form.name, email: form.email.toLowerCase(), role: form.role as Staff['role'], createdAt: new Date().toISOString() }])
            setForm({ name: '', email: '', role: 'editor' })
          }
        }}
      >
        <h2 className="text-xl font-bold">Add a team member</h2>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="n-name" className={label}>Name</label>
          <input id="n-name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="n-email" className={label}>Email</label>
          <input id="n-email" type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="n-role" className={label}>Access</label>
          <select id="n-role" className={field} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="editor">Editor: edits the website and handles enquiries</option>
            <option value="admin">Admin: also manages staff accounts and deletes enquiries</option>
          </select>
        </div>
        <button type="submit" className={btnPrimary} disabled={action.pending}>
          {action.pending ? 'Creating…' : 'Create account'}
        </button>
        <p className="text-xs leading-relaxed text-muted">A temporary password is created. Send it to them privately, for example on WhatsApp.</p>
      </form>
    </div>
  )
}
