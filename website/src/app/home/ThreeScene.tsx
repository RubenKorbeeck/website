// ThreeScene.tsx
import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshReflectorMaterial, Text} from '@react-three/drei' 


// Zoom targets with descriptions and positions
const zoomTargets = [
  { position: new THREE.Vector3(60, 40, 80), lookAt: new THREE.Vector3(0, 0, 30), description: "You can see all parts of Green Falcon, Click previous or next to switch between mechanical/electrical components.", descStyle: { top: '70%', right: '5%' } },
  { position: new THREE.Vector3(60, 12, 27), lookAt: new THREE.Vector3(0, 0, 20), description: "Suspension Module: The suspension is one of the most important aspacts of the car. It keep sthe car from completely faling appart with high speeds.", descStyle: { top: '80%', right: '10%' } },
  { position: new THREE.Vector3(0, 100, 10), lookAt: new THREE.Vector3(-10, 0, 10), description: "Solar deck: Green Falcon has one of the most efficient solar panals that are on the market. This makes Green Falcon generate more electricity with the same amount of sun.", descStyle: { top: '5%', left: '20%' } },
  { position: new THREE.Vector3(-80, 12, -20), lookAt: new THREE.Vector3(100, 0, 0), description: "Rear View: showcases motor housing, cooling vents, and chassis structure.", descStyle: { top: '5%', left: '10%' } },
  { position: new THREE.Vector3(0, 12, 200), lookAt: new THREE.Vector3(0, 0, 0), description: "Front: Green Falcon is perfectly designed for australia. A lot of research has been done to find the optimal shapes.", descStyle: { top: '5%', left: '10%' } }
]

const easeInOutSine = (t: number): number => -0.5 * (Math.cos(Math.PI * t) - 1)

// Loader component for GLTF models with configurable position
function SolarCar({ url, tint = 1, position = [0, -2, 0] }: { url: string; tint?: number; position?: [number, number, number] }) {
  const gltf = useLoader(GLTFLoader, url)
  const ref = useRef<THREE.Object3D>(null)
  useFrame(() => {
    if (!ref.current) return;
  
    ref.current.traverse((child) => {
      if (!((child as THREE.Mesh).isMesh)) return;
  
      const mesh = child as THREE.Mesh;
      // normalize into an array
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
  
      materials.forEach((mat) => {
        // now `mat` is definitely a Material
        mat.side = THREE.DoubleSide;
  
        // if it’s a StandardMaterial we can tint it
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.color.setScalar(tint);
        }
      });
  
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  });
  return (
    <primitive
      ref={ref}
      object={gltf.scene.clone()}
      scale={[3000, 3000, 3000]}
      position={position}
      rotation={[0, 0, 0]}
    />
  )
}

// Main scene content: cars and reflective ground with animated camera and wheel cover
function Scene({ currentIndex, wheelCoverPosFL, wheelCoverPosRR, onAnimStart, onAnimEnd }: { currentIndex: number; wheelCoverPosFL: [number, number, number]; wheelCoverPosRR: [number, number, number]; onAnimStart: () => void; onAnimEnd: () => void }) {
  const { camera } = useThree()
  // Spotlight refs to aim at origin

  const anim = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 2,
    fromPos: new THREE.Vector3(),
    fromQuat: new THREE.Quaternion(),
    toPos: new THREE.Vector3(),
    toQuat: new THREE.Quaternion(),
  })
  // Wheel cover animation state
  const [wheelPosLocalFL, setWheelPosLocalFL] = useState(() => new THREE.Vector3(...wheelCoverPosFL))
  const wheelAnimFL = useRef({ isAnimating: false, startTime: 0, duration: 0.2, startPos: new THREE.Vector3(), targetPos: new THREE.Vector3() })
  const [wheelPosLocalRR, setWheelPosLocalRR] = useState(() => new THREE.Vector3(...wheelCoverPosRR))
  const wheelAnimRR = useRef({ isAnimating: false, startTime: 0, duration: 0.2, startPos: new THREE.Vector3(), targetPos: new THREE.Vector3() })
 
  // Camera zoom animation
  useEffect(() => {
    const target = zoomTargets[currentIndex]
    anim.current.fromPos = camera.position.clone()
    anim.current.fromQuat = camera.quaternion.clone()
    anim.current.toPos = target.position.clone()
    const tmpCam = new THREE.PerspectiveCamera()
    tmpCam.position.copy(target.position)
    tmpCam.lookAt(target.lookAt)
    anim.current.toQuat = tmpCam.quaternion.clone()
    anim.current.startTime = performance.now() / 1000
    anim.current.isAnimating = true
    onAnimStart()
  }, [currentIndex, camera, onAnimStart])

  // Trigger wheel cover move
  useEffect(() => {
    wheelAnimFL.current.startPos.copy(wheelPosLocalFL)
    wheelAnimFL.current.targetPos.set(...wheelCoverPosFL)
    wheelAnimFL.current.startTime = performance.now() / 1000
    wheelAnimFL.current.isAnimating = true
  }, [wheelCoverPosFL, wheelPosLocalFL])
  useEffect(() => {
    wheelAnimRR.current.startPos.copy(wheelPosLocalRR)
    wheelAnimRR.current.targetPos.set(...wheelCoverPosRR)
    wheelAnimRR.current.startTime = performance.now() / 1000
    wheelAnimRR.current.isAnimating = true
  }, [wheelCoverPosRR, wheelPosLocalRR])

  // Frame loop
  useFrame(() => {
    // Camera LERP
    if (anim.current.isAnimating) {
      const now = performance.now() / 1000
      let t = (now - anim.current.startTime) / anim.current.duration
      t = Math.max(0, Math.min(1, t))
      const e = easeInOutSine(t)
      camera.position.lerpVectors(anim.current.fromPos, anim.current.toPos, e)
      camera.quaternion.slerpQuaternions(anim.current.fromQuat, anim.current.toQuat, e)
      if (t === 1) {
        anim.current.isAnimating = false
        onAnimEnd()
      }
    }
    // Wheel cover LERP
    if (wheelAnimFL.current.isAnimating) {

      const now = performance.now() / 1000
      let t = (now - wheelAnimFL.current.startTime) / wheelAnimFL.current.duration
      t = Math.max(0, Math.min(1, t))
      const e = easeInOutSine(t)
      const newPos = wheelAnimFL.current.startPos.clone().lerp(wheelAnimFL.current.targetPos, e)
      setWheelPosLocalFL(newPos)
      if (t === 1) wheelAnimFL.current.isAnimating = false
      
    }
    if (wheelAnimRR.current.isAnimating) {

      const now = performance.now() / 1000
      let t = (now - wheelAnimRR.current.startTime) / wheelAnimRR.current.duration
      t = Math.max(0, Math.min(1, t))
      const e = easeInOutSine(t)
      const newPos = wheelAnimRR.current.startPos.clone().lerp(wheelAnimRR.current.targetPos, e)
      setWheelPosLocalRR(newPos)
      if (t === 1) wheelAnimRR.current.isAnimating = false
      
    }
  })

  return (
    <>
      <ambientLight intensity={2.8} />
      <directionalLight
        intensity={4.6}
        position={[0, 50, 5]}
        color="#ffffff"
      />
      {/* <spotLight ref={spot1} position={[0,50,100]} distance={100} intensity={10} decay={0} color={0xffd27f}/>
      <spotLight ref={spot2} position={[50,50,0]} distance={100} intensity={10} decay={0} color={0xffd27f}/>
      <spotLight ref={spot2} position={[0,50,0]} distance={100} intensity={10} decay={0} color={0xffd27f}/> */}
      <Suspense fallback={null}>
        {/* Background 3D Text */}
        <Text
          fontSize={30}
          position={[-200, 55, 80]}
          rotation={[0, Math.PI/3.5, 0]}
          color="#00BB31"
          anchorX="center"
          anchorY="middle"
          depthOffset={-10}
        >
          GREEN
        </Text>
        <Text
          fontSize={40}
          position={[-200, 20, 50]}
          rotation={[0, Math.PI/3.5, 0]}
          color="#00BB31"
          anchorX="center"
          anchorY="middle"
          depthOffset={-10}
        >
           FALCON
        </Text>
        <SolarCar url="/Ruben_GF_test_Body.glb" tint={1} />
        <SolarCar url="/Ruben_GF_test_Wheel_FL.glb" tint={1} />
        <SolarCar url="/Ruben_GF_test_Wheel_FR.glb" tint={1} />
        <SolarCar url="/Ruben_GF_test_Wheel_RR.glb" tint={1} />
        <SolarCar url="/Ruben_GF_test_Cover_FR.glb" tint={1} />
        <SolarCar url="/Ruben_GF_test_Cover_FL.glb" tint={1} position={[wheelPosLocalFL.x, wheelPosLocalFL.y, wheelPosLocalFL.z]} />
        <SolarCar url="/Ruben_GF_test_Cover_RR.glb" tint={1} position={[wheelPosLocalRR.x, wheelPosLocalRR.y, wheelPosLocalRR.z]} />
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
        {/* <Environment preset="city" /> */}
      </Suspense>
    </>
  )
}

