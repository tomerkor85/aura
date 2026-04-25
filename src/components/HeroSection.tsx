'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const FloatingPlanes = dynamic(() => import('./FloatingPlanes'), { ssr: false })

interface Props {
  opened: boolean
}

export default function HeroSection({ opened }: Props) {
  return (
    <section className="hero" id="hero" aria-label="כותרת ראשית">
      {/* Three.js floating planes background */}
      <div className="hero__canvas">
        <FloatingPlanes />
      </div>

      {/* Bottom fade gradient */}
      <div className="hero__gradient" aria-hidden="true" />

      {/* Main text — only animates in after iris opens */}
      <div className="hero__content">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="hero__title hero__title--outlined">
            הנראות שלך
          </span>
          <span className="hero__title hero__title--filled">
            מגיעה לרמה אחרת
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero__divider" aria-hidden="true" />
          <p className="hero__scroll-hint">גללי למטה</p>
        </motion.div>
      </div>

      {/* Subtle credit — bottom corner */}
      <motion.span
        className="hero__credit"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      >
        Tahel
      </motion.span>
    </section>
  )
}
