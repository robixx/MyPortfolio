"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, ShieldCheck, Sparkles } from "lucide-react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import WordDrop from "./WordDrop";

const stats = [
  { icon: Briefcase, label: "Years Experience", to: 4, suffix: "+" },
  { icon: Code2, label: "Core Stack", text: "C# / .NET" },
  { icon: ShieldCheck, label: "Gov & Financial Systems", to: 4 },
  { icon: Sparkles, label: "Projects Shipped", to: 10, suffix: "+" },
];

const chips = ["ASP.NET Core", "C#", "Python", "SQL Server", "Docker", "Azure DevOps"];

const chipList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

const chip = {
  hidden: { y: -40, opacity: 0, scale: 0.9 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 16 },
  },
};

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 35, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ x: [0, -45, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl origin-left bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="About Me" title="Engineering reliable systems at scale" />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <WordDrop
              className="text-base leading-relaxed text-slate-300"
              segments={[
                {
                  text: "I'm a Full Stack Software Engineer based in Dhaka, Bangladesh, specializing in",
                },
                { text: "ASP.NET Core, C#, and Python.", highlight: true },
                {
                  text: "Over the past 4+ years I've built enterprise, financial, and government-level systems — from payment gateway integrations for national banks to real-time hospital CRMs — with a relentless focus on performance, scalability, and security.",
                },
              ]}
            />
            <WordDrop
              className="mt-4 text-base leading-relaxed text-slate-300"
              delay={0.3}
              segments={[
                {
                  text: "I work comfortably across the stack: designing Clean/Onion architecture backends, optimizing SQL Server queries, integrating payment and banking APIs, and shipping responsive React/Angular front-ends — all wrapped in Dockerized, CI/CD-driven delivery pipelines.",
                },
              ]}
            />

            <motion.ul
              className="mt-6 flex flex-wrap gap-2"
              variants={chipList}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              {chips.map((label) => (
                <motion.li
                  key={label}
                  variants={chip}
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200"
                >
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                direction={i === 0 || i === 3 ? "drop" : i === 1 ? "left" : "right"}
              >
                <TiltCard className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-emerald-400/40">
                  <stat.icon className="text-emerald-400" size={22} />
                  <p className="mt-3 text-2xl font-bold text-white">
                    {"to" in stat && stat.to !== undefined ? (
                      <CountUp to={stat.to} suffix={stat.suffix} />
                    ) : (
                      stat.text
                    )}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
