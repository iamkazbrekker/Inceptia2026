"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import WandCursor from "./components/wandCursor";
import MagicalClouds from "./components/magicalClouds";
import Countdown from "./components/countdown";
import TimelineSection from "./components/timelineSection";
import PrizesSection from "./components/prizeSection";
import SponsorsSection from "./components/sponsorsSection";
import Footer from "./components/footer";
import LoadingScreen from "./components/loadingScreen";
import AboutSection from "./components/aboutSection";
import ImageGallerySection from "./components/imageGallerySection";
import FaqSection from "./components/faqSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

interface DomainItem {
  house: string;
  title: string;
  description: string;
  color: string;
  borderColor: string;
  accentColor: string;
  glowColor: string;
  icon: string;
}

const domainList: DomainItem[] = [
  {
    house: "Gryffindor",
    title: "AI & ML",
    description: "Build intelligent machine learning models, neural networks, and self-directing software agents to solve automated challenges.",
    color: "from-red-900/40 via-red-950/60 to-red-950/80",
    borderColor: "border-red-500/50",
    accentColor: "text-red-400",
    glowColor: "rgba(239, 68, 68, 0.45)",
    icon: "/emblems/aiml.svg"
  },
  {
    house: "Ravenclaw",
    title: "Web3 & Fintech",
    description: "Develop decentralized financial protocols, cryptographic ledger applications, custom smart contracts, and secure blockchain code.",
    color: "from-blue-900/40 via-blue-950/60 to-blue-950/80",
    borderColor: "border-blue-500/50",
    accentColor: "text-blue-400",
    glowColor: "rgba(59, 130, 246, 0.45)",
    icon: "/emblems/web3.svg"
  },
  {
    house: "Hufflepuff",
    title: "Healthcare",
    description: "Forge biotech applications, digital diagnostic systems, medical support portals, and assistive technologies to improve patient accessibility.",
    color: "from-yellow-600/30 via-yellow-900/50 to-yellow-950/80",
    borderColor: "border-yellow-500/50",
    accentColor: "text-yellow-400",
    glowColor: "rgba(245, 158, 11, 0.45)",
    icon: "/emblems/healthcare.svg"
  },
  {
    house: "Slytherin",
    title: "Education",
    description: "Design interactive digital classrooms, game-based learning environments, simulation systems, and training interfaces.",
    color: "from-emerald-900/40 via-emerald-950/60 to-emerald-950/80",
    borderColor: "border-emerald-500/50",
    accentColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.45)",
    icon: "/emblems/education.svg"
  },
  {
    house: "Order of Merlin",
    title: "Open Innovation",
    description: "A category dedicated to any groundbreaking technology, software solutions, or physical prototype that does not fit into the other four domains.",
    color: "from-purple-900/40 via-purple-950/60 to-purple-950/80",
    borderColor: "border-purple-500/50",
    accentColor: "text-purple-400",
    glowColor: "rgba(139, 92, 246, 0.45)",
    icon: "/emblems/otherinnovation.svg"
  }
];

