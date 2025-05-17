"use client";
import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei';

// Zoom targets with descriptions, positions, and per-target mobile scaling
const zoomTargets = [
  {
    position: new THREE.Vector3(60, 40, 80),
    lookAt: new THREE.Vector3(0, 0, 30),
    description:
      "You can see all parts of Green Falcon. Click Previous or Next to switch between mechanical/electrical components.",
    descStyle: { top: '70%', right: '5%' },
    mobileScale: 2,
  },
  {
    position: new THREE.Vector3(60, 12, 27),
    lookAt: new THREE.Vector3(0, 0, 20),
    description:
      "Suspension Module: The suspension is one of the most important aspects of the car. It keeps the car from completely falling apart at high speeds.",
    descStyle: { top: '80%', right: '10%' },
    mobileScale: 1.5,
  },
  {
    position: new THREE.Vector3(0, 100, 10),
    lookAt: new THREE.Vector3(-10, 0, 10),
    description:
      "Solar Deck: Green Falcon has one of the most efficient solar panels on the market. This makes Green Falcon generate more electricity with the same amount of sun.",
    descStyle: { top: '5%', left: '20%' },
    mobileScale: 1.8,
  },
  {
    position: new THREE.Vector3(-80, 12, -20),
    lookAt: new THREE.Vector3(100, 0, 0),
    description:
      "Rear View: Showcases motor housing, cooling vents, and chassis structure.",
    descStyle: { top: '5%', left: '10%' },
    mobileScale: 1.3,
  },
  {
    position: new THREE.Vector3(0, 12, 200),
    lookAt: new THREE.Vector3(0, 0, 0),
    description:
      "Front: Green Falcon is perfectly designed for Australia. A lot of research has been done to find the optimal shapes.",
    descStyle: { top: '5%', left: '10%' },
    mobileScale: 1.2,
  },
];

const easeInOutSine = (t: number): number =>
  -0.5 * (Math.cos(Math.PI * t) - 1);

// Loader component for GLTF models with configurable position
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

// Main scene content with animated camera and wheel covers
interface SceneProps {
  currentIndex: number;
  wheelCoverPosFL: [number, number, number];
  wheelCoverPosRR: [number, number, number];
  onAnimStart: () => void;
  onAnimEnd: () => void;
  isPhone: boolean;
}
function Scene({
  currentIndex,
  wheelCoverPosFL,
  wheelCoverPosRR,
  onAnimStart,
  onAnimEnd,
  isPhone,
}: SceneProps) {
  const { camera } = useThree();

  // Camera animation state
  const anim = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 2,
    fromPos: new THREE.Vector3(),
    fromQuat: new THREE.Quaternion(),
    toPos: new THREE.Vector3(),
    toQuat: new THREE.Quaternion(),
  });

  // Wheel cover animation state
  const [wheelPosLocalFL, setWheelPosLocalFL] = useState(
    new THREE.Vector3(...wheelCoverPosFL)
  );
  const wheelAnimFL = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 1,
    startPos: new THREE.Vector3(),
    targetPos: new THREE.Vector3(),
  });
  const [wheelPosLocalRR, setWheelPosLocalRR] = useState(
    new THREE.Vector3(...wheelCoverPosRR)
  );
  const wheelAnimRR = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 1,
    startPos: new THREE.Vector3(),
    targetPos: new THREE.Vector3(),
  });

  // Camera zoom animation effect (runs on currentIndex or isPhone change)
  useEffect(() => {
    const base = zoomTargets[currentIndex];

    // Clone target pos and optionally scale for phones
    const toPos = base.position.clone();
    const scale = isPhone ? base.mobileScale : 1;
    toPos.multiplyScalar(scale);

    // Build target quaternion
    const tmpCam = new THREE.PerspectiveCamera();
    tmpCam.position.copy(toPos);
    tmpCam.lookAt(base.lookAt);

    // Set up animation
    anim.current.fromPos.copy(camera.position);
    anim.current.fromQuat.copy(camera.quaternion);
    anim.current.toPos.copy(toPos);
    anim.current.toQuat.copy(tmpCam.quaternion);
    anim.current.startTime = performance.now() / 1000;
    anim.current.isAnimating = true;

    onAnimStart();
  }, [currentIndex, camera, isPhone, onAnimStart]);

  // Wheel cover triggers
  useEffect(() => {
    wheelAnimFL.current.startPos.copy(wheelPosLocalFL);
    wheelAnimFL.current.targetPos.set(...wheelCoverPosFL);
    wheelAnimFL.current.startTime = performance.now() / 1000;
    wheelAnimFL.current.isAnimating = true;
  }, [wheelCoverPosFL]);

  useEffect(() => {
    wheelAnimRR.current.startPos.copy(wheelPosLocalRR);
    wheelAnimRR.current.targetPos.set(...wheelCoverPosRR);
    wheelAnimRR.current.startTime = performance.now() / 1000;
    wheelAnimRR.current.isAnimating = true;
  }, [wheelCoverPosRR]);

  // Frame loop for both camera & wheel cover animations
  useFrame(() => {
    const now = performance.now() / 1000;

    // Camera lerp
    if (anim.current.isAnimating) {
      let t =
        (now - anim.current.startTime) / anim.current.duration;
      t = Math.max(0, Math.min(1, t));
      const e = easeInOutSine(t);
      camera.position.lerpVectors(
        anim.current.fromPos,
        anim.current.toPos,
        e
      );
      camera.quaternion.slerpQuaternions(
        anim.current.fromQuat,
        anim.current.toQuat,
        e
      );
      if (t === 1) {
        anim.current.isAnimating = false;
        onAnimEnd();
      }
    }

    // FL wheel cover
    if (wheelAnimFL.current.isAnimating) {
      let t =
        (now - wheelAnimFL.current.startTime) /
        wheelAnimFL.current.duration;
      t = Math.max(0, Math.min(1, t));
      const e = easeInOutSine(t);
      const newPos = wheelAnimFL.current.startPos
        .clone()
        .lerp(wheelAnimFL.current.targetPos, e);
      setWheelPosLocalFL(newPos);
      if (t === 1) wheelAnimFL.current.isAnimating = false;
    }

    // RR wheel cover
    if (wheelAnimRR.current.isAnimating) {
      let t =
        (now - wheelAnimRR.current.startTime) /
        wheelAnimRR.current.duration;
      t = Math.max(0, Math.min(1, t));
      const e = easeInOutSine(t);
      const newPos = wheelAnimRR.current.startPos
        .clone()
        .lerp(wheelAnimRR.current.targetPos, e);
      setWheelPosLocalRR(newPos);
      if (t === 1) wheelAnimRR.current.isAnimating = false;
    }
  });

  return (
    <>
      <ambientLight intensity={2.8} />
      <directionalLight intensity={4.6} position={[0, 50, 5]} color="#ffffff" />
      <Suspense fallback={null}>

        {/* Car Parts */}
        <SolarCar url="/GF_compressed.glb"  scale={3000}/>
        <SolarCar url="/Ruben_GF_test_Wheel_FL_compressed.glb"  scale={3000} />
        <SolarCar url="/Wheel_FR_compressed.glb"  scale={3000}/>
        <SolarCar url="/Ruben_GF_test_Wheel_RR_compressed.glb"  scale={3000}/>
        <SolarCar url="/Ruben_GF_test_Cover_FR.glb"  scale={3000}/>
        <SolarCar
          url="/Ruben_GF_test_Cover_FL.glb"

          scale={3000}
          position={[
            wheelPosLocalFL.x,
            wheelPosLocalFL.y,
            wheelPosLocalFL.z,
          ]}
        />
        <SolarCar
          url="/Ruben_GF_test_Cover_RR.glb"

          scale={3000}
          position={[
            wheelPosLocalRR.x,
            wheelPosLocalRR.y,
            wheelPosLocalRR.z,
          ]}
        />

        {/* Reflective Ground */}
        <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
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
  );
}

