"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { experience } from "@/data/resume";

const SectionScene3D = dynamic(() => import("./SectionScene3D"), { ssr: false });

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: lineProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(lineProgress, { stiffness: 120, damping: 24 });

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-20 sm:py-28">
      <SectionScene3D
        variant="experience"
        progress={sectionProgress}
        className="absolute inset-y-0 right-0 w-3/5 opacity-65 sm:w-2/5 sm:opacity-60 lg:w-1/3 lg:opacity-70"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Experience" title="Where I've made an impact" repeat />

        <div ref={listRef} className="relative border-l border-white/10 pl-8 sm:pl-10 lg:mr-[30%]">
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute -left-px top-0 h-full w-[2px] origin-top bg-gradient-to-b from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
          />

          {experience.map((job, i) => (
            <Reveal
              key={job.company + job.period}
              delay={0.05}
              direction={i % 2 === 0 ? "turnRight" : "flip"}
              repeat
              className="relative pb-12 last:pb-0"
            >
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{
                  scale: 1,
                  rotate: 0,
                  transition: { type: "spring", stiffness: 300, damping: 14, delay: 0.15 },
                }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.2 }}
                className="absolute -left-[41px] sm:-left-[49px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/50 bg-slate-950 text-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.45)]"
              >
                <Briefcase size={14} />
              </motion.span>

              <TiltCard className="rounded-2xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur-[2px] sm:bg-slate-950/50 sm:backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <span className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs text-cyan-300">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-emerald-300">{job.company}</p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((point, j) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, delay: 0.3 + j * 0.09, ease: [0.22, 1, 0.36, 1] },
                      }}
                      viewport={{ once: false, amount: 0.6 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 text-sm leading-relaxed text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
