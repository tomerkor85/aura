'use client'

import { useEffect, useRef } from 'react'

interface Props {
  onComplete: () => void
}

export default function IntroOverlay({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return

    // The CSS animation iris-open runs in REVERSE: circle goes from 100% → 0%
    // giving the "aperture closing inward" reveal. We unmount after it ends.
    const handleEnd = () => {
      onComplete()
    }

    el.addEventListener('animationend', handleEnd, { once: true })
    return () => el.removeEventListener('animationend', handleEnd)
  }, [onComplete])

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
      <span className="intro-overlay__logo">אורה</span>
    </div>
  )
}
