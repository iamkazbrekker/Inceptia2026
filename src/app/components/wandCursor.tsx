import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from "framer-motion";

function WandCursor() {
  const [showCursor, setShowCursor] = useState(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Fade out effects as user scrolls down past the hero section
  const { scrollY } = useScroll();
  const vignetteOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setShowCursor(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setShowCursor(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [mouseX, mouseY]);

  const spotlightBackground = useMotionTemplate`radial-gradient(circle 400px at ${mouseX}px ${mouseY}px, rgba(255, 255, 200, 0.15) 0%, rgba(255, 215, 0, 0.05) 40%, transparent 80%)`;

  // Lighter darkened background (0.3 instead of 0.6)
  const darkenBackground = useMotionTemplate`radial-gradient(circle 600px at ${mouseX}px ${mouseY}px, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 100%)`;

  if (!showCursor) return null;

  return (
    <>
      {/* Static Vignette Effect (Lighter 0.4 opacity) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9996] shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]"
        style={{ opacity: vignetteOpacity }}
      />

      {/* Magical Spotlight Effect (Always visible or fade out? Usually we want the wand spotlight everywhere, but the dark overlay fades) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9997]"
        style={{
          background: spotlightBackground,
          mixBlendMode: "screen",
        }}
      />

      {/* Darkened overlay outside the spotlight for more contrast */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          background: darkenBackground,
          opacity: vignetteOpacity // Fades out on scroll so it's only on the front section
        }}
      />

      {/* Wand Container for Hardware Accelerated positioning */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <img
          src="/stick.png"
          alt="Wand"
          className="w-12 sm:w-16 md:w-20 lg:w-24 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
          style={{
            transformOrigin: "top left",
            transform: "rotate(-35deg) translate(-10%, -10%)",
          }}
        />
      </motion.div>
    </>
  );
}

export default WandCursor;

