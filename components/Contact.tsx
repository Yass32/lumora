import type { Dictionary } from '@/content/dictionary'
import { telLink, type SiteSettings } from '@/content/site'
import type { Locale } from '@/lib/i18n'
import { EnquiryForm } from './EnquiryForm'
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './icons'
import { Eyebrow, SectionTitle, container } from './ui'

export function Contact({
  t,
  locale,
  settings,
  whatsappHref,
  destinations,
}: {
  t: Dictionary
  locale: Locale
  settings: SiteSettings
  whatsappHref: string
  destinations: { value: string; label: string }[]
}) {
  const card = 'flex items-center gap-3.5 rounded-[14px] border border-line bg-white px-4 py-4 text-ink no-underline'
  const bubble = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf text-white'

  return (
    <section id="contact" aria-labelledby="contact-title" className={`${container} flex flex-col gap-12 py-20 lg:flex-row lg:gap-12 lg:py-24`}>
      <div className="flex min-w-0 flex-col gap-5 lg:w-[40%]">
        <Eyebrow>{t.contact.eyebrow}</Eyebrow>
        <SectionTitle id="contact-title">{t.contact.title}</SectionTitle>
        <p className="text-[17px] leading-relaxed text-body">{t.contact.intro}</p>

        <div className="flex flex-col gap-3.5 pt-2">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={card}>
            <span className={bubble}>
              <WhatsAppIcon />
            </span>
            <span className="flex flex-col">
              <span className="font-bold">{t.contact.whatsapp}</span>
              <span className="text-sm text-muted">
                {t.topbar.zimbabwe} {settings.whatsappZimbabwe}
              </span>
            </span>
          </a>
          <a href={telLink(settings.phoneTurkiye)} className={card}>
            <span className={bubble}>
              <PhoneIcon />
            </span>
            <span className="flex flex-col">
              <span className="font-bold">{t.topbar.turkiye}</span>
              <span className="text-sm text-muted">{settings.phoneTurkiye}</span>
            </span>
          </a>
          <a href={`mailto:${settings.email}`} className={card}>
            <span className={bubble}>
              <MailIcon />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-bold">{t.contact.email}</span>
              <span className="break-all text-sm text-muted">{settings.email}</span>
            </span>
          </a>
          <div className={card}>
            <span className={bubble}>
              <PinIcon />
            </span>
            <span className="flex flex-col">
              <span className="font-bold">{t.contact.office}</span>
              <span className="text-sm text-muted">{settings.address}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <EnquiryForm t={t.form} locale={locale} whatsappHref={whatsappHref} whatsappLabel={t.cta.whatsapp} destinations={destinations} />
      </div>
    </section>
  )
}
