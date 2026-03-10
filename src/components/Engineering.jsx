import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wind, Factory } from 'lucide-react';

const Engineering = () => {
  return (
    <section id="engineering" className="py-24 bg-gradient-to-t from-am-dark to-[#050505] relative overflow-hidden text-am-white">
      {/* Background Enhancements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-am-green/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center md:text-left mb-16 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold uppercase tracking-wider mb-4"
          >
            Factory & <span className="text-am-green">Engineering</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-montserrat uppercase tracking-[0.2em] text-sm mb-6"
          >
            The Future of Motorsport Manufacturing
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 font-montserrat text-lg leading-relaxed max-w-3xl"
          >
            Our state-of-the-art Technology Campus in Silverstone represents a £200M investment 
            in the future. Featuring a brand new wind tunnel, cutting-edge simulator facilities, 
            and carbon composite manufacturing under one roof, it’s designed to win world championships.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Engineering Pillars */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            {[
              { icon: <Factory size={24} />, title: 'Silverstone HQ', desc: '400,000 sq ft smart factory bringing design and manufacturing together.' },
              { icon: <Wind size={24} />, title: 'Wind Tunnel', desc: 'Next-generation aerodynamic testing facility for rapid iteration.' },
              { icon: <Cpu size={24} />, title: 'Simulation Technology', desc: 'Driver-in-loop simulator utilizing advanced digital twins for precise setup correlation.' }
            ].map((feature, idx) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (idx * 0.2) }}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="w-16 h-16 shrink-0 rounded-full border border-gray-800 bg-black/40 flex items-center justify-center text-am-neon group-hover:bg-am-neon group-hover:text-black group-hover:border-am-neon transition-all duration-300 shadow-[0_0_15px_rgba(0,255,179,0)] group-hover:shadow-[0_0_15px_rgba(0,255,179,0.3)]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-orbitron font-bold text-am-white mb-2 group-hover:text-am-neon transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 font-montserrat leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 grid grid-cols-2 gap-4 h-[400px] lg:h-[600px]"
          >
            <div className="col-span-1 row-span-2 overflow-hidden rounded-xl border border-gray-800 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1569427014022-386f6a704de5?q=80&w=2670&auto=format&fit=crop" 
                alt="Wind Tunnel Engineering" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[40%]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-am-dark/80 to-transparent" />
            </div>
            <div className="col-span-1 row-span-1 overflow-hidden rounded-xl border border-gray-800 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2670&auto=format&fit=crop" 
                alt="Simulation Room" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[40%]" 
              />
            </div>
            <div className="col-span-1 row-span-1 overflow-hidden rounded-xl border border-gray-800 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=2670&auto=format&fit=crop" 
                alt="Carbon Manufacturing" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[40%]" 
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Engineering;
