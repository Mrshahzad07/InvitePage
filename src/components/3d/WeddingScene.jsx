import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * MASTER 3D WEDDING SCENE (Three.js)
 * - Night sky with crescent moon and twinkling stars
 * - Instanced falling rose and jasmine petals + gold dust motes
 * - 3D Hanging fanous lanterns with warm internal flickering light
 * - 3D Ornate arched double doors for Intro Gate (smoothly swing open)
 * - Two stylised faceless welcoming 3D characters (Groom & Bride)
 * - Dynamic scroll-linked lighting (Dusk, Haldi warm amber, Mehndi henna green, Nikah royal gold, Dawn)
 * - Gyroscope / Pointer parallax
 * - Adaptive quality & graceful WebGL fallback
 */
export default function WeddingScene({
  isGateOpen,
  scrollProgress = 0,
  currentSection = 'hero',
}) {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to 3D entities for updates
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const doorsRef = useRef({ left: null, right: null, light: null, group: null });
  const orbsRef = useRef(null);
  const lanternsRef = useRef([]);
  const petalsRef = useRef(null);
  const starsRef = useRef(null);
  const lightsRef = useRef({ ambient: null, dir: null, goldPoint: null, moodPoint: null });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const meteorRef = useRef(null);
  const meteorMatRef = useRef(null);
  const meteorClockRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x06231a, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    // --- Renderer with Graceful Error Handling ---
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    const handleContextLost = (event) => {
      event.preventDefault();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
    const handleContextRestored = () => {
      animate();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    container.appendChild(renderer.domElement);

    // --- Materials (Curated Royal Palette) ---
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc9a24b,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.2,
    });

    const darkGoldMat = new THREE.MeshStandardMaterial({
      color: 0x8a6a24,
      metalness: 0.7,
      roughness: 0.4,
    });

    const emeraldVelvetMat = new THREE.MeshStandardMaterial({
      color: 0x0b3d2e,
      roughness: 0.6,
      metalness: 0.2,
    });

    const ivorySilkMat = new THREE.MeshStandardMaterial({
      color: 0xfbf6e9,
      roughness: 0.45,
      metalness: 0.1,
    });

    const maroonSashMat = new THREE.MeshStandardMaterial({
      color: 0x7a1f2b,
      roughness: 0.5,
      metalness: 0.25,
    });

    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0x0d3829, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff4db, 1.8);
    dirLight.position.set(4, 8, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const goldPointLight = new THREE.PointLight(0xf3c86c, 2.0, 15);
    goldPointLight.position.set(0, 2, 3);
    scene.add(goldPointLight);

    const moodPointLight = new THREE.PointLight(0x134e3a, 1.5, 20);
    moodPointLight.position.set(0, -2, 2);
    scene.add(moodPointLight);

    lightsRef.current = {
      ambient: ambientLight,
      dir: dirLight,
      goldPoint: goldPointLight,
      moodPoint: moodPointLight,
    };

    // --- 1. Crescent Moon & Night Stars ---
    const createCrescentMoon = () => {
      const moonGroup = new THREE.Group();

      // Procedural crescent: outer torus-disc slice
      const outerGeo = new THREE.SphereGeometry(1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const moonMat = new THREE.MeshStandardMaterial({
        color: 0xffe9ad,
        emissive: 0xd4a83e,
        emissiveIntensity: 0.45,
        roughness: 0.3,
        metalness: 0.4,
      });

      // Construct crescent by intersecting a disc and subtracting an offset disc
      const moonShape = new THREE.Shape();
      moonShape.absarc(0, 0, 1.2, 0, Math.PI * 2, false);
      const holePath = new THREE.Path();
      holePath.absarc(0.42, 0.38, 1.12, 0, Math.PI * 2, true);
      moonShape.holes.push(holePath);

      const extrudeSettings = {
        depth: 0.15,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04,
      };

      const moonGeo = new THREE.ExtrudeGeometry(moonShape, extrudeSettings);
      const crescentMesh = new THREE.Mesh(moonGeo, moonMat);
      crescentMesh.rotation.z = 0.35;
      moonGroup.add(crescentMesh);

      // Delicate 8-point Islamic star beside the moon
      const starShape = new THREE.Shape();
      const points = 8;
      const rOuter = 0.35;
      const rInner = 0.18;
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? rOuter : rInner;
        const angle = (i / points) * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) starShape.moveTo(x, y);
        else starShape.lineTo(x, y);
      }
      starShape.closePath();
      const starGeo = new THREE.ExtrudeGeometry(starShape, { depth: 0.08, bevelEnabled: false });
      const starMesh = new THREE.Mesh(starGeo, goldMat);
      starMesh.position.set(1.4, 0.6, 0.1);
      moonGroup.add(starMesh);

      moonGroup.position.set(2.8, 2.8, -4);
      scene.add(moonGroup);
      return moonGroup;
    };
    createCrescentMoon();

    // Twinkling Star Field
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 35;
      starPositions[i * 3 + 1] = (Math.random() - 0.2) * 25;
      starPositions[i * 3 + 2] = -5 - Math.random() * 20;
      starScales[i] = 0.5 + Math.random() * 1.5;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('scale', new THREE.BufferAttribute(starScales, 1));

    // Custom twinkling star shader material
    const starMat = new THREE.PointsMaterial({
      color: 0xfff6dd,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);
    starsRef.current = starPoints;

    // Shooting Star / Celestial Meteor
    const meteorGeo = new THREE.BufferGeometry();
    const meteorPos = new Float32Array([0, 0, 0, 1.8, -1.2, 0]);
    meteorGeo.setAttribute('position', new THREE.BufferAttribute(meteorPos, 3));
    const meteorMat = new THREE.LineBasicMaterial({
      color: 0xfff3d1,
      transparent: true,
      opacity: 0,
      linewidth: 2,
    });
    const meteorLine = new THREE.Line(meteorGeo, meteorMat);
    meteorLine.position.set(0, 10, -6);
    scene.add(meteorLine);
    meteorRef.current = meteorLine;
    meteorMatRef.current = meteorMat;

    // --- 2. Hanging Fanous Lanterns ---
    const createLantern = (x, y, z, scale = 1, swayOffset = 0) => {
      const lanternGroup = new THREE.Group();

      // Top suspension wire/chain
      const chainGeo = new THREE.CylinderGeometry(0.015, 0.015, 3.5, 8);
      const chainMesh = new THREE.Mesh(chainGeo, darkGoldMat);
      chainMesh.position.y = 1.75;
      lanternGroup.add(chainMesh);

      // Top decorative dome cap
      const domeGeo = new THREE.ConeGeometry(0.38, 0.45, 8);
      const domeMesh = new THREE.Mesh(domeGeo, goldMat);
      domeMesh.position.y = 0.22;
      lanternGroup.add(domeMesh);

      // Glass core (glowing)
      const glassGeo = new THREE.CylinderGeometry(0.28, 0.22, 0.7, 8);
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xffd97d,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.85,
        roughness: 0.2,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      lanternGroup.add(glassMesh);

      // Filigree cage struts
      const strutGeo = new THREE.BoxGeometry(0.03, 0.74, 0.03);
      for (let i = 0; i < 8; i++) {
        const strut = new THREE.Mesh(strutGeo, goldMat);
        const angle = (i / 8) * Math.PI * 2;
        strut.position.set(Math.cos(angle) * 0.27, 0, Math.sin(angle) * 0.27);
        lanternGroup.add(strut);
      }

      // Bottom ornament and tassel
      const bottomGeo = new THREE.ConeGeometry(0.32, 0.35, 8);
      const bottomMesh = new THREE.Mesh(bottomGeo, goldMat);
      bottomMesh.rotation.x = Math.PI;
      bottomMesh.position.y = -0.45;
      lanternGroup.add(bottomMesh);

      const tasselGeo = new THREE.CylinderGeometry(0.02, 0.06, 0.5, 8);
      const tasselMesh = new THREE.Mesh(tasselGeo, maroonSashMat);
      tasselMesh.position.y = -0.85;
      lanternGroup.add(tasselMesh);

      // Internal warm point light
      const lanternLight = new THREE.PointLight(0xffb84d, 1.2, 5);
      lanternLight.position.y = 0;
      lanternGroup.add(lanternLight);

      lanternGroup.position.set(x, y, z);
      lanternGroup.scale.set(scale, scale, scale);
      scene.add(lanternGroup);

      return { group: lanternGroup, swayOffset, light: lanternLight };
    };

    lanternsRef.current = [
      createLantern(-2.8, 2.2, 1.5, 0.9, 0),
      createLantern(2.8, 2.0, 1.2, 0.85, 1.2),
      createLantern(-3.6, 1.0, -1.0, 0.7, 2.4),
      createLantern(3.4, 0.8, -1.2, 0.75, 3.1),
    ];

    // --- 3. Instanced Falling Petals & Gold Dust ---
    const petalCount = 75;
    const petalGeo = new THREE.CylinderGeometry(0.08, 0.16, 0.02, 7);
    petalGeo.scale(1, 1.8, 1);

    const petalMat = new THREE.MeshStandardMaterial({
      color: 0x9e2a2b, // Rose red / ruby
      roughness: 0.5,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    const petalMesh = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    const dummy = new THREE.Object3D();
    const dummyOrb = new THREE.Object3D();
    const petalData = [];

    // Colors mix: 65% Rose petals, 35% Jasmine ivory petals
    const roseColor = new THREE.Color(0xa62639);
    const jasmineColor = new THREE.Color(0xfbf6e9);

    for (let i = 0; i < petalCount; i++) {
      const isJasmine = Math.random() > 0.65;
      petalMesh.setColorAt(i, isJasmine ? jasmineColor : roseColor);

      petalData.push({
        x: (Math.random() - 0.5) * 14,
        y: Math.random() * 12 - 4,
        z: Math.random() * 8 - 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.008 + Math.random() * 0.015,
        rotSpeed: 0.01 + Math.random() * 0.02,
        swaySpeed: 1 + Math.random() * 2,
      });
    }

    if (petalMesh.instanceColor) petalMesh.instanceColor.needsUpdate = true;
    scene.add(petalMesh);
    petalsRef.current = { mesh: petalMesh, data: petalData };

    // --- 4. Intro Gate: 3D Ornate Double Arched Doors ---
    const doorsGroup = new THREE.Group();
    const doorWidth = 2.2;
    const doorHeight = 5.2;

    const createDoorWing = (isLeft) => {
      const wingGroup = new THREE.Group();

      // Main Arch-Shaped Door Panel
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(doorWidth, 0);
      shape.lineTo(doorWidth, doorHeight - 1.2);
      shape.quadraticCurveTo(doorWidth * 0.5, doorHeight + 0.1, 0, doorHeight - 1.2);
      shape.closePath();

      const extrudeSettings = {
        depth: 0.14,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      };

      const doorGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const doorMesh = new THREE.Mesh(doorGeo, emeraldVelvetMat);
      doorMesh.castShadow = true;
      doorMesh.receiveShadow = true;
      wingGroup.add(doorMesh);

      // Gold Filigree Border & Inset Panels
      const borderGeo = new THREE.BoxGeometry(doorWidth * 0.88, doorHeight * 0.4, 0.05);
      const borderMeshTop = new THREE.Mesh(borderGeo, goldMat);
      borderMeshTop.position.set(doorWidth * 0.5, doorHeight * 0.65, 0.12);
      wingGroup.add(borderMeshTop);

      const borderMeshBottom = new THREE.Mesh(borderGeo, darkGoldMat);
      borderMeshBottom.position.set(doorWidth * 0.5, doorHeight * 0.22, 0.12);
      wingGroup.add(borderMeshBottom);

      // Ornate Handle / Ring
      const ringGeo = new THREE.TorusGeometry(0.18, 0.035, 12, 24);
      const ringMesh = new THREE.Mesh(ringGeo, goldMat);
      const handleX = isLeft ? doorWidth - 0.35 : 0.35;
      ringMesh.position.set(handleX, doorHeight * 0.48, 0.2);
      wingGroup.add(ringMesh);

      return wingGroup;
    };

    const leftDoor = createDoorWing(true);
    leftDoor.position.set(-doorWidth, -2.4, 3.2);

    const rightDoor = createDoorWing(false);
    // Mirror right door
    rightDoor.scale.x = -1;
    rightDoor.position.set(doorWidth, -2.4, 3.2);

    doorsGroup.add(leftDoor);
    doorsGroup.add(rightDoor);

    // Golden Volumetric Backlight Burst (appears when doors open)
    const doorBurstLight = new THREE.PointLight(0xffdf80, 0, 12);
    doorBurstLight.position.set(0, 0.5, 2.5);
    doorsGroup.add(doorBurstLight);

    scene.add(doorsGroup);
    doorsRef.current = {
      group: doorsGroup,
      left: leftDoor,
      right: rightDoor,
      light: doorBurstLight,
    };

    // --- 5. Royal Islamic Mihrab Pavilion & Architectural Archway ---
    // A grand, sacred architectural background framing the celestial night sky
    const archGroup = new THREE.Group();

    // Elegant Multicusp Islamic Ogee Archway Profile
    const archShape = new THREE.Shape();
    const aw = 4.8;
    const ah = 7.0;
    archShape.moveTo(-aw, -ah);
    archShape.lineTo(-aw, 0.5);
    // Left arch curve
    archShape.bezierCurveTo(-aw, 2.2, -aw * 0.55, 3.8, 0, 5.0);
    // Right arch curve
    archShape.bezierCurveTo(aw * 0.55, 3.8, aw, 2.2, aw, 0.5);
    archShape.lineTo(aw, -ah);
    archShape.lineTo(-aw, -ah);

    // Inner arch cutout to create grand portal opening
    const innerHole = new THREE.Path();
    const iaw = 3.6;
    innerHole.moveTo(-iaw, -ah);
    innerHole.lineTo(-iaw, 0.2);
    innerHole.bezierCurveTo(-iaw, 1.8, -iaw * 0.55, 3.0, 0, 4.0);
    innerHole.bezierCurveTo(iaw * 0.55, 3.0, iaw, 1.8, iaw, 0.2);
    innerHole.lineTo(iaw, -ah);
    innerHole.lineTo(-iaw, -ah);
    archShape.holes.push(innerHole);

    const archExtrude = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    const archGeo = new THREE.ExtrudeGeometry(archShape, archExtrude);
    const archMesh = new THREE.Mesh(archGeo, emeraldVelvetMat);
    archMesh.position.set(0, -1.0, -3.2);
    archGroup.add(archMesh);

    // Gold Trim Lining along the inner arch
    const archTrimGeo = new THREE.TorusGeometry(3.6, 0.06, 12, 48, Math.PI);
    const archTrim = new THREE.Mesh(archTrimGeo, goldMat);
    archTrim.position.set(0, 0.4, -3.0);
    archGroup.add(archTrim);

    // Twin Royal Architectural Columns on Left & Right
    const createColumn = (xPos) => {
      const col = new THREE.Group();
      // Main Fluted Pillar Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.32, 0.35, 7.5, 24);
      const shaft = new THREE.Mesh(shaftGeo, emeraldVelvetMat);
      col.add(shaft);

      // Gold Column Base
      const baseGeo = new THREE.CylinderGeometry(0.52, 0.58, 0.45, 16);
      const base = new THREE.Mesh(baseGeo, goldMat);
      base.position.y = -3.75;
      col.add(base);

      // Gold Column Capital with Mughal Carved Tier
      const capGeo = new THREE.CylinderGeometry(0.55, 0.36, 0.5, 16);
      const cap = new THREE.Mesh(capGeo, goldMat);
      cap.position.y = 3.75;
      col.add(cap);

      // Minaret Dome Finial on top
      const domeGeo = new THREE.SphereGeometry(0.42, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const dome = new THREE.Mesh(domeGeo, goldMat);
      dome.position.y = 4.0;
      col.add(dome);

      const finialGeo = new THREE.ConeGeometry(0.08, 0.6, 8);
      const finial = new THREE.Mesh(finialGeo, darkGoldMat);
      finial.position.y = 4.55;
      col.add(finial);

      col.position.set(xPos, -0.6, -3.0);
      return col;
    };

    archGroup.add(createColumn(-4.0));
    archGroup.add(createColumn(4.0));

    // Divine Radiant Nur Halo Backlight emitting from the arch peak
    const nurBacklight = new THREE.PointLight(0xffe29a, 2.5, 12);
    nurBacklight.position.set(0, 2.8, -3.4);
    archGroup.add(nurBacklight);

    scene.add(archGroup);

    // --- 6. Floating Barakah & Nur Light Orbs (Luminous Sacred Bokeh) ---
    const orbCount = 38;
    const orbGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xffe89e,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });

    const orbMesh = new THREE.InstancedMesh(orbGeo, orbMat, orbCount);
    const orbData = [];

    for (let i = 0; i < orbCount; i++) {
      orbData.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 10,
        z: -1.5 - Math.random() * 3.5,
        scale: 0.6 + Math.random() * 1.4,
        speedY: 0.006 + Math.random() * 0.012,
        swaySpeed: 0.8 + Math.random() * 1.5,
      });
    }

    scene.add(orbMesh);
    orbsRef.current = { mesh: orbMesh, data: orbData };

    // --- Interaction / Parallax Setup ---
    const handlePointerMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - halfW) / halfW;
      mouseRef.current.targetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Orientation for mobile phones
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseRef.current.targetX = Math.max(-1, Math.min(1, e.gamma / 25));
        mouseRef.current.targetY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Main Animation Loop ---
    let animationFrameId;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = (currentTime = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const elapsedTime = (currentTime - startTime) / 1000;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Parallax camera movement
      if (cameraRef.current) {
        cameraRef.current.position.x = mouseRef.current.x * 0.6;
        cameraRef.current.position.y = -mouseRef.current.y * 0.4;
      }

      // Fanous Lantern Sway Animation
      if (lanternsRef.current.length > 0) {
        lanternsRef.current.forEach(({ group, swayOffset, light }) => {
          const sway = Math.sin(elapsedTime * 1.5 + swayOffset) * 0.06;
          group.rotation.z = sway;
          // Flickering light
          light.intensity = 1.0 + Math.sin(elapsedTime * 8 + swayOffset) * 0.25;
        });
      }

      // Periodic Shooting Star / Meteor Streaks
      if (meteorRef.current && meteorMatRef.current) {
        meteorClockRef.current += delta;
        if (meteorClockRef.current > 5.5) {
          meteorClockRef.current = 0;
          const startX = 3 + Math.random() * 4;
          const startY = 3.5 + Math.random() * 2;
          meteorRef.current.position.set(startX, startY, -6);
          meteorMatRef.current.opacity = 0.95;
          gsap.to(meteorRef.current.position, {
            x: startX - 7,
            y: startY - 4.5,
            duration: 1.2,
            ease: 'power2.in',
          });
          gsap.to(meteorMatRef.current, {
            opacity: 0,
            delay: 0.7,
            duration: 0.5,
          });
        }
      }

      // Falling Petals Physics & Drift
      if (petalsRef.current) {
        const { mesh, data } = petalsRef.current;
        for (let i = 0; i < data.length; i++) {
          const p = data[i];
          p.y -= p.speedY;
          p.rotX += p.rotSpeed;
          p.rotY += p.rotSpeed * 0.7;
          p.x += Math.sin(elapsedTime * p.swaySpeed + i) * 0.006;

          // Recycle petal when falling below screen
          if (p.y < -6) {
            p.y = 8;
            p.x = (Math.random() - 0.5) * 14;
          }

          dummy.position.set(p.x, p.y, p.z);
          dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }

      // Floating Barakah & Nur Light Orbs Motion
      if (orbsRef.current && orbsRef.current.data) {
        const { mesh, data } = orbsRef.current;
        for (let i = 0; i < data.length; i++) {
          const orb = data[i];
          orb.y += orb.speedY;
          orb.x += Math.sin(elapsedTime * orb.swaySpeed + i) * 0.003;

          // Recycle when rising off the top
          if (orb.y > 6.0) {
            orb.y = -5.0;
            orb.x = (Math.random() - 0.5) * 12;
          }

          dummyOrb.position.set(orb.x, orb.y, orb.z);
          const pulse = 1 + Math.sin(elapsedTime * 2.5 + i) * 0.2;
          dummyOrb.scale.setScalar(orb.scale * pulse);
          dummyOrb.updateMatrix();
          mesh.setMatrixAt(i, dummyOrb.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, []);

  // --- Dynamic Gate Opening GSAP Animation ---
  useEffect(() => {
    if (!doorsRef.current.left || !doorsRef.current.right) return;

    if (isGateOpen) {
      // Swing doors outward smoothly in 1.1s
      gsap.to(doorsRef.current.left.rotation, {
        y: -Math.PI * 0.65,
        duration: 1.1,
        ease: 'power2.out',
      });
      gsap.to(doorsRef.current.right.rotation, {
        y: Math.PI * 0.65,
        duration: 1.1,
        ease: 'power2.out',
      });

      // Flood with golden volumetric light
      if (doorsRef.current.light) {
        gsap.to(doorsRef.current.light, {
          intensity: 5.0,
          duration: 0.7,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        });
      }

      // Dolly camera forward slightly
      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          z: 7.6,
          duration: 1.3,
          ease: 'power2.out',
        });
      }

      // Fade out doors group once fully opened so it doesn't block content
      if (doorsRef.current.group) {
        gsap.to(doorsRef.current.group.position, {
          y: -15,
          delay: 0.9,
          duration: 0.6,
          ease: 'power2.in',
        });
      }
    }
  }, [isGateOpen]);

  // --- Dynamic Section-Linked Lighting Shifts ---
  useEffect(() => {
    if (!lightsRef.current.ambient || !lightsRef.current.goldPoint) return;

    const { ambient, dir, goldPoint, moodPoint } = lightsRef.current;

    switch (currentSection) {
      case 'programme-milad':
        // Soft mystical dusk slate & gold
        gsap.to(ambient.color, { r: 0.15, g: 0.18, b: 0.28, duration: 1.2 });
        gsap.to(goldPoint.color, { r: 0.85, g: 0.72, b: 0.45, duration: 1.2 });
        break;
      case 'programme-haldi':
        // Warm glowing turmeric yellow & amber
        gsap.to(ambient.color, { r: 0.35, g: 0.22, b: 0.05, duration: 1.2 });
        gsap.to(goldPoint.color, { r: 1.0, g: 0.75, b: 0.1, duration: 1.2 });
        break;
      case 'programme-mehndi':
        // Vibrant henna emerald green
        gsap.to(ambient.color, { r: 0.04, g: 0.32, b: 0.18, duration: 1.2 });
        gsap.to(goldPoint.color, { r: 0.3, g: 0.95, b: 0.6, duration: 1.2 });
        break;
      case 'programme-nikah':
      case 'countdown':
        // Royal gold & deep midnight emerald
        gsap.to(ambient.color, { r: 0.05, g: 0.24, b: 0.16, duration: 1.2 });
        gsap.to(goldPoint.color, { r: 1.0, g: 0.82, b: 0.35, duration: 1.2 });
        break;
      case 'programme-rukhsati':
      case 'footer':
        // Soft serene dawn rose-gold
        gsap.to(ambient.color, { r: 0.32, g: 0.22, b: 0.26, duration: 1.2 });
        gsap.to(goldPoint.color, { r: 0.95, g: 0.85, b: 0.75, duration: 1.2 });
        break;
      default:
        // Royal Nikah Night default
        gsap.to(ambient.color, { r: 0.05, g: 0.22, b: 0.16, duration: 1.2 });
        gsap.to(goldPoint.color, { r: 0.95, g: 0.78, b: 0.42, duration: 1.2 });
        break;
    }
  }, [currentSection]);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 2D Animated Graceful Fallback */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06231A] via-[#0B3D2E] to-[#041610]" />
        <div className="absolute inset-0 pattern-islamic-stars opacity-40 animate-pulse-glow" />
        <div className="absolute top-12 right-12 w-32 h-32 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 blur-xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
}
