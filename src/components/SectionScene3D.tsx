"use client";

import { Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useInView, type MotionValue } from "framer-motion";
import type { Group } from "three";

type Variant = "skills" | "experience" | "projects" | "education" | "contact";

function FitGroup({ children, zoom = 1 }: { children: ReactNode; zoom?: number }) {
  const width = useThree((state) => state.viewport.width);
  const fit = Math.min(1, width / 6.5) * zoom;
  return (
    <group position={[width * 0.22, 0, 0]} scale={fit}>
      {children}
    </group>
  );
}

function ProjectsShapes({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<Group>(null);
  const items = useMemo(
    () => [
      { pos: [0, 0, 0], geo: "box", size: 1.1, color: "#10b981", speed: 0.3 },
      { pos: [2.2, 1.1, -0.6], geo: "tetra", size: 0.7, color: "#22d3ee", speed: 0.5 },
      { pos: [-2.1, -1, 0.3], geo: "octa", size: 0.75, color: "#34d399", speed: 0.4 },
      { pos: [1.6, -1.6, 0.4], geo: "box", size: 0.45, color: "#6ee7b7", speed: 0.6 },
      { pos: [-1.8, 1.6, -0.4], geo: "tetra", size: 0.5, color: "#22d3ee", speed: 0.35 },
    ],
    []
  );

  useFrame(() => {
    const p = progress.get();
    if (!group.current) return;
    group.current.rotation.y = p * Math.PI * 3;
    group.current.rotation.x = Math.sin(p * Math.PI * 2) * 0.5;
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Float key={i} speed={1 + it.speed} floatIntensity={0.9} rotationIntensity={1.2}>
          <mesh position={it.pos as [number, number, number]}>
            {it.geo === "box" && <boxGeometry args={[it.size, it.size, it.size]} />}
            {it.geo === "tetra" && <tetrahedronGeometry args={[it.size, 0]} />}
            {it.geo === "octa" && <octahedronGeometry args={[it.size, 0]} />}
            <meshStandardMaterial color={it.color} emissive={it.color} emissiveIntensity={0.6} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function EducationRings({ progress }: { progress: MotionValue<number> }) {
  const a = useRef<Group>(null);
  const b = useRef<Group>(null);
  const c = useRef<Group>(null);

  useFrame(() => {
    const p = progress.get() * Math.PI * 2;
    if (a.current) a.current.rotation.set(p * 1.2, p * 0.6, 0);
    if (b.current) b.current.rotation.set(0, p * 1.5, p * 0.8);
    if (c.current) c.current.rotation.set(p * 0.9, 0, p * 1.3);
  });

  return (
    <group>
      <group ref={a}>
        <mesh>
          <torusGeometry args={[2.2, 0.03, 12, 96]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.9} />
        </mesh>
      </group>
      <group ref={b}>
        <mesh>
          <torusGeometry args={[1.7, 0.03, 12, 96]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.9} />
        </mesh>
      </group>
      <group ref={c}>
        <mesh>
          <torusGeometry args={[1.2, 0.03, 12, 96]} />
          <meshStandardMaterial color="#6ee7b7" emissive="#6ee7b7" emissiveIntensity={0.9} />
        </mesh>
      </group>
      <Float speed={1.5} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.8} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function ContactGlobe({ progress }: { progress: MotionValue<number> }) {
  const globe = useRef<Group>(null);
  const orbit = useRef<Group>(null);

  useFrame((_, delta) => {
    const p = progress.get();
    if (globe.current) globe.current.rotation.y = p * Math.PI * 3;
    if (orbit.current) orbit.current.rotation.z += delta * 0.4;
  });

  return (
    <group rotation={[0.35, 0, 0.2]}>
      <group ref={globe}>
        <mesh>
          <sphereGeometry args={[1.7, 28, 20]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.45} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.55, 24, 24]} />
          <meshStandardMaterial color="#022c22" emissive="#065f46" emissiveIntensity={0.25} transparent opacity={0.7} />
        </mesh>
      </group>
      <group ref={orbit}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.4, 0.02, 12, 120]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} />
        </mesh>
        <mesh position={[2.4, 0, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[-2.4, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#6ee7b7" emissive="#6ee7b7" emissiveIntensity={1.4} />
        </mesh>
      </group>
    </group>
  );
}

function SkillsShapes({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<Group>(null);
  const spin = useRef<Group>(null);

  useFrame((_, delta) => {
    const p = progress.get();
    if (group.current) {
      group.current.rotation.y = p * Math.PI * 2.5;
      group.current.rotation.x = p * 1.4;
      group.current.position.y = (0.5 - p) * 2.2;
    }
    if (spin.current) spin.current.rotation.z += delta * 0.25;
  });

  return (
    <group ref={group}>
      <group ref={spin}>
        <Float speed={1.3} floatIntensity={0.8}>
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.25, 1]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} wireframe />
          </mesh>
        </Float>
        <Float speed={1.6} floatIntensity={1}>
          <mesh position={[2.2, 0.8, -0.5]}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.7} wireframe />
          </mesh>
        </Float>
        <Float speed={1.1} floatIntensity={1.2}>
          <mesh position={[-2, -1, 0.3]} rotation={[1, 0.4, 0]}>
            <torusGeometry args={[0.7, 0.16, 16, 48]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.6} wireframe />
          </mesh>
        </Float>
      </group>
      <mesh>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#6ee7b7" emissive="#6ee7b7" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function ExperienceHelix({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<Group>(null);
  const count = 44;
  const viewportWidth = useThree((state) => state.viewport.width);
  const fit = Math.min(1, viewportWidth / 2.4);
  const radius = 0.85 * fit;
  const beadScale = Math.max(fit, 0.7);

  const beads = useMemo(
    () =>
      Array.from({ length: count * 2 }, (_, i) => ({
        i: i % count,
        strand: i < count ? 0 : 1,
      })),
    []
  );

  useFrame(() => {
    const p = progress.get();
    if (!group.current) return;
    group.current.rotation.y = p * Math.PI * 4;
    group.current.position.y = (0.5 - p) * 1.5;
    group.current.rotation.z = Math.sin(p * Math.PI * 2) * 0.15;
  });

  return (
    <group ref={group}>
      {beads.map(({ i, strand }) => {
        const t = i / (count - 1);
        const angle = t * Math.PI * 6 + strand * Math.PI;
        return (
          <mesh key={`${strand}-${i}`} position={[Math.cos(angle) * radius, (t - 0.5) * 6.5, Math.sin(angle) * radius]}>
            <sphereGeometry args={[(strand ? 0.055 : 0.075) * beadScale, 12, 12]} />
            <meshStandardMaterial
              color={strand ? "#22d3ee" : "#10b981"}
              emissive={strand ? "#22d3ee" : "#10b981"}
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function SectionScene3D({
  variant,
  progress,
  className = "",
  sticky = false,
}: {
  variant: Variant;
  progress: MotionValue<number>;
  className?: string;
  sticky?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "150px" });

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className={sticky ? "sticky top-0 h-screen w-full" : "h-full w-full"}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 1.5]}
          frameloop={inView ? "always" : "never"}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.9} />
            <pointLight position={[4, 4, 5]} intensity={1.4} color="#34d399" />
            <pointLight position={[-4, -3, 4]} intensity={1} color="#22d3ee" />
            {variant === "skills" && <SkillsShapes progress={progress} />}
            {variant === "experience" && <ExperienceHelix progress={progress} />}
            {variant === "projects" && (
              <FitGroup zoom={1.7}>
                <ProjectsShapes progress={progress} />
              </FitGroup>
            )}
            {variant === "education" && (
              <FitGroup>
                <EducationRings progress={progress} />
              </FitGroup>
            )}
            {variant === "contact" && (
              <FitGroup>
                <ContactGlobe progress={progress} />
              </FitGroup>
            )}
            <Sparkles count={40} scale={8} size={2} speed={0.3} color="#22d3ee" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
