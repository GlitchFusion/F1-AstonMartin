import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Drivers = () => {
  const [expandedId, setExpandedId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="drivers" className="py-24 bg-am-dark relative">
      <div className="container mx-auto px-6 lg:px-12">
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

        <motion.div 
          className="flex flex-col lg:flex-row gap-8 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {drivers.map((driver) => {
            const isExpanded = expandedId === driver.id;

            return (
              <motion.div
                key={driver.id}
                layout
                onClick={() => setExpandedId(isExpanded ? null : driver.id)}
                variants={cardVariants}
                className={`relative cursor-pointer overflow-hidden rounded-xl border transition-colors duration-500 shadow-2xl ${
                  isExpanded ? 'w-full lg:w-[60%] border-am-neon' : 'w-full lg:w-[40%] border-gray-800 hover:border-am-green/50'
                }`}
                style={{
                  height: '500px',
                  boxShadow: isExpanded ? `0 0 40px ${driver.accent}33` : 'none'
                }}
              >
                {/* Background Image */}
                <motion.div className="absolute inset-0 z-0">
                  <img 
                    src={driver.image} 
                    alt={driver.name} 
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isExpanded ? 'scale-105 grayscale-0' : 'scale-100 grayscale-[60%] hover:grayscale-[30%]'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    isExpanded ? 'from-black/90 via-black/40 to-transparent' : 'from-black/80 via-black/20 to-transparent'
                  }`} />
                </motion.div>

                {/* Content Overlay */}
                <motion.div layout className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <motion.h3 layout className="text-4xl md:text-5xl font-orbitron font-bold text-am-white">
                        {driver.name}
                      </motion.h3>
                      <motion.p layout className="text-xl font-montserrat text-gray-300 tracking-widest uppercase">
                        {driver.nationality}
                      </motion.p>
                    </div>
                    <motion.div layout className="text-6xl md:text-8xl font-orbitron font-black text-white/10 select-none">
                      {driver.number}
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-2"
                      >
                        <p className="text-gray-300 font-montserrat leading-relaxed mb-6 max-w-lg">
                          {driver.description}
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-700 pt-6">
                          <div>
                            <p className="text-gray-500 font-montserrat text-xs uppercase tracking-wider mb-1">Championships</p>
                            <p className="text-am-neon font-orbitron text-2xl font-bold">{driver.championships}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-montserrat text-xs uppercase tracking-wider mb-1">Podiums</p>
                            <p className="text-am-neon font-orbitron text-2xl font-bold">{driver.podiums}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-montserrat text-xs uppercase tracking-wider mb-1">Career Points</p>
                            <p className="text-am-neon font-orbitron text-2xl font-bold">{driver.points}</p>
                          </div>
                          <div className="flex items-center justify-end">
                            <button className="text-sm font-orbitron text-am-dark bg-am-neon hover:bg-am-white transition-colors px-4 py-2 rounded-sm uppercase tracking-widest font-bold">
                              Full Profile
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Drivers;
