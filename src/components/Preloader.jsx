import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the enter button after a short delay so the video can buffer/start
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-am-dark flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <iframe
          src="https://www.youtube.com/embed/zEsbZSRtM7E?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=zEsbZSRtM7E&modestbranding=1&vq=hd1080"
          title="Aston Martin F1 Preloader"
          className="w-[300vw] h-[300vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 scale-150"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
        />
        {/* Overlay gradient to blend video into the background */}
        <div className="absolute inset-0 bg-gradient-to-b from-am-dark/80 via-transparent to-am-dark" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="w-16 h-16 bg-am-green flex items-center justify-center rounded-sm mx-auto mb-6">
            <span className="text-am-white font-orbitron font-bold text-3xl">AM</span>
          </div>
          <h1 className="text-am-white font-orbitron font-bold text-2xl md:text-4xl tracking-widest uppercase">
            Aston Martin
          </h1>
          <p className="text-am-neon font-montserrat tracking-[0.3em] text-sm mt-2 uppercase">
            Formula One Team
          </p>
        </motion.div>

        <div className="h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showButton ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-am-neon rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-am-neon rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-am-neon rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </motion.div>
            ) : (
              <motion.button
                key="enter-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoadingComplete}
                className="px-8 py-3 bg-transparent border-2 border-am-neon text-am-neon hover:bg-am-neon hover:text-am-dark font-orbitron font-bold transition-all duration-300 uppercase tracking-widest"
              >
                Enter Experience
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
