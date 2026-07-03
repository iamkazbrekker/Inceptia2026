"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Placeholder images - you should upload your actual images to the 'public/gallery' folder
// For example, if you upload 'event1.jpg' to 'public/gallery/event1.jpg', 
// you would add '/gallery/event1.jpg' to this list.
const galleryImages = [
  "/gallery/event1.jpg",
  "/gallery/event2.jpg",
  "/gallery/placeholder3.jpg",
  "/gallery/placeholder4.jpg",
  "/gallery/placeholder5.jpg",
  "/gallery/placeholder6.jpg",
];

// Duplicate the array to create a seamless loop
const duplicatedImages = [...galleryImages, ...galleryImages];

export default function ImageGallerySection() {
  return (
    <section className="relative z-10 w-full flex flex-col items-center justify-center py-24 bg-black/20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h2 className="font-harry-potter text-5xl md:text-7xl text-white text-center drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] mb-12">
          Past Memories
        </h2>

        {/* Auto-scrolling Carousel */}
        <div className="relative w-full overflow-hidden flex">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#110e1b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#110e1b] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25, // Adjust duration to control speed
            }}
          >
            {duplicatedImages.map((src, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-72 h-48 md:w-96 md:h-64 rounded-2xl overflow-hidden border border-yellow-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
              >
                {/* Fallback color if image is not present */}
                <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
                  <span className="text-gray-500 font-body-lg text-center px-4">
                    Please upload <br /> {src}
                  </span>
                </div>

                {/* 
                  Uncomment this when you have actual images uploaded! 
                  Right now it's commented out so it doesn't show broken image icons.
                */}
                {/* <Image
                  src={src}
                  alt={`Inceptia Past Event ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                /> */}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/80 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
