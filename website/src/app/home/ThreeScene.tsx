import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Zoom targets with description and text block positions
const zoomTargets = [
  { position: new THREE.Vector3(90, 57, 93), lookAt: new THREE.Vector3(0, 0, 30), description: "Overview: full-body shot of the solar vehicle highlighting solar array placement.", descStyle: { top: '70%', right: '5%' } },
  { position: new THREE.Vector3(80, 15, 21), lookAt: new THREE.Vector3(0, 0, 20), description: "Suspension Module: detailed view of the aerodynamics and sensors at the nose of the vehicle.", descStyle: { top: '80%', right: '10%' } },
  { position: new THREE.Vector3(0, 120, 10), lookAt: new THREE.Vector3(-10, 0, 10), description: "Side Profile: emphasizes wheel assemblies and suspension components.", descStyle: { top: '5%', left: '30%' } },
  { position: new THREE.Vector3(-22, 20, -3), lookAt: new THREE.Vector3(0, 0, 120), description: "Rear View: showcases motor housing, cooling vents, and chassis structure.", descStyle: { top: '5%', left: '10%' } }
];

const easeInOutSine = t => -0.5 * (Math.cos(Math.PI * t) - 1);

const ThreeDesertScene = () => {
  const mountRef = useRef(null);
  const cameraCoordsRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const currentZoomIndex = useRef(0);
  const wheelCoverRef = useRef(null);
  const zoomAnimation = useRef({ isAnimating: false, animStartTime: 0, animDuration: 2, zoomStartPos: new THREE.Vector3(), zoomTargetPos: new THREE.Vector3(), zoomStartQuat: new THREE.Quaternion(), zoomTargetQuat: new THREE.Quaternion() });

  // UI state
  const [description, setDescription] = useState(zoomTargets[0].description);
  const [descStyle, setDescStyle] = useState(zoomTargets[0].descStyle);
  const [descVisible, setDescVisible] = useState(true);

  // Texture scroll speed
  const scrollSpeed = 2;

  // Handle zoom with wheelCover toggle and description animation
  const handleZoom = useCallback((dir) => () => {
    const cam = cameraRef.current;
    const scene = sceneRef.current;
    if (!cam || !scene) return;

    // fade out description
    setDescVisible(false);

    // calculate new index
    const newIndex = (currentZoomIndex.current + dir + zoomTargets.length) % zoomTargets.length;
    currentZoomIndex.current = newIndex;
    const target = zoomTargets[newIndex];

    // toggle wheelCover: remove from scene for index 1, add back otherwise
    if (wheelCoverRef.current) {
      if (newIndex === 1) {
        scene.remove(wheelCoverRef.current);
      } else {
        scene.add(wheelCoverRef.current);
      }
    }

    // set up camera zoom animation
    zoomAnimation.current.zoomStartPos.copy(cam.position);
    zoomAnimation.current.zoomStartQuat.copy(cam.quaternion);
    zoomAnimation.current.zoomTargetPos.copy(target.position);
    const tmpCam = new THREE.PerspectiveCamera();
    tmpCam.position.copy(target.position);
    tmpCam.lookAt(target.lookAt);
    zoomAnimation.current.zoomTargetQuat.copy(tmpCam.quaternion);
    zoomAnimation.current.animStartTime = performance.now() / 1000;
    zoomAnimation.current.isAnimating = true;

    // after fade out (0.5s), update description and fade in
    setTimeout(() => {
      setDescription(target.description);
      setDescStyle(target.descStyle);
      setDescVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.copy(zoomTargets[0].position);
    camera.lookAt(zoomTargets[0].lookAt);
    cameraRef.current = camera;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    scene.add(dirLight);
    scene.add(dirLight.target);

    const loader = new THREE.TextureLoader(); loader.crossOrigin = '';
    const groundSize = 10000;

    // Ground (sand) single-sided
    const sandDiff = loader.load('https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/gravelly_sand/gravelly_sand_diff_2k.jpg');
    const sandNorm = loader.load('https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/gravelly_sand/gravelly_sand_nor_2k.jpg');
    [sandDiff, sandNorm].forEach(tx => { tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(groundSize/100, groundSize/100); tx.offset.set(0,0); });
    const groundMat = new THREE.MeshStandardMaterial({ map: sandDiff, normalMap: sandNorm, side: THREE.FrontSide });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(groundSize, groundSize), groundMat);
    ground.rotation.x = -Math.PI/2; ground.position.y = -2; scene.add(ground);

    // Road (asphalt) single-sided
    const roadWidth = 100;
    const asphaltDiff = loader.load('https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/asphalt_02/asphalt_02_diff_2k.jpg');
    const asphaltNorm = loader.load('https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/asphalt_02/asphalt_02_nor_2k.jpg');
    [asphaltDiff, asphaltNorm].forEach(tx => { tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(roadWidth/100, groundSize/100); tx.offset.set(0,0); });
    const roadMat = new THREE.MeshStandardMaterial({ map: asphaltDiff, normalMap: asphaltNorm, side: THREE.FrontSide });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth, groundSize), roadMat);
    road.rotation.x = -Math.PI/2; road.position.y = -1.98; scene.add(road);

    // Sky & Sun
    const sky = new Sky(); sky.scale.setScalar(10000); scene.add(sky);
    const skyUni = sky.material.uniforms;
    skyUni['turbidity'].value = 10; skyUni['rayleigh'].value = 2; skyUni['mieCoefficient'].value = 0.005; skyUni['mieDirectionalG'].value = 0.8;
    const params = { elevation: 10, azimuth: 180 };
    const pmremGen = new THREE.PMREMGenerator(renderer);
    let envRt; const sunVec = new THREE.Vector3();
    const updateSun = () => {
      const phi = THREE.MathUtils.degToRad(90 - params.elevation);
      const theta = THREE.MathUtils.degToRad(params.azimuth);
      sunVec.setFromSphericalCoords(1, phi, theta);
      sky.material.uniforms['sunPosition'].value.copy(sunVec);
      if(envRt) envRt.dispose(); envRt = pmremGen.fromScene(scene); scene.environment = envRt.texture;
      dirLight.position.copy(sunVec).multiplyScalar(1000); dirLight.target.position.set(0,0,0); dirLight.target.updateMatrixWorld();
    };
    updateSun();

    // Load main car model and enforce single-sided
    let model;
    new GLTFLoader().load('/Ruben_GF_test_Body.glb', (g) => {
      model = g.scene;
      model.traverse(child => {
        if (child.isMesh && child.material) {
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;
        }
      });
      model.scale.set(3000,3000,3000); model.position.set(0,-2,0); scene.add(model);
    });

    // Load wheel cover and store in ref, enforce single-sided
    new GLTFLoader().load('/Ruben_GF_test_Cover_FL.glb', (g) => {
      const cover = g.scene; cover.traverse(child => {
        if (child.isMesh && child.material) {
          child.material.side = THREE.FrontSide;
          child.material.needsUpdate = true;
        }
      });
      cover.scale.set(3000,3000,3000); cover.position.set(0,-2,0);
      wheelCoverRef.current = cover;
      scene.add(cover);
    });
    let wheel;
    new GLTFLoader().load('/Ruben_GF_test_Wheel_FL.glb', (g) => {
      wheel = g.scene; wheel.traverse(child => {
        if (child.isMesh && child.material) {
          child.material.side = THREE.FrontSide;
          child.material.needsUpdate = true;
        }
      });
      wheel.scale.set(3000,3000,3000); wheel.position.set(0,-2,0);
      scene.add(wheel);
    });

    // Resize
    
    window.addEventListener('resize', () => { camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight);} );

    // Animate loop
    const customPivot = new THREE.Vector3(0,10,0);
    const axis       = new THREE.Vector3(1, 0, 0).normalize(); // or any axis you like

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (wheel){
        wheel.position.sub(customPivot);
        wheel.rotateOnAxis(axis, -delta * 2); // Rotate in the opposite direction to keep it upright
        wheel.position.add(customPivot);

      }

      
      [sandDiff, sandNorm, asphaltDiff, asphaltNorm].forEach(tx => { tx.offset.y = (tx.offset.y - scrollSpeed*delta +1)%1; });
      if(zoomAnimation.current.isAnimating) {
        const now = performance.now()/1000;
        let p = (now-zoomAnimation.current.animStartTime)/zoomAnimation.current.animDuration;
        if(p>=1){p=1; zoomAnimation.current.isAnimating=false;}
        const e = easeInOutSine(p);
        const cam = cameraRef.current;
        cam.position.lerpVectors(zoomAnimation.current.zoomStartPos, zoomAnimation.current.zoomTargetPos, e);
        cam.quaternion.slerpQuaternions(zoomAnimation.current.zoomStartQuat, zoomAnimation.current.zoomTargetQuat, e);
      }
      if(cameraCoordsRef.current){ const {x,y,z}=cameraRef.current.position; cameraCoordsRef.current.innerText=`Camera Position: (${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)})`; }
      renderer.render(scene, cameraRef.current);
    };
    animate();

    // Cleanup
    return () => {
      renderer.domElement.remove(); renderer.dispose();
      [sandDiff,sandNorm,asphaltDiff,asphaltNorm].forEach(t=>t.dispose());
      if(model)model.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material) Array.isArray(o.material)?o.material.forEach(m=>m.dispose()):o.material.dispose(); });
      if(wheelCoverRef.current)wheelCoverRef.current.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material) Array.isArray(o.material)?o.material.forEach(m=>m.dispose()):o.material.dispose(); });
    };
  }, []);

  return (
    <div style={{position:'relative',width:'100%',height:'100vh'}}>
      <div ref={mountRef} style={{width:'100%',height:'100%'}} />
      <div ref={cameraCoordsRef} style={{position:'absolute',top:20,left:20,padding:'5px 10px',background:'rgba(0,0,0,0.5)',color:'#fff',fontFamily:'monospace',borderRadius:4}} />
      {/* Description Text */}
      <div style={{ position:'absolute', ...descStyle, maxWidth:300, padding:'10px', background:'rgba(255,255,255,0.8)', color:'#000', borderRadius:4, fontSize:14, fontFamily:'sans-serif', opacity:descVisible?1:0, transform:descVisible?'translateY(0)':'translateY(-10px)', transition:'opacity 0.5s ease, transform 0.5s ease' }}>
        {description}
      </div>
      <div style={{position:'absolute',bottom:20,width:'100%',display:'flex',justifyContent:'center',gap:20}}>
        <button onClick={handleZoom(-1)}>Previous</button>
        <button onClick={handleZoom(1)}>Next</button>
      </div>
    </div>
  );
};

export default ThreeDesertScene;
