'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { SiteContent } from '@/types/content'

const Hero3DCanvas = dynamic(() => import('./Hero3DCanvas'), {
  ssr: false,
  loading: () => null,
})

export default function Hero3D({ hero }: { hero: SiteContent['hero'] }) {
  const portraits = (hero.floatingCards || [])
    .map((c) => c.src)
    .filter((src): src is string => Boolean(src))

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#0c0a09]"
      aria-label="כותרת ראשית"
    >
      <div className="absolute inset-0">
        <Hero3DCanvas portraits={portraits} />
      </div>

      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0c0a09]/80 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/80 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(200, 144, 96, 0.18) 0%, rgba(160, 98, 46, 0.06) 25%, transparent 55%)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
        style={{ boxShadow: 'inset 0 0 220px 80px rgba(0,0,0,0.75)' }}
      />

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-primary font-body uppercase tracking-[0.45em] text-[11px] font-medium mb-10"
        >
          {hero.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-7xl md:text-[10rem] leading-[0.86] tracking-tighter text-on-background mb-8 mix-blend-screen"
          style={{ textShadow: '0 0 40px rgba(160, 98, 46, 0.25)' }}
        >
          <span className="font-extrabold">{hero.title}</span>{' '}
          <span className="italic font-light text-primary/95">{hero.titleItalic}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-xl md:text-3xl text-secondary-fixed/85 max-w-2xl leading-relaxed mb-12 font-light"
        >
          {hero.subtitle}
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full
                     bg-white/[0.04] backdrop-blur-md border border-white/15
                     text-on-background font-body text-base tracking-wider
                     hover:bg-white/[0.08] hover:border-primary/50 transition-all duration-500"
        >
          <span>{hero.ctaButton}</span>
          <span className="text-primary translate-x-0 group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[10px] font-body uppercase tracking-[0.4em] text-on-background/60">
          scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-on-background/60 to-transparent" />
      </motion.div>
    </section>
  )
}
