import { notFound } from 'next/navigation'
import { Contact } from '@/components/Contact'
import { Footer, WhatsAppFloat } from '@/components/Footer'
import { Header, type NavItem } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About, Partners, Services, Stories, WhyTurkiye } from '@/components/Sections'
import type { SectionKey } from '@/content/defaults'
import { getDictionary } from '@/content/dictionary'
import { waLink } from '@/content/site'
import { getHomeContent } from '@/lib/data/content'
import { isLocale } from '@/lib/i18n'

// Re-check the CMS for new content at most once a minute.
export const revalidate = 60

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const t = getDictionary(locale)
  const content = await getHomeContent()
  const whatsappHref = waLink(content.settings.whatsappZimbabwe, t.cta.whatsappMessage)

  // Only link to sections that are actually on the page.
  const shown = new Set<SectionKey>(content.sections.filter((key) => {
    if (key === 'partners') return content.partners.length > 0
    if (key === 'stories') return content.stories.length > 0
    return true
  }))
  const nav: NavItem[] = [
    shown.has('services') && { href: '#services', label: t.nav.services },
    shown.has('turkiye') && { href: '#turkiye', label: t.nav.turkiye },
    shown.has('about') && { href: '#about', label: t.nav.about },
    shown.has('stories') && { href: '#stories', label: t.nav.stories },
    shown.has('contact') && { href: '#contact', label: t.nav.contact },
  ].filter(Boolean) as NavItem[]

  const render: Record<SectionKey, React.ReactNode> = {
    partners: <Partners key="partners" t={t} partners={content.partners} />,
    services: <Services key="services" t={t} locale={locale} services={content.services} />,
    turkiye: <WhyTurkiye key="turkiye" locale={locale} content={content.whyTurkiye} />,
    about: <About key="about" t={t} locale={locale} content={content.about} team={content.team} />,
    stories: <Stories key="stories" t={t} locale={locale} stories={content.stories} />,
    contact: <Contact key="contact" t={t} locale={locale} settings={content.settings} whatsappHref={whatsappHref} />,
  }

  return (
    <>
      <Header locale={locale} t={t} settings={content.settings} nav={nav} />
      <main>
        <Hero t={t} heroImage={content.heroImage} whatsappHref={whatsappHref} />
        {content.sections.map((key) => render[key])}
      </main>
      <Footer t={t} settings={content.settings} nav={nav} whatsappHref={whatsappHref} />
      <WhatsAppFloat href={whatsappHref} label={t.cta.whatsappFloat} />
    </>
  )
}
