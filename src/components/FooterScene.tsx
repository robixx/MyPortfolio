"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Mesh } from "three";

function FooterShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} scale={0.85}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#10b981"
          emissive="#0d9488"
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.2}
          distort={0.25}
          speed={1.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function FooterScene() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 3]} intensity={1.2} color="#34d399" />
          <pointLight position={[-3, -2, -3]} intensity={0.8} color="#22d3ee" />
          <FooterShape />
          <Sparkles count={30} scale={4} size={2} speed={0.3} color="#22d3ee" />
        </Suspense>
      </Canvas>
    </div>
  );
}
