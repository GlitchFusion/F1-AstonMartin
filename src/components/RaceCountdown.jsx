import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_RACE = {
  name: "BAHRAIN GRAND PRIX",
  date: "2025-03-02T15:00:00Z"
};

const FlipSingleDigit = ({ digit }) => {
  return (
    <div className="relative w-10 xs:w-12 sm:w-16 md:w-20 lg:w-24 h-16 xs:h-20 sm:h-24 md:h-32 lg:h-36 bg-[#0A0A0A] rounded-lg flex items-center justify-center overflow-hidden border border-am-green/20">
      {/* Horizontal split line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#050505] z-20 pointer-events-none transform -translate-y-1/2 shadow-inner" />
      
      <AnimatePresence mode="popLayout">
        <motion.div
          key={digit}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ transformOrigin: 'top center' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-am-neon tracking-tighter">
            {digit}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const FlipDigitGroup = ({ val }) => {
  const strVal = val.toString().padStart(2, '0');
  return (
    <div className="flex gap-1 sm:gap-2">
      <FlipSingleDigit digit={strVal[0]} />
      <FlipSingleDigit digit={strVal[1]} />
    </div>
  );
};

const RaceCountdown = () => {
  const [nextRace, setNextRace] = useState(FALLBACK_RACE);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Attempt to fetch real-time next race data from Ergast mirror
    fetch('https://api.jolpi.ca/ergast/f1/current/next.json')
      .then(res => res.json())
      .then(data => {
        const race = data?.MRData?.RaceTable?.Races?.[0];
        if (race) {
          const raceDate = `${race.date}T${race.time || '15:00:00Z'}`;
          setNextRace({
            name: race.raceName,
            date: raceDate
          });
        }
      })
      .catch(err => console.log('Using fallback countdown data'));
  }, []);

  useEffect(() => {
    const target = new Date(nextRace.date).getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [nextRace]);

  return (
    <section id="countdown" className="py-20 md:py-32 bg-[#050505] relative border-b border-am-green/20">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-am-neon text-xs md:text-sm font-montserrat tracking-[0.3em] uppercase mb-4">
            Next Race
          </h2>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold text-am-white tracking-widest uppercase">
            {nextRace.name}
          </h3>
        </motion.div>

        {/* Countdown Cards */}
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
          <div className="flex flex-col items-center gap-2">
            <FlipDigitGroup val={timeLeft.days} />
            <span className="text-gray-400 font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-2">Days</span>
          </div>
          <div className="text-2xl sm:text-4xl text-gray-800 font-orbitron self-start mt-4 sm:mt-6 hidden md:block">:</div>
          <div className="flex flex-col items-center gap-2">
            <FlipDigitGroup val={timeLeft.hours} />
            <span className="text-gray-400 font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-2">Hours</span>
          </div>
          <div className="text-2xl sm:text-4xl text-gray-800 font-orbitron self-start mt-4 sm:mt-6 hidden md:block">:</div>
          <div className="flex flex-col items-center gap-2">
            <FlipDigitGroup val={timeLeft.minutes} />
            <span className="text-gray-400 font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-2">Minutes</span>
          </div>
          <div className="text-2xl sm:text-4xl text-gray-800 font-orbitron self-start mt-4 sm:mt-6 hidden md:block">:</div>
          <div className="flex flex-col items-center gap-2">
            <FlipDigitGroup val={timeLeft.seconds} />
            <span className="text-gray-400 font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-2">Seconds</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RaceCountdown;
