'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

const FULL_TEXT = 'אני לא מייצרת יפה — אני מייצרת מדויק'
const CHAR_DELAY = 80 // ms per character

export default function PhilosophyScreen() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px' })

  const [displayed, setDisplayed]   = useState('')
  const [done, setDone]             = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!inView) return
    if (displayed.length > 0) return // already started

    let idx = 0
    intervalRef.current = setInterval(() => {
      idx++
      setDisplayed(FULL_TEXT.slice(0, idx))
      if (idx >= FULL_TEXT.length) {
        clearInterval(intervalRef.current!)
        // Small delay before showing attribution
        setTimeout(() => setDone(true), 400)
      }
    }, CHAR_DELAY)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  // We only want to trigger this once when inView becomes true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <section
      className="philosophy"
      id="about"
      ref={sectionRef}
      aria-label="הפילוסופיה"
    >
      <div className="philosophy__inner">
        <p className="philosophy__text" aria-label={FULL_TEXT}>
          <span aria-hidden="true">{displayed}</span>
          <span className="philosophy__cursor" aria-hidden="true">|</span>
          {/* Invisible full text for accessibility so screen readers get it immediately */}
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            {FULL_TEXT}
          </span>
        </p>

        <p className={`philosophy__attribution${done ? ' philosophy__attribution--visible' : ''}`}>
          — טהל, Aura Creative AI
        </p>
      </div>
    </section>
  )
}
