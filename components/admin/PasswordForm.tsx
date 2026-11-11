'use client'

import { useActionState } from 'react'
import { changePassword } from '@/lib/admin/actions'
import { MIN_PASSWORD_LENGTH } from './constants'
import { btnPrimary, field, label } from './styles'
import { Notice } from './ui'

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined)
  return (
    <form action={action} className="flex min-w-[280px] max-w-[460px] flex-[2_1_380px] flex-col gap-4 rounded-[18px] border border-line bg-white p-6">
      <h2 className="text-xl font-bold">Change password</h2>
      {state && (state.ok ? <Notice tone="success">{state.message}</Notice> : <Notice tone="error">{state.error}</Notice>)}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pw-current" className={label}>Current password</label>
        <input id="pw-current" name="current" type="password" autoComplete="current-password" required className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pw-next" className={label}>
          New password <span className="font-normal text-muted">(at least {MIN_PASSWORD_LENGTH} characters)</span>
        </label>
        <input id="pw-next" name="next" type="password" autoComplete="new-password" minLength={MIN_PASSWORD_LENGTH} required className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pw-confirm" className={label}>Repeat new password</label>
        <input id="pw-confirm" name="confirm" type="password" autoComplete="new-password" required className={field} />
      </div>
      <button type="submit" className={`${btnPrimary} self-start`} disabled={pending}>
        {pending ? 'Saving…' : 'Change password'}
      </button>
    </form>
  )
}
