'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WHATSAPP_URL = 'https://wa.me/972501234567?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%98%D7%94%D7%9C%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D'

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section className="cta" id="cta" ref={ref} aria-label="יצירת קשר">
      {/* Ambient glow */}
      <div className="cta__glow" aria-hidden="true" />

      <motion.h2
        className="cta__question"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        מוכנה?
      </motion.h2>

      <motion.p
        className="cta__sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        בואי נדבר על הנראות של העסק שלך
      </motion.p>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cta__whatsapp"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-label="שלחי הודעה בוואטסאפ"
      >
        שלחי הודעה
      </motion.a>

      {/* Footer */}
      <footer className="footer" aria-label="פוטר">
        <span className="footer__logo" aria-label="אורה">אורה</span>

        <ul className="footer__links">
          <li><a href="#work">פורטפוליו</a></li>
          <li><a href="#services">שירותים</a></li>
          <li><a href="#cta">צור קשר</a></li>
          <li><a href="/privacy">מדיניות פרטיות</a></li>
        </ul>

        <span className="footer__copy">© 2026 Aura by Tahel</span>
      </footer>
    </section>
  )
}
