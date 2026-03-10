import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const specs = [
  { label: 'Engine', value: 'Mercedes-AMG F1 M14 E Performance 1.6L V6 Turbo' },
  { label: 'Power output', value: '~1000 HP' },
  { label: 'Minimum weight', value: '798 kg' },
  { label: 'Top Speed', value: '350+ km/h' },
];

const technologies = [
  {
    id: 'chassis',
    title: 'Chassis',
    description: 'Carbon fibre composite monocoque with Zylon anti-intrusion panels. Designed for ultimate stiffness-to-weight ratio.',
    image: '/src/assets/images/chassis.jpg'
  },
  {
    id: 'aerodynamics',
    title: 'Aerodynamics',
    description: 'Advanced ground effect underfloor design with highly optimized top-body airflow management for maximum downforce.',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2671&auto=format&fit=crop'
  },
  {
    id: 'engine',
    title: 'Power Unit',
    description: 'Mercedes AMG High Performance Powertrain. Integrated hybrid system featuring MGU-K and MGU-H energy recovery.',
    image: '/src/assets/images/powerhouse.png'
  }
];

const CarTechnology = () => {
  const [activeTab, setActiveTab] = useState(technologies[0]);

  return (
    <section id="cartechnology" className="py-24 bg-gradient-to-b from-am-dark via-gray-900 to-am-dark relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-am-white mb-4 uppercase tracking-wider">
            The <span className="text-am-green">AMR24</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-montserrat">
            Engineering excellence distilled into carbon fibre and hybrid power. Explore the cutting-edge technology that drives our World Championship ambitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Interactive Technology Tabs */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <div className="flex space-x-4 mb-4 border-b border-gray-800 pb-2 overflow-x-auto scrollbar-hide">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setActiveTab(tech)}
                  className={`font-orbitron tracking-widest uppercase text-sm md:text-base py-2 transition-all duration-300 relative whitespace-nowrap ${
                    activeTab.id === tech.id ? 'text-am-neon' : 'text-gray-500 hover:text-am-white'
                  }`}
                >
                  {tech.title}
                  {activeTab.id === tech.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-am-neon"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="h-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-orbitron font-semibold text-am-white mb-3">{activeTab.title}</h3>
                  <p className="text-gray-300 font-montserrat leading-relaxed">{activeTab.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Specs Table */}
            <div className="mt-8 bg-black/40 border border-gray-800 rounded-lg p-6">
              <h4 className="text-am-neon font-orbitron text-lg mb-4 uppercase tracking-widest border-b border-gray-800 pb-2">Technical Specs</h4>
              <ul className="space-y-4">
                {specs.map((spec) => (
                  <li key={spec.label} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-800/50 pb-2">
                    <span className="text-gray-400 font-montserrat">{spec.label}</span>
                    <span className="text-am-white font-montserrat font-semibold text-right">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual Display */}
          <div className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,111,98,0.2)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab.id}
                src={activeTab.image}
                alt={activeTab.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </AnimatePresence>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-am-dark via-transparent to-transparent opacity-80" />
            
            <motion.div 
              className="absolute bottom-6 left-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`label-${activeTab.id}`}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-am-neon animate-pulse" />
                <span className="text-am-white font-orbitron uppercase tracking-widest text-sm drop-shadow-md">
                  Active System: <span className="text-am-neon">{activeTab.title}</span>
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CarTechnology;
