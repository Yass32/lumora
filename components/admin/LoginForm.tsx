'use client'

import { useActionState, useState } from 'react'
import { login } from '@/lib/admin/actions'
import { field, label } from './styles'

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  const [forgot, setForgot] = useState(false)
  return (
    <form action={action} className="flex w-full max-w-[420px] flex-col gap-5 rounded-3xl border border-line bg-white p-8 sm:p-10">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold-ink">Staff only</span>
        <h2 className="font-display text-4xl font-semibold text-forest">Sign in</h2>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state?.email} key={state?.email} className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="password" className={label}>Password</label>
          <button type="button" onClick={() => setForgot((v) => !v)} className="text-[13px] font-semibold text-leaf hover:underline">
            Forgot password?
          </button>
        </div>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={field} />
      </div>
      {forgot && (
        <p className="rounded-xl bg-[#f4f8f2] px-4 py-3 text-sm leading-relaxed text-[#24402a]">
          Ask a Lumora admin to reset it under <strong>Staff accounts</strong>. They’ll give you a temporary password.
        </p>
      )}
      {state?.error && (
        <p role="alert" className="rounded-xl bg-[#f7e3df] px-4 py-3 text-sm font-semibold text-[#8a2a19]">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="min-h-[52px] rounded-full bg-leaf text-base font-bold text-white hover:bg-forest disabled:opacity-70">
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-center text-[13px] leading-relaxed text-muted">Only invited team members can sign in.</p>
    </form>
  )
}
