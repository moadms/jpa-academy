'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SceneProps {
  variant?: 'cubes' | 'rings' | 'crystals';
}

export const Hero3DScene: React.FC<SceneProps> = ({ variant = 'crystals' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 3, 20); // Purple glow
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 20); // Cyan glow
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xec4899, 2, 15); // Pink glow
    pointLight3.position.set(0, 4, -2);
    scene.add(pointLight3);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // Central Icosahedron (The "JPA Core Crystal")
    const mainGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 1.2,
      wireframe: true,
      emissive: 0x3b0764,
      emissiveIntensity: 0.4
    });
    const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
    group.add(mainMesh);

    // Orbiting Data Rings (Toruses representing ORM layers)
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.3, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xdb2777,
      emissiveIntensity: 0.8
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    group.add(ring2);

    // Floating Data Particles / Mini Nodes (Entities)
    const particleCount = 28;
    const particleGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xc084fc,
      emissiveIntensity: 1
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.4 + Math.sin(i) * 0.8;
      p.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * radius
      );
      group.add(p);
      particles.push(p);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow smooth rotation
      mainMesh.rotation.x = elapsedTime * 0.25;
      mainMesh.rotation.y = elapsedTime * 0.35;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Pulse floating particles
      particles.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime * 2 + idx) * 0.003;
      });

      // Subtle float of whole group
      group.position.y = Math.sin(elapsedTime * 0.8) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [variant]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[360px] sm:min-h-[460px] relative pointer-events-none"
      aria-hidden="true"
    />
  );
};
