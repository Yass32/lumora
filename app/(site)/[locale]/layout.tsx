import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '../../globals.css'
import { getDictionary } from '@/content/dictionary'
import { isLocale, locales } from '@/lib/i18n'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = { themeColor: '#0e3b18' }

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries([...locales.map((l) => [l, `/${l}`]), ['x-default', '/en']]),
    },
    openGraph: {
      type: 'website',
      siteName: 'Lumora Global Education',
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      images: [{ url: '/images/bosphorus-hero.png', width: 1600, height: 2000 }],
    },
  }
}

export default async function SiteLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
