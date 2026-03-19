import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Flag, ChevronRight, X } from 'lucide-react';

// Import local assets
import vettelImg from '../assets/images/sebastian.webp';
import perezImg from '../assets/images/sergio.jpg';
import fisichellaImg from '../assets/images/fisichella.jpg';
import nicoImg from '../assets/images/nico.jpg';

const INITIAL_DRIVERS = [
  {
    id: 'vettel',
    name: 'Sebastian Vettel',
    years: '2021 - 2022',
    number: '05',
    description: 'The four-time World Champion brought priceless championship-winning experience to the team, securing Aston Martin\'s first-ever Formula One podium at the 2021 Azerbaijan Grand Prix.',
    achievements: [
      { icon: <Medal className="w-4 h-4 text-am-neon" />, text: 'First AMF1 Podium' },
      { icon: <Trophy className="w-4 h-4 text-am-neon" />, text: '4x World Champion' }
    ],
    image: vettelImg, 
    accent: '#00FFB3'
  },
  {
    id: 'perez',
    name: 'Sergio Perez',
    years: '2014 - 2020',
    number: '11',
    description: 'A true team legend during the Force India and Racing Point eras. Checo delivered seven podiums and secured an emotional, historic victory at the 2020 Sakhir Grand Prix.',
    achievements: [
      { icon: <Flag className="w-4 h-4 text-am-neon" />, text: '1 Race Win (Sakhir)' },
      { icon: <Medal className="w-4 h-4 text-am-neon" />, text: '7 Team Podiums' }
    ],
    image: perezImg,
    accent: '#006F62'
  },
  {
    id: 'hulkenberg',
    name: 'Nico Hülkenberg',
    years: '2012, 14-16, 20-22',
    number: '27',
    description: 'Affectionately known as "Hulk", Nico was the ultimate dependable racer and super-sub, consistently delivering crucial points across multiple different eras of the team\'s history.',
    achievements: [
      { icon: <Trophy className="w-4 h-4 text-am-neon" />, text: 'Le Mans Winner' },
      { icon: <Flag className="w-4 h-4 text-am-neon" />, text: 'Ultimate Super-Sub' }
    ],
    image: nicoImg,
    accent: '#00FFB3'
  },
  {
    id: 'fisichella',
    name: 'Giancarlo Fisichella',
    years: '2008 - 2009',
    number: '09',
    description: 'Scored the team\'s sensational first-ever pole position and brilliant podium finish at the 2009 Belgian Grand Prix, putting the Silverstone squad firmly on the map.',
    achievements: [
      { icon: <Flag className="w-4 h-4 text-am-neon" />, text: '1st Team Pole Position' },
      { icon: <Medal className="w-4 h-4 text-am-neon" />, text: 'Spa 2009 Podium' }
    ],
    image: fisichellaImg,
    accent: '#006F62'
  }
];

