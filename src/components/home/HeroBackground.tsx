'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 palette(float t) {
    vec3 a = vec3(0.96, 0.95, 0.93);
    vec3 b = vec3(0.04, 0.04, 0.04);
    vec3 c = vec3(0.5, 0.5, 0.5);
    vec3 d = vec3(0.106, 0.227, 0.176);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = vUv;
    float n = sin(uv.x * 3.0 + uTime * 0.15) * 0.5 + 0.5;
    n += sin(uv.y * 2.0 - uTime * 0.1) * 0.3;
    n += sin((uv.x + uv.y) * 1.5 + uTime * 0.08) * 0.2;
    n = n * 0.5 + 0.25;
    vec3 color = palette(n);
    color = mix(vec3(0.96, 0.95, 0.93), color, 0.4);
    gl_FragColor = vec4(color, 1.0);
  }
`

function ShaderPlane(): ReactNode {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function HeroBackground(): ReactNode {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return <div className="absolute inset-0 bg-cream" />
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
