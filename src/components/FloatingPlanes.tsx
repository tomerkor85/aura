'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Seeded pseudo-random so planes are stable across renders ── */
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const WARM_COLORS = [
  '#5C3D28',
  '#A0622E',
  '#C89060',
  '#2C2520',
  '#D4B89A',
  '#7A4F32',
  '#3D2B1A',
]

interface PlaneData {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  color: string
  opacity: number
  floatSpeed: number
  floatOffset: number
}

function generatePlanes(): PlaneData[] {
  const rand = seededRandom(42)
  const planes: PlaneData[] = []

  const aspects: [number, number][] = [
    [0.8, 1.2],
    [1.6, 0.9],
    [1.0, 1.0],
    [1.2, 0.8],
    [0.9, 1.4],
    [1.4, 1.0],
  ]

  for (let i = 0; i < 16; i++) {
    const x = (rand() - 0.5) * 12
    const y = (rand() - 0.5) * 8
    const z = rand() * -10 + 2
    const rotX = (rand() - 0.5) * 0.6
    const rotY = (rand() - 0.5) * 0.6
    const aspect = aspects[Math.floor(rand() * aspects.length)]
    const color = WARM_COLORS[Math.floor(rand() * WARM_COLORS.length)]
    const opacity = 0.5 + rand() * 0.3

    planes.push({
      position: [x, y, z],
      rotation: [rotX, rotY, 0],
      size: aspect,
      color,
      opacity,
      floatSpeed: 0.3 + rand() * 0.4,
      floatOffset: rand() * Math.PI * 2,
    })
  }
  return planes
}

const PLANES = generatePlanes()

/* ── Noise DataTexture for grain overlay ─────────────────────── */
function createNoiseTexture(): THREE.DataTexture {
  const size = 64
  const data = new Uint8Array(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    const v = Math.floor(Math.random() * 256)
    data[i * 4]     = v
    data[i * 4 + 1] = v
    data[i * 4 + 2] = v
    data[i * 4 + 3] = 255
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
  tex.needsUpdate = true
  return tex
}

/* ── Individual floating plane mesh ─────────────────────────── */
function Plane({ data, noiseTexture }: { data: PlaneData; noiseTexture: THREE.DataTexture }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()
    mesh.position.y = data.position[1] + Math.sin(t * data.floatSpeed + data.floatOffset) * 0.18
  })

  return (
    <mesh
      ref={meshRef}
      position={data.position}
      rotation={data.rotation}
    >
      <planeGeometry args={data.size} />
      <meshBasicMaterial
        color={data.color}
        transparent
        opacity={data.opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ── Scene: group rotation + camera mouse lerp ───────────────── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const noiseTexture = useMemo(() => createNoiseTexture(), [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0004
    }
    // Camera lerps toward mouse (subtle parallax)
    const cam = camera as THREE.PerspectiveCamera
    cam.position.x += (mouse.current.x * 0.4 - cam.position.x) * 0.03
    cam.position.y += (-mouse.current.y * 0.2 - cam.position.y) * 0.03
  })

  return (
    <group ref={groupRef}>
      {PLANES.map((data, i) => (
        <Plane key={i} data={data} noiseTexture={noiseTexture} />
      ))}
    </group>
  )
}

/* ── Exported canvas component ───────────────────────────────── */
export default function FloatingPlanes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  )
}
