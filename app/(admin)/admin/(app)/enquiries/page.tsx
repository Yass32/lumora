import { EnquiriesInbox } from '@/components/admin/EnquiriesInbox'
import { Icon } from '@/components/admin/Icon'
import { PageHeader } from '@/components/admin/ui'
import { requireUser } from '@/lib/auth'
import { getStore } from '@/lib/data/store'

export const metadata = { title: 'Enquiries' }

export default async function EnquiriesPage() {
  const user = await requireUser()
  const enquiries = (await getStore().list('enquiry')).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
  return (
    <>
      <PageHeader crumbs={['Students', 'Enquiries']} title="Consultation requests">
        <a
          href="/admin/enquiries/export"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cfc3a0] bg-white px-[18px] text-sm font-semibold text-ink no-underline hover:bg-cream"
        >
          <Icon name="download" size={16} /> Export to Excel (CSV)
        </a>
      </PageHeader>
      <EnquiriesInbox initial={enquiries} canDelete={user.role === 'admin'} />
    </>
  )
}
