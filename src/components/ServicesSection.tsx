'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    number: '01',
    title: 'בניית נוכחות מלאה',
    desc: 'שפה ויזואלית שמספרת מי אתה',
    bg: '#1A1814',
  },
  {
    number: '02',
    title: 'מערכת תמונות AI',
    desc: 'תמונות לפי דרישה, מדויקות לשפת המותג',
    bg: '#2C2520',
  },
  {
    number: '03',
    title: 'תוכן ויזואלי לעסקים',
    desc: 'מוצר, סושיאל, סרטון, קטלוג',
    bg: '#1A1814',
  },
  {
    number: '04',
    title: 'קמפיין מותגי',
    desc: 'מהקונספט עד לנכס המוכן להפצה',
    bg: '#2C2520',
  },
]

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef })

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      // Map 0–1 to 0–3
      const idx = Math.min(Math.floor(v * SERVICES.length), SERVICES.length - 1)
      setActiveIdx(idx)
    })
  }, [scrollYProgress])

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%']
  )

  /* ── Mobile: simple vertical list ──────────────────────────── */
  if (isMobile) {
    return (
      <section id="services" aria-label="שירותים">
        {SERVICES.map((s) => (
          <div
            key={s.number}
            style={{ background: s.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', position: 'relative', overflow: 'hidden' }}
          >
            <span className="services__ghost-number">{s.number}</span>
            <div className="services__content">
              <h2 className="services__title">{s.title}</h2>
              <p className="services__desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>
    )
  }

  /* ── Desktop: pinned scroll chapters ───────────────────────── */
  return (
    <section
      id="services"
      className="services"
      ref={containerRef}
      style={{ height: '400vh' }}
      aria-label="שירותים"
    >
      <div className="services__sticky">
        <AnimatePresence mode="wait">
          {SERVICES.map((service, i) =>
            i === activeIdx ? (
              <motion.div
                key={service.number}
                className="services__panel"
                style={{ background: service.bg }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="services__ghost-number" aria-hidden="true">
                  {service.number}
                </span>
                <div className="services__content">
                  <motion.h2
                    className="services__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {service.title}
                  </motion.h2>
                  <motion.p
                    className="services__desc"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {service.desc}
                  </motion.p>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Amber progress line */}
        <motion.div
          className="services__progress-bar"
          style={{ width: progressWidth }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
