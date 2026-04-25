'use client'

import { SiteContent } from '@/types/content'

export default function NavBar({ nav }: { nav: SiteContent['nav'] }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/40 backdrop-blur-xl">
      {/* In RTL: flex flows right→left, so logo (first) is rightmost, CTA (last) is leftmost */}
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
        <div className="text-2xl font-headline tracking-tight text-stone-200">
          {nav.logo}
        </div>
        {/* In RTL: first link (בית) appears rightmost, closest to logo */}
        <div className="hidden md:flex gap-8 items-center">
          {nav.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={
                i === 0
                  ? 'text-orange-300 font-semibold border-b border-orange-300/50 pb-1 font-body'
                  : 'text-stone-400 hover:text-stone-200 transition-colors font-body'
              }
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-body text-sm hover:scale-95 transition-transform duration-300 inline-block"
        >
          {nav.ctaButton}
        </a>
      </div>
    </nav>
  )
}
