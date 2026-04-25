'use client'

import { useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import type { SiteContent } from '@/types/content'

// Per-card layout + animation config
const CARD_DEFAULTS = [
  // left-side, overlaps "AURA" text  (z:20 = above text layer at z:10)
  { left: '3%',  top: '22%', width: 160, factor:  28, yRange: 16, duration: 4.4, delay: 0.0, rotate: -7, zIndex: 20 },
  // top-right corner                 (z:8  = behind text)
  { left: '67%', top: '7%',  width: 140, factor: -22, yRange: 12, duration: 3.8, delay: 1.2, rotate:  6, zIndex:  8 },
  // right-side, overlaps "AURA"      (z:20 = above text)
  { left: '78%', top: '33%', width: 168, factor:  18, yRange: 20, duration: 5.0, delay: 2.1, rotate:  9, zIndex: 20 },
  // lower-left                       (z:8  = behind text)
  { left: '5%',  top: '58%', width: 130, factor: -30, yRange: 14, duration: 4.7, delay: 0.7, rotate: -5, zIndex:  8 },
  // lower-right                      (z:12 = slightly above text)
  { left: '69%', top: '60%', width: 146, factor:  25, yRange: 11, duration: 3.6, delay: 1.9, rotate:  4, zIndex: 12 },
] as const

// ─── Single card ────────────────────────────────────────────────────────────

interface CardProps {
  src: string
  cfg: typeof CARD_DEFAULTS[number]
  smoothX: MotionValue<number>
  smoothY: MotionValue<number>
  index: number
}

function ProductCard({ src, cfg, smoothX, smoothY, index }: CardProps) {
  // Map absolute cursor px → parallax offset.
  // Using a fixed reference range so the effect is consistent on all screens.
  const HALF_W = typeof window !== 'undefined' ? window.innerWidth / 2 : 760
  const HALF_H = typeof window !== 'undefined' ? window.innerHeight / 2 : 450

  const px = useTransform(smoothX, [0, HALF_W * 2], [-cfg.factor, cfg.factor])
  const py = useTransform(smoothY, [0, HALF_H * 2], [-cfg.factor * 0.6, cfg.factor * 0.6])

  return (
    // ① Entry: fade + scale in, staggered
    <motion.div
      className="absolute pointer-events-auto"
      style={{ left: cfg.left, top: cfg.top, zIndex: cfg.zIndex }}
      initial={{ opacity: 0, scale: 0.74 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.2 + index * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ② Parallax: mouse-driven translation, separated from ③ */}
      <motion.div style={{ x: px, y: py }}>
        {/* ③ Float: continuous zero-gravity oscillation on its own y axis */}
        <motion.div
          animate={{
            y: [-(cfg.yRange / 2), cfg.yRange / 2],
            rotate: [cfg.rotate - 2, cfg.rotate + 2],
          }}
          transition={{
            y: { duration: cfg.duration, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: cfg.delay },
            rotate: { duration: cfg.duration * 1.3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: cfg.delay + 0.3 },
          }}
          whileHover={{ scale: 1.04, transition: { duration: 0.28 } }}
          className="rounded-2xl overflow-hidden relative select-none cursor-default"
          style={{
            width: cfg.width,
            boxShadow: '0 10px 38px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.07), 0 0 28px rgba(197,164,126,0.09)',
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-auto block object-cover"
            style={{ filter: 'brightness(0.88) contrast(1.05) saturate(0.92)' }}
          />
          {/* bottom-fade depth cue */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)' }} />
          {/* glass highlight */}
          <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 46%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function FloatingCardsHero({ hero }: { hero: SiteContent['hero'] }) {
  const containerRef = useRef<HTMLElement>(null)

  // Raw mouse position → spring-smoothed → per-card parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 22, stiffness: 110 })
  const smoothY = useSpring(mouseY, { damping: 22, stiffness: 110 })

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  const handleMouseLeave = () => {
    mouseX.set(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
    mouseY.set(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
  }

  const cards = (hero.floatingCards ?? []).slice(0, 5)

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 46%, rgba(197,164,126,0.07) 0%, transparent 68%)' }}
      />

      {/* ── Floating product cards ── */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {cards.map((card, i) => (
            <ProductCard
              key={i}
              src={card.src}
              cfg={CARD_DEFAULTS[i]}
              smoothX={smoothX}
              smoothY={smoothY}
              index={i}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Mid-ground text (z-10) ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 select-none"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Badge */}
        <p
          className="font-body uppercase tracking-[0.45em] text-[11px] mb-7"
          style={{ color: '#C5A47E' }}
        >
          {hero.badge}
        </p>

        {/* Headline */}
        <h1 className="font-headline leading-[0.88] tracking-tighter" dir="ltr">
          <span
            className="block font-extrabold text-white"
            style={{ fontSize: 'clamp(5rem, 13vw, 10.5rem)', textShadow: '0 0 30px rgba(255,183,128,0.14)' }}
          >
            {hero.title}
          </span>
          <span
            className="block font-light italic"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', color: '#C5A47E' }}
          >
            {hero.titleItalic}
          </span>
        </h1>

        {/* "Creative AI" — directly below Tahel */}
        <span
          className="font-body uppercase tracking-[0.6em] text-[10px] mt-3 mb-9 block"
          style={{ color: 'rgba(197,164,126,0.55)' }}
          dir="ltr"
        >
          Creative&nbsp;&nbsp;AI
        </span>

        {/* Subtitle */}
        <p
          className="font-headline text-xl md:text-2xl max-w-md leading-relaxed mb-11"
          style={{ color: 'rgba(255,220,199,0.80)' }}
        >
          {hero.subtitle}
        </p>

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, backgroundColor: '#D4B48E' }}
          whileTap={{ scale: 0.96 }}
          className="px-10 py-3.5 rounded-full font-body font-semibold text-sm text-black inline-block transition-colors"
          style={{ backgroundColor: '#C5A47E' }}
        >
          {hero.ctaButton}
        </motion.a>
      </motion.div>

      {/* Scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
