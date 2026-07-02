"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      name: "Calendar",
      path: "/#calendar",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      name: "Prizes",
      path: "/#prizes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
        </svg>
      )
    },
    {
      name: "Sponsors",
      path: "/#sponsors",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <path d="M12 22V12"></path>
          <path d="M9 16h6"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center gap-6 py-6 px-3 rounded-full bg-[#15121b]/80 backdrop-blur-md border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        // Simple active check. If path is not root, check if it starts with the path. For root, exact match.
        // For anchors like /#prizes, we can't easily rely on pathname, but we'll highlight root for it.
        const isActive = item.path === '/' 
          ? pathname === '/' 
          : item.path.startsWith('/#') 
            ? false 
            : pathname?.startsWith(item.path);
        
        return (
          <Link href={item.path} key={item.name} className="relative group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]" 
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-sm border border-white/10 text-xs font-semibold tracking-wider text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
