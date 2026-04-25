'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OrbProps {
  position: [number, number, number]
  scale: number
  speed: number
  phaseOffset: number
  amplitude: number
}

function Orb({ position, scale, speed, phaseOffset, amplitude }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(t * speed + phaseOffset) * amplitude
    meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.7 + phaseOffset) * (amplitude * 0.5)
    meshRef.current.rotation.y += 0.002
    meshRef.current.rotation.x += 0.001
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#A0622E"
        emissive="#5C3D28"
        emissiveIntensity={0.4}
        transparent
        opacity={0.15}
        wireframe={false}
      />
    </mesh>
  )
}

export default function FloatingOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#C89060" />

      {/* Orb 1 — large, center-left */}
      <Orb
        position={[-2.5, 0.5, -1]}
        scale={2.2}
        speed={0.4}
        phaseOffset={0}
        amplitude={0.6}
      />

      {/* Orb 2 — medium, right */}
      <Orb
        position={[3, -0.8, -2]}
        scale={1.4}
        speed={0.55}
        phaseOffset={2.1}
        amplitude={0.45}
      />

      {/* Orb 3 — small, top center */}
      <Orb
        position={[0.5, 2, -1.5]}
        scale={0.9}
        speed={0.65}
        phaseOffset={4.2}
        amplitude={0.35}
      />
    </Canvas>
  )
}
