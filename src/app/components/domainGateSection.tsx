"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const domains = [
  {
    title: "AI & ML",
    description:
      "Build intelligent machine learning models, neural networks, and self-directing software agents to solve automated challenges.",
    icon: "/emblems/aiml.svg",
    accentColor: "text-red-400",
    glowColor: "rgba(239, 68, 68, 0.45)",
    bgGradient: "from-red-950/40 via-red-900/20 to-transparent",
    borderColor: "border-red-500/50",
  },
  {
    title: "Web3 & Fintech",
    description:
      "Develop decentralized financial protocols, cryptographic ledger applications, custom smart contracts, and secure blockchain code.",
    icon: "/emblems/web3.svg",
    accentColor: "text-blue-400",
    glowColor: "rgba(59, 130, 246, 0.45)",
    bgGradient: "from-blue-950/40 via-blue-900/20 to-transparent",
    borderColor: "border-blue-500/50",
  },
  {
    title: "Healthcare",
    description:
      "Forge biotech applications, digital diagnostic systems, medical support portals, and assistive technologies to improve patient accessibility.",
    icon: "/emblems/healthcare.svg",
    accentColor: "text-yellow-400",
    glowColor: "rgba(245, 158, 11, 0.45)",
    bgGradient: "from-yellow-950/40 via-yellow-900/20 to-transparent",
    borderColor: "border-yellow-500/50",
  },
  {
    title: "Education",
    description:
      "Design interactive digital classrooms, game-based learning environments, simulation systems, and training interfaces.",
    icon: "/emblems/education.svg",
    accentColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.45)",
    bgGradient: "from-emerald-950/40 via-emerald-900/20 to-transparent",
    borderColor: "border-emerald-500/50",
  },
  {
    title: "Open Innovation",
    description:
      "A category dedicated to any groundbreaking technology, software solutions, or physical prototype that does not fit into the other four domains.",
    icon: "/emblems/otherinnovation.svg",
    accentColor: "text-purple-400",
    glowColor: "rgba(139, 92, 246, 0.45)",
    bgGradient: "from-purple-950/40 via-purple-900/20 to-transparent",
    borderColor: "border-purple-500/50",
  },
];

export default function DomainGateSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    
    // The total scrollable area consists of cards and gap.
    // By finding which card is closest to the center of the scroll view, we update activeIndex.
    const scrollCenter = scrollLeft + clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    // Iterate through children to find the one closest to the center
    const children = Array.from(scrollRef.current.children);
    children.forEach((child, index) => {
      // Ignore spacer divs which we'll add at the start and end (index 0 and length-1)
      if (index === 0 || index === children.length - 1) return;
      
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - childCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index - 1; // Subtract 1 because of the initial spacer div
      }
    });

    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < domains.length) {
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    // Check initial scroll position
    handleScroll();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const children = Array.from(scrollRef.current.children);
      
      let nextIndex = activeIndex + 1;
      if (nextIndex >= domains.length) {
        nextIndex = 0; // loop back
      }
      
      // children[0] is the left spacer, so domain cards start at index 1
      const targetChild = children[nextIndex + 1] as HTMLElement;
      if (targetChild) {
        // Find the precise scroll position needed to center this child
        const containerCenter = scrollRef.current.clientWidth / 2;
        const childCenter = targetChild.offsetLeft + (targetChild.offsetWidth / 2);
        
        scrollRef.current.scrollTo({
          left: childCenter - containerCenter,
          behavior: "smooth"
        });
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  const activeDomain = domains[activeIndex];

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden py-12 transition-colors duration-700">
      
      {/* Dynamic Background Tint based on Active Domain */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000 z-0">
        <div className={`absolute inset-0 bg-gradient-to-b opacity-40 transition-all duration-1000 ${activeDomain.bgGradient}`} />
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold text-white font-harry-potter drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] mb-4 md:mb-10 z-10 text-center px-4"
      >
        Choose Your Domain
      </motion.h1>

      <div className="relative w-full z-10">
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center pb-12 pt-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Spacer to allow the first item to snap to center */}
          <div className="shrink-0 w-[50vw] sm:w-[calc(50vw-180px)] md:w-[calc(50vw-200px)] h-1" />

          {domains.map((domain, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] mx-3 sm:mx-4 snap-center rounded-[2rem] border bg-black/40 backdrop-blur-2xl p-8 flex flex-col items-center group transition-all duration-700 ${isActive ? 'scale-105 shadow-2xl z-20' : 'scale-95 opacity-50 hover:opacity-80 z-10'} ${domain.borderColor}`}
                style={{
                  boxShadow: isActive ? `0 20px 50px -10px ${domain.glowColor}, inset 0 0 20px rgba(255,255,255,0.05)` : `0 0 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)`,
                }}
              >
                {/* Internal Glow Effect */}
                <div 
                  className={`absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-700 pointer-events-none -z-10 bg-gradient-to-br from-transparent to-black`}
                  style={{ filter: "blur(10px)" }}
                />
                
                {/* Top gradient line highlight */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-t-[2rem] opacity-30 transition-opacity`} />

                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 transition-transform duration-700 ease-out">
                  {/* SVG Icon Glow */}
                  <div 
                    className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-700 ${isActive ? 'opacity-70' : 'opacity-20'}`}
                    style={{ backgroundColor: domain.glowColor }}
                  />
                  <Image 
                    src={domain.icon} 
                    alt={domain.title} 
                    fill
                    className={`object-contain relative z-10 transition-all duration-700 ${isActive ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110' : 'drop-shadow-none scale-100 grayscale-[0.3]'}`} 
                  />
                </div>
                
                <h2 className={`text-4xl font-bold mb-4 text-center font-harry-potter transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {domain.title}
                </h2>
                
                <div className={`h-px transition-all duration-700 ease-in-out mb-6 ${isActive ? 'w-24 bg-white/40' : 'w-12 bg-white/10'}`} />
                
                <p className={`text-center leading-relaxed text-sm md:text-base px-2 transition-colors duration-500 ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                  {domain.description}
                </p>
              </motion.div>
            );
          })}

          {/* Spacer to allow the last item to snap to center */}
          <div className="shrink-0 w-[50vw] sm:w-[calc(50vw-180px)] md:w-[calc(50vw-200px)] h-1" />
        </div>
      </div>
      
      {/* Mobile Swipe Indicator / Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-4 z-20">
        {domains.map((_, idx) => (
          <div 
            key={idx}
            className={`h-2 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-8 bg-yellow-400' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
