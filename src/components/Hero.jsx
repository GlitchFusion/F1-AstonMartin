import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-am-dark/40 via-am-dark/60 to-am-dark z-10" />
        <img 
          src="https://images.unsplash.com/photo-1628151025515-59ab19ac0b86?q=80&w=2670&auto=format&fit=crop" 
          alt="Aston Martin F1 Car"
          className="w-full h-full object-cover object-center scale-105"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-am-neon text-sm md:text-base font-montserrat tracking-[0.3em] uppercase mb-4">
            Formula One Team
          </h2>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black text-am-white leading-tight mb-6"
        >
          ASTON MARTIN <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-am-green to-am-neon">
            ARAMCO
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-300 font-montserrat text-lg md:text-xl max-w-2xl font-light mb-12 tracking-wide"
        >
          Precision. Power. Performance.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 mb-12"
        >
          <a 
            href="#cartechnology" 
            className="px-8 py-3 bg-am-green hover:bg-am-neon text-am-white hover:text-am-dark font-orbitron font-bold transition-all duration-300 rounded-sm transform hover:scale-105"
          >
            Explore the Car
          </a>
          <a 
            href="#drivers" 
            className="px-8 py-3 bg-transparent border border-am-white hover:border-am-neon text-am-white hover:text-am-neon font-orbitron font-bold transition-all duration-300 rounded-sm transform hover:scale-105"
          >
            Meet the Drivers
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#countdown"
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-am-neon transition-colors"
        >
          <span className="text-xs font-montserrat tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
