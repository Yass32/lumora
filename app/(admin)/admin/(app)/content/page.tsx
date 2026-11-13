import { ContentStudio } from '@/components/admin/ContentStudio'
import { sectionNames, type StudioSection } from '@/components/admin/sections'
import { PageHeader } from '@/components/admin/ui'
import { requireUser } from '@/lib/auth'
import { normalizeSections } from '@/content/defaults'
import { defaultAboutDoc, defaultSettingsDoc, defaultWhyTurkiyeDoc } from '@/lib/data/content'
import { getStore } from '@/lib/data/store'

export const metadata = { title: 'Edit homepage' }

const byOrder = <T extends { order?: number }>(a: T, b: T) => (a.order ?? 0) - (b.order ?? 0)

export default async function ContentPage({ searchParams }: PageProps<'/admin/content'>) {
  await requireUser()
  const params = await searchParams
  const requested = typeof params.section === 'string' ? params.section : 'hero'
  const section = (requested in sectionNames ? requested : 'hero') as StudioSection

  const store = getStore()
  const [settings, homepage, whyTurkiye, about, services, destinations, team, stories, partners] = await Promise.all([
    store.get('siteSettings', 'siteSettings'),
    store.get('homepage', 'homepage'),
    store.get('whyTurkiye', 'whyTurkiye'),
    store.get('about', 'about'),
    store.list('service'),
    store.list('destination'),
    store.list('teamMember'),
    store.list('story'),
    store.list('partner'),
  ])

  return (
    <>
      <PageHeader crumbs={['Website', 'Homepage', sectionNames[section]]} title="Edit homepage">
        <a href="/en" target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full border border-[#cfc3a0] bg-white px-[18px] text-sm font-semibold text-ink no-underline hover:bg-cream">
          Preview website
        </a>
      </PageHeader>
      <ContentStudio
        section={section}
        data={{
          settings: settings ?? defaultSettingsDoc(),
          // Adds sections the site gained after the order was last saved (e.g. Destinations).
          homepage: { _id: 'homepage', _type: 'homepage', sections: normalizeSections(homepage?.sections) },
          whyTurkiye: whyTurkiye ?? defaultWhyTurkiyeDoc(),
          about: about ?? defaultAboutDoc(),
          services: services.sort((a, b) => a.stage - b.stage || byOrder(a, b)),
          destinations: destinations.sort(byOrder),
          team: team.sort(byOrder),
          stories: stories.sort(byOrder),
          partners: partners.sort(byOrder),
        }}
      />
    </>
  )
}
