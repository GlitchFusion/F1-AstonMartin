import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const moments = [
  {
    id: 1,
    title: 'Return to the Grid',
    year: '2021',
    description: 'Aston Martin makes a historic return to Formula One after 60 years.',
    image: 'https://images.unsplash.com/photo-1594912952402-2121e78440cf?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'First Podium',
    year: '2021',
    description: 'Sebastian Vettel secures the team’s first podium at the Azerbaijan Grand Prix.',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'The Alonso Era Begins',
    year: '2023',
    description: 'Fernando Alonso joins and immediately scores a podium on his debut for the team in Bahrain.',
    image: 'https://images.unsplash.com/photo-1628151025515-59ab19ac0b86?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Monaco Magic',
    year: '2023',
    description: 'A stellar drive sees the AMR23 fighting for victory on the iconic streets of Monte Carlo.',
    image: 'https://images.unsplash.com/photo-1554223214-740bb0633b49?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'AMR24 Unveiled',
    year: '2024',
    description: 'The relentless pursuit of aerodynamics and hybrid power evolution.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2693&auto=format&fit=crop'
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
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-am-dark/50 to-am-dark z-0 pointer-events-none" />
        
        <div className="absolute top-20 left-6 lg:left-12 z-10 w-full max-w-sm pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-orbitron font-bold text-am-white uppercase tracking-wider mb-2 drop-shadow-lg"
          >
            Iconic <br/><span className="text-am-green">Moments</span>
          </motion.h2>
          <p className="text-gray-300 font-montserrat uppercase tracking-[0.2em] text-sm">Scroll to journey through time</p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-64 items-center h-full pt-16 relative z-10">
          {moments.map((moment, index) => (
            <div 
              key={moment.id}
              className="group relative w-[80vw] sm:w-[500px] h-[400px] sm:h-[500px] flex-shrink-0 overflow-hidden rounded-xl border border-gray-800 hover:border-am-neon transition-colors duration-500 shadow-2xl"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={moment.image} 
                  alt={moment.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-am-neon font-orbitron font-bold text-2xl drop-shadow-[0_0_8px_rgba(0,255,179,0.5)]">
                    {moment.year}
                  </span>
                  <div className="h-px bg-gray-500 w-12 flex-grow" />
                  <span className="text-gray-500 font-orbitron text-sm">0{index + 1}</span>
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
