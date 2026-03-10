import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Championships', value: '0' },
  { label: 'Podiums', value: '9+' },
  { label: 'Drivers', value: '2' },
  { label: 'Headquarters', value: 'Silverstone' },
];

const timeline = [
  { year: '2018', text: 'Racing Point era begins, laying the foundation.' },
  { year: '2021', text: 'Aston Martin makes a historic return to Formula 1.' },
  { year: '2025', text: 'Competing for podiums with advanced AMR technology.' },
];

const AboutTeam = () => {
  return (
    <section id="aboutteam" className="py-24 bg-am-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-am-green/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-am-neon/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-am-white">
        
        {/* Header Section */}
        <div className="text-center md:text-left mb-16 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-orbitron font-bold mb-6 text-am-neon uppercase tracking-wide"
          >
            The Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 font-montserrat text-lg leading-relaxed"
          >
            Aston Martin’s legacy in motorsport is built on ambition and engineering excellence. 
            Returning to the grid in 2021, the team partnered with Aramco to push the boundaries 
            of performance. From our state-of-the-art campus in Silverstone, we are driven by 
            a singular vision: to fight for World Championships.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Timeline Animation */}
          <div className="relative border-l border-am-green/30 pl-8 ml-4 lg:ml-0">
            {timeline.map((item, index) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="mb-12 relative group"
              >
                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-am-dark border-2 border-am-green rounded-full group-hover:bg-am-neon group-hover:border-am-neon group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(0,111,98,0.5)]" />
                <h3 className="text-2xl font-orbitron font-bold text-am-white mb-2">{item.year}</h3>
                <p className="text-gray-400 font-montserrat">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg hover:border-am-neon/50 hover:bg-gray-900/80 transition-all duration-300 flex flex-col justify-center items-center text-center group shadow-lg"
              >
                <span className="text-4xl md:text-5xl font-orbitron font-bold text-am-neon mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,255,179,0.3)]">
                  {stat.value}
                </span>
                <span className="text-sm md:text-base text-gray-400 font-montserrat uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
