"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 md:px-12 py-24">
      {/* Background Subtle glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-yellow-900/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center"
      >
        <h2 className="font-harry-potter text-5xl md:text-7xl text-white mb-8 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
          About Inceptia 2K26
        </h2>
        
        <div className="glass-morphic p-8 md:p-14 rounded-[2rem] border border-yellow-500/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-body-lg mb-6">
            Inceptia 2K26 is the premier 24-hour national level hackathon where magic meets technology. 
            We aim to foster innovation, collaboration, and rapid prototyping among the brightest minds across the country.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-body-lg">
            Whether you are a master of Artificial Intelligence, a wizard of Web3, or an innovator in Healthcare and Education, 
            this is your arena to showcase your technical brilliance. Assemble your house, brew your code, and conjure solutions 
            that will leave a lasting impact on the world.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 font-harry-potter text-4xl md:text-5xl">24</span>
              <span className="text-gray-400 text-sm tracking-widest uppercase mt-2">Hours</span>
            </div>
            <div className="w-px h-12 bg-yellow-500/30 hidden md:block mt-2"></div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 font-harry-potter text-4xl md:text-5xl">5</span>
              <span className="text-gray-400 text-sm tracking-widest uppercase mt-2">Domains</span>
            </div>
            <div className="w-px h-12 bg-yellow-500/30 hidden md:block mt-2"></div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 font-harry-potter text-4xl md:text-5xl">₹50K+</span>
              <span className="text-gray-400 text-sm tracking-widest uppercase mt-2">Prize Pool</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
