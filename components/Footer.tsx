import Image from 'next/image'
import type { Dictionary } from '@/content/dictionary'
import type { SiteSettings } from '@/content/site'
import { localeNames, locales } from '@/lib/i18n'
import type { NavItem } from './Header'
import { InstagramIcon, LockIcon, TikTokIcon, WhatsAppIcon } from './icons'
import { container } from './ui'

export function Footer({ t, settings, nav, whatsappHref }: { t: Dictionary; settings: SiteSettings; nav: NavItem[]; whatsappHref: string }) {
  const heading = 'text-xs font-bold uppercase tracking-[0.16em] text-gold'
  const link = 'text-on-dark-strong no-underline hover:text-white'
  return (
    <footer className="bg-forest text-on-dark">
      <div className={`${container} flex flex-col gap-10 pb-28 pt-16 sm:pb-10`}>
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[360px] flex-col gap-4">
            <div className="h-[120px] w-[120px] rounded-2xl bg-white p-1.5">
              <Image src="/images/lumora-logo.jpg" alt="Lumora Global Education" width={108} height={108} className="h-full w-full object-contain" />
            </div>
            <p className="font-display text-[22px] italic text-on-dark-strong">{settings.tagline}</p>
          </div>

          <nav aria-label={t.footer.explore} className="flex flex-col gap-2.5 text-[15px]">
            <span className={heading}>{t.footer.explore}</span>
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={link}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className={heading}>{t.footer.contact}</span>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
              {t.topbar.zimbabwe}: {settings.whatsappZimbabwe}
            </a>
            <span>
              {t.topbar.turkiye}: {settings.phoneTurkiye}
            </span>
            <a href={`mailto:${settings.email}`} className={`${link} break-all`}>
              {settings.email}
            </a>
            <span>{settings.address}</span>
          </div>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className={heading}>{t.footer.follow}</span>
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
              <InstagramIcon size={18} /> Instagram
            </a>
            <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
              <TikTokIcon size={18} /> TikTok
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gold/30 pt-6 text-[13px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>
              © {new Date().getFullYear()} {settings.name}. {t.footer.rights}
            </span>
            <a href="/admin" className="inline-flex min-h-8 items-center gap-1.5 font-semibold text-gold no-underline hover:text-white">
              <LockIcon size={14} /> {t.footer.staff}
            </a>
          </div>
          <span>{locales.map((l) => localeNames[l].native).join(' · ')}</span>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-30 flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-gold bg-leaf text-white shadow-[0_10px_28px_rgba(14,59,24,0.35)] transition-transform hover:scale-105"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
