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
  const charactersRef = useRef({ groom: null, bride: null, group: null });
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

    // --- 5. Two Stylised Faceless 3D Welcoming Characters ---
    // (Groom in sherwani & embroidered topi; Bride in royal dupatta/veil)
    const charactersGroup = new THREE.Group();

    // Groom (Left-center)
    const createGroom = () => {
      const groom = new THREE.Group();

      // Lower body / Kurta flare
      const coatGeo = new THREE.CylinderGeometry(0.38, 0.6, 1.8, 16);
      const coatMesh = new THREE.Mesh(coatGeo, ivorySilkMat);
      coatMesh.position.y = -0.5;
      groom.add(coatMesh);

      // Upper Torso / Sherwani
      const torsoGeo = new THREE.CylinderGeometry(0.48, 0.42, 1.2, 16);
      const torsoMesh = new THREE.Mesh(torsoGeo, ivorySilkMat);
      torsoMesh.position.y = 0.8;
      groom.add(torsoMesh);

      // Gold Brocade Buttons Placket
      const placketGeo = new THREE.BoxGeometry(0.08, 1.1, 0.04);
      const placketMesh = new THREE.Mesh(placketGeo, goldMat);
      placketMesh.position.set(0, 0.8, 0.46);
      groom.add(placketMesh);

      // Maroon Royal Stole / Dupatta draped over shoulder
      const stoleGeo = new THREE.TorusGeometry(0.52, 0.09, 12, 18, Math.PI * 1.2);
      const stoleMesh = new THREE.Mesh(stoleGeo, maroonSashMat);
      stoleMesh.rotation.z = -0.5;
      stoleMesh.rotation.y = 0.3;
      stoleMesh.position.set(0.05, 1.0, 0.1);
      groom.add(stoleMesh);

      // Faceless Stylised Head (Smooth porcelain / gold-undertone mannequin)
      const headGeo = new THREE.SphereGeometry(0.32, 24, 24);
      headGeo.scale(0.85, 1.05, 0.95);
      const headMesh = new THREE.Mesh(headGeo, ivorySilkMat);
      headMesh.position.y = 1.65;
      groom.add(headMesh);

      // Traditional Groom Topi / Cap (Emerald velvet with gold rim)
      const capGeo = new THREE.CylinderGeometry(0.31, 0.33, 0.28, 16);
      const capMesh = new THREE.Mesh(capGeo, emeraldVelvetMat);
      capMesh.position.y = 1.95;
      groom.add(capMesh);

      const capRimGeo = new THREE.TorusGeometry(0.32, 0.035, 12, 24);
      const capRimMesh = new THREE.Mesh(capRimGeo, goldMat);
      capRimMesh.rotation.x = Math.PI * 0.5;
      capRimMesh.position.y = 1.82;
      groom.add(capRimMesh);

      // Right Arm: Raised gracefully to heart in "Assalamu Alaikum" posture
      const armUpperGeo = new THREE.CylinderGeometry(0.1, 0.11, 0.65, 12);
      const armUpper = new THREE.Mesh(armUpperGeo, ivorySilkMat);
      armUpper.position.set(0.48, 0.8, 0.2);
      armUpper.rotation.z = -0.6;
      armUpper.rotation.x = 0.3;
      groom.add(armUpper);

      const armForeGeo = new THREE.CylinderGeometry(0.09, 0.1, 0.6, 12);
      const armFore = new THREE.Mesh(armForeGeo, ivorySilkMat);
      armFore.position.set(0.2, 0.85, 0.5);
      armFore.rotation.z = 1.1;
      armFore.rotation.y = -0.4;
      groom.add(armFore);

      // Stylised Faceless Hand on heart
      const handGeo = new THREE.SphereGeometry(0.12, 12, 12);
      handGeo.scale(1.2, 0.5, 1.5);
      const handMesh = new THREE.Mesh(handGeo, ivorySilkMat);
      handMesh.position.set(0.02, 0.95, 0.52);
      groom.add(handMesh);

      // Left Arm: Gracefully relaxed at side
      const leftArm = new THREE.Mesh(armUpperGeo, ivorySilkMat);
      leftArm.position.set(-0.52, 0.7, 0);
      leftArm.rotation.z = 0.25;
      groom.add(leftArm);

      groom.position.set(-1.4, -1.8, 0.5);
      groom.scale.set(0.9, 0.9, 0.9);
      groom.rotation.y = 0.28;
      return groom;
    };

    // Bride (Right-center)
    const createBride = () => {
      const bride = new THREE.Group();

      // Flared Royal Anarkali Gown
      const skirtGeo = new THREE.ConeGeometry(0.95, 2.2, 24);
      const skirtMesh = new THREE.Mesh(skirtGeo, emeraldVelvetMat);
      skirtMesh.position.y = -0.4;
      bride.add(skirtMesh);

      // Gold embroidered border along hem
      const hemGeo = new THREE.TorusGeometry(0.92, 0.05, 12, 32);
      const hemMesh = new THREE.Mesh(hemGeo, goldMat);
      hemMesh.rotation.x = Math.PI * 0.5;
      hemMesh.position.y = -1.48;
      bride.add(hemMesh);

      // Upper Bodice
      const bodiceGeo = new THREE.CylinderGeometry(0.38, 0.36, 1.0, 16);
      const bodiceMesh = new THREE.Mesh(bodiceGeo, emeraldVelvetMat);
      bodiceMesh.position.y = 0.85;
      bride.add(bodiceMesh);

      // Gold Neckline Choker / Jewelry Accent
      const necklaceGeo = new THREE.TorusGeometry(0.32, 0.04, 12, 24);
      const necklaceMesh = new THREE.Mesh(necklaceGeo, goldMat);
      necklaceMesh.rotation.x = Math.PI * 0.5;
      necklaceMesh.position.set(0, 1.3, 0.1);
      bride.add(necklaceMesh);

      // Faceless Stylised Head
      const headGeo = new THREE.SphereGeometry(0.29, 24, 24);
      headGeo.scale(0.85, 1.05, 0.95);
      const headMesh = new THREE.Mesh(headGeo, ivorySilkMat);
      headMesh.position.y = 1.62;
      bride.add(headMesh);

      // Flowing Dupatta / Bridal Veil covering head and cascading shoulders
      const veilGeo = new THREE.SphereGeometry(0.46, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.65);
      const veilMat = new THREE.MeshStandardMaterial({
        color: 0x134e3a,
        roughness: 0.5,
        metalness: 0.2,
        side: THREE.DoubleSide,
      });
      const veilMesh = new THREE.Mesh(veilGeo, veilMat);
      veilMesh.position.set(0, 1.55, -0.05);
      bride.add(veilMesh);

      // Gold Filigree Mathapatti / Head Border
      const headBorderGeo = new THREE.TorusGeometry(0.38, 0.03, 12, 24, Math.PI);
      const headBorderMesh = new THREE.Mesh(headBorderGeo, goldMat);
      headBorderMesh.position.set(0, 1.76, 0.22);
      headBorderMesh.rotation.x = 0.2;
      bride.add(headBorderMesh);

      // Gracefully folded hands in warm adab greeting
      const handsGeo = new THREE.SphereGeometry(0.14, 12, 12);
      handsGeo.scale(1.4, 0.6, 0.8);
      const handsMesh = new THREE.Mesh(handsGeo, ivorySilkMat);
      handsMesh.position.set(0, 0.72, 0.42);
      bride.add(handsMesh);

      // Gold Bangles on wrists
      const bangleGeo = new THREE.TorusGeometry(0.12, 0.025, 8, 16);
      const bangleLeft = new THREE.Mesh(bangleGeo, goldMat);
      bangleLeft.position.set(-0.16, 0.72, 0.38);
      bride.add(bangleLeft);

      const bangleRight = new THREE.Mesh(bangleGeo, goldMat);
      bangleRight.position.set(0.16, 0.72, 0.38);
      bride.add(bangleRight);

      bride.position.set(1.4, -1.8, 0.5);
      bride.scale.set(0.88, 0.88, 0.88);
      bride.rotation.y = -0.28;
      return bride;
    };

    const groomMesh = createGroom();
    const brideMesh = createBride();

    charactersGroup.add(groomMesh);
    charactersGroup.add(brideMesh);
    charactersGroup.position.set(0, -0.2, 0);

    scene.add(charactersGroup);
    charactersRef.current = {
      group: charactersGroup,
      groom: groomMesh,
      bride: brideMesh,
    };

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

      // Characters Breathing and Greeting subtle motion
      if (charactersRef.current.groom && charactersRef.current.bride) {
        const breath = Math.sin(elapsedTime * 2.2) * 0.02;
        charactersRef.current.groom.position.y = -1.8 + breath;
        charactersRef.current.bride.position.y = -1.8 + breath * 0.8;
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
      // Swing doors outward smoothly
      gsap.to(doorsRef.current.left.rotation, {
        y: -Math.PI * 0.65,
        duration: 2.2,
        ease: 'power3.inOut',
      });
      gsap.to(doorsRef.current.right.rotation, {
        y: Math.PI * 0.65,
        duration: 2.2,
        ease: 'power3.inOut',
      });

      // Flood with golden volumetric light
      if (doorsRef.current.light) {
        gsap.to(doorsRef.current.light, {
          intensity: 6.0,
          duration: 1.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        });
      }

      // Dolly camera forward slightly
      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          z: 7.2,
          duration: 2.4,
          ease: 'power2.out',
        });
      }

      // Fade out doors group once fully opened so it doesn't block content
      if (doorsRef.current.group) {
        gsap.to(doorsRef.current.group.position, {
          y: -15,
          delay: 1.8,
          duration: 1.4,
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