// Top-level component with controls and overlays
export default function ThreeScene() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [description, setDescription] = useState(zoomTargets[0].description)
  const [descStyle, setDescStyle] = useState(zoomTargets[0].descStyle)
  const [descVisible, setDescVisible] = useState(true)
  const [wheelCoverPosFL, setWheelCoverPosFL] = useState<[number, number, number]>([0, -2, 0])
  const [wheelCoverPosRR, setWheelCoverPosRR] = useState<[number, number, number]>([0, -2, 0])
  

  const handleZoom = useCallback((dir: number) => {
    setDescVisible(false)
    setCurrentIndex((i: number) => (i + dir + zoomTargets.length) % zoomTargets.length)
  }, [])

  const onAnimStart = () => {}
  const onAnimEnd = () => {
    const target = zoomTargets[currentIndex]
    setDescription(target.description)
    setDescStyle(target.descStyle)
    setDescVisible(true)
  }

  useEffect(() => {
    if (currentIndex === 1) setWheelCoverPosFL([10, -2, 30])
    else setWheelCoverPosFL([0, -2, 0])
    if (currentIndex === 3) setWheelCoverPosRR([-10, -2, -30])
    else setWheelCoverPosRR([0, -2, 0])
  }, [currentIndex])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas shadows>
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 0, 400]} />
        <group position={[0, -0.5, 0]}>
          <Scene currentIndex={currentIndex} wheelCoverPosFL={wheelCoverPosFL} wheelCoverPosRR={wheelCoverPosRR} onAnimStart={onAnimStart} onAnimEnd={onAnimEnd} />
        </group>
      </Canvas>
      <div
  style={{ position: 'absolute', ...descStyle }}
  className={
    `max-w-xs p-4 bg-gray-400 bg-opacity-0 text-white rounded-xl shadow-lg text-lg font-sans transition-opacity duration-500 ` +
    (descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2')
  }
>
  {description}
</div>
      <div className="absolute bottom-5 w-full flex justify-center space-x-4">
  <button
    className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:-translate-y-0.5"
    onClick={() => handleZoom(-1)}
  >
    Previous
  </button>
  <button
    className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:-translate-y-0.5"
    onClick={() => handleZoom(1)}
  >
    Next
  </button>
</div>
    </div>
  )
}

