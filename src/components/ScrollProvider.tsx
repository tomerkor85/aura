'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'

export interface ScrollState {
  progress: number
  velocity: number
  scrollY: number
}

const ScrollContext = createContext<MutableRefObject<ScrollState> | null>(null)

export function useScrollState(): MutableRefObject<ScrollState> {
  const ctx = useContext(ScrollContext)
  if (!ctx) {
    throw new Error('useScrollState must be used inside <ScrollProvider>')
  }
  return ctx
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<ScrollState>({ progress: 0, velocity: 0, scrollY: 0 })

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('lenis')

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      const limit = lenis.limit || 1
      stateRef.current.progress = Math.min(1, Math.max(0, lenis.scroll / limit))
      stateRef.current.velocity = lenis.velocity
      stateRef.current.scrollY = lenis.scroll
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      html.classList.remove('lenis')
    }
  }, [])

  return <ScrollContext.Provider value={stateRef}>{children}</ScrollContext.Provider>
}
