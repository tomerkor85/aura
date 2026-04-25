'use client'

import dynamic from 'next/dynamic'

const SceneCanvasInner = dynamic(() => import('./SceneCanvasInner'), {
  ssr: false,
  loading: () => null,
})

export default function SceneCanvas({ portraits }: { portraits: string[] }) {
  return <SceneCanvasInner portraits={portraits} />
}
