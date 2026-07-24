import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function OceanCanvas({ currentZone, selectedCreature, onSelectCreature, isRovMode, rovFilter }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  // Animation references
  const reqIdRef = useRef(null);
  const creaturesRef = useRef([]);
  const bubblesRef = useRef([]);
  const planktonRef = useRef(null);
  const lightRaysRef = useRef([]);
  const waterSurfaceRef = useRef(null);
  const seabedRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030d22, 0.018);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 25);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a2540, 1.8);
    scene.add(ambientLight);

    const mainSunLight = new THREE.DirectionalLight(0x00f3ff, 3.5);
    mainSunLight.position.set(10, 40, 15);
    mainSunLight.castShadow = true;
    scene.add(mainSunLight);

    const deepBlueLight = new THREE.PointLight(0x0055ff, 4, 60);
    deepBlueLight.position.set(-15, -10, -10);
    scene.add(deepBlueLight);

    const biolumLight = new THREE.PointLight(0x00ff9d, 3, 40);
    biolumLight.position.set(0, -25, 5);
    scene.add(biolumLight);

    // 5. Water Surface Shader & Caustics
    const surfaceGeo = new THREE.PlaneGeometry(120, 120, 48, 48);
    const surfaceMat = new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.65,
      wireframe: false,
      side: THREE.DoubleSide
    });
    const waterSurface = new THREE.Mesh(surfaceGeo, surfaceMat);
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.y = 20;
    scene.add(waterSurface);
    waterSurfaceRef.current = waterSurface;

    // 6. Volumetric Sunlight Beams (God Rays)
    const rayGroup = new THREE.Group();
    const rayGeo = new THREE.CylinderGeometry(0.2, 3.5, 45, 16, 1, true);
    for (let i = 0; i < 7; i++) {
      const rayMat = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.1,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set((Math.random() - 0.5) * 40, 5, (Math.random() - 0.5) * 30);
      ray.rotation.z = (Math.random() - 0.5) * 0.3;
      ray.rotation.x = (Math.random() - 0.5) * 0.3;
      rayGroup.add(ray);
      lightRaysRef.current.push(ray);
    }
    scene.add(rayGroup);

    // 7. Particle Systems (Bubbles & Bioluminescent Plankton)
    // Plankton
    const planktonCount = 600;
    const planktonGeo = new THREE.BufferGeometry();
    const planktonPositions = new Float32Array(planktonCount * 3);
    const planktonScales = new Float32Array(planktonCount);
    for (let i = 0; i < planktonCount; i++) {
      planktonPositions[i * 3] = (Math.random() - 0.5) * 70;
      planktonPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      planktonPositions[i * 3 + 2] = (Math.random() - 0.5) * 70;
      planktonScales[i] = Math.random() * 0.4 + 0.1;
    }
    planktonGeo.setAttribute('position', new THREE.BufferAttribute(planktonPositions, 3));
    const planktonMat = new THREE.PointsMaterial({
      color: 0x00ffaa,
      size: 0.4,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const planktonPoints = new THREE.Points(planktonGeo, planktonMat);
    scene.add(planktonPoints);
    planktonRef.current = planktonPoints;

    // Bubbles
    const bubbleGroup = new THREE.Group();
    const bubbleGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0,
      ior: 1.1,
      thickness: 0.2
    });
    for (let i = 0; i < 45; i++) {
      const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
      const scale = Math.random() * 1.5 + 0.5;
      bubble.scale.set(scale, scale, scale);
      bubble.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40);
      bubble.userData = { speed: Math.random() * 0.06 + 0.03, wobbleSpeed: Math.random() * 2 + 1 };
      bubbleGroup.add(bubble);
      bubblesRef.current.push(bubble);
    }
    scene.add(bubbleGroup);

    // 8. Marine Life Models (Procedural Procedurally Animated)
    const creatures = [];

    // A. Sea Turtle
    const createTurtle = () => {
      const turtleGroup = new THREE.Group();
      // Shell
      const shellGeo = new THREE.SphereGeometry(2, 16, 12);
      shellGeo.scale(1, 0.45, 1.3);
      const shellMat = new THREE.MeshStandardMaterial({
        color: 0x0b4f3b,
        roughness: 0.4,
        metalness: 0.2
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      turtleGroup.add(shell);

      // Head
      const headGeo = new THREE.SphereGeometry(0.7, 12, 12);
      headGeo.scale(0.8, 0.7, 1.1);
      const headMat = new THREE.MeshStandardMaterial({ color: 0x147355, roughness: 0.5 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(0, 0, 2.3);
      turtleGroup.add(head);

      // Flippers
      const flipperGeo = new THREE.ConeGeometry(0.7, 3, 12);
      flipperGeo.rotateX(Math.PI / 2);
      flipperGeo.scale(1, 0.2, 1);

      const leftFlipper = new THREE.Mesh(flipperGeo, headMat);
      leftFlipper.position.set(-1.8, -0.2, 1);
      leftFlipper.rotation.z = Math.PI / 4;
      turtleGroup.add(leftFlipper);

      const rightFlipper = new THREE.Mesh(flipperGeo, headMat);
      rightFlipper.position.set(1.8, -0.2, 1);
      rightFlipper.rotation.z = -Math.PI / 4;
      turtleGroup.add(rightFlipper);

      turtleGroup.position.set(-8, 6, -5);
      turtleGroup.userData = {
        name: 'Honu Sea Turtle (Chelonia mydas)',
        id: 'turtle-01',
        speed: 0.02,
        type: 'turtle',
        leftFlipper,
        rightFlipper,
        depth: '42m',
        temp: '22.4°C',
        health: '98% (Optimal)',
        velocity: '1.8 knots'
      };

      scene.add(turtleGroup);
      return turtleGroup;
    };
    creatures.push(createTurtle());

    // B. Glowing Translucent Jellyfish (x3)
    const createJellyfish = (x, y, z, idName) => {
      const jellyGroup = new THREE.Group();
      
      // Cap / Bell
      const bellGeo = new THREE.SphereGeometry(1.5, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.65);
      const bellMat = new THREE.MeshPhysicalMaterial({
        color: 0x00f3ff,
        emissive: 0x0055ff,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.75,
        roughness: 0.1,
        transmission: 0.8,
        thickness: 0.5
      });
      const bell = new THREE.Mesh(bellGeo, bellMat);
      jellyGroup.add(bell);

      // Inner Bioluminescent Core
      const coreGeo = new THREE.SphereGeometry(0.6, 12, 12);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x00ff9d, transparent: true, opacity: 0.9 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.y = -0.2;
      jellyGroup.add(core);

      // Tentacles
      const tentacles = [];
      for (let t = 0; t < 8; t++) {
        const angle = (t / 8) * Math.PI * 2;
        const tentacleGeo = new THREE.CylinderGeometry(0.04, 0.01, 4, 8);
        const tentacleMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.6 });
        const tentacle = new THREE.Mesh(tentacleGeo, tentacleMat);
        tentacle.position.set(Math.cos(angle) * 0.8, -2.2, Math.sin(angle) * 0.8);
        jellyGroup.add(tentacle);
        tentacles.push(tentacle);
      }

      jellyGroup.position.set(x, y, z);
      jellyGroup.userData = {
        name: `Moon Jellyfish (${idName})`,
        id: idName,
        type: 'jellyfish',
        tentacles,
        bell,
        pulseOffset: Math.random() * Math.PI * 2,
        depth: '185m',
        temp: '18.1°C',
        health: '94% (Nominal)',
        velocity: '0.4 knots'
      };

      scene.add(jellyGroup);
      return jellyGroup;
    };

    creatures.push(createJellyfish(10, 0, -8, 'Aurelia-Alpha'));
    creatures.push(createJellyfish(-12, -15, -12, 'Aurelia-Beta'));

    // C. Manta Ray
    const createManta = () => {
      const mantaGroup = new THREE.Group();
      const bodyShape = new THREE.ConeGeometry(3.5, 4, 16);
      bodyShape.scale(1, 0.12, 0.8);
      bodyShape.rotateX(Math.PI / 2);

      const mantaMat = new THREE.MeshStandardMaterial({
        color: 0x111e38,
        roughness: 0.3,
        metalness: 0.5
      });
      const body = new THREE.Mesh(bodyShape, mantaMat);
      mantaGroup.add(body);

      // Bioluminescent Underbelly Marking Pattern
      const markGeo = new THREE.PlaneGeometry(2, 2);
      const markMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const mark = new THREE.Mesh(markGeo, markMat);
      mark.rotation.x = Math.PI / 2;
      mark.position.y = -0.2;
      mantaGroup.add(mark);

      mantaGroup.position.set(6, -20, -15);
      mantaGroup.userData = {
        name: 'Giant Oceanic Manta (Mobula birostris)',
        id: 'manta-01',
        type: 'manta',
        speed: 0.015,
        depth: '410m',
        temp: '14.6°C',
        health: '99% (Thriving)',
        velocity: '3.2 knots'
      };

      scene.add(mantaGroup);
      return mantaGroup;
    };
    creatures.push(createManta());

    // D. School of Fish (Boids)
    const fishGroup = new THREE.Group();
    const fishGeo = new THREE.ConeGeometry(0.2, 0.8, 8);
    fishGeo.rotateX(Math.PI / 2);
    const fishMat = new THREE.MeshStandardMaterial({ color: 0x00f3ff, roughness: 0.2, metalness: 0.8 });

    const fishList = [];
    for (let f = 0; f < 35; f++) {
      const fish = new THREE.Mesh(fishGeo, fishMat);
      fish.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 10);
      fishGroup.add(fish);
      fishList.push(fish);
    }
    fishGroup.position.set(-5, -5, 2);
    fishGroup.userData = {
      name: 'Pacific Bluefin School',
      id: 'fish-school-01',
      type: 'school',
      fishList,
      depth: '65m',
      temp: '20.8°C',
      health: '100%',
      velocity: '5.6 knots'
    };
    scene.add(fishGroup);
    creatures.push(fishGroup);

    creaturesRef.current = creatures;

    // 9. Seabed Corals & Subsea Telemetry Nodes
    const seabedGroup = new THREE.Group();

    // Seabed terrain
    const bedGeo = new THREE.PlaneGeometry(120, 120, 32, 32);
    const bedMat = new THREE.MeshStandardMaterial({
      color: 0x071b30,
      roughness: 0.9,
      metalness: 0.1
    });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.rotation.x = -Math.PI / 2;
    bed.position.y = -35;
    seabedGroup.add(bed);

    // Corals & Hydrothermal Vent Node
    for (let c = 0; c < 15; c++) {
      const coralGeo = new THREE.DodecahedronGeometry(1.2 + Math.random() * 1.5);
      const coralMat = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x00ffaa : 0x7928ca,
        roughness: 0.6
      });
      const coral = new THREE.Mesh(coralGeo, coralMat);
      coral.position.set((Math.random() - 0.5) * 50, -34, (Math.random() - 0.5) * 40);
      seabedGroup.add(coral);
    }

    // Subsea Telemetry Sonar Node
    const nodeGeo = new THREE.CylinderGeometry(0.8, 1.2, 2.5, 12);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
    nodeMesh.position.set(0, -33.5, 0);

    const nodeGlowGeo = new THREE.RingGeometry(1.5, 1.8, 24);
    const nodeGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const nodeGlow = new THREE.Mesh(nodeGlowGeo, nodeGlowMat);
    nodeGlow.rotation.x = -Math.PI / 2;
    nodeGlow.position.set(0, -33.4, 0);

    seabedGroup.add(nodeMesh);
    seabedGroup.add(nodeGlow);
    scene.add(seabedGroup);
    seabedRef.current = seabedGroup;

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Water surface wave motion
      if (waterSurfaceRef.current) {
        const pos = waterSurfaceRef.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const z = Math.sin(u * 0.2 + time * 1.5) * 0.4 + Math.cos(v * 0.25 + time * 1.2) * 0.3;
          pos.setZ(i, z);
        }
        waterSurfaceRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Volumetric light rays sway
      lightRaysRef.current.forEach((ray, idx) => {
        ray.rotation.z = Math.sin(time * 0.5 + idx) * 0.08;
        ray.material.opacity = 0.08 + Math.sin(time * 1.2 + idx * 2) * 0.04;
      });

      // Floating Bubbles rising
      bubblesRef.current.forEach((b) => {
        b.position.y += b.userData.speed;
        b.position.x += Math.sin(time * b.userData.wobbleSpeed) * 0.02;
        if (b.position.y > 18) {
          b.position.y = -35;
          b.position.x = (Math.random() - 0.5) * 50;
        }
      });

      // Bioluminescent Plankton gentle float
      if (planktonRef.current) {
        planktonRef.current.rotation.y = time * 0.015;
      }

      // Creatures Animations
      creaturesRef.current.forEach((c) => {
        const type = c.userData.type;

        if (type === 'turtle') {
          c.position.x += Math.sin(time * 0.4) * 0.03;
          c.position.z += Math.cos(time * 0.3) * 0.02;
          c.rotation.y = Math.sin(time * 0.3) * 0.1;
          if (c.userData.leftFlipper) {
            c.userData.leftFlipper.rotation.z = Math.PI / 4 + Math.sin(time * 2.5) * 0.3;
            c.userData.rightFlipper.rotation.z = -Math.PI / 4 - Math.sin(time * 2.5) * 0.3;
          }
        }

        if (type === 'jellyfish') {
          const pulse = Math.sin(time * 1.8 + c.userData.pulseOffset);
          c.position.y += pulse * 0.03;
          if (c.userData.bell) {
            const scale = 1 + pulse * 0.12;
            c.userData.bell.scale.set(scale, 1 - pulse * 0.1, scale);
          }
          if (c.userData.tentacles) {
            c.userData.tentacles.forEach((t, i) => {
              t.rotation.z = Math.sin(time * 2 + i) * 0.15;
            });
          }
        }

        if (type === 'manta') {
          c.position.x = Math.sin(time * 0.3) * 15;
          c.position.z = -15 + Math.cos(time * 0.25) * 6;
          c.rotation.z = Math.sin(time * 0.3) * 0.15;
        }

        if (type === 'school') {
          c.userData.fishList.forEach((fish, fIdx) => {
            fish.position.x += Math.sin(time * 2 + fIdx) * 0.015;
            fish.position.y += Math.cos(time * 1.8 + fIdx) * 0.01;
            fish.rotation.y = Math.sin(time * 1.5 + fIdx) * 0.2;
          });
        }
      });

      // Dynamic Camera Position based on Depth Zone
      let targetCamY = 5;
      let targetCamZ = 25;
      if (currentZone === 'Twilight Zone') {
        targetCamY = -10;
        targetCamZ = 22;
      } else if (currentZone === 'Abyssal Zone') {
        targetCamY = -28;
        targetCamZ = 20;
      }

      // Smooth camera interpolation
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [currentZone]);

  // Handle creature click raycasting
  const handleCanvasClick = (e) => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);
    if (intersects.length > 0) {
      // Find top group
      let obj = intersects[0].object;
      while (obj.parent && !obj.userData.id && obj.parent !== sceneRef.current) {
        obj = obj.parent;
      }
      if (obj.userData && obj.userData.name) {
        onSelectCreature(obj.userData);
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Three.js Canvas */}
      <div 
        ref={containerRef} 
        onClick={handleCanvasClick}
        className="w-full h-full cursor-crosshair" 
      />

      {/* ROV Vision Mode Shader Overlay Filters */}
      {isRovMode && (
        <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          rovFilter === 'thermal' ? 'bg-gradient-to-tr from-purple-900/40 via-red-600/20 to-yellow-400/30 mix-blend-color-dodge' :
          rovFilter === 'sonar' ? 'bg-emerald-950/30 mix-blend-hard-light border-4 border-emerald-500/20' :
          rovFilter === 'biolum' ? 'bg-cyan-950/40 mix-blend-screen' : ''
        }`}>
          {/* Scanlines effect for ROV */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-40" />
          {/* Corner Crosshairs */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-400/80" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-400/80" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-400/80" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-400/80" />
          {/* Target Reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-400/30 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          </div>
        </div>
      )}
    </div>
  );
}
