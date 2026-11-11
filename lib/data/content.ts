import 'server-only'
import { defaultAbout, defaultServices, defaultWhyTurkiye, sectionKeys, type SectionKey } from '@/content/defaults'
import { siteDefaults, type SiteSettings } from '@/content/site'
import { getStore } from './store'
import type { AboutDoc, HomepageDoc, ImageRef, PartnerDoc, ServiceDoc, SettingsDoc, StoryDoc, TeamMemberDoc, WhyTurkiyeDoc } from './types'

const byOrder = <T extends { order?: number }>(a: T, b: T) => (a.order ?? 0) - (b.order ?? 0)

export const SINGLETON_IDS = { settings: 'siteSettings', homepage: 'homepage', whyTurkiye: 'whyTurkiye', about: 'about' } as const

export function defaultHomepage(): HomepageDoc {
  return { _id: 'homepage', _type: 'homepage', sections: sectionKeys.map((key) => ({ key, visible: true })) }
}
export function defaultWhyTurkiyeDoc(): WhyTurkiyeDoc {
  return { _id: 'whyTurkiye', _type: 'whyTurkiye', ...structuredClone(defaultWhyTurkiye) }
}
export function defaultAboutDoc(): AboutDoc {
  return { _id: 'about', _type: 'about', ...structuredClone(defaultAbout) }
}
export function defaultSettingsDoc(): SettingsDoc {
  const { name: _n, tagline: _t, ...contact } = siteDefaults
  return { _id: 'siteSettings', _type: 'siteSettings', heroImage: null, ...contact }
}

/** The first time the admin opens, copy the built-in content into the store so staff edit real documents. */
export async function ensureSeeded() {
  const store = getStore()
  const [settings, homepage, why, about, services] = await Promise.all([
    store.get('siteSettings', 'siteSettings'),
    store.get('homepage', 'homepage'),
    store.get('whyTurkiye', 'whyTurkiye'),
    store.get('about', 'about'),
    store.list('service'),
  ])
  if (!settings) await store.save(defaultSettingsDoc())
  if (!homepage) await store.save(defaultHomepage())
  if (!why) await store.save(defaultWhyTurkiyeDoc())
  if (!about) await store.save(defaultAboutDoc())
  if (!services.length) {
    for (const [i, s] of defaultServices.entries()) {
      await store.save<ServiceDoc>({ _id: `service-${i + 1}`, _type: 'service', order: (i + 1) * 10, ...structuredClone(s) })
    }
  }
}

/* ── What the website needs ─────────────────────────────── */

export type HomeContent = {
  settings: SiteSettings
  heroImage: ImageRef | null
  sections: SectionKey[]
  services: ServiceDoc[]
  whyTurkiye: WhyTurkiyeDoc
  about: AboutDoc
  team: TeamMemberDoc[]
  stories: StoryDoc[]
  partners: PartnerDoc[]
}

function mergeSettings(doc: SettingsDoc | null): SiteSettings {
  const out = { ...siteDefaults }
  if (!doc) return out
  for (const key of Object.keys(siteDefaults) as (keyof SiteSettings)[]) {
    const value = (doc as Record<string, unknown>)[key]
    if (typeof value === 'string' && value.trim()) out[key] = value.trim()
  }
  return out
}

export async function getHomeContent(): Promise<HomeContent> {
  const store = getStore()
  try {
    const [settings, homepage, why, about, services, team, stories, partners] = await Promise.all([
      store.get('siteSettings', 'siteSettings'),
      store.get('homepage', 'homepage'),
      store.get('whyTurkiye', 'whyTurkiye'),
      store.get('about', 'about'),
      store.list('service'),
      store.list('teamMember'),
      store.list('story'),
      store.list('partner'),
    ])
    const valid = (homepage?.sections ?? []).filter((s) => (sectionKeys as readonly string[]).includes(s.key))
    return {
      settings: mergeSettings(settings),
      heroImage: settings?.heroImage ?? null,
      sections: (valid.length ? valid.filter((s) => s.visible).map((s) => s.key) : [...sectionKeys]) as SectionKey[],
      services: services.length
        ? services.sort((a, b) => a.stage - b.stage || byOrder(a, b))
        : defaultServices.map((s, i) => ({ _id: `service-${i + 1}`, _type: 'service' as const, order: i, ...s })),
      whyTurkiye: why ?? defaultWhyTurkiyeDoc(),
      about: about ?? defaultAboutDoc(),
      team: team.sort(byOrder),
      stories: stories.sort(byOrder),
      partners: partners.filter((p) => p.logo?.url).sort(byOrder),
    }
  } catch (error) {
    console.error('[content] Could not load content, showing built-in content instead.', error)
    return {
      settings: { ...siteDefaults },
      heroImage: null,
      sections: [...sectionKeys],
      services: defaultServices.map((s, i) => ({ _id: `service-${i + 1}`, _type: 'service' as const, order: i, ...s })),
      whyTurkiye: defaultWhyTurkiyeDoc(),
      about: defaultAboutDoc(),
      team: [],
      stories: [],
      partners: [],
    }
  }
}
