"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { skillGroups } from "@/data/resume";

const SectionScene3D = dynamic(() => import("./SectionScene3D"), { ssr: false });

const directions = ["flip", "turnLeft", "turnRight"] as const;

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="skills" className="relative overflow-hidden py-20 sm:py-28">
      <SectionScene3D
        variant="skills"
        progress={scrollYProgress}
        className="absolute inset-y-0 right-0 w-full opacity-40 lg:w-3/5 lg:opacity-80"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Skills" title="Tools & technologies I work with" repeat />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={(i % 3) * 0.08}
              direction={directions[i % 3]}
              repeat
            >
              <TiltCard className="h-full rounded-2xl border border-white/10 bg-slate-950/25 p-6 backdrop-blur-[2px] transition-colors hover:border-emerald-400/40 hover:bg-slate-950/50">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.6, y: 14 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 320,
                          damping: 16,
                          delay: 0.25 + j * 0.04,
                        },
                      }}
                      viewport={{ once: false, amount: 0.6 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs text-slate-300"
                    >
                      {item}
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
