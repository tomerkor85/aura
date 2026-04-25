'use client'

import { motion, useScroll, useTransform, useSpring, useTime, MotionValue } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface TileShape {
  /** Position is given in % of the layer container, from the inline-start side. */
  inlineStart: number
  blockStart: number
  width: number
  height: number
}

const SHAPES: TileShape[] = [
  // Asymmetric bento — 7 tiles, no overlap, ~92% coverage.
  { inlineStart: 1,  blockStart: 5,  width: 30, height: 55 }, // A — large vertical, leading column
  { inlineStart: 1,  blockStart: 63, width: 30, height: 32 }, // B — medium below A
  { inlineStart: 33, blockStart: 5,  width: 38, height: 24 }, // C — wide banner top-center
  { inlineStart: 33, blockStart: 32, width: 25, height: 35 }, // D — square center
  { inlineStart: 60, blockStart: 32, width: 11, height: 35 }, // E — slim portrait beside D
  { inlineStart: 33, blockStart: 70, width: 38, height: 25 }, // F — wide bottom
  { inlineStart: 73, blockStart: 5,  width: 26, height: 90 }, // G — full-height trailing column
]

/** Three layers of distinct images. Front first; mosaic rotates as you scroll. */
const LAYER_IMAGES = [
  // Layer 0 — first to be seen
  ['/images/w3.webp', '/images/w7.webp', '/images/w11.webp', '/images/w15.webp', '/images/w19.webp', '/images/w23.webp', '/images/w27.webp'],
  // Layer 1 — revealed as 0 zooms past
  ['/images/w5.webp', '/images/w9.webp', '/images/w13.webp', '/images/w17.webp', '/images/w21.webp', '/images/w25.webp', '/images/w29.webp'],
  // Layer 2 — revealed as 1 advances
  ['/images/w1.webp', '/images/w6.webp', '/images/w14.webp', '/images/w22.webp', '/images/w31.webp', '/images/w34.webp', '/images/w8.webp'],
  // Layer 3 — last to emerge
  ['/images/w2.webp', '/images/w16.webp', '/images/w20.webp', '/images/w24.webp', '/images/w33.webp', '/images/w35.webp', '/images/w36.webp'],
]

const N_LAYERS = LAYER_IMAGES.length // 4

/**
 * MosaicLayer — fixed-position perspective stack of bento layers.
 *
 *  • Each layer cycles through depth as you scroll:  far → mid → near → past-camera.
 *  • When a layer "passes the camera" it wraps to the back, so the stream is endless
 *    over the lifetime of a page scroll.
 *  • Each tile within a layer also drifts side-to-side, scaled by depth, so the
 *    mosaic feels alive even when scroll is paused.
 */
export default function MosaicLayer() {
  // Defer the motion-driven render until after hydration so SSR and CSR can't
  // diverge on tiny floating-point transforms.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="mosaic-root" aria-hidden="true">
        <div className="mosaic-dimmer" />
        <div className="mosaic-edge-fade" />
      </div>
    )
  }

  return <MosaicLayerInner />
}

function MosaicLayerInner() {
  const { scrollYProgress } = useScroll()
  const time = useTime()

  // Smooth out scroll so depth motion never jitters even with fast wheel input.
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 })

  return (
    <div className="mosaic-root" aria-hidden="true">
      <div className="mosaic-stage">
        {LAYER_IMAGES.map((images, i) => (
          <Layer key={i} index={i} images={images} progress={smooth} time={time} />
        ))}
      </div>
      <div className="mosaic-dimmer" />
      <div className="mosaic-edge-fade" />
    </div>
  )
}

interface LayerProps {
  index: number
  images: string[]
  progress: MotionValue<number>
  time: MotionValue<number>
}

