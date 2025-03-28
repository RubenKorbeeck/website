"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { Sky } from "three/examples/jsm/objects/Sky";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Updated zoom target positions and look-at points.
const zoomTargets = [
  {
    // Zoom in location 0 – e.g., focus on a detailed part of the car.
    position: new THREE.Vector3(90, 57, 93),
    lookAt: new THREE.Vector3(0, 0, 30),
  },
  {
    // Zoom in location 1 – e.g., focus on the front of the car.
    position: new THREE.Vector3(80, 15, 21),
    lookAt: new THREE.Vector3(0, 0, 20),
  },
  {
    // Zoom in location 2 – e.g., focus on one side of the car.
    position: new THREE.Vector3(0, 120, 10),
    lookAt: new THREE.Vector3(-10, 0, 10),
  },
  {
    // Zoom in location 3 – e.g., focus on the other side of the car.
    position: new THREE.Vector3(-22, 20, -3),
    lookAt: new THREE.Vector3(0, 0, 120),
  },
];

// Easing function for smooth ease in and ease out.
const easeInOutSine = (t) => -0.5 * (Math.cos(Math.PI * t) - 1);

const ThreeOceanScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cameraCoordsRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const currentZoomIndex = useRef(0);
  // Extend the zoomAnimation ref to include quaternions.
  const zoomAnimation = useRef({
    isAnimating: false,
    animStartTime: 0,
    animDuration: 2, // seconds
    zoomStartPos: new THREE.Vector3(),
    zoomTargetPos: new THREE.Vector3(),
    zoomStartLookAt: new THREE.Vector3(),
    zoomTargetLookAt: new THREE.Vector3(),
    zoomStartQuat: new THREE.Quaternion(),
    zoomTargetQuat: new THREE.Quaternion(),
  });

  // Computes the current lookAt point based on the camera's world direction.
  const computeCurrentLookAt = (camera: THREE.PerspectiveCamera) => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.multiplyScalar(100).add(camera.position);
    return direction;
  };

  // Button handlers compute both position and rotation targets.
  const handleNext = useCallback(() => {
    const camera = cameraRef.current;
    if (!camera) return;
    currentZoomIndex.current = (currentZoomIndex.current + 1) % zoomTargets.length;
    const target = zoomTargets[currentZoomIndex.current];

    const currentLookAt = computeCurrentLookAt(camera);
    zoomAnimation.current.zoomStartPos.copy(camera.position);
    zoomAnimation.current.zoomStartLookAt.copy(currentLookAt);
    zoomAnimation.current.zoomStartQuat.copy(camera.quaternion);

    zoomAnimation.current.zoomTargetPos.copy(target.position);
    zoomAnimation.current.zoomTargetLookAt.copy(target.lookAt);
    // Compute target quaternion using a temporary camera.
    const tempCam = new THREE.PerspectiveCamera();
    tempCam.position.copy(target.position);
    tempCam.lookAt(target.lookAt);
    zoomAnimation.current.zoomTargetQuat.copy(tempCam.quaternion);

    zoomAnimation.current.animStartTime = performance.now() / 1000;
    zoomAnimation.current.isAnimating = true;
  }, []);

  const handlePrevious = useCallback(() => {
    const camera = cameraRef.current;
    if (!camera) return;
    currentZoomIndex.current =
      (currentZoomIndex.current - 1 + zoomTargets.length) % zoomTargets.length;
    const target = zoomTargets[currentZoomIndex.current];

    const currentLookAt = computeCurrentLookAt(camera);
    zoomAnimation.current.zoomStartPos.copy(camera.position);
    zoomAnimation.current.zoomStartLookAt.copy(currentLookAt);
    zoomAnimation.current.zoomStartQuat.copy(camera.quaternion);

    zoomAnimation.current.zoomTargetPos.copy(target.position);
    zoomAnimation.current.zoomTargetLookAt.copy(target.lookAt);
    const tempCam = new THREE.PerspectiveCamera();
    tempCam.position.copy(target.position);
    tempCam.lookAt(target.lookAt);
    zoomAnimation.current.zoomTargetQuat.copy(tempCam.quaternion);

    zoomAnimation.current.animStartTime = performance.now() / 1000;
    zoomAnimation.current.isAnimating = true;
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.set(90, 57, 93);
    camera.lookAt(0, 0, 30);
    cameraRef.current = camera;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Water Setup
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const waterNormals = new THREE.TextureLoader().load(
      "/waternormals.jpg",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    );
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: directionalLight.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = -2;
    scene.add(water);

    // Sky Setup
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);
    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.8;

    // Sun Setup
    const parameters = { elevation: 0, azimuth: 180 };
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    let renderTarget: THREE.WebGLRenderTarget;
    const sun = new THREE.Vector3();
    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);
      sun.setFromSphericalCoords(1, phi, theta);
      sky.material.uniforms["sunPosition"].value.copy(sun);
      water.material.uniforms["sunDirection"].value.copy(sun).normalize();
      if (renderTarget !== undefined) renderTarget.dispose();
      renderTarget = pmremGenerator.fromScene(scene);
      scene.environment = renderTarget.texture;
    }
    updateSun();

    // Load GLB Model
    let model: THREE.Group | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/GF SIM TEST3.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(3000, 3000, 3000);
        model.position.set(0, -5, 0);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    // Resize Handling
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      water.material.uniforms["time"].value += delta;

      if (zoomAnimation.current.isAnimating) {
        const currentTime = performance.now() / 1000;
        let progress =
          (currentTime - zoomAnimation.current.animStartTime) /
          zoomAnimation.current.animDuration;
        if (progress >= 1) {
          progress = 1;
          zoomAnimation.current.isAnimating = false;
        }
        // Apply easing to the progress.
        const easedProgress = easeInOutSine(progress);
        // Interpolate position.
        camera.position.lerpVectors(
          zoomAnimation.current.zoomStartPos,
          zoomAnimation.current.zoomTargetPos,
          easedProgress
        );
        // Interpolate rotation.
        camera.quaternion.slerpQuaternions(
          zoomAnimation.current.zoomStartQuat,
          zoomAnimation.current.zoomTargetQuat,
          easedProgress
        );
      }

      if (cameraCoordsRef.current) {
        const { x, y, z } = camera.position;
        cameraCoordsRef.current.innerText = `Camera Position: (${x.toFixed(
          2
        )}, ${y.toFixed(2)}, ${z.toFixed(2)})`;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      if (model) {
        model.traverse((child) => {
          if ((child as THREE.Mesh).geometry) {
            (child as THREE.Mesh).geometry.dispose();
          }
          if ((child as THREE.Mesh).material) {
            const material = (child as THREE.Mesh).material;
            if (Array.isArray(material)) {
              material.forEach((m) => m.dispose());
            } else {
              material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      <div
        ref={cameraCoordsRef}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "5px 10px",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "14px",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ThreeOceanScene;
