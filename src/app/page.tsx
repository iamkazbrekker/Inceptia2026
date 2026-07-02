"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import WandCursor from "./components/wandCursor";
import MagicalClouds from "./components/magicalClouds";
import Countdown from "./components/countdown";
import TimelineSection from "./components/timelineSection";
import CalendarSection from "./components/calendarSection";
import PrizesSection from "./components/prizeSection";
import SponsorsSection from "./components/sponsorsSection";
import Footer from "./components/footer";

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
  return (
    <div className="relative w-full overflow-x-hidden min-h-screen bg-surface">
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

      {/* Hero Section (Centered Layout) */}
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
              className="font-harry-potter text-7xl sm:text-8xl md:text-[140px] text-white drop-shadow-[0_0_40px_rgba(255,215,0,0.8)] logo-shine select-none italic pt-4 leading-tight"
              style={{ fontWeight: "bold" }}
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

      {/* Marauder's Timeline Section */}
      <TimelineSection />

      {/* Domains Section Title */}
      <section className="relative z-10 pt-24 pb-8 flex justify-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-harry-potter text-5xl md:text-7xl text-white text-center drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
        >
          Choose Your Domain
        </motion.h2>
      </section>

      {/* Domains Section (Full-Screen Layouts) */}
      <div className="relative w-full flex flex-col items-center">
        {domainList.map((domain, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section 
              key={domain.house} 
              className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-12 py-24"
            >
              {/* Background gradient hint */}
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-yellow-900/5 to-transparent pointer-events-none" />
              
              <div className={`relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Emblem Image Container (Glassmorphic with Spinning Neon Border) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50, rotate: -30 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="w-64 h-64 md:w-[400px] md:h-[400px] flex-shrink-0 rounded-full flex items-center justify-center relative group"
                >
                  {/* Spinning Neon Border */}
                  <div className="absolute inset-0 rounded-full overflow-hidden border border-yellow-500/30 shadow-[0_0_50px_rgba(255,215,0,0.15)]">
                    <div className="absolute inset-[-50%] animate-[spin_4s_linear_infinite]" 
                         style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,215,0,0.9) 100%)' }} />
                  </div>

                  {/* Inner Glassmorphic Circle */}
                  <div className="absolute inset-1 rounded-full bg-yellow-950/20 backdrop-blur-2xl shadow-[inset_0_0_30px_rgba(255,215,0,0.2)] overflow-hidden z-10 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                    {/* The SVG Emblem */}
                    <Image
                      src={domain.icon}
                      alt={domain.title}
                      fill
                      className="object-cover scale-[1.25] invert contrast-[500%] sepia saturate-[500%] hue-rotate-[-15deg] opacity-90 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                    />
                  </div>
                </motion.div>
                
                {/* Text Box */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                  className="w-full md:w-1/2 flex flex-col"
                >
                  <div className="glass-morphic p-8 md:p-12 rounded-[2rem] border border-yellow-500/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
                    <h3 className="font-harry-potter text-5xl md:text-7xl text-white mb-4 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                      {domain.title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6 rounded-full" />
                    <p className="text-base md:text-xl text-gray-200 leading-relaxed font-body-lg">
                      {domain.description}
                    </p>
                  </div>
                </motion.div>

              </div>
            </section>
          );
        })}
      </div>

      {/* Calendar Section */}
      <CalendarSection />

      {/* Prize Pool Section */}
      <PrizesSection />

      {/* Sponsors Section */}
      <SponsorsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Page;