function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>

      <div className={`relative w-full overflow-x-hidden min-h-screen bg-surface ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        {/* Custom Magic Wand Cursor */}
        <WandCursor />

        {/* Magical Marquee (Perfect Loop) */}
        <div className="absolute top-0 left-0 w-full bg-yellow-500/5 backdrop-blur-md border-b border-yellow-500/20 overflow-hidden z-[100] py-2.5 flex items-center shadow-[0_4px_30px_rgba(255,215,0,0.1)]">
          <div className="flex animate-marquee min-w-max">
            {/* First Block */}
            <div className="flex gap-12 pr-12 text-[10px] sm:text-xs font-bold text-yellow-100 tracking-widest uppercase whitespace-nowrap">
              <span>✦ REGISTRATIONS OPEN ✦</span>
              <span>✦ EARLY BIRD REWARDS ✦</span>
              <span>✦ PRIZE POOL EXCEEDS ₹50,000 ✦</span>
              <span>✦ MAGICAL WORKSHOPS ✦</span>
              <span>✦ 24-HOUR HACKATHON ✦</span>
            </div>
            {/* Duplicate Block for Loop */}
            <div className="flex gap-12 pr-12 text-[10px] sm:text-xs font-bold text-yellow-100 tracking-widest uppercase whitespace-nowrap">
              <span>✦ REGISTRATIONS OPEN ✦</span>
              <span>✦ EARLY BIRD REWARDS ✦</span>
              <span>✦ PRIZE POOL EXCEEDS ₹50,000 ✦</span>
              <span>✦ MAGICAL WORKSHOPS ✦</span>
              <span>✦ 24-HOUR HACKATHON ✦</span>
            </div>
          </div>
        </div>

        {/* Animated Clouds Background */}
        <MagicalClouds />

        {/* Background Image (optimized next/image) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/hero-bg.png"
            alt="Hogwarts"
            fill
            priority
            className="object-cover object-top opacity-30"
          />
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-indigo-950/40 to-surface pointer-events-none" />

        {/* 1. Hero Section (Centered Layout) */}
        <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center text-center px-4 md:px-12 py-12">
          {/* Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl flex flex-col items-center justify-center gap-6 mt-12 w-full"
          >
            {/* Logo / Title animation */}
            <motion.div variants={itemVariants} className="text-center mb-6 pt-10">
              <h1
                className="font-harry-potter text-7xl sm:text-8xl md:text-[140px] text-white select-none italic pt-4 leading-tight animate-[pulse_3s_ease-in-out_infinite]"
                style={{ 
                  fontWeight: "bold",
                  textShadow: "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.4), 0 0 80px rgba(255,215,0,0.2)"
                }}
              >
                INCEPTIA <br/> 2K26
              </h1>
            </motion.div>

            {/* Event Date injected between timer and logo */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-sm md:text-xl drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] bg-black/40 px-6 py-2 rounded-full border border-yellow-500/20">
                7TH AUG &ndash; 8TH AUG 2026
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full mb-8">
              <Countdown />
            </motion.div>

            {/* Golden Register Button with high click priority */}
            <motion.div variants={itemVariants} className="relative z-50 pointer-events-auto">
              <a
                href="https://unstop.com/o/KxwXi86?utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Logged_out_user"
                target="_blank"
                rel="noopener noreferrer"
                className="magical-btn relative z-50 pointer-events-auto px-10 py-5 rounded-full text-lg tracking-widest flex items-center gap-2 group cursor-pointer"
              >
                <span>✦ REGISTER NOW ✦</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. Domains Section (Redesigned Central Layout) */}
        <section className="relative z-10 py-24 flex flex-col items-center w-full min-h-screen px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-harry-potter text-5xl md:text-7xl text-white text-center drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] mb-20"
          >
            Choose Your Domain
          </motion.h2>

          <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
            
            {/* Desktop Layout (Cross/Circle) */}
            <div className="hidden lg:block relative w-full aspect-[16/9]">
              
              {/* Lines connecting domains (optional decorative effect) */}
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-30">
                 <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent absolute"></div>
                 <div className="w-px h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent absolute"></div>
              </div>

              {/* Center: Open Innovation (index 4) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-80">
                <DomainCard domain={domainList[4]} center />
              </div>

              {/* Top Left: AI & ML (index 0) */}
              <div className="absolute top-0 left-0 w-72">
                <DomainCard domain={domainList[0]} />
              </div>

              {/* Top Right: Web3 (index 1) */}
              <div className="absolute top-0 right-0 w-72">
                <DomainCard domain={domainList[1]} />
              </div>

              {/* Bottom Left: Healthcare (index 2) */}
              <div className="absolute bottom-0 left-0 w-72">
                <DomainCard domain={domainList[2]} />
              </div>

              {/* Bottom Right: Education (index 3) */}
              <div className="absolute bottom-0 right-0 w-72">
                <DomainCard domain={domainList[3]} />
              </div>

            </div>

            {/* Mobile / Tablet Layout (Grid) */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <div className="md:col-span-2 flex justify-center">
                <div className="w-full max-w-md"><DomainCard domain={domainList[4]} center /></div>
              </div>
              <DomainCard domain={domainList[0]} />
              <DomainCard domain={domainList[1]} />
              <DomainCard domain={domainList[2]} />
              <DomainCard domain={domainList[3]} />
            </div>

          </div>
        </section>

        {/* 4. Timeline Section */}
        <TimelineSection />

        {/* 5. Prize Pool Section */}
        <PrizesSection />

        {/* 6. Sponsors Section */}
        <SponsorsSection />

        {/* 7. Image Gallery Section */}
        <ImageGallerySection />

        {/* 8. FAQ Section */}
        <FaqSection />

        {/* 9. Footer */}
        <Footer />
      </div>
    </>
  );
}

// Sub-component for Domain cards in the new layout
function DomainCard({ domain, center = false }: { domain: DomainItem, center?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ '--hover-glow': domain.glowColor } as React.CSSProperties}
      className={`glass-morphic flex flex-col items-center text-center p-6 md:p-8 rounded-3xl border border-yellow-500/30 bg-black/50 backdrop-blur-xl transition-all duration-500 hover:scale-105 group h-full hover:shadow-[0_0_40px_var(--hover-glow)] ${center ? 'shadow-[0_0_50px_rgba(255,215,0,0.2)] border-yellow-400' : 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]'}`}
    >
      <div className={`relative ${center ? 'w-32 h-32' : 'w-24 h-24'} rounded-full mb-6 flex items-center justify-center bg-gradient-to-br ${domain.color} border-2 ${domain.borderColor} overflow-hidden shadow-lg`}>
         <Image
            src={domain.icon}
            alt={domain.title}
            fill
            className="object-cover scale-[1.25] invert contrast-[300%] sepia saturate-[300%] opacity-90 p-4 transition-transform duration-500 group-hover:scale-110"
         />
      </div>
      <h3 className={`font-harry-potter ${center ? 'text-4xl' : 'text-3xl'} text-white mb-3 drop-shadow-md`}>
        {domain.title}
      </h3>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        {domain.description}
      </p>
    </motion.div>
  );
}

export default Page;