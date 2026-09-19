"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Award, GraduationCap, Trophy } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { achievements, education } from "@/data/resume";

const SectionScene3D = dynamic(() => import("./SectionScene3D"), { ssr: false });

function gradeRatio(result: string) {
  const m = result.match(/([\d.]+)\s*\/\s*([\d.]+)/);
  if (!m) return 0;
  return Math.min(1, parseFloat(m[1]) / parseFloat(m[2]));
}

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="education" className="relative overflow-clip py-20 sm:py-28">
      <SectionScene3D
        variant="education"
        progress={scrollYProgress}
        sticky
        className="absolute inset-0 opacity-60"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education & Achievements" title="Academic background" repeat />

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-300">
              <GraduationCap size={16} /> Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <Reveal key={edu.school} delay={i * 0.08} direction="turnLeft" repeat>
                  <TiltCard className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-[2px] sm:bg-slate-950/50 sm:backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white">{edu.school}</h4>
                      <span className="text-xs text-cyan-300">{edu.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{edu.degree}</p>
                    <p className="mt-1 text-xs text-emerald-300">{edu.result}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                        style={{ width: `${gradeRatio(edu.result) * 100}%` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{
                          scaleX: 1,
                          transition: { duration: 1.1, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
                        }}
                        viewport={{ once: false, amount: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-300">
              <Award size={16} /> Achievements & Certificates
            </h3>
            <div className="space-y-3">
              {achievements.map((item, i) => (
                <Reveal key={item} delay={i * 0.08} direction="turnRight" repeat>
                  <TiltCard className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-[2px] sm:bg-slate-950/50 sm:backdrop-blur-sm">
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{
                        scale: 1,
                        rotate: 0,
                        transition: { type: "spring", stiffness: 260, damping: 12, delay: 0.25 + i * 0.1 },
                      }}
                      viewport={{ once: false, amount: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"
                    >
                      <Trophy size={14} />
                    </motion.span>
                    <p className="text-sm text-slate-300">{item}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
