"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { profile } from "@/data/resume";

const SectionScene3D = dynamic(() => import("./SectionScene3D"), { ssr: false });

const items = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
  { icon: GithubIcon, label: "GitHub", value: "github.com/robixx", href: profile.github },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/shoriful-islam-robi",
    href: profile.linkedin,
  },
];

const directions = ["turnLeft", "flip", "turnRight"] as const;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="contact" className="relative overflow-clip py-20 sm:py-28">
      <SectionScene3D
        variant="contact"
        progress={scrollYProgress}
        sticky
        className="absolute inset-0 opacity-60"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Contact" title="Let's build something together" repeat />

        <Reveal direction="drop" repeat>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-slate-950/40 to-cyan-400/10 p-6 backdrop-blur-[2px] sm:p-10 sm:backdrop-blur-sm"
          >
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Open to full-time roles and freelance projects involving ASP.NET Core, Python, and
              full-stack web development. Reach out through any channel below.
            </p>

            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30"
            >
              <Send size={16} />
              Say hello
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/40"
                animate={{ x: ["0%", "500%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
              />
            </motion.a>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => {
                const Wrapper = item.href ? "a" : "div";
                return (
                  <Reveal
                    key={item.label}
                    delay={(i % 3) * 0.08}
                    direction={directions[i % 3]}
                    repeat
                  >
                    <TiltCard className="h-full rounded-2xl">
                      <Wrapper
                        {...(item.href
                          ? { href: item.href, target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition-colors hover:border-emerald-400/40"
                      >
                        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-emerald-300">
                          <motion.span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-xl border border-emerald-400/50"
                            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
                          />
                          <item.icon size={18} />
                        </span>
                        <span>
                          <span className="block text-[11px] uppercase tracking-wide text-slate-500">
                            {item.label}
                          </span>
                          <span className="block break-all text-sm text-slate-200">{item.value}</span>
                        </span>
                      </Wrapper>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
