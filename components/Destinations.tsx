import Image from 'next/image'
import type { Dictionary } from '@/content/dictionary'
import { waLink } from '@/content/site'
import { focusPosition, type DestinationDoc } from '@/lib/data/types'
import { pick, type Locale } from '@/lib/i18n'
import { WhatsAppIcon } from './icons'
import { Eyebrow, SectionTitle, container } from './ui'

export function Destinations({
  t,
  locale,
  destinations,
  whatsappNumber,
}: {
  t: Dictionary
  locale: Locale
  destinations: DestinationDoc[]
  whatsappNumber: string
}) {
  if (!destinations.length) return null
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="border-y border-line bg-white">
      <div className={`${container} flex flex-col gap-12 py-20 lg:py-24`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow center>{t.destinations.eyebrow}</Eyebrow>
          <SectionTitle id="destinations-title">{t.destinations.title}</SectionTitle>
          <p className="max-w-[620px] text-[17px] leading-relaxed text-body">{t.destinations.intro}</p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => {
            const name = pick(d.name, locale) ?? d.code
            const summary = pick(d.summary, locale)
            const message = t.cta.askAboutMessage.replace('{country}', name)
            return (
              <li key={d._id} className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-cream">
                {d.photo?.url && (
                  <div className="relative h-36 bg-sand">
                    <Image
                      src={d.photo.url}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 92vw"
                      className="object-cover"
                      style={{ objectPosition: focusPosition[d.photo.focus ?? 'center'] }}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-[13px] font-bold tracking-[0.06em] text-gold"
                      aria-hidden="true"
                    >
                      {d.code}
                    </span>
                    <h3 className="font-display text-[26px] font-semibold leading-tight text-forest">{name}</h3>
                  </div>
                  {summary && <p className="text-sm leading-relaxed text-body">{summary}</p>}
                  <a
                    href={waLink(whatsappNumber, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-2 text-sm font-bold text-leaf no-underline hover:text-forest"
                  >
                    <WhatsAppIcon size={18} />
                    {t.destinations.ask.replace('{country}', name)}
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
