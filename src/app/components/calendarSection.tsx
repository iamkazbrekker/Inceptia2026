"use client";

import { motion } from "framer-motion";

const events = [
  { id: 1, date: 7, month: "AUG", title: "THE ASSEMBLY", type: "confirmed" },
  { id: 2, date: 7, month: "AUG", title: "HACKING COMMENCES", type: "confirmed" },
  { id: 3, date: 7, month: "AUG", title: "MENTORING ROUND I", type: "planned" },
  { id: 4, date: 8, month: "AUG", title: "FINAL SPELL SUBMISSION", type: "planned" },
  { id: 5, date: 8, month: "AUG", title: "GRAND SORTING & AWARDS", type: "planned" },
];

export default function CalendarSection() {
  // Generate days for August 2026
  // Aug 2026 starts on Saturday (Sat = 6)
  const daysInMonth = 31;
  const startDay = 6; // index for Saturday (0=Sun, 1=Mon, ..., 6=Sat)

  const calendarCells = [];
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }
  
  // Fill the rest of the grid to complete weeks
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <section id="calendar" className="relative w-full py-24 px-4 md:px-12 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center"
      >
        <span className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2 drop-shadow-md">
          EVENT SCHEDULE
        </span>
        <h2 className="font-display-lg text-5xl sm:text-6xl md:text-7xl font-bold italic drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] mb-16 text-white">
          AUGUST <span className="font-sans">2026</span>
        </h2>

        <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          {/* Calendar Grid Section */}
          <div className="w-full lg:w-[65%] bg-surface-container-highest/30 backdrop-blur-md rounded-[2rem] p-6 sm:p-10 border border-yellow-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4 text-center">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-[9px] sm:text-[11px] tracking-wider text-gray-500 font-semibold mb-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="w-full aspect-square" />;
                }
                
                const dayEvents = events.filter(e => e.date === day);
                const isEventDay = dayEvents.length > 0;
                
                return (
                  <motion.div 
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    className={`relative w-full aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 ${
                      isEventDay 
                        ? "bg-[#1f1a29]/80 border border-yellow-500/40 hover:bg-[#2d253a]/90 shadow-[0_0_15px_rgba(255,215,0,0.15)]" 
                        : "bg-black/20 border border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <span className={`text-sm sm:text-lg font-bold ${isEventDay ? 'text-white' : 'text-gray-400'}`}>
                      {day}
                    </span>
                    {isEventDay && (
                      <div className="flex gap-1 mt-1 sm:mt-2">
                        {dayEvents.map((e, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor] ${
                              e.type === 'confirmed' ? "bg-orange-500 text-orange-500" : "bg-yellow-500 text-yellow-500"
                            }`} 
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Panel Section */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            
            {/* Legend Box */}
            <div className="bg-surface-container-highest/30 backdrop-blur-md rounded-[1.5rem] p-6 sm:p-8 border border-yellow-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mb-4 uppercase">Legend</h3>
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-gray-300 font-semibold">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
                  <span>Confirmed Event</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]"></div>
                  <span>Planned Event</span>
                </div>
              </div>
            </div>

            {/* All Events Box */}
            <div className="flex-1 bg-surface-container-highest/30 backdrop-blur-md rounded-[1.5rem] p-6 sm:p-8 border border-yellow-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col h-full min-h-[400px]">
              <h3 className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mb-6 uppercase">All Events</h3>
              <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {events.map((event) => (
                  <motion.div 
                    key={event.id}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-yellow-500/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-surface-container border border-white/5">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{event.month}</span>
                      <span className="text-lg font-bold text-white leading-none">{event.date}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-100 group-hover:text-white transition-colors tracking-wide">
                        {event.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${event.type === 'confirmed' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${event.type === 'confirmed' ? 'text-orange-500' : 'text-yellow-500'}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
