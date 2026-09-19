"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const badges = [
  { label: "ASP.NET Core", top: "6%", left: "18%" },
  { label: "C# / .NET", top: "2%", left: "62%" },
  { label: "Python", top: "37%", left: "-6%" },
  { label: "PostgreSQL", top: "24%", left: "88%" },
  { label: "React", top: "66%", left: "-1%" },
  { label: "Docker", top: "76%", left: "82%" },
  { label: "SQL Server", top: "21%", left: "4%" },
  { label: "Angular", top: "52%", left: "-8%" },
  { label: "Microservices", top: "50%", left: "102%" },
  { label: "CI/CD", top: "9%", left: "92%" },
  { label: "MongoDB", top: "86%", left: "16%" },
];

export default function OrbitPhoto() {
  return (
    <div className="relative mx-auto h-[220px] w-[220px] scale-90 sm:h-[280px] sm:w-[280px] sm:scale-100 md:h-[320px] md:w-[320px]">
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-[13%] overflow-hidden rounded-full border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
        <Image
          src="/profile-casual.webp"
          alt="Md. Shoriful Islam"
          fill
          sizes="(min-width: 768px) 240px, 180px"
          className="origin-[46%_10%] scale-[1.28] object-cover object-top"
          priority
        />
      </div>

      {badges.map((badge, i) => (
        <motion.span
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-slate-950/90 px-2 py-1 text-[10px] font-medium text-emerald-200 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[11px]"
          style={{ top: badge.top, left: badge.left }}
        >
          {badge.label}
        </motion.span>
      ))}

      <span className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/90 px-2 py-1 text-[10px] font-medium text-slate-200 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Available
      </span>
    </div>
  );
}
