"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
// Helper components

// 1. Magnetic Button Component
export function CastSpellButton({ children, className, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });

  const shouldReduce = useReducedMotion();

  function handleMouseMove(event) {
    if (shouldReduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - (rect.left + rect.width / 2);
    const mouseY = event.clientY - (rect.top + rect.height / 2);
    // Multiply by 0.35 for a controlled magnetic pull
    x.set(mouseX * 0.35);
    y.set(mouseY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={shouldReduce ? {} : { x: springX, y: springY }}
      className="relative inline-block overflow-hidden rounded-lg group"
    >
      {/* Continuous Pulse Glow Glow ring */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-container to-secondary rounded-lg blur opacity-35 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse" />

      {/* Glow aura */}
      {!shouldReduce && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHovered ? { opacity: 0.5, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-primary-container blur-xl rounded-lg pointer-events-none"
        />
      )}

      {/* Light flare overlay */}
      {!shouldReduce && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-20" />
        </motion.div>
      )}

      <motion.button
        animate={shouldReduce ? {} : { scale: isHovered ? 1.05 : 1 }}
        onClick={onClick}
        className={`${className} relative z-10`}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

// 2. 3D Cursor Tilting Card Component (About Section)
export function Card3D({ children, className }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  const springRotateX = useSpring(rotateX, { damping: 25, stiffness: 200 });
  const springRotateY = useSpring(rotateY, { damping: 25, stiffness: 200 });

  const shouldReduce = useReducedMotion();

  function handleMouseMove(event) {
    if (shouldReduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      <motion.div
        style={
          shouldReduce
            ? {}
            : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: "preserve-3d",
            }
        }
        className="w-full h-full preserve-3d"
      >
        {children}
      </motion.div>
    </div>
  );
}

// 3. Domain Card with SNAPPY Hover Micro-interactions
export function DomainCard({ icon, title, description, shouldReduce, variants }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card p-8 rounded-xl flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
    >
      <motion.span
        animate={shouldReduce ? {} : { y: isHovered ? -6 : 0, scale: isHovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 12 }}
        className="material-symbols-outlined text-6xl text-primary-container mb-4 select-none"
      >
        {icon}
      </motion.span>
      <motion.h3
        animate={{ color: isHovered ? "#ffd700" : "#fff6df" }}
        transition={{ duration: 0.15 }}
        className="font-headline-md text-headline-md font-semibold mb-2"
      >
        {title}
      </motion.h3>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {description}
      </p>
    </motion.div>
  );
}

// 4. Timeline Node component with footprint/snappy interactions
export function TimelineNode({ time, title, subtitle, alignRight, delay, shouldReduce }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center w-full ${alignRight ? "flex-row-reverse" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-1/2 ${alignRight ? "pl-8 text-left" : "pr-8 text-right"}`}>
        <motion.h4
          animate={{ color: isHovered ? "#ffd700" : "#fff6df" }}
          transition={{ duration: 0.15 }}
          className="font-headline-md text-headline-md font-semibold"
        >
          {title}
        </motion.h4>
        <p className="font-body-md text-on-surface-variant">{subtitle}</p>
      </div>

      <div className="relative flex items-center justify-center w-8 h-8 flex-shrink-0 z-10">
        <motion.div
          animate={shouldReduce ? {} : { scale: isHovered ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-8 h-8 rounded-full bg-primary-container border-4 border-background flex-shrink-0 z-10 footprints"
          style={{ animationDelay: `${delay}s` }}
        />
        {isHovered && !shouldReduce && (
          <motion.div
            layoutId="glowCircle"
            className="absolute inset-0 bg-primary-container rounded-full blur-sm opacity-50 z-0"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </div>

      <div className={`w-1/2 ${alignRight ? "pr-8 text-right" : "pl-8 text-left"}`}>
        <p className="font-label-md text-label-md text-primary-container tracking-widest uppercase font-semibold">
          {time}
        </p>
      </div>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-08-07T09:00:00");

    const difference = targetDate.getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    // Calculate immediately after mounting
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between text-center mt-2 px-2 max-w-sm mx-auto">
      <div>
        <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
          {timeLeft.days}
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant text-xs tracking-wider">
          DAYS
        </span>
      </div>

      <span className="font-headline-lg text-headline-lg text-outline-variant font-bold">
        :
      </span>

      <div>
        <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant text-xs tracking-wider">
          HOURS
        </span>
      </div>

      <span className="font-headline-lg text-headline-lg text-outline-variant font-bold">
        :
      </span>

      <div>
        <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant text-xs tracking-wider">
          MINS
        </span>
      </div>

      <span className="font-headline-lg text-headline-lg text-outline-variant font-bold">
        :
      </span>

      <div>
        <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant text-xs tracking-wider">
          SECS
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const shouldReduce = useReducedMotion();
  const prizesRef = useRef(null);
  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let stormTimeout;
    const flashTimeouts = [];

    const flash = (delay, duration) => {
      flashTimeouts.push(
        setTimeout(() => {
          setFlash(true);

          flashTimeouts.push(
            setTimeout(() => {
              setFlash(false);
            }, duration)
          );
        }, delay)
      );
    };

    const triggerStorm = () => {
      // Random lightning pattern
      const patterns = [
        // Single flash
        [{ d: 0, t: 90 }],

        // Double flash
        [
          { d: 0, t: 70 },
          { d: 140, t: 90 },
        ],

        // Triple flash
        [
          { d: 0, t: 60 },
          { d: 110, t: 50 },
          { d: 260, t: 120 },
        ],

        // Intense storm
        [
          { d: 0, t: 50 },
          { d: 90, t: 40 },
          { d: 170, t: 70 },
          { d: 320, t: 140 },
        ],
      ];

      const pattern =
        patterns[Math.floor(Math.random() * patterns.length)];

      pattern.forEach(({ d, t }) => flash(d, t));

      // Next lightning after 6–18 seconds
      stormTimeout = setTimeout(
        triggerStorm,
        6000 + Math.random() * 12000
      );
    };

    // Initial delay
    stormTimeout = setTimeout(
      triggerStorm,
      3000 + Math.random() * 4000
    );

    return () => {
      clearTimeout(stormTimeout);
      flashTimeouts.forEach(clearTimeout);
    };
  }, []); useEffect(() => {
    let stormTimeout;
    const flashTimeouts = [];

    const flash = (delay, duration) => {
      flashTimeouts.push(
        setTimeout(() => {
          setFlash(true);

          flashTimeouts.push(
            setTimeout(() => {
              setFlash(false);
            }, duration)
          );
        }, delay)
      );
    };

    const triggerStorm = () => {
      // Random lightning pattern
      const patterns = [
        // Single flash
        [{ d: 0, t: 90 }],

        // Double flash
        [
          { d: 0, t: 70 },
          { d: 140, t: 90 },
        ],

        // Triple flash
        [
          { d: 0, t: 60 },
          { d: 110, t: 50 },
          { d: 260, t: 120 },
        ],

        // Intense storm
        [
          { d: 0, t: 50 },
          { d: 90, t: 40 },
          { d: 170, t: 70 },
          { d: 320, t: 140 },
        ],
      ];

      const pattern =
        patterns[Math.floor(Math.random() * patterns.length)];

      pattern.forEach(({ d, t }) => flash(d, t));

      // Next lightning after 6–18 seconds
      stormTimeout = setTimeout(
        triggerStorm,
        6000 + Math.random() * 12000
      );
    };

    // Initial delay
    stormTimeout = setTimeout(
      triggerStorm,
      3000 + Math.random() * 4000
    );

    return () => {
      clearTimeout(stormTimeout);
      flashTimeouts.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    let targetX = currentX;
    let targetY = currentY;

    let animationFrame;

    const handleMove = (e) => {
      const rect = hero.getBoundingClientRect();

      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      hero.style.setProperty("--x", `${currentX}px`);
      hero.style.setProperty("--y", `${currentY}px`);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prizes 3D Scroll Perspective effect
  const { scrollYProgress } = useScroll({
    target: prizesRef,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const opacityVal = useTransform(scrollYProgress, [0, 0.8], [0.4, 1]);

  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 80 });
  const springTranslateZ = useSpring(translateZ, { damping: 20, stiffness: 80 });
  const springOpacity = useSpring(opacityVal, { damping: 20, stiffness: 80 });

  // Spring animation variants for staggered cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    "About",
    "Domains",
    "Timeline",
    "Prizes",
    "Contact",
  ];

  return (
    <AnimatePresence>
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Fixed Navigation */}
        <nav
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? "bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-lg"
            : "bg-transparent"
            }`}
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">

            {/* Logo */}
            <div className="text-xl md:text-2xl font-bold text-primary-container">
              INCEPTIA
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="group relative text-on-surface-variant hover:text-primary transition-colors"
                >
                  {item}

                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <CastSpellButton className="rounded-lg bg-gradient-to-r from-primary-container to-secondary px-6 py-2 font-semibold shadow-lg hover:scale-105 transition">
                Cast Your Spell
              </CastSpellButton>
            </div>

            {/* Mobile Right */}
            <div className="flex items-center gap-3 md:hidden">

              <CastSpellButton className="px-4 py-2 rounded-lg text-sm text-black">
                Register
              </CastSpellButton>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary-container"
              >
                <span className="material-symbols-outlined text-4xl">
                  {mobileMenuOpen ? "close" : "menu"}
                </span>
              </button>

            </div>

          </div>
        </nav>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <span className="absolute left-10 top-20 material-symbols-outlined text-yellow-300/20 text-6xl animate-pulse">
            auto_awesome
          </span>

          <span className="absolute right-10 bottom-24 material-symbols-outlined text-yellow-300/20 text-5xl animate-pulse delay-300">
            stars
          </span>

          <div className="absolute left-1/2 top-1/2 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#0b0814]/95 backdrop-blur-2xl md:hidden"
            >
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col justify-center items-center gap-10"
              >
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-bold text-primary-container hover:text-yellow-300 transition"
                  >
                    {item}
                  </a>
                ))}

                <CastSpellButton className="mt-10 px-8 py-4 rounded-xl text-lg">
                  Cast Your Spell
                </CastSpellButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className={`relative min-h-screen flex items-center justify-center pt-28 pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden
            relative min-h-screen transition-all duration-75 ${flash ? "brightness-125 contrast-125 saturate-110" : ""
            }`}
        >
          {/* Background */}
          <div className="absolute inset-0 z-[-2] pointer-events-none">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7N_hX_44CP9l53dwLxQmPCbBEH0fICJT8gVCEsmJP-npDUrKimVGADxSualIkiThpPvmv6Sk_NuX_m8WbU71nZY5PB9QZahxWNivPqp8KAXCMoH1IEhcKIiQL4SKPiq4vbFtTYTPblEq_xQFIBgT8B7BiCx5Pr0EVQDqQlWNFZ5wqQZbhLgKfBHtwuabB46y_OHRo9IdYfUKhxvKOaLwNN0pnLEofBAW8EGZYl4a8vtx4Z6WLnuwyQl8ZXXL7LT5sHuqR9fffB5s"
              alt="Magical Background"
            />
          </div>
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-100 ${flash ? "opacity-100" : "opacity-0"
              }`}
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              mixBlendMode: "screen",
            }}
          />

          <div
            className="absolute inset-0 z-[-1] pointer-events-none transition-all duration-100"
            style={{
              background: flash
                ? "rgba(0,0,0,0.05)"
                : `
        radial-gradient(
          ellipse 320px 270px at var(--x,50%) var(--y,50%),
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.02) 20%,
          rgba(0,0,0,0.06) 35%,
          rgba(0,0,0,0.12) 50%,
          rgba(0,0,0,0.25) 70%,
          rgba(0,0,0,0.45) 85%,
          rgba(0,0,0,0.65) 100%
        )
      `,
            }}
          />
          {/* Existing bottom gradient */}
          <div className="absolute inset-0 z-[-1] pointer-events-none bg-gradient-to-b from-transparent via-background/30 to-background" />

          {/* Hero Content */}
          <div className="text-center z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
            <h1 className={`font-harry-potter text-5xl md:text-7xl text-primary drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]
              transition-all duration-150 ${flash
                ? "brightness-125 drop-shadow-[0_0_30px_white]"
                : ""
              }`}>
              INCEPTIA HACKATHON{" "}
              <span className="font-parry-hotter text-8xl">2026</span>
            </h1>

            <p className="font-headline-md text-xl md:text-2xl text-tertiary-fixed max-w-2xl px-4">
              Join Earth's Mightiest Developers! Collaborate, innovate, and compete in
              a coding challenge worthy of heroes.
              <span className="text-error"> Whatever it takes.</span>
            </p>

            {/* <CastSpellButton className="bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md px-10 py-5 rounded-lg text-lg uppercase tracking-widest font-bold">
              Cast Your Spell (Register Now)
            </CastSpellButton> */}

            <div className="flex flex-wrap justify-center gap-8 mt-12 w-full max-w-3xl px-4">
              <div
                className="glass-card p-6 rounded-xl flex-1 min-w-[200px] text-center float-anim"
                style={{ animationDelay: "0s" }}
              >
                <div className="font-headline-lg text-5xl text-primary-container font-bold">
                  24
                </div>
                <div className="font-label-md text-label-md text-on-surface-variant mt-2 uppercase tracking-wide">
                  Hours of Hacking
                </div>
              </div>

              <div
                className="glass-card p-6 rounded-xl flex-1 min-w-[200px] text-center float-anim"
                style={{ animationDelay: "1s" }}
              >
                <div className="font-headline-lg text-5xl text-primary-container font-bold">
                  ₹50k+
                </div>
                <div className="font-label-md text-label-md text-on-surface-variant mt-2 uppercase tracking-wide">
                  Prize Pool
                </div>
              </div>

              <div
                className="glass-card p-6 rounded-xl flex-1 min-w-[200px] text-center float-anim"
                style={{ animationDelay: "2s" }}
              >
                <div className="font-headline-lg text-5xl text-primary-container font-bold">
                  400+
                </div>
                <div className="font-label-md text-label-md text-on-surface-variant mt-2 uppercase tracking-wide">
                  Wizards Assembled
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop relative" id="about">
          <div className="max-w-container-max mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: 3D Castle Image Card */}
            <div className="flex justify-center">
              <Card3D className="w-full max-w-lg aspect-[4/3] p-4 border-2 border-outline-variant bg-surface-container rounded-lg relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-primary-container/10 blur-3xl rounded-full pointer-events-none" />
                <div className="w-full h-full overflow-hidden rounded relative preserve-3d">
                  <img
                    className="w-full h-full object-cover rounded border border-outline/50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa-ZdjtZIvmsnaL_xWpaek7qWJlljWLjJiuc2sF5pL6uVde3pVwSZawv6TkWRGofxnqpRG96d98ZrPpeASBrnsh3WbPdtjlO7PFl1T57GoKRCRjktQH0NamPkSixtGPtUzGN70QAugcgDHbA9BvyuYxtK1Y7CzXKf43TTbIZtIUZtWgssajbS0OEyTM3tOup5Cf5Cr9cArEshDAkxGp2NwQHIQG4sfi3_IacN7swWA5IGDexgwS-jFHoTNuf--thg-dms3VOmXVII"
                    alt="Magical School Castle"
                  />
                  {/* Subtle golden highlights mapping to mouse interactions */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-container/5 to-white/10 mix-blend-overlay pointer-events-none" />
                </div>
              </Card3D>
            </div>

            {/* Right Column: Copy & Countdown */}
            <div className="flex flex-col gap-6">
              <h2 className="font-headline-lg text-4xl text-primary-container font-bold">
                The Magic Behind the Hackathon
              </h2>
              <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
                Step into the grand halls of innovation. Inceptia 2026 is not just a hackathon; it is a crucible where raw talent is forged into mastery. Over 24 relentless hours, teams will conceptualize, build, and deploy magical solutions to real-world problems. Gather your coven, consult your grimoires (documentation), and prepare for a challenge unlike any other.
              </p>

              <div className="glass-card p-6 rounded-xl mt-6">
                <h3 className="font-label-md text-label-md text-primary mb-4 text-center tracking-widest uppercase font-semibold">
                  Time Until Magic Commences
                </h3>
                <Countdown />
              </div>
            </div>
          </div>
        </section>

        {/* Domains Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop relative" id="domains">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-display-lg text-4xl md:text-5xl text-primary text-center mb-16 drop-shadow-[0_0_12px_rgba(255,215,0,0.3)] font-bold">
              Choose Your Magical House (Domains)
            </h2>

            <motion.div
              variants={shouldReduce ? {} : containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <DomainCard
                icon="smart_toy"
                title="Artificial Intelligence & Machine Learning (AI Agents)"
                description="Build intelligent AI systems, autonomous agents, and data-driven solutions that solve complex real-world challenges through machine learning and automation."
                shouldReduce={shouldReduce}
                variants={itemVariants}
              />

              <DomainCard
                icon="account_balance_wallet"
                title="Web3 (Blockchain) & Fintech"
                description="Develop decentralized applications, blockchain solutions, smart contracts, and next-generation financial technologies that redefine digital trust and transactions."
                shouldReduce={shouldReduce}
                variants={itemVariants}
              />

              <DomainCard
                icon="health_and_safety"
                title="Healthcare"
                description="Create innovative technologies that improve patient care, diagnostics, medical accessibility, and healthcare management through digital transformation."
                shouldReduce={shouldReduce}
                variants={itemVariants}
              />

              <DomainCard
                icon="school"
                title="Education"
                description="Reimagine learning with interactive platforms, AI-powered education, and accessible technologies that empower learners across the globe."
                shouldReduce={shouldReduce}
                variants={itemVariants}
              />

              <DomainCard
                icon="auto_awesome"
                title="Open Innovation"
                description="Have a groundbreaking idea beyond conventional domains? Bring your bold vision to life with complete creative freedom."
                shouldReduce={shouldReduce}
                variants={itemVariants}
              />
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        {/* Timeline Section */}
        <section
          className="py-24 px-margin-mobile md:px-margin-desktop relative"
          id="timeline"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display-lg text-4xl md:text-5xl text-primary-container text-center mb-16 italic">
              The Marauder&apos;s Map (Event Schedule)
            </h2>

            <div className="relative flex justify-center">
              <Image
                src="/Timeline.png"
                alt="INCEPTIA 2K26 Event Timeline"
                width={900}
                height={400}
                className="w-1/2 h-auto object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section
          id="prizes"
          className="relative py-28 overflow-hidden px-margin-mobile md:px-margin-desktop"
        >
          {/* Magical Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-20 top-20 w-56 h-56 rounded-full bg-yellow-400/10 blur-[120px]" />
            <div className="absolute right-20 bottom-20 w-72 h-72 rounded-full bg-purple-600/10 blur-[140px]" />

            <span className="absolute left-16 top-32 material-symbols-outlined text-yellow-300/20 text-5xl animate-pulse">
              auto_awesome
            </span>

            <span className="absolute right-20 top-44 material-symbols-outlined text-yellow-200/20 text-4xl animate-pulse delay-300">
              stars
            </span>

            <span className="absolute left-1/2 bottom-20 material-symbols-outlined text-yellow-300/20 text-6xl animate-pulse delay-700">
              flare
            </span>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">

            <h2 className="text-center text-5xl md:text-6xl font-bold text-primary-container mb-5">
              The Wizard's Treasure Vault
            </h2>

            <p className="max-w-2xl mx-auto text-center text-on-surface-variant mb-20">
              Only the finest innovators shall unlock the enchanted rewards hidden
              within the ancient vault.
            </p>

            <motion.div
              style={
                shouldReduce
                  ? {}
                  : {
                    rotateX: springRotateX,
                    translateZ: springTranslateZ,
                    opacity: springOpacity,
                    transformStyle: "preserve-3d",
                  }
              }
              className="grid md:grid-cols-3 gap-10 items-end"
            >

              {/* ================= SECOND ================= */}

              <div className="relative rounded-3xl border border-slate-400/30 bg-slate-900/60 backdrop-blur-xl p-8 text-center h-[420px] flex flex-col justify-end shadow-[0_0_40px_rgba(220,220,220,.12)] transition duration-500 hover:-translate-y-4">

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent" />

                <span className="material-symbols-outlined text-6xl text-slate-300 mb-5">
                  workspace_premium
                </span>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Runner-Up
                </h3>

                <p className="text-5xl font-black text-slate-200">
                  ₹15,000
                </p>

                <div className="mt-8 space-y-2 text-slate-300">
                  <p>🏅 Magical Medal</p>
                  <p>📜 Certificate</p>
                  <p>🎁 Exclusive Swag</p>
                </div>

              </div>

              {/* ================= FIRST ================= */}

              <div className="relative rounded-[32px] border border-yellow-400/50 bg-gradient-to-b from-yellow-500/15 via-black/40 to-black/70 backdrop-blur-xl p-10 text-center h-[520px] flex flex-col justify-end shadow-[0_0_90px_rgba(255,215,0,.25)] hover:scale-105 transition duration-500 md:-translate-y-10 overflow-hidden">

                {/* Glow */}
                <div className="absolute inset-0 bg-yellow-300/10 blur-3xl animate-pulse" />

                {/* Floating stars */}
                <span className="absolute top-8 left-8 material-symbols-outlined text-yellow-300 animate-pulse">
                  auto_awesome
                </span>

                <span className="absolute right-8 top-16 material-symbols-outlined text-yellow-300 animate-pulse delay-500">
                  stars
                </span>

                <span className="material-symbols-outlined text-8xl text-yellow-300 drop-shadow-[0_0_20px_rgba(255,215,0,.9)] mb-8">
                  emoji_events
                </span>

                <h3 className="text-3xl font-bold text-yellow-100 mb-3">
                  Grand Champion
                </h3>

                <p className="text-7xl font-black text-yellow-300">
                  ₹25,000
                </p>

                <div className="mt-8 space-y-3 text-yellow-50">
                  <p>🏆 Champion Trophy</p>
                  <p>🎖️ Winner Certificate</p>
                  <p>💼 Internship Opportunities</p>
                  <p>🎁 Premium Goodies</p>
                </div>

              </div>

              {/* ================= THIRD ================= */}

              <div className="relative rounded-3xl border border-amber-700/40 bg-amber-950/40 backdrop-blur-xl p-8 text-center h-[390px] flex flex-col justify-end shadow-[0_0_35px_rgba(180,120,60,.18)] transition duration-500 hover:-translate-y-4">

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent" />

                <span className="material-symbols-outlined text-6xl text-amber-500 mb-5">
                  diamond
                </span>

                <h3 className="text-2xl font-bold text-amber-200 mb-2">
                  Second Runner-Up
                </h3>

                <p className="text-5xl font-black text-amber-400">
                  ₹10,000
                </p>

                <div className="mt-8 space-y-2 text-amber-200">
                  <p>🎖️ Medal</p>
                  <p>📜 Certificate</p>
                  <p>🎁 Magical Merchandise</p>
                </div>

              </div>

            </motion.div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="py-16 px-margin-mobile md:px-margin-desktop relative border-t border-outline-variant/30 bg-surface/50">
          <div className="max-w-container-max mx-auto text-center">
            <h3 className="font-headline-md text-on-surface-variant mb-8 uppercase tracking-widest font-semibold">
              Our Ministry Supporters
            </h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <div className="w-32 h-16 bg-surface-container-high rounded flex items-center justify-center font-label-md text-xs font-bold border border-outline-variant/20 hover:border-primary-container/40 transition duration-300">
                Logo 1
              </div>
              <div className="w-32 h-16 bg-surface-container-high rounded flex items-center justify-center font-label-md text-xs font-bold border border-outline-variant/20 hover:border-primary-container/40 transition duration-300">
                Logo 2
              </div>
              <div className="w-32 h-16 bg-surface-container-high rounded flex items-center justify-center font-label-md text-xs font-bold border border-outline-variant/20 hover:border-primary-container/40 transition duration-300">
                Logo 3
              </div>
              <div className="w-32 h-16 bg-surface-container-high rounded flex items-center justify-center font-label-md text-xs font-bold border border-outline-variant/20 hover:border-primary-container/40 transition duration-300">
                Logo 4
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="bg-surface-container-lowest w-full py-16 px-margin-desktop flex flex-col md:flex-row justify-between items-start gap-gutter border-t border-primary-container/20 shadow-[0_-10px_40px_rgba(255,215,0,0.05)] relative z-10"
          id="contact"
        >
          <div className="flex flex-col gap-4 max-w-sm px-4">
            <div className="font-headline-md text-headline-md text-primary-container uppercase tracking-widest font-bold">
              INCEPTIA 2026
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              © 2026 INCEPTIA HACKATHON. ALL RIGHTS RESERVED BY THE MINISTRY OF INNOVATION.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 text-sm leading-relaxed">
              inceptia2025@gmail.com
              <br />
              Pimpri Chinchwad College of Engineering and Research, Ravet, Pune.
            </p>
          </div>
          <div className="flex gap-12 px-4 mt-6 md:mt-0">
            <div className="flex flex-col gap-3">
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary-container hover:underline decoration-primary-container/50 transition-all opacity-80 hover:opacity-100"
                href="#"
              >
                Ministry Supporters
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary-container hover:underline decoration-primary-container/50 transition-all opacity-80 hover:opacity-100"
                href="#"
              >
                Spellbook (Docs)
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary-container hover:underline decoration-primary-container/50 transition-all opacity-80 hover:opacity-100"
                href="#"
              >
                Enchanted Support
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary-container hover:underline decoration-primary-container/50 transition-all opacity-80 hover:opacity-100"
                href="#"
              >
                House Rules
              </a>
            </div>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
}
