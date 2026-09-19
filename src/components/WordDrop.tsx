"use client";

import { motion } from "framer-motion";

type Segment = { text: string; highlight?: boolean };

const container = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.03, delayChildren: delay },
  }),
};

const word = {
  hidden: { y: "-110%", opacity: 0, filter: "blur(4px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

export default function WordDrop({
  segments,
  className = "",
  delay = 0,
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
}) {
  const words = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, highlight: seg.highlight }))
  );

  return (
    <motion.p
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((item, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em] align-bottom">
            <motion.span
              variants={word}
              className={`inline-block ${item.highlight ? "font-medium text-white" : ""}`}
            >
              {item.w}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </motion.p>
  );
}
