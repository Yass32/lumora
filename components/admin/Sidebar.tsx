'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { logout } from '@/lib/admin/actions'
import type { CurrentUser } from '@/lib/auth'
import { Icon, type IconName } from './Icon'

type Item = { href: string; label: string; icon: IconName; match: (path: string, section: string | null) => boolean; badge?: number }

export function Sidebar({ user, newEnquiries }: { user: CurrentUser; newEnquiries: number }) {
  const path = usePathname()
  const section = useSearchParams().get('section')
  const [open, setOpen] = useState(false)

  // Close the phone menu after moving to another page.
  useEffect(() => setOpen(false), [path, section])

  const content = (s: string | null) => (p: string, cur: string | null) => p === '/admin/content' && (s === null ? !['team', 'stories', 'partners', 'contact'].includes(cur ?? '') : cur === s)
  const groups: { title: string; items: Item[] }[] = [
    {
      title: 'Website',
      items: [
        { href: '/admin/content', label: 'Homepage sections', icon: 'layout', match: content(null) },
        { href: '/admin/content?section=team', label: 'Team members', icon: 'people', match: content('team') },
        { href: '/admin/content?section=stories', label: 'Student stories', icon: 'quote', match: content('stories') },
        { href: '/admin/content?section=partners', label: 'Partner universities', icon: 'cap', match: content('partners') },
        { href: '/admin/content?section=contact', label: 'Contact & social links', icon: 'pin', match: content('contact') },
      ],
    },
    {
      title: 'Students',
      items: [{ href: '/admin/enquiries', label: 'Enquiries', icon: 'inbox', match: (p) => p.startsWith('/admin/enquiries'), badge: newEnquiries }],
    },
    {
      title: 'Settings',
      items: [
        ...(user.role === 'admin'
          ? [{ href: '/admin/staff', label: 'Staff accounts', icon: 'lock' as const, match: (p: string) => p.startsWith('/admin/staff') }]
          : []),
        { href: '/admin/account', label: 'My account', icon: 'user', match: (p) => p.startsWith('/admin/account') },
      ],
    },
  ]

  const current = groups.flatMap((g) => g.items).find((i) => i.match(path, section))

  return (
    <aside className="w-full bg-forest text-on-dark lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:shrink-0 lg:overflow-y-auto">
      {/* Phone & tablet: compact bar with a menu button */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:hidden">
        <Link href="/admin/content" className="flex items-center gap-2.5 no-underline">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white">
            <Image src="/images/lumora-emblem.png" alt="" width={36} height={30} className="h-auto w-8" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-bold tracking-[0.04em] text-white">LUMORA</span>
            <span className="text-[11px] font-semibold text-gold">{current?.label ?? 'Content studio'}</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-gold/50 px-4 text-sm font-semibold text-white"
        >
          <Icon name={open ? 'close' : 'layout'} size={18} />
          {open ? 'Close' : 'Menu'}
          {!open && newEnquiries > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-forest">{newEnquiries}</span>
          )}
        </button>
      </div>

      <div id="admin-nav" className={`${open ? 'flex' : 'hidden'} flex-col gap-7 px-4 pb-6 lg:flex lg:h-full lg:pt-6`}>
        <Link href="/admin/content" className="hidden items-center gap-2.5 px-2 no-underline lg:flex">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white">
            <Image src="/images/lumora-emblem.png" alt="" width={40} height={34} className="h-auto w-9" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[22px] font-bold tracking-[0.04em] text-white">LUMORA</span>
            <span className="text-[11px] font-semibold text-gold">Content studio</span>
          </span>
        </Link>

        <nav aria-label="Content studio" className="flex flex-col gap-1 text-sm font-semibold">
          {groups.map((g, gi) => (
            <div key={g.title} className="flex flex-col gap-1">
              <span className={`px-3 pb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a9b59f] ${gi ? 'pt-4' : ''}`}>{g.title}</span>
              {g.items.map((item) => {
                const active = item.match(path, section)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-[42px] items-center gap-2.5 rounded-[10px] px-3 no-underline ${
                      active ? 'bg-gold/15 text-white' : 'text-[#e7e1cc] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon name={item.icon} size={18} className={active ? 'text-gold' : ''} />
                    <span className="flex-1">{item.label}</span>
                    {!!item.badge && (
                      <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-gold px-1.5 text-xs font-bold text-forest">{item.badge}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <a
            href="/en"
            target="_blank"
            rel="noopener"
            className="flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-gold/50 text-sm font-semibold text-on-dark-strong no-underline hover:bg-white/5"
          >
            <Icon name="external" size={16} /> View live website
          </a>
          <div className="flex items-center gap-2.5 px-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-forest">{user.name.charAt(0).toUpperCase()}</span>
            <span className="flex min-w-0 flex-1 flex-col text-[13px] leading-tight">
              <span className="truncate font-semibold text-white">{user.name}</span>
              <span>{user.role === 'admin' ? 'Admin' : 'Editor'}</span>
            </span>
            <form action={logout}>
              <button type="submit" className="inline-flex h-9 items-center rounded-lg px-2 text-xs font-semibold text-on-dark hover:bg-white/10 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  )
}