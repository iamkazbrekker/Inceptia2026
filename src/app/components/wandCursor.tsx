"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

const TRAIL_LIFETIME = 600; // ms each spark stays alive
const MIN_DISTANCE = 12;    // px moved before spawning a new spark

function WandCursor() {
  const [showCursor, setShowCursor] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const idRef = useRef(0);
  const lastPointRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setShowCursor(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setShowCursor(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const dx = e.clientX - lastPointRef.current.x;
      const dy = e.clientY - lastPointRef.current.y;
      if (Math.hypot(dx, dy) < MIN_DISTANCE) return;

      lastPointRef.current = { x: e.clientX, y: e.clientY };
      const point: TrailPoint = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        createdAt: Date.now(),
      };
      setTrail((prev) => [...prev.slice(-25), point]);
    };

    window.addEventListener("mousemove", move, { passive: true });

    // Prune expired sparks
    const interval = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((p) => now - p.createdAt < TRAIL_LIFETIME));
    }, 50);

    return () => {
      window.removeEventListener("mousemove", move);
      mediaQuery.removeEventListener("change", handleChange);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  if (!showCursor) return null;

  return (
    <>
      {/* Fading spark trail */}
      <AnimatePresence>
        {trail.map((point) => {
          // Slight per-spark randomness so the trail feels organic, not mechanical
          const size = 10 + (point.id % 5) * 3; // varies 10–22px
          const rotation = (point.id % 2 === 0 ? 1 : -1) * 45;

          return (
            <motion.div
              key={point.id}
              className="pointer-events-none fixed top-0 left-0 z-[9998]"
              style={{
                left: point.x,
                top: point.y,
                translateX: "-50%",
                translateY: "-50%",
                mixBlendMode: "screen", // additive glow — overlaps light up instead of muddying
              }}
              initial={{ opacity: 1, scale: 0.6, rotate: 0 }}
              animate={{ opacity: 0, scale: 1.6, rotate: rotation }}
              exit={{ opacity: 0 }}
              transition={{ duration: TRAIL_LIFETIME / 1000, ease: "easeOut" }}
            >
              {/* Outer soft halo */}
              <div
                className="absolute rounded-full blur-[3px]"
                style={{
                  width: size * 2.4,
                  height: size * 2.4,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(255,220,130,0.8) 0%, rgba(255,190,60,0.35) 45%, transparent 75%)",
                }}
              />
              {/* Bright white-gold core */}
              <div
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(255,255,240,1) 0%, rgba(255,225,140,0.9) 40%, rgba(255,200,60,0.5) 70%, transparent 100%)",
                  boxShadow: "0 0 8px 2px rgba(255,215,0,0.6)",
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Wand cursor itself */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: mouseX, y: mouseY }}
      >
        <img
          src="/stick.webp"
          alt="Wand"
          className="w-12 sm:w-16 md:w-20 lg:w-24 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
          style={{
            transformOrigin: "top left",
            transform: "translate(-10%, -10%)",
          }}
        />
      </motion.div>
    </>
  );
}

export default WandCursor;