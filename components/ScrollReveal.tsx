'use client'

import { useEffect } from 'react'

/** Which elements fade in as you scroll (the hero animates on its own). */
const TARGETS = 'h2, p, form, figure, blockquote, ol > li, ul > li'

/**
 * Adds scroll animations to the homepage without changing any section's code.
 * Content stays fully visible if JavaScript is off or the visitor prefers reduced motion.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 1. Find the blocks to animate, skipping anything inside another animated block.
    const items: HTMLElement[] = []
    document.querySelectorAll<HTMLElement>('main > section:not(#top)').forEach((section) => {
      const found = Array.from(section.querySelectorAll<HTMLElement>(TARGETS))
      items.push(...found.filter((el) => !found.some((other) => other !== el && other.contains(el))))
    })

    // 2. Stagger items that sit side by side (cards in a row, list items).
    const perParent = new Map<Element, number>()
    items.forEach((el) => {
      const parent = el.parentElement ?? el
      const index = perParent.get(parent) ?? 0
      perParent.set(parent, index + 1)
      el.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 90}ms`)
      el.classList.add('reveal')
    })

    // 3. Reveal each block when it scrolls into view, then hand it back to normal styles (so hovers stay snappy).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add('is-visible')
          el.addEventListener('transitionend', () => el.classList.remove('reveal', 'is-visible'), { once: true })
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((el) => observer.observe(el))

    // 4. Soft shadow under the sticky header once the page is scrolled.
    const header = document.querySelector('header')
    const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
