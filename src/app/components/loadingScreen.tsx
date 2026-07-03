"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-surface"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Spinning Magic Ring */}
        <div className="w-32 h-32 rounded-full border-4 border-transparent border-t-yellow-500 border-b-yellow-500 animate-spin absolute" />
        <div className="w-24 h-24 rounded-full border-4 border-transparent border-l-yellow-400 border-r-yellow-400 animate-[spin_2s_linear_infinite_reverse] absolute" />
        
        {/* Center Logo/Icon */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-black/50 backdrop-blur flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.5)]">
           <svg className="w-8 h-8 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2l2.4 7.4L22 9.6l-6 4.8 2.3 7.6L12 17.2l-6.3 4.8 2.3-7.6-6-4.8 7.6-.2z"/>
           </svg>
        </div>
      </div>
      <motion.p 
        className="mt-12 text-yellow-500 font-harry-potter text-2xl tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Summoning Magic...
      </motion.p>
    </motion.div>
  );
}
