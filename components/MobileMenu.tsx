'use client'

import { useEffect, useState } from 'react'
import { CloseIcon, MenuIcon } from './icons'
import type { NavItem } from './Header'

export function MobileMenu({ nav, menuLabel, closeLabel, bookLabel }: { nav: NavItem[]; menuLabel: string; closeLabel: string; bookLabel: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={menuLabel}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-forest hover:bg-sand"
      >
        <MenuIcon size={24} />
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label={menuLabel} className="fixed inset-0 z-50 flex flex-col bg-forest text-white">
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10"
              autoFocus
            >
              <CloseIcon size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 text-2xl font-semibold">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-white no-underline">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto p-6">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center justify-center rounded-full bg-gold text-base font-bold text-forest no-underline"
            >
              {bookLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
