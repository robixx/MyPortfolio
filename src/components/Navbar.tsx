"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#071a0f]/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 py-4">
        <a href="#home" className="font-bold text-lg text-white tracking-tight">
          Shoriful<span className="text-emerald-400">.</span>dev
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:shorifulislam776@gmail.com?subject=Resume%20Request"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 text-sm text-white transition-colors"
        >
          <Download size={15} />
          Get Resume
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#071a0f]/95 backdrop-blur-xl px-5 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-slate-200 text-base border-b border-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