function Layer({ index, images, progress, time }: LayerProps) {
  /**
   * Each layer occupies a "slot" in [0..1]. Slot advances with scroll:
   *   slot = (scrollProgress + i / N_LAYERS) mod 1
   * • slot 0.0 → layer is far back (z = -1400, blurred, dim)
   * • slot 0.5 → layer is the focal one  (z = -200, sharp)
   * • slot 0.9 → layer has zoomed past   (z = +600, faded, blurred again)
   * • slot wraps back to 0 → reappears at the back, ready for another pass.
   */
  const slot = useTransform(progress, (p) => {
    const raw = p + index / N_LAYERS
    return raw - Math.floor(raw)
  })

  // Map slot → 3D translateZ.  Negative = behind the camera.
  const z = useTransform(slot, [0, 0.5, 1], [-1400, -200, 600])

  // Opacity rises near focal slot, falls at extremes (so wrap is invisible).
  const opacity = useTransform(slot, [0, 0.1, 0.45, 0.78, 0.95, 1], [0, 0.12, 1, 0.78, 0, 0])

  // Keep focus transitions visible but avoid "smear" during motion.
  const blur = useTransform(slot, [0, 0.22, 0.5, 0.78, 1], [1.4, 0.45, 0, 0.55, 1.8])
  const filter = useTransform(blur, (b) => `blur(${b.toFixed(1)}px)`)

  // Scroll-linked sweep of the whole layer (RTL-aware: positive = visual right).
  const baseLayerX = useTransform(slot, [0, 0.5, 1], [-40, 0, 40])

  // Keep layers gently alive even when user is not scrolling.
  const layerX = useTransform([baseLayerX, time], (latest) => {
    const [x, t] = latest as [number, number]
    return x + Math.sin(t / 3000 + index * 0.8) * 6
  })
  const layerY = useTransform(time, (t) => Math.cos(t / 3600 + index * 0.7) * 2.5)

  return (
    <motion.div
      className="mosaic-layer"
      style={{
        translateZ: z,
        x: layerX,
        y: layerY,
        opacity,
        filter,
      }}
    >
      {SHAPES.map((shape, t) => (
        <Tile key={`${index}-${t}`} shape={shape} src={images[t]} progress={progress} time={time} seed={index * 7 + t} />
      ))}
    </motion.div>
  )
}

interface TileProps {
  shape: TileShape
  src: string
  progress: MotionValue<number>
  time: MotionValue<number>
  seed: number
}

function Tile({ shape, src, progress, time, seed }: TileProps) {
  // Each tile gets unique drift parameters from a deterministic seed → no Math.random
  // (would re-shuffle every render and cause SSR mismatch).
  const params = useMemo(() => {
    const phase = ((seed * 73) % 100) / 100
    const ampX = 12 + ((seed * 17) % 28) // px
    const ampY = 6 + ((seed * 11) % 14)
    const speed = 1 + ((seed * 5) % 7) / 10
    return { phase, ampX, ampY, speed }
  }, [seed])

  // Scroll-driven tile drift stays as the primary motion.
  const scrollX = useTransform(
    progress,
    (p) => Math.sin((p * params.speed + params.phase) * Math.PI * 2) * params.ampX,
  )

  // Add subtle idle movement so scene does not freeze when scroll stops.
  const idleX = useTransform(
    time,
    (t) => Math.sin((t / 1000) * (0.36 * params.speed) + params.phase * Math.PI * 2) * (params.ampX * 0.22),
  )
  const tileX = useTransform([scrollX, idleX], (latest) => {
    const [sx, ix] = latest as [number, number]
    return sx + ix
  })
  const tileY = useTransform(
    time,
    (t) => Math.cos((t / 1000) * (0.3 * params.speed) + params.phase * Math.PI * 2) * (params.ampY * 0.26),
  )

  return (
    <motion.figure
      className="mosaic-tile"
      style={{
        insetInlineStart: `${shape.inlineStart}%`,
        top: `${shape.blockStart}%`,
        width: `${shape.width}%`,
        height: `${shape.height}%`,
        x: tileX,
        y: tileY,
      }}
    >
      <img src={src} alt="" loading="lazy" />
    </motion.figure>
  )
}
