"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import OrbitPhoto from "./OrbitPhoto";
import { profile } from "@/data/resume";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.2),transparent_45%)]" />
      <Scene3D />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 pt-28 pb-16 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-emerald-300">
            Available for opportunities
          </span>

          <h1 className="mt-6 whitespace-nowrap text-[1.9rem] font-extrabold leading-[1.08] text-white min-[400px]:text-4xl sm:text-6xl md:text-3xl lg:text-5xl xl:text-[3.5rem]">
            {profile.name}
          </h1>

          <p className="mt-4 text-lg sm:text-xl font-semibold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
            {profile.title} · {profile.subtitle}
          </p>

          <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-emerald-400 hover:text-emerald-300"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-emerald-400 hover:text-emerald-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-emerald-400 hover:text-emerald-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-first flex justify-center pb-4 md:order-last md:pb-0"
        >
          <OrbitPhoto />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-400"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
