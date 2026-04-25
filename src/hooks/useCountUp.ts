'use client'
import { useState, useEffect, useRef } from 'react'

/**
 * useCountUp — animates a numeric value from 0 to `target` over `duration` ms
 * when the element enters the viewport. Returns [displayValue, ref].
 */
export function useCountUp(
  target: number,
  duration = 2000,
  suffix = ''
): [string, React.RefObject<HTMLElement>] {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setValue(target)
            }
          }

          requestAnimationFrame(tick)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [value + suffix, ref as React.RefObject<HTMLElement>]
}
