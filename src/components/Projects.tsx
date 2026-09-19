"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { projects } from "@/data/resume";

const SectionScene3D = dynamic(() => import("./SectionScene3D"), { ssr: false });

const directions = ["turnLeft", "flip", "turnRight"] as const;

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="projects" className="relative overflow-clip py-20 sm:py-28">
      <SectionScene3D
        variant="projects"
        progress={scrollYProgress}
        sticky
        className="absolute inset-0 opacity-60"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Projects" title="Things I've built" repeat />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              delay={(i % 3) * 0.08}
              direction={directions[i % 3]}
              repeat
            >
              <TiltCard className="group h-full rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-[2px] transition-shadow hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 sm:bg-slate-950/50 sm:backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0, rotate: -120 }}
                  whileInView={{
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.2 },
                  }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-400/20 text-emerald-300 transition-colors group-hover:text-cyan-300"
                >
                  <FolderGit2 size={20} />
                </motion.div>
                <h3 className="mt-4 text-base font-semibold text-white">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech, j) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 12, scale: 0.7 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 320,
                          damping: 16,
                          delay: 0.3 + j * 0.06,
                        },
                      }}
                      viewport={{ once: false, amount: 0.6 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full border border-white/10 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-400"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
