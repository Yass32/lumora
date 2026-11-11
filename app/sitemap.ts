import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: 'weekly',
    priority: locale === 'en' ? 1 : 0.8,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])) },
  }))
}
