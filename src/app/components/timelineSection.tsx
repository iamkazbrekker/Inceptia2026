"use client";

import { motion } from "framer-motion";

const timelineData = [
  { date: "30 June", text: "Event Live on Unstop", align: "left" },
  { date: "18 July", text: "Online Registrations Deadline", align: "right" },
  { date: "23 July", text: "Ppt Submission Deadline", align: "left" },
  { date: "25 July", text: "Shortlisted Teams Announcement", align: "right" },
  { date: "7 & 8 August", text: "Offline Hackathon at PCCOER Campus, Ravet, Pune", align: "left" },
];

export default function TimelineSection() {
  return (
    <section className="relative w-full py-24 px-4 flex flex-col items-center overflow-hidden z-10">
      
      {/* Title */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-harry-potter text-5xl md:text-7xl text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] mb-16 text-center"
      >
        Marauder&apos;s Timeline
      </motion.h2>

      {/* Glassmorphic Map Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden glass-morphic bg-yellow-950/10 backdrop-blur-2xl border border-yellow-500/20 shadow-[0_0_50px_rgba(255,215,0,0.05)]"
      >
        {/* Background Ambient Sketched Map Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden text-yellow-600/60">
           {/* Hogwarts / Castle Sketch */}
           <svg className="absolute top-5 -left-10 w-64 h-64 opacity-50 -rotate-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
             <path d="M20 90 L80 90 L80 50 L90 50 L90 20 L80 20 L80 10 L70 10 L70 20 L60 20 L60 10 L50 10 L50 20 L40 20 L40 10 L30 10 L30 20 L20 20 L20 50 L30 50 L30 90 Z" />
             <path d="M40 90 L40 70 A10 10 0 0 1 60 70 L60 90" />
             <rect x="35" y="30" width="10" height="15" />
             <rect x="55" y="30" width="10" height="15" />
           </svg>

           {/* Forbidden Forest Trees */}
           <svg className="absolute bottom-10 -right-10 w-48 h-48 opacity-40 rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M50 90 L50 60 M50 60 C20 70 10 30 50 10 C90 30 80 70 50 60 Z" />
             <path d="M50 40 L35 35 M50 30 L60 25 M50 50 L40 45" />
           </svg>
           <svg className="absolute bottom-32 right-20 w-32 h-32 opacity-30 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M50 90 L50 60 M50 60 C20 70 10 30 50 10 C90 30 80 70 50 60 Z" />
             <path d="M50 40 L35 35 M50 30 L60 25" />
           </svg>
           
           {/* Sketched Scroll/Banner Element */}
           <svg className="absolute top-1/2 left-10 w-48 h-24 opacity-30 -rotate-[15deg]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
             <path d="M10 10 C 30 5, 70 5, 90 10 L 90 40 C 70 35, 30 35, 10 40 Z" />
             <path d="M15 15 L85 15 M15 25 L75 25 M15 35 L60 35" strokeDasharray="4 4" />
           </svg>

           {/* Wandering Footsteps */}
           <svg className="absolute top-1/4 right-1/4 w-20 h-32 rotate-[60deg] opacity-60" viewBox="0 0 100 100" fill="currentColor">
             <path d="M 30 20 C 30 10, 45 10, 45 30 C 45 45, 30 50, 30 40 Z" />
             <path d="M 35 10 C 35 5, 40 5, 40 10 C 40 15, 35 15, 35 10 Z" />
             <path d="M 60 40 C 60 30, 75 30, 75 50 C 75 65, 60 70, 60 60 Z" />
             <path d="M 65 30 C 65 25, 70 25, 70 30 C 70 35, 65 35, 65 30 Z" />
           </svg>
           <svg className="absolute top-[35%] right-[40%] w-16 h-24 rotate-[85deg] opacity-50" viewBox="0 0 100 100" fill="currentColor">
             <path d="M 30 20 C 30 10, 45 10, 45 30 C 45 45, 30 50, 30 40 Z" />
             <path d="M 35 10 C 35 5, 40 5, 40 10 C 40 15, 35 15, 35 10 Z" />
             <path d="M 60 40 C 60 30, 75 30, 75 50 C 75 65, 60 70, 60 60 Z" />
             <path d="M 65 30 C 65 25, 70 25, 70 30 C 70 35, 65 35, 65 30 Z" />
           </svg>
           <svg className="absolute bottom-[20%] left-[30%] w-16 h-24 -rotate-[30deg] opacity-40" viewBox="0 0 100 100" fill="currentColor">
             <path d="M 30 20 C 30 10, 45 10, 45 30 C 45 45, 30 50, 30 40 Z" />
             <path d="M 35 10 C 35 5, 40 5, 40 10 C 40 15, 35 15, 35 10 Z" />
             <path d="M 60 40 C 60 30, 75 30, 75 50 C 75 65, 60 70, 60 60 Z" />
             <path d="M 65 30 C 65 25, 70 25, 70 30 C 70 35, 65 35, 65 30 Z" />
           </svg>
        </div>

        <div className="relative z-10 py-20 px-8 flex flex-col items-center">
          
          {/* Center Vertical Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-yellow-500/40 to-transparent -translate-x-1/2 opacity-80"></div>

          {timelineData.map((item, idx) => {
            const isLeft = item.align === "left";
            return (
              <div key={idx} className={`relative w-full flex ${isLeft ? "justify-start" : "justify-end"} mb-20 last:mb-0`}>
                
                {/* Node Dot on center line */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-500 border-2 border-black shadow-[0_0_15px_rgba(255,215,0,0.8)] z-20 pulse-gold"></div>
                
                {/* Content Box */}
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.2 }}
                  className={`w-[45%] flex flex-col ${isLeft ? "items-end text-right pr-6" : "items-start text-left pl-6"}`}
                >
                  <h3 className="font-display-lg text-2xl md:text-4xl text-yellow-100 font-bold mb-2 drop-shadow-md">
                    {item.date}
                  </h3>
                  <p className="font-sans text-sm md:text-lg text-yellow-200/80 font-semibold max-w-[250px]">
                    {item.text}
                  </p>
                </motion.div>

                {/* Animated Footprints matching side */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                  className={`absolute top-10 ${isLeft ? "left-[55%]" : "right-[55%]"} w-12 h-20 opacity-60 flex flex-col items-center justify-between text-yellow-500/40 ${isLeft ? "rotate-[15deg]" : "-rotate-[15deg]"}`}
                >
                  {/* Left Foot */}
                  <svg className="w-4 h-6 mb-4 -ml-4" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M 30 20 C 30 10, 45 10, 45 30 C 45 45, 30 50, 30 40 Z" />
                    <path d="M 35 10 C 35 5, 40 5, 40 10 C 40 15, 35 15, 35 10 Z" />
                  </svg>
                  {/* Right Foot */}
                  <svg className="w-4 h-6 mt-4 ml-4" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M 60 40 C 60 30, 75 30, 75 50 C 75 65, 60 70, 60 60 Z" />
                    <path d="M 65 30 C 65 25, 70 25, 70 30 C 70 35, 65 35, 65 30 Z" />
                  </svg>
                </motion.div>

              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
