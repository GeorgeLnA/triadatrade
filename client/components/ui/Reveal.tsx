import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealVariant =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  durationMs?: number;
}

export function Reveal({
  children,
  className,
  variant = "slide-up",
  delayMs = 0,
  durationMs = 600,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const initialByVariant: Record<RevealVariant, any> = {
    fade: { opacity: 0 },
    "slide-up": { opacity: 0, y: 24 },
    "slide-down": { opacity: 0, y: -24 },
    "slide-left": { opacity: 0, x: 24 },
    "slide-right": { opacity: 0, x: -24 },
    scale: { opacity: 0, scale: 0.98 },
  };

  const animateByVariant: Record<RevealVariant, any> = {
    fade: { opacity: 1 },
    "slide-up": { opacity: 1, y: 0 },
    "slide-down": { opacity: 1, y: 0 },
    "slide-left": { opacity: 1, x: 0 },
    "slide-right": { opacity: 1, x: 0 },
    scale: { opacity: 1, scale: 1 },
  };

  const initial = prefersReducedMotion ? { opacity: 1 } : initialByVariant[variant];
  const animate = prefersReducedMotion ? { opacity: 1 } : animateByVariant[variant];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: durationMs / 1000,
        delay: delayMs / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;


