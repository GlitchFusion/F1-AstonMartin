import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const moments = [
  {
    id: 1,
    title: 'Return to the Grid',
    year: '2021',
    description: 'Aston Martin makes a historic return to Formula One after 60 years.',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2670&auto=format&fit=crop&grayscale' // Monocoque / Grid vibe
  },
  {
    id: 2,
    title: 'First Podium',
    year: '2021',
    description: 'Sebastian Vettel secures the team’s first podium at the Azerbaijan Grand Prix.',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2670&auto=format&fit=crop&grayscale' // Podium / Trophy vibe
  },
  {
    id: 3,
    title: 'The Alonso Era Begins',
    year: '2023',
    description: 'Fernando Alonso joins and immediately scores a podium on his debut for the team in Bahrain.',
    image: 'https://images.unsplash.com/photo-1628151025515-59ab19ac0b86?q=80&w=2670&auto=format&fit=crop&grayscale' // Different F1-related driver/car vibe
  },
  {
    id: 4,
    title: 'Monaco Magic',
    year: '2023',
    description: 'A stellar drive sees the AMR23 fighting for victory on the iconic streets of Monte Carlo.',
    image: 'https://images.unsplash.com/photo-1617300755919-4467c69992f0?q=80&w=2670&auto=format&fit=crop&grayscale' // Street circuit vibe
  },
  {
    id: 5,
    title: 'AMR24 Unveiled',
    year: '2024',
    description: 'The relentless pursuit of aerodynamics and hybrid power evolution.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop&grayscale' // Technology / Car vibe
  }
];

const MomentsGallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} id="momentsgallery" className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-am-dark/50 to-am-dark z-0 pointer-events-none" />
        
        {/* Title layer */}
        <div className="relative z-20 w-full px-6 lg:px-12 mb-8 md:mb-12 shrink-0">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-am-white uppercase tracking-wider mb-2 drop-shadow-lg"
          >
            Iconic <span className="text-am-green ml-0 md:ml-4 inline-block">Moments</span>
          </motion.h2>
          <p className="text-gray-300 font-montserrat uppercase tracking-[0.2em] text-sm md:text-base inline-block opacity-80 mt-2">
            Scroll to journey through time
          </p>
        </div>

        {/* Scrolling Cards */}
        <motion.div style={{ x }} className="flex gap-6 lg:gap-8 px-6 lg:px-12 items-center relative z-10 w-max">
          {moments.map((moment, index) => (
            <div 
              key={moment.id}
              className="group relative w-[80vw] sm:w-[380px] h-[360px] sm:h-[450px] flex-shrink-0 overflow-hidden rounded-xl border border-gray-800 hover:border-am-neon transition-colors duration-500 shadow-2xl"
            >
              {/* Image with greenish greyscale effect */}
              <div className="absolute inset-0 w-full h-full bg-[#050505]">
                <img 
                  src={moment.image} 
                  alt={moment.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100"
                />
              </div>
              
              {/* Green Tint Overlay */}
              <div className="absolute inset-0 bg-am-green/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              
              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-am-neon font-orbitron font-bold text-2xl drop-shadow-[0_0_8px_rgba(0,255,179,0.5)]">
                    {moment.year}
                  </span>
                  <div className="h-px bg-gray-500 w-12 flex-grow" />
                  <span className="text-gray-500 font-orbitron text-sm md:text-base">0{index + 1}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-am-white mb-3">
                  {moment.title}
                </h3>
                <p className="text-gray-300 font-montserrat leading-relaxed text-sm md:text-base transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {moment.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MomentsGallery;
