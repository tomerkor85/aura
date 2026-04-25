'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three'
import { useScrollState } from './ScrollProvider'

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function Crystal() {
  const ref = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScrollState()

  useFrame(({ clock, pointer }) => {
    if (!ref.current || !groupRef.current) return
    const t = clock.getElapsedTime()
    const p = scroll.current.progress

    // RTL-aware travel arc: starts center, drifts right (positive x in world =
    // visual right), then sweeps left across the page, then settles.
    const targetX = Math.sin(p * Math.PI * 2) * 2.6
    const targetY = -p * 1.0 + Math.sin(t * 0.25) * 0.12
    const targetZ = Math.sin(p * Math.PI) * -0.8

    groupRef.current.position.x = lerp(groupRef.current.position.x, targetX, 0.06)
    groupRef.current.position.y = lerp(groupRef.current.position.y, targetY, 0.06)
    groupRef.current.position.z = lerp(groupRef.current.position.z, targetZ, 0.06)

    const targetScale = 1 + Math.sin(p * Math.PI) * 0.35 - p * 0.15
    const s = lerp(ref.current.scale.x, targetScale, 0.06)
    ref.current.scale.setScalar(s)

    ref.current.rotation.y = t * 0.13 + p * Math.PI * 1.6
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.12 + p * 0.55
    ref.current.rotation.z += (pointer.x * 0.18 - ref.current.rotation.z) * 0.03
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.35}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[1.55, 8]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.6}
            roughness={0.06}
            ior={1.55}
            chromaticAberration={0.7}
            anisotropy={0.35}
            anisotropicBlur={0.2}
            distortion={0.45}
            distortionScale={0.45}
            temporalDistortion={0.18}
            backside
            backsideThickness={0.6}
            color="#f5e1c8"
            attenuationColor="#a0622e"
            attenuationDistance={1.1}
            samples={6}
          />
        </mesh>
      </Float>
    </group>
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
  const scroll = useScrollState()

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const p = scroll.current.progress

    // Backdrop ring spins gently as the page progresses, plus pointer parallax.
    const targetRotY = pointer.x * 0.12 + p * Math.PI * 0.9
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetRotY, 0.04)
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, p * 0.15, 0.04)

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
  const COUNT = 1600

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
        uScroll: { value: 0 },
        uColor: { value: new THREE.Color('#ffb780') },
      },
      vertexShader: /* glsl */ `
        attribute float aScale;
        attribute float aOffset;
        uniform float uTime;
        uniform float uScroll;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += mod(uTime * 0.18 + aOffset, 10.0) - 5.0;
          p.x += sin(uTime * 0.35 + aOffset) * 0.25 + uScroll * 1.4 * sin(aOffset);
          p.z += uScroll * 0.6 * cos(aOffset * 0.5);
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

  const scroll = useScrollState()

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const mat = pointsRef.current.material as THREE.ShaderMaterial
    if (mat.uniforms?.uTime) mat.uniforms.uTime.value = clock.getElapsedTime()
    if (mat.uniforms?.uScroll) mat.uniforms.uScroll.value = scroll.current.progress
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-aScale" count={COUNT} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-aOffset" count={COUNT} array={offsets} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} />
    </points>
  )
}

function ScrollCameraRig() {
  const scroll = useScrollState()

  useFrame(({ camera, pointer }) => {
    const p = scroll.current.progress

    // Camera path:
    //   z dollies out and comes back   (5 → 7.5 → 5)
    //   x sweeps opposite to the crystal so the parallax feels alive
    //   y drifts down slightly across the page
    const targetZ = 5 + Math.sin(p * Math.PI) * 2.5
    const targetX = -Math.sin(p * Math.PI * 2) * 1.4 + pointer.x * 0.6
    const targetY = -p * 0.4 + pointer.y * 0.3

    camera.position.x = lerp(camera.position.x, targetX, 0.05)
    camera.position.y = lerp(camera.position.y, targetY, 0.05)
    camera.position.z = lerp(camera.position.z, targetZ, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function ScrollBloom() {
  const scroll = useScrollState()
  const ref = useRef<{ intensity: number } | null>(null)

  useFrame(() => {
    if (!ref.current) return
    const p = scroll.current.progress
    // Bloom pulses across the page: cool → bright → soft → bright again.
    const target = 0.55 + Math.sin(p * Math.PI * 2) * 0.55 + p * 0.15
    ref.current.intensity = lerp(ref.current.intensity, target, 0.05)
  })

  return (
    <Bloom
      ref={ref as never}
      intensity={0.75}
      luminanceThreshold={0.55}
      luminanceSmoothing={0.4}
      kernelSize={KernelSize.LARGE}
      mipmapBlur
    />
  )
}

export default function SceneCanvasInner({ portraits }: { portraits: string[] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 5, 3]} intensity={1.4} color="#ffb780" />
      <directionalLight position={[-5, -2, 4]} intensity={0.55} color="#5C3D28" />
      <pointLight position={[0, 0, 2.5]} intensity={1.4} color="#C89060" distance={6} decay={2} />

      <Suspense fallback={null}>
        <Environment preset="warehouse" environmentIntensity={0.85} />
        {portraits.length > 0 && <PortraitBackdrop portraits={portraits} />}
        <Crystal />
        <ParticleDust />
      </Suspense>

      <ScrollCameraRig />

      <EffectComposer multisampling={0}>
        <ScrollBloom />
        <ChromaticAberration
          offset={[0.0009, 0.0009] as unknown as THREE.Vector2}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.15} darkness={0.88} />
        <Noise opacity={0.022} />
      </EffectComposer>
    </Canvas>
  )
}
