"use client";

import { useEffect, useState } from "react";

export default function WandCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Only show on devices with a mouse
    const mediaQuery = window.matchMedia("(pointer: fine)");

    setShowCursor(mediaQuery.matches);

    const handleChange = (e) => setShowCursor(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    const move = (e) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (!showCursor) return null;

  return (
    <img
      src="/stick.png"
      alt=""
      className="
        pointer-events-none
        fixed
        z-[9999]
        w-12
        sm:w-16
        md:w-20
        lg:w-24
        xl:w-28
        transition-transform
        duration-75
      "
      style={{
        left: pos.x,
        top: pos.y,
        // transform: "translate(-15%, -85%) rotate(-25deg)",
      }}
    />
  );
}