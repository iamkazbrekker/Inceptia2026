"use client";
import React from "react";
import { motion } from "framer-motion";

function WaxSeal() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, rotate: -18 }}
      whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 140, damping: 12 }}
      // className="relative shrink-0"
    >
      <svg width="86" height="86" viewBox="0 0 86 86" className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]">
        <defs>
          <radialGradient id="seal-wax" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#5a0d0d" />
            <stop offset="55%" stopColor="#740001" />
            <stop offset="100%" stopColor="#3d0000" />
          </radialGradient>
          <radialGradient id="seal-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4e4a6" />
            <stop offset="100%" stopColor="#b8860b" />
          </radialGradient>
        </defs>
        {/* drippy wax outline */}
        <path
          d="M43 3c4 6-2 9 3 13s11-3 14 3-4 8 0 14 12 1 13 8-7 7-5 13 9 6 6 13-11 4-15 9 1 11-5 14-11-2-16 2-6 10-13 8-6-8-13-6-10 6-16-2 1-9-5-14-13-2-15-9 3-8 6-13-1-11 5-14 8-4 13-8-4-9 0-14 10-7 14-3-1-10 3-13z"
          fill="url(#seal-wax)"
          stroke="#2a0000"
          strokeWidth="0.5"
        />
        <circle cx="43" cy="43" r="24" fill="url(#seal-gold)" opacity="0.14" />
        <circle cx="43" cy="43" r="23" fill="none" stroke="#d4af37" strokeWidth="0.75" opacity="0.7" />
        {/* quill + shield monogram */}
        <text
          x="43"
          y="49"
          textAnchor="middle"
          fontFamily="serif"
          fontWeight="700"
          fontSize="19"
          fill="#e8dcc4"
          letterSpacing="0.5"
        >
          IT
        </text>
        <path d="M27 33 L59 33" stroke="#d4af37" strokeWidth="0.6" opacity="0.5" />
        <path d="M27 53 L59 53" stroke="#d4af37" strokeWidth="0.6" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Torn parchment / map edge divider used at the top of the
   footer, so it reads as the bottom border of a map sheet.
--------------------------------------------------------- */
function ParchmentEdge() {
  return (
    <svg
      viewBox="0 0 1200 26"
      preserveAspectRatio="none"
      className="w-full h-[14px] text-yellow-500/25"
      aria-hidden="true"
    >
      <path
        d="M0 0 L20 14 L45 3 L70 18 L95 6 L120 16 L150 2 L180 14 L210 5 L240 18 L270 4 L300 15 L330 2 L360 17 L390 6 L420 14 L450 3 L480 18 L510 5 L540 16 L570 2 L600 14 L630 6 L660 18 L690 3 L720 16 L750 4 L780 15 L810 2 L840 17 L870 6 L900 14 L930 3 L960 18 L990 5 L1020 16 L1050 2 L1080 14 L1110 6 L1140 18 L1170 3 L1200 15 L1200 26 L0 26 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Timeline", href: "#timeline" },
  { label: "FAQs", href: "#faq" }
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/inceptia_pccoer",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/inceptia-hackathon-893227424/",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="7" cy="8.5" r="1" fill="currentColor" stroke="none" />
        <path d="M7 11v6M13 17v-3.5c0-1.5 1-2.5 2.3-2.5S17 12 17 13.5V17M13 11v6" />
      </svg>
    ),
  },
  // {
  //   name: "Twitter",
  //   href: "#",
  //   icon: (
  //     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
  //       <path d="M21 5.5c-.7.3-1.4.55-2.2.65a3.8 3.8 0 0 0 1.66-2.1c-.75.44-1.58.76-2.46.94A3.75 3.75 0 0 0 11.6 8.3c0 .3.03.58.1.85A10.66 10.66 0 0 1 3.9 4.9a3.75 3.75 0 0 0 1.16 5c-.6-.02-1.18-.19-1.68-.46v.05c0 1.83 1.3 3.36 3.03 3.7-.55.15-1.13.17-1.7.06.48 1.5 1.87 2.6 3.52 2.63A7.53 7.53 0 0 1 2.9 17.7a10.6 10.6 0 0 0 5.75 1.68c6.9 0 10.68-5.72 10.68-10.68l-.01-.49A7.6 7.6 0 0 0 21 5.5Z" />
  //     </svg>
  //   ),
  // },
];

export default function Footer() {
  const mapLat = 18.650237;
  const mapLng = 73.7452115;
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapLat},${mapLng}&z=16&output=embed`;
  const mapDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapLat},${mapLng}`;

  return (
    <footer
      className="relative z-10 w-full border-t border-yellow-500/20 bg-black/50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      id="contact"
    >
      <ParchmentEdge />

      {/* ambient candlelight glows */}
      <div className="pointer-events-none absolute -top-10 left-1/4 h-56 w-56 rounded-full bg-yellow-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-1/5 h-72 w-72 rounded-full bg-yellow-500/[0.04] blur-3xl" />

      <div className="relative flex w-full flex-col items-center gap-12 px-6 py-16 sm:px-8 md:px-16 lg:px-24">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.5fr]">
          {/* Brand / Contact */}
          <div className="flex max-w-sm flex-col gap-4">
            <div className="font-harry-potter text-3xl tracking-widest text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] sm:text-4xl">
              INCEPTIA 2K26
            </div>
            <p className="font-body-md leading-relaxed text-gray-300">
              inceptia2025@gmail.com
              <br />
              Pimpri Chinchwad College of Engineering and Research, Ravet, Pune.
            </p>

            {/* ITSA x PCCOER credit line */}
            <div className="mt-2 flex items-center gap-4 border-t border-yellow-500/15 pt-5">
              <WaxSeal />
              <div className="flex flex-col">
                <span className="font-body-md text-[11px] uppercase tracking-[0.2em] text-yellow-500/70">
                  Organised by
                </span>
                <span className="font-body-md text-sm font-semibold text-yellow-100">
                  Information Technology Student Association
                </span>
                <span className="font-body-md text-xs text-gray-400">
                  PCCOER, Ravet - Department of Information Technology
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body-md text-sm font-bold uppercase tracking-widest text-yellow-500">
              Explore
            </h4>
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body-md w-fit text-sm text-gray-300 transition-colors hover:text-yellow-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Map */}
          <div className="flex flex-col gap-3">
            <h4 className="font-body-md text-sm font-bold uppercase tracking-widest text-yellow-500">
              Find the Castle
            </h4>
            <motion.a
              href={mapDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="group relative block h-40 w-full overflow-hidden rounded-lg border border-yellow-500/30 shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <iframe
                title="PCCOER Ravet location map"
                src={mapEmbedSrc}
                className="h-full w-full grayscale-[35%] sepia-[35%] contrast-110 brightness-75 transition-all duration-500 group-hover:brightness-90"
                style={{ border: 0 }}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-yellow-400/20" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="font-body-md absolute bottom-2 left-3 text-xs font-medium text-yellow-100 drop-shadow">
                Ravet, Pune → Get Directions
              </span>
            </motion.a>
          </div>
        </div>

        <div className="h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-yellow-500/25 to-transparent" />

        {/* Bottom */}
        <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 text-sm text-gray-400 md:flex-row">
          <p className="font-body-md text-center md:text-left">
            © 2026 Inceptia Hackathon · Hosted by ITSA, PCCOER. All Rights Reserved.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/25 text-gray-300 transition-all hover:-translate-y-0.5 hover:border-yellow-400/60 hover:text-yellow-400 hover:shadow-[0_0_12px_rgba(212,175,55,0.35)]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}