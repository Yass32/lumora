import { PasswordForm } from '@/components/admin/PasswordForm'
import { PageHeader } from '@/components/admin/ui'
import { requireUser } from '@/lib/auth'

export const metadata = { title: 'My account' }

export default async function AccountPage() {
  const me = await requireUser()
  return (
    <>
      <PageHeader crumbs={['Settings', 'My account']} title="My account" />
      <div className="flex flex-wrap gap-6 px-5 py-7 sm:px-8">
        <section className="flex min-w-[280px] flex-[1_1_300px] flex-col gap-2 self-start rounded-[18px] border border-line bg-white p-6">
          <h2 className="text-xl font-bold">{me.name}</h2>
          <p className="text-sm text-muted">{me.email}</p>
          <p className="text-sm text-muted">{me.role === 'admin' ? 'Admin' : 'Editor'}</p>
        </section>
        <PasswordForm />
      </div>
    </>
  )
}