const PastDrivers = () => {
  const [activeDriver, setActiveDriver] = useState(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDriver(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeDriver) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeDriver]);

  return (
    <section id="past-drivers" className="py-24 bg-am-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-am-green/30 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-am-green/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-am-neon text-sm md:text-base font-montserrat tracking-[0.3em] uppercase mb-4">
              Team Heritage
            </h2>
            <h3 className="text-3xl md:text-5xl font-orbitron font-bold text-am-white tracking-widest uppercase mb-4">
              Legacy Drivers
            </h3>
            <p className="text-gray-400 font-montserrat text-sm md:text-base leading-relaxed">
              Honoring the legendary pilots who established the foundation of our modern success. Click any card to read their full legacy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid of Small Cards */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_DRIVERS.map((driver) => (
            <motion.div
              layoutId={`card-${driver.id}`}
              key={driver.id}
              onClick={() => setActiveDriver(driver)}
              className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-gray-800 hover:border-am-green/40 transition-colors shadow-xl flex flex-col group cursor-pointer h-[380px]"
            >
              {/* Image Header */}
              <motion.div layoutId={`image-container-${driver.id}`} className="relative h-44 overflow-hidden bg-am-dark/50 shrink-0">
                <img 
                  src={driver.image} 
                  alt={driver.name}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop&grayscale";
                  }}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow relative overflow-hidden">
                {/* Background Watermark (faint) */}
                <div className="absolute -bottom-4 -right-2 font-orbitron font-black text-white/[0.02] text-[6rem] leading-none pointer-events-none select-none">
                  {driver.number}
                </div>

                {/* Name moved down to body */}
                <div className="border-l-2 pl-3 mb-3 relative z-10" style={{ borderColor: driver.accent }}>
                  <motion.span layoutId={`name-${driver.id}`} className="text-am-white font-orbitron font-bold text-lg block">{driver.name}</motion.span>
                  <motion.p layoutId={`years-${driver.id}`} className="text-am-neon font-montserrat uppercase mt-1 tracking-[0.1em] text-[10px]">{driver.years}</motion.p>
                </div>

                <motion.p layoutId={`desc-${driver.id}`} className="text-gray-400 font-montserrat text-xs leading-relaxed line-clamp-3 mb-4 relative z-10">
                  {driver.description}
                </motion.p>
                
                <div className="mt-auto relative z-10 inline-flex items-center gap-2 text-am-neon font-montserrat text-[10px] tracking-widest uppercase font-semibold group-hover:text-am-white transition-colors">
                  Read More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal using AnimatePresence */}
      <AnimatePresence>
        {activeDriver && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDriver(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[999]"
            />
            
            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-[1000] pointer-events-none">
              <motion.div
                layoutId={`card-${activeDriver.id}`}
                className="bg-[#050505] w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-gray-700 shadow-2xl pointer-events-auto flex flex-col md:flex-row relative"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActiveDriver(null)} 
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-am-green hover:text-black rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Modal Image Header */}
                <motion.div layoutId={`image-container-${activeDriver.id}`} className="md:w-1/2 h-56 md:h-auto relative bg-black shrink-0">
                  <img 
                    src={activeDriver.image} 
                    alt={activeDriver.name}
                    className="w-full h-full object-cover mix-blend-normal opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent md:bg-gradient-to-r" />
                  
                  {/* Watermark in Modal */}
                  <div className="absolute bottom-0 right-0 md:-right-6 md:-bottom-10 font-orbitron font-black text-white/[0.05] select-none text-[8rem] md:text-[14rem] leading-none pointer-events-none">
                    {activeDriver.number}
                  </div>
                </motion.div>

                {/* Modal Info */}
                <div className="p-6 md:p-10 md:w-1/2 flex flex-col justify-center relative bg-gradient-to-br from-[#0A0A0A] to-[#050505]">
                  <div className="border-l-4 pl-4 md:pl-6 mb-6 relative z-10" style={{ borderColor: activeDriver.accent }}>
                    <motion.span layoutId={`name-${activeDriver.id}`} className="text-am-white font-orbitron font-bold text-3xl md:text-5xl block">{activeDriver.name}</motion.span>
                    <motion.p layoutId={`years-${activeDriver.id}`} className="text-am-neon font-montserrat tracking-[0.2em] text-xs md:text-sm uppercase mt-2">{activeDriver.years}</motion.p>
                  </div>

                  <motion.p layoutId={`desc-${activeDriver.id}`} className="text-gray-300 font-montserrat text-sm md:text-base leading-relaxed mb-8 relative z-10">
                    {activeDriver.description}
                  </motion.p>
                  
                  <div className="relative z-10">
                    <h4 className="text-am-white font-orbitron text-lg mb-4 border-b border-white/10 pb-2">Career Highlights</h4>
                    <div className="space-y-4">
                      {activeDriver.achievements.map((ach, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.2 }}
                          key={i} 
                          className="flex items-center gap-4"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-am-dark flex items-center justify-center border border-gray-700 shrink-0">
                            {React.cloneElement(ach.icon, { className: 'w-4 h-4 md:w-5 md:h-5 text-am-neon' })}
                          </div>
                          <span className="text-gray-300 font-montserrat text-sm md:text-base font-medium">{ach.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PastDrivers;
