"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
      {/* Subtle radial glow background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent pointer-events-none opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-12"
      >
        {/* Minimal Title */}
        <div className="space-y-6">
          <h2 className="font-harry-potter text-4xl md:text-6xl text-yellow-500/90 tracking-wider">
            About the Hackathon
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto"></div>
        </div>
        
        {/* Minimal Typography Text */}
        <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light font-body-lg max-w-3xl">
          Where magic meets technology. <strong className="text-yellow-100 font-normal">INCEPTIA 2K26</strong> is a premier national-level hackathon designed to foster innovation, collaboration, and rapid prototyping among the brightest minds.
          <br /><br />
          Whether you are a master of AI, a wizard of Web3, or a healthcare innovator, this is your arena. Assemble your house, brew your code, and conjure solutions that will leave a lasting impact on the world.
        </p>

        {/* Minimal Stats Line */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 pt-8 mt-4 border-t border-white/5">
          <div className="flex flex-col items-center gap-2">
            <span className="text-yellow-400 font-harry-potter text-5xl md:text-7xl drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">24</span>
            <span className="text-gray-400 text-xs tracking-[0.2em] uppercase">Hours</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-yellow-400 font-harry-potter text-5xl md:text-7xl drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">5</span>
            <span className="text-gray-400 text-xs tracking-[0.2em] uppercase">Domains</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-yellow-400 font-harry-potter text-5xl md:text-7xl drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">₹50K+</span>
            <span className="text-gray-400 text-xs tracking-[0.2em] uppercase">Prize Pool</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
