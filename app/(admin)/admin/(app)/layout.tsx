import { Suspense } from 'react'
import { Sidebar } from '@/components/admin/Sidebar'
import { requireUser } from '@/lib/auth'
import { ensureSeeded } from '@/lib/data/content'
import { getStore } from '@/lib/data/store'

export const dynamic = 'force-dynamic'

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()
  await ensureSeeded()
  const newEnquiries = (await getStore().list('enquiry')).filter((e) => e.status === 'new').length

  return (
    <div className="flex min-h-screen flex-wrap font-sans text-ink">
      <Suspense fallback={<aside className="w-[260px] bg-forest" />}>
        <Sidebar user={user} newEnquiries={newEnquiries} />
      </Suspense>
      <main className="flex min-w-0 flex-[999_1_560px] flex-col">{children}</main>
    </div>
  )
}
