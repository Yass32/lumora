/**
 * Fills the CMS with the website's starting content, so staff begin with
 * complete pages instead of empty forms.
 *
 *   npm run seed
 *
 * Safe to run more than once: it only creates documents that don't exist yet.
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local
 */
import { readFileSync, existsSync } from 'node:fs'
import { createClient } from '@sanity/client'

for (const file of ['.env.local', '.env']) {
  if (!existsSync(file)) continue
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const { defaultAbout, defaultServices, defaultWhyTurkiye, sectionKeys } = await import('../content/defaults.ts')
const { siteDefaults } = await import('../content/site.ts')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_WRITE_TOKEN
if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-10-01',
  token,
  useCdn: false,
})

const key = (i: number) => `k${i}`

const docs = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    whatsappZimbabwe: siteDefaults.whatsappZimbabwe,
    phoneTurkiye: siteDefaults.phoneTurkiye,
    email: siteDefaults.email,
    address: siteDefaults.address,
    instagram: siteDefaults.instagram,
    tiktok: siteDefaults.tiktok,
  },
  {
    _id: 'homepage',
    _type: 'homepage',
    sections: sectionKeys.map((k, i) => ({ _key: key(i), _type: 'section', key: k, visible: true })),
  },
  {
    _id: 'whyTurkiye',
    _type: 'whyTurkiye',
    eyebrow: { _type: 'localeString', ...defaultWhyTurkiye.eyebrow },
    heading: { _type: 'localeString', ...defaultWhyTurkiye.heading },
    body: { _type: 'localeText', ...defaultWhyTurkiye.body },
    points: defaultWhyTurkiye.points.map((p, i) => ({
      _key: key(i),
      _type: 'point',
      title: { _type: 'localeString', ...p.title },
      text: { _type: 'localeText', ...p.text },
    })),
  },
  {
    _id: 'about',
    _type: 'about',
    eyebrow: { _type: 'localeString', ...defaultAbout.eyebrow },
    heading: { _type: 'localeString', ...defaultAbout.heading },
    paragraphs: defaultAbout.paragraphs.map((p, i) => ({ _key: key(i), _type: 'localeText', ...p })),
  },
  ...defaultServices.map((s, i) => ({
    _id: `service-${i + 1}`,
    _type: 'service',
    stage: s.stage,
    order: (i + 1) * 10,
    title: { _type: 'localeString', ...s.title },
    description: { _type: 'localeText', ...s.description },
  })),
]

const tx = client.transaction()
for (const doc of docs) tx.createIfNotExists(doc)
await tx.commit()
console.log(`Done. ${docs.length} documents checked; any missing ones were created.`)
