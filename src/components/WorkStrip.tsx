'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CARDS = [
  { seed: 'tahel1', badge: 'תמונות AI',      title: 'זהות מותגית חדשה' },
  { seed: 'tahel2', badge: 'סרטון מוצר',     title: 'קולקציית קיץ 2026' },
  { seed: 'tahel3', badge: 'פרסומת',          title: 'קמפיין לוקג\'ה' },
  { seed: 'tahel4', badge: 'תוכן סושיאל',    title: 'רשת חנויות בוטיק' },
  { seed: 'tahel5', badge: 'קטלוג',           title: 'אוסף ריהוט מינימלי' },
  { seed: 'tahel6', badge: 'מיתוג מוצר',      title: 'מוצר טיפוח יוקרתי' },
  { seed: 'tahel7', badge: 'רילז + סטורי',    title: 'אופנת ים 2026' },
  { seed: 'tahel8', badge: 'מגזין ויזואלי',   title: 'לייפסטייל ועיצוב' },
]

const CARD_VW = 0.85 // each card = 85vw

export default function WorkStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile]   = useState(false)
  const [maxShift, setMaxShift]   = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    function recalculate() {
      const w = window.innerWidth
      setIsMobile(w < 768)
      const trackPx = CARDS.length * CARD_VW * w
      setMaxShift(Math.max(0, trackPx - w))
    }
    recalculate()
    window.addEventListener('resize', recalculate, { passive: true })
    return () => window.removeEventListener('resize', recalculate)
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setActiveIdx(Math.round(v * (CARDS.length - 1)))
    })
  }, [scrollYProgress])

  /* ── Mobile: vertical stack ───────────────────────────────── */
  if (isMobile) {
    return (
      <section id="work" aria-label="עבודות" style={{ display: 'flex', flexDirection: 'column' }}>
        {CARDS.map((card) => (
          <div
            key={card.seed}
            className="work-card"
            style={{ width: '100%', height: '70vw', minHeight: 260 }}
          >
            <img
              src={`https://picsum.photos/seed/${card.seed}/900/600`}
              alt={card.title}
              className="work-card__image"
              loading="lazy"
            />
            <div className="work-card__overlay" aria-hidden="true" />
            <div className="work-card__info">
              <span className="work-card__badge">{card.badge}</span>
              <h3 className="work-card__title">{card.title}</h3>
            </div>
          </div>
        ))}
      </section>
    )
  }

  /* ── Desktop: horizontal scroll strip ────────────────────── */
  return (
    <section
      id="work"
      className="work-strip"
      ref={containerRef}
      style={{ height: '500vh' }}
      aria-label="עבודות"
    >
      <div className="work-strip__sticky">
        <motion.div
          className="work-strip__track"
          style={{ x }}
        >
          {CARDS.map((card) => (
            <div key={card.seed} className="work-card">
              <img
                src={`https://picsum.photos/seed/${card.seed}/1400/900`}
                alt={card.title}
                className="work-card__image"
                loading="lazy"
              />
              <div className="work-card__overlay" aria-hidden="true" />
              <div className="work-card__info">
                <span className="work-card__badge">{card.badge}</span>
                <h3 className="work-card__title">{card.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress dots */}
        <div className="work-strip__progress" aria-hidden="true">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className={`work-strip__dot${i === activeIdx ? ' work-strip__dot--active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
