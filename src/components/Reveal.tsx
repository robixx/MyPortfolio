"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "drop" | "flip" | "turnLeft" | "turnRight";

type Offset = { x: number; y: number; scale?: number; rotateX?: number; rotateY?: number };

const offsets: Record<Direction, Offset> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: -36, y: 0 },
  right: { x: 36, y: 0 },
  drop: { x: 0, y: -90, scale: 0.94 },
  flip: { x: 0, y: 40, scale: 0.94, rotateX: -70 },
  turnLeft: { x: -70, y: 0, scale: 0.94, rotateY: -40 },
  turnRight: { x: 70, y: 0, scale: 0.94, rotateY: 40 },
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  repeat = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  repeat?: boolean;
}) {
  const { x, y, scale = 1, rotateX = 0, rotateY = 0 } = offsets[direction];

  const isSpring = direction === "drop" || direction === "flip";
  const base: Transition = isSpring
    ? { type: "spring", stiffness: 240, damping: 20, mass: 0.9 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1000 }}
      initial={{ opacity: 0, x, y, scale, rotateX, rotateY }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        transition: { ...base, delay },
      }}
      viewport={{ once: !repeat, amount: 0.2 }}
      transition={base}
    >
      {children}
    </motion.div>
  );
}