// Top-level component with controls and overlays
export default function ThreeScene() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [description, setDescription] = useState(
    zoomTargets[0].description
  );
  const [descStyle, setDescStyle] = useState(
    zoomTargets[0].descStyle
  );
  const [descVisible, setDescVisible] = useState(true);
  const [wheelCoverPosFL, setWheelCoverPosFL] = useState<
    [number, number, number]
  >([0, -2, 0]);
  const [wheelCoverPosRR, setWheelCoverPosRR] = useState<
    [number, number, number]
  >([0, -2, 0]);

  // Detect phone vs desktop
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      '(pointer: coarse), (max-width: 768px)'
    );
    const update = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsPhone(e.matches);
    update(mq);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleZoom = useCallback((dir: number) => {
    setDescVisible(false);
    setCurrentIndex((i) => (i + dir + zoomTargets.length) % zoomTargets.length);
  }, []);

  const onAnimStart = () => {};
  const onAnimEnd = () => {
    const target = zoomTargets[currentIndex];
    setDescription(target.description);
    setDescStyle(target.descStyle);
    setDescVisible(true);
  };

  useEffect(() => {
    if (currentIndex === 1) setWheelCoverPosFL([10, -2, 30]);
    else setWheelCoverPosFL([0, -2, 0]);
    if (currentIndex === 3) setWheelCoverPosRR([-10, -2, -30]);
    else setWheelCoverPosRR([0, -2, 0]);
  }, [currentIndex]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ position: [100, 0, 100]}}>
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 0, 400]} />
        <group position={[0, -0.5, 0]}>
          <Scene
            currentIndex={currentIndex}
            wheelCoverPosFL={wheelCoverPosFL}
            wheelCoverPosRR={wheelCoverPosRR}
            onAnimStart={onAnimStart}
            onAnimEnd={onAnimEnd}
            isPhone={isPhone}
          />
        </group>
      </Canvas>
      {currentIndex === 0 && (
        <div className="absolute top-20 left-20 z-20 text-white font-bold text-lg opacity-100 transition-opacity duration-500">
          <h1 className="mb-4 lg:text-8xl md:text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-[var(--green1)]">
            GREEN <br/>&nbsp;&nbsp;&nbsp;&nbsp;FALCON
          </h1> 
        </div>
      )}

      {/* Description Overlay */}
      <div
         style={{
          position: 'absolute',
          ...(isPhone
            ? { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }
            : descStyle)
        }}
        className={
          `max-w-xs p-4 bg-gray-400 bg-opacity-0 text-white rounded-xl shadow-lg text-lg font-sans transition-opacity duration-500 ` +
          (descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2')
        }
      >
        {description}
      </div>

      {/* Controls */}
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
  );
}
