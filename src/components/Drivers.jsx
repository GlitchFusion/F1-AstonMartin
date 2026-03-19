import React from 'react';
import { motion } from 'framer-motion';

const drivers = [
  {
    id: 'alonso',
    name: 'Fernando Alonso',
    number: '14',
    nationality: 'Spain',
    championships: 2,
    podiums: 106,
    points: 2267,
    description: 'A double World Champion, Fernando brings relentless pace and unmatched racecraft to Aston Martin Aramco Formula One Team.',
    image: '/src/assets/images/FernandoAlonso.webp',
    accent: '#00FFB3'
  },
  {
    id: 'stroll',
    name: 'Lance Stroll',
    number: '18',
    nationality: 'Canada',
    championships: 0,
    podiums: 3,
    points: 268,
    description: 'A proven podium finisher, Lance offers aggressive driving and valuable experience having been with the team since its modern inception.',
    image: '/src/assets/images/LanceStroll.webp',
    accent: '#006F62'
  }
];

const StatBox = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-am-neon font-orbitron font-bold text-xl md:text-2xl">{value}</span>
    <span className="text-gray-400 font-montserrat text-[10px] md:text-xs uppercase tracking-widest">{label}</span>
  </div>
);

const Drivers = () => {
  return (
    <section id="drivers" className="py-24 bg-am-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-am-green/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-am-neon uppercase tracking-wider mb-4"
          >
            Meet the Drivers
          </motion.h2>
          <p className="text-gray-400 font-montserrat uppercase tracking-[0.2em]">The Men Behind the Wheel</p>
        </div>

        {/* Driver Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {drivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative overflow-hidden rounded-xl border border-gray-800 hover:border-am-neon/60 transition-all duration-500 shadow-2xl group flex flex-col"
              style={{ minHeight: '600px' }}
            >
              {/* Driver Image (full bleed background) */}
              <div className="absolute inset-0 w-full h-full bg-am-dark/50">
                <img
                  src={driver.image}
                  alt={driver.name}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop&grayscale";
                  }}
                  className="w-full h-full object-cover object-top transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Dark gradient overlay from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

              {/* Racing number watermark */}
              <div
                className="absolute top-6 right-6 text-[100px] md:text-[140px] font-orbitron font-black leading-none select-none pointer-events-none"
                style={{ color: driver.accent, opacity: 0.12 }}
              >
                {driver.number}
              </div>

              {/* Content overlay at bottom */}
              <div className="mt-auto relative z-10 p-6 md:p-8 flex flex-col justify-end">
                {/* Name & nationality */}
                <div className="mb-4">
                  <p className="text-xs font-montserrat tracking-[0.25em] uppercase mb-2" style={{ color: driver.accent }}>
                    {driver.nationality}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-orbitron font-bold text-white leading-tight mb-3">
                    {driver.name}
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm md:text-base leading-relaxed line-clamp-2 lg:line-clamp-none">
                    {driver.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-5" />

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4">
                  <StatBox label="Championships" value={driver.championships} />
                  <StatBox label="Podiums" value={driver.podiums} />
                  <StatBox label="Career Pts" value={driver.points.toLocaleString()} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Drivers;
