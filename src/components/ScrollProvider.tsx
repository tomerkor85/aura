'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from 'react'

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
    let rafId = 0
    let prevY = window.scrollY
    let prevTime = performance.now()

    const tick = (now: number) => {
      const scrollY = window.scrollY
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const dt = Math.max(1, now - prevTime)
      const velocity = (scrollY - prevY) / dt

      stateRef.current.scrollY = scrollY
      stateRef.current.progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      stateRef.current.velocity = velocity

      prevY = scrollY
      prevTime = now
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <ScrollContext.Provider value={stateRef}>{children}</ScrollContext.Provider>
}
