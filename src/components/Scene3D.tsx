"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Group, Mesh } from "three";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function DistortKnot() {
  const meshRef = useRef<Mesh>(null);
  const isMobile = useIsMobile();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;
    }
  });

  const position: [number, number, number] = isMobile ? [0, 1, -1.4] : [1.7, -0.15, -1.2];
  const scale = isMobile ? 0.5 : 1.05;

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={meshRef} scale={scale} position={position}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#10b981"
          emissive="#0d9488"
          emissiveIntensity={0.55}
          roughness={0.3}
          metalness={0.05}
          distort={0.3}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

function OrbitDots() {
  const groupRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });
  return (
    <group ref={groupRef}>
      <Sparkles count={80} scale={7} size={2.5} speed={0.4} color="#22d3ee" />
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-75" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.1} />
          <pointLight position={[5, 5, 5]} intensity={1.6} color="#34d399" />
          <pointLight position={[-5, -3, -5]} intensity={1.1} color="#22d3ee" />
          <pointLight position={[0, 0, 6]} intensity={0.9} color="#6ee7b7" />
          <DistortKnot />
          <OrbitDots />
        </Suspense>
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
