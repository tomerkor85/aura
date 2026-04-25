'use client'
import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Inner particle cloud component ─────────────────────────────────────── */
function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera } = useThree()

  // Target camera offset driven by mouse position
  const mouse = useRef({ x: 0, y: 0 })
  const cameraTarget = useRef({ x: 0, y: 0 })

  // Generate sphere-distributed particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 5
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  // Per-particle color: mix of amber, caramel, sand-drift
  const colors = useMemo(() => {
    const palette = [
      new THREE.Color('#A0622E'),
      new THREE.Color('#C89060'),
      new THREE.Color('#D4B89A'),
    ]
    const col = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return col
  }, [])

  // Mouse move listener — stored as ref, no re-render
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }, [])

  // Attach/detach mouse listener
  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [handleMouseMove])

  useFrame(() => {
    // Rotate particle cloud slowly on Y axis
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003
    }

    // Lerp camera toward mouse-driven target (max ±0.3 units)
    cameraTarget.current.x = mouse.current.x * 0.3
    cameraTarget.current.y = mouse.current.y * 0.3

    camera.position.x += (cameraTarget.current.x - camera.position.x) * 0.04
    camera.position.y += (cameraTarget.current.y - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return (
    <Points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.015}
        vertexColors
        transparent
        alphaTest={0.01}
        depthWrite={false}
        sizeAttenuation
      />
    </Points>
  )
}

/* ── Exported wrapper ────────────────────────────────────────────────────── */
export default function ParticleField() {
  return (
    <div className="particle-field-wrapper" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <ParticleCloud />
      </Canvas>
    </div>
  )
}
