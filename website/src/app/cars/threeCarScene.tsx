// ThreeCarScene.tsx
import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei'
import GreenFalcon from './greenFalcon'
import GreenThunder from './greenThunder'
import GreenSpirit from './greenSpirit'
import GreenLightning from './greenLightning'

// Fade timing constants (in milliseconds)
const FADE_OUT = 200           // fade-out duration
const FADE_IN_DELAY = 100     // delay between fade-out and fade-in
const FADE_IN = 200           // fade-in duration

// Data for each car scene
const carData = [
  { name: 'Green Falcon', description: <GreenFalcon /> },
  { name: 'Green Thunder', description: <GreenThunder /> },
  { name: 'Green Spirit', description: <GreenSpirit /> },
  { name: 'Green Lightning', description: <GreenLightning /> },
]

// Loads and displays each GLTF model with tinting
function SolarCar({ url, tint = 1, position = [0, -2, 0] , scale = 1, rotate = 0}: { url: string; tint?: number; position?: [number, number, number]; scale?: number;  rotate?: number;}) {
  const { scene } = useGLTF(url) as { scene: THREE.Group }
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => {
              mat.side = THREE.DoubleSide
            })
          } else {
            mesh.material.side = THREE.DoubleSide
          }
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color.setScalar(tint)
          }
          mesh.castShadow = true
          mesh.receiveShadow = true
        }
      })
    }
  })

  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      scale={[scale, scale, scale]}
      position={position}
      rotation={[0, rotate, 0]}
    />
  )
}

// Groups cars and moves them along the Z axis
function Scene({ offsetZ }: { offsetZ: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const targetPos = new THREE.Vector3(0, 0, offsetZ)

  useFrame(() => {
    if (groupRef.current) groupRef.current.position.lerp(targetPos, 0.1)
  })

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight intensity={5.6} position={[0, 50, 5]} color="#ffffff" />
      <Suspense fallback={null}>
        <group ref={groupRef} position={[0, 0, 0]}>
          <SolarCar url="/GF.glb" position={[0, 0, 100]} scale={35} rotate={-Math.PI/2} />
          <SolarCar url="/GT.glb" position={[0, 0, -100]}scale={35}  rotate={-Math.PI/2}/>
          <SolarCar url="/GS.glb" position={[0, 0, -320]} scale={35}   rotate={-Math.PI/2}/>
          <SolarCar url="/GL.glb" position={[0, 0, -520]} scale={35}  rotate={-Math.PI/2} />
        </group>
        <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[10000, 10000]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </Suspense>
    </>
  )
}

// Keeps camera focused at a fixed point
function CameraController() {
  const { camera } = useThree()
  useEffect(() => {
    camera.lookAt(new THREE.Vector3(0, 0, 30))
  }, [camera])
  return null
}

// Main component
export default function ThreeCarScene() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [descVisible, setDescVisible] = useState(true)
  const [displayDesc, setDisplayDesc] = useState<React.ReactNode>(carData[0].description)
  const offsetZ = currentIndex * 200

  const handleNext = useCallback(() => {
    setCurrentIndex(i => Math.min(i + 1, carData.length - 1))
  }, [])

  const handlePrevious = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0))
  }, [])

  // Fade logic on index change
  useEffect(() => {
    setDescVisible(false)
    const outTimer = setTimeout(() => {
      setDisplayDesc(carData[currentIndex].description)
      const inTimer = setTimeout(() => {
        setDescVisible(true)
      }, FADE_IN_DELAY)
      return () => clearTimeout(inTimer)
    }, FADE_OUT)
    return () => clearTimeout(outTimer)
  }, [currentIndex])

  const prevName = currentIndex > 0 ? carData[currentIndex - 1].name : null
  const nextName = currentIndex < carData.length - 1 ? carData[currentIndex + 1].name : null

  return (
    <>
      {/* 3D Canvas */}
      <div style={{ width: '100%', height: '60vh', position: 'relative' }}>
        <Canvas
          shadows
          camera={{ position: [120, 40, 100], fov: 40, near: 0.1, far: 1000 }}
        >
          <CameraController />
          <color attach="background" args={["#0a0a0a"]} />
          <fog attach="fog" args={["#0a0a0a", 0, 400]} />
          <group position={[0, -0.5, 0]}>
            <Scene offsetZ={offsetZ} />
          </group>
        </Canvas>

        {/* Navigation Buttons */}
        <div className="absolute bottom-16 w-full flex justify-between px-8 z-10">
          <div>
            {prevName && (
              <button
                className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handlePrevious}
              >
                {prevName}
              </button>
            )}
          </div>
          <div>
            {nextName && (
              <button
                className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleNext}
              >
                {nextName}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Description Panel Below */}
      <div
        className="w-full px-6 py-4 bg-[var(--background)] text-white text-center text-base mt-4"
        style={{
          opacity: descVisible ? 1 : 0,
          transition: `opacity ${descVisible ? FADE_IN : FADE_OUT}ms ease-in-out`
        }}
      >
        {displayDesc}
      </div>
    </>
  )
}
