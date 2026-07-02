"use client";

import React, { useEffect, useState, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxLife: number;
  life: number;
}

export default function MagicalClouds() {
  const [isFlashing, setIsFlashing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);

  // Random Lightning Flash Effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerLightning = () => {
      // First quick flash
      setIsFlashing(true);
      setTimeout(() => {
        setIsFlashing(false);
        // Second quick flash (double-flash)
        if (Math.random() > 0.4) {
          setTimeout(() => {
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 90);
          }, 120);
        }
      }, 70);

      // Schedule next flash between 9s and 19s
      const nextDelay = Math.random() * 10000 + 9000;
      timeoutId = setTimeout(triggerLightning, nextDelay);
    };

    // Start checking for lightning
    timeoutId = setTimeout(triggerLightning, 6000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Drifting Golden Sparkles Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial sparkles (reduced count for lightweight performance)
    const sparkCount = 60;
    const initialSparkles: Sparkle[] = [];
    for (let i = 0; i < sparkCount; i++) {
      initialSparkles.push({
        x: Math.random() * (canvas.width || window.innerWidth),
        y: Math.random() * (canvas.height || window.innerHeight),
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.2 + 0.1), // Slower upward movement
        speedX: Math.random() * 0.2 - 0.1,    // Gentler horizontal drift
        alpha: Math.random() * 0.5 + 0.1,
        maxLife: Math.random() * 300 + 150,   // Longer life for smoother fade
        life: Math.random() * 300,
      });
    }
    sparklesRef.current = initialSparkles;

    const updateAndDraw = () => {
      if (!canvas.width || !canvas.height) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sparkles
      sparklesRef.current.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.life++;

        // Smooth fade in and out
        let currentAlpha = s.alpha;
        if (s.life < s.maxLife * 0.2) {
          currentAlpha = (s.life / (s.maxLife * 0.2)) * s.alpha;
        } else if (s.life > s.maxLife * 0.8) {
          currentAlpha = ((s.maxLife - s.life) / (s.maxLife * 0.2)) * s.alpha;
        }

        if (s.life >= s.maxLife || s.y < 0) {
          // Recycle sparkle at bottom smoothly
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
          s.life = 0;
          s.alpha = Math.random() * 0.5 + 0.1;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#fcd34d"; // Gold glow
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();
      });

      animFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {/* Moving background clouds (Luxury Gold & Amber blurs) */}
      <div className="absolute top-1/4 -left-[20%] w-[60%] h-[70%] bg-gradient-to-tr from-[#1a1300]/80 to-[#2a1b00]/60 rounded-full blur-[160px] animate-cloud-slow pointer-events-none" />
      <div className="absolute top-1/3 -right-[10%] w-[50%] h-[60%] bg-[#211600]/70 rounded-full blur-[180px] animate-cloud-slow-reverse pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[70%] h-[50%] bg-[#1c1300]/60 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDuration: "12s" }} />

      {/* Floating Sparkles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Lightning Flash Overlay */}
      <div
        className={`absolute inset-0 w-full h-full bg-[#fffcf0] transition-opacity duration-75 pointer-events-none z-[5] ${
          isFlashing ? "opacity-[0.09]" : "opacity-0"
        }`}
      />
    </div>
  );
}
