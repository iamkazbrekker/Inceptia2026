"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="w-full py-16 px-8 md:px-24 flex flex-col items-center gap-12 border-t border-yellow-500/20 bg-black/50 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative z-10"
      id="contact"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        
        {/* Brand / Contact */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="font-harry-potter text-4xl text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] tracking-widest">
            INCEPTIA 2K26
          </div>
          <p className="font-body-md text-gray-300 leading-relaxed mt-2">
            inceptia2026@gmail.com
            <br />
            Pimpri Chinchwad College of Engineering and Research, Ravet, Pune.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="text-yellow-500 font-bold tracking-widest text-sm uppercase">Quick Links</h4>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="#">About</a>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="#">Domains</a>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="#">Timeline</a>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="#">FAQs</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-yellow-500 font-bold tracking-widest text-sm uppercase">Legal</h4>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="#">Code of Conduct</a>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="#">Privacy Policy</a>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl h-px bg-yellow-500/20" />

      {/* Bottom */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
        <p>© 2026 Inceptia Hackathon. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}