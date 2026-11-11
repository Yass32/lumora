import Image from 'next/image'
import type { Dictionary } from '@/content/dictionary'
import type { SiteSettings } from '@/content/site'
import { locales, localeNames, type Locale } from '@/lib/i18n'
import { MobileMenu } from './MobileMenu'
import { container } from './ui'

export type NavItem = { href: string; label: string }

export function Header({ locale, t, settings, nav }: { locale: Locale; t: Dictionary; settings: SiteSettings; nav: NavItem[] }) {
  return (
    <>
      {/* Top bar */}
      <div className="bg-forest text-[13px] text-on-dark-strong">
        <div className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2`}>
          <div className="hidden flex-wrap items-center gap-x-5 gap-y-1 md:flex">
            <span>{settings.address}</span>
            <span>
              {t.topbar.zimbabwe}: {settings.whatsappZimbabwe}
            </span>
            <span>
              {t.topbar.turkiye}: {settings.phoneTurkiye}
            </span>
          </div>
          <LanguageSwitcher locale={locale} label={t.topbar.language} />
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className={`${container} flex items-center justify-between gap-6 py-3`}>
          <a href={`/${locale}#top`} className="flex items-center gap-3 no-underline" aria-label="Lumora Global Education">
            <Image src="/images/lumora-emblem.png" alt="" width={58} height={48} priority className="h-12 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[26px] font-bold tracking-[0.04em] text-leaf sm:text-[28px]">LUMORA</span>
              <span className="mt-1 text-[10px] font-bold tracking-[0.28em] text-gold-ink">GLOBAL EDUCATION</span>
            </span>
          </a>

          <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-semibold lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-ink no-underline hover:text-leaf">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden min-h-11 items-center rounded-full bg-leaf px-5 text-sm font-bold text-white no-underline hover:bg-forest sm:inline-flex"
            >
              {t.cta.book}
            </a>
            <MobileMenu nav={nav} menuLabel={t.nav.menu} closeLabel={t.nav.close} bookLabel={t.cta.book} />
          </div>
        </div>
      </header>
    </>
  )
}

function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  return (
    <nav aria-label={label} className="ml-auto flex items-center gap-1">
      {locales.map((l) => {
        const active = l === locale
        return (
          <a
            key={l}
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? 'true' : undefined}
            title={localeNames[l].native}
            className={`inline-flex min-h-8 min-w-11 items-center justify-center rounded-md text-xs no-underline ${
              active ? 'bg-gold font-bold text-forest' : 'font-semibold text-on-dark-strong hover:bg-white/10'
            }`}
          >
            {localeNames[l].short}
          </a>
        )
      })}
    </nav>
  )
}
