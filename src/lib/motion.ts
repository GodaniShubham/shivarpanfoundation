import { type Transition, type Variants } from "framer-motion";

export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as const,
  easeSoft: [0.25, 1, 0.5, 1] as const,
  easeSharp: [0.16, 1, 0.3, 1] as const,
  duration: {
    fast: 0.28,
    medium: 0.52,
    slow: 0.78,
  },
  distance: {
    short: 18,
    medium: 36,
    long: 52,
  },
} as const;

export type RevealDirection = "up" | "down" | "left" | "right" | "scale";

const hiddenByDirection: Record<RevealDirection, Record<string, number>> = {
  up: { opacity: 0, y: motionTokens.distance.medium },
  down: { opacity: 0, y: -motionTokens.distance.medium },
  left: { opacity: 0, x: -motionTokens.distance.medium },
  right: { opacity: 0, x: motionTokens.distance.medium },
  scale: { opacity: 0, scale: 0.92 },
};

export const revealVariants: Record<RevealDirection, Variants> = {
  up: {
    hidden: hiddenByDirection.up,
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  down: {
    hidden: hiddenByDirection.down,
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  left: {
    hidden: hiddenByDirection.left,
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  right: {
    hidden: hiddenByDirection.right,
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  scale: {
    hidden: hiddenByDirection.scale,
    visible: { opacity: 1, scale: 1 },
  },
};

export const createRevealTransition = (
  delay = 0,
  duration = motionTokens.duration.medium,
): Transition => ({
  duration,
  delay,
  ease: motionTokens.ease,
});

export const createStaggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const hoverLiftTransition: Transition = {
  duration: motionTokens.duration.fast,
  ease: motionTokens.easeSoft,
};
