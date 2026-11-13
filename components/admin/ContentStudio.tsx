'use client'

import Link from 'next/link'
import { useState } from 'react'
import { saveSections } from '@/lib/admin/actions'
import type { AboutDoc, DestinationDoc, HomepageDoc, PartnerDoc, ServiceDoc, SettingsDoc, StoryDoc, TeamMemberDoc, WhyTurkiyeDoc } from '@/lib/data/types'
import { AboutEditor, ContactEditor, HeroEditor, WhyTurkiyeEditor } from './editors'
import { Icon } from './Icon'
import { DestinationsEditor, PartnersEditor, ServicesEditor, StoriesEditor, TeamEditor } from './ListEditors'
import { btnIcon } from './styles'
import { sectionNames, type StudioSection } from './sections'
import { useAction } from './ui'

type Data = {
  settings: SettingsDoc
  homepage: HomepageDoc
  whyTurkiye: WhyTurkiyeDoc
  about: AboutDoc
  services: ServiceDoc[]
  destinations: DestinationDoc[]
  team: TeamMemberDoc[]
  stories: StoryDoc[]
  partners: PartnerDoc[]
}

export function ContentStudio({ section, data }: { section: StudioSection; data: Data }) {
  const editors: Record<StudioSection, React.ReactNode> = {
    hero: <HeroEditor settings={data.settings} />,
    contact: <ContactEditor settings={data.settings} />,
    turkiye: <WhyTurkiyeEditor doc={data.whyTurkiye} />,
    about: <AboutEditor doc={data.about} />,
    services: <ServicesEditor items={data.services} />,
    destinations: <DestinationsEditor items={data.destinations} />,
    team: <TeamEditor items={data.team} />,
    stories: <StoriesEditor items={data.stories} />,
    partners: <PartnersEditor items={data.partners} />,
  }

  return (
    <div className="flex flex-wrap items-start gap-6 px-5 pb-10 pt-7 sm:px-8">
      <SectionList current={section} data={data} />
      <div key={section} className="flex min-w-0 flex-[999_1_600px] flex-wrap items-start gap-6">
        {editors[section]}
      </div>
    </div>
  )
}

const arrowBtn = 'inline-flex h-[18px] w-7 items-center justify-center rounded text-muted hover:bg-[#f1ece0] hover:text-ink disabled:opacity-25'

function SectionList({ current, data }: { current: StudioSection; data: Data }) {
  const [sections, setSections] = useState(data.homepage.sections)
  const { run, pending, status } = useAction()

  const meta: Record<string, string> = {
    partners: `${data.partners.filter((p) => p.logo).length} ${data.partners.filter((p) => p.logo).length === 1 ? 'logo' : 'logos'}`,
    services: `${data.services.length} items`,
    destinations: `${data.destinations.length} countries`,
    turkiye: `${data.whyTurkiye.points.length} reasons`,
    about: `${data.team.length} ${data.team.length === 1 ? 'person' : 'people'}`,
    stories: `${data.stories.length} ${data.stories.length === 1 ? 'story' : 'stories'}`,
    contact: 'Contacts',
  }

  function update(next: typeof sections) {
    setSections(next)
    run(() => saveSections(next), 'Layout saved')
  }
  const move = (i: number, d: -1 | 1) => {
    const next = [...sections]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    update(next)
  }
  const toggle = (i: number) => update(sections.map((s, j) => (j === i ? { ...s, visible: !s.visible } : s)))

  const linkClass = (active: boolean) =>
    `flex min-h-11 flex-1 items-center gap-2 rounded-[10px] px-2.5 text-sm font-semibold no-underline ${active ? 'bg-[#e3f0e1] text-ink' : 'text-ink hover:bg-[#f6f3ea]'}`

  return (
    <nav aria-label="Page sections" className="flex w-full flex-col gap-1 rounded-[18px] border border-line bg-white p-4 lg:sticky lg:top-6 lg:w-[290px] lg:shrink-0">
      <div className="flex items-center justify-between px-2 pb-2.5">
        <span className="text-[15px] font-bold">Page sections</span>
        <span className="text-xs text-muted" aria-live="polite">
          {pending ? 'Saving…' : status?.ok ? '✓ Saved' : status ? <span className="text-[#8a2a19]">{status.text}</span> : 'Order & visibility'}
        </span>
      </div>

      <Link href="/admin/content?section=hero" className={linkClass(current === 'hero')} aria-current={current === 'hero' ? 'page' : undefined}>
        <Icon name="image" size={16} className="text-muted" />
        <span className="flex-1">Hero</span>
        <span className="text-xs font-normal text-muted">Photo only</span>
      </Link>

      <ul className="flex flex-col gap-1">
        {sections.map((s, i) => {
          const key = s.key as StudioSection
          return (
            <li key={s.key} className="flex items-center gap-0.5">
              <Link href={`/admin/content?section=${key}`} className={linkClass(current === key)} aria-current={current === key ? 'page' : undefined}>
                <span className={`flex-1 ${s.visible ? '' : 'text-muted line-through decoration-1'}`}>{sectionNames[key]}</span>
                <span className="text-xs font-normal text-muted">{s.visible ? meta[key] : 'Hidden'}</span>
              </Link>
              <button type="button" className={btnIcon} onClick={() => toggle(i)} disabled={pending} aria-label={`${s.visible ? 'Hide' : 'Show'} ${sectionNames[key]} on the website`} title={s.visible ? 'Hide on website' : 'Show on website'}>
                <Icon name={s.visible ? 'eye' : 'eyeOff'} size={16} />
              </button>
              <span className="flex flex-col">
                <button type="button" className={arrowBtn} onClick={() => move(i, -1)} disabled={i === 0 || pending} aria-label={`Move ${sectionNames[key]} up`}>
                  <Icon name="up" size={14} />
                </button>
                <button type="button" className={arrowBtn} onClick={() => move(i, 1)} disabled={i === sections.length - 1 || pending} aria-label={`Move ${sectionNames[key]} down`}>
                  <Icon name="down" size={14} />
                </button>
              </span>
            </li>
          )
        })}
      </ul>

      <span className="px-2 pb-1 pt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Inside sections</span>
      <Link href="/admin/content?section=team" className={linkClass(current === 'team')} aria-current={current === 'team' ? 'page' : undefined}>
        <span className="flex-1">Team members</span>
        <span className="text-xs font-normal text-muted">In About us</span>
      </Link>
    </nav>
  )
}
