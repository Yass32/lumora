import Image from 'next/image'
import type { Dictionary } from '@/content/dictionary'
import type { AboutContent, ServiceItem, WhyTurkiyeContent } from '@/content/defaults'
import { focusPosition, type ImageRef, type PartnerDoc as Partner, type StoryDoc as Story, type TeamMemberDoc as TeamMember } from '@/lib/data/types'
import { pick, type Locale } from '@/lib/i18n'
import { CoinIcon, GraduationIcon, LanguageIcon, PeopleIcon } from './icons'
import { Eyebrow, SectionTitle, container } from './ui'

const pos = (img?: ImageRef | null) => focusPosition[img?.focus ?? 'center']

/* ── Partner universities ───────────────────────────────── */
export function Partners({ t, partners }: { t: Dictionary; partners: Partner[] }) {
  if (!partners.length) return null
  return (
    <section aria-labelledby="partners-title" className="border-y border-line bg-white">
      <div className={`${container} flex flex-col items-center gap-6 py-9`}>
        <h2 id="partners-title" className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-muted">
          {t.partners.title}
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((p) => {
            const src = p.logo?.url
            if (!src) return null
            const logo = <Image src={src} alt={p.name} width={160} height={64} className="h-14 w-auto max-w-[160px] object-contain" />
            return (
              <li key={p._id}>
                {p.website ? (
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="block opacity-80 transition-opacity hover:opacity-100">
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ── Services, as a three-stage journey ─────────────────── */
export function Services({ t, locale, services }: { t: Dictionary; locale: Locale; services: ServiceItem[] }) {
  let n = 0
  const stages = ([1, 2, 3] as const).map((stage) => ({
    stage,
    items: services.filter((s) => s.stage === stage).map((s) => ({ ...s, number: ++n })),
  }))

  return (
    <section id="services" aria-labelledby="services-title" className={`${container} flex flex-col gap-14 py-20 lg:py-24`}>
      <div id="journey" className="flex flex-col items-center gap-4 text-center">
        <Eyebrow center>{t.services.eyebrow}</Eyebrow>
        <SectionTitle id="services-title">{t.services.title}</SectionTitle>
        <p className="max-w-[620px] text-[17px] leading-relaxed text-body">{t.services.intro}</p>
      </div>

      <ol className="grid gap-6 lg:grid-cols-3">
        {stages.map(({ stage, items }, i) => {
          const dark = stage === 2
          return (
            <li
              key={stage}
              className={`flex flex-col gap-6 rounded-[20px] p-7 sm:p-8 ${dark ? 'bg-forest text-on-dark-strong' : 'border border-line bg-white'}`}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`text-xs font-bold uppercase tracking-[0.16em] ${dark ? 'text-gold' : 'text-gold-ink'}`}>
                  {t.services.stage} {stage}
                </span>
                <h3 className={`font-display text-[32px] font-semibold leading-tight ${dark ? 'text-white' : 'text-forest'}`}>
                  {t.services.stages[i]}
                </h3>
              </div>
              <ul className="flex flex-col gap-5">
                {items.map((s) => (
                  <li key={s.number} className="flex items-start gap-3.5">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        dark ? 'bg-gold text-forest' : 'bg-leaf text-white'
                      }`}
                      aria-hidden="true"
                    >
                      {s.number}
                    </span>
                    <div>
                      <h4 className={`text-base font-bold ${dark ? 'text-white' : ''}`}>{pick(s.title, locale)}</h4>
                      {pick(s.description, locale) && (
                        <p className={`mt-0.5 text-sm leading-relaxed ${dark ? 'text-on-dark' : 'text-[#4d5a50]'}`}>{pick(s.description, locale)}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {stage === 3 && (
                <p className="mt-auto rounded-2xl bg-[#f4edd8] p-4 font-display text-[19px] italic text-forest">
                  “Guiding your future, wherever it begins.”
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ── Why Türkiye ────────────────────────────────────────── */
const pointIcons = [GraduationIcon, LanguageIcon, CoinIcon, PeopleIcon]

export function WhyTurkiye({ locale, content }: { locale: Locale; content: WhyTurkiyeContent }) {
  return (
    <section id="turkiye" aria-labelledby="turkiye-title" className="bg-forest text-on-dark-strong">
      <div className={`${container} flex flex-col gap-12 py-20 lg:flex-row lg:items-center lg:gap-14 lg:py-24`}>
        <div className="flex min-w-0 flex-col gap-5 lg:w-[42%]">
          <Eyebrow dark>{pick(content.eyebrow, locale)}</Eyebrow>
          <SectionTitle dark id="turkiye-title">
            {pick(content.heading, locale)}
          </SectionTitle>
          <p className="text-[17px] leading-relaxed text-on-dark">{pick(content.body, locale)}</p>
        </div>
        <ul className="grid min-w-0 flex-1 gap-5 sm:grid-cols-2">
          {content.points.map((point, i) => {
            const Icon = pointIcons[i % pointIcons.length]
            return (
              <li key={i} className="flex flex-col gap-3 rounded-[18px] border border-gold/35 p-6">
                <Icon size={30} className="text-gold" strokeWidth={1.8} />
                <h3 className="text-[17px] font-bold text-white">{pick(point.title, locale)}</h3>
                <p className="text-sm leading-relaxed text-on-dark">{pick(point.text, locale)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ── About + team ───────────────────────────────────────── */
export function About({ t, locale, content, team }: { t: Dictionary; locale: Locale; content: AboutContent; team: TeamMember[] }) {
  return (
    <section id="about" aria-labelledby="about-title" className={`${container} flex flex-col gap-14 py-20 lg:py-24`}>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Eyebrow>{pick(content.eyebrow, locale)}</Eyebrow>
          <SectionTitle id="about-title">{pick(content.heading, locale)}</SectionTitle>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-5 text-[17px] leading-[1.7] text-body lg:pt-9">
          {content.paragraphs.map((p, i) => (
            <p key={i}>{pick(p, locale)}</p>
          ))}
        </div>
      </div>

      {team.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="font-display text-3xl font-semibold text-forest">{t.about.team}</h3>
          <ul className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {team.map((m) => {
              const src = m.photo?.url
              return (
                <li key={m._id} className="flex flex-col gap-3">
                  <div className="relative aspect-square overflow-hidden rounded-[18px] border border-[#d9cda8] bg-sand">
                    {src && (
                      <Image src={src} alt={m.name} fill sizes="(min-width: 1024px) 290px, 45vw" className="object-cover" style={{ objectPosition: pos(m.photo) }} />
                    )}
                  </div>
                  <div>
                    <p className="text-[17px] font-bold">{m.name}</p>
                    <p className="text-sm text-muted">{[pick(m.role, locale), m.office === 'Türkiye' ? t.topbar.turkiye : t.topbar.zimbabwe].filter(Boolean).join(' · ')}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}

/* ── Student stories ────────────────────────────────────── */
export function Stories({ t, locale, stories }: { t: Dictionary; locale: Locale; stories: Story[] }) {
  if (!stories.length) return null
  return (
    <section id="stories" aria-labelledby="stories-title" className="bg-sand">
      <div className={`${container} flex flex-col gap-12 py-20 lg:py-24`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow center>{t.stories.eyebrow}</Eyebrow>
          <SectionTitle id="stories-title">{t.stories.title}</SectionTitle>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => {
            const src = s.photo?.url
            const quote = pick(s.quote, locale)
            return (
              <li key={s._id}>
                <figure className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white">
                  <div className="relative h-60 bg-[#e9e1cb]">
                    {src && <Image src={src} alt={s.studentName} fill sizes="(min-width: 1024px) 380px, 92vw" className="object-cover" style={{ objectPosition: pos(s.photo) }} />}
                  </div>
                  {quote && (
                    <blockquote className="px-6 pb-2 pt-6 font-display text-[22px] italic leading-snug text-forest">“{quote}”</blockquote>
                  )}
                  <figcaption className="mt-auto flex flex-col gap-0.5 px-6 pb-6 pt-2">
                    <span className="text-[15px] font-bold">{s.studentName}</span>
                    <span className="text-sm text-muted">
                      {[s.programme, [s.university, s.city].filter(Boolean).join(', ')].filter(Boolean).join(' · ')}
                    </span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
