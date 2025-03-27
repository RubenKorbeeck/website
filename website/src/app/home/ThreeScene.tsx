"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Water } from "three/examples/jsm/objects/Water";
import { Sky } from "three/examples/jsm/objects/Sky";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeOceanScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.set(30, 30, 100);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // --- Water (Ocean) Setup ---
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
    water.position.y = -2; // Lower water so the model can sit above it
    scene.add(water);

    // --- Sky Setup ---
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);
    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.8;

    // Set up sun parameters
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

    // --- Orbit Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.target.set(0, 10, 0);
    controls.minDistance = 0;
    controls.maxDistance = 200;
    controls.update();

    // --- Load Your GLB Model (Car) ---
    let model: THREE.Group | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/GF SIM TEST3.glb", // Ensure the file exists in your public folder
      (gltf) => {
        model = gltf.scene;
        // Transform your model as needed:
        model.scale.set(3000, 3000, 3000);
        model.rotation.y = -1;
        model.position.y = 0; // Raise the model above the water surface
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    // --- Resize Handling ---
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      water.material.uniforms["time"].value += delta;
      if (model) {
        model.rotation.y += 0.000;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", onWindowResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
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

  return <div ref={mountRef} />;
};

export default ThreeOceanScene;
