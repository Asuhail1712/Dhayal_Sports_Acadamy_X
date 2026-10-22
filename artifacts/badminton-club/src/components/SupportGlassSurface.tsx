import { useEffect, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { CardArtwork } from "@/components/CardArtwork";
import { getCardPointer } from "@/lib/card-pointer";

export function SupportGlassSurface({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, { stiffness: 220, damping: 28 });
  const rotateY = useSpring(targetY, { stiffness: 220, damping: 28 });
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(0);
  const light = useMotionTemplate`radial-gradient(480px circle at ${lightX}% ${lightY}%, rgba(var(--support-glass-tint,33,81,163),0.10), transparent 65%)`;

  useEffect(() => {
    if (!reduced) return;
    targetX.set(0);
    targetY.set(0);
  }, [reduced, targetX, targetY]);

  const reset = () => {
    targetX.set(0);
    targetY.set(0);
  };
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      reduced ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      reset();
      return;
    }
    // Measure the stable sticky wrapper, not the surface being tilted.
    const frame = event.currentTarget.parentElement;
    if (!frame) return;
    const pointer = getCardPointer(
      frame.getBoundingClientRect(),
      event.clientX,
      event.clientY,
    );
    targetX.set(pointer.rotateX);
    targetY.set(pointer.rotateY);
    lightX.set(pointer.lightX);
    lightY.set(pointer.lightY);
  };

  return (
    <motion.div
      className="support-glass-surface"
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
    >
      <CardArtwork />
      <motion.div
        className="support-pointer-light"
        style={{ background: light }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
