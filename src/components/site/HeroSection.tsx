'use client'

import { motion } from 'framer-motion'
import { SiteContent } from '@/types/content'

export default function HeroSection({ hero }: { hero: SiteContent['hero'] }) {
  return (
    <section
      id="hero"
      className="relative h-screen w-full px-8 text-center flex flex-col items-center justify-center"
      aria-label="Main hero"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   h-[52vh] w-[min(90vw,980px)] rounded-full blur-2xl bg-black/12"
        aria-hidden="true"
      />

      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 mb-10 text-[11px] font-medium uppercase tracking-[0.45em] text-primary font-body"
      >
        {hero.badge}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-8 font-headline text-7xl md:text-[10rem] leading-[0.86] tracking-tighter text-on-background"
        style={{ textShadow: '0 10px 36px rgba(0, 0, 0, 0.7)' }}
      >
        <span className="font-extrabold">{hero.title}</span>{' '}
        <span className="italic font-light text-primary">{hero.titleItalic}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-12 max-w-2xl font-headline text-xl md:text-3xl leading-relaxed font-light text-secondary-fixed"
        style={{ textShadow: '0 6px 24px rgba(0, 0, 0, 0.55)' }}
      >
        {hero.subtitle}
      </motion.p>

      <motion.a
        href="#contact"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="group relative z-10 inline-flex items-center gap-3 rounded-full border border-white/20
                   bg-black/35 px-10 py-4 text-base tracking-wider text-on-background font-body
                   transition-all duration-500 hover:bg-black/45 hover:border-primary/60"
      >
        <span>{hero.ctaButton}</span>
        <span className="translate-x-0 text-primary transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-on-background/60 font-body">scroll</span>
        <div className="h-14 w-px bg-gradient-to-b from-on-background/60 to-transparent" />
      </motion.div>
    </section>
  )
}
