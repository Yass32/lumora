import { StaffManager } from '@/components/admin/StaffManager'
import { Notice, PageHeader } from '@/components/admin/ui'
import { requireUser } from '@/lib/auth'
import { getStore } from '@/lib/data/store'

export const metadata = { title: 'Staff accounts' }

export default async function StaffPage() {
  const me = await requireUser()
  if (me.role !== 'admin') {
    return (
      <>
        <PageHeader crumbs={['Settings', 'Staff accounts']} title="Staff accounts" />
        <div className="max-w-xl px-8 py-8">
          <Notice tone="warn">Only admins can manage staff accounts.</Notice>
        </div>
      </>
    )
  }
  const staff = (await getStore().list('staffUser'))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(({ _id, name, email, role, createdAt }) => ({ _id, name, email, role, createdAt }))
  return (
    <>
      <PageHeader crumbs={['Settings', 'Staff accounts']} title="Staff accounts" />
      <StaffManager initial={staff} meId={me._id} />
    </>
  )
}
