import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Countdown Component
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-08-07T09:00:00");
    const difference = targetDate.getTime() - Date.now();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours.toString().padStart(2, "0") },
    { label: "MINUTES", value: timeLeft.minutes.toString().padStart(2, "0") },
    { label: "SECONDS", value: timeLeft.seconds.toString().padStart(2, "0") },
  ];

  return (
    <div className="flex flex-row items-center justify-center gap-1 sm:gap-4 mt-8 w-full max-w-3xl mx-auto z-10 relative px-2">
      {timeUnits.map((unit, idx) => (
        <div key={unit.label} className="flex items-center gap-1 sm:gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="flex flex-col items-center justify-center w-[4.2rem] h-[4.5rem] sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="font-display-lg text-2xl sm:text-5xl text-white drop-shadow-md">
              {unit.value}
            </span>
            <span className="font-label-md text-[9px] sm:text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-2">
              {unit.label}
            </span>
          </motion.div>

          {/* Colon separator except for the last item */}
          {idx < timeUnits.length - 1 && (
            <span className="font-display-lg text-xl sm:text-4xl text-white/30 font-bold sm:mb-4">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Countdown;