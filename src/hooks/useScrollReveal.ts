'use client'
import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — attaches IntersectionObserver to a single element ref.
 * Adds 'reveal' class on mount (hidden state) and 'visible' once in viewport.
 */
export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px'
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

/**
 * useStaggerReveal — observes all [data-reveal] children inside a container,
 * applies staggered transitionDelay before adding 'visible'.
 */
export function useStaggerReveal<T extends HTMLElement>(
  staggerMs = 120,
  threshold = 0.1
) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'))

    items.forEach((item) => {
      item.classList.add('reveal')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = items.indexOf(el)
            el.style.transitionDelay = `${index * staggerMs}ms`
            el.classList.add('visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [staggerMs, threshold])

  return containerRef
}
