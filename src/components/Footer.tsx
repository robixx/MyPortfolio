"use client";

import dynamic from "next/dynamic";
import { profile } from "@/data/resume";
import Reveal from "./Reveal";

const FooterScene = dynamic(() => import("./FooterScene"), { ssr: false });

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-10">
      <FooterScene />
      <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 sm:px-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="text-xs text-slate-600">Built with Next.js, Tailwind CSS & Three.js</p>
      </Reveal>
    </footer>
  );
}
