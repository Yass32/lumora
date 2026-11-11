import 'server-only'
import { client, type SanityImage } from '@/sanity/client'
import { siteDefaults, type SiteSettings } from '@/content/site'
import {
  defaultAbout,
  defaultServices,
  defaultWhyTurkiye,
  sectionKeys,
  type AboutContent,
  type SectionKey,
  type ServiceItem,
  type WhyTurkiyeContent,
} from '@/content/defaults'
import type { Localized } from '@/lib/i18n'

export type TeamMember = { _id: string; name: string; role?: Localized; office?: string; photo?: SanityImage }
export type Story = {
  _id: string
  studentName: string
  programme?: string
  university?: string
  city?: string
  quote?: Localized
  photo?: SanityImage
}
export type Partner = { _id: string; name: string; logo?: SanityImage; website?: string }

export type HomeContent = {
  settings: SiteSettings
  heroImage: SanityImage
  sections: SectionKey[]
  services: ServiceItem[]
  whyTurkiye: WhyTurkiyeContent
  about: AboutContent
  team: TeamMember[]
  stories: Story[]
  partners: Partner[]
}

const query = /* groq */ `{
  "settings": *[_id == "siteSettings"][0],
  "homepage": *[_id == "homepage"][0]{ sections[]{ key, visible } },
  "whyTurkiye": *[_id == "whyTurkiye"][0],
  "about": *[_id == "about"][0],
  "services": *[_type == "service"] | order(stage asc, order asc){ stage, title, description },
  "team": *[_type == "teamMember"] | order(order asc){ _id, name, role, office, photo },
  "stories": *[_type == "story"] | order(order asc){ _id, studentName, programme, university, city, quote, photo },
  "partners": *[_type == "partner" && defined(logo)] | order(order asc){ _id, name, logo, website }
}`

type RawResult = {
  settings?: Partial<SiteSettings> & { heroImage?: SanityImage }
  homepage?: { sections?: { key: SectionKey; visible?: boolean }[] }
  whyTurkiye?: Partial<WhyTurkiyeContent>
  about?: Partial<AboutContent>
  services?: ServiceItem[]
  team?: TeamMember[]
  stories?: Story[]
  partners?: Partner[]
}

/** Keep the defaults for any setting the CMS leaves empty. */
function mergeSettings(cms: RawResult['settings']): SiteSettings {
  const out = { ...siteDefaults }
  if (!cms) return out
  for (const key of Object.keys(siteDefaults) as (keyof SiteSettings)[]) {
    const value = cms[key]
    if (typeof value === 'string' && value.trim()) out[key] = value.trim()
  }
  return out
}

function resolveSections(raw: RawResult['homepage']): SectionKey[] {
  const list = raw?.sections?.filter((s) => s?.key && (sectionKeys as readonly string[]).includes(s.key))
  if (!list?.length) return [...sectionKeys]
  return list.filter((s) => s.visible !== false).map((s) => s.key)
}

export async function getHomeContent(): Promise<HomeContent> {
  let raw: RawResult = {}
  if (client) {
    try {
      raw = await client.fetch<RawResult>(query, {}, { next: { revalidate: 60, tags: ['sanity'] } })
    } catch (error) {
      console.error('[cms] Could not load content from Sanity, showing built-in content instead.', error)
    }
  }

  const why = raw.whyTurkiye
  const about = raw.about

  return {
    settings: mergeSettings(raw.settings),
    heroImage: raw.settings?.heroImage ?? null,
    sections: resolveSections(raw.homepage),
    services: raw.services?.length ? raw.services : defaultServices,
    whyTurkiye: {
      eyebrow: why?.eyebrow ?? defaultWhyTurkiye.eyebrow,
      heading: why?.heading ?? defaultWhyTurkiye.heading,
      body: why?.body ?? defaultWhyTurkiye.body,
      points: why?.points?.length ? why.points : defaultWhyTurkiye.points,
    },
    about: {
      eyebrow: about?.eyebrow ?? defaultAbout.eyebrow,
      heading: about?.heading ?? defaultAbout.heading,
      paragraphs: about?.paragraphs?.length ? about.paragraphs : defaultAbout.paragraphs,
    },
    team: raw.team ?? [],
    stories: raw.stories ?? [],
    partners: raw.partners ?? [],
  }
}
