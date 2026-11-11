import Image from 'next/image'
import type { Dictionary } from '@/content/dictionary'
import { focusPosition, type ImageRef } from '@/lib/data/types'
import { CheckIcon, WhatsAppIcon } from './icons'
import { buttonGold, buttonPrimary, container } from './ui'

export function Hero({ t, heroImage, whatsappHref }: { t: Dictionary; heroImage: ImageRef | null; whatsappHref: string }) {
  const custom = heroImage?.url
  const src = custom || '/images/bosphorus-hero.png'
  const alt = (custom && heroImage?.alt) || t.hero.imageAlt
  const position = custom ? focusPosition[heroImage?.focus ?? 'center'] : '50% 70%'

  return (
    <section id="top" className={`${container} flex flex-col items-center gap-12 pb-20 pt-12 sm:pt-16 lg:flex-row lg:gap-14 lg:pb-24 lg:pt-20`}>
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-ink sm:text-[13px]">
          <span className="block h-0.5 w-9 shrink-0 bg-gold" aria-hidden="true" />
          {t.hero.eyebrow}
        </p>
        <h1 className="font-display text-[44px] font-semibold leading-[1.03] text-forest text-balance sm:text-6xl lg:text-[68px]">
          {t.hero.titleStart} <em className="font-medium text-leaf">{t.hero.titleEmphasis}</em>
        </h1>
        <p className="max-w-[540px] text-[17px] leading-relaxed text-body sm:text-lg">{t.hero.intro}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#contact" className={buttonPrimary}>
            {t.cta.book}
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonGold}>
            <WhatsAppIcon />
            {t.cta.whatsapp}
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-7 gap-y-2 pt-2 text-sm text-body">
          {t.hero.trust.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon size={18} className="text-leaf" strokeWidth={2.4} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-full max-w-[520px] flex-1 lg:max-w-none">
        <div className="relative aspect-[4/5] max-h-[600px] w-full overflow-hidden rounded-t-[220px] rounded-b-3xl border border-[#d9cda8] bg-sand">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 92vw"
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
        <div className="absolute -left-2 bottom-10 flex max-w-[250px] flex-col gap-1 rounded-2xl bg-white px-5 py-4 shadow-[0_12px_32px_rgba(14,59,24,0.14)] sm:-left-6">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">{t.hero.badgeLabel}</span>
          <span className="font-display text-[26px] font-bold leading-tight text-forest">{t.hero.badgeTitle}</span>
          <span className="text-[13px] text-body">{t.hero.badgeText}</span>
        </div>
      </div>
    </section>
  )
}
