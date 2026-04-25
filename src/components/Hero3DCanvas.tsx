'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function Crystal() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.13
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.12
    ref.current.rotation.z += (pointer.x * 0.18 - ref.current.rotation.z) * 0.03
  })

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.35}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.55, 4]} />
        <meshPhysicalMaterial
          transmission={0.95}
          thickness={1.4}
          roughness={0.08}
          metalness={0.05}
          ior={1.55}
          attenuationColor={new THREE.Color('#a0622e')}
          attenuationDistance={1.4}
          color={new THREE.Color('#f5e1c8')}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={0.6}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 800]}
          envMapIntensity={1.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}

interface CardData {
  pos: [number, number, number]
  rot: [number, number, number]
  size: [number, number]
  tex: THREE.Texture
  speed: number
  offset: number
}

function PortraitBackdrop({ portraits }: { portraits: string[] }) {
  const textures = useTexture(portraits) as THREE.Texture[]
  textures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
  })

  const cards = useMemo<CardData[]>(() => {
    return portraits.map((_, i) => {
      const angle = (i / portraits.length) * Math.PI * 2 + 0.4
      const r = 4.6
      return {
        pos: [Math.cos(angle) * r, Math.sin(angle * 0.7) * 1.4, -3.2 - Math.sin(angle) * 1.6],
        rot: [0, -angle * 0.35 + 0.18, (i % 2 === 0 ? -1 : 1) * 0.18],
        size: [2.3, 3.1],
        tex: textures[i],
        speed: 0.28 + i * 0.06,
        offset: i * 1.7,
      }
    })
  }, [portraits, textures])

  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y += (pointer.x * 0.12 - groupRef.current.rotation.y) * 0.02
    groupRef.current.children.forEach((child, i) => {
      const c = cards[i]
      if (!c) return
      child.position.y = c.pos[1] + Math.sin(t * c.speed + c.offset) * 0.22
    })
  })

  return (
    <group ref={groupRef}>
      {cards.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={c.rot}>
          <planeGeometry args={c.size} />
          <meshBasicMaterial
            map={c.tex}
            transparent
            opacity={0.42}
            toneMapped
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function ParticleDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const COUNT = 1200

  const { positions, scales, offsets } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const scales = new Float32Array(COUNT)
    const offsets = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      scales[i] = Math.random() * 0.7 + 0.3
      offsets[i] = Math.random() * 100
    }
    return { positions, scales, offsets }
  }, [])

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#ffb780') },
      },
      vertexShader: /* glsl */ `
        attribute float aScale;
        attribute float aOffset;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += mod(uTime * 0.18 + aOffset, 10.0) - 5.0;
          p.x += sin(uTime * 0.35 + aOffset) * 0.25;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aScale * 9.0 * (1.0 / -mv.z);
          vAlpha = 1.0 - clamp(abs(p.y) / 5.0, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float intensity = pow(1.0 - d * 2.0, 2.2);
          gl_FragColor = vec4(uColor, intensity * vAlpha * 0.65);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const mat = pointsRef.current.material as THREE.ShaderMaterial
    if (mat.uniforms?.uTime) mat.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={COUNT} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-aOffset" count={COUNT} array={offsets} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} />
    </points>
  )
}

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.035
    camera.position.y += (pointer.y * 0.35 - camera.position.y) * 0.035
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero3DCanvas({ portraits }: { portraits: string[] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#0c0a09']} />

      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 5, 3]} intensity={1.4} color="#ffb780" />
      <directionalLight position={[-5, -2, 4]} intensity={0.55} color="#5C3D28" />
      <pointLight position={[0, 0, 2.5]} intensity={1.4} color="#C89060" distance={6} decay={2} />

      <Suspense fallback={null}>
        <Environment preset="warehouse" environmentIntensity={0.85} />
        {portraits.length > 0 && <PortraitBackdrop portraits={portraits} />}
        <Halo />
        <Crystal />
        <ParticleDust />
      </Suspense>

      <CameraRig />
    </Canvas>
  )
}

function Halo() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const s = 1 + Math.sin(t * 0.6) * 0.04
    ref.current.scale.set(s, s, s)
  })
  return (
    <mesh ref={ref} position={[0, 0, -0.5]}>
      <sphereGeometry args={[1.85, 64, 64]} />
      <meshBasicMaterial
        color="#ffb780"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
